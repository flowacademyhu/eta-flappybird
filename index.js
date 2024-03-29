const menu = require('./menu');
const main = require('./main');
const sounds = require('./sounds');
sounds.music();
setInterval(sounds.music, 310000);

const stdInput = () => {
  /** standard input **/
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf-8');
  stdin.on('data', key => {
    if (key === 'q') {
      console.clear();
      process.exit();
    }
    if (key === ' ' && main.playObject.playMode) {
      sounds.wing();
      main.playObject.birdSpeed = main.playObject.birdFlyAcceleration;
    }
    if (key === 'r' && !main.playObject.playMode) {
      if (main.playObject.name === undefined) {
        stdin.pause();
        menu.getInput();
      } else {
        main.initGame(main.playObject.name);
        main.play();
      }
    }
    if (key === 'm') {
      if (main.playObject.game !== undefined) {
        clearInterval(main.playObject.game);
      }
      main.playObject.playMode = false;
      stdin.pause();
      menu.getMenu();
    }
  });
};

stdInput();
process.stdin.pause();
menu.getMenu();
