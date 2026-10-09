const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const reassessmentController = require('../controllers/reassessmentController');

/**
 * Reassessment Routes
 *
 * Endpoints for scheduled and triggered periodic reassessments.
 * All endpoints require valid JWT authentication.
 * req.user.id is the authoritative, immutable student identity.
 */

// GET /api/reassessment/eligibility - Check if student is eligible for reassessment
router.get('/eligibility', authMiddleware, reassessmentController.checkEligibility);

// POST /api/reassessment/start - Initialize a new periodic reassessment session
router.post('/start', authMiddleware, reassessmentController.startReassessment);

// POST /api/reassessment/trigger - Backwards-compatible alias for start
router.post('/trigger', authMiddleware, reassessmentController.startReassessment);

// POST /api/reassessment/:id/submit - Submit answers and evaluate reassessment
router.post('/:id/submit', authMiddleware, reassessmentController.submitReassessment);

// GET /api/reassessment/:id - Retrieve specific reassessment details & comparison
router.get('/:id', authMiddleware, reassessmentController.getReassessmentById);

// GET /api/reassessment - Retrieve historical reassessments for student
router.get('/', authMiddleware, reassessmentController.getStudentReassessments);

module.exports = router;
