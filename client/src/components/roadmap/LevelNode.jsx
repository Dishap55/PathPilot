import React from 'react';
import MilestoneCard from './MilestoneCard';

/**
 * LevelNode Component
 * Links to /roadmap/milestone/:id via MilestoneCard
 */
export default function LevelNode({ node, isCurrent = false, hasNext = false }) {
  // Target route pattern: /roadmap/milestone/:id
  return <MilestoneCard node={node} isCurrent={isCurrent} hasNext={hasNext} />;
}
