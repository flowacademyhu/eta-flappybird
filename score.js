const fs = require('fs');
const asTable = require('as-table');
const center = require('center-align');
const figlet = require('figlet');
const term = require('terminal-kit').terminal;
const db = require('./database');

let highscore = [];

const writeFile = (userName, score) => {
  fs.appendFileSync('score.txt', userName + ';' + score + '\n', { encoding: 'utf8' });
};

const fileReading = () => {
  const content = fs.readFileSync('score.txt', { encoding: 'utf8' });
  const rows = content.split('\n');

  for (let i = 0; i < rows.length - 1; i++) {
    const row = rows[i].split(';');
    const tempObj = {
      Name: row[0],
      Score: row[1]
    };
    highscore.push(tempObj);
  }

  highscore = highscore.sort(function(a, b) {
    return b.Score - a.Score;
  });
};

const gameover = (name, score) => {
  term.hideCursor();
  figlet('Game Over !!!', function(err, data) {
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
    db.createConnection()
      .then(() => { db.insertIntoHighScores(userName, score); })
      .then(() => db.getHighScores())
      .then((result) => { printHighScore(result); })
      .then(db.endConnection)
      .catch(() => printHighScore(undefined, true));
  } else {
    db.createConnection()
      .then(() => db.getHighScores())
      .then((result) => { printHighScore(result); })
      .then(db.endConnection)
      .catch(() => printHighScore(undefined, true));
  }
};

module.exports = {
  scores: scores,
  gameover: gameover
};
