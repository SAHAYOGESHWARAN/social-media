const { verify } = require('jsonwebtoken'); // Assuming you're using JWT for authentication
const User = require('../models/User'); // Import the User model

// Middleware to check if the user has the required role
const roleCheck = (roles) => {
    return async (req, res, next) => {
        try {
            // Get the token from the headers
            const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
                ? req.headers.authorization.split(' ')[1] 
                : null;

            if (!token) {
                return res.status(401).json({ message: 'Not authorized, no token' });
            }

            // Verify the token and get the user ID
            const decoded = verify(token, process.env.JWT_SECRET); // Ensure you have a JWT_SECRET in your .env file
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the user role matches one of the required roles
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied, insufficient permissions' });
            }

            next(); // User is authorized, proceed to the next middleware/route handler
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    };
};

module.exports = roleCheck;
