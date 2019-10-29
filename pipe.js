
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
const createPlayArea = (row, col) => {
  return Array(row).fill().map(() => (Array(col).fill(' ')));
};

const matrix = createPlayArea(8, 10);
createPipe('p', 5, 1, 3, 2, matrix);
console.log(matrix);
shiftAreaWithPipes(' ', matrix);
console.log(matrix);

setInterval(() => {
  console.clear();
  shiftAreaWithPipes(' ', matrix);
  console.log(matrix);
}, 1000);
