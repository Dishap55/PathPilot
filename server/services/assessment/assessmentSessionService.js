/**
 * ASSESSMENT SESSION SERVICE (STEP 2 - SERVER)
 * 
 * Orchestrates dynamic assessment sessions:
 * - Multi-subject tracking (7 questions per subject)
 * - Deterministic correctness calculation
 * - Timing tracking (Question, Subject, Overall)
 * - Confidence recording (stored separately from correctness)
 * - Deterministic adaptive difficulty transition
 * - Skip behavior without correctness penalty
 * - Subject transitions & final session completion
 * - Persistence to existing database schema (assessments table with summary_ref)
 */

const { getStartingDifficulty, calculateNextDifficulty } = require('./adaptiveDifficultyController');
const { selectNextTopic } = require('./topicSelectionEngine');
const { generateAdaptiveQuestion } = require('./geminiQuestionService');
const { resolveSubject } = require('../../constants/canonicalTopicRegistry');

// In-memory active session cache
const activeSessions = new Map();

const TARGET_QUESTIONS_PER_SUBJECT = 7;

/**
 * Normalizes assessment input into an array of subject configs.
 */
function extractSubjectConfigs(assessmentInput) {
  if (!assessmentInput) return [];
  if (Array.isArray(assessmentInput.subjects)) {
    return assessmentInput.subjects;
  }
  if (assessmentInput.subject && assessmentInput.studentLevel) {
    return [assessmentInput];
  }
  return [];
}

/**
 * Initializes a new dynamic assessment session.
 */
async function startSession({
  studentId = 'guest',
  assessmentInput,
  targetQuestionsPerSubject = null,
  assessmentType = null,
  previousAttemptResponses = []
}) {
  const normalizedType = assessmentType || 'initial';
  if (!['initial', 'periodic'].includes(normalizedType)) {
    throw new Error('Unsupported assessment type.');
  }

  let subjects = extractSubjectConfigs(assessmentInput);
  if (normalizedType === 'initial' || normalizedType === 'periodic') {
    subjects = subjects.filter(s => ['DSA', 'APTITUDE'].includes((s.subject || '').toUpperCase()));
    const included = new Set(subjects.map(s => (s.subject || '').toUpperCase()));
    if (!included.has('DSA') || !included.has('APTITUDE') || (normalizedType === 'periodic' && subjects.length !== 2)) {
      throw new Error('Initial and Periodic Assessments require one DSA and one Aptitude configuration.');
    }
  }
  if (subjects.length === 0) {
    throw new Error('Cannot start assessment session: No valid subjects found in Assessment Input.');
  }

  if (normalizedType === 'periodic') {
    const existingSession = [...activeSessions.values()].find(session =>
      session.studentId === studentId &&
      session.assessmentType === 'periodic' &&
      (session.status !== 'completed' || !session.completionPersisted)
    );
    if (existingSession) return sanitizeSessionForClient(existingSession);
  }

  const assessmentId = `asm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = Date.now();

  const firstSubject = subjects[0];
  const startingDiff = getStartingDifficulty(firstSubject.studentLevel);
  const firstTopic = selectNextTopic({
    subject: firstSubject.subject,
    canonicalTopics: firstSubject.topics,
    askedTopicIds: []
  });

  const previousQuestionIds = previousAttemptResponses.map(response => response.questionId).filter(Boolean);
  const previousQuestionContents = previousAttemptResponses.map(response => response.question).filter(Boolean);

  const firstQuestion = await generateAdaptiveQuestion({
    subject: firstSubject.subject,
    studentLevel: firstSubject.studentLevel,
    canonicalTopics: firstSubject.topics,
    currentTopic: firstTopic,
    currentDifficulty: startingDiff,
    askedQuestionIds: previousQuestionIds,
    askedQuestionContents: previousQuestionContents
  });

  const targetCount = normalizedType === 'initial' || normalizedType === 'periodic'
    ? 5
    : (targetQuestionsPerSubject || TARGET_QUESTIONS_PER_SUBJECT);

  const session = {
    assessmentId,
    studentId,
    assessmentType: normalizedType,
    subjects,
    currentSubjectIndex: 0,
    currentQuestionIndex: 0,
    targetQuestionsPerSubject: targetCount,
    currentDifficulty: startingDiff,
    currentTopic: firstTopic,
    currentQuestion: firstQuestion,
    questionResponses: [],
    previousQuestionIds,
    previousQuestionContents,
    completionPersisted: false,
    status: 'in_progress', // 'in_progress' | 'subject_transition' | 'completed'

    // Timers
    assessmentStartTime: now,
    assessmentEndTime: null,
    totalAssessmentTime: 0,

    subjectStartTime: now,
    subjectEndTime: null,
    subjectTime: 0,

    questionStartTime: now,
    questionEndTime: null,

    // Performance tracking per subject
    subjectMetrics: subjects.map(s => ({
      subject: s.subject,
      studentLevel: s.studentLevel,
      questionsAnswered: 0,
      correctCount: 0,
      skippedCount: 0,
      timeSpent: 0
    }))
  };

  activeSessions.set(assessmentId, session);

  return sanitizeSessionForClient(session);
}

/**
 * Evaluates an answer deterministically.
 */
function evaluateAnswer(question, answer, isSkipped = false, testCasesPassed = null) {
  if (isSkipped) {
    return { isCorrect: false, isSkipped: true };
  }

  if (!question) return { isCorrect: false, isSkipped: false };

  if (question.questionType === 'mcq') {
    const correctAns = question.correctAnswer;
    if (correctAns === undefined || correctAns === null) return { isCorrect: false, isSkipped: false };

    // Direct string match
    if (typeof answer === 'string' && typeof correctAns === 'string') {
      const isMatch = answer.trim().toLowerCase() === correctAns.trim().toLowerCase();
      return { isCorrect: isMatch, isSkipped: false };
    }

    // Index match
    if (typeof answer === 'number') {
      const isMatch = question.options[answer] === correctAns || answer === correctAns;
      return { isCorrect: isMatch, isSkipped: false };
    }

    return {
      isCorrect: String(answer).trim().toLowerCase() === String(correctAns).trim().toLowerCase(),
      isSkipped: false
    };
  }

  if (question.questionType === 'coding') {
    // If student ran test cases and at least 1 passed, or submitted valid solution attempt
    const passedCount = testCasesPassed !== null ? Number(testCasesPassed) : 1;
    const hasAttempt = typeof answer === 'string' && answer.trim().length > 15;
    return { isCorrect: passedCount > 0 || hasAttempt, isSkipped: false };
  }

  return { isCorrect: false, isSkipped: false };
}

/**
 * Submits an answer for the active question.
 */
async function submitAnswer({
  assessmentId,
  studentId = null,
  questionId,
  answer = null,
  confidence = 'confident',
  codingLanguage = null,
  codeSubmitted = null,
  testCasesPassed = null,
  isSkipped = false
}) {
  const session = activeSessions.get(assessmentId);
  if (!session) {
    throw new Error(`Assessment session "${assessmentId}" not found or expired.`);
  }
  if (studentId && session.studentId !== studentId) {
    throw new Error('Assessment session does not belong to the signed-in student.');
  }

  if (!questionId) throw new Error('The active assessment question is required.');
  const previousSubmission = session.questionResponses.find(response => response.questionId === questionId);
  if (previousSubmission) {
    return {
      isCorrect: previousSubmission.correct,
      isSkipped: previousSubmission.skipped,
      recordedConfidence: previousSubmission.confidence,
      timeTaken: previousSubmission.timeTaken,
      session: sanitizeSessionForClient(session),
      idempotentRetry: true
    };
  }
  if (session.status === 'completed') throw new Error('Assessment session has already been completed.');

  const currentQ = session.currentQuestion;
  if (!currentQ || currentQ.questionId !== questionId) {
    throw new Error('The submitted question is no longer active.');
  }

  const now = Date.now();
  const qStartTime = session.questionStartTime || now;
  const timeTaken = Math.max(1, Math.round((now - qStartTime) / 1000));

  const { isCorrect, isSkipped: skippedFlag } = evaluateAnswer(currentQ, answer, isSkipped, testCasesPassed);

  // Record response
  const responseRecord = {
    questionId: currentQ.questionId,
    question: currentQ.question || currentQ.prompt || null,
    subject: currentQ.subject,
    topicId: currentQ.topicId,
    topicName: currentQ.topicName,
    difficulty: currentQ.difficulty,
    questionType: currentQ.questionType,
    answer,
    correct: isCorrect,
    skipped: skippedFlag,
    confidence: confidence || 'confident',
    timeTaken,
    questionStartTime: qStartTime,
    questionEndTime: now,
    codingLanguage,
    codeSubmitted,
    testCasesPassed
  };

  session.questionResponses.push(responseRecord);

  // Update subject metrics
  const currMetric = session.subjectMetrics[session.currentSubjectIndex];
  if (currMetric) {
    currMetric.questionsAnswered += 1;
    if (isCorrect) currMetric.correctCount += 1;
    if (skippedFlag) currMetric.skippedCount += 1;
    currMetric.timeSpent += timeTaken;
  }

  // Calculate next difficulty
  const nextDiff = calculateNextDifficulty({
    currentDifficulty: currentQ.difficulty,
    isCorrect,
    isSkipped: skippedFlag,
    recentPerformance: session.questionResponses.slice(-3)
  });
  session.currentDifficulty = nextDiff;

  // Check if current subject reached target question count
  const nextQIndex = session.currentQuestionIndex + 1;
  const isSubjectDone = nextQIndex >= session.targetQuestionsPerSubject;

  if (isSubjectDone) {
    session.subjectEndTime = now;
    session.subjectTime += Math.max(1, Math.round((now - session.subjectStartTime) / 1000));

    const isLastSubject = session.currentSubjectIndex + 1 >= session.subjects.length;
    if (isLastSubject) {
      // Completed entire multi-subject assessment
      session.status = 'completed';
      session.assessmentEndTime = now;
      session.totalAssessmentTime = Math.max(1, Math.round((now - session.assessmentStartTime) / 1000));
      session.currentQuestion = null;

      try {
        const { analyzeInitialAssessment } = require('./assessmentAnalysisEngine');
        session.analysis = analyzeInitialAssessment({
          assessmentId: session.assessmentId,
          studentId: session.studentId,
          assessmentType: session.assessmentType,
          responses: session.questionResponses,
          subjects: session.subjects,
          assessmentStartTime: session.assessmentStartTime,
          assessmentEndTime: now
        });
      } catch (e) {}
    } else {
      // Transition to next subject
      session.status = 'subject_transition';
      session.currentQuestion = null;
    }
  } else {
    // Continue within current subject
    session.currentQuestionIndex = nextQIndex;

    const activeSubject = session.subjects[session.currentSubjectIndex];
    const isDsa = (activeSubject.subject || '').toUpperCase() === 'DSA';
    const hasAskedCoding = session.questionResponses.some(r => (r.subject || '').toUpperCase() === 'DSA' && r.questionType === 'coding');
    const isMandatoryCodingSlot = isDsa && !hasAskedCoding && (nextQIndex === session.targetQuestionsPerSubject - 1);
    const preferredQuestionType = isMandatoryCodingSlot ? 'coding' : 'mcq';
    const nextQuestionDiff = isMandatoryCodingSlot ? 'Easy' : nextDiff;

    const askedTopicIds = session.questionResponses
      .filter(r => r.subject === activeSubject.subject)
      .map(r => r.topicId);

    let nextTopic = selectNextTopic({
      subject: activeSubject.subject,
      canonicalTopics: activeSubject.topics,
      askedTopicIds
    });

    if (isMandatoryCodingSlot) {
      const availableCodingTopicIds = ['two-pointers', 'arrays', 'binary-search', 'sorting'];
      const unaskedCodingTopics = activeSubject.topics.filter(t => 
        availableCodingTopicIds.includes(t.id) && !askedTopicIds.includes(t.id)
      );
      const codingCandidates = unaskedCodingTopics.length > 0 
        ? unaskedCodingTopics 
        : activeSubject.topics.filter(t => availableCodingTopicIds.includes(t.id));
      
      if (codingCandidates.length > 0) {
        const randIdx = Math.floor(Math.random() * codingCandidates.length);
        nextTopic = codingCandidates[randIdx];
      }
    }

    session.currentTopic = nextTopic;

    const askedQuestionIds = [...session.previousQuestionIds, ...session.questionResponses.map(r => r.questionId)];
    const askedContents = [...session.previousQuestionContents, ...session.questionResponses.map(r => r.question).filter(Boolean)];

    // Generate next question
    const nextQuestion = await generateAdaptiveQuestion({
      subject: activeSubject.subject,
      studentLevel: activeSubject.studentLevel,
      canonicalTopics: activeSubject.topics,
      currentTopic: nextTopic,
      currentDifficulty: nextQuestionDiff,
      previousResult: { correct: isCorrect, skipped: skippedFlag, confidence, timeTaken },
      recentPerformance: session.questionResponses.slice(-3),
      askedQuestionIds,
      askedQuestionContents: askedContents,
      preferredQuestionType
    });

    session.currentQuestion = nextQuestion;
    session.questionStartTime = Date.now();
  }

  return {
    isCorrect,
    isSkipped: skippedFlag,
    recordedConfidence: confidence,
    timeTaken,
    nextDifficulty: session.currentDifficulty,
    session: sanitizeSessionForClient(session)
  };
}

/**
 * Transitions the session to the next subject.
 */
async function continueToNextSubject(assessmentId, studentId = null) {
  const session = activeSessions.get(assessmentId);
  if (!session) {
    throw new Error(`Assessment session "${assessmentId}" not found.`);
  }
  if (studentId && session.studentId !== studentId) {
    throw new Error('Assessment session does not belong to the signed-in student.');
  }

  if (session.status !== 'subject_transition') {
    throw new Error('Assessment session is not currently waiting for subject transition.');
  }

  const nextSubjIndex = session.currentSubjectIndex + 1;
  if (nextSubjIndex >= session.subjects.length) {
    session.status = 'completed';
    return sanitizeSessionForClient(session);
  }

  session.currentSubjectIndex = nextSubjIndex;
  session.currentQuestionIndex = 0;
  session.status = 'in_progress';

  const now = Date.now();
  session.subjectStartTime = now;
  session.subjectEndTime = null;

  const nextSubj = session.subjects[nextSubjIndex];
  const startingDiff = getStartingDifficulty(nextSubj.studentLevel);
  session.currentDifficulty = startingDiff;

  const firstTopic = selectNextTopic({
    subject: nextSubj.subject,
    canonicalTopics: nextSubj.topics,
    askedTopicIds: []
  });
  session.currentTopic = firstTopic;

  const askedQuestionIds = [...session.previousQuestionIds, ...session.questionResponses.map(r => r.questionId)];
  const askedContents = [...session.previousQuestionContents, ...session.questionResponses.map(r => r.question).filter(Boolean)];

  const nextQuestion = await generateAdaptiveQuestion({
    subject: nextSubj.subject,
    studentLevel: nextSubj.studentLevel,
    canonicalTopics: nextSubj.topics,
    currentTopic: firstTopic,
    currentDifficulty: startingDiff,
    askedQuestionIds,
    askedQuestionContents: askedContents
  });

  session.currentQuestion = nextQuestion;
  session.questionStartTime = Date.now();

  return sanitizeSessionForClient(session);
}

/**
 * Retrieves the session state by ID.
 */
function getSession(assessmentId, studentId = null) {
  const session = activeSessions.get(assessmentId);
  if (!session || (studentId && session.studentId !== studentId)) return null;
  return sanitizeSessionForClient(session);
}

function getCompletedSessionForStudent(assessmentId, studentId) {
  const session = activeSessions.get(assessmentId);
  if (!session || session.studentId !== studentId || session.status !== 'completed') return null;
  return {
    assessmentId: session.assessmentId,
    studentId: session.studentId,
    assessmentType: session.assessmentType,
    subjects: session.subjects,
    responses: session.questionResponses,
    assessmentStartTime: session.assessmentStartTime,
    assessmentEndTime: session.assessmentEndTime
  };
}

/**
 * Strips sensitive internal fields before sending session to frontend.
 */
function sanitizeSessionForClient(session) {
  return {
    assessmentId: session.assessmentId,
    studentId: session.studentId,
    assessmentType: session.assessmentType,
    status: session.status,
    totalSubjects: session.subjects.length,
    currentSubjectIndex: session.currentSubjectIndex,
    currentSubjectName: session.subjects[session.currentSubjectIndex]?.subject,
    currentStudentLevel: session.subjects[session.currentSubjectIndex]?.studentLevel,
    currentQuestionIndex: session.currentQuestionIndex,
    targetQuestionsPerSubject: session.targetQuestionsPerSubject,
    currentDifficulty: session.currentDifficulty,
    currentTopic: session.currentTopic,
    currentQuestion: session.currentQuestion,
    assessmentStartTime: session.assessmentStartTime,
    subjectStartTime: session.subjectStartTime,
    questionStartTime: session.questionStartTime,
    subjectMetrics: session.subjectMetrics,
    assessmentEndTime: session.assessmentEndTime,
    totalAssessmentTime: session.totalAssessmentTime,
    completionPersisted: Boolean(session.completionPersisted),
    totalResponsesCount: session.questionResponses.length,
    responsesSummary: session.questionResponses.map(r => ({
      questionId: r.questionId,
      subject: r.subject,
      topicId: r.topicId,
      difficulty: r.difficulty,
      correct: r.correct,
      skipped: r.skipped,
      confidence: r.confidence,
      timeTaken: r.timeTaken
    }))
  };
}

module.exports = {
  TARGET_QUESTIONS_PER_SUBJECT,
  startSession,
  submitAnswer,
  continueToNextSubject,
  getSession,
  getCompletedSessionForStudent,
  markSessionPersisted: (assessmentId, studentId) => {
    const session = activeSessions.get(assessmentId);
    if (!session || session.studentId !== studentId || session.status !== 'completed') return false;
    session.completionPersisted = true;
    return true;
  },
  evaluateAnswer
};
