import React, { useState, useEffect } from 'react';
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FileText,
  RotateCcw,
  Check,
  Send,
  Layers,
  Award,
  Zap,
  Compass,
  History,
  Eye,
  X,
  Copy,
  ListFilter,
  Clock,
  Building2,
  Target,
  Flame,
  Star,
  CheckSquare,
  BarChart2,
  Filter
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../profile/LanguageSelector';
import { useAuth } from '../../hooks/useAuth';
import { useNotes } from '../../hooks/useNotes';
import { practiceHistoryService } from '../../services/practiceHistoryService';
import { TWO_POINTERS_QUESTION_BANK } from '../../data/twoPointersQuestionBank';
import { useBestu } from '../../contexts/BestuContext';
import { useProfile } from '../../hooks/useProfile';
import AddNoteButton from '../notes/AddNoteButton';
import { evaluateProblemSolution, resolveFunctionName } from '../../utils/codeEvaluator';

const PRACTICE_PROBLEMS = TWO_POINTERS_QUESTION_BANK;

const TOPIC_NAMES = {
  'two-pointers': 'Two Pointers',
  'arrays': 'Arrays & Strings',
  'sorting': 'Sorting Algorithms',
  'binary-search': 'Binary Search',
  'linked-list': 'Linked List',
  'trees': 'Trees & BST',
  'graphs': 'Graphs & BFS/DFS',
  'dp': 'Dynamic Programming'
};

/**
 * TOPIC-SPECIFIC CONCEPT CHECK QUESTIONS FOR ANALYSIS
 */
const CONCEPT_QUESTIONS_BY_TOPIC = {
  'two-pointers': {
    question: 'Why can Two Pointers eliminate O(N²) brute-force searches in array problems?',
    options: [
      { id: 'A', text: 'It checks every possible combination of elements in the array.' },
      { id: 'B', text: 'It uses ordering or boundary invariants to skip invalid candidate pairs deterministically.', correct: true },
      { id: 'C', text: 'It randomly samples elements until a match is found.' },
      { id: 'D', text: 'It converts the array into a hash set automatically.' }
    ],
    explanation: 'Correct! Two Pointers leverages array order or geometric boundaries to shrink the search space linearly, reducing O(N²) down to O(N).'
  },
  'arrays': {
    question: 'Why do contiguous array structures support constant O(1) time random index access?',
    options: [
      { id: 'A', text: 'Elements are stored in random memory locations connected by pointers.' },
      { id: 'B', text: 'Index math calculates memory offset instantly via BaseAddress + (index * ElementSize).', correct: true },
      { id: 'C', text: 'Arrays use binary search internally for every lookup.' },
      { id: 'D', text: 'Array memory is reallocated on every single access.' }
    ],
    explanation: 'Correct! Contiguous memory layout allows direct memory offset calculation in constant O(1) time.'
  },
  'sorting': {
    question: 'Why is O(N log N) the optimal time complexity bound for comparison-based sorting algorithms?',
    options: [
      { id: 'A', text: 'Arrays can never contain more than log N elements.' },
      { id: 'B', text: 'The decision tree of N! permutations requires at least log2(N!) = O(N log N) comparisons.', correct: true },
      { id: 'C', text: 'Comparison sorting requires creating a copy of the array for every element.' },
      { id: 'D', text: 'Hardware CPUs can only execute log N loop iterations per second.' }
    ],
    explanation: 'Correct! Information theory proves comparison-based sorting requires at least Ω(N log N) comparisons.'
  },
  'binary-search': {
    question: 'Why does Binary Search require a monotonic / sorted search space?',
    options: [
      { id: 'A', text: 'Because unsorted arrays cannot be accessed by index.' },
      { id: 'B', text: 'Because comparing mid allows safely discarding half the remaining search range.', correct: true },
      { id: 'C', text: 'Because binary search creates a linked list behind the scenes.' },
      { id: 'D', text: 'Because mid calculation fails if numbers are negative.' }
    ],
    explanation: 'Correct! Sorted order guarantees that if target > mid, target cannot exist in the left half, allowing linear halving.'
  },
  'linked-list': {
    question: 'What is the primary advantage of a Singly Linked List over a contiguous Array?',
    options: [
      { id: 'A', text: 'Instant O(1) random access to any element by index.' },
      { id: 'B', text: 'O(1) insertion and deletion at known node pointers without element shifting.', correct: true },
      { id: 'C', text: 'Better CPU L1 cache locality and lower memory overhead per element.' },
      { id: 'D', text: 'Automatic thread safety across concurrent threads.' }
    ],
    explanation: 'Correct! Pointer node rewiring allows O(1) insertions/deletions at known nodes without shifting array elements.'
  },
  'trees': {
    question: 'Why does a balanced Binary Search Tree (BST) guarantee O(log N) search and insertion time?',
    options: [
      { id: 'A', text: 'Because every node in a tree has exactly two child nodes.' },
      { id: 'B', text: 'Because tree height remains bounded at log2(N), halving remaining search nodes at each step.', correct: true },
      { id: 'C', text: 'Because trees automatically sort their elements using quicksort.' },
      { id: 'D', text: 'Because root node always stores the maximum element.' }
    ],
    explanation: 'Correct! In a balanced BST, tree height is log(N), ensuring search paths stay logarithmic.'
  },
  'graphs': {
    question: 'What is the key difference between Breadth-First Search (BFS) and Depth-First Search (DFS)?',
    options: [
      { id: 'A', text: 'BFS uses a LIFO Stack while DFS uses a FIFO Queue.' },
      { id: 'B', text: 'BFS explores level-by-level using a FIFO Queue; DFS explores as deep as possible using a Stack/Recursion.', correct: true },
      { id: 'C', text: 'BFS works only on trees while DFS works only on matrices.' },
      { id: 'D', text: 'DFS always finds the unweighted shortest path faster than BFS.' }
    ],
    explanation: 'Correct! BFS explores expanding concentric frontiers (queue), finding shortest paths in unweighted graphs.'
  },
  'dp': {
    question: 'What two structural properties must a problem possess for Dynamic Programming to apply?',
    options: [
      { id: 'A', text: 'Sorted input array and two pointer boundaries.' },
      { id: 'B', text: 'Optimal Substructure and Overlapping Subproblems.', correct: true },
      { id: 'C', text: 'Linear memory alignment and floating point values.' },
      { id: 'D', text: 'Prime number keys and hash collisions.' }
    ],
    explanation: 'Correct! DP solves problems with optimal sub-solutions that repeat multiple times (overlapping subproblems).'
  }
};

/**
 * DSAPracticeWorkflow Component
 */
export default function DSAPracticeWorkflow({ className = '', questionBank = TWO_POINTERS_QUESTION_BANK, topicId = 'two-pointers' }) {
  const { user } = useAuth();
  const PRACTICE_PROBLEMS = questionBank && questionBank.length > 0 ? questionBank : TWO_POINTERS_QUESTION_BANK;
  const currentTopicName = TOPIC_NAMES[topicId] || 'DSA';
  const conceptQuestion = CONCEPT_QUESTIONS_BY_TOPIC[topicId] || CONCEPT_QUESTIONS_BY_TOPIC['two-pointers'];

  // Active Selected Practice Problem State (Defaults to first problem in questionBank)
  const [selectedProblemId, setSelectedProblemId] = useState(() => PRACTICE_PROBLEMS[0]?.id || 'two-sum-ii');
  const activeProblem = PRACTICE_PROBLEMS.find((p) => p.id === selectedProblemId) || PRACTICE_PROBLEMS[0];

  const { profile } = useProfile();

  // Selected Language State (Syncs with User Profile / LocalStorage)
  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      const stored = localStorage.getItem('pathpilot_language');
      if (stored) return stored;
    } catch (e) {}
    return 'C++';
  });

  useEffect(() => {
    const profileLang = profile?.preferred_language;
    if (profileLang && profileLang !== selectedLang) {
      setSelectedLang(profileLang);
      setCode(activeProblem?.starterCode?.[profileLang] || activeProblem?.starterCode?.['C++'] || '');
    }
  }, [profile?.preferred_language]);

  // State Machine Model: 'initial' | 'coding' | 'results' | 'submitted'
  const [workflowState, setWorkflowState] = useState('initial');
  const [code, setCode] = useState(activeProblem.starterCode[selectedLang] || activeProblem.starterCode['C++']);
  const [activeTab, setActiveTab] = useState('problem'); // 'problem' | 'hints' | 'notes'
  const [userNote, setUserNote] = useState('');

  // Persistent student notes for this DSA topic & question
  const {
    notes: dsaNotes,
    loading: notesLoading,
    error: notesError,
    addNote: addDsaNote,
    updateNote: updateDsaNote,
    deleteNote: deleteDsaNote
  } = useNotes({
    subject: 'DSA',
    topicId
  });

  // Concept Check MCQ State inside Analysis
  const [selectedMcqOpt, setSelectedMcqOpt] = useState(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);

  const { setPageContext } = useBestu();
  useEffect(() => {
    if (activeProblem) {
      setPageContext({
        currentQuestion: {
          id: activeProblem.id,
          title: activeProblem.title,
          difficulty: activeProblem.difficulty,
          description: activeProblem.description,
          hints: activeProblem.hints || [],
          conceptCheck: conceptQuestion ? {
            question: conceptQuestion.question,
            options: conceptQuestion.options?.map(o => `${o.id}: ${o.text}`)
          } : null
        }
      });
    }
  }, [activeProblem, conceptQuestion, setPageContext]);

  // Practice History & Catalog Modal States
  const [attemptsHistory, setAttemptsHistory] = useState([]);
  const [problemStatsMap, setProblemStatsMap] = useState({});
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [showAttemptModal, setShowAttemptModal] = useState(false);
  const [selectedAttemptIdx, setSelectedAttemptIdx] = useState(0);

  // Catalog Drawer Filter States
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDiff, setFilterDiff] = useState('All');
  const [filterPattern, setFilterPattern] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCompany, setFilterCompany] = useState('All');
  const [interviewFocusOnly, setInterviewFocusOnly] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  // Load Attempt History & Topic Stats Map
  const loadHistoryAndStats = async () => {
    const attempts = await practiceHistoryService.getProblemAttempts(user?.id, selectedProblemId);
    const statsMap = await practiceHistoryService.getProblemStatsMap(user?.id);
    setAttemptsHistory(attempts);
    setProblemStatsMap(statsMap);
  };

  useEffect(() => {
    loadHistoryAndStats();
  }, [selectedProblemId, user?.id]);

  // Dynamic Test Case Evaluation State
  const [evaluationResult, setEvaluationResult] = useState(() =>
    evaluateProblemSolution(activeProblem, code, selectedLang)
  );

  // Sync selected problem when topic or question bank changes
  useEffect(() => {
    if (PRACTICE_PROBLEMS && PRACTICE_PROBLEMS.length > 0) {
      const defaultId = PRACTICE_PROBLEMS[0].id;
      setSelectedProblemId(defaultId);
      const initialCode = PRACTICE_PROBLEMS[0].starterCode[selectedLang] || PRACTICE_PROBLEMS[0].starterCode['C++'];
      setCode(initialCode);
      setWorkflowState('initial');
      setSelectedMcqOpt(null);
      setMcqSubmitted(false);
      setEvaluationResult(evaluateProblemSolution(PRACTICE_PROBLEMS[0], initialCode, selectedLang));
    }
  }, [topicId, questionBank]);

  // Switch Active Problem Handler
  const handleProblemChange = (problemId) => {
    setSelectedProblemId(problemId);
    const newProblem = PRACTICE_PROBLEMS.find((p) => p.id === problemId) || PRACTICE_PROBLEMS[0];
    const initialCode = newProblem.starterCode[selectedLang] || newProblem.starterCode['C++'];
    setCode(initialCode);
    setWorkflowState('initial');
    setSelectedMcqOpt(null);
    setMcqSubmitted(false);
    setSelectedAttemptIdx(0);
    setEvaluationResult(evaluateProblemSolution(newProblem, initialCode, selectedLang));
  };

  // Sync code when language changes
  const handleLanguageChange = (newLang) => {
    setSelectedLang(newLang);
    try {
      localStorage.setItem('pathpilot_language', newLang);
    } catch (e) {
      console.warn('[DSAPracticeWorkflow] Storage write failed:', e);
    }
    const initialCode = activeProblem.starterCode[newLang] || activeProblem.starterCode['C++'];
    setCode(initialCode);
    setWorkflowState('initial');
    setSelectedMcqOpt(null);
    setMcqSubmitted(false);
    setEvaluationResult(evaluateProblemSolution(activeProblem, initialCode, newLang));
  };

  const hasValidCode = Boolean(code && code.trim().length > 0);

  // Code Editing Handler
  const handleCodeChange = (e) => {
    const val = e.target.value;
    setCode(val);
    if (workflowState === 'initial' && val.trim().length > 0) {
      setWorkflowState('coding');
    }
  };

  // Dynamic Test Case Evaluation Logic for active problem
  const testCases = evaluationResult?.cases || [];
  const allPassed = Boolean(evaluationResult?.allPassed);
  const failedCases = testCases.filter((tc) => !tc.passed);

  // STATE 3: Click RUN Handler
  const handleRunCode = () => {
    if (!hasValidCode) return;
    const evaluated = evaluateProblemSolution(activeProblem, code, selectedLang);
    setEvaluationResult(evaluated);
    setWorkflowState('results');
  };

  // STATE 6: Click SUBMIT Handler (Persists Attempt to Database + Storage)
  const handleSubmitSolution = async () => {
    if (allPassed) {
      setWorkflowState('submitted');

      // Record attempt in practice history
      await practiceHistoryService.saveAttempt({
        userId: user?.id,
        problemId: activeProblem.id,
        problemTitle: activeProblem.title,
        difficulty: activeProblem.difficulty,
        pattern: activeProblem.pattern,
        language: selectedLang,
        submittedCode: code,
        passedCount: testCases.length,
        totalCount: testCases.length,
        result: 'PASSED',
        solutionAnalysis: activeProblem.patternNote
      });

      // Refresh attempts history & catalog stats
      await loadHistoryAndStats();
    }
  };

  // Post-Submission Action: Next Question
  const handleNextQuestion = () => {
    const currentIdx = PRACTICE_PROBLEMS.findIndex((p) => p.id === selectedProblemId);
    const nextIdx = (currentIdx + 1) % PRACTICE_PROBLEMS.length;
    handleProblemChange(PRACTICE_PROBLEMS[nextIdx].id);
  };

  // Post-Submission Action: Practice Same Pattern
  const handlePracticeSamePattern = () => {
    const samePatternProbs = PRACTICE_PROBLEMS.filter(
      (p) => p.pattern === activeProblem.pattern && p.id !== activeProblem.id
    );
    if (samePatternProbs.length > 0) {
      handleProblemChange(samePatternProbs[0].id);
    } else {
      handleNextQuestion();
    }
  };

  // Post-Submission Action: Try Again
  const handleTryAgain = () => {
    setWorkflowState('coding');
  };

  // Copy Code Helper
  const handleCopyCode = (text) => {
    try {
      navigator.clipboard.writeText(text);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (e) {
      console.warn('Copy to clipboard failed:', e);
    }
  };

  // Calculate Line Numbers for Code Editor
  const lineNumbers = code.split('\n').map((_, i) => i + 1);

  // Dynamic Overall & Interview Focus Metrics
  const totalQuestionsCount = PRACTICE_PROBLEMS.length;
  const overallCompletedCount = PRACTICE_PROBLEMS.filter(
    (p) => problemStatsMap[p.id]?.status === 'Completed'
  ).length;

  const interviewFocusQuestions = PRACTICE_PROBLEMS.filter(
    (p) => p.interviewPriority === 'Must Practice' || p.interviewPriority === 'High Priority'
  );
  const interviewFocusCompletedCount = interviewFocusQuestions.filter(
    (p) => problemStatsMap[p.id]?.status === 'Completed'
  ).length;

  // Filtered practice problems for Catalog Modal
  const filteredCatalogProblems = PRACTICE_PROBLEMS.filter((prob) => {
    const stat = problemStatsMap[prob.id] || { status: 'Not Started' };

    // Interview Focus Only Filter
    if (interviewFocusOnly && prob.interviewPriority !== 'Must Practice' && prob.interviewPriority !== 'High Priority') {
      return false;
    }

    // Status Filter
    if (filterStatus === 'Completed' && stat.status !== 'Completed') return false;
    if (filterStatus === 'In Progress' && stat.status !== 'In Progress') return false;
    if (filterStatus === 'Not Started' && stat.status !== 'Not Started') return false;

    // Difficulty Filter
    if (filterDiff !== 'All' && prob.difficulty !== filterDiff) return false;

    // Pattern Filter
    if (filterPattern !== 'All' && prob.pattern !== filterPattern) return false;

    // Priority Filter
    if (filterPriority !== 'All' && prob.interviewPriority !== filterPriority) return false;

    // Company Filter
    if (filterCompany !== 'All') {
      const inComp = prob.companies && prob.companies.includes(filterCompany);
      const inPlacement = prob.placementFocus && prob.placementFocus.includes(filterCompany);
      if (!inComp && !inPlacement) return false;
    }

    return true;
  });

  return (
    <div className={`space-y-6 select-none ${className}`}>
      {/* ------------------------------------------------------------- */}
      {/* CANONICAL PROBLEM SELECTOR & TOP ANALYTICS BAR                 */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Award size={16} /> {currentTopicName} Practice Bank
            </span>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Overall: <strong className="text-indigo-600 dark:text-indigo-400">{overallCompletedCount} / {totalQuestionsCount}</strong> Completed
            </span>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <Flame size={13} /> Interview Focus: <strong>{interviewFocusCompletedCount} / {interviewFocusQuestions.length}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => {
                setInterviewFocusOnly((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                interviewFocusOnly
                  ? 'bg-amber-500 text-white shadow-amber-500/30'
                  : 'bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100'
              }`}
            >
              <Flame size={14} />
              <span>{interviewFocusOnly ? '🔥 Interview Focus ACTIVE' : '🔥 Interview Focus Mode'}</span>
            </button>

            <button
              onClick={() => setShowExploreModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Compass size={14} />
              <span>Explore Bank ({PRACTICE_PROBLEMS.length})</span>
            </button>

            {attemptsHistory.length > 0 && (
              <button
                onClick={() => {
                  setSelectedAttemptIdx(0);
                  setShowAttemptModal(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <History size={14} />
                <span>My Attempts ({attemptsHistory.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Problem Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 shrink-0">
            Active Question:
          </span>
          {PRACTICE_PROBLEMS.slice(0, 10).map((prob, idx) => {
            const isSel = selectedProblemId === prob.id;
            const stat = problemStatsMap[prob.id];
            const isPassed = stat?.status === 'Completed';

            return (
              <button
                key={prob.id}
                onClick={() => handleProblemChange(prob.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSel
                    ? 'bg-indigo-600 text-white shadow-xs scale-[1.02]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isPassed && <CheckCircle2 size={13} className={isSel ? 'text-emerald-300' : 'text-emerald-500'} />}
                <span>{idx + 1}. {prob.title.split('—')[0].trim()}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowExploreModal(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-slate-200 cursor-pointer shrink-0"
          >
            + View All {PRACTICE_PROBLEMS.length} Problems
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* WORKSPACE HEADER                                              */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-xs font-bold uppercase tracking-wider">
                {activeProblem.difficulty} &bull; {activeProblem.pattern}
              </span>
              <span className="text-slate-300 dark:text-slate-700">&bull;</span>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                activeProblem.interviewPriority === 'Must Practice'
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border-amber-300'
                  : activeProblem.interviewPriority === 'High Priority'
                  ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300'
              }`}>
                {activeProblem.interviewPriority === 'Must Practice' ? '🔥 MUST PRACTICE' : activeProblem.interviewPriority === 'High Priority' ? '⭐ HIGH PRIORITY' : '💡 GOOD TO PRACTICE'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {activeProblem.title}
            </h2>
          </div>

          {/* Language Selector Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSel = selectedLang === lang.value;
              return (
                <button
                  key={lang.value}
                  onClick={() => handleLanguageChange(lang.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSel
                      ? 'bg-indigo-600 text-white shadow-xs scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PROBLEM STATEMENT & EDITOR GRID                               */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-w-0">
          {/* Left Column: Problem Details / Hints / Notes Tabs */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-4 min-w-0">
            {/* Tab Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setActiveTab('problem')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'problem'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                  }`}
                >
                  Problem Description
                </button>
                <button
                  onClick={() => setActiveTab('hints')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    activeTab === 'hints'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                  }`}
                >
                  <Lightbulb size={13} /> Hints
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    activeTab === 'notes'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                  }`}
                >
                  <FileText size={13} /> Notes
                  {dsaNotes.length > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        activeTab === 'notes'
                          ? 'bg-white/25 text-white'
                          : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                      }`}
                    >
                      {dsaNotes.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Instant Add My Note in Practice */}
              <AddNoteButton
                subject="DSA"
                topicId={topicId}
                topicName={currentTopicName}
                questionId={activeProblem?.id}
                questionTitle={activeProblem?.title}
                onNoteSaved={addDsaNote}
                size="sm"
              />
            </div>

            {/* Tab 1: Problem Statement */}
            {activeTab === 'problem' && (
              <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <p>{activeProblem.description}</p>

                {/* Company Interview Tags */}
                {activeProblem.companies && activeProblem.companies.length > 0 && (
                  <div className="p-3 bg-slate-100/70 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                      <Building2 size={13} className="text-indigo-500" /> Reported in interviews at:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProblem.companies.map((comp) => (
                        <span
                          key={comp}
                          className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 text-[11px]"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Target Placement Focus */}
                {activeProblem.placementFocus && activeProblem.placementFocus.length > 0 && (
                  <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 rounded-2xl space-y-1.5">
                    <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                      <Target size={13} className="text-emerald-600" /> Target Placement Focus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProblem.placementFocus.map((comp) => (
                        <span
                          key={comp}
                          className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white font-black text-[11px] shadow-2xs"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Example Box */}
                {activeProblem.example && (
                  <div className="space-y-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block uppercase tracking-wider text-[10px]">
                      Example 1:
                    </span>
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl font-mono text-[11px] space-y-1">
                      <div><span className="text-slate-400">Input:</span> {activeProblem.example.input}</div>
                      <div><span className="text-slate-400">Output:</span> {activeProblem.example.output}</div>
                      {activeProblem.example.explanation && (
                        <div><span className="text-slate-400 font-sans italic text-[10px]">Explanation: {activeProblem.example.explanation}</span></div>
                      )}
                    </div>
                  </div>
                )}

                {/* Constraints */}
                {activeProblem.constraints && activeProblem.constraints.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block uppercase tracking-wider text-[10px]">
                      Constraints:
                    </span>
                    <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      {activeProblem.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Hints */}
            {activeTab === 'hints' && (
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-950 dark:text-amber-200 space-y-1">
                  <span className="font-bold block flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                    <Lightbulb size={14} /> Progressive Hint:
                  </span>
                  <p>{activeProblem.progressiveHint}</p>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 rounded-xl text-indigo-950 dark:text-indigo-200 space-y-1">
                  <span className="font-bold block flex items-center gap-1.5 text-indigo-800 dark:text-indigo-300">
                    <Sparkles size={14} /> Pattern Strategy:
                  </span>
                  <p>{activeProblem.patternNote}</p>
                </div>
              </div>
            )}

            {/* Tab 3: Personal Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
                      My Notes for {currentTopicName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Personal notes created during practice
                    </span>
                  </div>
                  <AddNoteButton
                    subject="DSA"
                    topicId={topicId}
                    topicName={currentTopicName}
                    questionId={activeProblem?.id}
                    questionTitle={activeProblem?.title}
                    onNoteSaved={addDsaNote}
                    size="sm"
                  />
                </div>

                <MyNotesList
                  notes={dsaNotes}
                  loading={notesLoading}
                  error={notesError}
                  onUpdateNote={updateDsaNote}
                  onDeleteNote={deleteDsaNote}
                  topicName={currentTopicName}
                  subject="DSA"
                />
              </div>
            )}
          </div>

          {/* Right Column: Code Editor */}
          <div className="lg:col-span-7 space-y-3 min-w-0">
            <div className="bg-slate-950 text-slate-100 rounded-2xl p-4 space-y-3 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 size={16} className="text-indigo-400" />
                  <span className="text-xs font-bold text-slate-200">Solution Code Editor</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-400">Language:</span>
                  <select
                    id="dsa-editor-language-select"
                    value={selectedLang}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-slate-800 text-indigo-300 text-xs font-mono font-bold rounded-lg px-2.5 py-1 border border-slate-700 hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-400 cursor-pointer transition-colors"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang.value} value={lang.value} className="bg-slate-900 text-white font-mono">
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Code Area with Line Numbers */}
              <div className="relative flex bg-slate-900 rounded-xl border border-slate-800 overflow-hidden min-h-[280px]">
                {/* Line Numbers */}
                <div className="w-9 py-3 bg-slate-950 text-slate-600 font-mono text-xs text-right pr-2 select-none border-r border-slate-800 leading-relaxed">
                  {lineNumbers.map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </div>

                {/* Textarea */}
                <textarea
                  value={code}
                  onChange={handleCodeChange}
                  className="flex-1 p-3 bg-transparent text-emerald-400 font-mono text-xs focus:outline-none leading-relaxed resize-none scrollbar-none"
                  spellCheck="false"
                />
              </div>

              {/* Action Bar Below Editor */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {/* Status Guidance Message */}
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  {!hasValidCode ? (
                    <span className="text-amber-400 flex items-center gap-1 font-bold">
                      <HelpCircle size={13} /> Write your code to enable Run.
                    </span>
                  ) : workflowState === 'coding' ? (
                    <span className="text-sky-400 flex items-center gap-1 font-bold">
                      <Play size={13} className="fill-sky-400" /> Run your code to test it.
                    </span>
                  ) : (
                    <span>Code ready for test execution</span>
                  )}
                </span>

                {/* RUN Button */}
                <button
                  onClick={handleRunCode}
                  disabled={!hasValidCode}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                    hasValidCode
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-indigo-600/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50'
                  }`}
                  aria-label="Run Code against test cases"
                >
                  <Play size={14} className={hasValidCode ? 'fill-white' : ''} />
                  <span>{workflowState === 'results' ? 'RUN AGAIN' : 'RUN'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TEST CASES PANEL (REVEALED ONLY AFTER RUN CLICKED)            */}
        {/* ------------------------------------------------------------- */}
        {(workflowState === 'results' || workflowState === 'submitted') && (
          <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Test Cases Execution Results ({activeProblem.functionName || resolveFunctionName(activeProblem, code)})
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  allPassed
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
                }`}>
                  {allPassed ? '✓ All Test Cases Passed!' : `✗ ${failedCases.length} Test Case${failedCases.length === 1 ? '' : 's'} Failed`}
                </span>
              </div>
            </div>

            {/* Execution / Compilation Output Feedback */}
            {evaluationResult?.output && !allPassed && (
              <div className="p-3.5 bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs font-mono text-rose-700 dark:text-rose-300 whitespace-pre-wrap leading-relaxed">
                {evaluationResult.output}
              </div>
            )}

            {/* Test Cases Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {testCases.map((tc) => (
                <div
                  key={tc.id}
                  className={`p-3.5 rounded-xl border space-y-2 transition-all ${
                    tc.passed
                      ? 'bg-white dark:bg-slate-950 border-emerald-200 dark:border-emerald-900 shadow-2xs'
                      : 'bg-white dark:bg-slate-950 border-rose-300 dark:border-rose-900 shadow-xs ring-1 ring-rose-400/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Test Case {tc.id}
                    </span>
                    {tc.passed ? (
                      <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={13} /> Passed
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <XCircle size={13} /> Failed
                      </span>
                    )}
                  </div>

                  <div className="font-mono text-[10px] space-y-1 text-slate-600 dark:text-slate-400">
                    <div><span className="text-slate-400">Input:</span> {tc.input}</div>
                    <div><span className="text-slate-400">Expected:</span> {tc.expected}</div>
                    <div><span className="text-slate-400">Actual:</span> {tc.actual}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progressive Hint for Failing Case */}
            {!allPassed && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/70 border border-amber-200/90 dark:border-amber-800 rounded-xl space-y-2 animate-slide-up">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200">
                  <span className="flex items-center gap-1.5">
                    <Lightbulb size={16} className="text-amber-600" />
                    💡 Progressive Hint for Failed Test Case:
                  </span>
                </div>
                <p className="text-xs text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                  {activeProblem.progressiveHint}
                </p>
              </div>
            )}

            {/* Success Banner & SUBMIT Action Button */}
            {allPassed && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-slide-up">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  <span>✓ All test cases passed for {activeProblem.functionName}()! Submit your solution to reveal analysis.</span>
                </div>
                {workflowState === 'results' ? (
                  <button
                    onClick={handleSubmitSolution}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ring-2 ring-emerald-400/40"
                  >
                    <Send size={14} />
                    <span>SUBMIT SOLUTION</span>
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1">
                    <Check size={14} /> Solution Submitted
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SOLUTION ANALYSIS & POST-SUBMISSION CONTINUATION ACTIONS       */}
        {/* ------------------------------------------------------------- */}
        {workflowState === 'submitted' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <Award size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    Solution Analysis &amp; Code Evaluation
                  </h3>
                  <p className="text-xs text-slate-500">Comprehensive feedback on your submitted {activeProblem.title} solution</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 text-xs font-bold">
                ✓ Verified &amp; Completed
              </span>
            </div>

            {/* Summary Badges */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Overall Evaluation Summary:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Correctness: 100% Passed
                </span>
                <span className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                  <Zap size={14} /> Complexity: Optimal O(N)
                </span>
                <span className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 flex items-center gap-1">
                  <Layers size={14} /> Pattern Match: {activeProblem.pattern}
                </span>
              </div>
            </div>

            {/* Structured Feedback Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  What You Did Well
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Implemented <code className="bg-white dark:bg-slate-900 px-1 py-0.5 rounded font-mono">{activeProblem.functionName}()</code> with accurate parameter handling.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Leveraged <strong>{activeProblem.pattern}</strong> pattern to avoid redundant loops.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-indigo-900 dark:text-indigo-200 text-sm flex items-center gap-1.5">
                  <Sparkles size={16} className="text-indigo-600" />
                  Which Pattern Was Used?
                </h4>
                <div className="space-y-1">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-extrabold inline-block text-xs">
                    {activeProblem.patternUsed || activeProblem.pattern}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium pt-1">
                    {activeProblem.patternNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Optional Concept Check Checkpoint */}
            <div className="p-5 bg-indigo-50/40 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                  <HelpCircle size={14} className="text-indigo-600" />
                  Quick Concept Reinforcement Check
                </h4>
                <span className="text-[10px] font-bold text-slate-400">Optional Check</span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {conceptQuestion.question}
              </p>
              <div className="space-y-2 pt-1">
                {conceptQuestion.options.map((opt) => {
                  const isSel = selectedMcqOpt === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => !mcqSubmitted && (setSelectedMcqOpt(opt.id), setMcqSubmitted(true))}
                      disabled={mcqSubmitted}
                      className={`w-full p-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                        mcqSubmitted
                          ? opt.correct
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : isSel
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white dark:bg-slate-950 text-slate-500 border-slate-200 dark:border-slate-800 opacity-60'
                          : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-bold shrink-0">
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </span>
                      {mcqSubmitted && opt.correct && <CheckCircle2 size={15} className="text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {mcqSubmitted && (
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800 animate-slide-up">
                  {conceptQuestion.explanation}
                </p>
              )}
            </div>

            {/* Post-Submission Continuation Action Area */}
            <div className="p-6 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl border border-indigo-700/50 shadow-lg space-y-4 animate-slide-up">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold text-xl">
                    🎉
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight text-white">
                      Problem Solved Successfully!
                    </h4>
                    <p className="text-xs text-indigo-200 font-medium">
                      Attempt logged in your persistent practice history. Choose your next step:
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                  {attemptsHistory.length} {attemptsHistory.length === 1 ? 'Attempt' : 'Attempts'} Saved
                </span>
              </div>

              {/* Continuation Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                >
                  <span>Next Question</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={handlePracticeSamePattern}
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                >
                  <Layers size={15} />
                  <span>Practice Pattern</span>
                </button>

                <button
                  onClick={() => setShowExploreModal(true)}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Compass size={15} className="text-sky-400" />
                  <span>Explore Catalog</span>
                </button>

                <button
                  onClick={handleTryAgain}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw size={15} className="text-amber-400" />
                  <span>Try Again</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedAttemptIdx(0);
                    setShowAttemptModal(true);
                  }}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <History size={15} className="text-emerald-400" />
                  <span>View Attempt</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: EXPLORE MORE PRACTICE CATALOG & PROGRESS DRAWER       */}
      {/* ------------------------------------------------------------- */}
      {showExploreModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Compass size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                      Curated {currentTopicName} Question Bank
                    </h3>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                      {PRACTICE_PROBLEMS.length} Questions
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    High-value, interview-focused problems sorted by pattern and reported company frequency.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowExploreModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter Controls Bar */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 space-y-3 text-xs">
              {/* Row 1: Mode & Company Prep */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setInterviewFocusOnly((prev) => !prev)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      interviewFocusOnly
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-amber-50'
                    }`}
                  >
                    <Flame size={13} />
                    <span>🔥 Interview Focus Only</span>
                  </button>

                  <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-800">
                    <Building2 size={13} className="text-indigo-500" />
                    <span className="font-bold text-slate-500 text-[11px]">Company Prep:</span>
                    <select
                      value={filterCompany}
                      onChange={(e) => setFilterCompany(e.target.value)}
                      className="bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-none text-xs cursor-pointer"
                    >
                      <option value="All">All Companies</option>
                      <option value="TCS">TCS (Placement Focus)</option>
                      <option value="Cognizant">Cognizant (Placement Focus)</option>
                      <option value="Capgemini">Capgemini (Placement Focus)</option>
                      <option value="Accenture">Accenture (Placement Focus)</option>
                      <option value="Wipro">Wipro (Placement Focus)</option>
                      <option value="HCLTech">HCLTech (Placement Focus)</option>
                      <option value="Amazon">Amazon</option>
                      <option value="Google">Google</option>
                      <option value="Meta">Meta</option>
                      <option value="Microsoft">Microsoft</option>
                    </select>
                  </div>
                </div>

                {/* Reset Filters */}
                {(filterStatus !== 'All' || filterDiff !== 'All' || filterPattern !== 'All' || filterPriority !== 'All' || filterCompany !== 'All' || interviewFocusOnly) && (
                  <button
                    onClick={() => {
                      setFilterStatus('All');
                      setFilterDiff('All');
                      setFilterPattern('All');
                      setFilterPriority('All');
                      setFilterCompany('All');
                      setInterviewFocusOnly(false);
                    }}
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-bold underline cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>

              {/* Row 2: Pattern Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Filter size={12} /> Pattern:
                </span>
                {['All', ...Array.from(new Set(PRACTICE_PROBLEMS.map((p) => p.pattern).filter(Boolean)))].map((pat) => (
                  <button
                    key={pat}
                    onClick={() => setFilterPattern(pat)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      filterPattern === pat
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {pat}
                  </button>
                ))}
              </div>

              {/* Row 3: Difficulty & Priority Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Difficulty:</span>
                  {['All', 'Easy', 'Medium', 'Hard'].map((df) => (
                    <button
                      key={df}
                      onClick={() => setFilterDiff(df)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        filterDiff === df
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {df}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Priority:</span>
                  {['All', 'Must Practice', 'High Priority', 'Good to Practice'].map((pr) => (
                    <button
                      key={pr}
                      onClick={() => setFilterPriority(pr)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        filterPriority === pr
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Problem Catalog Grid */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1 scrollbar-thin">
              {filteredCatalogProblems.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <p className="text-xs font-bold text-slate-400">No practice questions match your active filter criteria.</p>
                  <button
                    onClick={() => {
                      setFilterStatus('All');
                      setFilterDiff('All');
                      setFilterPattern('All');
                      setFilterPriority('All');
                      setFilterCompany('All');
                      setInterviewFocusOnly(false);
                    }}
                    className="text-xs text-indigo-600 font-bold underline"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredCatalogProblems.map((prob, idx) => {
                  const isCurrent = prob.id === selectedProblemId;
                  const stat = problemStatsMap[prob.id] || { status: 'Not Started', totalAttempts: 0 };
                  const isCompleted = stat.status === 'Completed';
                  const isInProgress = stat.status === 'In Progress';

                  return (
                    <div
                      key={prob.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                        isCurrent
                          ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 shadow-2xs ring-1 ring-indigo-400/30'
                          : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                            {idx + 1}. {prob.title}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            prob.difficulty === 'Easy'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200'
                              : prob.difficulty === 'Medium' || prob.difficulty.includes('Medium')
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200'
                          }`}>
                            {prob.difficulty}
                          </span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                            prob.interviewPriority === 'Must Practice'
                              ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border-amber-300'
                              : prob.interviewPriority === 'High Priority'
                              ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300'
                          }`}>
                            {prob.interviewPriority === 'Must Practice' ? '🔥 MUST PRACTICE' : prob.interviewPriority === 'High Priority' ? '⭐ HIGH PRIORITY' : '💡 GOOD TO PRACTICE'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 font-medium line-clamp-1">{prob.description}</p>

                        {/* Company & Placement Tags Row */}
                        <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[10px]">
                          {prob.companies && (
                            <span className="text-slate-400 font-bold flex items-center gap-1">
                              <Building2 size={11} className="text-indigo-400" />
                              Reported at: <span className="text-slate-700 dark:text-slate-300 font-semibold">{prob.companies.slice(0, 4).join(' · ')}{prob.companies.length > 4 ? ' +more' : ''}</span>
                            </span>
                          )}
                          {prob.placementFocus && prob.placementFocus.length > 0 && (
                            <span className="text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                              <Target size={11} /> Placement: {prob.placementFocus.join(' · ')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                        {/* Status Badge */}
                        <span className={`text-xs font-extrabold px-3 py-1 rounded-xl flex items-center gap-1 ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                            : isInProgress
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-300'
                        }`}>
                          {isCompleted ? (
                            <>
                              <CheckCircle2 size={13} /> Completed ({stat.totalAttempts})
                            </>
                          ) : isInProgress ? (
                            <>
                              <Clock size={13} /> In Progress ({stat.totalAttempts})
                            </>
                          ) : (
                            <span>Not Started</span>
                          )}
                        </span>

                        <button
                          onClick={() => {
                            handleProblemChange(prob.id);
                            setShowExploreModal(false);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white'
                          }`}
                        >
                          {isCurrent ? 'Active Workspace' : 'Solve Question'}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: VIEW MY ATTEMPT HISTORY MODAL                         */}
      {/* ------------------------------------------------------------- */}
      {showAttemptModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <History size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    Submission History — {activeProblem.title}
                  </h3>
                  <p className="text-xs text-slate-500">View past submitted code and verification results</p>
                </div>
              </div>
              <button
                onClick={() => setShowAttemptModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 scrollbar-thin">
              {attemptsHistory.length === 0 ? (
                <div className="text-center py-8 text-slate-400 font-bold text-xs">
                  No attempt history found for this question yet.
                </div>
              ) : (
                <>
                  {/* Multi-attempt Selector Header */}
                  {attemptsHistory.length > 1 && (
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-500">Select Attempt:</span>
                      <div className="flex items-center gap-1.5 overflow-x-auto">
                        {attemptsHistory.map((att, idx) => (
                          <button
                            key={att.id || idx}
                            onClick={() => setSelectedAttemptIdx(idx)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              selectedAttemptIdx === idx
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            Attempt #{att.attemptNumber || attemptsHistory.length - idx}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Active Attempt Record Card */}
                  {attemptsHistory[selectedAttemptIdx] && (() => {
                    const currentAtt = attemptsHistory[selectedAttemptIdx];
                    const attemptDate = currentAtt.createdAt
                      ? new Date(currentAtt.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Recently';

                    return (
                      <div className="space-y-4">
                        {/* Summary Details Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
                          <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Result</span>
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 size={13} /> {currentAtt.result || 'PASSED'}
                            </span>
                          </div>
                          <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Language</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                              {currentAtt.language || 'C++'}
                            </span>
                          </div>
                          <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Test Cases</span>
                            <span className="text-slate-800 dark:text-slate-200">
                              {currentAtt.passedCount ?? 3} / {currentAtt.totalCount ?? 3} Passed
                            </span>
                          </div>
                          <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Date</span>
                            <span className="text-slate-600 dark:text-slate-400 font-sans text-[11px]">
                              {attemptDate}
                            </span>
                          </div>
                        </div>

                        {/* Submitted Code Container */}
                        <div className="bg-slate-950 text-slate-100 rounded-2xl p-4 border border-slate-800 space-y-3 shadow-md">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                              <Code2 size={14} className="text-indigo-400" />
                              Submitted Code (Attempt #{currentAtt.attemptNumber || 1})
                            </span>
                            <button
                              onClick={() => handleCopyCode(currentAtt.submittedCode)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {codeCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                              <span>{codeCopied ? 'Copied!' : 'Copy Code'}</span>
                            </button>
                          </div>
                          <pre className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto scrollbar-thin leading-relaxed max-h-72">
                            {currentAtt.submittedCode || '// No code recorded'}
                          </pre>
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
