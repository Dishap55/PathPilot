const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

/**
 * Profile Routes
 * Requires authentication on all endpoints.
 * User identity is guaranteed via req.user.id.
 */

// GET /api/profile - Retrieve authenticated student profile
router.get('/', authMiddleware, profileController.getProfile);

// PUT /api/profile - Update authenticated student profile
router.put('/', authMiddleware, profileController.updateProfile);

module.exports = router;
