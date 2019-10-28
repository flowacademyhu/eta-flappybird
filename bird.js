// ha (-) felfele, ha (+) lefele megy a madár
let birdSpeed = 0;
const birdJumpSpeed = 3;

const makeBirdCoordinates = (row, col, length, width) => {
  const birdCoordinates = [];
  for (let i = -length; i <= length; i++) {
    for (let j = -width; j <= width; j++) {
      birdCoordinates.push([row + i, col + j]);
    }
  }
  return birdCoordinates;
};

const changeBirdSpeed = (pressedJump = false) => {
  if (pressedJump) {
    if (birdSpeed > 0) birdSpeed = 0;
    birdSpeed -= birdJumpSpeed;
  } else {
    birdSpeed++;
  }
};

const changeBirdCoordinates = (coordinates, speed) => {
  for (const i of coordinates) {
    i[0] = i[0] + speed;
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

// test
const createPlayArea = (row, col) => {
  return Array(row).fill().map(() => (Array(col).fill(0)));
};

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', (key) => {
  if (key === 'q') {
    process.exit();
  }
  if (key === 'j') {
    changeBirdSpeed(true);
  }
});

const birdCoordinates = makeBirdCoordinates(1, 3, 0, 0);

setInterval(() => {
  console.clear();
  const matrix = createPlayArea(20, 7);
  changeBirdCoordinates(birdCoordinates, birdSpeed);
  putBirdInPlayArea(5, birdCoordinates, matrix);
  changeBirdSpeed();
  console.log(matrix);
}, 500);
