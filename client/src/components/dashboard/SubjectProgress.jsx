import React from 'react';
import SubjectProgressCard from '../progress/SubjectProgressCard';

export default function SubjectProgress() {
  const subjects = [
    { name: 'Data Structures & Algorithms', progress: 65 },
    { name: 'DBMS & SQL', progress: 50 },
    { name: 'Object Oriented Programming', progress: 75 }
  ];
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Subject-Level Readiness</h3>
      {subjects.map((s, idx) => (
        <SubjectProgressCard key={idx} subject={s.name} progress={s.progress} />
      ))}
    </div>
  );
}
