const questionService = require('../services/questionService');
const { sendSuccess } = require('../utils/response');

module.exports = {
  getQuestion: async (req, res, next) => {
    try {
      const data = await questionService.getQuestion(req.params.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  recordAttempt: async (req, res, next) => {
    try {
      const data = await questionService.recordAttempt(req.user.id, req.params.id, req.body);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  getRelatedQuestions: async (req, res, next) => {
    try {
      const data = await questionService.getRelatedQuestions(req.params.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  }
};
