const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Protect route and only allow users
router.get('/profile', protect, authorize('user', 'admin'), getUserProfile);
router.put('/profile', protect, authorize('user', 'admin'), updateUserProfile);

module.exports = router;
