const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
    const { recipientId, content } = req.body;
    const message = new Message({
        sender: req.user.id,
        recipient: recipientId,
        content
    });
    await message.save();
    res.status(201).json(message);
};

// Get messages for a recipient
exports.getMessages = async (req, res) => {
    const messages = await Message.find({
        $or: [
            { sender: req.user.id, recipient: req.params.recipientId },
            { sender: req.params.recipientId, recipient: req.user.id }
        ]
    }).sort({ createdAt: -1 });
    res.json(messages);
};
