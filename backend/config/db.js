// backend/config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,       // e.g. 'localhost'
  user: process.env.DB_USER,       // your MySQL username
  password: process.env.DB_PASSWORD, // your MySQL password
  database: process.env.DB_NAME,   // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;
