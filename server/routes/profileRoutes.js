const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const requireAuth = require('../middleware/requireAuth');
const validateRequest = require('../middleware/validateRequest');
const { validateProfile } = require('../validators/profileValidators');

router.use(requireAuth);
router.get('/', profileController.getProfile);
router.put('/', validateRequest(validateProfile), profileController.updateProfile);
router.get('/subject-levels', profileController.getSubjectLevels);
router.put('/subject-levels', profileController.updateSubjectLevels);

module.exports = router;
