const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');
const validateRequest = require('../middleware/validateRequest');
const { validateQuestionCreate } = require('../validators/adminValidators');

router.use(requireAuth);
router.use(requireAdmin);

router.get('/students', adminController.getStudents);
router.get('/templates', adminController.getTemplates);
router.post('/templates', adminController.createTemplate);
router.put('/templates/:id', adminController.updateTemplate);
router.get('/questions', adminController.getQuestions);
router.post('/questions', validateRequest(validateQuestionCreate), adminController.createQuestion);
router.put('/questions/:id', adminController.updateQuestion);
router.delete('/questions/:id', adminController.deleteQuestion);

router.post('/ai/generate-question', adminController.generateQuestionAI);
router.post('/ai/generate-template', adminController.generateTemplateAI);

module.exports = router;
