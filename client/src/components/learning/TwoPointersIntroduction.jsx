import React, { useState, useMemo } from 'react';
import LanguageSyntaxCard from './LanguageSyntaxCard';
import DSATopicIntroduction from './DSATopicIntroduction';
import {
  ArrowLeftRight,
  MoveRight,
  GitBranch,
  HelpCircle,
  CheckCircle2,
  Layers,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Code2,
  Sliders,
  Maximize2,
  Tag,
  ArrowRight,
  Check,
  Lightbulb,
  BookOpen,
  Target,
  Zap
} from 'lucide-react';

/**
 * TwoPointersIntroduction Component
 * 
 * Comprehensive, light-mode educational introduction foundation for
 * DSA → Two Pointers → Introduction.
 */

// ----------------------------------------------------------------------
// 1. Data Definitions for the 9 Major Patterns
// ----------------------------------------------------------------------
const PATTERNS_DATA = [
  {
    id: 'opposite-direction',
    number: '01',
    name: 'Opposite-Direction Two Pointers',
    category: 'Directional',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    shortDesc: 'Two pointers start from opposite ends of the array/string and move toward each other.',
    visualRepresentation: `left → → →                  ← ← ← right
[ 1,   3,   5,   8,   11,  15 ]
  ↑                         ↑
L=0                        R=5`,
    examples: [
      { name: 'Pair Sum in Sorted Array', diff: 'Easy' },
      { name: 'Two Sum II (Input Array Is Sorted)', diff: 'Medium' },
      { name: 'Valid Palindrome', diff: 'Easy' },
      { name: 'Container With Most Water', diff: 'Medium' },
      { name: 'Trapping Rain Water', diff: 'Hard' }
    ],
    whenToUse: 'When input is sorted or symmetric, and you need to find pairs/boundaries meeting a target sum or volume constraint.',
    keyIdea: 'Move the pointer that can help improve the current condition. For example, in a sorted sum search: sum < target → move left rightward; sum > target → move right leftward.'
  },
  {
    id: 'same-direction',
    number: '02',
    name: 'Same-Direction Two Pointers',
    category: 'Directional',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    shortDesc: 'Both pointers move in the same direction, usually at different speeds or with distinct responsibilities.',
    visualRepresentation: `slow →
fast → → →
[ 0,   1,   0,   3,   12 ]
  ↑    ↑
slow  fast`,
    examples: [
      { name: 'Remove Duplicates from Sorted Array', diff: 'Easy' },
      { name: 'Move Zeroes', diff: 'Easy' },
      { name: 'In-Place Element Filtering', diff: 'Easy' },
      { name: 'Array Partitioning by Parity', diff: 'Easy' }
    ],
    whenToUse: 'When scanning a sequence to filter, modify, or reorder elements in-place without using auxiliary extra memory.',
    keyIdea: 'The fast pointer explores the array while the slow pointer maintains the position where the next valid element should be placed.'
  },
  {
    id: 'fast-slow',
    number: '03',
    name: 'Fast & Slow Pointer (Floyd Cycle Detection)',
    category: 'Directional',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    shortDesc: 'Two pointers traverse a sequence or linked structure at different relative speeds (e.g. 1 step vs 2 steps).',
    visualRepresentation: `slow →  (1 step per iteration)
fast → → (2 steps per iteration)

1 → 2 → 3 → 4 → 5
        ↑       ↓
        7 ← 6 ← ↵`,
    examples: [
      { name: 'Linked List Cycle Detection', diff: 'Easy' },
      { name: 'Find Middle of Linked List', diff: 'Easy' },
      { name: 'Find Cycle Entry Point', diff: 'Medium' },
      { name: 'Happy Number', diff: 'Easy' }
    ],
    whenToUse: 'When detecting loops, cycles, or finding midpoints in singly-linked lists or state transition graphs.',
    keyIdea: 'If a cycle exists, the fast pointer will eventually catch up and overlap with the slow pointer inside the loop.'
  },
  {
    id: 'sliding-window',
    number: '04',
    name: 'Sliding Window (Fixed & Variable)',
    category: 'Subarrays & Windows',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    shortDesc: 'Two boundaries define a dynamic, contiguous sub-range (window) of elements traversing the sequence.',
    visualRepresentation: `left → [ current window ] ← right

Fixed:    Window size (R - L + 1) == K
Variable: Expand R to grow; shrink L when condition violated`,
    examples: [
      { name: 'Max Sum Subarray of Size K (Fixed)', diff: 'Easy' },
      { name: 'Longest Substring Without Repeating Chars (Var)', diff: 'Medium' },
      { name: 'Minimum Size Subarray Sum (Var)', diff: 'Medium' },
      { name: 'Max Consecutive Ones III', diff: 'Medium' }
    ],
    whenToUse: 'When solving problems involving contiguous subarrays or substrings with specific sum, frequency, or uniqueness limits.',
    keyIdea: 'Expand right pointer to include elements. When condition is violated, advance left pointer to shrink the window until valid again.'
  },
  {
    id: 'partitioning',
    number: '05',
    name: 'Partitioning / In-Place Two Pointers',
    category: 'In-Place & Partitioning',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    shortDesc: 'Pointers divide an array into distinct processed, unknown, and high-value regions to rearrange elements in-place.',
    visualRepresentation: `[ processed low | unknown elements | processed high ]
  ↑               ↑                  ↑
low             mid                high`,
    examples: [
      { name: 'Sort Colors (Dutch National Flag)', diff: 'Medium' },
      { name: 'Move Zeroes', diff: 'Easy' },
      { name: 'Partition Array According to Given Pivot', diff: 'Medium' },
      { name: 'Remove Element', diff: 'Easy' }
    ],
    whenToUse: 'When segregating elements into 2 or 3 categories (e.g. zeros/ones/twos, odds/evens) with strictly O(1) space.',
    keyIdea: 'Use 2 or 3 pointers to maintain invariant boundaries between classified sections as you inspect unknown elements.'
  },
  {
    id: 'sorted-arrays',
    number: '06',
    name: 'Two Pointers for Sorted Arrays',
    category: 'Directional',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    shortDesc: 'Monotonic order in sorted arrays allows deterministic pointer movement based on comparison with a target.',
    visualRepresentation: `sum < target  →  left++  (increase sum)
sum > target  →  right-- (decrease sum)
sum == target →  Found answer pair!`,
    examples: [
      { name: 'Two Sum II', diff: 'Medium' },
      { name: '3Sum', diff: 'Medium' },
      { name: '4Sum', diff: 'Medium' },
      { name: 'Closest Subarray / Pair Sum', diff: 'Medium' }
    ],
    whenToUse: 'When the array is sorted (or can be pre-sorted in O(N log N)) and you need to find target combinations efficiently.',
    keyIdea: 'Sorted ordering guarantees that incrementing left increases the total sum while decrementing right decreases it.'
  },
  {
    id: 'string-pattern',
    number: '07',
    name: 'String Two-Pointer Pattern',
    category: 'In-Place & Partitioning',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    shortDesc: 'Applying two-pointer traversal directly to character arrays or string indices to evaluate symmetry or format.',
    visualRepresentation: `L →  a   b   c   d   c   b   a  ← R
     ↑                           ↑
  Match                       Match`,
    examples: [
      { name: 'Valid Palindrome', diff: 'Easy' },
      { name: 'Reverse String', diff: 'Easy' },
      { name: 'Backspace String Compare', diff: 'Easy' },
      { name: 'Longest Palindromic Substring', diff: 'Medium' }
    ],
    whenToUse: 'When verifying palindromes, reversing strings in-place, or comparing strings with special editing commands.',
    keyIdea: 'Compare characters at left and right indices, ignoring non-alphanumeric chars or matching inward symmetrically.'
  },
  {
    id: 'merging-sequences',
    number: '08',
    name: 'Merging / Two-Sequence Pointers',
    category: 'Multi-Sequence',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    shortDesc: 'Maintain one pointer per sorted input sequence to merge or compare elements in linear time.',
    visualRepresentation: `Array A:  [ 1,  4,  7, 10 ]  → ptrA ↑
Array B:  [ 2,  3,  8, 12 ]  → ptrB ↑
Merged:   [ 1, 2, 3, 4 ... ]`,
    examples: [
      { name: 'Merge Sorted Array (In-Place)', diff: 'Easy' },
      { name: 'Merge Two Sorted Lists', diff: 'Easy' },
      { name: 'Intersection of Two Arrays II', diff: 'Easy' },
      { name: 'Interval List Intersections', diff: 'Medium' }
    ],
    whenToUse: 'When combining, comparing, or intersecting two independently sorted lists or intervals.',
    keyIdea: 'Compare elements at both pointers, advance the smaller element pointer, and append to the output sequence.'
  },
  {
    id: 'multi-pointer',
    number: '09',
    name: 'Multiple Pointer / Multi-Phase Patterns',
    category: 'Multi-Sequence',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    shortDesc: 'Extending the two-pointer framework to 3+ pointers or nesting two pointers inside an outer tracking loop.',
    visualRepresentation: `outer i → [ left →              ← right ]
For each fixed index i:
  Run two-pointer search on remaining subarray`,
    examples: [
      { name: '3Sum (i + left + right = 0)', diff: 'Medium' },
      { name: '4Sum (i + j + left + right = 0)', diff: 'Medium' },
      { name: '3Sum Closest', diff: 'Medium' },
      { name: 'Subarrays with K Distinct Integers', diff: 'Hard' }
    ],
    whenToUse: 'When looking for 3 or 4 element combinations or handling multi-phase pointer algorithms.',
    keyIdea: 'Fix outer indices with loops, then reduce the inner subproblem to standard two-pointer search on the remaining subarray.'
  }
];

export default function TwoPointersIntroduction() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);
  const [simulatedStep, setSimulatedStep] = useState(0);

  // Categories for Filter Chips
  const categories = ['All', 'Directional', 'Subarrays & Windows', 'In-Place & Partitioning', 'Multi-Sequence'];

  // Interactive Demo State for Opposite Direction Pair Sum
  const demoArray = [2, 7, 11, 15];
  const demoTarget = 18;
  const demoSteps = [
    { left: 0, right: 3, sum: 17, action: 'Sum 17 < Target 18 → Move left pointer rightward (left++)', found: false },
    { left: 1, right: 3, sum: 22, action: 'Sum 22 > Target 18 → Move right pointer leftward (right--)', found: false },
    { left: 1, right: 2, sum: 18, action: 'Sum 18 == Target 18 🎉 Target Pair Found! arr[1]=7, arr[2]=11', found: true }
  ];

  const currentDemo = demoSteps[simulatedStep];

  // Filtered Patterns
  const filteredPatterns = useMemo(() => {
    return PATTERNS_DATA.filter((pattern) => {
      const matchesCategory = selectedCategory === 'All' || pattern.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        pattern.name.toLowerCase().includes(q) ||
        pattern.shortDesc.toLowerCase().includes(q) ||
        pattern.examples.some((ex) => ex.name.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 select-none">
      {/* ========================================================================= */}
      {/* PART 1: TOPIC INTRODUCTION / WHAT IS THE TOPIC? (DEPTH CAROUSEL)         */}
      {/* ========================================================================= */}
      <DSATopicIntroduction />
      {/* ========================================================================= */}
      {/* 1. TOPIC HEADER & SUBTITLE                                                */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase tracking-wider">
                DSA Core Pattern
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">Algorithmic Foundation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Two Pointers
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              O(N) Linear Time
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold">
              O(1) Auxiliary Space
            </span>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
          Master one of the most important problem-solving patterns for arrays and strings.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOPIC OVERVIEW CARD ("Introduction to Two Pointers")                   */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Introduction to Two Pointers</h2>
            <p className="text-xs text-slate-500">Core concept and beginner-friendly intuition</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          <strong className="text-slate-900 font-bold">Two Pointers</strong> is a problem-solving technique where two indices or pointers are used to traverse or process a data structure, usually an array or string, while eliminating redundant iterations.
        </p>

        {/* Basic Visual Array Representation */}
        <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-4 shadow-inner">
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
            Basic Array Pointer Placement
          </span>
          <div className="flex items-center justify-center gap-2 sm:gap-4 py-2 font-mono">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-emerald-400 text-xs font-bold">left →</span>
              <div className="w-12 h-12 rounded-xl bg-indigo-600 border border-indigo-400 flex items-center justify-center text-base font-black shadow-md">
                2
              </div>
              <span className="text-[10px] text-slate-400">[0]</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs opacity-0">&nbsp;</span>
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-base font-bold text-slate-300">
                7
              </div>
              <span className="text-[10px] text-slate-400">[1]</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs opacity-0">&nbsp;</span>
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-base font-bold text-slate-300">
                11
              </div>
              <span className="text-[10px] text-slate-400">[2]</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-sky-400 text-xs font-bold">← right</span>
              <div className="w-12 h-12 rounded-xl bg-indigo-600 border border-indigo-400 flex items-center justify-center text-base font-black shadow-md">
                15
              </div>
              <span className="text-[10px] text-slate-400">[3]</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 text-center leading-relaxed">
            The two pointers move dynamically inward or forward based on the specific condition of the problem.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. KEY IDEA CARD                                                          */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Lightbulb size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Key Idea</h2>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Instead of repeatedly checking many combinations with nested loops, use two controlled pointer positions and move them according to the problem's criteria.
        </p>

        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-amber-950 font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 font-bold">Left pointer</span>
            <ArrowRight size={14} className="text-amber-700" />
            <span>(Advances rightward)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>(Advances leftward)</span>
            <ArrowRight size={14} className="text-amber-700 rotate-180" />
            <span className="text-sky-700 font-bold">Right pointer</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN KEY POINTS CARD                                                   */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
            <CheckCircle2 size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Key Points</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
            <span>Uses two indices/pointers concurrently.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
            <span>Often reduces unnecessary nested iterations.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
            <span>Commonly used with arrays and strings.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
            <span>Very useful when the data is sorted.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
            <span>Can work from opposite directions or same direction.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
            <span>Pointer movement is controlled by a condition.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
            <span>Can reduce time complexity in many problems.</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
            <span>Frequently appears in coding interviews and placements.</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. WHY LEARN TWO POINTERS? CARD                                           */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Zap size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Why Learn Two Pointers?</h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Mastering two pointers equips you with an essential algorithmic mindset to <strong className="text-slate-800">can reduce unnecessary work in many suitable problems</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1">
            <h4 className="text-xs font-bold text-emerald-900">Recognize Patterns</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">Identify repeated-search scenarios and avoid brute-force loops.</p>
          </div>
          <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1">
            <h4 className="text-xs font-bold text-emerald-900">Optimize Space</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">Modify arrays and filter elements in-place with O(1) extra memory.</p>
          </div>
          <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1">
            <h4 className="text-xs font-bold text-emerald-900">Interview Confidence</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">Solve core placement interview challenges across top tech companies.</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. WHEN SHOULD YOU THINK ABOUT TWO POINTERS?                              */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Target size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">When Should You Think About Two Pointers?</h2>
            <p className="text-xs text-slate-500">Key problem recognition clues during coding sessions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'The problem involves an array or string.',
            'The array is sorted or can be pre-sorted.',
            'You need to find a pair or triplet satisfying a condition.',
            'You need to compare elements from two different positions.',
            'You need to process a sequence from both ends.',
            'A brute-force solution repeatedly checks combinations.',
            'The problem involves a moving range or contiguous window.',
            'You need to modify or partition an array in-place.'
          ].map((clue, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                ✓
              </div>
              <span className="text-xs font-semibold text-slate-700">{clue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. DYNAMIC LANGUAGE-SPECIFIC SYNTAX REFERENCE CARD                        */}
      {/* ========================================================================= */}
      <LanguageSyntaxCard topicId="two-pointers" topicName="Two Pointers" />

      {/* ========================================================================= */}
      {/* 8. PATTERN RELATIONSHIP MAP (COMPACT VISUAL HIERARCHY TREE)               */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <GitBranch size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Pattern Relationship Map</h3>
              <p className="text-xs text-slate-500">Hierarchical structure of all 9 two-pointer variations</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            9 Interconnected Patterns
          </span>
        </div>

        {/* Hierarchical Tree Map Layout */}
        <div className="p-4 sm:p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl overflow-x-auto">
          <div className="min-w-[700px] flex flex-col items-center space-y-6">
            {/* Root Node */}
            <div className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-sm font-black rounded-2xl shadow-md border border-indigo-400/30 flex items-center gap-2">
              <Layers size={16} /> TWO POINTERS ALGORITHM FAMILY
            </div>

            {/* Connecting Line Down */}
            <div className="w-0.5 h-6 bg-slate-300" />

            {/* Level 1 Major Categories */}
            <div className="grid grid-cols-4 gap-4 w-full">
              {/* Category 1 */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-full py-2 px-3 bg-indigo-50 border border-indigo-200 rounded-xl text-center text-xs font-bold text-indigo-900 shadow-xs">
                  Opposite Direction
                </div>
                <div className="w-0.5 h-4 bg-indigo-200" />
                <div className="space-y-1.5 w-full text-center">
                  <div className="py-1 px-2 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs">
                    01. Opposite Pointers
                  </div>
                  <div className="py-1 px-2 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs">
                    06. Sorted Arrays (Sum)
                  </div>
                  <div className="py-1 px-2 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs">
                    07. String Palindromes
                  </div>
                </div>
              </div>

              {/* Category 2 */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-full py-2 px-3 bg-sky-50 border border-sky-200 rounded-xl text-center text-xs font-bold text-sky-900 shadow-xs">
                  Same Direction
                </div>
                <div className="w-0.5 h-4 bg-sky-200" />
                <div className="space-y-1.5 w-full text-center">
                  <div className="py-1 px-2 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs">
                    02. Slow & Fast In-Place
                  </div>
                  <div className="py-1 px-2 bg-amber-50 border border-amber-200 rounded-lg text-[11px] font-bold text-amber-900 shadow-2xs">
                    04. Sliding Window
                  </div>
                </div>
              </div>

              {/* Category 3 */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-full py-2 px-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-900 shadow-xs">
                  Fast & Slow (Cycles)
                </div>
                <div className="w-0.5 h-4 bg-emerald-200" />
                <div className="space-y-1.5 w-full text-center">
                  <div className="py-1 px-2 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs">
                    03. Linked List Cycles
                  </div>
                  <div className="py-1 px-2 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs">
                    Middle of List Search
                  </div>
                </div>
              </div>

              {/* Category 4 */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-full py-2 px-3 bg-purple-50 border border-purple-200 rounded-xl text-center text-xs font-bold text-purple-900 shadow-xs">
                  Advanced / Multi-Seq
                </div>
                <div className="w-0.5 h-4 bg-purple-200" />
                <div className="space-y-1.5 w-full text-center">
                  <div className="py-1 px-2 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs">
                    05. Partitioning (Dutch Flag)
                  </div>
                  <div className="py-1 px-2 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs">
                    08. Merging 2 Sequences
                  </div>
                  <div className="py-1 px-2 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 shadow-2xs">
                    09. 3Sum / Multi-Pointer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 9 PATTERN CARDS GRID                                                      */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">The 9 Major Two-Pointer Patterns</h3>
            <p className="text-xs text-slate-500">Explore compact educational cards with visual movements and key interview examples</p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pattern or problem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 9 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPatterns.map((pattern) => {
          const isExpanded = expandedCard === pattern.id;

          return (
            <div
              key={pattern.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header: Number, Title, Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center shrink-0">
                      {pattern.number}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {pattern.name}
                    </h4>
                  </div>
                </div>

                <span className={`inline-block px-2.5 py-0.5 rounded-md border text-[10px] font-bold ${pattern.badgeColor}`}>
                  {pattern.category}
                </span>

                {/* Short Explanation */}
                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  {pattern.shortDesc}
                </p>

                {/* Visual Representation Block */}
                <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] leading-relaxed rounded-xl overflow-x-auto shadow-inner border border-slate-800">
                  <pre className="whitespace-pre">{pattern.visualRepresentation}</pre>
                </div>

                {/* Example Problems */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Code2 size={12} /> Key Interview Examples:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pattern.examples.map((ex, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-[11px] font-semibold text-slate-700"
                      >
                        <span>{ex.name}</span>
                        <span className={`text-[9px] font-bold px-1 rounded ${
                          ex.diff === 'Easy' ? 'text-emerald-700 bg-emerald-50' :
                          ex.diff === 'Medium' ? 'text-amber-700 bg-amber-50' : 'text-rose-700 bg-rose-50'
                        }`}>
                          {ex.diff}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expandable Key Idea Section */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => setExpandedCard(isExpanded ? null : pattern.id)}
                  className="w-full flex items-center justify-between text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer py-1"
                >
                  <span>{isExpanded ? 'Hide Key Idea & Recognition' : 'When to Recognize & Key Idea'}</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isExpanded && (
                  <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-2 text-xs animate-fadeIn">
                    <div>
                      <span className="font-bold text-indigo-950 block">When to Recognize:</span>
                      <p className="text-slate-600 leading-relaxed">{pattern.whenToUse}</p>
                    </div>
                    <div>
                      <span className="font-bold text-indigo-950 block">Key Movement Strategy:</span>
                      <p className="text-indigo-900 leading-relaxed font-medium">{pattern.keyIdea}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
