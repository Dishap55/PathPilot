import React from 'react';

export default function PracticeTimeCard({ minutes = 240 }) {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <span className="text-xs font-semibold text-slate-400 uppercase">Practice Time</span>
      <div className="text-3xl font-extrabold text-indigo-600 mt-2">{Math.floor(minutes / 60)}h {minutes % 60}m</div>
      <p className="text-xs text-slate-400 mt-2">Active coding & problem solving</p>
    </div>
  );
}
