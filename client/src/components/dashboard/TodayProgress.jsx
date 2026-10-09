import React from 'react';

export default function TodayProgress({ questionsCount = 6, minutes = 45 }) {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <span className="text-xs font-semibold text-slate-400 uppercase">Today's Practice</span>
      <div className="text-2xl font-bold text-slate-800 mt-2">{questionsCount} Questions</div>
      <p className="text-xs text-slate-400 mt-1">{minutes} minutes focused study</p>
    </div>
  );
}
