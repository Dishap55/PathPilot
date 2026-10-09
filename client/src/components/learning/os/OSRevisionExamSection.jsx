import React, { useState } from 'react';
import {
  GraduationCap,
  Calculator,
  Table as TableIcon,
  Layers,
  AlertTriangle,
  ChevronRight,
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  OS_REVISION_FORMULAS,
  OS_REVISION_COMPARISONS,
  OS_REVISION_FLOWCHARTS,
  OS_REVISION_TRAPS
} from '../../../data/os/osRevisionExamData';
import AddNoteButton from '../../notes/AddNoteButton';

export default function OSRevisionExamSection({
  topic,
  onSelectTopic,
  onGoToIntroduction
}) {
  const [activeTab, setActiveTab] = useState('formulas'); // 'formulas' | 'comparisons' | 'flowcharts' | 'traps'

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* ------------------------------------------------------------- */}
      {/* 1. MASTER EXAM PREP BANNER                                    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-4 sm:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D9CC] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4]">
                SECTION 5 &bull; REVISION &amp; PLACEMENT EXAM PREP
              </span>
              <span className="text-[#CBD5E1]">&bull;</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200">
                Master OS Syllabus
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-0.5 flex items-center gap-2">
              <GraduationCap size={22} className="text-[#6574C4]" />
              Operating Systems Final Placement Prep
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <AddNoteButton
              subject="OS"
              topicId="exam-prep"
              topicName="OS Revision & Exam Prep"
              section="revision"
              size="md"
              variant="default"
            />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
          The ultimate master review kit: categorized numerical formulas, high-yield architectural comparison tables, full-system execution flowcharts, and top 12 placement interview traps.
        </p>

        {/* 4 Revision Sub-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('formulas')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'formulas'
                ? 'bg-[#6574C4] text-white shadow-2xs'
                : 'bg-[#F8F4EE] text-[#475569] hover:bg-[#EDE9F6] border border-[#D9D1C7]'
            }`}
          >
            <Calculator size={14} />
            <span>Formula Sheet</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comparisons')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'comparisons'
                ? 'bg-[#6574C4] text-white shadow-2xs'
                : 'bg-[#F8F4EE] text-[#475569] hover:bg-[#EDE9F6] border border-[#D9D1C7]'
            }`}
          >
            <TableIcon size={14} />
            <span>Comparison Tables</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('flowcharts')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'flowcharts'
                ? 'bg-[#6574C4] text-white shadow-2xs'
                : 'bg-[#F8F4EE] text-[#475569] hover:bg-[#EDE9F6] border border-[#D9D1C7]'
            }`}
          >
            <Layers size={14} />
            <span>Master Flowcharts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('traps')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'traps'
                ? 'bg-[#6574C4] text-white shadow-2xs'
                : 'bg-[#F8F4EE] text-[#475569] hover:bg-[#EDE9F6] border border-[#D9D1C7]'
            }`}
          >
            <AlertTriangle size={14} />
            <span>Top Placement Traps</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SUB-TAB 1: MASTER FORMULA SHEET                            */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'formulas' && (
        <div className="space-y-4">
          {OS_REVISION_FORMULAS.map((cat, cIdx) => (
            <div
              key={cIdx}
              className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-3"
            >
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-2 border-b border-[#E2D9CC] pb-2">
                <Calculator size={16} className="text-[#6574C4]" />
                <span>{cat.category}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.formulas.map((form, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3.5 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] space-y-1.5"
                  >
                    <span className="text-xs font-extrabold text-[#0F172A] block">
                      {form.name}
                    </span>
                    <div className="font-mono text-xs bg-slate-900 text-emerald-400 p-2.5 rounded-lg overflow-x-auto font-bold">
                      {form.formula}
                    </div>
                    {form.notes && (
                      <p className="text-[11px] text-[#475569] font-medium leading-relaxed">
                        {form.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. SUB-TAB 2: HIGH-YIELD COMPARISON TABLES                    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'comparisons' && (
        <div className="space-y-4">
          {OS_REVISION_COMPARISONS.map((comp, cIdx) => (
            <div
              key={cIdx}
              className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-3"
            >
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-2 border-b border-[#E2D9CC] pb-2">
                <TableIcon size={16} className="text-[#6574C4]" />
                <span>{comp.title}</span>
              </h3>

              <div className="overflow-x-auto rounded-xl border border-[#D9D1C7]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EDE9F6] text-[#0F172A] font-black uppercase tracking-wider text-[11px] border-b border-[#D9D1C7]">
                    <tr>
                      {comp.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2D9CC] bg-[#FFFDF9]">
                    {comp.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#F8F4EE] transition-colors">
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`p-3 leading-relaxed ${
                              cellIdx === 0
                                ? 'font-extrabold text-[#0F172A]'
                                : 'text-[#334155] font-medium'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. SUB-TAB 3: MASTER SYSTEM FLOWCHARTS                        */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'flowcharts' && (
        <div className="space-y-4">
          {OS_REVISION_FLOWCHARTS.map((flow, fIdx) => (
            <div
              key={fIdx}
              className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-3"
            >
              <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-2 border-b border-[#E2D9CC] pb-2">
                <Layers size={16} className="text-[#6574C4]" />
                <span>{flow.title}</span>
              </h3>

              <div className="p-4 rounded-xl bg-[#F4EFE8] border border-[#D9D1C7] overflow-x-auto">
                <div className="flex items-center gap-2 min-w-max py-1">
                  {flow.nodes.map((node, nIdx) => (
                    <React.Fragment key={nIdx}>
                      <div className="px-3 py-1.5 rounded-lg bg-[#FFFDF9] border border-[#D9D1C7] text-xs font-extrabold text-[#0F172A] shadow-2xs flex items-center gap-1.5 whitespace-nowrap">
                        <span className="w-5 h-5 rounded-full bg-[#EDE9F6] text-[#6574C4] text-[10px] font-black flex items-center justify-center shrink-0">
                          {nIdx + 1}
                        </span>
                        <span>{node}</span>
                      </div>
                      {nIdx < flow.nodes.length - 1 && (
                        <div className="flex items-center text-[#94A3B8]">
                          <ChevronRight size={16} className="text-[#6574C4]" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed font-medium">
                {flow.summary}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. SUB-TAB 4: TOP 12 PLACEMENT TRAPS                          */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'traps' && (
        <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-[#E2D9CC] pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-rose-950 flex items-center gap-2">
              <AlertTriangle size={18} className="text-rose-600" />
              <span>Top 12 High-Frequency Placement &amp; Interview Traps</span>
            </h3>
            <p className="text-xs text-[#475569] mt-1 leading-relaxed">
              These are the exact counter-intuitive edge cases tested by top tech companies and academic gate examiners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {OS_REVISION_TRAPS.map((trap, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 leading-relaxed font-medium flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{trap}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. BOTTOM NAVIGATION                                          */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-4 flex items-center justify-between shadow-xs">
        <span className="text-xs text-[#475569] font-medium">
          Revision complete? Revisit any specific 10-card theory topic:
        </span>
        {onGoToIntroduction && (
          <button
            type="button"
            onClick={onGoToIntroduction}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#6574C4] text-white hover:bg-[#5260AE] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Back to 10-Card Theory</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
}
