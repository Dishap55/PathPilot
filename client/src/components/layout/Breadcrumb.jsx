import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center text-xs text-slate-500 space-x-2 mb-4">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.to ? <Link to={item.to} className="hover:text-slate-700">{item.label}</Link> : <span className="text-slate-800 font-medium">{item.label}</span>}
          {idx < items.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
