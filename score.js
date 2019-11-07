const fs = require('fs');
const asTable = require('as-table');
const center = require('center-align');
const figlet = require('figlet');
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
      name: row[0],
      score: row[1]
    };
    highscore.push(tempObj);
  }

  highscore = highscore.sort(function (a, b) {
    return b.score - a.score;
  });
};
const gameover = () => {
  figlet('Game Over !!!', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log((data));
    setTimeout((scores), 3000);
  });
};

const scoretable = () => {
  if (highscore.length < 10) {
    console.log(center((asTable(highscore)), 65));
  } else if (highscore.length >= 10) {
    console.log(center((asTable(highscore.slice(0, 10))), 65));
  }
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
