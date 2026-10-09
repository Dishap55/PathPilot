import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * PathPilot First-Time Learning Garden Introduction
 * 
 * Standalone, focused onboarding experience for newly created/un-onboarded students.
 * - NO dashboard sidebar or navigation elements rendered
 * - Soft blurred background atmosphere with subtle educational/book elements
 * - 4 Stages: Seed -> Sprout -> Growing Plant -> Bloomed Flower
 * - Curved/half-circle growth arcs on desktop, vertically curved connectors on mobile
 * - Concise copy matching exact user specifications
 * - Prominent CTA: "Continue to My Dashboard →" with persistent localStorage state
 */

export default function LearningGardenOnboarding({
  onComplete = null
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEnterDashboard = () => {
    // Persist completion state for this student
    const storageKey = user?.id
      ? `pathpilot_garden_onboarded_${user.id}`
      : 'pathpilot_garden_onboarded_guest';

    try {
      localStorage.setItem(storageKey, 'true');
    } catch (e) {
      console.warn('[LearningGardenOnboarding] localStorage unavailable:', e);
    }

    if (onComplete) {
      onComplete();
    } else {
      navigate('/dashboard');
    }
  };

  // 4 Progressive Learning Garden Stages
  const stages = [
    {
      stage: 1,
      title: 'Seed',
      subtitle: 'You start learning',
      points: [
        'Build your basics',
        'Explore topics'
      ],
      theme: {
        bubble: 'bg-gradient-to-br from-amber-50 to-amber-100/70 border-amber-200/90 text-amber-900',
        badge: 'bg-amber-100 text-amber-900',
        border: 'border-amber-200/70 hover:border-amber-300',
        bullet: 'bg-amber-500',
        arrowColor: 'text-emerald-400'
      },
      illustration: (
        <svg viewBox="0 0 64 64" className="w-13 h-13 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Soil Mound */}
          <ellipse cx="32" cy="50" rx="24" ry="7" fill="#78350F" opacity="0.15" />
          <path d="M12 50 C18 42, 46 42, 52 50 C46 54, 18 54, 12 50 Z" fill="#92400E" />
          {/* Seed Body */}
          <ellipse cx="32" cy="46" rx="9" ry="6" transform="rotate(-15 32 46)" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
          <ellipse cx="30" cy="45" rx="7" ry="4" transform="rotate(-15 30 45)" fill="#D97706" />
          {/* Emerging Green Shoot */}
          <path d="M33 42 C34 36, 38 32, 41 30 C39 34, 37 38, 35 42 Z" fill="#10B981" />
          <path d="M32 43 C30 38, 27 35, 24 33 C26 37, 29 40, 31 43 Z" fill="#34D399" />
        </svg>
      )
    },
    {
      stage: 2,
      title: 'Sprout',
      subtitle: 'You build understanding',
      points: [
        'Understand concepts',
        'Practice regularly'
      ],
      theme: {
        bubble: 'bg-gradient-to-br from-emerald-50 to-emerald-100/70 border-emerald-200/90 text-emerald-900',
        badge: 'bg-emerald-100 text-emerald-900',
        border: 'border-emerald-200/70 hover:border-emerald-300',
        bullet: 'bg-emerald-500',
        arrowColor: 'text-sky-400'
      },
      illustration: (
        <svg viewBox="0 0 64 64" className="w-13 h-13 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Soil Base */}
          <ellipse cx="32" cy="52" rx="20" ry="5" fill="#047857" opacity="0.15" />
          <path d="M16 52 C22 47, 42 47, 48 52 C42 55, 22 55, 16 52 Z" fill="#065F46" opacity="0.8" />
          {/* Curved Tender Stem */}
          <path d="M32 50 C31 40, 33 30, 32 20" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          {/* Left Leaf */}
          <path d="M32 28 C24 28, 18 22, 16 16 C22 17, 28 22, 32 28 Z" fill="#10B981" stroke="#059669" strokeWidth="1" />
          {/* Right Leaf */}
          <path d="M32 24 C40 24, 46 18, 48 12 C42 13, 36 18, 32 24 Z" fill="#34D399" stroke="#059669" strokeWidth="1" />
          {/* Dew Drop */}
          <circle cx="21" cy="18" r="2" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="0.8" />
        </svg>
      )
    },
    {
      stage: 3,
      title: 'Growing Plant',
      subtitle: 'You gain strength',
      points: [
        'Improve accuracy',
        'Solve harder questions'
      ],
      theme: {
        bubble: 'bg-gradient-to-br from-sky-50 to-sky-100/70 border-sky-200/90 text-sky-900',
        badge: 'bg-sky-100 text-sky-900',
        border: 'border-sky-200/70 hover:border-sky-300',
        bullet: 'bg-sky-500',
        arrowColor: 'text-purple-400'
      },
      illustration: (
        <svg viewBox="0 0 64 64" className="w-13 h-13 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ground Soil */}
          <ellipse cx="32" cy="54" rx="22" ry="5" fill="#065F46" opacity="0.2" />
          {/* Main Stalk */}
          <path d="M32 52 C31 38, 33 24, 32 12" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" />
          {/* Lower Tier Leaves */}
          <path d="M31 42 C20 42, 12 36, 10 30 C18 31, 26 36, 31 42 Z" fill="#059669" />
          <path d="M33 38 C44 38, 52 32, 54 26 C46 27, 38 32, 33 38 Z" fill="#10B981" />
          {/* Upper Tier Leaves */}
          <path d="M31 26 C22 25, 16 20, 14 14 C20 15, 27 20, 31 26 Z" fill="#34D399" />
          <path d="M33 22 C42 21, 48 16, 50 10 C44 11, 37 16, 33 22 Z" fill="#6EE7B7" />
          {/* Budding Node */}
          <circle cx="32" cy="8" r="2.5" fill="#F472B6" />
        </svg>
      )
    },
    {
      stage: 4,
      title: 'Bloomed Flower',
      subtitle: "You're placement ready",
      points: [
        'Revise consistently',
        'Prepare for opportunities'
      ],
      theme: {
        bubble: 'bg-gradient-to-br from-rose-50 to-rose-100/70 border-rose-200/90 text-rose-900',
        badge: 'bg-rose-100 text-rose-900',
        border: 'border-rose-200/70 hover:border-rose-300',
        bullet: 'bg-rose-500',
        arrowColor: 'text-rose-400'
      },
      illustration: (
        <svg viewBox="0 0 64 64" className="w-13 h-13 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem & Leaves */}
          <path d="M32 54 C31 44, 32 36, 32 32" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 44 C24 44, 18 39, 16 35 C22 36, 28 40, 32 44 Z" fill="#10B981" />
          <path d="M32 40 C40 40, 46 35, 48 31 C42 32, 36 36, 32 40 Z" fill="#34D399" />
          {/* Flower Petals */}
          <circle cx="32" cy="18" r="6" fill="#FB7185" />
          <circle cx="32" cy="30" r="6" fill="#FB7185" />
          <circle cx="26" cy="24" r="6" fill="#FB7185" />
          <circle cx="38" cy="24" r="6" fill="#FB7185" />
          <circle cx="28" cy="20" r="6" fill="#FDA4AF" />
          <circle cx="36" cy="20" r="6" fill="#FDA4AF" />
          <circle cx="28" cy="28" r="6" fill="#FDA4AF" />
          <circle cx="36" cy="28" r="6" fill="#FDA4AF" />
          {/* Golden Center */}
          <circle cx="32" cy="24" r="4.5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="31" cy="23" r="1.5" fill="#FEF3C7" />
          {/* Sparkles */}
          <path d="M48 10 L49 13 L52 14 L49 15 L48 18 L47 15 L44 14 L47 13 Z" fill="#F59E0B" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen relative flex flex-col justify-between bg-[#FAFBFD] text-slate-900 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* ========================================================================= */}
      {/* 1. SOFT BLURRED BACKGROUND ATMOSPHERE WITH EDUCATIONAL / STUDY ELEMENTS   */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Subtle blurred study background image */}
        <img
          src="/garden_study_bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-25 filter blur-xl scale-105"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        {/* Ambient Pastel Glow Orbs: Soft blue, very light green, lavender, subtle peach */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-purple-200/35 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[32rem] h-[32rem] rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl" />

        {/* Subtle Educational Accent: Stack of pastel books in upper left margin */}
        <div className="hidden xl:block absolute top-12 left-10 opacity-40 select-none">
          <svg className="w-28 h-24 text-slate-400" viewBox="0 0 100 80" fill="none">
            {/* Bottom Book (Sky) */}
            <rect x="10" y="52" width="75" height="14" rx="3" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="1.5" />
            <line x1="20" y1="59" x2="70" y2="59" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
            {/* Middle Book (Lavender) */}
            <rect x="15" y="36" width="68" height="14" rx="3" fill="#DDD6FE" stroke="#C4B5FD" strokeWidth="1.5" />
            <line x1="25" y1="43" x2="65" y2="43" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
            {/* Top Book (Mint) */}
            <rect x="22" y="20" width="60" height="14" rx="3" fill="#A7F3D0" stroke="#6EE7B7" strokeWidth="1.5" />
            <line x1="30" y1="27" x2="62" y2="27" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
            {/* Bookmark sprout */}
            <path d="M50 20 C50 14, 56 12, 58 8 C54 10, 48 14, 50 20" fill="#10B981" />
          </svg>
        </div>

        {/* Subtle Educational Accent: Study notebook hint in upper right margin */}
        <div className="hidden xl:block absolute top-16 right-12 opacity-35 select-none">
          <svg className="w-24 h-24 text-slate-400" viewBox="0 0 80 80" fill="none">
            <rect x="15" y="10" width="52" height="60" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="25" y1="22" x2="55" y2="22" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="25" y1="32" x2="50" y2="32" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="25" y1="42" x2="55" y2="42" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="25" y1="52" x2="42" y2="52" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            {/* Spiral binding rings */}
            <circle cx="15" cy="20" r="2.5" fill="#64748B" />
            <circle cx="15" cy="34" r="2.5" fill="#64748B" />
            <circle cx="15" cy="48" r="2.5" fill="#64748B" />
            <circle cx="15" cy="62" r="2.5" fill="#64748B" />
          </svg>
        </div>

        {/* Floating subtle leaves in background corners */}
        <div className="hidden lg:block absolute bottom-16 left-16 opacity-30 select-none animate-float-in-place">
          <span className="text-3xl">🌿</span>
        </div>
        <div className="hidden lg:block absolute bottom-24 right-20 opacity-30 select-none animate-float-in-place" style={{ animationDelay: '1.5s' }}>
          <span className="text-2xl">🍃</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP PATHPILOT MINIMAL HEADER (NO SIDEBAR / NO DASHBOARD NAV)           */}
      {/* ========================================================================= */}
      <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between mb-2 sm:mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
            PP
          </div>
          <div>
            <span className="text-sm font-extrabold text-slate-900 block leading-tight">
              PathPilot
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Placement Engine
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/70 text-[11px] font-semibold text-slate-600 shadow-2xs backdrop-blur-xs">
          <Sparkles size={12} className="text-indigo-600" />
          <span>First-Time Onboarding</span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. MAIN CENTERED CONTENT: HEADING + 4 STAGES + CURVED ARROWS               */}
      {/* ========================================================================= */}
      <main className="relative z-10 max-w-6xl mx-auto w-full my-auto py-4 sm:py-6 space-y-6 sm:space-y-8">
        
        {/* Main Concise Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2.5">
            <span>Your Learning Garden</span>
            <span role="img" aria-label="sprout">🌱</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            Learn, practice, and revise step by step. Each stage helps you grow.
          </p>
        </div>

        {/* 4 Learning Stages Progression with Curved Growth Arcs */}
        <div className="w-full relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 relative">
            {stages.map((item, index) => {
              const isLast = index === stages.length - 1;

              return (
                <React.Fragment key={item.stage}>
                  {/* Stage Card */}
                  <div className="flex flex-col relative group">
                    <div
                      className={`relative bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between ${item.theme.border} shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_1px_3px_-1px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-lg`}
                    >
                      {/* Top Header: Stage Number Pill */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black shadow-xs ${item.theme.badge}`}>
                          {item.stage}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Stage {item.stage}
                        </span>
                      </div>

                      {/* Plant Illustration Bubble */}
                      <div className="flex flex-col items-center text-center my-2">
                        <div
                          className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl border flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105 ${item.theme.bubble}`}
                        >
                          {item.illustration}
                        </div>

                        {/* Title */}
                        <h3 className="mt-3.5 text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                          {item.title}
                        </h3>

                        {/* Description / Subtitle */}
                        <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* 2 Concise Learning Points */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100/90">
                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                          {item.points.map((point, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.theme.bullet}`} />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Mobile Vertically Curved / Downward Connector (hidden on tablet and desktop) */}
                    {!isLast && (
                      <div className="flex flex-col items-center justify-center py-2 sm:hidden text-emerald-400">
                        <svg
                          className="w-7 h-11 text-emerald-400 drop-shadow-xs"
                          viewBox="0 0 28 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          {/* S-curved growth stem flowing downwards */}
                          <path
                            d="M 14 2 C 24 14, 4 28, 14 38"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeDasharray="4 3"
                            strokeLinecap="round"
                          />
                          {/* Downward arrowhead */}
                          <path
                            d="M 8 32 L 14 40 L 20 32"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Growth bud node */}
                          <circle cx="9" cy="21" r="2.5" fill="#10B981" />
                        </svg>
                        <span className="text-[9px] font-bold text-emerald-600/70 uppercase tracking-widest mt-0.5">
                          Next Stage
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Desktop Curved / Half-Circle Growth Arc between cards (hidden on mobile and tablet) */}
                  {!isLast && (
                    <div
                      className="hidden lg:flex absolute items-center justify-center pointer-events-none z-10 transition-transform duration-300"
                      style={{
                        top: '18%',
                        left: `calc(${(index + 1) * 25}% - 28px)`
                      }}
                      aria-hidden="true"
                    >
                      <div className="flex flex-col items-center">
                        {/* Curved Half-Circle Growth Arc SVG */}
                        <svg
                          className={`w-14 h-9 drop-shadow-xs ${item.theme.arrowColor}`}
                          viewBox="0 0 56 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Half-circle curved growth path */}
                          <path
                            d="M 6 30 C 12 8, 44 8, 50 26"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeDasharray="4 3"
                            strokeLinecap="round"
                          />
                          {/* Directional arrowhead */}
                          <path
                            d="M 44 19 L 51 27 L 42 29"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Growth node in center of arch */}
                          <circle cx="28" cy="11" r="2.8" fill="currentColor" />
                        </svg>
                        <span className="text-[9px] font-bold text-slate-400 -mt-1 tracking-wider uppercase">
                          Growth Arc
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 4. PROMINENT BOTTOM CTA                                                 */}
        {/* ======================================================================= */}
        <div className="text-center space-y-3 pt-3">
          <p className="text-sm sm:text-base font-bold text-slate-800 flex items-center justify-center gap-2">
            <span>Your garden is ready to grow</span>
            <span role="img" aria-label="sprout">🌱</span>
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleEnterDashboard}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              <span>Continue to My Dashboard</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* 5. MINIMAL FOOTER                                                         */}
      {/* ========================================================================= */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto text-center text-xs text-slate-400 pt-2">
        <p>PathPilot &bull; AI-Powered Adaptive Learning &bull; Continuous Placement Preparation</p>
      </footer>

    </div>
  );
}
