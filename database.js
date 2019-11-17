const mysql = require('mysql');
const config = {
  host: 'remotemysql.com',
  user: 'YndIVQxdNP',
  password: 'JEJdy6dMxw',
  database: 'YndIVQxdNP'
};

let connection;
const insertQuery = (name, score) => {
  return 'INSERT INTO HighScores (name, score) VALUES (\'' + name + '\', ' + score + ');';
};

const createConnection = () => {
  return new Promise((resolve, reject) => {
    connection = mysql.createConnection(config);
    resolve();
  });
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
  const selectQuery = 'SELECT name, score FROM HighScores ORDER BY score DESC, id DESC LIMIT 10';
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

// endConnection()
//   .then(createConnection)
//   .then(() => { insertIntoHighScores('jano1', 20); })
//   .then(() => getHighScores())
//   .then((result) => { console.log(result); })
//   .then(endConnection);

module.exports = {
  createConnection: createConnection,
  insertIntoHighScores: insertIntoHighScores,
  getHighScores: getHighScores,
  endConnection: endConnection
};
