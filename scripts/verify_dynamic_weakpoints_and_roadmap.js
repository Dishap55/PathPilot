const assert = require('assert');
const { selectNextTopic } = require('../server/services/assessment/topicSelectionEngine');
const { getCanonicalTopics } = require('../server/constants/canonicalTopicRegistry');
const { CANONICAL_QUESTION_BANK } = require('../server/services/assessment/canonicalQuestionBank');
const { analyzeInitialAssessment } = require('../server/services/assessment/assessmentAnalysisEngine');
const { generateInitialAssessmentRoadmap } = require('../server/services/roadmap/initialAssessmentRoadmapEngine');

console.log('================================================================');
console.log('🧪 VERIFYING DYNAMIC WEAK POINTS AND ROADMAP PERSONALIZATION');
console.log('================================================================');

// -----------------------------------------------------------------------------
// Test 1: Diverse Topic Selection (Eliminated Hardcoded First Topic)
// -----------------------------------------------------------------------------
console.log('\n--- 1. Topic Selection Randomness & Diversity ---');
const dsaTopics = getCanonicalTopics('DSA');
const topicCounts = {};
dsaTopics.forEach(t => topicCounts[t.id] = 0);

const TRIALS = 200;
for (let i = 0; i < TRIALS; i++) {
  const selected = selectNextTopic({
    subject: 'DSA',
    canonicalTopics: dsaTopics,
    askedTopicIds: []
  });
  topicCounts[selected.id] = (topicCounts[selected.id] || 0) + 1;
}

console.log('Topic distribution over 200 first-question selections:', topicCounts);
const selectedDistinct = Object.values(topicCounts).filter(c => c > 0).length;
assert(selectedDistinct >= 4, `Expected at least 4 distinct starting topics, got ${selectedDistinct}`);
assert(topicCounts['two-pointers'] < TRIALS, 'Topic two-pointers must not be chosen 100% of the time!');
console.log(`✓ Test 1 Passed: Topic selection is dynamic and distributed across ${selectedDistinct} canonical DSA topics.`);

// -----------------------------------------------------------------------------
// Test 2: Full Canonical Topic Coverage in Question Bank
// -----------------------------------------------------------------------------
console.log('\n--- 2. Canonical Question Bank Topic Coverage ---');
const bankDsaTopicIds = new Set(CANONICAL_QUESTION_BANK.filter(q => q.subject === 'DSA').map(q => q.topicId));
console.log('DSA Topics represented in Question Bank:', [...bankDsaTopicIds]);

const requiredTopics = ['two-pointers', 'arrays', 'binary-search', 'trees', 'dp', 'sorting', 'linked-list', 'graphs'];
for (const topicId of requiredTopics) {
  assert(bankDsaTopicIds.has(topicId), `Question bank must contain questions for canonical topic: ${topicId}`);
}
console.log('✓ Test 2 Passed: Canonical Question Bank covers all required DSA topics.');

// -----------------------------------------------------------------------------
// Test 3: Dynamic Weak Points (Focus Areas) Derived From Real Responses
// -----------------------------------------------------------------------------
console.log('\n--- 3. Dynamic Weak Points Calculation ---');
// Scenario: Student gets Binary Search and Sorting wrong
const mockResponses = [
  { subject: 'DSA', topicId: 'binary-search', topicName: 'Binary Search', difficulty: 'Medium', correct: false, skipped: false, confidence: 'confident', timeTaken: 45 },
  { subject: 'DSA', topicId: 'sorting', topicName: 'Sorting Algorithms', difficulty: 'Easy', correct: false, skipped: false, confidence: 'not_sure', timeTaken: 50 },
  { subject: 'DSA', topicId: 'trees', topicName: 'Trees & BST', difficulty: 'Easy', correct: true, skipped: false, confidence: 'confident', timeTaken: 30 },
  { subject: 'DSA', topicId: 'linked-list', topicName: 'Linked List', difficulty: 'Easy', correct: true, skipped: false, confidence: 'confident', timeTaken: 35 },
  { subject: 'DSA', topicId: 'arrays', topicName: 'Arrays & Strings', difficulty: 'Easy', correct: true, skipped: false, confidence: 'confident', timeTaken: 40 },
  // Aptitude responses
  { subject: 'Aptitude', topicId: 'percentages', topicName: 'Percentages', difficulty: 'Easy', correct: true, skipped: false, confidence: 'confident', timeTaken: 30 },
  { subject: 'Aptitude', topicId: 'ratio-and-proportion', topicName: 'Ratio & Proportion', difficulty: 'Easy', correct: true, skipped: false, confidence: 'confident', timeTaken: 30 },
  { subject: 'Aptitude', topicId: 'time-and-work', topicName: 'Time & Work', difficulty: 'Medium', correct: false, skipped: false, confidence: 'guessing', timeTaken: 60 },
  { subject: 'Aptitude', topicId: 'time-speed-distance', topicName: 'Time, Speed & Distance', difficulty: 'Easy', correct: true, skipped: false, confidence: 'confident', timeTaken: 40 },
  { subject: 'Aptitude', topicId: 'probability', topicName: 'Probability', difficulty: 'Easy', correct: true, skipped: false, confidence: 'confident', timeTaken: 45 }
];

const analysis = analyzeInitialAssessment({
  assessmentId: 'test_dyn_asm_1',
  studentId: 'test_student_vedika',
  responses: mockResponses,
  subjects: [
    { subject: 'DSA', studentLevel: 'Beginner', topics: dsaTopics },
    { subject: 'Aptitude', studentLevel: 'Beginner', topics: getCanonicalTopics('Aptitude') }
  ],
  assessmentStartTime: Date.now() - 300000,
  assessmentEndTime: Date.now()
});

const dsaFocus = analysis.dsaResult.focusAreas.map(f => f.topicId);
console.log('Diagnosed DSA Focus Areas (Weak Points):', dsaFocus);
assert(dsaFocus.includes('binary-search'), 'Binary Search must be diagnosed as a weak point');
assert(dsaFocus.includes('sorting'), 'Sorting Algorithms must be diagnosed as a weak point');
assert(!dsaFocus.includes('two-pointers'), 'Two Pointers must NOT be a weak point when not asked or missed');

const aptFocus = analysis.aptitudeResult.focusAreas.map(f => f.topicId);
console.log('Diagnosed Aptitude Focus Areas:', aptFocus);
assert(dsaFocus.length > 0 && aptFocus.includes('time-and-work'), 'Time & Work must be diagnosed as an Aptitude weak point');
console.log('✓ Test 3 Passed: Focus areas are truly dynamic and derive directly from the student\'s actual performance.');

// -----------------------------------------------------------------------------
// Test 4: Personalized Roadmap Focus Areas Alignment
// -----------------------------------------------------------------------------
console.log('\n--- 4. Roadmap Personalization from Dynamic Weak Points ---');
const roadmapPlan = generateInitialAssessmentRoadmap({
  ...analysis,
  studentId: 'test_student_vedika'
});

const roadmapFocusItems = roadmapPlan.items.filter(i => i.category === 'FOCUS').map(i => i.topicId);
console.log('Roadmap FOCUS items:', roadmapFocusItems);
assert(roadmapFocusItems.includes('binary-search'), 'Roadmap must prioritize Binary Search as a FOCUS item');
assert(roadmapFocusItems.includes('sorting'), 'Roadmap must prioritize Sorting Algorithms as a FOCUS item');
assert(roadmapFocusItems.includes('time-and-work'), 'Roadmap must prioritize Time & Work as a FOCUS item');
console.log('✓ Test 4 Passed: Personalized Roadmap directly aligns its FOCUS items with diagnosed weak points.');

console.log('\n================================================================');
console.log('🎉 ALL DYNAMIC WEAK POINTS AND ROADMAP TESTS PASSED!');
console.log('================================================================');
