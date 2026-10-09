const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');
const { validateSignup, validateLogin } = require('../validators/authValidators');

router.post('/signup', validateRequest(validateSignup), authController.signup);
router.post('/login', validateRequest(validateLogin), authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
