const profileRoutes = require('./profileRoutes');
app.use('/api/profiles', profileRoutes);


const express = require('express');
const { searchUsers, searchPosts } = require('../controllers/searchController');
const router = express.Router();
const { getNotifications } = require('../controllers/notificationController');

router.get('/search/users', searchUsers);
router.get('/search/posts', searchPosts);
router.get('/notifications', getNotifications);

module.exports = router;
