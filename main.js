require('colors');
console.clear();
const pipe = require('./pipe');
const draw = require('./draw');
const bird = require('./bird');
const menu = require('./menu');
const bckG = require('./backGround');
const readline = require('readline-sync');
const collision = require('./collision');
const scores = require('./score');
const term = require('terminal-kit').terminal;

/** global variables **/
let score;
let playArea;
let playBackGround;
const rowLength = 30; // height of screen
const colLength = 90; // width of screen
const birdChar = '█'.red;
const pipeChar = '█'.green;
const sunChar = '█'.yellow;
const groundChar = '\\'.strikethrough.underline.inverse.dim.yellow;
const hillsChar = '▒'.dim.green;
const backgroundChar = '0'; // filling of foreGround blank areas
const backLayerChar = '▓'.blue; // filling of backGround blank areas
let birdCoordinates;
term.inverse.bold.blue(true);
term.inverse.bold.blue(false);
let hillsHeight;
let game;
let pipeCounter;

const playObject = {
  playMode: false,
  name: undefined,
  birdSpeed: 0,
  birdFlyAcceleration: 2
};

/** setting up and drawing playArea */

const initGame = (playerName) => {
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
  birdCoordinates = bird.makeBirdCoordinates(2, 10, 1, 1);
  bird.putBirdInPlayArea(birdChar, birdCoordinates, playArea);
  draw.draw(playArea, playBackGround);
  playObject.playMode = true;
};

/** interval **/
const play = () => {
  let countRounds = 0;
  game = setInterval(() => {
    const birdCol = collision.birdCollision(playArea, birdChar, birdCoordinates);
    bckG.removeSun(backLayerChar, playBackGround, sunChar);
    bird.removeBirdFromPlayArea(backgroundChar, birdCoordinates, playArea);
    console.clear();
    if (countRounds % 35 === 0) {
      pipeCounter++;
      const rp = pipe.getRandomPipeParams(8, 11, 6, 12, 4, 6);
      pipe.createPipe(pipeCounter, pipeChar, colLength - 9, 6, rp.gapStartLoc, rp.gapLength, playArea);
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
      if (countRounds % 30 === 0) {
        score++;
      }
    }
    if (countRounds % 4 === 0) {
      // generates new "hills" (coloumns) after frame 0
      bckG.appendBackground(hillsHeight, playBackGround, groundChar, hillsChar);
    }
    bird.changeBirdCoordinates(birdCoordinates, playObject.birdSpeed);
    const birdPipe = collision.birdPipeCol(pipeChar, birdCoordinates, playArea);
    if (birdCol || birdPipe) {
      playObject.playMode = false;
      clearInterval(game);
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

const stdInput = () => {
  /** standard input **/
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf-8');
  stdin.on('data', key => {
    if (key === 'q') {
      console.clear();
      process.exit();
    }
    if (key === ' ' && playObject.playMode) {
      playObject.birdSpeed = playObject.birdFlyAcceleration;
    }
    if (key === 'r' && !playObject.playMode) {
      initGame(playObject.name);
      play();
    }
    if (key === 'm' && !playObject.playMode) {
      stdin.pause();
      menu.getMenu();
    }
  });
};

module.exports = {
  initGame: initGame,
  play: play,
  // stdInput: stdInput,
  playObject: playObject
};
