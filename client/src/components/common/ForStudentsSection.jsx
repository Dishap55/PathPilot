import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  Star
} from 'lucide-react';

export default function ForStudentsSection({ isVisible }) {
  const navigate = useNavigate();
  // Default expanded card (Index 0: "Structured Learning")
  const [activeIndex, setActiveIndex] = useState(0);

  const benefits = [
    {
      id: 1,
      number: '01',
      title: 'Structured Learning',
      shortTitle: 'Structured Learning',
      tag: 'Step-by-Step Roadmaps',
      desc: 'Follow step-by-step roadmaps and build concepts from basics to advanced.',
      highlight: '100% Concept Clarity',
      badgeBg: 'bg-[#6366F1] text-white',
      cardGradient: 'from-white/95 via-indigo-50/85 to-purple-50/80',
      borderColor: 'border-indigo-200/90',
      activeBorder: 'border-indigo-400 ring-4 ring-indigo-200/50',
      glowColor: 'shadow-indigo-300/50',
      textColor: 'text-indigo-600',
      bottomWaveColor: 'from-indigo-100/70 to-purple-100/50',
      renderGraphic: (isExpanded) => (
        <div className={`relative flex items-center justify-center filter drop-shadow-md transition-all duration-500 ${isExpanded ? 'w-24 h-24' : 'w-14 h-14'}`}>
          {/* 3D Bullseye Target with Arrow Dart */}
          <div className={`${isExpanded ? 'w-20 h-20' : 'w-12 h-12'} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 shadow-lg flex items-center justify-center relative transition-all duration-500`}>
            {/* White Ring */}
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1.5">
              {/* Inner Purple Ring */}
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center p-1.5">
                {/* Inner White Ring */}
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  {/* Bullseye Core */}
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* 3D Pink/Magenta Dart hitting the Bullseye */}
            <div className={`absolute -top-2 -right-2 text-rose-500 font-black drop-shadow-md transition-all duration-500 ${isExpanded ? 'text-2xl animate-bounce' : 'text-base'}`} style={{ animationDuration: '2.5s' }}>
              🎯
            </div>

            {/* Radiant Sparkle */}
            {isExpanded && (
              <span className="absolute -bottom-1 -left-1 text-amber-400 text-xs animate-ping">
                ✦
              </span>
            )}
          </div>
        </div>
      )
    },
    {
      id: 2,
      number: '02',
      title: 'Practice Effectively',
      shortTitle: 'Practice Effectively',
      tag: 'Topic-wise & MCQs',
      desc: 'Solve topic-wise questions, MCQs and mock tests with instant feedback.',
      highlight: 'Instant AI Explanation',
      badgeBg: 'bg-[#F59E0B] text-white',
      cardGradient: 'from-white/95 via-amber-50/85 to-orange-50/80',
      borderColor: 'border-amber-200/90',
      activeBorder: 'border-amber-400 ring-4 ring-amber-200/50',
      glowColor: 'shadow-amber-300/50',
      textColor: 'text-amber-600',
      bottomWaveColor: 'from-amber-100/70 to-orange-100/50',
      renderGraphic: (isExpanded) => (
        <div className={`relative flex items-center justify-center filter drop-shadow-md transition-all duration-500 ${isExpanded ? 'w-24 h-24' : 'w-14 h-14'}`}>
          {/* 3D Glowing Warm Yellow Lightbulb */}
          <div className="relative flex flex-col items-center">
            {/* Lightbulb Glow Glass */}
            <div className={`${isExpanded ? 'w-16 h-16 text-3xl' : 'w-10 h-10 text-xl'} rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border-2 border-white shadow-lg flex items-center justify-center transition-all duration-500 relative select-none`}>
              <span>💡</span>
              {/* Radiating Light Rays */}
              <span className="absolute -top-1 -left-1 text-amber-500 text-xs animate-ping">✦</span>
              <span className="absolute -top-1 -right-1 text-amber-500 text-xs animate-ping" style={{ animationDelay: '300ms' }}>✦</span>
            </div>
            {/* Screw Base */}
            <div className={`${isExpanded ? 'w-6 h-2.5' : 'w-4 h-1.5'} bg-slate-400 rounded-b-sm border-t border-slate-500 -mt-0.5 shadow-xs`} />
          </div>
        </div>
      )
    },
    {
      id: 3,
      number: '03',
      title: 'Track Progress',
      shortTitle: 'Track Progress',
      tag: 'Real-time Analytics',
      desc: 'See your improvement with accuracy, topic progress and confidence levels.',
      highlight: 'Live Growth Dashboard',
      badgeBg: 'bg-[#10B981] text-white',
      cardGradient: 'from-white/95 via-emerald-50/85 to-teal-50/80',
      borderColor: 'border-emerald-200/90',
      activeBorder: 'border-emerald-400 ring-4 ring-emerald-200/50',
      glowColor: 'shadow-emerald-300/50',
      textColor: 'text-emerald-600',
      bottomWaveColor: 'from-emerald-100/70 to-teal-100/50',
      renderGraphic: (isExpanded) => (
        <div className={`relative flex items-end justify-center filter drop-shadow-md transition-all duration-500 ${isExpanded ? 'w-24 h-24' : 'w-14 h-14'}`}>
          {/* 3D Ascending Bar Chart with Trending Upward Curve */}
          <div className="flex items-end gap-1.5 pb-2">
            {/* Bar 1 (Mint) */}
            <div className={`${isExpanded ? 'w-4 h-8' : 'w-2.5 h-5'} rounded-t-md bg-gradient-to-t from-teal-500 to-teal-300 shadow-sm border border-teal-400 transition-all duration-500`} />
            {/* Bar 2 (Cyan) */}
            <div className={`${isExpanded ? 'w-4 h-13' : 'w-2.5 h-8'} rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-300 shadow-sm border border-emerald-400 transition-all duration-500`} />
            {/* Bar 3 (Purple/Violet Peak) */}
            <div className={`${isExpanded ? 'w-4 h-18' : 'w-2.5 h-11'} rounded-t-md bg-gradient-to-t from-indigo-600 to-purple-400 shadow-md border border-indigo-400 transition-all duration-500 relative`}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] text-amber-500">★</span>
            </div>
          </div>
          {/* Floating Trend Arrow */}
          <div className="absolute top-1 right-1 text-emerald-500 font-black animate-pulse">
            <TrendingUp className={isExpanded ? 'w-5 h-5' : 'w-3.5 h-3.5'} />
          </div>
        </div>
      )
    },
    {
      id: 4,
      number: '04',
      title: 'Identify Weaknesses',
      shortTitle: 'Identify Weaknesses',
      tag: 'Smart Diagnostic',
      desc: 'Get detailed analysis and focus on topics that need more practice.',
      highlight: 'Targeted Mistake Analysis',
      badgeBg: 'bg-[#F43F5E] text-white',
      cardGradient: 'from-white/95 via-rose-50/85 to-pink-50/80',
      borderColor: 'border-rose-200/90',
      activeBorder: 'border-rose-400 ring-4 ring-rose-200/50',
      glowColor: 'shadow-rose-300/50',
      textColor: 'text-rose-600',
      bottomWaveColor: 'from-rose-100/70 to-pink-100/50',
      renderGraphic: (isExpanded) => (
        <div className={`relative flex items-center justify-center filter drop-shadow-md transition-all duration-500 ${isExpanded ? 'w-24 h-24' : 'w-14 h-14'}`}>
          {/* 3D Clipboard with Checklist and Green Checkmarks */}
          <div className={`${isExpanded ? 'w-14 h-18 p-1.5' : 'w-10 h-12 p-1'} rounded-xl bg-white border-2 border-rose-300 shadow-md flex flex-col justify-between transition-all duration-500`}>
            {/* Top Clipboard Clip */}
            <div className="w-6 h-2 bg-gradient-to-r from-purple-400 to-rose-400 rounded-sm mx-auto -mt-2.5 shadow-xs" />
            {/* 3 Checklist Items */}
            <div className="space-y-1 my-1">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 text-white text-[7px] flex items-center justify-center font-bold">✓</span>
                <div className="w-7 h-1 bg-slate-200 rounded-full" />
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 text-white text-[7px] flex items-center justify-center font-bold">✓</span>
                <div className="w-6 h-1 bg-slate-200 rounded-full" />
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 text-white text-[7px] flex items-center justify-center font-bold">!</span>
                <div className="w-5 h-1 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      number: '05',
      title: 'Placement Ready',
      shortTitle: 'Placement Ready',
      tag: 'Interview & Tests',
      desc: 'Practice company-wise mock tests and build the confidence to crack placements.',
      highlight: 'Top Tier Placement Prep',
      badgeBg: 'bg-[#0284C7] text-white',
      cardGradient: 'from-white/95 via-sky-50/85 to-blue-50/80',
      borderColor: 'border-sky-200/90',
      activeBorder: 'border-sky-400 ring-4 ring-sky-200/50',
      glowColor: 'shadow-sky-300/50',
      textColor: 'text-sky-600',
      bottomWaveColor: 'from-sky-100/70 to-blue-100/50',
      renderGraphic: (isExpanded) => (
        <div className={`relative flex items-center justify-center filter drop-shadow-md transition-all duration-500 ${isExpanded ? 'w-24 h-24' : 'w-14 h-14'}`}>
          {/* 3D Royal Blue Executive Briefcase with Gold Buckle */}
          <div className="relative flex flex-col items-center">
            {/* Handle */}
            <div className={`${isExpanded ? 'w-6 h-3' : 'w-4 h-2'} rounded-t-md border-2 border-blue-700 bg-transparent mb-[-2px]`} />
            {/* Briefcase Body */}
            <div className={`${isExpanded ? 'w-16 h-12' : 'w-11 h-8'} rounded-xl bg-gradient-to-b from-blue-500 via-sky-600 to-indigo-700 border-2 border-blue-800 shadow-md flex items-center justify-center relative transition-all duration-500`}>
              {/* Gold Lock Buckle */}
              <div className="w-3.5 h-3.5 rounded-xs bg-amber-400 border border-amber-600 shadow-xs flex items-center justify-center text-[7px] font-black text-amber-900">
                ★
              </div>
              {/* Horizontal Belt Line */}
              <div className="absolute inset-x-0 h-0.5 bg-blue-900/40" />
            </div>
            {/* Radiant Sparkles */}
            <span className="absolute -top-1 -right-1 text-amber-400 text-xs animate-ping">✨</span>
            <span className="absolute bottom-1 -left-1 text-amber-400 text-xs">✦</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between py-2 sm:py-4 select-none overflow-hidden font-sans">

      {/* ========================================================================= */}
      {/* 1. HEADER AREA EXACTLY MATCHING MEDIA_1790312874690.PNG                   */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pt-1 max-w-2xl mx-auto">
        
        {/* Top Pill Badge: "⭐ Why Students Love PathPilot" */}
        <div
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-purple-200/90 shadow-sm text-xs font-bold text-purple-700 mb-2 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-pulse" />
          <span>Why Students Love PathPilot</span>
        </div>

        {/* Master Headline: Benefits for Students with Sunburst Angle Ticks */}
        <div
          className={`flex items-center justify-center gap-2.5 flex-wrap transition-all duration-700 delay-100 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Left Purple Angle Ticks \ \ */}
          <span className="text-purple-600 font-black text-xl tracking-tighter select-none">
            \ \
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
            Benefits for{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Students
            </span>
          </h2>

          {/* Right Purple Angle Ticks / / */}
          <span className="text-purple-600 font-black text-xl tracking-tighter select-none">
            / /
          </span>
        </div>

        {/* Subtitle with Hand-Drawn Purple Curve Underline Accent */}
        <div
          className={`relative inline-block mt-1 transition-all duration-700 delay-200 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide font-sans">
            All the tools you need to learn, practice, and get placement ready — in one place.
          </p>
          {/* Curved Purple Hand-drawn Underline */}
          <svg
            className="w-48 sm:w-56 h-2 text-indigo-600 mx-auto -mt-0.5 opacity-80"
            viewBox="0 0 200 8"
            fill="none"
          >
            <path
              d="M3 5C50 2 150 2 197 5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP ACCORDION GALLERY (>= lg)                                      */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex relative z-10 w-full max-w-[1260px] mx-auto px-4 my-auto items-stretch justify-center gap-3 xl:gap-4 h-[350px] xl:h-[370px]">
        {benefits.map((card, index) => {
          const isExpanded = activeIndex === index;

          return (
            <div
              key={card.id}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              style={{
                transitionDelay: `${150 + index * 60}ms`
              }}
              className={`relative rounded-3xl p-5 border-2 bg-gradient-to-b ${
                card.cardGradient
              } backdrop-blur-xl shadow-lg cursor-pointer transition-all duration-600 cubic-bezier(0.2, 0.8, 0.2, 1) flex flex-col justify-between overflow-hidden ${
                isExpanded
                  ? `flex-[3.4] min-w-[280px] max-w-[420px] ${card.activeBorder} ${card.glowColor} -translate-y-2 shadow-2xl z-20`
                  : `flex-[1] min-w-[95px] max-w-[125px] ${card.borderColor} opacity-85 hover:opacity-100 hover:-translate-y-1 hover:shadow-md z-10`
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-10 scale-95'
              }`}
            >
              {/* Chrome Metallic Specular Gleam on Expanded Card */}
              {isExpanded && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg] animate-chrome-shine" />
                </div>
              )}

              {/* Card Top Row */}
              <div className="flex items-center justify-between w-full">
                {/* Step Number Circle Badge */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md ring-2 ring-white transition-all duration-300 ${
                    card.badgeBg
                  } ${isExpanded ? 'scale-110' : ''}`}
                >
                  {card.number}
                </div>

                {/* Expanded Badge Callout */}
                {isExpanded && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200 text-[10px] font-bold text-slate-700 shadow-xs animate-fade-in-up">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{card.highlight}</span>
                  </span>
                )}
              </div>

              {/* Middle Content Area */}
              {isExpanded ? (
                /* EXPANDED VIEW */
                <div className="flex flex-col items-center text-center my-auto space-y-2 animate-fade-in-up">
                  {/* 3D Illustrated Icon Graphic */}
                  <div className="pt-1 pb-1">
                    {card.renderGraphic(true)}
                  </div>

                  {/* Title & Tag */}
                  <div className="space-y-1 px-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-sm mx-auto">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ) : (
                /* COLLAPSED VIEW */
                <div className="flex flex-col items-center justify-center my-auto space-y-4">
                  {/* Compact Icon */}
                  <div className="opacity-90">
                    {card.renderGraphic(false)}
                  </div>

                  {/* Vertical Rotated Title Text */}
                  <div className="[writing-mode:vertical-rl] rotate-180 text-xs xl:text-sm font-black text-slate-800 tracking-wider uppercase select-none transition-colors">
                    {card.shortTitle}
                  </div>
                </div>
              )}

              {/* Bottom Row / CTA */}
              <div className="w-full pt-2 flex items-center justify-center">
                {isExpanded ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/signup?benefit=${card.id}&name=${encodeURIComponent(card.title)}`);
                    }}
                    className="group/btn inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/35 hover:shadow-indigo-500/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-indigo-400 transition-colors" />
                )}
              </div>

              {/* Card Bottom Wave Accent */}
              <div
                className={`absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t ${card.bottomWaveColor} opacity-70 pointer-events-none`}
              />
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE & TABLET RESPONSIVE VERTICAL ACCORDION (< lg)                   */}
      {/* ========================================================================= */}
      <div className="lg:hidden w-full max-w-xl mx-auto px-3 py-3 flex flex-col gap-2.5 my-auto">
        {benefits.map((card, index) => {
          const isExpanded = activeIndex === index;

          return (
            <div
              key={card.id}
              onClick={() => setActiveIndex(isExpanded ? -1 : index)}
              style={{ transitionDelay: `${100 + index * 50}ms` }}
              className={`rounded-2xl border-2 bg-gradient-to-r ${
                card.cardGradient
              } backdrop-blur-xl shadow-md cursor-pointer transition-all duration-400 overflow-hidden ${
                isExpanded
                  ? `${card.activeBorder} ${card.glowColor} shadow-xl`
                  : `${card.borderColor} hover:border-indigo-300`
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-6 scale-95'
              }`}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${card.badgeBg}`}>
                    {card.number}
                  </div>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight">
                    {card.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <div className="scale-75">
                    {card.renderGraphic(false)}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Expanded Drawer Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-200/50 flex flex-col items-center text-center space-y-2.5 animate-fade-in-up">
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {card.desc}
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-[10px] font-bold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{card.highlight}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/signup?benefit=${card.id}&name=${encodeURIComponent(card.title)}`);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-indigo-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all mt-1"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Centered Subtitle Note */}
      <div
        className={`relative z-10 flex items-center justify-center mx-auto pb-1 text-center pointer-events-none transition-all duration-700 delay-500 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <span className="text-[11px] sm:text-xs font-semibold text-slate-600 font-serif italic">
          Better Skills • Brighter Opportunities • Placement Ready ☺
        </span>
      </div>

    </div>
  );
}
