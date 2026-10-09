import React from 'react';

export default function SubjectProgressCard({ subject, progress = 45 }) {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-slate-700">{subject}</span>
        <span className="text-slate-500">{progress}%</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div className="bg-sky-600 h-full rounded-full" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
