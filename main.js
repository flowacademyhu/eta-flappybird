const pipe = require('./pipe');

let playArea;
const rowLength = 20;
const colLength = 80;
const birdChar = 'B';
const pipeChar = 'P';
const backgroundChar = ' ';

playArea = pipe.createPlayArea(backgroundChar, rowLength, colLength);
pipe.createPipe(pipeChar, 78, 1, 9, 3, playArea);

console.clear();
console.log(playArea);

setInterval(() => {

}, 1000);
