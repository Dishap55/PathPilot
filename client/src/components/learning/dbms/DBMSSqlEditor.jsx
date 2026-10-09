import React, { useRef, useMemo } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check } from 'lucide-react';

/**
 * Tokenize and syntax-highlight SQL code into React elements
 */
function highlightSql(code) {
  if (!code) return null;

  // Master regex matching comments, strings, keywords, numbers, punctuation
  const tokenRegex = /(--[^\n]*)|('(?:''|[^'\\]|\\.)*')|(\b(?:SELECT|FROM|WHERE|GROUP\s+BY|HAVING|ORDER\s+BY|LIMIT|JOIN|INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|FULL\s+JOIN|CROSS\s+JOIN|ON|AS|AND|OR|NOT|IN|IS|NULL|LIKE|BETWEEN|EXISTS|COUNT|SUM|AVG|MIN|MAX|DISTINCT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|TRUNCATE|PRIMARY\s+KEY|FOREIGN\s+KEY|REFERENCES|CHECK|UNIQUE|DEFAULT|CASCADE|BEGIN|TRANSACTION|COMMIT|ROLLBACK|SAVEPOINT|CASE|WHEN|THEN|ELSE|END|DESC|ASC|UNION)\b)|(\b\d+(?:\.\d+)?\b)|([(),;=><+*\/.-])|([a-zA-Z_][a-zA-Z0-9_]*)|(\s+)/gi;

  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(code)) !== null) {
    const [full, comment, str, keyword, num, punct, ident, space] = match;

    if (comment) {
      elements.push(<span key={match.index} className="text-slate-500 italic">{comment}</span>);
    } else if (str) {
      elements.push(<span key={match.index} className="text-amber-300">{str}</span>);
    } else if (keyword) {
      elements.push(<span key={match.index} className="text-emerald-400 font-bold">{keyword.toUpperCase()}</span>);
    } else if (num) {
      elements.push(<span key={match.index} className="text-sky-300 font-semibold">{num}</span>);
    } else if (punct) {
      elements.push(<span key={match.index} className="text-slate-400 font-bold">{punct}</span>);
    } else if (ident) {
      elements.push(<span key={match.index} className="text-slate-100">{ident}</span>);
    } else if (space) {
      elements.push(space);
    }
    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    elements.push(code.slice(lastIndex));
  }

  return elements;
}

/**
 * DBMSSqlEditor Component
 * Professional Dark Navy / Charcoal Code Editor with:
 * - Dynamic line numbers
 * - High-contrast syntax highlighting (Green/Teal keywords, warm amber strings, cyan numbers)
 * - Synchronized typing and scrolling
 * - Prominent Run Query & Reset buttons
 */
export default function DBMSSqlEditor({
  value = '',
  onChange,
  onRun,
  onReset,
  isRunning = false,
  minHeight = '180px',
  readOnly = false,
  title = 'SQL Query Console'
}) {
  const textareaRef = useRef(null);
  const preRef = useRef(null);
  const gutterRef = useRef(null);

  const lines = useMemo(() => {
    return value.split('\n');
  }, [value]);

  const lineCount = Math.max(1, lines.length);

  const handleScroll = (e) => {
    const { scrollTop, scrollLeft } = e.target;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = scrollTop;
    }
  };

  const highlightedCode = useMemo(() => {
    return highlightSql(value);
  }, [value]);

  return (
    <div className="border border-slate-700/80 rounded-2xl overflow-hidden bg-[#0F172A] shadow-lg flex flex-col font-mono">
      {/* Editor Header Bar */}
      <div className="bg-[#1E293B] px-4 py-2.5 border-b border-slate-700/80 flex flex-wrap justify-between items-center gap-2 select-none">
        <div className="flex items-center gap-2">
          <Terminal size={15} className="text-emerald-400" />
          <span className="text-xs font-bold text-slate-200 tracking-wide">{title}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            SQL (PostgreSQL / MySQL)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-slate-100 font-semibold flex items-center gap-1 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}

          {onRun && (
            <button
              type="button"
              id="dbms-run-sql-btn"
              onClick={onRun}
              disabled={isRunning}
              className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <Play size={13} className={isRunning ? 'animate-spin' : 'fill-white'} />
              {isRunning ? 'Executing...' : 'Run Query'}
            </button>
          )}
        </div>
      </div>

      {/* Editor Body with Gutter & Overlay */}
      <div className="relative flex bg-[#0B132B]" style={{ minHeight }}>
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="select-none py-3.5 pl-3 pr-3 text-right bg-[#090E1F] border-r border-slate-800/80 text-slate-500 text-xs font-mono shrink-0 overflow-hidden leading-6"
          style={{ width: lineCount > 99 ? '48px' : '38px' }}
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i + 1} className="h-6 leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Canvas Container */}
        <div className="relative flex-1 overflow-hidden">
          {/* Syntax Highlighted Backdrop Display */}
          <pre
            ref={preRef}
            aria-hidden="true"
            className="absolute inset-0 m-0 py-3.5 px-4 font-mono text-xs sm:text-sm leading-6 overflow-hidden pointer-events-none whitespace-pre break-normal select-none"
            style={{
              tabSize: 2,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            }}
          >
            {highlightedCode}
            {/* Trailing newline spacer so scroll height matches */}
            {value.endsWith('\n') ? ' ' : ''}
          </pre>

          {/* Interactive Textarea on top */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            onScroll={handleScroll}
            readOnly={readOnly}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            placeholder="-- Write your SQL query here..."
            className="absolute inset-0 w-full h-full m-0 py-3.5 px-4 font-mono text-xs sm:text-sm leading-6 bg-transparent text-transparent caret-emerald-400 selection:bg-emerald-500/30 selection:text-white resize-none outline-none overflow-auto whitespace-pre break-normal"
            style={{
              tabSize: 2,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            }}
          />
        </div>
      </div>
    </div>
  );
}
