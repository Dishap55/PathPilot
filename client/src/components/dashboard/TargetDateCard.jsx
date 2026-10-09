import React from 'react';
import { Calendar } from 'lucide-react';

export default function TargetDateCard({ targetDate = '2026-12-15', daysLeft = 82 }) {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-4">
      <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
        <Calendar size={24} />
      </div>
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase">Placement Exam Target</span>
        <h3 className="text-lg font-bold text-slate-800 mt-0.5">{daysLeft} Days Remaining</h3>
        <p className="text-[11px] text-slate-400">{targetDate}</p>
      </div>
    </div>
  );
}
