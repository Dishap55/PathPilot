import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function WeakAreas({ areas = [{ topic: 'Two Pointers', accuracy: 58 }, { topic: 'SQL Subqueries', accuracy: 52 }] }) {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
        <AlertCircle size={16} className="text-rose-500" />
        <span>Identified Weak Areas</span>
      </div>
      <div className="space-y-2">
        {areas.map((a, i) => (
          <div key={i} className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg">
            <span className="font-medium text-slate-700">{a.topic}</span>
            <span className="text-rose-600 font-semibold">{a.accuracy}% Accuracy</span>
          </div>
        ))}
      </div>
    </div>
  );
}
