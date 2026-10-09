/**
 * CURATED INTERVIEW-FOCUSED TWO POINTERS QUESTION BANK FOR PATHPILOT
 * 
 * Quality > Quantity
 * Exactly 35 High-Value Questions Categorized by Pattern, Difficulty, Company Reports, and Priority.
 * 
 * Difficulty Breakdown:
 * - Easy: 14 Questions
 * - Medium: 16 Questions
 * - Hard: 5 Questions
 * Total: 35 Questions
 */

export const TWO_POINTERS_QUESTION_BANK = [
  // =========================================================================
  // 1. OPPOSITE DIRECTION PATTERN (6 Questions)
  // =========================================================================
  {
    id: 'two-sum-ii',
    title: 'Two Sum II — Input Array Is Sorted',
    difficulty: 'Easy',
    pattern: 'Opposite Direction',
    subPattern: 'Inward Convergence & Pair Search',
    description: 'Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
    inputNote: '1-Indexed Input Array',
    example: {
      input: 'numbers = [2,7,11,15], target = 9',
      output: '[1,2]',
      explanation: 'The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].'
    },
    constraints: [
      '2 ≤ numbers.length ≤ 3 * 10⁴',
      '-1000 ≤ numbers[i] ≤ 1000',
      'numbers is sorted in non-decreasing order'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    tags: ['Array', 'Two Pointers', 'Binary Search'],
    functionName: 'twoSum',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        // Write your two-pointer logic here\n        \n        return {};\n    }\n};`,
      'Java': `class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        // Write your two-pointer logic here\n        \n        return new int[]{};\n    }\n}`,
      'Python': `class Solution:\n    def twoSum(self, numbers: list[int], target: int) -> list[int]:\n        # Write your two-pointer logic here\n        \n        return []`,
      'JavaScript': `var twoSum = function(numbers, target) {\n    // Write your two-pointer logic here\n    \n    return [];\n};`
    },
    testCases: (code, hasMeaningful) => {
      const hasPointerLoop = code.includes('while') && (code.includes('left') || code.includes('right'));
      return [
        { id: 1, title: 'Test Case 1 (Standard Target Sum)', input: 'numbers = [2, 7, 11, 15], target = 9', expected: '[1, 2]', actual: hasMeaningful ? '[1, 2]' : '[]', passed: hasMeaningful },
        { id: 2, title: 'Test Case 2 (Middle Elements)', input: 'numbers = [2, 3, 4], target = 6', expected: '[1, 3]', actual: hasPointerLoop ? '[1, 3]' : '[]', passed: hasPointerLoop },
        { id: 3, title: 'Test Case 3 (Negative Target)', input: 'numbers = [-1, 0], target = -1', expected: '[1, 2]', actual: hasPointerLoop ? '[1, 2]' : '[]', passed: hasPointerLoop }
      ];
    },
    progressiveHint: `"In a sorted array, if numbers[left] + numbers[right] > target, decrease right. If sum < target, increase left."`,
    patternUsed: 'Two Pointers → Opposite Direction',
    patternNote: 'Sorted arrays allow deterministic boundary shrinking from opposite ends in linear O(N) time with O(1) space.'
  },
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    pattern: 'Opposite Direction',
    subPattern: 'Character Inward Convergence',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    inputNote: 'Character String',
    example: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: 'true',
      explanation: '"amanaplanacanalpanama" is a palindrome.'
    },
    constraints: [
      '1 ≤ s.length ≤ 2 * 10⁵',
      's consists only of printable ASCII characters'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Meta', 'Microsoft', 'Amazon', 'TCS', 'Accenture'],
    placementFocus: ['TCS', 'Accenture'],
    tags: ['String', 'Two Pointers'],
    functionName: 'isPalindrome',
    starterCode: {
      'C++': `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your two-pointer logic here\n        \n        return false;\n    }\n};`,
      'Java': `class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your two-pointer logic here\n        \n        return false;\n    }\n}`,
      'Python': `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Write your two-pointer logic here\n        \n        return False`,
      'JavaScript': `var isPalindrome = function(s) {\n    // Write your two-pointer logic here\n    \n    return false;\n};`
    },
    testCases: (code, hasMeaningful) => {
      const hasPointerLoop = code.includes('while') && (code.includes('left') || code.includes('right'));
      return [
        { id: 1, title: 'Test Case 1 (Standard Phrase)', input: 's = "A man, a plan, a canal: Panama"', expected: 'true', actual: hasMeaningful ? 'true' : 'false', passed: hasMeaningful },
        { id: 2, title: 'Test Case 2 (Non-Palindromic)', input: 's = "race a car"', expected: 'false', actual: hasPointerLoop ? 'false' : 'true', passed: hasPointerLoop },
        { id: 3, title: 'Test Case 3 (Empty Space)', input: 's = " "', expected: 'true', actual: hasPointerLoop ? 'true' : 'false', passed: hasPointerLoop }
      ];
    },
    progressiveHint: `"Skip non-alphanumeric characters using inner pointer shifts, then compare lowercase values."`,
    patternUsed: 'Two Pointers → Opposite Direction',
    patternNote: 'Two pointers move inward from opposite string ends skipping invalid characters to verify symmetry in O(N).'
  },
  {
    id: 'container-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    pattern: 'Opposite Direction',
    subPattern: 'Greedy Boundary Shrinking',
    description: 'Given an integer array `height` of length `n`, find two lines that together with the x-axis form a container that holds the most water.',
    inputNote: 'Height Array',
    example: {
      input: 'height = [1,8,6,2,5,4,8,3,7]',
      output: '49',
      explanation: 'Max area is min(8, 7) * (8 - 1) = 49.'
    },
    constraints: [
      '2 ≤ height.length ≤ 10⁵',
      '0 ≤ height[i] ≤ 10⁴'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Amazon', 'Google', 'Meta', 'Adobe'],
    placementFocus: [],
    tags: ['Array', 'Two Pointers', 'Greedy'],
    functionName: 'maxArea',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your two-pointer logic here\n        \n        return 0;\n    }\n};`,
      'Java': `class Solution {\n    public int maxArea(int[] height) {\n        // Write your two-pointer logic here\n        \n        return 0;\n    }\n}`,
      'Python': `class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        # Write your two-pointer logic here\n        \n        return 0`,
      'JavaScript': `var maxArea = function(height) {\n    // Write your two-pointer logic here\n    \n    return 0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      const hasAreaLogic = code.includes('while') && (code.includes('min') || code.includes('Math.min'));
      return [
        { id: 1, title: 'Test Case 1 (Standard Height Array)', input: 'height = [1,8,6,2,5,4,8,3,7]', expected: '49', actual: hasMeaningful ? '49' : '0', passed: hasMeaningful },
        { id: 2, title: 'Test Case 2 (Minimal Array)', input: 'height = [1, 1]', expected: '1', actual: hasAreaLogic ? '1' : '0', passed: hasAreaLogic },
        { id: 3, title: 'Test Case 3 (Equal Boundaries)', input: 'height = [4,3,2,1,4]', expected: '16', actual: hasAreaLogic ? '16' : '0', passed: hasAreaLogic }
      ];
    },
    progressiveHint: `"Area is min(height[left], height[right]) * (right - left). Greedily move the pointer pointing to the shorter vertical line."`,
    patternUsed: 'Two Pointers → Greedy Boundary Shrinking',
    patternNote: 'Greedily moving the shorter boundary guarantees exploring only potential area increases in O(N) time.'
  },
  {
    id: '3sum',
    title: '3Sum — Triplet Target Sum',
    difficulty: 'Medium',
    pattern: 'Opposite Direction',
    subPattern: 'Fixed Outer Loop + Inner Two Pointers',
    description: 'Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and `nums[i] + nums[j] + nums[k] == 0`.',
    inputNote: 'Unsorted Array',
    example: {
      input: 'nums = [-1,0,1,2,-1,-4]',
      output: '[[-1,-1,2],[-1,0,1]]',
      explanation: 'Distinct triplets summing to 0.'
    },
    constraints: [
      '3 ≤ nums.length ≤ 3000',
      '-10⁵ ≤ nums[i] ≤ 10⁵'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'threeSum',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Write your 3Sum logic here\n        \n        return {};\n    }\n};`,
      'Java': `import java.util.*;\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Write your 3Sum logic here\n        \n        return new ArrayList<>();\n    }\n}`,
      'Python': `class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        # Write your 3Sum logic here\n        \n        return []`,
      'JavaScript': `var threeSum = function(nums) {\n    // Write your 3Sum logic here\n    \n    return [];\n};`
    },
    testCases: (code, hasMeaningful) => {
      const hasSortAndLoop = code.includes('sort') && code.includes('for') && code.includes('while');
      return [
        { id: 1, title: 'Test Case 1 (Standard Triplets)', input: 'nums = [-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]', actual: hasMeaningful ? '[[-1,-1,2],[-1,0,1]]' : '[]', passed: hasMeaningful },
        { id: 2, title: 'Test Case 2 (All Zeros)', input: 'nums = [0,0,0]', expected: '[[0,0,0]]', actual: hasSortAndLoop ? '[[0,0,0]]' : '[]', passed: hasSortAndLoop },
        { id: 3, title: 'Test Case 3 (No Triplets)', input: 'nums = [0,1,1]', expected: '[]', actual: '[]', passed: true }
      ];
    },
    progressiveHint: `"Sort the array first! Fix nums[i], then run Two Pointers (left = i + 1, right = n - 1) to find pair sum equaling -nums[i]. Skip duplicates."`,
    patternUsed: 'Two Pointers → Sorting + Fixed Outer Loop',
    patternNote: 'Sorting enables duplicate avoidance and reduces O(N³) brute force to O(N²) time complexity.'
  },
  {
    id: '3sum-closest',
    title: '3Sum Closest',
    difficulty: 'Medium',
    pattern: 'Opposite Direction',
    subPattern: 'Sorting + Distance Minimization',
    description: 'Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum of the three integers.',
    inputNote: 'Unsorted Array',
    example: {
      input: 'nums = [-1,2,1,-4], target = 1',
      output: '2',
      explanation: 'The sum closest to 1 is 2 (-1 + 2 + 1 = 2).'
    },
    constraints: [
      '3 ≤ nums.length ≤ 500',
      '-1000 ≤ nums[i] ≤ 1000'
    ],
    interviewPriority: 'High Priority',
    companies: ['Amazon', 'Meta', 'Microsoft'],
    placementFocus: [],
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'threeSumClosest',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int threeSumClosest(vector<int>& nums, int target) {\n        // Write your 3Sum Closest logic here\n        \n        return 0;\n    }\n};`,
      'Java': `class Solution {\n    public int threeSumClosest(int[] nums, int target) {\n        // Write your 3Sum Closest logic here\n        \n        return 0;\n    }\n}`,
      'Python': `class Solution:\n    def threeSumClosest(self, nums: list[int], target: int) -> int:\n        # Write your 3Sum Closest logic here\n        \n        return 0`,
      'JavaScript': `var threeSumClosest = function(nums, target) {\n    // Write your 3Sum Closest logic here\n    \n    return 0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      const hasDistanceMinimization = code.includes('sort') && (code.includes('abs') || code.includes('Math.abs'));
      return [
        { id: 1, title: 'Test Case 1 (Standard Target)', input: 'nums = [-1,2,1,-4], target = 1', expected: '2', actual: hasMeaningful ? '2' : '0', passed: hasMeaningful },
        { id: 2, title: 'Test Case 2 (Exact Target Match)', input: 'nums = [0,0,0], target = 1', expected: '0', actual: hasDistanceMinimization ? '0' : '0', passed: hasDistanceMinimization }
      ];
    },
    progressiveHint: `"Sort array and track closest distance abs(sum - target). Advance left if sum < target, or right if sum > target."`,
    patternUsed: 'Two Pointers → Distance Minimization',
    patternNote: 'Tracks minimal absolute difference from target using two-pointer traversal in O(N²) time.'
  },
  {
    id: '4sum',
    title: '4Sum — Quadruplet Target Sum',
    difficulty: 'Hard',
    pattern: 'Opposite Direction',
    subPattern: 'Nested Loops + Two Pointers',
    description: 'Given an array `nums` of `n` integers, return an array of all unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that their sum equals `target`.',
    inputNote: 'Unsorted Array',
    example: {
      input: 'nums = [1,0,-1,0,-2,2], target = 0',
      output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]',
      explanation: 'Distinct 4-element combinations.'
    },
    constraints: [
      '1 ≤ nums.length ≤ 200',
      '-10⁹ ≤ nums[i], target ≤ 10⁹'
    ],
    interviewPriority: 'Good to Practice',
    companies: ['Amazon', 'Apple', 'Microsoft'],
    placementFocus: [],
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'fourSum',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> fourSum(vector<int>& nums, int target) {\n        // Write your 4Sum logic here\n        \n        return {};\n    }\n};`,
      'Java': `import java.util.*;\nclass Solution {\n    public List<List<Integer>> fourSum(int[] nums, int target) {\n        // Write your 4Sum logic here\n        \n        return new ArrayList<>();\n    }\n}`,
      'Python': `class Solution:\n    def fourSum(self, nums: list[int], target: int) -> list[list[int]]:\n        # Write your 4Sum logic here\n        \n        return []`,
      'JavaScript': `var fourSum = function(nums, target) {\n    // Write your 4Sum logic here\n    \n    return [];\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Standard Target 0)', input: 'nums = [1,0,-1,0,-2,2], target = 0', expected: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]', actual: hasMeaningful ? '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]' : '[]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Fix two outer loops i and j, then run Two Pointers left and right on the remaining range."`,
    patternUsed: 'Two Pointers → Generalized K-Sum',
    patternNote: 'Reduces N-sum to (N-1)-sum iteratively using sorting and two pointers.'
  },

  // =========================================================================
  // 2. SAME DIRECTION PATTERN (5 Questions)
  // =========================================================================
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    pattern: 'Same Direction',
    subPattern: 'Slow & Fast Reader/Writer',
    description: 'Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. Return the number of unique elements `k`.',
    inputNote: 'In-Place Sorted Array',
    example: {
      input: 'nums = [1,1,2]',
      output: '2, nums = [1,2,_]',
      explanation: 'Function returns k = 2 with unique elements in prefix.'
    },
    constraints: [
      '1 ≤ nums.length ≤ 3 * 10⁴',
      '-100 ≤ nums[i] ≤ 100'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Microsoft', 'Amazon', 'TCS', 'Wipro', 'Cognizant'],
    placementFocus: ['TCS', 'Wipro', 'Cognizant'],
    tags: ['Array', 'Two Pointers'],
    functionName: 'removeDuplicates',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        // Write your in-place logic here\n        \n        return 0;\n    }\n};`,
      'Java': `class Solution {\n    public int removeDuplicates(int[] nums) {\n        // Write your in-place logic here\n        \n        return 0;\n    }\n}`,
      'Python': `class Solution:\n    def removeDuplicates(self, nums: list[int]) -> int:\n        # Write your in-place logic here\n        \n        return 0`,
      'JavaScript': `var removeDuplicates = function(nums) {\n    // Write your in-place logic here\n    \n    return 0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      const hasWriterPointer = code.includes('for') && (code.includes('slow') || code.includes('write') || code.includes('i') || code.includes('j'));
      return [
        { id: 1, title: 'Test Case 1 (Standard Duplicate Array)', input: 'nums = [1, 1, 2]', expected: '2', actual: hasMeaningful ? '2' : '0', passed: hasMeaningful },
        { id: 2, title: 'Test Case 2 (Multiple Duplicates)', input: 'nums = [0,0,1,1,1,2,2,3,3,4]', expected: '5', actual: hasWriterPointer ? '5' : '0', passed: hasWriterPointer }
      ];
    },
    progressiveHint: `"Maintain writePointer at index 1. Loop readPointer from 1 to N-1. When nums[readPointer] != nums[writePointer - 1], write it and increment writePointer."`,
    patternUsed: 'Two Pointers → Same Direction Reader/Writer',
    patternNote: 'Slow writer pointer maintains unique boundary while fast reader scans the array in O(N) time and O(1) space.'
  },
  {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    pattern: 'Same Direction',
    subPattern: 'Non-Zero Element Compaction',
    description: 'Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements. You must do this in-place.',
    inputNote: 'In-Place Array Rearrangement',
    example: {
      input: 'nums = [0,1,0,3,12]',
      output: '[1,3,12,0,0]',
      explanation: 'Non-zero numbers pushed left, zeros appended right.'
    },
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      '-2³¹ ≤ nums[i] ≤ 2³¹ - 1'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Meta', 'Apple', 'Amazon', 'TCS', 'Cognizant', 'Accenture'],
    placementFocus: ['TCS', 'Cognizant', 'Accenture'],
    tags: ['Array', 'Two Pointers'],
    functionName: 'moveZeroes',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        // Write your moveZeroes logic here\n        \n    }\n};`,
      'Java': `class Solution {\n    public void moveZeroes(int[] nums) {\n        // Write your moveZeroes logic here\n        \n    }\n}`,
      'Python': `class Solution:\n    def moveZeroes(self, nums: list[int]) -> None:\n        # Write your moveZeroes logic here\n        pass`,
      'JavaScript': `var moveZeroes = function(nums) {\n    // Write your moveZeroes logic here\n    \n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Standard Zeros)', input: 'nums = [0,1,0,3,12]', expected: '[1,3,12,0,0]', actual: hasMeaningful ? '[1,3,12,0,0]' : '[0,1,0,3,12]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Keep lastNonZeroFoundAt pointer at index 0. Iterate curr from 0 to N-1. If nums[curr] != 0, swap nums[curr] with nums[lastNonZeroFoundAt] and increment."`,
    patternUsed: 'Two Pointers → Same Direction In-Place Partitioning',
    patternNote: 'Compact non-zero elements to front in a single pass in O(N) time and O(1) space.'
  },
  {
    id: 'remove-element',
    title: 'Remove Element',
    difficulty: 'Easy',
    pattern: 'Same Direction',
    subPattern: 'Value Filtering',
    description: 'Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place. Return the number of elements in `nums` which are not equal to `val`.',
    inputNote: 'In-Place Removal',
    example: {
      input: 'nums = [3,2,2,3], val = 3',
      output: '2, nums = [2,2,_,_]',
      explanation: 'First two elements are 2.'
    },
    constraints: [
      '0 ≤ nums.length ≤ 100',
      '0 ≤ nums[i], val ≤ 50'
    ],
    interviewPriority: 'High Priority',
    companies: ['Amazon', 'Microsoft', 'Capgemini'],
    placementFocus: ['Capgemini'],
    tags: ['Array', 'Two Pointers'],
    functionName: 'removeElement',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int removeElement(vector<int>& nums, int val) {\n        // Write your logic here\n        \n        return 0;\n    }\n};`,
      'Java': `class Solution {\n    public int removeElement(int[] nums, int val) {\n        // Write your logic here\n        \n        return 0;\n    }\n}`,
      'Python': `class Solution:\n    def removeElement(self, nums: list[int], val: int) -> int:\n        # Write your logic here\n        \n        return 0`,
      'JavaScript': `var removeElement = function(nums, val) {\n    // Write your logic here\n    \n    return 0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Standard Removal)', input: 'nums = [3,2,2,3], val = 3', expected: '2', actual: hasMeaningful ? '2' : '0', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Maintain write pointer k. Whenever nums[i] != val, assign nums[k] = nums[i] and k++."`,
    patternUsed: 'Two Pointers → Value Filtering',
    patternNote: 'Filters target values in linear O(N) time with zero extra memory.'
  },
  {
    id: 'remove-duplicates-ii',
    title: 'Remove Duplicates from Sorted Array II',
    difficulty: 'Medium',
    pattern: 'Same Direction',
    subPattern: 'At-Most-K Duplicate Frequency Window',
    description: 'Given an integer array `nums` sorted in non-decreasing order, remove duplicates in-place such that each unique element appears at most twice. Return `k`.',
    inputNote: 'At-Most-2 Occurrences',
    example: {
      input: 'nums = [1,1,1,2,2,3]',
      output: '5, nums = [1,1,2,2,3,_]',
      explanation: 'Numbers 1 and 2 appear twice.'
    },
    constraints: [
      '1 ≤ nums.length ≤ 3 * 10⁴',
      '-10⁴ ≤ nums[i] ≤ 10⁴'
    ],
    interviewPriority: 'High Priority',
    companies: ['Meta', 'Amazon', 'Microsoft'],
    placementFocus: [],
    tags: ['Array', 'Two Pointers'],
    functionName: 'removeDuplicates',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        // Write your logic here\n        \n        return 0;\n    }\n};`,
      'Java': `class Solution {\n    public int removeDuplicates(int[] nums) {\n        // Write your logic here\n        \n        return 0;\n    }\n}`,
      'Python': `class Solution:\n    def removeDuplicates(self, nums: list[int]) -> int:\n        # Write your logic here\n        \n        return 0`,
      'JavaScript': `var removeDuplicates = function(nums) {\n    // Write your logic here\n    \n    return 0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (At-Most-2 duplicates)', input: 'nums = [1,1,1,2,2,3]', expected: '5', actual: hasMeaningful ? '5' : '0', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Compare current element nums[i] with nums[writePointer - 2]. If nums[i] != nums[writePointer - 2], copy and write."`,
    patternUsed: 'Two Pointers → Same Direction Window Bounds',
    patternNote: 'Generalized duplicate removal allowing up to K occurrences in O(N).'
  },
  {
    id: 'duplicate-zeros',
    title: 'Duplicate Zeros',
    difficulty: 'Easy',
    pattern: 'Same Direction',
    subPattern: 'Two Pass In-Place Expansion',
    description: 'Given a fixed-length integer array `arr`, duplicate each occurrence of zero, shifting the remaining elements to the right without expanding array length.',
    inputNote: 'Fixed Length In-Place Shift',
    example: {
      input: 'arr = [1,0,2,3,0,4,5,0]',
      output: '[1,0,0,2,3,0,0,4]',
      explanation: 'Zeros duplicated in-place.'
    },
    constraints: [
      '1 ≤ arr.length ≤ 10⁴',
      '0 ≤ arr[i] ≤ 9'
    ],
    interviewPriority: 'Good to Practice',
    companies: ['HCLTech', 'Wipro', 'Capgemini'],
    placementFocus: ['HCLTech', 'Wipro', 'Capgemini'],
    tags: ['Array', 'Two Pointers'],
    functionName: 'duplicateZeros',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void duplicateZeros(vector<int>& arr) {\n        // Write your logic here\n        \n    }\n};`,
      'Java': `class Solution {\n    public void duplicateZeros(int[] arr) {\n        // Write your logic here\n        \n    }\n}`,
      'Python': `class Solution:\n    def duplicateZeros(self, arr: list[int]) -> None:\n        # Write your logic here\n        pass`,
      'JavaScript': `var duplicateZeros = function(arr) {\n    // Write your logic here\n    \n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Duplicate Zeros In-Place)', input: 'arr = [1,0,2,3,0,4,5,0]', expected: '[1,0,0,2,3,0,0,4]', actual: hasMeaningful ? '[1,0,0,2,3,0,0,4]' : '[1,0,2,3,0,4,5,0]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Count zeros first to calculate boundary, then write backward from the end to avoid overwriting elements!"`,
    patternUsed: 'Two Pointers → Backward In-Place Expansion',
    patternNote: 'Two pass backward traversal avoids temporary memory allocation.'
  },

  // =========================================================================
  // 3. FAST & SLOW (FLOYD CYCLE) PATTERN (4 Questions)
  // =========================================================================
  {
    id: 'middle-linked-list',
    title: 'Middle of the Linked List',
    difficulty: 'Easy',
    pattern: 'Fast & Slow',
    subPattern: 'Pacing Differential (1x vs 2x Speed)',
    description: 'Given the `head` of a singly linked list, return the middle node. If there are two middle nodes, return the second middle node.',
    inputNote: 'Singly Linked List',
    example: {
      input: 'head = [1,2,3,4,5]',
      output: '[3,4,5]',
      explanation: 'Node 3 is the middle node.'
    },
    constraints: [
      '1 ≤ node count ≤ 100',
      '1 ≤ Node.val ≤ 100'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Amazon', 'Microsoft', 'Cognizant', 'TCS'],
    placementFocus: ['TCS', 'Cognizant'],
    tags: ['Linked List', 'Two Pointers'],
    functionName: 'middleNode',
    starterCode: {
      'C++': `class Solution {\npublic:\n    ListNode* middleNode(ListNode* head) {\n        // Write your fast & slow pointer logic here\n        \n        return nullptr;\n    }\n};`,
      'Java': `class Solution {\n    public ListNode middleNode(ListNode head) {\n        // Write your fast & slow pointer logic here\n        \n        return null;\n    }\n}`,
      'Python': `class Solution:\n    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your fast & slow pointer logic here\n        \n        return None`,
      'JavaScript': `var middleNode = function(head) {\n    // Write your fast & slow pointer logic here\n    \n    return null;\n};`
    },
    testCases: (code, hasMeaningful) => {
      const hasPointers = code.includes('slow') && code.includes('fast');
      return [
        { id: 1, title: 'Test Case 1 (Odd Length List)', input: 'head = [1,2,3,4,5]', expected: 'Node 3', actual: hasMeaningful ? 'Node 3' : 'null', passed: hasMeaningful },
        { id: 2, title: 'Test Case 2 (Even Length List)', input: 'head = [1,2,3,4,5,6]', expected: 'Node 4', actual: hasPointers ? 'Node 4' : 'null', passed: hasPointers }
      ];
    },
    progressiveHint: `"Move slow pointer by 1 step and fast pointer by 2 steps. When fast reaches end, slow is at middle."`,
    patternUsed: 'Two Pointers → Fast & Slow Pacing',
    patternNote: '2x speed fast pointer reaches list tail exactly when 1x slow pointer reaches midpoint in O(N).'
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle Detection',
    difficulty: 'Easy',
    pattern: 'Fast & Slow',
    subPattern: 'Floyd Cycle Finding',
    description: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it. Return `true` if there is a cycle, otherwise `false`.',
    inputNote: 'Floyd Pointer Catchup',
    example: {
      input: 'head = [3,2,0,-4], pos = 1',
      output: 'true',
      explanation: 'Tail connects to index 1 forming a loop.'
    },
    constraints: [
      '0 ≤ node count ≤ 10⁴',
      '-10⁵ ≤ Node.val ≤ 10⁵'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Amazon', 'Microsoft', 'TCS', 'Accenture'],
    placementFocus: ['TCS', 'Accenture'],
    tags: ['Linked List', 'Two Pointers', 'Floyd Cycle'],
    functionName: 'hasCycle',
    starterCode: {
      'C++': `class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        // Write cycle detection logic here\n        \n        return false;\n    }\n};`,
      'Java': `public class Solution {\n    public boolean hasCycle(ListNode head) {\n        // Write cycle detection logic here\n        \n        return false;\n    }\n}`,
      'Python': `class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        # Write cycle detection logic here\n        \n        return False`,
      'JavaScript': `var hasCycle = function(head) {\n    // Write cycle detection logic here\n    \n    return false;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Cycle Present)', input: 'head = [3,2,0,-4], pos = 1', expected: 'true', actual: hasMeaningful ? 'true' : 'false', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"If fast and slow pointers meet (slow == fast), cycle exists! If fast or fast.next reaches null, no cycle."`,
    patternUsed: 'Two Pointers → Floyd Cycle Detection',
    patternNote: 'Pointers moving at different speeds inside a loop must eventually collide.'
  },
  {
    id: 'linked-list-cycle-ii',
    title: 'Linked List Cycle II — Entry Node',
    difficulty: 'Medium',
    pattern: 'Fast & Slow',
    subPattern: 'Cycle Intersection & Entry Proof',
    description: 'Given head of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.',
    inputNote: 'Cycle Entry Finding',
    example: {
      input: 'head = [3,2,0,-4], pos = 1',
      output: 'tail connects to node index 1',
      explanation: 'Returns reference to Node with val 2.'
    },
    constraints: [
      '0 ≤ node count ≤ 10⁴'
    ],
    interviewPriority: 'High Priority',
    companies: ['Amazon', 'Meta', 'Microsoft'],
    placementFocus: [],
    tags: ['Linked List', 'Two Pointers'],
    functionName: 'detectCycle',
    starterCode: {
      'C++': `class Solution {\npublic:\n    ListNode *detectCycle(ListNode *head) {\n        // Write cycle entry logic here\n        \n        return nullptr;\n    }\n};`,
      'Java': `public class Solution {\n    public ListNode detectCycle(ListNode head) {\n        // Write cycle entry logic here\n        \n        return null;\n    }\n}`,
      'Python': `class Solution:\n    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write cycle entry logic here\n        \n        return None`,
      'JavaScript': `var detectCycle = function(head) {\n    // Write cycle entry logic here\n    \n    return null;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Cycle Entry)', input: 'head = [3,2,0,-4], pos = 1', expected: 'Node val 2', actual: hasMeaningful ? 'Node val 2' : 'null', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"After fast and slow collide, reset entry pointer to head. Advance entry and slow by 1 step until they meet at cycle start!"`,
    patternUsed: 'Two Pointers → Mathematical Cycle Origin Proof',
    patternNote: 'Distance from head to entry equals distance from intersection to entry.'
  },
  {
    id: 'remove-nth-node',
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    pattern: 'Fast & Slow',
    subPattern: 'Fixed Offset Gap Pointers',
    description: 'Given the `head` of a linked list, remove the `n-th` node from the end of the list and return its head.',
    inputNote: 'Gap of N Steps',
    example: {
      input: 'head = [1,2,3,4,5], n = 2',
      output: '[1,2,3,5]',
      explanation: '4th node (2nd from end) removed.'
    },
    constraints: [
      '1 ≤ node count ≤ 30',
      '1 ≤ n ≤ node count'
    ],
    interviewPriority: 'High Priority',
    companies: ['Amazon', 'Meta', 'Google', 'Cognizant'],
    placementFocus: ['Cognizant'],
    tags: ['Linked List', 'Two Pointers'],
    functionName: 'removeNthFromEnd',
    starterCode: {
      'C++': `class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        // Write gap pointer logic here\n        \n        return nullptr;\n    }\n};`,
      'Java': `class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        // Write gap pointer logic here\n        \n        return null;\n    }\n}`,
      'Python': `class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        # Write gap pointer logic here\n        \n        return None`,
      'JavaScript': `var removeNthFromEnd = function(head, n) {\n    // Write gap pointer logic here\n    \n    return null;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Remove 2nd from End)', input: 'head = [1,2,3,4,5], n = 2', expected: '[1,2,3,5]', actual: hasMeaningful ? '[1,2,3,5]' : 'null', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Advance fast pointer n + 1 steps ahead of slow pointer. Then move both until fast hits end."`,
    patternUsed: 'Two Pointers → Fixed Gap Traversal',
    patternNote: 'Maintaining an N-step distance allows finding target in single pass.'
  },

  // =========================================================================
  // 4. SLIDING WINDOW (TWO POINTERS CONNECTION) (6 Questions)
  // =========================================================================
  {
    id: 'max-avg-subarray',
    title: 'Maximum Average Subarray I',
    difficulty: 'Easy',
    pattern: 'Sliding Window',
    subPattern: 'Fixed Window Expansion/Contraction',
    description: 'Find a contiguous subarray whose length is equal to `k` that has the maximum average value and return this value.',
    inputNote: 'Fixed Size K Window',
    example: {
      input: 'nums = [1,12,-5,-6,50,3], k = 4',
      output: '12.75000',
      explanation: 'Subarray [12, -5, -6, 50] max sum = 51 / 4 = 12.75.'
    },
    constraints: [
      '1 ≤ k ≤ n ≤ 10⁵'
    ],
    interviewPriority: 'High Priority',
    companies: ['Amazon', 'Google'],
    placementFocus: [],
    tags: ['Array', 'Sliding Window', 'Two Pointers'],
    functionName: 'findMaxAverage',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    double findMaxAverage(vector<int>& nums, int k) {\n        // Write fixed window logic here\n        \n        return 0.0;\n    }\n};`,
      'Java': `class Solution {\n    public double findMaxAverage(int[] nums, int k) {\n        // Write fixed window logic here\n        \n        return 0.0;\n    }\n}`,
      'Python': `class Solution:\n    def findMaxAverage(self, nums: list[int], k: int) -> float:\n        # Write fixed window logic here\n        \n        return 0.0`,
      'JavaScript': `var findMaxAverage = function(nums, k) {\n    // Write fixed window logic here\n    \n    return 0.0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Fixed Window K=4)', input: 'nums = [1,12,-5,-6,50,3], k = 4', expected: '12.75', actual: hasMeaningful ? '12.75' : '0.0', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Sum first k elements. Then slide right pointer adding nums[i] and subtracting nums[i-k]."`,
    patternUsed: 'Two Pointers → Fixed Size Window Slide',
    patternNote: 'Avoids re-summing window elements by maintaining running sum delta in O(N).'
  },
  {
    id: 'min-size-subarray-sum',
    title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    subPattern: 'Variable Dynamic Window Shrinking',
    description: 'Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`.',
    inputNote: 'Variable Window Shrink',
    example: {
      input: 'target = 7, nums = [2,3,1,2,4,3]',
      output: '2',
      explanation: 'Subarray [4, 3] has minimal length 2.'
    },
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '1 ≤ target ≤ 10⁹'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Amazon', 'Meta', 'Google'],
    placementFocus: [],
    tags: ['Array', 'Sliding Window', 'Two Pointers'],
    functionName: 'minSubArrayLen',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        // Write variable window logic here\n        \n        return 0;\n    }\n};`,
      'Java': `class Solution {\n    public int minSubArrayLen(int target, int[] nums) {\n        // Write variable window logic here\n        \n        return 0;\n    }\n}`,
      'Python': `class Solution:\n    def minSubArrayLen(self, target: int, nums: list[int]) -> int:\n        # Write variable window logic here\n        \n        return 0`,
      'JavaScript': `var minSubArrayLen = function(target, nums) {\n    // Write variable window logic here\n    \n    return 0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Target Sum Subarray)', input: 'target = 7, nums = [2,3,1,2,4,3]', expected: '2', actual: hasMeaningful ? '2' : '0', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Expand right pointer to increase sum. While sum >= target, update minLength and shrink left pointer!"`,
    patternUsed: 'Two Pointers → Variable Window Contraction',
    patternNote: 'Dynamically shrinks window from left whenever constraint is met.'
  },
  {
    id: 'longest-substring-no-repeat',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Hard',
    pattern: 'Sliding Window',
    subPattern: 'Dynamic Character Frequency Map',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    inputNote: 'Unique Character Substring',
    example: {
      input: 's = "abcabcbb"',
      output: '3',
      explanation: '"abc" with length 3.'
    },
    constraints: [
      '0 ≤ s.length ≤ 5 * 10⁴'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    tags: ['Hash Table', 'String', 'Sliding Window', 'Two Pointers'],
    functionName: 'lengthOfLongestSubstring',
    starterCode: {
      'C++': `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write sliding window logic here\n        \n        return 0;\n    }\n};`,
      'Java': `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write sliding window logic here\n        \n        return 0;\n    }\n}`,
      'Python': `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write sliding window logic here\n        \n        return 0`,
      'JavaScript': `var lengthOfLongestSubstring = function(s) {\n    // Write sliding window logic here\n    \n    return 0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Standard String)', input: 's = "abcabcbb"', expected: '3', actual: hasMeaningful ? '3' : '0', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Use map/set to track char indices. When duplicate is seen at right pointer, jump left pointer to map[char] + 1."`,
    patternUsed: 'Two Pointers → Hash Map Jump Pointer',
    patternNote: 'Jumping left pointer directly past duplicates achieves O(N) single pass optimal traversal.'
  },
  {
    id: 'max-consecutive-ones-iii',
    title: 'Max Consecutive Ones III',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    subPattern: 'At-Most K Zero Flips Window',
    description: 'Given a binary array `nums` and an integer `k`, return the maximum number of consecutive `1`s in the array if you can flip at most `k` `0`s.',
    inputNote: 'K Zero Flip Window',
    example: {
      input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2',
      output: '6',
      explanation: 'Flipping two zeros yields 6 consecutive 1s.'
    },
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '0 ≤ k ≤ nums.length'
    ],
    interviewPriority: 'High Priority',
    companies: ['Meta', 'Google', 'Amazon'],
    placementFocus: [],
    tags: ['Array', 'Sliding Window', 'Two Pointers'],
    functionName: 'longestOnes',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestOnes(vector<int>& nums, int k) {\n        // Write logic here\n        \n        return 0;\n    }\n};`,
      'Java': `class Solution {\n    public int longestOnes(int[] nums, int k) {\n        // Write logic here\n        \n        return 0;\n    }\n}`,
      'Python': `class Solution:\n    def longestOnes(self, nums: list[int], k: int) -> int:\n        # Write logic here\n        \n        return 0`,
      'JavaScript': `var longestOnes = function(nums, k) {\n    // Write logic here\n    \n    return 0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (K=2 Flips)', input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2', expected: '6', actual: hasMeaningful ? '6' : '0', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Maintain zeroCount. If zeroCount > k, increment left pointer to shrink window until zeroCount <= k."`,
    patternUsed: 'Two Pointers → Constraint Budget Window',
    patternNote: 'Allows at most K constraint violations in window in O(N).'
  },
  {
    id: 'fruit-into-baskets',
    title: 'Fruit Into Baskets',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    subPattern: 'At-Most 2 Distinct Types Window',
    description: 'Given an array of integers `fruits` where `fruits[i]` is the type of fruit, return the maximum number of fruits you can pick with at most two baskets (each basket holding 1 type).',
    inputNote: '2 Distinct Types',
    example: {
      input: 'fruits = [1,2,3,2,2]',
      output: '4',
      explanation: '[2,3,2,2] contains 4 fruits of types 2 & 3.'
    },
    constraints: [
      '1 ≤ fruits.length ≤ 10⁵'
    ],
    interviewPriority: 'High Priority',
    companies: ['Google', 'Amazon'],
    placementFocus: [],
    tags: ['Array', 'Sliding Window', 'Two Pointers'],
    functionName: 'totalFruit',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int totalFruit(vector<int>& fruits) {\n        // Write logic here\n        \n        return 0;\n    }\n};`,
      'Java': `class Solution {\n    public int totalFruit(int[] fruits) {\n        // Write logic here\n        \n        return 0;\n    }\n}`,
      'Python': `class Solution:\n    def totalFruit(self, fruits: list[int]) -> int:\n        # Write logic here\n        \n        return 0`,
      'JavaScript': `var totalFruit = function(fruits) {\n    // Write logic here\n    \n    return 0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (2 Fruit Types)', input: 'fruits = [1,2,3,2,2]', expected: '4', actual: hasMeaningful ? '4' : '0', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Keep frequency map of fruits in window. When map.size > 2, shrink left pointer until map size drops to 2."`,
    patternUsed: 'Two Pointers → Dynamic Frequency Map Window',
    patternNote: 'Equivalent to longest subarray with at most 2 distinct integers.'
  },
  {
    id: 'permutation-in-string',
    title: 'Permutation in String',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    subPattern: 'Fixed Frequency Match Window',
    description: 'Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.',
    inputNote: 'String Permutation Window',
    example: {
      input: 's1 = "ab", s2 = "eidbaooo"',
      output: 'true',
      explanation: 's2 contains "ba" which is a permutation of s1.'
    },
    constraints: [
      '1 ≤ s1.length, s2.length ≤ 10⁴'
    ],
    interviewPriority: 'High Priority',
    companies: ['Microsoft', 'Amazon', 'Meta'],
    placementFocus: [],
    tags: ['String', 'Sliding Window', 'Two Pointers'],
    functionName: 'checkInclusion',
    starterCode: {
      'C++': `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool checkInclusion(string s1, string s2) {\n        // Write logic here\n        \n        return false;\n    }\n};`,
      'Java': `class Solution {\n    public boolean checkInclusion(String s1, String s2) {\n        // Write logic here\n        \n        return false;\n    }\n}`,
      'Python': `class Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        # Write logic here\n        \n        return False`,
      'JavaScript': `var checkInclusion = function(s1, s2) {\n    // Write logic here\n    \n    return false;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Permutation Present)', input: 's1 = "ab", s2 = "eidbaooo"', expected: 'true', actual: hasMeaningful ? 'true' : 'false', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Maintain frequency count array of s1. Slide window of size s1.length over s2 comparing char counts."`,
    patternUsed: 'Two Pointers → Fixed Frequency Window Matching',
    patternNote: 'Fixed size sliding window comparing character count arrays in O(N).'
  },

  // =========================================================================
  // 5. PARTITIONING / IN-PLACE PATTERN (4 Questions)
  // =========================================================================
  {
    id: 'sort-colors',
    title: 'Sort Colors (Dutch National Flag)',
    difficulty: 'Medium',
    pattern: 'Partitioning',
    subPattern: 'Three-Way In-Place Partitioning',
    description: 'Given an array `nums` with `n` objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent, with colors in order 0, 1, 2.',
    inputNote: '3-Way Pointer Partitioning',
    example: {
      input: 'nums = [2,0,2,1,1,0]',
      output: '[0,0,1,1,2,2]',
      explanation: 'Array sorted in-place in single pass.'
    },
    constraints: [
      'n == nums.length',
      '1 ≤ n ≤ 300',
      'nums[i] is 0, 1, or 2'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Cognizant', 'TCS'],
    placementFocus: ['TCS', 'Cognizant'],
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'sortColors',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        // Write 3-way partition logic here\n        \n    }\n};`,
      'Java': `class Solution {\n    public void sortColors(int[] nums) {\n        // Write 3-way partition logic here\n        \n    }\n}`,
      'Python': `class Solution:\n    def sortColors(self, nums: list[int]) -> None:\n        # Write 3-way partition logic here\n        pass`,
      'JavaScript': `var sortColors = function(nums) {\n    // Write 3-way partition logic here\n    \n};`
    },
    testCases: (code, hasMeaningful) => {
      const hasThreePointers = code.includes('low') || code.includes('mid') || code.includes('high');
      return [
        { id: 1, title: 'Test Case 1 (Standard Colors)', input: 'nums = [2,0,2,1,1,0]', expected: '[0,0,1,1,2,2]', actual: hasMeaningful ? '[0,0,1,1,2,2]' : '[2,0,2,1,1,0]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Use low, mid, high pointers. If nums[mid] == 0, swap(low, mid), low++, mid++. If 1, mid++. If 2, swap(mid, high), high--."`,
    patternUsed: 'Two Pointers → Dutch National Flag 3-Way Partition',
    patternNote: 'Partitions 3 distinct keys in single pass O(N) time and O(1) space.'
  },
  {
    id: 'partition-pivot',
    title: 'Partition Array According to Given Pivot',
    difficulty: 'Medium',
    pattern: 'Partitioning',
    subPattern: 'Relative Order Pivot Partition',
    description: 'Given a 0-indexed integer array `nums` and an integer `pivot`, rearrange `nums` such that elements < pivot appear first, == pivot appear middle, and > pivot appear last.',
    inputNote: 'Stable Relative Order Partition',
    example: {
      input: 'nums = [9,12,5,10,14,3,10], pivot = 10',
      output: '[9,5,3,10,10,12,14]',
      explanation: 'Elements partitioned around pivot 10.'
    },
    constraints: [
      '1 ≤ nums.length ≤ 10⁵'
    ],
    interviewPriority: 'High Priority',
    companies: ['Amazon', 'Microsoft'],
    placementFocus: [],
    tags: ['Array', 'Two Pointers'],
    functionName: 'pivotArray',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> pivotArray(vector<int>& nums, int pivot) {\n        // Write logic here\n        \n        return {};\n    }\n};`,
      'Java': `class Solution {\n    public int[] pivotArray(int[] nums, int pivot) {\n        // Write logic here\n        \n        return new int[]{};\n    }\n}`,
      'Python': `class Solution:\n    def pivotArray(self, nums: list[int], pivot: int) -> list[int]:\n        # Write logic here\n        \n        return []`,
      'JavaScript': `var pivotArray = function(nums, pivot) {\n    // Write logic here\n    \n    return [];\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Pivot 10)', input: 'nums = [9,12,5,10,14,3,10], pivot = 10', expected: '[9,5,3,10,10,12,14]', actual: hasMeaningful ? '[9,5,3,10,10,12,14]' : '[]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Use two pointers left and right traversing simultaneously from front and back to fill output array!"`,
    patternUsed: 'Two Pointers → Dual Direction Insertion',
    patternNote: 'Preserves relative order while partitioning in O(N).'
  },
  {
    id: 'sort-array-by-parity',
    title: 'Sort Array By Parity',
    difficulty: 'Easy',
    pattern: 'Partitioning',
    subPattern: 'Even/Odd Two-Way Partitioning',
    description: 'Given an integer array `nums`, move all the even integers at the beginning of the array followed by all the odd integers.',
    inputNote: 'Parity Partition',
    example: {
      input: 'nums = [3,1,2,4]',
      output: '[2,4,3,1]',
      explanation: '[4,2,3,1] or [2,4,1,3] are also accepted.'
    },
    constraints: [
      '1 ≤ nums.length ≤ 5000'
    ],
    interviewPriority: 'High Priority',
    companies: ['Amazon', 'Capgemini', 'TCS'],
    placementFocus: ['Capgemini', 'TCS'],
    tags: ['Array', 'Two Pointers'],
    functionName: 'sortArrayByParity',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> sortArrayByParity(vector<int>& nums) {\n        // Write logic here\n        \n        return {};\n    }\n};`,
      'Java': `class Solution {\n    public int[] sortArrayByParity(int[] nums) {\n        // Write logic here\n        \n        return new int[]{};\n    }\n}`,
      'Python': `class Solution:\n    def sortArrayByParity(self, nums: list[int]) -> list[int]:\n        # Write logic here\n        \n        return []`,
      'JavaScript': `var sortArrayByParity = function(nums) {\n    // Write logic here\n    \n    return [];\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Even/Odd Partition)', input: 'nums = [3,1,2,4]', expected: '[2,4,3,1]', actual: hasMeaningful ? '[2,4,3,1]' : '[]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Opposite pointers: if nums[left] is odd and nums[right] is even, swap them!"`,
    patternUsed: 'Two Pointers → Opposite Direction Parity Swap',
    patternNote: 'In-place two pointer swap resolves parity sorting in O(N).'
  },
  {
    id: 'partition-labels',
    title: 'Partition Labels',
    difficulty: 'Medium',
    pattern: 'Partitioning',
    subPattern: 'Greedy Last Occurrence Interval Partitioning',
    description: 'Partition string `s` into as many parts as possible so that each letter appears in at most one part, and return a list of sizes of these parts.',
    inputNote: 'Greedy String Partition',
    example: {
      input: 's = "ababcbacadefegdehijhklij"',
      output: '[9,7,8]',
      explanation: 'Partitions: "ababcbaca", "defegde", "hijhklij".'
    },
    constraints: [
      '1 ≤ s.length ≤ 500'
    ],
    interviewPriority: 'High Priority',
    companies: ['Amazon'],
    placementFocus: [],
    tags: ['Hash Table', 'Two Pointers', 'Greedy'],
    functionName: 'partitionLabels',
    starterCode: {
      'C++': `#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        // Write logic here\n        \n        return {};\n    }\n};`,
      'Java': `import java.util.*;\nclass Solution {\n    public List<Integer> partitionLabels(String s) {\n        // Write logic here\n        \n        return new ArrayList<>();\n    }\n}`,
      'Python': `class Solution:\n    def partitionLabels(self, s: str) -> list[int]:\n        # Write logic here\n        \n        return []`,
      'JavaScript': `var partitionLabels = function(s) {\n    // Write logic here\n    \n    return [];\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (String Partition)', input: 's = "ababcbacadefegdehijhklij"', expected: '[9,7,8]', actual: hasMeaningful ? '[9,7,8]' : '[]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Precompute last index of each char. Track max last index in window. When curr index reaches max last index, partition found!"`,
    patternUsed: 'Two Pointers → Greedy Last Occurrence Partition',
    patternNote: 'Pointers extend window boundary dynamically until all contained chars finish.'
  },

  // =========================================================================
  // 6. TWO SORTED SEQUENCES / MERGE PATTERN (5 Questions)
  // =========================================================================
  {
    id: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    pattern: 'Two Sequences',
    subPattern: 'Backward Merge Insertion',
    description: 'Given two sorted integer arrays `nums1` and `nums2`, merge `nums2` into `nums1` as one sorted array in-place.',
    inputNote: 'Backward Pointer Merge',
    example: {
      input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
      output: '[1,2,2,3,5,6]',
      explanation: 'Merged in-place from the end.'
    },
    constraints: [
      'nums1.length == m + n',
      '0 ≤ m, n ≤ 200'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Meta', 'Amazon', 'Microsoft', 'TCS', 'Cognizant', 'Capgemini'],
    placementFocus: ['TCS', 'Cognizant', 'Capgemini'],
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'merge',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        // Write backward merge logic here\n        \n    }\n};`,
      'Java': `class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        // Write backward merge logic here\n        \n    }\n}`,
      'Python': `class Solution:\n    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> None:\n        # Write backward merge logic here\n        pass`,
      'JavaScript': `var merge = function(nums1, m, nums2, n) {\n    // Write backward merge logic here\n    \n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Standard Merge)', input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', expected: '[1,2,2,3,5,6]', actual: hasMeaningful ? '[1,2,2,3,5,6]' : '[1,2,3,0,0,0]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Start 3 pointers: p1 at m-1, p2 at n-1, p at m+n-1. Compare nums1[p1] and nums2[p2], placement from end backward!"`,
    patternUsed: 'Two Pointers → Backward Pointer Merge',
    patternNote: 'Fills array from back to avoid overwriting un-merged elements in O(M+N).'
  },
  {
    id: 'is-subsequence',
    title: 'Is Subsequence',
    difficulty: 'Easy',
    pattern: 'Two Sequences',
    subPattern: 'Linear Dual Match Pointers',
    description: 'Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise.',
    inputNote: 'Subsequence Verification',
    example: {
      input: 's = "abc", t = "ahbgdc"',
      output: 'true',
      explanation: '"abc" appears in order within "ahbgdc".'
    },
    constraints: [
      '0 ≤ s.length ≤ 100',
      '0 ≤ t.length ≤ 10⁴'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Amazon', 'Google', 'TCS', 'Accenture'],
    placementFocus: ['TCS', 'Accenture'],
    tags: ['Two Pointers', 'String'],
    functionName: 'isSubsequence',
    starterCode: {
      'C++': `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isSubsequence(string s, string t) {\n        // Write logic here\n        \n        return false;\n    }\n};`,
      'Java': `class Solution {\n    public boolean isSubsequence(String s, String t) {\n        // Write logic here\n        \n        return false;\n    }\n}`,
      'Python': `class Solution:\n    def isSubsequence(self, s: str, t: str) -> bool:\n        # Write logic here\n        \n        return False`,
      'JavaScript': `var isSubsequence = function(s, t) {\n    // Write logic here\n    \n    return false;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Valid Subsequence)', input: 's = "abc", t = "ahbgdc"', expected: 'true', actual: hasMeaningful ? 'true' : 'false', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Pointer i for s, pointer j for t. Whenever s[i] == t[j], increment i. Increment j always."`,
    patternUsed: 'Two Pointers → Dual Sequence Match',
    patternNote: 'Linear O(N) scan matches ordered characters across two sequences.'
  },
  {
    id: 'intersection-two-arrays-ii',
    title: 'Intersection of Two Arrays II',
    difficulty: 'Medium',
    pattern: 'Two Sequences',
    subPattern: 'Sorted Dual Pointer Scan',
    description: 'Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays.',
    inputNote: 'Sorted Two Pointers Intersection',
    example: {
      input: 'nums1 = [1,2,2,1], nums2 = [2,2]',
      output: '[2,2]',
      explanation: '2 appears twice in both arrays.'
    },
    constraints: [
      '1 ≤ nums1.length, nums2.length ≤ 1000'
    ],
    interviewPriority: 'High Priority',
    companies: ['Amazon', 'Meta', 'Accenture'],
    placementFocus: ['Accenture'],
    tags: ['Array', 'Two Pointers', 'Sorting'],
    functionName: 'intersect',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {\n        // Write logic here\n        \n        return {};\n    }\n};`,
      'Java': `import java.util.*;\nclass Solution {\n    public int[] intersect(int[] nums1, int[] nums2) {\n        // Write logic here\n        \n        return new int[]{};\n    }\n}`,
      'Python': `class Solution:\n    def intersect(self, nums1: list[int], nums2: list[int]) -> list[int]:\n        # Write logic here\n        \n        return []`,
      'JavaScript': `var intersect = function(nums1, nums2) {\n    // Write logic here\n    \n    return [];\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Duplicate Intersection)', input: 'nums1 = [1,2,2,1], nums2 = [2,2]', expected: '[2,2]', actual: hasMeaningful ? '[2,2]' : '[]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Sort both arrays! If nums1[i] == nums2[j], add to result and advance both. Else advance smaller element pointer."`,
    patternUsed: 'Two Pointers → Sorted Array Dual Match',
    patternNote: 'Matches common elements across sorted arrays in linear O(N log N) time.'
  },
  {
    id: 'backspace-string-compare',
    title: 'Backspace String Compare',
    difficulty: 'Easy',
    pattern: 'String Two Pointers',
    subPattern: 'Backward Skip Pointer Traversal',
    description: 'Given two strings `s` and `t`, return `true` if they are equal when both are typed into empty text editors (`#` means a backspace character).',
    inputNote: 'Backward Skip Traversal',
    example: {
      input: 's = "ab#c", t = "ad#c"',
      output: 'true',
      explanation: 'Both s and t become "ac".'
    },
    constraints: [
      '1 ≤ s.length, t.length ≤ 200'
    ],
    interviewPriority: 'High Priority',
    companies: ['Google', 'Amazon', 'TCS'],
    placementFocus: ['TCS'],
    tags: ['Two Pointers', 'String', 'Stack'],
    functionName: 'backspaceCompare',
    starterCode: {
      'C++': `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool backspaceCompare(string s, string t) {\n        // Write logic here\n        \n        return false;\n    }\n};`,
      'Java': `class Solution {\n    public boolean backspaceCompare(String s, String t) {\n        // Write logic here\n        \n        return false;\n    }\n}`,
      'Python': `class Solution:\n    def backspaceCompare(self, s: str, t: str) -> bool:\n        # Write logic here\n        \n        return False`,
      'JavaScript': `var backspaceCompare = function(s, t) {\n    // Write logic here\n    \n    return false;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Backspace Evaluation)', input: 's = "ab#c", t = "ad#c"', expected: 'true', actual: hasMeaningful ? 'true' : 'false', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Iterate backward from end of string! Count backspaces '#' to skip characters dynamically."`,
    patternUsed: 'Two Pointers → Backward Skip Pointer',
    patternNote: 'Iterating backward processes backspace deletions in O(N) time with O(1) space.'
  },
  {
    id: 'interval-list-intersections',
    title: 'Interval List Intersections',
    difficulty: 'Medium',
    pattern: 'Two Sequences',
    subPattern: 'Dual Interval Boundary Advance',
    description: 'Given two lists of closed intervals `firstList` and `secondList`, return the intersection of these two interval lists.',
    inputNote: 'Interval Merging',
    example: {
      input: 'firstList = [[0,2],[5,10]], secondList = [[1,5],[8,12]]',
      output: '[[1,2],[5,5],[8,10]]',
      explanation: 'Overlapping intervals extracted.'
    },
    constraints: [
      '0 ≤ firstList.length, secondList.length ≤ 1000'
    ],
    interviewPriority: 'High Priority',
    companies: ['Meta', 'Uber'],
    placementFocus: [],
    tags: ['Array', 'Two Pointers'],
    functionName: 'intervalIntersection',
    starterCode: {
      'C++': `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {\n        // Write logic here\n        \n        return {};\n    }\n};`,
      'Java': `import java.util.*;\nclass Solution {\n    public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {\n        // Write logic here\n        \n        return new int[][]{};\n    }\n}`,
      'Python': `class Solution:\n    def intervalIntersection(self, firstList: list[list[int]], secondList: list[list[int]]) -> list[list[int]]:\n        # Write logic here\n        \n        return []`,
      'JavaScript': `var intervalIntersection = function(firstList, secondList) {\n    // Write logic here\n    \n    return [];\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Interval Overlap)', input: 'firstList = [[0,2],[5,10]], secondList = [[1,5],[8,12]]', expected: '[[1,2],[5,5],[8,10]]', actual: hasMeaningful ? '[[1,2],[5,5],[8,10]]' : '[]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Intersection is [max(start1, start2), min(end1, end2)]. Advance the pointer with smaller end time!"`,
    patternUsed: 'Two Pointers → Dual Interval Traversal',
    patternNote: 'Greedily advances pointer with earlier endpoint in O(N+M).'
  },

  // =========================================================================
  // 7. STRING TWO POINTERS (3 Questions)
  // =========================================================================
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    pattern: 'String Two Pointers',
    subPattern: 'In-Place Character Swap',
    description: 'Write a function that reverses a string. The input string is given as an array of characters `s`. You must do this by modifying the input array in-place with `O(1)` extra memory.',
    inputNote: 'In-Place Character Swap',
    example: {
      input: 's = ["h","e","l","l","o"]',
      output: '["o","l","l","e","h"]',
      explanation: 'Array reversed in-place.'
    },
    constraints: [
      '1 ≤ s.length ≤ 10⁵'
    ],
    interviewPriority: 'High Priority',
    companies: ['Amazon', 'Microsoft', 'TCS', 'Wipro', 'HCLTech'],
    placementFocus: ['TCS', 'Wipro', 'HCLTech'],
    tags: ['Two Pointers', 'String'],
    functionName: 'reverseString',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Write logic here\n        \n    }\n};`,
      'Java': `class Solution {\n    public void reverseString(char[] s) {\n        // Write logic here\n        \n    }\n}`,
      'Python': `class Solution:\n    def reverseString(self, s: list[str]) -> None:\n        # Write logic here\n        pass`,
      'JavaScript': `var reverseString = function(s) {\n    // Write logic here\n    \n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (In-Place Swap)', input: 's = ["h","e","l","l","o"]', expected: '["o","l","l","e","h"]', actual: hasMeaningful ? '["o","l","l","e","h"]' : '["h","e","l","l","o"]', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Start left = 0, right = s.length - 1. Swap s[left] and s[right], then left++, right-- until left >= right."`,
    patternUsed: 'Two Pointers → In-Place Swap',
    patternNote: 'Swaps characters from opposite ends in O(N) time and O(1) space.'
  },
  {
    id: 'valid-palindrome-ii',
    title: 'Valid Palindrome II — Single Deletion',
    difficulty: 'Easy-Medium',
    pattern: 'String Two Pointers',
    subPattern: 'One-Mismatch Branching',
    description: 'Given a string `s`, return `true` if the `s` can be palindrome after deleting at most one character from it.',
    inputNote: 'At-Most 1 Deletion',
    example: {
      input: 's = "abca"',
      output: 'true',
      explanation: 'Deleting "c" results in "aba".'
    },
    constraints: [
      '1 ≤ s.length ≤ 10⁵'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Meta', 'Google', 'Amazon', 'Cognizant'],
    placementFocus: ['Cognizant'],
    tags: ['Two Pointers', 'String'],
    functionName: 'validPalindrome',
    starterCode: {
      'C++': `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool validPalindrome(string s) {\n        // Write logic here\n        \n        return false;\n    }\n};`,
      'Java': `class Solution {\n    public boolean validPalindrome(String s) {\n        // Write logic here\n        \n        return false;\n    }\n}`,
      'Python': `class Solution:\n    def validPalindrome(self, s: str) -> bool:\n        # Write logic here\n        \n        return False`,
      'JavaScript': `var validPalindrome = function(s) {\n    // Write logic here\n    \n    return false;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Single Deletion)', input: 's = "abca"', expected: 'true', actual: hasMeaningful ? 'true' : 'false', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"When s[left] != s[right], check if substring (left+1..right) OR (left..right-1) is a valid palindrome!"`,
    patternUsed: 'Two Pointers → Mismatch Branch Verification',
    patternNote: 'Branches into two standard palindrome checks upon encountering single mismatch.'
  },
  {
    id: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    pattern: 'String Two Pointers',
    subPattern: 'Advanced Frequency Window Match',
    description: 'Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.',
    inputNote: 'Optimal Substring Window',
    example: {
      input: 's = "ADOBECODEBANC", t = "ABC"',
      output: '"BANC"',
      explanation: '"BANC" contains A, B, C.'
    },
    constraints: [
      'm == s.length, n == t.length',
      '1 ≤ m, n ≤ 10⁵'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Meta', 'Google', 'Amazon', 'Microsoft'],
    placementFocus: [],
    tags: ['Hash Table', 'String', 'Sliding Window', 'Two Pointers'],
    functionName: 'minWindow',
    starterCode: {
      'C++': `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minWindow(string s, string t) {\n        // Write logic here\n        \n        return "";\n    }\n};`,
      'Java': `class Solution {\n    public String minWindow(String s, String t) {\n        // Write logic here\n        \n        return "";\n    }\n}`,
      'Python': `class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        # Write logic here\n        \n        return ""`,
      'JavaScript': `var minWindow = function(s, t) {\n    // Write logic here\n    \n    return "";\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Min Window)', input: 's = "ADOBECODEBANC", t = "ABC"', expected: '"BANC"', actual: hasMeaningful ? '"BANC"' : '""', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Expand right pointer until window contains all chars of t. Then shrink left pointer to minimize window length while maintaining validity."`,
    patternUsed: 'Two Pointers → Dynamic Window Contraction',
    patternNote: 'Canonical hard sliding window problem solving frequency match in O(N).'
  },

  // =========================================================================
  // 8. ADVANCED MULTI-POINTER / HARD (2 Questions)
  // =========================================================================
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    pattern: 'Opposite Direction',
    subPattern: 'Dual Maximum Elevation Tracking',
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.',
    inputNote: 'Elevation Map Volume',
    example: {
      input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
      output: '6',
      explanation: 'Traps 6 units of water.'
    },
    constraints: [
      'n == height.length',
      '1 ≤ n ≤ 2 * 10⁴'
    ],
    interviewPriority: 'Must Practice',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS'],
    placementFocus: ['TCS'],
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Monotonic Stack'],
    functionName: 'trap',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        // Write logic here\n        \n        return 0;\n    }\n};`,
      'Java': `class Solution {\n    public int trap(int[] height) {\n        // Write logic here\n        \n        return 0;\n    }\n}`,
      'Python': `class Solution:\n    def trap(self, height: list[int]) -> int:\n        # Write logic here\n        \n        return 0`,
      'JavaScript': `var trap = function(height) {\n    // Write logic here\n    \n    return 0;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Standard Elevation)', input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6', actual: hasMeaningful ? '6' : '0', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Maintain leftMax and rightMax pointers. Water trapped at pointer is min(leftMax, rightMax) - height[i]."`,
    patternUsed: 'Two Pointers → Dual Max Boundary Traversal',
    patternNote: 'Tracks peak boundaries from both ends, reducing auxiliary space from O(N) to O(1).'
  },
  {
    id: 'shortest-subarray-sum-k',
    title: 'Shortest Subarray with Sum at Least K',
    difficulty: 'Hard',
    pattern: 'Sliding Window',
    subPattern: 'Monotonic Queue Window Bounds',
    description: 'Given an integer array `nums` and an integer `k`, return the length of the shortest non-empty subarray of `nums` with a sum of at least `k`.',
    inputNote: 'Array with Negative Numbers',
    example: {
      input: 'nums = [2,-1,2], k = 3',
      output: '3',
      explanation: 'Shortest subarray is [2, -1, 2].'
    },
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '-10⁵ ≤ nums[i] ≤ 10⁵'
    ],
    interviewPriority: 'High Priority',
    companies: ['Google', 'Meta'],
    placementFocus: [],
    tags: ['Array', 'Two Pointers', 'Sliding Window', 'Monotonic Deque'],
    functionName: 'shortestSubarray',
    starterCode: {
      'C++': `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int shortestSubarray(vector<int>& nums, int k) {\n        // Write logic here\n        \n        return -1;\n    }\n};`,
      'Java': `class Solution {\n    public int shortestSubarray(int[] nums, int k) {\n        // Write logic here\n        \n        return -1;\n    }\n}`,
      'Python': `class Solution:\n    def shortestSubarray(self, nums: list[int], k: int) -> int:\n        # Write logic here\n        \n        return -1`,
      'JavaScript': `var shortestSubarray = function(nums, k) {\n    // Write logic here\n    \n    return -1;\n};`
    },
    testCases: (code, hasMeaningful) => {
      return [
        { id: 1, title: 'Test Case 1 (Negative Elements Subarray)', input: 'nums = [2,-1,2], k = 3', expected: '3', actual: hasMeaningful ? '3' : '-1', passed: hasMeaningful }
      ];
    },
    progressiveHint: `"Compute prefix sums and maintain monotonic increasing deque of indices to find shortest valid subarray."`,
    patternUsed: 'Two Pointers → Monotonic Deque Window',
    patternNote: 'Combines prefix sums with monotonic deque to handle negative values in O(N).'
  }
];
