import React from 'react';

export default function AccuracyCard({ accuracy = 78.5 }) {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <span className="text-xs font-semibold text-slate-400 uppercase">Overall Accuracy</span>
      <div className="text-3xl font-extrabold text-sky-600 mt-2">{accuracy}%</div>
      <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
        <div className="bg-sky-600 h-full rounded-full" style={{ width: `${accuracy}%` }} />
      </div>
    </div>
  );
}
