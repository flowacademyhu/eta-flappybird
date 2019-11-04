// a madár tereppel történő ütközésének az ellenőrzése.

const birdCollision = (playArea, birdChar, birdCoordinates) => {
  const areaBottom = playArea.length - 1;
  const birdPos = birdCoordinates[0][1];

  if (playArea[areaBottom][birdPos] === birdChar) {
    return true;
  } else if (playArea[0][birdPos] === birdChar) {
    return true;
  } else return false;
};

const birdPipeCol = (pipeChar, coordinates, area) => {
  for (const i of coordinates) {
    const row = i[0];
    const col = i[1];
    if (area[row][col] === pipeChar) {
      return true;
    } else return false;
  }
};
module.exports = {
  birdCollision: birdCollision,
  birdPipeCol: birdPipeCol
};
