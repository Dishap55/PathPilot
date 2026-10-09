import React from 'react';
import {
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Layers,
  ArrowRight,
  X
} from 'lucide-react';
import { getOSTopicExamples } from '../../../data/os/osProblemExamplesData.js';
import { getOSTopic } from '../../../data/os/osTopicDataRegistry.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

// Set of canonical topic IDs that have dedicated 12-stage interactive numerical derivations
const NUMERICAL_TOPIC_IDS = new Set([
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

export default function OSProblemExampleModal({
  modalTopicId,
  modalExampleIndex = 0,
  onClose,
  onSelectExampleIndex,
  onGoToNumericals
}) {
  if (!modalTopicId) return null;

  const modalTopicMeta = getOSTopic(modalTopicId);
  const modalExamples = getOSTopicExamples(modalTopicId) || [];
  const activeEx = modalExamples[modalExampleIndex] || modalExamples[0];
  const isModalTopicNumerical = NUMERICAL_TOPIC_IDS.has(modalTopicId);

  if (!activeEx) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-example-title"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-7 md:p-8 space-y-5 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b border-[#E2D9CC] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4] bg-[#EDE9F6] px-2.5 py-0.5 rounded-full border border-indigo-200">
                Topic {modalTopicMeta?.order || ''} &bull; {modalTopicMeta?.domainName || 'Operating Systems'}
              </span>
              {isModalTopicNumerical && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-200">
                  Numerical Derivation Available
                </span>
              )}
            </div>
            <h3 id="modal-example-title" className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
              {modalTopicMeta?.topicName || modalTopicId} Worked Example
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {isModalTopicNumerical && onGoToNumericals && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoToNumericals();
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-violet-50 text-violet-900 border border-violet-200 hover:bg-violet-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Cpu size={13} className="text-[#6574C4]" />
                <span className="hidden sm:inline">Numerical Lab</span>
              </button>
            )}
            <button
              type="button"
              id="btn-close-example-modal"
              onClick={onClose}
              className="p-2 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#F8F4EE] border border-[#D9D1C7] transition-colors cursor-pointer"
              title="Close modal (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Example Selection Tabs */}
        {modalExamples.length > 1 && (
          <div className="flex items-center gap-2 pb-1 border-b border-[#F1ECE5]">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
              Select Example:
            </span>
            <div className="flex items-center gap-1.5">
              {modalExamples.map((ex, idx) => {
                const isActive = modalExampleIndex === idx;
                return (
                  <button
                    key={ex.id || idx}
                    type="button"
                    id={`btn-modal-example-tab-${idx}`}
                    onClick={() => onSelectExampleIndex && onSelectExampleIndex(idx)}
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

        {/* Example Subheader */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-extrabold text-[#6574C4] bg-[#EDE9F6] px-2.5 py-0.5 rounded-full border border-indigo-200">
            Example {modalExampleIndex + 1} of {modalExamples.length}: {activeEx.title}
          </span>
          <AddNoteButton
            subject="OS"
            topicId={modalTopicId}
            topicName={modalTopicMeta?.topicName || modalTopicId}
            section="examples"
            size="sm"
            variant="subtle"
          />
        </div>

        {/* 1. Problem Statement */}
        <div className="p-4 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0F172A]">
            <HelpCircle size={15} className="text-[#6574C4]" />
            <span>Problem Statement</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#1E293B] leading-relaxed">
            {activeEx.problem}
          </p>
        </div>

        {/* 2. Given Data */}
        {activeEx.given && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-1">
            <span className="font-extrabold text-[#334155] uppercase tracking-wider text-[10px] block">
              Given Data &amp; System Constraints
            </span>
            <p className="font-mono text-slate-800 text-[11px] leading-relaxed font-semibold">
              {activeEx.given}
            </p>
          </div>
        )}

        {/* 3. Visual Flowchart */}
        {activeEx.flowchart && activeEx.flowchart.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Layers size={13} className="text-[#6574C4]" />
              Execution Flowchart Sequence:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {activeEx.flowchart.map((node, nIdx) => (
                <React.Fragment key={nIdx}>
                  <div className="px-3 py-2 rounded-xl bg-[#EDE9F6] text-[#6574C4] border border-indigo-200 text-xs font-bold whitespace-nowrap shadow-2xs">
                    {node}
                  </div>
                  {nIdx < activeEx.flowchart.length - 1 && (
                    <ArrowRight size={14} className="text-[#94A3B8] shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* 4. Step-by-Step Breakdown */}
        {activeEx.steps && activeEx.steps.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Step-by-Step Breakdown:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {activeEx.steps.map((st) => (
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
            {activeEx.answer}
          </p>
        </div>

        {/* 6. Quick Placement Explanation */}
        {activeEx.quickExplanation && (
          <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs space-y-1">
            <span className="font-extrabold text-indigo-900 uppercase tracking-wider text-[10px] block">
              Placement Takeaway:
            </span>
            <p className="text-indigo-950 font-medium leading-relaxed">
              {activeEx.quickExplanation}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-[#E2D9CC] flex items-center justify-between gap-3 flex-wrap">
          <span className="text-[11px] font-medium text-[#64748B]">
            Press <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 border border-slate-300 rounded-sm">Esc</kbd> or click outside to dismiss
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#6574C4] text-white hover:bg-[#5260AE] transition-colors cursor-pointer shadow-xs"
          >
            Close Example
          </button>
        </div>
      </div>
    </div>
  );
}
