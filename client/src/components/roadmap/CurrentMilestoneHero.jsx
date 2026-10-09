import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target } from 'lucide-react';
import { getSubjectStyle } from './SubjectConfig';

/**
 * CurrentMilestoneHero
 *
 * Visually emphasizes the currently active milestone target.
 * Displays:
 * - "CURRENT FOCUS" badge
 * - Subject badge + stage badge
 * - Topic name
 * - Short focus description
 * - Clear CTA button navigating to `/roadmap/milestone/${milestone.id}`
 */
export default function CurrentMilestoneHero({ milestone }) {
  if (!milestone) return null;

  const subjectStyle = getSubjectStyle(milestone.subject);
  const targetUri = `/roadmap/milestone/${milestone.id}`;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 p-6 sm:p-7 text-white shadow-md border border-indigo-800/60">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-[11px] font-extrabold uppercase tracking-wider text-indigo-200">
            <Sparkles size={12} className="text-amber-400" />
            <span>Current Focus</span>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${subjectStyle.badge}`}>
            {subjectStyle.name}
          </span>

          {milestone.stage && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/80">
              {milestone.stage}
            </span>
          )}
        </div>

        {/* Topic & Focus */}
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {milestone.topic}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {milestone.focus || 'Practice this milestone to unlock the next stage of your roadmap.'}
          </p>
        </div>

        {/* CTA Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            to={targetUri}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>Continue Learning</span>
            <ArrowRight size={16} />
          </Link>
          <span className="text-[11px] text-slate-400 text-center sm:text-left">
            Step {milestone.sequence_no} of your personalized sequence
          </span>
        </div>
      </div>
    </div>
  );
}
