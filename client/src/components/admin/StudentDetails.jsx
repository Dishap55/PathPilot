import React from 'react';

export default function StudentDetails({ student }) {
  if (!student) return null;
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 text-xs">
      <h4 className="text-sm font-bold text-slate-800">{student.name}</h4>
      <p>Degree: {student.degree} • Branch: {student.branch}</p>
      <p>Target Date: {student.targetDate}</p>
    </div>
  );
}
