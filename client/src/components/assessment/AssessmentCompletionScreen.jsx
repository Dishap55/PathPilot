import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Badge from '../common/Badge';
import {
  Trophy,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
  Target
} from 'lucide-react';

export default function AssessmentCompletionScreen({
  analysis = null,
  totalSubjects = 2,
  totalQuestionsAnswered = 10,
  totalTimeSeconds = 0,
  subjectMetrics = [],
  onReturnDashboard
}) {
  const navigate = useNavigate();

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    if (mins === 0) return `${remainder}s`;
    return `${mins}m ${remainder}s`;
  };

  const handleReturn = () => {
    if (onReturnDashboard) {
      onReturnDashboard();
    } else {
      navigate('/dashboard');
    }
  };

  // Extract analysis data if available
  const dsa = analysis?.dsaResult;
  const apt = analysis?.aptitudeResult;
  const overall = analysis?.overall;
  const aiFeedback = analysis?.aiFeedback;

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm text-center max-w-3xl mx-auto space-y-8 animate-fadeIn font-sans">
      
      {/* Header & Celebration */}
      <div className="space-y-3">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-600 border border-amber-200 shadow-sm mx-auto">
          <Trophy size={42} className="text-amber-600 animate-float-in-place" />
        </div>
        <div className="space-y-1">
          <Badge variant="primary" className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            Diagnostic Baseline Established
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            🎉 Assessment Complete!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            You've completed your initial PathPilot skill assessment. Your performance has been evaluated to determine your optimal starting point.
          </p>
        </div>
      </div>

      {/* Top 3 Quick Metrics Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
          <span className="text-slate-400 block text-[11px] font-bold">Assessed Subjects</span>
          <span className="text-base sm:text-lg font-black text-slate-900 mt-0.5 block">2 (DSA & Aptitude)</span>
        </div>
        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
          <span className="text-slate-400 block text-[11px] font-bold">Questions Evaluated</span>
          <span className="text-base sm:text-lg font-black text-indigo-600 mt-0.5 block">
            {overall?.questionsAsked ?? totalQuestionsAnswered ?? 0} / 10
          </span>
        </div>
        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
          <span className="text-slate-400 block text-[11px] font-bold">Total Session Time</span>
          <span className="text-base sm:text-lg font-black text-emerald-600 mt-0.5 block">
            {formatTime(analysis?.overallTimeSeconds || totalTimeSeconds)}
          </span>
        </div>
      </div>

      {/* Assessed Level Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        
        {/* DSA Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-white border border-indigo-100/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
              Data Structures & Algorithms
            </span>
            <Badge variant="primary" className="text-xs font-bold">
              {dsa?.assessedLevel || 'Pending'}
            </Badge>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Assessed Starting Level</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
              <span>{dsa?.assessedLevel || 'Pending'}</span>
              <TrendingUp size={18} className="text-indigo-600" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
              <span>Accuracy: {dsa?.accuracy ?? 0}%</span>
              <span>&bull;</span>
              <span>{dsa?.questionsAsked ?? 0} Questions</span>
              <span>&bull;</span>
              <span className="text-[11px] text-slate-400">Starting: {dsa?.startingLevel || 'Not recorded'}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-white/80 p-3 rounded-xl border border-indigo-50">
            {dsa?.reason || 'Assessment analysis is not available yet.'}
          </p>
        </div>

        {/* Aptitude Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/40 to-white border border-amber-100/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-700">
              Quantitative & Logical Aptitude
            </span>
            <Badge variant="warning" className="text-xs font-bold">
              {apt?.assessedLevel || 'Pending'}
            </Badge>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Assessed Starting Level</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
              <span>{apt?.assessedLevel || 'Pending'}</span>
              <TrendingUp size={18} className="text-amber-600" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
              <span>Accuracy: {apt?.accuracy ?? 0}%</span>
              <span>&bull;</span>
              <span>{apt?.questionsAsked ?? 0} Questions</span>
              <span>&bull;</span>
              <span className="text-[11px] text-slate-400">Starting: {apt?.startingLevel || 'Not recorded'}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-white/80 p-3 rounded-xl border border-amber-50">
            {apt?.reason || 'Assessment analysis is not available yet.'}
          </p>
        </div>

      </div>

      {/* AI Mentor Interpretation (if available) */}
      {aiFeedback?.summary && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-sky-50/50 to-white border border-indigo-100/90 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
            <Sparkles size={16} className="text-indigo-600" />
            <span>AI Mentor Assessment Synthesis</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {aiFeedback.summary}
          </p>
        </div>
      )}

      {/* Strengths & Focus Areas Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs">
        {/* Strengths */}
        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Verified Strengths</span>
          </div>
          {overall?.combinedStrengths && overall.combinedStrengths.length > 0 ? (
            <ul className="space-y-1.5">
              {overall.combinedStrengths.slice(0, 4).map((s, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-slate-700">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <div>
                    <span className="font-bold text-slate-800">{s.topicName}</span>
                    <span className="text-[11px] text-slate-400 block">{s.statusLabel || 'Demonstrated accuracy'}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-[11px]">Consistent diagnostic foundation demonstrated.</p>
          )}
        </div>

        {/* Focus Areas */}
        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center gap-1.5 font-bold text-indigo-900">
            <Target size={16} className="text-indigo-600 shrink-0" />
            <span>Recommended Focus Areas</span>
          </div>
          {overall?.combinedFocusAreas && overall.combinedFocusAreas.length > 0 ? (
            <ul className="space-y-1.5">
              {overall.combinedFocusAreas.slice(0, 4).map((f, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-slate-700">
                  <span className="text-indigo-500 font-bold">&bull;</span>
                  <div>
                    <span className="font-bold text-slate-800">{f.topicName}</span>
                    <span className="text-[11px] text-slate-400 block">{f.statusLabel || 'More deliberate practice recommended'}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-[11px]">Continue structured progression in core modules.</p>
          )}
        </div>
      </div>

      {/* Unassessed Core Subjects Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-left flex items-start gap-3">
        <BookOpen size={18} className="text-slate-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 space-y-0.5">
          <span className="font-bold text-slate-800 block">Core CS Subjects Available Directly</span>
          <p>
            DBMS, OS, OOPS, and CN are not part of the initial skill assessment. You can begin learning them directly from <strong>Beginner</strong> level on your dashboard.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <Button
          variant="primary"
          onClick={handleReturn}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <span>View My Learning Plan →</span>
          <ArrowRight size={18} />
        </Button>
      </div>

    </div>
  );
}
