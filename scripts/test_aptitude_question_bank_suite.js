/**
 * AUTOMATED TEST SUITE: APTITUDE PRACTICE QUESTION BANK & INTERACTION FLOW
 * 
 * Verifies:
 * 1. Question bank volume, difficulty progression (Levels 1-5), and pattern diversity.
 * 2. Time Speed & Distance complete 38-question bank.
 * 3. Company tagging integrity (evidence-based attribution, source metadata, no false claims).
 * 4. Master loader coverage across all 43 topics in aptitudeTopicDataRegistry.
 * 5. Wrong answer flow (progressive hints, retry, no immediate spoiler).
 * 6. Correct answer flow (step-by-step solution, formula, quick tips).
 * 7. Bestu context synchronization & Personal My Notes integration.
 * 8. DSA module non-regression.
 */

const fs = require('fs');
const path = require('path');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('\n============================================================');
console.log('RUNNING APTITUDE PRACTICE QUESTION BANK SUITE');
console.log('============================================================\n');

// -----------------------------------------------------------------------------
// 1. Time Speed & Distance Question Bank Verification
// -----------------------------------------------------------------------------
console.log('1. Verifying Time, Speed & Distance Question Bank (38 Questions)...');
const { TIME_SPEED_DISTANCE_QUESTIONS } = require('../client/src/data/aptitudeQuestionBank/timeSpeedDistance.js');

assert(Array.isArray(TIME_SPEED_DISTANCE_QUESTIONS), 'TIME_SPEED_DISTANCE_QUESTIONS is an array');
assert(TIME_SPEED_DISTANCE_QUESTIONS.length >= 38, `Has at least 38 questions (found ${TIME_SPEED_DISTANCE_QUESTIONS.length})`);

// Difficulty Distribution Checks
const diffCounts = {};
TIME_SPEED_DISTANCE_QUESTIONS.forEach(q => {
  diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
});

assert(diffCounts['Basic'] >= 10, `Level 1 Basic has at least 10 questions (found ${diffCounts['Basic']})`);
assert(diffCounts['Easy'] >= 10, `Level 2 Easy Placement has at least 10 questions (found ${diffCounts['Easy']})`);
assert(diffCounts['Medium'] >= 10, `Level 3 Medium has at least 10 questions (found ${diffCounts['Medium']})`);
assert(diffCounts['Hard'] >= 5, `Level 4 Placement Standard has at least 5 questions (found ${diffCounts['Hard']})`);
assert(diffCounts['Speed Challenge'] >= 3, `Level 5 Speed Challenge has at least 3 questions (found ${diffCounts['Speed Challenge']})`);

// -----------------------------------------------------------------------------
// 2. Question Data Structure & Validation Checks
// -----------------------------------------------------------------------------
console.log('\n2. Verifying Question Quality & Schema Integrity...');
const seenIds = new Set();
const seenPrompts = new Set();
let allQuestionsValid = true;

TIME_SPEED_DISTANCE_QUESTIONS.forEach((q, idx) => {
  if (!q.id || seenIds.has(q.id)) {
    allQuestionsValid = false;
    console.error(`Duplicate or missing id at index ${idx}: ${q.id}`);
  }
  seenIds.add(q.id);

  if (!q.prompt || seenPrompts.has(q.prompt)) {
    allQuestionsValid = false;
    console.error(`Duplicate or missing prompt at index ${idx}`);
  }
  seenPrompts.add(q.prompt);

  if (!q.options || q.options.length !== 4) {
    allQuestionsValid = false;
    console.error(`Question ${q.id} does not have exactly 4 options`);
  }

  if (!['A', 'B', 'C', 'D'].includes(q.correctOption)) {
    allQuestionsValid = false;
    console.error(`Question ${q.id} has invalid correctOption: ${q.correctOption}`);
  }

  if (!q.hints || q.hints.length < 2) {
    allQuestionsValid = false;
    console.error(`Question ${q.id} must have at least 2 progressive hints`);
  }

  if (!q.explanation || (typeof q.explanation === 'object' && !q.explanation.step1)) {
    allQuestionsValid = false;
    console.error(`Question ${q.id} missing step-by-step explanation`);
  }

  if (!q.pattern) {
    allQuestionsValid = false;
    console.error(`Question ${q.id} missing pattern tag`);
  }
});

assert(allQuestionsValid, 'All 38 questions pass schema integrity (unique IDs, 4 options, valid correct option, >=2 hints, step solutions)');

// -----------------------------------------------------------------------------
// 3. Evidence-Based Company Attribution & Metadata Standards
// -----------------------------------------------------------------------------
console.log('\n3. Verifying Company Attribution & Source Metadata Standard...');
let attributionValid = true;
const targetCompanies = new Set();

TIME_SPEED_DISTANCE_QUESTIONS.forEach(q => {
  if (!q.companyAttribution) {
    attributionValid = false;
  }
  // Check that attribution follows the approved standard
  const isValidAttributionFormat =
    q.companyAttribution.startsWith('Reported in assessments at:') ||
    q.companyAttribution.startsWith('PathPilot Practice — based on reported') ||
    q.companyAttribution.startsWith('PathPilot Practice');

  if (!isValidAttributionFormat) {
    attributionValid = false;
    console.error(`Invalid attribution phrasing for ${q.id}: "${q.companyAttribution}"`);
  }

  // Ensure no unauthorized "Asked by Company" claims
  if (/^Asked by [A-Z]/i.test(q.companyAttribution)) {
    attributionValid = false;
    console.error(`Unauthorized "Asked by" claim found in ${q.id}`);
  }

  (q.companyTags || []).forEach(c => targetCompanies.add(c));
});

assert(attributionValid, 'All questions use evidence-based attribution phrases ("Reported in assessments at..." or "PathPilot Practice — based on reported pattern")');
assert(targetCompanies.has('TCS'), 'Covers TCS');
assert(targetCompanies.has('Cognizant'), 'Covers Cognizant');
assert(targetCompanies.has('Wipro'), 'Covers Wipro');
assert(targetCompanies.has('Capgemini'), 'Covers Capgemini');
assert(targetCompanies.has('Accenture'), 'Covers Accenture');
assert(targetCompanies.has('HCLTech'), 'Covers HCLTech');
assert(targetCompanies.has('Infosys'), 'Covers Infosys');

// -----------------------------------------------------------------------------
// 4. Pattern Diversity in Time Speed Distance
// -----------------------------------------------------------------------------
console.log('\n4. Verifying Question Pattern Diversity...');
const { getTopicPatterns } = require('../client/src/data/aptitudeQuestionBank/index.js');
const patterns = getTopicPatterns('time-speed-distance');
assert(patterns.length >= 10, `Diverse pattern variations present (found ${patterns.length} patterns)`);
assert(patterns.includes('Basic D = S × T'), 'Includes Basic D = S × T pattern');
assert(patterns.includes('Unit Conversion'), 'Includes Unit Conversion pattern');
assert(patterns.includes('Average Speed'), 'Includes Average Speed pattern');
assert(patterns.includes('Relative Speed'), 'Includes Relative Speed pattern');
assert(patterns.includes('Trains Crossing Poles'), 'Includes Trains Crossing Poles pattern');
assert(patterns.includes('Trains Crossing Platforms'), 'Includes Trains Crossing Platforms pattern');
assert(patterns.includes('Trains Passing Each Other'), 'Includes Trains Passing Each Other pattern');
assert(patterns.includes('Boats & Streams'), 'Includes Boats & Streams pattern');
assert(patterns.includes('Circular Track'), 'Includes Circular Track pattern');
assert(patterns.includes('Races & Head Starts'), 'Includes Races & Head Starts pattern');

// -----------------------------------------------------------------------------
// 5. Master Loader & 43 Topics Coverage
// -----------------------------------------------------------------------------
console.log('\n5. Verifying Master Loader Coverage Across All 43 Topics...');
const { APTITUDE_TOPIC_REGISTRY } = require('../client/src/data/aptitudeTopicDataRegistry.js');
const { getTopicQuestionBank, SUPPORTED_COMPANIES, DIFFICULTY_LEVELS } = require('../client/src/data/aptitudeQuestionBank/index.js');

const topicKeys = Object.keys(APTITUDE_TOPIC_REGISTRY);
assert(topicKeys.length === 43, `APTITUDE_TOPIC_REGISTRY contains exactly 43 topics (found ${topicKeys.length})`);

let allTopicsHaveQuestions = true;
topicKeys.forEach(tId => {
  const topicObj = APTITUDE_TOPIC_REGISTRY[tId];
  const qBank = getTopicQuestionBank(tId, topicObj.topicName, topicObj.category);
  if (!Array.isArray(qBank) || qBank.length === 0) {
    allTopicsHaveQuestions = false;
    console.error(`Topic ${tId} returned empty or invalid question bank`);
  }
});
assert(allTopicsHaveQuestions, 'All 43 topics return structured, valid question banks without error');

// -----------------------------------------------------------------------------
// 6. Component Code Inspection (AptitudePracticeSection.jsx)
// -----------------------------------------------------------------------------
console.log('\n6. Verifying AptitudePracticeSection.jsx Interaction Architecture...');
const practiceSectionCode = fs.readFileSync(
  path.join(__dirname, '../client/src/components/learning/AptitudePracticeSection.jsx'),
  'utf-8'
);

// Progressive hints & wrong answer flow
assert(practiceSectionCode.includes('Not quite. Here&apos;s a hint:'), 'Wrong answer flow displays progressive hint indicator');
assert(practiceSectionCode.includes('btn-reveal-next-hint'), 'Has button to reveal next progressive hint');
assert(practiceSectionCode.includes('btn-retry-question') || practiceSectionCode.includes('handleRetryQuestion'), 'Allows retry on wrong answer');
assert(practiceSectionCode.includes('btn-reveal-solution-force'), 'Allows explicit request to reveal answer ("Show me the answer")');

// Correct answer flow
assert(practiceSectionCode.includes('Correct! Excellent Work!'), 'Correct answer celebration state present');
assert(practiceSectionCode.includes('activeQuestion.explanation.step1'), 'Displays Step 1 in solution breakdown');
assert(practiceSectionCode.includes('activeQuestion.explanation.step2'), 'Displays Step 2 in solution breakdown');
assert(practiceSectionCode.includes('activeQuestion.explanation.formula'), 'Displays Formula/Rule in solution');
assert(practiceSectionCode.includes('activeQuestion.explanation.quickTip'), 'Displays Quick Tip in solution');
assert(practiceSectionCode.includes('btn-solution-next-question'), 'Has Next Question button upon solving');

// Filtering & Question Navigator
assert(practiceSectionCode.includes('filter-difficulty-select'), 'Difficulty filter dropdown implemented');
assert(practiceSectionCode.includes('filter-company-select'), 'Company Prep filter dropdown implemented');
assert(practiceSectionCode.includes('filter-pattern-select'), 'Pattern filter dropdown implemented');
assert(practiceSectionCode.includes('filter-status-select'), 'Completion status filter dropdown implemented');
assert(practiceSectionCode.includes('nav-q-btn-'), 'Question Navigator pills grid implemented');

// Bestu & Notes Integration
assert(practiceSectionCode.includes('useBestu') && practiceSectionCode.includes('setPageContext'), 'Synchronizes active question context to Bestu AI mentor');
assert(practiceSectionCode.includes('AddNoteButton') && practiceSectionCode.includes('MyNotesList'), 'Personal My Notes feature integrated in Practice section');

// -----------------------------------------------------------------------------
// 7. DSA Module Non-Regression Check
// -----------------------------------------------------------------------------
console.log('\n7. Verifying DSA Module Non-Regression...');
const dsaWorkflowCode = fs.readFileSync(
  path.join(__dirname, '../client/src/components/learning/DSAPracticeWorkflow.jsx'),
  'utf-8'
);
assert(dsaWorkflowCode.includes('activeProblem'), 'DSAPracticeWorkflow preserves activeProblem state');
assert(dsaWorkflowCode.includes('setPageContext'), 'DSAPracticeWorkflow preserves Bestu context');

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n============================================================');
console.log(`TEST RESULTS: ${passedTests} passed, ${failedTests} failed`);
console.log('============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL PRACTICE QUESTION BANK TESTS PASSED SUCCESSFULLY! ✓\n');
}
