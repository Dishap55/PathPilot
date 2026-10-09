import React from 'react';

export default function ErrorPanel({ error = '' }) {
  if (!error) return null;
  return (
    <div className="bg-rose-950 text-rose-200 p-4 rounded-xl font-mono text-xs border border-rose-800">
      <div className="text-rose-400 font-semibold mb-1 uppercase text-[10px]">Compilation / Runtime Error</div>
      <pre className="whitespace-pre-wrap">{error}</pre>
    </div>
  );
}
