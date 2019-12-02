const mpg = require('mpg123');
const playDie = new mpg.MpgPlayer();
const playMusic = new mpg.MpgPlayer();
const playWing = new mpg.MpgPlayer();
const playPoint = new mpg.MpgPlayer();

const music = () => {
  try {
    playMusic.play('./lib/sounds/music.mp3');
  } catch (e) {}
};
const point = () => {
  try {
    playPoint.play('./lib/sounds/sfx_point.mp3');
  } catch (e) {}
}
;
const wing = () => {
  try {
    playWing.play('./lib/sounds/sfx_wing.mp3');
  } catch (e) {}
}
;

const die = () => {
  try {
    playDie.play('./lib/sounds/sfx_die.mp3');
  } catch (e) {}
};

module.exports = {
  point: point,
  wing: wing,
  die: die,
  music: music
};
