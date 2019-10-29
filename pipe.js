
const createPipe = (pipeChar, col, width, gapStartLoc, gapLength, matrix) => {
  const colIndexes = getPipeColIndexes(matrix.length, gapStartLoc, gapLength);

  for (const i of colIndexes) {
    for (let j = -width; j <= width; j++) {
      matrix[i][col + j] = pipeChar;
    }
  }
};

const getPipeColIndexes = (PipeLength, gapStartLoc, gapLength) => {
  const colIndexes = [];
  for (let i = 0; i < PipeLength; i++) {
    if (i < gapStartLoc || i >= gapStartLoc + gapLength) {
      colIndexes.push(i);
    }
  }
  return colIndexes;
};

const shiftAreaWithPipes = (backGroundChar, area) => {
  for (const i of area) {
    i.shift();
    i.push(backGroundChar);
  }
};

// test
const createPlayArea = (char, row, col) => {
  return Array(row).fill().map(() => (Array(col).fill(char)));
};

const bcChar = 0;
const pipeChar = 5;

const matrix = createPlayArea(bcChar, 8, 20);
console.clear();
console.log(matrix);
let count = 0;

setInterval(() => {
  console.clear();
  if (count % 5 === 0) {
    createPipe(pipeChar, 18, 1, 3, 2, matrix);
  }
  shiftAreaWithPipes(bcChar, matrix);
  console.log(matrix);
  count++;
}, 1000);
