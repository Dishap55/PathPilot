import React from 'react';

export default function ImprovementSummary({ delta = '+30%' }) {
  return (
    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
      <span>Performance Gain</span>
      <span className="font-extrabold text-sm">{delta}</span>
    </div>
  );
}
