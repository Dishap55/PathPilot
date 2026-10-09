import React from 'react';

export default function SyntaxBlock({
  syntax = 'SELECT col1, COUNT(col2) FROM tbl GROUP BY col1 HAVING COUNT(col2) > 1;',
  language = null
}) {
  return (
    <div className="p-3 bg-sky-50 border border-sky-100 rounded-lg font-mono text-xs text-sky-900">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold block">Syntax Reference:</span>
        {language && (
          <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">
            {language}
          </span>
        )}
      </div>
      <code>{syntax}</code>
    </div>
  );
}
