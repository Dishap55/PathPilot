import React, { useState, useEffect } from 'react';
import { Code2, Check, Copy, Sparkles, ChevronDown } from 'lucide-react';
import { DSA_SYNTAX_DATA } from '../../data/dsaSyntaxData';
import { SUPPORTED_LANGUAGES } from '../profile/LanguageSelector';
import { useProfile } from '../../hooks/useProfile';
/**
 * LanguageSyntaxCard Component
 * 
 * A reusable, dynamic, language-specific syntax reference card for DSA topics.
 * 
 * Features:
 * - Topic-aware (lookup based on topicId)
 * - Language-aware (uses authenticated user's preferred language as default)
 * - Reactive language switcher (updates instantly without page reload)
 * - Clipboard copy buttons per snippet with visual feedback state
 * - Graceful fallbacks for unsupported topics or languages
 * - Light-mode educational styling matching PathPilot theme
 */

export default function LanguageSyntaxCard({
  topicId = 'two-pointers',
  topicName = 'Two Pointers',
  className = ''
}) {
  const { profile } = useProfile();

  // 1. Initial Language Resolution (Profile -> LocalStorage -> Default C++)
  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      const stored = localStorage.getItem('pathpilot_language');
      if (stored) return stored;
    } catch (e) {}
    return 'C++';
  });

  // Track copied snippet IDs for feedback
  const [copiedSnippet, setCopiedSnippet] = useState(null);

  // Sync state if authentic profile language is available
  useEffect(() => {
    const profileLang = profile?.preferred_language;
    if (profileLang && profileLang !== selectedLang) {
      setSelectedLang(profileLang);
    }
  }, [profile?.preferred_language]);

  // Handle language switch
  const handleLanguageChange = (newLang) => {
    setSelectedLang(newLang);
    try {
      localStorage.setItem('pathpilot_language', newLang);
    } catch (e) {
      console.warn('[LanguageSyntaxCard] Failed to write localStorage:', e);
    }
  };

  // Copy to clipboard helper
  const handleCopyCode = (codeText, idx) => {
    navigator.clipboard.writeText(codeText).then(() => {
      setCopiedSnippet(idx);
      setTimeout(() => setCopiedSnippet(null), 2000);
    }).catch(err => {
      console.warn('[LanguageSyntaxCard] Copy failed:', err);
    });
  };

  // Lookup topic syntax data
  const topicData = DSA_SYNTAX_DATA[topicId] || DSA_SYNTAX_DATA['two-pointers'];
  const snippets = topicData ? (topicData[selectedLang] || topicData['C++'] || Object.values(topicData)[0]) : null;

  return (
    <div className={`bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 select-none ${className}`}>
      {/* ------------------------------------------------------------- */}
      {/* CARD HEADER & LANGUAGE SELECTOR                               */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0 shadow-xs">
            <Code2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Language Syntax You May Need
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                {selectedLang}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Topic-aware code reference for <strong className="text-slate-800">{topicName}</strong> in <strong className="text-indigo-600">{selectedLang}</strong>
            </p>
          </div>
        </div>

        {/* Interactive Language Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/70 shrink-0">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.value;
            return (
              <button
                key={lang.value}
                type="button"
                onClick={() => handleLanguageChange(lang.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs scale-[1.02]'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white/80'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SNIPPETS GRID OR FALLBACK                                     */}
      {/* ------------------------------------------------------------- */}
      {snippets && snippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {snippets.map((snip, idx) => {
            const isCopied = copiedSnippet === idx;

            return (
              <div
                key={idx}
                className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-4 space-y-2.5 hover:border-indigo-200 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Title & Note Badge */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {snip.title}
                    </h4>
                    {snip.note && (
                      <span className="text-[10px] font-semibold text-slate-400 truncate max-w-[150px]">
                        {snip.note}
                      </span>
                    )}
                  </div>

                  {/* Code Container with Copy Button */}
                  <div className="relative group/code">
                    <div className="p-3 bg-slate-900 text-emerald-300 font-mono text-xs rounded-xl border border-slate-800 overflow-x-auto shadow-inner">
                      <pre className="whitespace-pre font-mono leading-relaxed">{snip.code}</pre>
                    </div>

                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyCode(snip.code, idx)}
                      title="Copy code snippet"
                      className={`absolute top-2 right-2 p-1.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        isCopied
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                          : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 border-slate-700 opacity-90 group-hover/code:opacity-100'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check size={13} className="text-white" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Fallback Container */
        <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
            <Sparkles size={18} />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Syntax Reference Coming Soon</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {!topicData
              ? `Topic-specific syntax reference for "${topicName}" is coming soon.`
              : `Syntax reference for ${selectedLang} on "${topicName}" is being finalized.`}
          </p>
        </div>
      )}
    </div>
  );
}
