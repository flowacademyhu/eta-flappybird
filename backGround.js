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

const generateStartBackground = (
  playBackGround,
  hillsHeight,
  groundChar,
  hillsChar
) => {
  // generates a full "landscape" of hills at start
  for (let j = 0; j <= playBackGround[0].length - 1; j++) {
    let newHght = hillsHeight[0];
    if (j % 2 === 0) {
      const min = hillsHeight[0] - 1;
      const max = hillsHeight[0] + 1;
      newHght = Math.random() * (max - min) + min;
    }
    if (newHght < playBackGround.length * 0.3) {
      newHght += 2;
    }
    if (newHght > playBackGround[0].length * 0.85) {
      newHght -= 2;
    }
    fillColoumn(j, newHght, playBackGround, groundChar, hillsChar);
    hillsHeight[0] = newHght;
  }
};

const appendBackground = (
  hillsHeight,
  playBackGround,
  groundChar,
  hillsChar
) => {
  // generates new "hills" (coloumns) after frame 0
  let newHght = hillsHeight[0];
  const min = hillsHeight[0] - 1;
  const max = hillsHeight[0] + 1;
  newHght = Math.random() * (max - min) + min;
  if (newHght < playBackGround.length * 0.4) {
    newHght += 1;
  }
  if (newHght > playBackGround.length * 0.85) {
    newHght -= 1;
  }
  fillColoumn(
    playBackGround[0].length - 1,
    newHght,
    playBackGround,
    groundChar,
    hillsChar
  );
  hillsHeight[0] = newHght;
};

module.exports = {
  bckGrnd: bckGrnd,
  putInSun: putInSun,
  removeSun: removeSun,
  fillColoumn: fillColoumn,
  generateStartBackground: generateStartBackground,
  appendBackground: appendBackground
};
