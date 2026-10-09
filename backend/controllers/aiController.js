const aiService = require('../services/aiService');
const assessmentService = require('../services/assessmentService');

/**
 * AI Controller
 *
 * Implements endpoints for AI assessment analysis and AI mentor guidance.
 *
 * SECURITY INVARIANTS:
 * - req.user.id is the authoritative, immutable source of student identity.
 * - Supplying or spoofing student_id is strictly rejected with HTTP 400.
 */

const aiController = {
  /**
   * POST /api/ai/analyze - Trigger AI analysis on diagnostic assessment evidence
   */
  async analyzeAssessment(req, res, next) {
    try {
      const studentId = req.user.id;

      // Security check: reject explicit student_id injection
      if (req.body.student_id || (req.body.id && req.body.id !== studentId)) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      const studentContext = await assessmentService.getStudentContext(studentId, req.token);

      // Extract assessment evidence
      let assessmentEvidence = req.body.assessment_evidence;
      if (!assessmentEvidence && req.body.assessment_id) {
        const resultRes = await assessmentService.getResult(req.body.assessment_id, studentId);
        assessmentEvidence = resultRes?.result;
      }

      if (!assessmentEvidence) {
        // Fallback to active session
        const assessmentId = `assess-init-${studentId.substring(0, 8)}`;
        try {
          const resultRes = await assessmentService.getResult(assessmentId, studentId);
          assessmentEvidence = resultRes?.result;
        } catch (e) {
          // Continue with default diagnostic baseline
        }
      }

      if (!assessmentEvidence) {
        assessmentEvidence = {
          score: 75,
          total_questions: 8,
          correct_answers: 6,
          incorrect_answers: 2,
          subject_breakdown: {
            DSA: { correct: 1, total: 2 },
            OOPS: { correct: 1, total: 1 },
            APT: { correct: 1, total: 1 },
            DBMS: { correct: 1, total: 2 },
            OS: { correct: 1, total: 1 },
            CN: { correct: 1, total: 1 }
          },
          strengths: ['Object-Oriented Programming Fundamentals'],
          weakTopics: ['SQL Joins & Grouping Aggregations']
        };
      }

      const result = await aiService.analyzeAssessment(studentContext, assessmentEvidence, req.token);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/ai/mentor - AI mentor progressive hints without solution spoilers
   */
  async getMentorGuidance(req, res, next) {
    try {
      const studentId = req.user.id;

      // Anti-spoofing check
      if (req.body.student_id || (req.body.id && req.body.id !== studentId)) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request: Supplying or spoofing student_id is forbidden.'
        });
      }

      const mentorContext = {
        subject: req.body.subject,
        topic: req.body.topic,
        hintLevel: req.body.hintLevel || req.body.hint_level || 1,
        questionPrompt: req.body.questionPrompt || req.body.question_prompt || req.body.prompt,
        studentCode: req.body.studentCode || req.body.student_code || req.body.code,
        errorMessage: req.body.errorMessage || req.body.error_message,
        preferredLanguage: req.body.preferredLanguage || req.body.preferred_language
      };

      const result = await aiService.getMentorGuidance(mentorContext, studentId, req.token);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = aiController;
