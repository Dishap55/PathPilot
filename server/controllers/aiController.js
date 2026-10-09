const aiService = require('../services/aiService');
const { sendSuccess } = require('../utils/response');

module.exports = {
  analyze: async (req, res, next) => {
    try {
      const data = await aiService.analyzeAssessment(req.body);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  explain: async (req, res, next) => {
    try {
      const { prompt, context } = req.body;
      const data = await aiService.explainConcept(prompt, context);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  }
};
