import React from 'react';

export default function Radio({ label, className = '', ...props }) {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer text-sm text-slate-700 ${className}`}>
      <input type="radio" className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-slate-300" {...props} />
      {label && <span>{label}</span>}
    </label>
  );
}
