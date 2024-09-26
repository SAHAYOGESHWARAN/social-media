const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllUsers, deleteUser } = require('../controllers/adminController');

const router = express.Router();

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
router.route('/users').get(protect, admin, getAllUsers);

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
router.route('/users/:id').delete(protect, admin, deleteUser);

module.exports = router;
