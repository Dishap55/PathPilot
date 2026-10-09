import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Calculator,
  Boxes,
  Database,
  Cpu,
  Network,
  ArrowRight
} from 'lucide-react';
import { roadmapService } from '../../services/roadmapService';
import Skeleton from '../../components/common/Skeleton';
import { resolveOOPSTopicId } from '../../data/oops/oopsTopicDataRegistry.js';

/**
 * 6 Canonical Practice Subjects Data
 * Clean, data-driven structure with subtle pastel styling and dynamic topics
 */
const PRACTICE_SUBJECTS = [
  {
    id: 'dsa',
    code: 'DSA',
    name: 'DSA',
    description: 'Strengthen your problem-solving skills',
    icon: Code2,
    topics: [
      'Arrays',
      'Two Pointers',
      'Sorting',
      'Binary Search',
      'Linked List',
      'Trees',
      'Graphs',
      'Dynamic Programming'
    ],
    // Light green pastel styling
    bgClass: 'bg-[#F4FBF7] hover:bg-[#EEF8F2]',
    borderClass: 'border-[#D4EFE1]',
    hoverBorderClass: 'hover:border-[#A6E3C4]',
    hoverShadowClass: 'hover:shadow-[0_12px_28px_-6px_rgba(16,185,129,0.16)]',
    iconContainerClass: 'bg-emerald-50/90 border border-emerald-200/60',
    iconColorClass: 'text-emerald-700',
    topicBadgeClass: 'bg-emerald-100/70 text-emerald-800 border border-emerald-200/70',
    topicDotClass: 'bg-emerald-500',
    arrowContainerClass: 'bg-white/80 border border-emerald-200/70 text-emerald-700 group-hover:bg-emerald-50 group-hover:border-emerald-300',
    arrowColorClass: 'text-emerald-700'
  },
  {
    id: 'aptitude',
    code: 'APT',
    name: 'Aptitude',
    description: 'Master quantitative & logical reasoning',
    icon: Calculator,
    topics: [
      'Number System',
      'Percentages',
      'Profit & Loss',
      'Time & Work',
      'Ratio & Proportion',
      'Probability'
    ],
    // Light pink pastel styling
    bgClass: 'bg-[#FDF4F8] hover:bg-[#FAF0F5]',
    borderClass: 'border-[#F8D5E5]',
    hoverBorderClass: 'hover:border-[#F2AECB]',
    hoverShadowClass: 'hover:shadow-[0_12px_28px_-6px_rgba(236,72,153,0.16)]',
    iconContainerClass: 'bg-pink-50/90 border border-pink-200/60',
    iconColorClass: 'text-pink-700',
    topicBadgeClass: 'bg-pink-100/70 text-pink-800 border border-pink-200/70',
    topicDotClass: 'bg-pink-500',
    arrowContainerClass: 'bg-white/80 border border-pink-200/70 text-pink-700 group-hover:bg-pink-50 group-hover:border-pink-300',
    arrowColorClass: 'text-pink-700'
  },
  {
    id: 'oops',
    code: 'OOPS',
    name: 'OOPS',
    description: 'Grasp core object-oriented principles',
    icon: Boxes,
    topics: [
      'What is OOPS?',
      'Classes & Objects',
      'Encapsulation',
      'Abstraction',
      'Inheritance',
      'Polymorphism',
      'Constructors',
      'Method Overloading',
      'Method Overriding',
      'Interfaces',
      'Abstract Classes',
      'Access Modifiers',
      'Static Members',
      'this / self Keyword',
      'super Keyword',
      'Association',
      'Aggregation',
      'Composition',
      'Exception Handling',
      'Interview Revision'
    ],
    // Light warm yellow/orange pastel styling
    bgClass: 'bg-[#FDF9F2] hover:bg-[#FAF5EC]',
    borderClass: 'border-[#F8E9CF]',
    hoverBorderClass: 'hover:border-[#F5D59E]',
    hoverShadowClass: 'hover:shadow-[0_12px_28px_-6px_rgba(245,158,11,0.16)]',
    iconContainerClass: 'bg-amber-50/90 border border-amber-200/60',
    iconColorClass: 'text-amber-800',
    topicBadgeClass: 'bg-amber-100/70 text-amber-800 border border-amber-200/70',
    topicDotClass: 'bg-amber-500',
    arrowContainerClass: 'bg-white/80 border border-amber-200/70 text-amber-800 group-hover:bg-amber-50 group-hover:border-amber-300',
    arrowColorClass: 'text-amber-800'
  },
  {
    id: 'dbms',
    code: 'DBMS',
    name: 'DBMS',
    description: 'Explore relational databases & queries',
    icon: Database,
    topics: [
      'ER Model',
      'Normalization',
      'SQL Queries',
      'Transactions',
      'Indexing',
      'Joins'
    ],
    // Light blue pastel styling
    bgClass: 'bg-[#F2F8FD] hover:bg-[#ECF4FB]',
    borderClass: 'border-[#D1E6F9]',
    hoverBorderClass: 'hover:border-[#9FD0F6]',
    hoverShadowClass: 'hover:shadow-[0_12px_28px_-6px_rgba(14,165,233,0.16)]',
    iconContainerClass: 'bg-sky-50/90 border border-sky-200/60',
    iconColorClass: 'text-sky-700',
    topicBadgeClass: 'bg-sky-100/70 text-sky-800 border border-sky-200/70',
    topicDotClass: 'bg-sky-500',
    arrowContainerClass: 'bg-white/80 border border-sky-200/70 text-sky-700 group-hover:bg-sky-50 group-hover:border-sky-300',
    arrowColorClass: 'text-sky-700'
  },
  {
    id: 'os',
    code: 'OS',
    name: 'Operating Systems',
    description: 'Understand system internals & architecture',
    icon: Cpu,
    topics: [
      'Processes',
      'CPU Scheduling',
      'Deadlocks',
      'Memory Management',
      'Threads',
      'File Systems'
    ],
    // Light lavender/purple pastel styling
    bgClass: 'bg-[#F8F6FD] hover:bg-[#F3EFFC]',
    borderClass: 'border-[#E0D8F8]',
    hoverBorderClass: 'hover:border-[#BDB0F3]',
    hoverShadowClass: 'hover:shadow-[0_12px_28px_-6px_rgba(139,92,246,0.16)]',
    iconContainerClass: 'bg-purple-50/90 border border-purple-200/60',
    iconColorClass: 'text-purple-700',
    topicBadgeClass: 'bg-purple-100/70 text-purple-800 border border-purple-200/70',
    topicDotClass: 'bg-purple-500',
    arrowContainerClass: 'bg-white/80 border border-purple-200/70 text-purple-700 group-hover:bg-purple-50 group-hover:border-purple-300',
    arrowColorClass: 'text-purple-700'
  },
  {
    id: 'cn',
    code: 'CN',
    name: 'Computer Networks',
    description: 'Discover protocols & communication layers',
    icon: Network,
    topics: [
      'OSI Model',
      'TCP/IP',
      'Routing',
      'IP Addressing',
      'Network Security',
      'Transport Layer'
    ],
    // Light peach/red pastel styling
    bgClass: 'bg-[#FDF6F3] hover:bg-[#FAF0EC]',
    borderClass: 'border-[#F8DDD4]',
    hoverBorderClass: 'hover:border-[#F3B9A8]',
    hoverShadowClass: 'hover:shadow-[0_12px_28px_-6px_rgba(249,115,22,0.16)]',
    iconContainerClass: 'bg-orange-50/90 border border-orange-200/60',
    iconColorClass: 'text-orange-700',
    topicBadgeClass: 'bg-orange-100/70 text-orange-800 border border-orange-200/70',
    topicDotClass: 'bg-orange-500',
    arrowContainerClass: 'bg-white/80 border border-orange-200/70 text-orange-700 group-hover:bg-orange-50 group-hover:border-orange-300',
    arrowColorClass: 'text-orange-700'
  }
];

/**
 * Reusable SubjectCard Subcomponent
 * Displays pastel card with calm, continuous dynamic topic text cycling
 */
function SubjectCard({ subject, index, onSelect }) {
  const [topicIndex, setTopicIndex] = useState(0);
  const Icon = subject.icon;

  useEffect(() => {
    // Subtle staggered delay so all 6 cards do not flip simultaneously
    const staggerTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        setTopicIndex((prev) => (prev + 1) % subject.topics.length);
      }, 3000); // Calm 3-second cycle

      return () => clearInterval(intervalId);
    }, index * 240);

    return () => clearTimeout(staggerTimeout);
  }, [subject.topics.length, index]);

  const currentTopic = subject.topics[topicIndex];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(subject, currentTopic)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(subject, currentTopic);
        }
      }}
      className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-200 ease-out cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 ${subject.bgClass} ${subject.borderClass} ${subject.hoverBorderClass} ${subject.hoverShadowClass} hover:-translate-y-1 hover:brightness-[1.01]`}
    >
      <div>
        {/* Top Row: Subject Icon & Arrow Button */}
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${subject.iconContainerClass}`}
          >
            <Icon className={`w-5 h-5 ${subject.iconColorClass}`} />
          </div>

          {/* Interactive Arrow Button with gentle continuous sway and hover nudge */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${subject.arrowContainerClass}`}
          >
            <motion.div
              animate={{ x: [0, 1.5, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="flex items-center justify-center"
            >
              <ArrowRight
                className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${subject.arrowColorClass}`}
              />
            </motion.div>
          </div>
        </div>

        {/* Subject Name */}
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1.5">
          {subject.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
          {subject.description}
        </p>
      </div>

      {/* Dynamic Topic Text Effect: Calm fade + soft vertical movement */}
      <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
          Topic
        </span>

        <div className="h-7 flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTopic}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(subject, currentTopic);
              }}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -7 }}
              transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1.0] }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${subject.topicBadgeClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${subject.topicDotClass}`} />
              <span className="truncate max-w-[140px] sm:max-w-[180px]">
                {currentTopic}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Practice Page Component
 * Clean 6-subject selection interface with preserved roadmap navigation and data safety
 */
export default function Practice() {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preserve existing roadmap data loading
    roadmapService
      .getRoadmap()
      .then((res) => {
        if (res?.roadmap) setRoadmap(res.roadmap);
      })
      .catch((err) => {
        console.warn('[Practice Page] Error loading roadmap:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const levels = roadmap?.levels || [];

  const getOOPSTopicSlug = (topicName) => {
    if (!topicName) return 'what-is-oops';
    const lower = topicName.toLowerCase();
    if (lower.includes('what is oops') || lower.includes('intro')) return 'what-is-oops';
    const resolved = resolveOOPSTopicId(topicName);
    return resolved || 'what-is-oops';
  };

  /**
   * Helper to map subject code/name to dedicated page or active milestone
   */
  const handleSubjectSelect = (subject, selectedTopic) => {
    // 1. DSA redirects to dedicated DSA Learning Page
    if (subject.code === 'DSA' || subject.id === 'dsa') {
      navigate('/subjects/dsa');
      return;
    }

    // 2. Aptitude redirects to dedicated Aptitude Learning Page
    if (subject.code === 'APT' || subject.id === 'apt' || subject.id === 'aptitude') {
      navigate('/aptitude');
      return;
    }

    // 3. OOPS redirects directly to canonical OOPS Learning Page with selected topic
    if (subject.code === 'OOPS' || subject.id === 'oops') {
      if (selectedTopic) {
        const topicSlug = getOOPSTopicSlug(selectedTopic);
        navigate(`/subjects/oops?topic=${topicSlug}`);
      } else {
        navigate('/subjects/oops');
      }
      return;
    }

    // 4. DBMS redirects to dedicated DBMS Learning Page with selected topic
    if (subject.code === 'DBMS' || subject.id === 'dbms') {
      const slug = selectedTopic ? selectedTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
      navigate(slug ? `/subjects/dbms?topic=${slug}` : '/subjects/dbms');
      return;
    }

    // 5. OS redirects to dedicated OS Learning Page with selected topic
    if (subject.code === 'OS' || subject.id === 'os') {
      const slug = selectedTopic ? selectedTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
      navigate(slug ? `/subjects/os?topic=${slug}` : '/subjects/os');
      return;
    }

    // 6. CN redirects to dedicated CN Learning Page with selected topic
    if (subject.code === 'CN' || subject.id === 'cn') {
      const slug = selectedTopic ? selectedTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
      navigate(slug ? `/subjects/cn?topic=${slug}` : '/subjects/cn');
      return;
    }

    // 7. Other subjects preserve existing milestone/roadmap navigation
    if (levels.length > 0) {
      const code = subject.code.toUpperCase();
      const aliases = {
        APT: ['APT', 'APTITUDE', 'QUANT'],
        OOPS: ['OOPS', 'OOP', 'OBJECT-ORIENTED'],
        DBMS: ['DBMS', 'DATABASE', 'SQL'],
        OS: ['OS', 'OPERATING SYSTEM', 'OPERATING SYSTEMS'],
        CN: ['CN', 'NETWORKING', 'COMPUTER NETWORKS', 'NETWORKS']
      };
      const validKeys = aliases[code] || [code];

      const matchingMilestones = levels.filter((lvl) => {
        const s = (lvl.subject || '').toUpperCase();
        return validKeys.some((k) => s.includes(k) || k.includes(s));
      });

      // Prefer active/in-progress, then unlocked, then first matching
      const targetMilestone =
        matchingMilestones.find((m) => m.status === 'in_progress') ||
        matchingMilestones.find((m) => m.status === 'unlocked') ||
        matchingMilestones[0];

      if (targetMilestone?.id) {
        navigate(`/roadmap/milestone/${targetMilestone.id}`);
        return;
      }
    }

    // Default fallback to roadmap with subject parameter
    navigate(`/roadmap?subject=${subject.code}`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-3 sm:py-5 px-3 sm:px-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-36 rounded-lg" />
          <Skeleton className="h-5 w-64 rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-3 sm:py-5 px-3 sm:px-6 space-y-7">
      {/* 1. Page Header */}
      <header className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Practice
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-normal">
          Choose a subject and start practicing
        </p>
      </header>

      {/* 2. Six Subject Cards: 3x2 on desktop, 2-col on tablet, 1-col on mobile */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {PRACTICE_SUBJECTS.map((subject, index) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            index={index}
            onSelect={handleSubjectSelect}
          />
        ))}
      </main>
    </div>
  );
}
