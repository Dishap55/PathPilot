import React from 'react';

export default function OutputPanel({ output = '' }) {
  return (
    <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs border border-slate-800">
      <div className="text-slate-500 font-semibold mb-2 uppercase text-[10px]">Execution Output</div>
      <pre className="whitespace-pre-wrap">{output || 'No output recorded.'}</pre>
    </div>
  );
}
