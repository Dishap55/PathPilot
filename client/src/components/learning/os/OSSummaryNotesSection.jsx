import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  Calculator,
  ListOrdered
} from 'lucide-react';
import { getOSTopicSummary } from '../../../data/os/osSummaryNotesData';
import { getOSTopic } from '../../../data/os/osTopicDataRegistry';
import AddNoteButton from '../../notes/AddNoteButton';

export default function OSSummaryNotesSection({
  topic,
  onSelectTopic,
  allTopics = [],
  onGoToExamPrep
}) {
  const currentTopicId = topic?.id || topic?.slug || 'intro-to-os';
  const topicMeta = getOSTopic(currentTopicId);
  const summary = getOSTopicSummary(currentTopicId);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* ------------------------------------------------------------- */}
      {/* 1. SECTION BANNER & NOTE CAPTURE                              */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-4 sm:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D9CC] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4]">
                SECTION 4 &bull; SUMMARY &amp; REVISION NOTES
              </span>
              <span className="text-[#CBD5E1]">&bull;</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200">
                {topicMeta?.domainName || 'Operating Systems'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-0.5 flex items-center gap-2">
              <FileText size={22} className="text-[#6574C4]" />
              {topicMeta?.topicName || topic?.title} Summary Sheet
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <AddNoteButton
              subject="OS"
              topicId={currentTopicId}
              topicName={topicMeta?.topicName || topic?.title}
              section="summary"
              size="md"
              variant="default"
            />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
          High-yield summary checklist, essential formulas, algorithm execution steps, and common placement traps for rapid last-minute revision.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. CORE DEFINITION & KEY RULE                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Definition */}
        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F172A]">
            <BookOpen size={16} className="text-[#6574C4]" />
            <span>Core Technical Definition</span>
          </div>
          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
            {summary.definition}
          </p>
        </div>

        {/* Key Invariant Rule */}
        <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-950">
            <Sparkles size={16} className="text-[#6574C4]" />
            <span>Core Golden Rule &amp; Invariant</span>
          </div>
          <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed font-bold">
            {summary.keyRule || 'Maintain system state invariants across all execution paths.'}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. KEY POINTS CHECKLIST & FORMULAS                            */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Key Points */}
        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F172A] border-b border-[#E2D9CC] pb-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>High-Yield Revision Points</span>
          </div>
          <ul className="space-y-2">
            {summary.keyPoints?.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1E293B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6574C4] mt-1.5 shrink-0" />
                <span className="leading-relaxed font-medium">{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulas / Invariants */}
        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F172A] border-b border-[#E2D9CC] pb-2">
            <Calculator size={16} className="text-[#6574C4]" />
            <span>Essential Formulas &amp; Calculations</span>
          </div>
          {summary.formulas && summary.formulas.length > 0 ? (
            <div className="space-y-2">
              {summary.formulas.map((form, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto"
                >
                  {form}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#475569] italic">
              Conceptual topic: Focus on state transitions and hardware-software contracts.
            </p>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. ALGORITHM STEPS & COMMON TRAPS                             */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Algorithm Steps */}
        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F172A] border-b border-[#E2D9CC] pb-2">
            <ListOrdered size={16} className="text-[#6574C4]" />
            <span>Algorithm / Execution Flow</span>
          </div>
          {summary.algorithmSteps && summary.algorithmSteps.length > 0 ? (
            <div className="space-y-2">
              {summary.algorithmSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] text-xs text-[#1E293B] flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-[#EDE9F6] text-[#6574C4] text-[10px] font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{step}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#475569] italic">
              Follows standard kernel state transition lifecycle.
            </p>
          )}
        </div>

        {/* Common Traps */}
        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-900 border-b border-[#E2D9CC] pb-2">
            <AlertTriangle size={16} className="text-rose-600" />
            <span>Placement Traps &amp; Common Mistakes</span>
          </div>
          {summary.commonTraps && summary.commonTraps.length > 0 ? (
            <div className="space-y-2">
              {summary.commonTraps.map((trap, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 leading-relaxed font-medium"
                >
                  {trap}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#475569] italic">
              Review negative test cases and boundary conditions.
            </p>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. FOOTER NAVIGATION                                          */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-4 flex items-center justify-between shadow-xs">
        <span className="text-xs text-[#475569] font-medium">
          Ready for comprehensive placement exam preparation?
        </span>
        {onGoToExamPrep && (
          <button
            type="button"
            onClick={onGoToExamPrep}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#6574C4] text-white hover:bg-[#5260AE] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Go to Revision &amp; Exam Prep</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
}
