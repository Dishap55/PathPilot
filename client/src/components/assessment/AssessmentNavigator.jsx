import React from 'react';

export default function AssessmentNavigator({ totalQuestions = 5, currentIndex = 0, onSelect, answered = {} }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200">
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Questions</h4>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`h-9 rounded-lg text-xs font-semibold transition-all ${
              currentIndex === idx
                ? 'ring-2 ring-sky-600 bg-sky-50 text-sky-700 font-bold'
                : answered[idx]
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
