const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

/**
 * Admin Routes
 * Endpoints for curriculum management, questions authoring, and platform administration.
 *
 * SECURITY:
 * All admin endpoints strictly require:
 * 1. Valid Supabase authenticated user token (authMiddleware)
 * 2. Active admin role verified via public.is_admin() (adminMiddleware)
 */

router.use(authMiddleware, adminMiddleware);

// Admin health/status check
router.get('/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Endpoint registered',
    adminId: req.user.id
  });
});

// Admin audit log retrieval
router.get('/audit', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Endpoint registered'
  });
});

module.exports = router;
