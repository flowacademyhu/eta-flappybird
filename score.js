const fs = require('fs');
const asTable = require('as-table');
const center = require('center-align');
const figlet = require('figlet');
const term = require('terminal-kit').terminal;

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
const gameover = () => {
  term.dim.bold.inverse.blue(true);
  figlet('Game Over !!!', function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    term.dim.bold.inverse.blue(false);
    console.log(data);
    setTimeout(scores, 2000);
  });
};

const scoretable = () => {
  if (highscore.length < 10) {
    console.log(center(asTable(highscore), 65));
  } else if (highscore.length >= 10) {
    console.log(center(asTable(highscore.slice(0, 10)), 65));
  }
  highscore = [];
  console.log();
  term.dim.bold.inverse.blue(true);
  console.log(center('Play = r          Exit = q', 63));
  term.dim.bold.inverse.blue(false);
};
const scores = () => {
  fileReading();
  scoretable();
};

module.exports = {
  writeFile: writeFile,
  scores: scores,
  gameover: gameover
};
