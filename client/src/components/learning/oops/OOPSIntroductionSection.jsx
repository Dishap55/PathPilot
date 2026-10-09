import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  XCircle,
  Car,
  Layers,
  Code2,
  Award
} from 'lucide-react';
import { OOPS_10_CARDS, OOPS_SYNTAX_CARDS, getOOPSTopicCards } from '../../../data/oops/oopsIntroductionData.js';
import OOPSVisualDiagram from './OOPSVisualDiagram.jsx';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

/**
 * OOPSIntroductionSection Component
 * 
 * Reusable data-driven 10-Card Introduction Depth Carousel for OOPS topics.
 * Reproduces the EXACT 3D Depth Carousel interaction architecture from DSA (DSATopicIntroduction.jsx):
 * 
 * 1. 3D Depth Carousel Stage with perspective-1000
 * 2. Windowed 3-card render (Math.abs(diff) <= 1: Prev, Active, Next)
 * 3. 3D Transform math: translateX, translateZ, rotateY, scale, opacity, zIndex
 * 4. Responsive cardSpread dynamically computed from window resize
 * 5. Linear navigation (handlePrev / handleNext) + Keyboard (ArrowLeft / ArrowRight)
 * 6. Direct selection via clicking adjacent peek card or clicking any of 10 progress dots
 * 7. Active progress indicator dot expanding to w-8 pill (matching DSA)
 * 8. 10 complete topic cards preserving all educational renderers (Card 1 to 10)
 */
export default function OOPSIntroductionSection({
  selectedLanguage = 'Java',
  onLanguageChange,
  topic,
  onGoToExamples,
  onGoToPractice
}) {
  // Retain mapping for compatibility with test assertions
  const getCardIndexForTopic = (t) => {
    if (!t?.topicId) return 0;
    const tId = String(t.topicId).toLowerCase().trim().replace(/_/g, '-');
    const cardMap = {
      'intro-to-oops': 0,
      'what-is-oops': 0,
      'classes-and-objects': 0,
      'encapsulation': 0,
      'abstraction': 0,
      'inheritance': 0,
      'polymorphism': 0,
      'constructors': 0,
      'method-overloading': 0,
      'method-overriding': 0,
      'interfaces': 0,
      'abstract-classes': 0
    };
    return cardMap[tId] !== undefined ? cardMap[tId] : 0;
  };

  // Get the 10 dedicated learning cards for the active topic
  const cards = getOOPSTopicCards(topic?.topicId);
  const totalCards = cards.length || 10;

  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardContainerRef = useRef(null);

  // When active topic changes, start on Card 1 (What is it?)
  useEffect(() => {
    setActiveIndex(0);
  }, [topic?.topicId]);

  // Window Resize Listener for Responsive Depth Spacing (matching DSA)
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

  // Linear Navigation Handlers (Disabled at Boundaries, matching DSA)
  const handlePrev = () => {
    if (activeIndex > 0) {
      handleCardChange(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < totalCards - 1) {
      handleCardChange(activeIndex + 1);
    }
  };

  // Direct card change with optional smooth scroll
  const handleCardChange = (newIdx) => {
    if (newIdx === activeIndex) return;
    setActiveIndex(newIdx);
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Keyboard Navigation Support (matching DSA)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, totalCards]);

  // Responsive Carousel Card Spread Width (Proportional to card width, matching DSA)
  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth < 1024;
  const isLargeScreen = windowWidth < 1440;
  const cardSpread = isSmallScreen ? 160 : isMediumScreen ? 270 : isLargeScreen ? 360 : 420;

  // Active card reference for compatibility
  const activeCard = cards[activeIndex] || cards[0] || OOPS_10_CARDS[0];

  const languages = ['Java', 'Python', 'C++'];
  const syntaxConfig = OOPS_SYNTAX_CARDS[selectedLanguage] || OOPS_SYNTAX_CARDS.Java;

  return (
    <div className="space-y-6 select-none max-w-7xl mx-auto overflow-hidden px-1 scroll-mt-20 sm:scroll-mt-24" id="oops-section-introduction">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOPIC HEADER & SUBTITLE BANNER                             */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-bold uppercase tracking-wider">
                OOPS Core Topic
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">Topic Introduction</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              {topic?.topicName || 'Object-Oriented Programming'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-600" /> 10-Card Depth Carousel
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
          Follow the 10-card visual learning journey for <strong>{topic?.topicName || 'OOPS'}</strong>. Move from beginner intuition to syntax, real-world models, solved traces, common placement traps, and rapid revision.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. 10-CARD DEPTH CAROUSEL CONTAINER (MATCHING DSA)            */}
      {/* ------------------------------------------------------------- */}
      <div ref={cardContainerRef} className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Top Header & Position Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-2xs">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Introduction to {topic?.topicName || 'OOPS'}
              </h2>
              <p className="text-xs text-slate-500">
                Interactive Learning Carousel &bull; Unit {activeIndex + 1} of {totalCards}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Language Selector Pills */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500">Language:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {languages.map((lang) => {
                  const isSelected = selectedLanguage === lang;
                  return (
                    <button
                      key={lang}
                      type="button"
                      id={`oops-lang-btn-${lang.toLowerCase()}`}
                      onClick={() => onLanguageChange && onLanguageChange(lang)}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explicit Card Counter (e.g., 1 / 10) */}
            <div className="px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-black text-indigo-700">
              {activeIndex + 1} / {totalCards}
            </div>
          </div>
        </div>

        {/* 3D Depth Carousel Stage (Strictly Only 3 Cards Rendered: Prev, Active, Next) */}
        <div className="relative h-[720px] sm:h-[680px] md:h-[660px] flex items-center justify-center overflow-hidden py-3">
          <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {cards.map((card, index) => {
              const diff = index - activeIndex;

              // STRICT RULE: Only render 3 cards (diff === -1, 0, 1). Hide all other 7 cards!
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
                  className={`absolute w-[94%] sm:w-[88%] md:w-[82%] lg:w-[76%] max-w-[720px] xl:max-w-[760px] h-full rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-500 ease-out border backdrop-blur-xl ${
                    isActive
                      ? 'bg-white border-indigo-200/90 shadow-2xl ring-1 ring-indigo-500/10'
                      : 'bg-slate-50/95 border-slate-200/90 shadow-md cursor-pointer hover:border-indigo-200'
                  }`}
                >
                  {/* Card Content Outer Scroll Container */}
                  <div className="space-y-4 sm:space-y-5 overflow-y-auto scrollbar-none pr-1 flex-1">
                    {/* Top Header Badge & Counter */}
                    <div className="flex items-center justify-between">
                      <span className="px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
                        {card.badge || `Step ${card.cardNumber || index + 1}`}
                      </span>
                      <div className="flex items-center gap-2">
                        {isActive && (
                          <AddNoteButton
                            subject="OOPS"
                            topicId={topic?.topicId || 'classes-and-objects'}
                            topicName={topic?.topicName || 'Class and Object'}
                            section="Introduction"
                            questionId={`intro_card_${card.cardNumber || index + 1}`}
                            questionTitle={card.title}
                            size="sm"
                            variant="subtle"
                          />
                        )}
                        <span className="text-xs font-bold text-slate-400">
                          {card.cardNumber || index + 1} / {totalCards}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-indigo-600 block mb-1">
                        {card.subtitle || `Unit ${card.cardNumber || index + 1}`}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        {card.title}
                      </h3>
                    </div>

                    {/* 1. Plain English Definition */}
                    {card.simpleDef && (
                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block mb-1">
                          In Simple Words:
                        </span>
                        <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                          {card.simpleDef}
                        </p>
                      </div>
                    )}

                    {/* 2. Real-World Relatable Analogy */}
                    {card.realWorldAnalogy && (
                      <div className="p-3.5 bg-amber-50/70 border border-amber-200/90 rounded-2xl space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-black text-amber-950">
                          <Lightbulb size={15} className="text-amber-600" />
                          <span>Real-World Relatable Analogy: {card.realWorldAnalogy.concept}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                          {card.realWorldAnalogy.example}
                        </p>
                      </div>
                    )}

                    {/* CARD 2: Without vs With Concept Comparison */}
                    {card.withoutVsWith && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                          <span className="text-xs font-black text-rose-900 flex items-center gap-1.5">
                            <XCircle size={14} className="text-rose-600" /> {card.withoutVsWith.withoutTitle}
                          </span>
                          <ul className="space-y-1.5 text-xs text-rose-950">
                            {card.withoutVsWith.withoutPoints.map((pt, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-rose-600 font-bold">&bull;</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                          <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                            <CheckCircle2 size={14} className="text-emerald-600" /> {card.withoutVsWith.withTitle}
                          </span>
                          <ul className="space-y-1.5 text-xs text-emerald-950">
                            {card.withoutVsWith.withPoints.map((pt, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-600 font-bold">✓</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* CARD 3: Visual Pipeline / Flow Steps */}
                    {card.flowSteps && (
                      <div className="p-3.5 bg-indigo-50/60 border border-indigo-200/80 rounded-2xl space-y-2">
                        <span className="text-xs font-black text-indigo-900 uppercase tracking-wider block">
                          Execution Flow (Step-by-Step):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                          {card.flowSteps.map((s) => (
                            <div key={s.step} className="p-2.5 rounded-xl bg-white border border-indigo-200 shadow-2xs space-y-1">
                              <span className="w-5 h-5 rounded-md bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center">
                                {s.step}
                              </span>
                              <span className="text-xs font-black text-indigo-950 block">{s.label}</span>
                              <p className="text-[11px] text-slate-600 leading-snug">{s.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CARD 5: Real-World Practical Scenario */}
                    {(card.realWorldScenario || activeCard.realWorldScenario) && (
                      <div className="p-4 bg-amber-50/60 border border-amber-200/90 rounded-2xl space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/80 pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-black text-amber-950">
                            <Car size={16} className="text-amber-600" />
                            <span className="uppercase tracking-wider">
                              Real-World Scenario: {card.realWorldScenario?.domain || card.realWorldScenario?.scenario || card.realWorldScenario?.entity || card.realWorldScenario?.interface || 'Practical Application'}
                            </span>
                          </div>
                          {card.realWorldScenario?.parent && (
                            <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-md border border-amber-300">
                              Base: {card.realWorldScenario.parent}
                            </span>
                          )}
                        </div>

                        {(card.realWorldScenario?.situation || card.realWorldScenario?.description || card.realWorldScenario?.setup) && (
                          <div className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                            {card.realWorldScenario.situation || card.realWorldScenario.description || card.realWorldScenario.setup}
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {(card.realWorldScenario?.roles || card.realWorldScenario?.entities) && (
                            <div className="p-3 rounded-xl bg-white/90 border border-amber-200/80 space-y-1.5 shadow-2xs">
                              <span className="text-[11px] font-black text-amber-900 uppercase tracking-wide block">
                                👥 Roles & Entities:
                              </span>
                              <div className="space-y-1 text-xs text-slate-700">
                                {(card.realWorldScenario.roles || card.realWorldScenario.entities).map((r, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5">
                                    <span className="text-amber-600 font-bold">•</span>
                                    <span>{typeof r === 'object' ? `${r.role || r.name}: ${r.responsibility || r.desc || ''}` : String(r)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {card.realWorldScenario?.attributes && (
                            <div className="p-3 rounded-xl bg-white/90 border border-amber-200/80 space-y-1.5 shadow-2xs">
                              <span className="text-[11px] font-black text-amber-900 uppercase tracking-wide block">
                                📦 Attributes (State):
                              </span>
                              <div className="space-y-1 text-xs text-slate-700">
                                {card.realWorldScenario.attributes.map((att, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5">
                                    <span className="text-amber-600 font-bold">•</span>
                                    <span className="font-mono text-[11px]">{String(att)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {(card.realWorldScenario?.behaviors || card.realWorldScenario?.actions || card.realWorldScenario?.publicMethods) && (
                            <div className="p-3 rounded-xl bg-white/90 border border-amber-200/80 space-y-1.5 shadow-2xs">
                              <span className="text-[11px] font-black text-amber-900 uppercase tracking-wide block">
                                ⚡ Behaviors & Actions:
                              </span>
                              <div className="space-y-1 text-xs text-slate-700">
                                {(card.realWorldScenario.behaviors || card.realWorldScenario.actions || card.realWorldScenario.publicMethods).map((b, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5">
                                    <span className="text-amber-600 font-bold">✓</span>
                                    <span className="leading-snug">{typeof b === 'object' ? `${b.action || b.name}: ${b.result || b.desc || ''}` : String(b)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {(card.realWorldScenario?.instances || card.realWorldScenario?.children) && (
                            <div className="p-3 rounded-xl bg-white/90 border border-amber-200/80 space-y-1.5 shadow-2xs">
                              <span className="text-[11px] font-black text-amber-900 uppercase tracking-wide block">
                                🎯 Tangible Instances:
                              </span>
                              <div className="space-y-1 text-xs text-slate-700">
                                {(card.realWorldScenario.instances || card.realWorldScenario.children).map((inst, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5">
                                    <span className="text-amber-600 font-bold">→</span>
                                    <span className="font-mono text-[11px]">{String(inst)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {card.realWorldScenario?.hiddenComplexity && (
                            <div className="p-3 rounded-xl bg-white/90 border border-amber-200/80 space-y-1.5 shadow-2xs col-span-1 sm:col-span-2">
                              <span className="text-[11px] font-black text-rose-900 uppercase tracking-wide block">
                                🔒 Hidden Internal Complexity:
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                                {card.realWorldScenario.hiddenComplexity.map((hc, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5">
                                    <span className="text-rose-600 font-bold">•</span>
                                    <span>{String(hc)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {card.realWorldScenario?.privateData && (
                            <div className="p-3 rounded-xl bg-white/90 border border-amber-200/80 space-y-1 shadow-2xs col-span-1 sm:col-span-2">
                              <span className="text-[11px] font-black text-rose-900 uppercase tracking-wide block">
                                🛡️ Shielded Private Data:
                              </span>
                              <div className="p-2 bg-slate-900 text-rose-300 font-mono text-xs rounded-md">
                                {card.realWorldScenario.privateData}
                              </div>
                            </div>
                          )}

                          {card.realWorldScenario?.interaction && (
                            <div className="p-3 rounded-xl bg-white/90 border border-amber-200/80 space-y-1 shadow-2xs col-span-1 sm:col-span-2">
                              <span className="text-[11px] font-black text-amber-900 uppercase tracking-wide block">
                                🔄 Interaction Flow:
                              </span>
                              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                                {card.realWorldScenario.interaction}
                              </p>
                            </div>
                          )}
                        </div>

                        {(card.realWorldScenario?.takeaway || card.realWorldScenario?.result) && (
                          <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-start gap-2 text-xs text-emerald-950 font-medium">
                            <Lightbulb size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-emerald-900 font-black">Key Takeaway: </strong>
                              <span>
                                {Array.isArray(card.realWorldScenario.result)
                                  ? card.realWorldScenario.result.join(' • ')
                                  : card.realWorldScenario.takeaway || card.realWorldScenario.result}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CARD 6: Types & Variations Grid */}
                    {(card.typesList || activeCard.typesList) && Array.isArray(card.typesList || activeCard.typesList) && (card.typesList || activeCard.typesList).length > 0 && (
                      <div className="p-4 bg-purple-50/60 border border-purple-200/80 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between border-b border-purple-200/80 pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-black text-purple-950 uppercase tracking-wider">
                            <Layers size={16} className="text-indigo-600" />
                            <span>Types & Key Variations ({(card.typesList || activeCard.typesList).length} Categories):</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {(card.typesList || activeCard.typesList).map((t, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-white border border-purple-100 shadow-2xs space-y-1.5 flex flex-col justify-between"
                            >
                              <div className="space-y-1">
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-xs font-black text-slate-900 leading-snug">
                                    {t.name || t.title || `Type ${idx + 1}`}
                                  </span>
                                  {t.badge && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 shrink-0">
                                      {t.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {t.desc || t.description || t.explanation}
                                </p>
                              </div>

                              {(t.code || t.syntax || t.example) && (
                                <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 font-mono text-[11px] overflow-x-auto mt-1">
                                  <code>{t.code || t.syntax || t.example}</code>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Multi-Language Code Snippet & Line Explanation */}
                    {card.codeSnippets && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                            {selectedLanguage} Implementation:
                          </span>
                          <span className="text-[11px] font-mono text-indigo-600 font-bold">
                            {selectedLanguage === 'Java' ? 'Main.java' : selectedLanguage === 'Python' ? 'main.py' : 'main.cpp'}
                          </span>
                        </div>

                        <div className="p-4 bg-slate-900 rounded-2xl text-emerald-300 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
                          <pre>{card.codeSnippets[selectedLanguage] || card.codeSnippets.Java}</pre>
                        </div>

                        {card.expectedOutput && (
                          <div className="p-2.5 bg-slate-900 rounded-xl text-xs font-mono text-slate-300 border border-slate-800">
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block mb-1">Expected Output:</span>
                            <pre className="text-emerald-400">{card.expectedOutput}</pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CARD 4: Syntax Breakdown & Key Rules */}
                    {(card.syntaxNotes || activeCard.syntaxNotes) && (
                      <div className="p-3.5 bg-slate-50 border border-slate-300 rounded-2xl space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                          <Code2 size={15} className="text-indigo-600" />
                          <span>Syntax Breakdown & Key Rules:</span>
                        </div>
                        {Array.isArray(card.syntaxNotes || activeCard.syntaxNotes) ? (
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {(card.syntaxNotes || activeCard.syntaxNotes).map((note, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                                <span className="leading-relaxed font-medium">{note}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {String(card.syntaxNotes || activeCard.syntaxNotes)}
                          </p>
                        )}
                      </div>
                    )}

                    {/* CARD 7: Step-by-Step Execution Trace */}
                    {(card.executionTrace || activeCard.executionTrace) && Array.isArray(card.executionTrace || activeCard.executionTrace) && (card.executionTrace || activeCard.executionTrace).length > 0 && (
                      <div className="p-4 bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400 uppercase tracking-wider">
                            <Sparkles size={15} className="text-emerald-400" />
                            <span>Step-by-Step Execution Trace:</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {(card.executionTrace || activeCard.executionTrace).length} Steps
                          </span>
                        </div>

                        <div className="space-y-2">
                          {(card.executionTrace || activeCard.executionTrace).map((tr, idx) => {
                            const isObj = typeof tr === 'object' && tr !== null;
                            const stepNum = isObj ? tr.step || idx + 1 : idx + 1;
                            const action = isObj ? tr.action || tr.line || '' : null;
                            const state = isObj ? tr.state || tr.output || tr.desc || '' : String(tr);

                            return (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3 text-xs font-mono"
                              >
                                <span className="w-5 h-5 rounded-md bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                  {stepNum}
                                </span>
                                <div className="space-y-0.5 flex-1 min-w-0">
                                  {action && (
                                    <div className="text-emerald-300 font-bold truncate">
                                      {action}
                                    </div>
                                  )}
                                  <div className="text-slate-300 font-sans text-xs leading-relaxed">
                                    {state}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Visual Diagram */}
                    {card.visualType && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider block">
                          Visual Diagram:
                        </span>
                        <OOPSVisualDiagram
                          type={card.visualType}
                          card={activeCard}
                          language={selectedLanguage}
                        />
                      </div>
                    )}

                    {/* CARD 8: Common Mistakes & Traps */}
                    {card.mistakesList && (
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-black text-slate-600 uppercase tracking-wider block">
                          Common Mistakes vs Correct Approach:
                        </span>
                        <div className="space-y-2">
                          {card.mistakesList.map((m, idx) => (
                            <div key={idx} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                              <div className="text-xs font-black text-rose-800">{m.mistake}</div>
                              <div className="text-xs font-medium text-emerald-800">{m.correct}</div>
                            </div>
                          ))}
                        </div>
                        {card.interviewTrap && (
                          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-medium">
                            {card.interviewTrap}
                          </div>
                        )}
                      </div>
                    )}

                    {/* CARD 9: Interview & Placement Pattern */}
                    {card.interviewQuestions && (
                      <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/90 rounded-2xl space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                            <Award size={15} className="text-emerald-700" /> Placement Interview Practice
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {card.companyTags && Array.isArray(card.companyTags) && (
                              card.companyTags.map((tag, tIdx) => (
                                <span key={tIdx} className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                                  {tag}
                                </span>
                              ))
                            )}
                            {card.companyAttribution && !card.companyTags && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                                {card.companyAttribution}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {card.interviewQuestions.map((q, idx) => (
                            <div key={idx} className="p-2.5 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-1">
                              <span className="text-xs font-black text-emerald-900 block">Q: {q.q}</span>
                              <p className="text-xs text-slate-700 leading-relaxed font-medium">A: {q.a}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CARD 10: Quick Revision Cheat Sheet Table */}
                    {card.cheatSheet && (
                      <div className="p-3.5 bg-white border border-slate-200 rounded-2xl space-y-2">
                        <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                          60-Second Revision Cheat Sheet:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <strong className="text-indigo-600 block text-[10px] uppercase">WHAT:</strong>
                            <span className="text-slate-800 font-medium">{card.cheatSheet.WHAT}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <strong className="text-indigo-600 block text-[10px] uppercase">WHY:</strong>
                            <span className="text-slate-800 font-medium">{card.cheatSheet.WHY}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <strong className="text-indigo-600 block text-[10px] uppercase">HOW:</strong>
                            <span className="text-slate-800 font-medium">{card.cheatSheet.HOW}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <strong className="text-indigo-600 block text-[10px] uppercase">KEY POINT:</strong>
                            <span className="text-slate-800 font-medium">{card.cheatSheet.KEY_POINT}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                            <strong className="text-rose-700 block text-[10px] uppercase">COMMON TRAP:</strong>
                            <span className="text-rose-950 font-medium">{card.cheatSheet.COMMON_TRAP}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                            <strong className="text-emerald-700 block text-[10px] uppercase">INTERVIEW TIP:</strong>
                            <span className="text-emerald-950 font-medium">{card.cheatSheet.INTERVIEW_TIP}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Highlights Row */}
                    {card.highlights && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                        {card.highlights.quickRemember && (
                          <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs space-y-1">
                            <span className="font-black text-indigo-900 flex items-center gap-1">
                              💡 Quick Remember
                            </span>
                            <p className="text-indigo-950 text-[11px] leading-relaxed">
                              {card.highlights.quickRemember}
                            </p>
                          </div>
                        )}
                        {card.highlights.interviewTip && (
                          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-1">
                            <span className="font-black text-emerald-900 flex items-center gap-1">
                              ⭐ Interview Tip
                            </span>
                            <p className="text-emerald-950 text-[11px] leading-relaxed">
                              {card.highlights.interviewTip}
                            </p>
                          </div>
                        )}
                        {card.highlights.commonMistake && (
                          <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-xs space-y-1">
                            <span className="font-black text-rose-900 flex items-center gap-1">
                              ⚠️ Common Mistake
                            </span>
                            <p className="text-rose-950 text-[11px] leading-relaxed">
                              {card.highlights.commonMistake}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Footer (matching DSA) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">PathPilot Learning Card</span>
                    {isActive ? (
                      <span className="font-bold text-indigo-600 flex items-center gap-1">
                        <CheckCircle2 size={13} /> Active Unit
                      </span>
                    ) : (
                      <span className="text-slate-400">Click to select</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CAROUSEL NAVIGATION CONTROLS & 10 PROGRESS DOTS (MATCHING DSA)*/}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
          {/* ← Previous Button */}
          <button
            type="button"
            id="btn-intro-prev-card"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100 disabled:hover:text-slate-700"
            aria-label="Previous Learning Card"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {/* 10 Card Indicator Dots (Active Dot Clearly Highlighted, matching DSA) */}
          <div className="flex items-center gap-2">
            {cards.map((c, idx) => {
              const isDotActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  id={`oops-intro-card-${c.cardNumber || idx + 1}`}
                  onClick={() => handleCardChange(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isDotActive
                      ? 'w-8 h-2.5 bg-indigo-600 shadow-xs'
                      : 'w-2.5 h-2.5 bg-slate-200 hover:bg-indigo-300'
                  }`}
                  aria-label={`Go to Card ${idx + 1}`}
                  title={`Card ${idx + 1}: ${c?.title}`}
                />
              );
            })}
          </div>

          {/* Next → Button or Solved Examples Button on last card */}
          {activeIndex < totalCards - 1 ? (
            <button
              type="button"
              id="btn-intro-next-card"
              onClick={handleNext}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100 disabled:hover:text-slate-700"
              aria-label="Next Learning Card"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              id="btn-intro-goto-examples"
              onClick={onGoToExamples}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold border border-emerald-500 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              aria-label="Continue to Solved Examples"
            >
              <span>Continue to Solved Examples</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. LANGUAGE SYNTAX REFERENCE CARD                             */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-indigo-600" />
            <h4 className="text-sm font-extrabold text-slate-900">
              {selectedLanguage} OOPS Syntax Quick Reference
            </h4>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            {syntaxConfig.style}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
              Class Declaration:
            </span>
            <pre className="font-mono text-[11px] text-slate-900 whitespace-pre-wrap">{syntaxConfig.classDeclaration}</pre>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
              Object Creation:
            </span>
            <pre className="font-mono text-[11px] text-slate-900 whitespace-pre-wrap">{syntaxConfig.objectCreation}</pre>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
              Inheritance Syntax:
            </span>
            <pre className="font-mono text-[11px] text-slate-900 whitespace-pre-wrap">{syntaxConfig.inheritanceSyntax}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
