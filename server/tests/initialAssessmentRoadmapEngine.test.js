const test = require('node:test');
const assert = require('node:assert/strict');
const { generateInitialAssessmentRoadmap } = require('../services/roadmap/initialAssessmentRoadmapEngine');

function topic(topicId, topicName, overrides = {}) {
  return {
    topicId,
    topicName,
    questionsAsked: 2,
    attempted: 2,
    correct: 1,
    incorrect: 1,
    skipped: 0,
    accuracy: 50,
    difficultyReached: 'Medium',
    averageTime: 45,
    confidencePattern: {
      correctHighConfidence: 1,
      correctLowConfidence: 0,
      incorrectHighConfidence: 0,
      incorrectLowConfidence: 1
    },
    ...overrides
  };
}

function history({ dsa = [], aptitude = [], ...overrides } = {}) {
  return {
    assessmentId: 'asm-roadmap-test-1',
    studentId: 'student-roadmap-test-1',
    assessmentType: 'initial',
    dsaResult: {
      startingLevel: 'Beginner',
      assessedLevel: 'Beginner',
      topicPerformance: dsa,
      strengths: [],
      focusAreas: []
    },
    aptitudeResult: {
      startingLevel: 'Intermediate',
      assessedLevel: 'Intermediate',
      topicPerformance: aptitude,
      strengths: [],
      focusAreas: []
    },
    ...overrides
  };
}

function subjectItems(plan, subject) {
  return plan.items.filter(item => item.itemType !== 'FINAL_MIXED_REVIEW' && item.subject === subject);
}

test('Beginner DSA with one Easy success stays uncertain instead of being marked strong', () => {
  const plan = generateInitialAssessmentRoadmap(history({
    dsa: [topic('arrays', 'Arrays & Strings', {
      questionsAsked: 1,
      attempted: 1,
      correct: 1,
      incorrect: 0,
      accuracy: 100,
      difficultyReached: 'Easy'
    })]
  }));

  const [arrays] = subjectItems(plan, 'DSA');
  assert.equal(arrays.category, 'NEEDS_PRACTICE');
  assert.match(arrays.reason, /limited evidence/i);
  assert.equal(plan.startingLevels.DSA, 'Beginner');
  assert.equal(plan.assessedLevels.DSA, 'Beginner');
});

test('Intermediate Aptitude level is preserved independently of topic classifications', () => {
  const plan = generateInitialAssessmentRoadmap(history({
    aptitude: [topic('percentages', 'Percentages', {
      correct: 2,
      incorrect: 0,
      accuracy: 100,
      difficultyReached: 'Medium',
      confidencePattern: { correctHighConfidence: 2, correctLowConfidence: 0, incorrectHighConfidence: 0, incorrectLowConfidence: 0 }
    })]
  }));

  assert.equal(plan.startingLevels.Aptitude, 'Intermediate');
  assert.equal(plan.assessedLevels.Aptitude, 'Intermediate');
  assert.equal(subjectItems(plan, 'Aptitude')[0].category, 'STRONG');
});

test('multiple correct responses including higher difficulty produce a Strong topic', () => {
  const plan = generateInitialAssessmentRoadmap(history({
    dsa: [topic('binary-search', 'Binary Search', {
      correct: 2,
      incorrect: 0,
      accuracy: 100,
      difficultyReached: 'Hard',
      confidencePattern: { correctHighConfidence: 2, correctLowConfidence: 0, incorrectHighConfidence: 0, incorrectLowConfidence: 0 }
    })]
  }));

  const [binarySearch] = subjectItems(plan, 'DSA');
  assert.equal(binarySearch.category, 'STRONG');
  assert.match(binarySearch.reason, /All 2 attempted responses were correct/);
  assert.match(binarySearch.recommendedAction, /spaced review/i);
});

test('an observed Hard incorrect response creates a high-priority FOCUS item', () => {
  const plan = generateInitialAssessmentRoadmap(history({
    dsa: [topic('graphs', 'Graphs & BFS/DFS', {
      correct: 1,
      incorrect: 1,
      accuracy: 50,
      difficultyReached: 'Hard',
      responses: [
        { difficulty: 'Medium', correct: true, skipped: false },
        { difficulty: 'Hard', correct: false, skipped: false }
      ]
    })]
  }));

  const [graphs] = subjectItems(plan, 'DSA');
  assert.equal(graphs.category, 'FOCUS');
  assert.equal(graphs.priority, 1);
  assert.equal(graphs.evidence.hardIncorrectCount, 1);
  assert.match(graphs.reason, /incorrect Hard-difficulty response/);
});

test('skipped-only or sparse Easy evidence remains NEEDS_PRACTICE, not failure', () => {
  const plan = generateInitialAssessmentRoadmap(history({
    dsa: [
      topic('trees', 'Trees & BST', {
        questionsAsked: 1,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        skipped: 1,
        accuracy: 0,
        difficultyReached: 'Easy'
      }),
      topic('sorting', 'Sorting Algorithms', {
        questionsAsked: 1,
        attempted: 1,
        correct: 1,
        incorrect: 0,
        skipped: 0,
        accuracy: 100,
        difficultyReached: 'Easy'
      })
    ]
  }));

  const dsaItems = subjectItems(plan, 'DSA');
  assert.deepEqual(dsaItems.map(item => item.category), ['NEEDS_PRACTICE', 'NEEDS_PRACTICE']);
  assert.ok(dsaItems.some(item => /not treated as failure/i.test(item.reason)));
});

test('mixed evidence orders prerequisites before focus, then uncertain, strong, and final review', () => {
  const plan = generateInitialAssessmentRoadmap(history({
    dsa: [
      topic('graphs', 'Graphs', {
        correct: 0,
        incorrect: 2,
        accuracy: 0,
        difficultyReached: 'Hard',
        prerequisites: [{ subject: 'DSA', topicId: 'arrays', topicName: 'Arrays & Strings' }]
      }),
      topic('trees', 'Trees', {
        questionsAsked: 1,
        attempted: 1,
        correct: 1,
        incorrect: 0,
        accuracy: 100,
        difficultyReached: 'Easy'
      }),
      topic('binary-search', 'Binary Search', {
        correct: 2,
        incorrect: 0,
        accuracy: 100,
        difficultyReached: 'Medium'
      })
    ],
    aptitude: [topic('time-and-work', 'Time & Work', {
      correct: 0,
      incorrect: 1,
      accuracy: 0,
      difficultyReached: 'Easy'
    })]
  }));

  const steps = plan.items;
  const arraysIndex = steps.findIndex(item => item.topicId === 'arrays');
  const graphsIndex = steps.findIndex(item => item.topicId === 'graphs');
  const uncertainIndex = steps.findIndex(item => item.topicId === 'trees');
  const strongIndex = steps.findIndex(item => item.topicId === 'binary-search');
  const finalIndex = steps.findIndex(item => item.itemType === 'FINAL_MIXED_REVIEW');
  assert.ok(arraysIndex >= 0 && arraysIndex < graphsIndex);
  assert.ok(graphsIndex < uncertainIndex);
  assert.ok(uncertainIndex < strongIndex);
  assert.equal(finalIndex, steps.length - 1);
  assert.equal(steps[arraysIndex].category, 'NEEDS_PRACTICE');
  assert.match(steps[arraysIndex].reason, /no assessment evidence/i);
  assert.equal(steps[finalIndex].priority, 5);
  assert.equal(steps[finalIndex].status, 'NOT_STARTED');
});

test('the engine emits only topic IDs present in assessment evidence or explicit prerequisite metadata', () => {
  const plan = generateInitialAssessmentRoadmap(history({
    dsa: [topic('two-pointers', 'Two Pointers')],
    aptitude: [topic('percentages', 'Percentages')],
    dbmsResult: { topicPerformance: [topic('sql-joins', 'SQL Joins')] }
  }));
  const topicIds = plan.items
    .filter(item => item.itemType === 'TOPIC')
    .map(item => item.topicId);

  assert.deepEqual(topicIds, ['two-pointers', 'percentages']);
  const finalReview = plan.items.at(-1);
  assert.equal(finalReview.itemType, 'FINAL_MIXED_REVIEW');
  assert.deepEqual(finalReview.topicIds.map(item => item.topicId), topicIds);
  assert.equal(finalReview.evidence, null);
});

test('starting and assessed levels are carried through without recalculation or overwriting', () => {
  const input = history({
    dsa: [topic('dp', 'Dynamic Programming')],
    aptitude: [topic('ratio', 'Ratio & Proportion')]
  });
  input.dsaResult.startingLevel = 'Intermediate';
  input.dsaResult.assessedLevel = 'Beginner';
  input.aptitudeResult.startingLevel = 'Beginner';
  input.aptitudeResult.assessedLevel = 'Advanced';

  const plan = generateInitialAssessmentRoadmap(input);
  assert.deepEqual(plan.startingLevels, { DSA: 'Intermediate', Aptitude: 'Beginner' });
  assert.deepEqual(plan.assessedLevels, { DSA: 'Beginner', Aptitude: 'Advanced' });
});

test('DBMS, OS, OOPS, and CN results are never personalized by this engine', () => {
  const plan = generateInitialAssessmentRoadmap(history({
    dsa: [topic('arrays', 'Arrays')],
    aptitude: [topic('percentages', 'Percentages')],
    dbmsResult: { topicPerformance: [topic('dbms', 'DBMS topic')] },
    osResult: { topicPerformance: [topic('os', 'OS topic')] },
    oopsResult: { topicPerformance: [topic('oops', 'OOPS topic')] },
    cnResult: { topicPerformance: [topic('cn', 'CN topic')] }
  }));

  assert.deepEqual([...new Set(plan.items.map(item => item.subject))].sort(), ['Aptitude', 'DSA', 'DSA + Aptitude']);
  assert.equal(plan.items.some(item => /DBMS|OS|OOPS|CN/.test(item.topicName)), false);
});
