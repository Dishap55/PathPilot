import React from 'react';
import DiagramRenderer from '../common/DiagramRenderer';

/**
 * ExplanationPanel
 *
 * Implements the core pedagogical structure:
 * Concept -> Simple Explanation -> Visual / Diagram -> Example (Preferred Language)
 */
export default function ExplanationPanel({
  concept = '',
  explanation = '',
  visual = null,
  codeExample = null,
  language = null
}) {
  return (
    <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
          {concept || 'Conceptual Breakdown'}
        </h4>
        <p className="text-xs text-slate-700 leading-relaxed">
          {explanation || 'By maintaining a hash map of values seen so far, we can check for (target - current) in linear time rather than checking all pairs.'}
        </p>
      </div>

      {/* Visual / Diagram Support (Selective) */}
      {visual && visual.diagram && (
        <DiagramRenderer
          type={visual.type}
          title={visual.title || `${visual.type?.replace(/_/g, ' ') || 'Concept'} Visual`}
          diagram={visual.diagram}
          description={visual.description}
        />
      )}

      {/* Language-Specific Code Example */}
      {codeExample && (
        <div className="p-3 bg-slate-900 rounded-lg text-slate-100 font-mono text-xs overflow-x-auto">
          <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
            <span>CODE DEMONSTRATION</span>
            {language && (
              <span className="px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 font-semibold uppercase">
                {language}
              </span>
            )}
          </div>
          <pre>{codeExample}</pre>
        </div>
      )}
    </div>
  );
}
