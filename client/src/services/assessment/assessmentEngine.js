/**
 * ASSESSMENT ENGINE (STEP 2 - CLIENT)
 * 
 * Client-side assessment engine providing:
 * - Deterministic session lifecycle & timing
 * - Starting difficulty calibration from Step 1 Assessment Input
 * - Question-by-question adaptive flow (~7 questions per subject)
 * - Deterministic correctness & separate confidence storage
 * - Skip behavior without penalty
 * - Subject transitions for multi-subject assessments
 * - Automatic localStorage persistence & recovery against accidental refresh
 * - Dual-mode operation (API sync with fallback to local canonical engine)
 */

import { getStartingDifficulty, calculateNextDifficulty } from './adaptiveDifficultyController.js';
import { selectNextTopic } from './topicSelectionEngine.js';
import { getFallbackQuestions, shuffleQuestion } from './canonicalQuestionBank.js';
import { validateQuestion } from './questionValidator.js';
import { apiRequest } from '../api.js';
import { analyzeInitialAssessment } from './assessmentAnalysisEngine.js';

export const TARGET_QUESTIONS_PER_SUBJECT = 7;
export const INITIAL_ASSESSMENT_TARGET_QUESTIONS = 5;
const SESSION_STORAGE_KEY = 'pathpilot_assessment_active_session';

function sessionStorageKey(assessmentType, studentId) {
  if (assessmentType === 'periodic') {
    return `${SESSION_STORAGE_KEY}_periodic_${encodeURIComponent(studentId || 'unknown')}`;
  }
  return SESSION_STORAGE_KEY;
}

/**
 * Normalizes assessment input into an array of subject configurations.
 */
export function extractSubjectConfigs(assessmentInput) {
  if (!assessmentInput) return [];
  if (Array.isArray(assessmentInput.subjects)) {
    return assessmentInput.subjects;
  }
  if (assessmentInput.subject && assessmentInput.studentLevel) {
    return [assessmentInput];
  }
  return [];
}

export class AssessmentEngine {
  constructor() {
    this.session = null;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach(fn => fn(state));
    this.saveToStorage();
  }

  getState() {
    if (!this.session) return null;
    const s = this.session;
    const currentSubj = s.subjects[s.currentSubjectIndex] || {};

    return {
      assessmentId: s.assessmentId,
      studentId: s.studentId,
      assessmentType: s.assessmentType || 'initial',
      status: s.status, // 'in_progress' | 'subject_transition' | 'completed'
      totalSubjects: s.subjects.length,
      currentSubjectIndex: s.currentSubjectIndex,
      currentSubjectName: currentSubj.subject,
      currentStudentLevel: currentSubj.studentLevel,
      currentQuestionIndex: s.currentQuestionIndex,
      targetQuestionsPerSubject: s.targetQuestionsPerSubject,
      currentDifficulty: s.currentDifficulty,
      currentTopic: s.currentTopic,
      currentQuestion: s.currentQuestion,

      // Timers
      assessmentStartTime: s.assessmentStartTime,
      subjectStartTime: s.subjectStartTime,
      questionStartTime: s.questionStartTime,

      // Metrics
      subjectMetrics: s.subjectMetrics,
      responsesCount: s.questionResponses.length,
      questionResponses: s.questionResponses,
      recentPerformance: s.questionResponses.slice(-3),
      attemptNumber: s.attemptNumber || null,
      completionPersisted: Boolean(s.completionPersisted),
      completionError: s.completionError || null,
      analysis: s.analysis || null
    };
  }

  /**
   * Initializes or resumes a session.
   */
  async initSession({ assessmentInput, studentId = 'guest', forceNew = false, targetQuestionsPerSubject = null, assessmentType = null, isTimed = true }) {
    const normalizedType = assessmentType || 'initial';
    if (!forceNew) {
      const restored = this.restoreFromStorage({ studentId, assessmentType: normalizedType });
      if (restored) return this.getState();
    }

    const subjects = extractSubjectConfigs(assessmentInput);
    if (subjects.length === 0) {
      throw new Error('Assessment Input must contain at least one valid subject.');
    }

    const assessmentId = `asm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = Date.now();
    this.serverSession = null;

    const firstSubject = subjects[0];
    const startingDiff = getStartingDifficulty(firstSubject.studentLevel);
    const firstTopic = selectNextTopic({
      subject: firstSubject.subject,
      canonicalTopics: firstSubject.topics,
      askedTopicIds: []
    });

    // Reassessment sessions are always server-backed. Initial assessment keeps
    // its existing offline fallback behavior.
    let initialQuestion = null;
    try {
      const startEndpoint = normalizedType === 'periodic'
        ? '/assessment/periodic/start'
        : '/assessment/session/start';
      const serverRes = await apiRequest(startEndpoint, {
        method: 'POST',
        body: normalizedType === 'periodic' ? JSON.stringify({}) : JSON.stringify({
          studentId,
          assessmentInput,
          assessmentType: normalizedType,
          targetQuestionsPerSubject: targetQuestionsPerSubject || INITIAL_ASSESSMENT_TARGET_QUESTIONS
        })
      });
      const serverSession = serverRes?.data || serverRes;
      if (serverSession?.currentQuestion) {
        if (normalizedType === 'periodic' && serverSession.assessmentType !== 'periodic') {
          throw new Error('The server did not create a periodic assessment session.');
        }
        initialQuestion = serverSession.currentQuestion;
        this.serverSession = serverSession;
      }
    } catch (apiErr) {
      if (normalizedType === 'periodic') throw apiErr;
      // Initial Assessment retains its existing local fallback.
    }

    if (!initialQuestion) {
      if (normalizedType === 'periodic') {
        throw new Error('A real reassessment session could not be started. Please retry when the server is available.');
      }
      initialQuestion = this.generateLocalQuestion({
        subject: firstSubject.subject,
        studentLevel: firstSubject.studentLevel,
        currentTopic: firstTopic,
        difficulty: startingDiff,
        askedIds: []
      });
    }

    const targetQuestions = normalizedType === 'initial' || normalizedType === 'periodic'
      ? INITIAL_ASSESSMENT_TARGET_QUESTIONS
      : (targetQuestionsPerSubject || TARGET_QUESTIONS_PER_SUBJECT);

    this.session = {
      assessmentId: this.serverSession?.assessmentId || assessmentId,
      studentId,
      assessmentType: normalizedType,
      subjects,
      currentSubjectIndex: 0,
      currentQuestionIndex: 0,
      targetQuestionsPerSubject: targetQuestions,
      currentDifficulty: startingDiff,
      currentTopic: firstTopic,
      currentQuestion: initialQuestion,
      questionResponses: [],
      completionPersisted: false,
      status: 'in_progress',

      assessmentStartTime: this.serverSession?.assessmentStartTime || now,
      assessmentEndTime: null,
      totalAssessmentTime: 0,

      subjectStartTime: this.serverSession?.subjectStartTime || now,
      subjectEndTime: null,
      subjectTime: 0,

      questionStartTime: this.serverSession?.questionStartTime || now,
      questionEndTime: null,

      subjectMetrics: subjects.map(s => ({
        subject: s.subject,
        studentLevel: s.studentLevel,
        questionsAnswered: 0,
        correctCount: 0,
        skippedCount: 0,
        timeSpent: 0
      }))
    };

    this.notify();
    return this.getState();
  }

  /**
   * Generates a local validated question from the canonical question bank.
   */
  generateLocalQuestion({ subject, studentLevel, currentTopic, difficulty, askedIds = [], preferredQuestionType = 'mcq' }) {
    const candidates = getFallbackQuestions({
      subject,
      topicId: currentTopic.id,
      difficulty,
      excludedIds: askedIds,
      questionType: preferredQuestionType
    });

    const chosen = candidates[0] || getFallbackQuestions({ subject, excludedIds: askedIds, questionType: preferredQuestionType })[0];
    const validation = validateQuestion(chosen, { askedQuestionIds: askedIds });

    if (!validation.isValid) {
      console.warn('[AssessmentEngine] Question candidate failed validation:', validation.errors);
    }

    const finalQ = {
      ...chosen,
      isAiGenerated: false,
      isFallback: true
    };
    return shuffleQuestion(finalQ);
  }

  /**
   * Evaluates question correctness deterministically.
   */
  evaluateAnswer(question, answer, isSkipped = false, testCasesPassed = null) {
    if (isSkipped) {
      return { isCorrect: false, isSkipped: true };
    }

    if (!question) return { isCorrect: false, isSkipped: false };

    if (question.questionType === 'mcq') {
      const correctAns = question.correctAnswer;
      if (correctAns === undefined || correctAns === null) return { isCorrect: false, isSkipped: false };

      if (typeof answer === 'string' && typeof correctAns === 'string') {
        return { isCorrect: answer.trim().toLowerCase() === correctAns.trim().toLowerCase(), isSkipped: false };
      }

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
      if (isSkipped) return { isCorrect: false, isSkipped: true };
      const passedCount = testCasesPassed !== null ? Number(testCasesPassed) : 1;
      const hasAttempt = typeof answer === 'string' && answer.trim().length > 15;
      return { isCorrect: passedCount > 0 || hasAttempt, isSkipped: false };
    }

    return { isCorrect: false, isSkipped: false };
  }

  /**
   * Submits an answer or skip for the current active question.
   */
  async submitAnswer({
    answer = null,
    confidence = 'confident',
    codingLanguage = null,
    codeSubmitted = null,
    testCasesPassed = null,
    isSkipped = false
  }) {
    if (!this.session) throw new Error('No active assessment session.');
    if (this.session.status === 'completed') throw new Error('Assessment session already completed.');

    const s = this.session;
    const currentQ = s.currentQuestion;
    const now = Date.now();
    const qStartTime = s.questionStartTime || now;
    let timeTaken = Math.max(1, Math.round((now - qStartTime) / 1000));

    const { isCorrect: locallyCorrect, isSkipped: skippedFlag } = this.evaluateAnswer(currentQ, answer, isSkipped, testCasesPassed);
    let isCorrect = locallyCorrect;
    let serverResult = null;
    try {
      const response = await apiRequest('/assessment/session/submit-answer', {
        method: 'POST',
        body: JSON.stringify({
          assessmentId: s.assessmentId,
          questionId: currentQ.questionId,
          answer,
          confidence,
          codingLanguage,
          codeSubmitted,
          testCasesPassed,
          isSkipped: skippedFlag
        })
      });
      serverResult = response?.data || response;
      if (typeof serverResult?.isCorrect === 'boolean') isCorrect = serverResult.isCorrect;
      if (Number.isFinite(serverResult?.timeTaken)) timeTaken = serverResult.timeTaken;
    } catch (err) {
      if (s.assessmentType === 'periodic') {
        throw new Error(`Your answer was not confirmed by the assessment server. ${err.message}`);
      }
      // Offline mode continues with the local deterministic engine.
    }

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

    s.questionResponses.push(responseRecord);

    // Update subject metrics
    const currMetric = s.subjectMetrics[s.currentSubjectIndex];
    if (currMetric) {
      currMetric.questionsAnswered += 1;
      if (isCorrect) currMetric.correctCount += 1;
      if (skippedFlag) currMetric.skippedCount += 1;
      currMetric.timeSpent += timeTaken;
    }

    // Deterministic adaptive difficulty adjustment
    const nextDiff = calculateNextDifficulty({
      currentDifficulty: currentQ.difficulty,
      isCorrect,
      isSkipped: skippedFlag,
      recentPerformance: s.questionResponses.slice(-3)
    });
    s.currentDifficulty = nextDiff;

    // Check if subject is complete
    const nextQIndex = s.currentQuestionIndex + 1;
    const isSubjectDone = nextQIndex >= s.targetQuestionsPerSubject;

    if (isSubjectDone) {
      s.subjectEndTime = now;
      s.subjectTime += Math.max(1, Math.round((now - s.subjectStartTime) / 1000));

      const isLastSubject = s.currentSubjectIndex + 1 >= s.subjects.length;
      if (isLastSubject) {
        s.status = 'completed';
        s.assessmentEndTime = now;
        s.totalAssessmentTime = Math.max(1, Math.round((now - s.assessmentStartTime) / 1000));
        s.currentQuestion = null;

        // Perform authoritative deterministic analysis
        try {
          const analysis = analyzeInitialAssessment({
            assessmentId: s.assessmentId,
            studentId: s.studentId,
            assessmentType: s.assessmentType || 'initial',
            responses: s.questionResponses,
            subjects: s.subjects,
            assessmentStartTime: s.assessmentStartTime,
            assessmentEndTime: now
          });
          s.analysis = analysis;

          if (s.assessmentType === 'periodic') {
            s.analysis.questionResponses = s.questionResponses;
            s.status = 'completion_pending';
            s.completionError = null;
            await this.retryCompletion();
          } else {
            // Initial Assessment persistence behavior remains unchanged.
            if (typeof window !== 'undefined' && window.localStorage) {
              window.localStorage.setItem(`pathpilot_initial_assessment_result_${s.studentId}`, JSON.stringify(analysis));
              window.localStorage.setItem(`pathpilot_assessment_completed_${s.studentId}`, 'true');
            }

            const response = await apiRequest('/assessment/initial/complete', {
              method: 'POST',
              body: JSON.stringify({
                assessmentId: s.assessmentId,
                studentId: s.studentId,
                responses: s.questionResponses,
                subjects: s.subjects,
                assessmentStartTime: s.assessmentStartTime,
                assessmentEndTime: now
              })
            });
            const persistedAnalysis = response?.data || response;
            if (persistedAnalysis?.dsaResult && persistedAnalysis?.aptitudeResult) {
              s.analysis = persistedAnalysis;
              if (typeof window !== 'undefined' && window.localStorage) {
                window.localStorage.setItem(`pathpilot_initial_assessment_result_${s.studentId}`, JSON.stringify(persistedAnalysis));
              }
            }
          }
        } catch (analysisErr) {
          if (s.assessmentType !== 'periodic') {
            console.warn('[AssessmentEngine] Assessment persistence notice:', analysisErr.message);
          } else {
            s.status = 'completion_pending';
            s.completionError = analysisErr.message;
          }
        }
      } else {
        s.status = 'subject_transition';
        s.currentQuestion = null;
      }
    } else {
      // Advance to next question in current subject
      s.currentQuestionIndex = nextQIndex;

      const activeSubject = s.subjects[s.currentSubjectIndex];
      const isDsa = (activeSubject.subject || '').toUpperCase() === 'DSA';
      const hasAskedCoding = s.questionResponses.some(r => (r.subject || '').toUpperCase() === 'DSA' && r.questionType === 'coding');
      const isMandatoryCodingSlot = isDsa && !hasAskedCoding && (nextQIndex === s.targetQuestionsPerSubject - 1);
      const preferredType = isMandatoryCodingSlot ? 'coding' : 'mcq';
      const nextQuestionDiff = isMandatoryCodingSlot ? 'Easy' : nextDiff;

      const askedTopicIds = s.questionResponses
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
      s.currentTopic = nextTopic;

      const askedQuestionIds = s.questionResponses.map(r => r.questionId);

      // Try server for AI generation first, fallback to local canonical bank
      let nextQuestion = serverResult?.session?.currentQuestion || null;

      if (!nextQuestion) {
        nextQuestion = this.generateLocalQuestion({
          subject: activeSubject.subject,
          studentLevel: activeSubject.studentLevel,
          currentTopic: nextTopic,
          difficulty: nextQuestionDiff,
          askedIds: askedQuestionIds,
          preferredQuestionType: preferredType
        });
      }

      s.currentQuestion = nextQuestion;
      s.questionStartTime = Date.now();
    }

    this.notify();

    return {
      isCorrect,
      isSkipped: skippedFlag,
      confidence,
      timeTaken,
      nextDifficulty: s.currentDifficulty,
      state: this.getState()
    };
  }

  /**
   * Advances the assessment from subject transition to the next subject.
   */
  async continueToNextSubject() {
    if (!this.session) throw new Error('No active assessment session.');
    const s = this.session;
    if (s.status !== 'subject_transition') {
      throw new Error('Assessment session is not in subject transition state.');
    }

    if (s.assessmentType === 'periodic') {
      const response = await apiRequest('/assessment/session/next-subject', {
        method: 'POST',
        body: JSON.stringify({ assessmentId: s.assessmentId })
      });
      const serverSession = response?.data || response;
      if (!serverSession?.currentQuestion || serverSession.assessmentType !== 'periodic') {
        throw new Error('The server could not resume the next reassessment subject.');
      }
      s.currentSubjectIndex = serverSession.currentSubjectIndex;
      s.currentQuestionIndex = serverSession.currentQuestionIndex;
      s.status = serverSession.status;
      s.currentDifficulty = serverSession.currentDifficulty;
      s.currentTopic = serverSession.currentTopic;
      s.currentQuestion = serverSession.currentQuestion;
      s.questionStartTime = serverSession.questionStartTime || Date.now();
      s.subjectStartTime = serverSession.subjectStartTime || Date.now();
      s.subjectMetrics = serverSession.subjectMetrics || s.subjectMetrics;
      this.notify();
      return this.getState();
    }

    const nextSubjIndex = s.currentSubjectIndex + 1;
    if (nextSubjIndex >= s.subjects.length) {
      s.status = 'completed';
      this.notify();
      return this.getState();
    }

    s.currentSubjectIndex = nextSubjIndex;
    s.currentQuestionIndex = 0;
    s.status = 'in_progress';

    const now = Date.now();
    s.subjectStartTime = now;
    s.subjectEndTime = null;

    const nextSubj = s.subjects[nextSubjIndex];
    const startingDiff = getStartingDifficulty(nextSubj.studentLevel);
    s.currentDifficulty = startingDiff;

    const firstTopic = selectNextTopic({
      subject: nextSubj.subject,
      canonicalTopics: nextSubj.topics,
      askedTopicIds: []
    });
    s.currentTopic = firstTopic;

    const askedQuestionIds = s.questionResponses.map(r => r.questionId);

    let nextQuestion = null;
    try {
      const response = await apiRequest('/assessment/session/next-subject', {
        method: 'POST',
        body: JSON.stringify({ assessmentId: s.assessmentId })
      });
      const serverSession = response?.data || response;
      nextQuestion = serverSession?.currentQuestion || null;
      if (serverSession?.questionStartTime) s.questionStartTime = serverSession.questionStartTime;
    } catch (err) {
      // Offline mode continues with the local deterministic engine.
    }

    if (!nextQuestion) nextQuestion = this.generateLocalQuestion({
      subject: nextSubj.subject,
      studentLevel: nextSubj.studentLevel,
      currentTopic: firstTopic,
      difficulty: startingDiff,
      askedIds: askedQuestionIds
    });

    s.currentQuestion = nextQuestion;
    if (!s.questionStartTime) s.questionStartTime = Date.now();

    this.notify();
    return this.getState();
  }

  async retryCompletion() {
    const s = this.session;
    if (!s || s.assessmentType !== 'periodic' || !['completion_pending', 'completed'].includes(s.status)) {
      throw new Error('There is no periodic assessment completion to retry.');
    }

    s.status = 'completion_pending';
    s.completionError = null;
    try {
      const response = await apiRequest('/assessment/periodic/complete', {
        method: 'POST',
        body: JSON.stringify({ assessmentId: s.assessmentId })
      });
      const result = response?.data || response;
      if (result?.assessmentId !== s.assessmentId || result?.assessmentType !== 'periodic' || !result?.dsaResult || !result?.aptitudeResult) {
        throw new Error('The server returned an incomplete reassessment result.');
      }
      s.analysis = result;
      s.attemptNumber = result.attemptNumber;
      s.status = 'completed';
      s.completionPersisted = true;
      this.notify();
      return true;
    } catch (error) {
      s.status = 'completion_pending';
      s.completionError = error.message;
      this.notify();
      return false;
    }
  }

  /**
   * LocalStorage persistence helpers.
   */
  saveToStorage() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      if (this.session) {
        const key = sessionStorageKey(this.session.assessmentType, this.session.studentId);
        if (this.session.assessmentType === 'periodic' && this.session.status === 'completed' && this.session.completionPersisted) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(this.session));
        }
      }
    } catch (e) {
      console.warn('[AssessmentEngine] Storage write notice:', e.message);
    }
  }

  restoreFromStorage({ studentId = null, assessmentType = 'initial' } = {}) {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    try {
      const key = sessionStorageKey(assessmentType, studentId);
      const raw = window.localStorage.getItem(key);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      const parsedType = parsed?.assessmentType || 'initial';
      if (parsed && parsed.assessmentId && Array.isArray(parsed.subjects) &&
        parsed.studentId === studentId && parsedType === assessmentType &&
        !(assessmentType === 'periodic' && parsed.status === 'completed' && parsed.completionPersisted)) {
        this.session = parsed;
        return true;
      }
      window.localStorage.removeItem(key);
      return false;
    } catch (e) {
      console.warn('[AssessmentEngine] Storage read notice:', e.message);
      return false;
    }
  }

  async restoreSession({ studentId, assessmentType = 'initial' }) {
    const current = this.session;
    if (current && current.studentId === studentId && (current.assessmentType || 'initial') === assessmentType && current.status !== 'completed') {
      return this.getState();
    }

    if (!this.restoreFromStorage({ studentId, assessmentType })) return null;
    const s = this.session;
    if (assessmentType === 'periodic') {
      try {
        const response = await apiRequest(`/assessment/session/${s.assessmentId}`);
        const serverSession = response?.data || response;
        if (!serverSession?.assessmentId || serverSession.studentId !== studentId || serverSession.assessmentType !== 'periodic') {
          throw new Error('The active reassessment session could not be verified.');
        }
        if (serverSession.completionPersisted) {
          this.clearSession();
          return null;
        }
        s.status = serverSession.status === 'completed' ? 'completion_pending' : serverSession.status;
        s.currentSubjectIndex = serverSession.currentSubjectIndex;
        s.currentQuestionIndex = serverSession.currentQuestionIndex;
        s.currentDifficulty = serverSession.currentDifficulty;
        s.currentTopic = serverSession.currentTopic;
        s.currentQuestion = serverSession.currentQuestion;
        s.assessmentStartTime = serverSession.assessmentStartTime;
        s.subjectStartTime = serverSession.subjectStartTime;
        s.questionStartTime = serverSession.questionStartTime;
        s.subjectMetrics = serverSession.subjectMetrics || s.subjectMetrics;
        if (serverSession.status === 'completed') s.currentQuestion = null;
      } catch (error) {
        if (/session .*not found|expired/i.test(error.message)) {
          this.clearSession();
          return null;
        }
        throw error;
      }
    }
    this.notify();
    return this.getState();
  }

  clearSession() {
    const key = this.session
      ? sessionStorageKey(this.session.assessmentType, this.session.studentId)
      : SESSION_STORAGE_KEY;
    this.session = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(key);
      } catch (e) {}
    }
    this.listeners.forEach(fn => fn(null));
  }

  getCompletedAnalysis() {
    if (this.session && this.session.analysis) {
      return this.session.analysis;
    }
    if (typeof window !== 'undefined' && window.localStorage && this.session?.studentId) {
      try {
        const raw = window.localStorage.getItem(`pathpilot_initial_assessment_result_${this.session.studentId}`);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
    }
    return null;
  }
}

export const assessmentEngine = new AssessmentEngine();
