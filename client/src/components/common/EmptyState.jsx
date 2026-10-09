import React from 'react';

export default function EmptyState({ title = 'No items found', description = 'There is currently no data to display.' }) {
  return (
    <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-xl bg-white">
      <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
    </div>
  );
}
