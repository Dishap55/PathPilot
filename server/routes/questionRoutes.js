const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const requireAuth = require('../middleware/requireAuth');
const validateRequest = require('../middleware/validateRequest');
const { validateAttempt } = require('../validators/questionValidators');

router.get('/:id', questionController.getQuestion);
router.post('/:id/attempt', requireAuth, validateRequest(validateAttempt), questionController.recordAttempt);
router.get('/:id/related', questionController.getRelatedQuestions);

module.exports = router;
