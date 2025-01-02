// backend/models/User.js
const bcrypt = require('bcrypt');
const pool = require('../config/db.config');

class User {
    static async create(username, password, role = 'parent') {
        try {
            const [result] = await pool.execute(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [username, password, role]
            );
            return result; // Return result of the insert operation
        } catch (error) {
            console.error('Error inserting user:', error);
            throw error; // Rethrow the error for handling in routes
        }
    }

    static async findByUsername(username) {
        try {
            const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
            console.log('Fetched User:', rows); // Log the fetched user data
            return rows.length > 0 ? rows[0] : null; // Return first matching user or null if not found
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error; // Propagate the error to be handled by the caller
        }
    }
}

module.exports = User;




