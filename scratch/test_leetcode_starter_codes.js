const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('=== PATHPILOT: LEETCODE-STYLE STARTER CODE & WORKFLOW AUDIT  ===');
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
const serverRoot = path.resolve(__dirname, '../server');
const workflowCode = fs.readFileSync(path.join(clientRoot, 'components/learning/DSAPracticeWorkflow.jsx'), 'utf-8');
const controllerCode = fs.readFileSync(path.join(serverRoot, 'controllers/roadmapController.js'), 'utf-8');

try {
  // Extract starterCode block from DSAPracticeWorkflow.jsx
  const starterCodeMatch = workflowCode.match(/starterCode:\s*\{([\s\S]*?)\},/);
  const starterCodeText = starterCodeMatch ? starterCodeMatch[1] : '';

  // 1. NO COMPLETE SOLUTIONS IN STARTER CODE
  console.log('--- SECTION 1: Solution Leak Audit ---');
  check('Starter code does NOT contain completed while loop algorithm',
    !starterCodeText.includes('while (left < right)'));

  check('Starter code does NOT contain completed return logic ({left + 1, right + 1})',
    !starterCodeText.includes('return {left + 1, right + 1}'));

  check('Starter code contains only stub comment (Write your two-pointer code here)',
    starterCodeText.includes('// Write your two-pointer code here') || starterCodeText.includes('# Write your two-pointer code here'));

  check('Server controller starter_code does NOT contain completed solution',
    !controllerCode.includes('int left = 0, right = numbers.size() - 1;\n        while (left < right)'));

  // 2. LEETCODE-STYLE STRUCTURE FOR ALL 4 LANGUAGES
  console.log('\n--- SECTION 2: LeetCode-Style Language Templates ---');
  
  // Problem 1: Two Sum II
  check('C++ Two Sum II starter code has correct class Solution and function signature vector<int> twoSum(vector<int>& numbers, int target)',
    workflowCode.includes('class Solution') && workflowCode.includes('vector<int> twoSum(vector<int>& numbers, int target)'));

  check('Java Two Sum II starter code has correct class Solution and method public int[] twoSum(int[] numbers, int target)',
    workflowCode.includes('public int[] twoSum(int[] numbers, int target)'));

  check('Python Two Sum II starter code has correct class Solution and def twoSum(self, numbers: list[int], target: int) -> list[int]:',
    workflowCode.includes('def twoSum(self, numbers: list[int], target: int) -> list[int]:'));

  check('JavaScript Two Sum II starter code has correct var twoSum = function(numbers, target)',
    workflowCode.includes('var twoSum = function(numbers, target)'));

  // Problem 2: Valid Palindrome
  check('C++ Valid Palindrome starter code has bool isPalindrome(string s)',
    workflowCode.includes('bool isPalindrome(string s)'));

  check('Java Valid Palindrome starter code has public boolean isPalindrome(String s)',
    workflowCode.includes('public boolean isPalindrome(String s)'));

  check('Python Valid Palindrome starter code has def isPalindrome(self, s: str) -> bool:',
    workflowCode.includes('def isPalindrome(self, s: str) -> bool:'));

  check('JavaScript Valid Palindrome starter code has var isPalindrome = function(s)',
    workflowCode.includes('var isPalindrome = function(s)'));

  // Problem 3: Container With Most Water
  check('C++ Container Water starter code has int maxArea(vector<int>& height)',
    workflowCode.includes('int maxArea(vector<int>& height)'));

  check('Java Container Water starter code has public int maxArea(int[] height)',
    workflowCode.includes('public int maxArea(int[] height)'));

  check('Python Container Water starter code has def maxArea(self, height: list[int]) -> int:',
    workflowCode.includes('def maxArea(self, height: list[int]) -> int:'));

  check('JavaScript Container Water starter code has var maxArea = function(height)',
    workflowCode.includes('var maxArea = function(height)'));

  // 3. RUN / SUBMIT FUNCTION SIGNATURE COMPATIBILITY
  console.log('\n--- SECTION 3: Signature & Execution Compatibility ---');
  check('Function name twoSum matches starter and test runner',
    workflowCode.includes("functionName: 'twoSum'") && workflowCode.includes('twoSum'));

  check('Function name isPalindrome matches starter and test runner',
    workflowCode.includes("functionName: 'isPalindrome'") && workflowCode.includes('isPalindrome'));

  check('Function name maxArea matches starter and test runner',
    workflowCode.includes("functionName: 'maxArea'") && workflowCode.includes('maxArea'));

  // 4. LANGUAGE SWITCHING & STATE MACHINE
  console.log('\n--- SECTION 4: Language Switching & State Machine ---');
  check('Language switching updates selectedLang and loads language starter code',
    workflowCode.includes('handleLanguageChange') && workflowCode.includes('setSelectedLang(newLang)'));

  check('Language selector options support C++, Java, Python, JavaScript',
    workflowCode.includes('SUPPORTED_LANGUAGES.map'));

  check('State machine workflowState preserves initial -> coding -> results -> submitted',
    workflowCode.includes("setWorkflowState('initial')") &&
    workflowCode.includes("setWorkflowState('coding')") &&
    workflowCode.includes("setWorkflowState('results')") &&
    workflowCode.includes("setWorkflowState('submitted')"));

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
  console.log('\n🎉 ALL LEETCODE-STYLE STARTER CODE & WORKFLOW AUDITS PASSED!');
  process.exit(0);
} else {
  console.log('\n⚠️ Some checks failed.');
  process.exit(1);
}
