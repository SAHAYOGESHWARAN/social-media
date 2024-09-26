const express = require('express');
const { createOrUpdateProfile, getProfile } = require('../controllers/profileController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();
const upload = require('../middleware/upload');




router.post('/', authenticateToken, createOrUpdateProfile);
router.get('/', authenticateToken, getProfile);

router.post('/send-friend-request', authenticateToken, sendFriendRequest);
router.post('/accept-friend-request', authenticateToken, acceptFriendRequest);
router.post('/like', authenticateToken, likePost);

router.patch('/:id', upload.single('profilePicture'), updateProfile);



module.exports = router;
