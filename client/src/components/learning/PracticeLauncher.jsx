import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

export default function PracticeLauncher({ questionId = 'q1' }) {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl text-center space-y-3">
      <h3 className="text-base font-bold text-slate-800">Ready to verify your understanding?</h3>
      <p className="text-xs text-slate-500">Attempt practice problems with automated test case validation.</p>
      <Link to={`/question/${questionId}`}>
        <Button variant="primary">Launch Practice Session</Button>
      </Link>
    </div>
  );
}
