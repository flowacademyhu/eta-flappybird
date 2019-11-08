const mpg = require('mpg123');
const player = new mpg.MpgPlayer();

const point = () => {
  player.play('sfx_point.mp3');
}
;
const wing = () => {
  player.play('sfx_wing.mp3');
}
;

const die = () => {
  player.play('sfx_die.mp3');
};

module.exports = {
  point: point,
  wing: wing,
  die: die
};
