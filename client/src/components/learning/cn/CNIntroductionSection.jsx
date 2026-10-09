import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Network,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Layers,
  Lightbulb,
  ShieldAlert,
  HelpCircle,
  Clock,
  Play,
  RotateCcw,
  Zap,
  Globe,
  Radio,
  FileText
} from 'lucide-react';
import { getCNTopicCards } from '../../../data/cn/cnTopicCardsData.js';
import CNVisualDiagram from './CNVisualDiagram.jsx';
import CNVFXEngine from './vfx/CNVFXEngine.jsx';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

/**
 * Helper to determine if a card is VFX-heavy or interactive visualization
 */
function isVfxCard(card) {
  if (!card) return false;
  return Boolean(
    card.vfxType ||
    card.cardNumber === 3 ||
    card.cardNumber === 5 ||
    card.cardNumber === 7 ||
    card.diagramType
  );
}

/**
 * CNIntroductionSection Component
 * 10-Card Visual Classroom with 3D Depth Carousel & Interactive VFX Engine.
 * 
 * Strict 3-Card Depth Interaction (matching DSA & OOPS):
 * - Active Card: scale 1.0, zIndex 30, opacity 1.0, centered, fully visible content
 * - Previous Card: scale 0.88, zIndex 10, opacity 0.65, rotated +10deg, shifted left
 * - Next Card: scale 0.88, zIndex 10, opacity 0.65, rotated -10deg, shifted right (clearly waiting)
 * 
 * Content-Aware Sizing:
 * - VFX-heavy cards: responsive width min(1100px, 92vw) and min-height 750px–840px desktop
 * - Normal theory cards: compact max-w-[840px] and min-height 600px–660px
 */
export default function CNIntroductionSection({
  topic,
  onGoToProblems,
  onGoToPractice
}) {
  const cards = getCNTopicCards(topic?.topicId);
  const totalCards = cards.length || 10;

  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardContainerRef = useRef(null);

  // Reset to Card 1 whenever topic changes
  useEffect(() => {
    setActiveIndex(0);
  }, [topic?.topicId]);

  // Window resize listener
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

  const activeCard = cards[activeIndex] || cards[0];
  const isCurrentVfx = isVfxCard(activeCard);

  // Responsive Carousel Card Spread Width
  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth < 1024;
  const isLargeScreen = windowWidth < 1440;

  // Responsive spread calculated so peek cards are clearly visible on sides
  const cardSpread = isSmallScreen 
    ? (isCurrentVfx ? 130 : 150)
    : isMediumScreen 
    ? (isCurrentVfx ? 250 : 280)
    : isLargeScreen 
    ? (isCurrentVfx ? 370 : 400)
    : (isCurrentVfx ? 450 : 480);

  // Content-aware stage height
  const stageHeightClass = isCurrentVfx
    ? 'h-[780px] sm:h-[820px] md:h-[850px] lg:h-[880px]'
    : 'h-[600px] sm:h-[630px] md:h-[660px]';

  return (
    <div
      id="cn-section-introduction"
      ref={cardContainerRef}
      className="space-y-6 max-w-7xl mx-auto px-1 scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      {/* 1. TOPIC HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden border border-blue-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {topic?.categoryName || 'Computer Networks'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                Topic {topic?.order || 1} of 48
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {topic?.badge || 'Placement High-Yield'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              {topic?.topicName || 'Computer Networks Masterclass'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {topic?.summary || 'Interactive visual classroom with realistic packet flows, 3D depth theory, and interview benchmarks.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <AddNoteButton
              contextType="cn_topic"
              contextId={topic?.topicId}
              contextTitle={`${topic?.topicName} - Card ${activeCard.cardNumber}: ${activeCard.title}`}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            />
          </div>
        </div>

        {/* Card Progress Strip */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {cards.map((c, i) => (
              <button
                key={c.cardNumber}
                type="button"
                onClick={() => handleCardChange(i)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                  i === activeIndex
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40 ring-2 ring-white/50 scale-105'
                    : i < activeIndex
                    ? 'bg-blue-950/70 text-blue-300 hover:bg-blue-900 border border-blue-500/30'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
                title={`Card ${c.cardNumber}: ${c.title}`}
              >
                {c.cardNumber}
              </button>
            ))}
          </div>
          <div className="text-[11px] font-medium text-slate-400">
            Card <span className="font-bold text-white">{activeIndex + 1}</span> of {totalCards}
          </div>
        </div>
      </div>

      {/* 2. 3D DEPTH CAROUSEL CONTAINER (Strict 3-card window: Previous | Active | Next) */}
      <div className={`relative py-4 sm:py-6 overflow-hidden flex items-center justify-center transition-all duration-300 ${stageHeightClass}`}>
        {/* Carousel Viewport with 3D perspective */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: prefersReducedMotion ? 'none' : '1400px' }}
        >
          {cards.map((card, index) => {
            const diff = index - activeIndex;

            // STRICT RULE: Only render 3 cards (diff === -1, 0, 1). Hide all other 7 cards!
            if (Math.abs(diff) > 1) {
              return null;
            }

            const isActive = diff === 0;
            const isPrev = diff === -1;
            const isNext = diff === 1;

            // 3D Depth Matrix Transforms (matching DSA/OOPS)
            const xOffset = diff * cardSpread;
            const zOffset = isActive ? 0 : -90;
            const scale = isActive ? 1.0 : 0.88;
            const opacity = isActive ? 1.0 : 0.65;
            const zIndex = isActive ? 30 : 10;
            const rotateY = prefersReducedMotion ? 0 : diff * -10;

            // Content-aware width for this card
            const thisCardIsVfx = isVfxCard(card);
            const cardWidthClass = thisCardIsVfx
              ? 'w-[96%] sm:w-[94%] md:w-[92%] max-w-[1100px]'
              : 'w-[94%] sm:w-[88%] md:w-[82%] max-w-[840px] xl:max-w-[880px]';

            return (
              <div
                key={card.cardNumber}
                onClick={() => !isActive && handleCardChange(index)}
                style={{
                  transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: prefersReducedMotion
                    ? 'opacity 200ms ease'
                    : 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease, box-shadow 400ms ease',
                  cursor: isActive ? 'default' : 'pointer'
                }}
                className={`absolute top-0 ${cardWidthClass} h-full rounded-3xl bg-white border shadow-2xl overflow-hidden flex flex-col transition-all ${
                  isActive
                    ? 'border-blue-400/90 shadow-2xl shadow-blue-500/15 ring-1 ring-blue-500/20'
                    : 'border-slate-300/80 bg-slate-50/95 shadow-md hover:border-blue-400 hover:opacity-90'
                }`}
              >
                {/* PEEK OVERLAY FOR INACTIVE CARDS (Makes Previous/Next unmistakable) */}
                {!isActive && (
                  <div className="absolute inset-0 z-40 bg-slate-900/5 hover:bg-slate-900/0 transition-colors flex flex-col justify-between p-4 pointer-events-auto">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-black shadow-sm flex items-center gap-1">
                        {isPrev ? <ArrowLeft size={12} /> : null}
                        <span>{isPrev ? `Card ${card.cardNumber}` : `Card ${card.cardNumber}`}</span>
                        {isNext ? <ArrowRight size={12} /> : null}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 bg-white/90 px-2 py-0.5 rounded-md shadow-xs">
                        Click to view
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD HEADER */}
                <div className="px-5 sm:px-7 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-600/30 shrink-0">
                      {card.cardNumber}
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-md">
                        {card.badge || `CARD ${card.cardNumber}`}
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 line-clamp-1">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">
                      {card.cardNumber}/10
                    </span>
                    {isActive && (
                      <AddNoteButton
                        contextType="cn_card"
                        contextId={`${topic?.topicId}_c${card.cardNumber}`}
                        contextTitle={`${topic?.topicName} - Card ${card.cardNumber}`}
                        variant="ghost"
                        size="sm"
                      />
                    )}
                  </div>
                </div>

                {/* CARD BODY (Scrollable content) */}
                <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-4 text-slate-700">
                  {/* CARD 1: WHAT IS IT? */}
                  {card.cardNumber === 1 && (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl space-y-2">
                        <div className="flex items-center gap-1.5 text-blue-900 text-xs font-black uppercase tracking-wide">
                          <Lightbulb size={16} className="text-blue-600" /> In Simple Words
                        </div>
                        <p className="text-sm sm:text-base text-slate-900 font-semibold leading-relaxed">
                          {card.inSimpleWords}
                        </p>
                      </div>

                      {card.analogy && (
                        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1.5">
                          <span className="text-xs font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                            <Sparkles size={14} className="text-amber-600" /> Real-Life Analogy
                          </span>
                          <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                            {card.analogy}
                          </p>
                        </div>
                      )}

                      {card.diagramType && (
                        <div className="pt-1">
                          <CNVisualDiagram type={card.diagramType} title="Architecture Concept" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* CARD 2: WHY DO WE NEED IT? */}
                  {card.cardNumber === 2 && (
                    <div className="space-y-3.5">
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-1.5">
                        <span className="text-xs font-black text-rose-800 uppercase tracking-wide flex items-center gap-1.5">
                          <AlertCircle size={15} /> 1. The Core Problem
                        </span>
                        <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                          {card.problem}
                        </p>
                      </div>

                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-1.5">
                        <span className="text-xs font-black text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                          <Clock size={15} /> 2. Why It Matters in Distributed Systems
                        </span>
                        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                          {card.whyItMatters}
                        </p>
                      </div>

                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5">
                        <span className="text-xs font-black text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                          <CheckCircle2 size={15} /> 3. How Networking Concept Solves It
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                          {card.howSolves}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* CARD 3: HOW DOES IT WORK? (Major Visual Card / VFX) */}
                  {card.cardNumber === 3 && (
                    <div className="space-y-4">
                      {card.vfxType && (
                        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                          <CNVFXEngine
                            vfxType={card.vfxType}
                            topicId={topic?.topicId}
                            title={`${topic?.shortName || topic?.topicName} - Interactive Mechanics`}
                          />
                        </div>
                      )}

                      {card.steps && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {card.steps.map((st) => (
                            <div key={st.step} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                                  {st.step}
                                </span>
                                <h4 className="text-xs font-black text-slate-800">{st.title}</h4>
                              </div>
                              <p className="text-xs text-slate-600 font-medium pl-7 leading-relaxed">{st.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {card.diagramType && !card.vfxType && (
                        <CNVisualDiagram type={card.diagramType} title="Operational Architecture" />
                      )}
                    </div>
                  )}

                  {/* CARD 4: INTERNAL STRUCTURE (Exploded view / Headers) */}
                  {card.cardNumber === 4 && (
                    <div className="space-y-4">
                      {card.diagramType && (
                        <CNVisualDiagram type={card.diagramType} title="Packet Header Breakdown" />
                      )}

                      {card.structureDetails && (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 font-mono text-xs">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                            Header Fields & Bit Offsets
                          </span>
                          <div className="space-y-1.5">
                            {Object.entries(card.structureDetails).map(([key, val]) => (
                              <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 pb-1 border-b border-slate-200/60 last:border-none">
                                <span className="font-bold text-blue-700 shrink-0 min-w-[140px]">{key}:</span>
                                <span className="text-slate-800 text-[11px] sm:text-xs">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CARD 5: STEP-BY-STEP FLOW (Horizontal packet movement) */}
                  {card.cardNumber === 5 && (
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                        <span className="text-xs font-black text-indigo-700 uppercase tracking-wide flex items-center gap-1.5">
                          <Zap size={14} /> Production Scenario & Resolution
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{card.scenario}</h4>
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed">
                          <strong className="text-amber-900 block font-bold text-[10px] uppercase">Challenge:</strong>
                          {card.challenge}
                        </div>
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 leading-relaxed">
                          <strong className="text-emerald-900 block font-bold text-[10px] uppercase">Protocol Resolution:</strong>
                          {card.resolution}
                        </div>
                      </div>

                      {card.vfxType && (
                        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                          <CNVFXEngine
                            vfxType={card.vfxType}
                            topicId={topic?.topicId}
                            title={`${topic?.shortName || topic?.topicName} - Step-by-Step Flow`}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* CARD 6: REAL-WORLD TECHNICAL EXAMPLE */}
                  {card.cardNumber === 6 && (
                    <div className="space-y-3.5">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-2xl space-y-2">
                        <span className="text-xs font-black text-blue-800 uppercase tracking-wide">
                          Concrete Technical Values & Packet Capture
                        </span>
                        <p className="text-xs text-slate-600">
                          Real hex offsets, addresses, and network identifiers encountered in live telemetry:
                        </p>
                      </div>

                      {card.exampleValues && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {Object.entries(card.exampleValues).map(([key, val]) => (
                            <div key={key} className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs space-y-1 shadow-inner">
                              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block font-sans">
                                {key}
                              </span>
                              <div className="text-emerald-300 font-semibold break-all">
                                {val}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* CARD 7: COMPLETE WORKING FLOW / VFX */}
                  {card.cardNumber === 7 && (
                    <div className="space-y-4">
                      <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs text-indigo-950 leading-relaxed">
                        <span className="font-bold text-indigo-900 block uppercase tracking-wide text-[10px] mb-1">
                          Full End-to-End Simulation
                        </span>
                        {card.fullWorkingFlow}
                      </div>

                      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                        <CNVFXEngine
                          vfxType={card.vfxType || 'packet-travel'}
                          topicId={topic?.topicId}
                          title={`${topic?.shortName || topic?.topicName} - Complete Live Simulation`}
                        />
                      </div>
                    </div>
                  )}

                  {/* CARD 8: COMMON MISTAKES & TRAPS */}
                  {card.cardNumber === 8 && (
                    <div className="space-y-3">
                      {card.traps?.map((tr, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950">
                            <strong className="text-rose-900 font-bold block text-[10px] uppercase flex items-center gap-1">
                              <ShieldAlert size={12} /> Common Trap / Misconception:
                            </strong>
                            {tr.wrong}
                          </div>
                          {tr.why && (
                            <p className="text-[11px] text-slate-600 px-1">
                              <strong>Why students fail:</strong> {tr.why}
                            </p>
                          )}
                          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                            <strong className="text-emerald-900 font-bold block text-[10px] uppercase flex items-center gap-1">
                              <CheckCircle2 size={12} /> Correct Technical Reality:
                            </strong>
                            {tr.correct}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CARD 9: INTERVIEW & PLACEMENT ANGLE */}
                  {card.cardNumber === 9 && (
                    <div className="space-y-3">
                      {card.questions?.map((q, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              Q
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                              {q.q}
                            </h4>
                          </div>

                          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5">
                            <span className="text-[10px] font-black text-blue-900 uppercase tracking-wide block">
                              Model Answer (Placement Ready)
                            </span>
                            <p className="text-xs text-slate-800 leading-relaxed font-medium">
                              {q.a}
                            </p>
                          </div>

                          {q.tip && (
                            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-950 font-medium">
                              <strong>Interviewer Pro-Tip:</strong> {q.tip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CARD 10: QUICK REVISION & CHEAT SHEET */}
                  {card.cardNumber === 10 && (
                    <div className="space-y-4">
                      {card.cheatSheet && (
                        <div className="space-y-3">
                          <div className="p-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl space-y-1 shadow-md">
                            <span className="text-[10px] font-black uppercase tracking-wider text-blue-200">
                              Core Rule
                            </span>
                            <p className="text-xs sm:text-sm font-bold leading-snug">
                              {card.cheatSheet.keyRule}
                            </p>
                          </div>

                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                            <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                              High-Yield Summary Points
                            </span>
                            <ul className="space-y-1.5 text-xs text-slate-700">
                              {card.cheatSheet.summaryPoints?.map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2">
                                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {card.cheatSheet.whenToUse && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
                              <strong>When to apply in interviews / architectures:</strong> {card.cheatSheet.whenToUse}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Bridge to Problem Solving / Practice */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={onGoToProblems}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>Solve Benchmark Scenarios</span>
                          <ArrowRight size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={onGoToPractice}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                        >
                          <span>Practice Topic MCQs & Diagrams</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* CARD FOOTER CONTROLS */}
                <div className="px-5 sm:px-7 py-3.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    disabled={activeIndex === 0}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      activeIndex === 0
                        ? 'opacity-30 cursor-not-allowed text-slate-400'
                        : 'text-slate-700 hover:bg-white hover:shadow-sm cursor-pointer'
                    }`}
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {cards.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardChange(i);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          i === activeIndex
                            ? 'w-7 bg-blue-600 shadow-xs'
                            : 'w-2 bg-slate-300 hover:bg-slate-400'
                        }`}
                        title={`Go to card ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    disabled={activeIndex === totalCards - 1}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      activeIndex === totalCards - 1
                        ? 'opacity-30 cursor-not-allowed text-slate-400'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 cursor-pointer'
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Deck Left/Right Arrows for Easy Clicking */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`absolute left-2 sm:left-4 z-40 w-11 h-11 rounded-full bg-white/95 backdrop-blur border border-slate-200 shadow-xl flex items-center justify-center text-slate-700 transition-all ${
            activeIndex === 0
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:bg-blue-600 hover:text-white hover:scale-105 cursor-pointer'
          }`}
          aria-label="Previous card"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === totalCards - 1}
          className={`absolute right-2 sm:right-4 z-40 w-11 h-11 rounded-full bg-white/95 backdrop-blur border border-slate-200 shadow-xl flex items-center justify-center text-slate-700 transition-all ${
            activeIndex === totalCards - 1
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:bg-blue-600 hover:text-white hover:scale-105 cursor-pointer'
          }`}
          aria-label="Next card"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
