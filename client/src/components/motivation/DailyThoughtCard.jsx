import React from 'react';

export default function DailyThoughtCard({ quote, author = 'PathPilot Placement Mentor' }) {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
      <p className="text-xs text-slate-700 italic">"{quote || 'Small consistent efforts compounded over time guarantee top placement results.'}"</p>
      <span className="block text-[10px] text-slate-400 mt-2 font-semibold">— {author}</span>
    </div>
  );
}
