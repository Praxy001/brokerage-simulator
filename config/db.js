// config/db.js

const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables

// MongoDB connection function
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with an error code
  }
}

module.exports = connectDB;
