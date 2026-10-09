import React from 'react';
import { TrendingUp, CheckCircle2, Clock, Target, ArrowRight, Activity, TrendingDown, Minus } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function PeriodicCompletionScreen({
  analysis,
  totalSubjects,
  totalQuestionsAnswered,
  totalTimeSeconds,
  subjectMetrics = {},
  onReturnDashboard,
  initialHistory
}) {
  const formatTime = (secs) => {
    if (!secs) return '0m 0s';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const getLevelDelta = (oldLvl, newLvl) => {
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Master'];
    const oldIdx = levels.indexOf(oldLvl);
    const newIdx = levels.indexOf(newLvl);
    if (oldIdx === -1 || newIdx === -1) return 0;
    return newIdx - oldIdx;
  };

  // Build the comparison data array for the 6 subjects
  const comparisonData = Object.keys(subjectMetrics).map((key) => {
    const newMetric = subjectMetrics[key];
    const subjectName = newMetric.subject;
    
    // Find initial metric from history (simulated for now if not passed)
    let initialLvl = 'Beginner';
    let initialAcc = 0;

    if (initialHistory && initialHistory.length > 0) {
      const baseline = initialHistory[0]; // Most recent past attempt
      
      // The history might store subjects in an array (subjectMetrics) or directly on the result object
      const pastSubjects = baseline.subjectResults?.subjectMetrics || [];
      const pastMatch = pastSubjects.find(s => s.subject === subjectName);
      
      if (pastMatch) {
        initialLvl = pastMatch.assessedLevel || 'Beginner';
        initialAcc = pastMatch.accuracy || 0;
      } else if (subjectName === 'DSA') {
        initialLvl = baseline.subjectResults?.dsaResult?.assessedLevel || 'Beginner';
        initialAcc = baseline.subjectResults?.dsaResult?.accuracy || 0;
      } else if (subjectName === 'Aptitude') {
        initialLvl = baseline.subjectResults?.aptitudeResult?.assessedLevel || 'Beginner';
        initialAcc = baseline.subjectResults?.aptitudeResult?.accuracy || 0;
      }
    }

    const newLvl = newMetric.assessedLevel || 'Beginner';
    const newAcc = newMetric.accuracy || 0;

    const levelDelta = getLevelDelta(initialLvl, newLvl);
    const accDelta = newAcc - initialAcc;

    return {
      subject: subjectName,
      oldLvl,
      newLvl,
      oldAcc: initialAcc,
      newAcc,
      levelDelta,
      accDelta,
      questions: newMetric.questionsAnswered || 0,
      time: newMetric.timeSpent || 0
    };
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-center animate-fade-in-up">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <Activity size={32} />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Periodic Reassessment Complete
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
            Your new performance data has been analyzed. We've compared your results against your initial baseline to visualize your real growth and recalibrate your roadmap.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4">
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
            <span className="text-slate-400 block text-[11px] font-bold">Total Evaluated</span>
            <span className="text-base sm:text-lg font-black text-slate-800 mt-0.5 block">
              {totalQuestionsAnswered} / {totalSubjects * 10}
            </span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
            <span className="text-slate-400 block text-[11px] font-bold">Session Time</span>
            <span className="text-base sm:text-lg font-black text-emerald-600 mt-0.5 block">
              {formatTime(totalTimeSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {comparisonData.map((data, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-black uppercase tracking-wider text-indigo-900">
                {data.subject}
              </span>
              {data.levelDelta > 0 ? (
                <Badge variant="success" className="text-[10px] uppercase font-bold flex items-center gap-1">
                  <TrendingUp size={10} /> +{data.levelDelta} Level
                </Badge>
              ) : data.levelDelta < 0 ? (
                <Badge variant="danger" className="text-[10px] uppercase font-bold flex items-center gap-1">
                  <TrendingDown size={10} /> Level Drop
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] uppercase font-bold flex items-center gap-1">
                  <Minus size={10} /> Maintained
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Baseline</span>
                <div className="font-bold text-slate-700 text-sm">{data.oldLvl}</div>
                <div className="text-[11px] text-slate-500">{data.oldAcc}% Acc</div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase">New Result</span>
                <div className="font-black text-indigo-900 text-sm">{data.newLvl}</div>
                <div className="text-[11px] font-bold text-indigo-700">{data.newAcc}% Acc</div>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between text-xs border border-slate-100">
              <span className="text-slate-500 font-medium">Accuracy Growth</span>
              <span className={`font-black ${data.accDelta > 0 ? 'text-emerald-600' : data.accDelta < 0 ? 'text-rose-500' : 'text-slate-600'}`}>
                {data.accDelta > 0 ? '+' : ''}{data.accDelta}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-left flex items-start gap-3">
        <Target size={18} className="text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-900 space-y-1">
          <span className="font-bold block">Roadmap Recalibrated</span>
          <p className="opacity-90 leading-relaxed">
            Your personalized learning path has been automatically updated based on these new reassessment results. Weak areas have been prioritized and strengths have been fast-tracked.
          </p>
        </div>
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          onClick={onReturnDashboard}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 mx-auto"
        >
          <span>View Recalibrated Roadmap</span>
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
