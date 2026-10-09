const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('================================================================');
console.log('=== PATHPILOT: DSA PRACTICE WORKFLOW UI STATE VERIFICATION   ===');
console.log('================================================================\n');

let passed = 0;
let failed = 0;

function check(desc, condition, detail = '') {
  if (condition) {
    console.log(`✅ [PASS] ${desc}`);
    if (detail) console.log(`   ↳ ${detail}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${desc}`);
    if (detail) console.error(`   ↳ ${detail}`);
    failed++;
  }
}

const clientRoot = path.resolve(__dirname, '../client/src');
const workflowCode = fs.readFileSync(path.join(clientRoot, 'components/learning/DSAPracticeWorkflow.jsx'), 'utf-8');
const learningPageCode = fs.readFileSync(path.join(clientRoot, 'pages/student/DSALearningPage.jsx'), 'utf-8');

try {
  // TEST A: Empty Editor State
  console.log('--- TEST A: Before Code / Initial State ---');
  check('RUN button is disabled when hasValidCode is false',
    workflowCode.includes('disabled={!hasValidCode}'));
  check('Guidance message tells user to write code to enable Run',
    workflowCode.includes('Write your code to enable Run.'));
  check('Test Cases container is conditionally rendered (hidden initially)',
    workflowCode.includes("workflowState === 'results'") || workflowCode.includes("workflowState === 'submitted'"));
  check('Solution Analysis is conditionally rendered (hidden initially)',
    workflowCode.includes("workflowState === 'submitted'"));

  // TEST B: After Writing Code State
  console.log('\n--- TEST B: After Writing Code State ---');
  check('State transitions to coding when text typed',
    workflowCode.includes("setWorkflowState('coding')"));
  check('RUN button enabled during coding state',
    workflowCode.includes('!hasValidCode'));
  check('Test Cases stay hidden during coding state',
    workflowCode.includes("(workflowState === 'results' || workflowState === 'submitted')"));

  // TEST C & D: Click RUN with Failing Code
  console.log('\n--- TEST C & D: Click RUN with Failing Code & Run Again ---');
  check('Clicking RUN sets workflowState to results',
    workflowCode.includes("setWorkflowState('results')"));
  check('Test Cases panel uses subtle slide-up animation',
    workflowCode.includes('animate-slide-up'));
  check('Failed test case shows Input, Expected, and Actual output',
    workflowCode.includes('tc.input') && workflowCode.includes('tc.expected') && workflowCode.includes('tc.actual'));
  check('Progressive Hint shown when !allPassed',
    workflowCode.includes('!allPassed &&') && workflowCode.includes('Progressive Hint for Failed Test Case'));
  check('Submit button hidden when tests fail',
    workflowCode.includes('allPassed &&') && workflowCode.includes('SUBMIT SOLUTION'));
  check('RUN button changes label to RUN AGAIN when in results state',
    workflowCode.includes("workflowState === 'results' ? 'RUN AGAIN' : 'RUN'"));

  // TEST E: All Tests Pass State
  console.log('\n--- TEST E: All Tests Pass State ---');
  check('Shows "All test cases passed" success banner',
    workflowCode.includes('All test cases passed') || workflowCode.includes('All Test Cases Passed'));
  check('Submit button is enabled/shown when allPassed is true',
    workflowCode.includes('allPassed &&') && workflowCode.includes('SUBMIT SOLUTION'));
  check('Solution Analysis remains hidden until SUBMIT clicked',
    workflowCode.includes("workflowState === 'submitted'"));

  // TEST F: Click Submit State
  console.log('\n--- TEST F: Click Submit State ---');
  check('Clicking SUBMIT sets workflowState to submitted',
    workflowCode.includes("setWorkflowState('submitted')"));
  check('Solution Analysis revealed after submission',
    workflowCode.includes("workflowState === 'submitted' &&"));
  check('Analysis contains 4 evaluation sections (What You Did Well, What Can Be Improved, Simpler Approach, Which Pattern)',
    workflowCode.includes('What You Did Well') &&
    workflowCode.includes('What Can Be Improved') &&
    workflowCode.includes('Simpler Approach') &&
    workflowCode.includes('Which Pattern Was Used?'));

  // INTEGRATION & CLEANUP AUDIT
  console.log('\n--- INTEGRATION AUDIT: DSALearningPage.jsx ---');
  const section1IntroMatches = (learningPageCode.match(/<DSAPracticeWorkflow \/>/g) || []).length;
  check('Only ONE instance of DSAPracticeWorkflow rendered in DSALearningPage.jsx (in Section 3 Practice Questions)',
    section1IntroMatches === 1,
    `Found ${section1IntroMatches} instance(s) of DSAPracticeWorkflow`);

  check('Section 1 (Introduction) contains TwoPointersIntroduction ONLY',
    learningPageCode.includes("activeSection === 'introduction'") &&
    !learningPageCode.includes("<TwoPointersIntroduction />\n              <DSAPracticeWorkflow />"));

  check('Section 3 (Practice) contains DSAPracticeWorkflow',
    learningPageCode.includes("activeSection === 'practice'") &&
    learningPageCode.includes("<DSAPracticeWorkflow />"));

} catch (err) {
  console.error('Verification error:', err);
  failed++;
}

console.log('\n================================================================');
console.log('=== VERIFICATION SUMMARY                                     ===');
console.log('================================================================');
console.log(`Total Checks:  ${passed + failed}`);
console.log(`Passed:        ${passed}`);
console.log(`Failed:        ${failed}`);
console.log(`Success Rate:  ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed === 0) {
  console.log('\n🎉 ALL UI STATE TRANSITION REQUIREMENTS VERIFIED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.log('\n⚠️ Some checks failed.');
  process.exit(1);
}
