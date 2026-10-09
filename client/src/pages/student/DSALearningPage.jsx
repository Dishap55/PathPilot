import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  ArrowLeft,
  Sparkles,
  Layers,
  Code2,
  FileText,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass
} from 'lucide-react';
import DSATopicIntroduction from '../../components/learning/DSATopicIntroduction';
import DSAPracticeWorkflow from '../../components/learning/DSAPracticeWorkflow';
import ExampleBlock from '../../components/learning/ExampleBlock';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { DSA_TOPIC_REGISTRY } from '../../data/dsaTopicDataRegistry';
import { useBestu } from '../../contexts/BestuContext';
import SummaryAndNotes from '../../components/notes/SummaryAndNotes';
import { useTopicAutoScroll } from '../../hooks/useTopicAutoScroll';


/**
 * DSALearningPage Component
 * 
 * Dedicated Master DSA Learning Studio supporting:
 * - 8 Complete Master DSA Topics:
 *   1. Two Pointers (Master Benchmark)
 *   2. Arrays & Strings
 *   3. Sorting Algorithms
 *   4. Binary Search
 *   5. Linked List
 *   6. Trees & BST
 *   7. Graphs & BFS/DFS
 *   8. Dynamic Programming
 * - 5-Section Navigation Architecture for every topic:
 *   1. Introduction (1 / 5) — 10-Card Depth Carousel
 *   2. Problem Examples (2 / 5) — Option 3 Modern Split-Card Design
 *   3. Practice Questions (3 / 5) — LeetCode Studio Workspace
 *   4. Common Patterns (4 / 5) — Pattern Matrix
 *   5. Summary & Notes (5 / 5) — Premium Card Layout
 */

export default function DSALearningPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const topicParam = searchParams.get('topic');

  // 8 DSA Topics List for Branched Learning Menu
  const dsaTopics = [
    { id: 'two-pointers', name: 'Two Pointers', status: 'active', level: 'Core Pattern', count: '35 Problems' },
    { id: 'arrays', name: 'Arrays & Strings', status: 'active', level: 'Fundamental', count: '35 Problems' },
    { id: 'sorting', name: 'Sorting Algorithms', status: 'active', level: 'Fundamental', count: '35 Problems' },
    { id: 'binary-search', name: 'Binary Search', status: 'active', level: 'Core Pattern', count: '35 Problems' },
    { id: 'linked-list', name: 'Linked List', status: 'active', level: 'Intermediate', count: '35 Problems' },
    { id: 'trees', name: 'Trees & BST', status: 'active', level: 'Intermediate', count: '35 Problems' },
    { id: 'graphs', name: 'Graphs & BFS/DFS', status: 'active', level: 'Advanced', count: '35 Problems' },
    { id: 'dp', name: 'Dynamic Programming', status: 'active', level: 'Advanced', count: '35 Problems' }
  ];

  // Active Topic Selection (Defaults to URL topic parameter or 'two-pointers')
  const [activeTopic, setActiveTopic] = useState(() => {
    if (topicParam && dsaTopics.some((t) => t.id === topicParam)) {
      return topicParam;
    }
    return 'two-pointers';
  });

  useEffect(() => {
    if (topicParam && dsaTopics.some((t) => t.id === topicParam)) {
      setActiveTopic(topicParam);
    }
  }, [topicParam]);

  // 5-Section Navigation Tab State
  // Options: 'introduction' | 'examples' | 'practice' | 'patterns' | 'summary'
  const [activeSection, setActiveSection] = useState('introduction');

  // Code toggle visibility state per example index
  const [expandedCodeIndices, setExpandedCodeIndices] = useState({});

  const toggleExampleCode = (idx) => {
    setExpandedCodeIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Current active topic configuration
  const currentTopicConfig = DSA_TOPIC_REGISTRY[activeTopic] || DSA_TOPIC_REGISTRY['two-pointers'];

  // EXACT 5 Navigation Sections for Master Flow
  const sections = [
    { id: 'introduction', label: '1. Introduction', num: 1, icon: BookOpen },
    { id: 'examples', label: '2. Problem Examples', num: 2, icon: Lightbulb },
    { id: 'practice', label: '3. Practice Questions', num: 3, icon: Code2 },
    { id: 'patterns', label: '4. Common Patterns', num: 4, icon: Layers },
    { id: 'summary', label: '5. Summary & Notes', num: 5, icon: FileText }
  ];

  // Helper to get section index (1 to 5)
  const currentSectionNum = sections.findIndex((s) => s.id === activeSection) + 1;

  // Next and Previous navigation handlers
  const handlePrevSection = () => {
    const idx = sections.findIndex((s) => s.id === activeSection);
    if (idx > 0) {
      setActiveSection(sections[idx - 1].id);
    }
  };

  const handleNextSection = () => {
    const idx = sections.findIndex((s) => s.id === activeSection);
    if (idx < sections.length - 1) {
      setActiveSection(sections[idx + 1].id);
    }
  };

  const { contentRef: learningSectionRef, scrollToContent } = useTopicAutoScroll({
    activeTopic,
    hasExplicitTopic: Boolean(topicParam),
    contentId: 'dsa-learning-section'
  });

  const handleTopicSelect = (topicId) => {
    setActiveTopic(topicId);
    setSearchParams({ topic: topicId });
    setActiveSection('introduction');
    setExpandedCodeIndices({});
    scrollToContent();
  };

  const { setPageContext } = useBestu();
  useEffect(() => {
    const secObj = sections.find((s) => s.id === activeSection);
    setPageContext({
      route: `/subjects/dsa?topic=${activeTopic}`,
      page: 'DSA Learning Studio',
      subject: 'DSA',
      category: 'Data Structures & Algorithms',
      topic: currentTopicConfig.name,
      topicId: activeTopic,
      section: secObj?.label || activeSection,
      sectionId: activeSection,
      availableSections: sections.map((s) => s.label)
    });
  }, [activeTopic, activeSection, currentTopicConfig.name, setPageContext]);

  return (
    <div className="w-full space-y-6 py-2 select-none max-w-6xl mx-auto">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP BREADCRUMB & BACK TO SUBJECTS NAV                      */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          to="/subjects"
          className="flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Core Subjects
        </Link>
        <div className="flex items-center gap-2">
          <span>Subject: <strong className="text-slate-800 font-bold">Data Structures &amp; Algorithms (DSA)</strong></span>
          <Badge variant="primary">Active Track</Badge>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DSA HERO HEADER & LEARNING STUDIO                         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                DSA Track
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                Placement Mastery Path
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Data Structures &amp; Algorithms Learning Studio
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/roadmap">
              <Button variant="secondary" size="sm" className="flex items-center gap-1.5">
                <Compass size={14} /> View Roadmap Map
              </Button>
            </Link>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-3xl">
          Master core Data Structures &amp; Algorithms patterns with interactive 10-card depth carousels, canonical problem walkthroughs, and practice challenges.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. BRANCHED LEARNING MENU (8 TOPICS SELECTION BAR)            */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={14} className="text-indigo-600" /> DSA Branched Learning Menu
          </h3>
          <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Selected: {currentTopicConfig.name}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2.5">
          {dsaTopics.map((topic) => {
            const isSelected = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic.id)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm scale-[1.02]'
                    : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {topic.level}
                    </span>
                    {isSelected && <CheckCircle2 size={13} className="text-white" />}
                  </div>
                  <h4 className="text-xs font-bold leading-snug">{topic.name}</h4>
                </div>
                <span className={`text-[10px] font-semibold mt-2 block ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {topic.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. MASTER 5-SECTION TAB NAVIGATION FOR ACTIVE TOPIC           */}
      {/* ------------------------------------------------------------- */}
      <div id="dsa-learning-section" ref={learningSectionRef} className="space-y-6 scroll-mt-20 sm:scroll-mt-24">
        {/* 5-Section Header Tabs with Progress Indicator */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none flex-1">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isSelected = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon size={15} />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Explicit Progress Indicator: e.g. 1 / 5 */}
          <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-black text-indigo-700 shrink-0 text-center">
            Progress: {currentSectionNum} / 5
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* SECTION 1: INTRODUCTION                                     */}
        {/* ----------------------------------------------------------- */}
        {activeSection === 'introduction' && (
          <div className="space-y-8 animate-fadeIn">
            <DSATopicIntroduction
              data={currentTopicConfig.introData}
              introData={currentTopicConfig.introData}
              key={activeTopic}
            />
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* SECTION 2: PROBLEM EXAMPLES (OPTION 3: MODERN SPLIT-CARD)   */}
        {/* ----------------------------------------------------------- */}
        {activeSection === 'examples' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold uppercase tracking-wider">
                    Pattern Walkthroughs
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Visual Dry Runs</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  {currentTopicConfig.name} Problem Examples
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Step-by-step examples to understand how the pattern is used.
                </p>
              </div>
              <Badge variant="primary">{currentTopicConfig.examples.length} Walkthroughs</Badge>
            </div>

            {/* Example Cards */}
            {currentTopicConfig.examples.map((ex, idx) => (
              <div
                key={ex.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 space-y-6 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-w-0">
                  {/* LEFT SIDE: Problem Info */}
                  <div className="lg:col-span-7 space-y-4 flex flex-col justify-between min-w-0">
                    <div className="space-y-3 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                          {ex.difficulty}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-semibold">{ex.badgeText}</span>
                      </div>

                      <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                        {ex.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {ex.description}
                      </p>

                      {/* Input / Output Box */}
                      <div className="p-3.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl font-mono text-xs space-y-1">
                        <pre className="whitespace-pre-wrap font-mono text-slate-700 dark:text-slate-300">{ex.inputOutput}</pre>
                      </div>

                      {/* Core Observation Box */}
                      <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/80 rounded-2xl text-xs text-indigo-950 dark:text-indigo-200 space-y-1">
                        <span className="font-extrabold block text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                          <Lightbulb size={14} className="text-indigo-600" /> Key Pattern Observation:
                        </span>
                        <p className="leading-relaxed">{ex.observation}</p>
                      </div>
                    </div>

                    {/* Toggle Code Action */}
                    <div>
                      <button
                        onClick={() => toggleExampleCode(idx)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Code2 size={14} />
                        <span>{expandedCodeIndices[idx] ? 'Hide Code Implementation' : 'View Code Implementation'}</span>
                      </button>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Visual Dry Run Representation */}
                  <div className="lg:col-span-5 bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 flex flex-col justify-between min-w-0">
                    <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2 gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 truncate">
                        Visual Dry Run Simulation
                      </span>
                      <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                        {ex.targetBadge}
                      </span>
                    </div>

                    {/* Array Visualization */}
                    <div className="space-y-3 py-1">
                      <div className="w-full overflow-x-auto scrollbar-none py-2 px-1 flex justify-center items-center gap-2 sm:gap-3 font-mono text-xs">
                        {ex.arrayElements.map((el, elIdx) => (
                          <div
                            key={elIdx}
                            className={`p-2.5 sm:p-3 bg-white dark:bg-slate-900 border-2 rounded-xl text-center shadow-xs font-bold min-w-[40px] sm:min-w-[48px] relative shrink-0 ${
                              el.isLeft
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : el.isRight
                                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                                : 'border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {el.val}
                            {el.label && (
                              <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-extrabold ${el.isLeft ? 'text-indigo-600' : 'text-rose-600'}`}>
                                {el.label}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="h-4"></div>
                    </div>

                    {/* Step-by-step Simulation */}
                    <div className="space-y-2 font-mono text-[11px] min-w-0">
                      {ex.steps.map((step, stIdx) => (
                        <div
                          key={stIdx}
                          className={`p-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-1 ${
                            step.isMatch
                              ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold'
                              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>{step.text}</span>
                          <span className={`text-[10px] ${step.isMatch ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400 font-bold'}`}>
                            {step.action}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expandable Code Area */}
                {expandedCodeIndices[idx] && (
                  <div className="pt-2 animate-slide-up">
                    <ExampleBlock language={ex.codeLanguage} example={ex.codeSnippet} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* SECTION 3: PRACTICE QUESTIONS                               */}
        {/* ----------------------------------------------------------- */}
        {activeSection === 'practice' && (
          <div className="space-y-6 animate-fadeIn">
            <DSAPracticeWorkflow
              questionBank={currentTopicConfig.questionBank}
              topicId={activeTopic}
            />
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* SECTION 4: COMMON PATTERNS                                  */}
        {/* ----------------------------------------------------------- */}
        {activeSection === 'patterns' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {currentTopicConfig.name} Common Patterns Matrix
                </h3>
                <p className="text-xs text-slate-500">Fast reference matrix for interview pattern recognition</p>
              </div>
              <Badge variant="primary">{currentTopicConfig.patterns.length} Core Patterns</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTopicConfig.patterns.map((pat) => (
                <div key={pat.id} className={`p-4 border rounded-2xl space-y-2 ${pat.bg}`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider">{pat.title}</h4>
                  <p className="text-xs leading-relaxed">{pat.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* SECTION 5: SUMMARY & NOTES (OFFICIAL NOTES + MY NOTES)      */}
        {/* ----------------------------------------------------------- */}
        {activeSection === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            <SummaryAndNotes
              subject="DSA"
              topicId={activeTopic}
              topicName={currentTopicConfig.name}
              renderCustomOfficialContent={
                <div className="space-y-4">
                  {/* CARD 1 — KEY TAKEAWAY */}
                  <div className="bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-white dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                        <Sparkles size={18} />
                      </div>
                      <span className="text-xs font-extrabold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                        KEY TAKEAWAY
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">
                      {currentTopicConfig.summary.takeawayTitle}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-3xl">
                      {currentTopicConfig.summary.takeawayText}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold">
                      <div className="p-3 bg-white/80 dark:bg-slate-950/60 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
                        <span>Interview Ready</span>
                      </div>
                      <div className="p-3 bg-white/80 dark:bg-slate-950/60 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
                        <span>35 Curated Problems</span>
                      </div>
                      <div className="p-3 bg-white/80 dark:bg-slate-950/60 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
                        <span>Zero Solution Leaks</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2 — HOW IT WORKS */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-6">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                        <Layers size={18} />
                      </div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                        How It Works — 3-Step Pattern Flow
                      </h4>
                    </div>

                    {/* 3-Step Visual Cards Flow */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {currentTopicConfig.summary.steps.map((st) => (
                        <div key={st.num} className="p-5 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 rounded-2xl space-y-3 relative">
                          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                            {st.num}
                          </div>
                          <h5 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                            {st.title}
                          </h5>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            {st.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CARD 3 — CRITICAL EDGE CASES */}
                  <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
                        <Lightbulb size={18} />
                      </div>
                      <h4 className="text-lg font-black text-amber-950 dark:text-amber-200 tracking-tight">
                        Critical Edge Cases to Guard Against
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                      {currentTopicConfig.summary.edgeCases.map((ec, ecIdx) => (
                        <div key={ecIdx} className="p-4 bg-white dark:bg-slate-950 border border-amber-200 dark:border-amber-900/60 rounded-2xl space-y-1.5">
                          <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> {ec.title}
                          </span>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            {ec.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* FOOTER SECTION NAVIGATION CONTROLS (5-SECTION SEQUENCE)     */}
        {/* ----------------------------------------------------------- */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrevSection}
            disabled={activeSection === 'introduction'}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeSection === 'introduction'
                ? 'bg-slate-100 text-slate-400 border border-slate-200/60 cursor-not-allowed opacity-60'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 cursor-pointer'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Previous Section</span>
          </button>

          {/* Progress Badge */}
          <div className="text-xs font-bold text-slate-500">
            Section <span className="text-indigo-600 font-extrabold">{currentSectionNum}</span> of <span className="text-slate-800 font-extrabold">5</span>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextSection}
            className="px-4.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {activeSection === 'introduction' && (
              <>
                <span>Problem Examples</span>
                <ArrowRight size={16} />
              </>
            )}
            {activeSection === 'examples' && (
              <>
                <span>Practice Questions</span>
                <ArrowRight size={16} />
              </>
            )}
            {activeSection === 'practice' && (
              <>
                <span>Common Patterns</span>
                <ArrowRight size={16} />
              </>
            )}
            {activeSection === 'patterns' && (
              <>
                <span>Summary &amp; Notes</span>
                <ArrowRight size={16} />
              </>
            )}
            {activeSection === 'summary' && (
              <>
                <span>Module Complete 🎉</span>
                <CheckCircle2 size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
