const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB - making connection optional for development
try {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/student-teacher-db')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Running without MongoDB - using mock data'));
} catch (error) {
  console.log('Running without MongoDB - using mock data');
}

// Import routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const resourceRoutes = require('./routes/resources');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/resources', resourceRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Student-Teacher Dashboard API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));