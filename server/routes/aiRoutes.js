const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const requireAuth = require('../middleware/requireAuth');
const rateLimitAI = require('../middleware/rateLimitAI');

router.use(requireAuth);
router.use(rateLimitAI);
router.post('/analyze', aiController.analyze);
router.post('/explain', aiController.explain);

module.exports = router;
