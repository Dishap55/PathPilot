const assessmentService = require('../services/assessmentService');
const assessmentInputService = require('../services/assessmentInputService');
const judge0Service = require('../services/judge0Service');
const sqlExecutionService = require('../services/sqlExecutionService');

/**
 * Assessment Controller
 *
 * Implements endpoints for diagnostic and modular assessments.
 *
 * SECURITY INVARIANTS:
 * - Student identity is derived exclusively from req.user.id via verified JWT.
 * - Explicit student_id or id injection attempts are rejected with HTTP 400.
 * - Answer keys and solution explanations are never leaked prior to submission.
 */

const assessmentController = {
  /**
   * GET /api/assessment/input/:subject? - Retrieve structured Assessment Input from student's profile levels
   */
  async getAssessmentInput(req, res, next) {
    try {
      const studentId = req.user.id;
      const subject = req.params.subject || null;
      const data = await assessmentInputService.getAssessmentInputFromDatabase(studentId, subject, req.token);

      return res.status(200).json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/assessment/initial - Retrieve diagnostic context & setup status
   */
  async getInitialContext(req, res, next) {
    try {
      const studentId = req.user.id;

      // Security check: reject explicit student_id query spoofing
      if (req.query.student_id && req.query.student_id !== studentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying student_id is forbidden. Identity is cryptographically derived from authentication.'
        });
      }

      const context = await assessmentService.getStudentContext(studentId, req.token);

      return res.status(200).json({
        success: true,
        ...context
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/assessment/start - Start or resume diagnostic assessment
   */
  async startAssessment(req, res, next) {
    try {
      const studentId = req.user.id;

      // Security check: reject spoofed student_id in body
      if (req.body.student_id || (req.body.id && req.body.id !== studentId)) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      const response = await assessmentService.startAssessment(studentId, req.token, req.body.template_id);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/assessment/:id - Retrieve active assessment questions
   */
  async getAssessment(req, res, next) {
    try {
      const studentId = req.user.id;
      const assessmentId = req.params.id;

      if (!assessmentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: assessment ID is required.'
        });
      }

      const response = await assessmentService.getAssessment(assessmentId, studentId, req.token);

      return res.status(200).json(response);
    } catch (err) {
      if (err.statusCode === 403) {
        return res.status(403).json({
          success: false,
          message: err.message
        });
      }
      next(err);
    }
  },

  /**
   * POST /api/assessment/:id/submit - Submit answers and calculate objective score
   */
  async submitAssessment(req, res, next) {
    try {
      const studentId = req.user.id;
      const assessmentId = req.params.id;

      // Security check: reject spoofed student_id
      if (req.body.student_id) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying student_id is forbidden.'
        });
      }

      if (!assessmentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: assessment ID is required.'
        });
      }

      const answers = req.body.answers !== undefined ? req.body.answers : req.body;

      if (typeof answers !== 'object') {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Invalid answers payload format.'
        });
      }

      const response = await assessmentService.submitAssessment(assessmentId, answers, studentId, req.token);

      return res.status(200).json(response);
    } catch (err) {
      if (err.statusCode === 403) {
        return res.status(403).json({
          success: false,
          message: err.message
        });
      }
      next(err);
    }
  },

  /**
   * GET /api/assessment/result/:id - Retrieve scored assessment result
   */
  async getResult(req, res, next) {
    try {
      const studentId = req.user.id;
      const assessmentId = req.params.id;

      if (!assessmentId) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: assessment ID is required.'
        });
      }

      const response = await assessmentService.getResult(assessmentId, studentId);

      return res.status(200).json(response);
    } catch (err) {
      if (err.statusCode === 403) {
        return res.status(403).json({
          success: false,
          message: err.message
        });
      }
      next(err);
    }
  },

  /**
   * POST /api/assessment/code/run - Test run student code in Judge0 sandbox
   */
  async runCode(req, res, next) {
    try {
      const { source_code, language, stdin } = req.body;

      if (!source_code) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: source_code is required.'
        });
      }

      const result = await judge0Service.executeCode({
        sourceCode: source_code,
        language: language || 'JavaScript',
        stdin: stdin || ''
      });

      return res.status(200).json({
        success: true,
        result
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/assessment/sql/run - Test run student SQL query in controlled sandbox
   */
  async runSql(req, res, next) {
    try {
      const { query, schema_context } = req.body;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: query is required.'
        });
      }

      const result = await sqlExecutionService.executeQuery({
        query,
        schemaContext: schema_context || ''
      });

      return res.status(200).json({
        success: true,
        result
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = assessmentController;
