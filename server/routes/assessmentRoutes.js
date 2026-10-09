const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const requireAuth = require('../middleware/requireAuth');
const validateRequest = require('../middleware/validateRequest');
const { validateStartAssessment, validateSubmitAssessment } = require('../validators/assessmentValidators');

router.use(requireAuth);
router.post('/periodic/start', assessmentController.startPeriodicAssessment);
router.post('/periodic/complete', assessmentController.completePeriodicAssessment);
router.get('/initial', assessmentController.getInitialContext);
router.get('/status', assessmentController.checkAssessmentStatus);
router.post('/initial/complete', assessmentController.completeInitialAssessment);
router.get('/initial/result', assessmentController.getInitialAssessmentResult);
router.get('/history', assessmentController.getAssessmentHistory);
router.get('/input', assessmentController.getAssessmentInput);

router.get('/input/:subject', assessmentController.getAssessmentInput);
router.post('/start', validateRequest(validateStartAssessment), assessmentController.startAssessment);
router.post('/session/start', assessmentController.startSession);
router.post('/session/submit-answer', assessmentController.submitAnswer);
router.post('/session/next-subject', assessmentController.continueToNextSubject);
router.get('/session/:id', assessmentController.getSession);
const codeController = require('../controllers/codeController');
const sqlController = require('../controllers/sqlController');
const { validateRunCode } = require('../validators/codeValidators');
const { validateExecuteSql } = require('../validators/sqlValidators');

router.post('/code/run', validateRequest(validateRunCode), codeController.runCode);
router.post('/sql/run', validateRequest(validateExecuteSql), sqlController.executeSql);

router.get('/:id', assessmentController.getAssessment);
router.post('/:id/submit', validateRequest(validateSubmitAssessment), assessmentController.submitAssessment);
router.get('/result/:id', assessmentController.getResult);

module.exports = router;
