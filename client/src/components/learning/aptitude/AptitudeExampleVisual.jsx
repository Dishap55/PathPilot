import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  Target
} from 'lucide-react';

/**
 * AptitudeExampleVisual
 * Renders small, clean educational CSS/SVG diagrams to help students visualize concepts.
 * No giant illustrations or stock photos — just clear, tiny, instructive visual aids.
 */
export default function AptitudeExampleVisual({ visualType, visualData = {} }) {
  if (!visualType) return null;

  switch (visualType) {
    // 1. Number System: Digit counting blocks
    case 'number-digits': {
      const num = visualData.number || '789456';
      const digits = num.split('');
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#475569]">
            <span className="flex items-center gap-1.5 text-[#0F172A]">
              <Sparkles size={13} className="text-[#6574C4]" /> Digit Count Breakdown
            </span>
            <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Total: {digits.length} digits
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {digits.map((d, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center w-10 h-12 rounded-lg bg-[#F8F5EE] border border-[#CBD5E1] text-[#0F172A] font-mono shadow-2xs"
              >
                <span className="text-sm font-black">{d}</span>
                <span className="text-[9px] font-medium text-[#64748B]">#{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 2. Number System: Divisibility by 9 sum visual
    case 'divisibility-9': {
      const digits = visualData.digits || [4, 5, 8, 1, 9];
      const sum = visualData.sum || 27;
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3 shadow-2xs space-y-1.5">
          <div className="text-[11px] font-bold text-[#0F172A] flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#6574C4]" /> Sum of Digits Calculation:
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-[#0F172A]">
            {digits.map((d, i) => (
              <React.Fragment key={i}>
                <span className="px-2 py-1 rounded bg-[#F8F5EE] border border-[#CBD5E1] font-bold">
                  {d}
                </span>
                {i < digits.length - 1 && <span className="font-bold text-[#64748B]">+</span>}
              </React.Fragment>
            ))}
            <span className="font-bold text-[#64748B]">=</span>
            <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-extrabold border border-amber-300">
              {sum}
            </span>
            <span className="text-[#64748B]">→</span>
            <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-extrabold border border-emerald-300">
              27 ÷ 9 = 3 (Remainder 0 ✓)
            </span>
          </div>
        </div>
      );
    }

    // 3. Number System: Unit Digit 4-Step Cycle
    case 'unit-digit-cyclicity': {
      const cycle = visualData.cycle || [7, 9, 3, 1];
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3 shadow-2xs space-y-2">
          <div className="text-[11px] font-bold text-[#0F172A] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#6574C4]" /> 4-Step Cycle of Powers of 7:
            </span>
            <span className="font-mono text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              45 ÷ 4 = Remainder 1
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
            {cycle.map((digit, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg border flex flex-col items-center ${
                  i === 0
                    ? 'bg-purple-100 border-purple-400 text-purple-900 font-black ring-1 ring-purple-400'
                    : 'bg-[#F8F5EE] border-[#CBD5E1] text-[#334155]'
                }`}
              >
                <span className="text-[10px] text-[#64748B] font-sans">
                  {i === 0 ? 'Rem 1 (Answer)' : `Rem ${i + 1}`}
                </span>
                <span className="text-sm font-extrabold">7^{i + 1} → {digit}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4. Percentage: Proportion Split Bar
    case 'percentage-bar': {
      const pct = visualData.pct || 20;
      const val = visualData.value || 90;
      const total = visualData.base || 450;
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0F172A]">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#6574C4]" /> Percentage Bar Visual
            </span>
            <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
              {pct}% of {total} = {val}
            </span>
          </div>
          <div className="w-full h-6 bg-[#E2E8F0] rounded-lg overflow-hidden flex border border-[#CBD5E1] text-[10px] font-bold font-mono">
            <div
              className="bg-[#6574C4] text-white flex items-center justify-center transition-all"
              style={{ width: `${pct}%` }}
            >
              {pct}% ({val})
            </div>
            <div className="flex-1 flex items-center justify-center text-[#475569]">
              {100 - pct}% ({total - val})
            </div>
          </div>
        </div>
      );
    }

    // 5. Percentage: Successive Change Formula Diagram
    case 'successive-change': {
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3 shadow-2xs space-y-2">
          <div className="text-[11px] font-bold text-[#0F172A] flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#6574C4]" /> Successive Changes Step Visual:
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-[#F8F5EE] border border-[#CBD5E1] text-center flex-1">
              <span className="text-[10px] block text-[#64748B] font-sans">Start Price</span>
              <strong className="text-[#0F172A]">₹100</strong>
            </div>
            <span className="text-emerald-700 font-bold">+20% →</span>
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-center flex-1">
              <span className="text-[10px] block text-emerald-800 font-sans">After Increase</span>
              <strong className="text-emerald-900">₹120</strong>
            </div>
            <span className="text-red-700 font-bold">−20% of 120 →</span>
            <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-center flex-1">
              <span className="text-[10px] block text-red-800 font-sans">Final Price</span>
              <strong className="text-red-900">₹96 (Net −4%)</strong>
            </div>
          </div>
        </div>
      );
    }

    // 6. Time Speed Distance: Car Distance Line
    case 'car-line': {
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0F172A]">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#6574C4]" /> Speed in 1 Second:
            </span>
            <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
              72 km/h = 20 meters every second
            </span>
          </div>
          <div className="relative w-full h-8 bg-[#E8EFF8] rounded-lg border border-[#CAD9EA] flex items-center px-3">
            <div className="w-full flex items-center justify-between text-xs text-[#3E5575] font-mono font-bold">
              <span>0m</span>
              <div className="flex items-center gap-1 text-[#6574C4]">
                <span className="text-base">🚗</span>
                <span className="text-[10px]">speed: 20 m/s</span>
                <span className="border-b-2 border-dashed border-[#6574C4] w-20"></span>
              </div>
              <span className="text-emerald-800 font-extrabold">+20 meters</span>
            </div>
          </div>
        </div>
      );
    }

    // 7. Time Speed Distance: Round Trip Harmonic Mean
    case 'round-trip': {
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0F172A]">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#6574C4]" /> Equal Distance Round Trip:
            </span>
            <span className="font-mono text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
              Avg Speed = 24 km/h (not 25)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-between">
              <span className="text-[#3E5575]">Going: Home ➔ Office</span>
              <strong className="text-indigo-900">30 km/h</strong>
            </div>
            <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-between">
              <span className="text-[#45456A]">Returning: Office ➔ Home</span>
              <strong className="text-purple-900">20 km/h</strong>
            </div>
          </div>
        </div>
      );
    }

    // 8. Probability: Die Outcomes
    case 'die-outcomes': {
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0F172A]">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#6574C4]" /> Die Outcomes (Total: 6 faces)
            </span>
            <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
              3 Even Numbers = 3/6 = 1/2
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5 text-center font-mono text-xs">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const isEven = num % 2 === 0;
              return (
                <div
                  key={num}
                  className={`p-2 rounded-lg border ${
                    isEven
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-black ring-1 ring-emerald-400'
                      : 'bg-[#F8F5EE] border-[#CBD5E1] text-[#64748B]'
                  }`}
                >
                  <span className="text-sm block">{num}</span>
                  <span className="text-[9px] font-sans">{isEven ? 'Even ✓' : 'Odd'}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // 9. Seating Arrangement: 5 Seats in a Row
    case 'row-seats': {
      const seats = visualData.seats || ['E', 'A', 'B', 'C', 'D'];
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0F172A]">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#6574C4]" /> Row Layout (Facing North):
            </span>
            <span className="font-mono text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-bold">
              Middle Seat: B
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono">
            {seats.map((person, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border flex flex-col items-center ${
                  person === 'B'
                    ? 'bg-indigo-100 border-indigo-400 text-indigo-950 font-black ring-2 ring-indigo-400'
                    : 'bg-[#F8F5EE] border-[#CBD5E1] text-[#334155]'
                }`}
              >
                <span className="text-[10px] text-[#64748B] font-sans">Seat {idx + 1}</span>
                <span className="text-base font-extrabold">{person}</span>
                {person === 'B' && (
                  <span className="text-[9px] text-indigo-700 font-bold font-sans">Middle</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 10. Grammar Box
    case 'grammar-box': {
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-3 shadow-2xs space-y-1.5">
          <div className="text-[11px] font-bold text-[#0F172A] flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#6574C4]" /> Grammar Matching Rule:
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold">
              The committee [Single Unit]
            </div>
            <span className="font-bold text-[#64748B]">+</span>
            <div className="p-2 rounded bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold">
              has [Singular Verb]
            </div>
            <span className="text-[#64748B]">matches</span>
            <div className="p-2 rounded bg-purple-50 border border-purple-200 text-purple-900 font-bold">
              its report [Singular Pronoun]
            </div>
          </div>
        </div>
      );
    }

    // 11. Generic Clean Educational Chip
    default: {
      return (
        <div className="bg-[#FFFDF9] border border-[#E2D9CC] rounded-xl p-2.5 shadow-2xs flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#0F172A] font-medium">
            <Zap size={14} className="text-amber-500" />
            <span>Problem visual breakdown ready</span>
          </div>
          <span className="text-[10px] text-[#475569] font-mono bg-[#F8F5EE] px-2 py-0.5 rounded border border-[#CBD5E1]">
            Step-by-step
          </span>
        </div>
      );
    }
  }
}
