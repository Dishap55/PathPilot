const roadmapService = require('../services/roadmapService');

/**
 * Roadmap Controller
 *
 * Implements endpoints for generating and retrieving personalized learning roadmaps.
 *
 * SECURITY INVARIANTS:
 * - req.user.id is the authoritative, immutable source of student identity.
 * - Supplying or spoofing student_id in body or params is strictly rejected with HTTP 400.
 * - A student can never access another student's roadmap (HTTP 403 Forbidden).
 */

const roadmapController = {
  /**
   * POST /api/roadmap/generate - Generate or regenerate personalized roadmap
   */
  async generateRoadmap(req, res, next) {
    try {
      const studentId = req.user.id;

      // Security check: reject explicit student_id spoofing
      if (req.body.student_id || (req.body.id && req.body.id !== studentId)) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      const result = await roadmapService.generateRoadmap(studentId, req.token);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/roadmap - Retrieve active roadmap for authenticated student
   */
  async getRoadmap(req, res, next) {
    try {
      const studentId = req.user.id;

      // Security check: reject explicit student_id query spoofing
      if (req.query.student_id && req.query.student_id !== studentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying student_id is forbidden.'
        });
      }

      const result = await roadmapService.getRoadmap(studentId, req.token);

      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/roadmap/:id - Retrieve roadmap by ID with ownership enforcement
   */
  async getRoadmapById(req, res, next) {
    try {
      const studentId = req.user.id;
      const roadmapId = req.params.id;

      if (!roadmapId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Roadmap ID is required.'
        });
      }

      const result = await roadmapService.getRoadmapById(roadmapId, studentId, req.token);

      return res.status(200).json(result);
    } catch (err) {
      if (err.statusCode === 403) {
        return res.status(403).json({
          success: false,
          message: err.message
        });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({
          success: false,
          message: err.message
        });
      }
      next(err);
    }
  },

  /**
   * POST /api/roadmap/recalibrate - Recalibrate roadmap based on reassessment velocity
   */
  async recalibrateRoadmap(req, res, next) {
    try {
      const studentId = req.user.id;

      // Anti-spoofing validation
      if (req.body.student_id || (req.body.id && req.body.id !== studentId)) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      const comparisonData = req.body.comparison_data || {};
      const aiAnalysis = req.body.ai_analysis || {};

      const result = await roadmapService.recalibrateRoadmap(studentId, comparisonData, aiAnalysis, req.token);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = roadmapController;
