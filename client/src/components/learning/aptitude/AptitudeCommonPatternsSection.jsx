import React, { useMemo } from 'react';
import {
  Layers,
  Sparkles,
  Zap,
  Target,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import AddNoteButton from '../../notes/AddNoteButton';
import { getTopicPatterns } from '../../../data/aptitudeExamplesData';

/**
 * AptitudeCommonPatternsSection
 * Visual, beginner-friendly Question Patterns section.
 * Teaches students: "What type of question is this and how do I solve it quickly?"
 */
export default function AptitudeCommonPatternsSection({
  topic,
  onGoToPractice,
  onGoToSummary
}) {
  if (!topic) return null;

  const patterns = useMemo(() => {
    return getTopicPatterns(topic.topicId, topic.topicName);
  }, [topic.topicId, topic.topicName]);

  const patternColors = [
    { badge: 'bg-indigo-50 text-indigo-900 border-indigo-200', icon: '🟦' },
    { badge: 'bg-amber-50 text-amber-900 border-amber-200', icon: '🟨' },
    { badge: 'bg-purple-50 text-purple-900 border-purple-200', icon: '🟪' },
    { badge: 'bg-emerald-50 text-emerald-900 border-emerald-200', icon: '🟩' }
  ];

  return (
    <div className="space-y-5 select-none animate-fadeIn" id="aptitude-section-patterns">
      {/* ------------------------------------------------------------- */}
      {/* 1. SECTION HEADER                                             */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D1C7] pb-3.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E7F1EA] text-[#3F634B] border border-[#C9DED0] text-[11px] font-extrabold uppercase tracking-wider">
                Section 4 &bull; Common Patterns
              </span>
              <span className="text-[#D9D1C7]">&bull;</span>
              <span className="text-xs font-bold text-[#475569]">{topic.topicName}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Common Question Patterns
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <AddNoteButton
              subject="Aptitude"
              topicId={topic.topicId}
              topicName={topic.topicName}
              section="Common Patterns"
              size="md"
            />
            {onGoToPractice && (
              <button
                type="button"
                onClick={onGoToPractice}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#6574C4] hover:bg-[#5361A8] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <Target size={14} />
                <span>MCQ Practice &rarr;</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#334155] font-medium leading-relaxed max-w-3xl">
          Learn to recognize recurring question types for <strong>{topic.topicName}</strong> in 5 seconds. Once you recognize the pattern, you immediately know which method to use!
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. PATTERNS GRID (Short, visual cards as requested)           */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patterns.map((pat, idx) => {
          const colorPair = patternColors[idx % patternColors.length];

          return (
            <div
              key={pat.id || idx}
              id={`pattern-card-${pat.id || idx}`}
              className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5 transition-all hover:border-[#6574C4] flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header: Pattern pill + Badge */}
                <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0F172A]">
                    <span>{colorPair.icon}</span>
                    <span>Pattern {pat.number || idx + 1}</span>
                  </div>
                  {pat.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorPair.badge}`}>
                      {pat.badge}
                    </span>
                  )}
                </div>

                {/* Pattern Name */}
                <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight">
                  {pat.name}
                </h3>

                {/* How to recognize */}
                <div className="p-3 rounded-xl bg-[#F8F5EE] border border-[#CBD5E1] space-y-1 text-xs">
                  <div className="font-extrabold text-[#0F172A] flex items-center gap-1.5 text-[11px]">
                    <span className="text-indigo-600">👁️</span>
                    <span>How to recognize:</span>
                  </div>
                  <p className="text-[#334155] leading-relaxed pl-5 font-medium">
                    &ldquo;{pat.recognize}&rdquo;
                  </p>
                </div>

                {/* Method / Formula */}
                <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1 text-xs">
                  <div className="font-extrabold text-indigo-950 flex items-center gap-1.5 text-[11px]">
                    <span className="text-indigo-700">🧮</span>
                    <span>Method / Formula:</span>
                  </div>
                  <p className="text-indigo-950 leading-relaxed pl-5 font-mono font-bold text-[11px]">
                    {pat.method}
                  </p>
                </div>

                {/* Quick Tip */}
                {pat.quickTip && (
                  <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1 text-xs">
                    <div className="font-extrabold text-amber-950 flex items-center gap-1.5 text-[11px]">
                      <Zap size={13} className="text-amber-600" />
                      <span>⚡ Quick Tip:</span>
                    </div>
                    <p className="text-amber-950 leading-relaxed pl-5 font-medium text-[11px]">
                      {pat.quickTip}
                    </p>
                  </div>
                )}

                {/* Watch Out / Avoid Mistake */}
                {pat.avoidMistake && (
                  <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1 text-xs">
                    <div className="font-extrabold text-rose-950 flex items-center gap-1.5 text-[11px]">
                      <AlertTriangle size={13} className="text-rose-600" />
                      <span>⚠ Watch Out:</span>
                    </div>
                    <p className="text-rose-950 leading-relaxed pl-5 font-medium text-[11px]">
                      {pat.avoidMistake}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer action */}
              <div className="pt-2 border-t border-[#E2D9CC] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#64748B] font-medium">
                  High-frequency placement pattern
                </span>
                {onGoToPractice && (
                  <button
                    type="button"
                    onClick={onGoToPractice}
                    className="text-[#6574C4] hover:text-[#5361A8] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Practice this pattern</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. FOOTER PROMPT                                              */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-extrabold text-[#0F172A] block text-sm">
            Put these patterns into practice!
          </span>
          <span className="text-[#475569]">
            Head over to Practice Questions to solve questions matching these exact patterns.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onGoToPractice && (
            <button
              type="button"
              onClick={onGoToPractice}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#6574C4] hover:bg-[#5361A8] text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Target size={14} />
              <span>Practice Questions &rarr;</span>
            </button>
          )}
          {onGoToSummary && (
            <button
              type="button"
              onClick={onGoToSummary}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FFFDF9] hover:bg-[#EDE9F6] text-[#0F172A] border border-[#D9D1C7] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FileText size={14} className="text-[#6574C4]" />
              <span>Summary &amp; Notes</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
