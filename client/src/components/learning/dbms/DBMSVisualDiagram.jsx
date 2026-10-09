import React from 'react';
import {
  Database,
  Server,
  Layers,
  ShieldCheck,
  Search,
  Key,
  Network,
  ArrowRight,
  CheckCircle2,
  Lock,
  GitMerge,
  BarChart2,
  Cpu,
  CornerDownRight
} from 'lucide-react';

/**
 * DBMSVisualDiagram Component
 * Interactive visual diagrams tailored specifically for DBMS concepts.
 */
export default function DBMSVisualDiagram({ type, title = '', subtitle = '' }) {
  const renderDiagram = () => {
    switch (type) {
      // 1. 3-Tier ANSI-SPARC Architecture
      case '3-tier-architecture':
      case 'architecture-layers':
        return (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
              <div className="p-3.5 bg-blue-50 border-2 border-blue-200 rounded-2xl">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Level 1</span>
                <h4 className="text-xs font-black text-blue-950 mt-0.5">External Schema (Views)</h4>
                <p className="text-[11px] text-blue-700 mt-1">User 1 (HR View), User 2 (Payroll View), API Consumers</p>
              </div>
              <div className="p-3.5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">Level 2</span>
                <h4 className="text-xs font-black text-indigo-950 mt-0.5">Conceptual Schema (Tables)</h4>
                <p className="text-[11px] text-indigo-700 mt-1">Entities, Relationships, Constraints, Table Schemas</p>
              </div>
              <div className="p-3.5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Level 3</span>
                <h4 className="text-xs font-black text-emerald-950 mt-0.5">Internal Schema (Physical)</h4>
                <p className="text-[11px] text-emerald-700 mt-1">B+ Trees, Disk Blocks, WAL Log, Data Files</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center flex items-center justify-around text-xs text-slate-700 font-semibold">
              <span className="text-indigo-600 font-bold">Logical Data Independence</span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-emerald-600 font-bold">Physical Data Independence</span>
            </div>
          </div>
        );

      // 2. ER Diagram & Cardinality
      case 'er-diagram':
      case 'cardinality-mapping':
        return (
          <div className="py-2 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
              <div className="w-full sm:w-1/3 p-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl">
                <span className="text-[10px] font-black text-emerald-700 uppercase">Entity 1 (Rectangle)</span>
                <h4 className="text-sm font-black text-emerald-950">CUSTOMERS</h4>
                <p className="text-[10px] text-emerald-700 mt-1 font-mono">id (PK), name, email</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 mb-1">1 : N (One-to-Many)</span>
                <div className="p-2 bg-amber-100 text-amber-800 rounded-xl border border-amber-300 font-black text-xs">
                  PLACES
                </div>
              </div>
              <div className="w-full sm:w-1/3 p-3 bg-blue-50 border-2 border-blue-300 rounded-2xl">
                <span className="text-[10px] font-black text-blue-700 uppercase">Entity 2 (Rectangle)</span>
                <h4 className="text-sm font-black text-blue-950">ORDERS</h4>
                <p className="text-[10px] text-blue-700 mt-1 font-mono">order_id (PK), customer_id (FK)</p>
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 text-center font-medium">
              Foreign Key <code className="font-mono bg-white px-1 py-0.5 rounded border text-indigo-700 font-bold">customer_id</code> in Orders maintains referential integrity to Customers table.
            </div>
          </div>
        );

      // 3. Keys Hierarchy
      case 'keys-hierarchy':
      case 'key-circles':
        return (
          <div className="py-2 space-y-2">
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-indigo-200 text-indigo-800 rounded font-black text-[10px]">Super Key</span>
                <span className="text-xs text-indigo-950 font-medium">Any attribute set with uniqueness (e.g. {`{EmpID, Name, SSN}`})</span>
              </div>
              <div className="ml-4 p-2 bg-blue-100/70 border border-blue-300 rounded-xl space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-300 text-blue-900 rounded font-black text-[10px]">Candidate Key</span>
                  <span className="text-xs text-blue-950 font-medium">Minimal Super Key (e.g. {`{EmpID}`} and {`{SSN}`})</span>
                </div>
                <div className="ml-4 p-2 bg-emerald-100/80 border border-emerald-300 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500 text-white rounded font-black text-[10px]">Primary Key</span>
                    <span className="text-xs text-emerald-950 font-bold">Chosen key: {`{EmpID}`} (NOT NULL + UNIQUE)</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">Alternate Key: {`{SSN}`}</span>
                </div>
              </div>
            </div>
          </div>
        );

      // 4. SQL Execution Order
      case 'sql-sublanguages':
      case 'sql-execution-order':
        return (
          <div className="py-2 space-y-2">
            <div className="flex items-center justify-between gap-1 overflow-x-auto text-center text-xs font-mono py-1">
              {[
                { step: '1. FROM', desc: 'Identify & JOIN tables' },
                { step: '2. WHERE', desc: 'Filter raw rows' },
                { step: '3. GROUP BY', desc: 'Group into buckets' },
                { step: '4. HAVING', desc: 'Filter grouped metrics' },
                { step: '5. SELECT', desc: 'Project columns & aliases' },
                { step: '6. ORDER BY', desc: 'Sort final output' }
              ].map((s, idx) => (
                <div key={idx} className="shrink-0 p-2 bg-slate-50 border border-slate-200 rounded-xl text-center min-w-[120px]">
                  <span className="font-black text-indigo-600 block text-[11px]">{s.step}</span>
                  <span className="text-[10px] text-slate-500">{s.desc}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 text-center font-medium italic">
              Notice: WHERE executes before SELECT, which is why column aliases defined in SELECT cannot be referenced in WHERE.
            </p>
          </div>
        );

      // 5. SQL Joins Venn & Table Alignment
      case 'join-venn':
      case 'join-algorithms':
        return (
          <div className="py-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 bg-sky-50 border border-sky-200 rounded-xl">
              <span className="font-black text-sky-800 block text-[11px]">INNER JOIN</span>
              <span className="text-[10px] text-sky-600">Only matching rows in BOTH tables (A ∩ B)</span>
            </div>
            <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl">
              <span className="font-black text-indigo-800 block text-[11px]">LEFT JOIN</span>
              <span className="text-[10px] text-indigo-600">ALL rows from Left + Matched rows from Right</span>
            </div>
            <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl">
              <span className="font-black text-purple-800 block text-[11px]">RIGHT JOIN</span>
              <span className="text-[10px] text-purple-600">ALL rows from Right + Matched rows from Left</span>
            </div>
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="font-black text-emerald-800 block text-[11px]">FULL OUTER</span>
              <span className="text-[10px] text-emerald-600">ALL rows from BOTH tables, padded with NULL</span>
            </div>
          </div>
        );

      // 6. Normalization Ladder
      case 'normalization-stages':
      case 'normal-forms-ladder':
        return (
          <div className="py-2 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-xl">
                <span className="font-black text-amber-900 block text-[11px]">1NF</span>
                <span className="text-[10px] text-amber-700">Atomic Values & No Repeating Groups</span>
              </div>
              <div className="p-2.5 bg-blue-50 border border-blue-300 rounded-xl">
                <span className="font-black text-blue-900 block text-[11px]">2NF</span>
                <span className="text-[10px] text-blue-700">1NF + No Partial Dependencies on Key</span>
              </div>
              <div className="p-2.5 bg-indigo-50 border border-indigo-300 rounded-xl">
                <span className="font-black text-indigo-900 block text-[11px]">3NF</span>
                <span className="text-[10px] text-indigo-700">2NF + No Transitive Dependencies</span>
              </div>
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl">
                <span className="font-black text-emerald-900 block text-[11px]">BCNF</span>
                <span className="text-[10px] text-emerald-700">Strict: In all X -&gt; Y, X MUST be a Super Key</span>
              </div>
            </div>
          </div>
        );

      // 7. Transaction State Machine
      case 'transaction-state-machine':
      case 'acid-pillars':
        return (
          <div className="py-2 space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2 text-center text-xs font-bold">
              <span className="px-3 py-1.5 bg-blue-100 text-blue-800 border border-blue-200 rounded-xl">Active</span>
              <ArrowRight size={14} className="text-slate-400" />
              <span className="px-3 py-1.5 bg-amber-100 text-amber-800 border border-amber-200 rounded-xl">Partially Committed</span>
              <ArrowRight size={14} className="text-slate-400" />
              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl">Committed (WAL Flushed)</span>
            </div>
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-center text-xs text-red-700 font-medium">
              If an error or constraint violation occurs: <span className="font-bold">Failed -&gt; Aborted / Rolled Back</span>
            </div>
          </div>
        );

      // 8. B+ Tree Index Visual
      case 'btree-index':
      case 'bplus-tree-structure':
        return (
          <div className="py-2 space-y-2 text-center">
            <div className="inline-block p-2 bg-indigo-50 border-2 border-indigo-300 rounded-xl text-xs font-black text-indigo-900">
              Root Node: [ Key 50 | Pointer ]
            </div>
            <div className="flex justify-around items-center pt-2">
              <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs font-bold text-blue-900">
                Internal Node (&lt; 50)
              </div>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs font-bold text-blue-900">
                Internal Node (&gt;= 50)
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1 pt-2">
              {['Keys 10,20', 'Keys 30,40', 'Keys 50,60', 'Keys 70,80'].map((leaf, idx) => (
                <div key={idx} className="p-1.5 bg-emerald-50 border border-emerald-300 rounded-md text-[10px] font-bold text-emerald-800">
                  Leaf {idx + 1}: {leaf}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              All leaf nodes are connected via a doubly-linked list for ultra-fast sequential range scans.
            </p>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 text-slate-600 text-xs">
            <Database size={18} className="text-indigo-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-800 block">Relational Concept Model</span>
              <span>Visualizing tables, schemas, and relational integrity constraints.</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2">
      {title && (
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Database size={15} className="text-indigo-600" />
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">{title}</h4>
          {subtitle && <span className="text-[10px] text-slate-400 font-medium">&bull; {subtitle}</span>}
        </div>
      )}
      {renderDiagram()}
    </div>
  );
}
