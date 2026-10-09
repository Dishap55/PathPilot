import React, { useState, useEffect } from 'react';
import { useBestu } from '../../contexts/BestuContext';
import AddNoteButton from '../notes/AddNoteButton';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Lightbulb,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowDown,
  Target,
  TrendingUp,
  Square,
  Check,
  X
} from 'lucide-react';

/**
 * ==================================================================
 * FINAL WARM SOFT NATURAL STUDYING COLOR THEME
 * ==================================================================
 * Main Page Background: #F4EFE8 (warm light beige/cream)
 * Learning Container: #F8F4EE (slightly lighter warm learning area)
 * Active Card: #FFF8EE (soft warm cream, subtle border #D9D1C7)
 * Primary Text: #293247 (calm deep slate/navy, NOT pure black)
 * Secondary Text: #667085 (readable slate, NOT faint gray)
 * Primary Accent: #6574C4 (muted blue-indigo)
 * Soft Blue Area / Important: #E8EFF8 / #CAD9EA / #3E5575
 * Soft Lavender / Formula: #EDE9F6 / #D9D2EA / #45456A
 * Soft Mint / Quick Trick: #E7F1EA / #C9DED0 / #3F634B
 * Warm Cream / Example / Takeaway: #F8EEDC / #E6D4B4 / #705B35
 * Soft Peach / Trap / Common Mistake: #F6E5DF / #E7C9C0 / #824F47
 */

// Helper: Card Badge Color Pairing per user direction (Warm base + soft accent)
function getCardBadgeStyle(cardNumber, badgeText = '') {
  const text = (badgeText || '').toLowerCase();
  if (text.includes('very important') || text.includes('common trap') || text.includes('trap') || text.includes('mistake')) {
    return 'bg-[#F6E5DF] border-[#E7C9C0] text-[#824F47]';
  }
  if (text.includes('must remember') || text.includes('high priority') || text.includes('formula')) {
    return 'bg-[#EDE9F6] border-[#D9D2EA] text-[#45456A]';
  }
  if (text.includes('quick trick') || text.includes('easy method') || text.includes('easy way')) {
    return 'bg-[#E7F1EA] border-[#C9DED0] text-[#3F634B]';
  }
  if (text.includes('exam tip') || text.includes('example') || text.includes('takeaway')) {
    return 'bg-[#F8EEDC] border-[#E6D4B4] text-[#705B35]';
  }
  if (text.includes('important')) {
    return 'bg-[#E8EFF8] border-[#CAD9EA] text-[#3E5575]';
  }

  // Exact Card-by-Card Palette Pairings
  switch (cardNumber) {
    case 1: // Card 1: warm cream + soft blue
      return 'bg-[#E8EFF8] border-[#CAD9EA] text-[#3E5575]';
    case 2: // Card 2: warm cream + lavender
      return 'bg-[#EDE9F6] border-[#D9D2EA] text-[#45456A]';
    case 3: // Card 3: warm cream + mint
      return 'bg-[#E7F1EA] border-[#C9DED0] text-[#3F634B]';
    case 4: // Card 4: warm cream + blue
      return 'bg-[#E8EFF8] border-[#CAD9EA] text-[#3E5575]';
    case 5: // Card 5: warm cream + lavender
      return 'bg-[#EDE9F6] border-[#D9D2EA] text-[#45456A]';
    case 6: // Card 6: warm cream + mint
      return 'bg-[#E7F1EA] border-[#C9DED0] text-[#3F634B]';
    case 7: // Card 7: warm cream + blue
      return 'bg-[#E8EFF8] border-[#CAD9EA] text-[#3E5575]';
    case 8: // Card 8: warm cream + peach
      return 'bg-[#F6E5DF] border-[#E7C9C0] text-[#824F47]';
    case 9: // Card 9: warm cream + mint
      return 'bg-[#E7F1EA] border-[#C9DED0] text-[#3F634B]';
    case 10: // Card 10: warm cream + lavender
      return 'bg-[#EDE9F6] border-[#D9D2EA] text-[#45456A]';
    default:
      return 'bg-[#E8EFF8] border-[#CAD9EA] text-[#3E5575]';
  }
}

// Helper: Remember Takeaway Banner Styling per Card Pair
function getCardRememberStyle(cardNumber) {
  switch (cardNumber) {
    case 1: // Card 1: warm cream + soft blue
      return 'bg-[#E8EFF8] border-[#CAD9EA] text-[#3E5575]';
    case 2: // Card 2: warm cream + lavender
      return 'bg-[#EDE9F6] border-[#D9D2EA] text-[#45456A]';
    case 3: // Card 3: warm cream + mint
      return 'bg-[#E7F1EA] border-[#C9DED0] text-[#3F634B]';
    case 4: // Card 4: warm cream + blue
      return 'bg-[#E8EFF8] border-[#CAD9EA] text-[#3E5575]';
    case 5: // Card 5: warm cream + lavender
      return 'bg-[#EDE9F6] border-[#D9D2EA] text-[#45456A]';
    case 6: // Card 6: warm cream + mint
      return 'bg-[#E7F1EA] border-[#C9DED0] text-[#3F634B]';
    case 7: // Card 7: warm cream + blue
      return 'bg-[#E8EFF8] border-[#CAD9EA] text-[#3E5575]';
    case 8: // Card 8: warm cream + peach
      return 'bg-[#F6E5DF] border-[#E7C9C0] text-[#824F47]';
    case 9: // Card 9: warm cream + mint
      return 'bg-[#E7F1EA] border-[#C9DED0] text-[#3F634B]';
    case 10: // Card 10: warm cream + lavender
      return 'bg-[#EDE9F6] border-[#D9D2EA] text-[#45456A]';
    default:
      return 'bg-[#EDE9F6] border-[#D9D2EA] text-[#45456A]';
  }
}

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// CARD 1: INTERACTIVE CONCEPT SIMULATORS & TOPIC ILLUSTRATIONS
// ------------------------------------------------------------------

// 1. Time, Speed & Distance Interactive Visual
function TSDInteractiveVisual() {
  const [speed, setSpeed] = useState(60);
  const [time, setTime] = useState(2);

  const distance = speed * time;
  // Animation duration inversely proportional to speed:
  // 120 km/h -> 1.5s (fast); 60 km/h -> 3s (medium); 20 km/h -> 8s (slow)
  const driveDuration = (180 / speed).toFixed(2);

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Kinematics Simulator: Distance = Speed × Time
        </span>
        <span className="text-[11px] font-mono text-[#3E5575] font-bold">
          {speed} km/h × {time} h = {distance} km
        </span>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Speed:</span>
          <button
            onClick={() => setSpeed((s) => Math.max(20, s - 10))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease speed"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-14 text-center">{speed} km/h</span>
          <button
            onClick={() => setSpeed((s) => Math.min(120, s + 10))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase speed"
          >
            +
          </button>
          <input
            type="range"
            min="20"
            max="120"
            step="10"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-20 sm:w-28 accent-[#6574C4] h-1.5 cursor-pointer"
          />
        </div>

        {/* Time Control */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Time:</span>
          <button
            onClick={() => setTime((t) => Math.max(1, t - 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease time"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-10 text-center">{time} h</span>
          <button
            onClick={() => setTime((t) => Math.min(5, t + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase time"
          >
            +
          </button>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="w-16 sm:w-20 accent-[#6574C4] h-1.5 cursor-pointer"
          />
        </div>
      </div>

      {/* Road & Moving Car Simulation */}
      <div className="space-y-1.5 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#667085]">
          <span>City A (Start)</span>
          <span className="text-[#3E5575] font-mono">
            {speed > 80 ? '⚡ High Speed Travel' : speed < 40 ? '🐢 Slow Cruise' : '🚗 Regular Speed'}
          </span>
          <span>City B ({distance} km)</span>
        </div>
        <div className="relative w-full h-5 bg-[#CAD9EA] rounded-full flex items-center px-1 border border-[#CAD9EA] overflow-hidden">
          {/* Animated road markers */}
          <div className="absolute inset-0 flex items-center justify-around opacity-30 pointer-events-none">
            <span className="w-2 h-1 bg-white rounded-full" />
            <span className="w-2 h-1 bg-white rounded-full" />
            <span className="w-2 h-1 bg-white rounded-full" />
            <span className="w-2 h-1 bg-white rounded-full" />
            <span className="w-2 h-1 bg-white rounded-full" />
          </div>
          {/* Car with dynamic animation speed */}
          <div
            className="absolute -top-1.5 text-base sm:text-lg animate-edu-drive select-none"
            style={{ animationDuration: `${driveDuration}s` }}
          >
            🚗
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-[#667085] font-mono">
          <span>0 km</span>
          <span className="text-[#3E5575] font-bold">Speed = {speed} km/h (Loop: {driveDuration}s)</span>
          <span className="text-[#3F634B] font-bold">{distance} km Total</span>
        </div>
      </div>
    </div>
  );
}

// 2. Profit & Loss Interactive Visual
function ProfitLossInteractiveVisual() {
  const [cp, setCp] = useState(500);
  const [sp, setSp] = useState(600);

  const diff = sp - cp;
  const isProfit = diff >= 0;
  const absDiff = Math.abs(diff);
  const pct = cp > 0 ? ((absDiff / cp) * 100).toFixed(1) : '0';

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Profit &amp; Loss Simulator
        </span>
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-mono ${
            isProfit
              ? 'bg-[#E7F1EA] text-[#3F634B] border border-[#C9DED0]'
              : 'bg-[#F6E5DF] text-[#824F47] border border-[#E7C9C0]'
          }`}
        >
          {isProfit ? `+₹${diff} PROFIT (${pct}%)` : `−₹${absDiff} LOSS (${pct}%)`}
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        {/* Cost Price Control */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Cost Price (CP):</span>
          <button
            onClick={() => setCp((v) => Math.max(100, v - 50))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease CP"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-14 text-center">₹{cp}</span>
          <button
            onClick={() => setCp((v) => Math.min(1000, v + 50))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase CP"
          >
            +
          </button>
        </div>

        {/* Selling Price Control */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Selling Price (SP):</span>
          <button
            onClick={() => setSp((v) => Math.max(100, v - 50))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease SP"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-14 text-center">₹{sp}</span>
          <button
            onClick={() => setSp((v) => Math.min(1200, v + 50))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase SP"
          >
            +
          </button>
        </div>
      </div>

      {/* Visual Pipeline */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full">
          <span className="text-xl">🛍️</span>
          <div>
            <div className="text-[10px] text-[#667085] uppercase font-bold">Cost Price (CP)</div>
            <div className="text-xs font-black text-[#293247]">Base Cost: ₹{cp}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#6574C4]">
          <ArrowRight size={18} className="text-[#6574C4] animate-edu-shift shrink-0" />
        </div>

        <div className="flex items-center gap-2.5 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full">
          <span className="text-xl">🏷️</span>
          <div>
            <div className="text-[10px] text-[#667085] uppercase font-bold">Selling Price (SP)</div>
            <div className="text-xs font-black text-[#293247]">Market Sale: ₹{sp}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#6574C4]">
          <ArrowRight size={18} className="text-[#6574C4] animate-edu-shift shrink-0" />
        </div>

        <div
          className={`px-3 py-2.5 rounded-xl border text-xs font-bold shadow-2xs shrink-0 text-center transition-all ${
            isProfit
              ? 'bg-[#E7F1EA] border-[#C9DED0] text-[#3F634B]'
              : 'bg-[#F6E5DF] border-[#E7C9C0] text-[#824F47]'
          }`}
        >
          <div className="text-[10px] uppercase font-black">
            {isProfit ? 'SP &gt; CP → Profit' : 'SP &lt; CP → Loss'}
          </div>
          <div className="text-sm font-black font-mono">
            {isProfit ? `+₹${diff}` : `−₹${absDiff}`} ({pct}%)
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Percentages Interactive Visual
function PercentagesInteractiveVisual() {
  const base = 1000;
  const [pct, setPct] = useState(25);

  const amount = (base * pct) / 100;
  const presets = [10, 20, 25, 40, 50, 75];

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> 100-Cell Percentage Grid &amp; Fractional Scale
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">
          {pct}% of ₹{base} = ₹{amount} (25 cells = 25% = ¼)
        </span>
      </div>

      {/* Preset Buttons & Slider */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Rate:</span>
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setPct(p)}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                pct === p
                  ? 'bg-[#6574C4] text-white shadow-2xs'
                  : 'bg-[#E8EFF8] text-[#3E5575] hover:bg-[#CAD9EA]/60'
              }`}
            >
              {p}%
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Slider:</span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={pct}
            onChange={(e) => setPct(Number(e.target.value))}
            className="w-24 sm:w-32 accent-[#6574C4] h-1.5 cursor-pointer"
          />
          <span className="font-mono font-bold text-[#293247] w-10 text-right">{pct}%</span>
        </div>
      </div>

      {/* 100-Cell Grid & Live Conversion Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* 10x10 Grid (100 cells) */}
        <div className="grid grid-cols-10 gap-0.5 p-1.5 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs shrink-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-[1px] transition-colors duration-200 ${
                i < pct ? 'bg-[#6574C4] shadow-2xs' : 'bg-[#CAD9EA]'
              }`}
            />
          ))}
        </div>

        {/* Live Calculation Cards */}
        <div className="flex-1 w-full space-y-2">
          {/* Fill progress bar */}
          <div className="w-full bg-[#E8EFF8] h-3.5 rounded-full p-0.5 border border-[#CAD9EA] overflow-hidden">
            <div
              className="bg-[#6574C4] h-full rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] text-center shadow-2xs">
              <span className="text-[10px] text-[#667085] block font-sans">Fraction Equivalence</span>
              <strong className="text-[#3E5575] font-bold">{pct} / 100 = {(pct / 100).toFixed(2)}</strong>
            </div>
            <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] text-center shadow-2xs">
              <span className="text-[10px] text-[#3F634B] block font-sans">Calculated Amount</span>
              <strong className="text-[#3F634B] font-bold text-sm">₹{amount}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Ratio & Proportion Interactive Visual
function RatioInteractiveVisual() {
  const [partA, setPartA] = useState(3);
  const [partB, setPartB] = useState(2);
  const total = 500;

  const totalParts = partA + partB;
  const shareA = Math.round((total * partA) / totalParts);
  const shareB = Math.round((total * partB) / totalParts);

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Ratio 3 : 2 = 5 Total Parts Visual Block System
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">Total: ₹{total}</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#3E5575] text-[11px]">Blue Share A:</span>
          <button
            onClick={() => setPartA((v) => Math.max(1, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease A"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-6 text-center">{partA}</span>
          <button
            onClick={() => setPartA((v) => Math.min(6, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase A"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#45456A] text-[11px]">Purple Share B:</span>
          <button
            onClick={() => setPartB((v) => Math.max(1, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] font-black flex items-center justify-center hover:bg-[#D9D2EA]/50 active:scale-95"
            title="Decrease B"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-6 text-center">{partB}</span>
          <button
            onClick={() => setPartB((v) => Math.min(6, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] font-black flex items-center justify-center hover:bg-[#D9D2EA]/50 active:scale-95"
            title="Increase B"
          >
            +
          </button>
        </div>
      </div>

      {/* Visual Circles & Shares */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Dynamic Tokens */}
        <div className="flex items-center gap-3 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs">
          <div className="flex items-center gap-1">
            {Array.from({ length: partA }).map((_, i) => (
              <span key={`a-${i}`} className="w-5 h-5 rounded-full bg-indigo-500 shadow-2xs inline-block animate-edu-pulse" />
            ))}
          </div>
          <span className="font-black text-sm text-[#667085] px-1">:</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: partB }).map((_, i) => (
              <span key={`b-${i}`} className="w-5 h-5 rounded-full bg-purple-500 shadow-2xs inline-block animate-edu-pulse" />
            ))}
          </div>
        </div>

        {/* Calculated Shares */}
        <div className="flex items-center gap-2 flex-1 w-full justify-end font-mono text-xs">
          <div className="p-2.5 bg-[#E8EFF8] border border-[#CAD9EA] rounded-xl text-center shadow-2xs flex-1">
            <span className="text-[10px] font-sans text-[#667085] block">Share A ({partA}/{totalParts})</span>
            <strong className="text-[#3E5575] font-black text-sm">₹{shareA}</strong>
          </div>
          <div className="p-2.5 bg-[#EDE9F6] border border-[#D9D2EA] rounded-xl text-center shadow-2xs flex-1">
            <span className="text-[10px] font-sans text-[#667085] block">Share B ({partB}/{totalParts})</span>
            <strong className="text-[#45456A] font-black text-sm">₹{shareB}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Geometry Interactive Visual
function GeometryInteractiveVisual() {
  const [length, setLength] = useState(8);
  const [width, setWidth] = useState(5);

  const area = length * width;
  const perimeter = 2 * (length + width);

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> 2D Shape Geometry: Dynamic Rectangle, Triangle &amp; Circle
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">
          Area = {area} cm² • Perimeter = {perimeter} cm
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Rectangle Length (L):</span>
          <button
            onClick={() => setLength((v) => Math.max(4, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease L"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-12 text-center">{length} cm</span>
          <button
            onClick={() => setLength((v) => Math.min(12, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase L"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Width (W):</span>
          <button
            onClick={() => setWidth((v) => Math.max(2, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease W"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-12 text-center">{width} cm</span>
          <button
            onClick={() => setWidth((v) => Math.min(8, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase W"
          >
            +
          </button>
        </div>
      </div>

      {/* Visual Dynamic Shape Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Dynamic Shape Canvas */}
        <div className="h-24 w-full sm:w-56 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] flex items-center justify-center p-2 relative shadow-2xs">
          <div
            className="border-2 border-[#6574C4] bg-[#EDE9F6]/80 rounded flex flex-col items-center justify-center text-[10px] font-bold text-[#45456A] shadow-xs transition-all duration-300 relative"
            style={{
              width: `${length * 15}px`,
              height: `${width * 11}px`,
              maxWidth: '92%',
              maxHeight: '90%'
            }}
          >
            <span className="absolute -top-3.5 text-[9px] font-mono text-[#6574C4] font-bold">{length} cm</span>
            <span className="absolute -right-4 text-[9px] font-mono text-[#6574C4] font-bold">{width}</span>
            <span>{area} cm²</span>
          </div>
        </div>

        {/* Live Calculation Cards */}
        <div className="grid grid-cols-2 gap-2 flex-1 w-full text-xs font-mono">
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] shadow-2xs space-y-0.5">
            <span className="text-[10px] font-sans font-bold text-[#667085] uppercase">Area = Length × Width</span>
            <div className="text-sm font-black text-[#3E5575]">L × W = {area} cm²</div>
            <div className="text-[10px] text-[#667085] font-sans">Triangle Area: ½ b×h • Circle: πr²</div>
          </div>
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] shadow-2xs space-y-0.5">
            <span className="text-[10px] font-sans font-bold text-[#667085] uppercase">Perimeter = 2(L + W)</span>
            <div className="text-sm font-black text-[#3F634B]">2(L + W) = {perimeter} cm</div>
            <div className="text-[10px] text-[#667085] font-sans">Circle Circumference: 2πr</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. Simple Interest Interactive Visual
function SimpleInterestInteractiveVisual() {
  const [p, setP] = useState(1000);
  const [r, setR] = useState(10);
  const [t, setT] = useState(2);

  const interest = (p * r * t) / 100;
  const total = p + interest;

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Simple Interest Linear Progression Simulator
        </span>
        <span className="text-[11px] font-mono text-[#3E5575] font-bold">SI = (P × R × T) / 100</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Rate (R):</span>
          <button
            onClick={() => setR((v) => Math.max(5, v - 2.5))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease R"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-12 text-center">{r}%</span>
          <button
            onClick={() => setR((v) => Math.min(25, v + 2.5))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase R"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Time (T):</span>
          <button
            onClick={() => setT((v) => Math.max(1, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease T"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-12 text-center">{t} yrs</span>
          <button
            onClick={() => setT((v) => Math.min(5, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase T"
          >
            +
          </button>
        </div>
      </div>

      {/* Visual Equation Pipeline */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full space-y-0.5">
          <span className="text-[10px] text-[#667085] uppercase font-bold block">Principal (P)</span>
          <span className="text-sm font-black text-[#293247]">₹{p}</span>
        </div>

        <span className="text-xs font-bold text-[#3E5575] bg-[#FFF8EE] px-3 py-1.5 rounded-xl border border-[#CAD9EA] shadow-2xs shrink-0">
          + {r}%/yr × {t} yrs
        </span>

        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full space-y-0.5">
          <span className="text-[10px] text-[#667085] uppercase font-bold block">Interest (SI)</span>
          <span className="text-sm font-black text-[#3F634B]">+₹{interest}</span>
        </div>

        <div className="px-3.5 py-3 rounded-xl bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] text-xs font-bold shadow-2xs shrink-0 text-center">
          <span className="text-[9px] uppercase font-bold block text-[#667085]">Total Return</span>
          <span className="text-sm font-black font-mono">₹{total}</span>
          <span className="text-[9px] text-[#667085] block font-normal">Total = ₹12,000 baseline on 10k</span>
        </div>
      </div>
    </div>
  );
}

// 7. Compound Interest Interactive Visual
function CompoundInterestInteractiveVisual() {
  const p = 1000;
  const [r, setR] = useState(10);

  const y1 = Math.round(p * (1 + r / 100));
  const y2 = Math.round(p * Math.pow(1 + r / 100, 2));
  const y3 = Math.round(p * Math.pow(1 + r / 100, 3));

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Interest on Interest &amp; Compounding Growth Curve
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">Compounding Growth 📈</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Compounding Rate:</span>
          {[5, 10, 15, 20].map((rate) => (
            <button
              key={rate}
              onClick={() => setR(rate)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                r === rate
                  ? 'bg-[#6574C4] text-white shadow-2xs'
                  : 'bg-[#E8EFF8] text-[#3E5575] hover:bg-[#CAD9EA]/60'
              }`}
            >
              {rate}%
            </button>
          ))}
        </div>
        <div className="text-[11px] font-mono text-[#3E5575]">Principal: ₹{p}</div>
      </div>

      {/* Year-by-Year Growth Bar Chart */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1 text-xs">
          <div className="font-extrabold text-[#293247]">Exponential Growth Dynamics</div>
          <div className="text-[11px] text-[#667085]">
            Each subsequent year earns interest on both the initial principal AND accumulated past interest.
          </div>
        </div>

        <div className="flex items-end gap-3 h-16 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs shrink-0">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-[#667085]">Yr 1</span>
            <div className="w-10 h-7 bg-[#CAD9EA] rounded-t flex items-center justify-center text-[10px] font-bold text-[#3E5575]">
              ₹{y1}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-[#667085]">Yr 2</span>
            <div className="w-10 h-9 bg-[#B3C8E8] rounded-t flex items-center justify-center text-[10px] font-bold text-[#3E5575]">
              ₹{y2}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-[#667085]">Yr 3</span>
            <div className="w-10 h-12 bg-[#6574C4] rounded-t flex items-center justify-center text-[10px] font-bold text-white shadow-xs animate-edu-pulse">
              ₹{y3}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Probability Interactive Visual
function ProbabilityInteractiveVisual() {
  const [selectedEvent, setSelectedEvent] = useState('even');

  const events = {
    even: { name: 'Even Numbers', faces: [2, 4, 6], count: 3 },
    odd: { name: 'Odd Numbers', faces: [1, 3, 5], count: 3 },
    gt4: { name: 'Greater than 4', faces: [5, 6], count: 2 },
    prime: { name: 'Prime Numbers', faces: [2, 3, 5], count: 3 },
    six: { name: 'Number 6', faces: [6], count: 1 }
  };

  const curr = events[selectedEvent];

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Probability Measure: Favorable vs Total Sample Space
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">P = Favorable / Total</span>
      </div>

      {/* Event Selection Pills */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[#FFF8EE] p-2 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <span className="font-bold text-[#667085] text-[11px]">Target Event:</span>
        {Object.entries(events).map(([key, ev]) => (
          <button
            key={key}
            onClick={() => setSelectedEvent(key)}
            className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
              selectedEvent === key
                ? 'bg-[#6574C4] text-white shadow-2xs'
                : 'bg-[#E8EFF8] text-[#3E5575] hover:bg-[#CAD9EA]/60'
            }`}
          >
            {ev.name} ({ev.count})
          </button>
        ))}
      </div>

      {/* 6 Die Faces + Live Calculation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Die Faces */}
        <div className="flex items-center gap-1.5 p-2 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs">
          <span className="text-xl mr-1">🎲</span>
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const isFav = curr.faces.includes(num);
            return (
              <div
                key={num}
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isFav
                    ? 'bg-[#6574C4] text-white shadow-xs scale-105 ring-2 ring-[#EDE9F6]'
                    : 'bg-[#E8EFF8] text-[#667085] opacity-50'
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl text-xs font-medium text-[#293247] shadow-2xs flex-1">
          <div className="font-bold text-[#3E5575]">Die Roll: 6 Total Outcomes</div>
          <div className="text-[11px] text-[#667085]">🎯 Even: 2, 4, 6 ({curr.count} favorable outcomes)</div>
        </div>

        <div className="px-3.5 py-3 rounded-xl bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-bold text-xs shadow-2xs shrink-0 text-center font-mono">
          P = {curr.count}/6 = {((curr.count / 6) * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

// 9. Average Interactive Visual
function AverageInteractiveVisual() {
  const [n1, setN1] = useState(10);
  const [n2, setN2] = useState(20);
  const [n3, setN3] = useState(30);

  const sum = n1 + n2 + n3;
  const avg = (sum / 3).toFixed(1);

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Arithmetic Mean &amp; Balance Point Simulator
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">
          Average = ({n1} + {n2} + {n3}) / 3 = {avg}
        </span>
      </div>

      {/* 3 Number Controls */}
      <div className="grid grid-cols-3 gap-2 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        {[
          { label: 'Value 1', val: n1, set: setN1 },
          { label: 'Value 2', val: n2, set: setN2 },
          { label: 'Value 3', val: n3, set: setN3 }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-center gap-1.5">
            <span className="font-bold text-[#667085] text-[10px] hidden sm:inline">{item.label}:</span>
            <button
              onClick={() => item.set((v) => Math.max(0, v - 5))}
              className="w-5 h-5 rounded bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black text-xs flex items-center justify-center"
            >
              −
            </button>
            <span className="font-mono font-bold text-[#293247] w-8 text-center">{item.val}</span>
            <button
              onClick={() => item.set((v) => Math.min(50, v + 5))}
              className="w-5 h-5 rounded bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black text-xs flex items-center justify-center"
            >
              +
            </button>
          </div>
        ))}
      </div>

      {/* Dynamic Data Bars & Mean Line */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-end gap-3 h-16 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs flex-1">
          {[n1, n2, n3].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <span className="text-[9px] font-mono font-bold text-[#667085]">{val}</span>
              <div
                className="w-full bg-[#6574C4] rounded-t transition-all duration-300"
                style={{ height: `${Math.max(6, (val / 50) * 44)}px` }}
              />
            </div>
          ))}
        </div>

        <div className="px-4 py-3 bg-[#E7F1EA] border border-[#C9DED0] rounded-xl text-center shadow-2xs shrink-0 font-mono">
          <span className="text-[10px] font-sans font-bold text-[#3F634B] uppercase block">Calculated Mean</span>
          <strong className="text-base font-black text-[#3F634B]">{avg}</strong>
        </div>
      </div>
    </div>
  );
}

// 10. Permutation & Combination Interactive Visual
function PermutationCombinationInteractiveVisual() {
  const [n, setN] = useState(5);
  const [r, setR] = useState(2);

  const fact = (num) => (num <= 1 ? 1 : num * fact(num - 1));
  const nPr = Math.round(fact(n) / fact(n - r));
  const nCr = Math.round(fact(n) / (fact(r) * fact(n - r)));

  const pool = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].slice(0, n);

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Permutation &amp; Combination Simulator
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">
          n = {n}, r = {r}
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Total Items (n):</span>
          <button
            onClick={() => {
              const newN = Math.max(3, n - 1);
              setN(newN);
              if (r > newN) setR(newN);
            }}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-6 text-center">{n}</span>
          <button
            onClick={() => setN((v) => Math.min(7, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Chosen Items (r):</span>
          <button
            onClick={() => setR((v) => Math.max(1, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] font-black flex items-center justify-center hover:bg-[#D9D2EA]/50 active:scale-95"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-6 text-center">{r}</span>
          <button
            onClick={() => setR((v) => Math.min(n, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] font-black flex items-center justify-center hover:bg-[#D9D2EA]/50 active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      {/* Item Pool & Calculation Display */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Item tokens */}
        <div className="flex items-center gap-1.5 p-2 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs">
          {pool.map((item, idx) => (
            <div
              key={idx}
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                idx < r
                  ? 'bg-[#6574C4] text-white shadow-xs animate-edu-pulse'
                  : 'bg-[#E8EFF8] text-[#3E5575]'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Permutation & Combination Cards */}
        <div className="grid grid-cols-2 gap-2 flex-1 w-full font-mono text-xs">
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#D9D2EA] shadow-2xs text-center">
            <span className="text-[10px] font-sans text-[#667085] block">Permutations (Order Matters)</span>
            <strong className="text-sm font-black text-[#45456A]">{n}P{r} = {nPr}</strong>
          </div>
          <div className="p-2.5 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs text-center">
            <span className="text-[10px] font-sans text-[#3F634B] block">Combinations (Groups)</span>
            <strong className="text-sm font-black text-[#3F634B]">{n}C{r} = {nCr}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// Master Concept Illustration Component for Card 1
function ConceptIllustration({ topicId }) {
  if (topicId === 'percentages') return <PercentagesInteractiveVisual />;
  if (topicId === 'profit-and-loss') return <ProfitLossInteractiveVisual />;
  if (topicId === 'ratio-and-proportion') return <RatioInteractiveVisual />;
  if (topicId === 'geometry') return <GeometryInteractiveVisual />;
  if (topicId === 'time-speed-distance' || topicId === 'boats-and-streams') return <TSDInteractiveVisual />;
  if (topicId === 'simple-interest') return <SimpleInterestInteractiveVisual />;
  if (topicId === 'compound-interest') return <CompoundInterestInteractiveVisual />;
  if (topicId === 'average') return <AverageInteractiveVisual />;
  if (topicId === 'probability') return <ProbabilityInteractiveVisual />;
  if (topicId === 'permutation-and-combination') return <PermutationCombinationInteractiveVisual />;

  if (topicId === 'number-system') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> The Real Number Line &amp; Number Classification
          </span>
          <span className="text-[11px] font-bold text-[#667085]">Negative &bull; Zero &bull; Positive &bull; Primes</span>
        </div>

        {/* Number Line Graphic */}
        <div className="relative w-full py-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] px-3 shadow-2xs">
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-[#CAD9EA] rounded-full" />
          <div className="relative z-10 flex items-center justify-between">
            {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((num) => {
              const isPrime = [2, 3, 5].includes(num);
              const isZero = num === 0;
              const isNeg = num < 0;
              return (
                <div key={num} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-2xs ${
                      isPrime
                        ? 'bg-[#6574C4] text-white ring-2 ring-[#EDE9F6] animate-edu-pulse'
                        : isZero
                        ? 'bg-[#F8EEDC] text-[#705B35] border border-[#E6D4B4]'
                        : isNeg
                        ? 'bg-[#F6E5DF] text-[#824F47] border border-[#E7C9C0]'
                        : 'bg-[#E8EFF8] text-[#293247] border border-[#CAD9EA]'
                    }`}
                  >
                    {num}
                  </div>
                  <span className="text-[9px] font-bold text-[#667085]">
                    {isZero ? 'Zero' : isPrime ? 'Prime' : isNeg ? 'Neg' : 'Pos'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Division Core Foundation */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs font-mono">
          <span className="text-[#667085] font-sans font-bold">Division Algorithm:</span>
          <span className="font-bold text-[#293247]">Dividend = (Divisor × Quotient) + Remainder</span>
          <span className="px-2 py-0.5 rounded bg-[#E7F1EA] text-[#3F634B] font-bold border border-[#C9DED0]">
            17 = (5 × 3) + 2
          </span>
        </div>
      </div>
    );
  }

  if (topicId === 'letter-series' || topicId === 'letter-classification') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Alphabet Sequence Jump Progression (EJOTY Anchor)
          </span>
          <span className="text-[11px] font-mono text-[#667085]">Uniform +2 Difference</span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap bg-[#FFF8EE] py-3.5 px-4 rounded-xl border border-[#D9D1C7] shadow-2xs w-full">
          {[
            { letter: 'A', num: 1 },
            { letter: 'C', num: 3 },
            { letter: 'E', num: 5 },
            { letter: 'G', num: 7 },
            { letter: 'I', num: 9, isTarget: true }
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-2xs transition-all ${
                    item.isTarget
                      ? 'bg-[#6574C4] text-white ring-2 ring-[#EDE9F6] animate-edu-pulse'
                      : 'bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]'
                  }`}
                >
                  {item.letter}
                </div>
                <span className="text-[10px] font-mono text-[#667085]">Pos {item.num}</span>
              </div>
              {idx < arr.length - 1 && (
                <div className="flex flex-col items-center text-[#6574C4] font-bold text-[10px] px-1">
                  <span>+2</span>
                  <ArrowRight size={13} className="animate-edu-shift" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs bg-[#FFF8EE] px-3 py-1.5 rounded-xl border border-[#D9D1C7] shadow-2xs">
          <span className="text-[#667085]">EJOTY Landmarks: E(5), J(10), O(15), T(20), Y(25)</span>
          <span className="text-[#3F634B] font-bold">✓ G (Pos 7) + 2 = I (Pos 9)</span>
        </div>
      </div>
    );
  }

  if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Seating Arrangement: Linear Row &amp; Circular Table
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">Orientation Rules</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Linear Row */}
          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-[#667085] uppercase">
              <span>Linear Row (Facing North)</span>
              <span className="text-[#3E5575]">Left=West, Right=East</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center py-2 px-1 bg-[#F8F4EE] rounded-lg border border-[#D9D1C7]">
              {['1 (A)', '2 (B)', '3 (C-Mid)', '4 (D)', '5 (E)'].map((seat, sIdx) => (
                <div
                  key={sIdx}
                  className={`px-2 py-1 rounded text-[10px] font-bold shadow-2xs ${
                    seat.includes('Mid') ? 'bg-[#6574C4] text-white' : 'bg-[#FFF8EE] text-[#293247] border border-[#CAD9EA]'
                  }`}
                >
                  {seat}
                </div>
              ))}
            </div>
            <div className="text-[10px] text-[#667085] text-center">
              Person C is strictly flanked by B and D.
            </div>
          </div>

          {/* Circular Table */}
          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-2 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-[10px] font-bold text-[#667085] uppercase">
              <span>Circular Table (Facing Center)</span>
              <span className="text-[#45456A]">Clockwise = Left</span>
            </div>
            <div className="relative w-24 h-16 rounded-full border-2 border-dashed border-[#6574C4] flex items-center justify-center bg-[#F8F4EE]">
              <span className="text-[10px] font-bold text-[#6574C4]">Round Table</span>
              <div className="absolute -top-2 px-1.5 py-0.5 rounded bg-[#6574C4] text-white text-[9px] font-bold">A</div>
              <div className="absolute -bottom-2 px-1.5 py-0.5 rounded bg-[#6574C4] text-white text-[9px] font-bold">C</div>
              <div className="absolute -left-2 px-1.5 py-0.5 rounded bg-[#8575D6] text-white text-[9px] font-bold">D</div>
              <div className="absolute -right-2 px-1.5 py-0.5 rounded bg-[#8575D6] text-white text-[9px] font-bold">B</div>
            </div>
            <div className="text-[10px] text-[#3F634B] font-bold text-center">
              Facing Center &rarr; Right is Anti-Clockwise
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'blood-relations') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> 3-Generation Family Tree Architecture
          </span>
          <span className="text-[11px] font-mono text-[#667085]">(+) Male &bull; (−) Female</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1.5 flex-1 w-full">
            <div className="flex items-center justify-around text-center text-xs font-bold">
              <span className="px-2.5 py-1 bg-[#EDE9F6] text-[#45456A] rounded-lg border border-[#D9D2EA]">
                👴 Grandfather (+) ══ 👵 Grandmother (−)
              </span>
            </div>
            <div className="flex justify-center text-[#6574C4] font-bold text-xs">│ (Gen 1 &rarr; Gen 2)</div>
            <div className="flex items-center justify-around text-center text-xs font-bold">
              <span className="px-2.5 py-1 bg-[#E8EFF8] text-[#3E5575] rounded-lg border border-[#CAD9EA]">
                👨 Father (+) ══ 👩 Mother (−)
              </span>
            </div>
            <div className="flex justify-center text-[#6574C4] font-bold text-xs">│ (Gen 2 &rarr; Gen 3)</div>
            <div className="flex items-center justify-around text-center text-xs font-bold">
              <span className="px-2.5 py-1 bg-[#E7F1EA] text-[#3F634B] rounded-lg border border-[#C9DED0]">
                👦 Son (+) &bull; 👧 Daughter (−)
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1.5 text-xs shrink-0 w-full sm:w-56">
            <span className="font-extrabold text-[#293247] block">Standard Clue Symbols:</span>
            <div className="text-[11px] text-[#3E5575] font-medium">══ : Married Couple</div>
            <div className="text-[11px] text-[#45456A] font-medium">── : Sibling Branch</div>
            <div className="text-[11px] text-[#3F634B] font-medium">│ : Vertical Generation</div>
            <div className="text-[10px] text-[#705B35] bg-[#F8EEDC] p-1 rounded font-bold">
              Tip: Fix generations first!
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'direction-sense') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> 8 Cardinal Directions &amp; Shortest Displacement
          </span>
          <span className="text-[11px] font-mono text-[#3F634B] font-bold">Pythagoras Triplet</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Compass Graphic */}
          <div className="flex items-center gap-3 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs">
            <div className="relative w-20 h-20 rounded-full border-2 border-[#CAD9EA] bg-[#F8F4EE] flex items-center justify-center font-bold text-xs text-[#293247]">
              <span className="absolute top-1 text-[#6574C4] font-black">N</span>
              <span className="absolute bottom-1 text-[#667085]">S</span>
              <span className="absolute right-1.5 text-[#667085]">E</span>
              <span className="absolute left-1.5 text-[#667085]">W</span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6574C4] animate-edu-pulse" />
            </div>
            <div className="space-y-1">
              <div className="font-extrabold text-[#293247] text-xs">Standard Heading Rules</div>
              <div className="text-[11px] text-[#667085]">Right turn = 90° Clockwise</div>
              <div className="text-[11px] text-[#667085]">Left turn = 90° Anti-clockwise</div>
            </div>
          </div>

          {/* Triplet Calculation */}
          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] text-xs space-y-1.5 shadow-2xs flex-1 w-full sm:w-auto font-mono">
            <span className="font-bold text-[#3E5575] font-sans block text-xs">Shortest Distance Vector:</span>
            <div className="text-[#293247] font-bold">Displacement = √(North² + East²)</div>
            <div className="text-[#3F634B] font-bold text-xs bg-[#E7F1EA] p-1.5 rounded-lg border border-[#C9DED0]">
              Example: 3m N + 4m E &rarr; √(3² + 4²) = 5m NE (3-4-5 Triplet)
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'time-and-work') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Work Unit Rate &amp; Collaborative Efficiency
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">Combined Efficiency</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full">
            <span className="text-xl">👤</span>
            <div>
              <div className="text-[10px] font-bold text-[#667085] uppercase">Worker A</div>
              <div className="text-xs font-bold text-[#293247]">Speed: 2 units/day (15 days total)</div>
            </div>
          </div>

          <span className="text-[#6574C4] font-black text-lg">+</span>

          <div className="flex items-center gap-2.5 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full">
            <span className="text-xl">👤</span>
            <div>
              <div className="text-[10px] font-bold text-[#667085] uppercase">Worker B</div>
              <div className="text-xs font-bold text-[#293247]">Speed: 3 units/day (10 days total)</div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[#6574C4]">
            <ArrowRight size={16} className="text-[#6574C4] animate-edu-shift" />
          </div>

          <div className="px-3.5 py-3 rounded-xl bg-[#E7F1EA] border border-[#C9DED0] text-xs font-bold text-[#3F634B] shadow-2xs shrink-0 text-center">
            <div>📋 1 Full Task Done Together</div>
            <div className="text-[11px] font-mono">30 units ÷ 5 = 6 Days!</div>
          </div>
        </div>
      </div>
    );
  }

  // Clean Default Concept Illustration
  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Target size={14} className="text-[#6574C4]" /> Core Concept Architecture Blueprint
        </span>
        <span className="text-[11px] font-bold text-[#3E5575]">Step 1 &rarr; Step 2 &rarr; Step 3</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1">
          <div className="font-extrabold text-[#3E5575] text-[11px]">1. INPUT SCAN</div>
          <div className="text-[11px] text-[#667085]">Extract given quantities and units accurately.</div>
        </div>
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1">
          <div className="font-extrabold text-[#45456A] text-[11px]">2. PATTERN MATCH</div>
          <div className="text-[11px] text-[#667085]">Match known formula relationship to question type.</div>
        </div>
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1">
          <div className="font-extrabold text-[#3F634B] text-[11px]">3. FAST COMPUTE</div>
          <div className="text-[11px] text-[#667085]">Apply shortcut ratio or division to get result.</div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 2: FORMULA RELATIONSHIP DIAGRAM VISUAL (Warm Cream + Soft Lavender #EDE9F6)
// ------------------------------------------------------------------
function FormulaVisual({ topicId }) {
  if (topicId === 'time-speed-distance' || topicId === 'boats-and-streams') {
    return (
      <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Kinematics Formula Triangle &amp; Derived Equations
          </span>
          <span className="text-[11px] font-mono text-[#667085]">Triangular Inverse Rules</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Formula Triangle */}
          <div className="flex items-center gap-3">
            <div className="w-32 h-20 bg-[#FFF8EE] border-2 border-[#D9D2EA] rounded-xl p-1.5 flex flex-col items-center justify-between shadow-2xs font-mono">
              <div className="font-black text-[#45456A] border-b-2 border-[#D9D2EA] w-full text-center pb-1 text-xs bg-[#EDE9F6] rounded-t">
                Distance (D)
              </div>
              <div className="flex items-center justify-around w-full text-xs font-bold text-[#45456A] pt-1">
                <span className="px-2 py-0.5 rounded bg-[#E8EFF8] text-[#3E5575]">Speed (S)</span>
                <span className="text-[#667085] font-black">×</span>
                <span className="px-2 py-0.5 rounded bg-[#E7F1EA] text-[#3F634B]">Time (T)</span>
              </div>
            </div>
            <div className="space-y-0.5 text-xs text-[#667085]">
              <div className="font-extrabold text-[#293247]">How to use Formula Triangle:</div>
              <div className="text-[11px]">&bull; Cover <strong>D</strong> &rarr; <strong className="text-[#45456A]">D = S × T</strong></div>
              <div className="text-[11px]">&bull; Cover <strong>S</strong> &rarr; <strong className="text-[#3E5575]">S = D / T</strong></div>
              <div className="text-[11px]">&bull; Cover <strong>T</strong> &rarr; <strong className="text-[#3F634B]">T = D / S</strong></div>
            </div>
          </div>

          {/* Derived Formula Pills */}
          <div className="grid grid-cols-1 gap-1.5 font-mono text-xs w-full sm:w-auto shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-[#FFF8EE] border border-[#D9D2EA] font-bold text-[#45456A] shadow-2xs flex justify-between gap-4">
              <span className="font-sans text-[#667085]">Distance:</span>
              <strong className="text-[#45456A]">D = S × T</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#FFF8EE] border border-[#D9D2EA] font-bold text-[#3E5575] shadow-2xs flex justify-between gap-4">
              <span className="font-sans text-[#667085]">Speed:</span>
              <strong className="text-[#3E5575]">S = D / T</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#FFF8EE] border border-[#D9D2EA] font-bold text-[#3F634B] shadow-2xs flex justify-between gap-4">
              <span className="font-sans text-[#667085]">Time:</span>
              <strong className="text-[#3F634B]">T = D / S</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'profit-and-loss') {
    return (
      <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Profit &amp; Loss Mathematical Equation Relationship
          </span>
          <span className="text-[11px] font-mono text-[#3F634B] font-bold">Always Base on CP</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 flex-1 w-full">
            {/* Visual Formula Pipeline */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="p-2.5 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl font-bold text-[#293247] shadow-2xs text-xs">
                <span className="text-[10px] text-[#667085] block uppercase">Original Base</span>
                Cost Price (CP)
              </div>
              <ArrowRight size={14} className="text-[#6574C4] animate-edu-shift" />
              <div className="p-2.5 bg-[#EDE9F6] border border-[#D9D2EA] rounded-xl font-bold text-[#45456A] text-xs">
                <span className="text-[10px] text-[#667085] block uppercase">Added Margin</span>
                + Profit (SP − CP)
              </div>
              <ArrowRight size={14} className="text-[#6574C4] animate-edu-shift" />
              <div className="p-2.5 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl font-bold text-[#293247] shadow-2xs text-xs">
                <span className="text-[10px] text-[#667085] block uppercase">Customer Price</span>
                Selling Price (SP)
              </div>
            </div>
          </div>

          {/* Formula Cards */}
          <div className="space-y-1.5 w-full sm:w-auto shrink-0 font-mono text-xs">
            <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#D9D2EA] shadow-2xs space-y-0.5">
              <div className="text-[10px] font-sans font-bold text-[#667085]">Percentage Gain Formula:</div>
              <div className="text-xs font-bold text-[#3F634B]">
                Profit% = (Profit ÷ CP) × 100
              </div>
            </div>
            <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#D9D2EA] shadow-2xs space-y-0.5">
              <div className="text-[10px] font-sans font-bold text-[#667085]">Discount Equation:</div>
              <div className="text-xs font-bold text-[#45456A]">
                Discount = Marked Price (MP) − SP
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'percentages') {
    return (
      <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Percentage Rate Transformation &amp; Relative Shift
          </span>
          <span className="text-[11px] font-mono text-[#3E5575] font-bold">% Change Equation</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 flex-1 w-full">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-3 py-2 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl font-bold text-[#293247] shadow-2xs">
                Original Value (A)
              </span>
              <ArrowRight size={14} className="text-[#6574C4] animate-edu-shift" />
              <span className="px-3 py-2 bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] rounded-xl font-bold font-mono">
                Multiplier: × (1 ± r%)
              </span>
              <ArrowRight size={14} className="text-[#6574C4] animate-edu-shift" />
              <span className="px-3 py-2 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl font-bold text-[#293247] shadow-2xs">
                New Value (B)
              </span>
            </div>
            <div className="text-[11px] text-[#667085] leading-relaxed">
              If a quantity increases by 20%, multiply by <strong>1.20 (or 6/5)</strong>.<br />
              If a quantity decreases by 25%, multiply by <strong>0.75 (or 3/4)</strong>.
            </div>
          </div>

          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D2EA] text-center shadow-2xs shrink-0 space-y-1.5 font-mono text-xs w-full sm:w-auto">
            <div className="text-[10px] font-sans font-bold text-[#667085] uppercase">Core Relative Difference Rule</div>
            <div className="p-2 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-bold text-xs">
              % Change = (Diff ÷ Original) × 100
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'geometry') {
    return (
      <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Dimensions to Area &amp; Perimeter Formulation
          </span>
          <span className="text-[11px] font-mono text-[#3F634B] font-bold">Square Units Rule</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Rectangle Formula Card */}
          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D2EA] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between font-bold text-[#293247]">
              <span>Rectangle Formula Suite</span>
              <span className="text-[10px] text-[#667085] font-mono">Length (L), Width (W)</span>
            </div>
            <div className="p-2 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] font-mono font-bold text-xs text-[#45456A]">
              Area = Length × Width = L × W (cm²)
            </div>
            <div className="p-2 rounded-lg bg-[#F8EEDC] border border-[#E6D4B4] font-mono font-bold text-xs text-[#705B35]">
              Perimeter = 2 × (L + W)
            </div>
          </div>

          {/* Triangle & Circle Formula Card */}
          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D2EA] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between font-bold text-[#293247]">
              <span>Triangle &amp; Circle Suite</span>
              <span className="text-[10px] text-[#667085] font-mono">Base (b), Height (h), Radius (r)</span>
            </div>
            <div className="p-2 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] font-mono font-bold text-xs text-[#45456A]">
              Triangle Area = ½ × Base × Height
            </div>
            <div className="p-2 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] font-mono font-bold text-xs text-[#3F634B]">
              Circle Area = πr²  •  Circumference = 2πr
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'number-system') {
    return (
      <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Division Algorithm &amp; Modulo Arithmetic Formulation
          </span>
          <span className="text-[11px] font-mono text-[#3F634B] font-bold">0 ≤ Remainder &lt; Divisor</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="space-y-2 flex-1 w-full">
            <div className="text-[10px] font-sans font-bold text-[#667085] uppercase">Fundamental Division Identity:</div>
            <div className="flex items-center gap-1.5 flex-wrap text-xs bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs">
              <span className="px-2.5 py-1 bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] rounded-lg font-bold">Dividend</span>
              <span className="text-[#667085] font-black">=</span>
              <span className="px-2.5 py-1 bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] rounded-lg font-bold">(Divisor × Quotient)</span>
              <span className="text-[#3F634B] font-black">+</span>
              <span className="px-2.5 py-1 bg-[#F8EEDC] border border-[#E6D4B4] text-[#705B35] rounded-lg font-bold">Remainder</span>
            </div>
            <div className="text-[11px] font-sans text-[#667085]">
              Strict Condition: The remainder must always be non-negative and strictly less than divisor.
            </div>
          </div>

          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D2EA] text-center shadow-2xs shrink-0 space-y-1 w-full sm:w-auto">
            <div className="text-[10px] font-sans font-bold text-[#667085] uppercase">Concrete Verification</div>
            <div className="px-3 py-1.5 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-bold text-xs">
              23 = (5 × 4) + 3
            </div>
            <div className="text-[9px] font-sans text-[#667085]">Divisor=5, Quotient=4, Rem=3</div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
    return (
      <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Linear Overlap &amp; Circular Arrangement Formulas
          </span>
          <span className="text-[11px] font-mono text-[#45456A] font-bold">Total = Left + Right − 1</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1.5 flex-1 w-full">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#667085]">
              <span>Linear Double-Counting Correction</span>
              <span className="text-[#45456A] font-mono font-bold">7 Person Row Demo</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FFF8EE] p-2 rounded-xl border border-[#D9D1C7] shadow-2xs font-mono">
              {['1', '2', '3', '4 (A)', '5', '6', '7'].map((pos, pIdx) => (
                <div
                  key={pIdx}
                  className={`flex-1 py-1.5 text-center font-bold text-[10px] rounded ${
                    pos.includes('A') ? 'bg-[#6574C4] text-white shadow-2xs animate-edu-pulse' : 'bg-[#F8F4EE] text-[#667085]'
                  }`}
                >
                  {pos}
                </div>
              ))}
            </div>
            <div className="text-[10px] text-[#667085]">
              Person A is 4th from Left and 4th from Right &rarr; Total = (4 + 4) − 1 = 7.
            </div>
          </div>

          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D2EA] text-center shrink-0 space-y-1.5 shadow-2xs w-full sm:w-auto font-mono">
            <div className="text-[10px] font-sans font-bold text-[#667085] uppercase">Formula Summary</div>
            <div className="p-1.5 bg-[#EDE9F6] rounded-lg text-xs font-bold text-[#45456A]">
              Total = Left + Right − 1
            </div>
            <div className="p-1.5 bg-[#E7F1EA] rounded-lg text-xs font-bold text-[#3F634B]">
              Circle: (n − 1)! arrangements
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'letter-series' || topicId === 'number-series' || topicId === 'letter-classification' || topicId === 'number-classification') {
    return (
      <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Sequence &amp; Series Nth Term Formula Matrix
          </span>
          <span className="text-[11px] font-mono text-[#3E5575] font-bold">AP &amp; GP Identities</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-2 flex-1 w-full">
            <div className="text-[10px] font-bold text-[#667085] uppercase">Arithmetic Progression (AP) Formula:</div>
            <div className="flex items-center gap-2 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs font-mono">
              <span className="px-2.5 py-1 bg-[#E8EFF8] text-[#3E5575] rounded-lg font-bold text-xs">T(n)</span>
              <span className="text-[#667085] font-black">=</span>
              <span className="px-2.5 py-1 bg-[#EDE9F6] text-[#45456A] rounded-lg font-bold text-xs">a</span>
              <span className="text-[#667085] font-black">+</span>
              <span className="px-2.5 py-1 bg-[#F8EEDC] text-[#705B35] rounded-lg font-bold text-xs">(n − 1) × d</span>
            </div>
            <div className="text-[11px] text-[#667085]">
              a = 1st term &bull; d = common difference &bull; n = term position index.
            </div>
          </div>

          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D2EA] text-center shrink-0 space-y-1.5 shadow-2xs w-full sm:w-auto font-mono">
            <div className="text-[10px] font-sans font-bold text-[#667085] uppercase">Geometric Rule (GP)</div>
            <div className="p-1.5 bg-[#EDE9F6] rounded-lg text-xs font-bold text-[#45456A]">
              T(n) = a × r^(n−1)
            </div>
            <div className="p-1.5 bg-[#E7F1EA] rounded-lg text-xs font-bold text-[#3F634B]">
              Sum = (n/2) × (a + l)
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Clean Default Relationship Flow
  return (
    <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <BookOpen size={14} className="text-[#6574C4]" /> Formula Solution Pipeline Architecture
        </span>
        <span className="text-[11px] font-bold text-[#45456A]">3-Stage Pipeline</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1">
          <div className="font-extrabold text-[#3E5575] text-[11px]">1. INPUT IDENTIFIERS</div>
          <div className="text-[11px] text-[#667085]">Assign variable symbols to all given problem quantities.</div>
        </div>
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1">
          <div className="font-extrabold text-[#45456A] text-[11px]">2. FORMULA LINKAGE</div>
          <div className="text-[11px] text-[#667085]">Substitute known values into standard equation.</div>
        </div>
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1">
          <div className="font-extrabold text-[#3F634B] text-[11px]">3. VERIFIED RESULT</div>
          <div className="text-[11px] text-[#667085]">Isolate unknown variable to obtain correct result.</div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// CARD 3: QUICK TRICK VISUAL (Warm Cream + Soft Mint #E7F1EA)
// ------------------------------------------------------------------
function QuickTrickVisual({ topicId }) {
  if (topicId === 'percentages') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> 25% Fractional Shortcut: Question → Keyword → Pattern → Method
          </span>
          <span className="text-[11px] font-mono font-bold">25 / 100 = 1 / 4</span>
        </div>

        {/* 4-Stage Clue Spotting Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">1. Question</span>
            <span className="font-bold text-[#293247] text-[11px]">"Find 25% of 160"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">2. Keyword</span>
            <span className="font-bold text-[#3E5575] text-[11px]">"25%"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">3. Pattern</span>
            <span className="font-bold text-[#45456A] text-[11px]">Recognize ¼</span>
          </div>
          <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#3F634B] uppercase block">4. Method</span>
            <span className="font-black text-[#3F634B] text-[11px]">160 ÷ 4 = 40!</span>
          </div>
        </div>

        {/* Visual Percentage Bar: 25% filled (5 of 20 segments) */}
        <div className="space-y-1">
          <div className="h-6 w-full bg-[#FFF8EE] rounded-xl border border-[#C9DED0] p-1 flex items-center gap-0.5 shadow-2xs">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 rounded-xs transition-all ${
                  i < 5 ? 'bg-[#3F634B] animate-edu-pulse' : 'bg-[#E7F1EA]'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#667085]">
            <span>Mental Halving / Division</span>
            <span className="font-bold text-[#3F634B]">25% (¼ of Total)</span>
            <span>50% &rarr; ÷2 &bull; 10% &rarr; shift decimal &bull; 25% &rarr; divide by 4</span>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'number-system') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Remainder Modulo Identity: Question → Keyword → Pattern → Method
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">43 × 47 mod 5</span>
        </div>

        {/* 4-Stage Clue Spotting Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">1. Question</span>
            <span className="font-bold text-[#293247] text-[11px]">43 × 47 mod 5</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">2. Keyword</span>
            <span className="font-bold text-[#3E5575] text-[11px]">"Remainder"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">3. Pattern</span>
            <span className="font-bold text-[#45456A] text-[11px]">Modulo Product</span>
          </div>
          <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#3F634B] uppercase block">4. Method</span>
            <span className="font-black text-[#3F634B] text-[11px]">3 × 2 = 6 &rarr; Rem = 1</span>
          </div>
        </div>

        {/* Visual Remainder Product Breakdown */}
        <div className="flex items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#E8EFF8] text-[#3E5575] font-bold">43 mod 5 = +3</span>
            <span className="text-[#667085] font-black">×</span>
            <span className="px-2 py-0.5 rounded bg-[#E8EFF8] text-[#3E5575] font-bold">47 mod 5 = +2</span>
          </div>
          <ArrowRight size={14} className="text-[#3F634B] animate-edu-shift" />
          <div className="text-xs font-black text-[#3F634B]">
            3 × 2 = 6 &rarr; 6 mod 5 = <strong className="text-sm">1</strong>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'profit-and-loss') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Price Multiplier Clue Spotting: Question → Keyword → Pattern → Method
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">20% Gain = 6/5</span>
        </div>

        {/* 4-Stage Clue Spotting Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">1. Question</span>
            <span className="font-bold text-[#293247] text-[11px]">Buy ₹500, Gain 20%</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">2. Keyword</span>
            <span className="font-bold text-[#3E5575] text-[11px]">"20% Profit"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">3. Pattern</span>
            <span className="font-bold text-[#45456A] text-[11px]">Multiplier 1 + ⅕ = 6/5</span>
          </div>
          <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#3F634B] uppercase block">4. Method</span>
            <span className="font-black text-[#3F634B] text-[11px]">₹500 × 6/5 = ₹600</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs">
          <span className="text-[#667085] font-sans">⚡ Direct 2-Second Calculation:</span>
          <span className="font-bold text-[#3F634B]">CP × (1 + 1/5) = 6/5 &rarr; SP = ₹600</span>
        </div>
      </div>
    );
  }

  if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Flank Spotting: Question → Keyword → Pattern → Method
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">"next to" = Neighbour</span>
        </div>

        {/* 4-Stage Clue Spotting Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">1. Question</span>
            <span className="font-bold text-[#293247] text-[11px]">"Who sits next to A?"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">2. Keyword</span>
            <span className="font-bold text-[#3E5575] text-[11px]">"next to"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">3. Pattern</span>
            <span className="font-bold text-[#45456A] text-[11px]">Neighbour</span>
          </div>
          <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#3F634B] uppercase block">4. Method</span>
            <span className="font-black text-[#3F634B] text-[11px]">Anchor Flank Slots</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#E8EFF8] text-[#3E5575] font-bold">B (Left)</span>
            <span className="px-2.5 py-0.5 rounded bg-[#6574C4] text-white font-bold animate-edu-pulse">A (Target)</span>
            <span className="px-2 py-0.5 rounded bg-[#E8EFF8] text-[#3E5575] font-bold">C (Right)</span>
          </div>
          <span className="text-[#3F634B] font-bold font-sans">⚡ Direct Adjacent Flanks</span>
        </div>
      </div>
    );
  }

  if (topicId === 'letter-series' || topicId === 'letter-classification') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Alphabet Step Jump: Question → Keyword → Pattern → Method
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">A &rarr; C &rarr; E &rarr; G &rarr; I</span>
        </div>

        {/* 4-Stage Clue Spotting Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">1. Question</span>
            <span className="font-bold text-[#293247] text-[11px]">A, C, E, G, ?</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">2. Keyword</span>
            <span className="font-bold text-[#3E5575] text-[11px]">"Series Jump"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">3. Pattern</span>
            <span className="font-bold text-[#45456A] text-[11px]">Difference = +2</span>
          </div>
          <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">4. Method</span>
            <span className="font-black text-[#3F634B] text-[11px]">Next = G(7) + 2 = I</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs bg-[#FFF8EE] p-2 rounded-xl border border-[#C9DED0] shadow-2xs">
          <span className="text-[#667085] font-sans">⚡ Jump Sequence:</span>
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-[#3E5575]">A(1)</span> &rarr;
            <span className="text-[#3E5575]">C(3)</span> &rarr;
            <span className="text-[#3E5575]">E(5)</span> &rarr;
            <span className="text-[#3E5575]">G(7)</span> &rarr;
            <span className="text-[#3F634B] bg-[#E7F1EA] px-2 py-0.5 rounded border border-[#C9DED0]">I(9)</span>
          </div>
        </div>
      </div>
    );
  }

  // Default Quick Trick Visual
  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> Question Recognition: Question → Keyword → Pattern → Method
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">5-Sec Clue Recognition</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-bold text-[#667085] uppercase block">1. QUESTION</span>
          <span className="text-[11px] text-[#293247] font-medium">Scan given inputs</span>
        </div>
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-bold text-[#667085] uppercase block">2. KEYWORD</span>
          <span className="text-[11px] text-[#3E5575] font-medium">Spot core trigger</span>
        </div>
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-bold text-[#667085] uppercase block">3. PATTERN</span>
          <span className="text-[11px] text-[#45456A] font-medium">Link known relation</span>
        </div>
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-bold text-[#3F634B] uppercase block">4. METHOD</span>
          <span className="text-[11px] text-[#3F634B] font-bold">Fast mental solve</span>
        </div>
      </div>

      <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center text-[11px] text-[#3F634B] font-bold shadow-2xs">
        ⚡ 5-Sec Rule: Identifying the keyword eliminates 2 out of 4 options immediately.
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 4: STEP-BY-STEP SOLVED PROGRESSION VISUAL (Warm Cream + Soft Blue #E8EFF8)
// ------------------------------------------------------------------
function SolvedExampleVisual({ topicId }) {
  const getProgression = () => {
    if (topicId === 'profit-and-loss') {
      return {
        q: 'Buy ₹500 CP, Sell ₹600 SP. Find Profit %',
        s1: 'Profit = SP − CP = 600 − 500 = ₹100',
        s2: 'Profit% = (Profit ÷ CP) × 100',
        s3: '(100 ÷ 500) × 100 = ⅕ × 100',
        ans: '20% Profit'
      };
    }
    if (topicId === 'percentages') {
      return {
        q: 'Calculate 15% of 200 without pencil',
        s1: '10% of 200 = 200 ÷ 10 = 20',
        s2: '5% of 200 = half of 20 = 10',
        s3: 'Combine pieces: 20 + 10 = 30',
        ans: '30'
      };
    }
    if (topicId === 'number-system') {
      return {
        q: 'Is 1,524 divisible by 4?',
        s1: 'Divisibility Rule: Check last two digits only (24)',
        s2: '24 ÷ 4 = 6 (Remainder 0)',
        s3: 'Since 24 is divisible, whole number is divisible',
        ans: 'Divisible!'
      };
    }
    if (topicId === 'geometry') {
      return {
        q: 'Rectangle 8 cm × 5 cm. Find its area',
        s1: 'Identify dimensions: L = 8 cm, W = 5 cm',
        s2: 'Apply Formula: Area = L × W',
        s3: 'Compute: 8 × 5 = 40 (cm²)',
        ans: '40 cm²'
      };
    }
    if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
      return {
        q: '5 Friends in a row. C in center, B left of C',
        s1: 'Fix definite anchor: Seat 3 = C  [ _ , _ , C , _ , _ ]',
        s2: 'Place immediate left clue: Seat 2 = B  [ _ , B , C , _ , _ ]',
        s3: 'Fill flanking slots based on adjacent constraints',
        ans: 'Order Fixed'
      };
    }
    if (topicId === 'letter-series' || topicId === 'letter-classification') {
      return {
        q: 'Find next term in series: A, C, E, G, ?',
        s1: 'Map letters to numbers: A=1, C=3, E=5, G=7',
        s2: 'Identify uniform progression: Difference is +2',
        s3: 'Calculate next index: G(7) + 2 = 9',
        ans: 'Letter I'
      };
    }
    return {
      q: 'Standard Exam Question Inputs',
      s1: 'Identify known formula and assign variable symbols',
      s2: 'Substitute values into base relation',
      s3: 'Simplify using shortcut division or multiplier',
      ans: 'Verified Answer'
    };
  };

  const p = getProgression();

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5 font-sans">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <CheckCircle2 size={14} className="text-[#3E5575]" /> Step-by-Step Problem Solver Progression
        </span>
        <span className="text-[11px] font-bold text-[#3E5575]">QUESTION &rarr; STEP 1 &rarr; STEP 2 &rarr; STEP 3 &rarr; ✓ ANSWER</span>
      </div>

      {/* Question Card */}
      <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-[#E8EFF8] text-[#3E5575] flex items-center justify-center text-[10px] font-bold font-sans">Q</span>
        <span className="font-bold text-[#293247] text-xs font-sans">{p.q}</span>
      </div>

      {/* 3 Progression Steps + Final Answer */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-sans font-bold text-[#3E5575] block uppercase">Step 1</span>
          <span className="text-[10px] text-[#667085] leading-tight block">{p.s1}</span>
        </div>
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-sans font-bold text-[#3E5575] block uppercase">Step 2</span>
          <span className="text-[10px] text-[#667085] leading-tight block">{p.s2}</span>
        </div>
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-sans font-bold text-[#3E5575] block uppercase">Step 3</span>
          <span className="text-[10px] text-[#667085] leading-tight block">{p.s3}</span>
        </div>
        <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs flex flex-col justify-center text-center">
          <span className="text-[9px] font-sans font-bold text-[#3F634B] uppercase block">✓ Answer</span>
          <span className="text-xs font-black text-[#3F634B]">{p.ans}</span>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 5: VARIATION MAP VISUAL (Warm Cream + Soft Lavender #EDE9F6)
// ------------------------------------------------------------------
function VariationMapVisual({ topicId }) {
  const getMap = () => {
    if (topicId === 'percentages') {
      return {
        root: 'Percentage Archetypes',
        branches: [
          { title: 'Increase / Dec', action: '(Diff ÷ Base) × 100' },
          { title: 'Reverse %', action: 'Backtrack original base' },
          { title: 'Successive %', action: 'a + b + ab/100' },
          { title: 'Multiplier', action: '× (1 ± r%)' }
        ]
      };
    }
    if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
      return {
        root: 'Seating Classification',
        branches: [
          { title: 'Linear Row', action: 'Left is West, Right East' },
          { title: 'Circular (Center)', action: 'Clockwise = Left' },
          { title: 'Circular (Outward)', action: 'Clockwise = Right' },
          { title: 'Dual Rows', action: 'Facing North vs South' }
        ]
      };
    }
    if (topicId === 'number-system') {
      return {
        root: 'Number System Archetypes',
        branches: [
          { title: 'Divisibility', action: 'Rules for 3, 4, 9, 11' },
          { title: 'Remainders', action: 'Modulo Arithmetic' },
          { title: 'Primes & HCF', action: 'Factor Pairs' },
          { title: 'Unit Digits', action: 'Cyclicity of 4' }
        ]
      };
    }
    if (topicId === 'profit-and-loss') {
      return {
        root: 'Profit & Loss Archetypes',
        branches: [
          { title: 'Direct CP / SP', action: 'Find Margin & %' },
          { title: 'Marked Price', action: 'Find Discount & Gain' },
          { title: 'Ratio Form', action: 'CP:SP = 5:6' },
          { title: 'False Weights', action: 'Cheated Weight Ratio' }
        ]
      };
    }
    if (topicId === 'geometry') {
      return {
        root: 'Geometry Archetypes',
        branches: [
          { title: 'Rectangles', action: 'Area L×W • Perim 2(L+W)' },
          { title: 'Triangles', action: '½ b×h • 3-4-5 Triplet' },
          { title: 'Circles', action: 'Area πr² • Perim 2πr' },
          { title: '3D Mensuration', action: 'Volume & Surface' }
        ]
      };
    }
    return {
      root: 'Topic Archetypes',
      branches: [
        { title: 'Direct Forms', action: 'Base Formula' },
        { title: 'Reverse Forms', action: 'Find Missing Value' },
        { title: 'Ratio Forms', action: 'Unit Share Split' },
        { title: 'Multi-Step', action: 'Chained Solution' }
      ]
    };
  };

  const mapData = getMap();

  return (
    <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <BookOpen size={14} className="text-[#6574C4]" /> Classification Taxonomy: {mapData.root}
        </span>
        <span className="text-[11px] font-mono text-[#667085]">4 Core Archetypes</span>
      </div>

      {/* Root Node & Tree Connectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {mapData.branches.map((b, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl shadow-2xs space-y-1 text-center"
          >
            <div className="w-5 h-5 mx-auto rounded-full bg-[#EDE9F6] text-[#45456A] font-bold text-[10px] flex items-center justify-center">
              {idx + 1}
            </div>
            <div className="font-bold text-[#293247] text-xs">{b.title}</div>
            <div className="text-[10px] text-[#667085] leading-tight">{b.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 6: TRICKS & SHORT METHODS (Warm Cream + Soft Mint #E7F1EA)
// ------------------------------------------------------------------

// Number System Interactive Shortcut: 43 × 47 mod 5 Waterfall
function NumberSystemShortcutVisual() {
  const [numA, setNumA] = useState(43);
  const [numB, setNumB] = useState(47);
  const m = 5;

  const remA = numA % m;
  const remB = numB % m;
  const prod = remA * remB;
  const finalRem = prod % m;

  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> Modulo Product Shortcut Waterfall (Card 6)
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">43 × 47 mod 5</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs text-xs font-sans">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Number A:</span>
          <button
            onClick={() => setNumA((v) => Math.max(10, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-black flex items-center justify-center hover:bg-[#C9DED0]/50 active:scale-95"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-8 text-center">{numA}</span>
          <button
            onClick={() => setNumA((v) => Math.min(99, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-black flex items-center justify-center hover:bg-[#C9DED0]/50 active:scale-95"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Number B:</span>
          <button
            onClick={() => setNumB((v) => Math.max(10, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-black flex items-center justify-center hover:bg-[#C9DED0]/50 active:scale-95"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-8 text-center">{numB}</span>
          <button
            onClick={() => setNumB((v) => Math.min(99, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-black flex items-center justify-center hover:bg-[#C9DED0]/50 active:scale-95"
          >
            +
          </button>
        </div>

        <div className="text-[11px] text-[#667085]">Divisor: mod 5</div>
      </div>

      {/* The EXACT Vertical Waterfall Requested by User */}
      <div className="flex flex-col items-center justify-center py-1 space-y-1 text-xs">
        <div className="px-3 py-1 rounded-lg bg-[#FFF8EE] border border-[#C9DED0] font-bold text-[#293247] shadow-2xs">
          {numA} × {numB} mod {m}
        </div>
        <ArrowDown size={14} className="text-[#3F634B] animate-edu-nudge" />
        <div className="px-3 py-1 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] font-bold text-[#45456A] shadow-2xs">
          {remA} × {remB}
        </div>
        <ArrowDown size={14} className="text-[#3F634B] animate-edu-nudge" />
        <div className="px-3 py-1 rounded-lg bg-[#FFF8EE] border border-[#C9DED0] font-bold text-[#3E5575] shadow-2xs">
          {prod} mod {m}
        </div>
        <ArrowDown size={14} className="text-[#3F634B] animate-edu-nudge" />
        <div className="px-4 py-1.5 rounded-xl bg-[#E7F1EA] border border-[#C9DED0] font-black text-[#3F634B] text-sm shadow-xs">
          ✓ Remainder = {finalRem}
        </div>
      </div>
    </div>
  );
}

// Profit & Loss Shortcut: 20% Profit -> CP:SP 100:120 -> 5:6
function ProfitLossShortcutVisual() {
  const [profitPct, setProfitPct] = useState(20);
  const cpBase = 500;

  const ratioMap = {
    10: { cp: 10, sp: 11, mult: '11/10' },
    20: { cp: 5, sp: 6, mult: '6/5' },
    25: { cp: 4, sp: 5, mult: '5/4' },
    50: { cp: 2, sp: 3, mult: '3/2' }
  };

  const curr = ratioMap[profitPct] || { cp: 5, sp: 6, mult: '6/5' };
  const spCalc = Math.round(cpBase * (1 + profitPct / 100));

  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> Ratio Multiplier Shortcut (Card 6)
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">CP : SP Ratio</span>
      </div>

      <div className="flex items-center justify-between bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs text-xs font-sans">
        <span className="font-bold text-[#667085] text-[11px]">Select Profit %:</span>
        <div className="flex items-center gap-1.5">
          {[10, 20, 25, 50].map((p) => (
            <button
              key={p}
              onClick={() => setProfitPct(p)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                profitPct === p
                  ? 'bg-[#3F634B] text-white shadow-2xs'
                  : 'bg-[#E7F1EA] text-[#3F634B] hover:bg-[#C9DED0]/60'
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
      </div>

      {/* The EXACT 20% Profit CP:SP 100:120 -> 5:6 structure */}
      <div className="flex flex-col items-center justify-center py-1 space-y-1 text-xs">
        <div className="px-3 py-1 bg-[#FFF8EE] rounded-lg border border-[#C9DED0] font-bold text-[#293247] shadow-2xs">
          {profitPct}% Profit &bull; CP : SP = 100 : {100 + profitPct} &bull; 5 : 6 Ratio Shortcut
        </div>
        <ArrowDown size={14} className="text-[#3F634B] animate-edu-nudge" />
        <div className="px-4 py-1.5 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] font-black text-sm text-[#3F634B] shadow-2xs">
          CP : SP = {curr.cp} : {curr.sp}
        </div>
        <div className="text-[11px] text-[#667085] font-sans pt-1">
          Multiply CP by {curr.mult} &rarr; ₹{cpBase} × ({curr.mult}) = <strong className="text-[#3F634B]">₹{spCalc}</strong> in 2 sec!
        </div>
      </div>
    </div>
  );
}

// Percentages Shortcut: 100 -> /5 -> 20
function PercentagesShortcutVisual() {
  const [val, setVal] = useState(100);

  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> Mental Division Waterfall (Card 6)
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">20% = 1/5 Mental Shortcut</span>
      </div>

      <div className="flex items-center justify-between bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs text-xs font-sans">
        <span className="font-bold text-[#667085] text-[11px]">Base Number:</span>
        <div className="flex items-center gap-1.5">
          {[80, 100, 200, 350].map((v) => (
            <button
              key={v}
              onClick={() => setVal(v)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-bold font-mono transition-all ${
                val === v
                  ? 'bg-[#3F634B] text-white shadow-2xs'
                  : 'bg-[#E7F1EA] text-[#3F634B] hover:bg-[#C9DED0]/60'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* The EXACT 100 -> /5 -> 20 waterfall */}
      <div className="flex flex-col items-center justify-center py-1 space-y-1 text-xs">
        <div className="px-3 py-1 bg-[#FFF8EE] rounded-lg border border-[#C9DED0] font-bold text-[#293247] shadow-2xs">
          {val}
        </div>
        <div className="flex items-center gap-1 text-[#3F634B] text-[11px] font-bold font-sans">
          <ArrowDown size={14} className="animate-edu-nudge" /> ÷ 5
        </div>
        <div className="px-4 py-1.5 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] font-black text-sm text-[#3F634B] shadow-2xs">
          {val / 5}
        </div>
        <div className="text-[11px] text-[#667085] font-sans pt-1">
          20% = 1/5 &bull; 20% of {val} = {val} ÷ 5 = <strong className="text-[#3F634B]">{val / 5}</strong>!
        </div>
      </div>
    </div>
  );
}

function ShortcutIllustration({ topicId }) {
  if (topicId === 'number-system') return <NumberSystemShortcutVisual />;
  if (topicId === 'profit-and-loss') return <ProfitLossShortcutVisual />;
  if (topicId === 'percentages') return <PercentagesShortcutVisual />;

  if (topicId === 'ratio-and-proportion') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Unit Share Block Shortcut (Card 6)
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">3 : 2 = 5 Units</span>
        </div>

        <div className="flex flex-col items-center justify-center py-2 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500 shadow-2xs inline-block" />
            <span className="w-5 h-5 rounded-full bg-indigo-500 shadow-2xs inline-block" />
            <span className="w-5 h-5 rounded-full bg-indigo-500 shadow-2xs inline-block" />
            <span className="text-sm font-black text-[#667085] px-1">:</span>
            <span className="w-5 h-5 rounded-full bg-purple-500 shadow-2xs inline-block" />
            <span className="w-5 h-5 rounded-full bg-purple-500 shadow-2xs inline-block" />
          </div>
          <div className="text-xs font-black text-[#3F634B]">
            3 : 2 &rarr; Total Parts = 5
          </div>
          <div className="text-[11px] text-[#667085] font-sans">
            1 Unit = Total ÷ 5 &bull; Never set up long simultaneous equations!
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Definite Anchor First Rule (Card 6)
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">Always Anchor First</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-1 flex-1">
            <span className="text-[10px] font-bold text-[#824F47] uppercase block">❌ AMBIGUOUS CLUE</span>
            <div className="text-[11px] text-[#667085]">"B sits next to C" &rarr; 2 possibilities, don't guess!</div>
          </div>
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-1 flex-1">
            <span className="text-[10px] font-bold text-[#3F634B] uppercase block">✓ DEFINITE ANCHOR</span>
            <div className="text-[11px] text-[#3F634B] font-bold">"A sits at extreme Left end" &rarr; Locks Slot 1!</div>
          </div>
        </div>

        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center text-[11px] text-[#3F634B] font-bold shadow-2xs">
          Rule: Start from the anchor to eliminate 80% of branching possibilities immediately.
        </div>
      </div>
    );
  }

  if (topicId === 'geometry') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Pythagorean Triplet Family Shortcut (Card 6)
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">3 - 4 - 5 Family</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center shadow-2xs space-y-0.5">
            <span className="text-[10px] text-[#667085] font-sans block">Primary Triplet</span>
            <strong className="text-sm font-black text-[#3E5575]">3 - 4 - 5</strong>
          </div>
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center shadow-2xs space-y-0.5">
            <span className="text-[10px] text-[#667085] font-sans block">Double (×2)</span>
            <strong className="text-sm font-black text-[#45456A]">6 - 8 - 10</strong>
          </div>
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center shadow-2xs space-y-0.5">
            <span className="text-[10px] text-[#667085] font-sans block">Common Family</span>
            <strong className="text-sm font-black text-[#3F634B]">5 - 12 - 13</strong>
          </div>
        </div>

        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center text-[11px] text-[#3F634B] font-sans font-bold shadow-2xs">
          ⚡ Never compute √(3² + 4²)! Spot standard triplets in 1 second.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> Shortcut &amp; Fast Elimination Method
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">2-Second Bypass</span>
      </div>

      <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center text-xs text-[#3F634B] font-bold shadow-2xs">
        ⚡ Skip long algebra by converting percentages into clean ratio units or small multipliers.
      </div>
    </div>
  );
}

function ShortcutDiagramVisual(props) {
  return <ShortcutIllustration {...props} />;
}

// ------------------------------------------------------------------
// CARD 7: EXAM-STYLE VARIATION TRANSFORMATION VISUAL (Warm Cream + Soft Blue #E8EFF8)
// ------------------------------------------------------------------
function ExamPatternVisual({ topicId }) {
  const getPatterns = () => {
    if (topicId === 'profit-and-loss') {
      return {
        direct: { given: 'CP ₹500, Gain 20%', goal: 'Find SP = ₹600' },
        reverse: { given: 'SP ₹600, Gain 20%', goal: 'Back-calculate CP = ₹500' },
        mixed: { given: 'Marked Price + 10% Discount', goal: 'Find Net Gain on CP' }
      };
    }
    if (topicId === 'percentages') {
      return {
        direct: { given: 'Original ₹400, Rate 20%', goal: 'Find Result = ₹80' },
        reverse: { given: '80 is 20% of X', goal: 'Find Base X = 400' },
        mixed: { given: 'Price +20%, Consumption −10%', goal: 'Net Expenditure Change' }
      };
    }
    if (topicId === 'number-system') {
      return {
        direct: { given: '143 divided by 7', goal: 'Find Remainder = 3' },
        reverse: { given: 'N mod 7 = 3', goal: 'Find (2N) mod 7 = 6' },
        mixed: { given: 'Divisible by 12 and 18 leaving rem 5', goal: 'LCM(12,18)+5 = 41' }
      };
    }
    if (topicId === 'geometry') {
      return {
        direct: { given: 'Rectangle L=8cm, W=5cm', goal: 'Find Area = 40 cm²' },
        reverse: { given: 'Area 40 cm², W = 5cm', goal: 'Find Length = 8 cm' },
        mixed: { given: 'Rectangle wire bent into Square', goal: 'Compare Enclosed Areas' }
      };
    }
    return {
      direct: { given: 'Direct Problem Inputs', goal: 'Apply Base Relation' },
      reverse: { given: 'Result Output Given', goal: 'Back-calculate Missing Value' },
      mixed: { given: 'Two Concepts Combined', goal: 'Multi-Step Solution' }
    };
  };

  const p = getPatterns();

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Target size={14} className="text-[#6574C4]" /> 3 Exam Angles: Direct &bull; Reverse &bull; Mixed
        </span>
        <span className="text-[11px] font-mono text-[#3E5575] font-bold">Exam Transformation Map</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-3 bg-[#FFF8EE] border border-[#CAD9EA] rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#3E5575] text-xs">DIRECT</span>
            <span className="text-[9px] font-bold text-[#667085] uppercase">Standard</span>
          </div>
          <div className="text-[11px] text-[#293247] font-medium">{p.direct.given}</div>
          <div className="text-[10px] text-[#3E5575] font-bold">&rarr; {p.direct.goal}</div>
        </div>

        <div className="p-3 bg-[#FFF8EE] border border-[#D9D2EA] rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#45456A] text-xs">REVERSE</span>
            <span className="text-[9px] font-bold text-[#667085] uppercase">Backtrack</span>
          </div>
          <div className="text-[11px] text-[#293247] font-medium">{p.reverse.given}</div>
          <div className="text-[10px] text-[#45456A] font-bold">&rarr; {p.reverse.goal}</div>
        </div>

        <div className="p-3 bg-[#FFF8EE] border border-[#E6D4B4] rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#705B35] text-xs">MIXED</span>
            <span className="text-[9px] font-bold text-[#667085] uppercase">Chained</span>
          </div>
          <div className="text-[11px] text-[#293247] font-medium">{p.mixed.given}</div>
          <div className="text-[10px] text-[#705B35] font-bold">&rarr; {p.mixed.goal}</div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 8: MISTAKE COMPARISON VISUAL (Warm Cream + Soft Peach #F6E5DF)
// ------------------------------------------------------------------
function MistakeComparisonVisual({ topicId }) {
  const getMistake = () => {
    if (topicId === 'profit-and-loss') {
      return {
        trap: 'Wrong Base for Profit %',
        wrongFormula: 'Profit % = (Profit ÷ SP) × 100',
        wrongReason: 'SP is not the original cost!',
        correctFormula: 'Profit % = (Profit ÷ CP) × 100',
        correctReason: 'Always calculate profit/loss on Cost Price (CP)'
      };
    }
    if (topicId === 'percentages') {
      return {
        trap: 'Wrong Base Denominator',
        wrongFormula: 'Denominator = New Changed Value',
        wrongReason: 'Dividing by the final result',
        correctFormula: 'Denominator = Original Starting Base',
        correctReason: 'Always compare against what was originally there'
      };
    }
    if (topicId === 'number-system') {
      return {
        trap: 'Remainder Size Trap',
        wrongFormula: 'Remainder = 7 when dividing by 5',
        wrongReason: 'Remainder cannot be larger than divisor',
        correctFormula: '0 ≤ Remainder < Divisor (0 to 4)',
        correctReason: 'Remainder is strictly smaller than the divisor'
      };
    }
    if (topicId === 'geometry') {
      return {
        trap: '1D vs 2D Units & Area vs Perimeter',
        wrongFormula: 'Area = 40 cm (1D unit for 2D shape)',
        wrongReason: 'Confusing boundary length with inside space',
        correctFormula: 'Area = 40 cm² (Square units) • Perimeter = 26 cm',
        correctReason: 'Area is always square units (cm², m²)'
      };
    }
    if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
      return {
        trap: "'To the right' vs 'Immediate right'",
        wrongFormula: 'Placing directly beside for "to the right"',
        wrongReason: 'Can have multiple persons in between',
        correctFormula: 'Immediate right = Strictly 0 between; To the right = Anywhere right',
        correctReason: 'Look for the keyword "immediate"'
      };
    }
    return {
      trap: 'Common Exam Pitfall',
      wrongFormula: 'Skipping steps or guessing formula',
      wrongReason: 'Causes easy mistakes under exam pressure',
      correctFormula: 'Write formula → Put values → Solve',
      correctReason: 'Guarantees 100% accuracy'
    };
  };

  const m = getMistake();

  return (
    <div className="w-full bg-[#F6E5DF] border border-[#E7C9C0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#824F47] border-b border-[#E7C9C0] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <X size={14} className="text-[#824F47]" /> High-Frequency Exam Trap vs Correct Principle
        </span>
        <span className="font-semibold text-[11px]">{m.trap}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-[#FFF8EE] border border-[#E7C9C0] rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[#824F47] font-bold text-xs">
            <X size={14} className="text-[#824F47] shrink-0" />
            <span>WRONG METHOD</span>
          </div>
          <div className="text-xs font-mono font-bold text-[#824F47]">{m.wrongFormula}</div>
          <div className="text-[11px] text-[#824F47]">{m.wrongReason}</div>
        </div>

        <div className="p-3 bg-[#E7F1EA] border border-[#C9DED0] rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[#3F634B] font-bold text-xs">
            <Check size={14} className="text-[#3F634B] shrink-0" />
            <span>CORRECT METHOD</span>
          </div>
          <div className="text-xs font-mono font-bold text-[#3F634B]">{m.correctFormula}</div>
          <div className="text-[11px] text-[#3F634B]">{m.correctReason}</div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 9: SPEED STRATEGY FLOW VISUAL (Warm Cream + Soft Mint #E7F1EA)
// ------------------------------------------------------------------
function SpeedFlowVisual({ topicId }) {
  const flow = [
    { num: 1, icon: '📖', label: 'Read', sub: 'Spot topic' },
    { num: 2, icon: '🔎', label: 'Recognize', sub: 'Identify pattern' },
    { num: 3, icon: '📐', label: 'Formula', sub: 'Pick rule' },
    { num: 4, icon: '⚡', label: 'Shortcut', sub: 'Skip algebra' },
    { num: 5, icon: '🧮', label: 'Calculate', sub: 'Plug values' },
    { num: 6, icon: '✓', label: 'Check', sub: 'Verify units' }
  ];

  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> 6-Step Exam Speed &amp; Accuracy Pipeline
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">Fast 30-Sec Flow</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
        {flow.map((st) => (
          <div
            key={st.num}
            className="p-2.5 bg-[#FFF8EE] border border-[#C9DED0] rounded-xl space-y-0.5 shadow-2xs"
          >
            <div className="text-lg">{st.icon}</div>
            <div className="font-bold text-[#293247] text-xs">{st.label}</div>
            <div className="text-[10px] text-[#667085]">{st.sub}</div>
          </div>
        ))}
      </div>

      <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center text-[11px] text-[#3F634B] font-bold shadow-2xs">
        ⚡ Speed Tip: Spotting the pattern in the first 5 seconds saves 80% of pencil work.
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 10: REVISION MEMORY SNAPSHOT VISUAL (Warm Cream + Soft Lavender #EDE9F6)
// ------------------------------------------------------------------
function CheatSheetIllustration({ topicId, topicName }) {
  const getSnapshot = () => {
    if (topicId === 'percentages') {
      return [
        { label: '100%', value: '1' },
        { label: '50%', value: '½' },
        { label: '25%', value: '¼' },
        { label: '20%', value: '⅕' },
        { label: '10%', value: '⅒' },
        { label: 'Multiplier', value: '1 ± r%' }
      ];
    }
    if (topicId === 'profit-and-loss') {
      return [
        { label: 'Cost Price', value: 'Buy (CP)' },
        { label: 'Selling Price', value: 'Sell (SP)' },
        { label: 'Profit Rule', value: 'SP > CP' },
        { label: '20% Gain', value: 'CP:SP = 5:6' },
        { label: 'Discount', value: 'MP − SP' },
        { label: 'Multiplier', value: 'SP = CP × (1+P%)' }
      ];
    }
    if (topicId === 'number-system') {
      return [
        { label: 'Division', value: 'D = d×Q + R' },
        { label: 'Smallest Prime', value: '2 (Even)' },
        { label: 'Div by 3/9', value: 'Sum Digits' },
        { label: 'Remainder', value: '0 ≤ R < d' },
        { label: 'Div by 4', value: 'Last 2 Digits' },
        { label: 'Modulo', value: '(A×B)%m' }
      ];
    }
    if (topicId === 'geometry') {
      return [
        { label: 'Rectangle', value: 'L × W' },
        { label: 'Perimeter', value: '2(L + W)' },
        { label: 'Triangle', value: '½ B × H' },
        { label: 'Circle', value: 'πr²' },
        { label: 'Units', value: 'cm² / m²' },
        { label: 'Triplet', value: '3 - 4 - 5' }
      ];
    }
    return [
      { label: 'Core Rule', value: 'Formula A' },
      { label: 'Shortcut', value: 'Quick Ratio' },
      { label: 'Unit', value: 'Standard Unit' },
      { label: 'Verification', value: 'Check Result' },
      { label: 'Multiplier', value: 'Direct Factor' },
      { label: 'Trap', value: 'Check Baseline' }
    ];
  };

  const snap = getSnapshot();

  return (
    <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5 font-sans">
        <div className="flex items-center gap-1.5">
          <Zap size={14} className="text-[#6574C4]" />
          <span className="font-bold text-[#45456A]">{topicName} — Memory Snapshot</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] text-[10px] font-bold shadow-2xs">
          60-Sec Flash Card
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
        {snap.map((s, idx) => (
          <div
            key={idx}
            className="p-2.5 bg-[#FFF8EE] border border-[#D9D2EA] rounded-xl text-center space-y-0.5 shadow-2xs"
          >
            <div className="text-[10px] font-sans font-bold text-[#667085] uppercase truncate">{s.label}</div>
            <div className="text-xs font-black text-[#45456A] truncate">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevisionSnapshotVisual(props) {
  return <CheatSheetIllustration {...props} />;
}

// ------------------------------------------------------------------
// STEP BREAKDOWN TIMELINE COMPONENT FOR CARD 4
// ------------------------------------------------------------------
function StepTimelineVisual({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <div className="space-y-1.5">
        {steps.map((st, idx) => (
          <div
            key={idx}
            className="p-2 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl space-y-0.5 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-[#3E5575] bg-[#E8EFF8] px-1.5 py-0.5 rounded border border-[#CAD9EA]">
                {st.num || `STEP ${idx + 1}`} &bull; {st.title}
              </span>
              <span className="text-[10px] text-[#667085]">Step {idx + 1} of {steps.length}</span>
            </div>

            {st.formula && (
              <div className="text-xs font-mono font-bold text-[#45456A] bg-[#EDE9F6] p-1 rounded border border-[#D9D2EA]">
                {st.formula}
              </div>
            )}

            {st.calc && (
              <div className="text-xs font-medium text-[#3F634B] flex items-center gap-1 pt-0.5">
                <CheckCircle2 size={12} className="text-[#3F634B] shrink-0" />
                <span>{st.calc}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ==================================================================
 * MASTER 10-CARD DEPTH CAROUSEL LEARNING COMPONENT
 * ==================================================================
 */
export default function AptitudeTopicIntroduction({ data, introData }) {
  const activeData = data || introData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const cards = activeData?.cards || [];
  const totalCards = cards.length;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure carousel always starts on Card 1 when topic changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeData?.topicId]);

  const { setPageContext } = useBestu();

  // Sync active card state to Bestu AI Mentor
  useEffect(() => {
    if (cards && cards[activeIndex]) {
      const c = cards[activeIndex];
      setPageContext({
        activeCard: {
          cardNumber: c.cardNumber || activeIndex + 1,
          title: c.title || `Card ${activeIndex + 1}`,
          badge: c.badge || '',
          subtitle: c.introText || c.subtitle || '',
          formulas: c.formulaBoxes || c.keyFormulas || c.formulas || null,
          remember: c.remember || c.rememberTakeaway || '',
          summary: c.coreConcept || c.introText || ''
        }
      });
    }
  }, [activeIndex, cards, setPageContext]);

  // Linear Navigation (disabled at boundaries)
  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (activeIndex < totalCards - 1) setActiveIndex((prev) => prev + 1);
  };

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, totalCards]);

  // Responsive Carousel Card Spread Width
  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth < 1024;
  const isLargeScreen = windowWidth < 1440;
  const cardSpread = isSmallScreen ? 150 : isMediumScreen ? 250 : isLargeScreen ? 340 : 400;

  if (!cards || cards.length === 0) {
    return null;
  }

  const topicId = activeData?.topicId || 'topic';

  return (
    <div className="space-y-5 select-none max-w-7xl mx-auto overflow-hidden px-1">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOPIC HEADER & SUBTITLE BANNER (WARM LEARNING THEME)       */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-3xl p-5 sm:p-6 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9D1C7] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] text-xs font-bold uppercase tracking-wider">
                {activeData.category || 'Quantitative Aptitude'}
              </span>
              <span className="text-[#D9D1C7]">&bull;</span>
              <span className="text-xs text-[#667085] font-medium">Topic Introduction</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#293247] tracking-tight">
              {activeData.topicName}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <AddNoteButton
              subject="Aptitude"
              topicId={topicId}
              topicName={activeData.topicName}
              section="Topic Carousel"
              size="sm"
            />
            <span className="px-3 py-1.5 rounded-xl bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <Sparkles size={14} className="text-[#6574C4]" /> 10-Card Learning
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#667085] font-medium leading-relaxed max-w-3xl">
          {activeData.subtitle}
        </p>

        {/* Full Forms Legend at Top (When Available) */}
        {activeData.fullForms && activeData.fullForms.length > 0 && (
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] shrink-0">
              Key Terms:
            </span>
            {activeData.fullForms.map((f, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-lg bg-[#FFF8EE] border border-[#D9D1C7] text-[11px] text-[#667085] font-medium"
                title={f.desc}
              >
                <strong className="font-bold text-[#293247]">{f.abbr}</strong> = {f.full}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. 10-CARD DEPTH CAROUSEL CONTAINER (WARM #F8F4EE BG)         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
        {/* Top Header & Position Indicator */}
        <div className="flex items-center justify-between border-b border-[#D9D1C7] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#E8EFF8] text-[#6574C4] border border-[#CAD9EA] shadow-xs">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#293247]">
                {activeData.topicName} — 10-Card Learning Cards
              </h2>
              <p className="text-[11px] text-[#667085]">
                One small lesson &rarr; Understand &rarr; See visual &rarr; Remember &rarr; Next
              </p>
            </div>
          </div>

          {/* Explicit Card Counter (e.g. 01 / 10) */}
          <div className="px-3 py-1 rounded-full bg-[#E8EFF8] border border-[#CAD9EA] text-xs font-black text-[#3E5575]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
          </div>
        </div>

        {/* 3D Depth Carousel Stage (Strictly Only 3 Cards Rendered: Prev, Active, Next) */}
        {/* Generous container height so cards display main learning content with NO INTERNAL SCROLLBAR */}
        <div className="relative min-h-[580px] h-[640px] sm:h-[610px] md:h-[590px] flex items-center justify-center overflow-hidden py-1">
          <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {cards.map((card, index) => {
              const diff = index - activeIndex;

              // STRICT RULE: Only render 3 cards (diff === -1, 0, 1). Hide all other cards!
              if (Math.abs(diff) > 1) {
                return null;
              }

              const isActive = diff === 0;
              const xOffset = diff * cardSpread;
              const zOffset = isActive ? 0 : -90;
              const scale = isActive ? 1.0 : 0.88;
              const opacity = isActive ? 1 : 0.55;
              const zIndex = isActive ? 30 : 10;
              const rotateY = diff * -10;

              return (
                <div
                  key={card.id}
                  id={`aptitude-card-${card.cardNumber}`}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index);
                  }}
                  style={{
                    transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex
                  }}
                  className={`absolute w-[95%] sm:w-[90%] md:w-[86%] lg:w-[82%] max-w-[840px] xl:max-w-[880px] h-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 ease-out border ${
                    isActive
                      ? 'bg-[#FFF8EE] border-[#D9D1C7] border-indigo-200/30 shadow-[0_10px_25px_-5px_rgba(101,116,196,0.07),0_8px_10px_-6px_rgba(101,116,196,0.04)] ring-2 ring-[#6574C4]/15'
                      : 'bg-[#FFF8EE]/85 border-[#D9D1C7] shadow-xs cursor-pointer hover:border-[#6574C4]'
                  }`}
                >
                  {/* Card Content: CLEAN & BALANCED 4-PART LAYOUT (Header -> Visual -> Supporting -> Remember) */}
                  <div className="flex-1 flex flex-col gap-2 overflow-hidden h-full">
                    {/* 1. TOP: HEADER, TITLE & SHORT EXPLANATION */}
                    <div className="shrink-0 space-y-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-black uppercase tracking-wider ${getCardBadgeStyle(card.cardNumber, card.badge)}`}>
                          {card.badge || `0${card.cardNumber} · LESSON`}
                        </span>
                        <span className="text-xs font-black text-[#667085] font-mono">
                          {String(card.cardNumber).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-[#293247] tracking-tight leading-tight">
                        {card.title}
                      </h3>

                      {card.introText && (
                        <p className="text-xs text-[#667085] font-medium leading-relaxed bg-[#F8F4EE] p-2 rounded-xl border border-[#D9D1C7]">
                          {card.introText}
                        </p>
                      )}
                    </div>

                    {/* 2. MIDDLE: MAIN TOPIC-SPECIFIC EDUCATIONAL VISUAL (Occupies ~25-40% of active card area) */}
                    <div className="flex-1 my-auto py-0.5 w-full flex flex-col justify-center">
                      {card.cardNumber === 1 && <ConceptIllustration topicId={topicId} />}
                      {card.cardNumber === 2 && <FormulaVisual topicId={topicId} />}
                      {card.cardNumber === 3 && <QuickTrickVisual topicId={topicId} />}
                      {card.cardNumber === 4 && <SolvedExampleVisual topicId={topicId} />}
                      {card.cardNumber === 5 && <VariationMapVisual topicId={topicId} />}
                      {card.cardNumber === 6 && <ShortcutDiagramVisual topicId={topicId} />}
                      {card.cardNumber === 7 && <ExamPatternVisual topicId={topicId} />}
                      {card.cardNumber === 8 && <MistakeComparisonVisual topicId={topicId} />}
                      {card.cardNumber === 9 && <SpeedFlowVisual topicId={topicId} />}
                      {card.cardNumber === 10 && <RevisionSnapshotVisual topicId={topicId} topicName={activeData.topicName} />}
                    </div>

                    {/* 3. LOWER: SMALL SUPPORTING INFORMATION */}
                    <div className="shrink-0 space-y-1.5">
                      {card.cardNumber === 1 && (
                        <div className="space-y-1.5">
                          {(card.importantTerms || card.coreTerms) && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs">
                              {(card.importantTerms || card.coreTerms).slice(0, 3).map((term, idx) => (
                                <div
                                  key={idx}
                                  className="p-1.5 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl space-y-0.5 shadow-2xs"
                                >
                                  <span className="font-bold text-[#3E5575] block text-[11px] truncate">
                                    {term.term}
                                  </span>
                                  <span className="text-[#667085] text-[10px] line-clamp-1">
                                    {term.meaning}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                            {card.realLifeExample && (
                              <div className="p-1.5 bg-[#F8EEDC] border border-[#E6D4B4] rounded-xl text-[#705B35]">
                                <span className="font-bold text-[10px] text-[#705B35] block truncate">
                                  Real Example: {card.realLifeExample.title}
                                </span>
                                <div className="text-[10px] text-[#667085] truncate">
                                  {card.realLifeExample.buy} &bull; <strong className="text-[#3F634B]">{card.realLifeExample.result}</strong>
                                </div>
                              </div>
                            )}
                            {card.whyLearnIt && (
                              <div className="p-1.5 bg-[#E8EFF8] border border-[#CAD9EA] rounded-xl">
                                <span className="font-bold text-[10px] text-[#3E5575] block">
                                  Why Learn It?
                                </span>
                                <div className="text-[10px] text-[#667085] truncate">
                                  {card.whyLearnIt[0] || 'Essential for competitive aptitude tests'}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {card.cardNumber === 2 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {(card.formulaBoxes || card.formulas)?.slice(0, 4).map((f, idx) => (
                            <div
                              key={idx}
                              className="p-1.5 bg-[#EDE9F6] border border-[#D9D2EA] rounded-xl space-y-0.5 shadow-2xs"
                            >
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="font-bold text-[#45456A] uppercase truncate">
                                  {f.name || f.label}
                                </span>
                                {(f.when || f.note) && (
                                  <span className="text-[9px] text-[#667085] truncate max-w-[120px]">
                                    {f.when || f.note}
                                  </span>
                                )}
                              </div>
                              <div className="p-1 bg-[#FFF8EE] rounded-lg border border-[#D9D2EA] font-mono font-bold text-xs text-[#45456A] truncate">
                                {f.formula}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {card.cardNumber === 3 && (
                        <div className="space-y-1.5">
                          {card.clues && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs">
                              {card.clues.slice(0, 3).map((c, idx) => (
                                <div
                                  key={idx}
                                  className="p-1.5 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl space-y-0.5 shadow-2xs"
                                >
                                  <span className="font-extrabold text-[#3F634B] block text-[11px] truncate">
                                    {c.word || c.keyword}
                                  </span>
                                  <p className="text-[10px] text-[#667085] truncate">
                                    &rarr; {c.meaning}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                          {(card.quickTricks || card.fractionTricks) && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs font-mono">
                              {(card.quickTricks || card.fractionTricks).slice(0, 4).map((t, idx) => (
                                <div
                                  key={idx}
                                  className="p-1 bg-[#FFF8EE] rounded-lg border border-[#C9DED0] text-center space-y-0.5 shadow-2xs"
                                >
                                  <span className="font-black text-[#293247] block text-[11px] truncate">{t.pct || t.rule}</span>
                                  <span className="text-[#3F634B] font-bold block text-[9px] truncate">{t.action || t.frac}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {card.cardNumber === 4 && (
                        <div className="space-y-1">
                          <StepTimelineVisual steps={card.steps || []} />
                          {(card.finalAnswer || card.problem?.finalAnswer) && (
                            <div className="p-1 bg-[#E7F1EA] border border-[#C9DED0] rounded-xl text-center">
                              <span className="text-xs font-black text-[#3F634B]">
                                ✓ Final Answer: {card.finalAnswer || card.problem?.finalAnswer}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {card.cardNumber === 5 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {(card.formsList || card.variations)?.slice(0, 4).map((form, idx) => (
                            <div
                              key={idx}
                              className="p-1.5 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl flex items-center gap-2 text-xs shadow-2xs"
                            >
                              <div className="w-5 h-5 rounded-full bg-[#EDE9F6] text-[#45456A] font-black text-[10px] flex items-center justify-center shrink-0">
                                {form.num || idx + 1}
                              </div>
                              <div className="flex-1 truncate">
                                <span className="font-bold text-[#293247] text-xs block truncate">
                                  {form.title || form.type}
                                </span>
                                <span className="text-[10px] text-[#667085] block truncate">
                                  {form.tip || form.desc}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {card.cardNumber === 6 && card.mainTrick && (
                        <div className="p-2 bg-[#E7F1EA] border border-[#C9DED0] rounded-xl space-y-0.5 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Zap size={13} className="text-[#3F634B]" />
                            <span className="font-extrabold text-[#3F634B] text-[11px]">
                              {card.mainTrick.name}
                            </span>
                          </div>
                          <p className="text-[#667085] text-[10px] truncate">
                            {card.mainTrick.idea}
                          </p>
                          {card.mainTrick.example && (
                            <div className="p-1 bg-[#FFF8EE] rounded-lg border border-[#C9DED0] text-[#3F634B] font-bold text-[10px] truncate">
                              ⚡ {card.mainTrick.example}
                            </div>
                          )}
                        </div>
                      )}

                      {card.cardNumber === 7 && (
                        <div className="space-y-1">
                          {(card.variations || card.styles)?.slice(0, 2).map((v, idx) => (
                            <div
                              key={idx}
                              className="p-1.5 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl space-y-0.5 text-xs shadow-2xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-[#293247] text-[11px] truncate">
                                  {v.type || v.category}
                                </span>
                                <span className="text-[9px] font-bold text-[#3E5575] bg-[#E8EFF8] px-1.5 py-0.5 rounded-full border border-[#CAD9EA]">
                                  Pattern {idx + 1}
                                </span>
                              </div>
                              <p className="text-[#667085] text-[10px] truncate">
                                {v.question || v.example}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {card.cardNumber === 8 && (
                        <div className="space-y-1">
                          {card.mistakes?.slice(0, 2).map((m, idx) => (
                            <div
                              key={idx}
                              className="p-1.5 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl space-y-0.5 text-xs shadow-2xs"
                            >
                              {m.trap && (
                                <span className="font-bold text-[#293247] block text-[11px] truncate">
                                  {m.trap}
                                </span>
                              )}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px]">
                                <div className="p-1 bg-[#F6E5DF] border border-[#E7C9C0] rounded text-[#824F47] truncate">
                                  {m.wrong}
                                </div>
                                <div className="p-1 bg-[#E7F1EA] border border-[#C9DED0] rounded text-[#3F634B] truncate">
                                  {m.correct}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {card.cardNumber === 9 && card.proTip && (
                        <div className="p-1.5 bg-[#E7F1EA] border border-[#C9DED0] rounded-xl text-xs text-[#3F634B] font-semibold flex items-center gap-1.5">
                          <Lightbulb size={14} className="text-[#3F634B] shrink-0" />
                          <span className="text-[11px] truncate">Pro Tip: {card.proTip}</span>
                        </div>
                      )}

                      {card.cardNumber === 10 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                          <div className="p-1.5 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl space-y-0.5">
                            <span className="font-extrabold text-[#45456A] uppercase text-[9px] block">
                              Core Formulas
                            </span>
                            <div className="space-y-0.5 font-mono text-[10px] text-[#45456A]">
                              {(card.cheatSheet?.formulas || card.quickFormulas)?.slice(0, 2).map((f, idx) => (
                                <div key={idx} className="p-0.5 bg-[#EDE9F6] rounded border border-[#D9D2EA] truncate">
                                  {f}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-1.5 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl space-y-0.5">
                            <span className="font-extrabold text-[#705B35] uppercase text-[9px] block">
                              Key Rules & Units
                            </span>
                            <div className="space-y-0.5 text-[10px] text-[#667085]">
                              {(card.cheatSheet?.shortcuts || card.quickTricks)?.slice(0, 2).map((sc, idx) => (
                                <div key={idx} className="p-0.5 bg-[#F8EEDC] rounded border border-[#E6D4B4] font-mono text-[#705B35] truncate">
                                  {typeof sc === 'string' ? sc : sc.pct || sc.rule}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 4. BOTTOM: TAKEAWAY BANNER */}
                    {card.remember && (
                      <div className={`shrink-0 mt-auto p-2 rounded-xl flex items-center gap-2 text-xs border ${getCardRememberStyle(card.cardNumber)}`}>
                        <Lightbulb size={14} className="shrink-0" />
                        <span className="font-medium text-[11px]">
                          <strong>Remember:</strong> {card.remember}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CAROUSEL NAVIGATION CONTROLS & 10 PROGRESS DOTS               */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#D9D1C7]">
          {/* ← Previous Button */}
          <button
            id="aptitude-carousel-prev"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#FFF8EE] hover:bg-[#EDE9F6] hover:text-[#45456A] text-[#293247] text-xs font-bold border border-[#D9D1C7] flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            aria-label="Previous Learning Card"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {/* 10 Card Indicator Dots (Active Dot Elongated Muted Blue-Indigo Pill) */}
          <div className="flex items-center gap-2">
            {cards.map((c, idx) => {
              const isDotActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  id={`aptitude-dot-${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isDotActive
                      ? 'w-7 h-2 bg-[#6574C4] shadow-xs'
                      : 'w-2 h-2 bg-[#D9D1C7] hover:bg-[#CAD9EA]'
                  }`}
                  aria-label={`Go to Card ${idx + 1}`}
                  title={`Card ${idx + 1}: ${cards[idx]?.title}`}
                />
              );
            })}
          </div>

          {/* Next → Button */}
          <button
            id="aptitude-carousel-next"
            onClick={handleNext}
            disabled={activeIndex === totalCards - 1}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#FFF8EE] hover:bg-[#EDE9F6] hover:text-[#45456A] text-[#293247] text-xs font-bold border border-[#D9D1C7] flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            aria-label="Next Learning Card"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

{/* Base design theme: bg-white excessive lightness eliminated with warm cream #FFF8EE & beige #F4EFE8 */}
