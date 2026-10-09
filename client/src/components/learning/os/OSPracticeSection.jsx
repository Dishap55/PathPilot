import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Target,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Filter,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { OS_PRACTICE_QUESTIONS } from '../../../data/os/osPracticeData.js';
import { OS_DOMAINS, OS_TOPICS_LIST, getOSTopic } from '../../../data/os/osTopicDataRegistry.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

// Pre-indexed lookup map for O(1) initial question positioning by topic
const TOPIC_INDEX_MAP = new Map();
OS_PRACTICE_QUESTIONS.forEach((q, idx) => {
  if (q.topicId) {
    TOPIC_INDEX_MAP.set(q.topicId, idx);
    TOPIC_INDEX_MAP.set(q.topicId.toLowerCase().replace(/_/g, '-'), idx);
  }
});

const getPracticeIndexForTopic = (tId) => {
  if (!tId) return 0;
  const clean = String(tId).toLowerCase().replace(/_/g, '-');
  if (TOPIC_INDEX_MAP.has(clean)) {
    return TOPIC_INDEX_MAP.get(clean);
  }
  const idx = OS_PRACTICE_QUESTIONS.findIndex(
    (q) => q.topicId === clean || clean.includes(q.topicId) || q.topicId.includes(clean)
  );
  return idx >= 0 ? idx : 0;
};

export default function OSPracticeSection({
  topic,
  onSelectTopic,
  allTopics = [],
  onGoToRevision
}) {
  const currentTopicId = topic?.id || topic?.slug || 'intro-to-os';
  const topicMeta = useMemo(() => getOSTopic(currentTopicId), [currentTopicId]);

  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(() => getPracticeIndexForTopic(currentTopicId));
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOptionIndex }
  const [showExplanation, setShowExplanation] = useState({}); // { [questionId]: boolean }

  // Sync state when external topic changes - Guarded with ref to avoid redundant render pass on initial mount
  const prevTopicIdRef = useRef(currentTopicId);
  useEffect(() => {
    if (prevTopicIdRef.current !== currentTopicId) {
      prevTopicIdRef.current = currentTopicId;
      const idx = getPracticeIndexForTopic(currentTopicId);
      if (idx !== -1) {
        setCurrentIndex(idx);
        setSelectedDomain('all');
        setSelectedTopicFilter('all');
      }
    }
  }, [currentTopicId]);

  // Filter questions based on active selection (defaults to all 30 questions)
  const filteredQuestions = useMemo(() => {
    if ((!selectedTopicFilter || selectedTopicFilter === 'all') && (!selectedDomain || selectedDomain === 'all')) {
      return OS_PRACTICE_QUESTIONS;
    }

    let list = OS_PRACTICE_QUESTIONS;

    if (selectedTopicFilter && selectedTopicFilter !== 'all') {
      const matched = list.filter(
        (q) => q.topicId === selectedTopicFilter || q.topicId.includes(selectedTopicFilter)
      );
      if (matched.length > 0) return matched;
    }

    if (selectedDomain && selectedDomain !== 'all') {
      return list.filter((q) => q.domainId === selectedDomain);
    }

    return list;
  }, [selectedDomain, selectedTopicFilter]);

  // Safe bounded index to prevent undefined/null activeQuestion
  const safeIndex = Math.min(Math.max(0, currentIndex), Math.max(0, filteredQuestions.length - 1));
  const activeQuestion = filteredQuestions[safeIndex] || OS_PRACTICE_QUESTIONS[0];
  const qId = activeQuestion?.id;
  const answeredChoice = qId ? userAnswers[qId] : undefined;
  const isAnswered = answeredChoice !== undefined;
  const isCorrect = isAnswered && answeredChoice === activeQuestion?.correctAnswer;

  const handleSelectOption = (optIdx) => {
    if (isAnswered || !qId) return; // Prevent re-answering
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setShowExplanation((prev) => ({ ...prev, [qId]: true }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowExplanation({});
    setCurrentIndex(0);
  };

  const handleDomainSelect = (domId) => {
    setSelectedDomain(domId);
    setSelectedTopicFilter('all');
    setCurrentIndex(0);
  };

  const handleTopicSelect = (tId) => {
    setSelectedTopicFilter(tId);
    setSelectedDomain('all');
    if (tId === 'all') {
      setCurrentIndex(0);
    } else {
      const idx = getPracticeIndexForTopic(tId);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  };

  const handleNextQuestion = () => {
    if (safeIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (selectedTopicFilter !== 'all') {
      setSelectedTopicFilter('all');
      setCurrentIndex((prev) => Math.min(OS_PRACTICE_QUESTIONS.length - 1, prev + 1));
    }
  };

  // Score calculation
  const totalAnswered = Object.keys(userAnswers).length;
  const totalCorrect = useMemo(() => {
    return Object.entries(userAnswers).filter(([id, ans]) => {
      const q = OS_PRACTICE_QUESTIONS.find((item) => item.id === id);
      return q && q.correctAnswer === ans;
    }).length;
  }, [userAnswers]);

  return (
    <div className="space-y-5 animate-fadeIn pb-8">
      {/* ------------------------------------------------------------- */}
      {/* 1. PRACTICE LAB HEADER & STATS                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-4 sm:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D9CC] pb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4] bg-[#EDE9F6] px-2.5 py-0.5 rounded-full border border-indigo-200">
                SECTION 3 &bull; DELIBERATE PRACTICE LAB
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                30 Questions &bull; Placement Ready
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-0.5 flex items-center gap-2">
              <Target size={22} className="text-[#6574C4]" />
              Operating Systems Practice Hub
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <AddNoteButton
              subject="OS"
              topicId={currentTopicId}
              topicName={topicMeta?.topicName || topic?.title}
              section="practice"
              size="sm"
              variant="subtle"
            />
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] text-xs font-bold text-[#0F172A]">
              <Award size={14} className="text-amber-500" />
              <span>Score: {totalCorrect} / {totalAnswered}</span>
            </div>
            <button
              type="button"
              id="btn-reset-practice-questions"
              onClick={handleReset}
              title="Reset All Answers"
              className="p-1.5 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] text-[#475569] hover:text-[#0F172A] hover:bg-[#EDE9F6] transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Filters Controls: Domain Tabs & Topic Selector */}
        <div className="space-y-2 pt-1">
          {/* Domain Filtering Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              id="practice-filter-all"
              onClick={() => {
                setSelectedDomain('all');
                setSelectedTopicFilter('all');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDomain === 'all' && selectedTopicFilter === 'all'
                  ? 'bg-[#6574C4] text-white shadow-2xs'
                  : 'bg-[#F8F4EE] text-[#475569] hover:bg-[#EDE9F6] border border-[#D9D1C7]'
              }`}
            >
              All Questions ({OS_PRACTICE_QUESTIONS.length})
            </button>

            {OS_DOMAINS.map((dom) => {
              const isDomActive = selectedDomain === dom.id && selectedTopicFilter === 'all';
              const domLabel = (dom.title || dom.name || dom.id || '').replace(/Domain \d+ [—\u2014-] /, '');
              return (
                <button
                  key={dom.id}
                  id={`practice-filter-domain-${dom.id}`}
                  type="button"
                  onClick={() => handleDomainSelect(dom.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isDomActive
                      ? 'bg-[#6574C4] text-white shadow-2xs'
                      : 'bg-[#F8F4EE] text-[#475569] hover:bg-[#EDE9F6] border border-[#D9D1C7]'
                  }`}
                >
                  {domLabel}
                </button>
              );
            })}
          </div>

          {/* Quick Topic Dropdown Filter */}
          <div className="flex items-center gap-2 pt-1 border-t border-[#F1ECE5]">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569] whitespace-nowrap">
              Filter by Topic:
            </span>
            <select
              id="practice-topic-select"
              value={selectedTopicFilter}
              onChange={(e) => handleTopicSelect(e.target.value)}
              className="text-xs bg-[#F8F4EE] border border-[#D9D1C7] rounded-lg px-2.5 py-1 text-[#0F172A] font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#6574C4]"
            >
              <option value="all">All Topics (Curriculum-wide)</option>
              {OS_TOPICS_LIST.map((t) => (
                <option key={t.topicId} value={t.topicId}>
                  {t.order}. {t.topicName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. QUESTION CARD                                              */}
      {/* ------------------------------------------------------------- */}
      {activeQuestion ? (
        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
          {/* Question Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2D9CC] pb-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-[#6574C4] bg-[#EDE9F6] px-2.5 py-0.5 rounded-full border border-indigo-200">
                Question {safeIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="font-bold text-[#475569] bg-[#F8F4EE] px-2.5 py-0.5 rounded-full border border-[#D9D1C7]">
                {activeQuestion.domainName}
              </span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {activeQuestion.difficulty}
              </span>
            </div>

            {activeQuestion.company && (
              <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                Asked at {activeQuestion.company}
              </span>
            )}
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 id="active-practice-question-text" className="text-base sm:text-lg font-black text-[#0F172A] leading-snug">
              {activeQuestion.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {activeQuestion.options.map((opt, optIdx) => {
              const isSelected = answeredChoice === optIdx;
              const isOptionCorrect = optIdx === activeQuestion.correctAnswer;

              let btnStyle = 'bg-[#F8F4EE] border-[#D9D1C7] text-[#1E293B] hover:bg-[#EDE9F6]';
              let badgeStyle = 'bg-[#E2D9CC] text-[#0F172A]';

              if (isAnswered) {
                if (isOptionCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                  badgeStyle = 'bg-emerald-600 text-white';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                  badgeStyle = 'bg-rose-600 text-white';
                } else {
                  btnStyle = 'bg-[#FAF8F5] border-[#E8E2D9] text-[#94A3B8] opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  id={`practice-option-${optIdx}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${badgeStyle}`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isOptionCorrect && (
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      )}
                      {isSelected && !isOptionCorrect && (
                        <XCircle size={18} className="text-rose-600 shrink-0" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Visible once answered) */}
          {isAnswered && (
            <div
              id="practice-question-explanation"
              className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
                isCorrect
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/70 border-rose-200 text-rose-950'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-black uppercase tracking-wider text-[11px] block">
                  {isCorrect ? 'Correct Answer!' : 'Incorrect — Keep Learning!'}
                </span>
                <p className="leading-relaxed font-medium">
                  {activeQuestion.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E2D9CC]">
            <button
              type="button"
              id="btn-practice-prev-question"
              disabled={safeIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-[#D9D1C7] bg-[#FFFDF9] text-[#475569] hover:bg-[#EDE9F6] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Previous</span>
            </button>

            {safeIndex < filteredQuestions.length - 1 || (selectedTopicFilter !== 'all' && currentIndex < OS_PRACTICE_QUESTIONS.length - 1) ? (
              <button
                type="button"
                id="btn-practice-next-question"
                onClick={handleNextQuestion}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#6574C4] text-white hover:bg-[#5260AE] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Next Question</span>
                <ArrowRight size={13} />
              </button>
            ) : (
              onGoToRevision && (
                <button
                  type="button"
                  id="btn-practice-goto-revision"
                  onClick={onGoToRevision}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Review Exam Prep Notes</span>
                  <ArrowRight size={13} />
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-8 text-center text-xs text-[#475569] space-y-3">
          <p className="font-bold text-sm text-[#0F172A]">No practice questions match the current filter.</p>
          <p className="text-xs text-[#64748B]">Try selecting another domain or resetting the filter to all questions.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedDomain('all');
              setSelectedTopicFilter('all');
              setCurrentIndex(0);
            }}
            className="px-4 py-2 rounded-xl bg-[#6574C4] text-white text-xs font-bold hover:bg-[#5260AE] transition-all cursor-pointer shadow-xs"
          >
            Show All 30 Questions
          </button>
        </div>
      )}
    </div>
  );
}
