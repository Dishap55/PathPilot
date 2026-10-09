const adminService = require('../services/adminService');
const aiService = require('../services/aiService');
const { sendSuccess } = require('../utils/response');

module.exports = {
  getStudents: async (req, res, next) => {
    try {
      const data = await adminService.listStudents();
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  getTemplates: async (req, res, next) => {
    try {
      const data = await adminService.listTemplates();
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  createTemplate: async (req, res, next) => {
    try {
      const data = await adminService.createTemplate(req.body);
      return sendSuccess(res, data, {}, 201);
    } catch (e) { next(e); }
  },
  updateTemplate: async (req, res, next) => {
    try {
      const data = await adminService.updateTemplate(req.params.id, req.body);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  getQuestions: async (req, res, next) => {
    try {
      const data = await adminService.listQuestions();
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  createQuestion: async (req, res, next) => {
    try {
      const data = await adminService.createQuestion(req.body);
      return sendSuccess(res, data, {}, 201);
    } catch (e) { next(e); }
  },
  updateQuestion: async (req, res, next) => {
    try {
      const data = await adminService.updateQuestion(req.params.id, req.body);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  deleteQuestion: async (req, res, next) => {
    try {
      const data = await adminService.deleteQuestion(req.params.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  generateQuestionAI: async (req, res, next) => {
    try {
      const data = await aiService.generateQuestionDraft(req.body);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },
  generateTemplateAI: async (req, res, next) => {
    try {
      return sendSuccess(res, { draft_template: 'AI Draft Template for ' + req.body.subject });
    } catch (e) { next(e); }
  }
};
