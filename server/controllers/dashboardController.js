const dashboardService = require('../services/dashboardService');
const { sendSuccess } = require('../utils/response');

module.exports = {
  getDashboard: async (req, res, next) => {
    try {
      const data = await dashboardService.getDashboard(req.user.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  getAnalytics: async (req, res, next) => {
    try {
      const data = await dashboardService.getAnalytics(req.user.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  getWeakAreas: async (req, res, next) => {
    try {
      const data = await dashboardService.getWeakAreas(req.user.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  }
};
