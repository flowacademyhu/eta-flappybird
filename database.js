const mysql = require('mysql');
const config = {
  host: 'remotemysql.com',
  user: 'YndIVQxdNP',
  password: 'JEJdy6dMxw',
  database: 'YndIVQxdNP'
};

const connection = mysql.createConnection(config);
const insertQuery = (name, score) => {
  return 'INSERT INTO HighScores (name, score) VALUES (\'' + name + '\', ' + score + ');';
};

const insertIntoHighScores = (name, score) => {
  return new Promise((resolve, reject) => {
    connection.query(insertQuery(name, score), (err, result) => {
      if (err) throw err;
      resolve();
    });
  });
};

const getHighScores = () => {
  const selectQuery = 'SELECT * FROM HighScores';
  return new Promise((resolve, reject) => {
    connection.query(selectQuery, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
};

const endConnection = () => {
  return new Promise((resolve, reject) => {
    connection.end();
    resolve();
  });
};

const logScores = () => {
  getHighScores()
    .then((result) => {
      console.log(result);
    })
    .then(() => { return endConnection(); });
};

// MŰKÖDIK!!!
// insertIntoHighScores('thelegend27', 999)
//   .then(() => getHighScores())
//   .then((result) => { console.log(result); })
//   .then(endConnection);

module.exports = {
  insertIntoHighScores: insertIntoHighScores,
  getHighScores: getHighScores,
  endConnection: endConnection
};
