
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'msranjana', // Your MySQL password
    database: 'EarlyChildDevelopmentDB', // Your database name
});

pool.getConnection()
    .then(() => console.log('Connected to MySQL database!'))
    .catch(err => console.error('Database connection error:', err));
    
    
module.exports = pool;