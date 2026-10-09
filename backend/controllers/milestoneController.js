const milestoneService = require('../services/milestoneService');

/**
 * Milestone Controller
 *
 * Implements endpoints for milestone learning content, practice, and dynamic progression.
 *
 * SECURITY INVARIANTS:
 * - req.user.id is the authoritative, immutable source of student identity.
 * - Supplying or spoofing student_id in body, query, or params is rejected with HTTP 400.
 * - Cross-student access is strictly forbidden (HTTP 403).
 */

const milestoneController = {
  /**
   * GET /api/roadmap/milestone/:id - Retrieve milestone detail and learning content
   */
  async getMilestone(req, res, next) {
    try {
      const studentId = req.user.id;
      const milestoneId = req.params.id;

      // Security check: reject explicit student_id query spoofing
      if (req.query.student_id && req.query.student_id !== studentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      if (!milestoneId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Milestone ID is required.'
        });
      }

      const result = await milestoneService.getMilestone(milestoneId, studentId, req.token);
      return res.status(200).json(result);
    } catch (err) {
      if (err.statusCode === 403) {
        return res.status(403).json({ success: false, message: err.message });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ success: false, message: err.message });
      }
      next(err);
    }
  },

  /**
   * GET /api/roadmap/milestone/:id/practice - Retrieve practice exercises for milestone
   */
  async getPracticeQuestions(req, res, next) {
    try {
      const studentId = req.user.id;
      const milestoneId = req.params.id;

      // Security check: reject explicit student_id query spoofing
      if (req.query.student_id && req.query.student_id !== studentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      if (!milestoneId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Milestone ID is required.'
        });
      }

      const result = await milestoneService.getPracticeQuestions(milestoneId, studentId, req.token);
      return res.status(200).json(result);
    } catch (err) {
      if (err.statusCode === 403) {
        return res.status(403).json({ success: false, message: err.message });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ success: false, message: err.message });
      }
      next(err);
    }
  },

  /**
   * POST /api/roadmap/milestone/:id/attempt - Submit practice exercise attempt
   */
  async submitAttempt(req, res, next) {
    try {
      const studentId = req.user.id;
      const milestoneId = req.params.id;

      // Security check: reject explicit student_id spoofing
      if (req.body.student_id && req.body.student_id !== studentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      if (!milestoneId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Milestone ID is required.'
        });
      }

      const result = await milestoneService.submitAttempt(milestoneId, studentId, req.body, req.token);
      return res.status(200).json(result);
    } catch (err) {
      if (err.statusCode === 400) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (err.statusCode === 403) {
        return res.status(403).json({ success: false, message: err.message });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ success: false, message: err.message });
      }
      next(err);
    }
  },

  /**
   * POST /api/roadmap/milestone/:id/complete - Complete milestone and dynamically unlock next
   */
  async completeMilestone(req, res, next) {
    try {
      const studentId = req.user.id;
      const milestoneId = req.params.id;

      // Security check: reject explicit student_id spoofing
      if (req.body.student_id && req.body.student_id !== studentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      if (!milestoneId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Milestone ID is required.'
        });
      }

      const result = await milestoneService.completeMilestone(milestoneId, studentId, req.token);
      return res.status(200).json(result);
    } catch (err) {
      if (err.statusCode === 400) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (err.statusCode === 403) {
        return res.status(403).json({ success: false, message: err.message });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ success: false, message: err.message });
      }
      next(err);
    }
  }
};

module.exports = milestoneController;
