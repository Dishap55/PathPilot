import React, { useState, useEffect } from 'react';
import {
  Lightbulb,
  Check,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Zap,
  Terminal,
  Activity,
  Network
} from 'lucide-react';
import { getCNProblemExamples } from '../../../data/cn/cnProblemExamplesData.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

/**
 * CNProblemSolvingSection Component
 * Dedicated Problem Solving & Troubleshooting Walkthroughs across all 48 CN Topics.
 * Provides 2-3 deep, realistic production scenarios per topic.
 */
export default function CNProblemSolvingSection({
  topic,
  onGoToPractice
}) {
  const problems = getCNProblemExamples(topic?.topicId);
  const [activeProblemId, setActiveProblemId] = useState(() => problems[0]?.id || 'p-1');

  // Sync active problem when topic changes
  useEffect(() => {
    if (problems.length > 0) {
      setActiveProblemId(problems[0].id);
    }
  }, [topic?.topicId]);

  const activeProblem = problems.find((p) => p.id === activeProblemId) || problems[0];

  return (
    <div
      id="cn-section-problems"
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
              <span className="text-xs text-slate-500 font-medium">Production Scenarios & Diagnostics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Problem Solving & Troubleshooting
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5">
              <Lightbulb size={14} className="text-amber-600" /> {problems.length} Curated Scenarios
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
          Deep-dive into canonical production incidents and technical interview scenarios for <strong>{topic?.topicName}</strong> with systematic layer-by-layer troubleshooting.
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
              <span className="max-w-[240px] truncate">{prob.title}</span>
            </button>
          );
        })}
      </div>

      {/* 3. ACTIVE PROBLEM CARD */}
      {activeProblem && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800">
                  {activeProblem.difficulty || 'Medium'}
                </span>
                {activeProblem.attribution && (
                  <span className="text-xs font-semibold text-slate-500">
                    {activeProblem.attribution}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeProblem.title}
              </h2>
            </div>

            <AddNoteButton
              contextType="cn_problem"
              contextId={activeProblem.id}
              contextTitle={`Problem: ${activeProblem.title}`}
              variant="outline"
              size="sm"
            />
          </div>

          {/* Incident Scenario & Symptom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                <Activity size={14} className="text-blue-600" /> Production Scenario
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {activeProblem.scenario}
              </p>
            </div>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-800">
                <AlertTriangle size={14} className="text-rose-600" /> Observed Symptom / Telemetry
              </div>
              <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                {activeProblem.symptom}
              </p>
            </div>
          </div>

          {/* Core Concept */}
          {activeProblem.coreConcept && (
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1.5">
              <span className="text-xs font-black text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                <Network size={14} className="text-blue-600" /> Relevant Protocol & RFC Architecture
              </span>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {activeProblem.coreConcept}
              </p>
            </div>
          )}

          {/* Diagnostic Analysis Steps */}
          {activeProblem.analysis && activeProblem.analysis.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Terminal size={15} className="text-indigo-600" /> Layered Diagnostic Steps
              </h3>
              <div className="space-y-2">
                {activeProblem.analysis.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Resolution */}
          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-2">
            <span className="text-xs font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" /> Technical Resolution / Root Cause
            </span>
            <p className="text-xs sm:text-sm text-emerald-950 font-semibold leading-relaxed">
              {activeProblem.solution}
            </p>
          </div>

          {/* Common Trap */}
          {activeProblem.commonTrap && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-1.5">
              <span className="text-xs font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-amber-600" /> Interview Trap to Avoid
              </span>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                {activeProblem.commonTrap}
              </p>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
            <button
              type="button"
              onClick={onGoToPractice}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
            >
              <span>Continue to Topic Practice & MCQs</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
