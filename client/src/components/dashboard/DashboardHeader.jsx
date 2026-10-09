import React from 'react';

export default function DashboardHeader({ studentName = 'Engineering Scholar' }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, {studentName}</h1>
      <p className="text-xs text-slate-500 mt-1">Here is your placement readiness report and continuous learning loop.</p>
    </div>
  );
}
