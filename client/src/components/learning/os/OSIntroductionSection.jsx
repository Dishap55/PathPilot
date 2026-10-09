import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Clock,
  Zap,
  ShieldAlert,
  FileText,
  Check,
  Cpu,
  Workflow,
  Layers,
  Award,
  RotateCcw
} from 'lucide-react';
import { getOSTopicCards } from '../../../data/os/osTopicCardsData.js';
import { getOSTopic, OS_PRIMARY_PILLARS, OS_TOPIC_REGISTRY } from '../../../data/os/osTopicDataRegistry.js';
import OSVisualDiagram from './OSVisualDiagram.jsx';
import OSVFXEngine from './OSVFXEngine.jsx';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

/**
 * Determines if a card contains heavy visual/VFX components for content-aware sizing
 */
function isVfxCard(card) {
  if (!card) return false;
  return Boolean(
    card.vfxType ||
    card.cardNumber === 7 ||
    card.isNumerical ||
    card.diagramType === 'paging-mmu' ||
    card.diagramType === 'cpu-scheduling-flow' ||
    card.diagramType === 'rag-deadlock'
  );
}

/**
 * OSIntroductionSection Component
 * 10-Card Visual Classroom with 3D Depth Carousel & Interactive VFX Engine.
 * 
 * Strict 3-Card Depth Interaction (matching PathPilot DSA / OOPS / CN):
 * - Active Card: scale 1.0, zIndex 30, opacity 1.0, centered, fully interactive
 * - Previous Card: scale 0.88, zIndex 10, opacity 0.65, rotated +10deg, shifted left
 * - Next Card: scale 0.88, zIndex 10, opacity 0.65, rotated -10deg, shifted right (clearly waiting)
 * 
 * Content-Aware Sizing:
 * - VFX / Numerical cards: responsive width min(1100px, 92vw) and min-height 750px–860px desktop
 * - Normal theory cards: compact max-w-[840px] and min-height 600px–660px
 */
export default function OSIntroductionSection({
  topic,
  onSelectTopic,
  allTopics = []
}) {
  const topicId = topic?.slug || topic?.id || topic?.topicId || 'cpu-scheduling';
  const topicMeta = getOSTopic(topicId);
  const cards = getOSTopicCards(topicId);
  const totalCards = cards.length || 10;

  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [stepFlowIndex, setStepFlowIndex] = useState(0);
  const cardContainerRef = useRef(null);

  // Reset to Card 1 whenever topic changes
  useEffect(() => {
    setActiveIndex(0);
    setStepFlowIndex(0);
  }, [topicId]);

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
      // Don't trigger if user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
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

  // Find next topic in curriculum progression
  const currentTopicIndex = allTopics.findIndex(
    (t) => (t.slug || t.id) === topicId
  );
  const nextTopic = currentTopicIndex !== -1 && currentTopicIndex < allTopics.length - 1
    ? allTopics[currentTopicIndex + 1]
    : null;

  const handleMoveToNextTopic = () => {
    if (nextTopic && onSelectTopic) {
      onSelectTopic(nextTopic);
      // Smoothly scroll to the learning section
      const target = document.getElementById('subject-learning-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const activeCard = cards[activeIndex] || cards[0];
  const isCurrentVfx = isVfxCard(activeCard);

  // Responsive Carousel Card Spread Width
  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth < 1024;
  const isLargeScreen = windowWidth < 1440;

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
      id="os-section-introduction"
      ref={cardContainerRef}
      className="space-y-6 max-w-7xl mx-auto px-1 scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      {/* 1. TOPIC HEADER BANNER */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden border border-purple-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-400/30">
                {topicMeta?.categoryName || 'Operating Systems'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                Topic {topicMeta?.order || (currentTopicIndex !== -1 ? currentTopicIndex + 1 : 1)} of {allTopics.length || 6}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {topicMeta?.badge || topic?.level || 'Placement Pillar'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              {topic?.title || topicMeta?.topicName || 'Operating Systems Classroom'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {topic?.summary || topicMeta?.summary || 'Interactive visual classroom with 3D depth theory, numerical deep-dives, and placement benchmarks.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <AddNoteButton
              subject="OS"
              topicId={topicId}
              topicName={`${topic?.title || topicMeta?.topicName} - Card ${activeCard.cardNumber}: ${activeCard.title}`}
              section="introduction"
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
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 ring-2 ring-white/50 scale-105'
                    : i < activeIndex
                    ? 'bg-purple-950/70 text-purple-300 hover:bg-purple-900 border border-purple-500/30'
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

            // 3D Depth Matrix Transforms
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
                    ? 'border-purple-400/90 shadow-2xl shadow-purple-500/15 ring-1 ring-purple-500/20'
                    : 'border-slate-300/80 bg-slate-50/95 shadow-md hover:border-purple-400 hover:opacity-90'
                }`}
              >
                {/* PEEK OVERLAY FOR INACTIVE CARDS */}
                {!isActive && (
                  <div className="absolute inset-0 z-40 bg-slate-900/5 hover:bg-slate-900/0 transition-colors flex flex-col justify-between p-4 pointer-events-auto">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white text-[11px] font-black shadow-sm flex items-center gap-1">
                        {isPrev ? <ArrowLeft size={12} /> : null}
                        <span>{`Card ${card.cardNumber}: ${card.badge || card.title}`}</span>
                        {isNext ? <ArrowRight size={12} /> : null}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 bg-white/90 px-2 py-0.5 rounded-md shadow-xs">
                        Click to view
                      </span>
                    </div>
                  </div>
                )}

                {/* CARD HEADER */}
                <div className="px-5 sm:px-7 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-purple-50/30 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-purple-600/30 shrink-0">
                      {card.cardNumber}
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-100/70 px-2 py-0.5 rounded-md">
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
                        subject="OS"
                        topicId={topicId}
                        topicName={`${topic?.title || topicMeta?.topicName} - Card ${card.cardNumber}`}
                        section="introduction"
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
                      {/* Formal Definition */}
                      <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                          Formal Definition
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                          {card.definition}
                        </p>
                      </div>

                      {/* In Simple Words */}
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/80 rounded-2xl space-y-2">
                        <div className="flex items-center gap-1.5 text-purple-900 text-xs font-black uppercase tracking-wide">
                          <Lightbulb size={16} className="text-purple-600" /> In Simple Words
                        </div>
                        <p className="text-sm sm:text-base text-slate-900 font-semibold leading-relaxed">
                          {card.inSimpleWords}
                        </p>
                      </div>

                      {/* Why it belongs in OS */}
                      {card.whyInOS && (
                        <div className="p-3.5 bg-blue-50/70 border border-blue-200/70 rounded-2xl text-xs text-blue-950 space-y-1">
                          <span className="font-extrabold uppercase text-[10px] text-blue-800 block">
                            Why this belongs in Operating Systems
                          </span>
                          <p className="leading-relaxed font-medium">{card.whyInOS}</p>
                        </div>
                      )}

                      {/* Key Terms */}
                      {card.keyTerms && (
                        <div className="space-y-2">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                            Key Terminology
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {card.keyTerms.map((kt, kIdx) => (
                              <div key={kIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                                <span className="font-bold text-xs text-purple-700 block">{kt.term}</span>
                                <p className="text-[11px] text-slate-600 leading-snug">{kt.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Real-world Analogy */}
                      {card.analogy && (
                        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1 text-xs">
                          <span className="font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                            <Sparkles size={14} className="text-amber-600" /> Real-World Analogy
                          </span>
                          <p className="text-amber-950 font-medium leading-relaxed">{card.analogy}</p>
                        </div>
                      )}

                      {/* Visual Component */}
                      {card.diagramType && (
                        <div className="pt-1">
                          <OSVisualDiagram type={card.diagramType} title="Concept Overview" />
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
                          <Clock size={15} /> 2. What Goes Wrong Without It?
                        </span>
                        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                          {card.whatGoesWrong}
                        </p>
                      </div>

                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5">
                        <span className="text-xs font-black text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                          <CheckCircle2 size={15} /> 3. Operating System Solution & Benefit
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                          {card.osSolution}
                        </p>
                        {card.benefit && (
                          <div className="pt-1 text-xs text-emerald-900 font-bold">
                            Benefit: {card.benefit}
                          </div>
                        )}
                      </div>

                      {card.realWorldExample && (
                        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                          <strong className="text-slate-900 block font-bold mb-0.5">Real-world Computer Example:</strong>
                          {card.realWorldExample}
                        </div>
                      )}

                      {card.examTakeaway && (
                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-950 font-semibold">
                          💡 Exam Takeaway: {card.examTakeaway}
                        </div>
                      )}
                    </div>
                  )}

                  {/* CARD 3: HOW DOES IT WORK? */}
                  {card.cardNumber === 3 && (
                    <div className="space-y-4">
                      {card.mechanism && (
                        <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl text-xs text-purple-950 font-medium leading-relaxed">
                          <strong className="block font-black uppercase text-[10px] text-purple-800 mb-1">
                            Core Mechanism:
                          </strong>
                          {card.mechanism}
                        </div>
                      )}

                      {card.vfxType && (
                        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                          <OSVFXEngine
                            vfxType={card.vfxType}
                            topicId={topicId}
                            title={`${topic?.title || topicMeta?.topicName} - Core Simulation`}
                          />
                        </div>
                      )}

                      {card.stateTransitions && (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                            Key State Transitions / Workflow
                          </span>
                          <div className="space-y-1.5 text-xs">
                            {card.stateTransitions.map((tr, idx) => (
                              <div key={idx} className="p-2 bg-white rounded-lg border border-slate-200 text-slate-800 font-mono text-[11px] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                                <span>{tr}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {card.diagramType && !card.vfxType && (
                        <OSVisualDiagram type={card.diagramType} title="Operational Architecture" />
                      )}
                    </div>
                  )}

                  {/* CARD 4: INTERNAL STRUCTURE */}
                  {card.cardNumber === 4 && (
                    <div className="space-y-4">
                      {card.diagramType && (
                        <OSVisualDiagram type={card.diagramType} title="Internal Structure & Data Layout" />
                      )}

                      {card.structureDetails && (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 font-mono text-xs">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                            Internal Fields & Memory Specification
                          </span>
                          <div className="space-y-1.5">
                            {Object.entries(card.structureDetails).map(([key, val]) => (
                              <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 pb-1 border-b border-slate-200/60 last:border-none">
                                <span className="font-bold text-purple-700 shrink-0 min-w-[160px]">{key}:</span>
                                <span className="text-slate-800 text-[11px] sm:text-xs">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {card.componentRoles && (
                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-950">
                          <strong>System Role:</strong> {card.componentRoles}
                        </div>
                      )}
                    </div>
                  )}

                  {/* CARD 5: STEP-BY-STEP FLOW */}
                  {card.cardNumber === 5 && (
                    <div className="space-y-4">
                      {/* Scenario & Challenge */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                        <span className="text-xs font-black text-indigo-700 uppercase tracking-wide flex items-center gap-1.5">
                          <Zap size={14} /> Production Scenario
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{card.scenario}</h4>
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed">
                          <strong className="text-amber-900 block font-bold text-[10px] uppercase">Challenge:</strong>
                          {card.challenge}
                        </div>
                      </div>

                      {/* Interactive Step-by-Step Flow List */}
                      {card.flowSteps && (
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-slate-600">
                              Step-by-Step Execution Sequence
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setStepFlowIndex((prev) => Math.max(0, prev - 1))}
                                disabled={stepFlowIndex === 0}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                                  stepFlowIndex === 0
                                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300 cursor-pointer'
                                }`}
                              >
                                Previous Step
                              </button>
                              <button
                                type="button"
                                onClick={() => setStepFlowIndex((prev) => Math.min(card.flowSteps.length - 1, prev + 1))}
                                disabled={stepFlowIndex === card.flowSteps.length - 1}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                                  stepFlowIndex === card.flowSteps.length - 1
                                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                                    : 'bg-purple-600 text-white hover:bg-purple-700 border-purple-600 cursor-pointer'
                                }`}
                              >
                                Next Step
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {card.flowSteps.map((st, sIdx) => {
                              const isStepActive = sIdx === stepFlowIndex;
                              return (
                                <div
                                  key={sIdx}
                                  onClick={() => setStepFlowIndex(sIdx)}
                                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                                    isStepActive
                                      ? 'bg-purple-50/80 border-purple-500 shadow-xs ring-1 ring-purple-500/20'
                                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${
                                        isStepActive
                                          ? 'bg-purple-600 text-white'
                                          : 'bg-slate-200 text-slate-700'
                                      }`}
                                    >
                                      {st.num || sIdx + 1}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900">{st.action}</span>
                                  </div>
                                  <p className="text-xs text-slate-600 pl-7 mt-1 leading-relaxed">{st.detail}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {card.resolution && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 leading-relaxed">
                          <strong className="text-emerald-900 block font-bold text-[10px] uppercase">Final Outcome:</strong>
                          {card.resolution}
                        </div>
                      )}
                    </div>
                  )}

                  {/* CARD 6: NUMERICAL / TECHNICAL EXAMPLE */}
                  {card.cardNumber === 6 && (
                    <div className="space-y-4">
                      {/* Question Header */}
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl space-y-2">
                        <span className="text-xs font-black text-purple-900 uppercase tracking-wide flex items-center gap-1.5">
                          <Zap size={14} /> Solved Benchmark Problem
                        </span>
                        <p className="text-xs sm:text-sm text-slate-900 font-bold leading-relaxed">
                          {card.question}
                        </p>
                      </div>

                      {/* Given Data Table */}
                      {card.givenData && (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                            Given Parameters & Inputs
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {Object.entries(card.givenData).map(([key, val]) => (
                              <div key={key} className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between font-mono text-[11px]">
                                <span className="font-bold text-slate-700">{key}:</span>
                                <span className="font-semibold text-purple-700">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Mathematical Formula */}
                      {card.formula && (
                        <div className="p-3.5 bg-slate-900 text-purple-300 border border-slate-800 rounded-xl font-mono text-xs space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                            Governing Formulas & Rules
                          </span>
                          <div className="text-emerald-400 whitespace-pre-line font-bold">
                            {card.formula}
                          </div>
                        </div>
                      )}

                      {/* Step-by-Step Calculation Trace */}
                      {card.steps && (
                        <div className="space-y-2">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                            Step-by-Step Working & Intermediate Calculations
                          </span>
                          <div className="space-y-2 text-xs">
                            {card.steps.map((st) => (
                              <div key={st.stepNumber} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                                    {st.stepNumber}
                                  </span>
                                  <span className="font-bold text-slate-900">{st.title}</span>
                                </div>
                                <div className="text-slate-700 pl-7 font-mono text-[11px] whitespace-pre-line bg-slate-50 p-2 rounded-lg border border-slate-100">
                                  {st.detail}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Highlighted Final Answer */}
                      {card.finalAnswer && (
                        <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-2xl text-xs space-y-1 shadow-xs">
                          <span className="font-black text-emerald-900 uppercase tracking-wide text-[10px] block">
                            Final Answer & Placement Benchmark
                          </span>
                          <div className="text-emerald-950 font-bold whitespace-pre-line text-xs sm:text-sm font-mono">
                            {card.finalAnswer}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CARD 7: COMPLETE WORKING EXAMPLE / VFX */}
                  {card.cardNumber === 7 && (
                    <div className="space-y-4">
                      {card.fullWorkingFlow && (
                        <div className="p-3.5 bg-purple-50/80 border border-purple-200 rounded-2xl text-xs text-purple-950 leading-relaxed font-medium">
                          <span className="font-bold text-purple-900 block uppercase tracking-wide text-[10px] mb-1">
                            Full End-to-End Simulation
                          </span>
                          {card.fullWorkingFlow}
                        </div>
                      )}

                      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                        <OSVFXEngine
                          vfxType={card.vfxType || 'cpu-scheduling-sim'}
                          topicId={topicId}
                          title={`${topic?.title || topicMeta?.topicName} - Live Simulation`}
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
                            {tr.mistake || tr.wrong}
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
                            <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              Q
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                              {q.q || q.question}
                            </h4>
                          </div>

                          <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1.5">
                            <span className="text-[10px] font-black text-purple-900 uppercase tracking-wide block">
                              Model Answer (Placement Ready)
                            </span>
                            <p className="text-xs text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                              {q.a || q.expectedAnswer}
                            </p>
                          </div>

                          {(q.tip || q.interviewTrap) && (
                            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-950 font-medium">
                              <strong>Interviewer Pro-Tip:</strong> {q.tip || q.interviewTrap}
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
                          <div className="p-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl space-y-1 shadow-md">
                            <span className="text-[10px] font-black uppercase tracking-wider text-purple-200">
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

                          {card.cheatSheet.examShortcut && (
                            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-950">
                              <strong>Exam Shortcut:</strong> {card.cheatSheet.examShortcut}
                            </div>
                          )}

                          {card.cheatSheet.whenToUse && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
                              <strong>When to apply in real systems:</strong> {card.cheatSheet.whenToUse}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Bridge: Move to Next Topic Button (Strict requirement from Section 23) */}
                      <div className="pt-3 border-t border-slate-200">
                        {nextTopic ? (
                          <button
                            type="button"
                            onClick={handleMoveToNextTopic}
                            className="w-full py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer group"
                          >
                            <span>Move to Next Topic: <strong>{nextTopic.title}</strong></span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        ) : (
                          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                            <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-xs">
                              <Award size={16} className="text-emerald-600" />
                              <span>Curriculum Mastery Achieved!</span>
                            </div>
                            <p className="text-[11px] text-emerald-900">
                              You have reviewed all 10 cards across every Operating Systems curriculum pillar.
                            </p>
                          </div>
                        )}
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
                            ? 'w-7 bg-purple-600 shadow-xs'
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
                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 cursor-pointer'
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
              : 'hover:bg-purple-600 hover:text-white hover:scale-105 cursor-pointer'
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
              : 'hover:bg-purple-600 hover:text-white hover:scale-105 cursor-pointer'
          }`}
          aria-label="Next card"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
