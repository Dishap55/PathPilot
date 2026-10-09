import React from 'react';

export default function AnswerOptions({ options = [], selected, onSelect }) {
  return (
    <div className="space-y-2 mt-4">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`w-full text-left p-3 text-sm rounded-lg border transition-all ${
            selected === i ? 'bg-sky-50 border-sky-500 font-medium text-sky-900' : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
