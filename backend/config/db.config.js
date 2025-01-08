const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost', // Update with your database host
  user: 'root', // Update with your database user
  password: '*********', // Update with your database password
  database: 'EarlyChildDevelopmentDB' // Update with your database name
});

pool.getConnection()
  .then(() => console.log('Connected to MySQL database!'))
  .catch(err => console.error('Database connection error:', err));

module.exports = pool;
