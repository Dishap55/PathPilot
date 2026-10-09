const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');
const requireAuth = require('../middleware/requireAuth');

router.get('/', requireAuth, roadmapController.getRoadmap);
router.post('/generate', requireAuth, roadmapController.generateRoadmap);
router.get('/milestone/:id', requireAuth, roadmapController.getMilestone);
router.get('/milestone/:id/practice', requireAuth, roadmapController.getPracticeQuestions);
router.post('/milestone/:id/attempt', requireAuth, roadmapController.submitAttempt);
router.post('/milestone/:id/complete', requireAuth, roadmapController.completeMilestone);

module.exports = router;
