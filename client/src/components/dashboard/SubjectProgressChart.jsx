import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, TrendingUp, BookOpen, CheckCircle2, Target, BarChart2 } from 'lucide-react';
import { progressService } from '../../services/progressService';
import Skeleton from '../common/Skeleton';

/**
 * Canonical subjects in display order.
 * Codes match exactly what the backend subjects table stores.
 */
const SUBJECTS = [
  { code: 'DSA',  label: 'DSA',      color: '#6366f1', bg: 'bg-indigo-50',  border: 'border-indigo-200', text: 'text-indigo-700',  activeBg: 'bg-indigo-600' },
  { code: 'OOPS', label: 'OOPS',     color: '#0ea5e9', bg: 'bg-sky-50',     border: 'border-sky-200',    text: 'text-sky-700',     activeBg: 'bg-sky-600'    },
  { code: 'APT',  label: 'Aptitude', color: '#f59e0b', bg: 'bg-amber-50',   border: 'border-amber-200',  text: 'text-amber-700',   activeBg: 'bg-amber-500'  },
  { code: 'DBMS', label: 'DBMS',     color: '#10b981', bg: 'bg-emerald-50', border: 'border-emerald-200',text: 'text-emerald-700', activeBg: 'bg-emerald-600'},
  { code: 'OS',   label: 'OS',       color: '#8b5cf6', bg: 'bg-violet-50',  border: 'border-violet-200', text: 'text-violet-700',  activeBg: 'bg-violet-600' },
  { code: 'CN',   label: 'CN',       color: '#ec4899', bg: 'bg-pink-50',    border: 'border-pink-200',   text: 'text-pink-700',    activeBg: 'bg-pink-600'   },
];

const CHART_H = 160;   // SVG viewBox height
const CHART_PAD = { top: 14, right: 16, bottom: 32, left: 38 };

/**
 * Maps a data value 0-100 to an SVG Y coordinate within the chart area.
 */
function toY(value, chartH) {
  const inner = chartH - CHART_PAD.top - CHART_PAD.bottom;
  return CHART_PAD.top + inner - (Math.min(100, Math.max(0, value)) / 100) * inner;
}

/**
 * Maps a point index to an SVG X coordinate.
 */
function toX(idx, total, chartW) {
  const inner = chartW - CHART_PAD.left - CHART_PAD.right;
  if (total <= 1) return CHART_PAD.left + inner / 2;
  return CHART_PAD.left + (idx / (total - 1)) * inner;
}

/**
 * Renders a compact inline SVG sparkline graph for a single subject's trend data.
 */
function TrendLine({ trend, color, chartW }) {
  if (!trend || trend.length === 0) return null;

  const points = trend.map((d, i) => ({
    x: toX(i, trend.length, chartW),
    y: toY(d.mastery, CHART_H),
    ...d
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  // Fill area under line
  const fillD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${toY(0, CHART_H).toFixed(1)} L ${points[0].x.toFixed(1)} ${toY(0, CHART_H).toFixed(1)} Z`;

  return (
    <>
      {/* Area fill */}
      <path d={fillD} fill={color} fillOpacity={0.08} stroke="none" />
      {/* Line */}
      <path d={pathD} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} stroke="white" strokeWidth={1.5} />
      ))}
    </>
  );
}

/**
 * Y-axis gridlines and labels (0%, 25%, 50%, 75%, 100%)
 */
function GridLines({ chartW }) {
  const levels = [0, 25, 50, 75, 100];
  return (
    <>
      {levels.map(v => {
        const y = toY(v, CHART_H);
        return (
          <g key={v}>
            <line
              x1={CHART_PAD.left} y1={y}
              x2={chartW - CHART_PAD.right} y2={y}
              stroke="#e2e8f0" strokeWidth={v === 0 ? 1.5 : 1} strokeDasharray={v === 0 ? undefined : '3,3'}
            />
            <text x={CHART_PAD.left - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#94a3b8" fontFamily="system-ui,sans-serif">
              {v}%
            </text>
          </g>
        );
      })}
    </>
  );
}

/**
 * X-axis date labels — shows up to 5 labels evenly spaced.
 */
function XLabels({ trend, chartW }) {
  if (!trend || trend.length === 0) return null;
  // Pick at most 5 evenly spaced labels
  const maxLabels = Math.min(5, trend.length);
  const step = trend.length <= maxLabels ? 1 : Math.floor((trend.length - 1) / (maxLabels - 1));
  const indices = [];
  for (let i = 0; i < trend.length; i += step) indices.push(i);
  if (indices[indices.length - 1] !== trend.length - 1) indices.push(trend.length - 1);

  return (
    <>
      {indices.map(i => {
        const x = toX(i, trend.length, chartW);
        const y = CHART_H - CHART_PAD.bottom + 14;
        return (
          <text key={i} x={x} y={y} textAnchor="middle" fontSize={9} fill="#94a3b8" fontFamily="system-ui,sans-serif">
            {trend[i].label}
          </text>
        );
      })}
    </>
  );
}

/**
 * Interactive tooltip shown on hover.
 * Positioned relative to the card container, stays within viewport.
 */
function Tooltip({ point, color, style }) {
  if (!point) return null;
  return (
    <div
      style={style}
      className="absolute z-30 pointer-events-none bg-white border border-slate-200 rounded-xl shadow-lg px-3 py-2.5 text-xs min-w-[140px]"
    >
      <div className="font-bold text-slate-800 mb-1.5 border-b border-slate-100 pb-1">{point.label}</div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Mastery</span>
          <span className="font-bold" style={{ color }}>{point.mastery}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Accuracy</span>
          <span className="font-bold text-slate-700">{point.accuracy}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Questions</span>
          <span className="font-bold text-slate-700">{point.questions}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Metric summary row shown below the chart.
 */
function MetricPill({ icon: Icon, label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 min-w-0 flex-1">
      <Icon size={13} className={color} />
      <span className={`text-sm font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-slate-500 font-medium text-center leading-tight">{label}</span>
    </div>
  );
}

/**
 * Skeleton placeholder while data is loading.
 */
function ChartSkeleton() {
  return (
    <div className="space-y-4">
      {/* Subject tabs skeleton */}
      <div className="flex gap-2 flex-wrap">
        {SUBJECTS.map(s => (
          <Skeleton key={s.code} className="h-7 w-16 rounded-full" />
        ))}
      </div>
      {/* Chart area skeleton */}
      <Skeleton className="h-40 w-full rounded-xl" />
      {/* Metrics skeleton */}
      <div className="grid grid-cols-4 gap-2">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-16 rounded-xl" />)}
      </div>
    </div>
  );
}

/**
 * SubjectProgressChart
 *
 * Main component. Renders:
 * - Subject selector tabs (DSA / OOPS / APT / DBMS / OS / CN)
 * - Pure SVG line chart of mastery % over time (from topic_progress.last_practiced_at)
 * - Interactive tooltip with mastery / accuracy / questions on hover
 * - Current metric summary: Mastery, Accuracy, Questions Solved, Topics Practiced
 * - Loading / empty / error states
 *
 * Data source: GET /api/progress/subject/:code  (authenticated, req.user.id authoritative)
 */
export default function SubjectProgressChart() {
  const [activeCode, setActiveCode] = useState('DSA');
  const [dataCache, setDataCache] = useState({}); // { [code]: { summary, trend, subject } }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState(null); // { point, x, y }
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [chartW, setChartW] = useState(400);

  const activeSubject = SUBJECTS.find(s => s.code === activeCode) || SUBJECTS[0];

  // Measure container width for responsive chart
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect?.width;
      if (w && w > 0) setChartW(Math.max(200, w));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Fetch subject progress. Caches per-subject to avoid re-fetching on tab switch.
  const fetchSubjectData = useCallback(async (code, force = false) => {
    if (!force && dataCache[code]) {
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await progressService.getSubjectProgress(code);
      const res = response?.data || response;
      setDataCache(prev => ({ ...prev, [code]: res }));
    } catch (err) {
      console.error('[SubjectProgressChart] Fetch error:', err);
      setError(err.message || 'Failed to load progress data.');
    } finally {
      setLoading(false);
    }
  }, [dataCache]);

  // Load on mount and whenever activeCode changes
  useEffect(() => {
    fetchSubjectData(activeCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCode]);

  // Initial loading: no cache yet for current tab
  const isLoading = loading && !dataCache[activeCode];
  const currentData = dataCache[activeCode];
  const trend = currentData?.trend || [];
  const summary = currentData?.summary || null;

  // SVG hover interaction
  function handleSvgMouseMove(e) {
    if (!svgRef.current || trend.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    // Find nearest point
    const points = trend.map((d, i) => ({ ...d, x: toX(i, trend.length, chartW) }));
    let nearest = points[0];
    let minDist = Math.abs(points[0].x - svgX);
    for (const p of points) {
      const dist = Math.abs(p.x - svgX);
      if (dist < minDist) { minDist = dist; nearest = p; }
    }

    // Position tooltip relative to container
    const containerRect = containerRef.current?.getBoundingClientRect();
    const tipX = e.clientX - (containerRect?.left || 0);
    const tipY = e.clientY - (containerRect?.top || 0) - 90; // above cursor

    setTooltip({ point: nearest, x: tipX, y: tipY });
  }

  function handleSvgMouseLeave() {
    setTooltip(null);
  }

  return (
    <div className="space-y-4" ref={containerRef} style={{ position: 'relative' }}>

      {/* ── Subject Selector Tabs ── */}
      <div
        role="tablist"
        aria-label="Subject selector"
        className="flex flex-wrap gap-1.5"
      >
        {SUBJECTS.map(s => {
          const isActive = s.code === activeCode;
          return (
            <button
              key={s.code}
              role="tab"
              aria-selected={isActive}
              aria-controls={`subject-panel-${s.code}`}
              id={`subject-tab-${s.code}`}
              onClick={() => setActiveCode(s.code)}
              className={[
                'px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-400 cursor-pointer',
                isActive
                  ? `${s.activeBg} text-white border-transparent shadow-sm`
                  : `${s.bg} ${s.text} ${s.border} hover:opacity-80`
              ].join(' ')}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* ── Loading Skeleton ── */}
      {isLoading && <ChartSkeleton />}

      {/* ── Error State ── */}
      {!isLoading && error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between gap-3">
          <span>{error}</span>
          <button
            onClick={() => fetchSubjectData(activeCode, true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 transition-colors text-xs font-bold cursor-pointer"
          >
            <RefreshCw size={12} />
            Retry
          </button>
        </div>
      )}

      {/* ── Chart + Metrics ── */}
      {!isLoading && !error && (
        <div
          role="tabpanel"
          id={`subject-panel-${activeCode}`}
          aria-labelledby={`subject-tab-${activeCode}`}
        >
          {/* ── Line Chart ── */}
          {trend.length >= 2 ? (
            <div className="relative rounded-xl overflow-hidden bg-slate-50/60 border border-slate-200/70">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${chartW} ${CHART_H}`}
                width="100%"
                height={CHART_H}
                preserveAspectRatio="none"
                aria-label={`${activeSubject.label} mastery progress chart`}
                onMouseMove={handleSvgMouseMove}
                onMouseLeave={handleSvgMouseLeave}
                style={{ display: 'block', cursor: 'crosshair' }}
              >
                <GridLines chartW={chartW} />
                <TrendLine trend={trend} color={activeSubject.color} chartW={chartW} />
                <XLabels trend={trend} chartW={chartW} />
              </svg>

              {/* Tooltip */}
              {tooltip && (
                <Tooltip
                  point={tooltip.point}
                  color={activeSubject.color}
                  style={{
                    left: Math.min(tooltip.x, chartW - 160),
                    top: Math.max(4, tooltip.y),
                    position: 'absolute'
                  }}
                />
              )}
            </div>
          ) : trend.length === 1 ? (
            /* Single data point — show as a snapshot marker with no line */
            <div className="relative rounded-xl overflow-hidden bg-slate-50/60 border border-slate-200/70">
              <svg
                viewBox={`0 0 ${chartW} ${CHART_H}`}
                width="100%"
                height={CHART_H}
                preserveAspectRatio="none"
                aria-label={`${activeSubject.label} single practice snapshot`}
                style={{ display: 'block' }}
              >
                <GridLines chartW={chartW} />
                <circle
                  cx={toX(0, 1, chartW)}
                  cy={toY(trend[0].mastery, CHART_H)}
                  r={5}
                  fill={activeSubject.color}
                  stroke="white"
                  strokeWidth={2}
                />
                <text
                  x={toX(0, 1, chartW)}
                  y={CHART_H - CHART_PAD.bottom + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#94a3b8"
                  fontFamily="system-ui,sans-serif"
                >
                  {trend[0].label}
                </text>
              </svg>
              <p className="text-center text-[11px] text-slate-400 pb-2">
                Practice more to see your progress trend.
              </p>
            </div>
          ) : (
            /* No data yet */
            <div className="flex flex-col items-center justify-center gap-2 py-10 rounded-xl bg-slate-50/60 border border-slate-200/70 border-dashed text-center px-4">
              <TrendingUp size={22} className="text-slate-300" />
              <p className="text-xs font-semibold text-slate-400">
                Complete a few learning activities to see your {activeSubject.label} progress trend.
              </p>
            </div>
          )}

          {/* ── Current Subject Metrics Summary ── */}
          <div className="mt-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {currentData?.subject?.name || activeSubject.label} — Current Progress
            </p>
            {summary ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <MetricPill
                  icon={Target}
                  label="Current Mastery"
                  value={summary.mastery > 0 ? `${summary.mastery}%` : '—'}
                  color={activeSubject.text}
                />
                <MetricPill
                  icon={CheckCircle2}
                  label="Accuracy"
                  value={summary.accuracy > 0 ? `${summary.accuracy}%` : '—'}
                  color="text-emerald-600"
                />
                <MetricPill
                  icon={BarChart2}
                  label="Questions Solved"
                  value={summary.questions_solved > 0 ? summary.questions_solved : '—'}
                  color="text-sky-600"
                />
                <MetricPill
                  icon={BookOpen}
                  label="Topics Practiced"
                  value={summary.topics_practiced > 0 ? `${summary.topics_practiced} / ${summary.topics_total}` : '—'}
                  color="text-violet-600"
                />
              </div>
            ) : (
              /* No summary data — subject has no topic progress at all */
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Current Mastery', 'Accuracy', 'Questions Solved', 'Topics Practiced'].map(label => (
                  <div key={label} className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 min-w-0 flex-1">
                    <span className="text-sm font-bold text-slate-300">—</span>
                    <span className="text-[10px] text-slate-400 font-medium text-center leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
