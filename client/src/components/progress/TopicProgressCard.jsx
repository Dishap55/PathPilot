import React from 'react';

export default function TopicProgressCard({ topic, accuracy = 80 }) {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-slate-800">{topic}</h4>
        <span className="text-xs text-slate-400">Accuracy: {accuracy}%</span>
      </div>
      <span className="text-xs font-bold text-sky-600">{accuracy}%</span>
    </div>
  );
}
