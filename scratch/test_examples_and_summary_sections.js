const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('=== PATHPILOT: PROBLEM EXAMPLES & SUMMARY SECTIONS AUDIT    ===');
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
const learningPageCode = fs.readFileSync(path.join(clientRoot, 'pages/student/DSALearningPage.jsx'), 'utf-8');

try {
  // SECTION 2: PROBLEM EXAMPLES AUDIT (OPTION 3 SPLIT-CARD)
  console.log('--- SECTION 2: Problem Examples (Option 3 Split-Card Design) ---');
  check('Section 2 header displays "Two Pointers Problem Examples"',
    learningPageCode.includes('Two Pointers Problem Examples'));

  check('Section 2 subtitle displays "Step-by-step examples to understand how the pattern is used."',
    learningPageCode.includes('Step-by-step examples to understand how the pattern is used.'));

  check('Uses responsive split layout (grid-cols-1 lg:grid-cols-12)',
    learningPageCode.includes('grid-cols-1 lg:grid-cols-12'));

  check('Example 1 (Two Sum II) has Left problem info & Right visual pointer convergence dry run',
    learningPageCode.includes('Two Sum II — Sorted Array Target Sum') &&
    learningPageCode.includes('Visual Pointer Convergence') &&
    (learningPageCode.includes('Step 1: 2 + 15 = 17') || learningPageCode.includes('2 + 15 = 17')));

  check('Example 2 (Valid Palindrome) has Left problem info & Right visual character convergence dry run',
    learningPageCode.includes('Valid Palindrome — Character Pointer Convergence') &&
    learningPageCode.includes('Visual Character Convergence') &&
    (learningPageCode.includes('s[0] (\'r\') == s[6] (\'r\')') || learningPageCode.includes('s[0]')));

  check('Includes toggle button for secondary code implementation view (View Code Implementation)',
    learningPageCode.includes('View Code Implementation') || learningPageCode.includes('Hide Code Implementation'));

  // SECTION 5: SUMMARY & NOTES AUDIT (OPTION 1 CLEAN PREMIUM CARDS)
  console.log('\n--- SECTION 5: Summary & Notes (Option 1 Clean Premium Cards) ---');
  
  // Extract Section 5 code block
  const summaryBlockMatch = learningPageCode.match(/activeSection === 'summary' && \([\s\S]*?\)\}/);
  const summaryBlock = summaryBlockMatch ? summaryBlockMatch[0] : '';

  check('Section 5 header displays "5. Summary & Notes"',
    summaryBlock.includes('5. Summary &amp; Notes') || summaryBlock.includes('5. Summary & Notes'));

  check('Section 5 subtitle displays "Quick recap of key concepts, important points and edge cases."',
    summaryBlock.includes('Quick recap of key concepts, important points and edge cases.'));

  check('Card 1: Key Takeaway card present with core pattern summary',
    summaryBlock.includes('KEY TAKEAWAY') &&
    summaryBlock.includes('Two Pointers uses two positions to move through data intelligently'));

  check('Card 2: How It Works card present with 3-step visual flow',
    summaryBlock.includes('How It Works — 3-Step Pattern Flow') &&
    summaryBlock.includes('Two Pointers') &&
    summaryBlock.includes('Traverse') &&
    summaryBlock.includes('Optimized'));

  check('Card 3: Critical Edge Cases card present with amber warning styling',
    summaryBlock.includes('Critical Edge Cases to Guard Against') &&
    (summaryBlock.includes('Empty or Length') || summaryBlock.includes('Empty array')) &&
    summaryBlock.includes('Negative Numbers') &&
    summaryBlock.includes('Duplicate Elements'));

  check('CRITICAL REQUIREMENT: NO Syntax Reference or Code Blocks in Section 5',
    !summaryBlock.includes('SyntaxBlock') &&
    !summaryBlock.includes('Syntax Reference') &&
    !summaryBlock.includes('#include <vector>'));

  // NAVIGATION & BENCHMARK INTEGRITY
  console.log('\n--- INTEGRATION & UNTOUCHED BENCHMARKS ---');
  check('5-Section navigation headers intact',
    learningPageCode.includes("id: 'introduction'") &&
    learningPageCode.includes("id: 'examples'") &&
    learningPageCode.includes("id: 'practice'") &&
    learningPageCode.includes("id: 'patterns'") &&
    learningPageCode.includes("id: 'summary'"));

  check('TwoPointersIntroduction remains mounted in Section 1',
    learningPageCode.includes('<TwoPointersIntroduction />'));

  check('DSAPracticeWorkflow remains mounted in Section 3',
    learningPageCode.includes('<DSAPracticeWorkflow />'));

} catch (err) {
  console.error('Audit execution error:', err);
  failed++;
}

console.log('\n================================================================');
console.log('=== AUDIT SUMMARY                                            ===');
console.log('================================================================');
console.log(`Total Checks:  ${passed + failed}`);
console.log(`Passed:        ${passed}`);
console.log(`Failed:        ${failed}`);
console.log(`Success Rate:  ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed === 0) {
  console.log('\n🎉 ALL PROBLEM EXAMPLES & SUMMARY SECTIONS AUDITS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.log('\n⚠️ Some checks failed.');
  process.exit(1);
}
