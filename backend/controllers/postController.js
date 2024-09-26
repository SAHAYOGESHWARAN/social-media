// controllers/postController.js

const Post = require('../models/Post');

// Create a new post
const createPost = async (req, res) => {
    const { content } = req.body; // User ID is taken from req.user
    try {
        const post = new Post({
            content,
            media: req.file ? req.file.path : null, // Handle media if it exists
            userId: req.user.id
        });
        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username');
        res.status(200).json(posts);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

// Comment on a post
const commentOnPost = async (req, res) => {
    const { postId, comment } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.comments.push({ userId: req.user.id, comment });
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error commenting on post', error: error.message });
    }
};

// Like or unlike a post
const likePost = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!post.likes.includes(req.user.id)) {
            post.likes.push(req.user.id); // Like the post
        } else {
            post.likes = post.likes.filter(id => id.toString() !== req.user.id); // Unlike the post
        }
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error liking post', error: error.message });
    }
};

// Export the functions
module.exports = { createPost, getPosts, commentOnPost, likePost };
