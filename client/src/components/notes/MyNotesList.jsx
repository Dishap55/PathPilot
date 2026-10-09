import React, { useState } from 'react';
import { Edit2, Trash2, Clock, Check, AlertCircle, Loader2 } from 'lucide-react';
import AddNoteModal from './AddNoteModal';

/**
 * Format timestamp nicely (e.g. "Just now", "2 hours ago", or "Oct 4, 2026")
 */
function formatNoteTime(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  } catch (e) {
    return '';
  }
}

/**
 * MyNotesList Component
 * Renders personal notes created by the student with [Edit] and [Delete] capabilities.
 */
export default function MyNotesList({
  notes = [],
  loading = false,
  error = null,
  onUpdateNote,
  onDeleteNote,
  topicName = '',
  subject = ''
}) {
  const [editingNote, setEditingNote] = useState(null);
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditSave = async (updatedContent) => {
    if (!editingNote || !onUpdateNote) return;
    await onUpdateNote(editingNote.id, updatedContent);
    setEditingNote(null);
  };

  const confirmDelete = async () => {
    if (!deletingNoteId || !onDeleteNote) return;
    setIsDeleting(true);
    try {
      await onDeleteNote(deletingNoteId);
      setDeletingNoteId(null);
    } catch (err) {
      console.error('[MyNotesList] Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center space-y-2 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
        <Loader2 size={24} className="animate-spin text-indigo-600 dark:text-indigo-400 mx-auto" />
        <p className="text-xs text-slate-500 font-medium">Loading your notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
        <AlertCircle size={16} className="shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="p-8 text-center space-y-2 bg-slate-50/50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
        <span className="text-2xl block mb-1">📝</span>
        <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          No personal notes yet.
        </h5>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Create a note while practicing and it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div
          key={note.id}
          id={`my-note-${note.id}`}
          className="p-4 sm:p-4.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xs hover:shadow-xs transition-all space-y-2.5 group"
        >
          {/* Note Top Bar: Context Tag & Timestamp */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200/60 dark:border-indigo-800/60">
                {note.subject || subject || 'DSA'}
              </span>
              {note.question_title && (
                <span className="truncate max-w-[200px] sm:max-w-xs text-slate-600 dark:text-slate-400 font-medium">
                  • {note.question_title}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0 font-medium text-[10px]">
              <Clock size={11} className="text-slate-400" />
              <span>{formatNoteTime(note.created_at)}</span>
            </div>
          </div>

          {/* Note Content */}
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium whitespace-pre-wrap select-text">
            {note.content}
          </p>

          {/* Bottom Action Bar: Edit & Delete Buttons */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => setEditingNote(note)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Edit this note"
              aria-label="Edit note"
            >
              <Edit2 size={12} />
              <span>Edit</span>
            </button>

            <button
              onClick={() => setDeletingNoteId(note.id)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Delete this note"
              aria-label="Delete note"
            >
              <Trash2 size={12} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editingNote && (
        <AddNoteModal
          isOpen={true}
          isEditing={true}
          initialContent={editingNote.content}
          topicName={editingNote.topic_name || topicName}
          questionTitle={editingNote.question_title}
          subject={editingNote.subject || subject}
          onClose={() => setEditingNote(null)}
          onSave={handleEditSave}
        />
      )}

      {/* Delete Confirmation Modal / Dialog */}
      {deletingNoteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn"
          role="alertdialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 animate-scaleIn">
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                Delete this note?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Are you sure you want to remove this personal note? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingNoteId(null)}
                disabled={isDeleting}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-xs cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
