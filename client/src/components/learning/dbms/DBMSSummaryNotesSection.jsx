import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Code2,
  Database,
  BookOpen
} from 'lucide-react';
import { getDBMSTopicCards } from '../../../data/dbms/dbmsTopicCardsData.js';
import { DBMS_TOPICS_LIST } from '../../../data/dbms/dbmsTopicDataRegistry.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';
import MyNotesList from '../../notes/MyNotesList.jsx';
import { useNotes } from '../../../hooks/useNotes.js';

/**
 * DBMSSummaryNotesSection Component
 * Comprehensive Summary, Cheat Sheet, and Integrated Personal Notes.
 */
export default function DBMSSummaryNotesSection({
  topic,
  onNavigateTopic
}) {
  const cards = getDBMSTopicCards(topic?.topicId);
  const card10 = cards[9] || cards[cards.length - 1];
  const card7 = cards[6]; // Working SQL example
  const card8 = cards[7]; // Common traps

  // Connect to the shared PathPilot Notes System
  const { notes, loading, addNote, editNote, deleteNote, refetch } = useNotes({
    subject: 'DBMS',
    topicId: topic?.topicId
  });

  // Calculate previous and next topic
  const currentIndex = DBMS_TOPICS_LIST.findIndex((t) => t.topicId === topic?.topicId);
  const prevTopic = currentIndex > 0 ? DBMS_TOPICS_LIST[currentIndex - 1] : null;
  const nextTopic = currentIndex < DBMS_TOPICS_LIST.length - 1 ? DBMS_TOPICS_LIST[currentIndex + 1] : null;

  return (
    <div
      id="dbms-section-summary"
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
              <span className="text-xs text-slate-500 font-medium">Summary & Notes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Topic Summary & My Notes
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-1.5">
              <FileText size={14} /> Official Cheat Sheet & Personal Notes
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
          Review core rules, critical comparisons, and high-value SQL patterns for <strong>{topic?.topicName}</strong>, and annotate your personal notes.
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
                <strong className="text-indigo-900 font-bold uppercase text-[10px] block">
                  Core Concept:
                </strong>
                <p className="text-slate-800">{card10?.cheatSheet?.definition || topic?.description}</p>
              </div>

              <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-1">
                <strong className="text-emerald-900 font-bold uppercase text-[10px] block">
                  Golden Rule:
                </strong>
                <p className="text-emerald-950 font-medium">{card10?.cheatSheet?.keyRule || 'Maintain strict relational invariants.'}</p>
              </div>

              {card10?.cheatSheet?.comparison && (
                <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1">
                  <strong className="text-amber-900 font-bold uppercase text-[10px] block">
                    Key Architectural Comparison:
                  </strong>
                  <p className="text-amber-950 font-medium">{card10.cheatSheet.comparison}</p>
                </div>
              )}

              {card10?.cheatSheet?.interviewKeyword && (
                <div className="p-3.5 bg-purple-50/80 rounded-2xl border border-purple-200 space-y-1">
                  <strong className="text-purple-900 font-bold uppercase text-[10px] block">
                    Placement Keywords:
                  </strong>
                  <p className="text-purple-950 font-bold">{card10.cheatSheet.interviewKeyword}</p>
                </div>
              )}
            </div>
          </div>

          {/* Important SQL Patterns */}
          {card7?.query && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                <Code2 size={16} className="text-indigo-600" /> Canonical Working Query
              </h3>
              <pre className="p-3.5 bg-slate-900 text-emerald-300 rounded-2xl text-xs font-mono overflow-x-auto whitespace-pre leading-relaxed">
                {card7.query}
              </pre>
            </div>
          )}

          {/* Common Pitfalls & Traps */}
          {card8?.traps && card8.traps.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-black text-red-800 uppercase tracking-wide flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-600" /> Watch Out: Common Traps
              </h3>
              <div className="space-y-2">
                {card8.traps.map((tr, idx) => (
                  <div key={idx} className="p-3 bg-red-50/60 border border-red-200 rounded-2xl text-xs space-y-1">
                    <span className="font-black text-red-900 block text-[11px]">⚠️ {tr.wrong}</span>
                    <span className="text-slate-700 block"><strong>Why:</strong> {tr.why}</span>
                    <span className="text-emerald-800 block font-bold"><strong>Fix:</strong> {tr.correct}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Personal Notes (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-indigo-600" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wide">
                  My Personal Notes
                </h3>
              </div>
              <AddNoteButton
                subject="DBMS"
                topicId={topic?.topicId}
                topicName={topic?.topicName}
                section="Summary"
                onNoteSaved={refetch}
                size="sm"
              />
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Save key insights, personal explanations, and reminders for this topic. Notes are saved to your account.
            </p>

            <MyNotesList
              notes={notes}
              loading={loading}
              onEdit={editNote}
              onDelete={deleteNote}
            />
          </div>
        </div>
      </div>

      {/* 2. MOVE TO NEXT TOPIC FOOTER */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 block uppercase">Curriculum Navigation</span>
          <span className="text-sm font-black text-slate-900">
            {currentIndex + 1} of {DBMS_TOPICS_LIST.length}: {topic?.topicName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {prevTopic && (
            <button
              type="button"
              id="dbms-prev-topic-btn"
              onClick={() => onNavigateTopic && onNavigateTopic(prevTopic.topicId)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} /> Previous: {prevTopic.shortName || prevTopic.topicName}
            </button>
          )}

          {nextTopic ? (
            <button
              type="button"
              id="dbms-next-topic-btn"
              onClick={() => onNavigateTopic && onNavigateTopic(nextTopic.topicId)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              Move to Next Topic: {nextTopic.shortName || nextTopic.topicName} <ArrowRight size={15} />
            </button>
          ) : (
            <span className="px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200">
              🎉 All DBMS Topics Completed!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
