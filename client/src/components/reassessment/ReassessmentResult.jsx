import React from 'react';
import Badge from '../common/Badge';

export default function ReassessmentResult({ score = 90, prevScore = 60 }) {
  const improved = score > prevScore;
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center space-y-4">
      <Badge variant={improved ? 'success' : 'warning'}>{improved ? 'Demonstrated Improvement!' : 'Further Practice Needed'}</Badge>
      <h3 className="text-2xl font-bold text-slate-800">{score}% Score</h3>
      <p className="text-xs text-slate-500">Previous score was {prevScore}%. Roadmap status has been updated accordingly.</p>
    </div>
  );
}
