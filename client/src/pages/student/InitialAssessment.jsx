import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import { assessmentEngine } from '../../services/assessment/assessmentEngine';
import { getStoredAssessmentInput, createSubjectAssessmentInput } from '../../services/assessmentInputService';
import { assessmentService } from '../../services/assessmentService';
import AssessmentQuestionCard from '../../components/assessment/AssessmentQuestionCard';
import SubjectTransitionScreen from '../../components/assessment/SubjectTransitionScreen';
import AssessmentCompletionScreen from '../../components/assessment/AssessmentCompletionScreen';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { PageLoader } from '../../components/common/Loader';
import {
  Compass,
  Clock,
  Sparkles,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  HelpCircle,
  Play
} from 'lucide-react';

export default function InitialAssessment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedSubject = searchParams.get('subject');
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();

  // Lifecycle stage: 'loading' | 'needs_setup' | 'intro' | 'active' | 'transition' | 'completed' | 'error'
  const [stage, setStage] = useState('loading');
  const [sessionState, setSessionState] = useState(null);
  const [assessmentInput, setAssessmentInput] = useState(null);
  const [hasActiveSavedSession, setHasActiveSavedSession] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, message }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Authentication guard & session/input initialization
  useEffect(() => {
    let isMounted = true;

    async function setupAssessment() {
      if (authLoading) return;

      // Unauthenticated protection
      if (!user) {
        navigate('/login', { state: { returnTo: '/assessment/initial' }, replace: true });
        return;
      }

      try {
        // A. Check for existing active session in local engine
        const existingState = assessmentEngine.getState();
        const hasExisting = Boolean(existingState && existingState.status && existingState.status !== 'completed');
        if (hasExisting && isMounted) {
          setHasActiveSavedSession(true);
          setSessionState(existingState);
        }

        // B. Load Step 1 Assessment Input
        let input = getStoredAssessmentInput(requestedSubject);

        // If not in storage, query backend
        if (!input) {
          try {
            const res = await assessmentService.getAssessmentInput(requestedSubject);
            if (res && res.data) input = res.data;
          } catch (e) {}
        }

        if (!input) {
          try {
            const ctx = await assessmentService.getInitialContext();
            if (ctx?.assessmentInput) {
              input = ctx.assessmentInput;
            }
          } catch (e) {}
        }

        if (!isMounted) return;

        // If no valid input and no active session, show helpful recovery state
        if (!input && !hasExisting) {
          setStage('needs_setup');
          return;
        }

        // Product Decision: Initial Assessment assesses ONLY DSA and Aptitude (5 questions each = 10 questions total)
        let dsaLevel = 'Beginner';
        let aptLevel = 'Beginner';

        if (input) {
          if (Array.isArray(input.subjects)) {
            const dsaObj = input.subjects.find(s => (s.subject || '').toUpperCase() === 'DSA');
            if (dsaObj && dsaObj.studentLevel) dsaLevel = dsaObj.studentLevel;
            const aptObj = input.subjects.find(s => (s.subject || '').toUpperCase() === 'APTITUDE');
            if (aptObj && aptObj.studentLevel) aptLevel = aptObj.studentLevel;
          } else if (input.subject) {
            if (input.subject.toUpperCase() === 'DSA' && input.studentLevel) dsaLevel = input.studentLevel;
            if (input.subject.toUpperCase() === 'APTITUDE' && input.studentLevel) aptLevel = input.studentLevel;
          }
        }

        const initialSubjects = [
          createSubjectAssessmentInput('DSA', dsaLevel),
          createSubjectAssessmentInput('Aptitude', aptLevel)
        ];

        const initialAssessmentInput = {
          assessmentType: 'initial',
          targetQuestionsPerSubject: 5,
          subjects: initialSubjects
        };

        setAssessmentInput(initialAssessmentInput);

        // If active session exists, student can resume immediately or from intro
        if (hasExisting) {
          if (existingState.status === 'in_progress') {
            setStage('active');
          } else if (existingState.status === 'subject_transition') {
            setStage('transition');
          } else {
            setStage('intro');
          }
        } else {
          setStage('intro');
        }
      } catch (err) {
        if (isMounted) {
          setErrorMessage(err.message || 'Failed to initialize assessment.');
          setStage('error');
        }
      }
    }

    setupAssessment();

    return () => {
      isMounted = false;
    };
  }, [user, authLoading, requestedSubject, navigate]);

  // Subscribe to assessment engine changes
  useEffect(() => {
    const unsubscribe = assessmentEngine.subscribe((newState) => {
      if (!newState) return;
      setSessionState(newState);

      if (newState.status === 'subject_transition') {
        setStage('transition');
      } else if (newState.status === 'completed') {
        setStage('completed');
        // Mark assessment as completed in user-specific local storage
        if (user?.id) {
          try {
            localStorage.setItem(`pathpilot_assessment_completed_${user.id}`, 'true');
          } catch (e) {}
        }
      } else if (newState.status === 'in_progress') {
        setStage('active');
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 2. Start fresh assessment action
  const handleStartAssessment = async () => {
    setStage('loading');
    setErrorMessage('');

    try {
      const state = await assessmentEngine.initSession({
        assessmentInput,
        studentId: user?.id || 'demo-student-id',
        forceNew: true,
        targetQuestionsPerSubject: 5,
        assessmentType: 'initial'
      });
      setSessionState(state);
      setHasActiveSavedSession(false);
      setStage('active');
    } catch (err) {
      setErrorMessage(err.message || 'Could not start assessment session.');
      setStage('error');
    }
  };

  // 3. Resume existing active assessment
  const handleResumeAssessment = () => {
    const existing = assessmentEngine.getState();
    if (existing && existing.status === 'in_progress') {
      setSessionState(existing);
      setStage('active');
    } else if (existing && existing.status === 'subject_transition') {
      setSessionState(existing);
      setStage('transition');
    } else {
      handleStartAssessment();
    }
  };

  // 4. Submit Answer action
  const handleSubmitAnswer = async ({ answer, confidence, codingLanguage, codeSubmitted, testCasesPassed }) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await assessmentEngine.submitAnswer({
        answer,
        confidence,
        codingLanguage,
        codeSubmitted,
        testCasesPassed,
        isSkipped: false
      });

      setFeedback({
        type: result.isCorrect ? 'correct' : 'incorrect',
        message: result.isCorrect ? '✓ Nice! Keep going.' : "↻ Let's learn from this one."
      });

      setTimeout(() => {
        setFeedback(null);
        setIsSubmitting(false);
      }, 250);
    } catch (err) {
      setErrorMessage(err.message || 'Error processing response.');
      setIsSubmitting(false);
    }
  };

  // 5. Skip Question action
  const handleSkipQuestion = async ({ confidence }) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await assessmentEngine.submitAnswer({
        answer: null,
        confidence,
        isSkipped: true
      });

      setFeedback({
        type: 'skipped',
        message: "→ We'll come back to your assessment pattern later."
      });

      setTimeout(() => {
        setFeedback(null);
        setIsSubmitting(false);
      }, 200);
    } catch (err) {
      setErrorMessage(err.message || 'Error skipping question.');
      setIsSubmitting(false);
    }
  };

  // 6. Continue to Next Subject
  const handleContinueNextSubject = async () => {
    setIsSubmitting(true);
    try {
      await assessmentEngine.continueToNextSubject();
      setStage('active');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to advance to next subject.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset / Retry handler
  const handleRetry = () => {
    assessmentEngine.clearSession();
    handleStartAssessment();
  };

  // --- RENDERING STAGES ---

  // Loading State
  if (stage === 'loading' || authLoading) {
    return <PageLoader text="Preparing your adaptive assessment..." size="lg" />;
  }

  // Recovery State: Missing Profile Setup
  if (stage === 'needs_setup') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 max-w-lg w-full shadow-sm text-center space-y-5 animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100 shadow-sm">
            <Compass size={28} />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Profile Configuration Required
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Complete Profile Setup First
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Before taking your diagnostic skill assessment, please select your baseline subject levels and career goals in Profile Setup.
            </p>
          </div>
          <div className="pt-2">
            <Button
              variant="primary"
              onClick={() => navigate('/profile-setup')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 mx-auto"
            >
              <span>Complete Profile Setup</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (stage === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white border border-rose-200 rounded-3xl p-8 max-w-md w-full shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">We couldn't prepare your assessment yet</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{errorMessage}</p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
            <Button variant="secondary" onClick={() => navigate('/profile-setup')} className="text-xs">
              Back to Profile Setup
            </Button>
            <Button variant="primary" onClick={handleRetry} className="text-xs flex items-center justify-center gap-1.5">
              <RotateCcw size={12} />
              <span>Try Again</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Completed State
  if (stage === 'completed' && sessionState) {
    const analysis = sessionState.analysis || assessmentEngine.getCompletedAnalysis();
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <AssessmentCompletionScreen
          analysis={analysis}
          totalSubjects={sessionState.totalSubjects || 2}
          totalQuestionsAnswered={sessionState.responsesCount || 10}
          totalTimeSeconds={sessionState.assessmentStartTime ? Math.round((Date.now() - sessionState.assessmentStartTime) / 1000) : 0}
          subjectMetrics={sessionState.subjectMetrics}
          onReturnDashboard={() => navigate('/dashboard')}
        />
      </div>
    );
  }

  // Subject Transition State
  if (stage === 'transition' && sessionState) {
    const nextSubjIndex = sessionState.currentSubjectIndex + 1;
    const nextSubjName = sessionState.subjectMetrics[nextSubjIndex]?.subject || 'Next Subject';
    const lastMetric = sessionState.subjectMetrics[sessionState.currentSubjectIndex];

    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <SubjectTransitionScreen
          completedSubjectName={sessionState.currentSubjectName}
          nextSubjectName={nextSubjName}
          currentSubjectIndex={sessionState.currentSubjectIndex}
          totalSubjects={sessionState.totalSubjects}
          questionsEvaluated={lastMetric?.questionsAnswered || 0}
          totalQuestions={sessionState.targetQuestionsPerSubject || 5}
          timeTakenSeconds={lastMetric?.timeSpent || 0}
          onContinue={handleContinueNextSubject}
          isLoading={isSubmitting}
        />
      </div>
    );
  }

  // Assessment Intro State
  if (stage === 'intro') {
    const subjectsList = Array.isArray(assessmentInput?.subjects)
      ? assessmentInput.subjects
      : assessmentInput?.subject
      ? [assessmentInput]
      : [];

    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-black tracking-wider uppercase mb-1">
              <Sparkles size={13} />
              <span>PATHPILOT</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
              Ready for your Skill Assessment?
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              We'll quickly understand what you already know so PathPilot can create the right learning journey for you.
            </p>
          </div>

          {/* Active Session Notice if existing in-progress session found */}
          {hasActiveSavedSession && sessionState?.currentQuestion && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center justify-between text-xs font-bold animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-amber-600 shrink-0" />
                <span>
                  Active session found: {sessionState.currentSubjectName} (Question {(sessionState.currentQuestionIndex || 0) + 1} of {sessionState.targetQuestionsPerSubject || 5})
                </span>
              </div>
              <button
                type="button"
                onClick={handleResumeAssessment}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold shadow-sm transition-colors cursor-pointer"
              >
                Resume
              </button>
            </div>
          )}

          {/* Assessment Parameters Overview Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* 4 Metrics Matrix */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  Your Assessment Overview
                </span>
                <span className="text-xs font-bold text-indigo-600">
                  Easy → Medium → Hard
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-slate-400 block text-[11px] font-bold">Assessed Subjects</span>
                  <span className="text-base font-black text-slate-900 mt-0.5 block">2 (DSA & Aptitude)</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-slate-400 block text-[11px] font-bold">Questions</span>
                  <span className="text-base font-black text-indigo-600 mt-0.5 block">10 Total (5 per subject)</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-slate-400 block text-[11px] font-bold">Difficulty</span>
                  <span className="text-base font-black text-indigo-600 mt-0.5 block">Adaptive</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <span className="text-slate-400 block text-[11px] font-bold">Time</span>
                  <span className="text-base font-black text-emerald-600 mt-0.5 block">Tracked</span>
                </div>
              </div>
            </div>

            {/* Core CS Notice */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-600">
              <BookOpen size={16} className="text-slate-500 shrink-0" />
              <span>
                <strong>DBMS, OS, OOPS, and CN</strong> are not assessed initially and can be started directly from <strong>Beginner</strong> level.
              </span>
            </div>

            {/* Purpose Clarity (Section 5) */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-950 space-y-1.5 leading-relaxed">
              <div className="flex items-center gap-1.5 font-black text-indigo-900">
                <CheckCircle2 size={15} className="text-indigo-600" />
                <span>This assessment is not a test you need to pass.</span>
              </div>
              <p className="text-slate-600">
                It is used to understand what you already know, which topics are strong, which topics need attention, and where your learning journey should begin.
              </p>
              <p className="text-slate-600 font-medium pt-1 border-t border-indigo-100/60">
                Your starting level comes from your profile selection. Your actual level is determined after the assessment.
              </p>
            </div>

            {/* Selected Subjects List (Section 6) */}
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                Selected Subjects & Starting Levels:
              </h3>
              <div className="space-y-2.5">
                {subjectsList.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center font-black text-xs text-indigo-600 shadow-2xs">
                        ✓
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 text-sm block">{s.subject}</span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {s.topics?.length || 0} Canonical Topics
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">
                        Starting Level
                      </span>
                      <Badge variant="primary" className="text-xs font-extrabold mt-0.5">
                        {s.studentLevel}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons (Section 7) */}
            <div className="pt-2 space-y-2.5">
              {hasActiveSavedSession ? (
                <>
                  <Button
                    variant="primary"
                    onClick={handleResumeAssessment}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm sm:text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Resume Active Assessment</span>
                    <ArrowRight size={18} />
                  </Button>
                  <button
                    type="button"
                    onClick={handleStartAssessment}
                    className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Or start a fresh assessment session
                  </button>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleStartAssessment}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm sm:text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Assessment</span>
                  <ArrowRight size={18} />
                </Button>
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Active Assessment Question Stage
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {sessionState?.currentQuestion ? (
          <AssessmentQuestionCard
            key={sessionState.currentQuestion.questionId}
            question={sessionState.currentQuestion}
            questionNumber={(sessionState.currentQuestionIndex || 0) + 1}
            totalQuestions={sessionState.targetQuestionsPerSubject || 5}
            difficulty={sessionState.currentDifficulty || 'Easy'}
            subjectName={sessionState.currentSubjectName || 'DSA'}
            topicName={sessionState.currentTopic?.name || sessionState.currentQuestion?.topicName || 'Topic'}
            questionStartTime={sessionState.questionStartTime || Date.now()}
            onSubmit={handleSubmitAnswer}
            onSkip={handleSkipQuestion}
            isSubmitting={isSubmitting}
            feedbackState={feedback}
            preferredLanguage={profile?.preferred_language}
          />
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4">
            <p className="text-sm font-medium text-slate-600">Preparing next question...</p>
            <PageLoader size="md" />
          </div>
        )}
      </div>
    </div>
  );
}
