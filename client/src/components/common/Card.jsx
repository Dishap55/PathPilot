import React from 'react';

/**
 * PathPilot Responsive Card System
 * 
 * Consistent, accessible card component supporting:
 * - Desktop grid / Tablet grid / Mobile single-column stacking
 * - Subtle visible borders (~25% strength, clear separation against #FAFBFD canvas)
 * - Soft shadows and rounded corners
 * - Natural card width proportions and hierarchy
 * - No text clipping, natural word wrapping
 * - Gentle hover transition where interactive
 */

export default function Card({
  children,
  className = '',
  variant = 'default', // 'default' | 'pastel-green' | 'pastel-blue' | 'pastel-indigo' | 'pastel-amber' | 'pastel-rose' | 'flat' | 'highlighted'
  hover = false,
  padding = 'default', // 'none' | 'sm' | 'default' | 'lg'
  onClick,
  as: Component = 'div',
  ...props
}) {
  const baseClasses = 'bg-white rounded-2xl sm:rounded-3xl transition-all duration-200';

  const variantClasses = {
    default: 'border border-slate-200/90 shadow-[0_3px_14px_-2px_rgba(0,0,0,0.04),0_1px_4px_-1px_rgba(0,0,0,0.02)]',
    flat: 'border border-slate-200/80 bg-slate-50/60',
    'pastel-green': 'bg-emerald-50/50 border border-emerald-200/80 shadow-[0_3px_14px_-2px_rgba(16,185,129,0.05)]',
    'pastel-blue': 'bg-sky-50/50 border border-sky-200/80 shadow-[0_3px_14px_-2px_rgba(14,165,233,0.05)]',
    'pastel-indigo': 'bg-indigo-50/50 border border-indigo-200/80 shadow-[0_3px_14px_-2px_rgba(99,102,241,0.05)]',
    'pastel-amber': 'bg-amber-50/50 border border-amber-200/80 shadow-[0_3px_14px_-2px_rgba(245,158,11,0.05)]',
    'pastel-rose': 'bg-rose-50/50 border border-rose-200/80 shadow-[0_3px_14px_-2px_rgba(244,63,94,0.05)]',
    highlighted: 'border-2 border-indigo-500/30 bg-gradient-to-b from-indigo-50/40 to-white shadow-[0_4px_20px_-4px_rgba(99,102,241,0.08)]'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3.5 sm:p-4',
    default: 'p-5 sm:p-6 lg:p-7',
    lg: 'p-6 sm:p-8 lg:p-10'
  };

  const hoverClasses = hover
    ? 'hover:border-slate-300 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <Component
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

Card.Header = function CardHeader({ children, className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100/90 ${className}`}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ children, className = '', as: Heading = 'h3' }) {
  return (
    <Heading className={`text-base sm:text-lg font-bold text-slate-900 tracking-tight ${className}`}>
      {children}
    </Heading>
  );
};

Card.Description = function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-xs sm:text-sm text-slate-500 leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

Card.Content = function CardContent({ children, className = '' }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-5 pt-4 border-t border-slate-100/90 flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}>
      {children}
    </div>
  );
};
