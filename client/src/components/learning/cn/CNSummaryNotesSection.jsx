import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Network,
  BookOpen,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { getCNTopicCards } from '../../../data/cn/cnTopicCardsData.js';
import { CN_TOPICS_LIST } from '../../../data/cn/cnTopicDataRegistry.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';
import MyNotesList from '../../notes/MyNotesList.jsx';
import { useNotes } from '../../../hooks/useNotes.js';

/**
 * CNSummaryNotesSection Component
 * Comprehensive Quick Revision, Important Terms & Protocols, Key Comparisons,
 * Shared PathPilot Notes Integration, and Next Topic Navigation.
 */
export default function CNSummaryNotesSection({
  topic,
  onNavigateTopic,
  onGoToRevision
}) {
  const cards = getCNTopicCards(topic?.topicId);
  const card1 = cards[0];
  const card10 = cards[9] || cards[cards.length - 1];
  const card8 = cards[7]; // Traps

  // Connect to the shared PathPilot Notes System
  const { notes, loading, addNote, editNote, deleteNote, refetch } = useNotes({
    subject: 'CN',
    topicId: topic?.topicId
  });

  // Calculate previous and next topic
  const currentIndex = CN_TOPICS_LIST.findIndex((t) => t.topicId === topic?.topicId);
  const prevTopic = currentIndex > 0 ? CN_TOPICS_LIST[currentIndex - 1] : null;
  const nextTopic = currentIndex < CN_TOPICS_LIST.length - 1 ? CN_TOPICS_LIST[currentIndex + 1] : null;

  return (
    <div
      id="cn-section-summary"
      className="space-y-6 max-w-7xl mx-auto px-1 scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      {/* 1. SECTION HEADER BANNER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-wider">
                Section 4
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">Summary & Personal Notes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Topic Summary & My Notes
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-1.5">
              <FileText size={14} /> Quick Revision & Integrated Notes
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
          Review core rules, critical comparisons, and high-yield protocols for <strong>{topic?.topicName}</strong>, and annotate your personal notes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Official Topic Cheat Sheet (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Quick Revision Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" /> Executive Topic Summary
              </h3>
              <span className="text-xs font-bold text-slate-400">Card 10 Revision</span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <strong className="text-blue-900 font-bold uppercase text-[10px] block">
                  Core Concept:
                </strong>
                <p className="text-slate-800">{card1?.inSimpleWords || topic?.summary}</p>
              </div>

              {card10?.cheatSheet?.keyRule && (
                <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-1">
                  <strong className="text-emerald-900 font-bold uppercase text-[10px] block">
                    Golden Rule:
                  </strong>
                  <p className="text-emerald-950 font-bold">{card10.cheatSheet.keyRule}</p>
                </div>
              )}

              {card10?.cheatSheet?.summaryPoints && (
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <strong className="text-slate-700 font-bold uppercase text-[10px] block">
                    High-Yield Placement Takeaways:
                  </strong>
                  <ul className="space-y-1.5 text-slate-700">
                    {card10.cheatSheet.summaryPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {card10?.cheatSheet?.whenToUse && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs">
                  <strong>Architectural Fit:</strong> {card10.cheatSheet.whenToUse}
                </div>
              )}
            </div>
          </div>

          {/* Common Interview Traps */}
          {card8?.traps && card8.traps.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-600" /> Critical Interview Traps
                </h3>
                <span className="text-xs font-bold text-slate-400">Card 8 Traps</span>
              </div>

              <div className="space-y-3">
                {card8.traps.map((tr, tIdx) => (
                  <div key={tIdx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
                    <div className="text-rose-700 font-semibold flex items-center gap-1.5">
                      <span className="font-bold text-[10px] uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">WRONG</span>
                      <span>{tr.wrong}</span>
                    </div>
                    <div className="text-emerald-800 font-semibold flex items-center gap-1.5 pt-1">
                      <span className="font-bold text-[10px] uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">CORRECT</span>
                      <span>{tr.correct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Personal Notes (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <FileText size={16} className="text-blue-600" /> My Notes for {topic?.shortName || topic?.topicName}
              </h3>
              <AddNoteButton
                contextType="cn_topic"
                contextId={topic?.topicId}
                contextTitle={`CN Notes - ${topic?.topicName}`}
                variant="outline"
                size="sm"
                onNoteAdded={refetch}
              />
            </div>

            <MyNotesList
              notes={notes}
              loading={loading}
              onEdit={editNote}
              onDelete={deleteNote}
              emptyMessage={`No personal notes yet for ${topic?.topicName}. Click "+ Note" above to capture key insights!`}
            />
          </div>
        </div>
      </div>

      {/* 4. MASTER REVISION & EXAM PREP CALLOUT BANNER */}
      {onGoToRevision && (
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 border border-blue-500/30">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-[11px] font-black tracking-wider text-blue-300 uppercase">
              <Sparkles size={13} className="text-yellow-400" />
              Next Section: 5. Revision &amp; Exam Prep
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
              End-to-End Data Journey &amp; Comprehensive Exam Revision
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
              Explore interactive sender encapsulation, packet transit through routers, decapsulation, protocol revision cards, 3-way handshake, DNS, DHCP DORA, and interview traps.
            </p>
          </div>
          <button
            type="button"
            onClick={onGoToRevision}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 cursor-pointer shrink-0 hover:scale-[1.02]"
          >
            <span>Proceed to Revision &amp; Exam Prep</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* 5. TOPIC NAVIGATION CONTROLS (Move to Next Topic) */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevTopic ? (
          <button
            type="button"
            onClick={() => onNavigateTopic(prevTopic)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block font-normal">Previous Topic</span>
              <span className="font-bold">{prevTopic.topicName}</span>
            </div>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextTopic ? (
          <button
            type="button"
            onClick={() => onNavigateTopic(nextTopic)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-blue-500/20 hover:scale-[1.02]"
          >
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-blue-200 block font-normal">Move to Next Topic</span>
              <span className="font-bold text-sm">{nextTopic.topicName}</span>
            </div>
            <ArrowRight size={18} />
          </button>
        ) : (
          <div className="px-6 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>🎉 Congratulations! You have completed all 48 Computer Networks Topics!</span>
          </div>
        )}
      </div>
    </div>
  );
}
