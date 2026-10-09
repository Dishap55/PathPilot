const profileService = require('../services/profileService');
const { sendSuccess } = require('../utils/response');

module.exports = {
  getProfile: async (req, res, next) => {
    try {
      const data = await profileService.getProfile(req.user.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  updateProfile: async (req, res, next) => {
    try {
      const data = await profileService.updateProfile(req.user.id, req.body);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  getSubjectLevels: async (req, res, next) => {
    try {
      const data = await profileService.getSubjectLevels(req.user.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  updateSubjectLevels: async (req, res, next) => {
    try {
      const data = await profileService.updateSubjectLevels(req.user.id, req.body.levels);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  }
};
