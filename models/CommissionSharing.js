// models/commissionSharing.js

const mongoose = require('mongoose');

// Define the commission-sharing schema
const commissionSharingSchema = new mongoose.Schema({
  redVision: { type: Number, required: true, default: 20 },
  fixerra: { type: Number, required: true, default: 20 },
  mfd: { type: Number, required: true, default: 60 },
});

// Create the model based on the schema
const CommissionSharing = mongoose.model('CommissionSharing', commissionSharingSchema);

module.exports = CommissionSharing;
