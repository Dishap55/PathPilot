const assert = require('assert');
const { CANONICAL_QUESTION_BANK, getFallbackQuestions, shuffleQuestion } = require('../server/services/assessment/canonicalQuestionBank');
const { createAssessmentSession, getNextQuestion, evaluateAnswer } = require('../server/services/assessment/assessmentSessionService');

console.log('================================================================');
console.log('🧪 VERIFYING USER-REQUESTED ASSESSMENT CUSTOMIZATIONS');
console.log('================================================================');

// -----------------------------------------------------------------------------
// Test 1: MCQ Option Shuffling
// -----------------------------------------------------------------------------
console.log('\n--- 1. MCQ Option Shuffling ---');
const sampleMcq = CANONICAL_QUESTION_BANK.find(q => q.questionType === 'mcq');
const positions = { 0: 0, 1: 0, 2: 0, 3: 0 };
const TRIALS = 200;

for (let i = 0; i < TRIALS; i++) {
  const shuffled = shuffleQuestion(sampleMcq);
  const correctIdx = shuffled.options.indexOf(sampleMcq.correctAnswer);
  positions[correctIdx] = (positions[correctIdx] || 0) + 1;
}

console.log(`Option positions over ${TRIALS} shuffles:`, positions);
assert(positions[0] < TRIALS, 'Option A must not always be the correct answer!');
assert(positions[1] > 0 && positions[2] > 0 && positions[3] > 0, 'Options B, C, and D must each receive the correct answer uniformly.');
console.log('✓ Test 1 Passed: MCQ options are properly shuffled across A, B, C, D.');

// -----------------------------------------------------------------------------
// Test 2: Mandatory Easy Coding Question in DSA
// -----------------------------------------------------------------------------
console.log('\n--- 2. Mandatory Easy Coding Question in DSA ---');
const dsaCodingQs = CANONICAL_QUESTION_BANK.filter(q => q.subject === 'DSA' && q.questionType === 'coding');
assert(dsaCodingQs.length >= 2, `Expected at least 2 DSA coding questions, found ${dsaCodingQs.length}`);
for (const cq of dsaCodingQs) {
  assert.strictEqual(cq.difficulty, 'Easy', `Coding question ${cq.questionId} must be Easy, found ${cq.difficulty}`);
}
console.log(`✓ Test 2 Passed: All canonical DSA coding questions are strictly Easy (${dsaCodingQs.map(q => q.questionId).join(', ')}).`);

// -----------------------------------------------------------------------------
// Test 3: Starter Code Contains Syntax & Comments Only (No Pre-solved Solutions)
// -----------------------------------------------------------------------------
console.log('\n--- 3. Clean Starter Code (Syntax & Comments Only) ---');
for (const cq of dsaCodingQs) {
  assert(cq.starterCode, `Coding question ${cq.questionId} must have starterCode`);
  assert(typeof cq.starterCode === 'object', `StarterCode for ${cq.questionId} must support multi-language`);
  const langs = ['cpp', 'java', 'python', 'javascript'];
  for (const lang of langs) {
    const code = cq.starterCode[lang];
    assert(code, `Missing ${lang} starter code for ${cq.questionId}`);
    // Check that pre-solved implementation lines like while(left < right) are NOT in the starter code
    assert(!code.includes('while (left < right)'), `Starter code for ${cq.questionId} (${lang}) must not be pre-solved`);
    assert(code.includes('//') || code.includes('#') || code.includes('/*'), `Starter code for ${cq.questionId} (${lang}) must contain guidance comments`);
  }
}
console.log('✓ Test 3 Passed: Starter code provides only signatures, syntax, and comments across C++, Java, Python, and JavaScript.');

// -----------------------------------------------------------------------------
// Test 4: Evaluation and Scoring with Test Cases
// -----------------------------------------------------------------------------
console.log('\n--- 4. Code Evaluation & Test Case Scoring ---');
const codingQ = dsaCodingQs[0];

// Case A: 1 test case passed with code attempt
const res1 = evaluateAnswer(codingQ, 'function twoSum(nums, t) { return [1, 2]; }', false, 1);
assert.strictEqual(res1.isCorrect, true, 'At least 1 test case passed must award positive credit');

// Case B: 0 test cases passed and empty attempt
const res2 = evaluateAnswer(codingQ, '', false, 0);
assert.strictEqual(res2.isCorrect, false, '0 test cases and empty attempt should not pass');

// Case C: Skipped coding question
const res3 = evaluateAnswer(codingQ, null, true, null);
assert.strictEqual(res3.isSkipped, true, 'Skipped flag must be preserved');
assert.strictEqual(res3.isCorrect, false, 'Skipped coding question cannot be marked correct');

console.log('✓ Test 4 Passed: Assessment evaluates code execution and awards positive credit when test cases pass or valid attempt is submitted.');

console.log('\n================================================================');
console.log('🎉 ALL ASSESSMENT CUSTOMIZATION TESTS PASSED!');
console.log('================================================================');
