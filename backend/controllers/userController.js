// controllers/userController.js
const bcrypt = require('bcrypt');
const db = require('../config/db.config'); // Adjust path as necessary
const User = require('../models/User'); // Adjust path as necessary

// Function to register a new user
async function registerUser(username, password, role) {
    try {
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            console.warn(`Registration failed: Username '${username}' already taken.`);
            return { success: false, message: 'Username already taken' };
        }
        
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const result = await User.create(username, hashedPassword, role); // Store hashed password

        console.log(`User registered successfully with ID: ${result.insertId}`); // Log successful registration
        return { success: true, message: 'User registered successfully', id: result.insertId };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, message: 'An error occurred during registration. Please try again.' };
    }
}

// Function to log in a user
async function loginUser(username, password) {
    try {
        // Attempt to find the user by username
        const user = await User.findByUsername(username);
        
        // If user not found, log and return a structured response
        if (!user) {
            console.warn(`Login attempt failed: User ${username} not found.`);
            return { success: false, message: 'user not found ic 2' };
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log(isPasswordCorrect)
        // If password does not match, log and return a structured response
        if (!isPasswordCorrect) {
            console.warn(`Login attempt failed: Incorrect password for user ${username}.`);
            return { success: false, message: 'Invalid credentials u got' };
        }

        // If login is successful, return user details
        return { success: true,
                 message: 'Login successful', 
                 user: { 
                    id: user.id, 
                    username: user.username, 
                    role: user.role } };
    } catch (error) {
        console.error('Error during login:', error);
        throw new Error('An error occurred during login. Please try again later.');
    }
}

// Exporting both functions for use in routes
module.exports = { registerUser, loginUser };