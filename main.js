const pipe = require('./pipe');
const draw = require('./draw');
const bird = require('./bird');

/** global variables **/
let playArea;
const rowLength = 20;
const colLength = 40;
const birdChar = 'B';
const pipeChar = 'P';
const backgroundChar = ' ';
let birdSpeed = 0;
const birdFlyAcceleration = 2;
const birdCoordinates = bird.makeBirdCoordinates(2, 10, 0, 0);

/** setting up and drawing playArea */
playArea = pipe.createPlayArea(backgroundChar, rowLength, colLength);
bird.putBirdInPlayArea(birdChar, birdCoordinates, playArea);
console.clear();
draw.draw(playArea);

/** interval **/
let countRounds = 0;
setInterval(() => {
  bird.removeBirdFromPlayArea(backgroundChar, birdCoordinates, playArea);
  console.clear();
  if (countRounds % 30 === 0) {
    pipe.createPipe(pipeChar, colLength - 2, 1, 5, 10, playArea);
  }
  if (countRounds % 3 === 0) {
    pipe.shiftPlayArea(backgroundChar, playArea);
  }
  if (countRounds % 2 === 0 && birdSpeed > -1) {
    birdSpeed--;
  }
  bird.changeBirdCoordinates(birdCoordinates, birdSpeed);
  bird.putBirdInPlayArea(birdChar, birdCoordinates, playArea);
  draw.draw(playArea);
  countRounds++;
}, 50);

/** standard input **/
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', (key) => {
  if (key === 'q') {
    process.exit();
  }
  if (key === 'w') {
    birdSpeed = birdFlyAcceleration;
  }
});
