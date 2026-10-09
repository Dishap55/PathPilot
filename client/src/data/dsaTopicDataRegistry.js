import { TWO_POINTERS_QUESTION_BANK } from './twoPointersQuestionBank.js';
import { ARRAYS_QUESTION_BANK } from './arraysQuestionBank.js';
import { SORTING_QUESTION_BANK } from './sortingQuestionBank.js';
import { BINARY_SEARCH_QUESTION_BANK } from './binarySearchQuestionBank.js';
import { LINKED_LIST_QUESTION_BANK } from './linkedListQuestionBank.js';
import { TREES_QUESTION_BANK } from './treesQuestionBank.js';
import { GRAPHS_QUESTION_BANK } from './graphsQuestionBank.js';
import { DP_QUESTION_BANK } from './dpQuestionBank.js';

import { TWO_POINTERS_INTRO_DATA } from '../components/learning/DSATopicIntroduction.jsx';
import { ARRAYS_INTRO_DATA } from './arraysIntroData.js';
import { SORTING_INTRO_DATA } from './sortingIntroData.js';
import { BINARY_SEARCH_INTRO_DATA } from './binarySearchIntroData.js';
import { LINKED_LIST_INTRO_DATA } from './linkedListIntroData.js';
import { TREES_INTRO_DATA } from './treesIntroData.js';
import { GRAPHS_INTRO_DATA } from './graphsIntroData.js';
import { DP_INTRO_DATA } from './dpIntroData.js';

/**
 * MASTER TOPIC REGISTRY
 * Maps every DSA topic to its 10-card introduction data, 35-problem question bank,
 * split-card problem examples, pattern matrix, and revision summary notes.
 */
export const DSA_TOPIC_REGISTRY = {
  'two-pointers': {
    id: 'two-pointers',
    name: 'Two Pointers',
    introData: TWO_POINTERS_INTRO_DATA,
    questionBank: TWO_POINTERS_QUESTION_BANK,
    examples: [
      {
        id: 1,
        title: 'Example 1: Two Sum II — Sorted Array Target Sum',
        difficulty: 'Easy-Medium • Opposite Direction',
        badgeText: '1-Indexed Array',
        description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
        inputOutput: 'Input: numbers = [2, 7, 11, 15], target = 9\nOutput: [1, 2]',
        observation: 'Because the array is sorted, if sum > target, advancing RIGHT leftward decreases the sum deterministically.',
        targetBadge: 'Target = 9',
        arrayElements: [
          { val: 2, label: 'LEFT', isLeft: true },
          { val: 7 },
          { val: 11 },
          { val: 15, label: 'RIGHT', isRight: true }
        ],
        steps: [
          { text: 'Step 1: 2 + 15 = 17 > 9', action: '→ Move RIGHT leftward', isMatch: false },
          { text: 'Step 2: 2 + 11 = 13 > 9', action: '→ Move RIGHT leftward', isMatch: false },
          { text: 'Step 3: 2 + 7 = 9 == 9', action: '✓ FOUND! Return [1, 2]', isMatch: true }
        ],
        codeLanguage: 'C++',
        codeSnippet: `#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& numbers, int target) {\n    int left = 0, right = numbers.size() - 1;\n    while (left < right) {\n        int sum = numbers[left] + numbers[right];\n        if (sum == target) return {left + 1, right + 1};\n        if (sum < target) left++;\n        else right--;\n    }\n    return {};\n}`
      },
      {
        id: 2,
        title: 'Example 2: Valid Palindrome — Character Pointer Convergence',
        difficulty: 'Easy • Inward Convergence',
        badgeText: 'Character String',
        description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
        inputOutput: 'Input: s = "A man, a plan, a canal: Panama"\nOutput: true',
        observation: 'Skip non-alphanumeric characters using inner pointer shifts, then compare lowercase values at left and right indices.',
        targetBadge: '"racecar"',
        arrayElements: [
          { val: 'r', label: 'L', isLeft: true },
          { val: 'a' },
          { val: 'c' },
          { val: 'e' },
          { val: 'c' },
          { val: 'a' },
          { val: 'r', label: 'R', isRight: true }
        ],
        steps: [
          { text: 'Step 1: s[0] (\'r\') == s[6] (\'r\')', action: '✓ Match! L++, R--', isMatch: false },
          { text: 'Step 2: s[1] (\'a\') == s[5] (\'a\')', action: '✓ Match! L++, R--', isMatch: false },
          { text: 'Step 3: s[2] (\'c\') == s[4] (\'c\')', action: '✓ Match! L++, R--', isMatch: false },
          { text: 'Step 4: L == R at index 3 (\'e\')', action: '✓ Valid Palindrome!', isMatch: true }
        ],
        codeLanguage: 'C++',
        codeSnippet: `#include <string>\n#include <cctype>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n        while (left < right && !isalnum(s[left])) left++;\n        while (left < right && !isalnum(s[right])) right--;\n        if (tolower(s[left]) != tolower(s[right])) return false;\n        left++;\n        right--;\n    }\n    return true;\n}`
      }
    ],
    patterns: [
      { id: 1, title: '1. Opposite Direction', text: 'Pointers start at indices 0 and N-1 and move inward. Used for Pair Sums, Palindromes, and Container Volume problems.', bg: 'bg-indigo-50/80 border-indigo-100 text-indigo-900' },
      { id: 2, title: '2. Same Direction', text: 'fast pointer explores while slow maintains valid element boundary. Used for in-place array filtering and duplicate removal.', bg: 'bg-sky-50/80 border-sky-100 text-sky-900' },
      { id: 3, title: '3. Fast & Slow (Floyd Cycle)', text: 'Pointers move at 1 step vs 2 steps per iteration. Used to detect cycles in linked lists or state graphs.', bg: 'bg-emerald-50/80 border-emerald-100 text-emerald-900' },
      { id: 4, title: '4. Sliding Window', text: 'Boundaries left and right define dynamic subsegment. Used for fixed or variable size contiguous subarray problems.', bg: 'bg-amber-50/80 border-amber-100 text-amber-900' }
    ],
    summary: {
      takeawayTitle: 'Two Pointers uses two positions to move through data intelligently and avoid unnecessary repeated work.',
      takeawayText: 'By maintaining index boundaries concurrently, quadratic brute-force searches reduce into linear O(N) traversals with O(1) auxiliary space.',
      steps: [
        { num: 1, title: 'Two Pointers (Two Positions)', text: 'Initialize left and right indices at boundaries (0 & N-1 or 0 & 0).' },
        { num: 2, title: 'Traverse (Intelligent Move)', text: 'Evaluate current elements against problem condition & advance left++ or right--.' },
        { num: 3, title: 'Optimized (Less Work)', text: 'Reaches target solution or array boundary in linear O(N) time with O(1) extra space.' }
      ],
      edgeCases: [
        { title: 'Empty or Length < 2', text: 'Check array size before initializing pointers to avoid out-of-bounds access (left < right).' },
        { title: 'Negative Numbers', text: 'Ensure negative values do not break sum comparison logic when adjusting pointer directions.' },
        { title: 'Duplicate Elements', text: 'Skip duplicate values (nums[left] == nums[left+1]) to prevent duplicate result pairs.' }
      ]
    }
  },

  'arrays': {
    id: 'arrays',
    name: 'Arrays & Strings',
    introData: ARRAYS_INTRO_DATA,
    questionBank: ARRAYS_QUESTION_BANK,
    examples: [
      {
        id: 1,
        title: 'Example 1: Maximum Subarray — Kadane\'s Algorithm',
        difficulty: 'Medium • Dynamic Subarray Sum',
        badgeText: '1D Array Scan',
        description: 'Given an integer array nums, find the contiguous subarray with the largest sum and return its sum in O(N) time.',
        inputOutput: 'Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nOutput: 6 (Subarray [4, -1, 2, 1])',
        observation: 'If current running sum drops below 0, reset running sum to 0 because negative prefix harms future subarray sums.',
        targetBadge: 'Max Sum = 6',
        arrayElements: [
          { val: 4, label: 'START', isLeft: true },
          { val: -1 },
          { val: 2 },
          { val: 1, label: 'END', isRight: true }
        ],
        steps: [
          { text: 'Step 1: currSum = 4 (max = 4)', action: 'Keep subarray', isMatch: false },
          { text: 'Step 2: 4 + (-1) = 3 (max = 4)', action: 'Subarray continues', isMatch: false },
          { text: 'Step 3: 3 + 2 = 5 (max = 5)', action: 'New max sum = 5', isMatch: false },
          { text: 'Step 4: 5 + 1 = 6 (max = 6)', action: '✓ FOUND MAX SUM = 6!', isMatch: true }
        ],
        codeLanguage: 'C++',
        codeSnippet: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    int maxSum = nums[0], currSum = 0;\n    for (int x : nums) {\n        currSum = max(x, currSum + x);\n        maxSum = max(maxSum, currSum);\n    }\n    return maxSum;\n}`
      },
      {
        id: 2,
        title: 'Example 2: Best Time to Buy and Sell Stock',
        difficulty: 'Easy • Single Pass Scan',
        badgeText: 'Stock Prices',
        description: 'Find maximum profit by choosing a single day to buy one stock and choosing a future day to sell.',
        inputOutput: 'Input: prices = [7, 1, 5, 3, 6, 4]\nOutput: 5 (Buy at 1, Sell at 6)',
        observation: 'Track minPrice seen so far and update maxProfit = max(maxProfit, prices[i] - minPrice).',
        targetBadge: 'Max Profit = 5',
        arrayElements: [
          { val: 7 },
          { val: 1, label: 'BUY', isLeft: true },
          { val: 5 },
          { val: 3 },
          { val: 6, label: 'SELL', isRight: true },
          { val: 4 }
        ],
        steps: [
          { text: 'Step 1: price = 7, minPrice = 7, profit = 0', action: 'Initialize', isMatch: false },
          { text: 'Step 2: price = 1, minPrice = 1, profit = 0', action: 'Update minPrice = 1', isMatch: false },
          { text: 'Step 3: price = 6, profit = 6 - 1 = 5', action: '✓ MAX PROFIT = 5!', isMatch: true }
        ],
        codeLanguage: 'C++',
        codeSnippet: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    int minPrice = 1e9, maxProfit = 0;\n    for (int p : prices) {\n        minPrice = min(minPrice, p);\n        maxProfit = max(maxProfit, p - minPrice);\n    }\n    return maxProfit;\n}`
      }
    ],
    patterns: [
      { id: 1, title: '1. Prefix Sum', text: 'Precompute cumulative sums prefix[i] = prefix[i-1] + nums[i] for O(1) range sum queries.', bg: 'bg-indigo-50/80 border-indigo-100 text-indigo-900' },
      { id: 2, title: '2. Kadane\'s Algorithm', text: 'Maintain running maximum subarray sum in a single pass in O(N) time and O(1) space.', bg: 'bg-sky-50/80 border-sky-100 text-sky-900' },
      { id: 3, title: '3. Frequency Array & Hashing', text: 'Use fixed count array size 26 or hash map to count character frequencies in O(1) lookup.', bg: 'bg-emerald-50/80 border-emerald-100 text-emerald-900' },
      { id: 4, title: '4. In-Place Operations', text: 'Rotate, swap, or re-arrange elements in-place without extra heap allocation.', bg: 'bg-amber-50/80 border-amber-100 text-amber-900' }
    ],
    summary: {
      takeawayTitle: 'Arrays provide O(1) index random access and optimal CPU cache locality.',
      takeawayText: 'Understanding index offset arithmetic and linear pattern scans unlocks high performance data processing.',
      steps: [
        { num: 1, title: 'Contiguous Memory Layout', text: 'Elements sit sequentially in memory enabling instant O(1) indexing.' },
        { num: 2, title: 'Pattern Selection', text: 'Apply Prefix Sum, Frequency Counting, or Kadane\'s algorithm.' },
        { num: 3, title: 'In-Place Optimization', text: 'Achieve O(1) space complexity by modifying original array pointers.' }
      ],
      edgeCases: [
        { title: 'Empty Array or N = 0', text: 'Always check if array size is 0 before indexing nums[0].' },
        { title: 'Off-By-One Bounds', text: 'Valid index range is strictly 0 to N-1.' },
        { title: 'Integer Overflow', text: 'Use long long / 64-bit int when accumulating large array sums.' }
      ]
    }
  },

  'sorting': {
    id: 'sorting',
    name: 'Sorting Algorithms',
    introData: SORTING_INTRO_DATA,
    questionBank: SORTING_QUESTION_BANK,
    examples: [
      {
        id: 1,
        title: 'Example 1: Merge Intervals — Sorting by Start Time',
        difficulty: 'Medium • Interval Merging',
        badgeText: 'Interval Vector',
        description: 'Given an array of intervals, merge all overlapping intervals and return non-overlapping intervals covering the same range.',
        inputOutput: 'Input: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]',
        observation: 'Sorting intervals by start time ensures overlapping intervals become strictly adjacent.',
        targetBadge: 'Merged = 3 Intervals',
        arrayElements: [
          { val: '[1,3]', label: 'FIRST', isLeft: true },
          { val: '[2,6]', label: 'OVERLAP', isRight: true },
          { val: '[8,10]' },
          { val: '[15,18]' }
        ],
        steps: [
          { text: 'Step 1: Sort by start time -> [[1,3],[2,6],[8,10],[15,18]]', action: 'Sorted', isMatch: false },
          { text: 'Step 2: [2,6] overlaps [1,3] since 2 <= 3', action: 'Merge into [1,6]', isMatch: false },
          { text: 'Step 3: [8,10] start 8 > 6', action: '✓ Append [8,10]', isMatch: true }
        ],
        codeLanguage: 'C++',
        codeSnippet: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> merge(vector<vector<int>>& intervals) {\n    sort(intervals.begin(), intervals.end());\n    vector<vector<int>> res;\n    for (auto& inv : intervals) {\n        if (res.empty() || res.back()[1] < inv[0]) res.push_back(inv);\n        else res.back()[1] = max(res.back()[1], inv[1]);\n    }\n    return res;\n}`
      }
    ],
    patterns: [
      { id: 1, title: '1. Divide & Conquer (Merge/Quick)', text: 'Split array into halves recursively. Merge Sort guarantees O(N log N) stable sorting.', bg: 'bg-indigo-50/80 border-indigo-100 text-indigo-900' },
      { id: 2, title: '2. Non-Comparison Counting Sort', text: 'Count element frequencies in O(N) time when max value range K is bounded.', bg: 'bg-sky-50/80 border-sky-100 text-sky-900' },
      { id: 3, title: '3. Custom Comparators', text: 'Pass lambda function to std::sort / Arrays.sort for multi-attribute struct sorting.', bg: 'bg-emerald-50/80 border-emerald-100 text-emerald-900' },
      { id: 4, title: '4. Dutch National Flag', text: 'Partition 0s, 1s, and 2s in-place in a single O(N) pass using 3 pointers.', bg: 'bg-amber-50/80 border-amber-100 text-amber-900' }
    ],
    summary: {
      takeawayTitle: 'Sorting transforms unordered datasets into predictable sequences, unlocking O(N log N) algorithms.',
      takeawayText: 'Choose Merge Sort for guaranteed O(N log N) stability, QuickSort for in-place speed, and Counting Sort for linear range bounds.',
      steps: [
        { num: 1, title: 'Choose Algorithm Family', text: 'Select Comparison (Merge/Quick) vs Non-Comparison (Counting/Bucket).' },
        { num: 2, title: 'Define Comparator', text: 'Ensure strict weak ordering for equal elements.' },
        { num: 3, title: 'Leverage Sorted Invariant', text: 'Apply Binary Search O(log N) or Two Pointers O(N) on sorted output.' }
      ],
      edgeCases: [
        { title: 'Duplicate Values', text: 'Ensure comparator handles equal elements without infinite loops.' },
        { title: 'Worst-Case QuickSort', text: 'Avoid O(N²) on sorted inputs by selecting random pivots.' },
        { title: 'Memory Usage', text: 'Merge Sort requires O(N) auxiliary memory; HeapSort is O(1).' }
      ]
    }
  },

  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    introData: BINARY_SEARCH_INTRO_DATA,
    questionBank: BINARY_SEARCH_QUESTION_BANK,
    examples: [
      {
        id: 1,
        title: 'Example 1: Search in Rotated Sorted Array',
        difficulty: 'Medium • Partition Identification',
        badgeText: 'Rotated Array',
        description: 'Search for target in an array sorted then rotated around unknown pivot index in O(log N) time.',
        inputOutput: 'Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4',
        observation: 'At least one half [low, mid] or [mid, high] is guaranteed to be strictly sorted.',
        targetBadge: 'Index = 4',
        arrayElements: [
          { val: 4, label: 'LOW', isLeft: true },
          { val: 5 },
          { val: 6 },
          { val: 7, label: 'MID' },
          { val: 0, label: 'TARGET', isRight: true },
          { val: 1 },
          { val: 2 }
        ],
        steps: [
          { text: 'Step 1: low=0, high=6, mid=3 (val=7)', action: 'Left half [4..7] sorted', isMatch: false },
          { text: 'Step 2: Target 0 not in [4..7]', action: 'Search right half low=4', isMatch: false },
          { text: 'Step 3: mid=4 (val=0) == target', action: '✓ FOUND AT INDEX 4!', isMatch: true }
        ],
        codeLanguage: 'C++',
        codeSnippet: `#include <vector>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[low] <= nums[mid]) {\n            if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    return -1;\n}`
      }
    ],
    patterns: [
      { id: 1, title: '1. Standard Binary Search', text: 'Halve search space at each step comparing target with mid element.', bg: 'bg-indigo-50/80 border-indigo-100 text-indigo-900' },
      { id: 2, title: '2. Lower / Upper Bounds', text: 'Find first occurrence index where nums[idx] >= target or > target.', bg: 'bg-sky-50/80 border-sky-100 text-sky-900' },
      { id: 3, title: '3. Binary Search on Answer', text: 'Search over solution parameter space [min_val, max_val] checking feasibility.', bg: 'bg-emerald-50/80 border-emerald-100 text-emerald-900' },
      { id: 4, title: '4. Peak Finding & Matrix', text: 'Navigate 2D row/col sorted matrices or find local array peak.', bg: 'bg-amber-50/80 border-amber-100 text-amber-900' }
    ],
    summary: {
      takeawayTitle: 'Binary Search achieves O(log N) efficiency by discarding half of the search space at every step.',
      takeawayText: 'Always calculate mid = low + (high - low) / 2 to avoid integer overflow and update pointers past mid to guarantee progress.',
      steps: [
        { num: 1, title: 'Calculate Mid Safely', text: 'mid = low + (high - low) / 2.' },
        { num: 2, title: 'Compare Target', text: 'Evaluate target vs nums[mid] or feasibility check function.' },
        { num: 3, title: 'Shift Boundary Past Mid', text: 'Set low = mid + 1 or high = mid - 1.' }
      ],
      edgeCases: [
        { title: 'Mid Integer Overflow', text: '(low + high) / 2 causes overflow in 32-bit int. Use low + (high - low) / 2.' },
        { title: 'Infinite Loop (low == mid)', text: 'Ensure pointers shift past mid when high - low == 1.' },
        { title: 'Duplicates in Rotated Array', text: 'Shrink low++ and high-- when nums[low] == nums[mid] == nums[high].' }
      ]
    }
  },

  'linked-list': {
    id: 'linked-list',
    name: 'Linked List',
    introData: LINKED_LIST_INTRO_DATA,
    questionBank: LINKED_LIST_QUESTION_BANK,
    examples: [
      {
        id: 1,
        title: 'Example 1: Reverse Linked List — In-Place Pointer Reversal',
        difficulty: 'Easy • Pointer Reassignment',
        badgeText: 'Single Pass O(1)',
        description: 'Given the head of a singly linked list, reverse the list in-place and return new head.',
        inputOutput: 'Input: head = [1, 2, 3, 4, 5]\nOutput: [5, 4, 3, 2, 1]',
        observation: 'Maintain prev, curr, and nextNode pointers. Reassign curr.next = prev at each node.',
        targetBadge: 'New Head = 5',
        arrayElements: [
          { val: '5', label: 'NEW HEAD', isLeft: true },
          { val: '4' },
          { val: '3' },
          { val: '2' },
          { val: '1', label: 'TAIL', isRight: true }
        ],
        steps: [
          { text: 'Step 1: prev = null, curr = node(1)', action: 'Save nextNode = node(2)', isMatch: false },
          { text: 'Step 2: curr.next = prev (1->null)', action: 'Advance prev=1, curr=2', isMatch: false },
          { text: 'Step 3: Traverse to end of list', action: '✓ Return prev = node(5)', isMatch: true }
        ],
        codeLanguage: 'C++',
        codeSnippet: `ListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while (curr) {\n        ListNode* nextNode = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nextNode;\n    }\n    return prev;\n}`
      }
    ],
    patterns: [
      { id: 1, title: '1. Fast & Slow Pointer', text: 'Detect cycles (Floyd\'s) and find middle node using 1x vs 2x speed pointers.', bg: 'bg-indigo-50/80 border-indigo-100 text-indigo-900' },
      { id: 2, title: '2. In-Place Reversal', text: 'Reverse node links iteratively in O(1) space.', bg: 'bg-sky-50/80 border-sky-100 text-sky-900' },
      { id: 3, title: '3. Dummy Head Node', text: 'Simplify list modification edge cases by attaching dummy node before head.', bg: 'bg-emerald-50/80 border-emerald-100 text-emerald-900' },
      { id: 4, title: '4. Doubly Linked List', text: 'Bidirectional nodes storing prev and next pointers powering LRU cache.', bg: 'bg-amber-50/80 border-amber-100 text-amber-900' }
    ],
    summary: {
      takeawayTitle: 'Linked lists provide dynamic memory allocation and constant-time head modifications.',
      takeawayText: 'Use dummy head nodes to streamline edge cases and apply fast & slow pointers for cycle detection and middle node lookups.',
      steps: [
        { num: 1, title: 'Create Dummy Head', text: 'Attach dummy node before head to prevent null pointer exceptions.' },
        { num: 2, title: 'Save Next Pointer', text: 'Always save nextNode = curr.next before modifying node links.' },
        { num: 3, title: 'Update Pointer Links', text: 'Reassign pointer directions cleanly and advance iteration.' }
      ],
      edgeCases: [
        { title: 'Null Head or Single Node', text: 'Check if head == null || head.next == null.' },
        { title: 'Lost Node Reference', text: 'Reassigning head without saving prev causes orphan node memory leaks.' },
        { title: 'Even vs Odd Length in Floyd', text: 'Loop while fast != null && fast.next != null.' }
      ]
    }
  },

  'trees': {
    id: 'trees',
    name: 'Trees & BST',
    introData: TREES_INTRO_DATA,
    questionBank: TREES_QUESTION_BANK,
    examples: [
      {
        id: 1,
        title: 'Example 1: Level Order Traversal (BFS)',
        difficulty: 'Medium • Queue BFS',
        badgeText: 'Binary Tree',
        description: 'Return level order traversal of binary tree nodes level-by-level from left to right.',
        inputOutput: 'Input: root = [3, 9, 20, null, null, 15, 7]\nOutput: [[3], [9, 20], [15, 7]]',
        observation: 'Snapshot queue size at the start of each level loop to process level nodes concurrently.',
        targetBadge: '3 Levels',
        arrayElements: [
          { val: '[3]', label: 'Lvl 1', isLeft: true },
          { val: '[9, 20]', label: 'Lvl 2' },
          { val: '[15, 7]', label: 'Lvl 3', isRight: true }
        ],
        steps: [
          { text: 'Level 1: Pop 3, push children 9 and 20', action: 'Result: [[3]]', isMatch: false },
          { text: 'Level 2: Pop 9 & 20, push children 15 and 7', action: 'Result: [[3],[9,20]]', isMatch: false },
          { text: 'Level 3: Pop 15 & 7', action: '✓ [[3],[9,20],[15,7]]', isMatch: true }
        ],
        codeLanguage: 'C++',
        codeSnippet: `vector<vector<int>> levelOrder(TreeNode* root) {\n    if (!root) return {};\n    vector<vector<int>> res;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        int sz = q.size();\n        vector<int> lvl;\n        for (int i = 0; i < sz; i++) {\n            TreeNode* node = q.front(); q.pop();\n            lvl.push_back(node->val);\n            if (node->left) q.push(node->left);\n            if (node->right) q.push(node->right);\n        }\n        res.push_back(lvl);\n    }\n    return res;\n}`
      }
    ],
    patterns: [
      { id: 1, title: '1. DFS Traversal (Pre/In/Post)', text: 'Explore deep tree branches recursively. Inorder traversal of BST yields sorted values.', bg: 'bg-indigo-50/80 border-indigo-100 text-indigo-900' },
      { id: 2, title: '2. BFS Level Order', text: 'Queue-based traversal exploring nodes level-by-level.', bg: 'bg-sky-50/80 border-sky-100 text-sky-900' },
      { id: 3, title: '3. BST Validation & Bounds', text: 'Pass valid range (minBound, maxBound) down recursion stack.', bg: 'bg-emerald-50/80 border-emerald-100 text-emerald-900' },
      { id: 4, title: '4. Lowest Common Ancestor (LCA)', text: 'Bottom-up postorder recursion checking where left and right calls return non-null.', bg: 'bg-amber-50/80 border-amber-100 text-amber-900' }
    ],
    summary: {
      takeawayTitle: 'Trees combine hierarchical organization with logarithmic search efficiency.',
      takeawayText: 'BST Inorder yields sorted values. DFS uses recursion stack O(H), while BFS uses queue O(W).',
      steps: [
        { num: 1, title: 'Null Base Case Check', text: 'If root is null, return default base value.' },
        { num: 2, title: 'Recurse Left & Right', text: 'Solve subproblems recursively for root.left and root.right.' },
        { num: 3, title: 'Combine Results', text: 'Aggregate answers (e.g. 1 + max(left, right)).' }
      ],
      edgeCases: [
        { title: 'Null Root', text: 'Handle root == null as the first line of recursion.' },
        { title: 'Skewed Tree Degeneration', text: 'Unbalanced trees degenerate into O(N) linked list call stacks.' },
        { title: 'BST Boundary Overflow', text: 'Use long bounds when validating BST nodes against INT_MIN / INT_MAX.' }
      ]
    }
  },

  'graphs': {
    id: 'graphs',
    name: 'Graphs & BFS/DFS',
    introData: GRAPHS_INTRO_DATA,
    questionBank: GRAPHS_QUESTION_BANK,
    examples: [
      {
        id: 1,
        title: 'Example 1: Number of Islands — 2D Matrix DFS',
        difficulty: 'Medium • Grid Flood Fill',
        badgeText: '2D Grid Matrix',
        description: 'Count number of connected land islands in a binary matrix grid.',
        inputOutput: 'Input: grid = [["1","1","0"],["1","1","0"],["0","0","1"]]\nOutput: 2',
        observation: 'When grid[r][c] == "1", trigger DFS to sink all connected land cells to "0".',
        targetBadge: '2 Islands',
        arrayElements: [
          { val: 'Island 1', label: 'DFS', isLeft: true },
          { val: 'Water' },
          { val: 'Island 2', label: 'DFS', isRight: true }
        ],
        steps: [
          { text: 'Cell (0,0) is "1": islands = 1', action: 'DFS sinks (0,0),(0,1),(1,0),(1,1)', isMatch: false },
          { text: 'Cell (2,2) is "1": islands = 2', action: 'DFS sinks (2,2)', isMatch: false },
          { text: 'Grid traversal finishes', action: '✓ RETURN 2 ISLANDS', isMatch: true }
        ],
        codeLanguage: 'C++',
        codeSnippet: `void dfs(vector<vector<char>>& grid, int r, int c) {\n    if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] == '0') return;\n    grid[r][c] = '0';\n    dfs(grid, r + 1, c); dfs(grid, r - 1, c);\n    dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n}\nint numIslands(vector<vector<char>>& grid) {\n    int count = 0;\n    for (int r = 0; r < grid.size(); r++)\n        for (int c = 0; c < grid[0].size(); c++)\n            if (grid[r][c] == '1') { count++; dfs(grid, r, c); }\n    return count;\n}`
      }
    ],
    patterns: [
      { id: 1, title: '1. Connected Components (DFS)', text: 'Flood fill 2D grid matrix or explore connected subgraphs.', bg: 'bg-indigo-50/80 border-indigo-100 text-indigo-900' },
      { id: 2, title: '2. Shortest Path (BFS)', text: 'Queue level order traversal discovers minimum edges path in unweighted graph.', bg: 'bg-sky-50/80 border-sky-100 text-sky-900' },
      { id: 3, title: '3. Topological Sort (Kahn\'s)', text: 'Order DAG vertices by tracking node in-degrees with queue.', bg: 'bg-emerald-50/80 border-emerald-100 text-emerald-900' },
      { id: 4, title: '4. Shortest Path (Dijkstra)', text: 'Min-Heap edge relaxation over weighted graphs with non-negative weights.', bg: 'bg-amber-50/80 border-amber-100 text-amber-900' }
    ],
    summary: {
      takeawayTitle: 'Graphs represent networks, maps, and dependencies using vertices and edges.',
      takeawayText: 'Always maintain a visited set to avoid infinite cycle loops, use BFS for shortest paths, and Kahn\'s algorithm for topological sorting.',
      steps: [
        { num: 1, title: 'Build Adjacency List', text: 'Construct adj[u] storing neighbor lists from edges.' },
        { num: 2, title: 'Track Visited Set', text: 'Mark visited nodes immediately upon pushing to queue or stack.' },
        { num: 3, title: 'Loop Outer Vertices', text: 'Iterate all vertices 0 to V-1 to catch disconnected components.' }
      ],
      edgeCases: [
        { title: 'Missing Visited Array', text: 'Causes infinite recursion loops on cyclic graphs.' },
        { title: 'Disconnected Components', text: 'Ensure outer loop visits all unvisited graph components.' },
        { title: 'Negative Weights in Dijkstra', text: 'Dijkstra fails on negative edge weights. Fallback to Bellman-Ford.' }
      ]
    }
  },

  'dp': {
    id: 'dp',
    name: 'Dynamic Programming',
    introData: DP_INTRO_DATA,
    questionBank: DP_QUESTION_BANK,
    examples: [
      {
        id: 1,
        title: 'Example 1: Climbing Stairs — 1D DP Tabulation',
        difficulty: 'Easy • State Transition',
        badgeText: '1D DP Array',
        description: 'Calculate total unique ways to reach step N taking 1 or 2 steps at a time.',
        inputOutput: 'Input: n = 3\nOutput: 3 (1+1+1, 1+2, 2+1)',
        observation: 'dp[i] = dp[i-1] + dp[i-2] with base cases dp[1]=1, dp[2]=2.',
        targetBadge: 'Ways = 3',
        arrayElements: [
          { val: 'dp[1]=1', label: 'BASE', isLeft: true },
          { val: 'dp[2]=2', label: 'BASE' },
          { val: 'dp[3]=3', label: 'ANSWER', isRight: true }
        ],
        steps: [
          { text: 'Base case dp[1] = 1, dp[2] = 2', action: 'Initialize', isMatch: false },
          { text: 'dp[3] = dp[2] + dp[1] = 2 + 1 = 3', action: '✓ RETURN 3 WAYS', isMatch: true }
        ],
        codeLanguage: 'C++',
        codeSnippet: `int climbStairs(int n) {\n    if (n <= 2) return n;\n    int prev2 = 1, prev1 = 2;\n    for (int i = 3; i <= n; i++) {\n        int curr = prev1 + prev2;\n        prev2 = prev1;\n        prev1 = curr;\n    }\n    return prev1;\n}`
      }
    ],
    patterns: [
      { id: 1, title: '1. 1D Linear DP', text: 'State dp[i] depends on a fixed number of previous values.', bg: 'bg-indigo-50/80 border-indigo-100 text-indigo-900' },
      { id: 2, title: '2. 2D Grid DP', text: 'Matrix paths dp[r][c] depend on cell above and cell to the left.', bg: 'bg-sky-50/80 border-sky-100 text-sky-900' },
      { id: 3, title: '3. Subsequence & String DP', text: 'LCS and Edit Distance compare characters at index i and j.', bg: 'bg-emerald-50/80 border-emerald-100 text-emerald-900' },
      { id: 4, title: '4. Knapsack DP', text: 'Take or leave decisions over items and capacity limits.', bg: 'bg-amber-50/80 border-amber-100 text-amber-900' }
    ],
    summary: {
      takeawayTitle: 'Dynamic Programming breaks complex optimization problems into overlapping subproblems.',
      takeawayText: 'Follow the 4-step framework: State -> Transition -> Base Case -> Target Answer.',
      steps: [
        { num: 1, title: 'Define State', text: 'Clarify what dp[i] or dp[r][c] represents.' },
        { num: 2, title: 'Formulate Recurrence', text: 'Derive dp[curr] from smaller solved states.' },
        { num: 3, title: 'Tabulate & Optimize Space', text: 'Fill table bottom-up and reduce space to previous row.' }
      ],
      edgeCases: [
        { title: 'Uninitialized Memo Table', text: 'Fill top-down memo with -1 before starting recursion.' },
        { title: 'Off-By-One Table Size', text: 'Allocate table size (N+1) for 1-based indexing.' },
        { title: 'Wrong Computation Order', text: 'Ensure dependency states are calculated before dependent states.' }
      ]
    }
  }
};
