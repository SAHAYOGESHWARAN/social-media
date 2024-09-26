
const multer = require('multer');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Adjust the path where you want to save uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

// Initialize upload
const upload = multer({ storage });

module.exports = upload;
