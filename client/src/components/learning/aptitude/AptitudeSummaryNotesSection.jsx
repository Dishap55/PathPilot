import React from 'react';
import SummaryAndNotes from '../../notes/SummaryAndNotes';

/**
 * AptitudeSummaryNotesSection
 * Section 5: Summary & Notes
 * 
 * Renders:
 * 1. Official PathPilot Notes (read-only formulas, takeaways, shortcuts, common mistakes)
 * 2. Student My Notes (personal notes created explicitly by student with full CRUD)
 */
export default function AptitudeSummaryNotesSection({ topic, officialNotes }) {
  if (!topic) return null;

  return (
    <div className="space-y-6 animate-fadeIn" id="aptitude-section-summary">
      <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-3xl p-6 sm:p-8 shadow-xs">
        <SummaryAndNotes
          subject="Aptitude"
          topicId={topic.topicId}
          topicName={topic.topicName}
          officialNotes={officialNotes}
        />
      </div>
    </div>
  );
}
