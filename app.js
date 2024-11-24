const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Use dotenv to manage environment variables

// Routes imports
const adminRoutes = require('./routes/admin');
const simulatorRoutes = require('./routes/simulator');

// Initialize the Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Use the routes for admin and simulator functionalities
app.use('/admin', adminRoutes);
app.use('/simulator', simulatorRoutes);

// MongoDB connection using environment variables
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Removed deprecated options
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit the process with a failure code
  }
}

// Connect to MongoDB
connectDB();

// Set the server port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
