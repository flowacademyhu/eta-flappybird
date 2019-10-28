let playArea;
let rowLength;
let colLength;
const birdChar = 'B';
const pipeChar = 'P';
const backgroundChar = ' ';

const createPlayArea = (row, col) => {
  return Array(row).fill().map(() => (Array(col).fill(0)));
};

const putInBird = (row, col, area) => {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      area[row + i][col + j] = birdChar;
    }
  }
};

// teszt
playArea = createPlayArea(6, 6);
putInBird(3, 3, playArea);

console.log(playArea);
