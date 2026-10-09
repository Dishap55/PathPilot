import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Database,
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
  ChevronRight,
  Server,
  Network,
  Key,
  GitMerge,
  BarChart2,
  Minimize2,
  ShieldCheck,
  Lock,
  Search,
  Cpu
} from 'lucide-react';
import {
  DBMS_TOPIC_REGISTRY,
  DBMS_TOPICS_LIST,
  DBMS_TOPIC_GROUPS,
  getDBMSTopic,
  resolveDBMSTopicId
} from '../../data/dbms/dbmsTopicDataRegistry.js';
import DBMSIntroductionSection from '../../components/learning/dbms/DBMSIntroductionSection.jsx';
import DBMSProblemSolvingSection from '../../components/learning/dbms/DBMSProblemSolvingSection.jsx';
import DBMSPracticeSection from '../../components/learning/dbms/DBMSPracticeSection.jsx';
import DBMSSummaryNotesSection from '../../components/learning/dbms/DBMSSummaryNotesSection.jsx';
import { useBestu } from '../../contexts/BestuContext.jsx';
import { useTopicAutoScroll } from '../../hooks/useTopicAutoScroll';

/**
 * EXACTLY 4 CANONICAL DBMS LEARNING SECTIONS
 * (Roadmap option is explicitly REMOVED/HIDDEN from DBMS navigation as required)
 */
export const DBMS_SECTIONS = [
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
    id: 'problems',
    label: 'Problem Solving',
    title: 'Problem Solving',
    number: '2',
    fullName: '2. Problem Solving',
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
    description: 'SQL Query & MCQ Practice Lab'
  },
  {
    id: 'summary',
    label: 'Summary & Notes',
    title: 'Summary & Notes',
    number: '4',
    fullName: '4. Summary & Notes',
    icon: FileText,
    description: 'Official Cheat Sheet & My Notes'
  }
];

export const VALID_DBMS_SECTIONS = ['introduction', 'problems', 'practice', 'summary'];

const SECTION_TITLE_MAP = {
  introduction: 'Introduction',
  problems: 'Problem Solving',
  practice: 'Practice Questions',
  summary: 'Summary & Notes'
};

const TOPIC_ICON_MAP = {
  'dbms-architecture': Server,
  'er-model': Network,
  'relational-model-keys': Key,
  'sql-basics-ddl-dml': Database,
  'sql-joins': GitMerge,
  'sql-aggregation-groupby': BarChart2,
  'sql-subqueries-nested': Layers,
  'normalization': Minimize2,
  'transactions-acid': ShieldCheck,
  'concurrency-locking': Lock,
  'indexing-btrees': Search,
  'views-stored-procedures': Cpu
};

/**
 * DBMSLearningPage Component
 * Canonical DBMS Learning Studio matching the PathPilot visual architecture.
 */
export default function DBMSLearningPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTopicParam = searchParams.get('topic');
  const sectionParam = searchParams.get('section');

  const hasExplicitTopic = Boolean(rawTopicParam);

  // Active Topic State
  const [activeTopic, setActiveTopic] = useState(() => {
    if (rawTopicParam) {
      return resolveDBMSTopicId(rawTopicParam);
    }
    return 'dbms-architecture';
  });

  // Category filter for the in-page DBMS curriculum menu
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Section State: 'introduction' | 'problems' | 'practice' | 'summary'
  const [activeSection, setActiveSection] = useState(() => {
    if (sectionParam && VALID_DBMS_SECTIONS.includes(sectionParam.toLowerCase())) {
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
    contentId: 'dbms-learning-section'
  });

  // Sync state when URL query parameters change
  useEffect(() => {
    const t = searchParams.get('topic');
    const s = searchParams.get('section');

    if (t) {
      setActiveTopic(resolveDBMSTopicId(t));
    } else {
      setActiveTopic('dbms-architecture');
    }

    if (s && VALID_DBMS_SECTIONS.includes(s.toLowerCase())) {
      setActiveSection(s.toLowerCase());
    } else {
      setActiveSection('introduction');
    }
  }, [searchParams]);

  // Handle section switch (preserves active topic)
  const handleSectionSelect = (secId) => {
    const targetSection = VALID_DBMS_SECTIONS.includes(secId) ? secId : 'introduction';
    setActiveSection(targetSection);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('topic', activeTopic);
    newParams.set('section', targetSection);
    setSearchParams(newParams);
  };

  // Handle topic switch (switches to introduction, resets to Card 1, and auto-scrolls to theory)
  const handleTopicSelect = (topicId) => {
    const resolvedId = resolveDBMSTopicId(topicId);
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
          const targetEl = topicTheoryRef.current || document.getElementById('dbms-section-introduction');
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

  const currentTopic = getDBMSTopic(activeTopic);

  // Synchronize context to Bestu AI Mentor
  const { setPageContext } = useBestu();
  useEffect(() => {
    setPageContext({
      route: `/subjects/dbms?topic=${activeTopic}&section=${activeSection}`,
      page: 'DBMS Learning Studio',
      subject: 'DBMS',
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
    return DBMS_TOPIC_GROUPS.map((group) => {
      if (activeCategoryFilter !== 'all' && group.groupId !== activeCategoryFilter) {
        return null;
      }

      const matchingTopicIds = group.topicIds.filter((tId) => {
        const top = DBMS_TOPIC_REGISTRY[tId];
        if (!top) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          top.topicName.toLowerCase().includes(q) ||
          top.shortName.toLowerCase().includes(q) ||
          top.description.toLowerCase().includes(q) ||
          (top.tags && top.tags.some(tag => tag.toLowerCase().includes(q)))
        );
      });

      if (matchingTopicIds.length === 0) return null;

      return {
        ...group,
        topicIds: matchingTopicIds
      };
    }).filter(Boolean);
  }, [activeCategoryFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F172A] selection:bg-[#10B981]/20">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP HEADER & BREADCRUMBS                                   */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#D9D1C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/subjects"
              className="p-2 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#E8E1D5] transition-colors flex items-center gap-1 text-xs font-bold"
              aria-label="Back to Subjects"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Subjects</span>
            </Link>

            <span className="text-[#D9D1C7]">&bull;</span>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black border border-emerald-300">
                <Database size={16} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                  Core Subject Studio
                </span>
                <span className="text-xs sm:text-sm font-black text-[#0F172A]">
                  Database Management Systems
                </span>
              </div>
            </div>
          </div>

          {/* Active Topic Quick Display */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E8EFF8] border border-[#CAD9EA] text-xs">
              <span className="font-extrabold text-[#3E5575]">Active:</span>
              <span className="font-bold text-[#0F172A] max-w-[200px] truncate">{currentTopic.shortName || currentTopic.topicName}</span>
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
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                  DBMS Curriculum
                </span>
                <span className="text-[#D9D1C7]">&bull;</span>
                <span className="text-xs text-[#64748B] font-bold">12 Comprehensive Modules</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">
                Database Management Systems (DBMS)
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-600" /> Theory &bull; Problems &bull; Queries &bull; MCQs
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed max-w-4xl">
            Master relational schemas, SQL query execution, transaction ACID semantics, concurrency control, B+ Tree indexing, and normal forms. Select any topic below to jump directly to its 10-card learning experience.
          </p>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 3. IN-PAGE DBMS TOPICS LIST (ALL TOPICS CLEARLY EXPOSED)      */}
        {/* Priority: Readability + Accessibility + All Topics Visible    */}
        {/* ------------------------------------------------------------- */}
        <section
          id="dbms-curriculum-menu"
          className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9D1C7] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Database size={16} className="text-emerald-600" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                  Curriculum Navigator
                </span>
                <span className="text-[#D9D1C7]">&bull;</span>
                <span className="text-xs font-bold text-[#64748B]">All Topics Available</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-[#0F172A]">
                Select a DBMS Topic to Learn
              </h2>
            </div>

            {/* Quick search input */}
            <div className="w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full px-3.5 py-1.5 rounded-xl border border-[#D9D1C7] bg-white text-xs text-[#0F172A] focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                activeCategoryFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-[#F4EFE8] text-[#475569] hover:bg-[#E8E1D5]'
              }`}
            >
              All 12 Topics
            </button>
            {DBMS_TOPIC_GROUPS.map((grp) => (
              <button
                key={grp.groupId}
                type="button"
                onClick={() => setActiveCategoryFilter(grp.groupId)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                  activeCategoryFilter === grp.groupId
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-[#F4EFE8] text-[#475569] hover:bg-[#E8E1D5]'
                }`}
              >
                {grp.title}
              </button>
            ))}
          </div>

          {/* Topic Cards Responsive Grid */}
          <div className="space-y-6">
            {filteredGroups.map((group) => (
              <div key={group.groupId} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#64748B]">
                    {group.title}
                  </h3>
                  <span className="text-[10px] text-[#94A3B8] font-semibold">&bull; {group.topicIds.length} topics</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.topicIds.map((tId) => {
                    const top = DBMS_TOPIC_REGISTRY[tId];
                    if (!top) return null;
                    const isSelected = activeTopic === top.topicId;
                    const globalIndex = DBMS_TOPICS_LIST.findIndex((t) => t.topicId === top.topicId) + 1;
                    const IconComp = TOPIC_ICON_MAP[top.topicId] || Database;

                    return (
                      <button
                        key={top.topicId}
                        type="button"
                        id={`dbms-topic-card-${top.topicId}`}
                        onClick={() => handleTopicSelect(top.topicId)}
                        className={`text-left p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                          isSelected
                            ? 'bg-[#FFFDF9] border-2 border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                            : 'bg-[#FFFDF9] border-[#D9D1C7] hover:border-emerald-600 hover:bg-[#F5EFE6]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-7 h-7 shrink-0 rounded-xl text-xs font-black flex items-center justify-center ${
                              isSelected
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
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
                              <span>&bull;</span>
                              <span>{top.questionCount}</span>
                            </div>
                          </div>
                        </div>

                        {isSelected ? (
                          <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold">
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
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 4. DBMS 4-SECTION NAVIGATION BAR (NO ROADMAP IN DBMS)          */}
        {/* ------------------------------------------------------------- */}
        <nav
          aria-label="DBMS Section Navigation"
          className="sticky top-16 z-30 bg-[#FAF7F2]/95 backdrop-blur-md py-2 border-b border-[#D9D1C7]"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DBMS_SECTIONS.map((sec) => {
              const isCurrent = activeSection === sec.id;
              const Icon = sec.icon;

              return (
                <button
                  key={sec.id}
                  type="button"
                  id={`dbms-nav-${sec.id}`}
                  onClick={() => handleSectionSelect(sec.id)}
                  className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-[#475569] border-[#D9D1C7] hover:bg-[#F5EFE6]'
                  }`}
                >
                  <Icon size={16} className={isCurrent ? 'text-white' : 'text-emerald-700'} />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold block opacity-80 uppercase tracking-wider">
                      {sec.fullName}
                    </span>
                    <span className="text-xs font-black truncate block">
                      {sec.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ------------------------------------------------------------- */}
        {/* 5. ACTIVE LEARNING SECTION VIEW CONTAINER                     */}
        {/* Direct Auto-Scroll Target                                     */}
        {/* ------------------------------------------------------------- */}
        <div ref={learningSectionRef} id="dbms-learning-section" className="scroll-mt-20 sm:scroll-mt-24">
          {/* SECTION 1: INTRODUCTION (10-Card Depth Classroom) */}
          {activeSection === 'introduction' && (
            <div ref={topicTheoryRef}>
              <DBMSIntroductionSection
                key={activeTopic}
                topic={currentTopic}
                onGoToProblems={() => handleSectionSelect('problems')}
                onGoToPractice={() => handleSectionSelect('practice')}
              />
            </div>
          )}

          {/* SECTION 2: PROBLEM SOLVING (Solved Benchmarks) */}
          {activeSection === 'problems' && (
            <DBMSProblemSolvingSection
              key={activeTopic}
              topic={currentTopic}
              onGoToPractice={() => handleSectionSelect('practice')}
            />
          )}

          {/* SECTION 3: PRACTICE QUESTIONS (SQL Practice & MCQ Lab) */}
          {activeSection === 'practice' && (
            <DBMSPracticeSection
              key={activeTopic}
              topic={currentTopic}
              onGoToSummary={() => handleSectionSelect('summary')}
            />
          )}

          {/* SECTION 4: SUMMARY & NOTES (Cheat Sheet & My Notes) */}
          {activeSection === 'summary' && (
            <DBMSSummaryNotesSection
              key={activeTopic}
              topic={currentTopic}
              onNavigateTopic={handleTopicSelect}
            />
          )}
        </div>
      </main>
    </div>
  );
}
