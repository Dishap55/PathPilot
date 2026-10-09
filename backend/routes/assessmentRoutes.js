const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const assessmentController = require('../controllers/assessmentController');

/**
 * Assessment Routes
 *
 * Implements endpoints for diagnostic, modular, and reassessments.
 * All endpoints require authentication via Supabase JWT token.
 * req.user.id is the authoritative identity.
 */

// GET /api/assessment/initial - Retrieve diagnostic context & student preparation status
router.get('/initial', authMiddleware, assessmentController.getInitialContext);

// GET /api/assessment/input/:subject? - Retrieve structured Assessment Input (Step 1)
router.get('/input', authMiddleware, assessmentController.getAssessmentInput);
router.get('/input/:subject', authMiddleware, assessmentController.getAssessmentInput);

// POST /api/assessment/start - Initialize or resume diagnostic assessment
router.post('/start', authMiddleware, assessmentController.startAssessment);

// GET /api/assessment/result/:id - Retrieve scored diagnostic assessment result
router.get('/result/:id', authMiddleware, assessmentController.getResult);

// GET /api/assessment/:id - Retrieve active assessment questions
router.get('/:id', authMiddleware, assessmentController.getAssessment);

// POST /api/assessment/:id/submit - Submit answers and calculate objective score
router.post('/:id/submit', authMiddleware, assessmentController.submitAssessment);

// Sandbox execution routes for test runs during assessment
router.post('/code/run', authMiddleware, assessmentController.runCode);
router.post('/sql/run', authMiddleware, assessmentController.runSql);

module.exports = router;
