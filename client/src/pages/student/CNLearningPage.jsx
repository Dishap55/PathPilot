import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Network,
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
  Globe,
  Search,
  Check,
  ShieldCheck,
  Cpu,
  Workflow,
  Radio,
  Server,
  Wifi,
  Lock,
  Terminal,
  Activity,
  ChevronRight
} from 'lucide-react';
import {
  CN_TOPIC_REGISTRY,
  CN_TOPICS_LIST,
  CN_TOPIC_GROUPS,
  getCNTopic,
  resolveCNTopicId
} from '../../data/cn/cnTopicDataRegistry.js';
import CNIntroductionSection from '../../components/learning/cn/CNIntroductionSection.jsx';
import CNProblemSolvingSection from '../../components/learning/cn/CNProblemSolvingSection.jsx';
import CNPracticeSection from '../../components/learning/cn/CNPracticeSection.jsx';
import CNSummaryNotesSection from '../../components/learning/cn/CNSummaryNotesSection.jsx';
import CNRevisionExamSection from '../../components/learning/cn/CNRevisionExamSection.jsx';
import { useBestu } from '../../contexts/BestuContext.jsx';
import { useTopicAutoScroll } from '../../hooks/useTopicAutoScroll';

/**
 * EXACTLY 5 CANONICAL CN LEARNING SECTIONS
 * (1. Introduction, 2. Problem Solving, 3. Practice Questions, 4. Summary & Notes, 5. Revision & Exam Prep)
 */
export const CN_SECTIONS = [
  {
    id: 'introduction',
    label: 'Introduction',
    title: 'Introduction',
    number: '1',
    fullName: '1. Introduction',
    icon: BookOpen,
    description: '10-Card Visual Classroom & VFX'
  },
  {
    id: 'problems',
    label: 'Problem Solving',
    title: 'Problem Solving',
    number: '2',
    fullName: '2. Problem Solving',
    icon: Lightbulb,
    description: 'Production Scenarios & Diagnostics'
  },
  {
    id: 'practice',
    label: 'Practice Questions',
    title: 'Practice Questions',
    number: '3',
    fullName: '3. Practice Questions',
    icon: Target,
    description: 'MCQ Bank & Diagram Lab'
  },
  {
    id: 'summary',
    label: 'Summary & Notes',
    title: 'Summary & Notes',
    number: '4',
    fullName: '4. Summary & Notes',
    icon: FileText,
    description: 'Cheat Sheet & Personal Notes'
  },
  {
    id: 'revision',
    label: 'Revision & Exam Prep',
    title: 'Revision & Exam Prep',
    number: '5',
    fullName: '5. Revision & Exam Prep',
    icon: Sparkles,
    description: 'Data Journey & Placement Exam Booster'
  }
];

export const VALID_CN_SECTIONS = ['introduction', 'problems', 'practice', 'summary', 'revision'];

const SECTION_TITLE_MAP = {
  introduction: 'Introduction',
  problems: 'Problem Solving',
  practice: 'Practice Questions',
  summary: 'Summary & Notes',
  revision: 'Revision & Exam Prep'
};

/**
 * CNLearningPage Component
 * Computer Networks Learning Studio matching PathPilot's visual architecture.
 * Features:
 * - Back button: ONLY "← Back to Core Subjects" (/subjects) - Roadmap button strictly removed.
 * - Clean, adaptive topic curriculum (organized across 6 categories, responsive grid, no cramped pills).
 * - Topic Selection Behavior: switches topic, resets to Card 1, smooth auto-scrolls to theory classroom.
 * - 4 Canonical sections: Introduction (10 Cards + VFX), Problem Solving, Practice (MCQs + Diagrams), Summary & Notes.
 * - Shared Bestu AI mentor synchronization.
 */
export default function CNLearningPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTopicParam = searchParams.get('topic');
  const sectionParam = searchParams.get('section');

  const hasExplicitTopic = Boolean(rawTopicParam);

  // Active Topic State
  const [activeTopic, setActiveTopic] = useState(() => {
    if (rawTopicParam) {
      return resolveCNTopicId(rawTopicParam);
    }
    return 'intro-to-networks';
  });

  // Category filter & search query for the curriculum menu
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Section State: 'introduction' | 'problems' | 'practice' | 'summary'
  const [activeSection, setActiveSection] = useState(() => {
    if (sectionParam && VALID_CN_SECTIONS.includes(sectionParam.toLowerCase())) {
      return sectionParam.toLowerCase();
    }
    return 'introduction';
  });

  // Dedicated ref for theory section & direct auto-scroll
  const topicTheoryRef = useRef(null);
  const [pendingTheoryScroll, setPendingTheoryScroll] = useState(false);

  const { contentRef: learningSectionRef, scrollToContent } = useTopicAutoScroll({
    activeTopic,
    hasExplicitTopic,
    contentId: 'cn-learning-section'
  });

  // Sync state when URL query parameters change
  useEffect(() => {
    const t = searchParams.get('topic');
    const s = searchParams.get('section');

    if (t) {
      setActiveTopic(resolveCNTopicId(t));
    } else {
      setActiveTopic('intro-to-networks');
    }

    if (s && VALID_CN_SECTIONS.includes(s.toLowerCase())) {
      setActiveSection(s.toLowerCase());
    } else {
      setActiveSection('introduction');
    }
  }, [searchParams]);

  // Handle section switch (preserves active topic)
  const handleSectionSelect = (secId) => {
    const targetSection = VALID_CN_SECTIONS.includes(secId) ? secId : 'introduction';
    setActiveSection(targetSection);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('topic', activeTopic);
    newParams.set('section', targetSection);
    setSearchParams(newParams);
  };

  // Handle topic switch (switches to introduction, resets to Card 1, and auto-scrolls to theory)
  const handleTopicSelect = (topicId) => {
    const resolvedId = resolveCNTopicId(topicId);
    setActiveTopic(resolvedId);
    setActiveSection('introduction');
    setPendingTheoryScroll(true);

    const newParams = new URLSearchParams(searchParams);
    newParams.set('topic', resolvedId);
    newParams.set('section', 'introduction');
    setSearchParams(newParams);

    scrollToContent();
  };

  // Direct smooth scroll to theory section post-topic selection
  useEffect(() => {
    if (pendingTheoryScroll) {
      setPendingTheoryScroll(false);

      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          const targetEl = topicTheoryRef.current || document.getElementById('cn-learning-section');
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

  const currentTopic = getCNTopic(activeTopic);

  // Synchronize context to Bestu AI Mentor
  const { setPageContext } = useBestu();
  useEffect(() => {
    setPageContext({
      route: `/subjects/cn?topic=${activeTopic}&section=${activeSection}`,
      page: 'Computer Networks Learning Studio',
      subject: 'Computer Networks',
      topic: currentTopic.topicName,
      topicId: activeTopic,
      section: SECTION_TITLE_MAP[activeSection] || 'Introduction',
      sectionId: activeSection,
      availableSections: [
        '1. Introduction',
        '2. Problem Solving',
        '3. Practice Questions',
        '4. Summary & Notes'
      ]
    });
  }, [activeTopic, activeSection, currentTopic.topicName, setPageContext]);

  // Filtered groups based on search & category filter
  const filteredGroups = useMemo(() => {
    return CN_TOPIC_GROUPS.map((group) => {
      if (activeCategoryFilter !== 'all' && group.id !== activeCategoryFilter) {
        return null;
      }

      const matchingTopicIds = group.topicIds.filter((tId) => {
        const top = CN_TOPIC_REGISTRY[tId];
        if (!top) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          top.topicName.toLowerCase().includes(q) ||
          top.shortName.toLowerCase().includes(q) ||
          top.summary.toLowerCase().includes(q) ||
          (top.badge && top.badge.toLowerCase().includes(q))
        );
      });

      if (matchingTopicIds.length === 0) return null;

      return {
        ...group,
        filteredTopicIds: matchingTopicIds
      };
    }).filter(Boolean);
  }, [activeCategoryFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F172A] selection:bg-blue-500/20">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP HEADER & BREADCRUMBS                                   */}
      {/* (STRICT SPEC: ONLY "← Back to Core Subjects" - NO ROADMAP)   */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#D9D1C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/subjects"
              className="px-3 py-1.5 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#E8E1D5] transition-colors flex items-center gap-1.5 text-xs font-bold"
              aria-label="Back to Core Subjects"
            >
              <ArrowLeft size={16} />
              <span>← Back to Core Subjects</span>
            </Link>

            <span className="text-[#D9D1C7]">&bull;</span>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black border border-blue-300">
                <Network size={16} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">
                  Core Subject Studio
                </span>
                <span className="text-xs sm:text-sm font-black text-[#0F172A]">
                  Computer Networks (CN)
                </span>
              </div>
            </div>
          </div>

          {/* Active Topic Quick Display */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E8EFF8] border border-[#CAD9EA] text-xs">
              <span className="font-extrabold text-[#3E5575]">Active:</span>
              <span className="font-bold text-[#0F172A] max-w-[220px] truncate">
                {currentTopic.shortName || currentTopic.topicName}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* ------------------------------------------------------------- */}
        {/* 2. SUBJECT HERO INTRO BANNER                                  */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9D1C7] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                  CN Curriculum
                </span>
                <span className="text-[#D9D1C7]">&bull;</span>
                <span className="text-xs text-[#64748B] font-bold">48 Comprehensive Topics across 6 Layers</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">
                Computer Networks (CN)
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold flex items-center gap-1.5">
                <Sparkles size={14} className="text-blue-600" /> Theory &bull; VFX &bull; Scenarios &bull; Practice
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed max-w-4xl">
            Master computer networking from physical frames to application protocols. Every topic features an exact 10-card visual breakdown, educational animated packet flows, diagnostic problem solving, and placement practice.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" /> 48 Canonical Topics
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" /> 480 Visual Cards (Exact 10/Topic)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" /> Slow/Medium Educational VFX
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" /> Topic-Scoped MCQs & Diagrams
            </span>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 3. CLEAN + ADAPTIVE TOPIC DIRECTORY                           */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D9D1C7] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight flex items-center gap-2">
                <Layers size={22} className="text-blue-600" />
                <span>Curriculum Directory & Topic Selector</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-0.5">
                Select any topic to jump directly into its visual classroom. Reset to Card 1 with automatic smooth scroll.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 48 topics, protocols..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#D9D1C7] rounded-2xl text-xs sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeCategoryFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-[#475569] border border-[#D9D1C7] hover:bg-[#E8E1D5]'
              }`}
            >
              All 48 Topics
            </button>
            {CN_TOPIC_GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveCategoryFilter(g.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  activeCategoryFilter === g.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-[#475569] border border-[#D9D1C7] hover:bg-[#E8E1D5]'
                }`}
              >
                <span>{g.shortTitle}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                  {g.topicIds.length}
                </span>
              </button>
            ))}
          </div>

          {/* Adaptive Topic Groups & Cards Grid */}
          <div className="space-y-6">
            {filteredGroups.map((group) => {
              const IconComp = group.icon || Network;
              return (
                <div key={group.id} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: group.accentColor || '#3B82F6' }}
                      >
                        <IconComp size={14} />
                      </div>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight">
                        {group.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-400">
                        ({group.filteredTopicIds.length} topics)
                      </span>
                    </div>
                  </div>

                  {/* Adaptive Responsive Grid: 1 col on mobile, 2-3 on tablet/desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.filteredTopicIds.map((tId) => {
                      const t = CN_TOPIC_REGISTRY[tId];
                      if (!t) return null;
                      const isSelected = t.topicId === activeTopic;

                      return (
                        <button
                          key={t.topicId}
                          type="button"
                          onClick={() => handleTopicSelect(t.topicId)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                            isSelected
                              ? 'bg-blue-50/90 border-blue-500 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20'
                              : 'bg-white border-[#D9D1C7] hover:border-blue-400 hover:shadow-xs hover:bg-slate-50/70'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                #{t.order}
                              </span>
                              {t.badge && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {t.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-1">
                              {t.topicName}
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                              {t.summary}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] font-bold">
                            <span className={isSelected ? 'text-blue-700' : 'text-slate-400'}>
                              10 Cards &bull; Practice &bull; Scenarios
                            </span>
                            {isSelected ? (
                              <span className="flex items-center gap-1 text-blue-600 font-black">
                                <Check size={12} /> Active
                              </span>
                            ) : (
                              <span className="text-slate-400 hover:text-blue-600 flex items-center gap-0.5">
                                Study <ChevronRight size={12} />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filteredGroups.length === 0 && (
              <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-[#D9D1C7]">
                No topics found matching your search.
              </div>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 4. LEARNING STUDIO SECTION & TAB NAVIGATION                   */}
        {/* ------------------------------------------------------------- */}
        <section
          id="cn-learning-section"
          ref={(el) => {
            learningSectionRef.current = el;
            topicTheoryRef.current = el;
          }}
          className="space-y-6 scroll-mt-20 sm:scroll-mt-24"
        >
          {/* Section Navigation Header & Tabs */}
          <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-3xl p-3.5 sm:p-4 shadow-xs space-y-3">
            {/* Top Row: Current Topic Indicator & Active Section Counter (Cleanly Separated) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 border-b border-[#D9D1C7]/60 pb-2.5">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 shrink-0">
                  Current Topic:
                </span>
                <span className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-extrabold text-xs sm:text-sm shadow-2xs w-fit max-w-full break-words whitespace-normal [overflow-wrap:anywhere]">
                  {currentTopic.topicName}
                </span>
              </div>

              <span className="text-xs font-black text-blue-600 shrink-0">
                Section {CN_SECTIONS.findIndex((s) => s.id === activeSection) + 1} of {CN_SECTIONS.length} &bull; {SECTION_TITLE_MAP[activeSection]}
              </span>
            </div>

            {/* Bottom Row: 5 Section Buttons (Full Width, Zero Horizontal Collisions) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0" role="tablist">
              {CN_SECTIONS.map((sec) => {
                const isCurrentSec = sec.id === activeSection;
                const SecIcon = sec.icon;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrentSec}
                    onClick={() => handleSectionSelect(sec.id)}
                    className={`px-3.5 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                      isCurrentSec
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'bg-white text-slate-700 border border-[#D9D1C7] hover:bg-slate-50'
                    }`}
                  >
                    <SecIcon size={16} />
                    <span>{sec.fullName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE SECTION CONTENT */}
          <div className="transition-opacity duration-200">
            {activeSection === 'introduction' && (
              <CNIntroductionSection
                topic={currentTopic}
                onGoToProblems={() => handleSectionSelect('problems')}
                onGoToPractice={() => handleSectionSelect('practice')}
              />
            )}

            {activeSection === 'problems' && (
              <CNProblemSolvingSection
                topic={currentTopic}
                onGoToPractice={() => handleSectionSelect('practice')}
              />
            )}

            {activeSection === 'practice' && (
              <CNPracticeSection
                topic={currentTopic}
                onGoToSummary={() => handleSectionSelect('summary')}
              />
            )}

            {activeSection === 'summary' && (
              <CNSummaryNotesSection
                topic={currentTopic}
                onNavigateTopic={(nextT) => handleTopicSelect(nextT.topicId)}
                onGoToRevision={() => handleSectionSelect('revision')}
              />
            )}

            {activeSection === 'revision' && (
              <CNRevisionExamSection
                topic={currentTopic}
                onNavigateToPractice={() => handleSectionSelect('practice')}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
