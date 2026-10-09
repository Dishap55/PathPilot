import React, { useState } from 'react';
import { Sparkles, HelpCircle, Lightbulb, Code2, AlertCircle, ChevronRight } from 'lucide-react';
import { aiService } from '../../services/aiService';
import Badge from '../common/Badge';
import Loader from '../common/Loader';

export default function AIMentor({
  subject = 'DSA',
  topic = 'Binary Search',
  questionPrompt = '',
  studentCode = '',
  preferredLanguage = 'C++'
}) {
  const [activeLevel, setActiveLevel] = useState(1);
  const [hints, setHints] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchHint = async (level) => {
    if (hints[level]) {
      setActiveLevel(level);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setActiveLevel(level);

      const res = await aiService.getMentorGuidance({
        subject,
        topic,
        hintLevel: level,
        questionPrompt,
        studentCode,
        preferredLanguage
      });

      if (res && res.hint) {
        setHints(prev => ({
          ...prev,
          [level]: {
            hint: res.hint,
            guidanceType: res.guidance_type || (level === 1 ? 'Conceptual Direction' : level === 2 ? 'Pattern Strategy' : 'Code Skeleton')
          }
        }));
      } else {
        throw new Error('Unable to retrieve guidance at this time.');
      }
    } catch (err) {
      console.error('[AI Mentor Error]', err);
      setError(err.message || 'AI Mentor is currently busy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMentor = () => {
    setIsOpen(true);
    if (!hints[1]) {
      fetchHint(1);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-slate-50 border border-indigo-100/80 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">AI Mentor Guidance</h4>
              <Badge variant="primary">Progressive Hints</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeted assistance without premature solution spoilers ({preferredLanguage})
            </p>
          </div>
        </div>

        {!isOpen ? (
          <button
            onClick={handleOpenMentor}
            className="px-3.5 py-1.5 text-xs font-bold text-indigo-700 bg-white border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Lightbulb size={14} className="text-amber-500" />
            <span>Open AI Mentor</span>
            <ChevronRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(false)}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Minimize
          </button>
        )}
      </div>

      {isOpen && (
        <div className="space-y-4 pt-2 border-t border-indigo-100/60">
          {/* Hint Level Selector Stepper */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => fetchHint(1)}
              disabled={loading}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeLevel === 1
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <HelpCircle size={13} className={activeLevel === 1 ? 'text-white' : 'text-indigo-500'} />
                <span>Level 1</span>
              </div>
              <span className={`text-[11px] block mt-0.5 font-medium ${activeLevel === 1 ? 'text-indigo-100' : 'text-slate-400'}`}>
                Intuition & Concept
              </span>
            </button>

            <button
              onClick={() => fetchHint(2)}
              disabled={loading}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeLevel === 2
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Lightbulb size={13} className={activeLevel === 2 ? 'text-white' : 'text-amber-500'} />
                <span>Level 2</span>
              </div>
              <span className={`text-[11px] block mt-0.5 font-medium ${activeLevel === 2 ? 'text-indigo-100' : 'text-slate-400'}`}>
                Pattern & Boundary
              </span>
            </button>

            <button
              onClick={() => fetchHint(3)}
              disabled={loading}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeLevel === 3
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Code2 size={13} className={activeLevel === 3 ? 'text-white' : 'text-emerald-500'} />
                <span>Level 3</span>
              </div>
              <span className={`text-[11px] block mt-0.5 font-medium ${activeLevel === 3 ? 'text-indigo-100' : 'text-slate-400'}`}>
                Pseudocode Skeleton
              </span>
            </button>
          </div>

          {/* Hint Display Panel */}
          <div className="bg-white border border-indigo-100 rounded-xl p-4 shadow-sm min-h-[90px] flex flex-col justify-center">
            {loading ? (
              <div className="flex items-center justify-center gap-3 text-indigo-600 py-3">
                <Loader size="sm" />
                <span className="text-xs font-semibold">Consulting AI Mentor...</span>
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 text-rose-600 text-xs">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            ) : hints[activeLevel] ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    {hints[activeLevel].guidanceType}
                  </span>
                  <span className="text-[11px] text-slate-400">Hint {activeLevel} of 3</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
                  {hints[activeLevel].hint}
                </p>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-xs text-slate-500">Click a hint level to receive targeted guidance.</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 px-1">
            <AlertCircle size={12} className="text-slate-400 shrink-0" />
            <span>AI Mentor provides structural guidance. Try implementing the idea before advancing to the next level.</span>
          </div>
        </div>
      )}
    </div>
  );
}
