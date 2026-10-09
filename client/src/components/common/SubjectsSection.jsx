import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SubjectsSection({ isVisible }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [hoveredSubjectTitle, setHoveredSubjectTitle] = useState('');
  const [isInsideSection, setIsInsideSection] = useState(false);
  const subjects = [
    {
      id: 'dsa',
      title: 'DSA',
      subtitle: 'Algorithms • Data Structures',
      gradient: 'from-amber-50/95 via-yellow-50/90 to-orange-50/85',
      border: 'border-amber-200/90',
      shadow: 'hover:shadow-amber-400/35',
      renderGraphic: () => (
        <div className="flex items-center justify-between w-full h-24 px-1">
          {/* 3D Isometric Tree / Graph Nodes (matching Image 2) */}
          <div className="relative w-28 h-20 flex items-center justify-center">
            <svg viewBox="0 0 120 90" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="nodeTopYel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="nodeTopPurp" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C084FC" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
                <linearGradient id="nodeTopCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#67E8F9" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>

              {/* Connecting Tree Branch Lines */}
              <path
                d="M 60 26 L 60 42 L 28 42 L 28 58"
                fill="none"
                stroke="#6366F1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 60 42 L 92 42 L 92 58"
                fill="none"
                stroke="#6366F1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Top Node (3D Isometric Cube) */}
              <g className="group-hover:-translate-y-1 transition-transform duration-300">
                <rect x="44" y="10" width="32" height="18" rx="5" fill="url(#nodeTopYel)" stroke="#D97706" strokeWidth="1.2" />
                <rect x="44" y="24" width="32" height="5" rx="2" fill="#B45309" opacity="0.4" />
                <circle cx="60" cy="19" r="3" fill="#FFF" opacity="0.9" />
              </g>

              {/* Left Child Node (3D Purple Cube) */}
              <g className="group-hover:translate-x-[-2px] transition-transform duration-300">
                <rect x="14" y="56" width="28" height="18" rx="5" fill="url(#nodeTopPurp)" stroke="#7E22CE" strokeWidth="1.2" />
                <rect x="14" y="70" width="28" height="4" rx="2" fill="#581C87" opacity="0.4" />
                <circle cx="28" cy="65" r="2.5" fill="#FFF" opacity="0.9" />
              </g>

              {/* Right Child Node (3D Cyan Cube) */}
              <g className="group-hover:translate-x-[2px] transition-transform duration-300">
                <rect x="78" y="56" width="28" height="18" rx="5" fill="url(#nodeTopCyan)" stroke="#0891B2" strokeWidth="1.2" />
                <rect x="78" y="70" width="28" height="4" rx="2" fill="#164E63" opacity="0.4" />
                <circle cx="92" cy="65" r="2.5" fill="#FFF" opacity="0.9" />
              </g>
            </svg>
          </div>

          {/* 3D Angled Isometric Coding Laptop (matching Image 2) */}
          <div className="relative w-32 h-24 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 140 100" className="w-full h-full drop-shadow-xl">
              <defs>
                <linearGradient id="laptopLid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="laptopBezel" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                <linearGradient id="laptopBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
              </defs>

              {/* 3D Angled Screen Lid */}
              <path
                d="M 35 12 L 125 12 Q 130 12 129 17 L 118 70 Q 117 73 113 73 L 28 73 Q 24 73 25 69 L 31 16 Q 32 12 35 12 Z"
                fill="url(#laptopBezel)"
                stroke="#475569"
                strokeWidth="1.5"
              />

              {/* Screen Display Glass */}
              <path
                d="M 38 18 L 122 18 L 113 67 L 31 67 Z"
                fill="url(#laptopLid)"
              />

              {/* Window Controls (Red, Yellow, Green dots) */}
              <circle cx="43" cy="24" r="2" fill="#F43F5E" />
              <circle cx="49" cy="24" r="2" fill="#FBBF24" />
              <circle cx="55" cy="24" r="2" fill="#10B981" />

              {/* Vibrant IDE Code Lines */}
              <line x1="43" y1="32" x2="85" y2="32" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="48" y1="40" x2="105" y2="40" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="56" y1="48" x2="98" y2="48" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="48" y1="56" x2="78" y2="56" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />

              {/* 3D Isometric Keyboard Base (Trapezoid) */}
              <path
                d="M 28 73 L 113 73 L 132 87 Q 133 89 130 89 L 8 89 Q 5 89 7 86 Z"
                fill="url(#laptopBaseGrad)"
                stroke="#64748B"
                strokeWidth="1.2"
              />
              {/* Trackpad */}
              <path
                d="M 60 80 L 80 80 L 83 86 L 57 86 Z"
                fill="#CBD5E1"
                stroke="#94A3B8"
                strokeWidth="0.8"
              />
            </svg>
          </div>
        </div>
      )
    },
    {
      id: 'oops',
      title: 'OOPS',
      subtitle: 'Concepts • Practice • MCQs',
      gradient: 'from-rose-50/95 via-pink-50/90 to-purple-50/85',
      border: 'border-rose-200/90',
      shadow: 'hover:shadow-rose-400/35',
      renderGraphic: () => (
        <div className="relative flex items-center justify-center w-full h-24 px-1">
          <svg viewBox="0 0 200 95" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="oopsClassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="oopsObjGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>
              <linearGradient id="oopsInhGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D8B4FE" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
              <radialGradient id="sphereShine" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#9F1239" />
              </radialGradient>
            </defs>

            {/* 3D Class Card */}
            <g className="group-hover:-translate-y-1 transition-transform duration-300">
              <rect x="15" y="24" width="46" height="48" rx="10" fill="url(#oopsClassGrad)" stroke="#2563EB" strokeWidth="1.2" />
              <rect x="15" y="66" width="46" height="6" rx="3" fill="#1E40AF" opacity="0.4" />
              <text x="38" y="44" fill="#FFF" fontSize="16" fontWeight="bold" textAnchor="middle">=</text>
              <text x="38" y="60" fill="#FFF" fontSize="9" fontWeight="900" textAnchor="middle">Class</text>
            </g>

            {/* 3D Object Card with Specular Sphere */}
            <g className="group-hover:scale-105 transition-transform duration-300">
              <rect x="74" y="16" width="50" height="56" rx="12" fill="url(#oopsObjGrad)" stroke="#BE123C" strokeWidth="1.2" />
              <rect x="74" y="66" width="50" height="6" rx="3" fill="#881337" opacity="0.4" />
              <circle cx="99" cy="38" r="10" fill="url(#sphereShine)" />
              <text x="99" y="62" fill="#FFF" fontSize="9" fontWeight="900" textAnchor="middle">Object</text>
            </g>

            {/* 3D Inheritance Card */}
            <g className="group-hover:-translate-y-1 transition-transform duration-300">
              <rect x="138" y="24" width="52" height="48" rx="10" fill="url(#oopsInhGrad)" stroke="#6D28D9" strokeWidth="1.2" />
              <rect x="138" y="66" width="52" height="6" rx="3" fill="#4C1D95" opacity="0.4" />
              <circle cx="158" cy="40" r="3" fill="#FFF" />
              <circle cx="170" cy="40" r="3" fill="#FFF" />
              <text x="164" y="60" fill="#FFF" fontSize="8" fontWeight="900" textAnchor="middle">Inherit</text>
            </g>

            {/* Upward Curving 3D Purple Arrow */}
            <path
              d="M 125 24 C 140 8 160 8 175 14"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <polygon points="180,16 172,10 173,18" fill="#4F46E5" />
          </svg>
        </div>
      )
    },
    {
      id: 'dbms',
      title: 'DBMS',
      subtitle: 'SQL • Concepts • Practice',
      gradient: 'from-indigo-50/95 via-purple-50/90 to-blue-50/85',
      border: 'border-indigo-200/90',
      shadow: 'hover:shadow-indigo-400/35',
      renderGraphic: () => (
        <div className="flex items-center justify-center w-full h-24 px-1">
          <svg viewBox="0 0 200 95" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="dbDiskTop" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#4338CA" />
              </linearGradient>
              <linearGradient id="dbDiskSide" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="50%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#3730A3" />
              </linearGradient>
            </defs>

            {/* 3D Database Cylinder Stack (Disks) */}
            <g className="group-hover:scale-105 transition-transform duration-300">
              {/* Cylinder 3 (Bottom) */}
              <path d="M 30 58 A 28 8 0 0 0 86 58 L 86 70 A 28 8 0 0 1 30 70 Z" fill="url(#dbDiskSide)" />
              <ellipse cx="58" cy="58" rx="28" ry="8" fill="url(#dbDiskTop)" stroke="#3730A3" strokeWidth="0.8" />
              <ellipse cx="58" cy="70" rx="28" ry="8" fill="url(#dbDiskTop)" stroke="#3730A3" strokeWidth="0.8" />

              {/* Cylinder 2 (Middle) */}
              <path d="M 30 40 A 28 8 0 0 0 86 40 L 86 52 A 28 8 0 0 1 30 52 Z" fill="url(#dbDiskSide)" />
              <ellipse cx="58" cy="40" rx="28" ry="8" fill="url(#dbDiskTop)" stroke="#3730A3" strokeWidth="0.8" />
              <ellipse cx="58" cy="52" rx="28" ry="8" fill="url(#dbDiskTop)" stroke="#3730A3" strokeWidth="0.8" />

              {/* Cylinder 1 (Top) */}
              <path d="M 30 22 A 28 8 0 0 0 86 22 L 86 34 A 28 8 0 0 1 30 34 Z" fill="url(#dbDiskSide)" />
              <ellipse cx="58" cy="22" rx="28" ry="8" fill="url(#dbDiskTop)" stroke="#3730A3" strokeWidth="0.8" />
              <ellipse cx="58" cy="34" rx="28" ry="8" fill="url(#dbDiskTop)" stroke="#3730A3" strokeWidth="0.8" />
            </g>

            {/* Floating 3D SQL Block Badge */}
            <g className="group-hover:-translate-y-1 transition-transform duration-300">
              <rect x="76" y="44" width="38" height="22" rx="6" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="1.5" />
              <rect x="76" y="62" width="38" height="4" rx="2" fill="#312E81" />
              <text x="95" y="59" fill="#FFF" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.8">SQL</text>
            </g>

            {/* Floating Query Table Result Sheet */}
            <g className="group-hover:translate-x-1 transition-transform duration-300">
              <rect x="122" y="22" width="58" height="48" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
              {/* Header bar */}
              <rect x="122" y="22" width="58" height="12" rx="6" fill="#EEF2FF" />
              <line x1="128" y1="28" x2="152" y2="28" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
              {/* Rows */}
              <line x1="128" y1="40" x2="172" y2="40" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="128" y1="48" x2="164" y2="48" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="128" y1="56" x2="170" y2="56" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
              {/* Grid vertical border */}
              <line x1="146" y1="22" x2="146" y2="70" stroke="#F1F5F9" strokeWidth="1" />
            </g>
          </svg>
        </div>
      )
    },
    {
      id: 'os',
      title: 'Operating Systems',
      subtitle: 'Concepts • Diagrams • Practice',
      gradient: 'from-emerald-50/95 via-teal-50/90 to-cyan-50/85',
      border: 'border-emerald-200/90',
      shadow: 'hover:shadow-emerald-400/35',
      renderGraphic: () => (
        <div className="flex items-center justify-center w-full h-24 px-1">
          <svg viewBox="0 0 200 95" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="gearCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
              <linearGradient id="gearPurpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>

            {/* 3D Interlocking Mechanical Gears */}
            <g className="group-hover:rotate-45 transition-transform duration-700" style={{ transformOrigin: '55px 48px' }}>
              {/* Large Cyan Cog */}
              <circle cx="55" cy="48" r="22" fill="url(#gearCyanGrad)" stroke="#0F766E" strokeWidth="1.5" />
              {/* Cog Teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect
                  key={angle}
                  x="51"
                  y="20"
                  width="8"
                  height="7"
                  rx="1.5"
                  fill="url(#gearCyanGrad)"
                  stroke="#0F766E"
                  strokeWidth="1"
                  transform={`rotate(${angle} 55 48)`}
                />
              ))}
              <circle cx="55" cy="48" r="8" fill="#F0FDFA" stroke="#0D9488" strokeWidth="1.5" />
            </g>

            {/* Smaller Interlocked Purple Cog */}
            <g className="group-hover:-rotate-45 transition-transform duration-700" style={{ transformOrigin: '88px 62px' }}>
              <circle cx="88" cy="62" r="14" fill="url(#gearPurpGrad)" stroke="#5B21B6" strokeWidth="1.2" />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <rect
                  key={angle}
                  x="85"
                  y="44"
                  width="6"
                  height="5"
                  rx="1"
                  fill="url(#gearPurpGrad)"
                  stroke="#5B21B6"
                  strokeWidth="0.8"
                  transform={`rotate(${angle} 88 62)`}
                />
              ))}
              <circle cx="88" cy="62" r="5" fill="#FAF5FF" stroke="#7C3AED" strokeWidth="1.2" />
            </g>

            {/* 3D Desktop OS Application Window */}
            <g className="group-hover:translate-y-[-2px] transition-transform duration-300">
              <rect x="116" y="20" width="68" height="52" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
              {/* Window Header */}
              <rect x="116" y="20" width="68" height="12" rx="6" fill="#F8FAFC" />
              <circle cx="123" cy="26" r="1.8" fill="#F43F5E" />
              <circle cx="128" cy="26" r="1.8" fill="#FBBF24" />
              <circle cx="133" cy="26" r="1.8" fill="#10B981" />
              <line x1="145" y1="26" x2="176" y2="26" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

              {/* Progress & Process Scheduling Meters */}
              <rect x="122" y="38" width="56" height="5" rx="2.5" fill="#CCFBF1" />
              <rect x="122" y="38" width="38" height="5" rx="2.5" fill="#0D9488" />

              <rect x="122" y="48" width="56" height="5" rx="2.5" fill="#EDE9FE" />
              <rect x="122" y="48" width="26" height="5" rx="2.5" fill="#7C3AED" />

              <rect x="122" y="58" width="56" height="5" rx="2.5" fill="#FEE2E2" />
              <rect x="122" y="58" width="45" height="5" rx="2.5" fill="#E11D48" />
            </g>
          </svg>
        </div>
      )
    },
    {
      id: 'cn',
      title: 'Computer Networks',
      subtitle: 'Concepts • Diagrams • Practice',
      gradient: 'from-sky-50/95 via-blue-50/90 to-indigo-50/85',
      border: 'border-sky-200/90',
      shadow: 'hover:shadow-sky-400/35',
      renderGraphic: () => (
        <div className="flex items-center justify-center w-full h-24 px-1">
          <svg viewBox="0 0 200 95" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="60%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
            </defs>

            {/* 3D Wireframe Globe Sphere */}
            <g className="group-hover:scale-105 transition-transform duration-300">
              <circle cx="85" cy="48" r="28" fill="url(#globeGrad)" stroke="#1D4ED8" strokeWidth="1.5" />
              
              {/* Latitude and Longitude Wireframe Rings */}
              <ellipse cx="85" cy="48" rx="28" ry="12" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
              <ellipse cx="85" cy="48" rx="14" ry="28" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
              <line x1="85" y1="20" x2="85" y2="76" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
              <line x1="57" y1="48" x2="113" y2="48" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />

              {/* Glowing Network Node Dots */}
              <circle cx="75" cy="40" r="3" fill="#FCD34D" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="95" cy="56" r="3" fill="#34D399" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="85" cy="20" r="2.5" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="102" cy="38" r="2.5" fill="#FFFFFF" />
            </g>

            {/* Floating 3D Cloud with Wifi Wave Broadcast */}
            <g className="group-hover:-translate-y-1 transition-transform duration-300">
              {/* Cloud Base */}
              <path
                d="M 132 58 L 168 58 Q 176 58 176 50 Q 176 43 170 41 Q 170 33 162 31 Q 155 30 150 35 Q 146 31 138 33 Q 131 35 130 43 Q 124 45 124 51 Q 124 58 132 58 Z"
                fill="#FFFFFF"
                stroke="#BAE6FD"
                strokeWidth="1.5"
              />
              
              {/* Wifi Waves Expanding */}
              <path d="M 144 26 Q 150 21 156 26" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
              <path d="M 140 21 Q 150 14 160 21" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
              <path d="M 136 16 Q 150 7 164 16" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              
              <circle cx="150" cy="30" r="2" fill="#0284C7" />
            </g>

            {/* Packet Stream Arcs */}
            <path
              d="M 110 36 Q 125 24 136 34"
              fill="none"
              stroke="#6366F1"
              strokeWidth="2"
              strokeDasharray="3 3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )
    },
    {
      id: 'aptitude',
      title: 'Aptitude',
      subtitle: 'Quantitative • Verbal • Logical',
      gradient: 'from-purple-50/95 via-fuchsia-50/90 to-indigo-50/85',
      border: 'border-purple-200/90',
      shadow: 'hover:shadow-purple-400/35',
      renderGraphic: () => (
        <div className="flex items-center justify-center w-full h-24 px-1">
          <svg viewBox="0 0 200 95" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="bar1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="bar2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#DB2777" />
              </linearGradient>
              <linearGradient id="bar3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>

            {/* 3D Rising Bar Chart Columns */}
            <g className="group-hover:scale-105 transition-transform duration-300">
              {/* Bar 1 (Short - Amber) */}
              <rect x="25" y="44" width="14" height="30" rx="3" fill="url(#bar1Grad)" stroke="#B45309" strokeWidth="0.8" />
              <ellipse cx="32" cy="44" rx="7" ry="2.5" fill="#FDE68A" />

              {/* Bar 2 (Medium - Rose) */}
              <rect x="43" y="30" width="14" height="44" rx="3" fill="url(#bar2Grad)" stroke="#9F1239" strokeWidth="0.8" />
              <ellipse cx="50" cy="30" rx="7" ry="2.5" fill="#FBCFE8" />

              {/* Bar 3 (Tall - Purple) */}
              <rect x="61" y="16" width="14" height="58" rx="3" fill="url(#bar3Grad)" stroke="#3730A3" strokeWidth="0.8" />
              <ellipse cx="68" cy="16" rx="7" ry="2.5" fill="#C7D2FE" />
            </g>

            {/* Tilted MCQ Test Document */}
            <g className="group-hover:-translate-y-1 transition-transform duration-300">
              <rect x="94" y="18" width="42" height="56" rx="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
              {/* Question items with green checkboxes */}
              <rect x="99" y="26" width="6" height="6" rx="1.5" fill="#10B981" />
              <line x1="108" y1="29" x2="130" y2="29" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />

              <rect x="99" y="38" width="6" height="6" rx="1.5" fill="#10B981" />
              <line x1="108" y1="41" x2="128" y2="41" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />

              <rect x="99" y="50" width="6" height="6" rx="1.5" fill="#6366F1" />
              <line x1="108" y1="53" x2="125" y2="53" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* 3D Pocket Calculator */}
            <g className="group-hover:translate-x-1 transition-transform duration-300">
              <rect x="146" y="22" width="38" height="52" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.2" />
              {/* LCD Display */}
              <rect x="151" y="28" width="28" height="10" rx="3" fill="#6EE7B7" />
              <text x="176" y="36" fill="#064E3B" fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                98%
              </text>
              {/* Keypad Grid */}
              <rect x="151" y="42" width="6" height="5" rx="1.5" fill="#F43F5E" />
              <rect x="160" y="42" width="6" height="5" rx="1.5" fill="#64748B" />
              <rect x="169" y="42" width="10" height="5" rx="1.5" fill="#818CF8" />

              <rect x="151" y="50" width="6" height="5" rx="1.5" fill="#64748B" />
              <rect x="160" y="50" width="6" height="5" rx="1.5" fill="#64748B" />
              <rect x="169" y="50" width="10" height="5" rx="1.5" fill="#818CF8" />

              <rect x="151" y="58" width="15" height="5" rx="1.5" fill="#64748B" />
              <rect x="169" y="58" width="10" height="5" rx="1.5" fill="#10B981" />
            </g>
          </svg>
        </div>
      )
    }
  ];

  // Mouse position tracking within Subjects section
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsInsideSection(true);
  };

  const handleMouseEnter = () => setIsInsideSection(true);
  const handleMouseLeave = () => {
    setIsInsideSection(false);
    setIsHoveringCard(false);
    setHoveredSubjectTitle('');
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 w-full max-w-[1350px] mx-auto my-auto flex flex-col justify-center select-none py-2 cursor-crosshair"
    >
      {/* ======================================================================= */}
      {/* 🎯 INTERACTIVE TARGET CURSOR RETICLE                                    */}
      {/* ======================================================================= */}
      {isInsideSection && (
        <div
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute pointer-events-none z-50 hidden md:block transition-transform duration-75 ease-out"
        >
          <div
            className={`relative flex items-center justify-center transition-all duration-300 ${
              isHoveringCard ? 'scale-125' : 'scale-100'
            }`}
          >
            {/* Outer Circular Crosshair Target Reticle */}
            <div
              className={`w-11 h-11 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative ${
                isHoveringCard
                  ? 'border-indigo-600 bg-indigo-500/15 shadow-[0_0_22px_rgba(99,102,241,0.65)] ring-4 ring-indigo-400/30'
                  : 'border-indigo-500/80 bg-white/20 backdrop-blur-[1px] shadow-sm'
              }`}
            >
              {/* 4 Precision Crosshair Sight Ticks */}
              <span className="absolute -top-2 w-0.5 h-2 bg-indigo-600" />
              <span className="absolute -bottom-2 w-0.5 h-2 bg-indigo-600" />
              <span className="absolute -left-2 w-2 h-0.5 bg-indigo-600" />
              <span className="absolute -right-2 w-2 h-0.5 bg-indigo-600" />

              {/* Inner Dashed Radar Ring */}
              <div
                className={`w-5 h-5 rounded-full border border-dashed transition-all duration-300 ${
                  isHoveringCard ? 'border-indigo-600 animate-spin-infinite-fast' : 'border-indigo-400/60'
                }`}
              />

              {/* Center Precision Laser Aim Dot */}
              <span
                className={`rounded-full transition-all duration-300 ${
                  isHoveringCard
                    ? 'w-2 h-2 bg-indigo-600 shadow-md animate-ping'
                    : 'w-1.5 h-1.5 bg-indigo-500'
                }`}
              />
            </div>

            {/* Target Lock On HUD Callout */}
            {isHoveringCard && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900/95 text-white text-[9px] font-black tracking-wider uppercase border border-indigo-400 shadow-lg whitespace-nowrap animate-fade-in-up flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>TARGET: {hoveredSubjectTitle}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header Area Centered with Staggered Scroll-Float-Appear Animation */}
      <div className="relative flex flex-col items-center justify-center text-center mb-3 sm:mb-4 px-2 max-w-2xl mx-auto">
        {/* Top Mini Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-indigo-200/90 shadow-sm text-xs font-bold text-indigo-700 mb-1.5 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-amber-500 font-bold text-xs">✦</span>
          <span>Master Your Core Curriculum</span>
        </div>

        {/* Master Headline: Choose Your Subject */}
        <div
          className={`flex items-center justify-center gap-2 flex-wrap transition-all duration-700 delay-100 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-indigo-600 font-black text-lg tracking-tighter select-none">\ | /</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Subject
            </span>
          </h2>
          <span className="text-indigo-600 font-black text-lg tracking-tighter select-none">\ | /</span>
        </div>

        {/* Centered Subtitle with Hand-drawn Underline */}
        <div
          className={`relative inline-block mt-0.5 transition-all duration-700 delay-200 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide font-serif italic">
            Learn • Practice • Improve • Get Placement Ready
          </p>
          <svg
            className="w-36 sm:w-44 h-2 text-indigo-500/80 mx-auto -mt-0.5"
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

        {/* Right Doodle Annotation Positioned Absolutely so it doesn't skew center */}
        <div
          className={`hidden xl:flex items-center gap-2 absolute -right-48 top-1 text-indigo-700 pointer-events-none transition-all duration-700 delay-250 ease-out transform ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'
          }`}
        >
          <svg className="w-8 h-8 -rotate-12" viewBox="0 0 50 50" fill="none">
            <path
              d="M 40 40 C 25 35 15 20 20 8"
              stroke="#4338CA"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 14 14 L 20 8 L 26 12"
              stroke="#4338CA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="font-extrabold text-[11px] sm:text-xs text-slate-800 font-serif leading-tight text-left">
            Master Concepts<br />
            Build Confidence<br />
            Get Placement Ready
            <span className="block text-indigo-600 text-sm font-sans mt-0.5">☺</span>
          </div>
        </div>
      </div>

      {/* 2x3 Grid: 6 Subject Cards with Staggered Scroll-Float-Appear */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 xl:gap-4 w-full max-w-[1260px] mx-auto">
        {subjects.map((sub, index) => (
          <div
            key={sub.id}
            onClick={() => navigate(`/signup?subject=${sub.id}`)}
            onMouseEnter={() => {
              setIsHoveringCard(true);
              setHoveredSubjectTitle(sub.title);
            }}
            onMouseLeave={() => {
              setIsHoveringCard(false);
              setHoveredSubjectTitle('');
            }}
            style={{
              transitionDelay: `${200 + index * 100}ms`
            }}
            className={`group relative rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-700 ease-out backdrop-blur-xl border ${
              sub.border
            } bg-gradient-to-br ${sub.gradient} shadow-md hover:shadow-2xl ${
              sub.shadow
            } hover:-translate-y-2 hover:scale-[1.025] transform ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            {/* Top Graphic Illustration */}
            <div className="w-full flex items-center justify-center pt-1 pb-1">
              {sub.renderGraphic()}
            </div>

            {/* Bottom Details + Action Arrow */}
            <div className="flex items-end justify-between pt-2 border-t border-slate-200/50">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                  {sub.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] font-semibold text-slate-600 tracking-wide mt-0.5">
                  {sub.subtitle}
                </p>
              </div>

              {/* Circular Action Button */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/signup?subject=${sub.id}`);
                }}
                className="w-8 h-8 rounded-full bg-white/95 border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:translate-x-1 group-hover:shadow-md transition-all duration-300 shrink-0"
                title="Create account to start practice"
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
