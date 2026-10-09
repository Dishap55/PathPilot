import React from 'react';

export default function PatternCard({ patternName = 'Two Pointers', description = 'Opposite directional traversal' }) {
  return (
    <div className="p-4 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl">
      <h4 className="text-sm font-bold text-indigo-900">{patternName}</h4>
      <p className="text-xs text-indigo-700 mt-1">{description}</p>
    </div>
  );
}
