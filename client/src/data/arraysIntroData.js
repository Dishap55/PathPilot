/**
 * ARRAYS & STRINGS 10-CARD INTRODUCTION DATA DEFINITION
 * Reusable data structure for DSA → Arrays → Introduction Depth Carousel.
 */
export const ARRAYS_INTRO_DATA = {
  topicId: 'arrays',
  topicName: 'Arrays & Strings',
  subtitle: 'Master the fundamental contiguous memory structure powering modern computing and algorithms.',
  cards: [
    {
      id: 'what-is-arrays',
      cardNumber: 1,
      badge: '01 · CORE CONCEPT',
      title: 'What are Arrays & Strings?',
      introText: 'An array is a contiguous block of memory storing items of the same type under a single variable name, indexed by integers starting at 0.',
      coreIdea: {
        part1: 'Contiguous Memory',
        part2: 'Index Access',
        result: 'Arrays & Strings'
      },
      keyPoints: [
        {
          num: '01',
          title: 'CONTIGUOUS LAYOUT',
          text: 'Elements sit side-by-side in computer memory.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'INDEX-BASED LOOKUP',
          text: 'Any element can be fetched in O(1) constant time.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: '0-BASED INDEXING',
          text: 'First element sits at index 0, last element sits at index N-1.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '04',
          title: 'STRINGS ARE ARRAYS',
          text: 'A string is a sequence of characters stored in array memory.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['P', 'A', 'T', 'H'],
        steps: [
          { left: 0, right: 3, label: 'Memory addresses: 0x100, 0x104, 0x108, 0x10C' },
          { left: 1, right: 3, label: 'Access index 1 -> address = base + 1 * size' },
          { left: 2, right: 3, label: 'Instant O(1) random access' }
        ]
      },
      memoryTakeaway: 'Contiguous Memory -> Index Offset Math -> Instant O(1) Access'
    },
    {
      id: 'key-points',
      cardNumber: 2,
      badge: '02 · KEY SUMMARY',
      title: 'Key Points',
      introText: 'Essential principles to keep in mind when working with array memory and indexing.',
      coreIdea: {
        part1: 'Fixed / Dynamic',
        part2: 'Cache Locality',
        result: 'High Speed'
      },
      keyPoints: [
        {
          num: '01',
          title: 'FIXED VS DYNAMIC',
          text: 'Static arrays have fixed capacity; dynamic vectors grow automatically.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'CPU CACHE FRIENDLY',
          text: 'Contiguous elements load into fast L1/L2 CPU caches together.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'EXPENSIVE INSERTIONS',
          text: 'Inserting or deleting in the middle requires shifting N elements.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '04',
          title: 'IMMUTABLE STRINGS',
          text: 'In Java/Python, strings are immutable; modifying creates new strings.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        arrayValues: [10, 20, 30, 40],
        steps: [
          { left: 0, right: 3, label: 'Index 0 to 3 stored sequentially' }
        ]
      },
      memoryTakeaway: 'Fast Reads O(1) | Slow Middle Inserter O(N) | Cache Friendly'
    },
    {
      id: 'why-use-arrays',
      cardNumber: 3,
      badge: '03 · ADVANTAGES',
      title: 'Why Use Arrays?',
      introText: 'Arrays provide unmatched random-access speed and cache efficiency compared to linked node structures.',
      coreIdea: {
        part1: 'O(1) Access',
        part2: 'Minimal Overhead',
        result: 'Optimal Cache'
      },
      keyPoints: [
        {
          num: '01',
          title: 'O(1) RANDOM ACCESS',
          text: 'Jump directly to element at index i using pointer arithmetic.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'ZERO POINTER OVERHEAD',
          text: 'Unlike linked lists, array elements do not waste memory on pointers.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'FOUNDATION FOR OTHER DATA STRUCTURES',
          text: 'Stacks, Queues, Heaps, Hash Tables, and Graphs rely on arrays.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '04',
          title: 'SIMPLE ITERATION',
          text: 'Simple for-loops traverse contiguous memory effortlessly.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: [5, 12, 19, 27],
        steps: [
          { left: 0, right: 3, label: 'Iterate with loop i = 0 to N-1' }
        ]
      },
      memoryTakeaway: 'Maximum Performance + Minimum Overhead = Foundation of DSA'
    },
    {
      id: 'when-to-use-arrays',
      cardNumber: 4,
      badge: '04 · APPLICABILITY',
      title: 'When to Use Arrays?',
      introText: 'Use arrays when you know element count or need fast index lookups and linear scanning.',
      coreIdea: {
        part1: 'Known Size',
        part2: 'Index Lookups',
        result: 'Use Arrays'
      },
      keyPoints: [
        {
          num: '01',
          title: 'KNOWN ELEMENT COUNT',
          text: 'When dataset size is fixed or predictably bounded.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'FREQUENCY LOOKUP TABLES',
          text: 'Use character count array of size 26 for string problems.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: '2D GRIDS & MATRICES',
          text: 'Represent images, maps, game boards, and dynamic programming tables.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'IN-PLACE ALGORITHMS',
          text: 'Sort, reverse, or rearrange without extra space O(1).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: [1, 0, 1, 1],
        steps: [
          { left: 0, right: 3, label: 'Frequency array or 2D grid matrix' }
        ]
      },
      memoryTakeaway: 'Sequential access + Fixed size + Grid representation = Array Choice'
    },
    {
      id: 'how-it-works',
      cardNumber: 5,
      badge: '05 · MECHANICS',
      title: 'How It Works',
      introText: 'Array indexing uses pointer offset math to calculate memory locations instantaneously.',
      coreIdea: {
        part1: 'Base Address',
        part2: 'Offset = i * size',
        result: 'Address Found'
      },
      keyPoints: [
        {
          num: '01',
          title: 'BASE ADDRESS',
          text: 'Memory location of index 0 is stored as base pointer.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'OFFSET FORMULA',
          text: 'Address(nums[i]) = BaseAddress + (i * ElementSize).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'DYNAMIC RESIZING',
          text: 'When vector fills up, it allocates double capacity and copies elements.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '04',
          title: 'AMORTIZED O(1) PUSH',
          text: 'Doubling strategy guarantees O(1) average push_back time.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        }
      ],
      pointerVisual: {
        arrayValues: [100, 104, 108, 112],
        steps: [
          { left: 0, right: 3, label: 'Address = 100 + i * 4 bytes' }
        ]
      },
      memoryTakeaway: 'Base Address + (i * Size) = Direct Memory Jump'
    },
    {
      id: 'patterns-types',
      cardNumber: 6,
      badge: '06 · PATTERNS',
      title: 'Patterns / Types',
      introText: '8 primary algorithmic patterns used to solve array & string problems.',
      coreIdea: {
        part1: '8 Patterns',
        part2: 'Algorithmic Toolset',
        result: 'Problem Solved'
      },
      keyPoints: [
        {
          num: '01',
          title: 'PREFIX SUM',
          text: 'Precompute cumulative sums for O(1) range queries.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'FREQUENCY COUNTING',
          text: 'Use array as hash map for character or integer counts.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'KADANE\'S ALGORITHM',
          text: 'Find maximum subarray sum in O(N) single pass.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'IN-PLACE OPERATIONS',
          text: 'Modify elements, swap, or rotate with O(1) extra space.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['P', 'F', 'K', 'M'],
        steps: [
          { left: 0, right: 3, label: 'Prefix Sum | Frequency | Kadane | Matrix' }
        ]
      },
      memoryTakeaway: 'Recognize the pattern -> Apply standard framework -> Optimal solution'
    },
    {
      id: 'complexity',
      cardNumber: 7,
      badge: '07 · COMPLEXITY',
      title: 'Complexity Analysis',
      introText: 'Time and space trade-offs across common array operations.',
      coreIdea: {
        part1: 'O(1) Access',
        part2: 'O(N) Search',
        result: 'O(N) Shift'
      },
      keyPoints: [
        {
          num: '01',
          title: 'READ / ACCESS: O(1)',
          text: 'Fetching nums[i] takes constant time.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'SEARCH: O(N)',
          text: 'Linear search scans N elements in worst case.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '03',
          title: 'INSERT / DELETE: O(N)',
          text: 'Shifting remaining elements takes linear time.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '04',
          title: 'APPEND: O(1) AMORTIZED',
          text: 'Pushing to end takes O(1) average time in dynamic arrays.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        }
      ],
      pointerVisual: {
        arrayValues: [1, 2, 3, 4],
        steps: [
          { left: 0, right: 3, label: 'Access: O(1) | Search: O(N) | Shift: O(N)' }
        ]
      },
      memoryTakeaway: 'Instant Lookup O(1) | Linear Search O(N) | Shifting Cost O(N)'
    },
    {
      id: 'edge-cases',
      cardNumber: 8,
      badge: '08 · EDGE CASES',
      title: 'Important Edge Cases & Pitfalls',
      introText: 'Critical boundary conditions that cause crashes or wrong answers.',
      coreIdea: {
        part1: 'Off-By-One',
        part2: 'Out-Of-Bounds',
        result: 'Guard Checks'
      },
      keyPoints: [
        {
          num: '01',
          title: 'EMPTY ARRAY OR N = 0',
          text: 'Always check if array is empty before accessing nums[0].',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '02',
          title: 'OUT-OF-BOUNDS INDEXING',
          text: 'Accessing index N causes Segmentation Fault or IndexError.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '03',
          title: 'INTEGER OVERFLOW IN SUM',
          text: 'Use 64-bit integer (long long / long) when summing large arrays.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'STRING IMMUTABILITY',
          text: 'In Java/Python, repeated string concatenation creates O(N²) time.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['Empty', 'N=1', 'Overflow', 'Bounds'],
        steps: [
          { left: 0, right: 3, label: 'Check N == 0 and bounds i < N always' }
        ]
      },
      memoryTakeaway: 'Guard Empty Array -> Verify Indices < N -> Watch Overflow'
    },
    {
      id: 'language-syntax',
      cardNumber: 9,
      badge: '09 · SYNTAX REFERENCE',
      title: 'Language Syntax',
      introText: 'Standard declaration and methods across C++, Java, Python, and JavaScript.',
      isSyntaxCard: true,
      syntaxData: {
        'C++': `// Declaration & Initialization
vector<int> nums = {1, 2, 3, 4};

// Access & Size
int first = nums[0];
int n = nums.size();

// Append & Remove
nums.push_back(5);
nums.pop_back();

// Iterate
for (int i = 0; i < nums.size(); i++) { /* ... */ }`,
        'Java': `// Declaration & Initialization
int[] nums = new int[]{1, 2, 3, 4};
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4));

// Access & Size
int first = nums[0];
int n = nums.length;

// Append (List)
list.add(5);

// Iterate
for (int num : nums) { /* ... */ }`,
        'Python': `# Declaration & Initialization
nums = [1, 2, 3, 4]

# Access & Size
first = nums[0]
n = len(nums)

# Append & Remove
nums.append(5)
nums.pop()

# List Comprehension
squares = [x**2 for x in nums]`,
        'JavaScript': `// Declaration & Initialization
const nums = [1, 2, 3, 4];

// Access & Size
const first = nums[0];
const n = nums.length;

// Append & Remove
nums.push(5);
nums.pop();

// Array Methods
const doubled = nums.map(x => x * 2);`
      }
    },
    {
      id: 'quick-memory',
      cardNumber: 10,
      badge: '10 · RECAP',
      title: 'Quick Memory / Takeaway',
      introText: 'Cheat sheet recap for array and string technical interviews.',
      coreIdea: {
        part1: 'Contiguous',
        part2: 'O(1) Access',
        result: 'Mastered'
      },
      keyPoints: [
        {
          num: '01',
          title: 'ACCESS',
          text: 'Constant time O(1) index lookup.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'PATTERNS',
          text: 'Prefix Sum, Kadane, Frequency Counting, In-Place Swaps.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: 'MEMORY',
          text: 'Contiguous memory layout provides maximum CPU cache locality.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'TRAPS',
          text: 'Watch for off-by-one errors and integer overflow in sums.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        arrayValues: ['O(1)', 'O(N)', 'Cache', 'Prefix'],
        steps: [
          { left: 0, right: 3, label: 'Master Arrays for technical interviews' }
        ]
      },
      memoryTakeaway: 'Contiguous Memory + O(1) Indexing + Standard Patterns = High Score'
    }
  ]
};
