const codeExecutionService = require('../services/codeExecutionService');
const { sendSuccess } = require('../utils/response');

module.exports = {
  runCode: async (req, res, next) => {
    try {
      const { source_code, language, stdin } = req.body;
      const result = await codeExecutionService.runCode(source_code, language, stdin);
      return sendSuccess(res, result);
    } catch (e) { next(e); }
  },
  submitCode: async (req, res, next) => {
    try {
      const { source_code, language, question_id } = req.body;
      const result = await codeExecutionService.submitCode(source_code, language, question_id, req.user.id);
      return sendSuccess(res, result);
    } catch (e) { next(e); }
  }
};
