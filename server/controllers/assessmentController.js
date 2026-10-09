const assessmentService = require('../services/assessmentService');
const assessmentInputService = require('../services/assessmentInputService');
const assessmentSessionService = require('../services/assessment/assessmentSessionService');
const assessmentAnalysisEngine = require('../services/assessment/assessmentAnalysisEngine');
const geminiAnalysisService = require('../services/assessment/geminiAnalysisService');
const assessmentHistoryService = require('../services/assessment/assessmentHistoryService');
const periodicAssessmentService = require('../services/assessment/periodicAssessmentService');
const { supabase } = require('../config/supabase');
const { sendSuccess } = require('../utils/response');

module.exports = {
  getInitialContext: async (req, res, next) => {
    try {
      const studentId = req.user?.id || 'demo-student-id';
      let student = {
        full_name: 'Student',
        preferred_language: 'C++',
        target_company: 'Tier-1 Product',
        preparation_value: 6,
        preparation_unit: 'Months'
      };

      try {
        const { data } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('id', studentId)
          .maybeSingle();
        if (data) {
          student = { ...student, ...data };
        }
      } catch (err) {}

      let assessmentInput = null;
      try {
        assessmentInput = await assessmentInputService.getAssessmentInputFromDatabase(studentId);
      } catch (e) {}

      const assessmentCompleted = studentId !== 'demo-student-id'
        ? await assessmentHistoryService.hasInitialAssessment(studentId)
        : false;

      return sendSuccess(res, {
        setup_completed: true,
        assessment_completed: assessmentCompleted,
        student,
        assessmentInput
      });
    } catch (e) { next(e); }
  },

  checkAssessmentStatus: async (req, res, next) => {
    try {
      const studentId = req.user?.id || 'demo-student-id';
      const assessmentCompleted = studentId !== 'demo-student-id'
        ? await assessmentHistoryService.hasInitialAssessment(studentId)
        : false;

      let assessmentInput = null;
      try {
        assessmentInput = await assessmentInputService.getAssessmentInputFromDatabase(studentId);
      } catch (e) {}

      return sendSuccess(res, {
        studentId,
        assessmentCompleted,
        hasAssessmentInput: Boolean(assessmentInput),
        assessmentInput
      });
    } catch (e) { next(e); }
  },

  getAssessmentInput: async (req, res, next) => {
    try {
      const subject = req.params.subject || null;
      const data = await assessmentInputService.getAssessmentInputFromDatabase(req.user.id, subject);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },

  startAssessment: async (req, res, next) => {
    try {
      const { template_id } = req.body;
      const data = await assessmentService.startAssessment(req.user.id, template_id);
      return sendSuccess(res, data, {}, 201);
    } catch (e) { next(e); }
  },

  getAssessment: async (req, res, next) => {
    try {
      const data = await assessmentService.getAssessment(req.params.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },

  submitAssessment: async (req, res, next) => {
    try {
      const data = await assessmentService.submitAssessment(req.params.id, req.body.answers, req.user.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },

  getResult: async (req, res, next) => {
    try {
      const data = await assessmentService.getResult(req.params.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },

  // STEP 2 Dynamic Session Endpoints
  startSession: async (req, res, next) => {
    try {
      const studentId = req.user?.id || req.body.studentId || 'guest';
      let assessmentInput = req.body.assessmentInput;
      if (!assessmentInput) {
        assessmentInput = await assessmentInputService.getAssessmentInputFromDatabase(studentId);
      }
      const session = await assessmentSessionService.startSession({
        studentId,
        assessmentInput,
        assessmentType: req.body.assessmentType || 'initial',
        targetQuestionsPerSubject: req.body.targetQuestionsPerSubject
      });
      return sendSuccess(res, session, {}, 201);
    } catch (e) { next(e); }
  },

  submitAnswer: async (req, res, next) => {
    try {
      const result = await assessmentSessionService.submitAnswer({ ...req.body, studentId: req.user.id });
      return sendSuccess(res, result);
    } catch (e) { next(e); }
  },

  continueToNextSubject: async (req, res, next) => {
    try {
      const result = await assessmentSessionService.continueToNextSubject(req.body.assessmentId, req.user.id);
      return sendSuccess(res, result);
    } catch (e) { next(e); }
  },

  getSession: async (req, res, next) => {
    try {
      const session = assessmentSessionService.getSession(req.params.id, req.user.id);
      if (!session) {
        return res.status(404).json({ success: false, message: 'Session not found' });
      }
      return sendSuccess(res, session);
    } catch (e) { next(e); }
  },

  // STEP 3 Initial Assessment Analysis & Dashboard Result Endpoints
  completeInitialAssessment: async (req, res, next) => {
    try {
      const studentId = req.user?.id;
      const { assessmentId } = req.body;
      if (!studentId || studentId === 'demo-student-id' || !assessmentId) {
        return res.status(400).json({ success: false, message: 'A signed-in student and completed assessment session are required.' });
      }

      // The server session is the source of truth for questions and response correctness.
      const completedSession = assessmentSessionService.getCompletedSessionForStudent(assessmentId, studentId);
      if (!completedSession || completedSession.assessmentType !== 'initial') {
        return res.status(400).json({ success: false, message: 'Complete the Initial Assessment before requesting its result.' });
      }
      const { responses, subjects, assessmentStartTime, assessmentEndTime } = completedSession;
      const dsaCount = responses.filter(r => (r.subject || '').toUpperCase() === 'DSA').length;
      const aptitudeCount = responses.filter(r => (r.subject || '').toUpperCase() === 'APTITUDE').length;
      if (dsaCount !== 5 || aptitudeCount !== 5 || responses.length !== 10) {
        return res.status(400).json({ success: false, message: 'Initial Assessment must contain exactly five DSA and five Aptitude responses.' });
      }

      // 1. Authoritative deterministic scoring & level determination
      const analysis = assessmentAnalysisEngine.analyzeInitialAssessment({
        assessmentId,
        studentId,
        responses,
        subjects,
        assessmentStartTime,
        assessmentEndTime
      });

      // 2. Gemini presentation layer with deterministic fallback
      const aiFeedback = await geminiAnalysisService.generateAssessmentInterpretation(analysis);
      analysis.aiFeedback = aiFeedback;

      // Persist the completed result with an attempt number for future assessment history.
      const stored = await assessmentHistoryService.persistInitialAssessment(analysis);
      analysis.attemptNumber = stored.attempt_number;

      // Automatically generate/refresh the active personalized roadmap for the student
      try {
        const roadmapService = require('../services/roadmapService');
        await roadmapService.generateRoadmapFromAssessment(studentId, { ...analysis, assessmentType: 'initial' });
      } catch (rmErr) {
        console.warn('[completeInitialAssessment] Roadmap auto-generation notice:', rmErr.message);
      }

      return sendSuccess(res, analysis, {}, 200);
    } catch (e) { next(e); }
  },

  getInitialAssessmentResult: async (req, res, next) => {
    try {
      const studentId = req.user?.id;
      if (!studentId || studentId === 'demo-student-id') {
        return res.status(401).json({ success: false, message: 'A signed-in student is required.' });
      }
      const result = await assessmentHistoryService.getLatestInitialAssessment(studentId);

      return sendSuccess(res, {
        assessmentCompleted: Boolean(result),
        result
      });
    } catch (e) { next(e); }
  },

  getAssessmentHistory: async (req, res, next) => {
    try {
      const studentId = req.user?.id;
      if (!studentId || studentId === 'demo-student-id') {
        return res.status(401).json({ success: false, message: 'A signed-in student is required.' });
      }

      const attempts = await assessmentHistoryService.getAssessmentHistory(studentId);
      return sendSuccess(res, { attempts });
    } catch (e) { next(e); }
  },

  startPeriodicAssessment: async (req, res, next) => {
    try {
      const session = await periodicAssessmentService.startPeriodicAssessment(req.user?.id);
      return sendSuccess(res, session, {}, 201);
    } catch (e) { next(e); }
  },

  completePeriodicAssessment: async (req, res, next) => {
    try {
      const result = await periodicAssessmentService.completePeriodicAssessment(req.user?.id, req.body?.assessmentId);
      return sendSuccess(res, result);
    } catch (e) { next(e); }
  }
};
