import React from 'react';
import Timer from './Timer';

export default function AssessmentHeader({ title = 'Diagnostic Assessment', durationMinutes = 45, onTimeUp }) {
  return (
    <div className="bg-white border-b border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-sm mb-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <p className="text-xs text-slate-500">Evidence-based adaptive evaluation</p>
      </div>
      <Timer durationMinutes={durationMinutes} onTimeUp={onTimeUp} />
    </div>
  );
}
