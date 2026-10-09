import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Map,
  BookOpen,
  BarChart3,
  RotateCcw,
  Bot,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function GradientCarousel() {
  const navigate = useNavigate();
  // Default to index 2: "Learning & Practice"
  const [activeIndex, setActiveIndex] = useState(2);

  const features = [
    {
      id: 0,
      title: 'Initial Assessment',
      desc: 'Know your current level with adaptive tests.',
      icon: FileText,
      accentBg: 'bg-indigo-50 text-indigo-600',
      gradient: 'from-blue-50/90 via-indigo-50/85 to-purple-50/90',
      border: 'border-indigo-200/90',
      glow: 'shadow-indigo-300/40',
      brushColor: '#818CF8'
    },
    {
      id: 1,
      title: 'Personalized Roadmap',
      desc: 'Get a custom learning path based on your strengths and weak areas.',
      icon: Map,
      accentBg: 'bg-amber-50 text-amber-600',
      gradient: 'from-amber-50/95 via-yellow-50/85 to-orange-50/90',
      border: 'border-amber-200/90',
      glow: 'shadow-amber-300/40',
      brushColor: '#F59E0B'
    },
    {
      id: 2,
      title: 'Learning & Practice',
      desc: 'Study concepts, solve questions, and get same-logic and similar practice.',
      icon: BookOpen,
      accentBg: 'bg-indigo-100 text-indigo-700',
      gradient: 'from-purple-50/95 via-indigo-50/90 to-blue-50/95',
      border: 'border-indigo-300',
      glow: 'shadow-indigo-400/50',
      brushColor: '#4F46E5',
      hasCta: true
    },
    {
      id: 3,
      title: 'Progress Tracking',
      desc: 'Track your accuracy, topic progress and confidence.',
      icon: BarChart3,
      accentBg: 'bg-emerald-50 text-emerald-600',
      gradient: 'from-emerald-50/95 via-teal-50/85 to-green-50/90',
      border: 'border-emerald-200/90',
      glow: 'shadow-emerald-300/40',
      brushColor: '#10B981'
    },
    {
      id: 4,
      title: 'Reassessment',
      desc: 'Reassess to verify improvement and strengthen weak topics.',
      icon: RotateCcw,
      accentBg: 'bg-rose-50 text-rose-600',
      gradient: 'from-rose-50/95 via-orange-50/85 to-amber-50/90',
      border: 'border-rose-200/90',
      glow: 'shadow-rose-300/40',
      brushColor: '#F43F5E'
    },
    {
      id: 5,
      title: 'AI Mentor',
      desc: 'Get instant explanations, doubt support and personalized guidance.',
      icon: Bot,
      accentBg: 'bg-sky-50 text-sky-600',
      gradient: 'from-sky-50/95 via-blue-50/85 to-indigo-50/90',
      border: 'border-sky-200/90',
      glow: 'shadow-sky-300/40',
      brushColor: '#0EA5E9'
    }
  ];

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [touchStart, setTouchStart] = useState(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth < 1024;
  const cardSpread = isSmallScreen ? 110 : isMediumScreen ? 140 : 175;
  const maxVisible = isSmallScreen ? 1 : 2;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-[1100px] mx-auto select-none"
    >
      {/* Scaled 3D Cover Flow Carousel Container */}
      <div className="relative h-[280px] sm:h-[310px] md:h-[330px] flex items-center justify-center overflow-visible">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute -left-2 sm:left-2 lg:left-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md border border-indigo-100 shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Previous Feature"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute -right-2 sm:right-2 lg:right-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md border border-indigo-100 shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Next Feature"
        >
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Carousel Cards Layer */}
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          {features.map((item, index) => {
            const Icon = item.icon;
            const total = features.length;
            
            let diff = index - activeIndex;
            if (diff < -Math.floor(total / 2)) diff += total;
            if (diff > Math.floor(total / 2)) diff -= total;

            const isActive = diff === 0;
            const isVisible = Math.abs(diff) <= maxVisible;

            if (!isVisible) return null;

            const xOffset = diff * cardSpread;
            const zOffset = -Math.abs(diff) * (isSmallScreen ? 70 : 100);
            const scale = isActive ? 1.04 : 0.88 - Math.abs(diff) * 0.05;
            const rotateY = diff * -10;
            const opacity = isActive ? 1 : Math.max(0.65, 1 - Math.abs(diff) * 0.25);
            const zIndex = 30 - Math.abs(diff) * 10;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                className={`absolute w-[185px] sm:w-[220px] md:w-[240px] h-[250px] sm:h-[275px] md:h-[295px] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out backdrop-blur-xl border ${
                  item.border
                } bg-gradient-to-b ${item.gradient} shadow-xl ${item.glow} hover:shadow-indigo-400/50`}
              >
                {/* Card Header: Icon & Sparkles */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-2 border border-white/80 shadow-md ${
                      item.accentBg
                    } ${isActive ? 'scale-110 shadow-lg' : ''} transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <svg
                    className="w-12 h-1.5 mt-1 opacity-80"
                    viewBox="0 0 100 8"
                    fill="none"
                  >
                    <path
                      d="M2 5C35 2 70 2 98 5"
                      stroke={item.brushColor}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Card Description */}
                <p className="text-slate-600 text-[11px] sm:text-xs text-center leading-relaxed px-1 font-medium line-clamp-3">
                  {item.desc}
                </p>

                {/* Card Footer: Active CTA */}
                <div className="flex justify-center pt-1">
                  {isActive ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/signup');
                      }}
                      className="group/btn inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/35 hover:shadow-indigo-500/60 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      <span>Explore Feature</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                      Click to view
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {features.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === activeIndex
                ? 'w-6 h-2 bg-indigo-600 shadow-sm shadow-indigo-300'
                : 'w-2 h-2 bg-slate-300/80 hover:bg-indigo-300'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
