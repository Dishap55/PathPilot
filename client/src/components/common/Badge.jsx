import React from 'react';

/**
 * PathPilot Pastel Badge Component
 * 
 * Accessible, lightweight badge supporting status badges, pastel highlights,
 * and Learning Garden stages.
 */

export default function Badge({ children, variant = 'default', className = '', icon: Icon = null }) {
  const variants = {
    default: 'bg-slate-100/80 text-slate-700 border-slate-200/70',
    neutral: 'bg-slate-100/80 text-slate-700 border-slate-200/70',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200/70',
    warning: 'bg-amber-50 text-amber-850 border-amber-200/70',
    danger: 'bg-rose-50 text-rose-800 border-rose-200/70',
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200/70',
    sky: 'bg-sky-50 text-sky-700 border-sky-200/70',
    
    // Learning Garden Stages
    seed: 'bg-amber-50/80 text-amber-850 border-amber-200/80',
    sprout: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    plant: 'bg-sky-50 text-sky-800 border-sky-200/80',
    bloom: 'bg-rose-50 text-rose-800 border-rose-200/80',

    // Weak Topic Badge (Accessible with high contrast text)
    weak: 'bg-rose-50/90 text-rose-900 border-rose-200 font-semibold'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${variants[variant] || variants.default} ${className}`}>
      {Icon && <Icon size={12} className="shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
