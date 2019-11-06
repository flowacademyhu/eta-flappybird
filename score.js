const fs = require('fs');
const asTable = require('as-table');
console.clear();
console.clear();
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

const scoretable = () => {
  // console.log(highscore);
  console.log(asTable(highscore));
};
const scores = () => {
  fileReading();
  scoretable();
};

module.exports = {
  writeFile: writeFile,
  scores: scores
};
