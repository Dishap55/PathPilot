const progressService = require('../services/progressService');
const { sendSuccess } = require('../utils/response');

module.exports = {
  getProgress: async (req, res, next) => {
    try {
      const data = await progressService.getProgress(req.user.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  getTopicProgress: async (req, res, next) => {
    try {
      const data = await progressService.getTopicProgress(req.user.id, req.params.topicId);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  getSubjectProgress: async (req, res, next) => {
    try {
      const data = await progressService.getSubjectProgress(req.user.id, req.params.subjectId);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  }
};
