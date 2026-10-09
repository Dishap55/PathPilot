import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Boxes,
  ArrowLeft,
  Sparkles,
  Layers,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Target,
  FileText,
  Clock,
  Zap,
  Award,
  BookOpen,
  Code2,
  X,
  Check,
  ChevronRight
} from 'lucide-react';
import {
  OOPS_TOPIC_REGISTRY,
  OOPS_TOPICS_LIST,
  OOPS_TOPIC_GROUPS,
  getOOPSTopic,
  resolveOOPSTopicId
} from '../../data/oops/oopsTopicDataRegistry.js';
import OOPSIntroductionSection from '../../components/learning/oops/OOPSIntroductionSection.jsx';
import OOPSProblemExamplesSection from '../../components/learning/oops/OOPSProblemExamplesSection.jsx';
import OOPSPracticeSection from '../../components/learning/oops/OOPSPracticeSection.jsx';
import OOPSCommonPatternsSection from '../../components/learning/oops/OOPSCommonPatternsSection.jsx';
import OOPSSummaryNotesSection from '../../components/learning/oops/OOPSSummaryNotesSection.jsx';
import { useBestu } from '../../contexts/BestuContext.jsx';
import { useTopicAutoScroll } from '../../hooks/useTopicAutoScroll';
import { useProfile } from '../../hooks/useProfile';


/**
 * 5 Canonical OOPS Learning Sections
 */
export const OOPS_SECTIONS = [
  {
    id: 'introduction',
    label: 'Introduction',
    title: 'Introduction',
    number: '1',
    fullName: '1. Introduction',
    icon: BookOpen,
    description: '10-Card Concept Classroom'
  },
  {
    id: 'examples',
    label: 'Problem Examples',
    title: 'Problem Examples',
    number: '2',
    fullName: '2. Problem Examples',
    icon: Lightbulb,
    description: 'Solved Benchmark Questions'
  },
  {
    id: 'practice',
    label: 'Practice Questions',
    title: 'Practice Questions',
    number: '3',
    fullName: '3. Practice Questions',
    icon: Target,
    description: 'MCQ & Code Practice Lab'
  },
  {
    id: 'patterns',
    label: 'Common Patterns',
    title: 'Common Patterns',
    number: '4',
    fullName: '4. Common Patterns',
    icon: Layers,
    description: 'Design Patterns & Pitfalls'
  },
  {
    id: 'summary',
    label: 'Summary & Notes',
    title: 'Summary & Notes',
    number: '5',
    fullName: '5. Summary & Notes',
    icon: FileText,
    description: 'Official Cheat Sheet & My Notes'
  }
];

export const VALID_SECTIONS = ['introduction', 'examples', 'practice', 'patterns', 'summary'];

const SECTION_TITLE_MAP = {
  introduction: 'Introduction',
  examples: 'Problem Examples',
  practice: 'Practice Questions',
  patterns: 'Common Patterns',
  summary: 'Summary & Notes'
};

/**
 * OOPSLearningPage Component
 * Canonical, modern, high-contrast, beginner-friendly OOPS Learning Studio.
 */
export default function OOPSLearningPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTopicParam = searchParams.get('topic');
  const sectionParam = searchParams.get('section');

  // Check whether an explicit topic parameter was supplied in the URL
  const hasExplicitTopic = Boolean(rawTopicParam);

  // Active Topic State
  const [activeTopic, setActiveTopic] = useState(() => {
    if (rawTopicParam) {
      return resolveOOPSTopicId(rawTopicParam);
    }
    return 'intro-to-oops';
  });

  // Control visibility of the duplicate 20-topic selection grid.
  // Case 1: If user opened OOPS without a topic -> default topic & allows topic selector.
  // Case 2/3/4/5: If topic is already selected / in URL -> hide duplicate topic-selection grid.
  const [showTopicGrid, setShowTopicGrid] = useState(false);

  // Category filter for the in-page OOPS curriculum menu (defaults to 'all' so all 20 topics are visible immediately)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // Active Section State: 'introduction' | 'examples' | 'practice' | 'patterns' | 'summary'
  const [activeSection, setActiveSection] = useState(() => {
    if (sectionParam && VALID_SECTIONS.includes(sectionParam.toLowerCase())) {
      return sectionParam.toLowerCase();
    }
    return 'introduction';
  });

  const { profile } = useProfile();

  // Code Language State (Java, Python, C++)
  const [selectedLanguage, setSelectedLanguage] = useState('Java');

  useEffect(() => {
    const profileLang = profile?.preferred_language;
    if (profileLang && ['Java', 'Python', 'C++'].includes(profileLang) && profileLang !== selectedLanguage) {
      setSelectedLanguage(profileLang);
    } else if (profileLang && profileLang.toLowerCase() === 'cpp') {
      setSelectedLanguage('C++');
    }
  }, [profile?.preferred_language]);

  // Dedicated ref for theory section & direct auto-scroll flag
  const topicTheoryRef = useRef(null);
  const [pendingTheoryScroll, setPendingTheoryScroll] = useState(false);

  const { contentRef: learningSectionRef, scrollToContent } = useTopicAutoScroll({
    activeTopic,
    hasExplicitTopic,
    contentId: 'oops-learning-section'
  });

  // Sync state when URL query parameters change (Browser Back / Forward / Refresh)
  useEffect(() => {
    const t = searchParams.get('topic');
    const s = searchParams.get('section');

    if (t) {
      setActiveTopic(resolveOOPSTopicId(t));
      // When a topic is active in the URL, keep duplicate topic grid hidden
      setShowTopicGrid(false);
    } else {
      setActiveTopic('intro-to-oops');
    }

    if (s && VALID_SECTIONS.includes(s.toLowerCase())) {
      setActiveSection(s.toLowerCase());
    } else {
      setActiveSection('introduction');
    }
  }, [searchParams]);

  // Handle section switch (preserves active topic and URL params)
  const handleSectionSelect = (secId) => {
    const targetSection = VALID_SECTIONS.includes(secId) ? secId : 'introduction';
    setActiveSection(targetSection);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('topic', activeTopic);
    newParams.set('section', targetSection);
    setSearchParams(newParams);
  };

  // Handle topic switch (switches to introduction, hides duplicate grid, and auto-scrolls to theory)
  const handleTopicSelect = (topicId) => {
    const resolvedId = resolveOOPSTopicId(topicId);
    setActiveTopic(resolvedId);
    setShowTopicGrid(false);
    setActiveSection('introduction');
    setPendingTheoryScroll(true);

    const newParams = new URLSearchParams(searchParams);
    newParams.set('topic', resolvedId);
    newParams.set('section', 'introduction');
    setSearchParams(newParams);

    scrollToContent();
  };

  // Direct scroll effect to theory section post-topic selection
  useEffect(() => {
    if (pendingTheoryScroll) {
      setPendingTheoryScroll(false);

      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          const targetEl = topicTheoryRef.current || document.getElementById('oops-section-introduction');
          if (targetEl && typeof targetEl.scrollIntoView === 'function') {
            targetEl.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      }, 60);

      return () => clearTimeout(timer);
    }
  }, [activeTopic, pendingTheoryScroll]);

  // Close topic selector on Escape key
  useEffect(() => {
    if (!showTopicGrid) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowTopicGrid(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTopicGrid]);

  const currentTopic = getOOPSTopic(activeTopic);

  // Synchronize context to Bestu AI Mentor
  const { setPageContext } = useBestu();
  useEffect(() => {
    setPageContext({
      route: `/subjects/oops?topic=${activeTopic}&section=${activeSection}`,
      page: 'OOPS Learning Studio',
      subject: 'OOPS',
      topic: currentTopic.topicName,
      topicId: activeTopic,
      section: SECTION_TITLE_MAP[activeSection] || 'Introduction',
      sectionId: activeSection,
      selectedLanguage,
      availableSections: [
        '1. Introduction',
        '2. Problem Examples',
        '3. Practice Questions',
        '4. Common Patterns',
        '5. Summary & Notes'
      ]
    });
  }, [activeTopic, activeSection, currentTopic.topicName, selectedLanguage, setPageContext]);

  return (
    <div className="w-full min-h-screen bg-[#F4EFE8] -m-4 sm:-m-6 lg:-m-8 p-3 sm:p-5 lg:p-6 space-y-4 select-none">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* ------------------------------------------------------------- */}
        {/* 1. TOP BREADCRUMB: DIRECT NAVIGATION TO CORE SUBJECTS         */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-[#475569]">
          <div className="flex items-center gap-2.5">
            <Link
              to="/subjects"
              id="back-to-subjects-link"
              className="flex items-center gap-1.5 font-bold text-[#6574C4] hover:text-[#0F172A] transition-colors"
            >
              <ArrowLeft size={14} /> Back to Core Subjects
            </Link>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <span>Track: <strong className="text-[#0F172A] font-bold">Object-Oriented Programming (OOPS)</strong></span>
            <span className="px-2 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] font-bold">
              Core Technical
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. COMPACT OOPS HEADER (NO giant hero illustration)           */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#D9D1C7] pb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6574C4]">
                  OOPS LEARNING STUDIO
                </span>
                <span className="text-[#D9D1C7]">&bull;</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                  Beginner to Placement Ready
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                Object-Oriented Programming Studio
              </h1>
            </div>
          </div>

          <p className="text-xs text-[#334155] font-medium leading-relaxed max-w-3xl">
            Master the core principles of Object-Oriented Programming. Explore 10 concept cards, solved examples, MCQ and code practice, common design patterns, and official placement notes.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. IN-PAGE OOPS TOPIC CURRICULUM MENU (ALL 20 TOPICS)         */}
        {/* ------------------------------------------------------------- */}
        <div id="oops-topic-menu" className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D1C7] pb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6574C4]">
                  OOPS CURRICULUM
                </span>
                <span className="text-[#D9D1C7]">&bull;</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]">
                  20 Canonical Topics
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight flex items-center gap-2">
                <Layers size={17} className="text-[#6574C4]" /> OOPS Branched Learning Menu
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#64748B] font-semibold">Active Topic:</span>
              <span className="font-black text-[#6574C4] bg-[#EDE9F6] px-2.5 py-1 rounded-xl border border-[#D5CBEA]">
                {currentTopic.topicName}
              </span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0" role="tablist" aria-label="OOPS Categories">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategoryFilter === 'all'}
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6574C4] ${
                activeCategoryFilter === 'all'
                  ? 'bg-[#6574C4] text-white shadow-2xs'
                  : 'bg-[#FFFDF9] text-[#475569] border border-[#D9D1C7] hover:bg-[#EDE9F6]'
              }`}
            >
              All Topics (20)
            </button>
            {OOPS_TOPIC_GROUPS.map((group) => {
              const isCatActive = activeCategoryFilter === group.category;
              return (
                <button
                  key={group.category}
                  type="button"
                  role="tab"
                  aria-selected={isCatActive}
                  onClick={() => setActiveCategoryFilter(group.category)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6574C4] ${
                    isCatActive
                      ? 'bg-[#6574C4] text-white shadow-2xs'
                      : 'bg-[#FFFDF9] text-[#475569] border border-[#D9D1C7] hover:bg-[#EDE9F6]'
                  }`}
                >
                  {group.category} ({group.topicIds.length})
                </button>
              );
            })}
          </div>

          {/* Topic Cards Grid Grouped by Category */}
          <div className="space-y-4">
            {OOPS_TOPIC_GROUPS.filter(
              (group) => activeCategoryFilter === 'all' || activeCategoryFilter === group.category
            ).map((group) => (
              <div key={group.category} className="space-y-2">
                <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#475569]">
                    {group.category}
                  </h3>
                  <span className="text-[10px] font-bold text-[#64748B]">
                    {group.topicIds.length} topics
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {group.topicIds.map((tId) => {
                    const top = OOPS_TOPIC_REGISTRY[tId];
                    if (!top) return null;
                    const isSelected = activeTopic === top.topicId;
                    const globalIndex = OOPS_TOPICS_LIST.findIndex((t) => t.topicId === top.topicId) + 1;

                    return (
                      <button
                        key={top.topicId}
                        type="button"
                        id={`oops-topic-card-${top.topicId}`}
                        onClick={() => handleTopicSelect(top.topicId)}
                        className={`text-left p-3 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6574C4] ${
                          isSelected
                            ? 'bg-[#FFFDF9] border-2 border-[#6574C4] ring-2 ring-[#6574C4]/20 shadow-xs'
                            : 'bg-[#FFFDF9] border-[#D9D1C7] hover:border-[#6574C4] hover:bg-[#F5EFE6]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-6 h-6 shrink-0 rounded-lg text-[11px] font-black flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#6574C4] text-white shadow-2xs'
                                : 'bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]'
                            }`}
                          >
                            {globalIndex}
                          </span>
                          <div className="min-w-0">
                            <h4 className="text-xs font-black text-[#0F172A] truncate">
                              {top.topicName}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#64748B]">
                              <span className="font-bold">{top.level}</span>
                              {top.questionCount && (
                                <>
                                  <span>&bull;</span>
                                  <span>{top.questionCount}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {isSelected ? (
                          <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EDE9F6] text-[#6574C4] border border-[#D5CBEA] text-[10px] font-extrabold">
                            <Check size={12} className="stroke-[3]" /> Active
                          </span>
                        ) : (
                          <ChevronRight size={14} className="text-[#94A3B8] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. OOPS TOPIC SELECTOR MODAL (FALLBACK / QUICK-SWITCH DIALOG) */}
        {/* Rendered when user clicks [Change Topic]                      */}
        {/* ------------------------------------------------------------- */}
        {showTopicGrid && (
          <div
            id="oops-topic-selector"
            role="dialog"
            aria-modal="true"
            aria-labelledby="oops-topic-selector-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowTopicGrid(false);
            }}
          >
            <div className="bg-[#FAF7F2] border border-[#D9D1C7] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[88vh] flex flex-col overflow-hidden animate-scaleIn">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#D9D1C7] bg-[#F4EFE8]">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6574C4]">
                      OOPS TOPICS CURRICULUM
                    </span>
                    <span className="text-[#D9D1C7]">&bull;</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]">
                      20 Canonical Topics
                    </span>
                  </div>
                  <h2 id="oops-topic-selector-title" className="text-lg sm:text-xl font-black text-[#0F172A] tracking-tight">
                    Select an OOPS Topic
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTopicGrid(false)}
                  className="p-2 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#E8E1D5] transition-colors cursor-pointer"
                  aria-label="Close topic selector"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body: Grouped Topics */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
                {OOPS_TOPIC_GROUPS.map((group) => (
                  <div key={group.category} className="space-y-2.5">
                    <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-1.5">
                      <h3 className="text-xs font-black uppercase tracking-wider text-[#475569]">
                        {group.category}
                      </h3>
                      <span className="text-[10px] font-semibold text-[#64748B]">
                        {group.topicIds.length} topics
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {group.topicIds.map((tId) => {
                        const top = OOPS_TOPIC_REGISTRY[tId];
                        if (!top) return null;
                        const isSelected = activeTopic === top.topicId;
                        const globalIndex = OOPS_TOPICS_LIST.findIndex((t) => t.topicId === top.topicId) + 1;

                        return (
                          <button
                            key={top.topicId}
                            type="button"
                            id={`oops-topic-card-${top.topicId}`}
                            onClick={() => handleTopicSelect(top.topicId)}
                            className={`text-left p-3 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6574C4] ${
                              isSelected
                                ? 'bg-[#FFFDF9] border-2 border-[#6574C4] ring-2 ring-[#6574C4]/20 shadow-xs'
                                : 'bg-[#FFFDF9] border-[#D9D1C7] hover:border-[#6574C4] hover:bg-[#F5EFE6]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`w-6 h-6 shrink-0 rounded-lg text-[11px] font-black flex items-center justify-center ${
                                  isSelected
                                    ? 'bg-[#6574C4] text-white shadow-2xs'
                                    : 'bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]'
                                }`}
                              >
                                {globalIndex}
                              </span>
                              <div className="min-w-0">
                                <h4 className="text-xs font-black text-[#0F172A] truncate">
                                  {top.topicName}
                                </h4>
                                <span className="text-[10px] font-bold text-[#64748B]">
                                  {top.level}
                                </span>
                              </div>
                            </div>

                            {isSelected ? (
                              <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EDE9F6] text-[#6574C4] border border-[#D5CBEA] text-[10px] font-extrabold">
                                <Check size={12} className="stroke-[3]" /> Active
                              </span>
                            ) : (
                              <ChevronRight size={14} className="text-[#94A3B8] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-3 border-t border-[#D9D1C7] bg-[#F4EFE8] text-xs text-[#475569]">
                <span>
                  Current Active: <strong className="text-[#6574C4] font-black">{currentTopic.topicName}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowTopicGrid(false)}
                  className="px-4 py-1.5 rounded-xl border border-[#D9D1C7] bg-white text-xs font-bold text-[#334155] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 4. 5-SECTION LEARNING AREA                                    */}
        {/* ------------------------------------------------------------- */}
        <div id="oops-learning-section" ref={learningSectionRef} className="space-y-3 scroll-mt-20 sm:scroll-mt-24">
          {/* Section Navigation Header */}
          <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-2.5 sm:p-3 shadow-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#475569]">
                  Active Topic:
                </span>
                <span className="font-black text-[#0F172A] text-xs">
                  {currentTopic.topicName}
                </span>
                <button
                  type="button"
                  id="oops-change-topic-btn"
                  onClick={() => setShowTopicGrid((prev) => !prev)}
                  className="text-[11px] font-bold text-[#6574C4] hover:text-[#4338CA] px-2 py-0.5 rounded-lg border border-[#D9D1C7] bg-[#FFFDF9] hover:bg-[#EDE9F6] transition-all cursor-pointer flex items-center gap-1 shadow-2xs ml-1"
                >
                  <Boxes size={12} className="text-[#6574C4]" />
                  <span>{showTopicGrid ? 'Hide Topics' : 'Change Topic'}</span>
                </button>
              </div>

              <span className="text-[11px] font-bold text-[#6574C4]">
                Section {OOPS_SECTIONS.findIndex((s) => s.id === activeSection) + 1} of 5 &bull; {SECTION_TITLE_MAP[activeSection]}
              </span>
            </div>

            {/* 5-Section Buttons Tablist */}
            <div
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0"
              role="tablist"
              aria-label="OOPS 5 Learning Sections"
            >
              {OOPS_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                const Icon = sec.icon;

                return (
                  <button
                    key={sec.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    id={`oops-tab-${sec.id}`}
                    aria-controls={`oops-panel-${sec.id}`}
                    onClick={() => handleSectionSelect(sec.id)}
                    className={`flex-1 min-w-[145px] sm:min-w-0 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6574C4] ${
                      isActive
                        ? 'bg-[#6574C4] text-white shadow-xs'
                        : 'bg-[#FFFDF9] text-[#334155] hover:bg-[#EDE9F6] hover:text-[#0F172A] border border-[#D9D1C7]'
                    }`}
                  >
                    <Icon size={15} className={isActive ? 'text-white' : 'text-[#6574C4]'} />
                    <span className="truncate">{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Section Panels */}
          <div
            id={`oops-panel-${activeSection}`}
            role="tabpanel"
            aria-labelledby={`oops-tab-${activeSection}`}
          >
            {/* SECTION 1: INTRODUCTION (10-CARD CONCEPT CLASSROOM) */}
            {activeSection === 'introduction' && (
              <div ref={topicTheoryRef} className="scroll-mt-20 sm:scroll-mt-24">
                <OOPSIntroductionSection
                  key={activeTopic}
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  topic={currentTopic}
                  onGoToExamples={() => handleSectionSelect('examples')}
                  onGoToPractice={() => handleSectionSelect('practice')}
                />
              </div>
            )}

            {/* SECTION 2: PROBLEM EXAMPLES (SOLVED BENCHMARK QUESTIONS) */}
            {activeSection === 'examples' && (
              <OOPSProblemExamplesSection
                selectedLanguage={selectedLanguage}
                topic={currentTopic}
                onGoToPractice={() => handleSectionSelect('practice')}
                onGoToSummary={() => handleSectionSelect('summary')}
              />
            )}

            {/* SECTION 3: PRACTICE QUESTIONS (MCQ & CODE PRACTICE LAB) */}
            {activeSection === 'practice' && (
              <OOPSPracticeSection
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                topic={currentTopic}
                onGoToSummary={() => handleSectionSelect('summary')}
              />
            )}

            {/* SECTION 4: COMMON PATTERNS (DESIGN PATTERNS & PITFALLS) */}
            {activeSection === 'patterns' && (
              <OOPSCommonPatternsSection
                selectedLanguage={selectedLanguage}
                topic={currentTopic}
                onGoToPractice={() => handleSectionSelect('practice')}
                onGoToSummary={() => handleSectionSelect('summary')}
              />
            )}

            {/* SECTION 5: SUMMARY & NOTES (OFFICIAL CHEAT SHEET & MY NOTES) */}
            {activeSection === 'summary' && (
              <OOPSSummaryNotesSection
                topic={currentTopic}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
