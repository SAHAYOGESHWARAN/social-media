const Profile = require('../models/Profile');

exports.createOrUpdateProfile = async (req, res) => {
    const { bio, profilePicture } = req.body;
    try {
        const profile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            { bio, profilePicture },
            { new: true, upsert: true }
        );
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user.id });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
};


exports.sendFriendRequest = async (req, res) => {
    const { friendId } = req.body;
    try {
        const profile = await Profile.findOne({ userId: req.user.id });
        if (!profile.friends.includes(friendId)) {
            profile.friends.push(friendId);
            await profile.save();
        }
        res.status(200).json({ message: 'Friend request sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending friend request' });
    }
};

exports.acceptFriendRequest = async (req, res) => {
    const { friendId } = req.body;
    try {
        const profile = await Profile.findOne({ userId: req.user.id });
        if (!profile.friends.includes(friendId)) {
            profile.friends.push(friendId);
            await profile.save();
        }
        res.status(200).json({ message: 'Friend request accepted' });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting friend request' });
    }
};
