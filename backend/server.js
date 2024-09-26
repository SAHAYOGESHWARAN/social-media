const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
connectDB();


// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files from uploads directory
app.use(authMiddleware.authenticateToken);

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
