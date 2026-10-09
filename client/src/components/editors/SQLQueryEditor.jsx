import React from 'react';
import Button from '../common/Button';

export default function SQLQueryEditor({ query, onChange, onExecute }) {
  return (
    <div className="border border-slate-300 rounded-xl overflow-hidden bg-white">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center text-xs text-slate-600 font-mono">
        <span>SQL Query Console (Controlled Sandbox)</span>
        <Button size="sm" variant="primary" onClick={onExecute}>Run Query</Button>
      </div>
      <textarea
        value={query}
        onChange={e => onChange(e.target.value)}
        className="w-full h-32 p-3 font-mono text-xs text-slate-800 focus:outline-none resize-none"
        spellCheck="false"
      />
    </div>
  );
}
