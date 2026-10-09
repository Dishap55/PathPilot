/**
 * Subject Config & Pastel Styling
 * Defines subject codes, names, colors, and badge styles across PathPilot.
 */

export const SUBJECT_CONFIG = {
  DSA: {
    code: 'DSA',
    name: 'DSA',
    color: '#6366f1',
    bg: 'bg-indigo-50/80',
    border: 'border-indigo-200/80',
    text: 'text-indigo-700',
    badge: 'bg-indigo-100/90 text-indigo-800 border-indigo-200',
    activeBg: 'bg-indigo-600 text-white border-transparent'
  },
  OOPS: {
    code: 'OOPS',
    name: 'OOPS',
    color: '#0ea5e9',
    bg: 'bg-sky-50/80',
    border: 'border-sky-200/80',
    text: 'text-sky-700',
    badge: 'bg-sky-100/90 text-sky-800 border-sky-200',
    activeBg: 'bg-sky-600 text-white border-transparent'
  },
  APT: {
    code: 'APT',
    name: 'Aptitude',
    color: '#f59e0b',
    bg: 'bg-amber-50/80',
    border: 'border-amber-200/80',
    text: 'text-amber-700',
    badge: 'bg-amber-100/90 text-amber-800 border-amber-200',
    activeBg: 'bg-amber-500 text-white border-transparent'
  },
  DBMS: {
    code: 'DBMS',
    name: 'DBMS',
    color: '#10b981',
    bg: 'bg-emerald-50/80',
    border: 'border-emerald-200/80',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100/90 text-emerald-800 border-emerald-200',
    activeBg: 'bg-emerald-600 text-white border-transparent'
  },
  OS: {
    code: 'OS',
    name: 'OS',
    color: '#8b5cf6',
    bg: 'bg-violet-50/80',
    border: 'border-violet-200/80',
    text: 'text-violet-700',
    badge: 'bg-violet-100/90 text-violet-800 border-violet-200',
    activeBg: 'bg-violet-600 text-white border-transparent'
  },
  CN: {
    code: 'CN',
    name: 'CN',
    color: '#ec4899',
    bg: 'bg-pink-50/80',
    border: 'border-pink-200/80',
    text: 'text-pink-700',
    badge: 'bg-pink-100/90 text-pink-800 border-pink-200',
    activeBg: 'bg-pink-600 text-white border-transparent'
  }
};

export const CANONICAL_SUBJECTS = ['DSA', 'OOPS', 'APT', 'DBMS', 'OS', 'CN'];

export function getSubjectStyle(subjectCode) {
  const code = (subjectCode || 'DSA').toUpperCase();
  return SUBJECT_CONFIG[code] || SUBJECT_CONFIG.DSA;
}
