import React from 'react';

export default function NoteViewer({ content = '' }) {
  return (
    <div className="prose prose-slate max-w-none bg-white p-6 rounded-xl border border-slate-200">
      <h3 className="text-base font-bold text-slate-800 mb-2">Core Concept & Explanation</h3>
      <p className="text-sm text-slate-600 leading-relaxed">
        {content || 'The two-pointer technique uses two markers traversing a sequential data structure concurrently. It reduces O(N^2) searches into linear O(N) traversals.'}
      </p>
    </div>
  );
}
