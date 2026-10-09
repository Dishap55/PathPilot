const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Dashboard Routes
 * Endpoints for aggregated student metrics, study stats, and dashboard overview.
 */

// Retrieve dashboard summary for authenticated student
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Endpoint registered'
  });
});

module.exports = router;
