import React from 'react';

export default function FeedbackPanel({ isCorrect, message }) {
  return (
    <div className={`p-4 rounded-xl border text-xs ${
      isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
    }`}>
      <span className="font-bold">{isCorrect ? '✓ Correct Answer!' : '✕ Needs Revision:'}</span> {message}
    </div>
  );
}
