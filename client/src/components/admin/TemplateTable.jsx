import React from 'react';
import Badge from '../common/Badge';

export default function TemplateTable({ templates = [] }) {
  const sample = [
    { id: 't1', name: 'DSA Diagnostic Assessment', subject: 'DSA', level: 'beginner', duration: 45, status: 'published' }
  ];
  const list = templates.length ? templates : sample;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-600">
        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
          <tr>
            <th className="p-3">Template Name</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Level</th>
            <th className="p-3">Duration</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {list.map(t => (
            <tr key={t.id} className="hover:bg-slate-50">
              <td className="p-3 font-medium text-slate-900">{t.name}</td>
              <td className="p-3">{t.subject}</td>
              <td className="p-3">{t.level}</td>
              <td className="p-3">{t.duration} mins</td>
              <td className="p-3"><Badge variant="primary">{t.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
