import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';

export default function HintPanel({ hint = 'Consider using a hash map to look up complements in O(1) time.' }) {
  const [show, setShow] = useState(false);
  return (
    <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
      <button onClick={() => setShow(!show)} className="flex items-center gap-2 text-xs font-bold text-amber-800">
        <Lightbulb size={16} />
        {show ? 'Hide AI Mentor Hint' : 'Request Progressive Hint'}
      </button>
      {show && <p className="mt-2 text-xs text-amber-900 leading-relaxed">{hint}</p>}
    </div>
  );
}
