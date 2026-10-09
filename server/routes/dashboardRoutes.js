const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);
router.get('/', dashboardController.getDashboard);
router.get('/analytics', dashboardController.getAnalytics);
router.get('/weak-areas', dashboardController.getWeakAreas);

module.exports = router;
