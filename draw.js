const axel = require('axel');

const foreG = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const backG = [
  [0, 0, 'f', 'f', 'f', 0, 0, 0, 0],
  [0, 0, 'f', 'f', 'f', 0, 0, 0, 0],
  [0, 0, 'f', 'f', 'f', 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 'b', 0, 0, 0, 0, 'n', 'n', 'n'],
  ['b', 'b', 'b', 0, 0, 0, 'n', 'n', 'n'],
  [0, 'b', 0, 0, 0, 0, 'n', 'n', 'n']
];

// Az előtér, illetve háttér kirajzolása.

const draw = (foreGround, backGround) => {
  for (let i = 0; i < foreGround.length; i++) {
    let line = '';
    for (let j = 0; j < foreGround[i].length; j++) {
      if (foreGround[i][j] === '0') {
        line = line + backGround[i][j];
      } else {
        line = line + foreGround[i][j];
      }
    }
    process.stdout.write(line);
    console.log();
  }
};

// nem túl szép
const drawWithAxel = (foreGround, birdChar = 'B', pipeChar = 'P') => {
  console.clear();
  for (let i = 0; i < foreGround.length; i++) {
    for (let j = 0; j < foreGround[0].length; j++) {
      switch (foreGround[i][j]) {
        case birdChar:
          axel.bg(255, 0, 0);
          break;
        case pipeChar:
          axel.bg(0, 255, 0);
          break;
        default:
          axel.bg(255, 255, 255);
          break;
      }
      axel.box(j + 1, i + 1, 1, 1);
    }
  }
};

module.exports = {
  draw: draw,
  drawWithAxel: drawWithAxel
};
