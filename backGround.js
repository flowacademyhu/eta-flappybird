const bckGrnd = (row, col) => {
  return Array(row)
    .fill()
    .map(() => Array(col).fill(' '));
};

const putInSun = screen => {
  const sunHeight = Math.ceil(screen.length / 6);
  const sunWidth = Math.ceil(screen[0].length / 6);
  for (let s = -2; s < 2; s++) {
    if (s === -2 || s === 1) {
      for (let u = -2; u < 3; u++) {
        if (screen[sunHeight + s][sunWidth + u] !== '░') {
          screen[sunHeight + s][sunWidth + u] = 'S';
        }
      }
    } else {
      for (let u = -3; u < 4; u++) {
        if (screen[sunHeight + s][sunWidth + u] !== '░') {
          screen[sunHeight + s][sunWidth + u] = 'S';
        }
      }
    }
  }
};

const removeSun = (backgroundChar, screen) => {
  for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[0].length; j++) {
      if (screen[i][j] === 'S') {
        screen[i][j] = backgroundChar;
      }
    }
  }
};

const fillColoumn = (index, newHght, playBackGround) => {
  for (
    let i = playBackGround.length - 1;
    i > playBackGround.length - 1 - newHght;
    i--
  ) {
    if (i > playBackGround.length * 0.8) {
      playBackGround[i][index] = '~';
      playBackGround[i][index + 1] = '=';
    } else {
      playBackGround[i][index] = '░';
    }
  }
};

module.exports = {
  bckGrnd: bckGrnd,
  putInSun: putInSun,
  removeSun: removeSun,
  fillColoumn: fillColoumn
};
