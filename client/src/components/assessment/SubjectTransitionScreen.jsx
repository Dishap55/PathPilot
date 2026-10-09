import React from 'react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { CheckCircle2, ArrowRight, Sparkles, BookOpen, Clock } from 'lucide-react';

export default function SubjectTransitionScreen({
  completedSubjectName = 'DSA',
  nextSubjectName = 'DBMS',
  currentSubjectIndex = 0,
  totalSubjects = 3,
  questionsEvaluated = 0,
  totalQuestions = 5,
  timeTakenSeconds = 0,
  onContinue,
  isLoading = false
}) {
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    if (mins === 0) return `${remainder}s`;
    return `${mins}m ${remainder}s`;
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm text-center max-w-xl mx-auto space-y-6 animate-fadeIn">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm mx-auto">
        <CheckCircle2 size={32} />
      </div>

      <div className="space-y-2">
        <Badge variant="success" className="px-3 py-1 text-xs font-bold uppercase tracking-wider">
          Subject Module Complete
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {completedSubjectName} Complete 🎉
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Great work! You have finished your diagnostic questions for{' '}
          <span className="font-semibold text-slate-800">{completedSubjectName}</span>.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-around text-xs font-bold text-slate-700">
        <div>
          <span className="text-slate-400 block font-medium">Questions Evaluated</span>
          <span className="text-sm text-slate-900 font-extrabold mt-0.5 block">{questionsEvaluated} / {totalQuestions}</span>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div>
          <span className="text-slate-400 block font-medium">Time Taken</span>
          <span className="text-sm text-indigo-600 font-extrabold mt-0.5 block">{formatTime(timeTakenSeconds)}</span>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div>
          <span className="text-slate-400 block font-medium">Overall Progress</span>
          <span className="text-sm text-emerald-600 font-extrabold mt-0.5 block">
            {currentSubjectIndex + 1} of {totalSubjects} Subjects
          </span>
        </div>
      </div>

      <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl text-left space-y-1">
        <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
          <BookOpen size={14} className="text-indigo-600" />
          <span>Next Subject: {nextSubjectName}</span>
        </div>
        <p className="text-xs text-indigo-800/80 leading-relaxed">
          The adaptive engine will calibrate starting difficulty based on your baseline input for{' '}
          <strong>{nextSubjectName}</strong>.
        </p>
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          onClick={onContinue}
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 mx-auto"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Calibrating {nextSubjectName}...</span>
            </span>
          ) : (
            <>
              <span>Continue to {nextSubjectName}</span>
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
