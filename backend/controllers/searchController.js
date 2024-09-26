const Profile = require('../models/Profile');
const Post = require('../models/Post');

// Search users by username
exports.searchUsers = async (req, res) => {
    const { query } = req.query;
    const users = await Profile.find({ username: new RegExp(query, 'i') });
    res.json(users);
};

// Search posts by content
exports.searchPosts = async (req, res) => {
    const { query } = req.query;
    const posts = await Post.find({ content: new RegExp(query, 'i') });
    res.json(posts);
};
