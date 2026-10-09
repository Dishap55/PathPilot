import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Cpu,
  GraduationCap,
  Users,
  Target,
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';

export default function AboutUsSection({ isVisible }) {
  const navigate = useNavigate();

  const values = [
    {
      id: 1,
      title: 'Personalized Roadmaps',
      tag: 'Our Mission',
      stat: '50K+ Learners',
      desc: 'Eliminates confusion with clear topic milestones tailored to your speed, background and career goals.',
      icon: Compass,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200',
      gradient: 'from-white/95 via-indigo-50/85 to-purple-50/80',
      borderColor: 'border-indigo-200/90',
      shadow: 'hover:shadow-indigo-300/40',
      feature: '100% Concept Clarity'
    },
    {
      id: 2,
      title: 'Adaptive Learning Engine',
      tag: 'Smart AI',
      stat: '10,000+ Questions',
      desc: 'Diagnoses exact weak spots and serves targeted practice questions with instant step-by-step logic explanations.',
      icon: Cpu,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200',
      gradient: 'from-white/95 via-amber-50/85 to-orange-50/80',
      borderColor: 'border-amber-200/90',
      shadow: 'hover:shadow-amber-300/40',
      feature: 'Real-time Diagnostics'
    },
    {
      id: 3,
      title: 'Company-Focused Prep',
      tag: 'Placement Driven',
      stat: '94.2% Success Rate',
      desc: 'Targeted preparation for TCS, Infosys, Amazon, Wipro & startups with full-length company-wise timed tests.',
      icon: GraduationCap,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200',
      gradient: 'from-white/95 via-emerald-50/85 to-teal-50/80',
      borderColor: 'border-emerald-200/90',
      shadow: 'hover:shadow-emerald-300/40',
      feature: '120+ Mock Tests'
    }
  ];

  return (
    <div className="relative z-10 w-full max-w-[1260px] mx-auto my-auto h-full flex flex-col justify-between py-2 sm:py-3 select-none overflow-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* 1. HEADER AREA - FULLY CENTRALIZED (MATCHING PRECEDING SECTIONS)          */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pt-1 max-w-2xl mx-auto">
        {/* Top Pill Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-purple-200/90 shadow-sm text-xs font-bold text-purple-700 mb-1.5 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>About PathPilot • Built for Learners</span>
        </div>

        {/* Master Headline */}
        <div
          className={`flex items-center justify-center gap-2 flex-wrap transition-all duration-700 delay-100 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-purple-600 font-black text-xl tracking-tighter select-none">\ | /</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
            Empowering Your Journey to{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Placement Success
            </span>
          </h2>
          <span className="text-purple-600 font-black text-xl tracking-tighter select-none">\ | /</span>
        </div>

        {/* Subtitle with Hand-drawn Underline */}
        <div
          className={`relative inline-block mt-0.5 transition-all duration-700 delay-200 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide font-sans">
            Bridging the gap between college learning and industry recruitment with intelligent guidance.
          </p>
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
      </div>

      {/* ========================================================================= */}
      {/* 2. 3 PILLARS - EXACT SAME WIDTH AS CTA BANNER (MAX-W-[1260PX])            */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full px-2 sm:px-4 my-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 w-full">
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                style={{ transitionDelay: `${200 + index * 90}ms` }}
                className={`group relative rounded-3xl p-4 sm:p-5 border-2 ${item.borderColor} bg-gradient-to-b ${
                  item.gradient
                } backdrop-blur-xl shadow-md hover:shadow-xl ${
                  item.shadow
                } hover:-translate-y-1.5 transition-all duration-700 ease-out transform flex flex-col justify-between text-left ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                <div>
                  {/* Top Bar with Icon & Stat Badge */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className={`w-10 h-10 rounded-xl ${item.bg} border flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>

                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200 text-[10px] font-bold text-slate-800 shadow-xs">
                      {item.stat}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug mb-1 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Highlight Feature */}
                <div className="pt-3 mt-2 border-t border-slate-200/50 flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span className="flex items-center gap-1 text-indigo-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{item.feature}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PROMINENT "START YOUR JOURNEY" CTA CARD (WIDTH ALIGNED WITH 3 CARDS)   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full px-2 sm:px-4 my-auto">
        <div
          className={`relative rounded-3xl p-5 sm:p-6 lg:p-7 bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-950 text-white shadow-xl overflow-hidden border border-indigo-400/30 w-full transition-all duration-700 delay-450 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          {/* Subtle Ambient Specular Glow */}
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 text-center lg:text-left">
            {/* Left Copy */}
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-indigo-200">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Ready to Ace Your Next Placement?</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                Start Your Preparation with PathPilot Today
              </h3>

              <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium">
                Join 50,000+ ambitious students mastering DSA, Aptitude, Core Subjects and mock tests.
              </p>
            </div>

            {/* Right Action Button - THE REQUESTED "START YOUR JOURNEY" -> /LOGIN */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => navigate('/login')}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-3.5 rounded-full bg-white text-indigo-950 font-black text-sm sm:text-base shadow-xl shadow-black/30 hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <button
                onClick={() => navigate('/signup')}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-indigo-800/60 hover:bg-indigo-700/80 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Sign Up Free</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. FOOTER NOTE                                                            */}
      {/* ========================================================================= */}
      <div
        className={`relative z-10 flex items-center justify-center mx-auto text-center pointer-events-none pb-1 transition-all duration-700 delay-550 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-[10px] sm:text-xs font-semibold text-slate-600 font-serif italic">
          PathPilot © {new Date().getFullYear()} • Learn Smarter • Practice Better • Placement Ready ☺
        </span>
      </div>

    </div>
  );
}
