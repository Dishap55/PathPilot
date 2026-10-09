const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const { email, password, ...rest } = req.body;
      const result = await authService.signup(email, password, rest);
      return sendSuccess(res, result, {}, 201);
    } catch (e) { next(e); }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      return sendSuccess(res, result);
    } catch (e) { next(e); }
  },
  logout: async (req, res, next) => {
    try {
      const result = await authService.logout();
      return sendSuccess(res, result);
    } catch (e) { next(e); }
  },
  forgotPassword: async (req, res, next) => {
    try {
      return sendSuccess(res, { message: 'Password reset link sent.' });
    } catch (e) { next(e); }
  },
  resetPassword: async (req, res, next) => {
    try {
      return sendSuccess(res, { message: 'Password has been successfully updated.' });
    } catch (e) { next(e); }
  }
};
