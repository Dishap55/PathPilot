import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Layers,
  Lightbulb,
  Zap,
  AlertTriangle,
  FileText,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useNotes } from '../../hooks/useNotes';
import MyNotesList from './MyNotesList';
import AddNoteButton from './AddNoteButton';
import AddNoteModal from './AddNoteModal';

/**
 * SummaryAndNotes Component
 * Master unified layout implementing strict separation between:
 * 1. 📚 Official PathPilot Notes (read-only, curated curriculum content)
 * 2. 📝 My Notes (personal student notes with Add, Edit, Delete)
 */
export default function SummaryAndNotes({
  subject = 'DSA',
  topicId = 'general',
  topicName = 'Topic',
  officialNotes = {},
  renderCustomOfficialContent = null,
  className = ''
}) {
  const { notes, loading, error, addNote, updateNote, deleteNote } = useNotes({
    subject,
    topicId
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNote = async (content) => {
    await addNote({
      content,
      topicName,
      section: 'Summary & Notes'
    });
  };

  return (
    <div className={`space-y-8 select-none ${className}`}>
      {/* ------------------------------------------------------------- */}
      {/* SECTION HEADER                                                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold uppercase tracking-wider">
            Revision &amp; Notes
          </span>
          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {topicName}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Summary &amp; Notes
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
          Review official PathPilot core concepts and access your personal practice notes.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PART 1: 📚 OFFICIAL NOTES (PATHPILOT CURRICULUM — READ-ONLY)   */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4" aria-labelledby="official-notes-heading">
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
              📚
            </div>
            <div>
              <h3
                id="official-notes-heading"
                className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2"
              >
                Official Notes
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  Curated Content
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official PathPilot formulas, rules, key concepts, and common mistakes.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Official Guide</span>
          </div>
        </div>

        {/* Custom Official Content If Provided (e.g. Existing DSA visual cards) */}
        {renderCustomOfficialContent ? (
          renderCustomOfficialContent
        ) : (
          <div className="space-y-4">
            {/* 1. KEY TAKEAWAYS */}
            {officialNotes.takeawayTitle && (
              <div className="bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-white dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-2xs">
                    <Sparkles size={15} />
                  </div>
                  <span className="text-xs font-extrabold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                    Core Concept
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  {officialNotes.takeawayTitle}
                </h4>
                {officialNotes.takeawayText && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {officialNotes.takeawayText}
                  </p>
                )}
              </div>
            )}

            {/* 2. FORMULAS & SHORTCUTS (IF PRESENT) */}
            {((officialNotes.formulas && officialNotes.formulas.length > 0) ||
              (officialNotes.shortcuts && officialNotes.shortcuts.length > 0)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {officialNotes.formulas && officialNotes.formulas.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                      <div className="p-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                        <BookOpen size={15} />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                        Essential Formulas
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {officialNotes.formulas.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/70 dark:border-slate-800 font-mono text-xs text-indigo-900 dark:text-indigo-300 space-y-1"
                        >
                          <div className="font-bold">
                            {typeof item === 'string' ? item : item.formula || item.name}
                          </div>
                          {typeof item === 'object' && item.when && (
                            <div className="text-[10px] font-sans text-slate-500 font-normal">
                              Usage: {item.when}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {officialNotes.shortcuts && officialNotes.shortcuts.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                      <div className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                        <Zap size={15} />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                        Speed Shortcuts &amp; Tricks
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {officialNotes.shortcuts.map((sc, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200"
                        >
                          <span className="font-bold block">
                            {typeof sc === 'string' ? sc : sc.pct || sc.rule || sc.action}
                          </span>
                          {typeof sc === 'object' && sc.ex && (
                            <span className="text-[10px] opacity-80 block mt-0.5">
                              Ex: {sc.ex}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. COMMON MISTAKES & TRAPS */}
            {officialNotes.commonMistakes && officialNotes.commonMistakes.length > 0 && (
              <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/80 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-amber-500 text-white shadow-2xs">
                    <AlertTriangle size={15} />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-200">
                    Common Mistakes &amp; Traps to Avoid
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {officialNotes.commonMistakes.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-amber-200/80 dark:border-amber-900/60 text-xs space-y-1.5"
                    >
                      {m.trap && (
                        <div className="font-bold text-amber-900 dark:text-amber-300">
                          {m.trap}
                        </div>
                      )}
                      <div className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                        {m.wrong}
                      </div>
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                        {m.correct}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. EDGE CASES */}
            {officialNotes.edgeCases && officialNotes.edgeCases.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="p-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                    <Lightbulb size={15} />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                    Edge Cases &amp; Invariants
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {officialNotes.edgeCases.map((ec, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                    >
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">
                        {ec.title || (typeof ec === 'string' ? ec : '')}
                      </span>
                      {ec.text && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                          {ec.text}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* PART 2: 📝 MY NOTES (STUDENT-CREATED PERSONAL NOTES)          */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4 pt-2" aria-labelledby="my-notes-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
              📝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="my-notes-heading"
                  className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight"
                >
                  My Notes
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {notes.length} {notes.length === 1 ? 'Personal Note' : 'Personal Notes'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Notes created by you while practicing {topicName}.
              </p>
            </div>
          </div>

          <AddNoteButton
            onClick={() => setIsModalOpen(true)}
            size="sm"
            variant="default"
            topicName={topicName}
            subject={subject}
          />
        </div>

        {/* Personal Notes List with Edit and Delete */}
        <MyNotesList
          notes={notes}
          loading={loading}
          error={error}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
          topicName={topicName}
          subject={subject}
        />
      </section>

      {/* Add Modal */}
      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateNote}
        topicName={topicName}
        subject={subject}
      />
    </div>
  );
}
