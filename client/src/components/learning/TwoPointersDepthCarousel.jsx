import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Lightbulb,
  Code2,
  Layers,
  FileText,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

/**
 * TwoPointersDepthCarousel Component
 * 
 * Renders a 3D Cover Flow Depth Carousel for the 5 Two Pointers learning sections:
 * 1. Introduction
 * 2. Problem Examples
 * 3. Practice Questions
 * 4. Common Patterns
 * 5. Summary & Notes
 * 
 * Preserves 3D depth scaling, opacity, smooth transitions, and arrow navigation.
 */

export default function TwoPointersDepthCarousel({ activeSection = 'introduction', onSelectSection = () => {} }) {
  // 5 Sections Data
  const carouselSections = [
    {
      id: 'introduction',
      num: 1,
      title: 'Introduction',
      desc: 'Overview of Two Pointers, 9 major patterns, relationship map & recognition clues.',
      icon: BookOpen,
      accentBg: 'bg-indigo-50 text-indigo-600',
      gradient: 'from-blue-50/95 via-indigo-50/90 to-purple-50/95',
      border: 'border-indigo-300',
      glow: 'shadow-indigo-300/40',
      brushColor: '#4F46E5'
    },
    {
      id: 'examples',
      num: 2,
      title: 'Problem Examples',
      desc: 'Step-by-step walkthroughs of canonical interview problem strategies.',
      icon: Lightbulb,
      accentBg: 'bg-amber-50 text-amber-600',
      gradient: 'from-amber-50/95 via-yellow-50/85 to-orange-50/90',
      border: 'border-amber-200/90',
      glow: 'shadow-amber-300/40',
      brushColor: '#F59E0B'
    },
    {
      id: 'practice',
      num: 3,
      title: 'Practice Questions',
      desc: 'Interactive exercises, diagnostic MCQ and live code challenges.',
      icon: Code2,
      accentBg: 'bg-emerald-50 text-emerald-600',
      gradient: 'from-emerald-50/95 via-teal-50/85 to-green-50/90',
      border: 'border-emerald-200/90',
      glow: 'shadow-emerald-300/40',
      brushColor: '#10B981'
    },
    {
      id: 'patterns',
      num: 4,
      title: 'Common Patterns',
      desc: 'Fast reference breakdown of opposite, same-direction, sliding window & multi-pointer matrices.',
      icon: Layers,
      accentBg: 'bg-purple-50 text-purple-600',
      gradient: 'from-purple-50/95 via-violet-50/85 to-indigo-50/90',
      border: 'border-purple-200/90',
      glow: 'shadow-purple-300/40',
      brushColor: '#8B5CF6'
    },
    {
      id: 'summary',
      num: 5,
      title: 'Summary & Notes',
      desc: 'Template syntax reference, edge case pitfalls and key interview summaries.',
      icon: FileText,
      accentBg: 'bg-rose-50 text-rose-600',
      gradient: 'from-rose-50/95 via-orange-50/85 to-amber-50/90',
      border: 'border-rose-200/90',
      glow: 'shadow-rose-300/40',
      brushColor: '#F43F5E'
    }
  ];

  // Map activeSection id to array index (0 to 4)
  const getIndexFromId = (secId) => {
    const idx = carouselSections.findIndex((s) => s.id === secId);
    return idx >= 0 ? idx : 0;
  };

  const [activeIndex, setActiveIndex] = useState(() => getIndexFromId(activeSection));
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Synchronize internal index with activeSection prop if updated externally
  useEffect(() => {
    setActiveIndex(getIndexFromId(activeSection));
  }, [activeSection]);

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? carouselSections.length - 1 : activeIndex - 1;
    setActiveIndex(nextIdx);
    onSelectSection(carouselSections[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = activeIndex === carouselSections.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIdx);
    onSelectSection(carouselSections[nextIdx].id);
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
  }, [activeIndex]);

  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth < 1024;
  const cardSpread = isSmallScreen ? 110 : isMediumScreen ? 140 : 175;
  const maxVisible = isSmallScreen ? 1 : 2;

  return (
    <div className="relative w-full max-w-[1100px] mx-auto select-none">
      {/* 3D Cover Flow Carousel Container */}
      <div className="relative h-[280px] sm:h-[310px] md:h-[330px] flex items-center justify-center overflow-visible">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute -left-2 sm:left-2 lg:left-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md border border-indigo-100 shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Previous Section"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute -right-2 sm:right-2 lg:right-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md border border-indigo-100 shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Next Section"
        >
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Carousel Cards Layer */}
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          {carouselSections.map((item, index) => {
            const Icon = item.icon;
            const total = carouselSections.length;

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
                onClick={() => {
                  setActiveIndex(index);
                  onSelectSection(item.id);
                }}
                style={{
                  transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex
                }}
                className={`absolute w-[185px] sm:w-[220px] md:w-[240px] h-[250px] sm:h-[275px] md:h-[295px] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out backdrop-blur-xl border ${
                  item.border
                } bg-gradient-to-b ${item.gradient} shadow-xl ${item.glow} hover:shadow-indigo-400/50`}
              >
                {/* Header: Section Pill & Icon */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-600 mb-2">
                    Section {item.num} / 5
                  </span>

                  <div
                    className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center mb-2 border border-white/80 shadow-md ${
                      item.accentBg
                    } ${isActive ? 'scale-110 shadow-lg' : ''} transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <svg className="w-12 h-1.5 mt-1 opacity-80" viewBox="0 0 100 8" fill="none">
                    <path d="M2 5C35 2 70 2 98 5" stroke={item.brushColor} strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-[11px] sm:text-xs text-center leading-relaxed px-1 font-medium line-clamp-3">
                  {item.desc}
                </p>

                {/* Footer Action */}
                <div className="flex justify-center pt-1">
                  {isActive ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSection(item.id);
                      }}
                      className="group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/35 hover:shadow-indigo-500/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <span>Open Section</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                      Click to select
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Indicator Dots for 5 Sections */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {carouselSections.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => {
              setActiveIndex(idx);
              onSelectSection(sec.id);
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === activeIndex
                ? 'w-6 h-2 bg-indigo-600 shadow-sm shadow-indigo-300'
                : 'w-2 h-2 bg-slate-300/80 hover:bg-indigo-300'
            }`}
            aria-label={`Go to section ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
