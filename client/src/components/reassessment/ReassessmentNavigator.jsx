import React from 'react';

export default function ReassessmentNavigator({ total = 3, current = 0, onSelect }) {
  return (
    <div className="flex gap-2 justify-center mb-4">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`w-8 h-8 rounded-full text-xs font-bold ${current === i ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
