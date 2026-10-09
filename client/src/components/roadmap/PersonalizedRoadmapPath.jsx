import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  ArrowLeftRight,
  LayoutGrid,
  Hash,
  GitFork,
  Layers,
  Code2,
  Trophy,
  Check,
  Circle,
  Calculator
} from 'lucide-react';

/**
 * Helper to get visual topic icon and color palette matching Reference Image 2
 */
function getTopicVisuals(title = '', subject = '') {
  const lowerTitle = title.toLowerCase();
  const sub = (subject || '').toUpperCase();
  
  if (lowerTitle.includes('aptitude') || sub === 'APT' || sub === 'APTITUDE') {
    return {
      icon: Calculator,
      boxBg: 'bg-amber-100/80 border-amber-200/90 text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200'
    };
  }
  if (lowerTitle.includes('pointer')) {
    return {
      icon: ArrowLeftRight,
      boxBg: 'bg-sky-100/80 border-sky-200/90 text-sky-600',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200'
    };
  }
  if (lowerTitle.includes('sort')) {
    return {
      icon: Sparkles,
      boxBg: 'bg-rose-100/80 border-rose-200/90 text-rose-600',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200'
    };
  }
  if (lowerTitle.includes('binary') || lowerTitle.includes('search')) {
    return {
      icon: LayoutGrid,
      boxBg: 'bg-amber-100/80 border-amber-200/90 text-amber-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200'
    };
  }
  if (lowerTitle.includes('list') || lowerTitle.includes('linked')) {
    return {
      icon: Code2,
      boxBg: 'bg-indigo-100/80 border-indigo-200/90 text-indigo-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
  }
  if (lowerTitle.includes('tree') || lowerTitle.includes('bst')) {
    return {
      icon: GitFork,
      boxBg: 'bg-emerald-100/80 border-emerald-200/90 text-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
  }
  if (lowerTitle.includes('graph') || lowerTitle.includes('bfs') || lowerTitle.includes('dfs')) {
    return {
      icon: Hash,
      boxBg: 'bg-cyan-100/80 border-cyan-200/90 text-cyan-600',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    };
  }
  if (lowerTitle.includes('dynamic') || lowerTitle.includes('dp')) {
    return {
      icon: Layers,
      boxBg: 'bg-indigo-100/80 border-indigo-200/90 text-indigo-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
  }

  // Default fallback
  return {
    icon: Code2,
    boxBg: 'bg-indigo-100/80 border-indigo-200/90 text-indigo-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  };
}

function getTopicRoute(topic, idx) {
  const sub = (topic.subject || '').toUpperCase();
  const titleLower = (topic.title || topic.name || '').toLowerCase();

  // Aptitude Routing -> Maps directly to dedicated Aptitude Learning Page
  if (sub === 'APT' || sub === 'APTITUDE' || titleLower.includes('aptitude') || topic.route?.includes('/aptitude')) {
    const tId = topic.topicId || (
      titleLower.includes('percent') ? 'percentages' :
      titleLower.includes('profit') ? 'profit-and-loss' :
      titleLower.includes('ratio') ? 'ratio-and-proportion' :
      titleLower.includes('work') ? 'time-and-work' :
      titleLower.includes('average') ? 'average' :
      titleLower.includes('interest') ? 'simple-interest' :
      titleLower.includes('series') ? 'number-series' :
      titleLower.includes('blood') ? 'blood-relations' :
      titleLower.includes('syllogism') ? 'syllogism' :
      titleLower.includes('grammar') ? 'grammar' :
      null
    );
    return tId ? `/aptitude?topic=${tId}` : '/aptitude';
  }

  // OOPS Routing -> Maps directly to dedicated OOPS Learning Page
  if (sub === 'OOPS' || sub === 'OOP' || titleLower.includes('oops') || titleLower.includes('object-oriented') || titleLower.includes('object oriented')) {
    const tId = topic.topicId || (
      titleLower.includes('class') ? 'classes-and-objects' :
      titleLower.includes('encapsulat') ? 'encapsulation' :
      titleLower.includes('abstract') ? 'abstraction' :
      titleLower.includes('inherit') ? 'inheritance' :
      titleLower.includes('polymorph') ? 'polymorphism' :
      titleLower.includes('constructor') ? 'constructors' :
      titleLower.includes('overload') ? 'method-overloading' :
      titleLower.includes('overrid') ? 'method-overriding' :
      null
    );
    return tId ? `/subjects/oops?topic=${tId}` : '/subjects/oops';
  }

  const tId = topic.topicId || (
    topic.title?.toLowerCase().includes('two pointer') ? 'two-pointers' :
    topic.title?.toLowerCase().includes('sort') ? 'sorting' :
    topic.title?.toLowerCase().includes('binary search') ? 'binary-search' :
    topic.title?.toLowerCase().includes('linked') ? 'linked-list' :
    topic.title?.toLowerCase().includes('tree') || topic.title?.toLowerCase().includes('bst') ? 'trees' :
    topic.title?.toLowerCase().includes('graph') || topic.title?.toLowerCase().includes('bfs') || topic.title?.toLowerCase().includes('dfs') ? 'graphs' :
    topic.title?.toLowerCase().includes('dp') || topic.title?.toLowerCase().includes('dynamic') ? 'dp' :
    null
  );

  if (tId && (sub === 'DSA' || !sub)) {
    return `/subjects/dsa?topic=${tId}`;
  }
  return topic.route || `/roadmap/milestone/${topic.id || idx + 1}`;
}

export default function PersonalizedRoadmapPath({ topics = [] }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (!topics || topics.length === 0) return null;

  // Generate dynamic Winding SVG Path
  // Each topic item takes approx 140px vertical height
  const itemHeight = 140;
  const startY = 40;
  const totalHeight = startY + topics.length * itemHeight + 60;
  
  // X offsets for alternating winding path on left timeline column (width ~100px)
  const nodePositions = topics.map((_, index) => {
    const y = startY + index * itemHeight + 40;
    // Winding wave coordinates alternating left and right
    const waveOffsets = [45, 25, 55, 30, 50, 35];
    const x = waveOffsets[index % waveOffsets.length];
    return { x, y };
  });

  const startNode = { x: 40, y: 15 };
  const goalNode = { x: 40, y: totalHeight - 20 };

  // Construct SVG Path string M x0 y0 C x1 y1, x2 y2...
  let svgPath = `M ${startNode.x} ${startNode.y} `;
  let prevPoint = startNode;

  nodePositions.forEach((pt) => {
    const cpY1 = prevPoint.y + (pt.y - prevPoint.y) / 2;
    const cpY2 = prevPoint.y + (pt.y - prevPoint.y) / 2;
    svgPath += `C ${prevPoint.x} ${cpY1}, ${pt.x} ${cpY2}, ${pt.x} ${pt.y} `;
    prevPoint = pt;
  });

  // Connect to Goal Node
  const finalCpY1 = prevPoint.y + (goalNode.y - prevPoint.y) / 2;
  const finalCpY2 = prevPoint.y + (goalNode.y - prevPoint.y) / 2;
  svgPath += `C ${prevPoint.x} ${finalCpY1}, ${goalNode.x} ${finalCpY2}, ${goalNode.x} ${goalNode.y}`;

  return (
    <div className="relative w-full max-w-5xl mx-auto my-4 py-2">
      {/* Background Soft Glow & Wave Elements (Matching Reference Image 1) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-100/30 blur-3xl" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left Column: Flowing Winding Path with SVG & Nodes (3 cols on desktop) */}
        <div className="hidden md:flex md:col-span-3 flex-col items-center relative" style={{ height: `${totalHeight}px` }}>
          
          {/* 1. START YOUR JOURNEY ANNOTATION (Collision Fixed: Positioned to the Upper-Left with Arrow) */}
          <div
            style={{
              left: `calc(${startNode.x}% - 145px)`,
              top: `${startNode.y - 14}px`
            }}
            className="absolute z-30 hidden lg:flex items-center gap-1.5 whitespace-nowrap text-[12px] font-extrabold text-indigo-600 font-serif italic select-none pointer-events-none"
          >
            <span>Start your journey</span>
            <svg className="w-5 h-5 text-indigo-500 rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M 3 12 Q 12 18 19 12" strokeLinecap="round" />
              <path d="M 14 16 L 20 12 L 15 8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* SVG Winding Road & Moving Energy Ray */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox={`0 0 100 ${totalHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="40%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>

            {/* Background Path Track */}
            <path
              d={svgPath}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Glowing Active Path Overlay */}
            <path
              d={svgPath}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Infinite Moving Energy Ray Particle */}
            {!prefersReducedMotion && (
              <motion.circle
                r="4.5"
                fill="#6366F1"
                filter="drop-shadow(0 0 8px #6366F1)"
                animate={{
                  offsetDistance: ['0%', '100%']
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  offsetPath: `path("${svgPath}")`
                }}
              />
            )}
          </svg>

          {/* 2. START NODE (Dynamic Subtle Scale & Glow Pulse) */}
          <motion.div
            style={{ left: `${startNode.x}%`, top: `${startNode.y}px` }}
            animate={!prefersReducedMotion ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
          >
            <div className="absolute w-10 h-10 rounded-full bg-emerald-400/30 animate-pulse" />
            <div className="relative w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-emerald-100 shadow-md">
              <Check size={16} strokeWidth={3} />
            </div>
          </motion.div>

          {/* 3. DYNAMIC TOPIC STATUS NODES (DONE, IN_PROGRESS, NOT_STARTED) */}
          {topics.map((topic, idx) => {
            const pos = nodePositions[idx] || { x: 40, y: startY + idx * itemHeight };
            const status = (topic.status || 'not_started').toLowerCase();
            const isDone = status === 'done' || status === 'completed';
            const isInProgress = status === 'in_progress' || status === 'unlocked';

            return (
              <React.Fragment key={topic.id || idx}>
                {isDone ? (
                  /* DONE NODE: Subtle scale & ring glow pulse */
                  <motion.div
                    style={{ left: `${pos.x}%`, top: `${pos.y}px` }}
                    animate={!prefersReducedMotion ? { scale: [1, 1.03, 1] } : {}}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                  >
                    <div className="absolute w-9 h-9 rounded-full bg-emerald-400/20" />
                    <div className="relative w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-emerald-100 shadow-md">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  </motion.div>
                ) : isInProgress ? (
                  /* IN_PROGRESS NODE: Strongest pulse & glowing halo ring */
                  <motion.div
                    style={{ left: `${pos.x}%`, top: `${pos.y}px` }}
                    animate={!prefersReducedMotion ? { scale: [1, 1.06, 1] } : {}}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                  >
                    <span className="absolute w-11 h-11 rounded-full bg-indigo-500/30 animate-ping" />
                    <div className="relative w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center border-4 border-indigo-100 shadow-lg shadow-indigo-500/40 z-10">
                      <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
                    </div>
                  </motion.div>
                ) : (
                  /* NOT_STARTED NODE: Mostly static with subtle hover */
                  <div
                    style={{ left: `${pos.x}%`, top: `${pos.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                  >
                    <div className="w-7 h-7 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center shadow-xs">
                      <Circle size={10} className="fill-slate-300 text-slate-300" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* 4. GOAL NODE (Infinity Symbol with Glow Pulse) */}
          <motion.div
            style={{ left: `${goalNode.x}%`, top: `${goalNode.y}px` }}
            animate={!prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
          >
            <div className="absolute w-11 h-11 rounded-full bg-purple-500/30 animate-pulse" />
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center border-4 border-indigo-100 shadow-lg">
              <span className="text-base font-black leading-none">∞</span>
            </div>
          </motion.div>

          {/* 5. YOUR GOAL ANNOTATION (Collision Fixed: Positioned to the Upper-Left with Arrow) */}
          <div
            style={{
              left: `calc(${goalNode.x}% - 115px)`,
              top: `${goalNode.y - 14}px`
            }}
            className="absolute z-30 hidden lg:flex items-center gap-1.5 whitespace-nowrap text-[12px] font-extrabold text-indigo-600 font-serif italic select-none pointer-events-none"
          >
            <span>Your goal</span>
            <svg className="w-5 h-5 text-indigo-500 -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M 3 12 Q 10 6 18 10" strokeLinecap="round" />
              <path d="M 13 6 L 19 10 L 14 14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Right Column: Topic Cards Container */}
        <div className="col-span-12 md:col-span-9 space-y-4">
          {topics.map((topic, idx) => {
            const status = (topic.status || 'not_started').toLowerCase();
            const isDone = status === 'done' || status === 'completed';
            const isInProgress = status === 'in_progress' || status === 'unlocked';
            
            const completedCount = topic.completedQuestions ?? (isDone ? (topic.totalQuestions || 8) : isInProgress ? Math.round((topic.totalQuestions || 10) * 0.6) : 0);
            const totalCount = topic.totalQuestions || 10;

            const visuals = getTopicVisuals(topic.title || topic.name || '', topic.subject);
            const Icon = visuals.icon;

            const tags = topic.tags || topic.subtopics || [
              topic.subject || 'DSA',
              isDone ? 'Mastered' : isInProgress ? 'Practice Questions' : 'Concept'
            ];

            const targetRoute = getTopicRoute(topic, idx);

            return (
              <div key={topic.id || idx} className="relative">
                {/* Mobile Connector Line & Annotation Badges for Mobile Viewports */}
                {idx === 0 && (
                  <div className="md:hidden flex items-center justify-between px-2 mb-2 text-xs font-bold text-indigo-600 font-serif italic">
                    <span>✨ Start your journey</span>
                  </div>
                )}

                {idx < topics.length - 1 && (
                  <div className="md:hidden absolute left-6 top-16 bottom-0 w-0.5 bg-slate-200 z-0" />
                )}

                {/* Main Topic Card (Matching Reference Image 2) */}
                <div
                  className={`group relative z-10 bg-white/95 backdrop-blur-md border rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isInProgress
                      ? 'border-indigo-300 ring-2 ring-indigo-100/80 bg-gradient-to-r from-white via-indigo-50/20 to-white'
                      : isDone
                      ? 'border-emerald-200/90 bg-white'
                      : 'border-slate-200/80 bg-white/90'
                  }`}
                >
                  {/* Left Section: Icon Box + Details */}
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    {/* Category Icon Box */}
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs ${visuals.boxBg}`}>
                      <Icon size={22} />
                    </div>

                    {/* Topic Details */}
                    <div className="min-w-0 space-y-1">
                      <Link to={targetRoute} className="block group-hover:text-indigo-600 transition-colors">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                          {topic.title || topic.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-500 line-clamp-1 leading-normal">
                        {topic.description || topic.summary || 'Master concepts, patterns, and real interview practice.'}
                      </p>

                      {/* Sub-Badges / Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100/90 text-slate-600 border border-slate-200/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Status Pill + Progress + CTA Arrow */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Progress Info & Status Pill */}
                    <div className="flex flex-col items-start sm:items-end space-y-1">
                      {isDone ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-200 shadow-xs">
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          <span>Done</span>
                        </span>
                      ) : isInProgress ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100/90 text-indigo-800 border border-indigo-200 shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                          <span>In Progress</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          <Circle size={10} className="text-slate-400" />
                          <span>Not Started</span>
                        </span>
                      )}

                      <span className="text-[11px] font-bold text-slate-500">
                        {completedCount}/{totalCount} questions
                      </span>
                    </div>

                    {/* Action Link Arrow Button */}
                    <Link
                      to={targetRoute}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 active:scale-95 transition-all shadow-xs cursor-pointer"
                      title={`Open ${topic.title || 'Topic'}`}
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>

                {idx === topics.length - 1 && (
                  <div className="md:hidden flex items-center justify-between px-2 mt-2 text-xs font-bold text-indigo-600 font-serif italic">
                    <span>🎯 Your goal</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Placement Ready Goal Banner (Matching Reference Image 2) */}
          <div className="mt-6 bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-sky-50/90 border border-indigo-100/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <Trophy size={24} />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Placement Ready
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Be ready for TCS and other top tech companies.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-indigo-200 text-indigo-700 font-bold text-xs shadow-xs">
              <Sparkles size={14} className="text-amber-500 animate-pulse" />
              <span>Keep going at your own pace!</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
