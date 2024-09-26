const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        likes: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        }],
        
    }],
});

module.exports = mongoose.model('Post', postSchema);
