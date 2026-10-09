const bestuService = require('../services/bestuService');
const { sendSuccess } = require('../utils/response');

module.exports = {
  chat: async (req, res, next) => {
    try {
      const data = await bestuService.chat(req.body);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },

  getHint: async (req, res, next) => {
    try {
      const data = await bestuService.getHint(req.body);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  }
};
