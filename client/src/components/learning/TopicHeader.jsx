import React from 'react';
import Badge from '../common/Badge';

export default function TopicHeader({ title, subject, patternSupported }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">{subject}</span>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">{title}</h1>
      </div>
      {patternSupported && <Badge variant="primary">Pattern Oriented</Badge>}
    </div>
  );
}
