import React from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg">
      <span className="text-sm">{message}</span>
      {onClose && <button onClick={onClose} className="text-xs text-slate-400 hover:text-white">✕</button>}
    </div>
  );
}
