import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Award,
  Clock,
  Target,
  FileText,
  Filter,
  Check,
  Info,
  ChevronDown,
  ChevronUp,
  Layers,
  Building2,
  HelpCircle,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import AddNoteButton from '../notes/AddNoteButton';
import MyNotesList from '../notes/MyNotesList';
import { useNotes } from '../../hooks/useNotes';
import { useBestu } from '../../contexts/BestuContext';
import {
  getTopicQuestionBank,
  getTopicPatterns,
  SUPPORTED_COMPANIES,
  DIFFICULTY_LEVELS
} from '../../data/aptitudeQuestionBank/index.js';

/**
 * AptitudePracticeSection Component
 * Placement-Focused MCQ Practice Studio with progressive hints, step solutions,
 * company attribution, filter controls, progress persistence, and Bestu AI context.
 */
export default function AptitudePracticeSection({
  topic,
  topicId: propTopicId,
  topicName: propTopicName,
  onGoToSummary
}) {
  const topicId = topic?.topicId || propTopicId || 'time-speed-distance';
  const topicName = topic?.topicName || propTopicName || 'Time, Speed & Distance';
  const topicCategory = topic?.category || 'Quantitative Aptitude';

  // 1. Load Question Bank
  const allQuestions = useMemo(() => {
    return getTopicQuestionBank(topicId, topicName, topicCategory);
  }, [topicId, topicName, topicCategory]);

  const availablePatterns = useMemo(() => {
    return getTopicPatterns(topicId, topicName, topicCategory);
  }, [topicId, topicName, topicCategory]);

  // 2. Storage Key for Progress Persistence
  const storageKey = `pathpilot_aptitude_progress_${topicId}`;

  // 3. User Progress States (loaded from localStorage)
  const [completedQuestions, setCompletedQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_completed`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [incorrectQuestions, setIncorrectQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_incorrect`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedAnswersMap, setSelectedAnswersMap] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_answers`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_completed`, JSON.stringify(completedQuestions));
      localStorage.setItem(`${storageKey}_incorrect`, JSON.stringify(incorrectQuestions));
      localStorage.setItem(`${storageKey}_answers`, JSON.stringify(selectedAnswersMap));
    } catch (e) {
      console.warn('Could not persist aptitude practice progress to localStorage', e);
    }
  }, [completedQuestions, incorrectQuestions, selectedAnswersMap, storageKey]);

  // 4. Filters State
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCompany, setFilterCompany] = useState('all');
  const [filterPattern, setFilterPattern] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'completed', 'incorrect', 'unattempted'
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // 5. Filtered Questions
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      // Difficulty Filter
      if (filterDifficulty !== 'all') {
        if (q.difficulty.toLowerCase() !== filterDifficulty.toLowerCase()) {
          return false;
        }
      }
      // Company Filter
      if (filterCompany !== 'all') {
        const matchesCompany = (q.companyTags || []).some(
          (c) => c.toLowerCase() === filterCompany.toLowerCase()
        );
        if (!matchesCompany) return false;
      }
      // Pattern Filter
      if (filterPattern !== 'all') {
        if (q.pattern !== filterPattern) return false;
      }
      // Status Filter
      if (filterStatus === 'completed') {
        if (!completedQuestions.includes(q.id)) return false;
      } else if (filterStatus === 'incorrect') {
        if (!incorrectQuestions.includes(q.id)) return false;
      } else if (filterStatus === 'unattempted') {
        if (completedQuestions.includes(q.id) || incorrectQuestions.includes(q.id)) return false;
      }
      return true;
    });
  }, [allQuestions, filterDifficulty, filterCompany, filterPattern, filterStatus, completedQuestions, incorrectQuestions]);

  // 6. Active Question Navigation State
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // Keep index within bounds if filtered list changes
  useEffect(() => {
    if (activeQuestionIndex >= filteredQuestions.length) {
      setActiveQuestionIndex(0);
    }
  }, [filteredQuestions.length, activeQuestionIndex]);

  const activeQuestion = filteredQuestions[activeQuestionIndex] || allQuestions[0];

  // 7. Interactive Answering State for Current Question
  // Radio selection before submitting
  const [pendingSelection, setPendingSelection] = useState(null);
  // Whether submission feedback is currently active for this question
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  // Number of hints revealed (0, 1, 2)
  const [hintsRevealedCount, setHintsRevealedCount] = useState(0);
  // Explicitly forced answer reveal by student
  const [isAnswerForceRevealed, setIsAnswerForceRevealed] = useState(false);
  // Details popover for source metadata
  const [showSourceInfo, setShowSourceInfo] = useState(false);

  // Reset interactive state when moving between questions
  useEffect(() => {
    if (!activeQuestion) return;
    const existingAnswer = selectedAnswersMap[activeQuestion.id];
    setPendingSelection(existingAnswer || null);
    setIsAnswerSubmitted(!!existingAnswer);
    setHintsRevealedCount(0);
    setIsAnswerForceRevealed(false);
    setShowSourceInfo(false);
  }, [activeQuestion?.id, selectedAnswersMap]);

  // 8. Synchronize Active Question Context to Bestu AI Mentor
  const { setPageContext } = useBestu();
  useEffect(() => {
    if (!activeQuestion) return;

    const isCurrentCorrect = pendingSelection === activeQuestion.correctOption;
    const availableHint =
      activeQuestion.hints && activeQuestion.hints.length > 0
        ? activeQuestion.hints[Math.min(hintsRevealedCount, activeQuestion.hints.length - 1)]
        : null;

    setPageContext({
      subject: 'Aptitude',
      category: topicCategory,
      topic: topicName,
      topicId,
      section: 'Practice Questions',
      sectionId: 'practice',
      currentQuestion: {
        id: activeQuestion.id,
        title: activeQuestion.title,
        prompt: activeQuestion.prompt,
        options: activeQuestion.options?.map((o) => `${o.id}: ${o.text}`),
        selectedOption: pendingSelection,
        correctAnswerStatus: isAnswerSubmitted
          ? isCurrentCorrect
            ? 'Correct'
            : 'Incorrect'
          : 'Pending',
        isCorrect: isAnswerSubmitted ? isCurrentCorrect : null,
        availableHint: availableHint,
        currentDifficulty: activeQuestion.difficulty,
        pattern: activeQuestion.pattern,
        companyTags: activeQuestion.companyTags || [],
        explanation: activeQuestion.explanation
      }
    });
  }, [
    activeQuestion,
    pendingSelection,
    isAnswerSubmitted,
    hintsRevealedCount,
    topicName,
    topicCategory,
    topicId,
    setPageContext
  ]);

  // 9. Personal Notes Hook
  const {
    notes,
    loading: notesLoading,
    error: notesError,
    addNote,
    updateNote,
    deleteNote
  } = useNotes({
    subject: 'Aptitude',
    topicId
  });

  // 10. Handlers for Question Interactions
  const handleSelectOption = (optionId) => {
    if (isAnswerSubmitted && completedQuestions.includes(activeQuestion.id)) {
      // Already completed correctly, do not overwrite unless retrying
      return;
    }
    setPendingSelection(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!pendingSelection || !activeQuestion) return;

    setIsAnswerSubmitted(true);
    const isCorrect = pendingSelection === activeQuestion.correctOption;

    // Update answer map
    setSelectedAnswersMap((prev) => ({
      ...prev,
      [activeQuestion.id]: pendingSelection
    }));

    if (isCorrect) {
      // Mark as completed
      if (!completedQuestions.includes(activeQuestion.id)) {
        setCompletedQuestions((prev) => [...prev, activeQuestion.id]);
      }
      // Remove from incorrect list if present
      setIncorrectQuestions((prev) => prev.filter((id) => id !== activeQuestion.id));
    } else {
      // Mark as incorrect for retry
      if (!incorrectQuestions.includes(activeQuestion.id)) {
        setIncorrectQuestions((prev) => [...prev, activeQuestion.id]);
      }
      // Reveal first hint automatically on wrong answer
      setHintsRevealedCount((prev) => Math.max(prev, 1));
    }
  };

  const handleRetryQuestion = () => {
    setIsAnswerSubmitted(false);
    setPendingSelection(null);
    setIsAnswerForceRevealed(false);
  };

  const handleRevealNextHint = () => {
    if (!activeQuestion.hints) return;
    setHintsRevealedCount((prev) => Math.min(prev + 1, activeQuestion.hints.length));
  };

  const handleForceRevealAnswer = () => {
    setIsAnswerForceRevealed(true);
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex < filteredQuestions.length - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((prev) => prev - 1);
    }
  };

  // 11. Completion Statistics
  const completedCount = completedQuestions.filter((id) =>
    allQuestions.some((q) => q.id === id)
  ).length;
  const progressPercent = Math.round((completedCount / allQuestions.length) * 100) || 0;

  // Question status helper for index buttons
  const getQuestionStatus = (qId) => {
    if (completedQuestions.includes(qId)) return 'completed';
    if (incorrectQuestions.includes(qId)) return 'incorrect';
    return 'unattempted';
  };

  const isCurrentCorrect = pendingSelection === activeQuestion?.correctOption;
  const isCorrectRevealed = isAnswerSubmitted && isCurrentCorrect;
  const isWrongRevealed = isAnswerSubmitted && !isCurrentCorrect && !isAnswerForceRevealed;
  const isForceRevealed = isAnswerForceRevealed;

  return (
    <div className="space-y-4 select-none animate-fadeIn" id="aptitude-section-practice">
      {/* ============================================================== */}
      {/* 1. TOP HEADER & PROGRESS SUMMARY CARD                          */}
      {/* ============================================================== */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D1C7] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] text-[11px] font-extrabold uppercase tracking-wider">
                Section 3 &bull; MCQ Practice Bank
              </span>
              <span className="text-[#D9D1C7]">&bull;</span>
              <span className="text-xs font-bold text-[#475569]">{topicName}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
              Placement Practice &amp; Exercises
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <AddNoteButton
              subject="Aptitude"
              topicId={topicId}
              topicName={topicName}
              section="Practice"
              onNoteSaved={addNote}
              size="md"
            />
            {onGoToSummary && (
              <button
                type="button"
                id="btn-goto-summary-from-practice"
                onClick={onGoToSummary}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FFFDF9] hover:bg-[#EDE9F6] text-[#0F172A] border border-[#D9D1C7] shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FileText size={14} className="text-[#6574C4]" />
                <span>Summary &amp; Notes</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar & Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="sm:col-span-2 flex flex-col justify-center space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#334155]">
              <span className="flex items-center gap-1.5">
                <Target size={14} className="text-[#6574C4]" />
                Topic Progress: <strong className="text-[#0F172A]">{completedCount} of {allQuestions.length} Completed</strong>
              </span>
              <span className="text-[#6574C4] font-black">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#EAE4D7] rounded-full overflow-hidden border border-[#D9D1C7]">
              <div
                className="h-full bg-[#6574C4] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 text-xs font-bold">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-1">
              <CheckCircle2 size={13} className="text-emerald-600" />
              {completedCount} Solved
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-1">
              <RotateCcw size={13} className="text-amber-600" />
              {incorrectQuestions.length} Needs Review
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. FILTER & CRITERIA BAR                                      */}
      {/* ============================================================== */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-3 sm:p-4 shadow-xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-[#6574C4]" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
              Filter Questions:
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]">
              {filteredQuestions.length} {filteredQuestions.length === 1 ? 'Problem' : 'Problems'}
            </span>
          </div>

          <button
            type="button"
            id="btn-toggle-filters-drawer"
            onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
            className="sm:hidden px-2.5 py-1 rounded-lg text-xs font-bold bg-[#FFFDF9] border border-[#D9D1C7] text-[#334155] flex items-center gap-1 cursor-pointer"
          >
            <Filter size={12} />
            <span>{showFiltersDrawer ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        {/* Filters Controls Grid (Always visible on desktop, toggleable on mobile) */}
        <div className={`grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1 ${showFiltersDrawer ? 'block' : 'hidden sm:grid'}`}>
          {/* A. Difficulty Filter */}
          <div>
            <label htmlFor="filter-difficulty-select" className="block text-[11px] font-bold text-[#475569] mb-1">
              Difficulty
            </label>
            <select
              id="filter-difficulty-select"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full p-2 text-xs font-bold bg-[#FFFDF9] border border-[#D9D1C7] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6574C4] cursor-pointer shadow-2xs"
            >
              {DIFFICULTY_LEVELS.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.label}
                </option>
              ))}
            </select>
          </div>

          {/* B. Company Prep Filter */}
          <div>
            <label htmlFor="filter-company-select" className="block text-[11px] font-bold text-[#475569] mb-1">
              Company Prep
            </label>
            <select
              id="filter-company-select"
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="w-full p-2 text-xs font-bold bg-[#FFFDF9] border border-[#D9D1C7] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6574C4] cursor-pointer shadow-2xs"
            >
              <option value="all">All Companies</option>
              {SUPPORTED_COMPANIES.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          {/* C. Pattern Filter */}
          <div>
            <label htmlFor="filter-pattern-select" className="block text-[11px] font-bold text-[#475569] mb-1">
              Pattern / Concept
            </label>
            <select
              id="filter-pattern-select"
              value={filterPattern}
              onChange={(e) => setFilterPattern(e.target.value)}
              className="w-full p-2 text-xs font-bold bg-[#FFFDF9] border border-[#D9D1C7] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6574C4] cursor-pointer shadow-2xs"
            >
              <option value="all">All Patterns ({availablePatterns.length})</option>
              {availablePatterns.map((pat) => (
                <option key={pat} value={pat}>
                  {pat}
                </option>
              ))}
            </select>
          </div>

          {/* D. Completion Status */}
          <div>
            <label htmlFor="filter-status-select" className="block text-[11px] font-bold text-[#475569] mb-1">
              Completion Status
            </label>
            <select
              id="filter-status-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 text-xs font-bold bg-[#FFFDF9] border border-[#D9D1C7] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6574C4] cursor-pointer shadow-2xs"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed Only</option>
              <option value="incorrect">Needs Review / Retry</option>
              <option value="unattempted">Unattempted Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. QUESTION INDEX STEPPER / NAVIGATOR                          */}
      {/* ============================================================== */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-3 sm:p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-[#475569]">
          <span className="flex items-center gap-1.5 text-[#0F172A] font-extrabold">
            <Target size={14} className="text-[#6574C4]" />
            Question Navigator ({filteredQuestions.length > 0 ? activeQuestionIndex + 1 : 0} of {filteredQuestions.length})
          </span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Completed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Attempted / Needs Review
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" /> Unattempted
            </span>
          </div>
        </div>

        {/* Number Pills Grid */}
        {filteredQuestions.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto pr-1">
            {filteredQuestions.map((q, idx) => {
              const status = getQuestionStatus(q.id);
              const isActive = idx === activeQuestionIndex;

              let btnStyle = 'bg-[#FFFDF9] text-[#334155] border-[#D9D1C7] hover:border-[#6574C4]';
              if (status === 'completed') {
                btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-black';
              } else if (status === 'incorrect') {
                btnStyle = 'bg-amber-100 text-amber-900 border-amber-300 font-black';
              }

              if (isActive) {
                btnStyle += ' ring-2 ring-[#6574C4] font-black scale-105';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  id={`nav-q-btn-${idx + 1}`}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-lg border text-xs font-bold flex items-center justify-center transition-all cursor-pointer shadow-2xs ${btnStyle}`}
                  title={`Question ${idx + 1}: ${q.title} (${q.difficulty})`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-4 bg-[#FFFDF9] rounded-xl border border-dashed border-[#D9D1C7] text-center text-xs text-[#475569]">
            No questions match your selected filters. Try resetting or selecting &quot;All&quot;.
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. ACTIVE QUESTION CARD (MCQ INTERFACE)                         */}
      {/* ============================================================== */}
      {activeQuestion && (
        <div
          id={`practice-question-active-${activeQuestion.id}`}
          className="bg-[#FFFDF9] border-2 border-[#D9D1C7] rounded-2xl p-4 sm:p-6 shadow-sm space-y-4"
        >
          {/* Question Meta Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#E2D9CC] pb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#6574C4] text-white font-black text-xs shadow-2xs">
                Question {activeQuestionIndex + 1}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]">
                {activeQuestion.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#EDE9F6] text-[#45456A] border border-[#D9D2EA] flex items-center gap-1">
                <Layers size={11} className="text-[#6574C4]" />
                {activeQuestion.pattern}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#F8F5EE] text-[#475569] border border-[#D9D1C7] flex items-center gap-1">
                <Clock size={11} className="text-[#475569]" />
                {activeQuestion.estimatedTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <AddNoteButton
                subject="Aptitude"
                topicId={topicId}
                topicName={topicName}
                section="Practice"
                questionId={activeQuestion.id}
                questionTitle={activeQuestion.title}
                onNoteSaved={addNote}
                size="sm"
                variant="subtle"
              />
            </div>
          </div>

          {/* Question Title & Company Attribution Chip */}
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight">
              {activeQuestion.title}
            </h3>

            {/* Evidence-Based Company Attribution Banner */}
            {activeQuestion.companyAttribution && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8F5EE] border border-[#D9D1C7] text-[#334155] font-semibold">
                  <Building2 size={13} className="text-[#6574C4] shrink-0" />
                  <span>{activeQuestion.companyAttribution}</span>
                  {activeQuestion.companyTags && activeQuestion.companyTags.length > 0 && (
                    <div className="inline-flex items-center gap-1 ml-1">
                      {activeQuestion.companyTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.2 rounded text-[10px] font-black bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Source Metadata Popover Toggle */}
                {activeQuestion.sourceMetadata && (
                  <button
                    type="button"
                    id="btn-toggle-source-info"
                    onClick={() => setShowSourceInfo(!showSourceInfo)}
                    className="text-[11px] font-bold text-[#6574C4] hover:text-[#5361A8] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Info size={12} />
                    <span>{showSourceInfo ? 'Hide source note' : 'Source / Why tagged?'}</span>
                  </button>
                )}
              </div>
            )}

            {/* Expandable Source Metadata Note */}
            {showSourceInfo && activeQuestion.sourceMetadata && (
              <div className="p-2.5 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs text-[#334155] space-y-1 animate-fadeIn">
                <div className="font-extrabold text-[#0F172A] flex items-center gap-1.5">
                  <Building2 size={13} className="text-[#6574C4]" />
                  <span>Placement Evidence Attribution:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  <strong>Type:</strong> {activeQuestion.sourceMetadata.sourceType === 'reported_pattern' ? 'Reported Exam Pattern' : 'PathPilot Practice Variant (tests reported concept)'}
                  {activeQuestion.sourceMetadata.company && ` • Company: ${activeQuestion.sourceMetadata.company}`}
                  {activeQuestion.sourceMetadata.basedOnCompany && ` • Based on: ${activeQuestion.sourceMetadata.basedOnCompany} assessment style`}
                </p>
                {activeQuestion.sourceMetadata.attributionNote && (
                  <p className="text-[11px] text-[#475569] italic">
                    &quot;{activeQuestion.sourceMetadata.attributionNote}&quot;
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Question Prompt */}
          <div className="p-4 bg-[#F8F5EE] rounded-xl border border-[#E2D9CC]">
            <p className="text-sm sm:text-base text-[#0F172A] font-semibold leading-relaxed">
              {activeQuestion.prompt}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-2 pt-1" role="radiogroup" aria-label="Question Options">
            {activeQuestion.options.map((opt) => {
              const isSelected = pendingSelection === opt.id;
              const isCorrectOpt = opt.id === activeQuestion.correctOption;

              let cardStyle = 'bg-[#FFFDF9] hover:bg-[#F8F5EE] border-[#D9D1C7] text-[#0F172A]';

              if (isAnswerSubmitted || isForceRevealed) {
                if (isCorrectOpt) {
                  cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                } else if (isSelected && !isCorrectOpt) {
                  cardStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400';
                }
              } else if (isSelected) {
                cardStyle = 'bg-[#E8EFF8] border-[#6574C4] text-[#0F172A] font-bold ring-2 ring-[#6574C4]';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  id={`opt-btn-${opt.id}`}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isCorrectRevealed}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer shadow-2xs ${cardStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#6574C4] text-white border-[#6574C4]'
                          : 'bg-[#F8F5EE] text-[#0F172A] border-[#CBD5E1]'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="font-medium text-[#0F172A]">{opt.text}</span>
                  </div>

                  {(isAnswerSubmitted || isForceRevealed) && isCorrectOpt && (
                    <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectOpt && (
                    <XCircle size={18} className="text-rose-700 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Row: Submit, Retry, Show Solution */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#E2D9CC]">
            <div className="flex items-center gap-2">
              {!isAnswerSubmitted && (
                <button
                  type="button"
                  id="btn-submit-answer"
                  onClick={handleSubmitAnswer}
                  disabled={!pendingSelection}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                    pendingSelection
                      ? 'bg-[#6574C4] hover:bg-[#5361A8] text-white'
                      : 'bg-[#EAE4D7] text-[#94A3B8] border border-[#D9D1C7] cursor-not-allowed'
                  }`}
                >
                  <Check size={16} />
                  <span>Submit Answer</span>
                </button>
              )}

              {isWrongRevealed && (
                <button
                  type="button"
                  id="btn-retry-question"
                  onClick={handleRetryQuestion}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FFFDF9] hover:bg-[#EDE9F6] text-[#6574C4] border border-[#6574C4] shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Try Again</span>
                </button>
              )}

              {!isCorrectRevealed && !isForceRevealed && (
                <button
                  type="button"
                  id="btn-reveal-solution-force"
                  onClick={handleForceRevealAnswer}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8F5EE] border border-transparent hover:border-[#D9D1C7] transition-all cursor-pointer flex items-center gap-1"
                >
                  <Eye size={13} />
                  <span>Show me the answer</span>
                </button>
              )}
            </div>

            {/* Next / Previous Question Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="btn-prev-question"
                onClick={handlePrevQuestion}
                disabled={activeQuestionIndex === 0}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-[#FFFDF9] border border-[#D9D1C7] text-[#0F172A] hover:bg-[#EDE9F6] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <ArrowLeft size={13} />
                <span>Prev</span>
              </button>
              <button
                type="button"
                id="btn-next-question"
                onClick={handleNextQuestion}
                disabled={activeQuestionIndex >= filteredQuestions.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#6574C4] hover:bg-[#5361A8] text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span>Next Question</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 5. WRONG ANSWER FLOW: PROGRESSIVE HINTS & RETRY                 */}
          {/* ============================================================== */}
          {isWrongRevealed && (
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                  <AlertCircle size={17} className="text-amber-600" />
                  <span>Not quite. Here&apos;s a hint:</span>
                </div>
                <span className="text-[11px] font-bold text-amber-800">
                  Hint {Math.min(hintsRevealedCount, activeQuestion.hints?.length || 1)} of {activeQuestion.hints?.length || 1}
                </span>
              </div>

              {/* Revealed Hints */}
              <div className="space-y-2">
                {activeQuestion.hints &&
                  activeQuestion.hints.slice(0, hintsRevealedCount).map((hint, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-[#0F172A] font-semibold leading-relaxed shadow-2xs flex items-start gap-2"
                    >
                      <Lightbulb size={15} className="text-amber-600 shrink-0 mt-0.5" />
                      <span>{hint}</span>
                    </div>
                  ))}
              </div>

              {/* Progressive Hint Reveal Button or Next Hint */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-200">
                {hintsRevealedCount < (activeQuestion.hints?.length || 0) ? (
                  <button
                    type="button"
                    id="btn-reveal-next-hint"
                    onClick={handleRevealNextHint}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-200/80 hover:bg-amber-300 text-amber-950 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lightbulb size={13} />
                    <span>Need another hint? ({hintsRevealedCount + 1}/{activeQuestion.hints?.length})</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-amber-900">
                    All hints unlocked. Take your time and retry!
                  </span>
                )}

                <button
                  type="button"
                  id="btn-retry-from-hints"
                  onClick={handleRetryQuestion}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-black bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <RotateCcw size={13} />
                  <span>Retry Answer</span>
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 6. CORRECT ANSWER FLOW: FULL BEGINNER-FRIENDLY SOLUTION       */}
          {/* ============================================================== */}
          {(isCorrectRevealed || isForceRevealed) && (
            <div className="p-4 sm:p-5 bg-[#F8F5EE] rounded-2xl border-2 border-[#6574C4]/40 space-y-3.5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#D9D1C7] pb-2.5">
                <div className="flex items-center gap-2">
                  {isCorrectRevealed ? (
                    <span className="flex items-center gap-1.5 font-black text-emerald-800 text-sm sm:text-base">
                      <CheckCircle2 size={19} className="text-emerald-600" />
                      ✅ Correct! Excellent Work!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-black text-[#6574C4] text-sm sm:text-base">
                      <Lightbulb size={19} className="text-[#6574C4]" />
                      Complete Step-by-Step Solution:
                    </span>
                  )}
                </div>

                <span className="text-xs font-extrabold text-[#0F172A] px-2.5 py-1 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA]">
                  Correct Option: {activeQuestion.correctOption}
                </span>
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-2 text-xs sm:text-sm">
                {typeof activeQuestion.explanation === 'object' ? (
                  <>
                    {activeQuestion.explanation.step1 && (
                      <div className="p-2.5 bg-[#FFFDF9] rounded-xl border border-[#D9D1C7] text-[#0F172A]">
                        <strong className="text-[#6574C4] block text-[11px] uppercase tracking-wider mb-0.5">
                          Step 1: Understand &amp; Setup
                        </strong>
                        <p className="font-medium leading-relaxed">{activeQuestion.explanation.step1}</p>
                      </div>
                    )}
                    {activeQuestion.explanation.step2 && (
                      <div className="p-2.5 bg-[#FFFDF9] rounded-xl border border-[#D9D1C7] text-[#0F172A]">
                        <strong className="text-[#6574C4] block text-[11px] uppercase tracking-wider mb-0.5">
                          Step 2: Calculate &amp; Solve
                        </strong>
                        <p className="font-medium leading-relaxed">{activeQuestion.explanation.step2}</p>
                      </div>
                    )}
                    {activeQuestion.explanation.step3 && (
                      <div className="p-2.5 bg-[#FFFDF9] rounded-xl border border-[#D9D1C7] text-[#0F172A]">
                        <strong className="text-[#6574C4] block text-[11px] uppercase tracking-wider mb-0.5">
                          Step 3: Verification
                        </strong>
                        <p className="font-medium leading-relaxed">{activeQuestion.explanation.step3}</p>
                      </div>
                    )}
                    {activeQuestion.explanation.formula && (
                      <div className="p-2.5 bg-[#EDE9F6] rounded-xl border border-[#D9D2EA] text-[#45456A] text-xs font-bold flex items-center gap-2">
                        <Target size={14} className="text-[#6574C4] shrink-0" />
                        <span>Rule / Formula: <strong>{activeQuestion.explanation.formula}</strong></span>
                      </div>
                    )}
                    {activeQuestion.explanation.quickTip && (
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs font-medium flex items-center gap-2">
                        <Lightbulb size={14} className="text-amber-600 shrink-0" />
                        <span>Quick Placement Tip: <strong>{activeQuestion.explanation.quickTip}</strong></span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#D9D1C7] text-[#0F172A] font-medium leading-relaxed">
                    {activeQuestion.explanation}
                  </div>
                )}
              </div>

              {/* Bottom Next Button */}
              {activeQuestionIndex < filteredQuestions.length - 1 && (
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    id="btn-solution-next-question"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-[#6574C4] hover:bg-[#5361A8] text-white flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. PERSONAL NOTES SECTION UNDER PRACTICE                       */}
      {/* ============================================================== */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#D9D1C7] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A]">
                My Practice Notes for {topicName}
              </h3>
              <p className="text-xs text-[#475569]">
                Personal insights, unit reminders, and shortcuts you saved while solving practice problems.
              </p>
            </div>
          </div>

          <AddNoteButton
            subject="Aptitude"
            topicId={topicId}
            topicName={topicName}
            section="Practice"
            questionId={activeQuestion?.id}
            questionTitle={activeQuestion?.title}
            onNoteSaved={addNote}
            size="md"
          />
        </div>

        <MyNotesList
          notes={notes}
          loading={notesLoading}
          error={notesError}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
          topicName={topicName}
          subject="Aptitude"
        />
      </div>
    </div>
  );
}
