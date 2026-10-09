const express = require('express');
const router = express.Router();
const bestuController = require('../controllers/bestuController');
const requireAuth = require('../middleware/requireAuth');
const rateLimitAI = require('../middleware/rateLimitAI');

router.use(requireAuth);
router.use(rateLimitAI);
router.post('/chat', bestuController.chat);
router.post('/hint', bestuController.getHint);

module.exports = router;
