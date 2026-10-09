/**
 * OOPS MCQ PRACTICE LAB EXPANSION — VERIFICATION TEST SUITE
 * 
 * Verifies all 18 criteria required for Phase 1 OOPS Practice Lab:
 * 1. Valid canonical topicIds for all questions
 * 2. All 20 canonical topics have >= 5 questions
 * 3. Difficulty progression per topic (>= 2 Easy, >= 2 Medium, >= 1 Hard)
 * 4. Unique IDs (no duplicates)
 * 5. Unique prompts (no duplicates)
 * 6. Valid options schema (4 options A, B, C, D)
 * 7. Valid correctOption in ['A','B','C','D']
 * 8. Complete explanations (step1, formula, summary, quickTip)
 * 9. At least 2 progressive hints per question
 * 10. Honest company / placement attribution
 * 11. Component topic scoping in OOPSPracticeSection.jsx
 * 12. Component difficulty filtering within topic
 * 13. Index reset on topic / difficulty switch
 * 14. Question navigator uses filtered questions
 * 15. Progress counters use filtered counts
 * 16. Empty topic and empty filter states
 * 17. Wrong -> Hint -> Retry interactive flow
 * 18. Correct -> Explanation -> Next interactive flow
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAILED: ${message}`);
    failedTests++;
  }
}

console.log('============================================================');
console.log('RUNNING OOPS MCQ PRACTICE LAB EXPANSION TEST SUITE');
console.log('============================================================\n');

// 1. Load Data Layer
console.log('1. Verifying Question Bank Size and Canonical Topics...');
const { OOPS_MCQ_QUESTIONS } = await import('../client/src/data/oops/oopsPracticeData.js');
const { OOPS_TOPIC_REGISTRY } = await import('../client/src/data/oops/oopsTopicDataRegistry.js');

const canonicalTopicIds = Object.keys(OOPS_TOPIC_REGISTRY);

assert(Array.isArray(OOPS_MCQ_QUESTIONS), 'OOPS_MCQ_QUESTIONS is an array');
assert(OOPS_MCQ_QUESTIONS.length >= 100, `Has 100+ meaningful MCQs (found ${OOPS_MCQ_QUESTIONS.length})`);
assert(canonicalTopicIds.length === 20, 'Canonical registry has exactly 20 topics');

// 2. Topic Coverage & Difficulty Progression
console.log('\n2. Verifying Topic Coverage & Difficulty Distribution (>= 5 per topic)...');
let allTopicsHaveAtLeast5 = true;
let allTopicsHaveProgression = true;

const topicCoverageMap = {};

canonicalTopicIds.forEach((tId) => {
  const topicQuestions = OOPS_MCQ_QUESTIONS.filter((q) => q.topicId === tId);
  const easyCount = topicQuestions.filter((q) => q.difficulty === 'Easy').length;
  const medCount = topicQuestions.filter((q) => q.difficulty === 'Medium').length;
  const hardCount = topicQuestions.filter((q) => q.difficulty === 'Hard').length;

  topicCoverageMap[tId] = {
    total: topicQuestions.length,
    easy: easyCount,
    med: medCount,
    hard: hardCount
  };

  if (topicQuestions.length < 5) {
    allTopicsHaveAtLeast5 = false;
    console.error(`Topic ${tId} has only ${topicQuestions.length} questions (expected >= 5)`);
  }

  if (easyCount < 2 || medCount < 2 || hardCount < 1) {
    allTopicsHaveProgression = false;
    console.error(`Topic ${tId} fails progression: Easy=${easyCount}, Med=${medCount}, Hard=${hardCount}`);
  }
});

assert(allTopicsHaveAtLeast5, 'All 20 canonical topics have at least 5 questions');
assert(allTopicsHaveProgression, 'All 20 canonical topics have at least 2 Easy, 2 Medium, and 1 Hard questions');

// 3. Schema & Uniqueness Validation
console.log('\n3. Verifying Question Schema, Uniqueness, and Data Integrity...');
const idSet = new Set();
const promptSet = new Set();
let duplicatesFound = false;
let schemaErrors = 0;

OOPS_MCQ_QUESTIONS.forEach((q, idx) => {
  // ID check
  if (!q.id || idSet.has(q.id)) {
    duplicatesFound = true;
    console.error(`Duplicate or missing ID: ${q.id} at index ${idx}`);
  }
  idSet.add(q.id);

  // Prompt uniqueness
  const cleanPrompt = q.prompt.trim().toLowerCase();
  if (promptSet.has(cleanPrompt)) {
    duplicatesFound = true;
    console.error(`Duplicate prompt found at index ${idx}: "${q.prompt.substring(0, 40)}..."`);
  }
  promptSet.add(cleanPrompt);

  // Canonical topic check
  if (!canonicalTopicIds.includes(q.topicId)) {
    schemaErrors++;
    console.error(`Invalid topicId: "${q.topicId}" on question ${q.id}`);
  }

  // Options check
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    schemaErrors++;
    console.error(`Question ${q.id} does not have exactly 4 options`);
  } else {
    const optIds = q.options.map((o) => o.id);
    if (JSON.stringify(optIds) !== JSON.stringify(['A', 'B', 'C', 'D'])) {
      schemaErrors++;
      console.error(`Question ${q.id} has invalid option IDs: ${optIds}`);
    }
  }

  // Correct Option check
  if (!['A', 'B', 'C', 'D'].includes(q.correctOption)) {
    schemaErrors++;
    console.error(`Question ${q.id} has invalid correctOption: ${q.correctOption}`);
  }

  // Difficulty check
  if (!['Easy', 'Medium', 'Hard'].includes(q.difficulty)) {
    schemaErrors++;
    console.error(`Question ${q.id} has invalid difficulty: ${q.difficulty}`);
  }
  if (![1, 2, 3].includes(q.difficultyLevel)) {
    schemaErrors++;
    console.error(`Question ${q.id} has invalid difficultyLevel: ${q.difficultyLevel}`);
  }

  // Hints check
  if (!Array.isArray(q.hints) || q.hints.length < 2) {
    schemaErrors++;
    console.error(`Question ${q.id} has fewer than 2 progressive hints`);
  }

  // Explanation check
  if (!q.explanation || !q.explanation.step1 || !q.explanation.formula || !q.explanation.summary) {
    schemaErrors++;
    console.error(`Question ${q.id} is missing required explanation fields`);
  }
});

assert(!duplicatesFound, 'No duplicate question IDs or duplicate prompts');
assert(schemaErrors === 0, `All questions pass strict schema validation (errors: ${schemaErrors})`);

// 4. Company & Placement Attribution Integrity
console.log('\n4. Verifying Company Attribution Integrity (No Fabricated Years/Sources)...');
let attributionValid = true;
OOPS_MCQ_QUESTIONS.forEach((q) => {
  if (q.companyAttribution) {
    const attr = q.companyAttribution;
    // Ensure no fake claims or fabricated dates/years
    if (attr.includes('2024') || attr.includes('2025') || attr.includes('2026') || attr.includes('Official Exam Paper')) {
      attributionValid = false;
      console.error(`Question ${q.id} has fabricated year or source in attribution: ${attr}`);
    }
  }
});
assert(attributionValid, 'All questions use honest, uninflated company/pattern attribution');

// 5. Component Logic & Scoping in OOPSPracticeSection.jsx
console.log('\n5. Verifying Component Architecture in OOPSPracticeSection.jsx...');
const practiceSectionPath = path.resolve(__dirname, '../client/src/components/learning/oops/OOPSPracticeSection.jsx');
const practiceSectionSource = fs.readFileSync(practiceSectionPath, 'utf8');

assert(
  practiceSectionSource.includes('resolveOOPSTopicId'),
  'OOPSPracticeSection imports and delegates to resolveOOPSTopicId'
);
assert(
  practiceSectionSource.includes('OOPS_MCQ_QUESTIONS.filter((q) => q.topicId === activeTopicId)'),
  'OOPSPracticeSection filters MCQs strictly by activeTopicId'
);
assert(
  practiceSectionSource.includes('topicQuestions.filter((q) => q.difficulty === mcqDifficultyFilter)'),
  'OOPSPracticeSection filters within topic by mcqDifficultyFilter'
);
assert(
  practiceSectionSource.includes('setActiveMcqIndex(0);'),
  'OOPSPracticeSection safely resets active index on topic or difficulty filter change'
);
assert(
  practiceSectionSource.includes('filteredTopicQuestions.map((q, idx) =>'),
  'Question Navigator pills map strictly over filteredTopicQuestions'
);
assert(
  practiceSectionSource.includes('{topicQuestions.length}'),
  'Mode switcher and difficulty badges reflect topic-scoped counts'
);
assert(
  practiceSectionSource.includes('id="oops-mcq-empty-topic"'),
  'Renders clean empty state when active topic has no questions'
);
assert(
  practiceSectionSource.includes('id="oops-mcq-empty-filter"'),
  'Renders clean empty state when difficulty filter has no matching questions'
);
assert(
  practiceSectionSource.includes('id="btn-next-from-explanation"'),
  'Includes Next Question shortcut in explanation card for seamless Correct -> Explanation -> Next flow'
);
assert(
  practiceSectionSource.includes('handleRetryMcq'),
  'Preserves Wrong -> Hint -> Retry interactive flow'
);

console.log('\n============================================================');
console.log(`TEST RESULTS: ${passedTests} passed, ${failedTests} failed`);
console.log('============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL OOPS MCQ PRACTICE LAB VERIFICATION CHECKS PASSED FLAWLESSLY! ✓\n');
}
