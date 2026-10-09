import React from 'react';
import LevelNode from './LevelNode';
import RoadmapLegend from './RoadmapLegend';

export default function RoadmapMap({ nodes = [] }) {
  const defaultNodes = [
    { id: '1', sequence_no: 1, topic: 'Two Pointers & Sliding Window', status: 'completed' },
    { id: '2', sequence_no: 2, topic: 'Binary Search & Monotonic Arrays', status: 'in_progress' },
    { id: '3', sequence_no: 3, topic: 'SQL Joins & Grouping Aggregations', status: 'unlocked' },
    { id: '4', sequence_no: 4, topic: 'Polymorphism & Dynamic Dispatch', status: 'locked' }
  ];

  const list = nodes.length ? nodes : defaultNodes;

  return (
    <div className="space-y-4">
      <RoadmapLegend />
      <div className="space-y-3">
        {list.map(n => <LevelNode key={n.id} node={n} />)}
      </div>
    </div>
  );
}
