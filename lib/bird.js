const makeBirdCoordinates = (row, col, length, width) => {
  const birdCoordinates = [];
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < width; j++) {
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

const removeBirdFromPlayArea = (backGroundChar, coordinates, area) => {
  for (const i of coordinates) {
    const row = i[0];
    const col = i[1];
    if (area[row] !== undefined) {
      area[row][col] = backGroundChar;
    }
  }
};

module.exports = {
  makeBirdCoordinates: makeBirdCoordinates,
  changeBirdCoordinates: changeBirdCoordinates,
  putBirdInPlayArea: putBirdInPlayArea,
  removeBirdFromPlayArea: removeBirdFromPlayArea
};
