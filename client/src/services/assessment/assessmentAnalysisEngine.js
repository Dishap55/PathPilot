/**
 * INITIAL ASSESSMENT ANALYSIS ENGINE (STEP 3 - DETERMINISTIC)
 * 
 * Invariants:
 * 1. Scope: Only assesses DSA and Aptitude (5 questions each = 10 questions maximum).
 * 2. DBMS, OS, OOPS, CN are NOT assessed — available for direct learning from Beginner.
 * 3. Deterministic objective scoring:
 *    - Skipped questions are NOT treated as incorrect.
 *    - Difficulty-aware mastery weighting (Hard > Medium > Easy).
 *    - Confidence is evaluated separately from correctness.
 *    - Time taken is evaluated separately from correctness.
 * 4. Starting level is PRESERVED separately from assessed level.
 * 5. Every level decision has a transparent, explainable reason.
 * 6. Topic-wise classification: Strong, Developing, Needs Attention.
 * 7. AI (Gemini) is only an interpretation layer and cannot override deterministic results.
 */

// Canonical subject scope for initial assessment
export const INITIAL_ASSESSMENT_SUBJECTS = ['DSA', 'Aptitude'];
export const QUESTIONS_PER_SUBJECT = 5;

/**
 * Evaluates individual topic performance from question responses.
 */
export function analyzeTopicPerformance(responses = []) {
  const topicMap = new Map();

  responses.forEach((resp) => {
    const topicId = resp.topicId || 'general';
    const topicName = resp.topicName || 'General Topic';

    if (!topicMap.has(topicId)) {
      topicMap.set(topicId, {
        topicId,
        topicName,
        subject: resp.subject,
        questionsAsked: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        skipped: 0,
        totalTime: 0,
        difficulties: [],
        confidences: []
      });
    }

    const t = topicMap.get(topicId);
    t.questionsAsked += 1;
    t.totalTime += resp.timeTaken || 0;
    if (resp.difficulty) t.difficulties.push(resp.difficulty);
    if (resp.confidence) t.confidences.push(resp.confidence);

    if (resp.skipped) {
      t.skipped += 1;
    } else {
      t.attempted += 1;
      if (resp.correct) {
        t.correct += 1;
      } else {
        t.incorrect += 1;
      }
    }
  });

  const analyzedTopics = [];

  topicMap.forEach((t) => {
    const accuracy = t.attempted > 0 ? Math.round((t.correct / t.attempted) * 100) : 0;
    const averageTime = t.questionsAsked > 0 ? Math.round(t.totalTime / t.questionsAsked) : 0;
    
    // Determine highest difficulty reached
    let difficultyReached = 'Easy';
    if (t.difficulties.includes('Hard')) difficultyReached = 'Hard';
    else if (t.difficulties.includes('Medium')) difficultyReached = 'Medium';

    // Status classification:
    // Strong requires multiple responses and demonstrated Medium/Hard accuracy.
    // Developing: Partial accuracy (1 correct, 1 incorrect) or 1 correct Easy, or skipped without failure
    // Needs Attention: Attempted and 0 correct (failed questions)
    let status = 'Developing';
    let statusLabel = 'Developing — limited evidence; more practice will clarify mastery';
    const confidencePattern = {
      correctHighConfidence: 0,
      correctLowConfidence: 0,
      incorrectHighConfidence: 0,
      incorrectLowConfidence: 0,
      skipped: t.skipped
    };
    responses.filter(r => (r.topicId || 'general') === t.topicId).forEach(r => {
      const confidence = (r.confidence || 'confident').toLowerCase();
      const high = confidence === 'confident' || confidence === 'very_confident';
      if (r.skipped) return;
      if (r.correct && high) confidencePattern.correctHighConfidence += 1;
      else if (r.correct) confidencePattern.correctLowConfidence += 1;
      else if (high) confidencePattern.incorrectHighConfidence += 1;
      else confidencePattern.incorrectLowConfidence += 1;
    });

    if (t.attempted >= 2 && t.correct / t.attempted >= 0.8 &&
      (difficultyReached === 'Medium' || difficultyReached === 'Hard')) {
      status = 'Strong';
      statusLabel = 'Strong — based on multiple current assessment responses';
    } else if (t.attempted > 0 && t.correct === 0) {
      status = 'Needs Attention';
      statusLabel = 'Needs Attention — more practice recommended';
    } else if (t.skipped > 0 && t.attempted === 0) {
      status = 'Needs Attention';
      statusLabel = 'Needs Attention — question was skipped';
    }

    analyzedTopics.push({
      topicId: t.topicId,
      topicName: t.topicName,
      subject: t.subject,
      questionsAsked: t.questionsAsked,
      attempted: t.attempted,
      correct: t.correct,
      incorrect: t.incorrect,
      skipped: t.skipped,
      accuracy,
      difficultyReached,
      averageTime,
      confidencePattern,
      status,
      statusLabel
    });
  });

  return analyzedTopics;
}

/**
 * Analyzes confidence signals without overriding correctness.
 */
export function analyzeConfidenceDistribution(responses = []) {
  const distribution = {
    very_confident: 0,
    confident: 0,
    somewhat_confident: 0,
    guessing: 0,
    skipped: 0
  };

  let correctHighConfidence = 0;
  let correctLowConfidence = 0;
  let incorrectHighConfidence = 0;
  let incorrectLowConfidence = 0;

  responses.forEach(r => {
    const conf = (r.confidence || 'confident').toLowerCase();
    if (distribution[conf] !== undefined) {
      distribution[conf] += 1;
    } else {
      distribution.confident += 1;
    }

    const isHigh = conf === 'very_confident' || conf === 'confident';
    const isLow = conf === 'somewhat_confident' || conf === 'guessing';

    if (!r.skipped) {
      if (r.correct && isHigh) correctHighConfidence += 1;
      if (r.correct && isLow) correctLowConfidence += 1;
      if (!r.correct && isHigh) incorrectHighConfidence += 1;
      if (!r.correct && isLow) incorrectLowConfidence += 1;
    } else {
      distribution.skipped += 1;
    }
  });

  let patternDescription = 'Confidence varied across responses; use it as a reflection prompt.';
  if (incorrectHighConfidence >= 2) {
    patternDescription = 'Several high-confidence attempts had conceptual misconceptions; targeted fundamentals recommended.';
  } else if (correctLowConfidence >= 2) {
    patternDescription = 'Good intuition demonstrated despite hesitant confidence ratings; practice will build fluency.';
  } else if (correctHighConfidence >= 3) {
    patternDescription = 'Strong self-awareness and confident mastery across answered questions.';
  }

  return {
    distribution,
    correctHighConfidence,
    correctLowConfidence,
    incorrectHighConfidence,
    incorrectLowConfidence,
    patternDescription
  };
}

/**
 * Analyzes time performance without penalizing correctness.
 */
export function analyzeTiming(responses = []) {
  if (responses.length === 0) {
    return {
      totalTimeSeconds: 0,
      averageTimeSeconds: 0,
      fastestSeconds: 0,
      slowestSeconds: 0,
      paceAssessment: 'Normal pacing',
      observation: 'No responses recorded.'
    };
  }

  const times = responses.map(r => r.timeTaken || 0);
  const totalTimeSeconds = times.reduce((a, b) => a + b, 0);
  const averageTimeSeconds = Math.round(totalTimeSeconds / responses.length);
  const fastestSeconds = Math.min(...times);
  const slowestSeconds = Math.max(...times);

  let paceAssessment = 'Balanced and steady pacing';
  let observation = 'Timing is supporting context and does not change correctness or level.';

  const fastIncorrect = responses.filter(r => !r.skipped && !r.correct && (r.timeTaken || 0) < 20).length;
  const slowCorrect = responses.filter(r => !r.skipped && r.correct && (r.timeTaken || 0) > 120).length;
  if (averageTimeSeconds < 20) {
    paceAssessment = 'Fast-paced';
    observation = fastIncorrect > 0
      ? `${fastIncorrect} incorrect response${fastIncorrect === 1 ? '' : 's'} was/were submitted quickly; review these concepts and check your reasoning.`
      : 'Responses were quick; correctness remains the basis for your assessed level.';
  } else if (averageTimeSeconds > 120) {
    paceAssessment = 'Deliberate & Thoughtful';
    observation = slowCorrect > 0
      ? 'Some correct responses took longer than two minutes; practice may help build fluency.'
      : 'Responses took more time; timing does not lower your assessed level.';
  }

  return {
    totalTimeSeconds,
    averageTimeSeconds,
    fastestSeconds,
    slowestSeconds,
    fastIncorrectResponses: fastIncorrect,
    slowCorrectResponses: slowCorrect,
    paceAssessment,
    observation
  };
}

/**
 * Deterministically determines the assessed level for a single subject.
 * Rules:
 * - Starting level is only a prior / starting point.
 * - Assessed level can move up, stay same, or move down.
 * - Skipped questions do NOT count as incorrect.
 * - Difficulty reached heavily weights mastery:
 *   - Success on Hard + Medium -> evidence for Intermediate or Advanced.
 *   - Struggles on Easy/Medium -> evidence for Beginner.
 */
export function determineSubjectAssessedLevel({
  subject,
  startingLevel = 'Beginner',
  totalQuestions = 5,
  attempted = 0,
  correct = 0,
  incorrect = 0,
  skipped = 0,
  accuracy = 0,
  difficultyBreakdown = {},
  highestDifficulty = 'Easy'
}) {
  const rawStarting = startingLevel ? startingLevel.charAt(0).toUpperCase() + startingLevel.slice(1).toLowerCase() : 'Beginner';
  const normStarting = rawStarting === 'Professional' ? 'Advanced' : rawStarting;

  const easyAtt = difficultyBreakdown.Easy?.attempted || 0;
  const easyCor = difficultyBreakdown.Easy?.correct || 0;
  const medAtt = difficultyBreakdown.Medium?.attempted || 0;
  const medCor = difficultyBreakdown.Medium?.correct || 0;
  const hardAtt = difficultyBreakdown.Hard?.attempted || 0;
  const hardCor = difficultyBreakdown.Hard?.correct || 0;

  // Weight evidence score:
  // Easy correct: +1, Med correct: +2, Hard correct: +3
  const evidencePoints = (easyCor * 1) + (medCor * 2) + (hardCor * 3);

  let assessedLevel = normStarting;
  let reason = '';

  // Decision Logic for 5 Questions:
  if (attempted === 0) {
    // Student skipped all questions
    assessedLevel = 'Beginner';
    reason = 'No questions were attempted; starting from foundational Beginner concepts is recommended.';
  } else if (hardCor >= 1 && medCor >= 2 && accuracy >= 70) {
    // Solved at least 1 Hard question and demonstrated strong Medium performance
    assessedLevel = 'Advanced';
    reason = `Demonstrated strong mastery of complex ${subject} concepts by successfully solving Hard questions with ${accuracy}% accuracy.`;
  } else if ((medCor >= 2 || (medCor >= 1 && easyCor >= 2)) && accuracy >= 60) {
    // Solved Medium questions consistently
    assessedLevel = 'Intermediate';
    reason = `Demonstrated consistent problem-solving on Easy and Medium ${subject} topics with ${accuracy}% accuracy.`;
  } else if (normStarting === 'Advanced') {
    // Started at Advanced but missed most questions
    assessedLevel = accuracy < 40 ? 'Beginner' : 'Intermediate';
    reason = `Assessment evidence suggests revisiting core ${subject} concepts to build deeper consistency.`;
  } else if (normStarting === 'Intermediate' && accuracy < 50 && easyCor === 0) {
    // Started at Intermediate but struggled on basics
    assessedLevel = 'Beginner';
    reason = `Foundational concepts require strengthening before advancing to complex ${subject} topics.`;
  } else if (normStarting === 'Intermediate') {
    assessedLevel = 'Intermediate';
    reason = `Your current evidence supports continuing at the Intermediate ${subject} level while strengthening consistency.`;
  } else {
    // Solid beginner performance or modest baseline
    assessedLevel = 'Beginner';
    reason = `Current performance establishes a clear starting baseline in ${subject} to build solid fundamentals.`;
  }

  // Correctness on Easy questions alone cannot move a Beginner up a level.

  return {
    assessedLevel,
    startingLevel: normStarting,
    evidencePoints,
    reason
  };
}

/**
 * Calculates complete metrics and performance for one assessed subject (DSA or Aptitude).
 */
export function calculateSubjectAnalysis(subjectName, responses = [], startingLevel = 'Beginner') {
  const subjectResponses = responses.filter(r => (r.subject || '').toUpperCase() === subjectName.toUpperCase());

  const totalQuestions = QUESTIONS_PER_SUBJECT;
  let attempted = 0;
  let correct = 0;
  let incorrect = 0;
  let skipped = 0;

  const difficultyBreakdown = {
    Easy: { attempted: 0, correct: 0, skipped: 0 },
    Medium: { attempted: 0, correct: 0, skipped: 0 },
    Hard: { attempted: 0, correct: 0, skipped: 0 }
  };

  let highestDifficulty = 'Easy';

  subjectResponses.forEach(r => {
    const diff = r.difficulty || 'Easy';
    if (!difficultyBreakdown[diff]) {
      difficultyBreakdown[diff] = { attempted: 0, correct: 0, skipped: 0 };
    }

    if (diff === 'Hard') highestDifficulty = 'Hard';
    else if (diff === 'Medium' && highestDifficulty !== 'Hard') highestDifficulty = 'Medium';

    if (r.skipped) {
      skipped += 1;
      difficultyBreakdown[diff].skipped += 1;
    } else {
      attempted += 1;
      difficultyBreakdown[diff].attempted += 1;
      if (r.correct) {
        correct += 1;
        difficultyBreakdown[diff].correct += 1;
      } else {
        incorrect += 1;
      }
    }
  });

  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
  const overallAccuracy = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

  // Topic analysis
  const topicPerformance = analyzeTopicPerformance(subjectResponses);
  const strengths = topicPerformance.filter(t => t.status === 'Strong');
  const focusAreas = topicPerformance.filter(t => t.status !== 'Strong');

  // Confidence & Timing
  const confidenceAnalysis = analyzeConfidenceDistribution(subjectResponses);
  const timingAnalysis = analyzeTiming(subjectResponses);

  // Assessed Level determination
  const levelDecision = determineSubjectAssessedLevel({
    subject: subjectName,
    startingLevel,
    totalQuestions,
    attempted,
    correct,
    incorrect,
    skipped,
    accuracy,
    difficultyBreakdown,
    highestDifficulty
  });

  return {
    subject: subjectName,
    startingLevel: levelDecision.startingLevel,
    assessedLevel: levelDecision.assessedLevel,
    totalQuestions,
    questionsAsked: subjectResponses.length,
    attemptedQuestions: attempted,
    correctAnswers: correct,
    incorrectAnswers: incorrect,
    skippedQuestions: skipped,
    accuracy,
    overallAccuracy,
    difficultyReached: highestDifficulty,
    averageTimeSeconds: timingAnalysis.averageTimeSeconds,
    totalTimeSeconds: timingAnalysis.totalTimeSeconds,
    difficultyBreakdown,
    topicPerformance,
    strengths,
    focusAreas,
    confidenceSummary: confidenceAnalysis,
    timingSummary: timingAnalysis,
    reason: levelDecision.reason,
    evidencePoints: levelDecision.evidencePoints
  };
}

/**
 * Main Analysis Orchestrator for the Complete Initial Assessment.
 * Only analyzes DSA and Aptitude!
 */
export function analyzeInitialAssessment({
  assessmentId,
  studentId = 'student',
  responses = [],
  subjects = [],
  assessmentStartTime = null,
  assessmentEndTime = null
}) {
  const now = Date.now();
  const startTime = assessmentStartTime || (now - 300000);
  const endTime = assessmentEndTime || now;
  const overallTimeSeconds = Math.max(0, Math.round((endTime - startTime) / 1000));

  // Extract starting levels for DSA and Aptitude from subjects input or defaults
  let dsaStartingLevel = 'Beginner';
  let aptStartingLevel = 'Beginner';

  if (Array.isArray(subjects)) {
    const dsaCfg = subjects.find(s => (s.subject || '').toUpperCase() === 'DSA');
    if (dsaCfg && dsaCfg.studentLevel) dsaStartingLevel = dsaCfg.studentLevel;

    const aptCfg = subjects.find(s => (s.subject || '').toUpperCase() === 'APTITUDE');
    if (aptCfg && aptCfg.studentLevel) aptStartingLevel = aptCfg.studentLevel;
  }

  // Deterministic Analysis for DSA (exactly 5 questions)
  const dsaResult = calculateSubjectAnalysis('DSA', responses, dsaStartingLevel);

  // Deterministic Analysis for Aptitude (exactly 5 questions)
  const aptitudeResult = calculateSubjectAnalysis('Aptitude', responses, aptStartingLevel);

  // Combined metrics
  const totalQuestions = dsaResult.totalQuestions + aptitudeResult.totalQuestions;
  const totalAttempted = dsaResult.attemptedQuestions + aptitudeResult.attemptedQuestions;
  const totalCorrect = dsaResult.correctAnswers + aptitudeResult.correctAnswers;
  const totalIncorrect = dsaResult.incorrectAnswers + aptitudeResult.incorrectAnswers;
  const totalSkipped = dsaResult.skippedQuestions + aptitudeResult.skippedQuestions;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  const combinedStrengths = [...dsaResult.strengths, ...aptitudeResult.strengths];
  const combinedFocusAreas = [...dsaResult.focusAreas, ...aptitudeResult.focusAreas];

  // Clean payload prepared for Step 4 Roadmap Synthesis
  const roadmapPreparation = {
    assessedAt: new Date(endTime).toISOString(),
    dsa: {
      startingLevel: dsaResult.startingLevel,
      assessedLevel: dsaResult.assessedLevel,
      accuracy: dsaResult.accuracy,
      strengths: dsaResult.strengths.map(s => s.topicId),
      focusAreas: dsaResult.focusAreas.map(f => f.topicId),
      topicPerformance: dsaResult.topicPerformance
    },
    aptitude: {
      startingLevel: aptitudeResult.startingLevel,
      assessedLevel: aptitudeResult.assessedLevel,
      accuracy: aptitudeResult.accuracy,
      strengths: aptitudeResult.strengths.map(s => s.topicId),
      focusAreas: aptitudeResult.focusAreas.map(f => f.topicId),
      topicPerformance: aptitudeResult.topicPerformance
    },
    unassessedSubjects: [
      { subject: 'DBMS', startingLevel: 'Beginner', note: 'Start directly from Beginner' },
      { subject: 'OS', startingLevel: 'Beginner', note: 'Start directly from Beginner' },
      { subject: 'OOPS', startingLevel: 'Beginner', note: 'Start directly from Beginner' },
      { subject: 'CN', startingLevel: 'Beginner', note: 'Start directly from Beginner' }
    ]
  };

  return {
    assessmentId: assessmentId || `asm_init_${Date.now()}`,
    studentId,
    assessmentType: 'initial',
    startedAt: new Date(startTime).toISOString(),
    completedAt: new Date(endTime).toISOString(),
    overallTimeSeconds,
    subjectTimeSeconds: {
      DSA: dsaResult.totalTimeSeconds,
      Aptitude: aptitudeResult.totalTimeSeconds
    },

    // Core Results
    dsaResult,
    aptitudeResult,

    // Overview
    overall: {
      totalQuestions,
      attemptedQuestions: totalAttempted,
      correctAnswers: totalCorrect,
      incorrectAnswers: totalIncorrect,
      skippedQuestions: totalSkipped,
      accuracy: overallAccuracy,
      questionsAsked: dsaResult.questionsAsked + aptitudeResult.questionsAsked,
      strengthsCount: combinedStrengths.length,
      focusAreasCount: combinedFocusAreas.length,
      combinedStrengths,
      combinedFocusAreas
    },

    // Step 4 Handoff
    roadmapPreparation
  };
}
