import React from 'react';

export default function CodeEditor({ code, onChange }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 text-xs text-slate-300 font-mono flex items-center justify-between">
        <span>solution.js</span>
        <span>JavaScript (V8)</span>
      </div>
      <textarea
        value={code}
        onChange={e => onChange(e.target.value)}
        className="w-full h-64 p-4 bg-slate-900 text-slate-100 font-mono text-xs focus:outline-none resize-none"
        spellCheck="false"
      />
    </div>
  );
}
