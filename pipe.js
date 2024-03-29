const colors = require('colors');

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

const createPipe = (pipeCounter, pipeChar, pipeShade, col, width, gapStartLoc, gapLength, matrix) => {
  const colIndexes = getPipeColIndexes(matrix.length, gapStartLoc, gapLength);

  for (const i of colIndexes) {
    for (let j = 0; j < width; j++) {
      if (i === gapStartLoc - 1 || i === gapStartLoc + gapLength) {
        if (j === 5) {
          matrix[i][col + j] = pipeShade;
        }
        matrix[i][col - 1] = pipeChar;
        matrix[i][col + j] = pipeChar;
        matrix[i][col + j + 1] = pipeChar;
      }
      if (i === gapStartLoc - 2 && j === 3) {
        const arr = String(pipeCounter).split('');
        arr.push(' ', ' ');
        for (let k = 0; k < arr.length; k++) {
          matrix[i][col + 1 + k] = arr[k].white.bold.bgGreen;
        }
      }
      if (i !== gapStartLoc - 1 && i !== gapStartLoc + gapLength && j === 4) {
        matrix[i][col + j] = '█'.dim.white;
      } else {
        matrix[i][col + j] = pipeChar;
      }
    }
  }
};

const getRand = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getRandomPipeParams = (minGapStart, maxGapStart, minGapLen, maxGapLen, minWidth = 3, maxWidth = 3) => {
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
