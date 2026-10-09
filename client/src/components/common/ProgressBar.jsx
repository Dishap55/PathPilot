import React from 'react';

/**
 * PathPilot Pastel ProgressBar Component
 * 
 * Accessible, responsive progress indicator with pastel styling.
 */

export default function ProgressBar({
  value = 0,
  max = 100,
  variant = 'indigo', // 'indigo' | 'emerald' | 'sky' | 'amber' | 'garden'
  size = 'md', // 'sm' | 'md' | 'lg'
  showLabel = false,
  label = '',
  className = '',
  ariaLabel = 'Progress'
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const variantFills = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    sky: 'bg-sky-500',
    amber: 'bg-amber-500',
    garden: 'bg-gradient-to-r from-emerald-400 via-sky-400 to-rose-400'
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-xs font-medium text-slate-600">
          <span>{label}</span>
          <span className="font-bold text-slate-800">{percentage}%</span>
        </div>
      )}
      <div
        className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizeClasses[size] || sizeClasses.md}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || ariaLabel}
      >
        <div
          className={`${variantFills[variant] || variantFills.indigo} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
