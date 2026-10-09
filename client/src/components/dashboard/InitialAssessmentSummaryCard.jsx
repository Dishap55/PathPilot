import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import {
  TrendingUp,
  CheckCircle2,
  Target,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  HelpCircle,
  Award
} from 'lucide-react';

export default function InitialAssessmentSummaryCard({ assessmentResult, showUnassessedSubjects = true }) {
  if (!assessmentResult) {
    return null;
  }

  const { dsaResult, aptitudeResult, overall, aiFeedback, startedAt, completedAt, overallTimeSeconds } = assessmentResult;

  const formatDate = (isoStr) => {
    if (!isoStr) return 'Recently';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return 'Recently';
    }
  };

  const formatTime = (secs) => {
    if (secs === null || secs === undefined) return 'Not recorded';
    if (secs === 0) return '0s';
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    if (mins === 0) return `${remainder}s`;
    return `${mins}m ${remainder}s`;
  };

  const coreCS = [
    { subject: 'DBMS', path: '/learning/dbms', label: 'DBMS' },
    { subject: 'OS', path: '/learning/os', label: 'Operating Systems' },
    { subject: 'OOPS', path: '/learning/oops', label: 'OOPS' },
    { subject: 'CN', path: '/learning/cn', label: 'Computer Networks' }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. "Your Current Level" Card (Section 13) */}
      <Card className="p-5 sm:p-6 lg:p-7">
        <Card.Header>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                <TrendingUp size={17} />
              </div>
              <div>
                <Card.Title>Your Current Level</Card.Title>
                <Card.Description>Verified levels derived from actual diagnostic assessment</Card.Description>
              </div>
            </div>

            <Badge variant="primary" className="self-start sm:self-auto text-xs font-bold">
              Assessed {formatDate(completedAt)}
            </Badge>
          </div>
        </Card.Header>

        {/* 6 Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
          
          {/* DSA (Assessed) */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-900 uppercase tracking-wider">DSA</span>
              <Badge variant="primary" className="text-xs font-black">
                {dsaResult?.assessedLevel || 'Pending'}
              </Badge>
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 block">
                {dsaResult?.assessedLevel || 'Pending'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                {dsaResult?.accuracy == null ? 'Accuracy unavailable' : `${dsaResult.accuracy}% accuracy`}
                {' • '}
                {dsaResult?.questionsAsked == null ? 'Question count unavailable' : `${dsaResult.questionsAsked} questions answered`}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                {Array.isArray(dsaResult?.topicPerformance) ? `${dsaResult.topicPerformance.length} topics assessed` : 'Topic count unavailable'}
              </span>
            </div>
            <div className="pt-1 border-t border-indigo-100/70 flex items-center justify-between text-[11px] text-slate-500">
              <span>Starting: {dsaResult?.startingLevel || 'Not recorded'}</span>
              <span className="font-bold text-indigo-600">Assessed Level</span>
            </div>
          </div>

          {/* Aptitude (Assessed) */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-900 uppercase tracking-wider">Aptitude</span>
              <Badge variant="warning" className="text-xs font-black">
                {aptitudeResult?.assessedLevel || 'Pending'}
              </Badge>
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 block">
                {aptitudeResult?.assessedLevel || 'Pending'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                {aptitudeResult?.accuracy == null ? 'Accuracy unavailable' : `${aptitudeResult.accuracy}% accuracy`}
                {' • '}
                {aptitudeResult?.questionsAsked == null ? 'Question count unavailable' : `${aptitudeResult.questionsAsked} questions answered`}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                {Array.isArray(aptitudeResult?.topicPerformance) ? `${aptitudeResult.topicPerformance.length} topics assessed` : 'Topic count unavailable'}
              </span>
            </div>
            <div className="pt-1 border-t border-amber-100/70 flex items-center justify-between text-[11px] text-slate-500">
              <span>Starting: {aptitudeResult?.startingLevel || 'Not recorded'}</span>
              <span className="font-bold text-amber-700">Assessed Level</span>
            </div>
          </div>

          {/* Unassessed Core CS Subjects (Direct learning from Beginner) */}
          {showUnassessedSubjects && coreCS.map((c, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">{c.subject}</span>
                <Badge variant="neutral" className="text-[10px] font-bold">
                  Beginner
                </Badge>
              </div>
              <div>
                <span className="text-xl font-black text-slate-700 block">
                  Beginner
                </span>
                <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                  Direct learning available
                </span>
              </div>
              <div className="pt-1 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Unassessed</span>
                <Link to={c.path} className="font-bold text-indigo-600 hover:text-indigo-700">
                  Start Learning &rarr;
                </Link>
              </div>
            </div>
          ))}

        </div>
      </Card>

      {/* 2. Assessment Summary Card (Section 14) */}
      <Card className="p-5 sm:p-6">
        <Card.Header>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-indigo-600" />
              <Card.Title>📊 Your Initial Assessment Summary</Card.Title>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Completed {formatDate(completedAt)}
            </span>
          </div>
        </Card.Header>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium block">Questions</span>
            <span className="text-base font-black text-slate-900 mt-0.5 block">
              {overall?.questionsAsked == null ? '—' : `${overall.questionsAsked} / 10`}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium block">Overall Accuracy</span>
            <span className="text-base font-black text-indigo-600 mt-0.5 block">
              {overall?.accuracy == null ? '—' : `${overall.accuracy}%`}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium block">Time Taken</span>
            <span className="text-base font-black text-emerald-600 mt-0.5 block">
              {formatTime(overallTimeSeconds)}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium block">Attempted</span>
            <span className="text-base font-black text-slate-900 mt-0.5 block">
              {overall?.attemptedQuestions == null || overall?.questionsAsked == null
                ? '—'
                : `${overall.attemptedQuestions} of ${overall.questionsAsked}`}
            </span>
          </div>
        </div>

        {/* Explainable Diagnostic Reasons */}
        <div className="space-y-2 pt-2 text-xs">
          {dsaResult?.reason && (
            <div className="p-3 rounded-xl bg-indigo-50/40 border border-indigo-100/70 text-slate-700 leading-relaxed">
              <strong className="text-indigo-900">DSA: </strong>
              {dsaResult.reason}
            </div>
          )}
          {aptitudeResult?.reason && (
            <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-100/70 text-slate-700 leading-relaxed">
              <strong className="text-amber-900">Aptitude: </strong>
              {aptitudeResult.reason}
            </div>
          )}
          {aiFeedback?.summary && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700 leading-relaxed flex items-start gap-2">
              <Sparkles size={15} className="text-indigo-600 shrink-0 mt-0.5" />
              <span>{aiFeedback.summary}</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <Card.Header>
          <div>
            <Card.Title>Confidence &amp; Timing Patterns</Card.Title>
            <Card.Description>Supporting signals from your recorded responses</Card.Description>
          </div>
        </Card.Header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[dsaResult, aptitudeResult].map((subjectResult) => (
            <div key={subjectResult?.subject} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <strong className="text-slate-800">{subjectResult?.subject}</strong>
              <p className="text-slate-600">{subjectResult?.confidenceSummary?.patternDescription || 'Confidence summary unavailable.'}</p>
              <p className="text-slate-500">{subjectResult?.timingSummary?.observation || 'Timing summary unavailable.'}</p>
              <p className="text-slate-500">
                Average response: {subjectResult?.averageTimeSeconds == null ? 'Not recorded' : `${subjectResult.averageTimeSeconds}s`}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Strengths & Focus Areas (Section 15 & 16) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Strengths Card */}
        <Card className="p-5 sm:p-6">
          <Card.Header>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-600" />
              <Card.Title>💪 Your Strengths</Card.Title>
            </div>
            <Card.Description>Topics confirmed with strong assessment accuracy</Card.Description>
          </Card.Header>

          {Array.isArray(overall?.combinedStrengths) && overall.combinedStrengths.length > 0 ? (
            <div className="space-y-2 mt-2">
              {overall.combinedStrengths.map((s, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100/80 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold text-xs">✓</span>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">{s.topicName}</span>
                    <span className="text-[11px] text-slate-500">{s.subject} &bull; {s.statusLabel || 'Accurate problem solving'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : Array.isArray(overall?.combinedStrengths) ? (
            <p className="text-xs text-slate-500 py-3">No topics met the strong evidence threshold in this assessment.</p>
          ) : (
            <p className="text-xs text-slate-500 py-3">Strength data is unavailable for this assessment.</p>
          )}
        </Card>

        {/* Focus Areas Card */}
        <Card className="p-5 sm:p-6">
          <Card.Header>
            <div className="flex items-center gap-2">
              <Target size={17} className="text-indigo-600" />
              <Card.Title>🎯 Focus Areas</Card.Title>
            </div>
            <Card.Description>Recommended topics for deliberate practice</Card.Description>
          </Card.Header>

          {Array.isArray(overall?.combinedFocusAreas) && overall.combinedFocusAreas.length > 0 ? (
            <div className="space-y-2 mt-2">
              {overall.combinedFocusAreas.map((f, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100/80 flex items-start gap-2">
                  <span className="text-indigo-600 font-bold text-xs">&bull;</span>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">{f.topicName}</span>
                    <span className="text-[11px] text-slate-500">{f.subject} &bull; {f.statusLabel || 'More deliberate practice recommended'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : Array.isArray(overall?.combinedFocusAreas) ? (
            <p className="text-xs text-slate-500 py-3">No additional focus areas were identified from these responses.</p>
          ) : (
            <p className="text-xs text-slate-500 py-3">Focus-area data is unavailable for this assessment.</p>
          )}
        </Card>

      </div>

    </div>
  );
}
