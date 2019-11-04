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
    for (let j = 0; j < foreGround[i].length - 15; j++) {
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

module.exports = {
  draw: draw
};

// draw(backG, foreG);
