const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
};
