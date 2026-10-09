import React, { useState } from 'react';
import AddNoteModal from './AddNoteModal';

/**
 * AddNoteButton Component
 * Renders the clean "📝 Add My Note" action in Practice & Summary views.
 * Can manage modal state internally or trigger an external handler.
 */
export default function AddNoteButton({
  onNoteSaved,
  subject = '',
  topicId = '',
  topicName = '',
  section = 'Practice',
  questionId = null,
  questionTitle = null,
  className = '',
  size = 'md', // 'sm' | 'md'
  variant = 'default', // 'default' | 'subtle' | 'accent'
  onClick = null
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e) => {
    e?.preventDefault();
    if (onClick) {
      onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSave = async (content) => {
    if (onNoteSaved) {
      await onNoteSaved({
        content,
        subject,
        topicId,
        topicName,
        section,
        questionId,
        questionTitle
      });
    }
  };

  const sizeClasses =
    size === 'sm'
      ? 'px-2.5 py-1 text-xs gap-1'
      : 'px-3.5 py-1.5 text-xs sm:text-sm gap-1.5';

  const variantClasses = {
    default:
      'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30',
    subtle:
      'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent',
    accent:
      'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60'
  }[variant] || '';

  return (
    <>
      <button
        type="button"
        id={`add-my-note-btn${questionId ? `-${questionId}` : ''}`}
        onClick={handleClick}
        className={`inline-flex items-center rounded-xl font-bold transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-xs active:scale-98 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${sizeClasses} ${variantClasses} ${className}`}
        aria-label="Add My Note"
        title="Add your personal personal note for this topic"
      >
        <span>📝</span>
        <span>Add My Note</span>
      </button>

      {/* Render modal only if managed internally */}
      {!onClick && (
        <AddNoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          topicName={topicName}
          questionTitle={questionTitle}
          subject={subject}
        />
      )}
    </>
  );
}
