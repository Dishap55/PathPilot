import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Sparkles, AlertCircle, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function RoadmapFocusAreasSection({
  focusAreas = [],
  assessmentResult = null,
  hasTakenAssessment = false,
  targetCompany = 'your target company'
}) {
  // Case 1: Student has NOT taken the assessment yet (e.g. newly registered students like Vedika Patil)
  if (!hasTakenAssessment) {
    return (
      <div className="bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-white border border-indigo-200/80 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Target size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Areas to be Focused
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Assessment Required
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Personalized weak points and focus areas are unlocked after completing the diagnostic test.
              </p>
            </div>
          </div>

          <Link to="/assessment/initial" className="self-start sm:self-auto">
            <Button
              variant="primary"
              size="sm"
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
            >
              <span>Take Initial Assessment</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

        <div className="bg-white/90 border border-indigo-100 rounded-xl p-4 text-xs text-slate-600 leading-relaxed flex items-start gap-3">
          <Sparkles size={16} className="text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-800">
              Why take the Initial Assessment?
            </p>
            <p className="mt-0.5 text-slate-600">
              The 10-question assessment evaluates your baseline in <strong>DSA</strong> and <strong>Aptitude</strong>. PathPilot detects your specific conceptual weak points and dynamically re-orders this roadmap to prioritize your focus areas for <strong>{targetCompany}</strong>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Student has taken assessment and has detected focus areas
  if (focusAreas.length > 0) {
    const assessedLevels = assessmentResult?.assessedLevels || {
      DSA: assessmentResult?.dsaResult?.assessedLevel,
      Aptitude: assessmentResult?.aptitudeResult?.assessedLevel
    };

    return (
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Target size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  🎯 Areas to be Focused
                </h2>
                <Badge variant="primary" className="text-[11px] font-bold">
                  {focusAreas.length} {focusAreas.length === 1 ? 'Topic' : 'Topics'} Identified
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Diagnosed from your assessment responses. Prioritize these topics to build interview readiness.
              </p>
            </div>
          </div>

          {(assessedLevels.DSA || assessedLevels.Aptitude) && (
            <div className="flex items-center gap-2 text-xs">
              {assessedLevels.DSA && (
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[11px]">
                  DSA: <strong className="text-indigo-600">{assessedLevels.DSA}</strong>
                </span>
              )}
              {assessedLevels.Aptitude && (
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[11px]">
                  Aptitude: <strong className="text-indigo-600">{assessedLevels.Aptitude}</strong>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Focus Area Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {focusAreas.map((fa, idx) => {
            const isPriority1 = fa.priority === 1 || fa.category === 'FOCUS';
            const subjectLabel = fa.subject || 'DSA';

            return (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-indigo-300 hover:bg-indigo-50/20 transition-all duration-200"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 uppercase tracking-wider">
                      {subjectLabel}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isPriority1
                        ? 'bg-rose-50 border-rose-200 text-rose-700'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}>
                      {isPriority1 ? 'High Priority' : 'Needs Practice'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {fa.topicName}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {fa.reason || 'Diagnosed for targeted practice from recent assessment responses.'}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center justify-between">
                  <span className="font-semibold text-slate-600">
                    Priority {fa.priority || 1} · Diagnostic Weak Point
                  </span>
                  <Link
                    to="/practice"
                    className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>Practice Topic</span>
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200/70 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
          <span>💡 <strong>Personalized Sequence:</strong> The roadmap sequence below has been arranged to target these high-priority focus areas first.</span>
        </div>
      </div>
    );
  }

  // Case 3: Student has taken assessment and all topics met strong mastery
  return (
    <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 sm:p-6 shadow-xs flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Areas to be Focused: Strong Foundation Confirmed!
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Your diagnostic assessment demonstrated consistent mastery across tested topics. Follow the roadmap path below to deepen advanced problem-solving techniques.
          </p>
        </div>
      </div>
    </div>
  );
}
