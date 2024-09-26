const express = require('express');
const { getUsers } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/users', protect, isAdmin, getUsers);

module.exports = router;
