import React from 'react';
import AptitudeTopicIntroduction from '../AptitudeTopicIntroduction';

/**
 * AptitudeIntroductionSection
 * Section 1: Concept Introduction & Interactive 10-Card Carousel
 * 
 * Preserves the existing 10-card learning carousel intact.
 */
export default function AptitudeIntroductionSection({ topic }) {
  if (!topic) return null;

  return (
    <div className="space-y-6 animate-fadeIn" id="aptitude-section-introduction">
      <AptitudeTopicIntroduction
        key={`intro-${topic.topicId}`}
        data={topic.introData}
        introData={topic.introData}
      />
    </div>
  );
}
