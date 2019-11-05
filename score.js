const fs = require('fs');
const rl = require('readline-sync');
let array = [];
const name = rl.question('Add meg a neved: ');
const score = rl.question('Adj egy számot: ');
const names = [];
const scores = [];
let highscore = [];

const writeFile = (userName, score) => {
  fs.appendFileSync('score.txt', userName + '\t' + score + '\t', { encoding: 'utf8' });
};

writeFile(name, score);

const content = fs.readFileSync('score.txt', { encoding: 'utf8' });

array = content.split('\t');

for (let i = 0; i < array.length - 1; i += 2) {
  names.push((array[(i)]));
}
for (let i = 0; i < array.length - 1; i += 2) {
  scores.push((array[(i + 1)]));
}

for (let i = 0; i < names.length; i++) {
  highscore.push([names[i], scores[i]]);
}

highscore = highscore.sort(function (a, b) {
  return b[1] - a[1];
});

console.log(highscore);
