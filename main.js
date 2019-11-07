console.clear();
const pipe = require('./pipe');
const draw = require('./draw');
const bird = require('./bird');
const bckG = require('./backGround');
const readline = require('readline-sync');
const collision = require('./collision');
const scores = require('./score');
const colors = require('colors');
const term = require('terminal-kit').terminal;

/** global variables **/
let score = 0;
let playArea;
let playBackGround;
const rowLength = 30; // height of screen
const colLength = 90; // width of screen
const birdChar = '█'.red;
const pipeChar = '▒'.brightGreen;
const sunChar = '█'.yellow;
const groundChar = '\\'.strikethrough.underline.inverse.dim.yellow;
const hillsChar = '░'.green;
const backgroundChar = '0'; // filling of foreGround blank areas
const backLayerChar = '▓'.blue; // filling of backGround blank areas
let birdSpeed = 0;
const birdFlyAcceleration = 2;
const birdCoordinates = bird.makeBirdCoordinates(2, 10, 0, 0);
term.inverse.bold.blue(true);
const name = readline.question('Plese enter your name: ');
term.inverse.bold.blue(false);
let hillsHeight;
let game;

/** setting up and drawing playArea */

const initGame = () => {
  playArea = pipe.createPlayArea(backgroundChar, rowLength, colLength);
  playBackGround = bckG.bckGrnd(backLayerChar, rowLength, colLength);
  hillsHeight = [Math.floor(playBackGround.length / 3)];
  bckG.putInSun(playBackGround, sunChar, hillsChar);
  bckG.generateStartBackground(playBackGround, hillsHeight, groundChar, hillsChar);
  bird.putBirdInPlayArea(birdChar, birdCoordinates, playArea);
  console.clear();
  draw.draw(playArea, playBackGround);
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
      const rp = pipe.getRandomPipeParams(8, 11, 6, 12, 4, 6);
      pipe.createPipe(pipeChar, colLength - 9, rp.width, rp.gapStartLoc, rp.gapLength, playArea);
    }
    if (countRounds % 1 === 0) {
      // moves the pipes
      pipe.shiftPlayArea(backgroundChar, playArea);
    }
    if (countRounds % 7 === 0) {
      // moves the hills on backGround
      pipe.shiftPlayArea(backLayerChar, playBackGround);
    }
    if (countRounds % 2 === 0 && birdSpeed > -1) {
      birdSpeed--;
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
    const birdPipe = collision.birdPipeCol(pipeChar, birdCoordinates, playArea);
    if (birdCol || birdPipe) {
      clearInterval(game);
      scores.writeFile(name, score);
      scores.gameover();
    } else {
      bird.changeBirdCoordinates(birdCoordinates, birdSpeed);
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
    if (key === 'w') {
      birdSpeed = birdFlyAcceleration;
    }
    if (key === 'r') {
      initGame();
      play();
    }
  });
};

module.exports = {
  initGame: initGame,
  play: play,
  stdInput: stdInput
};
