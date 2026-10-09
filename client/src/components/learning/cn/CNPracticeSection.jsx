import React, { useState, useEffect, useMemo } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Check,
  Eye,
  SlidersHorizontal,
  Layers,
  Network,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import {
  getCNMcqQuestions,
  getCNDiagramQuestions
} from '../../../data/cn/cnPracticeData.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

/**
 * CNPracticeSection Component
 * Dedicated Practice Section with 2 major areas:
 * 1. MCQ Practice (Topic-scoped questions with 5-tier difficulty, progressive hints, retry & explanation)
 * 2. Diagram & Scenario Questions (Interactive visual topology & protocol flows)
 */
export default function CNPracticeSection({
  topic,
  onGoToSummary
}) {
  const [practiceMode, setPracticeMode] = useState('mcq'); // 'mcq' | 'diagram'

  // =========================================================================
  // PART 1: MCQ PRACTICE STATE & LOGIC
  // =========================================================================
  const allTopicMcqs = useMemo(() => {
    return getCNMcqQuestions(topic?.topicId);
  }, [topic?.topicId]);

  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [activeMcqIndex, setActiveMcqIndex] = useState(0);

  // Filtered MCQs
  const filteredMcqs = useMemo(() => {
    if (difficultyFilter === 'All') return allTopicMcqs;
    return allTopicMcqs.filter((q) => q.difficulty === difficultyFilter);
  }, [allTopicMcqs, difficultyFilter]);

  const activeQuestion = filteredMcqs[activeMcqIndex] || filteredMcqs[0];

  // User interaction state for current MCQ
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [sessionScore, setSessionScore] = useState({ correct: 0, attempted: 0 });

  // Reset question state when active question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setHintsRevealed(0);
  }, [activeQuestion?.id]);

  // Reset index when filter or topic changes
  useEffect(() => {
    setActiveMcqIndex(0);
  }, [difficultyFilter, topic?.topicId]);

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted && selectedOption === activeQuestion?.correctIndex) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    if (idx === activeQuestion?.correctIndex) {
      setSessionScore((prev) => ({
        correct: prev.correct + 1,
        attempted: prev.attempted + 1
      }));
    } else {
      setSessionScore((prev) => ({
        ...prev,
        attempted: prev.attempted + 1
      }));
    }
  };

  const handleRetryQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const handleNextQuestion = () => {
    if (activeMcqIndex < filteredMcqs.length - 1) {
      setActiveMcqIndex(activeMcqIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeMcqIndex > 0) {
      setActiveMcqIndex(activeMcqIndex - 1);
    }
  };

  // =========================================================================
  // PART 2: DIAGRAM & SCENARIO QUESTIONS STATE & LOGIC
  // =========================================================================
  const diagramQuestions = useMemo(() => {
    return getCNDiagramQuestions(topic?.topicId);
  }, [topic?.topicId]);

  const [activeDiagIndex, setActiveDiagIndex] = useState(0);
  const activeDiag = diagramQuestions[activeDiagIndex] || diagramQuestions[0];
  const [selectedDiagOption, setSelectedDiagOption] = useState(null);
  const [isDiagSubmitted, setIsDiagSubmitted] = useState(false);

  useEffect(() => {
    setSelectedDiagOption(null);
    setIsDiagSubmitted(false);
  }, [activeDiag?.id, topic?.topicId]);

  return (
    <div
      id="cn-section-practice"
      className="space-y-6 max-w-7xl mx-auto px-1 scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      {/* 1. SECTION BANNER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-bold uppercase tracking-wider">
                Section 3
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">Placement & Concept Practice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Practice Questions & Scenarios
            </h1>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl">
            <button
              type="button"
              onClick={() => setPracticeMode('mcq')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                practiceMode === 'mcq'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Brain size={14} />
              <span>MCQ Practice ({allTopicMcqs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setPracticeMode('diagram')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                practiceMode === 'diagram'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Network size={14} />
              <span>Diagram Questions ({diagramQuestions.length})</span>
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
          Sharpen your conceptual understanding and placement readiness for <strong>{topic?.topicName}</strong> with topic-scoped questions, progressive hints, and step-by-step answers.
        </p>
      </div>

      {/* =================================================================== */}
      {/* MODE A: MCQ PRACTICE */}
      {/* =================================================================== */}
      {practiceMode === 'mcq' && (
        <div className="space-y-6">
          {/* Difficulty Filter Bar & Score */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
                <SlidersHorizontal size={14} /> Difficulty:
              </span>
              {['All', 'Easy', 'Medium', 'Hard', 'Placement', 'Interview Trap'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficultyFilter(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    difficultyFilter === lvl
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-slate-500">
                Score: <strong className="text-emerald-600">{sessionScore.correct}</strong> / {sessionScore.attempted}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                Question {filteredMcqs.length > 0 ? activeMcqIndex + 1 : 0} of {filteredMcqs.length}
              </span>
            </div>
          </div>

          {/* Active Question Box */}
          {activeQuestion ? (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Question Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                    activeQuestion.difficulty === 'Easy'
                      ? 'bg-emerald-100 text-emerald-800'
                      : activeQuestion.difficulty === 'Medium'
                      ? 'bg-amber-100 text-amber-800'
                      : activeQuestion.difficulty === 'Hard'
                      ? 'bg-rose-100 text-rose-800'
                      : activeQuestion.difficulty === 'Placement'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-red-100 text-red-900 border border-red-300'
                  }`}>
                    {activeQuestion.difficulty}
                  </span>

                  {activeQuestion.questionType && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {activeQuestion.questionType}
                    </span>
                  )}

                  {activeQuestion.companyMetadata?.company && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                      <Briefcase size={11} /> {activeQuestion.companyMetadata.company}
                    </span>
                  )}
                </div>

                <AddNoteButton
                  contextType="cn_mcq"
                  contextId={activeQuestion.id}
                  contextTitle={`MCQ: ${activeQuestion.question.slice(0, 50)}...`}
                  variant="outline"
                  size="sm"
                />
              </div>

              {/* Question Text */}
              <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900 leading-snug">
                {activeQuestion.question}
              </h2>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-3">
                {activeQuestion.options.map((opt, oIdx) => {
                  const isSelected = selectedOption === oIdx;
                  const isCorrect = isAnswerSubmitted && oIdx === activeQuestion.correctIndex;
                  const isWrongSelected = isAnswerSubmitted && isSelected && oIdx !== activeQuestion.correctIndex;

                  let optClass = 'border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300 text-slate-800';
                  if (isCorrect) {
                    optClass = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-500 font-bold';
                  } else if (isWrongSelected) {
                    optClass = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400 font-semibold';
                  } else if (isSelected) {
                    optClass = 'border-blue-500 bg-blue-50 text-blue-900 ring-1 ring-blue-500 font-bold';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(oIdx)}
                      className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${optClass}`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      <div className="shrink-0">
                        {isCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
                        {isWrongSelected && <XCircle size={18} className="text-rose-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progressive Hints Drawer */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {activeQuestion.hint && hintsRevealed === 0 && (
                    <button
                      type="button"
                      onClick={() => setHintsRevealed(1)}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Lightbulb size={13} className="text-amber-600" />
                      <span>Need a Hint?</span>
                    </button>
                  )}

                  {activeQuestion.progressiveHint && hintsRevealed === 1 && (
                    <button
                      type="button"
                      onClick={() => setHintsRevealed(2)}
                      className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold hover:bg-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles size={13} className="text-amber-700" />
                      <span>Show Deeper Hint</span>
                    </button>
                  )}
                </div>

                {/* Retest on wrong option */}
                {isAnswerSubmitted && selectedOption !== activeQuestion.correctIndex && (
                  <button
                    type="button"
                    onClick={handleRetryQuestion}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    <span>Try Again</span>
                  </button>
                )}
              </div>

              {/* Revealed Hints */}
              {hintsRevealed >= 1 && activeQuestion.hint && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-1">
                  <span className="font-bold text-amber-900 uppercase tracking-wide text-[10px] block">
                    Hint 1:
                  </span>
                  <p className="leading-relaxed">{activeQuestion.hint}</p>
                </div>
              )}

              {hintsRevealed >= 2 && activeQuestion.progressiveHint && (
                <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs text-indigo-950 space-y-1">
                  <span className="font-bold text-indigo-900 uppercase tracking-wide text-[10px] block">
                    Deep Architecture Hint:
                  </span>
                  <p className="leading-relaxed">{activeQuestion.progressiveHint}</p>
                </div>
              )}

              {/* Post-submission Feedback & Detailed Explanation */}
              {isAnswerSubmitted && (
                <div className="space-y-4 pt-2">
                  {selectedOption === activeQuestion.correctIndex ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                        <CheckCircle2 size={16} className="text-emerald-600" /> Correct! Excellent Analysis.
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                        {activeQuestion.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-800">
                        <XCircle size={16} className="text-rose-600" /> Not Quite Right.
                      </div>
                      <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                        {activeQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {/* Option-by-Option Breakdown */}
                  {activeQuestion.optionExplanations && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wide block">
                        Detailed Option Analysis
                      </span>
                      <div className="space-y-2 text-xs text-slate-700">
                        {activeQuestion.optionExplanations.map((exp, expIdx) => (
                          <div key={expIdx} className="flex items-start gap-2">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                              expIdx === activeQuestion.correctIndex
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-300 text-slate-700'
                            }`}>
                              {String.fromCharCode(65 + expIdx)}
                            </span>
                            <span className="leading-relaxed">{exp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Arrows */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevQuestion}
                  disabled={activeMcqIndex === 0}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeMcqIndex === 0
                      ? 'opacity-30 cursor-not-allowed text-slate-400'
                      : 'text-slate-700 hover:bg-slate-100 cursor-pointer'
                  }`}
                >
                  <ArrowLeft size={14} />
                  <span>Previous Question</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={activeMcqIndex >= filteredMcqs.length - 1}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeMcqIndex >= filteredMcqs.length - 1
                      ? 'opacity-30 cursor-not-allowed text-slate-400'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 cursor-pointer'
                  }`}
                >
                  <span>Next Question</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white border border-slate-200 rounded-3xl text-center text-slate-500">
              No questions found matching difficulty '{difficultyFilter}'.
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* MODE B: DIAGRAM & SCENARIO QUESTIONS */}
      {/* =================================================================== */}
      {practiceMode === 'diagram' && (
        <div className="space-y-6">
          {activeDiag ? (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800">
                    Diagram Scenario
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Question {activeDiagIndex + 1} of {diagramQuestions.length}
                  </span>
                </div>

                <AddNoteButton
                  contextType="cn_diag_question"
                  contextId={activeDiag.id}
                  contextTitle={`Diagram: ${activeDiag.title}`}
                  variant="outline"
                  size="sm"
                />
              </div>

              {/* Title & Diagram Box */}
              <div className="space-y-3">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {activeDiag.title}
                </h2>

                {activeDiag.diagram && (
                  <div className="p-4 bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm rounded-2xl overflow-x-auto whitespace-pre leading-relaxed border border-slate-800 shadow-inner">
                    {activeDiag.diagram}
                  </div>
                )}
              </div>

              {/* Question */}
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {activeDiag.question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {activeDiag.options.map((opt, oIdx) => {
                  const isSelected = selectedDiagOption === oIdx;
                  const isCorrect = isDiagSubmitted && oIdx === activeDiag.correctIndex;
                  const isWrongSelected = isDiagSubmitted && isSelected && oIdx !== activeDiag.correctIndex;

                  let optClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                  if (isCorrect) {
                    optClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500 font-bold';
                  } else if (isWrongSelected) {
                    optClass = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400 font-semibold';
                  } else if (isSelected) {
                    optClass = 'border-blue-500 bg-blue-50 text-blue-900 ring-1 ring-blue-500 font-bold';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => {
                        setSelectedDiagOption(oIdx);
                        setIsDiagSubmitted(true);
                      }}
                      className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${optClass}`}
                    >
                      <span>{opt}</span>
                      {isCorrect && <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />}
                      {isWrongSelected && <XCircle size={18} className="text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isDiagSubmitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-1.5 text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                  <span className="font-bold text-emerald-900 uppercase tracking-wide text-[10px] block">
                    Architectural Explanation:
                  </span>
                  <p>{activeDiag.explanation}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveDiagIndex(Math.max(0, activeDiagIndex - 1))}
                  disabled={activeDiagIndex === 0}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeDiagIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100 cursor-pointer'
                  }`}
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveDiagIndex(Math.min(diagramQuestions.length - 1, activeDiagIndex + 1))}
                  disabled={activeDiagIndex >= diagramQuestions.length - 1}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeDiagIndex >= diagramQuestions.length - 1
                      ? 'opacity-30 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  }`}
                >
                  <span>Next Diagram</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white border border-slate-200 rounded-3xl text-center text-slate-500">
              No diagram questions available for this topic.
            </div>
          )}
        </div>
      )}

      {/* Footer Bridge to Summary & Notes */}
      <div className="pt-2 flex items-center justify-end">
        <button
          type="button"
          onClick={onGoToSummary}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>Go to Summary & Shared Notes</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
