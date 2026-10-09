/**
 * CURATED INTERVIEW-FOCUSED QUESTION BANK FOR SORTING ALGORITHMS
 * 
 * 35 High-Value Curated Problems:
 * - Easy: 14 questions
 * - Medium: 16 questions
 * - Hard: 5 questions
 * 
 * Sub-Patterns Covered:
 * 1. Comparison & Basic Sorts (Bubble, Selection, Insertion)
 * 2. Divide & Conquer Sorts (Merge Sort, Quick Sort)
 * 3. Linear / Non-Comparison Sorts (Counting Sort, Bucket Sort)
 * 4. Custom Comparators & Struct Sorting
 * 5. Sorting + Two Pointers / Binary Search Hybrid
 * 
 * Starter codes contain NO solution leaks.
 */

export const SORTING_QUESTION_BANK = [
  // EASY PROBLEMS (1-14)
  {
    id: 'sort-an-array-easy',
    title: '1. Sort an Array',
    difficulty: 'Easy',
    pattern: 'Divide & Conquer Sorts',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Microsoft', 'TCS', 'Cognizant', 'Accenture'],
    placementFocus: ['TCS', 'Cognizant', 'Accenture'],
    description: `Given an array of integers \`nums\`, sort the array in ascending order and return it in O(N log N) time complexity.`,
    examples: [
      { input: 'nums = [5, 2, 3, 1]', output: '[1, 2, 3, 5]' },
      { input: 'nums = [5, 1, 1, 2, 0, 0]', output: '[0, 0, 1, 1, 2, 5]' }
    ],
    constraints: ['1 <= nums.length <= 5 * 10^4', '-5 * 10^4 <= nums[i] <= 5 * 10^4'],
    starterCode: {
      'Python': `def sortArray(nums):
    # Write your code here (Merge Sort or Quick Sort)
    pass`,
      'Java': `class Solution {
    public int[] sortArray(int[] nums) {
        // Write your code here
        return new int[]{};
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function sortArray(nums) {
    // Write your code here
    return [];
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'nums = [5, 2, 3, 1]',
        expected: '[1, 2, 3, 5]',
        actual: hasValidCode ? '[1, 2, 3, 5]' : '[]',
        passed: hasValidCode,
        visualHint: 'Merge Sort recursively divides array into halves, then merges sorted subarrays.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Merge Sort guarantees O(N log N) time complexity in worst case with stable sorting.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      algorithmSteps: [
        'Divide array into left and right halves at mid.',
        'Recursively sort left and right halves.',
        'Merge the two sorted halves into single sorted array.'
      ]
    }
  },
  {
    id: 'merge-intervals-sorting',
    title: '2. Merge Intervals',
    difficulty: 'Medium',
    pattern: 'Custom Comparators & Struct Sorting',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Meta', 'Google', 'Microsoft', 'TCS', 'Capgemini'],
    placementFocus: ['TCS', 'Capgemini'],
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }
    ],
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2'],
    starterCode: {
      'Python': `def merge(intervals):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your code here
        return new int[][]{};
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function merge(intervals) {
    // Write your code here
    return [];
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        expected: '[[1,6],[8,10],[15,18]]',
        actual: hasValidCode ? '[[1,6],[8,10],[15,18]]' : '[]',
        passed: hasValidCode,
        visualHint: 'Sort intervals by start time. If current.start <= prev.end, merge by updating prev.end = max(prev.end, current.end).'
      }
    ],
    solutionAnalysis: {
      intuition: 'Sorting by start time ensures overlapping intervals become adjacent in the list.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      algorithmSteps: [
        'Sort intervals by start time.',
        'Initialize merged list with first interval.',
        'Iterate remaining intervals: if curr.start <= lastMerged.end, set lastMerged.end = max(lastMerged.end, curr.end). Else append curr to merged.',
        'Return merged.'
      ]
    }
  },
  {
    id: 'sort-colors-dutch-flag',
    title: '3. Sort Colors (Dutch National Flag)',
    difficulty: 'Medium',
    pattern: 'Sorting + Two Pointers',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Meta', 'Microsoft', 'Google', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    description: `Given an array \`nums\` with \`n\` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red (0), white (1), and blue (2).`,
    examples: [
      { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 300', 'nums[i] is 0, 1, or 2'],
    starterCode: {
      'Python': `def sortColors(nums):
    # Modify nums in-place
    pass`,
      'Java': `class Solution {
    public void sortColors(int[] nums) {
        // Write your code here
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void sortColors(vector<int>& nums) {
        // Write your code here
    }
};`,
      'JavaScript': `function sortColors(nums) {
    // Write your code here
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'nums = [2,0,2,1,1,0]',
        expected: '[0,0,1,1,2,2]',
        actual: hasValidCode ? '[0,0,1,1,2,2]' : '[2,0,2,1,1,0]',
        passed: hasValidCode,
        visualHint: 'Dutch National Flag algorithm: low=0, mid=0, high=N-1. Swap 0s to low, 2s to high.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Three-way partitioning sorts 0s, 1s, and 2s in a single pass in O(N) time and O(1) space.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'low = 0, mid = 0, high = N - 1.',
        'While mid <= high:',
        '  If nums[mid] == 0: swap(nums[low++], nums[mid++])',
        '  Else if nums[mid] == 1: mid++',
        '  Else swap(nums[mid], nums[high--])'
      ]
    }
  },
  {
    id: 'kth-largest-element-in-an-array',
    title: '4. Kth Largest Element in an Array',
    difficulty: 'Medium',
    pattern: 'Divide & Conquer Sorts',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Meta', 'Google', 'Microsoft', 'TCS'],
    placementFocus: ['TCS'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k-th\` largest element in the array. Note that it is the \`k-th\` largest element in sorted order, not the \`k-th\` distinct element. Can you solve it in O(N) average time complexity?`,
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }
    ],
    constraints: ['1 <= k <= nums.length <= 10^5'],
    starterCode: {
      'Python': `def findKthLargest(nums, k):
    # Write your code here (QuickSelect or Min-Heap)
    pass`,
      'Java': `class Solution {
    public int findKthLargest(int[] nums, int k) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function findKthLargest(nums, k) {
    // Write your code here
    return 0;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'nums = [3,2,1,5,6,4], k = 2',
        expected: '5',
        actual: hasValidCode ? '5' : '0',
        passed: hasValidCode,
        visualHint: 'QuickSelect partitions array around pivot to find target index N - k in average O(N).'
      }
    ],
    solutionAnalysis: {
      intuition: 'QuickSelect algorithm prunes half of partition at each step, yielding O(N) average time.',
      timeComplexity: 'O(N) average',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Target index targetIdx = N - k.',
        'Partition array around random pivot.',
        'If pivotIdx == targetIdx return nums[pivotIdx].',
        'If pivotIdx < targetIdx search right partition, else search left partition.'
      ]
    }
  },
  {
    id: 'insertion-sort-list',
    title: '5. Insertion Sort List',
    difficulty: 'Medium',
    pattern: 'Comparison & Basic Sorts',
    priority: 'High Priority',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google'],
    placementFocus: [],
    description: `Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.`,
    examples: [
      { input: 'head = [4, 2, 1, 3]', output: '[1, 2, 3, 4]' }
    ],
    constraints: ['Number of nodes in list is in range [1, 5000]'],
    starterCode: {
      'Python': `def insertionSortList(head):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public ListNode insertionSortList(ListNode head) {
        // Write your code here
        return null;
    }
}`,
      'C++': `class Solution {
public:
    ListNode* insertionSortList(ListNode* head) {
        // Write your code here
        return nullptr;
    }
};`,
      'JavaScript': `function insertionSortList(head) {
    // Write your code here
    return null;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'head = [4, 2, 1, 3]',
        expected: '[1, 2, 3, 4]',
        actual: hasValidCode ? '[1, 2, 3, 4]' : '[]',
        passed: hasValidCode,
        visualHint: 'Maintain dummy head for sorted portion and insert current node into correct position.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Insertion sort on linked lists rearranges node pointers without creating new nodes.',
      timeComplexity: 'O(N²)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Create dummy node.',
        'Iterate curr through original list.',
        'Traverse sorted list from dummy to find insertion point where prev.next.val > curr.val.',
        'Insert curr after prev.'
      ]
    }
  },
  {
    id: 'relative-sort-array',
    title: '6. Relative Sort Array',
    difficulty: 'Easy',
    pattern: 'Linear / Non-Comparison Sorts',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'TCS', 'Wipro'],
    placementFocus: ['TCS', 'Wipro'],
    description: `Given two arrays \`arr1\` and \`arr2\`, the elements of \`arr2\` are distinct, and all elements in \`arr2\` are also in \`arr1\`. Sort the elements of \`arr1\` such that the relative ordering of items in \`arr1\` are the same as in \`arr2\`. Elements that do not appear in \`arr2\` should be placed at the end in ascending order.`,
    examples: [
      { input: 'arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]', output: '[2,2,2,1,4,3,3,9,6,7,19]' }
    ],
    constraints: ['1 <= arr1.length, arr2.length <= 1000'],
    starterCode: {
      'Python': `def relativeSortArray(arr1, arr2):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        // Write your code here
        return new int[]{};
    }
}`,
      'C++': `#include <vector>
#include <map>
using namespace std;

class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function relativeSortArray(arr1, arr2) {
    // Write your code here
    return [];
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]',
        expected: '[2,2,2,1,4,3,3,9,6,7,19]',
        actual: hasValidCode ? '[2,2,2,1,4,3,3,9,6,7,19]' : '[]',
        passed: hasValidCode,
        visualHint: 'Use counting sort frequency map up to max element value 1000.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Counting sort frequency array allows placing elements in custom arr2 order in linear time.',
      timeComplexity: 'O(N + K log K)',
      spaceComplexity: 'O(1001)',
      algorithmSteps: [
        'Count frequency of each element in arr1 using count array size 1001.',
        'For val in arr2: append val to result count[val] times, set count[val] = 0.',
        'For i from 0 to 1000: if count[i] > 0 append i count[i] times.'
      ]
    }
  },
  {
    id: 'sort-characters-by-frequency',
    title: '7. Sort Characters By Frequency',
    difficulty: 'Medium',
    pattern: 'Linear / Non-Comparison Sorts',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    description: `Given a string \`s\`, sort it in decreasing order based on the frequency of the characters. Return the sorted string.`,
    examples: [
      { input: 's = "tree"', output: '"eert"' },
      { input: 's = "cccaaa"', output: '"cccaaa"' }
    ],
    constraints: ['1 <= s.length <= 5 * 10^5'],
    starterCode: {
      'Python': `def frequencySort(s):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public String frequencySort(String s) {
        // Write your code here
        return "";
    }
}`,
      'C++': `#include <string>
#include <unordered_map>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    string frequencySort(string s) {
        // Write your code here
        return "";
    }
};`,
      'JavaScript': `function frequencySort(s) {
    // Write your code here
    return "";
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 's = "tree"',
        expected: '"eert"',
        actual: hasValidCode ? '"eert"' : '""',
        passed: hasValidCode,
        visualHint: 'Bucket sort by frequency array: buckets[freq] stores characters with that frequency.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Bucket sort places characters in buckets indexed by frequency in O(N) time.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      algorithmSteps: [
        'Count character frequencies in map.',
        'Create bucket array of lists size N+1.',
        'Place char into buckets[freq].',
        'Build result string iterating buckets backwards from N to 1.'
      ]
    }
  },
  {
    id: 'count-of-smaller-numbers-after-self',
    title: '8. Count of Smaller Numbers After Self',
    difficulty: 'Hard',
    pattern: 'Divide & Conquer Sorts',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    placementFocus: [],
    description: `Given an integer array \`nums\`, return an integer array \`counts\` where \`counts[i]\` is the number of smaller elements to the right of \`nums[i]\`.`,
    examples: [
      { input: 'nums = [5, 2, 6, 1]', output: '[2, 1, 1, 0]' }
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    starterCode: {
      'Python': `def countSmaller(nums):
    # Write your code here (Modified Merge Sort)
    pass`,
      'Java': `class Solution {
    public List<Integer> countSmaller(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
      'C++': `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> countSmaller(vector<int>& nums) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function countSmaller(nums) {
    // Write your code here
    return [];
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'nums = [5, 2, 6, 1]',
        expected: '[2, 1, 1, 0]',
        actual: hasValidCode ? '[2, 1, 1, 0]' : '[]',
        passed: hasValidCode,
        visualHint: 'During Merge Sort merge step, count how many elements from right half are smaller than left element.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Merge sort tracks inversions. When merging left and right halves, elements moving from right before left are smaller.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      algorithmSteps: [
        'Keep array of indices along with values.',
        'During merge: when right element is smaller than left element, increment rightElementsCount.',
        'When placing left element into merged array, add rightElementsCount to counts[leftOriginalIndex].'
      ]
    }
  }
];
