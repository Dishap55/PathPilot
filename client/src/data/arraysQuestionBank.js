/**
/**
 * CURATED INTERVIEW-FOCUSED QUESTION BANK FOR ARRAYS & STRINGS
 * 
 * 35 High-Value Curated Problems:
 * - Easy: 14 questions
 * - Medium: 16 questions
 * - Hard: 5 questions
 * 
 * Sub-Patterns Covered:
 * 1. Traversal & Direct Manipulation
 * 2. Prefix Sum & Range Queries
 * 3. Frequency Counting & Hashing with Arrays
 * 4. Kadane's Algorithm & Max Subarray
 * 5. In-place Array Operations
 * 6. Matrix / 2D Arrays
 * 7. Subarray & Sliding Segment Techniques
 * 
 * Starter codes contain NO solution leaks.
 */

export const ARRAYS_QUESTION_BANK = [
  // =========================================================================
  // EASY PROBLEMS (1-14)
  // =========================================================================
  {
    id: 'two-sum',
    title: '1. Two Sum',
    difficulty: 'Easy',
    pattern: 'Frequency Counting & Hashing',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS', 'Cognizant', 'Accenture'],
    placementFocus: ['TCS', 'Cognizant', 'Accenture'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] == 6, so we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    functionName: 'twoSum',
    starterCode: {
      'Python': `def twoSum(nums, target):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}`,
      'C++': `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function twoSum(nums, target) {
    // Write your code here
    return [];
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [2, 7, 11, 15], target = 9",
            "expected": "[0, 1]",
            "visualHint": "Store complement (target - num) in a hash map as you traverse."
      },
      {
            "id": 2,
            "title": "Test Case 2",
            "input": "nums = [3, 2, 4], target = 6",
            "expected": "[1, 2]",
            "visualHint": "For nums[2] = 4, target - 4 = 2, which was previously seen at index 1."
      }
],
    solutionAnalysis: {
      intuition: 'Instead of searching all pairs in O(N²), store each element in a hash map to check complement presence in O(1) time.',
      timeComplexity: 'O(N) - Single pass through the array.',
      spaceComplexity: 'O(N) - Map stores up to N elements.',
      algorithmSteps: [
        'Initialize an empty hash map (map value -> index).',
        'Iterate through nums with index i.',
        'Calculate complement = target - nums[i].',
        'If complement exists in map, return [map[complement], i].',
        'Otherwise, store map[nums[i]] = i.'
      ]
    }
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    title: '2. Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    pattern: 'Traversal & Direct Manipulation',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Meta', 'Microsoft', 'TCS', 'Cognizant', 'Capgemini'],
    placementFocus: ['TCS', 'Cognizant', 'Capgemini'],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      {
        input: 'prices = [7, 1, 5, 3, 6, 4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    functionName: 'maxProfit',
    starterCode: {
      'Python': `def maxProfit(prices):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int maxProfit(int[] prices) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function maxProfit(prices) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "prices = [7, 1, 5, 3, 6, 4]",
            "expected": "5",
            "visualHint": "Track minPrice seen so far and calculate prices[i] - minPrice."
      }
],
    solutionAnalysis: {
      intuition: 'Maintain minimum price encountered so far and check potential profit at each step.',
      timeComplexity: 'O(N) - Linear scan.',
      spaceComplexity: 'O(1) - Constant variables.',
      algorithmSteps: [
        'Set minPrice = infinity, maxProfit = 0.',
        'Iterate price in prices:',
        '  minPrice = min(minPrice, price)',
        '  maxProfit = max(maxProfit, price - minPrice)',
        'Return maxProfit.'
      ]
    }
  },
  {
    id: 'contains-duplicate',
    title: '3. Contains Duplicate',
    difficulty: 'Easy',
    pattern: 'Frequency Counting & Hashing',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'TCS', 'Wipro', 'Accenture'],
    placementFocus: ['TCS', 'Wipro', 'Accenture'],
    description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.`,
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: 'true' },
      { input: 'nums = [1, 2, 3, 4]', output: 'false' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    functionName: 'containsDuplicate',
    starterCode: {
      'Python': `def containsDuplicate(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Write your code here
        return false;
    }
}`,
      'C++': `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // Write your code here
        return false;
    }
};`,
      'JavaScript': `function containsDuplicate(nums) {
    // Write your code here
    return false;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [1, 2, 3, 1]",
            "expected": "true",
            "visualHint": "Use a hash set to detect already-seen elements in O(1)."
      }
],
    solutionAnalysis: {
      intuition: 'Insert elements into a hash set. If an element already exists in set, return true.',
      timeComplexity: 'O(N) - Single scan.',
      spaceComplexity: 'O(N) - Set storage.',
      algorithmSteps: [
        'Initialize an empty hash set.',
        'For each num in nums, check if num in set. If yes, return true.',
        'Else add num to set.',
        'Return false if loop finishes.'
      ]
    }
  },
  {
    id: 'majority-element',
    title: '4. Majority Element',
    difficulty: 'Easy',
    pattern: 'Traversal & Direct Manipulation',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Microsoft', 'TCS', 'Cognizant', 'HCLTech'],
    placementFocus: ['TCS', 'Cognizant', 'HCLTech'],
    description: `Given an array \`nums\` of size \`n\`, return the majority element. The majority element is the element that appears more than \`⌊n / 2⌋\` times. Assume that the majority element always exists in the array.`,
    examples: [
      { input: 'nums = [3, 2, 3]', output: '3' },
      { input: 'nums = [2, 2, 1, 1, 1, 2, 2]', output: '2' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 5 * 10^4'],
    functionName: 'majorityElement',
    starterCode: {
      'Python': `def majorityElement(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int majorityElement(int[] nums) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    int majorityElement(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function majorityElement(nums) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [2, 2, 1, 1, 1, 2, 2]",
            "expected": "2",
            "visualHint": "Boyer-Moore Voting Algorithm maintains candidate and count."
      }
],
    solutionAnalysis: {
      intuition: 'Boyer-Moore Voting Algorithm cancels out pairs of non-matching elements.',
      timeComplexity: 'O(N) - One pass.',
      spaceComplexity: 'O(1) - Constant space.',
      algorithmSteps: [
        'Initialize candidate = 0, count = 0.',
        'Iterate num in nums: if count == 0 set candidate = num. If num == candidate count++ else count--.',
        'Return candidate.'
      ]
    }
  },
  {
    id: 'move-zeroes',
    title: '5. Move Zeroes',
    difficulty: 'Easy',
    pattern: 'In-place Array Operations',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Meta', 'Amazon', 'TCS', 'Accenture', 'Capgemini'],
    placementFocus: ['TCS', 'Accenture', 'Capgemini'],
    description: `Given an integer array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements. You must do this in-place without making a copy of the array.`,
    examples: [
      { input: 'nums = [0, 1, 0, 3, 12]', output: '[1, 3, 12, 0, 0]' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
    functionName: 'moveZeroes',
    starterCode: {
      'Python': `def moveZeroes(nums):
    # Write your code here (modify nums in-place)
    pass`,
      'Java': `class Solution {
    public void moveZeroes(int[] nums) {
        // Write your code here
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        // Write your code here
    }
};`,
      'JavaScript': `function moveZeroes(nums) {
    // Write your code here
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [0, 1, 0, 3, 12]",
            "expected": "[1, 3, 12, 0, 0]",
            "visualHint": "Use writePointer index to place non-zero elements sequentially."
      }
],
    solutionAnalysis: {
      intuition: 'Maintain write index pointing to where next non-zero element should go.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Set insertPos = 0.',
        'Iterate i from 0 to N-1: if nums[i] != 0, set nums[insertPos++] = nums[i].',
        'Fill remaining elements from insertPos to N-1 with 0.'
      ]
    }
  },
  {
    id: 'missing-number',
    title: '6. Missing Number',
    difficulty: 'Easy',
    pattern: 'Traversal & Direct Manipulation',
    priority: 'High Priority',
    interviewFocus: true,
    companyTags: ['Amazon', 'Microsoft', 'TCS', 'Wipro'],
    placementFocus: ['TCS', 'Wipro'],
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.`,
    examples: [
      { input: 'nums = [3, 0, 1]', output: '2' },
      { input: 'nums = [0, 1]', output: '2' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 10^4'],
    functionName: 'missingNumber',
    starterCode: {
      'Python': `def missingNumber(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int missingNumber(int[] nums) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    int missingNumber(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function missingNumber(nums) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [3, 0, 1]",
            "expected": "2",
            "visualHint": "Expected sum is n*(n+1)/2. Subtract actual sum of array elements."
      }
],
    solutionAnalysis: {
      intuition: 'Gauss formula gives expected sum from 0 to n. Difference from actual sum yields missing number.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'n = nums.length',
        'expectedSum = n * (n + 1) / 2',
        'actualSum = sum(nums)',
        'return expectedSum - actualSum'
      ]
    }
  },
  {
    id: 'running-sum-of-1d-array',
    title: '7. Running Sum of 1D Array',
    difficulty: 'Easy',
    pattern: 'Prefix Sum & Range Queries',
    priority: 'High Priority',
    interviewFocus: true,
    companyTags: ['Google', 'Amazon', 'Cognizant', 'Accenture'],
    placementFocus: ['Cognizant', 'Accenture'],
    description: `Given an array \`nums\`. We define a running sum of an array as \`runningSum[i] = sum(nums[0]…nums[i])\`. Return the running sum of \`nums\`.`,
    examples: [
      { input: 'nums = [1, 2, 3, 4]', output: '[1, 3, 6, 10]' }
    ],
    constraints: ['1 <= nums.length <= 1000', '-10^6 <= nums[i] <= 10^6'],
    functionName: 'runningSum',
    starterCode: {
      'Python': `def runningSum(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int[] runningSum(int[] nums) {
        // Write your code here
        return new int[]{};
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function runningSum(nums) {
    // Write your code here
    return [];
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [1, 2, 3, 4]",
            "expected": "[1, 3, 6, 10]",
            "visualHint": "Accumulate sum in-place: nums[i] += nums[i-1]."
      }
],
    solutionAnalysis: {
      intuition: 'Each running sum element at index i equals runningSum[i-1] + nums[i].',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) in-place',
      algorithmSteps: [
        'Iterate i from 1 to N-1: nums[i] += nums[i-1].',
        'Return nums.'
      ]
    }
  },
  {
    id: 'find-pivot-index',
    title: '8. Find Pivot Index',
    difficulty: 'Easy',
    pattern: 'Prefix Sum & Range Queries',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'TCS', 'Capgemini'],
    placementFocus: ['TCS', 'Capgemini'],
    description: `Given an array of integers \`nums\`, calculate the pivot index of this array. The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right. Return the leftmost pivot index. If no such index exists, return -1.`,
    examples: [
      { input: 'nums = [1, 7, 3, 6, 5, 6]', output: '3' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-1000 <= nums[i] <= 1000'],
    functionName: 'pivotIndex',
    starterCode: {
      'Python': `def pivotIndex(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int pivotIndex(int[] nums) {
        // Write your code here
        return -1;
    }
}`,
      'C++': `#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        // Write your code here
        return -1;
    }
};`,
      'JavaScript': `function pivotIndex(nums) {
    // Write your code here
    return -1;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [1, 7, 3, 6, 5, 6]",
            "expected": "3",
            "visualHint": "leftSum == totalSum - leftSum - nums[i]."
      }
],
    solutionAnalysis: {
      intuition: 'Compute total array sum. Track leftSum while moving index i.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'totalSum = sum(nums), leftSum = 0.',
        'Iterate i and num: if leftSum == totalSum - leftSum - num, return i. Else leftSum += num.',
        'Return -1 if loop finishes.'
      ]
    }
  },
  {
    id: 'single-number',
    title: '9. Single Number',
    difficulty: 'Easy',
    pattern: 'Traversal & Direct Manipulation',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    description: `Given a non-empty array of integers \`nums\`, every element appears twice except for one. Find that single one. You must implement a solution with linear runtime complexity and use only constant extra space.`,
    examples: [
      { input: 'nums = [4, 1, 2, 1, 2]', output: '4' }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4'],
    functionName: 'singleNumber',
    starterCode: {
      'Python': `def singleNumber(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int singleNumber(int[] nums) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function singleNumber(nums) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [4, 1, 2, 1, 2]",
            "expected": "4",
            "visualHint": "XOR property: a ^ a = 0 and a ^ 0 = a."
      }
],
    solutionAnalysis: {
      intuition: 'XORing all numbers cancels out duplicate pairs, leaving the single unique number.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Set res = 0.',
        'For num in nums: res ^= num.',
        'Return res.'
      ]
    }
  },
  {
    id: 'pascal-triangle',
    title: '10. Pascal\'s Triangle',
    difficulty: 'Easy',
    pattern: 'Traversal & Direct Manipulation',
    priority: 'Good to Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'TCS', 'Wipro'],
    placementFocus: ['TCS', 'Wipro'],
    description: `Given an integer \`numRows\`, return the first numRows of Pascal's triangle.`,
    examples: [
      { input: 'numRows = 5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]' }
    ],
    constraints: ['1 <= numRows <= 30'],
    functionName: 'generate',
    starterCode: {
      'Python': `def generate(numRows):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public List<List<Integer>> generate(int numRows) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function generate(numRows) {
    // Write your code here
    return [];
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "numRows = 5",
            "expected": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]",
            "visualHint": "row[j] = prevRow[j-1] + prevRow[j]."
      }
],
    solutionAnalysis: {
      intuition: 'Build row i by summing adjacent elements from row i-1.',
      timeComplexity: 'O(numRows²)',
      spaceComplexity: 'O(numRows²)',
      algorithmSteps: [
        'Initialize triangle list.',
        'For i from 0 to numRows-1:',
        '  Create row of size i+1 filled with 1s.',
        '  For j from 1 to i-1: row[j] = triangle[i-1][j-1] + triangle[i-1][j]',
        '  Append row to triangle.'
      ]
    }
  },
  {
    id: 'plus-one',
    title: '11. Plus One',
    difficulty: 'Easy',
    pattern: 'Traversal & Direct Manipulation',
    priority: 'Good to Practice',
    interviewFocus: true,
    companyTags: ['Google', 'Accenture', 'Cognizant'],
    placementFocus: ['Accenture', 'Cognizant'],
    description: `You are given a large integer represented as an integer array \`digits\`, where each \`digits[i]\` is the \`i-th\` digit of the integer. Increment the large integer by one and return the resulting array of digits.`,
    examples: [
      { input: 'digits = [1, 2, 3]', output: '[1, 2, 4]' },
      { input: 'digits = [9, 9]', output: '[1, 0, 0]' }
    ],
    constraints: ['1 <= digits.length <= 100', '0 <= digits[i] <= 9'],
    functionName: 'plusOne',
    starterCode: {
      'Python': `def plusOne(digits):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int[] plusOne(int[] digits) {
        // Write your code here
        return new int[]{};
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function plusOne(digits) {
    // Write your code here
    return [];
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "digits = [9, 9]",
            "expected": "[1, 0, 0]",
            "visualHint": "Process from right to left, handling carry over when digit is 9."
      }
],
    solutionAnalysis: {
      intuition: 'Traverse backwards. If digit < 9, increment and return. If 9, turn to 0 and carry over.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) except when overflow creates extra digit',
      algorithmSteps: [
        'Iterate i from N-1 down to 0:',
        '  If digits[i] < 9: digits[i]++, return digits.',
        '  digits[i] = 0.',
        'If loop completes, prepend 1 to digits.'
      ]
    }
  },
  {
    id: 'merge-sorted-array-in-place',
    title: '12. Merge Sorted Array (In-Place)',
    difficulty: 'Easy',
    pattern: 'In-place Array Operations',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Microsoft', 'Amazon', 'TCS', 'Capgemini'],
    placementFocus: ['TCS', 'Capgemini'],
    description: `You are given two integer arrays \`nums1\` and \`nums2\`, sorted in non-decreasing order, and two integers \`m\` and \`n\`. Merge \`nums1\` and \`nums2\` into a single array sorted in non-decreasing order in-place inside \`nums1\`.`,
    examples: [
      { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]' }
    ],
    constraints: ['nums1.length == m + n', 'nums2.length == n'],
    functionName: 'merge',
    starterCode: {
      'Python': `def merge(nums1, m, nums2, n):
    # Modify nums1 in-place
    pass`,
      'Java': `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Write your code here
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        // Write your code here
    }
};`,
      'JavaScript': `function merge(nums1, m, nums2, n) {
    // Write your code here
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
            "expected": "[1,2,2,3,5,6]",
            "visualHint": "Fill elements from the back (index m+n-1) to avoid overwriting nums1."
      }
],
    solutionAnalysis: {
      intuition: 'Three pointers starting from the end of arrays allow in-place merge without extra memory.',
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'p1 = m - 1, p2 = n - 1, p = m + n - 1.',
        'While p2 >= 0:',
        '  If p1 >= 0 and nums1[p1] > nums2[p2], nums1[p--] = nums1[p1--]',
        '  Else nums1[p--] = nums2[p2--]'
      ]
    }
  },
  {
    id: 'intersection-of-two-arrays-ii',
    title: '13. Intersection of Two Arrays II',
    difficulty: 'Easy',
    pattern: 'Frequency Counting & Hashing',
    priority: 'High Priority',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'HCLTech'],
    placementFocus: ['HCLTech'],
    description: `Given two integer arrays \`nums1\` and \`nums2\`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays.`,
    examples: [
      { input: 'nums1 = [1, 2, 2, 1], nums2 = [2, 2]', output: '[2, 2]' }
    ],
    constraints: ['1 <= nums1.length, nums2.length <= 1000'],
    functionName: 'intersect',
    starterCode: {
      'Python': `def intersect(nums1, nums2):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        // Write your code here
        return new int[]{};
    }
}`,
      'C++': `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function intersect(nums1, nums2) {
    // Write your code here
    return [];
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums1 = [1, 2, 2, 1], nums2 = [2, 2]",
            "expected": "[2, 2]",
            "visualHint": "Count frequencies of nums1 in hash map, then decrement when matching nums2."
      }
],
    solutionAnalysis: {
      intuition: 'Store element counts of the smaller array in a frequency map.',
      timeComplexity: 'O(N + M)',
      spaceComplexity: 'O(min(N, M))',
      algorithmSteps: [
        'Count frequencies of nums1 in map.',
        'Iterate num in nums2: if map[num] > 0, append num to res and map[num]--.',
        'Return res.'
      ]
    }
  },
  {
    id: 'rotate-image-matrix',
    title: '14. Rotate Image (2D Matrix)',
    difficulty: 'Easy',
    pattern: 'Matrix / 2D Arrays',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Microsoft', 'TCS', 'Accenture'],
    placementFocus: ['TCS', 'Accenture'],
    description: `You are given an \`n x n\` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.`,
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' }
    ],
    constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 20'],
    functionName: 'rotate',
    starterCode: {
      'Python': `def rotate(matrix):
    # Rotate matrix in-place
    pass`,
      'Java': `class Solution {
    public void rotate(int[][] matrix) {
        // Write your code here
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        // Write your code here
    }
};`,
      'JavaScript': `function rotate(matrix) {
    // Write your code here
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
            "expected": "[[7,4,1],[8,5,2],[9,6,3]]",
            "visualHint": "Step 1: Transpose matrix (swap matrix[i][j] with matrix[j][i]). Step 2: Reverse each row."
      }
],
    solutionAnalysis: {
      intuition: 'Rotate 90 degrees clockwise = Transpose matrix + Reverse every row.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Transpose matrix: swap matrix[i][j] with matrix[j][i] for i < j.',
        'Reverse each row of matrix in-place.'
      ]
    }
  },

  // =========================================================================
  // MEDIUM PROBLEMS (15-30)
  // =========================================================================
  {
    id: 'maximum-subarray-kadane',
    title: '15. Maximum Subarray (Kadane\'s Algorithm)',
    difficulty: 'Medium',
    pattern: 'Kadane\'s Algorithm',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'Subarray [4,-1,2,1] has the largest sum 6.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    functionName: 'maxSubArray',
    starterCode: {
      'Python': `def maxSubArray(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function maxSubArray(nums) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
            "expected": "6",
            "visualHint": "currentSum = max(num, currentSum + num). Update maxSum at each step."
      }
],
    solutionAnalysis: {
      intuition: 'If current cumulative subarray sum becomes negative, reset it to 0 as it hurts future sum.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'maxSum = nums[0], currSum = 0.',
        'For num in nums: currSum = max(num, currSum + num), maxSum = max(maxSum, currSum).',
        'Return maxSum.'
      ]
    }
  },
  {
    id: 'product-of-array-except-self',
    title: '16. Product of Array Except Self',
    difficulty: 'Medium',
    pattern: 'Prefix Sum & Range Queries',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Meta', 'Microsoft', 'Google', 'Accenture'],
    placementFocus: ['Accenture'],
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`. You must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
    examples: [
      { input: 'nums = [1, 2, 3, 4]', output: '[24, 12, 8, 6]' }
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30'],
    functionName: 'productExceptSelf',
    starterCode: {
      'Python': `def productExceptSelf(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int[] productExceptSelf(int[] nums) {
        // Write your code here
        return new int[]{};
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function productExceptSelf(nums) {
    // Write your code here
    return [];
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [1, 2, 3, 4]",
            "expected": "[24, 12, 8, 6]",
            "visualHint": "res[i] = prefixProduct[i-1] * suffixProduct[i+1]."
      }
],
    solutionAnalysis: {
      intuition: 'Compute left products in a single pass, then multiply right products in a reverse pass.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) output array excluded',
      algorithmSteps: [
        'Fill res[i] with product of all elements to the left of i.',
        'Maintain rightAccumulator initialized to 1.',
        'Pass backwards from N-1 to 0: multiply res[i] by rightAccumulator, then rightAccumulator *= nums[i].'
      ]
    }
  },
  {
    id: 'subarray-sum-equals-k',
    title: '17. Subarray Sum Equals K',
    difficulty: 'Medium',
    pattern: 'Prefix Sum & Range Queries',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Meta', 'Amazon', 'Google', 'TCS'],
    placementFocus: ['TCS'],
    description: `Given an array of integers \`nums\` and an integer \`k\`, return the total number of subarrays whose sum equals to \`k\`.`,
    examples: [
      { input: 'nums = [1, 1, 1], k = 2', output: '2' },
      { input: 'nums = [1, 2, 3], k = 3', output: '2' }
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000'],
    functionName: 'subarraySum',
    starterCode: {
      'Python': `def subarraySum(nums, k):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int subarraySum(int[] nums, int k) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function subarraySum(nums, k) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [1, 1, 1], k = 2",
            "expected": "2",
            "visualHint": "Store frequencies of prefix sums in hash map. Check map[currSum - k]."
      }
],
    solutionAnalysis: {
      intuition: 'Subarray sum between index i and j is prefixSum[j] - prefixSum[i-1]. If prefixSum[j] - prefixSum[i-1] == k, prefixSum[i-1] == prefixSum[j] - k.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      algorithmSteps: [
        'Map store prefixSum frequencies, map[0] = 1.',
        'Iterate num: currSum += num.',
        'ans += map[currSum - k].',
        'map[currSum]++.',
        'Return ans.'
      ]
    }
  },
  {
    id: 'spiral-matrix',
    title: '18. Spiral Matrix',
    difficulty: 'Medium',
    pattern: 'Matrix / 2D Arrays',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Microsoft', 'Google', 'TCS', 'Capgemini'],
    placementFocus: ['TCS', 'Capgemini'],
    description: `Given an \`m x n\` matrix, return all elements of the matrix in spiral order.`,
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' }
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10'],
    functionName: 'spiralOrder',
    starterCode: {
      'Python': `def spiralOrder(matrix):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function spiralOrder(matrix) {
    // Write your code here
    return [];
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
            "expected": "[1,2,3,6,9,8,7,4,5]",
            "visualHint": "Maintain 4 pointers: top, bottom, left, right."
      }
],
    solutionAnalysis: {
      intuition: 'Shrink matrix boundaries after traversing top row, right col, bottom row, left col.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(1) extra space',
      algorithmSteps: [
        'Set top=0, bottom=M-1, left=0, right=N-1.',
        'Traverse left to right on top row, top++.',
        'Traverse top to bottom on right col, right--.',
        'If top <= bottom, traverse right to left on bottom row, bottom--.',
        'If left <= right, traverse bottom to top on left col, left++.'
      ]
    }
  },
  {
    id: 'next-permutation',
    title: '19. Next Permutation',
    difficulty: 'Medium',
    pattern: 'In-place Array Operations',
    priority: 'High Priority',
    interviewFocus: true,
    companyTags: ['Meta', 'Amazon', 'Google'],
    placementFocus: [],
    description: `A permutation of an array of integers is an arrangement of its members into a sequence or linear order. Find the next lexicographically greater permutation of its integer array in-place.`,
    examples: [
      { input: 'nums = [1, 2, 3]', output: '[1, 3, 2]' },
      { input: 'nums = [3, 2, 1]', output: '[1, 2, 3]' }
    ],
    constraints: ['1 <= nums.length <= 100'],
    functionName: 'nextPermutation',
    starterCode: {
      'Python': `def nextPermutation(nums):
    # Modify nums in-place
    pass`,
      'Java': `class Solution {
    public void nextPermutation(int[] nums) {
        // Write your code here
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        // Write your code here
    }
};`,
      'JavaScript': `function nextPermutation(nums) {
    // Write your code here
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [1, 2, 3]",
            "expected": "[1, 3, 2]",
            "visualHint": "1. Find rightmost i where nums[i] < nums[i+1]. 2. Swap with smallest element greater than nums[i] on right. 3. Reverse suffix."
      }
],
    solutionAnalysis: {
      intuition: 'Identify pivot point from right where order decreases, swap with next larger element, reverse remaining suffix.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Find i = N-2 down to 0 where nums[i] < nums[i+1].',
        'If found, find j from N-1 down to i where nums[j] > nums[i], swap(nums[i], nums[j]).',
        'Reverse elements from i+1 to N-1.'
      ]
    }
  },
  {
    id: 'rotate-array-k-steps',
    title: '20. Rotate Array (k Steps)',
    difficulty: 'Medium',
    pattern: 'In-place Array Operations',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Microsoft', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    description: `Given an integer array \`nums\`, rotate the array to the right by \`k\` steps, where \`k\` is non-negative in-place with O(1) extra space.`,
    examples: [
      { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '0 <= k <= 10^5'],
    functionName: 'rotate',
    starterCode: {
      'Python': `def rotate(nums, k):
    # Modify nums in-place
    pass`,
      'Java': `class Solution {
    public void rotate(int[] nums, int k) {
        // Write your code here
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        // Write your code here
    }
};`,
      'JavaScript': `function rotate(nums, k) {
    // Write your code here
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [1,2,3,4,5,6,7], k = 3",
            "expected": "[5,6,7,1,2,3,4]",
            "visualHint": "Reverse whole array, reverse first k elements, reverse remaining n-k elements."
      }
],
    solutionAnalysis: {
      intuition: '3-Reverse technique rotates array in-place without auxiliary memory.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'k %= n',
        'Reverse entire array [0, n-1].',
        'Reverse first k elements [0, k-1].',
        'Reverse remaining elements [k, n-1].'
      ]
    }
  },
  {
    id: 'set-matrix-zeroes',
    title: '21. Set Matrix Zeroes',
    difficulty: 'Medium',
    pattern: 'Matrix / 2D Arrays',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Microsoft', 'Google', 'Accenture'],
    placementFocus: ['Accenture'],
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s in-place.`,
    examples: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' }
    ],
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 <= m, n <= 200'],
    functionName: 'setZeroes',
    starterCode: {
      'Python': `def setZeroes(matrix):
    # Modify matrix in-place
    pass`,
      'Java': `class Solution {
    public void setZeroes(int[][] matrix) {
        // Write your code here
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        // Write your code here
    }
};`,
      'JavaScript': `function setZeroes(matrix) {
    // Write your code here
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
            "expected": "[[1,0,1],[0,0,0],[1,0,1]]",
            "visualHint": "Use row 0 and col 0 as flags. Use col0 flag for column 0."
      }
],
    solutionAnalysis: {
      intuition: 'Store zero row and col markers directly inside first row and column of matrix.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Track if col0 needs to be zeroed.',
        'Iterate cells (r, c): if matrix[r][c] == 0, mark matrix[r][0] = 0 and matrix[0][c] = 0.',
        'Iterate cells backwards and update matrix cells based on markers.'
      ]
    }
  },
  {
    id: 'game-of-life',
    title: '22. Game of Life',
    difficulty: 'Medium',
    pattern: 'Matrix / 2D Arrays',
    priority: 'Good to Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google'],
    placementFocus: [],
    description: `Given an \`m x n\` grid of cells, calculate the next state of Conway's Game of Life in-place. Rules: Live cell with <2 or >3 live neighbors dies. Live cell with 2 or 3 live neighbors lives. Dead cell with exactly 3 live neighbors becomes live.`,
    examples: [
      { input: 'board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]', output: '[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]' }
    ],
    constraints: ['m == board.length', 'n == board[i].length'],
    functionName: 'gameOfLife',
    starterCode: {
      'Python': `def gameOfLife(board):
    # Modify board in-place
    pass`,
      'Java': `class Solution {
    public void gameOfLife(int[][] board) {
        // Write your code here
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        // Write your code here
    }
};`,
      'JavaScript': `function gameOfLife(board) {
    // Write your code here
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]",
            "expected": "[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]",
            "visualHint": "Use 2-bit state encoding (e.g. 2 for live->dead, 3 for dead->live)."
      }
],
    solutionAnalysis: {
      intuition: 'Encode state transitions into intermediate integers so current round neighbor checks are preserved.',
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Use state 2 for live->dead, 3 for dead->live.',
        'Count neighbors checking abs(cell) == 1 or cell == 2.',
        'Update cells to 2 or 3 based on rules.',
        'Final pass: cell %= 2.'
      ]
    }
  },
  {
    id: 'maximum-product-subarray',
    title: '23. Maximum Product Subarray',
    difficulty: 'Medium',
    pattern: 'Kadane\'s Algorithm',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'TCS'],
    placementFocus: ['TCS'],
    description: `Given an integer array \`nums\`, find a subarray that has the largest product, and return the product.`,
    examples: [
      { input: 'nums = [2, 3, -2, 4]', output: '6' }
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-10 <= nums[i] <= 10'],
    functionName: 'maxProduct',
    starterCode: {
      'Python': `def maxProduct(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int maxProduct(int[] nums) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function maxProduct(nums) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [2, 3, -2, 4]",
            "expected": "6",
            "visualHint": "Track both maxProduct and minProduct since negative numbers can swap them."
      }
],
    solutionAnalysis: {
      intuition: 'Multiplying by a negative number swaps maximum product and minimum product.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Maintain curMax, curMin, res = nums[0].',
        'For num in nums[1:]:',
        '  If num < 0, swap(curMax, curMin)',
        '  curMax = max(num, curMax * num)',
        '  curMin = min(num, curMin * num)',
        '  res = max(res, curMax)',
        'Return res.'
      ]
    }
  },
  {
    id: 'word-search-grid',
    title: '24. Word Search (2D Matrix)',
    difficulty: 'Medium',
    pattern: 'Matrix / 2D Arrays',
    priority: 'High Priority',
    interviewFocus: true,
    companyTags: ['Amazon', 'Microsoft', 'Google'],
    placementFocus: [],
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid. The word can be constructed from letters of sequentially adjacent cells.`,
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' }
    ],
    constraints: ['m == board.length', 'n == board[i].length'],
    functionName: 'exist',
    starterCode: {
      'Python': `def exist(board, word):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public boolean exist(char[][] board, String word) {
        // Write your code here
        return false;
    }
}`,
      'C++': `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        // Write your code here
        return false;
    }
};`,
      'JavaScript': `function exist(board, word) {
    // Write your code here
    return false;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
            "expected": "true",
            "visualHint": "Backtracking DFS: mark current cell visited with `#`, restore after DFS."
      }
],
    solutionAnalysis: {
      intuition: 'Depth-first search with backtracking from each matching starting character.',
      timeComplexity: 'O(M * N * 4^L)',
      spaceComplexity: 'O(L) recursion stack',
      algorithmSteps: [
        'Iterate each cell (r, c). If board[r][c] == word[0], start dfs(r, c, 0).',
        'dfs(r, c, idx): if idx == word.length return true. If out of bounds or mismatch return false.',
        'Temporarily set board[r][c] = `#`, search 4 directions, restore board[r][c].'
      ]
    }
  },
  {
    id: 'container-with-most-water-array',
    title: '25. Container With Most Water',
    difficulty: 'Medium',
    pattern: 'Subarray & Sliding Segment',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Meta', 'Google', 'TCS'],
    placementFocus: ['TCS'],
    description: `Given an integer array \`height\` of length \`n\`, find two lines that together with the x-axis form a container, such that the container contains the most water. Return maximum water area.`,
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' }
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5'],
    functionName: 'maxArea',
    starterCode: {
      'Python': `def maxArea(height):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int maxArea(int[] height) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function maxArea(height) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "height = [1,8,6,2,5,4,8,3,7]",
            "expected": "49",
            "visualHint": "Pointers start at boundaries. Move the pointer with smaller height inward."
      }
],
    solutionAnalysis: {
      intuition: 'Area = (right - left) * min(h[left], h[right]). Moving shorter height gives chance of larger area.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'left = 0, right = N - 1, maxWater = 0.',
        'While left < right:',
        '  h = min(height[left], height[right])',
        '  maxWater = max(maxWater, h * (right - left))',
        '  If height[left] < height[right] left++ else right--',
        'Return maxWater.'
      ]
    }
  },
  {
    id: 'insert-delete-getrandom-o1',
    title: '26. Insert Delete GetRandom O(1)',
    difficulty: 'Medium',
    pattern: 'Frequency Counting & Hashing',
    priority: 'High Priority',
    interviewFocus: true,
    companyTags: ['Amazon', 'Meta', 'Google'],
    placementFocus: [],
    description: `Implement RandomizedSet class with insert(val), remove(val), and getRandom() operating in average O(1) time complexity.`,
    examples: [
      { input: 'insert(1), remove(2), insert(2), getRandom(), remove(1), insert(2), getRandom()', output: 'true, false, true, 2, true, false, 2' }
    ],
    constraints: ['-2^31 <= val <= 2^31 - 1'],
    functionName: '__init__',
    starterCode: {
      'Python': `class RandomizedSet:
    def __init__(self):
        pass
    def insert(self, val: int) -> bool:
        pass
    def remove(self, val: int) -> bool:
        pass
    def getRandom(self) -> int:
        pass`,
      'Java': `class RandomizedSet {
    public RandomizedSet() {}
    public boolean insert(int val) { return false; }
    public boolean remove(int val) { return false; }
    public int getRandom() { return 0; }
}`,
      'C++': `#include <vector>
#include <unordered_map>
#include <cstdlib>
using namespace std;

class RandomizedSet {
public:
    RandomizedSet() {}
    bool insert(int val) { return false; }
    bool remove(int val) { return false; }
    int getRandom() { return 0; }
};`,
      'JavaScript': `class RandomizedSet {
    constructor() {}
    insert(val) { return false; }
    remove(val) { return false; }
    getRandom() { return 0; }
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "RandomizedSet execution",
            "expected": "O(1) average operations",
            "visualHint": "Combine a dynamic array for O(1) random access with a hash map storing indices for O(1) deletions."
      }
],
    solutionAnalysis: {
      intuition: 'Array provides O(1) random access. Hash map provides O(1) index lookup. Swap target with last array element to remove in O(1).',
      timeComplexity: 'O(1) average',
      spaceComplexity: 'O(N)',
      algorithmSteps: [
        'Maintain dynamic array list and map val -> index.',
        'insert(val): append to list, store map[val] = list.size-1.',
        'remove(val): swap list[map[val]] with last element, update map for swapped element, pop last element, delete map[val].',
        'getRandom(): return list[rand() % list.size].'
      ]
    }
  },
  {
    id: 'non-decreasing-array',
    title: '27. Non-Decreasing Array',
    difficulty: 'Medium',
    pattern: 'Traversal & Direct Manipulation',
    priority: 'Good to Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google'],
    placementFocus: [],
    description: `Given an array \`nums\` with \`n\` integers, check if it could become non-decreasing by modifying at most one element.`,
    examples: [
      { input: 'nums = [4, 2, 3]', output: 'true' },
      { input: 'nums = [4, 2, 1]', output: 'false' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 10^4'],
    functionName: 'checkPossibility',
    starterCode: {
      'Python': `def checkPossibility(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public boolean checkPossibility(int[] nums) {
        // Write your code here
        return false;
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    bool checkPossibility(vector<int>& nums) {
        // Write your code here
        return false;
    }
};`,
      'JavaScript': `function checkPossibility(nums) {
    // Write your code here
    return false;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [4, 2, 3]",
            "expected": "true",
            "visualHint": "If nums[i] > nums[i+1], change nums[i] to nums[i+1] if possible, else change nums[i+1] to nums[i]. Track count <= 1."
      }
],
    solutionAnalysis: {
      intuition: 'Greedily lower nums[i] if nums[i-1] <= nums[i+1], else raise nums[i+1].',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'count = 0.',
        'For i from 0 to N-2:',
        '  If nums[i] > nums[i+1]: count++ if count > 1 return false.',
        '  If i == 0 or nums[i-1] <= nums[i+1], nums[i] = nums[i+1] else nums[i+1] = nums[i].',
        'Return true.'
      ]
    }
  },
  {
    id: 'first-missing-positive-array',
    title: '28. First Missing Positive',
    difficulty: 'Hard',
    pattern: 'In-place Array Operations',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    placementFocus: [],
    description: `Given an unsorted integer array \`nums\`, return the smallest missing positive integer. You must implement an algorithm that runs in \`O(n)\` time and uses \`O(1)\` auxiliary space.`,
    examples: [
      { input: 'nums = [1, 2, 0]', output: '3' },
      { input: 'nums = [3, 4, -1, 1]', output: '2' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1'],
    functionName: 'firstMissingPositive',
    starterCode: {
      'Python': `def firstMissingPositive(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int firstMissingPositive(int[] nums) {
        // Write your code here
        return 1;
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        // Write your code here
        return 1;
    }
};`,
      'JavaScript': `function firstMissingPositive(nums) {
    // Write your code here
    return 1;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [3, 4, -1, 1]",
            "expected": "2",
            "visualHint": "Cyclic Sort: put number x at index x-1 if 1 <= x <= N."
      }
],
    solutionAnalysis: {
      intuition: 'Use index as hash key. Place element v at index v-1 via cyclic swaps.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Iterate i: while 1 <= nums[i] <= N and nums[nums[i]-1] != nums[i], swap(nums[i], nums[nums[i]-1]).',
        'Iterate i: if nums[i] != i + 1, return i + 1.',
        'Return N + 1.'
      ]
    }
  },
  {
    id: 'trapping-rain-water-array',
    title: '29. Trapping Rain Water',
    difficulty: 'Hard',
    pattern: 'Subarray & Sliding Segment',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS'],
    placementFocus: ['TCS'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' }
    ],
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4'],
    functionName: 'trap',
    starterCode: {
      'Python': `def trap(height):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int trap(int[] height) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function trap(height) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
            "expected": "6",
            "visualHint": "Maintain leftMax and rightMax using two pointers."
      }
],
    solutionAnalysis: {
      intuition: 'Water trapped at position i = min(maxLeft, maxRight) - height[i].',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'left = 0, right = N-1, leftMax = 0, rightMax = 0, water = 0.',
        'While left < right:',
        '  If height[left] < height[right]:',
        '    If height[left] >= leftMax leftMax = height[left] else water += leftMax - height[left]',
        '    left++',
        '  Else:',
        '    If height[right] >= rightMax rightMax = height[right] else water += rightMax - height[right]',
        '    right--',
        'Return water.'
      ]
    }
  },
  {
    id: 'largest-rectangle-in-histogram',
    title: '30. Largest Rectangle in Histogram',
    difficulty: 'Hard',
    pattern: 'Subarray & Sliding Segment',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    placementFocus: [],
    description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return the area of the largest rectangle in the histogram.`,
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10' }
    ],
    constraints: ['1 <= heights.length <= 10^5'],
    functionName: 'largestRectangleArea',
    starterCode: {
      'Python': `def largestRectangleArea(heights):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int largestRectangleArea(int[] heights) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function largestRectangleArea(heights) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "heights = [2,1,5,6,2,3]",
            "expected": "10",
            "visualHint": "Use monotonic stack storing indices of strictly increasing heights."
      }
],
    solutionAnalysis: {
      intuition: 'A monotonic increasing stack finds the left and right boundaries for every bar height.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      algorithmSteps: [
        'Maintain stack of indices.',
        'Iterate i through heights (append 0 at end as boundary).',
        'While stack not empty and heights[stack.top] > heights[i]: pop h = heights[stack.pop], w = i - stack.top - 1, maxArea = max(maxArea, h * w).',
        'Push i onto stack.',
        'Return maxArea.'
      ]
    }
  },
  {
    id: 'maximal-rectangle-matrix',
    title: '31. Maximal Rectangle in Binary Matrix',
    difficulty: 'Hard',
    pattern: 'Matrix / 2D Arrays',
    priority: 'High Priority',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google'],
    placementFocus: [],
    description: `Given a \`rows x cols\` binary matrix filled with \`0\`'s and \`1\`'s, find the largest rectangle containing only \`1\`'s and return its area.`,
    examples: [
      { input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', output: '6' }
    ],
    constraints: ['rows == matrix.length', 'cols == matrix[0].length'],
    functionName: 'maximalRectangle',
    starterCode: {
      'Python': `def maximalRectangle(matrix):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int maximalRectangle(char[][] matrix) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function maximalRectangle(matrix) {
    // Write your code here
    return 0;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "matrix 5x4 binary grid",
            "expected": "6",
            "visualHint": "Convert each row into a histogram height array, then run Largest Rectangle in Histogram algorithm."
      }
],
    solutionAnalysis: {
      intuition: 'Cumulative row heights reduce the 2D problem into N calls of 1D Largest Rectangle in Histogram.',
      timeComplexity: 'O(R * C)',
      spaceComplexity: 'O(C)',
      algorithmSteps: [
        'Maintain heights array of size C initialized to 0.',
        'For each row in matrix: update heights[j] = matrix[r][j] == "1" ? heights[j] + 1 : 0.',
        'Calculate maxArea = max(maxArea, largestRectangleInHistogram(heights)).',
        'Return maxArea.'
      ]
    }
  },
  {
    id: 'sliding-window-maximum-array',
    title: '32. Sliding Window Maximum',
    difficulty: 'Hard',
    pattern: 'Subarray & Sliding Segment',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    placementFocus: [],
    description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. Return max value in each window.`,
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '1 <= k <= nums.length'],
    functionName: 'maxSlidingWindow',
    starterCode: {
      'Python': `def maxSlidingWindow(nums, k):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        // Write your code here
        return new int[]{};
    }
}`,
      'C++': `#include <vector>
#include <deque>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function maxSlidingWindow(nums, k) {
    // Write your code here
    return [];
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [1,3,-1,-3,5,3,6,7], k = 3",
            "expected": "[3,3,5,5,6,7]",
            "visualHint": "Monotonic Deque: store indices of elements in decreasing order of values."
      }
],
    solutionAnalysis: {
      intuition: 'Double-ended queue (deque) maintains potential maximum elements in monotonic decreasing order.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(K)',
      algorithmSteps: [
        'Maintain deque storing indices.',
        'Iterate i: remove out-of-window indices from front (i - k).',
        'Remove smaller elements from back.',
        'Push i onto deque.',
        'If i >= k - 1, append nums[deque.front] to result.'
      ]
    }
  },
  {
    id: 'minimum-window-substring-array',
    title: '33. Minimum Window Substring',
    difficulty: 'Hard',
    pattern: 'Subarray & Sliding Segment',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    placementFocus: [],
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\`, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window.`,
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' }
    ],
    constraints: ['1 <= s.length, t.length <= 10^5'],
    functionName: 'minWindow',
    starterCode: {
      'Python': `def minWindow(s, t):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public String minWindow(String s, String t) {
        // Write your code here
        return "";
    }
}`,
      'C++': `#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        // Write your code here
        return "";
    }
};`,
      'JavaScript': `function minWindow(s, t) {
    // Write your code here
    return "";
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
            "expected": "\"BANC\"",
            "visualHint": "Expand right boundary to satisfy frequencies, shrink left boundary to find minimal window."
      }
],
    solutionAnalysis: {
      intuition: 'Sliding window with frequency counter and required count tracker.',
      timeComplexity: 'O(N + M)',
      spaceComplexity: 'O(1) alphabet size',
      algorithmSteps: [
        'Count char frequencies of t in map.',
        'Expand right pointer: if s[right] satisfies target frequency, increment formed count.',
        'While formed == required: update minWindow, increment left pointer.',
        'Return minWindow substring.'
      ]
    }
  },
  {
    id: 'majority-element-ii-array',
    title: '34. Majority Element II (N/3)',
    difficulty: 'Medium',
    pattern: 'Traversal & Direct Manipulation',
    priority: 'High Priority',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'TCS'],
    placementFocus: ['TCS'],
    description: `Given an integer array of size \`n\`, find all elements that appear more than \`⌊ n/3 ⌋\` times. The algorithm should run in O(n) time and O(1) space.`,
    examples: [
      { input: 'nums = [3,2,3]', output: '[3]' },
      { input: 'nums = [1,2]', output: '[1,2]' }
    ],
    constraints: ['1 <= nums.length <= 5 * 10^4'],
    functionName: 'majorityElement',
    starterCode: {
      'Python': `def majorityElement(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public List<Integer> majorityElement(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function majorityElement(nums) {
    // Write your code here
    return [];
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [3,2,3]",
            "expected": "[3]",
            "visualHint": "Boyer-Moore Voting algorithm extended for at most 2 candidates."
      }
],
    solutionAnalysis: {
      intuition: 'There can be at most two elements appearing more than n/3 times.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Maintain candidate1, candidate2, count1, count2.',
        'First pass: find potential candidates.',
        'Second pass: verify candidates appear > n/3 times.',
        'Return valid candidates.'
      ]
    }
  },
  {
    id: 'find-all-duplicates-in-an-array',
    title: '35. Find All Duplicates in an Array',
    difficulty: 'Medium',
    pattern: 'In-place Array Operations',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Microsoft', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    description: `Given an integer array \`nums\` of length \`n\` where all integers in \`nums\` are in the range \`[1, n]\` and each integer appears once or twice, return an array of all integers that appear twice in O(n) time and O(1) extra space.`,
    examples: [
      { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[2, 3]' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 10^5'],
    functionName: 'findDuplicates',
    starterCode: {
      'Python': `def findDuplicates(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
      'C++': `#include <vector>
#include <cmath>
using namespace std;

class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function findDuplicates(nums) {
    // Write your code here
    return [];
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "nums = [4,3,2,7,8,2,3,1]",
            "expected": "[2, 3]",
            "visualHint": "Negate value at index abs(val)-1. If already negative, val is a duplicate."
      }
],
    solutionAnalysis: {
      intuition: 'Use sign of elements at index abs(num)-1 as a visit flag.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Iterate num in nums:',
        '  idx = abs(num) - 1',
        '  If nums[idx] < 0, add abs(num) to result.',
        '  Else nums[idx] = -nums[idx]',
        'Return result.'
      ]
    }
  }
];
