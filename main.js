require('colors');
const pipe = require('./pipe');
const draw = require('./draw');
const bird = require('./bird');
const bckG = require('./backGround');
const collision = require('./collision');
const scores = require('./score');
const sounds = require('./sounds');
const term = require('terminal-kit').terminal;

/** global variables **/
let score;
let playArea;
let playBackGround;
const rowLength = 30; // height of screen
const colLength = 90; // width of screen
const birdChar = '»'.white.bold.bgRed;
const pipeChar = '█'.green;
const pipeShade = '█'.dim.white;
const sunChar = '█'.yellow;
const groundChar = '\\'.strikethrough.underline.inverse.dim.yellow;
const hillsChar = '▒'.dim.green;
const backgroundChar = '0'; // filling of foreGround blank areas
const backLayerChar = '▓'.blue; // filling of backGround blank areas
let birdCoordinates;
term.hideCursor();
let hillsHeight;
let pipeCounter;

const playObject = {
  playMode: false,
  name: undefined,
  birdSpeed: 0,
  birdFlyAcceleration: 2,
  game: undefined
};

/** setting up and drawing playArea */
const initGame = playerName => {
  // term.hideCursor();
  playObject.name = playerName;
  console.clear();
  score = 0;
  pipeCounter = 0;
  playObject.birdSpeed = 0;
  playArea = pipe.createPlayArea(backgroundChar, rowLength, colLength);
  playBackGround = bckG.bckGrnd(backLayerChar, rowLength, colLength);
  hillsHeight = [Math.floor(playBackGround.length / 3)];
  bckG.putInSun(playBackGround, sunChar, hillsChar);
  bckG.generateStartBackground(playBackGround, hillsHeight, groundChar, hillsChar);
  birdCoordinates = bird.makeBirdCoordinates(4, 10, 1, 1);
  bird.putBirdInPlayArea(birdChar, birdCoordinates, playArea);
  draw.draw(playArea, playBackGround);
  playObject.playMode = true;
  pipeCounter = 0;
};

/** interval **/
const play = () => {
  term.hideCursor();
  let countRounds = 0;
  playObject.game = setInterval(() => {
    const birdCol = collision.birdCollision(playArea, birdChar, birdCoordinates);
    bckG.removeSun(backLayerChar, playBackGround, sunChar);
    bird.removeBirdFromPlayArea(backgroundChar, birdCoordinates, playArea);
    console.clear();
    if (countRounds % 35 === 0) {
      pipeCounter++;
      const rp = pipe.getRandomPipeParams(8, 11, 6, 12, 4, 6);
      pipe.createPipe(pipeCounter, pipeChar, pipeShade, colLength - 9, 6, rp.gapStartLoc, rp.gapLength, playArea);
    }
    if (countRounds % 1 === 0) {
      // moves the pipes
      pipe.shiftPlayArea(backgroundChar, playArea);
    }
    if (countRounds % 7 === 0) {
      // moves the hills on backGround
      pipe.shiftPlayArea(backLayerChar, playBackGround);
    }
    if (countRounds % 2 === 0 && playObject.birdSpeed > -1) {
      playObject.birdSpeed--;
    }
    if (countRounds > 70) {
      if (countRounds % 36 === 0) {
        sounds.point();
        score++;
      }
    }
    if (countRounds % 4 === 0) {
      // generates new "hills" (coloumns) after frame 0
      bckG.appendBackground(hillsHeight, playBackGround, groundChar, hillsChar);
    }
    bird.changeBirdCoordinates(birdCoordinates, playObject.birdSpeed);
    const birdPipe = collision.birdPipeCol(pipeChar, birdCoordinates, playArea);
    if ((birdCol || birdPipe) && playObject.name !== 'flow') {
      sounds.die();
      playObject.playMode = false;
      clearInterval(playObject.game);
      scores.writeFile(playObject.name, score);
      scores.gameover();
    } else {
      bird.putBirdInPlayArea(birdChar, birdCoordinates, playArea);
      bckG.putInSun(playBackGround, sunChar, hillsChar);
      draw.draw(playArea, playBackGround);
      countRounds++;
    }
  }, 50);
};

module.exports = {
  initGame: initGame,
  play: play,
  playObject: playObject
};
