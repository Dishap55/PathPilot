import React from 'react';
import Button from '../common/Button';

export default function SubmitBar({ onPrev, onNext, onSubmit, isFirst, isLast }) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
      <Button variant="secondary" onClick={onPrev} disabled={isFirst}>Previous</Button>
      <div className="flex gap-2">
        {!isLast && <Button variant="secondary" onClick={onNext}>Next Question</Button>}
        {isLast && <Button variant="primary" onClick={onSubmit}>Submit Assessment</Button>}
      </div>
    </div>
  );
}
