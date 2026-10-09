import React from 'react';
import { Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getSubjectStyle } from './SubjectConfig';

/**
 * RoadmapProgress
 *
 * Compact summary area showing:
 * - overall roadmap progress bar & percentage
 * - completed / total milestones count (e.g. 12 / 18 milestones completed)
 * - current milestone (subject + topic)
 * - next milestone (subject + topic)
 */
export default function RoadmapProgress({
  completedCount = 0,
  totalCount = 0,
  currentMilestone = null,
  nextMilestone = null
}) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const currentStyle = currentMilestone ? getSubjectStyle(currentMilestone.subject) : null;
  const nextStyle = nextMilestone ? getSubjectStyle(nextMilestone.subject) : null;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Roadmap Progress
          </h2>
        </div>
        <span className="text-xs font-bold text-slate-600">
          {completedCount} / {totalCount} milestones completed ({percentage}%)
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/60">
        <div
          className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>

      {/* Current & Next Milestone Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Current Milestone */}
        <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
            🎯
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Current Milestone
            </span>
            {currentMilestone ? (
              <div className="truncate text-xs font-semibold text-slate-800 mt-0.5">
                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold mr-1.5 ${currentStyle.badge}`}>
                  {currentStyle.name}
                </span>
                {currentMilestone.topic}
              </div>
            ) : (
              <span className="text-xs text-slate-400 block mt-0.5">All milestones completed!</span>
            )}
          </div>
        </div>

        {/* Next Milestone */}
        <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
            <ArrowRight size={14} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Next Up
            </span>
            {nextMilestone ? (
              <div className="truncate text-xs font-semibold text-slate-800 mt-0.5">
                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold mr-1.5 ${nextStyle.badge}`}>
                  {nextStyle.name}
                </span>
                {nextMilestone.topic}
              </div>
            ) : (
              <span className="text-xs text-slate-400 block mt-0.5">—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
