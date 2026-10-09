import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, ArrowRight, Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { CANONICAL_SUBJECTS, SUBJECT_CONFIG, getSubjectStyle } from '../../components/roadmap/SubjectConfig';
import SubjectProgressChart from '../../components/dashboard/SubjectProgressChart';
import Card from '../../components/common/Card';

const SUBJECT_DETAILS = {
  DSA: {
    fullName: 'Data Structures & Algorithms',
    topics: ['Arrays & Strings', 'Two Pointers & Sliding Window', 'Trees & BST', 'Dynamic Programming', 'Graphs'],
    description: 'Algorithmic fundamentals, spatial-temporal complexity analysis, and pattern-based interview problem solving.'
  },
  OOPS: {
    fullName: 'Object-Oriented Programming',
    topics: ['Encapsulation & Abstraction', 'Inheritance & Polymorphism', 'Virtual Functions', 'Design Patterns'],
    description: 'Core object-oriented paradigms, class modeling, design patterns, and clean code architecture.'
  },
  APT: {
    fullName: 'Quantitative & Logical Aptitude',
    topics: ['Arithmetic & Algebra', 'Permutations & Probability', 'Logical Reasoning', 'Data Interpretation'],
    description: 'Mathematical problem solving, analytical reasoning, and speed assessment for initial placement screening.'
  },
  DBMS: {
    fullName: 'Database Management Systems',
    topics: ['SQL Queries & Joins', 'Normalization (1NF-BCNF)', 'Indexing & B-Trees', 'Transactions & ACID'],
    description: 'Relational database architecture, relational schema optimization, query profiling, and ACID transaction semantics.'
  },
  OS: {
    fullName: 'Operating Systems',
    topics: ['Process Scheduling', 'Concurrency & Deadlocks', 'Virtual Memory & Paging', 'File Systems'],
    description: 'Kernel-level abstractions, concurrency, memory management, synchronization primitives, and I/O subsystems.'
  },
  CN: {
    fullName: 'Computer Networks',
    topics: ['OSI & TCP/IP Layers', 'Routing & Switching', 'TCP vs UDP Protocols', 'DNS, HTTP & Security'],
    description: 'Network communication protocols, packet flow analysis, transport-layer mechanics, and distributed networking fundamentals.'
  }
};

export default function Subjects() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      {/* 1. Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <BookOpen size={16} />
          <span>Curriculum & Competencies</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Core Engineering Subjects
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
          PathPilot covers all 6 canonical placement competencies. Master theory, solve deliberate practice problems, and bloom concepts in your Learning Garden.
        </p>
      </div>

      {/* 2. Canonical Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CANONICAL_SUBJECTS.map((code) => {
          const style = getSubjectStyle(code);
          const detail = SUBJECT_DETAILS[code] || {};

          return (
            <div
              key={code}
              className={`p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${style.badge}`}>
                    {code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    5 Modules
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {detail.fullName || style.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {detail.description}
                  </p>
                </div>

                {/* Key Topic Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(detail.topics || []).slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 text-[10px] font-medium text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                  {(detail.topics?.length || 0) > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold text-slate-400">
                      +{detail.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button linking to DSA page or Roadmap */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={
                    code === 'DSA'
                      ? '/subjects/dsa'
                      : code === 'APT'
                      ? '/aptitude'
                      : code === 'OOPS'
                      ? '/subjects/oops'
                      : code === 'DBMS'
                      ? '/subjects/dbms'
                      : code === 'OS'
                      ? '/subjects/os'
                      : code === 'CN'
                      ? '/subjects/cn'
                      : '/roadmap'
                  }
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 transition-colors group cursor-pointer"
                >
                  <span>
                    {code === 'DSA'
                      ? 'Explore DSA Studio'
                      : code === 'APT'
                      ? 'Explore Aptitude Studio'
                      : code === 'OOPS'
                      ? 'Explore OOPS Studio'
                      : code === 'DBMS'
                      ? 'Explore DBMS Studio'
                      : code === 'OS'
                      ? 'Explore OS Studio'
                      : code === 'CN'
                      ? 'Explore CN Studio'
                      : 'Explore in Roadmap'}
                  </span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/practice"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Practice
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Deep-Dive Subject Progress & Mastery Chart */}
      <Card className="p-5 sm:p-6">
        <Card.Header>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
              <Layers size={17} />
            </div>
            <div>
              <Card.Title>Real-Time Subject Mastery Analytics</Card.Title>
              <Card.Description>Select any subject to view live proficiency trajectory</Card.Description>
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          <SubjectProgressChart />
        </Card.Content>
      </Card>
    </div>
  );
}
