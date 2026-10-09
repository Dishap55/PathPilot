import React from 'react';
import Badge from '../common/Badge';

/**
 * PathPilot StageCard Component
 * 
 * Represents one of the 4 Learning Garden stages:
 * 1. 🌰 Seed: "Your learning journey begins." (Topic has not been started)
 * 2. 🌱 Sprout: "Start learning." (Student has started learning the topic)
 * 3. 🌿 Growing Plant: "Keep learning and practicing." (Student is actively progressing)
 * 4. 🌸 Bloomed: "Topic completed!" (Milestone has been successfully completed)
 * 
 * Fully responsive:
 * - Desktop: part of a 4-column row with curved growth arcs
 * - Tablet: part of a 2x2 grid
 * - Mobile: stacked vertically with curved connecting stems
 */

export default function StageCard({
  stage,
  isCurrent = false,
  className = ''
}) {
  const {
    stage: stageNumber,
    name,
    emoji,
    tagline,
    meaning,
    theme = 'green',
    badgeText = ''
  } = stage;

  // Vibrant, soft pastel theme mapping
  const themeStyles = {
    amber: {
      bubble: 'bg-gradient-to-br from-amber-100/90 to-amber-200/50 border-amber-200/90 text-amber-900',
      border: 'border-amber-200/80 hover:border-amber-300',
      glow: 'shadow-[0_4px_16px_-2px_rgba(245,158,11,0.08)]',
      accent: 'text-amber-800',
      badgeVariant: 'seed',
      stageNumberBg: 'bg-amber-100 text-amber-900'
    },
    green: {
      bubble: 'bg-gradient-to-br from-emerald-100/90 to-emerald-200/50 border-emerald-200/90 text-emerald-900',
      border: 'border-emerald-200/80 hover:border-emerald-300',
      glow: 'shadow-[0_4px_16px_-2px_rgba(16,185,129,0.08)]',
      accent: 'text-emerald-800',
      badgeVariant: 'sprout',
      stageNumberBg: 'bg-emerald-100 text-emerald-900'
    },
    blue: {
      bubble: 'bg-gradient-to-br from-sky-100/90 to-sky-200/50 border-sky-200/90 text-sky-900',
      border: 'border-sky-200/80 hover:border-sky-300',
      glow: 'shadow-[0_4px_16px_-2px_rgba(14,165,233,0.08)]',
      accent: 'text-sky-800',
      badgeVariant: 'plant',
      stageNumberBg: 'bg-sky-100 text-sky-900'
    },
    rose: {
      bubble: 'bg-gradient-to-br from-rose-100/90 to-rose-200/50 border-rose-200/90 text-rose-900',
      border: 'border-rose-200/80 hover:border-rose-300',
      glow: 'shadow-[0_4px_16px_-2px_rgba(244,63,94,0.08)]',
      accent: 'text-rose-800',
      badgeVariant: 'bloom',
      stageNumberBg: 'bg-rose-100 text-rose-900'
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.green;

  return (
    <div
      className={`relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between ${currentTheme.border} ${currentTheme.glow} hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {/* Top Meta Bar: Stage number & Status Badge */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black shadow-xs ${currentTheme.stageNumberBg}`}>
          {stageNumber}
        </span>
        <Badge variant={currentTheme.badgeVariant}>
          {badgeText}
        </Badge>
      </div>

      {/* Stage Visual Bubble */}
      <div className="flex flex-col items-center text-center my-2">
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl border flex items-center justify-center text-3xl sm:text-4xl shadow-sm transition-transform duration-300 group-hover:scale-105 ${currentTheme.bubble}`}
          role="img"
          aria-label={name}
        >
          <span>{emoji}</span>
        </div>

        {/* Stage Name */}
        <h3 className="mt-3.5 text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          {name}
        </h3>

        {/* Tagline */}
        <p className={`text-xs sm:text-sm font-semibold mt-1 ${currentTheme.accent}`}>
          "{tagline}"
        </p>
      </div>

      {/* Meaning & Context description */}
      <div className="mt-4 pt-3 border-t border-slate-100/90 text-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
          Meaning
        </span>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {meaning}
        </p>
      </div>
    </div>
  );
}
