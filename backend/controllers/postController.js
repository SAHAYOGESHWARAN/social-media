const Post = require('../models/Post');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  const { text, image } = req.body;

  try {
    const newPost = new Post({
      user: req.user._id, // Assuming req.user is available through middleware
      text,
      image,
    });

    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name avatar').sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPost, getAllPosts };
