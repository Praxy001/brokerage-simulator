const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Import admin controller

/**
 * Add commission data
 * Endpoint: POST /admin/add-commission
 * Request Body: { redVision, fixerra, mfd }
 * Response: Success message and updated commission settings
 */
router.post('/add-commission', adminController.addCommission);

/**
 * Route to add or update an MFD
 * Endpoint: POST /admin/add-or-update-mfd
 * Request Body: { name, uniqueId, commissionShare }
 * Response: Success message and MFD data
 */
router.post('/add-or-update-mfd', adminController.addOrUpdateMFD);

/**
 * Route to get all MFDs
 * Endpoint: GET /admin/all-mfds
 * Response: List of all MFDs
 */
router.get('/all-mfds', adminController.getMFDs);

/**
 * Fallback for unmatched routes in the admin module
 * Endpoint: (Any other unmatched routes under /admin)
 * Response: Route not found error
 */
router.use((req, res) => {
  res.status(404).json({ error: 'Route not found in /admin' });
});

module.exports = router;
