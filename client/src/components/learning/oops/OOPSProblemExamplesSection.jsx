import React, { useState, useMemo } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  Code2,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  Layers,
  ChevronDown,
  ChevronUp,
  FileText,
  Target
} from 'lucide-react';
import { OOPS_PROBLEM_EXAMPLES } from '../../../data/oops/oopsExamplesData.js';
import { resolveOOPSTopicId } from '../../../data/oops/oopsTopicDataRegistry.js';
import OOPSVisualDiagram from './OOPSVisualDiagram.jsx';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

/**
 * OOPSProblemExamplesSection Component
 * Solved benchmark OOPS examples with real-world scenarios, visual diagrams,
 * multi-language code snippets, expected outputs, and expandable step breakdowns.
 */
export default function OOPSProblemExamplesSection({
  selectedLanguage = 'Java',
  topic,
  onGoToPractice,
  onGoToSummary
}) {
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSolutions, setExpandedSolutions] = useState({});

  const toggleSolution = (id) => {
    setExpandedSolutions((prev) => {
      const currentVal = prev[id] !== undefined ? prev[id] : false;
      return {
        ...prev,
        [id]: !currentVal
      };
    });
  };

  const activeTopicId = useMemo(() => {
    return resolveOOPSTopicId(topic?.topicId || topic);
  }, [topic]);

  const { displayedExamples, isFallback } = useMemo(() => {
    const matchesFilters = (ex) => {
      const matchDiff = filterDifficulty === 'All' || ex.difficulty === filterDifficulty;
      const matchSearch =
        !searchQuery.trim() ||
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ex.topicId && ex.topicId.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchDiff && matchSearch;
    };

    // 1. Exact topic-specific examples
    const exact = OOPS_PROBLEM_EXAMPLES.filter(
      (ex) => ex.topicId === activeTopicId && matchesFilters(ex)
    );

    if (exact.length > 0) {
      return {
        displayedExamples: exact.map((ex) => ({ ...ex, isRelated: false })),
        isFallback: false
      };
    }

    // 2. Fallback: Related OOPS examples if active topic has no exact match for filter
    const related = OOPS_PROBLEM_EXAMPLES.filter(
      (ex) => ex.topicId !== activeTopicId && matchesFilters(ex)
    );

    return {
      displayedExamples: related.slice(0, 3).map((ex) => ({ ...ex, isRelated: true })),
      isFallback: true
    };
  }, [activeTopicId, filterDifficulty, searchQuery]);

  return (
    <div className="space-y-4 select-none animate-fadeIn" id="oops-section-examples">
      {/* 1. Header Card */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D1C7] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] text-[11px] font-extrabold uppercase tracking-wider">
                Section 2 &bull; Solved Problem Examples
              </span>
              <span className="text-[#D9D1C7]">&bull;</span>
              <span className="text-xs font-bold text-[#475569]">Real-World Code Scenarios</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
              Solved OOPS Benchmark Problems
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {onGoToPractice && (
              <button
                type="button"
                id="btn-examples-goto-practice"
                onClick={onGoToPractice}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#6574C4] hover:bg-[#5361A8] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Go to Practice Questions</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#334155] font-medium leading-relaxed max-w-3xl">
          Study these step-by-step solved object-oriented problems in <strong>{selectedLanguage}</strong>. Notice how classes, encapsulation, inheritance, and dynamic polymorphism are cleanly structured in real code.
        </p>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
          {/* Difficulty Filter Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => {
              const isSel = filterDifficulty === diff;
              return (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setFilterDifficulty(diff)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSel
                      ? 'bg-[#6574C4] text-white shadow-2xs'
                      : 'bg-[#FFFDF9] text-[#475569] border border-[#D9D1C7] hover:bg-[#EDE9F6]'
                  }`}
                >
                  {diff}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search problem examples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-medium bg-[#FFFDF9] border border-[#D9D1C7] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6574C4] shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* 2. Examples List */}
      <div className="space-y-4">
        {isFallback && displayedExamples.length > 0 && (
          <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-900 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-amber-600 shrink-0" />
              <span>
                Showing <strong>Related OOPS Examples</strong> for current search/filter:
              </span>
            </div>
          </div>
        )}

        {displayedExamples.length > 0 ? (
          displayedExamples.map((ex, idx) => {
            const isExpanded = expandedSolutions[ex.id] !== undefined ? expandedSolutions[ex.id] : idx === 0;

            return (
              <div
                key={ex.id}
                id={`oops-example-${ex.id}`}
                className="bg-[#FFFDF9] border-2 border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5 transition-all hover:border-[#6574C4]/50"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D9CC] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#E8EFF8] text-[#3E5575] font-black text-xs flex items-center justify-center border border-[#CAD9EA]">
                      {idx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#0F172A]">
                      {ex.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                        ex.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : ex.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-900 border-amber-200'
                          : 'bg-rose-50 text-rose-900 border-rose-200'
                      }`}
                    >
                      {ex.difficulty}
                    </span>
                    {ex.isRelated ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300">
                        Related OOPS Example
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-900 border border-indigo-200">
                        Topic Benchmark
                      </span>
                    )}
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#EDE9F6] text-[#45456A] border border-[#D9D2EA]">
                      {ex.concept}
                    </span>
                    <AddNoteButton
                      subject="OOPS"
                      topicId={topic?.topicId || 'classes-and-objects'}
                      topicName={topic?.topicName || 'Class and Object'}
                      section="Problem Examples"
                      questionId={ex.id}
                      questionTitle={ex.title}
                      size="sm"
                      variant="subtle"
                    />
                  </div>
                </div>

                {/* Problem Description */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4] block">
                    Problem Scenario:
                  </span>
                  <p className="text-xs sm:text-sm text-[#0F172A] font-semibold leading-relaxed">
                    {ex.scenario}
                  </p>
                </div>

                {/* What Do We Need & Concept Used Pill Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {ex.whatWeNeed && (
                    <div className="p-2.5 rounded-xl bg-[#F8F5EE] border border-[#D9D1C7] space-y-0.5">
                      <strong className="text-[10px] uppercase font-black text-[#475569] block">
                        What Do We Need?
                      </strong>
                      <span className="text-[#0F172A] font-medium leading-snug">{ex.whatWeNeed}</span>
                    </div>
                  )}
                  {ex.conceptUsed && (
                    <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 space-y-0.5">
                      <strong className="text-[10px] uppercase font-black text-indigo-900 block">
                        Concept Used:
                      </strong>
                      <span className="text-indigo-950 font-medium leading-snug">{ex.conceptUsed}</span>
                    </div>
                  )}
                </div>

                {/* Visual Diagram */}
                {ex.visualType && (
                  <div className="pt-0.5">
                    <OOPSVisualDiagram
                      type={ex.visualType}
                      data={ex}
                      title={ex.title}
                      language={selectedLanguage}
                    />
                  </div>
                )}

                {/* Code Snippet Box */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#475569] uppercase tracking-wider">
                      {selectedLanguage} Implementation:
                    </span>
                    <span className="text-[11px] font-mono text-[#6574C4] font-bold">
                      {selectedLanguage}
                    </span>
                  </div>
                  <div className="p-3.5 bg-[#0F172A] rounded-xl text-emerald-300 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
                    <pre>{ex.codeSnippets[selectedLanguage] || ex.codeSnippets.Java}</pre>
                  </div>
                </div>

                {/* Expected Output */}
                {ex.expectedOutput && (
                  <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#D9D1C7] text-xs">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#475569] block mb-1">
                      Program Output:
                    </span>
                    <pre className="font-mono text-[11px] text-[#0F172A] whitespace-pre-wrap">{ex.expectedOutput}</pre>
                  </div>
                )}

                {/* Why It Works Box */}
                {ex.whyItWorks && (
                  <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 text-xs space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                      Why It Works:
                    </span>
                    <p className="text-emerald-950 font-medium leading-relaxed">{ex.whyItWorks}</p>
                  </div>
                )}

                {/* Expandable Step-by-Step Breakdown */}
                <div className="pt-1 border-t border-[#E2D9CC]">
                  <button
                    type="button"
                    onClick={() => toggleSolution(ex.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F8F5EE] hover:bg-[#EAE4D7] text-xs font-bold text-[#0F172A] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Lightbulb size={14} className="text-[#6574C4]" />
                      <span>{isExpanded ? 'Hide Step-by-Step Breakdown' : 'Show Step-by-Step Breakdown'}</span>
                    </span>
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 p-3.5 bg-[#FFFDF9] rounded-xl border border-[#D9D1C7] space-y-2.5 text-xs animate-fadeIn">
                      <div className="space-y-2">
                        {ex.steps.map((st, sIdx) => (
                          <div key={sIdx} className="space-y-0.5">
                            <strong className="text-[#6574C4] block text-[11px] uppercase tracking-wider">
                              {st.step}
                            </strong>
                            <p className="text-[#334155] font-medium leading-relaxed">{st.desc}</p>
                          </div>
                        ))}
                      </div>

                      {ex.quickTip && (
                        <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 font-medium flex items-center gap-2 text-[11px]">
                          <Sparkles size={13} className="shrink-0 text-amber-600" />
                          <span>Quick Tip: <strong>{ex.quickTip}</strong></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-6 bg-[#FFFDF9] rounded-2xl border border-dashed border-[#D9D1C7] text-center text-xs text-[#475569]">
            No solved examples found matching your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
