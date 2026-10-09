import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function EdgeCaseBlock({ cases = ['Empty collection', 'Identical duplicate values', 'Odd vs Even lengths'] }) {
  return (
    <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
      <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs mb-2">
        <AlertTriangle size={15} />
        <span>Critical Edge Cases to Guard Against</span>
      </div>
      <ul className="list-disc list-inside text-xs text-amber-900 space-y-1">
        {cases.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  );
}
