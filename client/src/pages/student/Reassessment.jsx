import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import { assessmentEngine } from '../../services/assessment/assessmentEngine';
import { assessmentService } from '../../services/assessmentService';
import { createSubjectAssessmentInput } from '../../services/assessmentInputService';
import AssessmentQuestionCard from '../../components/assessment/AssessmentQuestionCard';
import SubjectTransitionScreen from '../../components/assessment/SubjectTransitionScreen';
import AssessmentCompletionScreen from '../../components/assessment/AssessmentCompletionScreen';
import PeriodicCompletionScreen from '../../components/assessment/PeriodicCompletionScreen';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Loader, { PageLoader } from '../../components/common/Loader';
import {
  Sparkles, Clock, AlertCircle, RotateCcw, BookOpen, ArrowRight,
  ShieldCheck, CheckCircle2, Layers, HelpCircle, Play, ChevronRight, RotateCw, ArrowLeft, Activity
} from 'lucide-react';

export default function Reassessment() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();

  // Lifecycle stage: 'checking' | 'ineligible' | 'intro' | 'active' | 'transition' | 'completed' | 'error'
  const [stage, setStage] = useState('checking');
  const [sessionState, setSessionState] = useState(null);
  const [hasActiveSavedSession, setHasActiveSavedSession] = useState(false);
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Feature: Timer Option Toggle (Step 5.6)
  const [isTimed, setIsTimed] = useState(true);

  // 1. Authentication guard & eligibility check
  useEffect(() => {
    let isMounted = true;

    async function checkEligibilityAndSetup() {
      if (authLoading) return;

      if (!user) {
        navigate('/login', { state: { returnTo: '/reassessment' }, replace: true });
        return;
      }

      try {
        // Check for active periodic session
        const existingState = assessmentEngine.getState();
        const hasExisting = Boolean(
          existingState && 
          existingState.assessmentType === 'periodic' && 
          existingState.status && 
          existingState.status !== 'completed'
        );

        if (hasExisting && isMounted) {
          setHasActiveSavedSession(true);
          setSessionState(existingState);
        }

        // Fetch history to verify eligibility
        let isEligible = false;
          try {
            const res = await assessmentService.getAssessmentHistory();
            const attempts = res?.data?.attempts || res?.attempts || res || [];
            
            if (isMounted) {
              setAssessmentHistory(attempts);
            }

            // Reassessment eligibility: Needs at least one completed initial assessment with DSA & Aptitude results
            const latestQualifiedAttempt = attempts.find(attempt => 
              attempt.subjectResults?.dsaResult?.assessedLevel && 
              attempt.subjectResults?.aptitudeResult?.assessedLevel
            );

          if (latestQualifiedAttempt) {
            isEligible = true;
          }
        } catch (e) {
          console.warn('[Reassessment] Eligibility check error:', e);
        }

        if (!isMounted) return;

        if (!isEligible && !hasExisting) {
          setStage('ineligible');
          return;
        }

        if (hasExisting) {
          if (existingState.status === 'in_progress') setStage('active');
          else if (existingState.status === 'subject_transition') setStage('transition');
          else if (existingState.status === 'completion_pending') setStage('completed'); // We might want to handle retry completion
          else setStage('intro');
        } else {
          setStage('intro');
        }

      } catch (err) {
        if (isMounted) {
          setErrorMessage(err.message || 'Failed to initialize reassessment.');
          setStage('error');
        }
      }
    }

    checkEligibilityAndSetup();

    return () => {
      isMounted = false;
    };
  }, [user, authLoading, navigate]);

  // Subscribe to assessment engine changes
  useEffect(() => {
    const unsubscribe = assessmentEngine.subscribe((newState) => {
      if (!newState) return;
      if (newState.assessmentType !== 'periodic') return; // Ignore if initial assessment is polluting state

      setSessionState(newState);

      if (newState.status === 'subject_transition') {
        setStage('transition');
      } else if (newState.status === 'completed' || newState.status === 'completion_pending') {
        setStage('completed');
      } else if (newState.status === 'in_progress') {
        setStage('active');
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Start fresh reassessment action
  const handleStartAssessment = async () => {
    setStage('checking');
    setErrorMessage('');

    try {
      // Create a dummy assessment input because the frontend initSession requires it.
      // The backend periodic assessment service ignores it and uses actual history.
      // The frontend configures the 6-subject setup
      const dummyInput = {
        subjects: [
          createSubjectAssessmentInput('DSA', 'Beginner'),
          createSubjectAssessmentInput('Aptitude', 'Beginner'),
          createSubjectAssessmentInput('OOPS', 'Beginner'),
          createSubjectAssessmentInput('DBMS', 'Beginner'),
          createSubjectAssessmentInput('OS', 'Beginner'),
          createSubjectAssessmentInput('CN', 'Beginner')
        ]
      };

      const state = await assessmentEngine.initSession({
        assessmentInput: dummyInput,
        studentId: user?.id || 'demo-student-id',
        forceNew: true,
        targetQuestionsPerSubject: 10,
        assessmentType: 'periodic',
        isTimed: isTimed
      });
      setSessionState(state);
      setHasActiveSavedSession(false);
      setStage('active');
    } catch (err) {
      setErrorMessage(err.message || 'Could not start periodic assessment session.');
      setStage('error');
    }
  };

  // 3. Resume existing active assessment
  const handleResumeAssessment = () => {
    const existing = assessmentEngine.getState();
    if (existing && existing.assessmentType === 'periodic') {
      if (existing.status === 'in_progress') {
        setSessionState(existing);
        setStage('active');
      } else if (existing.status === 'subject_transition') {
        setSessionState(existing);
        setStage('transition');
      } else if (existing.status === 'completion_pending') {
        setSessionState(existing);
        setStage('completed');
      } else {
        handleStartAssessment();
      }
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
      }, 1000);
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
      }, 1000);
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

  if (stage === 'checking' || authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-center max-w-md w-full space-y-4">
          <Loader size="lg" />
          <h3 className="text-base font-bold text-slate-800">Verifying Eligibility</h3>
          <p className="text-xs text-slate-500">Checking your learning milestones and practice activity...</p>
        </div>
      </div>
    );
  }

  if (stage === 'ineligible') {
    return (
      <div className="w-full py-4 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-xl mx-auto space-y-6 pt-4 w-full">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <AlertCircle size={32} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900">Periodic Reassessment Locked</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                Periodic reassessments measure updated conceptual mastery and recalibrate roadmap velocity after deliberate practice.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-2 text-xs">
              <div className="font-bold text-slate-700">Requirements to Unlock:</div>
              <ul className="space-y-1.5 text-slate-500 list-disc list-inside">
                <li>Complete your Initial Assessment first.</li>
                <li>Complete at least one milestone from your personalized roadmap.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link to="/roadmap">
                <Button variant="primary" className="w-full sm:w-auto">
                  <BookOpen size={16} />
                  Return to Roadmap
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white border border-rose-200 rounded-3xl p-8 max-w-md w-full shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">We couldn't prepare your reassessment yet</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{errorMessage}</p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
            <Button variant="secondary" onClick={() => navigate('/dashboard')} className="text-xs">
              Back to Dashboard
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

  if (stage === 'completed' && sessionState) {
    const analysis = sessionState.analysis || assessmentEngine.getCompletedAnalysis();
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        {sessionState.status === 'completion_pending' ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Finalizing Results</h3>
            {sessionState.completionError ? (
              <>
                <p className="text-xs text-rose-600">{sessionState.completionError}</p>
                <Button onClick={() => assessmentEngine.retryCompletion()}>Retry Submission</Button>
              </>
            ) : (
              <Loader size="lg" />
            )}
          </div>
        ) : sessionState.assessmentType === 'periodic' ? (
          <PeriodicCompletionScreen
            analysis={analysis}
            totalSubjects={sessionState.totalSubjects || 6}
            totalQuestionsAnswered={sessionState.responsesCount || 10}
            totalTimeSeconds={sessionState.assessmentStartTime ? Math.round((Date.now() - sessionState.assessmentStartTime) / 1000) : 0}
            subjectMetrics={sessionState.subjectMetrics}
            initialHistory={assessmentHistory}
            onReturnDashboard={() => navigate('/dashboard')}
          />
        ) : (
          <AssessmentCompletionScreen
            analysis={analysis}
            totalSubjects={sessionState.totalSubjects || 2}
            totalQuestionsAnswered={sessionState.responsesCount || 10}
            totalTimeSeconds={sessionState.assessmentStartTime ? Math.round((Date.now() - sessionState.assessmentStartTime) / 1000) : 0}
            subjectMetrics={sessionState.subjectMetrics}
            onReturnDashboard={() => navigate('/dashboard')}
          />
        )}
      </div>
    );
  }

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

  if (stage === 'intro') {
    return (
      <div className="w-full py-4 min-h-screen bg-slate-50">
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          <Link to="/roadmap" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={14} /> Back to Roadmap
          </Link>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100">
                <Sparkles size={24} />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                  Periodic Reassessment
                </span>
                <h1 className="text-xl font-black text-slate-900">Velocity Verification & Recalibration</h1>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              This short diagnostic check measures your updated retention and algorithmic problem-solving speed. Based on your performance, PathPilot will automatically recalibrate your remaining milestone pacing.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Topic Focus</span>
                <span className="text-xs font-bold text-slate-800">All 6 Core Subjects</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Estimated Time</span>
                <span className="text-xs font-bold text-slate-800">60 - 90 Minutes</span>
              </div>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-2 text-xs text-indigo-900">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-indigo-600" />
                Adaptive Recalibration Guarantee:
              </div>
              <p className="text-[11px] leading-relaxed text-indigo-800">
                Your completed milestones, target preparation date, and preferred programming language remain completely intact. Only active and future milestones adjust in pacing and focus.
              </p>
            </div>

            {hasActiveSavedSession && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center justify-between text-xs font-bold animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-amber-600 shrink-0" />
                  <span>Active reassessment session found</span>
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

            {!hasActiveSavedSession && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-slate-800 block">Standard MNC Time Limit</span>
                    <span className="text-[11px] text-slate-500 block">Prepare under real test pressure</span>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isTimed} 
                      onChange={() => setIsTimed(!isTimed)} 
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </div>
                </label>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="pt-2">
              <Button 
                variant="primary" 
                onClick={hasActiveSavedSession ? handleResumeAssessment : handleStartAssessment} 
                className="w-full justify-center py-3 text-sm"
              >
                {hasActiveSavedSession ? 'Resume Periodic Reassessment' : 'Start Periodic Reassessment'} <ChevronRight size={16} />
              </Button>
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
            assessmentType="periodic"
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
