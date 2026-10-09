import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../common/Avatar';
import { Menu, LogOut } from 'lucide-react';

/**
 * PathPilot Responsive Navbar
 * 
 * Clean, lightweight top navigation bar with:
 * - Brand logo & version pill
 * - Mobile navigation menu toggle
 * - Authenticated student status & avatar
 * - Accessible logout control
 */

export default function Navbar({ onToggleMobileMenu = () => {} }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/70 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile menu hamburger toggle */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-50/90 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 -rotate-12 translate-x-0.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </div>
          <span className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
            PathPilot
          </span>
        </Link>
        <span className="hidden sm:inline-block text-[10px] bg-slate-100/90 text-slate-600 px-2 py-0.5 rounded-full font-mono border border-slate-200/60">
          v1.0
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-slate-800 block truncate max-w-[180px]">
                {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student'}
              </span>
              <span className="text-[10px] text-slate-400 block truncate max-w-[180px]">
                {user.email}
              </span>
            </div>

            <Avatar name={user.user_metadata?.full_name || user.email} size="sm" />

            <button
              onClick={logout}
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50/60 rounded-xl transition-all flex items-center gap-1.5"
              title="Logout"
              aria-label="Sign out of PathPilot"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
