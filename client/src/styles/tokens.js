/**
 * PathPilot Design Tokens
 * 
 * Centralized design tokens establishing a light, clean, modern, student-friendly,
 * pastel, and educational visual language across the platform.
 */

export const tokens = {
  // Color Palette: Pastel backgrounds, crisp readable text, soft accents
  colors: {
    bg: {
      canvas: 'bg-[#FAFBFD]',
      subtle: 'bg-slate-50/70',
      surface: 'bg-white',
      hover: 'hover:bg-slate-50/80',
    },
    pastel: {
      green: {
        bg: 'bg-emerald-50/70',
        border: 'border-emerald-200/60',
        text: 'text-emerald-800',
        accent: 'text-emerald-600',
        pill: 'bg-emerald-100/60 text-emerald-700',
      },
      blue: {
        bg: 'bg-sky-50/70',
        border: 'border-sky-200/60',
        text: 'text-sky-800',
        accent: 'text-sky-600',
        pill: 'bg-sky-100/60 text-sky-700',
      },
      indigo: {
        bg: 'bg-indigo-50/70',
        border: 'border-indigo-200/60',
        text: 'text-indigo-800',
        accent: 'text-indigo-600',
        pill: 'bg-indigo-100/60 text-indigo-700',
      },
      amber: {
        bg: 'bg-amber-50/70',
        border: 'border-amber-200/60',
        text: 'text-amber-850',
        accent: 'text-amber-600',
        pill: 'bg-amber-100/60 text-amber-800',
      },
      rose: {
        bg: 'bg-rose-50/70',
        border: 'border-rose-200/60',
        text: 'text-rose-800',
        accent: 'text-rose-600',
        pill: 'bg-rose-100/60 text-rose-700',
      },
      lavender: {
        bg: 'bg-purple-50/70',
        border: 'border-purple-200/60',
        text: 'text-purple-800',
        accent: 'text-purple-600',
        pill: 'bg-purple-100/60 text-purple-700',
      }
    },
    text: {
      primary: 'text-slate-900',
      secondary: 'text-slate-600',
      muted: 'text-slate-400',
      inverse: 'text-white',
    },
    border: {
      subtle: 'border-slate-200/60',
      light: 'border-slate-100',
      default: 'border-slate-200',
      focus: 'focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100',
    },
  },

  // Shadows: Soft and gentle, avoiding harsh elevation
  shadows: {
    soft: 'shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03),0_1px_3px_-1px_rgba(0,0,0,0.02)]',
    card: 'shadow-[0_4px_16px_-4px_rgba(0,0,0,0.04)]',
    cardHover: 'hover:shadow-[0_8px_24px_-4px_rgba(99,102,241,0.08),0_2px_6px_-2px_rgba(0,0,0,0.03)]',
    glow: 'shadow-[0_0_20px_-3px_rgba(99,102,241,0.15)]',
  },

  // Radii: Consistent rounded feel
  radii: {
    badge: 'rounded-full',
    button: 'rounded-xl',
    card: 'rounded-2xl sm:rounded-3xl',
    container: 'rounded-3xl',
  },

  // Learning Garden Specific Stages
  gardenStages: [
    {
      id: 'seed',
      stage: 1,
      name: 'Seed',
      emoji: '🌰',
      tagline: 'Your learning journey begins.',
      meaning: 'Topic has not been started.',
      theme: 'amber',
      accentColor: '#D97706',
      badgeText: 'Not Started',
    },
    {
      id: 'sprout',
      stage: 2,
      name: 'Sprout',
      emoji: '🌱',
      tagline: 'Start learning.',
      meaning: 'Student has started learning the topic.',
      theme: 'green',
      accentColor: '#059669',
      badgeText: 'Learning Started',
    },
    {
      id: 'plant',
      stage: 3,
      name: 'Growing Plant',
      emoji: '🌿',
      tagline: 'Keep learning and practicing.',
      meaning: 'Student is actively progressing through the topic.',
      theme: 'blue',
      accentColor: '#0284C7',
      badgeText: 'Actively Practicing',
    },
    {
      id: 'bloom',
      stage: 4,
      name: 'Bloomed',
      emoji: '🌸',
      tagline: 'Topic completed!',
      meaning: 'Milestone has been successfully completed.',
      theme: 'rose',
      accentColor: '#E11D48',
      badgeText: 'Completed',
    }
  ],

  // Breakpoint Guidelines
  breakpoints: {
    mobileSmall: '360px',
    mobileMedium: '390px',
    mobileLarge: '430px',
    tablet: '768px',
    desktopSmall: '1024px',
    desktopMedium: '1280px',
    desktopLarge: '1440px',
    desktopWide: '1920px',
  }
};
