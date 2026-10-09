import React from 'react';

export default function QuestionsCompletedCard({ count = 42 }) {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <span className="text-xs font-semibold text-slate-400 uppercase">Completed Practice</span>
      <div className="text-3xl font-extrabold text-emerald-600 mt-2">{count}</div>
      <p className="text-xs text-slate-400 mt-2">Verified test attempts</p>
    </div>
  );
}
