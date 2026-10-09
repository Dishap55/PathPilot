const express = require('express');
const router = express.Router();
const reassessmentController = require('../controllers/reassessmentController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);
router.all('*', reassessmentController.legacyEndpointRetired);

module.exports = router;
