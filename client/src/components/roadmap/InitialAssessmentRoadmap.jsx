const MILESTONE_CATEGORY_BADGES = {
  FOCUS: {
    label: 'Prioritized Focus Milestone',
    style: 'bg-indigo-50 text-indigo-700 border-indigo-200 font-bold'
  },
  STRONG: {
    label: 'Mastery Milestone',
    style: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
  },
  NEEDS_PRACTICE: {
    label: 'Core Learning Milestone',
    style: 'bg-slate-50 text-slate-700 border-slate-200 font-semibold'
  }
};

export default function InitialAssessmentRoadmap({ roadmap }) {
  const items = Array.isArray(roadmap?.items) ? roadmap.items : [];
  if (!items.length) return null;

  const starting = roadmap.startingLevels || {};
  const assessed = roadmap.assessedLevels || {};

  return (
    <section
      aria-label="Personalized DSA and Aptitude roadmap"
      className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">DSA & Aptitude Personalized Plan</h2>
          <p className="mt-1 text-xs text-slate-500">Ordered learning milestones with recommended actions from your assessment evidence.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          {['DSA', 'Aptitude'].map(subject => (
            <span key={subject} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-slate-600">
              {subject}: Starting {starting[subject] || 'Not recorded'} · Current {assessed[subject] || 'Not recorded'}
            </span>
          ))}
        </div>
      </div>

      <ol className="space-y-3">
        {items.map((item, index) => {
          const badgeConfig = MILESTONE_CATEGORY_BADGES[item.category] || MILESTONE_CATEGORY_BADGES.NEEDS_PRACTICE;

          return (
            <li key={`${item.sequenceNo || index}-${item.itemType}-${item.subject}-${item.topicId || 'review'}`}>
              <article className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 hover:border-indigo-200 transition-all duration-150">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-6 items-center justify-center rounded-full bg-indigo-600 px-2.5 text-[11px] font-bold text-white shadow-xs">
                    Milestone {item.sequenceNo || index + 1}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {item.subject}
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] ${badgeConfig.style}`}>
                    {badgeConfig.label}
                  </span>
                  <span className="ml-auto text-[10px] font-semibold text-slate-500">
                    {item.status.replaceAll('_', ' ')}
                  </span>
                </div>

                <h3 className="mt-2.5 text-sm font-bold text-slate-900">
                  {item.topicName}
                </h3>

                {item.recommendedAction && (
                  <div className="mt-2.5 rounded-lg bg-slate-50/80 border border-slate-200/70 p-2.5 sm:p-3 text-xs text-slate-700 leading-relaxed">
                    <span className="font-semibold text-slate-900">Recommended action: </span>
                    <span>{item.recommendedAction}</span>
                  </div>
                )}

                {item.prerequisites?.length > 0 && (
                  <p className="mt-2 text-[11px] text-slate-500">
                    <span className="font-medium text-slate-600">Prerequisites:</span>{' '}
                    {item.prerequisites.map(prerequisite => prerequisite.topicName || prerequisite.topicId).join(', ')}
                  </p>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
