// two array-generators for testing
let frGrnd = Array(100)
  .fill()
  .map(() => Array(150).fill('0'));

let bckGrnd = Array(100)
  .fill()
  .map(() => Array(150).fill(' '));

// function, fills the coloumns with letter 'H'
const fillColoumn = (index, newHght) => {
  for (let i = bckGrnd.length - 1; i > bckGrnd.length - 1 - newHght; i--) {
    bckGrnd[i][index] = 'H';
  }
};

// driver function, generates random height for next coloumn, based on prev. height
let height = [6];
for (let j = 0; j <= bckGrnd[0].length - 1; j++) {
  const min = height[0] - 1;
  const max = height[0] + 1;
  const newHght = Math.random() * (max - min) + min;
  fillColoumn(j, newHght);
  height[0] = newHght;
}

// imported draw function for testing
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
draw(frGrnd, bckGrnd);
