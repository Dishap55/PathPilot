import React from 'react';

export default function Analytics() {
  const days = [
    { day: 'Mon', count: 5 },
    { day: 'Tue', count: 8 },
    { day: 'Wed', count: 12 },
    { day: 'Thu', count: 6 },
    { day: 'Fri', count: 9 }
  ];

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Activity Breakdown</h3>
      <div className="flex items-end gap-3 h-32 pt-6">
        {days.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div className="w-full bg-sky-500 rounded-t-md" style={{ height: `${d.count * 8}%` }} />
            <span className="text-[10px] text-slate-500 font-medium">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
