import React from 'react';
import Button from '../common/Button';

export default function SameLogicPractice({ onTrigger }) {
  return (
    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
      <div>
        <h4 className="text-xs font-bold text-indigo-900">Same-Logic Reinforcement</h4>
        <p className="text-xs text-indigo-700">Practice another problem requiring the same core pattern.</p>
      </div>
      <Button variant="primary" size="sm" onClick={onTrigger}>Try Problem</Button>
    </div>
  );
}
