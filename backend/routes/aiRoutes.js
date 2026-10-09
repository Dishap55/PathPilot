const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const personalizationService = require('../services/personalizationService');
const aiService = require('../services/aiService');
const aiController = require('../controllers/aiController');

/**
 * AI Routes
 * Endpoints for AI assessment analysis, mentor hints, and structured explanations.
 */

// Rate limiter placeholder
const aiRateLimiter = (req, res, next) => {
  next();
};

// POST /api/ai/analyze - Trigger AI analysis on diagnostic assessment evidence
router.post('/analyze', authMiddleware, aiRateLimiter, aiController.analyzeAssessment);

// GET /api/ai/context - Retrieve student's active personalization context
router.get('/context', authMiddleware, async (req, res, next) => {
  try {
    const subjectCode = req.query.subject || 'DSA';
    const context = await personalizationService.getStudentContext(req.user.id, subjectCode, req.token);

    res.status(200).json({
      success: true,
      context
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/ai/hint - Generate progressive hint tailored to student's preferred language
router.post('/hint', authMiddleware, aiRateLimiter, async (req, res, next) => {
  try {
    const subjectCode = req.body.subject || 'DSA';
    const context = await personalizationService.getStudentContext(req.user.id, subjectCode, req.token);
    const hintData = await aiService.generatePersonalizedHint(context, req.body);

    res.status(200).json({
      success: true,
      ...hintData
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/ai/explain - Generate structured explanation with student language and selective visual support
router.post('/explain', authMiddleware, aiRateLimiter, async (req, res, next) => {
  try {
    const subjectCode = req.body.subject || 'DSA';
    const topic = req.body.topic || 'Binary Search';
    const context = await personalizationService.getStudentContext(req.user.id, subjectCode, req.token);
    const explanationData = await aiService.generatePersonalizedExplanation(context, { topic, ...req.body });

    res.status(200).json({
      success: true,
      ...explanationData
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/ai/mentor - AI mentor progressive hints without solution spoilers
router.post('/mentor', authMiddleware, aiRateLimiter, aiController.getMentorGuidance);

// POST /api/ai/chat - AI chat query
router.post('/chat', authMiddleware, aiRateLimiter, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Endpoint registered'
  });
});

module.exports = router;
