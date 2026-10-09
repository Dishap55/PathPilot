import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCw,
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react';

export default function PreparationSection({ isVisible }) {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState(null);

  // 8 Milestones strictly matching the user's new reference (media_1790301919680.jpg)
  const steps = [
    {
      id: 1,
      number: '1',
      title: 'Select Subject',
      desc: 'Choose the subject you want to prepare for.',
      badgeColor: 'bg-[#6366F1] text-white ring-2 ring-white shadow-md',
      cardGradient: 'from-white/95 via-indigo-50/85 to-indigo-100/70',
      borderColor: 'border-indigo-200/90',
      bottomBevel: 'border-b-[#C7D2FE]',
      shadowColor: 'hover:shadow-indigo-300/50',
      pos: { left: '8.5%', top: '62.0%' },
      renderGraphic: () => (
        <div className="relative w-14 h-12 flex flex-col items-center justify-center filter drop-shadow-md">
          {/* 3D Stack of 3 Books (Blue, Rose, Amber) */}
          <div className="w-11 h-3 rounded-sm bg-[#3B82F6] border-b-2 border-[#1D4ED8] flex items-center px-1 shadow-sm">
            <div className="w-full h-0.5 bg-white/40 rounded-full" />
          </div>
          <div className="w-12 h-3 rounded-sm bg-[#F43F5E] border-b-2 border-[#BE123C] -mt-1 flex items-center px-1 shadow-sm">
            <div className="w-full h-0.5 bg-white/40 rounded-full" />
          </div>
          <div className="w-13 h-3.5 rounded-sm bg-[#F59E0B] border-b-2 border-[#B45309] -mt-1 flex items-center px-1 shadow-md">
            <div className="w-full h-0.5 bg-white/40 rounded-full" />
          </div>
        </div>
      )
    },
    {
      id: 2,
      number: '2',
      title: 'Learn Concepts',
      desc: 'Study theory with simple explanations and visuals.',
      badgeColor: 'bg-[#F59E0B] text-white ring-2 ring-white shadow-md',
      cardGradient: 'from-white/95 via-amber-50/85 to-amber-100/70',
      borderColor: 'border-amber-200/90',
      bottomBevel: 'border-b-[#FDE68A]',
      shadowColor: 'hover:shadow-amber-300/50',
      pos: { left: '20.2%', top: '38.0%' },
      renderGraphic: () => (
        <div className="relative w-14 h-12 flex items-center justify-center gap-1 filter drop-shadow-md">
          {/* 3D Clipboard with Checklist */}
          <div className="w-9 h-11 rounded-lg bg-[#FFFBEB] border-2 border-[#F59E0B] shadow-sm p-1 flex flex-col justify-between">
            <div className="w-4 h-1.5 bg-[#D97706] rounded-xs mx-auto" />
            <div className="space-y-0.5 my-0.5">
              <div className="w-5 h-0.5 bg-slate-300 rounded-full" />
              <div className="w-4 h-0.5 bg-slate-300 rounded-full" />
              <div className="w-5 h-0.5 bg-slate-300 rounded-full" />
            </div>
            <div className="w-2.5 h-0.5 bg-[#F59E0B] self-end rounded-xs" />
          </div>
          {/* 3D Glowing Lightbulb */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border border-white shadow-md flex items-center justify-center -ml-2 mb-2">
            <span className="text-xs select-none">💡</span>
          </div>
        </div>
      )
    },
    {
      id: 3,
      number: '3',
      title: 'Practice',
      desc: 'Solve questions, get instant feedback and practice similar ones.',
      badgeColor: 'bg-[#3B82F6] text-white ring-2 ring-white shadow-md',
      cardGradient: 'from-white/95 via-blue-50/85 to-blue-100/70',
      borderColor: 'border-blue-200/90',
      bottomBevel: 'border-b-[#BAE6FD]',
      shadowColor: 'hover:shadow-blue-300/50',
      pos: { left: '32.0%', top: '62.0%' },
      renderGraphic: () => (
        <div className="relative w-14 h-12 flex items-center justify-center filter drop-shadow-md">
          {/* 3D Blue Code Monitor Window */}
          <div className="w-13 h-10 rounded-xl bg-[#2563EB] border-2 border-[#1D4ED8] shadow-md p-1 flex flex-col justify-between">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-white text-xs font-mono font-black text-center tracking-wider">
              &lt;/&gt;
            </div>
            <div className="w-6 h-0.5 bg-blue-300/80 rounded mx-auto" />
          </div>
        </div>
      )
    },
    {
      id: 4,
      number: '4',
      title: 'Test Yourself',
      desc: 'Take topic tests and track your progress.',
      badgeColor: 'bg-[#10B981] text-white ring-2 ring-white shadow-md',
      cardGradient: 'from-white/95 via-emerald-50/85 to-emerald-100/70',
      borderColor: 'border-emerald-200/90',
      bottomBevel: 'border-b-[#BBF7D0]',
      shadowColor: 'hover:shadow-emerald-300/50',
      pos: { left: '44.0%', top: '38.0%' },
      renderGraphic: () => (
        <div className="relative w-13 h-12 flex items-center justify-center filter drop-shadow-md">
          {/* 3D Bullseye Target with Arrow */}
          <div className="w-11 h-11 rounded-full bg-[#10B981] border-3 border-white shadow-md flex items-center justify-center relative">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#10B981]" />
            </div>
            {/* Blue Arrow Dart hitting the bullseye */}
            <div className="absolute -top-1 -right-1 w-4 h-4 text-[#3B82F6] font-black text-sm drop-shadow-xs">
              ➹
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      number: '5',
      title: 'Analyze Mistakes',
      desc: 'Understand errors and learn the correct approach.',
      badgeColor: 'bg-[#F43F5E] text-white ring-2 ring-white shadow-md',
      cardGradient: 'from-white/95 via-rose-50/85 to-rose-100/70',
      borderColor: 'border-rose-200/90',
      bottomBevel: 'border-b-[#FECDD3]',
      shadowColor: 'hover:shadow-rose-300/50',
      pos: { left: '56.0%', top: '62.0%' },
      renderGraphic: () => (
        <div className="relative w-13 h-12 flex items-center justify-center filter drop-shadow-md">
          {/* 3D Purple/Pink Magnifying Glass with Exclamation Mark */}
          <div className="relative w-10 h-10 rounded-full border-3 border-[#8B5CF6] bg-white shadow-md flex items-center justify-center">
            <span className="text-[#8B5CF6] font-black text-base leading-none">!</span>
            {/* Magnifier Handle */}
            <div className="absolute -bottom-2 -right-1.5 w-2 h-4 rounded-sm bg-[#7C3AED] rotate-[-45deg] shadow-xs" />
          </div>
        </div>
      )
    },
    {
      id: 6,
      number: '6',
      title: 'Revise & Strengthen',
      desc: 'Revisit weak topics with smart revision tools and notes.',
      badgeColor: 'bg-[#8B5CF6] text-white ring-2 ring-white shadow-md',
      cardGradient: 'from-white/95 via-purple-50/85 to-purple-100/70',
      borderColor: 'border-purple-200/90',
      bottomBevel: 'border-b-[#DDD6FE]',
      shadowColor: 'hover:shadow-purple-300/50',
      pos: { left: '68.0%', top: '38.0%' },
      renderGraphic: () => (
        <div className="relative w-13 h-12 flex items-center justify-center filter drop-shadow-md">
          {/* 3D Dual Circular Reload/Refresh Arrows */}
          <div className="w-11 h-11 rounded-2xl bg-[#FAF5FF] border-2 border-[#8B5CF6] shadow-md flex items-center justify-center">
            <RotateCw className="w-6 h-6 text-[#7C3AED] stroke-[2.8]" />
          </div>
        </div>
      )
    },
    {
      id: 7,
      number: '7',
      title: 'Take Mock Tests',
      desc: 'Attempt full-length and company-wise tests.',
      badgeColor: 'bg-[#0EA5E9] text-white ring-2 ring-white shadow-md',
      cardGradient: 'from-white/95 via-sky-50/85 to-sky-100/70',
      borderColor: 'border-sky-200/90',
      bottomBevel: 'border-b-[#BAE6FD]',
      shadowColor: 'hover:shadow-sky-300/50',
      pos: { left: '80.0%', top: '62.0%' },
      renderGraphic: () => (
        <div className="relative w-13 h-12 flex items-center justify-center filter drop-shadow-md">
          {/* 3D Blue Exam Clipboard with Clock */}
          <div className="w-10 h-12 rounded-lg bg-white border-2 border-[#0EA5E9] shadow-md p-1 flex flex-col justify-between relative">
            <div className="space-y-1">
              <div className="w-5 h-1 bg-[#0EA5E9] rounded-full" />
              <div className="w-4 h-1 bg-slate-300 rounded-full" />
              <div className="w-5 h-1 bg-slate-200 rounded-full" />
            </div>
            {/* Clock Badge */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0284C7] text-white text-[8px] font-bold flex items-center justify-center border border-white shadow-xs">
              ⏱
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      number: '8',
      title: 'Placement Ready',
      desc: 'Build confidence and perform well in placement exams & interviews.',
      badgeColor: 'bg-[#F59E0B] text-white ring-2 ring-white shadow-md',
      cardGradient: 'from-white/95 via-amber-50/90 to-yellow-100/80',
      borderColor: 'border-amber-300',
      bottomBevel: 'border-b-[#FDE68A]',
      shadowColor: 'hover:shadow-amber-400/60',
      pos: { left: '91.5%', top: '38.0%' },
      renderGraphic: () => (
        <div className="relative w-14 h-12 flex flex-col items-center justify-center filter drop-shadow-md">
          {/* 3D Golden Winner Trophy Cup */}
          <div className="w-9 h-8 rounded-t-xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 border-2 border-amber-600 shadow-md flex items-center justify-center text-white text-xs font-black">
            ★
          </div>
          <div className="w-2.5 h-2 bg-amber-600" />
          <div className="w-7 h-2 rounded-sm bg-amber-700 shadow-xs" />
          {/* Floating Sparkle Stars */}
          <span className="absolute -top-1 -right-1 text-amber-500 text-xs">✨</span>
          <span className="absolute -bottom-1 -left-1 text-amber-500 text-xs">★</span>
        </div>
      )
    }
  ];

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between py-2 sm:py-3 select-none overflow-hidden font-sans">

      {/* ========================================================================= */}
      {/* 1. HEADER AREA - FULLY CENTRALIZED                                        */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pt-1 max-w-2xl mx-auto">
        {/* Top Pill Badge: "✨ Your Roadmap to Success" */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-purple-200/90 shadow-sm text-xs font-bold text-purple-700 w-max mb-1.5 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Your Roadmap to Success</span>
        </div>

        {/* Master Headline with Yellow Highlighter Brush Stroke */}
        <div
          className={`flex items-center justify-center gap-2 flex-wrap transition-all duration-700 delay-100 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Left Sunburst Ticks */}
          <span className="text-purple-600 font-black text-xl tracking-tighter select-none">
            \ | /
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
            Your{' '}
            <span className="relative inline-block text-[#4338CA]">
              Preparation
              {/* Yellow Highlighter Stroke Accent */}
              <span className="absolute left-0 bottom-0.5 w-full h-2.5 bg-yellow-300/85 -z-10 rounded-sm -rotate-0.5" />
            </span>{' '}
            Journey
          </h2>

          {/* Right Sunburst Ticks */}
          <span className="text-purple-600 font-black text-xl tracking-tighter select-none">
            \ | /
          </span>
        </div>

        {/* Subtitle with 3 Purple Angle Strokes "///" */}
        <p
          className={`text-xs sm:text-sm font-semibold text-slate-700 tracking-wide mt-1 transition-all duration-700 delay-200 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Step by Step. Steady Progress. Placement Ready.{' '}
          <span className="text-purple-600 font-black text-base ml-1 select-none">///</span>
        </p>

        {/* Top-Right Hand-drawn Doodle Annotation Positioned Absolutely */}
        <div
          className={`hidden xl:flex items-center gap-2 absolute -right-52 top-1 text-slate-800 pointer-events-none transition-all duration-700 delay-250 ease-out transform ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'
          }`}
        >
          <svg className="w-7 h-11 text-slate-700" viewBox="0 0 40 60" fill="none">
            <path d="M 28 50 C 10 40 10 20 25 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 18 14 L 25 10 L 26 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
      {/* 2. DESKTOP ROADMAP CANVAS (>= lg): SYMMETRIC WINDING RIBBON PATH & CARDS */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative flex-1 w-full h-full min-h-[440px]">
        
        {/* SVG Ribbon Path Connecting All 8 Steps */}
        <svg
          viewBox="0 0 1200 600"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="prepRoadGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="35%" stopColor="#6366F1" />
              <stop offset="70%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>

            <filter id="prepRoadGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#6366F1" floodOpacity="0.25" />
            </filter>

            <marker
              id="prepArrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="4.5"
              markerHeight="4.5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366F1" />
            </marker>
          </defs>

          {/* Smooth Continuous Winding Symmetrical Ribbon Track */}
          {/* Layer 1: Ground Shadow */}
          <path
            d="M 102 372 C 160 372 184 228 242 228 C 300 228 326 372 384 372 C 442 372 470 228 528 228 C 586 228 614 372 672 372 C 730 372 758 228 816 228 C 874 228 902 372 960 372 C 1018 372 1044 228 1098 228"
            fill="none"
            stroke="rgba(99, 102, 241, 0.22)"
            strokeWidth="24"
            strokeLinecap="round"
            transform="translate(0, 6)"
          />

          {/* Layer 2: 3D Outer Track */}
          <path
            d="M 102 372 C 160 372 184 228 242 228 C 300 228 326 372 384 372 C 442 372 470 228 528 228 C 586 228 614 372 672 372 C 730 372 758 228 816 228 C 874 228 902 372 960 372 C 1018 372 1044 228 1098 228"
            fill="none"
            stroke="#E0E7FF"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Layer 3: Vibrant Ribbon */}
          <path
            d="M 102 372 C 160 372 184 228 242 228 C 300 228 326 372 384 372 C 442 372 470 228 528 228 C 586 228 614 372 672 372 C 730 372 758 228 816 228 C 874 228 902 372 960 372 C 1018 372 1044 228 1098 228"
            fill="none"
            stroke="url(#prepRoadGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#prepRoadGlow)"
          />

          {/* Layer 4: Dashed White Guide Line */}
          <path
            d="M 102 372 C 160 372 184 228 242 228 C 300 228 326 372 384 372 C 442 372 470 228 528 228 C 586 228 614 372 672 372 C 730 372 758 228 816 228 C 874 228 902 372 960 372 C 1018 372 1044 228 1098 228"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />

          {/* Flow Directional Arrows */}
          <path d="M 165 315 L 180 295" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#prepArrow)" />
          <path d="M 305 295 L 320 315" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#prepArrow)" />
          <path d="M 450 315 L 465 295" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#prepArrow)" />
          <path d="M 590 295 L 605 315" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#prepArrow)" />
          <path d="M 735 315 L 750 295" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#prepArrow)" />
          <path d="M 880 295 L 895 315" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#prepArrow)" />
          <path d="M 1020 315 L 1035 295" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#prepArrow)" />
        </svg>

        {/* 8 Desktop Tablet Cards */}
        {steps.map((step, index) => {
          const isHovered = hoveredStep === step.id;

          return (
            <div
              key={step.id}
              style={{
                left: step.pos.left,
                top: step.pos.top,
                transitionDelay: `${200 + index * 90}ms`
              }}
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
              onClick={() => navigate(`/signup?step=${step.id}&name=${encodeURIComponent(step.title)}`)}
              className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-700 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
            >
              <div
                className={`relative w-28 sm:w-32 md:w-36 xl:w-40 p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border-2 ${
                  step.borderColor
                } ${
                  step.bottomBevel
                } border-b-4 bg-gradient-to-b ${
                  step.cardGradient
                } shadow-md backdrop-blur-xl flex flex-col items-center justify-between text-center transition-all duration-300 ${
                  step.shadowColor
                } ${
                  isHovered ? '-translate-y-3 scale-105 shadow-2xl' : 'hover:-translate-y-1.5'
                }`}
              >
                {/* Step Number Badge */}
                <div
                  className={`absolute -top-2.5 -left-2.5 z-30 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-transform duration-300 ${
                    step.badgeColor
                  } ${isHovered ? 'scale-120' : ''}`}
                >
                  {step.number}
                </div>

                {/* 3D Illustrated Graphic */}
                <div className="w-full flex items-center justify-center pt-0.5 pb-1">
                  {step.renderGraphic()}
                </div>

                {/* Card Title */}
                <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                  {step.title}
                </h3>

                {/* Card Description */}
                <p className="text-[9px] sm:text-[10px] text-slate-600 font-medium leading-tight mt-1 line-clamp-3">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}

        {/* Wooden Signboard in the Lower Left on Desktop */}
        <div className="absolute left-6 sm:left-10 bottom-4 z-20 pointer-events-none">
          <div className="relative px-3.5 py-2 bg-[#EED7A1] border-2 border-[#A2682A] rounded-xl shadow-xl text-center rotate-[-3deg]">
            <span className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-[#78350F]" />
            <span className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-[#78350F]" />
            <h4 className="text-xs font-extrabold text-[#5B3306] font-serif leading-tight">
              Consistent Practice<br />
              Big Results ☺
            </h4>
            <div className="flex justify-between px-3 -mb-7 mt-0.5">
              <div className="w-2 h-6 bg-[#8C4A15] border-x border-[#5B3306]" />
              <div className="w-2 h-6 bg-[#8C4A15] border-x border-[#5B3306]" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE & TABLET RESPONSIVE ROADMAP GRID (< lg)                         */}
      {/* ========================================================================= */}
      <div className="lg:hidden w-full max-w-3xl mx-auto px-2 py-2 flex flex-col items-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full">
          {steps.map((step, index) => (
            <div
              key={step.id}
              onClick={() => navigate(`/signup?step=${step.id}&name=${encodeURIComponent(step.title)}`)}
              style={{ transitionDelay: `${150 + index * 60}ms` }}
              className={`relative rounded-2xl p-3 border-2 ${step.borderColor} ${step.bottomBevel} border-b-4 bg-gradient-to-b ${step.cardGradient} shadow-md backdrop-blur-xl flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-500 active:scale-95 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
              }`}
            >
              <div className={`absolute -top-2 -left-2 z-20 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-md ${step.badgeColor}`}>
                {step.number}
              </div>
              <div className="w-full flex items-center justify-center pt-0.5 pb-1">
                {step.renderGraphic()}
              </div>
              <h3 className="text-xs font-black text-slate-900 tracking-tight leading-tight">
                {step.title}
              </h3>
              <p className="text-[9px] text-slate-600 font-medium leading-tight mt-1 line-clamp-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Centered Wooden Sign on Mobile/Tablet */}
        <div className="mt-4 flex justify-center">
          <div className="relative px-4 py-2 bg-[#EED7A1] border-2 border-[#A2682A] rounded-xl shadow-md text-center">
            <h4 className="text-xs font-extrabold text-[#5B3306] font-serif leading-tight">
              Consistent Practice = Big Results ☺
            </h4>
          </div>
        </div>
      </div>

    </div>
  );
}
