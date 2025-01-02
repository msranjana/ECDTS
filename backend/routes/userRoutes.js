// backend/routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const pool = require('../config/db.config'); // Adjust path as necessary

const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController'); // Adjust path as necessary

router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (!username || !password || !role) {
            return res.status(400).json({ error: 'Username , password and role are required' });
        }

        const result = await registerUser(username, password, role);
        console.log('User Object from loginUser:', user);

        
        if (!result.success) {
            return res.status(400).json({ error: result.message });
        }

        return res.status(201).json({ message: result.message, id: result.id });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await loginUser(username, password);
        console.log(user);
        if(user.success===false)
            return res.status(401).json({ error: error.message });
        // return res.status(200).json({ message: 'Login successful', user });
        return res.status(200).json({
            message: 'Login successful',
            id: user.user.id,
            username: user.user.username,
            role: user.user.role
        });
    } catch (error) {
        console.error('Error logging in:', error);
        
        return res.status(401).json({ error: error.message });
    }
});


module.exports = router;
