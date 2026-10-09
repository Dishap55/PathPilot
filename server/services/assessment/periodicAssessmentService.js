const assessmentHistoryService = require('./assessmentHistoryService');
const assessmentSessionService = require('./assessmentSessionService');
const assessmentAnalysisEngine = require('./assessmentAnalysisEngine');
const assessmentInputService = require('../assessmentInputService');

function periodicError(message, statusCode = 409) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function hasBothSubjectResults(attempt) {
  const subjects = attempt?.subjectResults;
  return Boolean(subjects?.dsaResult?.assessedLevel && subjects?.aptitudeResult?.assessedLevel);
}

async function startPeriodicAssessment(studentId) {
  if (!studentId || studentId === 'demo-student-id') {
    throw periodicError('A signed-in student is required to start a reassessment.', 401);
  }

  const attempts = await assessmentHistoryService.getAssessmentHistory(studentId);
  if (!attempts.some(attempt => attempt.assessmentType === 'initial')) {
    throw periodicError('Complete an Initial Assessment before starting a reassessment.');
  }

  const latestQualifiedAttempt = attempts.find(hasBothSubjectResults);
  if (!latestQualifiedAttempt) {
    throw periodicError('A completed DSA and Aptitude result is required before reassessment.');
  }

  const subjects = latestQualifiedAttempt.subjectResults;
  const levels = {
    DSA: subjects?.dsaResult?.assessedLevel || 'Beginner',
    Aptitude: subjects?.aptitudeResult?.assessedLevel || 'Beginner',
    OOPS: 'Beginner',
    DBMS: 'Beginner',
    OS: 'Beginner',
    CN: 'Beginner'
  };

  const assessmentInput = {
    subjects: [
      assessmentInputService.createSubjectAssessmentInput('DSA', levels.DSA),
      assessmentInputService.createSubjectAssessmentInput('Aptitude', levels.Aptitude),
      assessmentInputService.createSubjectAssessmentInput('OOPS', levels.OOPS),
      assessmentInputService.createSubjectAssessmentInput('DBMS', levels.DBMS),
      assessmentInputService.createSubjectAssessmentInput('OS', levels.OS),
      assessmentInputService.createSubjectAssessmentInput('CN', levels.CN)
    ]
  };
  const previousAttemptResponses = attempts.flatMap(attempt =>
    Array.isArray(attempt.subjectResults?.questionResponses) ? attempt.subjectResults.questionResponses : []
  );

  return assessmentSessionService.startSession({
    studentId,
    assessmentInput,
    assessmentType: 'periodic',
    targetQuestionsPerSubject: 10,
    previousAttemptResponses
  });
}

function resultFromHistoryRecord(record) {
  return {
    assessmentId: record.assessmentId,
    studentId: record.studentId,
    assessmentType: record.assessmentType,
    attemptNumber: record.attemptNumber,
    startedAt: record.startedAt,
    completedAt: record.completedAt,
    overallTimeSeconds: record.overallTimeSeconds,
    ...(record.subjectResults || {})
  };
}

async function completePeriodicAssessment(studentId, assessmentId) {
  if (!studentId || studentId === 'demo-student-id' || !assessmentId) {
    throw periodicError('A signed-in student and reassessment session are required.', 401);
  }

  const existing = await assessmentHistoryService.getAssessmentHistoryRecord(studentId, assessmentId);
  if (existing) {
    if (existing.assessmentType !== 'periodic') {
      throw periodicError('This assessment ID is not a periodic reassessment.', 409);
    }
    return resultFromHistoryRecord(existing);
  }

  const completedSession = assessmentSessionService.getCompletedSessionForStudent(assessmentId, studentId);
  if (!completedSession || completedSession.assessmentType !== 'periodic') {
    throw periodicError('Complete the active DSA and Aptitude reassessment before requesting its result.');
  }

  const responses = completedSession.responses || [];
  const subjectsList = ['DSA', 'APTITUDE', 'OOPS', 'DBMS', 'OS', 'CN'];
  const counts = {};
  subjectsList.forEach(sub => {
    counts[sub] = responses.filter(r => (r.subject || '').toUpperCase() === sub).length;
  });

  if (responses.length !== 60) {
    throw periodicError('A reassessment must contain exactly 60 responses (10 per subject).');
  }

  const analysis = assessmentAnalysisEngine.analyzeInitialAssessment({
    assessmentId,
    studentId,
    assessmentType: 'periodic',
    responses,
    subjects: completedSession.subjects,
    assessmentStartTime: completedSession.assessmentStartTime,
    assessmentEndTime: completedSession.assessmentEndTime
  });
  analysis.questionResponses = responses;

  const stored = await assessmentHistoryService.persistPeriodicAssessment(analysis);
  assessmentSessionService.markSessionPersisted(assessmentId, studentId);
  analysis.attemptNumber = stored.attempt_number;
  return analysis;
}

module.exports = {
  startPeriodicAssessment,
  completePeriodicAssessment,
  hasBothSubjectResults,
  resultFromHistoryRecord
};
