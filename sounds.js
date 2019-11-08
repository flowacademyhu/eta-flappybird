const mpg = require('mpg123');
const playDie = new mpg.MpgPlayer();
const playMusic = new mpg.MpgPlayer();
const playWing = new mpg.MpgPlayer();
const playPoint = new mpg.MpgPlayer();

const music = () => {
  playMusic.play('music.mp3');
};
const point = () => {
  playPoint.play('sfx_point.mp3');
}
;
const wing = () => {
  playWing.play('sfx_wing.mp3');
}
;

const die = () => {
  playDie.play('sfx_die.mp3');
};

module.exports = {
  point: point,
  wing: wing,
  die: die,
  music: music
};
