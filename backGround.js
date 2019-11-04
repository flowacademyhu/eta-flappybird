const bckGrnd = (backLayerChar, row, col) => {
  return Array(row)
    .fill()
    .map(() => Array(col).fill(backLayerChar));
};

const putInSun = (screen, sunChar, hillsChar) => {
  const sunHeight = Math.ceil(screen.length / 6);
  const sunWidth = Math.ceil(screen[0].length / 6);
  for (let s = -2; s < 2; s++) {
    if (s === -2 || s === 1) {
      for (let u = -2; u < 3; u++) {
        if (screen[sunHeight + s][sunWidth + u] !== hillsChar) {
          screen[sunHeight + s][sunWidth + u] = sunChar;
        }
      }
    } else {
      for (let u = -3; u < 4; u++) {
        if (screen[sunHeight + s][sunWidth + u] !== hillsChar) {
          screen[sunHeight + s][sunWidth + u] = sunChar;
        }
      }
    }
  }
};

const removeSun = (backLayerChar, screen, sunChar) => {
  for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[0].length; j++) {
      if (screen[i][j] === sunChar) {
        screen[i][j] = backLayerChar;
      }
    }
  }
};

const fillColoumn = (index, newHght, playBackGround, groundChar, hillsChar) => {
  for (
    let i = playBackGround.length - 1;
    i > playBackGround.length - 1 - newHght;
    i--
  ) {
    if (i > playBackGround.length * 0.8) {
      playBackGround[i][index] = groundChar;
    } else {
      playBackGround[i][index] = hillsChar;
    }
  }
};

module.exports = {
  bckGrnd: bckGrnd,
  putInSun: putInSun,
  removeSun: removeSun,
  fillColoumn: fillColoumn
};
