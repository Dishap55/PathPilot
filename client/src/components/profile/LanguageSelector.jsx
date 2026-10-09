import React from 'react';
import { Code2 } from 'lucide-react';

export const SUPPORTED_LANGUAGES = [
  { value: 'C++', label: 'C++' },
  { value: 'Java', label: 'Java' },
  { value: 'Python', label: 'Python' },
  { value: 'C', label: 'C' },
  { value: 'JavaScript', label: 'JavaScript' }
];

export default function LanguageSelector({ value, onChange }) {
  const selectedLang = value || '';

  return (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
        <Code2 className="w-3.5 h-3.5 text-indigo-600" />
        <span>Preferred Coding Language</span>
      </label>
      
      {/* Selectable Language Cards/Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = selectedLang === lang.value;
          return (
            <button
              key={lang.value}
              type="button"
              onClick={() => onChange(lang.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02]'
                  : 'bg-slate-100/80 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
