const asTable = require('as-table');
const center = require('center-align');
const figlet = require('figlet');
const term = require('terminal-kit').terminal;
const db = require('./database');

let highscore = [];

const gameover = (name, score) => {
  term.hideCursor();
  figlet('Game Over !!!', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
    setTimeout(() => { scores(name, score, true); }, 1500);
  });
};

const printHighScore = (result, noResult = false) => {
  if (noResult) {
    console.log(center('can not connect to db', 65));
  } else {
    highscore = result;
    console.log(center(asTable(highscore), 65));
    highscore = [];
  }
  console.log();
  term.dim.bold.inverse.blue(true);
  console.log(center('    Play = r     Menu = m     Exit = q    ', 63));
  term.dim.bold.inverse.blue(false);
};

const scores = (userName, score, addScore = false) => {
  if (addScore) {
    db.getScoresFromDB(printHighScore, userName, score);
  } else {
    db.getScoresFromDB(printHighScore);
  }
};

module.exports = {
  scores: scores,
  gameover: gameover
};
