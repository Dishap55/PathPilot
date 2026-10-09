import React from 'react';

export default function ExampleBlock({
  example = '',
  language = null
}) {
  return (
    <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto">
      <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
        <span className="uppercase font-bold tracking-wider">// Concrete Example</span>
        {language && (
          <span className="bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-semibold px-2 py-0.5 rounded">
            {language}
          </span>
        )}
      </div>
      <code>{example || 'int left = 0, right = arr.length - 1;\nwhile (left < right) {\n  int sum = arr[left] + arr[right];\n  if (sum == target) return true;\n  ...\n}'}</code>
    </div>
  );
}
