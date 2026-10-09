import React, { useState, useMemo } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Target,
  FileText,
  Search,
  ChevronDown,
  ChevronUp,
  Calculator,
  HelpCircle,
  X,
  Zap,
  Info
} from 'lucide-react';
import AddNoteButton from '../../notes/AddNoteButton';
import AptitudeExampleVisual from './AptitudeExampleVisual';
import { getTopicExamples } from '../../../data/aptitudeExamplesData';

/**
 * AptitudeProblemExamplesSection
 * Beginner-friendly, engaging Solved Problem Examples for Aptitude topics.
 * 
 * Features:
 * - High-contrast readable typography (dark navy headings, dark slate body)
 * - 4 Compact learning highlight cards
 * - Compact filters (All / Level 1 Easy / Level 2 Medium / Level 3 Hard) + search
 * - Expandable solution steps ("Show Solution" progressive disclosure)
 * - Small educational visuals (CSS/SVG diagrams)
 * - Interactive Formula popup
 * - 💡 Remember tips & ⚠ Common mistake callouts
 * - "📝 Add My Note" integration
 */
export default function AptitudeProblemExamplesSection({
  topic,
  onGoToPractice,
  onGoToSummary
}) {
  if (!topic) return null;

  // Retrieve topic-specific solved examples
  const allExamples = useMemo(() => {
    return getTopicExamples(topic.topicId, topic.topicName);
  }, [topic.topicId, topic.topicName]);

  // Filter & Search states
  const [activeLevelFilter, setActiveLevelFilter] = useState('all'); // 'all' | 'easy' | 'medium' | 'hard'
  const [searchQuery, setSearchQuery] = useState('');

  // Expandable solution states: Map of exampleId -> boolean
  // Initial state: first example open, others collapsed for clean progressive learning
  const [expandedSolutions, setExpandedSolutions] = useState(() => {
    const initial = {};
    if (allExamples.length > 0) {
      initial[allExamples[0].id] = true;
    }
    return initial;
  });

  // Active Formula Popup state
  const [activeFormulaModal, setActiveFormulaModal] = useState(null);

  const toggleSolution = (id) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtered examples
  const filteredExamples = useMemo(() => {
    return allExamples.filter((ex) => {
      if (activeLevelFilter !== 'all' && ex.level !== activeLevelFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = ex.title?.toLowerCase().includes(query);
        const inQuestion = ex.question?.toLowerCase().includes(query);
        const inAnswer = ex.answer?.toLowerCase().includes(query);
        return inTitle || inQuestion || inAnswer;
      }
      return true;
    });
  }, [allExamples, activeLevelFilter, searchQuery]);

  return (
    <div className="space-y-5 select-none animate-fadeIn" id="aptitude-section-examples">
      {/* ------------------------------------------------------------- */}
      {/* 1. COMPACT SECTION HEADER WITH BEGINNER-FRIENDLY COPY         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D1C7] pb-3.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EDE9F6] text-[#45456A] border border-[#D9D2EA] text-[11px] font-extrabold uppercase tracking-wider">
                Section 2 &bull; Problem Examples
              </span>
              <span className="text-[#D9D1C7]">&bull;</span>
              <span className="text-xs font-bold text-[#475569]">{topic.topicName}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Solved Problem Examples
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <AddNoteButton
              subject="Aptitude"
              topicId={topic.topicId}
              topicName={topic.topicName}
              section="Problem Examples"
              size="md"
            />
            {onGoToPractice && (
              <button
                type="button"
                onClick={onGoToPractice}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#6574C4] hover:bg-[#5361A8] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <Target size={14} />
                <span>MCQ Practice &rarr;</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#334155] font-medium leading-relaxed max-w-3xl">
          Let&apos;s solve <strong>{topic.topicName}</strong> questions step by step. See how to choose the right formula, follow each calculation step clearly, and avoid common mistakes.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. 4 COMPACT LEARNING HIGHLIGHTS (Section 6 requirement)     */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-xl p-3 shadow-2xs hover:border-[#6574C4] transition-all">
          <div className="flex items-center gap-2 text-xs font-black text-[#0F172A] mb-0.5">
            <span className="text-base">💡</span>
            <span>Understand the question</span>
          </div>
          <p className="text-[11px] text-[#475569] leading-snug">
            Learn what the question is asking.
          </p>
        </div>

        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-xl p-3 shadow-2xs hover:border-[#6574C4] transition-all">
          <div className="flex items-center gap-2 text-xs font-black text-[#0F172A] mb-0.5">
            <span className="text-base">🧮</span>
            <span>Choose the formula</span>
          </div>
          <p className="text-[11px] text-[#475569] leading-snug">
            See which formula you need.
          </p>
        </div>

        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-xl p-3 shadow-2xs hover:border-[#6574C4] transition-all">
          <div className="flex items-center gap-2 text-xs font-black text-[#0F172A] mb-0.5">
            <span className="text-base">🪜</span>
            <span>Solve step by step</span>
          </div>
          <p className="text-[11px] text-[#475569] leading-snug">
            Follow each step clearly.
          </p>
        </div>

        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-xl p-3 shadow-2xs hover:border-[#6574C4] transition-all">
          <div className="flex items-center gap-2 text-xs font-black text-[#0F172A] mb-0.5">
            <span className="text-base">⚠</span>
            <span>Avoid mistakes</span>
          </div>
          <p className="text-[11px] text-[#475569] leading-snug">
            Learn common mistakes before you make them.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. COMPACT FILTERS & SEARCH BAR                              */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-xl p-2.5 sm:p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar" role="group" aria-label="Example difficulty filters">
          <button
            type="button"
            onClick={() => setActiveLevelFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeLevelFilter === 'all'
                ? 'bg-[#6574C4] text-white shadow-2xs'
                : 'bg-[#FFFDF9] text-[#475569] hover:bg-[#EDE9F6] hover:text-[#0F172A] border border-[#D9D1C7]'
            }`}
          >
            All Examples ({allExamples.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveLevelFilter('easy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeLevelFilter === 'easy'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-[#FFFDF9] text-[#475569] hover:bg-emerald-50 hover:text-emerald-800 border border-[#D9D1C7]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>Level 1 — Easy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevelFilter('medium')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeLevelFilter === 'medium'
                ? 'bg-amber-700 text-white shadow-2xs'
                : 'bg-[#FFFDF9] text-[#475569] hover:bg-amber-50 hover:text-amber-800 border border-[#D9D1C7]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            <span>Level 2 — Medium</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevelFilter('hard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeLevelFilter === 'hard'
                ? 'bg-purple-700 text-white shadow-2xs'
                : 'bg-[#FFFDF9] text-[#475569] hover:bg-purple-50 hover:text-purple-800 border border-[#D9D1C7]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>
            <span>Level 3 — Hard</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-56">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search examples..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#FFFDF9] border border-[#D9D1C7] rounded-lg text-xs font-medium text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#6574C4]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. SOLVED EXAMPLES LIST CARDS                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4">
        {filteredExamples.length === 0 ? (
          <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-8 text-center space-y-2">
            <span className="text-2xl">🔍</span>
            <h3 className="text-sm font-bold text-[#0F172A]">No examples found</h3>
            <p className="text-xs text-[#475569]">
              Try clearing your search query or switching to &quot;All Examples&quot;.
            </p>
          </div>
        ) : (
          filteredExamples.map((ex, idx) => {
            const isExpanded = !!expandedSolutions[ex.id];

            return (
              <div
                key={ex.id}
                id={`example-card-${ex.id}`}
                className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 transition-all hover:border-[#CBD5E1]"
              >
                {/* Header row: Level badge + Question Number + Formula Trigger */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D9CC] pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-md border ${
                        ex.levelBadgeClass || 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {ex.levelLabel}
                    </span>
                    <span className="text-[11px] font-bold text-[#475569] bg-[#F8F5EE] px-2 py-0.5 rounded border border-[#CBD5E1]">
                      Example {idx + 1}
                    </span>
                    {ex.badge && (
                      <span className="text-[10px] font-bold text-[#6574C4] bg-[#EDE9F6] px-2 py-0.5 rounded-full border border-[#D9D2EA] hidden sm:inline-block">
                        {ex.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Interactive Formula Button Popup */}
                    {ex.formula && (
                      <button
                        type="button"
                        onClick={() => setActiveFormulaModal(ex.formula)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#E8EFF8] hover:bg-[#DCE7F5] text-[#3E5575] border border-[#CAD9EA] transition-colors cursor-pointer flex items-center gap-1"
                        title="Click to view formula"
                      >
                        <Calculator size={13} className="text-[#6574C4]" />
                        <span>Formula</span>
                      </button>
                    )}

                    {/* Add My Note for this example */}
                    <AddNoteButton
                      subject="Aptitude"
                      topicId={topic.topicId}
                      topicName={topic.topicName}
                      section="Problem Examples"
                      questionId={ex.id}
                      questionTitle={ex.title}
                      size="sm"
                      variant="subtle"
                    />
                  </div>
                </div>

                {/* Question Title & Prompt */}
                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight">
                    {ex.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1E293B] font-semibold leading-relaxed">
                    {ex.question}
                  </p>
                </div>

                {/* Small Educational Visual Diagram */}
                {ex.visualType && (
                  <AptitudeExampleVisual
                    visualType={ex.visualType}
                    visualData={ex.visualData}
                  />
                )}

                {/* Show / Hide Solution Accordion Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleSolution(ex.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isExpanded
                        ? 'bg-[#F8F5EE] text-[#0F172A] border border-[#D9D1C7]'
                        : 'bg-[#6574C4]/10 hover:bg-[#6574C4]/15 text-[#334155] border border-[#6574C4]/30'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={14} className="text-[#6574C4]" />
                      <span>{isExpanded ? 'Hide Step-by-Step Solution' : '▼ Show Step-by-Step Solution'}</span>
                    </span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                {/* Expandable Solution Content */}
                {isExpanded && (
                  <div className="bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl p-4 sm:p-5 space-y-4 animate-fadeIn">
                    <div className="space-y-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#6574C4] block">
                        Step-by-Step Solution:
                      </span>

                      {/* Steps list */}
                      {ex.steps.map((st) => (
                        <div
                          key={st.stepNumber}
                          className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3.5 space-y-1 shadow-2xs"
                        >
                          <div className="flex items-center gap-2 text-xs font-black text-[#0F172A]">
                            <span className="w-5 h-5 rounded-md bg-[#6574C4] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                              {st.stepNumber}
                            </span>
                            <span>{st.title}</span>
                          </div>
                          <p className="text-xs text-[#334155] font-medium leading-relaxed pl-7">
                            {st.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Final Answer Banner */}
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between gap-2 text-xs text-emerald-950 font-bold">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                        <span>Final Answer:</span>
                        <strong className="text-emerald-900 text-sm font-black font-mono">
                          {ex.answer}
                        </strong>
                      </div>
                    </div>

                    {/* Remember & Common Mistake Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* 💡 Remember Card */}
                      {ex.rememberTip && (
                        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-amber-900 text-[11px]">
                            <Lightbulb size={13} className="text-amber-600" />
                            <span>💡 Remember</span>
                          </div>
                          <p className="text-[11px] text-amber-950 font-medium leading-relaxed">
                            {ex.rememberTip}
                          </p>
                        </div>
                      )}

                      {/* ⚠ Common Mistake Card */}
                      {ex.commonMistake && (
                        <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 text-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-rose-900 text-[11px]">
                            <AlertTriangle size={13} className="text-rose-600" />
                            <span>⚠ Common Mistake</span>
                          </div>
                          <p className="text-[11px] text-rose-950 font-medium leading-relaxed">
                            {ex.commonMistake}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. NEXT STEP ACTION CARD (Go to Practice)                     */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-extrabold text-[#0F172A] block text-sm">
            Ready to test yourself on {topic.topicName}?
          </span>
          <span className="text-[#475569]">
            Try solving MCQ placement questions with instant option verification.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onGoToPractice && (
            <button
              type="button"
              onClick={onGoToPractice}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#6574C4] hover:bg-[#5361A8] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Target size={14} />
              <span>Practice Questions &rarr;</span>
            </button>
          )}
          {onGoToSummary && (
            <button
              type="button"
              onClick={onGoToSummary}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FFFDF9] hover:bg-[#EDE9F6] text-[#0F172A] border border-[#D9D1C7] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FileText size={14} className="text-[#6574C4]" />
              <span>Summary &amp; Notes</span>
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6. INTERACTIVE FORMULA POPUP MODAL                            */}
      {/* ------------------------------------------------------------- */}
      {activeFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FFFDF9] border border-[#CBD5E1] rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-3">
              <div className="flex items-center gap-2 text-[#0F172A]">
                <Calculator size={18} className="text-[#6574C4]" />
                <h4 className="text-sm font-extrabold">{activeFormulaModal.name}</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveFormulaModal(null)}
                className="text-[#64748B] hover:text-[#0F172A] p-1 rounded-lg hover:bg-[#F8F5EE]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-3.5 bg-[#EDE9F6] border border-[#D9D2EA] rounded-xl text-center font-mono font-bold text-sm text-[#45456A]">
              {activeFormulaModal.formula}
            </div>

            <p className="text-xs text-[#334155] leading-relaxed">
              {activeFormulaModal.explanation}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveFormulaModal(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#6574C4] text-white hover:bg-[#5361A8] transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
