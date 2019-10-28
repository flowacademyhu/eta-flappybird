const createPipe = (col, width, gapStartLoc, gapLength, matrix) => {
  const colIndexes = getPipeColIndexes(matrix.length, gapStartLoc, gapLength);

  for (const i of colIndexes) {
    for (let j = -width; j <= width; j++) {
      matrix[i][col + j] = 5;
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

// test
const createPlayArea = (row, col) => {
  return Array(row).fill().map(() => (Array(col).fill(0)));
};

const matrix = createPlayArea(8, 10);
createPipe(5, 1, 3, 2, matrix);
console.log(matrix);

