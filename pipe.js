const createPlayArea = (backgroundChar, row, col) => {
  return Array(row)
    .fill()
    .map(() => Array(col).fill(backgroundChar));
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

const createPipe = (pipeChar, col, width, gapStartLoc, gapLength, matrix) => {
  const colIndexes = getPipeColIndexes(matrix.length, gapStartLoc, gapLength);

  for (const i of colIndexes) {
    for (let j = 0; j < width; j++) {
      if (i < matrix.length * 0.9) matrix[i][col + j] = pipeChar;
    }
  }
};

const getRand = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getRandomPipeParams = (
  minGapStart,
  maxGapStart,
  minGapLen,
  maxGapLen,
  minWidth = 3,
  maxWidth = 3
) => {
  return {
    gapStartLoc: getRand(minGapStart, maxGapStart),
    gapLength: getRand(minGapLen, maxGapLen),
    width: getRand(minWidth, maxWidth)
  };
};

const shiftPlayArea = (backGroundChar, area) => {
  for (const i of area) {
    i.shift();
    i.push(backGroundChar);
  }
};

module.exports = {
  createPipe: createPipe,
  getRandomPipeParams: getRandomPipeParams,
  shiftPlayArea: shiftPlayArea,
  createPlayArea: createPlayArea
};

// test

// const bcChar = 0;
// const pipeChar = 5;

// const matrix = createPlayArea(bcChar, 8, 20);
// console.clear();
// console.log(matrix);
// let count = 0;

// setInterval(() => {
//   console.clear();
//   if (count % 5 === 0) {
//     createPipe(pipeChar, 18, 1, 3, 2, matrix);
//   }
//   shiftPlayArea(bcChar, matrix);
//   console.log(matrix);
//   count++;
// }, 1000);
