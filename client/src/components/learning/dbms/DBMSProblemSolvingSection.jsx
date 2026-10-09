import React, { useState } from 'react';
import {
  Lightbulb,
  Copy,
  Check,
  ArrowRight,
  Database,
  Code2,
  Table,
  CheckCircle2,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { getDBMSProblemExamples } from '../../../data/dbms/dbmsProblemExamplesData.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

/**
 * DBMSProblemSolvingSection Component
 * Solved Benchmark Problems with Query Breakdown and Execution Trace.
 */
export default function DBMSProblemSolvingSection({
  topic,
  onGoToPractice
}) {
  const problems = getDBMSProblemExamples(topic?.topicId);
  const [activeProblemId, setActiveProblemId] = useState(() => problems[0]?.id || 'p-1');
  const [copiedQueryId, setCopiedQueryId] = useState(null);

  const activeProblem = problems.find((p) => p.id === activeProblemId) || problems[0];

  const handleCopy = (id, sql) => {
    if (!sql) return;
    navigator.clipboard?.writeText(sql);
    setCopiedQueryId(id);
    setTimeout(() => setCopiedQueryId(null), 2000);
  };

  return (
    <div
      id="dbms-section-problems"
      className="space-y-6 max-w-7xl mx-auto px-1 scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      {/* 1. SECTION BANNER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-xs font-bold uppercase tracking-wider">
                Section 2
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">Solved Benchmark Questions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Problem Solving & Walkthroughs
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5">
              <Lightbulb size={14} className="text-amber-600" /> {problems.length} Curated Benchmarks
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
          Deep-dive into canonical interview problems for <strong>{topic?.topicName}</strong> with step-by-step query breakdowns and relational table transformations.
        </p>
      </div>

      {/* 2. PROBLEM SELECTOR TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {problems.map((prob, idx) => {
          const isSelected = prob.id === activeProblem?.id;
          return (
            <button
              key={prob.id}
              type="button"
              onClick={() => setActiveProblemId(prob.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                isSelected ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {idx + 1}
              </span>
              <span>{prob.title}</span>
            </button>
          );
        })}
      </div>

      {/* 3. ACTIVE PROBLEM CARD */}
      {activeProblem && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                  {activeProblem.difficulty}
                </span>
                {activeProblem.attribution && (
                  <span className="text-xs text-indigo-600 font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
                    {activeProblem.attribution}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeProblem.title}
              </h2>
            </div>

            <AddNoteButton
              subject="DBMS"
              topicId={topic?.topicId}
              topicName={topic?.topicName}
              section="Problem Solving"
              questionId={activeProblem.id}
              questionTitle={activeProblem.title}
              size="sm"
            />
          </div>

          {/* Problem Statement */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-xs font-black text-slate-600 uppercase tracking-wide">Problem Statement</span>
            <p className="text-sm text-slate-800 font-medium leading-relaxed">
              {activeProblem.problem}
            </p>
          </div>

          {/* Given Schema & Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProblem.givenSchema && (
              <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 uppercase">
                  <Database size={14} className="text-indigo-600" /> Given Schema
                </div>
                <pre className="p-3 bg-slate-900 text-emerald-300 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre">
                  {activeProblem.givenSchema}
                </pre>
              </div>
            )}

            {activeProblem.required && (
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 uppercase">
                  <Lightbulb size={14} className="text-amber-600" /> What is Required
                </div>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {activeProblem.required}
                </p>
                <div className="pt-2 border-t border-amber-200/60 text-xs text-amber-800">
                  <strong>Core Concept:</strong> {activeProblem.concept}
                </div>
              </div>
            )}
          </div>

          {/* SQL Solution Query */}
          {activeProblem.query && (
            <div className="border border-slate-300 rounded-2xl overflow-hidden bg-slate-900 text-slate-100 shadow-xs">
              <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-1.5">
                  <Code2 size={14} className="text-emerald-400" /> Solution SQL Query
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(activeProblem.id, activeProblem.query)}
                  className="flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
                >
                  {copiedQueryId === activeProblem.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copiedQueryId === activeProblem.id ? 'Copied' : 'Copy SQL'}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">
                {activeProblem.query}
              </pre>
            </div>
          )}

          {/* Query Breakdown (Step-by-step clause explanation) */}
          {activeProblem.queryBreakdown && (
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-indigo-600" /> Step-by-Step Query Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeProblem.queryBreakdown.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[11px] font-mono font-black text-indigo-700 block">
                      {item.clause}
                    </span>
                    <p className="text-xs text-slate-600 font-medium">
                      {item.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explanation */}
          {activeProblem.explanation && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">Explanation & Proof</span>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                {activeProblem.explanation}
              </p>
            </div>
          )}

          {/* Bottom Action to Practice */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Ready to test yourself on query execution and MCQs?</span>
            {onGoToPractice && (
              <button
                type="button"
                onClick={onGoToPractice}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Go to Practice Questions <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
