// backend/middleware/authenticateToken.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mySuperSecretKey123!@#'; // Store in .env file in production

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Save user info to request
        next();
    });
}

module.exports = authenticateToken;
