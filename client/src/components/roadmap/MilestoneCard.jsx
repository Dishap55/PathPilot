import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Lock, PlayCircle, Flame, ArrowRight, ShieldAlert } from 'lucide-react';
import { getSubjectStyle } from './SubjectConfig';

/**
 * MilestoneCard
 *
 * Visually distinct card/node for a roadmap milestone level.
 * Handles:
 * - Milestone number / sequence (sequence_no)
 * - Subject badge
 * - Stage / focus description
 * - States: COMPLETED, UNLOCKED / IN_PROGRESS, LOCKED
 * - Strict backend-controlled locking enforcement:
 *   Locked nodes do NOT navigate to /roadmap/milestone/:id!
 *   Display locked message: "Complete previous milestones to unlock."
 * - Visual vertical line connector below card if hasNext
 */
export default function MilestoneCard({ node, isCurrent = false, hasNext = false }) {
  if (!node) return null;

  const status = (node.status || 'locked').toLowerCase();
  const isCompleted = status === 'completed';
  const isLocked = status === 'locked';
  const isUnlocked = status === 'unlocked' || status === 'in_progress';

  const subjectStyle = getSubjectStyle(node.subject);
  const milestoneTarget = `/roadmap/milestone/${node.id}`;

  // Growth metaphor icon for completed stages
  const plantIcons = ['🌱', '🌿', '🌸'];
  const plantIcon = plantIcons[(node.sequence_no - 1) % plantIcons.length];

  return (
    <div className="relative group">
      {/* Visual Timeline Connected Line */}
      {hasNext && (
        <div
          className={`absolute left-6 top-16 bottom-0 w-0.5 -mb-4 z-0 transition-colors ${
            isCompleted ? 'bg-emerald-300' : 'bg-slate-200'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Main Node Card */}
      <div
        className={[
          'relative z-10 p-5 rounded-2xl border transition-all duration-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4',
          isCompleted
            ? 'bg-emerald-50/40 border-emerald-200/90 text-emerald-950'
            : isCurrent
            ? 'bg-gradient-to-r from-indigo-50/70 to-sky-50/70 border-indigo-300 ring-2 ring-indigo-100 shadow-sm'
            : isUnlocked
            ? 'bg-white border-sky-200 text-slate-800 hover:border-sky-300 shadow-sm'
            : 'bg-slate-50/80 border-slate-200/80 text-slate-400 opacity-75'
        ].join(' ')}
      >
        {/* Left Status Icon & Info */}
        <div className="flex items-start gap-3.5 min-w-0">
          {/* Status Badge Circle */}
          <div
            className={[
              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold mt-0.5',
              isCompleted
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                : isCurrent
                ? 'bg-indigo-600 text-white shadow-xs animate-pulse'
                : isUnlocked
                ? 'bg-sky-100 text-sky-700 border border-sky-200'
                : 'bg-slate-200/80 text-slate-400 border border-slate-300/60'
            ].join(' ')}
          >
            {isCompleted ? (
              <CheckCircle2 size={20} className="text-emerald-600" />
            ) : isCurrent ? (
              <Flame size={20} className="text-white" />
            ) : isUnlocked ? (
              <PlayCircle size={20} className="text-sky-600" />
            ) : (
              <Lock size={18} className="text-slate-400" />
            )}
          </div>

          {/* Details */}
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black tracking-wider uppercase text-slate-400">
                Step {node.sequence_no}
              </span>

              {/* Subject Tag */}
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${subjectStyle.badge}`}>
                {subjectStyle.name}
              </span>

              {/* Stage Tag */}
              {node.stage && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  {node.stage}
                </span>
              )}

              {/* Current Target Badge */}
              {isCurrent && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-600 text-white">
                  CURRENT FOCUS
                </span>
              )}
            </div>

            {/* Topic Title */}
            <h4
              className={`text-base font-bold tracking-tight ${
                isCompleted
                  ? 'text-emerald-950'
                  : isLocked
                  ? 'text-slate-500 font-medium'
                  : 'text-slate-900'
              }`}
            >
              {node.topic}
            </h4>

            {/* Focus / Description or Locked Explanation */}
            {isLocked ? (
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Lock size={12} className="text-slate-400 shrink-0" />
                <span>Complete previous milestones to unlock this topic.</span>
              </p>
            ) : (
              node.focus && (
                <p className="text-xs text-slate-500 line-clamp-2">
                  {node.focus}
                </p>
              )
            )}
          </div>
        </div>

        {/* Right Status Action Button */}
        <div className="flex items-center sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          {isCompleted ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 hidden sm:flex">
                <span className="text-sm">{plantIcon}</span> Completed
              </span>
              <Link
                to={milestoneTarget}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-100/90 hover:bg-emerald-200/90 text-emerald-800 border border-emerald-300/80 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Review</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ) : isUnlocked ? (
            <Link
              to={milestoneTarget}
              className={[
                'px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-xs cursor-pointer',
                isCurrent
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              ].join(' ')}
            >
              <span>{isCurrent ? 'Continue' : 'Start Learning'}</span>
              <ArrowRight size={14} />
            </Link>
          ) : (
            /* Locked Action Button — Disabled & Locked. Strict unlocking enforcement! */
            <button
              disabled
              aria-disabled="true"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 border border-slate-200/80 flex items-center gap-1.5 cursor-not-allowed opacity-80"
            >
              <Lock size={13} />
              <span>Locked</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
