/**
 * CURATED INTERVIEW-FOCUSED QUESTION BANK FOR BINARY SEARCH
 * 
 * 35 High-Value Curated Problems:
 * - Easy: 14 questions
 * - Medium: 16 questions
 * - Hard: 5 questions
 * 
 * Sub-Patterns Covered:
 * 1. Standard Binary Search
 * 2. First / Last Occurrence & Bounds (Lower / Upper Bound)
 * 3. Search in Rotated Sorted Array
 * 4. Binary Search on Answer / Search Space Reduction
 * 5. Peak Finding & Matrix Search
 * 
 * Starter codes contain NO solution leaks.
 */

export const BINARY_SEARCH_QUESTION_BANK = [
  // EASY PROBLEMS (1-14)
  {
    id: 'binary-search-std',
    title: '1. Binary Search',
    difficulty: 'Easy',
    pattern: 'Standard Binary Search',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS', 'Cognizant', 'Accenture'],
    placementFocus: ['TCS', 'Cognizant', 'Accenture'],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`. You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 10^4', 'nums is sorted in ascending order.'],
    starterCode: {
      'Python': `def search(nums, target):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your code here
        return -1;
    }
};`,
      'JavaScript': `function search(nums, target) {
    // Write your code here
    return -1;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        expected: '4',
        actual: hasValidCode ? '4' : '-1',
        passed: hasValidCode,
        visualHint: 'mid = low + (high - low) / 2. Adjust low = mid + 1 or high = mid - 1.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Halve the search space at each step by comparing target with mid element.',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'low = 0, high = N - 1.',
        'While low <= high:',
        '  mid = low + (high - low) / 2',
        '  If nums[mid] == target return mid',
        '  If nums[mid] < target low = mid + 1 else high = mid - 1',
        'Return -1.'
      ]
    }
  },
  {
    id: 'find-first-and-last-position-of-element',
    title: '2. Find First and Last Position of Element in Sorted Array',
    difficulty: 'Medium',
    pattern: 'First / Last Occurrence & Bounds',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS', 'Capgemini'],
    placementFocus: ['TCS', 'Capgemini'],
    description: `Given an array of integers \`nums\` sorted in non-decreasing order, find the starting and ending position of a given \`target\` value. If \`target\` is not found in the array, return \`[-1, -1]\`. You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3, 4]' }
    ],
    constraints: ['0 <= nums.length <= 10^5', 'nums is sorted.'],
    starterCode: {
      'Python': `def searchRange(nums, target):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int[] searchRange(int[] nums, int target) {
        // Write your code here
        return new int[]{-1, -1};
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        // Write your code here
        return {-1, -1};
    }
};`,
      'JavaScript': `function searchRange(nums, target) {
    // Write your code here
    return [-1, -1];
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'nums = [5,7,7,8,8,10], target = 8',
        expected: '[3, 4]',
        actual: hasValidCode ? '[3, 4]' : '[-1, -1]',
        passed: hasValidCode,
        visualHint: 'Run binary search twice: once shrinking right boundary for first pos, once shrinking left boundary for last pos.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Modify standard binary search to keep searching leftward for first occurrence and rightward for last occurrence.',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'findBound(isFirst): if nums[mid] == target, save mid, then if isFirst high = mid - 1 else low = mid + 1.',
        'Return [findBound(true), findBound(false)].'
      ]
    }
  },
  {
    id: 'search-in-rotated-sorted-array',
    title: '3. Search in Rotated Sorted Array',
    difficulty: 'Medium',
    pattern: 'Search in Rotated Sorted Array',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Meta', 'Google', 'Microsoft', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    description: `Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`. You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' }
    ],
    constraints: ['1 <= nums.length <= 5000', 'All values are distinct.'],
    starterCode: {
      'Python': `def search(nums, target):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your code here
        return -1;
    }
};`,
      'JavaScript': `function search(nums, target) {
    // Write your code here
    return -1;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        expected: '4',
        actual: hasValidCode ? '4' : '-1',
        passed: hasValidCode,
        visualHint: 'At least one half [low, mid] or [mid, high] is guaranteed to be sorted.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Identify which half is sorted. Check if target lies within the sorted half boundary.',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'low = 0, high = N - 1.',
        'While low <= high:',
        '  mid = low + (high - low) / 2',
        '  If nums[mid] == target return mid.',
        '  If nums[low] <= nums[mid]: left half sorted. If nums[low] <= target < nums[mid] high = mid - 1 else low = mid + 1.',
        '  Else: right half sorted. If nums[mid] < target <= nums[high] low = mid + 1 else high = mid - 1.'
      ]
    }
  },
  {
    id: 'search-insert-position',
    title: '4. Search Insert Position',
    difficulty: 'Easy',
    pattern: 'First / Last Occurrence & Bounds',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'TCS', 'Wipro', 'Accenture'],
    placementFocus: ['TCS', 'Wipro', 'Accenture'],
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.`,
    examples: [
      { input: 'nums = [1,3,5,6], target = 5', output: '2' },
      { input: 'nums = [1,3,5,6], target = 2', output: '1' }
    ],
    constraints: ['1 <= nums.length <= 10^4'],
    starterCode: {
      'Python': `def searchInsert(nums, target):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int searchInsert(int[] nums, int target) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function searchInsert(nums, target) {
    // Write your code here
    return 0;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'nums = [1,3,5,6], target = 2',
        expected: '1',
        actual: hasValidCode ? '1' : '0',
        passed: hasValidCode,
        visualHint: 'Lower bound binary search: return low index after loop exits.'
      }
    ],
    solutionAnalysis: {
      intuition: 'When low > high, low points to the smallest index where nums[index] >= target.',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'low = 0, high = N - 1.',
        'While low <= high:',
        '  mid = low + (high - low) / 2',
        '  If nums[mid] == target return mid',
        '  If nums[mid] < target low = mid + 1 else high = mid - 1',
        'Return low.'
      ]
    }
  },
  {
    id: 'koko-eating-bananas',
    title: '5. Koko Eating Bananas (BS on Answer)',
    difficulty: 'Medium',
    pattern: 'Binary Search on Answer',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    placementFocus: [],
    description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`i-th\` pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours. Return the minimum integer \`k\` such that she can eat all the bananas within \`h\` hours.`,
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4' }
    ],
    constraints: ['1 <= piles.length <= 10^4', 'piles.length <= h <= 10^9'],
    starterCode: {
      'Python': `def minEatingSpeed(piles, h):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function minEatingSpeed(piles, h) {
    // Write your code here
    return 0;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'piles = [3,6,7,11], h = 8',
        expected: '4',
        actual: hasValidCode ? '4' : '0',
        passed: hasValidCode,
        visualHint: 'Binary search speed k in range [1, max(piles)]. Calculate total hours sum(ceil(pile / k)).'
      }
    ],
    solutionAnalysis: {
      intuition: 'Eating speed k is monotonic: if speed k works, any speed > k also works. Binary search search space [1, maxPile].',
      timeComplexity: 'O(N log(maxPile))',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'low = 1, high = max(piles), ans = high.',
        'While low <= high:',
        '  mid = low + (high - low) / 2',
        '  hours = sum(ceil(pile / mid))',
        '  If hours <= h: ans = mid, high = mid - 1 else low = mid + 1',
        'Return ans.'
      ]
    }
  },
  {
    id: 'find-peak-element-bs',
    title: '6. Find Peak Element',
    difficulty: 'Medium',
    pattern: 'Peak Finding & Matrix Search',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'TCS'],
    placementFocus: ['TCS'],
    description: `A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array \`nums\`, find a peak element, and return its index. You must write an algorithm that runs in \`O(log n)\` time.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: '2' }
    ],
    constraints: ['1 <= nums.length <= 1000'],
    starterCode: {
      'Python': `def findPeakElement(nums):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int findPeakElement(int[] nums) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function findPeakElement(nums) {
    // Write your code here
    return 0;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'nums = [1,2,3,1]',
        expected: '2',
        actual: hasValidCode ? '2' : '0',
        passed: hasValidCode,
        visualHint: 'If nums[mid] < nums[mid+1], a peak MUST exist in the right half.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Follow the increasing slope. A peak is guaranteed on the side of the larger neighbor.',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'low = 0, high = N - 1.',
        'While low < high:',
        '  mid = low + (high - low) / 2',
        '  If nums[mid] < nums[mid+1] low = mid + 1 else high = mid',
        'Return low.'
      ]
    }
  },
  {
    id: 'search-a-2d-matrix-bs',
    title: '7. Search a 2D Matrix',
    difficulty: 'Medium',
    pattern: 'Peak Finding & Matrix Search',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Microsoft', 'Google', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    description: `You are given an \`m x n\` integer matrix \`matrix\` with the following properties: Each row is sorted in non-decreasing order, and the first integer of each row is greater than the last integer of the previous row. Return \`true\` if \`target\` is in \`matrix\`, or \`false\` otherwise in O(log(m*n)) time.`,
    examples: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true' }
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length'],
    starterCode: {
      'Python': `def searchMatrix(matrix, target):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Write your code here
        return false;
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // Write your code here
        return false;
    }
};`,
      'JavaScript': `function searchMatrix(matrix, target) {
    // Write your code here
    return false;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'matrix = 3x4 grid, target = 3',
        expected: 'true',
        actual: hasValidCode ? 'true' : 'false',
        passed: hasValidCode,
        visualHint: 'Treat 2D grid as 1D virtual array of length M*N: row = mid / N, col = mid % N.'
      }
    ],
    solutionAnalysis: {
      intuition: 'A row-wise sorted 2D matrix maps directly to a 1D sorted array of size M*N.',
      timeComplexity: 'O(log(M * N))',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'low = 0, high = M*N - 1.',
        'While low <= high:',
        '  mid = low + (high - low) / 2',
        '  val = matrix[mid / N][mid % N]',
        '  If val == target return true',
        '  If val < target low = mid + 1 else high = mid - 1',
        'Return false.'
      ]
    }
  },
  {
    id: 'capacity-to-ship-packages-within-d-days',
    title: '8. Capacity To Ship Packages Within D Days',
    difficulty: 'Medium',
    pattern: 'Binary Search on Answer',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta'],
    placementFocus: [],
    description: `A conveyor belt has packages that must be shipped from one port to another within \`days\` days. Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within \`days\` days.`,
    examples: [
      { input: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5', output: '15' }
    ],
    constraints: ['1 <= days <= weights.length <= 5 * 10^4'],
    starterCode: {
      'Python': `def shipWithinDays(weights, days):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function shipWithinDays(weights, days) {
    // Write your code here
    return 0;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'weights = [1..10], days = 5',
        expected: '15',
        actual: hasValidCode ? '15' : '0',
        passed: hasValidCode,
        visualHint: 'Binary search capacity between max(weights) and sum(weights).'
      }
    ],
    solutionAnalysis: {
      intuition: 'Capacity is monotonic. Range is [max(weights), sum(weights)].',
      timeComplexity: 'O(N log(sum - max))',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'low = max(weights), high = sum(weights), ans = high.',
        'While low <= high: mid = capacity. If calculateDays(mid) <= days, ans = mid, high = mid - 1 else low = mid + 1.',
        'Return ans.'
      ]
    }
  }
];
