import React from 'react';
import Badge from '../common/Badge';

export default function StudentTable({ students = [] }) {
  const sample = [
    { id: '1', name: 'Aarav Sharma', branch: 'CSIT', gradYear: 2026, status: 'active', questionsDone: 45 },
    { id: '2', name: 'Neha Gupta', branch: 'CSIT', gradYear: 2026, status: 'active', questionsDone: 38 }
  ];
  const list = students.length ? students : sample;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600">
        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Branch</th>
            <th className="p-3">Grad Year</th>
            <th className="p-3">Completed Questions</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {list.map(s => (
            <tr key={s.id} className="hover:bg-slate-50">
              <td className="p-3 font-medium text-slate-900">{s.name}</td>
              <td className="p-3">{s.branch}</td>
              <td className="p-3">{s.gradYear}</td>
              <td className="p-3">{s.questionsDone}</td>
              <td className="p-3"><Badge variant="success">{s.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
