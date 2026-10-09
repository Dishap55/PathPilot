import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import { roadmapService } from '../../services/roadmapService';

// Roadmap Subcomponents
import RoadmapHeader from '../../components/roadmap/RoadmapHeader';
import PersonalizedRoadmapPath from '../../components/roadmap/PersonalizedRoadmapPath';
import SubjectFilter from '../../components/roadmap/SubjectFilter';
import InitialAssessmentRoadmap from '../../components/roadmap/InitialAssessmentRoadmap';
import RoadmapFocusAreasSection from '../../components/roadmap/RoadmapFocusAreasSection';
import { assessmentService } from '../../services/assessmentService';

// Common UI Components
import Button from '../../components/common/Button';
import Skeleton from '../../components/common/Skeleton';
import {
  Compass,
  Sparkles,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Layers,
  ArrowRight
} from 'lucide-react';

/**
 * Canonical 7 DSA Roadmap Topics matching the finalized PathPilot DSA Learning System.
 */
const CANONICAL_DSA_ROADMAP_TOPICS = [
  {
    id: 1,
    topicId: 'two-pointers',
    title: 'Two Pointers',
    description: 'Master two-pointer techniques for pair searching, partitioning, and palindrome verification.',
    subject: 'DSA',
    status: 'not_started',
    completedQuestions: 0,
    totalQuestions: 10,
    tags: ['Pattern', 'Practice Questions', 'Real Examples']
  },
  {
    id: 2,
    topicId: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Master comparison and linear sorting techniques that reduce problem complexity.',
    subject: 'DSA',
    status: 'not_started',
    completedQuestions: 0,
    totalQuestions: 10,
    tags: ['Sorting', 'Algorithms', 'Complexity']
  },
  {
    id: 3,
    topicId: 'binary-search',
    title: 'Binary Search',
    description: 'Master logarithmic search techniques that cut search space in half at every step.',
    subject: 'DSA',
    status: 'not_started',
    completedQuestions: 0,
    totalQuestions: 10,
    tags: ['Search', 'Sorted Data', 'Divide & Conquer']
  },
  {
    id: 4,
    topicId: 'linked-list',
    title: 'Linked List',
    description: 'Master node-based sequential memory structures, pointer manipulation, and cycle detection.',
    subject: 'DSA',
    status: 'not_started',
    completedQuestions: 0,
    totalQuestions: 10,
    tags: ['Nodes', 'Pointers', 'Traversal']
  },
  {
    id: 5,
    topicId: 'trees',
    title: 'Trees & BST',
    description: 'Master hierarchical tree structures, binary search trees, and tree traversals.',
    subject: 'DSA',
    status: 'not_started',
    completedQuestions: 0,
    totalQuestions: 12,
    tags: ['Trees', 'BST', 'Traversal']
  },
  {
    id: 6,
    topicId: 'graphs',
    title: 'Graphs & BFS/DFS',
    description: 'Master graph network representations, breadth-first search, and depth-first search.',
    subject: 'DSA',
    status: 'not_started',
    completedQuestions: 0,
    totalQuestions: 12,
    tags: ['Graphs', 'BFS', 'DFS']
  },
  {
    id: 7,
    topicId: 'dp',
    title: 'Dynamic Programming',
    description: 'Understand DP patterns with memoization, tabulation, and step-by-step optimization.',
    subject: 'DSA',
    status: 'not_started',
    completedQuestions: 0,
    totalQuestions: 12,
    tags: ['DP', 'Memoization', 'Tabulation']
  }
];

export default function Roadmap() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();

  const [roadmapData, setRoadmapData] = useState(null);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');

  // Load active roadmap and diagnostic assessment on mount
  const loadRoadmap = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      // 1. Immediately check local cache for fast loading
      if (user?.id) {
        try {
          const cached = localStorage.getItem(`pathpilot_initial_assessment_result_${user.id}`);
          if (cached) setAssessmentResult(JSON.parse(cached));
        } catch (e) {}
      }

      // 2. Fetch active roadmap and assessment result concurrently
      const [roadmapRes, assessmentRes] = await Promise.allSettled([
        roadmapService.getRoadmap(),
        assessmentService.getInitialAssessmentResult()
      ]);

      let activeRoadmap = null;
      if (roadmapRes.status === 'fulfilled') {
        const result = roadmapRes.value?.data || roadmapRes.value;
        if (result?.exists && result?.roadmap) {
          activeRoadmap = result.roadmap;
          setRoadmapData(activeRoadmap);
        } else {
          setRoadmapData(null);
        }
      }

      let activeAssessment = null;
      if (assessmentRes.status === 'fulfilled') {
        const asm = assessmentRes.value?.data?.result || assessmentRes.value?.data || assessmentRes.value;
        if (asm && (asm.dsaResult || asm.overall)) {
          activeAssessment = asm;
          setAssessmentResult(asm);
          if (user?.id) {
            try {
              localStorage.setItem(`pathpilot_initial_assessment_result_${user.id}`, JSON.stringify(asm));
            } catch (e) {}
          }
        }
      }

      // 3. If student has assessment but roadmap is not yet active, auto-generate roadmap
      if (!activeRoadmap && activeAssessment) {
        try {
          const genRes = await roadmapService.generateRoadmap();
          const genResult = genRes?.data || genRes;
          if (genResult?.success && genResult?.roadmap) {
            setRoadmapData(genResult.roadmap);
          }
        } catch (genErr) {
          // ignore background generation notice
        }
      }
    } catch (err) {
      console.error('[Roadmap Page] Fetch error:', err);
      setRoadmapData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }
    loadRoadmap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading]);

  // Generate / Regenerate Roadmap
  const handleGenerate = async () => {
    setIsRegenerating(true);
    setErrorMessage('');
    try {
      const response = await roadmapService.generateRoadmap();
      const result = response?.data || response;
      if (result?.success && result?.roadmap) {
        setRoadmapData(result.roadmap);
      }
    } catch (err) {
      console.error('[Roadmap Page] Generate error:', err);
      setErrorMessage(err.message || 'Error generating personalized roadmap.');
    } finally {
      setIsRegenerating(false);
    }
  };

  // Process canonical DSA topics and merge backend user progress if present
  const roadmapNodes = (roadmapData && (
    Array.isArray(roadmapData.items) ? roadmapData.items :
    Array.isArray(roadmapData.levels) ? roadmapData.levels :
    Array.isArray(roadmapData.nodes) ? roadmapData.nodes :
    []
  )) || [];

  // Map the dynamic roadmap nodes directly into topicsList
  let topicsList = [];

  if (roadmapNodes.length > 0) {
    topicsList = roadmapNodes.map((node, idx) => ({
      id: node.id || `node-${idx}`,
      topicId: node.topicId || node.topic_name || `topic-${idx}`,
      title: node.topicName || node.title || node.topic_name || node.topic || node.stage || 'Unknown Topic',
      description: node.reason || node.description || node.summary || 'Master core subject concepts.',
      subject: (node.subject && node.subject !== 'DSA + Aptitude') ? node.subject : 'DSA',
      status: (node.status === 'completed' || node.status === 'done') ? 'completed' 
              : (node.status === 'unlocked' || node.status === 'in_progress' || node.status === 'IN_PROGRESS') ? 'in_progress' 
              : 'not_started',
      completedQuestions: node.completedQuestions || node.completed_questions || 0,
      totalQuestions: node.totalQuestions || node.total_questions || 10,
      tags: node.tags || (node.category ? [node.category.replaceAll('_', ' ')] : [node.subject || 'DSA']),
      category: node.category,
      priority: node.priority
    }));
  } else {
    // Fallback to canonical list for completely fresh users
    topicsList = CANONICAL_DSA_ROADMAP_TOPICS.map((t) => ({ ...t }));
  }

  // Ensure an Aptitude topic card is always available in the learning path
  if (!topicsList.some((t) => (t.subject || '').toUpperCase() === 'APT' || (t.subject || '').toUpperCase() === 'APTITUDE')) {
    topicsList.push({
      id: 'aptitude-track',
      topicId: 'percentages',
      title: 'Aptitude',
      description: 'Master quantitative math, logical reasoning, and verbal speed techniques for placement tests.',
      subject: 'Aptitude',
      status: 'not_started',
      completedQuestions: 0,
      totalQuestions: 15,
      tags: ['Quantitative', 'Logical Reasoning', 'Verbal Ability']
    });
  }

  // Ensure an OOPS topic card is always available in the learning path
  if (!topicsList.some((t) => (t.subject || '').toUpperCase() === 'OOPS')) {
    topicsList.push({
      id: 'oops-track',
      topicId: 'classes-and-objects',
      title: 'OOPS',
      description: 'Master classes, objects, encapsulation, inheritance, polymorphism, and abstraction.',
      subject: 'OOPS',
      status: 'not_started',
      completedQuestions: 0,
      totalQuestions: 20,
      tags: ['Class & Object', 'Inheritance', 'Polymorphism', 'Encapsulation']
    });
  }

  // Counts per subject for filter badges
  const countsPerSubject = {};
  topicsList.forEach(t => {
    const code = (t.subject || 'DSA').toUpperCase();
    countsPerSubject[code] = (countsPerSubject[code] || 0) + 1;
  });

  // Filter presentation
  const filteredTopics = selectedSubject === 'ALL'
    ? topicsList
    : topicsList.filter(t => (t.subject || 'DSA').toUpperCase() === selectedSubject);

  const displayTopics = filteredTopics;
  const completedCount = displayTopics.filter(t => t.status === 'completed' || t.status === 'done').length;

  // Extract student's dynamic focus areas (weak topics diagnosed from assessment)
  const focusAreas = [];
  if (Array.isArray(roadmapData?.items)) {
    roadmapData.items
      .filter(item => item.category === 'FOCUS')
      .forEach(item => {
        focusAreas.push({
          topicId: item.topicId,
          topicName: item.topicName,
          subject: item.subject,
          priority: item.priority || 1,
          category: item.category,
          reason: item.reason,
          recommendedAction: item.recommendedAction
        });
      });
  }

  if (focusAreas.length === 0 && assessmentResult) {
    const rawFocus = assessmentResult.overall?.combinedFocusAreas || [
      ...(assessmentResult.dsaResult?.focusAreas || []),
      ...(assessmentResult.aptitudeResult?.focusAreas || [])
    ];
    // Filter to topics with actual incorrect answers or Needs Attention
    const weakOnly = rawFocus.filter(f => (f.incorrect > 0) || f.status === 'Needs Attention' || (typeof f.accuracy === 'number' && f.accuracy < 50));
    weakOnly.forEach(f => {
      focusAreas.push({
        topicId: f.topicId,
        topicName: f.topicName,
        subject: f.subject,
        priority: 1,
        category: 'FOCUS',
        reason: f.statusLabel || 'Identified for targeted practice from diagnostic assessment.',
        recommendedAction: 'Solve practice problems in this topic to build core pattern recognition.'
      });
    });
  }

  const hasTakenAssessment = Boolean(assessmentResult || roadmapData?.assessmentId);

  // 1. Loading Skeleton State
  if (loading || authLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto py-4">
        {/* Header Skeleton */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-lg" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Path Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      {/* 1. Header Card (Matching Reference Image 2) */}
      <RoadmapHeader
        targetDate={profile?.target_date || roadmapData?.target_date}
        prepWindow={
          profile?.preparation_value && profile?.preparation_unit
            ? `${profile.preparation_value} ${profile.preparation_unit}`
            : roadmapData?.preparation_window || '12 weeks'
        }
        preferredLanguage={profile?.preferred_language || roadmapData?.preferred_language || 'C++'}
        targetCompany={profile?.target_company || roadmapData?.target_company || 'TCS'}
        hasPersonalizedRoadmap={hasTakenAssessment}
        onRegenerate={handleGenerate}
        isRegenerating={isRegenerating}
      />

      {/* Inline Error Message Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-semibold flex items-center justify-between gap-3">
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage('')}
            className="text-xs font-bold text-rose-600 hover:text-rose-900 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Areas to be Focused (First: Weak points from assessment, or prompt if unassessed) */}
      <RoadmapFocusAreasSection
        focusAreas={focusAreas}
        assessmentResult={assessmentResult}
        hasTakenAssessment={hasTakenAssessment}
        targetCompany={profile?.target_company || roadmapData?.target_company || 'your target company'}
      />

      {/* 3. Detailed Milestone Plan from Initial Assessment (if available) */}
      <InitialAssessmentRoadmap roadmap={roadmapData} />

      {/* 2. Subject Filter & Overall Stats */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-indigo-600" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Path Sequence ({displayTopics.length} Topics)
          </h3>
          <span className="text-xs text-slate-400">
            • {completedCount}/{displayTopics.length} Done
          </span>
        </div>

        <SubjectFilter
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
          countsPerSubject={countsPerSubject}
        />
      </div>

      {/* 3. Personalized Organic Winding Roadmap & Path (Matching Reference Image 1 & 2) */}
      <PersonalizedRoadmapPath topics={filteredTopics} />
    </div>
  );
}
