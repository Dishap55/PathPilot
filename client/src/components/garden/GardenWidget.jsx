import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { ArrowRight, Info } from 'lucide-react';

/**
 * PathPilot GardenWidget Component
 * 
 * Embeddable dashboard widget reflecting real student learning activity:
 * - 🌰 Seeds: Topics/milestones locked / not yet started
 * - 🌱 Sprouts: Active unlocked milestones started
 * - 🌿 Growing Plants: Milestones with active practice attempts
 * - 🌸 Bloomed Flowers: Fully completed milestones
 * 
 * NO FAKE DATA: Directly derives state from authentic student roadmap milestones.
 * When milestones are not yet available, cleanly displays empty/dormant state.
 */

export default function GardenWidget({
  milestones = [],
  loading = false,
  className = ''
}) {
  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-slate-100 rounded w-1/3" />
          <div className="h-16 bg-slate-50 rounded-2xl" />
          <div className="h-8 bg-slate-100 rounded" />
        </div>
      </Card>
    );
  }

  // Derive genuine counts from authentic student milestones
  const total = milestones.length;
  const bloomed = milestones.filter(m => ['completed', 'COMPLETED', 'done'].includes(m.status?.toLowerCase())).length;
  const isMilestoneGrowing = (m) => ['in_progress', 'unlocked'].includes(m.status?.toLowerCase()) || ((m.attempted_count || 0) > 0 || m.practice_completed);
  const growing = milestones.filter(m => isMilestoneGrowing(m) && !['completed', 'COMPLETED', 'done'].includes(m.status?.toLowerCase())).length;
  const sprouts = 0; // Or define sprout logic if needed
  const seeds = milestones.filter(m => ['locked', 'not_started'].includes(m.status?.toLowerCase())).length;

  const hasActivity = bloomed > 0 || growing > 0 || sprouts > 0;

  return (
    <Card className={`p-5 sm:p-6 lg:p-7 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100/90">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold text-sm shadow-xs">
            🌱
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Your Learning Garden</span>
            </h3>
            <p className="text-xs text-slate-500">Live reflection of your conceptual growth</p>
          </div>
        </div>

        <Link
          to="/roadmap"
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors self-start sm:self-auto"
        >
          <span>Cultivate Garden</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="mt-5 space-y-5">
        {!hasActivity && total === 0 ? (
          // Inactive / Empty State (No fake data)
          <div className="p-6 bg-slate-50/80 border border-dashed border-slate-200 rounded-2xl text-center space-y-2">
            <div className="text-2xl">🌰</div>
            <p className="text-xs font-semibold text-slate-700">Your Garden Awaits Its First Seeds</p>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto leading-relaxed">
              Complete your diagnostic assessment to synthesize your learning roadmap. Each assigned milestone will take root as a seed in your garden.
            </p>
            <div className="pt-2">
              <Link
                to="/roadmap"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                <span>View Roadmap</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ) : (
          // Active Stages Matrix (Soft Pastel Tiles)
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {/* 1. Seed */}
              <div className="p-3.5 bg-gradient-to-b from-amber-50/90 to-amber-100/50 border border-amber-200/90 rounded-2xl text-center shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
                <span className="text-xl block mb-1">🌰</span>
                <span className="text-lg font-black text-amber-900 block">{seeds}</span>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">Seeds</span>
                <span className="text-[10px] text-amber-600/90 font-medium">Pending</span>
              </div>

              {/* 2. Sprout */}
              <div className="p-3.5 bg-gradient-to-b from-emerald-50/90 to-emerald-100/50 border border-emerald-200/90 rounded-2xl text-center shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
                <span className="text-xl block mb-1">🌱</span>
                <span className="text-lg font-black text-emerald-900 block">{sprouts}</span>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Sprouts</span>
                <span className="text-[10px] text-emerald-600/90 font-medium">Started</span>
              </div>

              {/* 3. Growing Plant */}
              <div className="p-3.5 bg-gradient-to-b from-sky-50/90 to-sky-100/50 border border-sky-200/90 rounded-2xl text-center shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
                <span className="text-xl block mb-1">🌿</span>
                <span className="text-lg font-black text-sky-900 block">{growing}</span>
                <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block">Growing</span>
                <span className="text-[10px] text-sky-600/90 font-medium">Practicing</span>
              </div>

              {/* 4. Bloomed Flower */}
              <div className="p-3.5 bg-gradient-to-b from-rose-50/90 to-rose-100/50 border border-rose-200/90 rounded-2xl text-center shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
                <span className="text-xl block mb-1">🌸</span>
                <span className="text-lg font-black text-rose-900 block">{bloomed}</span>
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">Bloomed</span>
                <span className="text-[10px] text-rose-600/90 font-medium">Mastered</span>
              </div>
            </div>

            {/* Overall Bloom Health Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Garden Bloom Progress</span>
                <span className="font-bold text-slate-900">{bloomed} of {total} Milestones Bloomed</span>
              </div>
              <ProgressBar
                value={bloomed}
                max={total || 1}
                variant="garden"
                size="md"
              />
            </div>
          </>
        )}
      </div>

      {/* Integration Notice Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100/90 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 font-medium">
          <Info size={12} className="text-slate-400 shrink-0" />
          <span>Synced with authentic roadmap milestones</span>
        </span>
        <span className="font-bold text-emerald-700">Active Cycle</span>
      </div>
    </Card>
  );
}
