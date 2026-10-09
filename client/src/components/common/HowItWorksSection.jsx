import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HowItWorksSection({ isVisible }) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const steps = [
    {
      id: 1,
      number: '1',
      title: 'Choose a Subject',
      desc: 'Select DSA, Aptitude or Core subjects to start your journey.',
      badgeBg: 'bg-[#6366F1] text-white',
      accentGlow: 'hover:shadow-indigo-300/50 hover:border-indigo-400',
      bottomWaveColor: 'from-indigo-100/80 to-purple-100/60',
      renderIcon: () => (
        <div className="relative w-20 h-16 flex flex-col items-center justify-center filter drop-shadow-md">
          {/* 3D Stack of 3 Books (Blue, Violet, Lavender) */}
          <div className="w-14 h-3.5 rounded-sm bg-[#3B82F6] border-b-2 border-[#1D4ED8] flex items-center px-1 shadow-sm">
            <div className="w-full h-0.5 bg-white/40 rounded-full" />
          </div>
          <div className="w-15 h-3.5 rounded-sm bg-[#8B5CF6] border-b-2 border-[#6D28D9] -mt-1 flex items-center px-1 shadow-sm">
            <div className="w-full h-0.5 bg-white/40 rounded-full" />
          </div>
          <div className="w-16 h-4 rounded-sm bg-[#A855F7] border-b-2 border-[#7E22CE] -mt-1 flex items-center px-1 shadow-md">
            <div className="w-full h-0.5 bg-white/40 rounded-full" />
          </div>
        </div>
      )
    },
    {
      id: 2,
      number: '2',
      title: 'Pick a Topic',
      desc: 'Choose a topic or follow a structured roadmap based on your goals.',
      badgeBg: 'bg-[#F59E0B] text-white',
      accentGlow: 'hover:shadow-amber-300/50 hover:border-amber-400',
      bottomWaveColor: 'from-amber-100/80 to-orange-100/60',
      renderIcon: () => (
        <div className="relative w-20 h-16 flex items-center justify-center filter drop-shadow-md">
          {/* Checklist document with 3 colorful bullets */}
          <div className="w-13 h-14 rounded-xl bg-white border-2 border-amber-300 shadow-sm p-1.5 flex flex-col justify-between">
            <div className="space-y-1.5 my-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <div className="w-6 h-1 bg-slate-200 rounded-full" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <div className="w-6 h-1 bg-slate-200 rounded-full" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                <div className="w-5 h-1 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>
          {/* 3D Blue Cursor Pointer hovering and clicking */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 text-blue-600 drop-shadow-md animate-bounce" style={{ animationDuration: '2s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 2 L20 10 L12 13 L8 22 Z" />
            </svg>
          </div>
        </div>
      )
    },
    {
      id: 3,
      number: '3',
      title: 'Learn & Understand',
      desc: 'Read short notes, examples and clear visual explanations.',
      badgeBg: 'bg-[#0284C7] text-white',
      accentGlow: 'hover:shadow-sky-300/50 hover:border-sky-400',
      bottomWaveColor: 'from-sky-100/80 to-blue-100/60',
      renderIcon: () => (
        <div className="relative w-20 h-16 flex flex-col items-center justify-center filter drop-shadow-md">
          {/* Hovering Warm Glowing Lightbulb with rays */}
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border border-white shadow-md flex items-center justify-center -mb-1 z-10">
            <span className="text-xs select-none">💡</span>
            {/* Sparkle rays */}
            <span className="absolute -top-1 -left-1 text-[8px] text-amber-500 animate-ping">✦</span>
            <span className="absolute -top-1 -right-1 text-[8px] text-amber-500 animate-ping">✦</span>
          </div>
          {/* 3D Open Book */}
          <div className="w-16 h-8 rounded-lg bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500 p-1 flex shadow-sm border border-blue-600">
            <div className="w-1/2 h-full bg-white rounded-l-sm border-r border-slate-200 flex flex-col justify-center px-1 space-y-0.5">
              <div className="w-full h-0.5 bg-slate-300 rounded" />
              <div className="w-3 h-0.5 bg-slate-300 rounded" />
            </div>
            <div className="w-1/2 h-full bg-white rounded-r-sm flex flex-col justify-center px-1 space-y-0.5">
              <div className="w-full h-0.5 bg-slate-300 rounded" />
              <div className="w-4 h-0.5 bg-slate-300 rounded" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      number: '4',
      title: 'Practice Questions',
      desc: 'Solve pattern-based questions and track your progress.',
      badgeBg: 'bg-[#E11D48] text-white',
      accentGlow: 'hover:shadow-rose-300/50 hover:border-rose-400',
      bottomWaveColor: 'from-rose-100/80 to-pink-100/60',
      renderIcon: () => (
        <div className="relative w-20 h-16 flex items-center justify-center filter drop-shadow-md">
          {/* Checklist Exam Paper with checkmarks */}
          <div className="w-13 h-14 rounded-xl bg-white border-2 border-rose-300 shadow-sm p-1.5 flex flex-col justify-between">
            <div className="space-y-1.5 my-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 text-white text-[7px] flex items-center justify-center font-bold">✓</span>
                <div className="w-5 h-1 bg-slate-200 rounded-full" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 text-white text-[7px] flex items-center justify-center font-bold">✓</span>
                <div className="w-5 h-1 bg-slate-200 rounded-full" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 text-white text-[7px] flex items-center justify-center font-bold">✓</span>
                <div className="w-4 h-1 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>
          {/* 3D Angled Red Pencil with Eraser */}
          <div className="absolute -bottom-1 -right-1 w-4 h-9 bg-gradient-to-t from-amber-200 via-rose-500 to-rose-400 rounded-sm rotate-[-35deg] shadow-md border border-rose-600 flex flex-col justify-between p-0.5">
            <div className="w-full h-1.5 bg-pink-300 rounded-xs" />
            <div className="w-0.5 h-1 bg-slate-800 mx-auto" />
          </div>
        </div>
      )
    },
    {
      id: 5,
      number: '5',
      title: 'Get Placement Ready',
      desc: 'Take mock tests, analyze mistakes and build confidence.',
      badgeBg: 'bg-[#10B981] text-white',
      accentGlow: 'hover:shadow-emerald-300/50 hover:border-emerald-400',
      bottomWaveColor: 'from-emerald-100/80 to-teal-100/60',
      renderIcon: () => (
        <div className="relative w-20 h-16 flex flex-col items-center justify-center filter drop-shadow-md">
          {/* 3D Golden Winner Trophy Cup */}
          <div className="w-12 h-10 rounded-t-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 border-2 border-amber-600 shadow-md flex items-center justify-center text-white text-sm font-black">
            ★
          </div>
          <div className="w-3 h-2 bg-amber-600" />
          <div className="w-9 h-2.5 rounded-sm bg-amber-700 shadow-xs" />
          {/* Sparkles */}
          <span className="absolute -top-1 -right-1 text-amber-500 text-xs animate-ping">✨</span>
          <span className="absolute top-2 -left-2 text-amber-500 text-xs">★</span>
        </div>
      )
    }
  ];

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between py-6 select-none overflow-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* 1. CHROME GRID OVERLAY EFFECT                                             */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 chrome-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* ========================================================================= */}
      {/* 2. HEADER AREA MATCHING IMAGE 1                                           */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-1">
        
        {/* Top Pill Badge: "✨ Simple Steps, Big Results" */}
        <div
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-purple-200/90 shadow-sm text-xs font-bold text-purple-700 mb-2 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Simple Steps, Big Results</span>
        </div>

        {/* Master Headline: "How PathPilot Works" */}
        <div
          className={`flex items-center justify-center gap-2.5 flex-wrap transition-all duration-700 delay-100 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Left Sunburst Ticks */}
          <span className="text-purple-600 font-black text-xl tracking-tighter select-none">
            \ | /
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
            How{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PathPilot
            </span>{' '}
            Works
          </h2>

          {/* Right Sunburst Ticks */}
          <span className="text-purple-600 font-black text-xl tracking-tighter select-none">
            \ | /
          </span>
        </div>

        {/* Subtitle with Hand-Drawn Purple Curve Accent */}
        <div
          className={`relative inline-block mt-1 transition-all duration-700 delay-200 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide font-sans">
            Follow a simple flow and stay on track for your placement goals.
          </p>
          {/* Curved Purple Hand-drawn Underline */}
          <svg
            className="w-40 sm:w-48 h-2 text-indigo-600 mx-auto -mt-0.5 opacity-80"
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

        {/* Top-Right Hand-drawn Doodle Annotation matching Image 1 */}
        <div
          className={`hidden lg:flex items-center gap-2 absolute right-8 xl:right-16 top-2 text-slate-800 pointer-events-none transition-all duration-700 delay-250 ease-out transform ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'
          }`}
        >
          <svg className="w-8 h-12 text-slate-700" viewBox="0 0 40 60" fill="none">
            <path d="M 30 50 C 12 40 12 20 28 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 20 14 L 28 10 L 29 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="font-extrabold text-[11px] sm:text-xs text-slate-800 font-serif leading-tight text-left">
            Learn<br />
            &nbsp;&nbsp;Practice<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Improve<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get Placement Ready ☺
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. 5 STEP PROCESS CARDS WITH FLOW ARROWS                                  */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-2 sm:px-4 my-auto">
        <div className="flex items-center justify-center gap-2 sm:gap-3 xl:gap-4 flex-wrap lg:flex-nowrap">
          {steps.map((step, index) => {
            const isHovered = hoveredCard === step.id;

            return (
              <React.Fragment key={step.id}>
                {/* Process Step Card */}
                <div
                  style={{
                    transitionDelay: `${200 + index * 90}ms`
                  }}
                  onMouseEnter={() => setHoveredCard(step.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => navigate(`/signup?step=${step.id}&name=${encodeURIComponent(step.title)}`)}
                  className={`group relative flex-1 min-w-[165px] sm:min-w-[185px] max-w-[240px] h-[285px] sm:h-[305px] rounded-3xl p-4 sm:p-5 border-2 border-white/95 bg-white/85 backdrop-blur-xl shadow-lg flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-700 ease-out transform ${
                    step.accentGlow
                  } ${
                    isHovered
                      ? '-translate-y-3 scale-105 shadow-2xl bg-white/95'
                      : 'hover:-translate-y-1.5'
                  } ${
                    isVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-10 scale-95'
                  } overflow-hidden`}
                >
                  {/* Chrome Light Streak Reflection Effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-25deg] animate-chrome-shine" />
                  </div>

                  {/* Step Number Circle Badge (Top-Left of Card) */}
                  <div
                    className={`absolute top-3.5 left-3.5 z-20 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md ring-2 ring-white transition-transform duration-300 ${
                      step.badgeBg
                    } ${isHovered ? 'scale-120' : ''}`}
                  >
                    {step.number}
                  </div>

                  {/* Top 3D Illustrated Icon Graphic */}
                  <div className="w-full flex items-center justify-center pt-2 pb-1">
                    {step.renderIcon()}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 px-1 relative z-10">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Card Bottom Pastel Wave Glow */}
                  <div
                    className={`w-full h-8 rounded-b-2xl bg-gradient-to-t ${step.bottomWaveColor} -mb-5 opacity-70 group-hover:opacity-100 transition-opacity`}
                  />
                </div>

                {/* Connecting Directional Flow Arrow between cards */}
                {index < steps.length - 1 && (
                  <div
                    style={{
                      transitionDelay: `${250 + index * 90}ms`
                    }}
                    className={`hidden lg:flex items-center justify-center text-slate-700/80 font-black text-xl transition-all duration-700 ease-out transform ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-3'
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-slate-800 stroke-[3] transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CENTERED FOREGROUND GRAPHIC (STACK OF 4 LABELED BOOKS & SUCCULENT)     */}
      {/* ========================================================================= */}
      <div
        className={`relative z-10 flex items-center justify-center mx-auto pb-1 pointer-events-none transition-all duration-700 delay-500 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-end gap-3">
          {/* 3D Stack of 4 Books matching Image 1 */}
          <div className="flex flex-col items-start filter drop-shadow-md">
            {/* Book 1: Blue - Learn */}
            <div className="w-32 sm:w-36 h-5 rounded-sm bg-[#93C5FD] border border-blue-400 flex items-center px-2 text-[10px] font-black text-slate-900 shadow-xs">
              <span className="text-amber-500 mr-1 text-[9px]">★</span> Learn
            </div>
            {/* Book 2: Lavender - Practice */}
            <div className="w-34 sm:w-38 h-5 rounded-sm bg-[#DDD6FE] border border-purple-400 flex items-center px-2 text-[10px] font-black text-slate-900 -mt-0.5 shadow-xs">
              <span className="text-amber-500 mr-1 text-[9px]">★</span> Practice
            </div>
            {/* Book 3: Mint/Sage - Improve */}
            <div className="w-36 sm:w-40 h-5.5 rounded-sm bg-[#A7F3D0] border border-emerald-400 flex items-center px-2 text-[10px] font-black text-slate-900 -mt-0.5 shadow-xs">
              <span className="text-amber-500 mr-1 text-[9px]">★</span> Improve
            </div>
            {/* Book 4: Peach/Amber - Placement Ready */}
            <div className="w-38 sm:w-42 h-6 rounded-sm bg-[#FED7AA] border border-amber-400 flex items-center px-2 text-[10px] font-black text-slate-900 -mt-0.5 shadow-md">
              <span className="text-indigo-600 mr-1 text-[9px]">★</span> Placement Ready
            </div>
          </div>

          {/* Cute Potted Plant / Succulent beside the books */}
          <div className="w-9 h-11 flex flex-col items-center">
            {/* Leaves */}
            <div className="flex items-center -space-x-1 mb-0.5">
              <div className="w-3 h-5 rounded-full bg-emerald-500 rotate-[-20deg] shadow-xs" />
              <div className="w-3.5 h-6 rounded-full bg-emerald-600 shadow-xs -mt-1" />
              <div className="w-3 h-5 rounded-full bg-emerald-500 rotate-[20deg] shadow-xs" />
            </div>
            {/* White Ceramic Pot */}
            <div className="w-6 h-5 rounded-b-md bg-white border border-slate-300 shadow-xs" />
          </div>
        </div>
      </div>

    </div>
  );
}
