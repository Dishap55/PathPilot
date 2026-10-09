import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

export default function TargetDateField({ value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse initial selected date or fallback to today/empty
  const selectedDate = value ? new Date(value + 'T00:00:00') : null;
  const [viewDate, setViewDate] = useState(() => selectedDate || new Date());

  // Close popup on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date for display
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const daysGrid = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    daysGrid.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    daysGrid.push(new Date(viewYear, viewMonth, day));
  }

  const handleSelectDay = (d) => {
    if (!d) return;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const isoString = `${y}-${m}-${day}`;
    onChange(isoString);
    setIsOpen(false);
  };

  return (
    <div id="target-date-wrapper" className="relative w-full" ref={containerRef}>
      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
        <CalendarIcon className="w-3.5 h-3.5 text-indigo-600" />
        <span>Target Placement / Exam Date <span className="text-rose-500">*</span></span>
      </label>

      {/* Input Display Button */}
      <div className="relative">
        <button
          id="target-date-button"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
            error
              ? 'border-rose-400 bg-rose-50/60 text-rose-900 ring-2 ring-rose-200/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
              : 'border-slate-200/90 bg-slate-50/60 text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          }`}
        >
          <span className={value ? 'text-slate-900 font-semibold' : error ? 'text-rose-500 font-semibold' : 'text-slate-400'}>
            {value ? formatDisplayDate(value) : 'Select target date (e.g. Nov 30, 2026)'}
          </span>
          <CalendarIcon className={`w-4 h-4 shrink-0 ml-2 ${error ? 'text-rose-500' : 'text-indigo-500'}`} />
        </button>
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-bold text-rose-600 flex items-center gap-1.5 animate-in fade-in duration-150">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {/* Modern Popover Calendar Card */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full sm:w-80 bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-2xl p-4 font-sans animate-in fade-in zoom-in-95 duration-150">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-sm font-bold text-slate-900">
              {monthNames[viewMonth]} {viewYear}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((wd) => (
              <span key={wd} className="text-[11px] font-bold text-slate-400 py-1">
                {wd}
              </span>
            ))}
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {daysGrid.map((d, idx) => {
              if (!d) {
                return <div key={`empty-${idx}`} className="h-8" />;
              }

              const isPast = d < today;
              const isToday =
                d.getDate() === today.getDate() &&
                d.getMonth() === today.getMonth() &&
                d.getFullYear() === today.getFullYear();

              const isSelected =
                selectedDate &&
                d.getDate() === selectedDate.getDate() &&
                d.getMonth() === selectedDate.getMonth() &&
                d.getFullYear() === selectedDate.getFullYear();

              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDay(d)}
                  className={`h-8 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 font-bold scale-105'
                      : isToday
                      ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                      : isPast
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer Quick Options */}
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => handleSelectDay(new Date())}
              className="text-indigo-600 font-bold hover:underline cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 font-medium hover:text-slate-600 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
