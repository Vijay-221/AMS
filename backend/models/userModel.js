const db = require('../config/db.js');

const findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

const insertUser = (userData, callback) => {
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, userData, callback);
};

module.exports = {
  findUserByEmail,
  insertUser
};