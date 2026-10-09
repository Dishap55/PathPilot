import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Code2,
  FileText,
  Target
} from 'lucide-react';
import { OOPS_COMMON_PATTERNS } from '../../../data/oops/oopsPatternsData.js';
import OOPSVisualDiagram from './OOPSVisualDiagram.jsx';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

/**
 * OOPSCommonPatternsSection Component
 * Visual pattern cards covering common OOPS architectures, recognition triggers,
 * multi-language code snippets, and common anti-patterns.
 */
export default function OOPSCommonPatternsSection({
  selectedLanguage = 'Java',
  topic,
  onGoToPractice,
  onGoToSummary
}) {
  return (
    <div className="space-y-4 select-none animate-fadeIn" id="oops-section-patterns">
      {/* 1. Header Card */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D1C7] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] text-[11px] font-extrabold uppercase tracking-wider">
                Section 4 &bull; Common OOPS Patterns
              </span>
              <span className="text-[#D9D1C7]">&bull;</span>
              <span className="text-xs font-bold text-[#475569]">Design Structures</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
              Essential OOPS Design Patterns
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {onGoToPractice && (
              <button
                type="button"
                id="btn-patterns-goto-practice"
                onClick={onGoToPractice}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#6574C4] hover:bg-[#5361A8] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Practice Challenges</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#334155] font-medium leading-relaxed max-w-3xl">
          Recognize these core structural patterns in placement coding interviews and system design assessments. Learn when to apply each pattern and the common traps to avoid.
        </p>
      </div>

      {/* 2. Patterns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OOPS_COMMON_PATTERNS.map((pattern, idx) => (
          <div
            key={pattern.id}
            id={`oops-pattern-card-${pattern.id}`}
            className="bg-[#FFFDF9] border-2 border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5 flex flex-col justify-between hover:border-[#6574C4]/50 transition-all"
          >
            <div className="space-y-3">
              {/* Pattern Header */}
              <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#E8EFF8] text-[#3E5575] font-black text-xs flex items-center justify-center border border-[#CAD9EA]">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-[#0F172A]">
                    {pattern.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EDE9F6] text-[#45456A] border border-[#D9D2EA]">
                    {pattern.category}
                  </span>
                  <AddNoteButton
                    subject="OOPS"
                    topicId={topic?.topicId || 'classes-and-objects'}
                    topicName={topic?.topicName || 'Class and Object'}
                    section="Common Patterns"
                    questionId={pattern.id}
                    questionTitle={pattern.name}
                    size="sm"
                    variant="subtle"
                  />
                </div>
              </div>

              {/* Explanation */}
              <p className="text-xs sm:text-sm text-[#334155] font-semibold leading-relaxed">
                {pattern.explanation}
              </p>

              {/* Visual Diagram */}
              {pattern.visualType && (
                <div className="pt-0.5">
                  <OOPSVisualDiagram type={pattern.visualType} />
                </div>
              )}

              {/* Multi-Language Code Snippet */}
              <div className="p-3 bg-[#0F172A] rounded-xl text-emerald-300 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
                <pre>{pattern.codeSnippets[selectedLanguage] || pattern.codeSnippets.Java}</pre>
              </div>

              {/* When to Recognize Box */}
              <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#D9D1C7] space-y-1 text-xs">
                <span className="text-[10px] font-extrabold text-[#6574C4] uppercase tracking-wider block flex items-center gap-1">
                  <Lightbulb size={13} /> When to recognize it:
                </span>
                <p className="text-[#334155] font-medium leading-relaxed">
                  {pattern.whenToRecognize}
                </p>
              </div>

              {/* Common Pitfall */}
              <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200/80 space-y-1 text-xs">
                <span className="text-[10px] font-extrabold text-rose-800 uppercase tracking-wider block flex items-center gap-1">
                  <AlertCircle size={13} className="text-rose-600" /> Watch out for this trap:
                </span>
                <p className="text-rose-950 font-medium leading-relaxed">
                  {pattern.commonMistake}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
