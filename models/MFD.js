const mongoose = require('mongoose');

// Define the MFD (Mutual Fund Distributor) schema
const mfdSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  uniqueId: { type: String, required: true, unique: true },
  commissionShare: { type: Number, required: true, min: 0, max: 100 }
}, { timestamps: true });  // Adds createdAt and updatedAt

// Export the model
module.exports = mongoose.model('MFD', mfdSchema);
