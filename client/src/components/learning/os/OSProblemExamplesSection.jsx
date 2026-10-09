import React, { useState, useEffect, useMemo, useRef, Suspense, lazy } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Layers,
  Sparkles,
  HelpCircle,
  Cpu,
  Target,
  Search,
  Filter,
  X,
  RotateCcw
} from 'lucide-react';
import { getOSTopicExamples, OS_PROBLEM_EXAMPLES_DATA } from '../../../data/os/osProblemExamplesData.js';
import { OS_DOMAINS, OS_TOPICS_LIST, getOSTopic } from '../../../data/os/osTopicDataRegistry.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

// Lazy load the detailed modal viewer only when user clicks [Open Example]
const OSProblemExampleModal = lazy(() => import('./OSProblemExampleModal.jsx'));

// Set of canonical topic IDs that have dedicated 12-stage interactive numerical derivations
export const NUMERICAL_TOPIC_IDS = new Set([
  'cpu-scheduling-fundamentals',
  'fcfs-scheduling',
  'sjf-srtf-scheduling',
  'priority-scheduling-algo',
  'round-robin-scheduling',
  'mlq-mlfq-scheduling',
  'bankers-algorithm-safe-state',
  'main-memory-allocation',
  'fragmentation-allocation-strategies',
  'paging-page-tables',
  'page-replacement-algorithms',
  'tlb-effective-access-time',
  'disk-structure-scheduling'
]);

/**
 * Memoized Topic Card for 30 OS Curriculum Topics
 * Prevents re-rendering all 30 cards when only 1 active card changes or when modal opens
 */
const OSTopicCard = React.memo(function OSTopicCard({
  top,
  isSelected,
  isNumerical,
  onSelectTopic,
  onOpenExample,
  onGoToNumericals
}) {
  const topExamples = OS_PROBLEM_EXAMPLES_DATA[top.topicId] || [];
  const firstEx = topExamples[0];

  return (
    <div
      id={`example-topic-card-${top.topicId}`}
      onClick={() => onSelectTopic(top)}
      className={`bg-[#FFFDF9] border rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 transition-all hover:shadow-md cursor-pointer ${
        isSelected
          ? 'border-2 border-[#6574C4] ring-2 ring-[#6574C4]/15 shadow-xs'
          : 'border-[#D9D1C7] hover:border-[#6574C4]'
      }`}
    >
      <div className="space-y-2.5">
        {/* Header: Topic number & badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#EDE9F6] text-[#6574C4] text-[11px] font-black flex items-center justify-center shrink-0">
            {top.order}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F8F4EE] border border-[#D9D1C7] text-[#475569]">
              {(top.domainName || '').replace(/Domain \d+ [—\u2014-] /, '')}
            </span>
            {isNumerical && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-200">
                Numerical
              </span>
            )}
          </div>
        </div>

        {/* Topic Title */}
        <h3 className="text-sm sm:text-base font-black text-[#0F172A] line-clamp-1">
          {top.topicName}
        </h3>

        {/* Example Preview Snippet */}
        {firstEx && (
          <div className="p-3 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] text-xs space-y-1">
            <span className="font-extrabold text-[#6574C4] text-[10px] uppercase tracking-wider block">
              Example 1 Preview
            </span>
            <p className="text-[#334155] font-semibold line-clamp-2 leading-relaxed">
              {firstEx.problem}
            </p>
          </div>
        )}

        {/* Pipeline Stage Preview */}
        <div className="flex items-center gap-1 text-[10px] font-bold text-[#64748B] flex-wrap pt-0.5">
          <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">Given</span>
          <span>&rarr;</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">Flowchart</span>
          <span>&rarr;</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">Steps</span>
          <span>&rarr;</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">Answer</span>
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-2 border-t border-[#F1ECE5] flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-[#6574C4]">
          {topExamples.length} Worked Examples
        </span>

        <div className="flex items-center gap-1.5">
          {isNumerical && onGoToNumericals && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectTopic) onSelectTopic(top);
                onGoToNumericals();
              }}
              title="Open 12-Step Numerical Lab"
              className="p-1.5 rounded-lg bg-violet-50 text-violet-800 border border-violet-200 hover:bg-violet-100 transition-colors cursor-pointer"
            >
              <Cpu size={14} />
            </button>
          )}
          <button
            type="button"
            id={`btn-open-example-${top.topicId}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpenExample(top, 0);
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-[#6574C4] text-white hover:bg-[#5260AE] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Lightbulb size={13} />
            <span>Open Example</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default function OSProblemExamplesSection({
  topic,
  onSelectTopic,
  allTopics = [],
  onGoToPractice,
  onGoToNumericals
}) {
  // Topic identifier passed from parent or fallback to intro-to-os
  const activeTopicId = topic?.id || topic?.slug || topic?.topicId || 'intro-to-os';
  const activeTopicMeta = useMemo(() => getOSTopic(activeTopicId), [activeTopicId]);

  // Active topic inline worked examples state
  const [inlineExampleIdx, setInlineExampleIdx] = useState(0);
  const activeTopicExamples = useMemo(() => getOSTopicExamples(activeTopicId) || [], [activeTopicId]);
  const currentInlineEx = activeTopicExamples[inlineExampleIdx] || activeTopicExamples[0];

  // Filtering and Search state
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal / Example Viewer state (lazy loaded)
  const [modalTopicId, setModalTopicId] = useState(null);
  const [modalExampleIndex, setModalExampleIndex] = useState(0);

  // Sync active topic when prop changes - Guarded with ref to prevent re-renders on initial mount
  const prevTopicIdRef = useRef(activeTopicId);
  useEffect(() => {
    if (prevTopicIdRef.current !== activeTopicId) {
      prevTopicIdRef.current = activeTopicId;
      setInlineExampleIdx(0);
      if (activeTopicMeta && activeTopicMeta.domainId && selectedDomain !== 'all' && selectedDomain !== activeTopicMeta.domainId) {
        setSelectedDomain('all');
      }
    }
  }, [activeTopicId, activeTopicMeta, selectedDomain]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalTopicId) {
        setModalTopicId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalTopicId]);

  // Filter topics based on selected domain and search query (fast path for default state)
  const filteredTopics = useMemo(() => {
    if (selectedDomain === 'all' && !searchQuery.trim()) {
      return OS_TOPICS_LIST;
    }

    const q = searchQuery.toLowerCase().trim();
    return OS_TOPICS_LIST.filter((top) => {
      const matchesDomain = selectedDomain === 'all' || top.domainId === selectedDomain;
      if (!matchesDomain) return false;
      if (!q) return true;

      const exList = OS_PROBLEM_EXAMPLES_DATA[top.topicId] || [];
      const matchesTopic =
        top.topicName.toLowerCase().includes(q) ||
        (top.summary && top.summary.toLowerCase().includes(q)) ||
        (top.level && top.level.toLowerCase().includes(q));

      if (matchesTopic) return true;

      return exList.some(
        (ex) =>
          (ex.title && ex.title.toLowerCase().includes(q)) ||
          (ex.problem && ex.problem.toLowerCase().includes(q)) ||
          (ex.answer && ex.answer.toLowerCase().includes(q)) ||
          (ex.quickExplanation && ex.quickExplanation.toLowerCase().includes(q))
      );
    });
  }, [selectedDomain, searchQuery]);

  // Select a topic card -> Updates active topic and reveals its worked solutions in showcase
  const handleSelectTopic = (topicItem) => {
    setInlineExampleIdx(0);
    if (onSelectTopic) {
      onSelectTopic(topicItem);
    }
  };

  // Open modal viewer for a specific topic
  const handleOpenExample = (topicItem, initialIndex = 0) => {
    const targetTopicId = topicItem?.topicId || topicItem?.slug || topicItem?.id || activeTopicId;
    setModalTopicId(targetTopicId);
    setModalExampleIndex(initialIndex);
    if (onSelectTopic && topicItem) {
      onSelectTopic(topicItem);
    }
  };

  // Close modal viewer
  const handleCloseModal = () => {
    setModalTopicId(null);
    setModalExampleIndex(0);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      {/* ------------------------------------------------------------- */}
      {/* 1. SECTION BANNER & QUICK STATS                               */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2D9CC] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4] bg-[#EDE9F6] px-2.5 py-0.5 rounded-full border border-indigo-200">
                SECTION 2 &bull; BENCHMARK PROBLEM EXAMPLES
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                30 Topics &bull; 60 Worked Solutions
              </span>
              {NUMERICAL_TOPIC_IDS.has(activeTopicMeta?.topicId) && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-900 border border-violet-200 flex items-center gap-1">
                  <Cpu size={12} className="text-[#6574C4]" />
                  Numerical Lab Linked
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-1 flex items-center gap-2">
              <Lightbulb size={24} className="text-[#6574C4]" />
              Operating Systems Solved Problem Examples
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <AddNoteButton
              subject="OS"
              topicId={activeTopicId}
              topicName={activeTopicMeta?.topicName || topic?.title}
              section="examples"
              size="sm"
              variant="subtle"
            />
            {onGoToNumericals && NUMERICAL_TOPIC_IDS.has(activeTopicMeta?.topicId) && (
              <button
                type="button"
                id="btn-goto-numericals"
                onClick={onGoToNumericals}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#6574C4] text-white hover:bg-[#5260AE] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Cpu size={14} />
                <span>Open 12-Step Numerical Lab</span>
              </button>
            )}
            {onGoToPractice && (
              <button
                type="button"
                id="btn-examples-goto-practice"
                onClick={onGoToPractice}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F8F4EE] border border-[#D9D1C7] text-[#0F172A] hover:bg-[#EDE9F6] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Target size={14} className="text-[#6574C4]" />
                <span>Practice Questions</span>
              </button>
            )}
            <button
              type="button"
              id="btn-quick-open-active-example"
              onClick={() => handleOpenExample(activeTopicMeta || topic, inlineExampleIdx)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-[#6574C4] text-white hover:bg-[#5260AE] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Lightbulb size={13} />
              <span>Open Modal Viewer</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
          Structured, interview-tested worked solutions for all 30 Operating Systems topics. Every problem features a clear problem statement, given system constraints, execution flowcharts, step-by-step logic, and final verified answers.
        </p>

        {/* ------------------------------------------------------------- */}
        {/* 2. SEARCH & DOMAIN FILTERS                                    */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-3 pt-2">
          {/* Search bar */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              id="os-problem-examples-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 30 OS topics & 60 worked examples by keyword, problem statement, or algorithm..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:ring-2 focus:ring-[#6574C4]/20 focus:border-[#6574C4] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#94A3B8] hover:text-[#0F172A]"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              id="domain-filter-all"
              onClick={() => setSelectedDomain('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedDomain === 'all'
                  ? 'bg-[#6574C4] text-white shadow-xs'
                  : 'bg-[#F8F4EE] text-[#475569] hover:bg-[#EDE9F6] border border-[#D9D1C7]'
              }`}
            >
              All Domains (30 Topics)
            </button>

            {OS_DOMAINS.map((dom) => {
              const isActive = selectedDomain === dom.id;
              const domLabel = (dom.title || dom.name || dom.id || '').replace(/Domain \d+ [—\u2014-] /, '');
              return (
                <button
                  key={dom.id}
                  id={`domain-filter-${dom.id}`}
                  type="button"
                  onClick={() => setSelectedDomain(dom.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#6574C4] text-white shadow-xs'
                      : 'bg-[#F8F4EE] text-[#475569] hover:bg-[#EDE9F6] border border-[#D9D1C7]'
                  }`}
                >
                  {domLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2.5 ACTIVE TOPIC WORKED EXAMPLES SHOWCASE                     */}
      {/* ------------------------------------------------------------- */}
      {currentInlineEx && (
        <div
          id="active-topic-examples-showcase"
          className="bg-[#FFFDF9] border-2 border-[#6574C4] rounded-2xl p-5 sm:p-7 shadow-xs space-y-5 animate-fadeIn"
        >
          {/* Showcase Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D9CC] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4] bg-[#EDE9F6] px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Topic {activeTopicMeta?.order} &bull; {activeTopicMeta?.domainName}
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                  Active Selected Topic
                </span>
                {NUMERICAL_TOPIC_IDS.has(activeTopicMeta?.topicId) && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-violet-50 text-violet-900 border border-violet-200">
                    Numerical Lab Available
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                {activeTopicMeta?.topicName} Worked Solutions
              </h3>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                id="btn-showcase-open-modal"
                onClick={() => handleOpenExample(activeTopicMeta, inlineExampleIdx)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-[#6574C4] text-white hover:bg-[#5260AE] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Lightbulb size={13} />
                <span>Open in Fullscreen Modal</span>
              </button>
              {onGoToNumericals && NUMERICAL_TOPIC_IDS.has(activeTopicMeta?.topicId) && (
                <button
                  type="button"
                  id="btn-showcase-goto-numericals"
                  onClick={onGoToNumericals}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-violet-50 text-violet-900 border border-violet-200 hover:bg-violet-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu size={13} className="text-[#6574C4]" />
                  <span>Numerical Lab</span>
                </button>
              )}
            </div>
          </div>

          {/* Example Selector Tabs */}
          {activeTopicExamples.length > 1 && (
            <div className="flex items-center gap-2 pb-1 border-b border-[#F1ECE5]">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
                Select Worked Example:
              </span>
              <div className="flex items-center gap-1.5">
                {activeTopicExamples.map((ex, idx) => {
                  const isActive = inlineExampleIdx === idx;
                  return (
                    <button
                      key={ex.id || idx}
                      type="button"
                      id={`btn-showcase-example-tab-${idx}`}
                      onClick={() => setInlineExampleIdx(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#6574C4] text-white shadow-xs'
                          : 'bg-[#F8F4EE] text-[#475569] hover:bg-[#EDE9F6] border border-[#D9D1C7]'
                      }`}
                    >
                      Example {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Example Title Banner */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-black text-[#6574C4] bg-[#EDE9F6] px-3 py-1 rounded-lg border border-indigo-200">
              {currentInlineEx.title}
            </span>
            <span className="text-[11px] font-bold text-[#64748B]">
              Step-by-Step Solved Benchmark
            </span>
          </div>

          {/* 1. Problem Statement */}
          <div className="p-4 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0F172A]">
              <HelpCircle size={15} className="text-[#6574C4]" />
              <span>Problem Statement</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#1E293B] leading-relaxed">
              {currentInlineEx.problem}
            </p>
          </div>

          {/* 2. Given Data */}
          {currentInlineEx.given && (
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/90 text-xs space-y-1">
              <span className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px] block">
                Given Parameters &amp; Constraints:
              </span>
              <p className="text-amber-950 font-medium leading-relaxed">
                {currentInlineEx.given}
              </p>
            </div>
          )}

          {/* 3. Visual Flowchart */}
          {currentInlineEx.flowchart && currentInlineEx.flowchart.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers size={13} className="text-[#6574C4]" />
                Execution Flowchart Sequence:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {currentInlineEx.flowchart.map((node, nIdx) => (
                  <React.Fragment key={nIdx}>
                    <div className="px-3 py-2 rounded-xl bg-[#EDE9F6] text-[#6574C4] border border-indigo-200 text-xs font-bold whitespace-nowrap shadow-2xs">
                      {node}
                    </div>
                    {nIdx < currentInlineEx.flowchart.length - 1 && (
                      <ArrowRight size={14} className="text-[#94A3B8] shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* 4. Step-by-Step Solution Breakdown */}
          {currentInlineEx.steps && currentInlineEx.steps.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
                Step-by-Step Solution Breakdown:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {currentInlineEx.steps.map((st) => (
                  <div
                    key={st.step}
                    className="p-3.5 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] flex flex-col sm:flex-row sm:items-start gap-2.5 text-xs text-[#1E293B]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#6574C4] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                      {st.step}
                    </span>
                    <div className="flex-1 space-y-0.5">
                      <strong className="text-[#0F172A] font-extrabold block">
                        {st.action}
                      </strong>
                      <span className="text-[#475569] font-medium leading-relaxed block">
                        {st.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Verified Final Answer */}
          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-300 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-900 font-black uppercase tracking-wider text-[11px]">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Verified Final Answer:</span>
            </div>
            <p className="text-emerald-950 font-bold text-xs sm:text-sm leading-relaxed">
              {currentInlineEx.answer}
            </p>
          </div>

          {/* 6. Quick Placement Explanation */}
          {currentInlineEx.quickExplanation && (
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs space-y-1">
              <span className="font-extrabold text-indigo-900 uppercase tracking-wider text-[10px] block">
                Placement Takeaway:
              </span>
              <p className="text-indigo-950 font-medium leading-relaxed">
                {currentInlineEx.quickExplanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. TOPIC CARDS GRID (ALL 30 TOPICS)                           */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#475569]">
              Curriculum Problem Walkthroughs ({filteredTopics.length} of {OS_TOPICS_LIST.length} Topics)
            </span>
          </div>
          {(selectedDomain !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedDomain('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#6574C4] hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredTopics.map((top) => {
              const isNumerical = NUMERICAL_TOPIC_IDS.has(top.topicId);
              const isSelected = activeTopicId === top.topicId || activeTopicId === top.slug;

              return (
                <OSTopicCard
                  key={top.topicId}
                  top={top}
                  isSelected={isSelected}
                  isNumerical={isNumerical}
                  onSelectTopic={handleSelectTopic}
                  onOpenExample={handleOpenExample}
                  onGoToNumericals={onGoToNumericals}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-10 text-center space-y-3">
            <HelpCircle size={32} className="mx-auto text-[#94A3B8]" />
            <h4 className="text-base font-black text-[#0F172A]">No Worked Examples Found</h4>
            <p className="text-xs text-[#475569] max-w-md mx-auto">
              No topics matched &ldquo;{searchQuery}&rdquo; within the selected domain filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDomain('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#6574C4] text-white hover:bg-[#5260AE] transition-colors cursor-pointer shadow-xs"
            >
              View All 30 Topics
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. MODAL / DETAILED EXAMPLE VIEWER (LAZY LOADED ON DEMAND)     */}
      {/* ------------------------------------------------------------- */}
      {modalTopicId && (
        <Suspense fallback={null}>
          <OSProblemExampleModal
            modalTopicId={modalTopicId}
            modalExampleIndex={modalExampleIndex}
            onClose={handleCloseModal}
            onSelectExampleIndex={setModalExampleIndex}
            onGoToNumericals={onGoToNumericals}
          />
        </Suspense>
      )}
    </div>
  );
}
