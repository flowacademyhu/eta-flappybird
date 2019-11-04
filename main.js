const pipe = require('./pipe');
const draw = require('./draw');
const bird = require('./bird');
const bckG = require('./backGround');
const collision = require('./collision');

/** global variables **/
let playArea;
let playBackGround;
const rowLength = 40; // height of screen
const colLength = 120; // width of screen
const birdChar = 'B';
const pipeChar = '▒';
const sunChar = '█';
const groundChar = '~';
const hillsChar = '░';
const backgroundChar = '0'; // filling of foreGround blank areas
const backLayerChar = '▓'; // filling of backGround blank areas
let birdSpeed = 0;
const birdFlyAcceleration = 2;
const birdCoordinates = bird.makeBirdCoordinates(2, 10, 0, 0);

/** setting up and drawing playArea */
playArea = pipe.createPlayArea(backgroundChar, rowLength, colLength);
playBackGround = bckG.bckGrnd(backLayerChar, rowLength, colLength);
const hillsHeight = [Math.floor(playBackGround.length / 3)];
bckG.putInSun(playBackGround, sunChar, hillsChar);
bckG.generateStartBackground(
  playBackGround,
  hillsHeight,
  groundChar,
  hillsChar
);
bird.putBirdInPlayArea(birdChar, birdCoordinates, playArea);
console.clear();
draw.draw(playArea, playBackGround);

/** interval **/
let countRounds = 0;
setInterval(() => {
  const birdCol = collision.birdCollision(playArea, birdChar, birdCoordinates);
  bckG.removeSun(backLayerChar, playBackGround, sunChar);
  bird.removeBirdFromPlayArea(backgroundChar, birdCoordinates, playArea);
  console.clear();
  if (countRounds % 35 === 0) {
    const rp = pipe.getRandomPipeParams(8, 11, 6, 12, 4, 6);
    pipe.createPipe(
      pipeChar,
      colLength - 9,
      rp.width,
      rp.gapStartLoc,
      rp.gapLength,
      playArea
    );
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
  if (countRounds % 4 === 0) {
    // generates new "hills" (coloumns) after frame 0
    bckG.appendBackground(hillsHeight, playBackGround, groundChar, hillsChar);
  }
  const birdPipe = collision.birdPipeCol(pipeChar, birdCoordinates, playArea);
  if (birdCol || birdPipe) {
    process.exit();
  }
  bird.changeBirdCoordinates(birdCoordinates, birdSpeed);
  bird.putBirdInPlayArea(birdChar, birdCoordinates, playArea);
  bckG.putInSun(playBackGround, sunChar, hillsChar);
  draw.draw(playArea, playBackGround);
  countRounds++;
}, 50);

/** standard input **/
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', key => {
  if (key === 'q') {
    process.exit();
  }
  if (key === 'w') {
    birdSpeed = birdFlyAcceleration;
  }
});
