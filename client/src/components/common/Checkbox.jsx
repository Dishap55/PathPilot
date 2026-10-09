import React from 'react';

export default function Checkbox({ label, className = '', ...props }) {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer text-sm text-slate-700 ${className}`}>
      <input type="checkbox" className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300" {...props} />
      {label && <span>{label}</span>}
    </label>
  );
}
