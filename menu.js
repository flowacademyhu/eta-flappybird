const term = require('terminal-kit').terminal;
require('terminal-kit-plugins').plugin(term);
const center = require('center-align');
const main = require('./main');

const logoF = [
  ['╔═════════════════════════════════════════════════════════╗'],
  ['║  _______ _                         ______ _          _  ║'],
  ['║ (_______) |                       (____  (_)        | | ║'],
  ['║  _____  | | ____ ____  ____  _   _ ____) )_  ____ _ | | ║'],
  ['║ |  ___) | |/ _  |  _ ||  _ || | | |  __ (| |/ ___) || | ║'],
  ['║ | |     | ( ( | | | | | | | | |_| | |__) ) | |  ( (_| | ║'],
  ['║ |_|     |_|_ ||_| ||_/| ||_/ __ | |_____/|_|_|   (____| ║'],
  ['║                 |_|   |_|   (____/                 v1.0 ║'],
  ['╚═════════════════════════════════════════════════════════╝']
];
const drawLogo = foreGround => {
  term.dim.bold.inverse.darkColor(4)(true);
  for (let i = 0; i < foreGround.length; i++) {
    let line = '';
    for (let j = 0; j < foreGround[i].length; j++) {
      line = line + foreGround[i][j];
      process.stdout.write(line);
      console.log();
    }
  }
  term.dim.bold.inverse.darkColor(4)(false);
};

const items = ['                        PLAY                        ', '                       BEST SCORES                        ', '                        EXIT                        '];
const options = {
  y: 11
};

term.clear();
drawLogo(logoF);

term
  .bold()
  .setDefaultBgColorRgb(0, 25, 51)
  .colorRgb(174, 88, 23)
  .hideCursor();

term.singleColumnMenu(center(items), options, (Error, response) => {
  switch (response.selectedIndex) {
    case 0:
      term.styleReset();
      term.resetDefaultColorRgb();
      term.resetDefaultBgColorRgb();
      term.resetCursorColorRgb();
      term.resetHighlightBgColorRgb();
      term.reset();
      main.initGame();
      main.driverInterval();
      break;
    case 1:
      term.styleReset();
      term.resetDefaultColorRgb();
      term.resetDefaultBgColorRgb();
      term.resetCursorColorRgb();
      term.resetHighlightBgColorRgb();
      term.reset();
      term.red.blink.inverse('Showing ScoreBoard...');
      console.log('\n');
      break;
    case 2:
      term.styleReset();
      term.resetDefaultColorRgb();
      term.resetDefaultBgColorRgb();
      term.resetCursorColorRgb();
      term.resetHighlightBgColorRgb();
      term.reset();
      term.brightMagenta.blink.inverse('Game closed');
      console.log('\n');
  }
  process.exit();
});
