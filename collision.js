// a madár tereppel történő ütközésének az ellenőrzése.

const birdCollision = (playArea, birdChar) => {
  if (playArea[19][10] === birdChar) {
    process.exit();
  } else if (playArea[0][10] === birdChar) {
    process.exit();
  }
};

const birdPipeCol = (pipeChar, coordinates, area) => {
  for (const i of coordinates) {
    const row = i[0];
    const col = i[1];
    if (area[row][col] === pipeChar) {
      process.exit();
    }
  }
};
module.exports = {
  birdCollision: birdCollision,
  birdPipeCol: birdPipeCol
};
