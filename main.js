const pipe = require('./pipe');
const draw = require('./draw');

let playArea;
const rowLength = 20;
const colLength = 40;
const birdChar = 'B';
const pipeChar = 'P';
const backgroundChar = ' ';

playArea = pipe.createPlayArea(backgroundChar, rowLength, colLength);

console.clear();
draw.draw(playArea);

let countRounds = 0;
setInterval(() => {
  console.clear();
  if (countRounds % 30 === 0) {
    pipe.createPipe(pipeChar, colLength - 2, 1, 7, 5, playArea);
  }
  if (countRounds % 3 === 0) {
    pipe.shiftPlayArea(backgroundChar, playArea);
  }
  draw.draw(playArea);
  countRounds++;
}, 100);
