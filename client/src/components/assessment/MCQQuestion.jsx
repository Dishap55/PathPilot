import React from 'react';

export default function MCQQuestion({ question, selectedOption, onSelect }) {
  const options = question?.options || ['Option A', 'Option B', 'Option C', 'Option D'];
  return (
    <div className="space-y-4">
      <p className="text-base font-medium text-slate-800">{question?.prompt}</p>
      <div className="space-y-2">
        {options.map((opt, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(idx)}
            className={`p-3 border rounded-lg cursor-pointer text-sm flex items-center gap-3 transition-colors ${
              selectedOption === idx ? 'border-sky-500 bg-sky-50/50 text-sky-800 font-medium' : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-semibold">
              {String.fromCharCode(65 + idx)}
            </span>
            <span>{opt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
