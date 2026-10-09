const ROADMAP_SOURCE = 'INITIAL_ASSESSMENT';
const SUPPORTED_SUBJECTS = ['DSA', 'Aptitude'];
const DIFFICULTY_WEIGHT = { Easy: 1, Medium: 2, Hard: 3 };

function finiteCount(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? Math.floor(number) : null;
}

function normalizeDifficulty(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'hard') return 'Hard';
  if (normalized === 'medium') return 'Medium';
  if (normalized === 'easy') return 'Easy';
  return null;
}

function normalizePrerequisites(topic, subject) {
  const source = topic.prerequisites ?? topic.prerequisiteTopics ?? [];
  if (!Array.isArray(source)) return [];

  return source.map(prerequisite => {
    if (typeof prerequisite === 'string') {
      return { subject, topicId: prerequisite, topicName: null };
    }
    if (!prerequisite || typeof prerequisite !== 'object') return null;

    const prerequisiteSubject = prerequisite.subject || subject;
    const topicId = prerequisite.topicId || prerequisite.id;
    const topicName = prerequisite.topicName || prerequisite.name;
    if (!SUPPORTED_SUBJECTS.includes(prerequisiteSubject) || typeof topicId !== 'string' || !topicId.trim()) return null;

    return {
      subject: prerequisiteSubject,
      topicId: topicId.trim(),
      topicName: typeof topicName === 'string' && topicName.trim() ? topicName.trim() : null
    };
  }).filter(Boolean);
}

function collectTopicEvidence(subject, subjectResult) {
  const byId = new Map();
  const sources = [
    ...(Array.isArray(subjectResult?.topicPerformance) ? subjectResult.topicPerformance : []),
    ...(Array.isArray(subjectResult?.strengths) ? subjectResult.strengths : []),
    ...(Array.isArray(subjectResult?.focusAreas) ? subjectResult.focusAreas : [])
  ];

  for (const topic of sources) {
    if (!topic || typeof topic !== 'object') continue;
    const topicId = typeof topic.topicId === 'string' ? topic.topicId.trim() : '';
    const topicName = typeof topic.topicName === 'string' ? topic.topicName.trim() : '';
    if (!topicId || !topicName) continue;
    if (topic.subject && topic.subject !== subject) continue;

    const key = `${subject}:${topicId}`;
    const existing = byId.get(key);
    if (existing) {
      existing.prerequisites = existing.prerequisites.length
        ? existing.prerequisites
        : normalizePrerequisites(topic, subject);
      continue;
    }

    const correct = finiteCount(topic.correct);
    const incorrect = finiteCount(topic.incorrect);
    const attempted = finiteCount(topic.attempted) ?? (
      correct !== null && incorrect !== null ? correct + incorrect : null
    );
    const questionsAsked = finiteCount(topic.questionsAsked);
    const skipped = finiteCount(topic.skipped) ?? (
      questionsAsked !== null && attempted !== null ? Math.max(0, questionsAsked - attempted) : null
    );
    const accuracyValue = Number(topic.accuracy);
    const accuracy = Number.isFinite(accuracyValue)
      ? accuracyValue
      : attempted > 0 && correct !== null
        ? Math.round((correct / attempted) * 100)
        : null;
    const difficultyReached = normalizeDifficulty(topic.difficultyReached);
    const averageTimeSeconds = finiteCount(topic.averageTimeSeconds ?? topic.averageTime);
    const confidencePattern = topic.confidencePattern && typeof topic.confidencePattern === 'object'
      ? { ...topic.confidencePattern }
      : null;
    const difficultyIncorrect = readDifficultyIncorrectEvidence(topic, {
      attempted,
      correct,
      incorrect,
      skipped,
      difficultyReached
    });

    const normalized = {
      subject,
      topicId,
      topicName,
      sourceTopic: topic,
      prerequisites: normalizePrerequisites(topic, subject),
      evidence: {
        questionsAsked,
        attempted,
        correct,
        incorrect,
        skipped,
        accuracy,
        difficultyReached,
        averageTimeSeconds,
        confidencePattern,
        mediumIncorrectCount: difficultyIncorrect?.mediumIncorrectCount ?? null,
        hardIncorrectCount: difficultyIncorrect?.hardIncorrectCount ?? null
      }
    };
    normalized.classification = classifyTopic(normalized.evidence);
    byId.set(key, normalized);
  }

  return [...byId.values()];
}

function readDifficultyIncorrectEvidence(topic, summary) {
  const responses = topic.responses || topic.responseDetails || topic.evidence?.responses;
  if (Array.isArray(responses) && responses.length > 0) {
    return {
      mediumIncorrectCount: responses.filter(response =>
        response && !response.skipped && response.correct === false && normalizeDifficulty(response.difficulty) === 'Medium'
      ).length,
      hardIncorrectCount: responses.filter(response =>
        response && !response.skipped && response.correct === false && normalizeDifficulty(response.difficulty) === 'Hard'
      ).length
    };
  }

  const breakdown = topic.difficultyBreakdown;
  const mediumBreakdownCount = finiteCount(breakdown?.Medium?.incorrect);
  const hardBreakdownCount = finiteCount(breakdown?.Hard?.incorrect);
  if (mediumBreakdownCount !== null || hardBreakdownCount !== null) {
    return {
      mediumIncorrectCount: mediumBreakdownCount ?? 0,
      hardIncorrectCount: hardBreakdownCount ?? 0
    };
  }

  // With no skips and every attempted answer wrong, a reached higher difficulty
  // is known to have been answered incorrectly. Mixed outcomes do not reveal
  // which difficulty was missed, so they are not assigned a hard-error claim.
  if (summary.attempted > 0 && summary.incorrect === summary.attempted && summary.skipped === 0 &&
      ['Medium', 'Hard'].includes(summary.difficultyReached)) {
    return {
      mediumIncorrectCount: summary.difficultyReached === 'Medium' ? 1 : 0,
      hardIncorrectCount: summary.difficultyReached === 'Hard' ? 1 : 0
    };
  }

  return null;
}

function classifyTopic(evidence) {
  const { attempted, correct, incorrect, skipped, difficultyReached } = evidence;

  if (attempted >= 2 && correct === attempted && skipped === 0 &&
      ['Medium', 'Hard'].includes(difficultyReached)) {
    return 'STRONG';
  }
  if ((incorrect !== null && incorrect > 0) || (evidence.mediumIncorrectCount || 0) > 0 || (evidence.hardIncorrectCount || 0) > 0) {
    return 'FOCUS';
  }
  return 'NEEDS_PRACTICE';
}

function highPriorityFocus(evidence) {
  const pattern = evidence.confidencePattern || {};
  return (evidence.hardIncorrectCount || 0) > 0 ||
    (evidence.mediumIncorrectCount || 0) > 0 ||
    (evidence.incorrect !== null && evidence.incorrect >= 2) ||
    (evidence.attempted >= 2 && evidence.accuracy !== null && evidence.accuracy <= 40) ||
    (finiteCount(pattern.incorrectHighConfidence) || 0) >= 2;
}

function topicReason(category, evidence) {
  const attempted = evidence.attempted;
  const incorrect = evidence.incorrect;
  const hardIncorrect = evidence.hardIncorrectCount || 0;
  const mediumIncorrect = evidence.mediumIncorrectCount || 0;
  const skipped = evidence.skipped;

  if (category === 'STRONG') {
    return `All ${attempted} attempted responses were correct, with success at ${evidence.difficultyReached} difficulty and no skipped responses.`;
  }
  if (category === 'FOCUS' && hardIncorrect > 0) {
    return `Observed ${hardIncorrect} incorrect Hard-difficulty response${hardIncorrect === 1 ? '' : 's'}; review this topic before advancing.`;
  }
  if (category === 'FOCUS' && mediumIncorrect > 0) {
    return `Observed ${mediumIncorrect} incorrect Medium-difficulty response${mediumIncorrect === 1 ? '' : 's'}; strengthen this topic before advancing.`;
  }
  if (category === 'FOCUS') {
    const incorrectCount = incorrect ?? 'one or more';
    const confidence = (finiteCount(evidence.confidencePattern?.incorrectHighConfidence) || 0) > 0
      ? ' At least one incorrect response was reported with high confidence.'
      : '';
    return `Observed ${incorrectCount} incorrect response${incorrect === 1 ? '' : 's'} across ${attempted ?? 'an unknown number of'} attempted question${attempted === 1 ? '' : 's'}.${confidence}`;
  }
  if (attempted === 0 && skipped > 0) {
    return `${skipped} response${skipped === 1 ? ' was' : 's were'} skipped; this is insufficient evidence and is not treated as failure.`;
  }
  if (attempted === 1 && incorrect === 0) {
    return 'One correct response is limited evidence; additional practice is needed before calling this topic strong.';
  }
  if (incorrect === 0 && evidence.difficultyReached === 'Easy') {
    return 'Correct Easy-level evidence is present, but there is not yet enough higher-difficulty evidence to classify this topic as strong.';
  }
  return 'Topic-level evidence is missing or too limited for a confident classification; this is uncertain, not a failure.';
}

function recommendedAction(category, evidence, isPrerequisite = false) {
  const actions = {
    STRONG: 'Schedule a short spaced review, then apply the concept in a mixed problem.',
    FOCUS: (evidence.hardIncorrectCount || 0) > 0
      ? 'Review the core method, study a worked example, then retry a Hard-level problem.'
      : (evidence.mediumIncorrectCount || 0) > 0
        ? 'Review the core method, study a worked example, then retry a Medium-level problem.'
      : 'Review the core concept, then solve one guided question and one independent question.',
    NEEDS_PRACTICE: evidence.attempted === 0 && evidence.skipped > 0
      ? 'Try a small, varied practice set to gather evidence; skipped questions are not failures.'
      : 'Practice a few questions at more than one difficulty to gather enough evidence for a confident classification.'
  };

  let action = actions[category];
  if (isPrerequisite) action = 'Review this prerequisite before starting the dependent focus topic.';
  if (evidence.averageTimeSeconds !== null && evidence.averageTimeSeconds > 120) {
    action += ' Add a brief timed fluency round after concept review.';
  }
  if ((finiteCount(evidence.confidencePattern?.correctLowConfidence) || 0) > 0 && category !== 'FOCUS') {
    action += ' Explain your reasoning aloud to build confidence alongside accuracy.';
  }
  return action;
}

function createTopicItem(topic, sequenceNo, { isPrerequisite = false } = {}) {
  const { evidence, classification } = topic;
  const priority = isPrerequisite
    ? 2
    : classification === 'FOCUS'
      ? highPriorityFocus(evidence) ? 1 : 3
      : classification === 'NEEDS_PRACTICE'
        ? 3
        : 4;

  return {
    sequenceNo,
    subject: topic.subject,
    topicId: topic.topicId,
    topicName: topic.topicName,
    priority,
    category: classification,
    reason: topicReason(classification, evidence),
    recommendedAction: recommendedAction(classification, evidence, isPrerequisite),
    prerequisites: topic.prerequisites.map(item => ({ ...item })),
    status: 'NOT_STARTED',
    source: ROADMAP_SOURCE,
    itemType: isPrerequisite ? 'PREREQUISITE' : 'TOPIC',
    evidence: { ...evidence }
  };
}

function prerequisitePlaceholder(prerequisite, dependentTopic) {
  if (!prerequisite.topicName) return null;
  return {
    subject: prerequisite.subject,
    topicId: prerequisite.topicId,
    topicName: prerequisite.topicName,
    prerequisites: [],
    evidence: {
      questionsAsked: null,
      attempted: null,
      correct: null,
      incorrect: null,
      skipped: null,
      accuracy: null,
      difficultyReached: null,
      averageTimeSeconds: null,
      confidencePattern: null,
      mediumIncorrectCount: null,
      hardIncorrectCount: null
    },
    classification: 'NEEDS_PRACTICE',
    reason: `This prerequisite is explicitly listed for ${dependentTopic.topicName}, but no assessment evidence exists for it; no weakness is inferred.`,
    recommendedAction: `Review ${prerequisite.topicName} before starting ${dependentTopic.topicName}.`,
    isPrerequisite: true
  };
}

function generateInitialAssessmentRoadmap(assessmentHistory) {
  if (!assessmentHistory || assessmentHistory.assessmentType !== 'initial') {
    throw new Error('A persisted initial assessment result is required to generate this roadmap.');
  }
  if (!assessmentHistory.assessmentId) throw new Error('The persisted assessment is missing its assessment ID.');

  const subjectResults = [
    { subject: 'DSA', result: assessmentHistory.dsaResult },
    { subject: 'Aptitude', result: assessmentHistory.aptitudeResult }
  ];
  const startingLevels = {};
  const assessedLevels = {};
  const observedTopics = [];

  for (const { subject, result } of subjectResults) {
    startingLevels[subject] = result?.startingLevel ?? null;
    assessedLevels[subject] = result?.assessedLevel ?? null;
    observedTopics.push(...collectTopicEvidence(subject, result));
  }

  const topicItems = new Map();
  for (const topic of observedTopics) {
    const item = createTopicItem(topic, 0);
    topicItems.set(`${topic.subject}:${topic.topicId}`, { ...topic, item });
  }

  // Add named prerequisites only when the stored topic metadata explicitly
  // supplies them. Unknown IDs remain attached to the dependent item without
  // inventing a display name or performance record.
  for (const topic of observedTopics) {
    if (topic.classification !== 'FOCUS') continue;
    for (const prerequisite of topic.prerequisites) {
      const key = `${prerequisite.subject}:${prerequisite.topicId}`;
      if (!topicItems.has(key)) {
        const placeholder = prerequisitePlaceholder(prerequisite, topic);
        if (placeholder) {
          topicItems.set(key, {
            ...placeholder,
            item: {
              ...placeholder,
              category: 'NEEDS_PRACTICE',
              status: 'NOT_STARTED',
              source: ROADMAP_SOURCE,
              priority: 2,
              itemType: 'PREREQUISITE',
              prerequisites: [],
              sequenceNo: 0
            }
          });
        }
      }
    }
  }

  const ordered = [];
  const emitted = new Set();
  const visiting = new Set();
  const appendWithPrerequisites = topic => {
    const key = `${topic.subject}:${topic.topicId}`;
    if (emitted.has(key) || visiting.has(key)) return;
    visiting.add(key);
    for (const prerequisite of topic.prerequisites || []) {
      const prerequisiteTopic = topicItems.get(`${prerequisite.subject}:${prerequisite.topicId}`);
      if (prerequisiteTopic) appendWithPrerequisites(prerequisiteTopic);
    }
    visiting.delete(key);
    if (!emitted.has(key)) {
      const isPrerequisite = topic.isPrerequisite || observedTopics.some(candidate =>
        candidate.prerequisites.some(prerequisite => `${prerequisite.subject}:${prerequisite.topicId}` === key)
      );
      const item = topic.isPrerequisite
        ? { ...topic.item, sequenceNo: ordered.length + 1 }
        : createTopicItem(topic, ordered.length + 1, { isPrerequisite });
      ordered.push(item);
      emitted.add(key);
    }
  };

  const sortedTopics = [...observedTopics].sort((left, right) => {
    const leftScore = left.classification === 'FOCUS' && highPriorityFocus(left.evidence) ? 1 : 0;
    const rightScore = right.classification === 'FOCUS' && highPriorityFocus(right.evidence) ? 1 : 0;
    return rightScore - leftScore;
  });

  for (const category of ['FOCUS', 'NEEDS_PRACTICE', 'STRONG']) {
    for (const topic of sortedTopics.filter(item => item.classification === category)) {
      appendWithPrerequisites(topic);
    }
  }

  const subjectScopes = [...new Set(observedTopics.map(topic => topic.subject))];
  const finalReview = observedTopics.length > 0 ? {
    sequenceNo: ordered.length + 1,
    subject: subjectScopes.length > 1 ? 'DSA + Aptitude' : subjectScopes[0],
    topicId: null,
    topicName: 'Mixed DSA + Aptitude Review',
    topicIds: observedTopics.map(topic => ({ subject: topic.subject, topicId: topic.topicId, topicName: topic.topicName })),
    priority: 5,
    category: 'NEEDS_PRACTICE',
    reason: 'This is a final mixed-review activity over the observed topics, not a topic-level performance classification.',
    recommendedAction: 'Complete a short mixed practice set using only the listed assessed topics, then revisit any item that still feels uncertain.',
    prerequisites: [],
    status: 'NOT_STARTED',
    source: ROADMAP_SOURCE,
    itemType: 'FINAL_MIXED_REVIEW',
    evidence: null
  } : null;

  const items = finalReview ? [...ordered, finalReview] : ordered;
  return {
    assessmentId: assessmentHistory.assessmentId,
    studentId: assessmentHistory.studentId || null,
    assessmentType: 'initial',
    source: ROADMAP_SOURCE,
    startingLevels,
    assessedLevels,
    items
  };
}

module.exports = {
  ROADMAP_SOURCE,
  SUPPORTED_SUBJECTS,
  generateInitialAssessmentRoadmap,
  classifyTopic,
  collectTopicEvidence
};
