import React from 'react';

export default function SimilarQuestionCard({ question }) {
  return (
    <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs hover:border-sky-300 cursor-pointer">
      <span className="text-slate-500 font-mono">#{question.id}</span>
      <h5 className="font-semibold text-slate-800 mt-1">{question.prompt}</h5>
    </div>
  );
}
