import React from 'react';
import { Building2, Calendar, BarChart3, Sparkles, RefreshCw, Compass } from 'lucide-react';
import Button from '../common/Button';

/**
 * RoadmapHeader
 *
 * Dedicated Page Header matching Reference Image 2:
 * - Title: "Your Personalized Learning Path"
 * - Subtitle: "Generated using your assessment, target company, and preparation timeline."
 * - Info Chips: Target Company, Preparation Timeline, Initial Assessment, AI Engine
 * - Personalization banner message
 */
export default function RoadmapHeader({
  targetDate = '',
  prepWindow = '',
  preferredLanguage = '',
  targetCompany = '',
  onRegenerate = () => {},
  isRegenerating = false,
  hasPersonalizedRoadmap = true
}) {
  return (
    <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
      {/* Top Main Title & Subtitle + Regenerate CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Your Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">Learning Path</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Generated using your assessment, target company, and preparation timeline.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold self-stretch sm:self-auto cursor-pointer shrink-0"
        >
          <RefreshCw size={13} className={isRegenerating ? 'animate-spin text-indigo-600' : ''} />
          <span>
            {isRegenerating
              ? (hasPersonalizedRoadmap ? 'Regenerating...' : 'Generating...')
              : (hasPersonalizedRoadmap ? 'Regenerate Roadmap' : 'Generate Roadmap')}
          </span>
        </Button>
      </div>

      {/* Info Chips Grid (Matching Reference Image 2 Header Chips) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
        {/* Chip 1: Target Company */}
        <div className="p-3.5 bg-gradient-to-br from-sky-50/90 to-blue-50/60 border border-sky-100/90 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-200/80 text-sky-600 flex items-center justify-center shrink-0">
            <Building2 size={18} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700/80 block">
              Target Company
            </span>
            <span className="text-sm font-black text-slate-900 truncate block">
              {targetCompany || 'TCS'}
            </span>
          </div>
        </div>

        {/* Chip 2: Preparation Timeline */}
        <div className="p-3.5 bg-gradient-to-br from-purple-50/90 to-indigo-50/60 border border-purple-100/90 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-200/80 text-purple-600 flex items-center justify-center shrink-0">
            <Calendar size={18} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700/80 block">
              Preparation Timeline
            </span>
            <span className="text-sm font-black text-slate-900 truncate block">
              {prepWindow || '12 weeks'}
            </span>
          </div>
        </div>

        {/* Chip 3: Initial Assessment */}
        <div className="p-3.5 bg-gradient-to-br from-emerald-50/90 to-green-50/60 border border-emerald-100/90 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0">
            <BarChart3 size={18} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/80 block">
              Initial Assessment
            </span>
            <span className="text-sm font-black text-emerald-700 truncate block">
              Completed
            </span>
          </div>
        </div>

        {/* Chip 4: AI Engine */}
        <div className="hidden lg:flex p-3.5 bg-gradient-to-br from-indigo-50/90 to-slate-50/60 border border-indigo-100/90 rounded-xl items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-200/80 text-indigo-600 flex items-center justify-center shrink-0">
            <Sparkles size={18} className="animate-pulse" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700/80 block">
              AI Powered
            </span>
            <span className="text-sm font-black text-indigo-900 truncate block">
              Gemini AI
            </span>
          </div>
        </div>
      </div>

      {/* Small Subtle Personalization Message */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-xs text-slate-500">
        <Sparkles size={14} className="text-amber-500 shrink-0" />
        <span className="font-semibold text-slate-700">✨ Personalized by PathPilot</span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="hidden sm:inline italic">
          Built around your strengths, weaknesses, target company, and preparation timeline.
        </span>
      </div>
    </div>
  );
}
