import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  TrendingUp,
  CheckCircle2,
  User,
  ChevronsLeft,
  ChevronsRight,
  X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * PathPilot Responsive Collapsible Sidebar
 * 
 * Implements:
 * - Dynamic single sidebar switching smoothly between Expanded (w-64) and Minimized (w-20)
 * - Clear toggle button at top ([ « ] in expanded -> [ » ] in minimized)
 * - Minimized icon tooltips on hover & keyboard focus
 * - Garden illustration & "Keep Growing!" card shown only in expanded mode
 * - Persistent collapse state in localStorage
 * - Seamless mobile drawer (md:hidden) triggered by navbar hamburger
 * - Dynamic route matching using React Router location/path
 * - Dynamic authenticated student identity (zero mock data)
 */

export default function Sidebar({
  mobileOpen = false,
  onClose = () => {}
}) {
  const location = useLocation();
  const { user } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('pathpilot_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  // Handle keyboard accessibility (Escape closes mobile drawer)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, onClose]);

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('pathpilot_sidebar_collapsed', String(next));
      } catch (e) {
        console.warn('[Sidebar] Storage write error:', e);
      }
      return next;
    });
  };

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/roadmap', label: 'Roadmap', icon: Compass },
    { to: '/subjects', label: 'Subjects', icon: BookOpen },
    { to: '/progress', label: 'Progress', icon: TrendingUp },
    { to: '/reassessment', label: 'Periodic Reassessment', icon: CheckCircle2 },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  // Dynamic active-route evaluator based on React Router location pathname
  const isItemActive = (to) => {
    const p = location.pathname;

    if (to === '/dashboard') {
      return p === '/dashboard';
    }
    if (to === '/roadmap') {
      return p === '/roadmap' || p.startsWith('/roadmap/milestone');
    }
    if (to === '/subjects') {
      return p === '/subjects' || p === '/practice' || p.startsWith('/subjects/') || p.startsWith('/aptitude') || p.startsWith('/oops') || p.startsWith('/dbms') || p.startsWith('/os') || p.startsWith('/cn');
    }
    if (to === '/progress') {
      return p === '/progress';
    }
    if (to === '/reassessment') {
      return p.startsWith('/reassessment');
    }
    if (to === '/profile') {
      return p === '/profile' || p === '/profile-setup' || p === '/setup';
    }
    return p === to;
  };

  // Dynamic user data resolution (authentically loaded)
  const studentName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
  const studentEmail = user?.email || '';
  const initial = studentName.charAt(0).toUpperCase();

  // Render navigation links list with support for expanded & minimized states
  const renderNavLinks = (collapsed = false) => (
    <nav className="space-y-1.5" aria-label="Main Navigation">
      {links.map((item) => {
        const Icon = item.icon;
        const active = isItemActive(item.to);

        return (
          <div key={item.label} className="relative group">
            <NavLink
              to={item.to}
              onClick={onClose}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 ${
                collapsed ? 'justify-center px-0' : 'px-3.5'
              } ${
                active
                  ? 'bg-indigo-50/90 text-indigo-700 border border-indigo-100/90 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Icon
                size={19}
                className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  active ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-800'
                }`}
              />
              {!collapsed && (
                <span className="whitespace-nowrap truncate">{item.label}</span>
              )}
            </NavLink>

            {/* Tooltip on Hover and Focus when Sidebar is Minimized */}
            {collapsed && (
              <div
                role="tooltip"
                className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-200 z-50"
              >
                {item.label}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP SINGLE DYNAMIC SIDEBAR (EXPANDED w-64 <-> MINIMIZED w-20)     */}
      {/* ========================================================================= */}
      <aside
        className={`bg-white border-r border-slate-200/80 hidden md:flex flex-col justify-between shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out select-none ${
          isCollapsed ? 'w-20 p-3' : 'w-64 p-4 sm:p-5'
        }`}
        aria-label="Student Navigation Sidebar"
      >
        <div>
          {/* Header & Logo + Minimize/Expand Control */}
          <div
            className={`mb-6 flex items-center ${
              isCollapsed ? 'flex-col gap-3 justify-center text-center' : 'justify-between px-2'
            }`}
          >
            {/* Logo Brand */}
            <div className={`flex items-center gap-2.5 group cursor-pointer ${isCollapsed ? 'justify-center' : ''}`} onClick={() => window.location.href='/dashboard'}>
              <div className="w-9 h-9 rounded-xl bg-indigo-50/90 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 -rotate-12 translate-x-0.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </div>
              {!isCollapsed && (
                <span className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight block leading-tight">
                  PathPilot
                </span>
              )}
            </div>

            {/* Minimize / Expand Toggle Button ([ « ] <-> [ » ]) */}
            <button
              onClick={toggleCollapse}
              className={`p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isCollapsed ? 'w-8 h-8 flex items-center justify-center' : ''
              }`}
              title={isCollapsed ? 'Expand sidebar [ » ]' : 'Minimize sidebar [ « ]'}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Minimize sidebar'}
            >
              {isCollapsed ? (
                <ChevronsRight size={18} className="text-indigo-600" />
              ) : (
                <ChevronsLeft size={18} />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          {renderNavLinks(isCollapsed)}
        </div>

        {/* Footer Area: Garden Card + Dynamic Authenticated User Info */}
        <div className="mt-6 space-y-3">
          {/* Garden "Keep Growing!" Card (HIDDEN when minimized) */}
          {!isCollapsed && (
            <div className="p-3.5 bg-gradient-to-br from-emerald-50/80 to-teal-50/70 border border-emerald-200/70 rounded-2xl text-xs space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs">
                <span className="text-base">🌱</span>
                <span>Keep Growing!</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Every deliberate practice problem blooms concepts in your Learning Garden.
              </p>
            </div>
          )}

          {/* Authenticated Student Identity */}
          {user && (
            <div
              className={`pt-3 border-t border-slate-100 flex items-center ${
                isCollapsed ? 'justify-center relative group' : 'gap-2.5 px-2'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {initial}
              </div>

              {!isCollapsed ? (
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-slate-800 block truncate">
                    {studentName}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {studentEmail}
                  </span>
                </div>
              ) : (
                <div
                  role="tooltip"
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50"
                >
                  {studentName}
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE SLIDE-OVER DRAWER (HIDDEN ON DESKTOP)                           */}
      {/* ========================================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer content panel */}
          <div
            className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col justify-between p-5 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div>
              {/* Header with Close Button */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.location.href='/dashboard'}>
                  <div className="w-9 h-9 rounded-xl bg-indigo-50/90 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 -rotate-12 translate-x-0.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </div>
                  <span className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight block leading-tight">
                    PathPilot
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Drawer always uses expanded links */}
              {renderNavLinks(false)}
            </div>

            {/* Mobile Footer with Garden Card + Student Info */}
            <div className="mt-6 space-y-3">
              <div className="p-3.5 bg-gradient-to-br from-emerald-50/80 to-teal-50/70 border border-emerald-200/70 rounded-2xl text-xs space-y-1.5 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs">
                  <span className="text-base">🌱</span>
                  <span>Keep Growing!</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Every deliberate practice problem blooms concepts in your Learning Garden.
                </p>
              </div>

              {user && (
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5 px-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    {initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      {studentName}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {studentEmail}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
