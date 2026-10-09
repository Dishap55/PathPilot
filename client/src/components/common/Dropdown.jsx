import React, { useState } from 'react';

export default function Dropdown({ trigger, items = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
          <div className="py-1">
            {items.map((it, i) => (
              <button
                key={i}
                onClick={() => { it.onClick?.(); setOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
