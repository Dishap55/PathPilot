import React, { useState, useEffect, useRef } from 'react';
import { X, Check, FileEdit, AlertCircle, Loader2 } from 'lucide-react';

/**
 * AddNoteModal Component
 * Small clean note editor conforming to PathPilot design guidelines.
 * Supports both creating a new note and editing an existing note.
 */
export default function AddNoteModal({
  isOpen,
  onClose,
  onSave,
  initialContent = '',
  isEditing = false,
  topicName = '',
  questionTitle = '',
  subject = ''
}) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setContent(initialContent || '');
      setError('');
      setSavedSuccess(false);
      setSaving(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialContent]);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e?.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) {
      setError('Please write some meaningful text before saving.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await onSave(trimmed);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 900);
    } catch (err) {
      setError(err.message || 'Failed to save note. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="note-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !saving) onClose();
      }}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden animate-scaleIn transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <div>
              <h3
                id="note-modal-title"
                className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight"
              >
                {isEditing ? 'Edit My Note' : 'Add My Note'}
              </h3>
              {(topicName || questionTitle) && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs sm:max-w-md">
                  {topicName} {questionTitle ? `• ${questionTitle}` : ''}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="student-note-textarea"
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 block"
            >
              Your Personal Note:
            </label>
            <textarea
              id="student-note-textarea"
              ref={textareaRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (error) setError('');
              }}
              placeholder="Write your note here... (e.g. key insight, conversion rule, or edge case to remember)"
              rows={5}
              disabled={saving || savedSuccess}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y min-h-[110px]"
            />
          </div>

          {/* Validation Error Message */}
          {error && (
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-2">
            {/* Success Micro-Badge */}
            <div>
              {savedSuccess && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 animate-fadeIn">
                  <Check size={14} /> Note saved ✓
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={saving || savedSuccess}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || savedSuccess || !content.trim()}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-xs hover:shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {saving ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Note</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
