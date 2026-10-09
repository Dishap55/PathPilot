import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContinueLearning({
  milestoneId = null,
  topic = 'Binary Search',
  subject = 'DSA'
}) {
  const targetUri = milestoneId ? `/roadmap/milestone/${milestoneId}` : '/roadmap';

  return (
    <div className="p-5 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl text-white flex items-center justify-between shadow-sm">
      <div>
        <span className="text-xs uppercase tracking-wider text-sky-200 font-semibold">{subject} Next Up</span>
        <h3 className="text-lg font-bold mt-0.5">{topic}</h3>
      </div>
      <Link
        to={targetUri}
        className="bg-white text-sky-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-sky-50 flex items-center gap-1 transition-colors shadow-sm"
      >
        Resume <ArrowRight size={14} />
      </Link>
    </div>
  );
}
