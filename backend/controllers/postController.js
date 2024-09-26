const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { userId, content } = req.body;
    try {
        const newPost = new Post({ userId, content });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

exports.commentOnPost = async (req, res) => {
    const { postId, comment } = req.body;
    try {
        const post = await Post.findById(postId);
        post.comments.push({ userId: req.user.id, comment });
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error commenting on post' });
    }
};


exports.likePost = async (req, res) => {
    const { postId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post.likes.includes(req.user.id)) {
            post.likes.push(req.user.id);
        } else {
            post.likes = post.likes.filter(id => id.toString() !== req.user.id);
        }
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error liking post' });
    }
};


exports.createPost = async (req, res) => {
    const post = new Post({
        content: req.body.content,
        media: req.file.path,
        userId: req.user.id
    });
    await post.save();
    res.status(201).json(post);
};
