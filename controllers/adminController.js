const CommissionSharing = require('../models/CommissionSharing'); // Commission model for sharing data
const MFD = require('../models/MFD'); // Import MFD model

// Add commission data for redVision, fixerra, and mfd
exports.addCommission = async (req, res) => {
  const { redVision, fixerra, mfd } = req.body;

  // Ensure that the total percentage is 100%
  if (redVision + fixerra + mfd !== 100) {
    return res.status(400).json({ error: 'Total percentage must equal 100%' });
  }

  try {
    // Create new commission-sharing entry
    const newCommissionData = new CommissionSharing({ redVision, fixerra, mfd });
    await newCommissionData.save();
    res.json({ message: 'Commission data added successfully', data: newCommissionData });
  } catch (err) {
    console.error('Error adding commission data:', err);
    res.status(500).json({ error: 'Failed to add commission data' });
  }
};

// Add or update an MFD (Mutual Fund Distributor)
exports.addOrUpdateMFD = async (req, res) => {
  const { name, uniqueId, commissionShare } = req.body;

  // Ensure all fields are provided
  if (!name || !uniqueId || commissionShare === undefined) {
    return res.status(400).json({ error: 'Name, uniqueId, and commissionShare are required' });
  }

  try {
    // Check if MFD exists, if so update, else create
    let mfd = await MFD.findOne({ uniqueId });

    if (mfd) {
      // Update existing MFD
      mfd.commissionShare = commissionShare;
      await mfd.save();
      res.status(200).json({ message: 'MFD updated successfully', data: mfd });
    } else {
      // Create new MFD
      mfd = new MFD({
        name,
        uniqueId,
        commissionShare,
      });
      await mfd.save();
      res.status(201).json({ message: 'MFD added successfully', data: mfd });
    }
  } catch (err) {
    console.error('Error adding/updating MFD:', err);
    res.status(500).json({ error: 'Failed to add/update MFD' });
  }
};

// Fetch all MFDs
exports.getMFDs = async (req, res) => {
  try {
    const mfdData = await MFD.find();
    res.json({ data: mfdData });
  } catch (err) {
    console.error('Error fetching MFDs:', err);
    res.status(500).json({ error: 'Failed to fetch MFD data' });
  }
};
