import React from 'react';
import { CANONICAL_SUBJECTS, SUBJECT_CONFIG } from './SubjectConfig';

/**
 * SubjectFilter
 *
 * Subject tab selector bar:
 * [ All ] [ DSA ] [ OOPS ] [ Aptitude ] [ DBMS ] [ OS ] [ CN ]
 *
 * Filtering ONLY changes frontend presentation (which milestone nodes are displayed).
 * It NEVER alters roadmap order or backend progression logic!
 */
export default function SubjectFilter({
  selectedSubject = 'ALL',
  onSelectSubject = () => {},
  countsPerSubject = {}
}) {
  const tabs = [
    { code: 'ALL', label: 'All Subjects' },
    ...CANONICAL_SUBJECTS.map(code => ({
      code,
      label: SUBJECT_CONFIG[code].name
    }))
  ];

  return (
    <div
      role="tablist"
      aria-label="Filter milestones by subject"
      className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100/80 border border-slate-200/80 rounded-2xl"
    >
      {tabs.map(tab => {
        const isActive = selectedSubject === tab.code;
        const count = tab.code === 'ALL'
          ? Object.values(countsPerSubject).reduce((a, b) => a + b, 0)
          : (countsPerSubject[tab.code] || 0);

        const style = tab.code !== 'ALL' ? SUBJECT_CONFIG[tab.code] : null;

        return (
          <button
            key={tab.code}
            role="tab"
            aria-selected={isActive}
            id={`tab-${tab.code}`}
            onClick={() => onSelectSubject(tab.code)}
            className={[
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer flex items-center gap-1.5',
              isActive
                ? (tab.code === 'ALL'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : `${style.activeBg} shadow-xs`)
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/60'
            ].join(' ')}
          >
            <span>{tab.label}</span>
            {count > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
