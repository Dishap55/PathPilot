import React from 'react';
import StageCard from './StageCard';
import { tokens } from '../../styles/tokens';

/**
 * PathPilot GardenProgression Component
 * 
 * Renders the 4 Learning Garden stages with curved growth visual connectors:
 * - Desktop (>= 1024px): 4 cards in a single row connected by curved / half-circle growth arcs
 * - Tablet (768px - 1023px): 2 x 2 responsive grid
 * - Mobile (< 768px): Single-column stack connected by curved downward growth stems
 */

export default function GardenProgression({ className = '' }) {
  const stages = tokens.gardenStages;

  return (
    <div className={`w-full ${className}`}>
      {/* 
        Responsive Layout Grid:
        - lg:grid-cols-4 (Desktop: 4 in a row)
        - sm:grid-cols-2 (Tablet: 2x2 grid)
        - grid-cols-1 (Mobile: single column)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 relative">
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;

          return (
            <React.Fragment key={stage.id}>
              <div className="flex flex-col relative group">
                <StageCard stage={stage} />

                {/* Mobile curved downward connecting stem (hidden on tablet and desktop) */}
                {!isLast && (
                  <div className="flex flex-col items-center justify-center py-2 sm:hidden text-emerald-400">
                    <svg
                      className="w-7 h-11 text-emerald-400 drop-shadow-xs"
                      viewBox="0 0 28 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      {/* Curved vertical stem */}
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
                      {/* Growth leaf/bud node */}
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
                    top: '20%',
                    left: `calc(${(index + 1) * 25}% - 28px)`
                  }}
                  aria-hidden="true"
                >
                  <div className="flex flex-col items-center">
                    {/* Curved Half-Circle Growth Arc SVG */}
                    <svg
                      className="w-14 h-9 text-emerald-400 drop-shadow-xs"
                      viewBox="0 0 56 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Upward arched growth curve */}
                      <path
                        d="M 6 30 C 12 8, 44 8, 50 26"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                        strokeLinecap="round"
                      />
                      {/* Arrowhead along the arc trajectory */}
                      <path
                        d="M 44 19 L 51 27 L 42 29"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Growth node in center of arch */}
                      <circle cx="28" cy="11" r="3" fill="#10B981" />
                    </svg>
                    <span className="text-[9px] font-bold text-emerald-600/80 -mt-1 tracking-wider uppercase">
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
  );
}
