import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Database,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Code2,
  Layers,
  Lightbulb,
  ShieldAlert,
  HelpCircle,
  Clock
} from 'lucide-react';
import { getDBMSTopicCards } from '../../../data/dbms/dbmsTopicCardsData.js';
import DBMSVisualDiagram from './DBMSVisualDiagram.jsx';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

/**
 * DBMSIntroductionSection Component
 * 10-Card Visual Classroom with 3D Depth Carousel (DSA/OOPS interaction pattern).
 * 
 * Features:
 * - 3-Card Visual Window (Previous | Active | Next)
 * - 3D Perspective, Scale, TranslateX, TranslateZ, RotateY, and Opacity
 * - Content-aware responsive layout (Vertical priority, side-by-side only where natural)
 * - Focused readable card width: min(760px, 72vw)
 * - Interactive peek card clicking & keyboard arrow navigation
 * - Automatic Card 1 reset on topic switch
 */
export default function DBMSIntroductionSection({
  topic,
  onGoToProblems,
  onGoToPractice
}) {
  const cards = getDBMSTopicCards(topic?.topicId);
  const totalCards = cards.length || 10;

  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const cardContainerRef = useRef(null);

  // Reset to Card 1 whenever topic changes
  useEffect(() => {
    setActiveIndex(0);
  }, [topic?.topicId]);

  // Window resize listener for responsive card spread width
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reduced motion media query listener
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => Math.min(totalCards - 1, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalCards]);

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < totalCards - 1) setActiveIndex(activeIndex + 1);
  };

  const handleCardChange = (newIdx) => {
    if (newIdx === activeIndex) return;
    setActiveIndex(newIdx);
  };

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard?.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  // Responsive Carousel Card Spread Width
  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth < 1024;
  const isLargeScreen = windowWidth < 1440;
  const cardSpread = isSmallScreen ? 150 : isMediumScreen ? 250 : isLargeScreen ? 340 : 400;

  const activeCard = cards[activeIndex] || cards[0];

  return (
    <div
      id="dbms-section-introduction"
      className="space-y-6 max-w-7xl mx-auto px-1 scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      {/* 1. TOPIC HEADER BANNER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                DBMS CORE TOPIC
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">Topic Introduction</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {topic?.topicName || 'Database Management Systems'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-600" /> 10-Card Depth Carousel
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
          Follow the 10-card visual learning pathway for <strong>{topic?.topicName}</strong>. Master foundational definitions, real-world schemas, SQL execution traces, interview traps, and rapid revision.
        </p>
      </div>

      {/* 2. 10-CARD 3D DEPTH CAROUSEL STAGE CONTAINER */}
      <div
        ref={cardContainerRef}
        className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5"
      >
        {/* Top Progress & Position Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Card {activeIndex + 1} of {totalCards}: {activeCard?.title}
              </h2>
              <p className="text-xs text-slate-500">
                Unit {activeIndex + 1} &bull; {activeCard?.badge || 'Core Lesson'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AddNoteButton
              subject="DBMS"
              topicId={topic?.topicId}
              topicName={topic?.topicName}
              section="Introduction"
              questionId={`intro_card_${activeIndex + 1}`}
              questionTitle={activeCard?.title}
              size="sm"
            />
            <div className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-800">
              {activeIndex + 1} / {totalCards}
            </div>
          </div>
        </div>

        {/* 3D Depth Carousel Stage (Strictly 3 Cards Windowed: Prev, Active, Next) */}
        <div className="relative h-[640px] sm:h-[600px] md:h-[580px] flex items-center justify-center overflow-hidden py-2">
          <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {cards.map((card, index) => {
              const diff = index - activeIndex;

              // Windowed 3-card render: Prev (-1), Active (0), Next (+1)
              if (Math.abs(diff) > 1) {
                return null;
              }

              const isActive = diff === 0;
              const xOffset = diff * cardSpread;
              const zOffset = isActive ? 0 : -90;
              const scale = isActive ? 1.0 : 0.86;
              const opacity = isActive ? 1 : 0.65;
              const zIndex = isActive ? 30 : 10;
              const rotateY = prefersReducedMotion ? 0 : diff * -10;

              return (
                <div
                  key={card.cardNumber || card.id || index}
                  onClick={() => {
                    if (!isActive) handleCardChange(index);
                  }}
                  style={{
                    transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transitionDuration: prefersReducedMotion ? '0ms' : undefined
                  }}
                  className={`absolute w-[94%] sm:w-[88%] md:w-[82%] lg:w-[76%] max-w-[720px] xl:max-w-[760px] h-full rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-500 ease-out border backdrop-blur-xl ${
                    isActive
                      ? 'bg-white border-emerald-300 shadow-2xl ring-1 ring-emerald-500/10'
                      : 'bg-slate-50/95 border-slate-200/90 shadow-md cursor-pointer hover:border-emerald-200'
                  }`}
                >
                  {/* Card Content Outer Scroll Container */}
                  <div className="space-y-4 overflow-y-auto scrollbar-none pr-1 flex-1">
                    {/* Top Header Badge & Counter */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                        {card.badge || `Step ${card.cardNumber || index + 1}`}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {card.cardNumber || index + 1} / {totalCards}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 block mb-0.5 uppercase tracking-wide">
                        Unit {card.cardNumber || index + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                        {card.title}
                      </h3>
                    </div>

                    {/* --------------------------------------------------- */}
                    {/* CONTENT-AWARE RENDERERS FOR CARDS 1 TO 10           */}
                    {/* --------------------------------------------------- */}

                    {/* CARD 1: WHAT IS IT? (Vertical content-first) */}
                    {card.cardNumber === 1 && (
                      <div className="space-y-3.5">
                        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                          <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-black uppercase tracking-wide">
                            <Lightbulb size={15} /> In Simple Words
                          </div>
                          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                            {card.inSimpleWords}
                          </p>
                        </div>

                        {card.analogy && (
                          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1">
                            <span className="text-[11px] font-black text-amber-800 uppercase tracking-wide">
                              Familiar Analogy
                            </span>
                            <p className="text-xs text-amber-950 font-medium leading-relaxed">
                              {card.analogy}
                            </p>
                          </div>
                        )}

                        {card.diagramType && (
                          <DBMSVisualDiagram type={card.diagramType} title="Architecture Visual" />
                        )}
                      </div>
                    )}

                    {/* CARD 2: WHY DO WE NEED IT? (Vertical 3-phase progression) */}
                    {card.cardNumber === 2 && (
                      <div className="space-y-3">
                        <div className="p-3.5 bg-red-50/80 border border-red-200 rounded-2xl space-y-1">
                          <span className="text-[11px] font-black text-red-800 uppercase tracking-wide">
                            1. The Problem
                          </span>
                          <p className="text-xs text-red-950 font-medium leading-relaxed">{card.problem}</p>
                        </div>

                        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1">
                          <span className="text-[11px] font-black text-amber-800 uppercase tracking-wide">
                            2. Why It Matters
                          </span>
                          <p className="text-xs text-amber-950 font-medium leading-relaxed">{card.whyItMatters}</p>
                        </div>

                        <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-1">
                          <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wide">
                            3. How DBMS Concept Solves It
                          </span>
                          <p className="text-xs text-emerald-950 font-medium leading-relaxed">{card.howSolves}</p>
                        </div>
                      </div>
                    )}

                    {/* CARD 3: HOW DOES IT WORK? */}
                    {card.cardNumber === 3 && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {card.steps?.map((st) => (
                            <div key={st.step} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                                  {st.step}
                                </span>
                                <h4 className="text-xs font-black text-slate-800">{st.title}</h4>
                              </div>
                              <p className="text-[11px] text-slate-600 font-medium pl-7 leading-relaxed">{st.desc}</p>
                            </div>
                          ))}
                        </div>

                        {card.diagramType && (
                          <DBMSVisualDiagram type={card.diagramType} title="Step Flow Diagram" />
                        )}
                      </div>
                    )}

                    {/* CARD 4: SYNTAX / STRUCTURE */}
                    {card.cardNumber === 4 && (
                      <div className="space-y-3">
                        {card.structureDetails && (
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs font-mono">
                            {Object.entries(card.structureDetails).map(([key, val]) => (
                              <div key={key} className="flex items-start gap-2">
                                <span className="font-bold text-emerald-700 shrink-0">{key}:</span>
                                <span className="text-slate-700">{val}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {card.codeSnippet && (
                          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#0F172A] text-slate-100">
                            <div className="bg-[#1E293B] px-3.5 py-1.5 flex items-center justify-between text-xs text-slate-300 font-mono">
                              <span className="text-[11px] font-bold text-emerald-400">SQL Syntax & Structure</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyCode(card.codeSnippet);
                                }}
                                className="flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
                              >
                                {copiedSnippet ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                {copiedSnippet ? 'Copied' : 'Copy SQL'}
                              </button>
                            </div>
                            <pre className="p-3.5 text-xs font-mono overflow-x-auto leading-relaxed text-emerald-300 whitespace-pre">
                              {card.codeSnippet}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CARD 5: REAL-WORLD EXAMPLE */}
                    {card.cardNumber === 5 && (
                      <div className="space-y-3">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                          <span className="text-xs font-black text-indigo-700 uppercase tracking-wide">
                            Industry Context
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">{card.scenario}</h4>
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed">
                            <strong className="text-amber-900 block font-bold text-[10px] uppercase">Challenge:</strong>
                            {card.challenge}
                          </div>
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 leading-relaxed">
                            <strong className="text-emerald-900 block font-bold text-[10px] uppercase">DBMS Solution:</strong>
                            {card.architectureSolution}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CARD 6: TYPES / VARIATIONS */}
                    {card.cardNumber === 6 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {card.variations?.map((v, idx) => (
                          <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                            <h4 className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                              {v.type}
                            </h4>
                            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{v.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CARD 7: COMPLETE WORKING EXAMPLE */}
                    {card.cardNumber === 7 && (
                      <div className="space-y-3">
                        {card.schema && (
                          <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-[11px] font-mono text-slate-700">
                            <strong>Schema:</strong> {card.schema}
                          </div>
                        )}

                        {card.query && (
                          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#0F172A] text-slate-100">
                            <div className="bg-[#1E293B] px-3.5 py-1.5 flex items-center justify-between text-xs text-slate-300 font-mono">
                              <span className="text-[11px] font-bold text-emerald-400">Executable Query</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyCode(card.query);
                                }}
                                className="flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
                              >
                                {copiedSnippet ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                {copiedSnippet ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                            <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre">
                              {card.query}
                            </pre>
                          </div>
                        )}

                        {card.result && Array.isArray(card.result) && (
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Expected Result</span>
                            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                              <table className="min-w-full text-xs font-mono border-collapse">
                                <thead className="bg-slate-50">
                                  <tr>
                                    {Object.keys(card.result[0] || {}).map((col) => (
                                      <th key={col} className="border border-slate-200 px-3 py-1.5 text-left font-bold text-slate-700">
                                        {col}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {card.result.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-slate-50">
                                      {Object.values(row).map((val, cIdx) => (
                                        <td key={cIdx} className="border border-slate-200 px-3 py-1.5 text-slate-800">
                                          {val === null ? <span className="text-slate-400 italic">NULL</span> : String(val)}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {card.executionFlow && (
                          <p className="text-xs text-slate-600 font-medium italic">
                            <strong>Execution Flow:</strong> {card.executionFlow}
                          </p>
                        )}
                      </div>
                    )}

                    {/* CARD 8: COMMON MISTAKES / TRAPS */}
                    {card.cardNumber === 8 && (
                      <div className="space-y-2.5">
                        {card.traps?.map((tr, idx) => (
                          <div key={idx} className="p-3.5 bg-slate-50 border border-red-200 rounded-2xl space-y-1.5">
                            <div className="p-2 bg-red-50 text-red-900 rounded-xl text-xs font-medium">
                              <strong className="text-red-700 block text-[10px] uppercase font-black">❌ Mistake:</strong>
                              {tr.wrong}
                            </div>
                            <div className="p-2 bg-amber-50 text-amber-900 rounded-xl text-xs font-medium">
                              <strong className="text-amber-700 block text-[10px] uppercase font-black">⚠️ Why It Fails:</strong>
                              {tr.why}
                            </div>
                            <div className="p-2 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-medium">
                              <strong className="text-emerald-700 block text-[10px] uppercase font-black">✅ Correct:</strong>
                              {tr.correct}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CARD 9: INTERVIEW / PLACEMENT ANGLE */}
                    {card.cardNumber === 9 && (
                      <div className="space-y-2.5">
                        {card.questions?.map((item, idx) => (
                          <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                            <div className="flex items-start gap-2">
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-black text-xs shrink-0">
                                Q{idx + 1}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.q}</h4>
                            </div>
                            <p className="text-xs text-slate-700 font-medium leading-relaxed pl-7 border-l-2 border-emerald-300">
                              {item.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CARD 10: QUICK REVISION CHEAT SHEET */}
                    {card.cardNumber === 10 && card.cheatSheet && (
                      <div className="p-4 bg-gradient-to-br from-emerald-50/60 to-teal-50/60 border-2 border-emerald-300 rounded-2xl space-y-2.5">
                        <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase">
                          <CheckCircle2 size={16} className="text-emerald-600" />
                          Topic Revision Cheat Sheet
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="p-2 bg-white/90 rounded-xl border border-slate-200">
                            <strong className="text-slate-800 block text-[10px] uppercase">Core Definition:</strong>
                            <span className="text-slate-700">{card.cheatSheet.definition}</span>
                          </div>
                          <div className="p-2 bg-white/90 rounded-xl border border-slate-200">
                            <strong className="text-emerald-800 block text-[10px] uppercase">Golden Rule:</strong>
                            <span className="text-slate-700">{card.cheatSheet.keyRule}</span>
                          </div>
                          {card.cheatSheet.comparison && (
                            <div className="p-2 bg-white/90 rounded-xl border border-slate-200">
                              <strong className="text-amber-800 block text-[10px] uppercase">Key Comparison:</strong>
                              <span className="text-slate-700">{card.cheatSheet.comparison}</span>
                            </div>
                          )}
                          {card.cheatSheet.commonTrap && (
                            <div className="p-2 bg-white/90 rounded-xl border border-slate-200">
                              <strong className="text-red-800 block text-[10px] uppercase">Watch Out For:</strong>
                              <span className="text-slate-700">{card.cheatSheet.commonTrap}</span>
                            </div>
                          )}
                          {card.cheatSheet.interviewKeyword && (
                            <div className="p-2 bg-white/90 rounded-xl border border-slate-200">
                              <strong className="text-indigo-800 block text-[10px] uppercase">Interview Keywords:</strong>
                              <span className="text-indigo-700 font-bold">{card.cheatSheet.interviewKeyword}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CAROUSEL BOTTOM CONTROLS & PROGRESS DOTS */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeIndex === 0
                ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 shadow-2xs'
            }`}
          >
            <ChevronLeft size={16} /> Previous Card
          </button>

          {/* 10 Progress Dots with Expanding Active Pill */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalCards }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCardChange(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'w-7 bg-emerald-600'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Jump to Card ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === totalCards - 1}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeIndex === totalCards - 1
                ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                : 'text-white bg-emerald-600 hover:bg-emerald-700 shadow-2xs'
            }`}
          >
            Next Card <ChevronRight size={16} />
          </button>
        </div>

        {/* BOTTOM ACTION BAR TO NEXT SECTION */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            Done with theory? Move to solved problem examples or start practicing.
          </p>
          <div className="flex items-center gap-2">
            {onGoToProblems && (
              <button
                type="button"
                onClick={onGoToProblems}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Problem Solving <ArrowRight size={14} />
              </button>
            )}
            {onGoToPractice && (
              <button
                type="button"
                onClick={onGoToPractice}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Practice Questions <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
