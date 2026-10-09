import React from 'react';

export default function RoadmapLegend() {
  return (
    <div className="flex items-center gap-4 text-xs text-slate-500 my-4">
      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Completed</span>
      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> In Progress</span>
      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" /> Locked</span>
    </div>
  );
}
