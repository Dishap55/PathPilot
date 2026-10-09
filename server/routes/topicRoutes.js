const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.get('/:subjectId', topicController.getTopicsBySubject);
router.get('/:topicId', topicController.getTopicDetails);
router.get('/:topicId/material', topicController.getTopicMaterial);

module.exports = router;
