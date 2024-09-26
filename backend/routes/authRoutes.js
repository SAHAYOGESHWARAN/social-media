const express = require('express');
const { register, login, getProfile, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.route('/register').post(register);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.route('/login').post(login);

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
router.route('/profile').get(protect, getProfile);

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Private
router.route('/reset-password').post(protect, resetPassword);

module.exports = router;
