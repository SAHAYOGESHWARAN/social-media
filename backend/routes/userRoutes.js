const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.route('/profile').get(protect, getUserProfile);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.route('/profile').put(protect, updateUserProfile);

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
router.route('/account').delete(protect, deleteUser);

module.exports = router;
