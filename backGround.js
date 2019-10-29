const sunChar = 'S';
const cloudChar = 'C';
const hillsChar = '~';

const createPlayArea = (row, col) => {
  return Array(row)
    .fill()
    .map(() => Array(col).fill(0));
};

const createBackground = screen => {
  let sunHeight = Math.ceil(screen.length / 6);
  let sunWidth = Math.ceil(screen[0].length / 6);
  for (let s = -1; s < 2; s++) {
    for (let u = -1; u < 2; u++) {
      screen[sunHeight + s][sunWidth + u] = sunChar;
    }
  }
  let cloudHeight = Math.ceil(screen.length / 3);
  let cloudWidth = Math.floor(screen[0].length / 3);
  for (let c = -1; c < 1; c++) {
    for (let l = -2; l < 4; l++) {
      screen[cloudHeight + c][cloudWidth + l] = cloudChar;
    }
  } /*
  let hillsHeight = Math.floor((screen.length / 4) * 3);
  let hillsWidth = screen[0].length;
  for (let h = 0; h < screen.length; h++) {
    for (let i = 0; i < hillsWidth; i++) {
      screen[hillsHeight][i] = hillsChar;
    }
  }*/
};
let screenArr = createPlayArea(20, 20);
createBackground(screenArr);
console.log(screenArr);
