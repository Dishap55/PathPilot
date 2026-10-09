import React from 'react';
import { SUBJECTS } from '../../constants';
import { Layers } from 'lucide-react';

export default function SubjectLevelSelector({ levels = {}, onChange }) {
  const levelsList = ['Beginner', 'Intermediate', 'Professional'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-600" />
          <span>Starting Baseline Proficiency (Select level for each subject)</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {SUBJECTS.map((s) => {
          const currentLevel = levels[s.code] || '';

          return (
            <div
              key={s.id}
              className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 shadow-sm hover:border-indigo-200 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-xs font-bold text-slate-800">{s.name}</span>
                </div>
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {s.code}
                </span>
              </div>

              {/* Level Selector Pills */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {levelsList.map((lvl) => {
                  const isSelected = currentLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => onChange(s.code, lvl)}
                      className={`py-1.5 px-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02] border border-indigo-600'
                          : 'bg-slate-100/90 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200/60'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
