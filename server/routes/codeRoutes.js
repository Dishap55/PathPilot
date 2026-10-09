const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');
const requireAuth = require('../middleware/requireAuth');
const validateRequest = require('../middleware/validateRequest');
const { validateRunCode } = require('../validators/codeValidators');

router.post('/run', validateRequest(validateRunCode), codeController.runCode);
router.post('/submit', requireAuth, validateRequest(validateRunCode), codeController.submitCode);

module.exports = router;
