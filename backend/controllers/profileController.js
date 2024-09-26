const Profile = require('../models/Profile');
const Notification = require('../models/Notification');

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

exports.sendFriendRequest = async (req, res) => {
    // existing logic...
    
    // Create notification
    const notification = new Notification({
        userId: friendId,
        message: `${req.user.username} sent you a friend request!`
    });
    await notification.save();
    
    res.json({ message: 'Friend request sent!' });
};


exports.updateProfile = async (req, res) => {
    const updates = {};
    if (req.file) {
        updates.profilePicture = req.file.path;
    }
    const profile = await Profile.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(profile);
};
