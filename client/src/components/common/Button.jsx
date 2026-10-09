import React from 'react';

/**
 * PathPilot Accessible Button Component
 * 
 * Supports touch targets (min 44px on mobile), keyboard accessibility,
 * loading state spinner, and student-friendly pastel accents.
 */

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  icon: Icon = null,
  iconRight: IconRight = null,
  ...props
}) {
  const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none active:scale-[0.98]";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400 shadow-[0_2px_8px_-2px_rgba(99,102,241,0.3)] disabled:bg-slate-300 disabled:shadow-none",
    garden: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-400 shadow-[0_2px_8px_-2px_rgba(16,185,129,0.3)] disabled:bg-slate-300 disabled:shadow-none",
    secondary: "bg-slate-100/90 text-slate-700 hover:bg-slate-200/90 focus:ring-slate-300 border border-slate-200/60 disabled:opacity-60",
    pastel: "bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100/80 focus:ring-indigo-300 border border-indigo-100/80 disabled:opacity-60",
    outline: "border border-slate-200/80 text-slate-700 hover:bg-slate-50 focus:ring-indigo-300 disabled:opacity-60",
    ghost: "text-slate-600 hover:bg-slate-100/60 focus:ring-slate-200 disabled:opacity-60",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-400 shadow-[0_2px_8px_-2px_rgba(244,63,94,0.3)] disabled:bg-slate-300"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs min-h-[36px]",
    md: "px-4 py-2.5 text-sm min-h-[44px]",
    lg: "px-6 py-3 text-base min-h-[48px]"
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${isDisabled ? 'cursor-not-allowed opacity-75' : ''} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>{children}</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {Icon && <Icon size={16} className="shrink-0" />}
          <span>{children}</span>
          {IconRight && <IconRight size={16} className="shrink-0" />}
        </span>
      )}
    </button>
  );
}
