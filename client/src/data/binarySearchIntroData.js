/**
 * BINARY SEARCH 10-CARD INTRODUCTION DATA DEFINITION
 * Reusable data structure for DSA → Binary Search → Introduction Depth Carousel.
 */
export const BINARY_SEARCH_INTRO_DATA = {
  topicId: 'binary-search',
  topicName: 'Binary Search',
  subtitle: 'Master logarithmic search techniques that cut search space in half at every single step.',
  cards: [
    {
      id: 'what-is-binary-search',
      cardNumber: 1,
      badge: '01 · CORE CONCEPT',
      title: 'What is Binary Search?',
      introText: 'Binary Search is an efficient algorithm for finding an item in a sorted collection by repeatedly dividing the search interval in half.',
      coreIdea: {
        part1: 'Sorted Array',
        part2: 'Divide Halves',
        result: 'O(log N) Time'
      },
      keyPoints: [
        {
          num: '01',
          title: 'HALVING SEARCH SPACE',
          text: 'Each comparison eliminates 50% of remaining candidates.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'LOGARITHMIC EFFICIENCY',
          text: 'Can search 1 billion elements in just 30 comparisons.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'MONOTONIC PREREQUISITE',
          text: 'Requires elements to be ordered or satisfy monotonic property.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '04',
          title: 'THREE POINTERS',
          text: 'Maintains low, high, and mid index boundaries.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        arrayValues: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        steps: [
          { left: 0, right: 9, label: 'Search 23: low=0, high=9 -> mid=4 (val=16)' },
          { left: 5, right: 9, label: '16 < 23 -> low=mid+1 (5), high=9 -> mid=7 (val=56)' },
          { left: 5, right: 6, label: '56 > 23 -> high=mid-1 (6), mid=5 (val=23) -> Found!' }
        ]
      },
      memoryTakeaway: 'Sorted Input -> Compare Mid -> Halve Search Space'
    },
    {
      id: 'key-points',
      cardNumber: 2,
      badge: '02 · KEY SUMMARY',
      title: 'Key Points',
      introText: 'Fundamental invariants and boundary rules for binary search.',
      coreIdea: {
        part1: 'Mid Math',
        part2: 'Loop Condition',
        result: 'No Infinite Loop'
      },
      keyPoints: [
        {
          num: '01',
          title: 'MID OVERFLOW PREVENTION',
          text: 'Use mid = low + (high - low) / 2 instead of (low + high) / 2.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'LOOP CONDITIONS',
          text: 'low <= high for exact element search; low < high for boundary search.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'DISCARDING MID',
          text: 'Set low = mid + 1 or high = mid - 1 to guarantee progress.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'SEARCH SPACE BEYOND ARRAYS',
          text: 'Can binary search over range of numbers [1, MAX_ANSWER].',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: [1, 3, 5, 7],
        steps: [
          { left: 0, right: 3, label: 'mid = low + (high - low) / 2 prevents overflow' }
        ]
      },
      memoryTakeaway: 'Overflow Guard + Proper Loop Invariant = Bug-free BS'
    },
    {
      id: 'why-use-binary-search',
      cardNumber: 3,
      badge: '03 · ADVANTAGES',
      title: 'Why Use Binary Search?',
      introText: 'Drastically speeds up query processing and minimizes compute cycles.',
      coreIdea: {
        part1: 'O(log N)',
        part2: 'Scale to Billions',
        result: 'Instant Answer'
      },
      keyPoints: [
        {
          num: '01',
          title: 'EXPONENTIAL SPEEDUP',
          text: 'Reduces N steps to log2(N) steps.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'CONSTANT SPACE O(1)',
          text: 'Requires no extra heap or stack memory.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'OPTIMIZATION PROBLEMS',
          text: 'Solves "Min capacity to ship" or "Koko eating speed" in O(N log K).',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '04',
          title: 'LOWER / UPPER BOUNDS',
          text: 'Counts duplicates in O(log N) instead of O(N).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: [10, 20, 30, 40],
        steps: [
          { left: 0, right: 3, label: 'N = 1,000,000 takes only 20 iterations' }
        ]
      },
      memoryTakeaway: 'Logarithmic Scalability O(log N) + Zero Overhead O(1)'
    },
    {
      id: 'when-to-use-binary-search',
      cardNumber: 4,
      badge: '04 · APPLICABILITY',
      title: 'When to Use Binary Search?',
      introText: 'Identify problem patterns where binary search yields the fastest solution.',
      coreIdea: {
        part1: 'Sorted Data',
        part2: 'Monotonic Function',
        result: 'BS Applied'
      },
      keyPoints: [
        {
          num: '01',
          title: 'SORTED ARRAY SEARCH',
          text: 'Standard search for target value or lower/upper bound.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'ROTATED SORTED ARRAYS',
          text: 'Search in arrays shifted around unknown pivot index.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'BINARY SEARCH ON ANSWER',
          text: 'Find minimum/maximum valid threshold parameter.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'PEAK & MATRIX SEARCH',
          text: 'Find local peak or navigate row/column sorted grids.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: [4, 5, 6, 0, 1, 2],
        steps: [
          { left: 0, right: 5, label: 'Rotated sorted array search' }
        ]
      },
      memoryTakeaway: 'Monotonic Condition -> Binary Search Applicable'
    },
    {
      id: 'how-it-works',
      cardNumber: 5,
      badge: '05 · MECHANICS',
      title: 'How It Works',
      introText: 'Detailed 3-step loop mechanism.',
      coreIdea: {
        part1: 'mid = low+(high-low)/2',
        part2: 'Compare Target',
        result: 'Adjust Bounds'
      },
      keyPoints: [
        {
          num: '01',
          title: 'CALCULATE MID',
          text: 'Find middle index mid = low + (high - low) / 2.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'CHECK MATCH',
          text: 'If nums[mid] == target, return mid immediately.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'ADJUST BOUNDARIES',
          text: 'If nums[mid] < target set low = mid + 1 else high = mid - 1.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '04',
          title: 'TERMINATION',
          text: 'If low > high, element is not present; return -1.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        }
      ],
      pointerVisual: {
        arrayValues: [1, 3, 5, 7, 9],
        steps: [
          { left: 0, right: 4, label: 'Step 1: mid=2 (val=5)' },
          { left: 3, right: 4, label: 'Step 2: mid=3 (val=7)' }
        ]
      },
      memoryTakeaway: 'Calculate Mid -> Compare -> Shift Pointer past Mid'
    },
    {
      id: 'patterns-types',
      cardNumber: 6,
      badge: '06 · PATTERNS',
      title: 'Patterns / Types',
      introText: '5 core sub-patterns of binary search.',
      coreIdea: {
        part1: '5 Sub-patterns',
        part2: 'Problem Recognition',
        result: 'Optimal Template'
      },
      keyPoints: [
        {
          num: '01',
          title: 'STANDARD SEARCH',
          text: 'Exact match lookup in sorted array.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'LOWER / UPPER BOUND',
          text: 'First element >= target or first element > target.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'ROTATED ARRAY SEARCH',
          text: 'Determine sorted half, check boundary bounds.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'BS ON ANSWER',
          text: 'Search over solution space [min_capacity, max_capacity].',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['Standard', 'Bound', 'Rotated', 'Answer'],
        steps: [
          { left: 0, right: 3, label: 'Match problem type to BS sub-pattern' }
        ]
      },
      memoryTakeaway: 'Standard | Bounds | Rotated | BS on Answer | Peak Finding'
    },
    {
      id: 'complexity',
      cardNumber: 7,
      badge: '07 · COMPLEXITY',
      title: 'Complexity Analysis',
      introText: 'Time and space bounds across binary search variants.',
      coreIdea: {
        part1: 'O(log N) Time',
        part2: 'O(1) Space',
        result: 'Ultra Fast'
      },
      keyPoints: [
        {
          num: '01',
          title: 'ITERATIVE TIME: O(log N)',
          text: 'Halving N gives log2(N) maximum iterations.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'ITERATIVE SPACE: O(1)',
          text: 'Only uses low, high, mid integer variables.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: 'RECURSIVE SPACE: O(log N)',
          text: 'Call stack depth reaches log N in recursive version.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'BS ON ANSWER TIME',
          text: 'O(N log(Max - Min)) where N is cost of check function.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['O(log N)', 'O(1)', 'O(log N)', 'O(N log K)'],
        steps: [
          { left: 0, right: 3, label: 'Iterative BS gives optimal O(1) space' }
        ]
      },
      memoryTakeaway: 'Time: O(log N) | Space: O(1) Iterative'
    },
    {
      id: 'edge-cases',
      cardNumber: 8,
      badge: '08 · EDGE CASES',
      title: 'Important Edge Cases & Pitfalls',
      introText: 'Common bugs leading to infinite loops or out-of-bounds access.',
      coreIdea: {
        part1: 'Infinite Loops',
        part2: 'Mid Formula',
        result: 'Guard Checks'
      },
      keyPoints: [
        {
          num: '01',
          title: 'INFINITE LOOP (mid = low)',
          text: 'When low + 1 == high, mid = low can loop infinitely if low is not updated to mid + 1.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '02',
          title: 'INTEGER OVERFLOW IN MID',
          text: '(low + high) overflows 32-bit int. Always use low + (high - low) / 2.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '03',
          title: 'DUPLICATES IN ROTATED ARRAY',
          text: 'When nums[low] == nums[mid] == nums[high], shrink low++ and high--.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'OFF-BY-ONE IN BOUNDS',
          text: 'Carefully check whether return value is low, high, or ans variable.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['Overflow', 'InfLoop', 'Duplicates', 'OffByOne'],
        steps: [
          { left: 0, right: 3, label: 'Always update pointer past mid (low = mid + 1)' }
        ]
      },
      memoryTakeaway: 'Use low + (high-low)/2 -> Move past mid -> Handle duplicate rotated'
    },
    {
      id: 'language-syntax',
      cardNumber: 9,
      badge: '09 · SYNTAX REFERENCE',
      title: 'Language Syntax',
      introText: 'Built-in binary search utilities across C++, Java, Python, and JavaScript.',
      isSyntaxCard: true,
      syntaxData: {
        'C++': `// Standard Lower & Upper Bound
vector<int> nums = {1, 3, 5, 7, 9};

// First element >= target
auto it1 = lower_bound(nums.begin(), nums.end(), 5);
int idx1 = distance(nums.begin(), it1); // 2

// First element > target
auto it2 = upper_bound(nums.begin(), nums.end(), 5);
int idx2 = distance(nums.begin(), it2); // 3

// Binary Search Existence Check
bool exists = binary_search(nums.begin(), nums.end(), 5);`,
        'Java': `// Arrays & Collections Binary Search
int[] nums = {1, 3, 5, 7, 9};
int idx = Arrays.binarySearch(nums, 5); // returns 2

// If not found, returns (-(insertion point) - 1)
int notFound = Arrays.binarySearch(nums, 4); // returns -3`,
        'Python': `import bisect

nums = [1, 3, 5, 7, 9]

# bisect_left: insertion point for x to maintain sorted order
idx1 = bisect.bisect_left(nums, 5) # 2

# bisect_right: insertion point after equal elements
idx2 = bisect.bisect_right(nums, 5) # 3`,
        'JavaScript': `// Custom Binary Search Implementation
function binarySearch(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
      }
    },
    {
      id: 'quick-memory',
      cardNumber: 10,
      badge: '10 · RECAP',
      title: 'Quick Memory / Takeaway',
      introText: 'Cheat sheet recap for binary search technical interviews.',
      coreIdea: {
        part1: 'O(log N)',
        part2: 'Halve Space',
        result: 'Mastered'
      },
      keyPoints: [
        {
          num: '01',
          title: 'MID FORMULA',
          text: 'mid = low + (high - low) / 2 prevents int overflow.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'STANDARD LOOP',
          text: 'low <= high, low = mid + 1, high = mid - 1.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: 'BOUNDS',
          text: 'Lower bound: first idx where val >= target.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'BS ON ANSWER',
          text: 'Search over solution domain [min_val, max_val].',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['MidMath', 'Loop', 'Bounds', 'Answer'],
        steps: [
          { left: 0, right: 3, label: 'Master Binary Search for coding interviews' }
        ]
      },
      memoryTakeaway: 'mid = low + (high-low)/2 -> Move past mid -> Monotonic property check'
    }
  ]
};
