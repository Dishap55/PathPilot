import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Layers,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  Code2,
  Zap,
  Check,
  HelpCircle,
  AlertTriangle,
  RefreshCw,
  GitBranch,
  Target,
  Sliders,
  Maximize2
} from 'lucide-react';
import LanguageSyntaxCard from './LanguageSyntaxCard.jsx';

/**
 * TWO POINTERS 10-CARD INTRODUCTION DATA DEFINITION
 * Reusable data structure for DSA Topic Introduction Depth Carousel.
 */
export const TWO_POINTERS_INTRO_DATA = {
  topicId: 'two-pointers',
  topicName: 'Two Pointers',
  subtitle: 'Master one of the most fundamental problem-solving patterns for arrays and strings.',
  cards: [
    /* ===================================================================== */
    /* CARD 1 — WHAT IS TWO POINTERS? (BENCHMARK CARD)                       */
    /* ===================================================================== */
    {
      id: 'what-is-two-pointers',
      cardNumber: 1,
      badge: '01 · CORE CONCEPT',
      title: 'What is Two Pointers?',
      introText: 'Two Pointers is a technique where we use two positions to look at different parts of an array or string.',
      coreIdea: {
        part1: '2 positions',
        part2: 'smart movement',
        result: 'Two Pointers'
      },
      keyPoints: [
        {
          num: '01',
          title: 'TWO POSITIONS',
          text: 'We keep track of two places in the array or string.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'CHECK',
          text: 'We look at the values at those two positions.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'MOVE',
          text: 'We move one pointer when the current values tell us to.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '04',
          title: 'AVOID REPEATED WORK',
          text: 'We try not to check the same possibilities again and again.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        arrayValues: [2, 7, 11, 15],
        steps: [
          { left: 0, right: 3, label: 'Pointers start at opposite ends' },
          { left: 1, right: 3, label: 'Left pointer advances rightward' },
          { left: 1, right: 2, label: 'Right pointer advances leftward' }
        ]
      },
      memoryTakeaway: 'Two positions → Check → Move → Repeat'
    },

    /* ===================================================================== */
    /* CARD 2 — KEY POINTS                                                   */
    /* ===================================================================== */
    {
      id: 'key-points',
      cardNumber: 2,
      badge: '02 · KEY SUMMARY',
      title: 'Key Points',
      introText: 'Essential principles and fundamental rules to remember when applying Two Pointers.',
      coreIdea: {
        part1: '2 positions',
        part2: 'smart movement',
        result: 'Less Work'
      },
      keyPoints: [
        {
          num: '01',
          title: 'TWO POINTERS',
          text: 'Use two indexes/positions instead of repeatedly checking the whole array.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80'
        },
        {
          num: '02',
          title: 'SMART MOVEMENT',
          text: 'Move a pointer based on what the current values tell you.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80'
        },
        {
          num: '03',
          title: 'LESS WORK',
          text: 'Avoid checking possibilities that cannot give the answer.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
        },
        {
          num: '04',
          title: 'ONE STEP AT A TIME',
          text: 'Each pointer moves according to the problem condition.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80'
        }
      ],
      visualData: {
        arrayValues: [2, 7, 11, 15],
        fadedPairs: ['2 ↔ 11', '2 ↔ 15'],
        steps: [
          { left: 0, right: 3, activeCheck: '2 + 15 = 17', activeAction: '17 < 18 → Move left rightward' },
          { left: 1, right: 3, activeCheck: '7 + 15 = 22', activeAction: '22 > 18 → Move right leftward' },
          { left: 1, right: 2, activeCheck: '7 + 11 = 18', activeAction: '18 == 18 🎉 Target Pair Found!' }
        ]
      },
      memoryTakeaway: "Don't check everything. Use the information you already have."
    },

    /* ===================================================================== */
    /* CARD 3 — WHY USE TWO POINTERS?                                       */
    /* ===================================================================== */
    {
      id: 'why-use-two-pointers',
      cardNumber: 3,
      badge: '03 · MOTIVATION',
      title: 'Why Use Two Pointers?',
      introText: 'Compare brute-force all-pair checks against smart pointer movement to see the dramatic difference in effort.',
      bruteForceChecks: ['2 → 7', '2 → 11', '2 → 15', '7 → 11', '7 → 15', '11 → 15'],
      twoPointersSteps: ['Check L[0] & R[3]', 'Move L[1] → Check L[1] & R[3]', 'Move R[2] → Check L[1] & R[2] (Done!)'],
      points: [
        {
          num: '01',
          title: 'REDUCE WORK',
          text: 'Avoid checking the same possibilities again and again.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/80'
        },
        {
          num: '02',
          title: 'SAVE TIME',
          text: 'Many problems can be solved faster than checking every possible pair.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
        },
        {
          num: '03',
          title: 'USE THE INFORMATION',
          text: 'Sorted order or pointer positions can help us decide where to move.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80'
        }
      ],
      memoryTakeaway: 'Two Pointers helps us solve the problem with less unnecessary work.'
    },

    /* ===================================================================== */
    /* CARD 4 — WHEN TO USE TWO POINTERS?                                    */
    /* ===================================================================== */
    {
      id: 'when-to-use-two-pointers',
      cardNumber: 4,
      badge: '04 · RECOGNITION',
      title: 'When to Use Two Pointers?',
      introText: 'Use this simple visual decision flowchart to spot when Two Pointers can help you solve a problem.',
      decisionFlow: [
        { question: 'Is it an array or string?', answer: 'YES' },
        { question: 'Do I need to compare, find, pair, merge, or move elements?', answer: 'YES' },
        { question: 'Can two positions help avoid repeated work?', answer: 'YES' }
      ],
      clues: [
        { label: 'Sorted array', icon: '📊' },
        { label: 'Find a pair', icon: '🎯' },
        { label: 'Compare from both ends', icon: '↔️' },
        { label: 'Move through sequence', icon: '➡️' },
        { label: 'Find a range', icon: '🔍' },
        { label: 'Modify in-place', icon: '🛠️' },
        { label: 'Fast & slow movement', icon: '⚡' }
      ],
      memoryTakeaway: 'If two positions can move through the data intelligently, think Two Pointers.'
    },

    /* ===================================================================== */
    /* CARD 5 — HOW IT WORKS                                                 */
    /* ===================================================================== */
    {
      id: 'how-it-works',
      cardNumber: 5,
      badge: '05 · MECHANISM',
      title: 'How It Works',
      introText: 'The core process follows 4 simple visual steps that loop until the problem condition is met.',
      flowSteps: [
        { num: '01', title: 'PLACE', text: 'Put two pointers at useful positions.', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
        { num: '02', title: 'CHECK', text: 'Look at the values currently pointed to.', bg: 'bg-purple-50 text-purple-700 border-purple-200' },
        { num: '03', title: 'DECIDE', text: 'Use the problem condition to decide which pointer should move.', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
        { num: '04', title: 'MOVE', text: 'Move one or both pointers and repeat.', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
      ],
      visualStage: {
        arrayValues: [2, 7, 11, 15],
        loopPhases: ['CHECK values at L & R', 'DECIDE which pointer to move', 'MOVE pointer position']
      },
      memoryTakeaway: 'Place → Check → Decide → Move → Repeat.'
    },

    /* ===================================================================== */
    /* CARD 6 — PATTERNS / TYPES                                             */
    /* ===================================================================== */
    {
      id: 'patterns-types',
      cardNumber: 6,
      badge: '06 · CLASSIFICATIONS',
      title: 'Patterns / Types',
      introText: 'Two Pointers is a family of patterns. Explore the 6 distinct structural configurations below.',
      patterns: [
        {
          num: '1',
          name: 'Opposite Direction',
          diagram: 'L → [ ... ... ... ] ← R',
          desc: 'Pointers start from opposite ends and move toward each other.',
          color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
        },
        {
          num: '2',
          name: 'Same Direction',
          diagram: 'L → → R →',
          desc: 'Both pointers move through the array in the same general direction.',
          color: 'bg-sky-50 text-sky-700 border-sky-200'
        },
        {
          num: '3',
          name: 'Fast & Slow',
          diagram: 'S → →  |  F → → →',
          desc: 'One pointer moves faster than the other.',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        },
        {
          num: '4',
          name: 'Sliding Window',
          diagram: 'L | ← WINDOW → | R',
          desc: 'Two boundaries maintain a changing range.',
          color: 'bg-amber-50 text-amber-700 border-amber-200'
        },
        {
          num: '5',
          name: 'Partitioning',
          diagram: 'L → | values | ← R',
          desc: 'Pointers help rearrange elements into different groups.',
          color: 'bg-purple-50 text-purple-700 border-purple-200'
        },
        {
          num: '6',
          name: 'Two Sequences',
          diagram: 'Array A →  |  Array B →',
          desc: 'Pointers move through two sequences while comparing or merging them.',
          color: 'bg-rose-50 text-rose-700 border-rose-200'
        }
      ],
      memoryTakeaway: 'Two Pointers is a family of patterns, not one fixed method.'
    },

    /* ===================================================================== */
    /* CARD 7 — COMPLEXITY                                                   */
    /* ===================================================================== */
    {
      id: 'complexity',
      cardNumber: 7,
      badge: '07 · PERFORMANCE',
      title: 'Complexity',
      introText: 'Understand why Two Pointers transforms exponential work into clean linear processing.',
      comparison: {
        bruteForce: {
          label: 'BRUTE FORCE',
          checks: 'Check all pairs: Check → Check → Check...',
          complexity: 'O(n²)',
          example: '100 elements → 4,950 pair checks'
        },
        twoPointers: {
          label: 'TWO POINTERS',
          checks: 'Single pass: → → → → →',
          complexity: 'O(n)',
          example: '100 elements → ~100 pointer moves'
        }
      },
      timeSpace: [
        { title: 'TIME COMPLEXITY', text: 'Many Two Pointer solutions reduce unnecessary work and run in O(n).', badge: 'O(n) Time', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
        { title: 'SPACE COMPLEXITY', text: 'Many solutions operate in-place using only a few extra variables.', badge: 'O(1) Space', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
      ],
      note: 'Note: Complexity depends on the specific problem conditions.',
      memoryTakeaway: 'The goal is not just two pointers — the goal is avoiding unnecessary work.'
    },

    /* ===================================================================== */
    /* CARD 8 — IMPORTANT THINGS / EDGE CASES                                */
    /* ===================================================================== */
    {
      id: 'important-things-edge-cases',
      cardNumber: 8,
      badge: '08 · EDGE CASES',
      title: 'Important Things / Edge Cases',
      introText: 'Always test your pointer logic against these 7 critical edge situations.',
      edgeCases: [
        { title: 'EMPTY ARRAY', visual: '[ ]', text: 'No elements to process.', bg: 'bg-slate-100 text-slate-700 border-slate-200' },
        { title: 'ONE ELEMENT', visual: '[ 5 ]', text: 'Two different positions may not exist.', bg: 'bg-sky-50 text-sky-700 border-sky-200' },
        { title: 'TWO ELEMENTS', visual: '[ 2 ] [ 7 ]', text: 'Pointers may meet very quickly.', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
        { title: 'POINTERS MEET', visual: 'L = R', text: 'Whether we stop here depends on the problem.', bg: 'bg-purple-50 text-purple-700 border-purple-200' },
        { title: 'POINTERS CROSS', visual: 'L > R', text: 'This often means the process is finished.', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        { title: 'DUPLICATES', visual: '[ 2 ] [ 2 ] [ 2 ]', text: 'Do not automatically skip duplicates.', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
        { title: 'OUT OF BOUNDS', visual: '0 ≤ L, R < N', text: 'Always ensure movement stays inside valid indexes.', bg: 'bg-rose-50 text-rose-700 border-rose-200' }
      ],
      memoryTakeaway: 'Always know where your pointers are and when they should stop.'
    },

    /* ===================================================================== */
    /* CARD 9 — LANGUAGE SYNTAX                                              */
    /* ===================================================================== */
    {
      id: 'language-syntax',
      cardNumber: 9,
      badge: '09 · IMPLEMENTATION',
      title: 'Language Syntax',
      introText: 'Dynamic, topic-specific syntax reference updated for your preferred programming language.',
      memoryTakeaway: 'Know the pattern + know the syntax = ready to code.'
    },

    /* ===================================================================== */
    /* CARD 10 — QUICK MEMORY / TAKEAWAY                                     */
    /* ===================================================================== */
    {
      id: 'quick-memory-takeaway',
      cardNumber: 10,
      badge: '10 · SUMMARY',
      title: 'Quick Memory / Takeaway',
      introText: 'The complete visual summary of the Two Pointers algorithmic pattern.',
      centralTitle: 'TWO POINTERS',
      summaryFlow: [
        '1. Choose two positions',
        '2. Check the values',
        '3. Decide which pointer moves',
        '4. Move',
        '5. Repeat until satisfied'
      ],
      familyChips: ['Opposite', 'Same Direction', 'Fast & Slow', 'Sliding Window', 'Partition', 'Merge'],
      finalBox: {
        line1: 'Two positions + smart movement = less repeated work',
        line2: "Don't memorize the code. Understand why the pointers move."
      },
      memoryTakeaway: 'Understand why the pointers move, not just the code.'
    }
  ]
};

/**
 * DSATopicIntroduction Component
 * 
 * Reusable data-driven 10-Card Introduction Depth Carousel for DSA topics.
 * Featuring expanded card width, increased height, and generous internal spacing.
 */
export default function DSATopicIntroduction({ data, introData }) {
  const activeData = data || introData || TWO_POINTERS_INTRO_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerStepIndex, setPointerStepIndex] = useState(0);
  const [selectedPatternTab, setSelectedPatternTab] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const cards = activeData.cards || [];
  const totalCards = cards.length;

  // Window Resize Listener for Responsive Depth Spacing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic Pointer Movement Loop for Card Animations
  useEffect(() => {
    let timer = null;
    if (activeIndex === 0 || activeIndex === 1 || activeIndex === 4) {
      timer = setInterval(() => {
        setPointerStepIndex((prev) => (prev + 1) % 3);
      }, 2500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeIndex]);

  // Linear Navigation Handlers (Disabled at Boundaries)
  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < totalCards - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, totalCards]);

  // Responsive Carousel Card Spread Width (Proportional to expanded card width)
  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth < 1024;
  const isLargeScreen = windowWidth < 1440;
  const cardSpread = isSmallScreen ? 160 : isMediumScreen ? 270 : isLargeScreen ? 360 : 420;

  return (
    <div className="space-y-6 select-none max-w-7xl mx-auto overflow-hidden px-1">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOPIC HEADER & SUBTITLE BANNER                             */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-bold uppercase tracking-wider">
                DSA Core Topic
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">Topic Introduction</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              {activeData.topicName}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-600" /> 10-Card Depth Carousel
            </span>
          </div>
        </div>

        <p className="text-sm sm:base text-slate-600 font-medium leading-relaxed max-w-3xl">
          {activeData.subtitle}
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. 10-CARD LIGHT-MODE DEPTH CAROUSEL CONTAINER                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Top Header & Position Indicator */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-2xs">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Introduction to {activeData.topicName}
              </h2>
              <p className="text-xs text-slate-500">
                Interactive Learning Carousel &bull; Unit {activeIndex + 1} of {totalCards}
              </p>
            </div>
          </div>

          {/* Explicit Card Counter (e.g., 1 / 10) */}
          <div className="px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-black text-indigo-700">
            {activeIndex + 1} / {totalCards}
          </div>
        </div>

        {/* 3D Depth Carousel Stage (Strictly Only 3 Cards Rendered: Prev, Active, Next) */}
        <div className="relative h-[680px] sm:h-[640px] md:h-[620px] flex items-center justify-center overflow-hidden py-3">
          <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {cards.map((card, index) => {
              const diff = index - activeIndex;

              // STRICT RULE: Only render 3 cards (diff === -1, 0, 1). Hide all other 7 cards!
              if (Math.abs(diff) > 1) {
                return null;
              }

              const isActive = diff === 0;

              const xOffset = diff * cardSpread;
              const zOffset = isActive ? 0 : -90;
              const scale = isActive ? 1.0 : 0.86;
              const opacity = isActive ? 1 : 0.65;
              const zIndex = isActive ? 30 : 10;
              const rotateY = diff * -10;

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index);
                  }}
                  style={{
                    transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex
                  }}
                  className={`absolute w-[94%] sm:w-[88%] md:w-[82%] lg:w-[76%] max-w-[720px] xl:max-w-[760px] h-full rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-500 ease-out border backdrop-blur-xl ${
                    isActive
                      ? 'bg-white border-indigo-200/90 shadow-2xl ring-1 ring-indigo-500/10'
                      : 'bg-slate-50/95 border-slate-200/90 shadow-md cursor-pointer hover:border-indigo-200'
                  }`}
                >
                  {/* Card Content Outer Scroll Container */}
                  <div className="space-y-4 sm:space-y-5 overflow-y-auto scrollbar-none pr-0.5 flex-1">
                    {/* Top Header Badge & Counter */}
                    <div className="flex items-center justify-between">
                      <span className="px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
                        {card.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {card.cardNumber} / {totalCards}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight pt-1">
                      {card.title}
                    </h3>

                    {/* Short Intro Text */}
                    {card.introText && (
                      <p className="text-xs sm:text-sm md:text-base text-slate-700 font-medium leading-relaxed bg-slate-50/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/60">
                        {card.introText}
                      </p>
                    )}

                    {/* =================================================================== */}
                    {/* CARD 1 — WHAT IS (CORE CONCEPT)                                      */}
                    {/* =================================================================== */}
                    {(card.cardNumber === 1 || card.id === 'what-is-two-pointers' || (card.id && card.id.startsWith('what-is-'))) && (
                      <div className="space-y-4 sm:space-y-5">
                        {/* Core Idea Callout */}
                        {card.coreIdea && (
                          <div className="p-3 sm:p-4 bg-gradient-to-r from-indigo-50 via-sky-50 to-indigo-50 border border-indigo-100/90 rounded-2xl flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold shadow-xs">
                            <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black shadow-xs">
                              {card.coreIdea.part1}
                            </span>
                            <span className="text-indigo-400 font-black">+</span>
                            <span className="px-3 py-1 rounded-xl bg-sky-100 text-sky-800 border border-sky-200 font-bold">
                              {card.coreIdea.part2}
                            </span>
                            <span className="text-indigo-400 font-black">→</span>
                            <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black shadow-xs">
                              {card.coreIdea.result}
                            </span>
                          </div>
                        )}

                        {/* 4 Key Points */}
                        {card.keyPoints && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.keyPoints.map((kp) => (
                              <div key={kp.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${kp.badgeBg}`}>
                                    {kp.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{kp.title}</h4>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{kp.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Animated Diagram */}
                        {card.pointerVisual && (
                          <TopicVisualDemonstration topicId={activeData.topicId || 'two-pointers'} card={card} stepIndex={pointerStepIndex} />
                        )}
                      </div>
                    )}

                    {/* =================================================================== */}
                    {/* CARD 2 — KEY POINTS                                                 */}
                    {/* =================================================================== */}
                    {(card.cardNumber === 2 || card.id === 'key-points') && (
                      <div className="space-y-4 sm:space-y-5">
                        {card.coreIdea && (
                          <div className="p-3 sm:p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-indigo-900">
                            <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black">{card.coreIdea.part1}</span>
                            <span>+</span>
                            <span className="px-3 py-1 rounded-xl bg-sky-100 text-sky-800 border border-sky-200 font-bold">{card.coreIdea.part2}</span>
                            <span>=</span>
                            <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black">{card.coreIdea.result}</span>
                          </div>
                        )}

                        {card.keyPoints && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.keyPoints.map((kp) => (
                              <div key={kp.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl space-y-1.5 shadow-2xs">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${kp.badgeBg}`}>
                                    {kp.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{kp.title}</h4>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{kp.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Two Pointers Specific visualData */}
                        {card.visualData && card.visualData.steps && card.visualData.steps.length > 0 && (
                          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-inner">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Smart Movement & Faded Comparisons</span>
                              <span className="text-xs text-emerald-400 font-semibold">{card.visualData.steps[pointerStepIndex % card.visualData.steps.length].activeAction}</span>
                            </div>
                            <div className="flex items-center justify-center gap-3 sm:gap-4 py-2 font-mono">
                              {card.visualData.arrayValues.map((val, idx) => {
                                const curStep = card.visualData.steps[pointerStepIndex % card.visualData.steps.length];
                                const isLeft = idx === curStep.left;
                                const isRight = idx === curStep.right;
                                return (
                                  <div key={idx} className="flex flex-col items-center space-y-1.5">
                                    <span className={`text-xs font-extrabold h-5 ${isLeft ? 'text-emerald-400' : isRight ? 'text-sky-400' : 'opacity-0'}`}>
                                      {isLeft ? 'LEFT' : isRight ? 'RIGHT' : ''}
                                    </span>
                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-base sm:text-lg font-black transition-all duration-300 ${isLeft ? 'bg-emerald-600 text-white border-2 border-emerald-400 shadow-md scale-105' : isRight ? 'bg-sky-600 text-white border-2 border-sky-400 shadow-md scale-105' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                                      {val}
                                    </div>
                                    <span className="text-xs text-slate-500 font-medium">[{idx}]</span>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-1 border-t border-slate-800">
                              <span className="line-through text-slate-500">Unnecessary: 2↔11, 2↔15</span>
                              <span className="text-emerald-400 font-bold">Inspected: {card.visualData.steps[pointerStepIndex % card.visualData.steps.length].activeCheck}</span>
                            </div>
                          </div>
                        )}

                        {/* Other Topics pointerVisual */}
                        {!card.visualData && card.pointerVisual && (
                          <TopicVisualDemonstration topicId={activeData.topicId || 'two-pointers'} card={card} stepIndex={pointerStepIndex} />
                        )}
                      </div>
                    )}

                    {/* =================================================================== */}
                    {/* CARD 3 — WHY USE THIS TOPIC?                                        */}
                    {/* =================================================================== */}
                    {(card.cardNumber === 3 || card.id === 'why-use-two-pointers' || (card.id && card.id.startsWith('why-use-'))) && (
                      <div className="space-y-4 sm:space-y-5">
                        {/* Brute Force vs Two Pointers Visual Comparison */}
                        {card.bruteForceChecks && card.twoPointersSteps && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="p-3.5 sm:p-4 bg-rose-50/70 border border-rose-200/80 rounded-2xl space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-md border border-rose-200">
                                  BRUTE FORCE
                                </span>
                                <span className="text-xs font-bold text-rose-600">6 Pair Checks</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5 font-mono text-xs text-rose-950 font-semibold">
                                {card.bruteForceChecks.map((chk, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-white border border-rose-200 rounded-md">
                                    {chk}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="p-3.5 sm:p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">
                                  TWO POINTERS
                                </span>
                                <span className="text-xs font-bold text-emerald-600">Fewer Checks</span>
                              </div>
                              <div className="space-y-1.5 font-mono text-xs text-emerald-950 font-semibold">
                                {card.twoPointersSteps.map((st, i) => (
                                  <div key={i} className="flex items-center gap-2 px-2 py-0.5 bg-white border border-emerald-200 rounded-md">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                    <span>{st}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 3 Key Benefits */}
                        {card.points && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {card.points.map((pt) => (
                              <div key={pt.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl space-y-1.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${pt.badgeBg}`}>
                                  {pt.num}
                                </span>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{pt.title}</h4>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{pt.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Key Points grid for other topics */}
                        {card.keyPoints && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.keyPoints.map((kp) => (
                              <div key={kp.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${kp.badgeBg}`}>
                                    {kp.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{kp.title}</h4>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{kp.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Pointer Visual */}
                        {card.pointerVisual && (
                          <TopicVisualDemonstration topicId={activeData.topicId || 'two-pointers'} card={card} stepIndex={pointerStepIndex} />
                        )}
                      </div>
                    )}

                    {/* =================================================================== */}
                    {/* CARD 4 — WHEN TO USE THIS TOPIC?                                    */}
                    {/* =================================================================== */}
                    {(card.cardNumber === 4 || card.id === 'when-to-use-two-pointers' || (card.id && card.id.startsWith('when-to-use-'))) && (
                      <div className="space-y-4 sm:space-y-5">
                        {/* Visual Decision Flowchart */}
                        {card.decisionFlow && (
                          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-2.5 text-center shadow-inner">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
                              Visual Decision Path
                            </span>
                            <div className="flex flex-col items-center gap-1.5 text-xs font-semibold">
                              {card.decisionFlow.map((df, i) => (
                                <React.Fragment key={i}>
                                  <div className="px-3.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 w-full max-w-md">
                                    {df.question}
                                  </div>
                                  <span className="text-emerald-400 font-black text-xs">↓ {df.answer}</span>
                                </React.Fragment>
                              ))}
                              <div className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-black text-xs sm:text-sm shadow-md border border-emerald-400">
                                💡 THINK ABOUT {activeData.topicName.toUpperCase()}!
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Recognizable Clues Chips */}
                        {card.clues && (
                          <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                              Recognizable Problem Clues:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {card.clues.map((c, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 rounded-xl bg-indigo-50/80 text-indigo-800 border border-indigo-200/70 text-xs font-bold flex items-center gap-1.5"
                                >
                                  <span>{c.icon}</span>
                                  <span>{c.label}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Key Points grid for other topics */}
                        {card.keyPoints && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.keyPoints.map((kp) => (
                              <div key={kp.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${kp.badgeBg}`}>
                                    {kp.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{kp.title}</h4>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{kp.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Pointer Visual */}
                        {card.pointerVisual && (
                          <TopicVisualDemonstration topicId={activeData.topicId || 'two-pointers'} card={card} stepIndex={pointerStepIndex} />
                        )}
                      </div>
                    )}

                    {/* =================================================================== */}
                    {/* CARD 5 — HOW IT WORKS                                               */}
                    {/* =================================================================== */}
                    {(card.cardNumber === 5 || card.id === 'how-it-works') && (
                      <div className="space-y-4 sm:space-y-5">
                        {/* 4-Step Process Flow Grid */}
                        {card.flowSteps && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {card.flowSteps.map((fs) => (
                              <div key={fs.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl space-y-1.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${fs.bg}`}>
                                  {fs.num}
                                </span>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{fs.title}</h4>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{fs.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Key Points grid if flowSteps missing */}
                        {card.keyPoints && !card.flowSteps && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.keyPoints.map((kp) => (
                              <div key={kp.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${kp.badgeBg}`}>
                                    {kp.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{kp.title}</h4>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{kp.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Animated Step Loop */}
                        {card.visualStage && (
                          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-3 text-center shadow-inner">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
                              Continuous Execution Loop
                            </span>
                            <div className="flex items-center justify-center gap-3 font-mono py-2">
                              {card.visualStage.arrayValues.map((val, idx) => {
                                const isLeft = idx === (pointerStepIndex % 2 === 0 ? 0 : 1);
                                const isRight = idx === (pointerStepIndex % 2 === 0 ? 3 : 2);
                                return (
                                  <div key={idx} className="flex flex-col items-center space-y-1.5">
                                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-sm sm:text-base font-black transition-all ${isLeft ? 'bg-emerald-600 border border-emerald-400' : isRight ? 'bg-sky-600 border border-sky-400' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                                      {val}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="p-2 bg-indigo-950/70 border border-indigo-800 rounded-xl text-xs sm:text-sm font-bold text-indigo-200">
                              Active Phase: {card.visualStage.loopPhases[pointerStepIndex % card.visualStage.loopPhases.length]}
                            </div>
                          </div>
                        )}

                        {/* Pointer Visual */}
                        {!card.visualStage && card.pointerVisual && (
                          <TopicVisualDemonstration topicId={activeData.topicId || 'two-pointers'} card={card} stepIndex={pointerStepIndex} />
                        )}
                      </div>
                    )}

                    {/* =================================================================== */}
                    {/* CARD 6 — PATTERNS / TYPES                                           */}
                    {/* =================================================================== */}
                    {(card.cardNumber === 6 || card.id === 'patterns-types') && (
                      <div className="space-y-4">
                        {card.patterns && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.patterns.map((pt, i) => (
                              <div
                                key={i}
                                onClick={() => setSelectedPatternTab(i)}
                                className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                                  selectedPatternTab === i
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                    : 'bg-white border-slate-200/80 text-slate-900 hover:border-indigo-300'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className={`text-xs font-black px-2 py-0.5 rounded border ${selectedPatternTab === i ? 'bg-indigo-700 text-white border-indigo-500' : pt.color}`}>
                                    Pattern {pt.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold">{pt.name}</h4>
                                </div>
                                <div className={`p-2 rounded-xl font-mono text-xs text-center font-bold ${selectedPatternTab === i ? 'bg-indigo-800/80 text-white' : 'bg-slate-900 text-emerald-400'}`}>
                                  {pt.diagram}
                                </div>
                                <p className={`text-xs leading-relaxed font-medium ${selectedPatternTab === i ? 'text-indigo-100' : 'text-slate-600'}`}>
                                  {pt.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Key Points grid for other topics */}
                        {card.keyPoints && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.keyPoints.map((kp) => (
                              <div key={kp.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${kp.badgeBg}`}>
                                    {kp.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{kp.title}</h4>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{kp.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Pointer Visual */}
                        {card.pointerVisual && (
                          <TopicVisualDemonstration topicId={activeData.topicId || 'two-pointers'} card={card} stepIndex={pointerStepIndex} />
                        )}
                      </div>
                    )}

                    {/* =================================================================== */}
                    {/* CARD 7 — COMPLEXITY                                                 */}
                    {/* =================================================================== */}
                    {(card.cardNumber === 7 || card.id === 'complexity') && (
                      <div className="space-y-4 sm:space-y-5">
                        {card.comparison && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="p-3.5 sm:p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-rose-700 uppercase">{card.comparison.bruteForce.label}</span>
                                <span className="text-xs font-black text-rose-700 px-2 py-0.5 bg-rose-100 rounded border border-rose-200">{card.comparison.bruteForce.complexity}</span>
                              </div>
                              <p className="text-xs text-rose-950 font-semibold">{card.comparison.bruteForce.checks}</p>
                              <span className="text-xs text-slate-500 block">{card.comparison.bruteForce.example}</span>
                            </div>

                            <div className="p-3.5 sm:p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-emerald-700 uppercase">{card.comparison.twoPointers.label}</span>
                                <span className="text-xs font-black text-emerald-700 px-2 py-0.5 bg-emerald-100 rounded border border-emerald-200">{card.comparison.twoPointers.complexity}</span>
                              </div>
                              <p className="text-xs text-emerald-950 font-semibold">{card.comparison.twoPointers.checks}</p>
                              <span className="text-xs text-slate-500 block">{card.comparison.twoPointers.example}</span>
                            </div>
                          </div>
                        )}

                        {/* Key Points grid for other topics */}
                        {card.keyPoints && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.keyPoints.map((kp) => (
                              <div key={kp.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${kp.badgeBg}`}>
                                    {kp.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{kp.title}</h4>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{kp.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {card.timeSpace && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.timeSpace.map((ts, i) => (
                              <div key={i} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{ts.title}</h4>
                                  <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${ts.bg}`}>{ts.badge}</span>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{ts.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Pointer Visual */}
                        {card.pointerVisual && (
                          <TopicVisualDemonstration topicId={activeData.topicId || 'two-pointers'} card={card} stepIndex={pointerStepIndex} />
                        )}

                        {card.note && (
                          <p className="text-xs text-slate-500 italic text-center block">
                            {card.note}
                          </p>
                        )}
                      </div>
                    )}

                    {/* =================================================================== */}
                    {/* CARD 8 — IMPORTANT THINGS / EDGE CASES                              */}
                    {/* =================================================================== */}
                    {(card.cardNumber === 8 || card.id === 'important-things-edge-cases' || card.id === 'edge-cases') && (
                      <div className="space-y-4">
                        {card.edgeCases && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {card.edgeCases.map((ec, i) => (
                              <div key={i} className="p-3 bg-white border border-slate-200/80 rounded-2xl space-y-2 shadow-2xs">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${ec.bg}`}>
                                  {ec.title}
                                </span>
                                <div className="p-1.5 rounded-xl bg-slate-900 text-amber-400 font-mono text-xs text-center font-bold">
                                  {ec.visual}
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{ec.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Key Points grid for other topics */}
                        {card.keyPoints && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.keyPoints.map((kp) => (
                              <div key={kp.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${kp.badgeBg}`}>
                                    {kp.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{kp.title}</h4>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{kp.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Pointer Visual */}
                        {card.pointerVisual && (
                          <TopicVisualDemonstration topicId={activeData.topicId || 'two-pointers'} card={card} stepIndex={pointerStepIndex} />
                        )}
                      </div>
                    )}

                    {/* =================================================================== */}
                    {/* CARD 9 — LANGUAGE SYNTAX (DYNAMIC LANGUAGE PREFERENCE CARD)         */}
                    {/* =================================================================== */}
                    {(card.cardNumber === 9 || card.id === 'language-syntax' || card.isSyntaxCard) && (
                      <div className="space-y-4">
                        <LanguageSyntaxCard topicId={activeData.topicId || 'two-pointers'} topicName={activeData.topicName || 'Two Pointers'} />
                      </div>
                    )}

                    {/* =================================================================== */}
                    {/* CARD 10 — QUICK MEMORY / TAKEAWAY                                   */}
                    {/* =================================================================== */}
                    {(card.cardNumber === 10 || card.id === 'quick-memory-takeaway' || card.id === 'quick-memory') && (
                      <div className="space-y-4 sm:space-y-5">
                        {/* Central Title */}
                        {card.centralTitle && (
                          <div className="text-center p-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-2xl shadow-md border border-indigo-500">
                            <h4 className="text-2xl font-black tracking-wider uppercase">{card.centralTitle}</h4>
                            <p className="text-xs sm:text-sm text-indigo-100 font-medium pt-1">Master Algorithmic Traversal Pattern</p>
                          </div>
                        )}

                        {/* Animated 5-Step Flowchart */}
                        {card.summaryFlow && (
                          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-2.5 shadow-inner">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block text-center">
                              Complete 5-Step Algorithmic Cycle
                            </span>
                            <div className="flex flex-col items-center gap-1.5 font-mono text-xs">
                              {card.summaryFlow.map((sf, i) => (
                                <React.Fragment key={i}>
                                  <div className="px-4 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 w-full max-w-md text-center font-bold">
                                    {sf}
                                  </div>
                                  {i < card.summaryFlow.length - 1 && <span className="text-indigo-400 font-bold">↓</span>}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Key Points grid for other topics */}
                        {card.keyPoints && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {card.keyPoints.map((kp) => (
                              <div key={kp.num} className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${kp.badgeBg}`}>
                                    {kp.num}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{kp.title}</h4>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">{kp.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Family Pattern Chips */}
                        {card.familyChips && (
                          <div className="flex flex-wrap items-center justify-center gap-2">
                            {card.familyChips.map((chip, i) => (
                              <span key={i} className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-extrabold">
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Pointer Visual */}
                        {card.pointerVisual && (
                          <TopicVisualDemonstration topicId={activeData.topicId || 'two-pointers'} card={card} stepIndex={pointerStepIndex} />
                        )}

                        {/* Final Memory Box */}
                        {card.finalBox && (
                          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-1 text-center text-amber-950 font-bold text-xs sm:text-sm shadow-2xs">
                            <p className="font-black text-amber-900">"{card.finalBox.line1}"</p>
                            <p className="text-xs text-amber-800 font-semibold">{card.finalBox.line2}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* =================================================================== */}
                    {/* MEMORY TAKEAWAY BANNER (SHOWN ON ALL CARDS EXCEPT CARD 1)          */}
                    {/* =================================================================== */}
                    {card.memoryTakeaway && card.cardNumber !== 1 && (
                      <div className="p-3 sm:p-4 bg-amber-50/90 border border-amber-200/90 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm text-amber-950 font-bold shadow-2xs mt-2">
                        <Lightbulb size={18} className="text-amber-600 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider block">
                            Remember Takeaway
                          </span>
                          <span className="text-xs sm:text-sm font-black text-amber-900">
                            "{card.memoryTakeaway}"
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold shrink-0">
                    <span>PathPilot DSA Intro</span>
                    {isActive ? (
                      <span className="text-indigo-600 font-bold flex items-center gap-1">
                        Active Unit
                      </span>
                    ) : (
                      <span className="text-slate-400">Click to select</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CAROUSEL NAVIGATION CONTROLS & 10 PROGRESS DOTS              */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
          {/* ← Previous Button */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100 disabled:hover:text-slate-700"
            aria-label="Previous Learning Card"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {/* 10 Card Indicator Dots (Active Dot Clearly Highlighted) */}
          <div className="flex items-center gap-2">
            {cards.map((_, idx) => {
              const isDotActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isDotActive
                      ? 'w-8 h-2.5 bg-indigo-600 shadow-xs'
                      : 'w-2.5 h-2.5 bg-slate-200 hover:bg-indigo-300'
                  }`}
                  aria-label={`Go to Card ${idx + 1}`}
                  title={`Card ${idx + 1}: ${cards[idx]?.title}`}
                />
              );
            })}
          </div>

          {/* Next → Button */}
          <button
            onClick={handleNext}
            disabled={activeIndex === totalCards - 1}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100 disabled:hover:text-slate-700"
            aria-label="Next Learning Card"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* TOPIC-SPECIFIC VISUAL DEMONSTRATION RENDERERS                             */
/* ========================================================================= */

function TreeVisualDemonstration({ card, stepIndex }) {
  const steps = card.pointerVisual?.steps || [
    { label: 'Root 10 -> Left Subtree (5) & Right Subtree (15)', activeNodes: ['10', '5', '15'] }
  ];
  const curStep = steps[stepIndex % steps.length];

  return (
    <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
          <span>🌳</span> Tree & BST Hierarchy
        </span>
        {steps.length > 1 && (
          <span className="text-xs text-slate-400 font-semibold">
            Step {(stepIndex % steps.length) + 1} / {steps.length}
          </span>
        )}
      </div>

      <div className="py-2 flex flex-col items-center justify-center space-y-1 select-none font-mono">
        {/* Level 1: Root Node */}
        <div className="flex justify-center">
          <div className={`w-10 h-10 rounded-full flex flex-col items-center justify-center text-xs font-black border-2 transition-all duration-300 ${
            curStep?.activeNodes?.includes('10') || curStep?.activeNode === '10'
              ? 'bg-indigo-600 text-white border-indigo-300 shadow-md scale-110'
              : 'bg-slate-800 text-slate-200 border-slate-700'
          }`}>
            <span>10</span>
          </div>
        </div>

        {/* Connector Lines L1 -> L2 */}
        <div className="w-28 flex justify-between text-xs text-slate-500 font-bold px-3">
          <span>/</span>
          <span>\</span>
        </div>

        {/* Level 2: Children */}
        <div className="w-44 flex justify-between items-center">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-300 ${
            curStep?.activeNodes?.includes('5') || curStep?.activeNode === '5'
              ? 'bg-emerald-600 text-white border-emerald-300 shadow-md scale-105'
              : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}>
            5
          </div>

          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-300 ${
            curStep?.activeNodes?.includes('15') || curStep?.activeNode === '15'
              ? 'bg-sky-600 text-white border-sky-300 shadow-md scale-105'
              : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}>
            15
          </div>
        </div>

        {/* Connector Lines L2 -> L3 */}
        <div className="w-48 flex justify-between text-xs text-slate-500 font-bold px-2">
          <div className="w-10 flex justify-between px-1">
            <span>/</span>
            <span>\</span>
          </div>
          <div className="w-10 flex justify-center text-slate-600">
            <span>\</span>
          </div>
        </div>

        {/* Level 3: Leaves */}
        <div className="w-52 flex justify-between items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black border transition-all ${
            curStep?.activeNodes?.includes('2') || curStep?.activeNode === '2'
              ? 'bg-amber-600 text-white border-amber-300 scale-105'
              : 'bg-slate-800/90 text-slate-400 border-slate-700'
          }`}>
            2
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black border transition-all ${
            curStep?.activeNodes?.includes('7') || curStep?.activeNode === '7'
              ? 'bg-amber-600 text-white border-amber-300 scale-105'
              : 'bg-slate-800/90 text-slate-400 border-slate-700'
          }`}>
            7
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black border transition-all ${
            curStep?.activeNodes?.includes('20') || curStep?.activeNode === '20'
              ? 'bg-purple-600 text-white border-purple-300 scale-105'
              : 'bg-slate-800/90 text-slate-400 border-slate-700'
          }`}>
            20
          </div>
        </div>
      </div>

      {curStep?.label && (
        <p className="text-xs sm:text-sm text-indigo-200 text-center font-semibold bg-indigo-950/70 py-1.5 px-3 rounded-xl border border-indigo-800/60">
          {curStep.label}
        </p>
      )}
    </div>
  );
}

function LinkedListVisualDemonstration({ card, stepIndex }) {
  const steps = card.pointerVisual?.steps || [
    { label: 'Head node 10 points to node 20 via next pointer link', activeIdx: 0 }
  ];
  const curStep = steps[stepIndex % steps.length];
  const nodes = card.pointerVisual?.nodes || [10, 20, 30, 40];

  return (
    <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
          <span>🔗</span> Linked List Chain
        </span>
        {steps.length > 1 && (
          <span className="text-xs text-slate-400 font-semibold">
            Step {(stepIndex % steps.length) + 1} / {steps.length}
          </span>
        )}
      </div>

      <div className="flex items-center justify-center gap-1 sm:gap-2 py-3 overflow-x-auto font-mono">
        {nodes.map((val, idx) => {
          const isActive = curStep?.activeIdx === idx || curStep?.curr === idx;
          const isPrev = curStep?.prev === idx;
          const isNext = curStep?.next === idx;

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center space-y-1">
                <span className={`text-[10px] font-extrabold h-4 ${
                  isActive ? 'text-emerald-400' : isPrev ? 'text-amber-400' : isNext ? 'text-sky-400' : 'opacity-0'
                }`}>
                  {isActive ? (idx === 0 ? 'HEAD/CURR' : 'CURR') : isPrev ? 'PREV' : isNext ? 'NEXT' : ''}
                </span>

                <div className={`flex items-center rounded-xl overflow-hidden border-2 transition-all ${
                  isActive
                    ? 'bg-emerald-950 border-emerald-400 shadow-md scale-105'
                    : isPrev
                    ? 'bg-amber-950 border-amber-400'
                    : 'bg-slate-800 border-slate-700'
                }`}>
                  <div className="px-2.5 py-1.5 text-xs font-black text-white border-r border-slate-700">
                    {val}
                  </div>
                  <div className="px-1.5 py-1.5 text-[9px] font-bold text-slate-400 bg-slate-900/60">
                    next •
                  </div>
                </div>
              </div>

              {idx < nodes.length - 1 ? (
                <span className="text-emerald-400 font-black text-xs pt-3">►</span>
              ) : (
                <div className="flex flex-col items-center pt-3">
                  <span className="text-emerald-400 font-black text-xs">►</span>
                  <span className="text-[9px] font-extrabold text-rose-400 bg-rose-950/60 px-1 py-0.5 rounded border border-rose-800">NULL</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {curStep?.label && (
        <p className="text-xs sm:text-sm text-indigo-200 text-center font-semibold bg-indigo-950/70 py-1.5 px-3 rounded-xl border border-indigo-800/60">
          {curStep.label}
        </p>
      )}
    </div>
  );
}

function GraphVisualDemonstration({ card, stepIndex }) {
  const steps = card.pointerVisual?.steps || [
    { label: 'BFS visits Node A first, pushing neighbors B & C to Queue', queue: ['B', 'C'], visited: ['A'], activeNode: 'A' }
  ];
  const curStep = steps[stepIndex % steps.length];

  return (
    <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
          <span>🕸️</span> Graph Vertices & Traversal State
        </span>
        {steps.length > 1 && (
          <span className="text-xs text-slate-400 font-semibold">
            Step {(stepIndex % steps.length) + 1} / {steps.length}
          </span>
        )}
      </div>

      <div className="py-2 flex flex-col items-center justify-center space-y-3 font-mono">
        <div className="flex items-center gap-2 sm:gap-3">
          {['A', 'B', 'C', 'D'].map((node) => {
            const isVisited = curStep?.visited?.includes(node);
            const isActive = curStep?.activeNode === node;
            const inQueue = curStep?.queue?.includes(node);

            return (
              <React.Fragment key={node}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-300 shadow-md scale-110'
                    : isVisited
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : inQueue
                    ? 'bg-sky-600 text-white border-sky-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {node}
                </div>
                {node !== 'D' && <span className="text-slate-600 font-bold">──</span>}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-1.5">
            <span className="text-sky-400 font-bold">Queue/Stack:</span>
            <span className="text-white font-mono">[{curStep?.queue ? curStep.queue.join(', ') : 'Empty'}]</span>
          </div>

          <div className="px-3 py-1 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">Visited:</span>
            <span className="text-white font-mono">{'{'}{curStep?.visited ? curStep.visited.join(', ') : 'None'}{'}'}</span>
          </div>
        </div>
      </div>

      {curStep?.label && (
        <p className="text-xs sm:text-sm text-indigo-200 text-center font-semibold bg-indigo-950/70 py-1.5 px-3 rounded-xl border border-indigo-800/60">
          {curStep.label}
        </p>
      )}
    </div>
  );
}

function DPVisualDemonstration({ card, stepIndex }) {
  const steps = card.pointerVisual?.steps || [
    { label: 'Compute dp[2] = dp[1] + dp[0] = 1 + 0 = 1', activeIdx: 2, formula: 'dp[i] = dp[i-1] + dp[i-2]' }
  ];
  const curStep = steps[stepIndex % steps.length];
  const dpTable = card.pointerVisual?.dpTable || [
    { idx: 0, val: 0 },
    { idx: 1, val: 1 },
    { idx: 2, val: 1 },
    { idx: 3, val: 2 },
    { idx: 4, val: 3 },
    { idx: 5, val: 5 }
  ];

  return (
    <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <span>⚡</span> DP State Tabulation Table
        </span>
        {steps.length > 1 && (
          <span className="text-xs text-slate-400 font-semibold">
            Step {(stepIndex % steps.length) + 1} / {steps.length}
          </span>
        )}
      </div>

      <div className="py-2 flex flex-col items-center justify-center space-y-2 font-mono">
        {curStep?.formula && (
          <div className="px-3 py-1 bg-amber-950/80 border border-amber-700/60 rounded-lg text-amber-200 text-xs font-bold">
            Formula: {curStep.formula}
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-1">
          {dpTable.map((item, idx) => {
            const isActive = curStep?.activeIdx === idx;
            const isPrev = curStep?.activeIdx - 1 === idx || curStep?.activeIdx - 2 === idx;

            return (
              <div key={idx} className="flex flex-col items-center space-y-1">
                <span className="text-[9px] text-slate-400 font-bold">dp[{item.idx}]</span>
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xs sm:text-sm font-black border-2 transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white border-amber-300 shadow-md scale-105'
                    : isPrev
                    ? 'bg-indigo-600 text-white border-indigo-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {item.val}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {curStep?.label && (
        <p className="text-xs sm:text-sm text-indigo-200 text-center font-semibold bg-indigo-950/70 py-1.5 px-3 rounded-xl border border-indigo-800/60">
          {curStep.label}
        </p>
      )}
    </div>
  );
}

function BinarySearchVisualDemonstration({ card, stepIndex }) {
  const steps = card.pointerVisual?.steps || [
    { left: 0, right: 9, mid: 4, label: 'Search target 23: low=0, high=9 -> mid=4 (val=16 < 23)' }
  ];
  const curStep = steps[stepIndex % steps.length];
  const arrayValues = card.pointerVisual?.arrayValues || [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

  return (
    <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
          <span>🎯</span> Logarithmic Halving (Low / Mid / High)
        </span>
        {steps.length > 1 && (
          <span className="text-xs text-slate-400 font-semibold">
            Step {(stepIndex % steps.length) + 1} / {steps.length}
          </span>
        )}
      </div>

      <div className="flex items-center justify-center gap-1 sm:gap-2 py-2 font-mono overflow-x-auto">
        {arrayValues.map((val, idx) => {
          const isLow = idx === curStep?.left;
          const isHigh = idx === curStep?.right;
          const isMid = idx === curStep?.mid;
          const inRange = curStep ? (idx >= curStep.left && idx <= curStep.right) : true;

          return (
            <div key={idx} className="flex flex-col items-center space-y-1">
              <span className={`text-[9px] font-extrabold h-4 ${
                isMid ? 'text-amber-400 font-black' : isLow ? 'text-emerald-400' : isHigh ? 'text-sky-400' : 'opacity-0'
              }`}>
                {isMid ? 'MID' : isLow ? 'LOW' : isHigh ? 'HIGH' : ''}
              </span>

              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-black border-2 transition-all ${
                isMid
                  ? 'bg-amber-600 text-white border-amber-300 shadow-md scale-110'
                  : isLow
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : isHigh
                  ? 'bg-sky-600 text-white border-sky-400'
                  : inRange
                  ? 'bg-slate-800 text-slate-200 border-slate-600'
                  : 'bg-slate-950 text-slate-600 border-slate-900 opacity-40'
              }`}>
                {val}
              </div>
              <span className="text-[9px] text-slate-500 font-medium">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {curStep?.label && (
        <p className="text-xs sm:text-sm text-indigo-200 text-center font-semibold bg-indigo-950/70 py-1.5 px-3 rounded-xl border border-indigo-800/60">
          {curStep.label}
        </p>
      )}
    </div>
  );
}

function SortingVisualDemonstration({ card, stepIndex }) {
  const steps = card.pointerVisual?.steps || [
    { left: 0, right: 1, label: 'Comparing adjacent elements: 5 & 2 (5 > 2 -> Swap!)', array: [2, 5, 8, 1] }
  ];
  const curStep = steps[stepIndex % steps.length];
  const arrayValues = curStep?.array || card.pointerVisual?.arrayValues || [5, 2, 8, 1];

  return (
    <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
          <span>🔄</span> Array Partition & Swap Operations
        </span>
        {steps.length > 1 && (
          <span className="text-xs text-slate-400 font-semibold">
            Step {(stepIndex % steps.length) + 1} / {steps.length}
          </span>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 font-mono">
        {arrayValues.map((val, idx) => {
          const isComparing = idx === curStep?.left || idx === curStep?.right;

          return (
            <div key={idx} className="flex flex-col items-center space-y-1">
              <span className={`text-[10px] font-extrabold h-4 ${isComparing ? 'text-rose-400' : 'opacity-0'}`}>
                {isComparing ? 'CMP' : ''}
              </span>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xs sm:text-sm font-black transition-all ${
                isComparing
                  ? 'bg-rose-600 text-white border-2 border-rose-300 shadow-md scale-105'
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                {val}
              </div>
              <span className="text-xs text-slate-500 font-medium">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {curStep?.label && (
        <p className="text-xs sm:text-sm text-indigo-200 text-center font-semibold bg-indigo-950/70 py-1.5 px-3 rounded-xl border border-indigo-800/60">
          {curStep.label}
        </p>
      )}
    </div>
  );
}

function ArraysVisualDemonstration({ card, stepIndex }) {
  const steps = card.pointerVisual?.steps || [
    { label: 'Contiguous memory layout: addresses 0x100, 0x104, 0x108, 0x10C', activeIdx: 1 }
  ];
  const curStep = steps[stepIndex % steps.length];
  const arrayValues = card.pointerVisual?.arrayValues || ['P', 'A', 'T', 'H'];

  return (
    <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
          <span>📦</span> Contiguous Memory & Index Offset
        </span>
        {steps.length > 1 && (
          <span className="text-xs text-slate-400 font-semibold">
            Step {(stepIndex % steps.length) + 1} / {steps.length}
          </span>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 font-mono">
        {arrayValues.map((val, idx) => {
          const isActive = curStep?.activeIdx === idx || (curStep?.left <= idx && idx <= curStep?.right);

          return (
            <div key={idx} className="flex flex-col items-center space-y-1">
              <span className="text-[10px] text-indigo-400 font-bold">0x{100 + idx * 4}</span>
              <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-sm sm:text-base font-black transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white border-2 border-indigo-400 shadow-md scale-105'
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                {val}
              </div>
              <span className="text-xs text-slate-500 font-medium">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {curStep?.label && (
        <p className="text-xs sm:text-sm text-indigo-200 text-center font-semibold bg-indigo-950/70 py-1.5 px-3 rounded-xl border border-indigo-800/60">
          {curStep.label}
        </p>
      )}
    </div>
  );
}

function TopicVisualDemonstration({ topicId, card, stepIndex }) {
  if (!card) return null;

  if (topicId === 'two-pointers' || !topicId) {
    if (card.pointerVisual && card.pointerVisual.arrayValues && card.pointerVisual.steps) {
      const steps = card.pointerVisual.steps;
      const curStep = steps[stepIndex % steps.length];
      return (
        <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Visual Demonstration</span>
            <span className="text-xs text-slate-400 font-semibold">
              Step {(stepIndex % steps.length) + 1} / {steps.length}
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-4 py-2 font-mono">
            {card.pointerVisual.arrayValues.map((val, idx) => {
              const isLeft = idx === curStep.left;
              const isRight = idx === curStep.right;
              return (
                <div key={idx} className="flex flex-col items-center space-y-1.5">
                  <span className={`text-xs font-extrabold h-5 transition-all duration-300 ${isLeft ? 'text-emerald-400' : isRight ? 'text-sky-400' : 'opacity-0'}`}>
                    {isLeft ? 'LEFT ↑' : isRight ? 'RIGHT ↑' : ''}
                  </span>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-base sm:text-lg font-black transition-all duration-300 ${isLeft ? 'bg-emerald-600 text-white border-2 border-emerald-400 shadow-md scale-105' : isRight ? 'bg-sky-600 text-white border-2 border-sky-400 shadow-md scale-105' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                    {val}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">[{idx}]</span>
                </div>
              );
            })}
          </div>
          {curStep?.label && (
            <p className="text-xs sm:text-sm text-indigo-200 text-center font-semibold bg-indigo-950/70 py-1.5 px-3 rounded-xl border border-indigo-800/60">
              {curStep.label}
            </p>
          )}
        </div>
      );
    }
  }

  if (topicId === 'trees') {
    return <TreeVisualDemonstration card={card} stepIndex={stepIndex} />;
  }

  if (topicId === 'linked-list') {
    return <LinkedListVisualDemonstration card={card} stepIndex={stepIndex} />;
  }

  if (topicId === 'graphs') {
    return <GraphVisualDemonstration card={card} stepIndex={stepIndex} />;
  }

  if (topicId === 'dp') {
    return <DPVisualDemonstration card={card} stepIndex={stepIndex} />;
  }

  if (topicId === 'binary-search') {
    return <BinarySearchVisualDemonstration card={card} stepIndex={stepIndex} />;
  }

  if (topicId === 'sorting') {
    return <SortingVisualDemonstration card={card} stepIndex={stepIndex} />;
  }

  if (topicId === 'arrays') {
    return <ArraysVisualDemonstration card={card} stepIndex={stepIndex} />;
  }

  return null;
}

