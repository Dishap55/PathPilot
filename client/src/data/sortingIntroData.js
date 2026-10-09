/**
 * SORTING ALGORITHMS 10-CARD INTRODUCTION DATA DEFINITION
 * Reusable data structure for DSA → Sorting → Introduction Depth Carousel.
 */
export const SORTING_INTRO_DATA = {
  topicId: 'sorting',
  topicName: 'Sorting Algorithms',
  subtitle: 'Master comparison and linear sorting techniques that reduce problem complexity from O(N²) to O(N log N).',
  cards: [
    {
      id: 'what-is-sorting',
      cardNumber: 1,
      badge: '01 · CORE CONCEPT',
      title: 'What is Sorting?',
      introText: 'Sorting is the process of arranging elements in a specific order (ascending or descending) based on a comparison key.',
      coreIdea: {
        part1: 'Unordered Input',
        part2: 'Compare & Rearrange',
        result: 'Sorted Output'
      },
      keyPoints: [
        {
          num: '01',
          title: 'ORDERED STRUCTURE',
          text: 'Converts unstructured collections into predictable sequences.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'UNLOCKS FAST ALGORITHMS',
          text: 'Sorting enables Binary Search O(log N) and Two Pointers O(N).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'STABILITY IN SORTING',
          text: 'A stable sort preserves original order of equal elements.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '04',
          title: 'IN-PLACE VS AUXILIARY',
          text: 'In-place sorts use O(1) space; out-of-place use O(N) memory.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        arrayValues: [5, 2, 8, 1],
        steps: [
          { left: 0, right: 3, label: 'Unsorted: [5, 2, 8, 1]' },
          { left: 1, right: 3, label: 'Comparing adjacent elements...' },
          { left: 0, right: 3, label: 'Sorted: [1, 2, 5, 8]' }
        ]
      },
      memoryTakeaway: 'Unordered Input -> Compare & Swap -> Sorted Invariant'
    },
    {
      id: 'key-points',
      cardNumber: 2,
      badge: '02 · KEY SUMMARY',
      title: 'Key Points',
      introText: 'Essential principles governing comparison lower bounds and sorting trade-offs.',
      coreIdea: {
        part1: 'O(N log N)',
        part2: 'Comparison Bound',
        result: 'Stability'
      },
      keyPoints: [
        {
          num: '01',
          title: 'O(N log N) LOWER BOUND',
          text: 'Comparison-based sorting cannot beat O(N log N) in worst case.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'LINEAR SORTS: O(N)',
          text: 'Counting / Bucket sort achieve O(N) by exploiting value bounds.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'PIVOT SELECTION',
          text: 'QuickSort efficiency depends heavily on good pivot choices.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'TIMSORT STANDARD',
          text: 'C++ std::sort (IntroSort) and Java/Python (TimSort) power built-ins.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: [1, 2, 5, 8],
        steps: [
          { left: 0, right: 3, label: 'Stability preserves equal element relative position' }
        ]
      },
      memoryTakeaway: 'Comparison Limit: O(N log N) | Non-Comparison Limit: O(N)'
    },
    {
      id: 'why-use-sorting',
      cardNumber: 3,
      badge: '03 · ADVANTAGES',
      title: 'Why Use Sorting?',
      introText: 'Sorting transforms complex non-linear problems into straightforward sequential passes.',
      coreIdea: {
        part1: 'Pre-process',
        part2: 'Simplify Search',
        result: 'Group Equal'
      },
      keyPoints: [
        {
          num: '01',
          title: 'ELIMINATE BRUTE FORCE',
          text: 'Reduces O(N²) pair searching to O(N log N) sort + O(N) scan.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'EASY DUPLICATE DETECTION',
          text: 'Identifies identical or overlapping items by placing them adjacent.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'INTERVAL MERGING',
          text: 'Sorting by start time simplifies interval overlap checks.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '04',
          title: 'GREEDY ALGORITHMS',
          text: 'Greedy choices (e.g. interval scheduling) require sorted input.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: [2, 2, 4, 9],
        steps: [
          { left: 0, right: 3, label: 'Duplicates sit next to each other' }
        ]
      },
      memoryTakeaway: 'Sort First -> Enable Binary Search & Two Pointers -> Fast Solution'
    },
    {
      id: 'when-to-use-sorting',
      cardNumber: 4,
      badge: '04 · APPLICABILITY',
      title: 'When to Use Sorting?',
      introText: 'Recognize interview cues that signal sorting as an optimal preprocessing step.',
      coreIdea: {
        part1: 'Intervals',
        part2: 'Kth Element',
        result: 'Sort Signal'
      },
      keyPoints: [
        {
          num: '01',
          title: 'INTERVAL PROBLEMS',
          text: 'Merge intervals, meeting rooms, activity selection.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'PAIR & TRIPLET SUMS',
          text: '2Sum II, 3Sum, 4Sum require sorted arrays for Two Pointers.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'K-TH LARGEST / SMALLEST',
          text: 'QuickSelect or Heap sorting extracts K-th values efficiently.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'CUSTOM RANKINGS',
          text: 'Sort objects by multiple properties using custom comparators.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: [1, 3, 5, 7],
        steps: [
          { left: 0, right: 3, label: 'Ready for O(N) Two Pointers scan' }
        ]
      },
      memoryTakeaway: 'Overlapping Intervals + Target Sums + K-th Element = Sort Cue'
    },
    {
      id: 'how-it-works',
      cardNumber: 5,
      badge: '05 · MECHANICS',
      title: 'How It Works',
      introText: 'Understanding Divide-and-Conquer vs Comparison Swap mechanics.',
      coreIdea: {
        part1: 'Divide Half',
        part2: 'Sort Halves',
        result: 'Merge Sorted'
      },
      keyPoints: [
        {
          num: '01',
          title: 'MERGE SORT',
          text: 'Splits array down to single elements, then merges sorted pairs.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'QUICK SORT',
          text: 'Selects pivot, places elements < pivot left and > pivot right.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'COUNTING SORT',
          text: 'Creates frequency array size MAX_VAL, reconstructs sorted array.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '04',
          title: 'HEAP SORT',
          text: 'Builds Max-Heap, repeatedly extracts maximum to end of array.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        }
      ],
      pointerVisual: {
        arrayValues: [5, 2, 8, 1],
        steps: [
          { left: 0, right: 1, label: 'Split [5, 2] and [8, 1]' },
          { left: 0, right: 3, label: 'Merge into [1, 2, 5, 8]' }
        ]
      },
      memoryTakeaway: 'Merge Sort (Stable, O(N log N)) | QuickSort (In-place, O(N log N) avg)'
    },
    {
      id: 'patterns-types',
      cardNumber: 6,
      badge: '06 · PATTERNS',
      title: 'Patterns / Types',
      introText: '4 core categories of sorting techniques for coding rounds.',
      coreIdea: {
        part1: '4 Categories',
        part2: 'Algorithm Choice',
        result: 'Target Complexity'
      },
      keyPoints: [
        {
          num: '01',
          title: 'COMPARISON SORTING',
          text: 'Merge Sort, Quick Sort, Heap Sort (O(N log N)).',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'NON-COMPARISON SORTING',
          text: 'Counting Sort, Bucket Sort, Radix Sort (O(N + K)).',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'CUSTOM COMPARATORS',
          text: 'Lambda functions for struct / multi-attribute ordering.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'PARTITIONING SORTS',
          text: 'Dutch National Flag 3-way partition (0s, 1s, 2s).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['Merge', 'Quick', 'Count', 'Bucket'],
        steps: [
          { left: 0, right: 3, label: 'Select appropriate sorting family' }
        ]
      },
      memoryTakeaway: 'Comparison O(N log N) vs Non-Comparison O(N) bounded range'
    },
    {
      id: 'complexity',
      cardNumber: 7,
      badge: '07 · COMPLEXITY',
      title: 'Complexity Analysis',
      introText: 'Comparing time and space performance across sorting algorithms.',
      coreIdea: {
        part1: 'Merge: O(N log N)',
        part2: 'Quick: O(N log N)',
        result: 'Count: O(N)'
      },
      keyPoints: [
        {
          num: '01',
          title: 'MERGE SORT: O(N log N)',
          text: 'Always O(N log N) time, O(N) space.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'QUICK SORT: O(N log N) AVG',
          text: 'O(N log N) average, O(N²) worst if poor pivot, O(log N) space.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '03',
          title: 'HEAP SORT: O(N log N)',
          text: 'O(N log N) time, O(1) auxiliary space (not stable).',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '04',
          title: 'COUNTING SORT: O(N + K)',
          text: 'Linear O(N + K) time when max value K is small.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['Merge', 'Quick', 'Heap', 'Count'],
        steps: [
          { left: 0, right: 3, label: 'Merge: stable O(N log N) | Heap: O(1) space' }
        ]
      },
      memoryTakeaway: 'Merge Sort = Stable | Heap Sort = O(1) space | Counting = O(N)'
    },
    {
      id: 'edge-cases',
      cardNumber: 8,
      badge: '08 · EDGE CASES',
      title: 'Important Edge Cases & Pitfalls',
      introText: 'Avoid common errors in sorting implementations.',
      coreIdea: {
        part1: 'Duplicates',
        part2: 'Pivot Worst Case',
        result: 'Strict Weak'
      },
      keyPoints: [
        {
          num: '01',
          title: 'DUPLICATE ELEMENTS',
          text: 'Ensure comparator handles equal values correctly (< vs <=).',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '02',
          title: 'WORST CASE QUICKSORT',
          text: 'Already-sorted arrays crash naive QuickSort into O(N²). Use random pivot.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '03',
          title: 'STRICT WEAK ORDERING',
          text: 'In C++, comparator MUST return false when elements are equal.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'LARGE VALUES IN COUNTING SORT',
          text: 'If K is 10⁹, counting sort uses too much memory. Fallback to map.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['Equals', 'Pivot', 'WeakOrd', 'LargeK'],
        steps: [
          { left: 0, right: 3, label: 'Use random pivot and strict weak ordering' }
        ]
      },
      memoryTakeaway: 'Random Pivot -> Strict Weak Comparator -> Watch K size'
    },
    {
      id: 'language-syntax',
      cardNumber: 9,
      badge: '09 · SYNTAX REFERENCE',
      title: 'Language Syntax',
      introText: 'Built-in sorting and custom comparators across C++, Java, Python, and JavaScript.',
      isSyntaxCard: true,
      syntaxData: {
        'C++': `// Standard Ascending Sort
vector<int> nums = {5, 2, 8, 1};
sort(nums.begin(), nums.end());

// Custom Descending Lambda
sort(nums.begin(), nums.end(), [](int a, int b) {
    return a > b;
});

// Struct / Pair Sorting
struct Interval { int start, end; };
sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
    return a.start < b.start;
});`,
        'Java': `// Arrays & Collections Sort
int[] nums = {5, 2, 8, 1};
Arrays.sort(nums);

// List Sorting with Comparator
List<int[]> intervals = new ArrayList<>();
intervals.sort((a, b) -> Integer.compare(a[0], b[0]));

// Reverse Order
Collections.sort(list, Collections.reverseOrder());`,
        'Python': `# In-place Sort
nums = [5, 2, 8, 1]
nums.sort()

# Return New Sorted List
sorted_nums = sorted(nums, reverse=True)

# Custom Key Function
intervals.sort(key=lambda x: x[0])`,
        'JavaScript': `// Numeric Ascending Sort
const nums = [5, 2, 8, 1];
nums.sort((a, b) => a - b);

// Descending Sort
nums.sort((a, b) => b - a);

// Object / Array Sorting
intervals.sort((a, b) => a[0] - b[0]);`
      }
    },
    {
      id: 'quick-memory',
      cardNumber: 10,
      badge: '10 · RECAP',
      title: 'Quick Memory / Takeaway',
      introText: 'Cheat sheet for sorting algorithms in coding interviews.',
      coreIdea: {
        part1: 'O(N log N)',
        part2: 'Pre-process',
        result: 'Mastered'
      },
      keyPoints: [
        {
          num: '01',
          title: 'MERGE SORT',
          text: 'O(N log N) guaranteed, stable, extra O(N) space.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'QUICK SORT',
          text: 'O(N log N) average, O(1) auxiliary space, in-place.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: 'COUNTING / BUCKET',
          text: 'O(N) time when max value range is small.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'DUTCH FLAG',
          text: '3-pointer O(N) in-place partition for 3 distinct values.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['Merge', 'Quick', 'Count', 'Dutch'],
        steps: [
          { left: 0, right: 3, label: 'Master Sorting for technical interviews' }
        ]
      },
      memoryTakeaway: 'O(N log N) Standard -> Stable vs In-place Trade-off -> Linear Range Sort'
    }
  ]
};
