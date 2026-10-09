import React, { useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { CheckCircle2, XCircle, Award, Target, BookOpen, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { roadmapService } from '../../services/roadmapService';

export default function ResultSummary({ result }) {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateStep, setGenerateStep] = useState('');
  const [generateError, setGenerateError] = useState('');

  const score = result?.score !== undefined ? result.score : 80;
  const total = result?.total_questions || 8;
  const correct = result?.correct_answers || 6;
  const incorrect = result?.incorrect_answers || (total - correct);
  const subjectBreakdown = result?.subject_breakdown || {};
  const strengths = result?.strengths || ['DSA Core Concepts', 'OOPS Principles'];
  const weakTopics = result?.weakTopics || ['System Protocols', 'SQL Subqueries'];
  const evaluations = result?.evaluations || [];

  const handleGenerateRoadmap = async () => {
    setIsGenerating(true);
    setGenerateError('');
    setGenerateStep('Synthesizing diagnostic performance evidence...');

    try {
      setTimeout(() => {
        setGenerateStep('Calibrating weak area repairs & target milestones...');
      }, 600);

      const response = await roadmapService.generateRoadmap();

      if (response.success) {
        setGenerateStep('Personalized roadmap generated! Redirecting...');
        setTimeout(() => {
          navigate('/roadmap');
        }, 500);
      } else {
        setGenerateError('Failed to generate roadmap. Please try again.');
        setIsGenerating(false);
      }
    } catch (err) {
      setGenerateError(err.message || 'Error synthesizing roadmap.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="text-center pb-6 border-b border-slate-100">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-3 shadow-inner">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Diagnostic Assessment Completed
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          Your initial baseline proficiencies have been calibrated through objective evidence across theory, algorithmic coding, and SQL execution.
        </p>

        {/* Big Score Dial */}
        <div className="mt-6 flex flex-col items-center">
          <div className="text-5xl font-black text-indigo-600 tracking-tight">{score}%</div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
            Overall Objective Score
          </span>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mt-6">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-xs text-slate-500 block">Total Questions</span>
            <span className="text-lg font-bold text-slate-800">{total}</span>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
            <span className="text-xs text-emerald-600 block">Correct</span>
            <span className="text-lg font-bold text-emerald-800">{correct}</span>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-center">
            <span className="text-xs text-rose-600 block">Incorrect</span>
            <span className="text-lg font-bold text-rose-800">{incorrect}</span>
          </div>
        </div>
      </div>

      {/* Six Subjects Performance Breakdown */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          Subject-Wise Baseline Performance
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(subjectBreakdown).map(([code, stats]) => {
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return (
              <div key={code} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700">{code}</span>
                  <span className="text-xs font-mono font-semibold text-slate-600">{stats.correct}/{stats.total}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Weak Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
          <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Demonstrated Strengths
          </h4>
          <ul className="text-xs text-emerald-800 space-y-1.5">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-amber-600" />
            Target Growth Areas
          </h4>
          <ul className="text-xs text-amber-800 space-y-1.5">
            {weakTopics.map((w, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Question Review Accordion */}
      {evaluations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Evaluation Review
          </h3>
          <div className="space-y-2">
            {evaluations.map((ev, idx) => (
              <div key={idx} className="p-3.5 border border-slate-200 rounded-xl text-xs space-y-1 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">Q{idx + 1} ({ev.subject_code} - {ev.type.toUpperCase()})</span>
                    <span className="text-slate-500">{ev.topic}</span>
                  </div>
                  <Badge variant={ev.correct ? 'success' : 'danger'}>
                    {ev.correct ? 'Correct' : 'Needs Practice'}
                  </Badge>
                </div>
                <p className="text-slate-800 font-medium mt-1">{ev.prompt}</p>
                {ev.explanation && (
                  <p className="text-slate-500 italic mt-1 border-t border-slate-100 pt-1">
                    Analysis: {ev.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error alert if generation fails */}
      {generateError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm font-medium text-red-800">{generateError}</p>
        </div>
      )}

      {/* Next Step Guidance Footer */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 text-center sm:text-left">
          <span className="font-semibold text-slate-700">Next Action:</span> Synthesize AI diagnostic insights into your adaptive learning roadmap.
        </div>
        <Button
          variant="primary"
          onClick={handleGenerateRoadmap}
          disabled={isGenerating}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md font-semibold text-sm transition-all"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{generateStep}</span>
            </>
          ) : (
            <>
              <span>Generate Personalized Roadmap</span>
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
