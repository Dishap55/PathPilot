import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Calculator,
  Brain,
  BookOpen,
  ArrowLeft,
  Compass,
  Sparkles,
  Layers,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Target,
  FileText,
  Clock,
  Zap,
  Award
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  APTITUDE_CATEGORIES,
  APTITUDE_TOPIC_REGISTRY,
  getTopicsByCategory,
  getAptitudeTopic
} from '../../data/aptitudeTopicDataRegistry';
import AptitudeIntroductionSection from '../../components/learning/aptitude/AptitudeIntroductionSection';
import { useTopicAutoScroll } from '../../hooks/useTopicAutoScroll';

import AptitudeProblemExamplesSection from '../../components/learning/aptitude/AptitudeProblemExamplesSection';
import AptitudePracticeSection from '../../components/learning/AptitudePracticeSection';
import AptitudeCommonPatternsSection from '../../components/learning/aptitude/AptitudeCommonPatternsSection';
import AptitudeSummaryNotesSection from '../../components/learning/aptitude/AptitudeSummaryNotesSection';
import { useBestu } from '../../contexts/BestuContext';

/**
 * 5 Canonical Aptitude Learning Sections definition
 */
export const APTITUDE_SECTIONS = [
  {
    id: 'introduction',
    label: 'Introduction',
    title: 'Introduction',
    number: '1',
    fullName: '1. Introduction',
    icon: BookOpen,
    description: '10-Card Concept Carousel'
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
    description: 'MCQ Placement Practice & Notes'
  },
  {
    id: 'patterns',
    label: 'Common Patterns',
    title: 'Common Patterns',
    number: '4',
    fullName: '4. Common Patterns',
    icon: Layers,
    description: 'Question Types & Shortcuts'
  },
  {
    id: 'summary',
    label: 'Summary & Notes',
    title: 'Summary & Notes',
    number: '5',
    fullName: '5. Summary & Notes',
    icon: FileText,
    description: 'Official Formulas & My Notes'
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
 * AptitudeLearningPage Component
 * Compact, comfortable, beginner-friendly Aptitude Learning Studio.
 */
export default function AptitudeLearningPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const topicParam = searchParams.get('topic');
  const sectionParam = searchParams.get('section');

  // Derive initial topic and category
  const initialTopicConfig = useMemo(() => {
    if (topicParam && APTITUDE_TOPIC_REGISTRY[topicParam]) {
      return APTITUDE_TOPIC_REGISTRY[topicParam];
    }
    return APTITUDE_TOPIC_REGISTRY['percentages'];
  }, [topicParam]);

  // Active Category State
  const [activeCategory, setActiveCategory] = useState(initialTopicConfig.categoryKey);

  // Active Topic State
  const [activeTopic, setActiveTopic] = useState(initialTopicConfig.topicId);

  // Active Section State: 'introduction' | 'examples' | 'practice' | 'patterns' | 'summary'
  const [activeSection, setActiveSection] = useState(() => {
    if (sectionParam && VALID_SECTIONS.includes(sectionParam.toLowerCase())) {
      return sectionParam.toLowerCase();
    }
    return 'introduction';
  });

  const { contentRef: learningSectionRef, scrollToContent } = useTopicAutoScroll({
    activeTopic,
    hasExplicitTopic: Boolean(topicParam),
    contentId: 'aptitude-learning-section'
  });

  // Synchronize state when URL parameters update (Deep Linking & Browser Back/Forward)
  useEffect(() => {
    const t = searchParams.get('topic');
    const s = searchParams.get('section');

    if (t && APTITUDE_TOPIC_REGISTRY[t]) {
      const config = APTITUDE_TOPIC_REGISTRY[t];
      setActiveTopic(config.topicId);
      setActiveCategory(config.categoryKey);
    } else if (!t) {
      setActiveTopic('percentages');
      setActiveCategory('quantitative');
    }

    if (s && VALID_SECTIONS.includes(s.toLowerCase())) {
      setActiveSection(s.toLowerCase());
    } else {
      setActiveSection('introduction');
    }
  }, [searchParams]);

  // Handle section selection
  const handleSectionSelect = (sec) => {
    const targetSection = VALID_SECTIONS.includes(sec) ? sec : 'introduction';
    setActiveSection(targetSection);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('topic', activeTopic);
    newParams.set('section', targetSection);
    setSearchParams(newParams);
  };

  // Handle category switch (preserves active section)
  const handleCategorySelect = (catKey) => {
    setActiveCategory(catKey);
    const categoryTopics = getTopicsByCategory(catKey);
    if (categoryTopics.length > 0) {
      const firstTopic = categoryTopics[0];
      setActiveTopic(firstTopic.topicId);
      const newParams = new URLSearchParams(searchParams);
      newParams.set('topic', firstTopic.topicId);
      newParams.set('section', activeSection);
      setSearchParams(newParams);
      scrollToContent();
    }
  };

  // Handle intentional topic selection (preserves active section & triggers smooth auto-scroll)
  const handleTopicSelect = (topicId) => {
    setActiveTopic(topicId);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('topic', topicId);
    newParams.set('section', activeSection);
    setSearchParams(newParams);
    scrollToContent();
  };

  // Current active topic metadata
  const currentTopic = getAptitudeTopic(activeTopic);

  // Compute official notes extracted from topic educational data
  const officialNotes = useMemo(() => {
    const cards = currentTopic?.introData?.cards || [];
    const card3 = cards.find((c) => c.cardNumber === 3);
    const card6 = cards.find((c) => c.cardNumber === 6);
    const card8 = cards.find((c) => c.cardNumber === 8);
    const card10 = cards.find((c) => c.cardNumber === 10);

    const formulas =
      card10?.cheatSheet?.formulas ||
      card3?.formulaBoxes?.map((f) => `${f.name}: ${f.formula}`) ||
      card3?.formulas ||
      [];
    const shortcuts =
      card6?.quickTricks ||
      (card6?.mainTrick ? [{ rule: card6.mainTrick.name, ex: card6.mainTrick.example }] : []);
    const mistakes = card8?.mistakes || [];
    const edgeCases =
      card10?.cheatSheet?.quickRules?.map((r) => ({ title: 'Key Rule', text: r })) ||
      currentTopic?.introData?.fullForms?.map((ff) => ({ title: ff.abbr, text: `${ff.full}: ${ff.desc}` })) ||
      [];

    return {
      takeawayTitle: `${currentTopic.topicName} — Key Placement Notes`,
      takeawayText:
        currentTopic.description ||
        currentTopic.introData?.subtitle ||
        'Master core rules, unit conversions, and shortcut methods.',
      formulas,
      shortcuts,
      commonMistakes: mistakes,
      edgeCases
    };
  }, [currentTopic]);

  // Category Icon Resolver
  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'quantitative':
        return Calculator;
      case 'logical':
        return Brain;
      case 'verbal':
        return BookOpen;
      default:
        return Target;
    }
  };

  const currentCategoryObj = APTITUDE_CATEGORIES.find((c) => c.id === activeCategory) || APTITUDE_CATEGORIES[0];
  const CategoryIcon = getCategoryIcon(activeCategory);

  // Current topics belonging to active category
  const categoryTopics = getTopicsByCategory(activeCategory);

  // Synchronize context to Bestu AI Mentor with current section
  const { setPageContext } = useBestu();
  useEffect(() => {
    setPageContext({
      route: `/aptitude?topic=${activeTopic}&section=${activeSection}`,
      page: 'Aptitude Learning Studio',
      subject: 'Aptitude',
      category: currentCategoryObj.name,
      topic: currentTopic.topicName,
      topicId: activeTopic,
      section: SECTION_TITLE_MAP[activeSection] || 'Introduction',
      sectionId: activeSection,
      availableSections: [
        '1. Introduction',
        '2. Problem Examples',
        '3. Practice Questions',
        '4. Common Patterns',
        '5. Summary & Notes'
      ]
    });
  }, [activeTopic, activeCategory, activeSection, currentTopic.topicName, currentCategoryObj.name, setPageContext]);

  return (
    <div className="w-full min-h-screen bg-[#F4EFE8] -m-4 sm:-m-6 lg:-m-8 p-3 sm:p-5 lg:p-6 space-y-4 select-none">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* ------------------------------------------------------------- */}
        {/* 1. TOP BREADCRUMB & BACK TO ROADMAP NAVIGATION               */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-[#475569]">
          <div className="flex items-center gap-2.5">
            <Link
              to="/roadmap"
              id="back-to-roadmap-link"
              className="flex items-center gap-1.5 font-bold text-[#6574C4] hover:text-[#0F172A] transition-colors"
            >
              <ArrowLeft size={14} /> Back to Roadmap
            </Link>
            <span className="text-[#CBD5E1]">/</span>
            <Link
              to="/subjects"
              className="font-bold text-[#475569] hover:text-[#0F172A] transition-colors"
            >
              Core Subjects
            </Link>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <span>Track: <strong className="text-[#0F172A] font-bold">Quantitative &amp; Logical Aptitude</strong></span>
            <span className="px-2 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] font-bold">
              Placement Prep
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. APTITUDE HEADER (Compact, No oversized illustration)       */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#D9D1C7] pb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6574C4]">
                  APTITUDE LEARNING STUDIO
                </span>
                <span className="text-[#D9D1C7]">&bull;</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                  Beginner to Placement Ready
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                Aptitude Learning Studio
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/roadmap">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFFDF9] border border-[#D9D1C7] text-[#0F172A] hover:bg-[#EDE9F6] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <Compass size={13} className="text-[#6574C4]" />
                  <span>Roadmap</span>
                </button>
              </Link>
            </div>
          </div>

          <p className="text-xs text-[#334155] font-medium leading-relaxed max-w-3xl">
            Choose a category and topic below. Learn key concepts, study solved examples, practice questions, and review formulas.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. CATEGORY TABS SELECTOR (QUANTITATIVE | LOGICAL | VERBAL)  */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-2 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Aptitude Categories">
            {APTITUDE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const Icon = getCategoryIcon(cat.id);

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  id={`cat-tab-${cat.id}`}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6574C4] ${
                    isActive
                      ? 'bg-[#6574C4] text-white shadow-xs'
                      : 'bg-[#FFFDF9] text-[#334155] hover:bg-[#EDE9F6] hover:text-[#0F172A] border border-[#D9D1C7]'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white' : 'text-[#475569]'} />
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#E8EFF8] text-[#3E5575]'
                    }`}
                  >
                    {cat.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. ACTIVE CATEGORY SUB-HEADER (Compact)                      */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#6574C4] flex items-center justify-center shrink-0 font-bold">
              <CategoryIcon size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-[#0F172A]">
                  {currentCategoryObj.name}
                </h2>
                <span className="text-[11px] font-bold text-[#64748B]">•</span>
                <span className="text-[11px] font-bold text-[#475569]">
                  {categoryTopics.length} Topics
                </span>
              </div>
              <p className="text-[11px] text-[#475569] line-clamp-1">
                {currentCategoryObj.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#334155]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFFDF9] border border-[#D9D1C7] shadow-2xs">
              <Zap size={11} className="text-amber-600" /> Easy Explanations
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFFDF9] border border-[#D9D1C7] shadow-2xs">
              <Award size={11} className="text-[#6574C4]" /> Placement Standard
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 5. TOPIC CARDS GRID (Compact & High Contrast)                */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
              Select a Topic ({categoryTopics.length} in {currentCategoryObj.shortName})
            </h3>
            <span className="text-xs text-[#475569]">
              Selected: <strong className="text-[#6574C4] font-black">{currentTopic.topicName}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {categoryTopics.map((topic) => {
              const isSelected = activeTopic === topic.topicId;

              return (
                <div
                  key={topic.topicId}
                  id={`topic-card-${topic.topicId}`}
                  onClick={() => handleTopicSelect(topic.topicId)}
                  className={`group relative rounded-xl p-3.5 border transition-all duration-150 cursor-pointer shadow-xs hover:shadow-sm hover:-translate-y-0.5 flex flex-col justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-[#FFFDF9] border-2 border-[#6574C4] ring-2 ring-[#6574C4]/15 shadow-sm'
                      : 'bg-[#FFFDF9] border-[#D9D1C7] hover:border-[#6574C4]'
                  }`}
                >
                  <div>
                    {/* Top Bar: Level Badge & Selection Pill */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          topic.level === 'Fundamental'
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            : topic.level === 'Core Pattern'
                            ? 'bg-indigo-50 text-indigo-900 border-indigo-200'
                            : 'bg-purple-50 text-purple-900 border-purple-200'
                        }`}
                      >
                        {topic.level === 'Fundamental' ? 'Easy / Base' : topic.level === 'Core Pattern' ? 'Standard' : 'Advanced'}
                      </span>

                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3E5575] bg-[#E8EFF8] px-2 py-0.5 rounded-full border border-[#CAD9EA]">
                          <CheckCircle2 size={11} /> Selected
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-[#6574C4] group-hover:underline">
                          Study &rarr;
                        </span>
                      )}
                    </div>

                    {/* Topic Title */}
                    <h4 className="text-sm font-black text-[#0F172A] tracking-tight group-hover:text-[#6574C4] transition-colors">
                      {topic.topicName}
                    </h4>

                    {/* Topic Description */}
                    <p className="text-[11px] text-[#334155] mt-0.5 line-clamp-2 leading-relaxed font-medium">
                      {topic.description}
                    </p>
                  </div>

                  {/* Card Footer: Problem Count + Category Tag */}
                  <div className="pt-2 border-t border-[#E2D9CC] flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#475569]">
                      {topic.questionCount}
                    </span>
                    <span className="text-[#64748B] font-medium">
                      {topic.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 6. TOPIC 5-SECTION NAVIGATION & CONTENT AREA                 */}
        {/* ------------------------------------------------------------- */}
        <div
          id="aptitude-learning-section"
          ref={learningSectionRef}
          className="scroll-mt-20 sm:scroll-mt-24 space-y-4 pt-2"
        >
          {/* Section Navigation Tabs Header */}
          <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-2.5 shadow-xs space-y-2">
            <div className="flex items-center justify-between px-2 pt-0.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase tracking-wider text-[#475569] text-[11px]">
                  Learning Journey:
                </span>
                <span className="font-black text-[#0F172A] text-xs">
                  {currentTopic.topicName}
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#6574C4]">
                Section {APTITUDE_SECTIONS.findIndex(s => s.id === activeSection) + 1} of 5 &bull; {SECTION_TITLE_MAP[activeSection]}
              </span>
            </div>

            {/* 5-Section Buttons Tablist */}
            <div
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0"
              role="tablist"
              aria-label="Aptitude 5 Learning Sections"
            >
              {APTITUDE_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                const Icon = sec.icon;

                return (
                  <button
                    key={sec.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    id={`aptitude-tab-${sec.id}`}
                    aria-controls={`aptitude-panel-${sec.id}`}
                    tabIndex={0}
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

          {/* Active Section Content Panels */}
          <div
            id={`aptitude-panel-${activeSection}`}
            role="tabpanel"
            aria-labelledby={`aptitude-tab-${activeSection}`}
          >
            {/* SECTION 1: INTRODUCTION (10-CARD DEPTH CAROUSEL) */}
            {activeSection === 'introduction' && (
              <AptitudeIntroductionSection topic={currentTopic} />
            )}

            {/* SECTION 2: PROBLEM EXAMPLES (SOLVED BENCHMARK QUESTIONS) */}
            {activeSection === 'examples' && (
              <AptitudeProblemExamplesSection
                topic={currentTopic}
                onGoToPractice={() => handleSectionSelect('practice')}
                onGoToSummary={() => handleSectionSelect('summary')}
              />
            )}

            {/* SECTION 3: PRACTICE QUESTIONS (MCQ PRACTICE & NOTES) */}
            {activeSection === 'practice' && (
              <AptitudePracticeSection
                topic={currentTopic}
                onGoToSummary={() => handleSectionSelect('summary')}
              />
            )}

            {/* SECTION 4: COMMON PATTERNS (RECOGNIZE PATTERNS & SHORTCUTS) */}
            {activeSection === 'patterns' && (
              <AptitudeCommonPatternsSection
                topic={currentTopic}
                onGoToPractice={() => handleSectionSelect('practice')}
                onGoToSummary={() => handleSectionSelect('summary')}
              />
            )}

            {/* SECTION 5: SUMMARY & NOTES (OFFICIAL NOTES + PERSONAL MY NOTES) */}
            {activeSection === 'summary' && (
              <AptitudeSummaryNotesSection
                topic={currentTopic}
                officialNotes={officialNotes}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
