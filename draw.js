// Az előtér, illetve háttér kirajzolása.

const draw = (foreGround, backGround) => {
  for (let i = 0; i < foreGround.length; i++) {
    let line = '';
    for (let j = 0; j < foreGround[i].length - foreGround[i].length * 0.1; j++) {
      if (foreGround[i][j] === '0' || i === foreGround.length - 1 || i === foreGround.length - 2) {
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
