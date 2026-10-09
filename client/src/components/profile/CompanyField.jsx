import React from 'react';
import { Building2 } from 'lucide-react';

export default function CompanyField({ value, onChange }) {
  const popularCompanies = ['TCS', 'Infosys', 'Amazon', 'Google', 'Microsoft', 'Accenture'];

  return (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
        <Building2 className="w-3.5 h-3.5 text-indigo-600" />
        <span>Target Companies <span className="text-slate-400 font-normal">(Optional)</span></span>
      </label>
      <input
        type="text"
        autoComplete="off"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. TCS, Infosys, Amazon, Product Tier-1"
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-slate-50/60 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
      />
      {/* Quick Select Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        <span className="text-[11px] font-medium text-slate-400">Popular:</span>
        {popularCompanies.map((comp) => (
          <button
            key={comp}
            type="button"
            onClick={() => onChange(comp)}
            className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 text-[11px] font-semibold transition-colors cursor-pointer"
          >
            + {comp}
          </button>
        ))}
      </div>
    </div>
  );
}
