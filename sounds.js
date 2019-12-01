const mpg = require('mpg123');
const playDie = new mpg.MpgPlayer();
const playMusic = new mpg.MpgPlayer();
const playWing = new mpg.MpgPlayer();
const playPoint = new mpg.MpgPlayer();

const music = () => {
  try {
    playMusic.play('music.mp3');
  } catch (e) {}
};
const point = () => {
  try {
    playPoint.play('sfx_point.mp3');
  } catch (e) {}
}
;
const wing = () => {
  try {
    playWing.play('sfx_wing.mp3');
  } catch (e) {}
}
;

const die = () => {
  try {
    playDie.play('sfx_die.mp3');
  } catch (e) {}
};

module.exports = {
  point: point,
  wing: wing,
  die: die,
  music: music
};
