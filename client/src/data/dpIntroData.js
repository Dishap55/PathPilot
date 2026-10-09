/**
 * DYNAMIC PROGRAMMING 10-CARD INTRODUCTION DATA DEFINITION
 * Reusable data structure for DSA → Dynamic Programming → Introduction Depth Carousel.
 */
export const DP_INTRO_DATA = {
  topicId: 'dp',
  topicName: 'Dynamic Programming',
  subtitle: 'Master breaking complex problems into overlapping subproblems with memoization and tabulation.',
  cards: [
    {
      id: 'what-is-dp',
      cardNumber: 1,
      badge: '01 · CORE CONCEPT',
      title: 'What is Dynamic Programming?',
      introText: 'Dynamic Programming (DP) is an algorithmic technique for solving optimization and counting problems by breaking them into overlapping subproblems and storing subproblem results.',
      coreIdea: {
        part1: 'Overlapping Subproblems',
        part2: 'Optimal Substructure',
        result: 'Store & Reuse'
      },
      keyPoints: [
        {
          num: '01',
          title: 'REDUCES EXPONENTIAL TO POLYNOMIAL',
          text: 'Turns O(2^N) brute-force recursion into O(N) or O(N²) DP.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'MEMOIZATION (TOP-DOWN)',
          text: 'Recursion + Hash Map / Cache array to store function call results.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'TABULATION (BOTTOM-UP)',
          text: 'Iterative table filling from base cases up to target answer.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '04',
          title: 'DONT RECOMPUTE',
          text: 'Each unique subproblem state is computed exactly once.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        dpTable: [{ idx: 0, val: 0 }, { idx: 1, val: 1 }, { idx: 2, val: 1 }, { idx: 3, val: 2 }, { idx: 4, val: 3 }, { idx: 5, val: 5 }],
        steps: [
          { activeIdx: 3, formula: 'dp[i] = dp[i-1] + dp[i-2]', label: 'Fibonacci DP: Fib(3) computed once and retrieved from memo table in O(1)' }
        ]
      },
      memoryTakeaway: 'Overlapping Subproblems + Memoization Table = DP Efficiency'
    },
    {
      id: 'key-points',
      cardNumber: 2,
      badge: '02 · KEY SUMMARY',
      title: 'Key Points',
      introText: 'The two fundamental pillars required for dynamic programming to apply.',
      coreIdea: {
        part1: 'Optimal Substructure',
        part2: 'Overlapping Subproblems',
        result: 'DP Applicable'
      },
      keyPoints: [
        {
          num: '01',
          title: 'OPTIMAL SUBSTRUCTURE',
          text: 'An optimal solution to the problem contains optimal solutions to its subproblems.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'OVERLAPPING SUBPROBLEMS',
          text: 'The same recursive subproblems are encountered repeatedly during recursion.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'STATE DEFINITION',
          text: 'Clear definition of what dp[i] or dp[i][j] represents.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'STATE TRANSITION FORMULA',
          text: 'Mathematical equation deriving dp[curr] from dp[prev].',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        dpTable: [{ idx: 0, val: 0 }, { idx: 1, val: 1 }, { idx: 2, val: 1 }, { idx: 3, val: 2 }, { idx: 4, val: 3 }, { idx: 5, val: 5 }],
        steps: [
          { activeIdx: 2, formula: 'dp[i] = min(dp[i-c] + 1)', label: '4-Step DP Framework: State -> Recurrence Transition -> Base Cases -> Target' }
        ]
      },
      memoryTakeaway: 'Define State -> Formulate Recurrence -> Initialize Base Cases -> Tabulate'
    },
    {
      id: 'why-use-dp',
      cardNumber: 3,
      badge: '03 · ADVANTAGES',
      title: 'Why Use Dynamic Programming?',
      introText: 'Drastically reduces time complexity by trading memory for time.',
      coreIdea: {
        part1: 'Trade Memory',
        part2: 'Save Computations',
        result: 'Optimal Time'
      },
      keyPoints: [
        {
          num: '01',
          title: 'ELIMINATES REPEATED WORK',
          text: 'Cuts Fibonacci recursion from 2^N operations to N operations.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'GUARANTEES GLOBAL OPTIMALITY',
          text: 'Unlike greedy approaches, DP considers all valid subproblem choices.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'SPACE REDUCTION TRICK',
          text: 'Many 1D/2D DP tables can be space-optimized down to O(1) or O(N).',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '04',
          title: 'INTERVIEW ESSENTIAL',
          text: 'Powers core interview topics: Knapsack, LCS, LIS, and Grid paths.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        dpTable: [{ idx: 0, val: 0 }, { idx: 1, val: 1 }, { idx: 2, val: 1 }, { idx: 3, val: 2 }, { idx: 4, val: 3 }, { idx: 5, val: 5 }],
        steps: [
          { activeIdx: 4, formula: 'dp[i] = dp[i-1] + dp[i-2]', label: 'Exponential O(2^N) recursion collapses into linear O(N) table lookups!' }
        ]
      },
      memoryTakeaway: 'Trade Space for Time -> Guarantee Global Optimum -> Space Reduction'
    },
    {
      id: 'when-to-use-dp',
      cardNumber: 4,
      badge: '04 · APPLICABILITY',
      title: 'When to Use Dynamic Programming?',
      introText: 'Key question patterns that indicate dynamic programming.',
      coreIdea: {
        part1: 'Min / Max',
        part2: 'Total Ways',
        result: 'DP Indicator'
      },
      keyPoints: [
        {
          num: '01',
          title: 'MIN / MAX OPTIMIZATION',
          text: '"Find minimum cost", "Maximum profit", "Shortest path".',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'COUNTING COMBINATIONS',
          text: '"How many unique ways to reach step N?", "Number of paths".',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'SUBSTRING / SUBSEQUENCE',
          text: 'Longest Common Subsequence, Edit Distance, Palindromic Substrings.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'CHOICE DECISIONS AT EACH STEP',
          text: 'Take or leave item (Knapsack), rob or skip house (House Robber).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        dpTable: [{ idx: 0, val: 0 }, { idx: 1, val: 1 }, { idx: 2, val: 1 }, { idx: 3, val: 2 }, { idx: 4, val: 3 }, { idx: 5, val: 5 }],
        steps: [
          { activeIdx: 5, formula: 'dp[i] = dp[i-1] + dp[i-2]', label: 'Min/Max optimization or Total Ways problems signal Dynamic Programming' }
        ]
      },
      memoryTakeaway: 'Optimization (Min/Max) + Counting Ways + Sequence Matching = DP'
    },
    {
      id: 'how-it-works',
      cardNumber: 5,
      badge: '05 · MECHANICS',
      title: 'How It Works — The 4-Step Framework',
      introText: 'Master the universal 4-step system for solving any DP problem.',
      coreIdea: {
        part1: '1. State',
        part2: '2. Transition',
        result: '3. Base & 4. Answer'
      },
      keyPoints: [
        {
          num: '01',
          title: 'STEP 1: DEFINE STATE',
          text: 'What parameters uniquely identify a subproblem? (e.g. dp[i] = min coins for amount i).',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'STEP 2: RECURRENCE TRANSITION',
          text: 'How does dp[curr] relate to smaller states? (e.g. dp[i] = 1 + min(dp[i-coin])).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'STEP 3: BASE CASES',
          text: 'Initialize starting values (e.g. dp[0] = 0, dp[1] = 1).',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '04',
          title: 'STEP 4: TARGET ANSWER & ORDER',
          text: 'Determine computation order (bottom-up loop) and target cell dp[target].',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        }
      ],
      pointerVisual: {
        dpTable: [{ idx: 0, val: 0 }, { idx: 1, val: 1 }, { idx: 2, val: 1 }, { idx: 3, val: 2 }, { idx: 4, val: 3 }, { idx: 5, val: 5 }],
        steps: [
          { activeIdx: 1, formula: 'dp[0]=0, dp[1]=1', label: 'Tabulation loop fills table bottom-up from base cases dp[0]=0, dp[1]=1' }
        ]
      },
      memoryTakeaway: 'State -> Transition Formula -> Base Cases -> Final Table Output'
    },
    {
      id: 'patterns-types',
      cardNumber: 6,
      badge: '06 · PATTERNS',
      title: 'Patterns / Types',
      introText: '5 core categories of dynamic programming patterns.',
      coreIdea: {
        part1: '5 DP Families',
        part2: 'State Dimensions',
        result: 'Standard Formula'
      },
      keyPoints: [
        {
          num: '01',
          title: '1D DP (LINEAR)',
          text: 'Climbing Stairs, House Robber, Fibonacci numbers.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: '2D & GRID DP',
          text: 'Unique Paths, Minimum Path Sum in matrix.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'STRING / SUBSEQUENCE DP',
          text: 'LCS, Edit Distance, Longest Increasing Subsequence.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'KNAPSACK DP',
          text: '0/1 Knapsack, Unbounded Coin Change, Subset Sum Partition.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        dpTable: [{ idx: 0, val: 0 }, { idx: 1, val: 1 }, { idx: 2, val: 1 }, { idx: 3, val: 2 }, { idx: 4, val: 3 }, { idx: 5, val: 5 }],
        steps: [
          { activeIdx: 3, formula: 'dp[i][j] = dp[i-1][j] + ...', label: 'DP Patterns: 1D DP, 2D Grid DP, Knapsack (0/1 & Unbounded), Subsequences' }
        ]
      },
      memoryTakeaway: '1D Linear | 2D Grid | Subsequence Matching | Knapsack | Partition'
    },
    {
      id: 'complexity',
      cardNumber: 7,
      badge: '07 · COMPLEXITY',
      title: 'Complexity Analysis',
      introText: 'Calculating time and space complexity for DP algorithms.',
      coreIdea: {
        part1: 'Time = States * Work',
        part2: 'Space = Table Size',
        result: 'Complexity'
      },
      keyPoints: [
        {
          num: '01',
          title: 'TIME FORMULA',
          text: 'Time Complexity = (Number of Unique States) * (Work done per state).',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: '1D DP TIME & SPACE',
          text: 'O(N) time and O(N) space (reduces to O(1) space with 2 variables).',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: '2D DP TIME & SPACE',
          text: 'O(M * N) time and O(M * N) space (reduces to O(N) space using 1D row).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'KNAPSACK TIME',
          text: 'Pseudo-polynomial O(N * Capacity) time and space.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        dpTable: [{ idx: 0, val: 0 }, { idx: 1, val: 1 }, { idx: 2, val: 1 }, { idx: 3, val: 2 }, { idx: 4, val: 3 }, { idx: 5, val: 5 }],
        steps: [
          { activeIdx: 4, formula: 'dp[i] = dp[i-1] + dp[i-2]', label: 'Time: O(N * States); Space: O(N) table (Optimizable to O(1) space)' }
        ]
      },
      memoryTakeaway: 'Time = States * Transition Work | Space Optimization = Previous Row Only'
    },
    {
      id: 'edge-cases',
      cardNumber: 8,
      badge: '08 · EDGE CASES',
      title: 'Important Edge Cases & Pitfalls',
      introText: 'Common mistakes that break dynamic programming solutions.',
      coreIdea: {
        part1: 'Uninitialized Memo',
        part2: 'Off-By-One',
        result: 'Guard Checks'
      },
      keyPoints: [
        {
          num: '01',
          title: 'UNINITIALIZED MEMO TABLE',
          text: 'Forgetting to fill memo table with -1 or null before top-down recursion.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '02',
          title: 'OFF-BY-ONE TABLE SIZES',
          text: 'For 1-based string indexing, allocate table size (M+1) x (N+1).',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '03',
          title: 'WRONG COMPUTATION ORDER',
          text: 'In bottom-up DP, ensure dependency states are calculated before dependent states.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'IMPOSSIBLE TARGET UNBOUNDED',
          text: 'Check if amount remains infinity when target is impossible to form.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        }
      ],
      pointerVisual: {
        dpTable: [{ idx: 0, val: 0 }, { idx: 1, val: 1 }, { idx: 2, val: 1 }, { idx: 3, val: 2 }, { idx: 4, val: 3 }, { idx: 5, val: 5 }],
        steps: [
          { activeIdx: 0, formula: 'dp[0] = 0', label: 'Edge cases: Base case initialization, index out-of-bounds, uninitialized memo array' }
        ]
      },
      memoryTakeaway: 'Fill Memo with -1 -> Size (N+1) -> Verify Computation Order'
    },
    {
      id: 'language-syntax',
      cardNumber: 9,
      badge: '09 · SYNTAX REFERENCE',
      title: 'Language Syntax',
      introText: 'DP Table declarations and memoization across C++, Java, Python, and JavaScript.',
      isSyntaxCard: true,
      syntaxData: {
        'C++': `// 1D Tabulation
vector<int> dp(n + 1, 0);
dp[1] = 1; dp[2] = 2;
for (int i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
}

// 2D Tabulation
vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));`,
        'Java': `// 1D Tabulation
int[] dp = new int[n + 1];
dp[1] = 1; dp[2] = 2;
for (int i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
}

// 2D Tabulation
int[][] dp = new int[m + 1][n + 1];`,
        'Python': `# Python Auto Memoization (@lru_cache)
from functools import lru_cache

@lru_cache(maxsize=None)
def dp(i):
    if i <= 2: return i
    return dp(i-1) + dp(i-2)

# 2D Tabulation
dp = [[0] * (n + 1) for _ in range(m + 1)]`,
        'JavaScript': `// 1D Tabulation
const dp = new Array(n + 1).fill(0);
dp[1] = 1; dp[2] = 2;
for (let i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
}

// 2D Tabulation
const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));`
      }
    },
    {
      id: 'quick-memory',
      cardNumber: 10,
      badge: '10 · RECAP',
      title: 'Quick Memory / Takeaway',
      introText: 'Cheat sheet for DP technical interview problems.',
      coreIdea: {
        part1: 'State & Transition',
        part2: 'Tabulate',
        result: 'Mastered'
      },
      keyPoints: [
        {
          num: '01',
          title: '4-STEP FRAMEWORK',
          text: '1. State, 2. Transition, 3. Base Case, 4. Answer.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: '1D LINEAR DP',
          text: 'dp[i] depends on constant number of previous values.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: 'UNBOUNDED KNAPSACK',
          text: 'Outer loop amount, inner loop coins: dp[a] = min(dp[a], 1 + dp[a - coin]).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'LCS MATRIX',
          text: 'Match: 1 + dp[i+1][j+1]. Mismatch: max(dp[i+1][j], dp[i][j+1]).',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        dpTable: [{ idx: 0, val: 0 }, { idx: 1, val: 1 }, { idx: 2, val: 1 }, { idx: 3, val: 2 }, { idx: 4, val: 3 }, { idx: 5, val: 5 }],
        steps: [
          { activeIdx: 5, formula: 'dp[target]', label: 'DP Takeaway: Define State -> Write Transition -> Base Case -> Tabulate' }
        ]
      },
      memoryTakeaway: 'State Definition + Recurrence Relation + Base Cases = DP Mastery'
    }
  ]
};
