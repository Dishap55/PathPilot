import React from 'react';
import { Flame } from 'lucide-react';

export default function StreakCard({ streak = 5 }) {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-4">
      <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
        <Flame size={24} />
      </div>
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase">Active Study Streak</span>
        <h3 className="text-lg font-bold text-slate-800 mt-0.5">{streak} Days in a Row</h3>
        <p className="text-[11px] text-slate-400">Consistency drives placement success</p>
      </div>
    </div>
  );
}
