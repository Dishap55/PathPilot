import React from 'react';
import Button from '../common/Button';

export default function ReassessmentIntro({ topic = 'Two Pointers', onStart }) {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center space-y-4 max-w-lg mx-auto">
      <h3 className="text-lg font-bold text-slate-800">Targeted Topic Reassessment</h3>
      <p className="text-xs text-slate-500">
        You've completed meaningful practice in <b>{topic}</b>. Take this short targeted check to verify mastery and update your roadmap progression.
      </p>
      <Button variant="primary" onClick={onStart}>Start Reassessment</Button>
    </div>
  );
}
