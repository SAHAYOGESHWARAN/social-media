// routes/user.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken'); // Assuming this middleware is defined correctly

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Assuming you're in your routes/user.js
router.get('/profile', authenticateToken, getUserProfile);


module.exports = router;
