const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roadmapController = require('../controllers/roadmapController');
const milestoneController = require('../controllers/milestoneController');

/**
 * Roadmap Routes
 *
 * Endpoints for student personalized study roadmaps and milestone levels.
 * All endpoints require authentication via Supabase JWT token.
 * req.user.id is the authoritative identity.
 */

// GET /api/roadmap - Retrieve active roadmap for authenticated student
router.get('/', authMiddleware, roadmapController.getRoadmap);

// POST /api/roadmap/generate - Generate/regenerate personalized roadmap from assessment analysis
router.post('/generate', authMiddleware, roadmapController.generateRoadmap);

// Milestone Learning & Practice Endpoints
// GET /api/roadmap/milestone/:id - Retrieve milestone detail & learning content
router.get('/milestone/:id', authMiddleware, milestoneController.getMilestone);

// GET /api/roadmap/milestone/:id/practice - Retrieve practice exercises for milestone
router.get('/milestone/:id/practice', authMiddleware, milestoneController.getPracticeQuestions);

// POST /api/roadmap/milestone/:id/attempt - Submit practice exercise attempt
router.post('/milestone/:id/attempt', authMiddleware, milestoneController.submitAttempt);

// POST /api/roadmap/milestone/:id/complete - Complete milestone and dynamically unlock next
router.post('/milestone/:id/complete', authMiddleware, milestoneController.completeMilestone);

// POST /api/roadmap/recalibrate - Recalibrate roadmap velocity following reassessment
router.post('/recalibrate', authMiddleware, roadmapController.recalibrateRoadmap);

// GET /api/roadmap/:id - Retrieve roadmap by ID with ownership enforcement
router.get('/:id', authMiddleware, roadmapController.getRoadmapById);

module.exports = router;
