import React from 'react';
import {
  FileText,
  Lock,
  Layers,
  Sparkles,
  GitFork,
  Eye,
  CheckCircle2,
  Bookmark,
  Award,
  Zap,
  ShieldCheck,
  Building2,
  Table
} from 'lucide-react';
import { OOPS_OFFICIAL_SUMMARY } from '../../../data/oops/oopsSummaryData.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';
import MyNotesList from '../../notes/MyNotesList.jsx';
import { useNotes } from '../../../hooks/useNotes.js';

/**
 * OOPSSummaryNotesSection Component
 * Dual-Panel Learning Archive:
 * 1. Official Notes (Read-Only Placement Cheat Sheets & Comparison Tables)
 * 2. My Notes (Personal Student Notes for OOPS)
 */
export default function OOPSSummaryNotesSection({
  topic
}) {
  const topicId = topic?.topicId || 'classes-and-objects';
  const topicName = topic?.topicName || 'Class and Object';

  const {
    notes,
    loading: notesLoading,
    error: notesError,
    addNote,
    updateNote,
    deleteNote
  } = useNotes({
    subject: 'OOPS',
    topicId
  });

  return (
    <div className="space-y-5 select-none animate-fadeIn" id="oops-section-summary">
      {/* ------------------------------------------------------------- */}
      {/* 1. SECTION HEADER BANNER                                      */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D1C7] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] text-[11px] font-extrabold uppercase tracking-wider">
                Section 5 &bull; Summary &amp; Notes
              </span>
              <span className="text-[#D9D1C7]">&bull;</span>
              <span className="text-xs font-bold text-[#475569]">{topicName}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
              Official Revision Cheat Sheet &amp; My Notes
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <AddNoteButton
              subject="OOPS"
              topicId={topicId}
              topicName={topicName}
              section="Summary & Notes"
              onNoteSaved={addNote}
              size="md"
            />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#334155] font-medium leading-relaxed max-w-3xl">
          Review official placement summary tables, pillar matrices, and keyword rules below. Add your personal reflections and reminders to <strong>My Notes</strong>.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. OFFICIAL NOTES AREA (PATHPILOT PROVIDED, READ-ONLY)         */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4">
        {/* A. 4 Pillars Comparison Matrix */}
        <div className="bg-[#FFFDF9] border-2 border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏛️</span>
              <h3 className="text-base font-black text-[#0F172A]">
                The 4 Pillars of Object-Oriented Programming
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]">
              Official Notes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OOPS_OFFICIAL_SUMMARY.fourPillars.map((p, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#F8F5EE] border border-[#D9D1C7] space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#6574C4] text-sm">{p.pillar}</span>
                  <span className="text-[10px] font-bold text-[#475569]">{p.tagline}</span>
                </div>
                <p className="text-[#0F172A] font-semibold leading-relaxed">{p.rule}</p>
                <div className="p-2 bg-white rounded-lg border border-[#E2D9CC] text-[#334155] font-medium text-[11px]">
                  <strong>Example:</strong> {p.example}
                </div>
                <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                  <span>{p.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B. Overloading vs Overriding Comparison Table */}
        <div className="bg-[#FFFDF9] border-2 border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-2.5">
            <div className="flex items-center gap-2">
              <Table size={16} className="text-[#6574C4]" />
              <h3 className="text-base font-black text-[#0F172A]">
                {OOPS_OFFICIAL_SUMMARY.overloadingVsOverriding.title}
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
              High Priority Interview Table
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F5EE] border-b border-[#D9D1C7] text-[#0F172A] font-black">
                  <th className="p-2.5">Feature</th>
                  <th className="p-2.5">Method Overloading</th>
                  <th className="p-2.5">Method Overriding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D9CC]">
                {OOPS_OFFICIAL_SUMMARY.overloadingVsOverriding.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F5EE]/50 transition-colors">
                    <td className="p-2.5 font-bold text-[#6574C4] whitespace-nowrap">{row.feature}</td>
                    <td className="p-2.5 text-[#334155] font-medium">{row.overloading}</td>
                    <td className="p-2.5 text-[#334155] font-medium">{row.overriding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* C. Abstract Class vs Interface Comparison Table */}
        <div className="bg-[#FFFDF9] border-2 border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-2.5">
            <div className="flex items-center gap-2">
              <Table size={16} className="text-[#6574C4]" />
              <h3 className="text-base font-black text-[#0F172A]">
                {OOPS_OFFICIAL_SUMMARY.abstractClassVsInterface.title}
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-200">
              Contract Design
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F5EE] border-b border-[#D9D1C7] text-[#0F172A] font-black">
                  <th className="p-2.5">Feature</th>
                  <th className="p-2.5">Abstract Class</th>
                  <th className="p-2.5">Interface</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D9CC]">
                {OOPS_OFFICIAL_SUMMARY.abstractClassVsInterface.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F5EE]/50 transition-colors">
                    <td className="p-2.5 font-bold text-[#6574C4] whitespace-nowrap">{row.feature}</td>
                    <td className="p-2.5 text-[#334155] font-medium">{row.abstractClass}</td>
                    <td className="p-2.5 text-[#334155] font-medium">{row.interface_}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* D. Keyword Cheat Sheet */}
        <div className="bg-[#FFFDF9] border-2 border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#6574C4]" />
              <h3 className="text-base font-black text-[#0F172A]">
                Key OOPS Keywords &amp; Modifiers Cheat Sheet
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {OOPS_OFFICIAL_SUMMARY.keywordsCheatSheet.map((kw, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#F8F5EE] rounded-xl border border-[#D9D1C7] space-y-1 text-xs"
              >
                <span className="font-mono text-xs font-black text-[#6574C4] block">
                  {kw.keyword}
                </span>
                <p className="text-[#0F172A] font-semibold">{kw.meaning}</p>
                <p className="text-[11px] text-[#475569]">{kw.usage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. MY NOTES AREA (STUDENT PERSONAL REUSABLE NOTES)             */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#D9D1C7] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="text-base font-black text-[#0F172A]">
                My Personal Notes for OOPS
              </h3>
              <p className="text-xs text-[#475569]">
                Review, edit, or delete notes you saved across all OOPS topics.
              </p>
            </div>
          </div>

          <AddNoteButton
            subject="OOPS"
            topicId={topicId}
            topicName={topicName}
            section="Summary & Notes"
            onNoteSaved={addNote}
            size="md"
          />
        </div>

        <MyNotesList
          notes={notes}
          loading={notesLoading}
          error={notesError}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
          topicName={topicName}
          subject="OOPS"
        />
      </div>
    </div>
  );
}
