const draw = (foreGround, backGround) => {
  for (let i = 0; i < foreGround.length; i++) {
    for (let j = 0; j < foreGround.length; j++) {
      if (j === '0') {
        console.log(backGround[i][j]);
      }
    }
  }
}
;