import React from 'react';

export default function DailyThought({ thought = 'Focus on understanding patterns deeply; placement questions are simply variations on a theme.' }) {
  return (
    <div className="p-4 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-xl text-xs text-sky-900 italic text-center">
      “{thought}”
    </div>
  );
}
