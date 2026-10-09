import { practiceHistoryService } from '../client/src/services/practiceHistoryService.js';

// Mock localStorage for Node test environment
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

async function runTests() {
  console.log('--- STARTING PRACTICE CONTINUATION & HISTORY TESTS ---');
  let testsPassed = 0;
  let testsFailed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      testsPassed++;
    } else {
      console.error(`[FAIL] ${message}`);
      testsFailed++;
    }
  }

  const userId = 'test_student_123';

  // Test 1: Record first attempt for Two Sum II
  const attempt1 = await practiceHistoryService.saveAttempt({
    userId,
    problemId: 'two-sum-ii',
    problemTitle: 'Two Sum II — Input Array Is Sorted',
    difficulty: 'Easy-Medium',
    pattern: 'Two Pointers → Opposite Direction',
    language: 'C++',
    submittedCode: 'class Solution { public: vector<int> twoSum(...) {} };',
    passedCount: 3,
    totalCount: 3,
    result: 'PASSED'
  });

  assert(attempt1.attemptNumber === 1, 'First attempt has attemptNumber = 1');
  assert(attempt1.result === 'PASSED', 'First attempt result is PASSED');

  // Test 2: Record second attempt for Two Sum II (Try Again scenario)
  const attempt2 = await practiceHistoryService.saveAttempt({
    userId,
    problemId: 'two-sum-ii',
    problemTitle: 'Two Sum II — Input Array Is Sorted',
    difficulty: 'Easy-Medium',
    pattern: 'Two Pointers → Opposite Direction',
    language: 'Python',
    submittedCode: 'class Solution: def twoSum(self, numbers, target): ...',
    passedCount: 3,
    totalCount: 3,
    result: 'PASSED'
  });

  assert(attempt2.attemptNumber === 2, 'Second attempt has attemptNumber = 2 without overwriting attempt 1');

  // Test 3: Fetch problem attempts
  const attempts = await practiceHistoryService.getProblemAttempts(userId, 'two-sum-ii');
  assert(attempts.length === 2, 'Fetched 2 total attempts for two-sum-ii');
  assert(attempts[0].language === 'Python', 'Newest attempt is listed first');
  assert(attempts[1].language === 'C++', 'Older attempt is listed second');

  // Test 4: Record attempt for Valid Palindrome
  await practiceHistoryService.saveAttempt({
    userId,
    problemId: 'valid-palindrome',
    problemTitle: 'Valid Palindrome',
    difficulty: 'Easy',
    pattern: 'Two Pointers → Inward Convergence',
    language: 'Java',
    submittedCode: 'class Solution { public boolean isPalindrome(String s) {} }',
    passedCount: 3,
    totalCount: 3,
    result: 'PASSED'
  });

  // Test 5: Verify Problem Stats Map
  const statsMap = await practiceHistoryService.getProblemStatsMap(userId);
  assert(statsMap['two-sum-ii'].status === 'Completed', 'two-sum-ii is marked Completed');
  assert(statsMap['two-sum-ii'].totalAttempts === 2, 'two-sum-ii has 2 total attempts in stats map');
  assert(statsMap['valid-palindrome'].status === 'Completed', 'valid-palindrome is marked Completed');
  assert(!statsMap['container-water'], 'container-water remains un-attempted');

  console.log(`\nTEST RESULTS: ${testsPassed} passed, ${testsFailed} failed.`);
  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTests();
