const express = require('express');
const router = express.Router();
const { createPost, getPosts, commentOnPost } = require('../controllers/postController'); // Make sure to include commentOnPost
const upload = require('../middleware/upload');
const { authenticateToken } = require('../middleware/authMiddleware'); // Ensure you import authenticateToken from the correct path

// Route to create a post
router.post('/', upload.single('media'), createPost);

// Route to get all posts
router.get('/', getPosts);

// Route to comment on a post
router.post('/comment', authenticateToken, commentOnPost);

module.exports = router;
