const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Question Routes
 * Endpoints for retrieving questions, metadata, and options.
 */

// Retrieve questions by topic or template
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Endpoint registered'
  });
});

// Retrieve specific question details
router.get('/:id', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Endpoint registered'
  });
});

module.exports = router;
