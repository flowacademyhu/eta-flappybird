// ha (-) felfele, ha (+) lefele megy a madár
// let birdSpeed = 0;
// const birdFlyAcceleration = 3;

const makeBirdCoordinates = (row, col, length, width) => {
  const birdCoordinates = [];
  for (let i = -length; i <= length; i++) {
    for (let j = -width; j <= width; j++) {
      birdCoordinates.push([row + i, col + j]);
    }
  }
  return birdCoordinates;
};

const changeBirdCoordinates = (coordinates, speed) => {
  for (const i of coordinates) {
    i[0] = i[0] - speed;
  }
};

const putBirdInPlayArea = (birdChar, coordinates, area) => {
  for (const i of coordinates) {
    const row = i[0];
    const col = i[1];
    if (area[row] !== undefined) {
      area[row][col] = birdChar;
    }
  }
};

const removeBirdFromPlayArea = (birdChar, backgroundChar, area) => {
  for (const arr of area) {
    arr.forEach((val, i) => {
      if (val === birdChar) arr[i] = backgroundChar;
    });
  }
};

module.exports = {
  makeBirdCoordinates: makeBirdCoordinates,
  changeBirdCoordinates: changeBirdCoordinates,
  putBirdInPlayArea: putBirdInPlayArea,
  removeBirdFromPlayArea: removeBirdFromPlayArea
};

// test
// const createPlayArea = (row, col) => {
//   return Array(row).fill().map(() => (Array(col).fill(0)));
// };

// const stdin = process.stdin;
// stdin.setRawMode(true);
// stdin.resume();
// stdin.setEncoding('utf-8');
// stdin.on('data', (key) => {
//   if (key === 'q') {
//     process.exit();
//   }
//   if (key === 'j') {
//     birdSpeed = birdFlyAcceleration;
//   }
// });

// const birdCoordinates = makeBirdCoordinates(1, 3, 0, 0);
// const matrix = createPlayArea(20, 7);
// putBirdInPlayArea(5, birdCoordinates, matrix);

// let countRounds = 0;
// setInterval(() => {
//   if (countRounds % 6 === 0) birdSpeed--;
//   console.clear();
//   removeBirdFromPlayArea(5, 0, matrix);
//   changeBirdCoordinates(birdCoordinates, birdSpeed);
//   putBirdInPlayArea(5, birdCoordinates, matrix);
//   console.log(matrix);
// }, 200);
