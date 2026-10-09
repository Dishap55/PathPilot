import React from 'react';
import { Layers, Network, Cpu, Database, Binary, GitFork } from 'lucide-react';

/**
 * DiagramRenderer
 *
 * Renders selective visual representations to materially improve student comprehension.
 * Adheres to rule: Visual supports the explanation rather than replacing it.
 */
export default function DiagramRenderer({
  type = 'table_decomposition',
  title = 'Visual Representation',
  diagram = '',
  description = ''
}) {
  if (!diagram) return null;

  const getIcon = () => {
    switch (type) {
      case 'er_model':
      case 'table_decomposition':
        return <Database className="w-4 h-4 text-emerald-600" />;
      case 'state_diagram':
      case 'gantt_chart':
      case 'memory_layout':
        return <Cpu className="w-4 h-4 text-indigo-600" />;
      case 'layer_stack':
      case 'sequence_diagram':
        return <Network className="w-4 h-4 text-sky-600" />;
      case 'tree_diagram':
      case 'linked_nodes':
        return <Binary className="w-4 h-4 text-purple-600" />;
      case 'class_hierarchy':
        return <GitFork className="w-4 h-4 text-amber-600" />;
      default:
        return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="my-4 rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-4 shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            {title || 'Visual Model'}
          </span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
          {type.replace(/_/g, ' ')}
        </span>
      </div>

      <pre className="font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto py-2">
        {diagram}
      </pre>

      {description && (
        <p className="mt-2 text-xs text-slate-400 border-t border-slate-800/60 pt-2 italic">
          {description}
        </p>
      )}
    </div>
  );
}
