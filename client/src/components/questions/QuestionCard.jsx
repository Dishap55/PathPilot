import React from 'react';
import Badge from '../common/Badge';

export default function QuestionCard({ question }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="primary">{question?.topic || 'General'}</Badge>
        <Badge variant="default">{question?.difficulty || 'Easy'}</Badge>
      </div>
      <h3 className="text-base font-semibold text-slate-900">{question?.prompt || 'Question Prompt'}</h3>
    </div>
  );
}
