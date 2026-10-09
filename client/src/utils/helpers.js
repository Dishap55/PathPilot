export function getLevelColor(level) {
  switch (level?.toLowerCase()) {
    case 'beginner': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'intermediate': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'professional': return 'text-purple-600 bg-purple-50 border-purple-200';
    default: return 'text-slate-600 bg-slate-50 border-slate-200';
  }
}
