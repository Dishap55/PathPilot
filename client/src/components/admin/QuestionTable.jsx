import React from 'react';
import Badge from '../common/Badge';

export default function QuestionTable({ questions = [] }) {
  const sample = [
    { id: 'q1', prompt: 'Two Sum Problem', type: 'coding', level: 'beginner', difficulty: 'easy', active: true },
    { id: 'q2', prompt: 'Employee Higher Salary than Manager', type: 'sql', level: 'beginner', difficulty: 'easy', active: true }
  ];
  const list = questions.length ? questions : sample;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600">
        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
          <tr>
            <th className="p-3">Prompt</th>
            <th className="p-3">Type</th>
            <th className="p-3">Level</th>
            <th className="p-3">Difficulty</th>
            <th className="p-3">Active</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {list.map(q => (
            <tr key={q.id} className="hover:bg-slate-50">
              <td className="p-3 font-medium text-slate-900 max-w-xs truncate">{q.prompt}</td>
              <td className="p-3 uppercase font-mono">{q.type}</td>
              <td className="p-3">{q.level}</td>
              <td className="p-3"><Badge variant="default">{q.difficulty}</Badge></td>
              <td className="p-3"><Badge variant="success">Active</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
