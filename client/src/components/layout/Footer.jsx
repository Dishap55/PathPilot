import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Code2, Database, Share2, Package, Cpu, BarChart3, ChevronRight } from 'lucide-react';

export default function Footer() {
  const scrollToNav = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-300 pt-16 pb-8 relative overflow-hidden z-20">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-24 bg-indigo-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Description (Col Span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 -rotate-12 translate-x-0.5"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                PathPilot
              </span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-200">
                AI-Powered Adaptive Learning & Placement Platform
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Learn smarter. Practice better. Prepare with confidence.
              </p>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => scrollToNav('home')} className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToNav('features')} className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" /> Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToNav('subjects')} className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" /> Subjects
                </button>
              </li>
              <li>
                <button onClick={() => scrollToNav('placement-prep')} className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" /> Placement Prep
                </button>
              </li>
              <li>
                <button onClick={() => scrollToNav('how-it-works')} className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" /> How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToNav('about-us')} className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" /> About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Subjects Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Curriculum</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/signup?subject=dsa" className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <Code2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" /> DSA
                </Link>
              </li>
              <li>
                <Link to="/signup?subject=aptitude" className="hover:text-purple-400 transition-colors flex items-center gap-2 group">
                  <BarChart3 className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" /> Aptitude
                </Link>
              </li>
              <li>
                <Link to="/signup?subject=oops" className="hover:text-rose-400 transition-colors flex items-center gap-2 group">
                  <Package className="w-3.5 h-3.5 text-slate-600 group-hover:text-rose-400 transition-colors" /> OOPS
                </Link>
              </li>
              <li>
                <Link to="/signup?subject=dbms" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <Database className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" /> DBMS
                </Link>
              </li>
              <li>
                <Link to="/signup?subject=os" className="hover:text-sky-400 transition-colors flex items-center gap-2 group">
                  <Cpu className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-colors" /> Operating Systems
                </Link>
              </li>
              <li>
                <Link to="/signup?subject=cn" className="hover:text-pink-400 transition-colors flex items-center gap-2 group">
                  <Share2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-pink-400 transition-colors" /> Computer Networks
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Account</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" /> Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" /> Sign Up
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            &copy; 2026 PathPilot. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Built to help students learn, practice, and prepare for placements.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
