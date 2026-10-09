import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { roadmapService } from '../../services/roadmapService';
import { profileService } from '../../services/profileService';
import { useProfile } from '../../hooks/useProfile';
import LearningGardenOnboarding from '../../components/garden/LearningGardenOnboarding';
import GardenWidget from '../../components/garden/GardenWidget';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import DailyThought from '../../components/dashboard/DailyThought';
import SubjectProgressChart from '../../components/dashboard/SubjectProgressChart';
import InitialAssessmentSummaryCard from '../../components/dashboard/InitialAssessmentSummaryCard';
import { assessmentService } from '../../services/assessmentService';
import { PageLoader } from '../../components/common/Loader';


import {
  Compass,
  Calendar,
  Sparkles,
  ArrowRight,
  Sprout,
  User
} from 'lucide-react';

/**
 * PathPilot Student Dashboard Foundation
 * 
 * Implements:
 * 1. First-time Learning Garden onboarding interceptor:
 *    - New users see the Learning Garden onboarding screen before their first dashboard visit.
 *    - Returning users go directly to the dashboard.
 * 2. Authentic, student-specific data loading (Profile + Roadmap Milestones).
 * 3. NO HARDCODED personal data (no Disha, no TCS, no fake metrics).
 * 4. Light, clean, modern, student-friendly pastel card system with clear ~25% visible borders.
 * 5. Natural card width differences and hierarchy (Garden, Next Milestone, AI Mentor, Placement, Quick Actions).
 * 6. Responsive across 1920px down to 360px without hardcoded left margins.
 */

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Onboarding state
  const [isOnboarded, setIsOnboarded] = useState(true); // default true to avoid flash
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  // Student authentic data
  const { profile, loading: profileLoading, refetchProfile } = useProfile();
  const [roadmap, setRoadmap] = useState(null);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // 1. Check First-Time Garden Onboarding Status
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const storageKey = `pathpilot_garden_onboarded_${user.id}`;
    let onboarded = false;
    try {
      onboarded = localStorage.getItem(storageKey) === 'true';
    } catch (e) {
      onboarded = false;
    }

    if (!onboarded) {
      navigate('/onboarding/garden', { replace: true });
      return;
    }

    setIsOnboarded(true);
    setCheckingOnboarding(false);
  }, [user, authLoading, navigate]);

  // 2. Fetch authentic student profile & active roadmap milestones
  useEffect(() => {
    let isMounted = true;

    async function loadStudentData() {
      if (!user || authLoading) return;

      try {
        // A. Load cached initial assessment result immediately if available
        let initialResult = null;
        if (user?.id) {
          try {
            const local = localStorage.getItem(`pathpilot_initial_assessment_result_${user.id}`);
            if (local) initialResult = JSON.parse(local);
          } catch (e) {}
        }
        if (initialResult && isMounted) {
          setAssessmentResult(initialResult);
        }

        const [roadmapRes, asmRes] = await Promise.allSettled([
          roadmapService.getRoadmap(),
          assessmentService.getInitialAssessmentResult()
        ]);

        if (isMounted) {
          if (roadmapRes.status === 'fulfilled' && roadmapRes.value?.data?.roadmap) {
            setRoadmap(roadmapRes.value.data.roadmap);
          }
          if (asmRes.status === 'fulfilled') {
            const persistedResult = asmRes.value?.data?.result;
            setAssessmentResult(persistedResult || null);
            if (persistedResult) {
              if (user?.id) {
                try {
                  localStorage.setItem(`pathpilot_initial_assessment_result_${user.id}`, JSON.stringify(persistedResult));
                  localStorage.setItem(`pathpilot_assessment_completed_${user.id}`, 'true');
                } catch (e) {}
              }
            }
          }
        }
      } catch (err) {
        console.warn('[Dashboard] Data fetch notice:', err);
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    }

    loadStudentData();

    return () => {
      isMounted = false;
    };
  }, [user, authLoading]);

  // Loading spinner with brand loader
  if (authLoading || checkingOnboarding) {
    return <PageLoader text="Loading your placement dashboard..." size="lg" />;
  }

  // 3. FIRST-TIME ONBOARDING INTERCEPTION
  // If student has never visited dashboard before, show Learning Garden introduction
  if (!isOnboarded) {
    return (
      <LearningGardenOnboarding
        onComplete={() => setIsOnboarded(true)}
      />
    );
  }

  // 4. RETURNING USER / ONBOARDED DASHBOARD
  const studentName = profile?.full_name || user?.user_metadata?.full_name || 'Engineering Student';
  const targetDate = profile?.target_date || roadmap?.target_date || null;
  const preferredLang = profile?.preferred_language || roadmap?.preferred_language || 'C++';
  const targetCompany = profile?.target_company || roadmap?.target_company || null;
  const milestones = roadmap?.roadmap_items || roadmap?.levels || [];
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const activeMilestone = milestones.find(m => m.status === 'unlocked' || m.status === 'in_progress' || m.status === 'NOT_STARTED') || milestones[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
      
      {/* 1. Welcome & Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {studentName}
            </h1>
            <span role="img" aria-label="wave" className="text-2xl animate-float-in-place hidden sm:inline-block">👋</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Your continuous placement preparation & adaptive learning dashboard.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="sprout">
            <Sprout size={13} className="text-emerald-600" />
            Learning Garden Active
          </Badge>
          <Badge variant="primary">
            {preferredLang}
          </Badge>
        </div>
      </div>

      {/* Motivational Daily Thought */}
      <DailyThought />

      {/* Step 3 Initial Assessment Results & Level Card (Only shows if result exists) */}
      <InitialAssessmentSummaryCard assessmentResult={assessmentResult} />

      {/* 3. Core Dashboard Grid (Natural Card Proportions) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (2 Cols): Prominent Learning Garden + Active Milestone Practice */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prominent Learning Garden Live Widget */}
          <GardenWidget
            milestones={milestones}
            loading={loadingData}
          />

          {/* Subject Progress Card — Dynamic, real backend data */}
          <Card className="p-5 sm:p-6">
            <Card.Header>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <Card.Title>Subject Progress</Card.Title>
                  <Card.Description>Select a subject to view your real mastery trend</Card.Description>
                </div>
              </div>
            </Card.Header>
            <Card.Content>
              <SubjectProgressChart />
            </Card.Content>
          </Card>

          {/* Active Milestone / Next Topic Card (Rich Medium/Large) */}
          <Card className="p-5 sm:p-6 lg:p-7">
            <Card.Header>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  <Compass size={17} />
                </div>
                <div>
                  <Card.Title>Next Milestone in Sequence</Card.Title>
                  <Card.Description>Pick up your deliberate practice where you left off</Card.Description>
                </div>
              </div>

              {activeMilestone && (
                <Badge variant={activeMilestone.status === 'completed' ? 'success' : 'primary'}>
                  {activeMilestone.stage || 'In Progress'}
                </Badge>
              )}
            </Card.Header>

            <Card.Content>
              {activeMilestone ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                        Level {activeMilestone.sequence_no} &bull; {activeMilestone.subject}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                        {activeMilestone.topic}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {activeMilestone.focus || 'Targeted study & deliberate practice challenge.'}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-slate-400 block font-medium">Estimated Pace</span>
                      <span className="text-xs font-bold text-slate-700 block">
                        {activeMilestone.estimated_days ? `${activeMilestone.estimated_days} Days` : 'Not estimated'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Link to={`/roadmap/milestone/${activeMilestone.id}`}>
                      <Button variant="primary" size="sm" iconRight={ArrowRight}>
                        Continue Practice
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 space-y-2">
                  <p className="text-xs">No active roadmap synthesized yet.</p>
                  <Link to="/roadmap">
                    <Button variant="outline" size="sm">
                      Generate Roadmap
                    </Button>
                  </Link>
                </div>
              )}
            </Card.Content>
          </Card>
        </div>

        {/* Right Column (1 Col): AI Mentor Guidance + Placement Context + Quick Actions */}
        <div className="space-y-6">
          {/* AI Mentor Guidance Card (Medium Proportional Card) */}
          <Card className="p-5 sm:p-6" id="ai-mentor">
            <Card.Header>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  <Sparkles size={16} />
                </div>
                <div>
                  <Card.Title>AI Mentor Guidance</Card.Title>
                  <Card.Description>Adaptive Deliberate Practice Tip</Card.Description>
                </div>
              </div>
            </Card.Header>

            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-sky-50/50 border border-indigo-100/90 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                <span className="text-xs">🎯</span>
                <span>Focus: Conceptual Precision</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Solving problems without consulting hints on the first attempt builds genuine algorithmic mental models. Focus on edge-case testing before submitting.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100/90 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Recalibrated live</span>
              <Link to="/roadmap" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                <span>Practice Now</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </Card>

          {/* Target & Calibration Context Card (Compact Proportional Card) */}
          <Card className="p-5 sm:p-6">
            <Card.Header>
              <div className="flex items-center gap-2">
                <Calendar size={17} className="text-indigo-600" />
                <Card.Title>Placement Context</Card.Title>
              </div>
            </Card.Header>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Target Exam / Drive Date</span>
                <span className="font-bold text-slate-800 font-mono">
                  {targetDate || 'Not configured'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Target Company</span>
                <span className="font-bold text-slate-800">
                  {targetCompany || 'Not configured'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Coding Language</span>
                <span className="font-bold text-indigo-700">
                  {preferredLang}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Completed Milestones</span>
                <span className="font-bold text-emerald-700">
                  {completedCount} of {milestones.length}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100/90">
              <Link to="/profile" className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center justify-between">
                <span>Update Preferences</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </Card>

          {/* Quick Access Actions Card (Compact Proportional Card) */}
          <Card className="p-5 sm:p-6">
            <Card.Title className="text-sm font-bold text-slate-800 mb-3 block">
              Quick Actions
            </Card.Title>

            <div className="space-y-2">
              <Link
                to="/roadmap"
                className="w-full p-2.5 rounded-xl border border-slate-200/80 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-700 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Compass size={15} className="text-indigo-600" />
                  Full Learning Roadmap
                </span>
                <ArrowRight size={13} className="text-slate-400" />
              </Link>

              <Link
                to="/profile"
                className="w-full p-2.5 rounded-xl border border-slate-200/80 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-700 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <User size={15} className="text-indigo-600" />
                  Profile & Preferences
                </span>
                <ArrowRight size={13} className="text-slate-400" />
              </Link>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
