import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Eye, Sparkles, Moon, Sun, ArrowLeft, RefreshCw, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader, { PageLoader, CardLoader } from '../../components/common/Loader';
import { useLoading } from '../../context/LoadingContext';
import Button from '../../components/common/Button';

/**
 * PathPilot Loader Visual Inspection Workbench
 * Temporary development-only preview for inspecting loader animations, sizes,
 * dark/light contrasts, and full-screen states.
 */
export default function LoaderPreview() {
  const [isFullScreenActive, setIsFullScreenActive] = useState(false);
  const [fullScreenText, setFullScreenText] = useState('Calibrating placement roadmap...');
  const [selectedSize, setSelectedSize] = useState('lg');
  const [isCardLoading, setIsCardLoading] = useState(false);
  const [customText, setCustomText] = useState('Optimizing placement mental models...');

  // Also test Global Loading Context hook
  const { showLoading, hideLoading, isLoading: isGlobalLoading } = useLoading();

  // Handle ESC key to dismiss full screen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullScreenActive(false);
        hideLoading();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hideLoading]);

  const sizes = [
    { key: 'xs', name: 'Extra Small (xs)', desc: '22px • For buttons & tight inline chips' },
    { key: 'sm', name: 'Small (sm)', desc: '34px • For hints & compact action cards' },
    { key: 'md', name: 'Medium (md)', desc: '56px • For cards & widget data hydration' },
    { key: 'lg', name: 'Large (lg)', desc: '84px • For full-page initial load' },
    { key: 'xl', name: 'Extra Large (xl)', desc: '112px • For hero / splash screens' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 font-sans selection:bg-indigo-100">
      {/* 1. Header Toolbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-700">
                  Dev Only
                </span>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  PathPilot Loader Inspection Suite
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Visual testing workbench for rotating metallic ring, stationary logo, and sizes.
              </p>
            </div>
          </div>

          {/* Full Screen Test Controls */}
          <div className="flex items-center gap-2.5">
            {!isFullScreenActive ? (
              <Button
                variant="primary"
                onClick={() => setIsFullScreenActive(true)}
                iconLeft={Play}
                className="shadow-sm"
              >
                Start Full-Screen Loader
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={() => setIsFullScreenActive(false)}
                iconLeft={Square}
                className="shadow-sm"
              >
                Stop Loading
              </Button>
            )}

            {/* Test Global Context */}
            <Button
              variant="outline"
              onClick={() => {
                showLoading('Global Context: Syncing student proficiency garden...');
                setTimeout(() => hideLoading(), 4000);
              }}
              iconLeft={Sparkles}
            >
              Test Global Provider (4s)
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
        {/* Section 1: Standardized Size Matrix on Light Canvas */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Sun size={15} />
            <span>Light Background Suite (Default PathPilot Canvas)</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            All 5 Standard Sizes with Stationary Logo & Rotating Metallic Ring
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {sizes.map((s) => (
              <div
                key={s.key}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-md transition-shadow min-h-[260px]"
              >
                <div className="flex-1 flex items-center justify-center py-4 w-full">
                  <Loader size={s.key} />
                </div>
                <div className="pt-3 border-t border-slate-100 w-full space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                    size="{s.key}"
                  </span>
                  <p className="text-xs font-bold text-slate-800">{s.name}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Standardized Size Matrix on Dark Canvas */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
            <Moon size={15} />
            <span>Dark Background Suite (Contrast & Specular Reflection Check)</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Metallic Ring Iridescent Lighting on Dark Surface
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {sizes.map((s) => (
              <div
                key={`dark-${s.key}`}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-md min-h-[260px]"
              >
                <div className="flex-1 flex items-center justify-center py-4 w-full">
                  <Loader size={s.key} />
                </div>
                <div className="pt-3 border-t border-slate-800/80 w-full space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300">
                    size="{s.key}"
                  </span>
                  <p className="text-xs font-bold text-white">{s.name}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Text Label & Shimmer Variations */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Sparkles size={15} />
            <span>Loaders with Dynamic Status Typography</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Animated Status Message Integration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xs">
              <Loader size="lg" text="Calibrating placement roadmap..." />
              <span className="mt-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Full-page roadmap load
              </span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xs">
              <Loader size="md" text="Consulting PathPilot AI Mentor..." />
              <span className="mt-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Interactive AI mentor response
              </span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xs">
              <Loader size="lg" text="Evaluating live sandbox code..." />
              <span className="mt-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Reassessment sandbox submission
              </span>
            </div>
          </div>
        </section>

        {/* Section 4: Card Overlay Mode Simulation */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Container Overlay Mode
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Card-Level Blur Overlay Preview
              </h2>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsCardLoading(prev => !prev)}
            >
              {isCardLoading ? 'Clear Overlay' : 'Simulate Async Action'}
            </Button>
          </div>

          <div className="relative bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs overflow-hidden">
            {/* Underlying content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Student Placement Velocity Metric</h3>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Level 4 Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                This simulated component demonstrates the `overlay` prop. When triggered, a glassmorphic
                backdrop seamlessly covers only this card while the PathPilot metallic loader spins smoothly.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl text-center">
                  <div className="text-lg font-bold text-slate-800">84%</div>
                  <div className="text-[10px] text-slate-400">Accuracy</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-center">
                  <div className="text-lg font-bold text-slate-800">18</div>
                  <div className="text-[10px] text-slate-400">Milestones</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-center">
                  <div className="text-lg font-bold text-slate-800">4.2d</div>
                  <div className="text-[10px] text-slate-400">Streak</div>
                </div>
              </div>
            </div>

            {/* Overlay Loader */}
            <AnimatePresence>
              {isCardLoading && (
                <Loader overlay size="md" text="Syncing metrics..." />
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Manual Full-Screen Loader Modal with Dismiss Control */}
      <AnimatePresence>
        {isFullScreenActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
            {/* Top right escape / dismiss button */}
            <button
              onClick={() => setIsFullScreenActive(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <X size={16} />
              <span>Dismiss (ESC)</span>
            </button>

            {/* Centered Large Loader with Text */}
            <div className="flex flex-col items-center">
              <Loader size="xl" text={fullScreenText} />

              <div className="mt-8 flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsFullScreenActive(false)}
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
