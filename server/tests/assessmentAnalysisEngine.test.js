const test = require('node:test');
const assert = require('node:assert/strict');
const {
  analyzeInitialAssessment,
  calculateSubjectAnalysis,
  analyzeTiming
} = require('../services/assessment/assessmentAnalysisEngine');
const geminiClient = require('../integrations/geminiClient');
const geminiAnalysisService = require('../services/assessment/geminiAnalysisService');
const assessmentSessionService = require('../services/assessment/assessmentSessionService');

function response(subject, index, overrides = {}) {
  return {
    questionId: `${subject}-${index}`,
    subject,
    topicId: `${subject}-topic-${index}`,
    topicName: `${subject} topic ${index}`,
    difficulty: 'Easy',
    questionType: 'mcq',
    answer: 'A',
    correct: true,
    skipped: false,
    confidence: 'confident',
    timeTaken: 30,
    ...overrides
  };
}

function fullResponseSet({ dsa = [], aptitude = [] } = {}) {
  const defaultDsa = Array.from({ length: 5 }, (_, i) => response('DSA', i + 1));
  const defaultAptitude = Array.from({ length: 5 }, (_, i) => response('Aptitude', i + 1));
  return [...(dsa.length ? dsa : defaultDsa), ...(aptitude.length ? aptitude : defaultAptitude)];
}

function analyze(responses = fullResponseSet(), levels = []) {
  return analyzeInitialAssessment({
    assessmentId: 'assessment-test-1',
    studentId: 'student-test-1',
    responses,
    subjects: levels,
    assessmentStartTime: 1_000,
    assessmentEndTime: 61_000
  });
}

test('analyzes only DSA and Aptitude and reserves five questions per subject', () => {
  const result = analyze([...fullResponseSet(), response('DBMS', 1), response('OS', 1), response('OOPS', 1), response('CN', 1)]);
  assert.equal(result.dsaResult.totalQuestions, 5);
  assert.equal(result.aptitudeResult.totalQuestions, 5);
  assert.equal(result.overall.questionsAsked, 10);
  assert.deepEqual(Object.keys(result).filter(key => /Result$/.test(key)), ['dsaResult', 'aptitudeResult']);
  assert.equal(result.roadmapPreparation.unassessedSubjects.length, 4);
});

test('calculates actual DSA and Aptitude correctness and accuracy independently', () => {
  const inputs = fullResponseSet({
    dsa: [0, 1, 2, 3, 4].map(i => response('DSA', i, { correct: i < 4 })),
    aptitude: [0, 1, 2, 3, 4].map(i => response('Aptitude', i, { correct: i < 2 }))
  });
  const result = analyze(inputs);
  assert.equal(result.dsaResult.correctAnswers, 4);
  assert.equal(result.dsaResult.accuracy, 80);
  assert.equal(result.aptitudeResult.correctAnswers, 2);
  assert.equal(result.aptitudeResult.accuracy, 40);
});

test('skipped questions do not count as incorrect or attempted', () => {
  const results = [response('DSA', 1, { correct: false }), response('DSA', 2, { skipped: true, correct: false })];
  const result = calculateSubjectAnalysis('DSA', results);
  assert.equal(result.attemptedQuestions, 1);
  assert.equal(result.incorrectAnswers, 1);
  assert.equal(result.skippedQuestions, 1);
  assert.equal(result.accuracy, 0);
});

test('records confidence separately from answer correctness', () => {
  const result = calculateSubjectAnalysis('DSA', [
    response('DSA', 1, { correct: false, confidence: 'very_confident' }),
    response('DSA', 2, { correct: true, confidence: 'guessing' })
  ]);
  assert.equal(result.correctAnswers, 1);
  assert.equal(result.confidenceSummary.incorrectHighConfidence, 1);
  assert.equal(result.confidenceSummary.correctLowConfidence, 1);
  assert.equal(result.confidenceSummary.distribution.very_confident, 1);
  assert.equal(result.confidenceSummary.distribution.guessing, 1);
});

test('calculates real response timing and reports subject timing', () => {
  const result = calculateSubjectAnalysis('DSA', [
    response('DSA', 1, { timeTaken: 20 }),
    response('DSA', 2, { timeTaken: 100 })
  ]);
  assert.equal(result.totalTimeSeconds, 120);
  assert.equal(result.averageTimeSeconds, 60);
  assert.equal(result.timingSummary.fastestSeconds, 20);
  assert.equal(result.timingSummary.slowestSeconds, 100);
  assert.equal(analyzeTiming([]).totalTimeSeconds, 0);
});

test('time alone cannot override correctness-based level evidence', () => {
  const quick = calculateSubjectAnalysis('DSA', [response('DSA', 1, { correct: false, timeTaken: 1 })], 'Beginner');
  const slow = calculateSubjectAnalysis('DSA', [response('DSA', 1, { correct: false, timeTaken: 500 })], 'Beginner');
  assert.equal(quick.assessedLevel, slow.assessedLevel);
});

test('difficulty contributes stronger evidence than Easy-only correct answers', () => {
  const easyOnly = Array.from({ length: 5 }, (_, i) => response('DSA', i, { correct: i < 4, difficulty: 'Easy' }));
  const mixedDifficulty = [
    response('DSA', 1, { difficulty: 'Easy' }),
    response('DSA', 2, { difficulty: 'Easy' }),
    response('DSA', 3, { difficulty: 'Medium' }),
    response('DSA', 4, { difficulty: 'Medium' }),
    response('DSA', 5, { difficulty: 'Hard' })
  ];
  assert.equal(calculateSubjectAnalysis('DSA', easyOnly, 'Beginner').assessedLevel, 'Beginner');
  assert.equal(calculateSubjectAnalysis('DSA', mixedDifficulty, 'Beginner').assessedLevel, 'Advanced');
});

test('preserves starting levels and stores assessed levels separately', () => {
  const result = analyze(fullResponseSet(), [
    { subject: 'DSA', studentLevel: 'Beginner' },
    { subject: 'Aptitude', studentLevel: 'Professional' }
  ]);
  assert.equal(result.dsaResult.startingLevel, 'Beginner');
  assert.equal(result.dsaResult.assessedLevel, 'Beginner');
  assert.equal(result.aptitudeResult.startingLevel, 'Advanced');
  assert.notEqual(result.aptitudeResult, result.aptitudeResult.startingLevel);
});

test('level decisions contain a student-facing explanation', () => {
  const result = analyze();
  assert.match(result.dsaResult.reason, /assessment|evidence|performance|concepts/i);
  assert.match(result.aptitudeResult.reason, /assessment|evidence|performance|concepts/i);
});

test('a single Easy response is Developing, not Strong', () => {
  const result = calculateSubjectAnalysis('DSA', [response('DSA', 1, { difficulty: 'Easy' })]);
  assert.equal(result.topicPerformance[0].status, 'Developing');
  assert.equal(result.strengths.length, 0);
});

test('a topic is Strong only with multiple accurate Medium/Hard responses', () => {
  const result = calculateSubjectAnalysis('DSA', [
    response('DSA', 1, { topicId: 'arrays', topicName: 'Arrays', difficulty: 'Medium' }),
    response('DSA', 2, { topicId: 'arrays', topicName: 'Arrays', difficulty: 'Hard' })
  ]);
  assert.equal(result.topicPerformance[0].status, 'Strong');
  assert.equal(result.topicPerformance[0].questionsAsked, 2);
  assert.equal(result.topicPerformance[0].confidencePattern.correctHighConfidence, 2);
});

test('strengths and focus areas are drawn from observed topic evidence', () => {
  const result = calculateSubjectAnalysis('DSA', [
    response('DSA', 1, { topicId: 'arrays', topicName: 'Arrays', difficulty: 'Medium' }),
    response('DSA', 2, { topicId: 'arrays', topicName: 'Arrays', difficulty: 'Medium' }),
    response('DSA', 3, { topicId: 'graphs', topicName: 'Graphs', correct: false })
  ]);
  assert.deepEqual(result.strengths.map(item => item.topicName), ['Arrays']);
  assert.deepEqual(result.focusAreas.map(item => item.topicName), ['Graphs']);
});

test('result includes initial type, assessment timestamps, and roadmap-ready subject output', () => {
  const result = analyze();
  assert.equal(result.assessmentType, 'initial');
  assert.equal(result.startedAt, new Date(1_000).toISOString());
  assert.equal(result.completedAt, new Date(61_000).toISOString());
  assert.equal(result.overallTimeSeconds, 60);
  assert.equal(result.roadmapPreparation.dsa.startingLevel, result.dsaResult.startingLevel);
  assert.equal(result.roadmapPreparation.aptitude.assessedLevel, result.aptitudeResult.assessedLevel);
  assert.equal('attemptNumber' in result, false);
});

test('Gemini failure returns deterministic feedback without changing the result levels', async () => {
  const result = analyze();
  const original = geminiClient.generateGuidance;
  geminiClient.generateGuidance = async () => { throw new Error('offline'); };
  try {
    const feedback = await geminiAnalysisService.generateAssessmentInterpretation(result);
    assert.equal(feedback.source, 'deterministic_fallback');
    assert.equal(feedback.dsaSummary.includes(result.dsaResult.assessedLevel), true);
    assert.equal(result.dsaResult.assessedLevel, 'Beginner');
  } finally {
    geminiClient.generateGuidance = original;
  }
});

test('invalid Gemini output cannot add or override assessed levels', async () => {
  const result = analyze();
  const original = geminiClient.generateGuidance;
  geminiClient.generateGuidance = async () => ({
    output: JSON.stringify({ summary: 'Great work.', dsaSummary: 'Your level is Advanced.', dsaLevel: 'Advanced', aptitudeLevel: 'Advanced' })
  });
  try {
    const feedback = await geminiAnalysisService.generateAssessmentInterpretation(result);
    assert.equal(feedback.dsaLevel, undefined);
    assert.equal(feedback.aptitudeLevel, undefined);
    assert.equal(result.dsaResult.assessedLevel, 'Beginner');
  } finally {
    geminiClient.generateGuidance = original;
  }
});

test('server session enforces DSA plus Aptitude and exactly five questions each', async () => {
  const previous = process.env.SKIP_GEMINI_AI;
  process.env.SKIP_GEMINI_AI = 'true';
  try {
    const session = await assessmentSessionService.startSession({
      studentId: 'student-test-session',
      assessmentType: 'initial',
      targetQuestionsPerSubject: 7,
      assessmentInput: {
        subjects: [
          { subject: 'DSA', studentLevel: 'Beginner', topics: [{ id: 'arrays', name: 'Arrays & Strings' }] },
          { subject: 'Aptitude', studentLevel: 'Intermediate', topics: [{ id: 'percentages', name: 'Percentages' }] },
          { subject: 'DBMS', studentLevel: 'Advanced', topics: [{ id: 'sql-basics-queries', name: 'SQL Basics & Queries' }] }
        ]
      }
    });
    assert.equal(session.totalSubjects, 2);
    assert.equal(session.targetQuestionsPerSubject, 5);
    assert.equal(session.currentSubjectName, 'DSA');
  } finally {
    if (previous === undefined) delete process.env.SKIP_GEMINI_AI;
    else process.env.SKIP_GEMINI_AI = previous;
  }
});

test('completed server session records ten answers, skips, confidence, and timing for its owner', async () => {
  const previous = process.env.SKIP_GEMINI_AI;
  process.env.SKIP_GEMINI_AI = 'true';
  try {
    const session = await assessmentSessionService.startSession({
      studentId: 'student-complete-session',
      assessmentType: 'initial',
      assessmentInput: {
        subjects: [
          { subject: 'DSA', studentLevel: 'Beginner', topics: [{ id: 'arrays', name: 'Arrays & Strings' }] },
          { subject: 'Aptitude', studentLevel: 'Intermediate', topics: [{ id: 'percentages', name: 'Percentages' }] }
        ]
      }
    });
    let current = session;
    for (let index = 0; index < 5; index += 1) {
      const question = current.currentQuestion;
      const skipped = index === 2;
      const result = await assessmentSessionService.submitAnswer({
        assessmentId: session.assessmentId,
        questionId: question.questionId,
        answer: skipped ? null : question.correctAnswer,
        confidence: index === 0 ? 'guessing' : 'very_confident',
        isSkipped: skipped
      });
      current = result.session;
    }
    current = await assessmentSessionService.continueToNextSubject(session.assessmentId);
    for (let index = 0; index < 5; index += 1) {
      const question = current.currentQuestion;
      const result = await assessmentSessionService.submitAnswer({
        assessmentId: session.assessmentId,
        questionId: question.questionId,
        answer: question.correctAnswer,
        confidence: 'confident'
      });
      current = result.session;
    }

    const completed = assessmentSessionService.getCompletedSessionForStudent(session.assessmentId, 'student-complete-session');
    assert.equal(completed.responses.length, 10);
    assert.equal(completed.responses.filter(item => item.subject === 'DSA').length, 5);
    assert.equal(completed.responses.filter(item => item.subject === 'Aptitude').length, 5);
    assert.equal(completed.responses.filter(item => item.skipped).length, 1);
    assert.equal(completed.responses[0].confidence, 'guessing');
    assert.ok(completed.responses.every(item => item.timeTaken >= 1));
    assert.equal(assessmentSessionService.getCompletedSessionForStudent(session.assessmentId, 'somebody-else'), null);
  } finally {
    if (previous === undefined) delete process.env.SKIP_GEMINI_AI;
    else process.env.SKIP_GEMINI_AI = previous;
  }
});
