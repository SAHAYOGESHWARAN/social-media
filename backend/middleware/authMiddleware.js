

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from the authorization header

    if (!token) return res.sendStatus(401); // Unauthorized if token is not provided

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.user = user; // Save user info in the request
        next(); // Call the next middleware
    });
}

module.exports = { authenticateToken };
