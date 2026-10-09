const reassessmentService = require('../services/reassessmentService');

/**
 * Reassessment Controller
 *
 * Implements endpoints for periodic reassessment lifecycle:
 * - Eligibility verification
 * - Starting reassessment sessions
 * - Objective multi-modal submission and evaluation
 * - Baseline performance comparison and roadmap recalibration
 * - Historical reassessment retrieval
 *
 * SECURITY INVARIANTS:
 * - req.user.id is the authoritative, immutable source of student identity.
 * - Supplying or spoofing student_id in body or params is strictly rejected with HTTP 400.
 * - Cross-student access is strictly rejected with HTTP 403.
 */

const reassessmentController = {
  /**
   * GET /api/reassessment/eligibility - Check student reassessment eligibility
   */
  async checkEligibility(req, res, next) {
    try {
      const studentId = req.user.id;

      // Reject spoofed student_id query param
      if (req.query.student_id && req.query.student_id !== studentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      const topicId = req.query.topic_id || null;
      const result = await reassessmentService.checkEligibility(studentId, topicId, req.token);

      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/reassessment/start - Start a new periodic reassessment session
   */
  async startReassessment(req, res, next) {
    try {
      const studentId = req.user.id;

      // Reject spoofed student_id in body
      if (req.body.student_id || (req.body.id && req.body.id !== studentId)) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      const topicId = req.body.topic_id || null;
      const result = await reassessmentService.startReassessment(studentId, topicId, req.token);

      return res.status(200).json(result);
    } catch (err) {
      if (err.statusCode === 400) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      next(err);
    }
  },

  /**
   * POST /api/reassessment/:id/submit - Submit answers and evaluate reassessment
   */
  async submitReassessment(req, res, next) {
    try {
      const studentId = req.user.id;
      const reassessmentId = req.params.id;

      // Reject spoofed student_id in body
      if (req.body.student_id || (req.body.id && req.body.id !== studentId)) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      if (!reassessmentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Reassessment ID is required.'
        });
      }

      const answersPayload = req.body.answers || req.body;
      const result = await reassessmentService.submitReassessment(reassessmentId, answersPayload, studentId, req.token);

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
   * GET /api/reassessment/:id - Retrieve specific reassessment by ID
   */
  async getReassessmentById(req, res, next) {
    try {
      const studentId = req.user.id;
      const reassessmentId = req.params.id;

      if (!reassessmentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Reassessment ID is required.'
        });
      }

      const result = await reassessmentService.getReassessmentById(reassessmentId, studentId, req.token);

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
   * GET /api/reassessment - Retrieve all reassessments for student
   */
  async getStudentReassessments(req, res, next) {
    try {
      const studentId = req.user.id;

      // Reject spoofed student_id query param
      if (req.query.student_id && req.query.student_id !== studentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying student_id is forbidden.'
        });
      }

      const result = await reassessmentService.getStudentReassessments(studentId, req.token);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = reassessmentController;
