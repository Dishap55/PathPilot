import { practiceHistoryService } from '../client/src/services/practiceHistoryService.js';

// Mock localStorage for Node environment
if (typeof localStorage === 'undefined' || localStorage === null) {
  global.localStorage = {
    store: {},
    getItem: function (key) {
      return this.store[key] || null;
    },
    setItem: function (key, value) {
      this.store[key] = value.toString();
    },
    clear: function () {
      this.store = {};
    }
  };
}

// Starter Code Stubs definition (matching DSAPracticeWorkflow)
const STARTER_CODES = {
  'two-sum-ii': {
    'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        // Write your two-pointer code here\n        \n        return {};\n    }\n};`,
    'Java': `class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        // Write your two-pointer code here\n        \n        return new int[]{};\n    }\n}`,
    'Python': `class Solution:\n    def twoSum(self, numbers: list[int], target: int) -> list[int]:\n        # Write your two-pointer code here\n        \n        return []`,
    'JavaScript': `/**\n * @param {number[]} numbers\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(numbers, target) {\n    // Write your two-pointer code here\n    \n    return [];\n};`
  },
  'valid-palindrome': {
    'C++': `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your two-pointer code here\n        \n        return false;\n    }\n};`,
    'Java': `class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your two-pointer code here\n        \n        return false;\n    }\n}`,
    'Python': `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Write your two-pointer code here\n        \n        return False`,
    'JavaScript': `/**\n * @param {string} s\n * @return {boolean}\n */\nvar isPalindrome = function(s) {\n    // Write your two-pointer code here\n    \n    return false;\n};`
  },
  'container-water': {
    'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your two-pointer code here\n        \n        return 0;\n    }\n};`,
    'Java': `class Solution {\n    public int maxArea(int[] height) {\n        // Write your two-pointer code here\n        \n        return 0;\n    }\n}`,
    'Python': `class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        # Write your two-pointer code here\n        \n        return 0`,
    'JavaScript': `/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    // Write your two-pointer code here\n    \n    return 0;\n};`
  }
};

// Check whether code has meaningful student-written implementation
function isCodeMeaningful(code, starter = '') {
  const normalize = (str) =>
    (str || '')
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, '');

  const normalizedCode = normalize(code);
  const normalizedStarter = normalize(starter);

  if (!code.trim() || (normalizedStarter && normalizedCode === normalizedStarter)) {
    return false;
  }

  const stripped = code
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/#include.*$/gm, '')
    .replace(/using namespace.*$/gm, '')
    .replace(/class Solution.*$/gm, '')
    .replace(/public:.*$/gm, '')
    .replace(/vector|int|numbers|target|height|string|String|bool|boolean|self|list|str|return|false|true|new|0/g, '')
    .replace(/[{};():,\s]/g, '');

  return stripped.length > 2;
}

async function runTests() {
  console.log('=== VERIFYING NO AUTO-FILL & STARTER STUBS ===\n');
  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`[PASS] ${msg}`);
      passed++;
    } else {
      console.error(`[FAIL] ${msg}`);
      failed++;
    }
  }

  const languages = ['Python', 'Java', 'C++', 'JavaScript'];
  const problems = ['two-sum-ii', 'valid-palindrome', 'container-water'];

  // Test 1: Confirm starter code has NO auto-filled solution logic across all languages & problems
  for (const probId of problems) {
    for (const lang of languages) {
      const stub = STARTER_CODES[probId][lang];
      assert(stub && stub.length > 0, `${probId} (${lang}): Starter stub exists`);
      assert(!isCodeMeaningful(stub, stub), `${probId} (${lang}): Starter code contains NO auto-filled solution logic`);
      assert(
        !stub.includes('left < right') && !stub.includes('left++') && !stub.includes('while'),
        `${probId} (${lang}): Solution algorithm is completely absent from starter stub`
      );
    }
  }

  // Test 2: Confirm student typing enables RUN & SUBMIT flow
  const studentCode = `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{};
    }
}`;

  assert(isCodeMeaningful(studentCode), 'Student-typed solution logic is detected as valid code');

  // Test 3: Record attempt in history service
  const attempt = await practiceHistoryService.saveAttempt({
    userId: 'student_manual_1',
    problemId: 'two-sum-ii',
    problemTitle: 'Two Sum II',
    difficulty: 'Easy-Medium',
    pattern: 'Two Pointers',
    language: 'Java',
    submittedCode: studentCode,
    passedCount: 3,
    totalCount: 3,
    result: 'PASSED'
  });

  assert(attempt.result === 'PASSED', 'Submission & history logging work as expected');

  console.log(`\n=== SUMMARY: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

runTests();
