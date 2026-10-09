const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);
router.get('/', progressController.getProgress);
router.get('/topic/:topicId', progressController.getTopicProgress);
router.get('/subject/:subjectId', progressController.getSubjectProgress);

module.exports = router;
