const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bio: {
        type: String,
        default: '',
    },
    profilePicture: {
        type: String,
        default: '', // URL or path to the profile picture
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

module.exports = mongoose.model('Profile', profileSchema);
