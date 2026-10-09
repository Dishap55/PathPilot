import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  ShieldAlert,
  HardDrive,
  Workflow,
  FolderTree,
  Activity,
  Clock,
  Zap,
  Repeat,
  Binary,
  Lock,
  Share2,
  FileCode,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react';

/**
 * OSVisualDiagram Component
 * Renders concept-specific static and dynamic diagrams for Operating Systems.
 */
export default function OSVisualDiagram({ type, title, interactive = true }) {
  const [activeStep, setActiveStep] = useState(0);

  // 1. CPU SCHEDULING FLOWCHART
  if (type === 'cpu-scheduling-flow' || type === 'scheduling-queue') {
    return (
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-purple-400 font-black text-xs uppercase tracking-wider">
            <Cpu size={16} />
            <span>{title || 'CPU Scheduling & Ready Queue Architecture'}</span>
          </div>
          <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
            Kernel Subsystem
          </span>
        </div>

        {/* Diagram Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-center text-xs">
          {/* New / I/O Arrival */}
          <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Arrival</span>
            <div className="font-bold text-blue-400">Process Arrives</div>
            <div className="text-[10px] text-slate-400">New or I/O Done</div>
          </div>

          <div className="hidden sm:flex justify-center text-purple-400">
            <ArrowRight size={20} />
          </div>

          {/* Ready Queue */}
          <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl space-y-1 relative">
            <div className="absolute -top-2 right-2 px-1.5 py-0.2 bg-purple-600 text-[9px] rounded font-black">
              FIFO / Priority
            </div>
            <span className="text-[10px] text-purple-300 uppercase font-bold block">Ready Queue</span>
            <div className="flex justify-center gap-1 my-1">
              <span className="px-1.5 py-0.5 bg-purple-700 rounded text-[10px] font-mono">P1</span>
              <span className="px-1.5 py-0.5 bg-purple-800 rounded text-[10px] font-mono">P2</span>
              <span className="px-1.5 py-0.5 bg-purple-900 rounded text-[10px] font-mono">P3</span>
            </div>
            <div className="text-[10px] text-slate-300">Awaiting Dispatch</div>
          </div>

          <div className="hidden sm:flex justify-center text-purple-400">
            <ArrowRight size={20} />
          </div>

          {/* CPU Core */}
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-1">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">CPU Execution</span>
            <div className="font-black text-emerald-400 flex items-center justify-center gap-1">
              <Cpu size={14} /> Core 0
            </div>
            <div className="text-[10px] text-slate-400">Quantum / Burst</div>
          </div>
        </div>

        {/* Feedback / Preemption Loop */}
        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-slate-300">Completion Decisions:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              Completed &rarr; Terminate & Free PCB
            </span>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
              Timer Tick &rarr; Preempt to Ready Queue Tail
            </span>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
              I/O Call &rarr; Block to Waiting Queue
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. PROCESS LIFECYCLE 5-STATE MACHINE
  if (type === 'process-lifecycle' || type === 'process-state-machine') {
    const states = [
      { id: 'new', name: 'NEW', color: 'border-slate-500 bg-slate-800 text-slate-200', desc: 'Process is created' },
      { id: 'ready', name: 'READY', color: 'border-blue-500 bg-blue-950/60 text-blue-300', desc: 'In RAM, ready for CPU' },
      { id: 'running', name: 'RUNNING', color: 'border-emerald-500 bg-emerald-950/60 text-emerald-300', desc: 'Instructions executing on CPU' },
      { id: 'waiting', name: 'WAITING', color: 'border-amber-500 bg-amber-950/60 text-amber-300', desc: 'Blocked on I/O or event' },
      { id: 'terminated', name: 'TERMINATED', color: 'border-rose-500 bg-rose-950/60 text-rose-300', desc: 'Finished, awaiting parent wait()' }
    ];

    return (
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-blue-400 font-black text-xs uppercase tracking-wider">
            <Workflow size={16} />
            <span>{title || '5-State Process Lifecycle Machine'}</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400">Click a state to inspect</span>
        </div>

        {/* State Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
          {states.map((st, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={st.id}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${st.color} ${
                  isSelected ? 'ring-2 ring-white scale-105 shadow-lg' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <div className="text-xs font-black tracking-wider">{st.name}</div>
                <div className="text-[10px] mt-1 text-slate-400 line-clamp-1">{st.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Transition Arrows & Detail */}
        <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-2">
          <div className="font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>State: <strong className="text-blue-300">{states[activeStep].name}</strong> &mdash; {states[activeStep].desc}</span>
          </div>
          <div className="text-slate-300 text-[11px] leading-relaxed">
            {activeStep === 0 && 'The program binary is read from disk. The OS kernel allocates a PID and initializes the Process Control Block (PCB).'}
            {activeStep === 1 && 'The process resides in physical RAM inside the Ready Queue. It is prepared to execute as soon as the short-term CPU scheduler dispatches it.'}
            {activeStep === 2 && 'CPU registers and program counter point to process instructions. Execution continues until a time quantum expires, I/O is requested, or it terminates.'}
            {activeStep === 3 && 'The process invoked a blocking system call (e.g. read(), sleep()). It leaves the CPU and waits in the device I/O queue until an interrupt occurs.'}
            {activeStep === 4 && 'The process finished execution via exit(). Resources (RAM, file descriptors) are released, but PCB persists as a Zombie until parent calls wait().'}
          </div>
        </div>
      </div>
    );
  }

  // 3. PROCESS CONTROL BLOCK (PCB)
  if (type === 'pcb-layout' || type === 'dispatcher-architecture') {
    const pcbFields = [
      { field: 'Process ID (PID)', val: '1048', color: 'text-purple-400' },
      { field: 'Process State', val: 'RUNNING', color: 'text-emerald-400' },
      { field: 'Program Counter (PC)', val: '0x7FFF0042A100', color: 'text-amber-400 font-mono' },
      { field: 'CPU Registers', val: 'RAX, RBX, RCX, RSP, RBP', color: 'text-blue-400 font-mono' },
      { field: 'Scheduling Info', val: 'Priority: 10, Nice: 0', color: 'text-indigo-400' },
      { field: 'Memory Limits', val: 'Page Table Base (CR3)', color: 'text-cyan-400 font-mono' },
      { field: 'Open Files', val: '[0: stdin, 1: stdout, 2: stderr, 3: socket]', color: 'text-slate-300 font-mono' }
    ];

    return (
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-black text-xs uppercase tracking-wider">
            <FileCode size={16} />
            <span>{title || 'Process Control Block (PCB) Struct Layout'}</span>
          </div>
          <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
            sizeof(task_struct)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {pcbFields.map((f, i) => (
            <div key={i} className="p-2.5 bg-slate-800/80 border border-slate-700/70 rounded-xl flex items-center justify-between">
              <span className="font-bold text-slate-300">{f.field}:</span>
              <span className={`font-semibold text-[11px] ${f.color}`}>{f.val}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. RESOURCE ALLOCATION GRAPH (RAG) & DEADLOCK
  if (type === 'rag-deadlock' || type === 'coffman-conditions' || type === 'rag-components') {
    return (
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-wider">
            <ShieldAlert size={16} />
            <span>{title || 'Resource Allocation Graph & Circular Wait'}</span>
          </div>
          <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
            Deadlock Condition
          </span>
        </div>

        {/* Circular Dependency Graph Graphic */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-4 text-xs">
          {/* P1 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-full bg-blue-600/30 border-2 border-blue-400 flex items-center justify-center font-black text-blue-300 shadow-md">
              P1
            </div>
            <span className="text-[10px] text-slate-400">Process 1</span>
          </div>

          <div className="text-rose-400 font-bold flex flex-col items-center">
            <span className="text-[10px] text-amber-300">Holds R1 &rarr;</span>
            <span className="text-[10px] text-rose-400">&larr; Requests R2</span>
          </div>

          {/* R1 & R2 */}
          <div className="flex flex-col gap-3">
            <div className="px-3 py-2 bg-amber-950/40 border-2 border-amber-500 rounded-lg text-center">
              <span className="font-bold text-amber-300 text-xs">Resource R1</span>
              <div className="w-2 h-2 rounded-full bg-amber-400 mx-auto mt-1" title="1 Instance" />
            </div>
            <div className="px-3 py-2 bg-amber-950/40 border-2 border-amber-500 rounded-lg text-center">
              <span className="font-bold text-amber-300 text-xs">Resource R2</span>
              <div className="w-2 h-2 rounded-full bg-amber-400 mx-auto mt-1" title="1 Instance" />
            </div>
          </div>

          <div className="text-rose-400 font-bold flex flex-col items-center">
            <span className="text-[10px] text-rose-400">Requests R1 &rarr;</span>
            <span className="text-[10px] text-amber-300">&larr; Holds R2</span>
          </div>

          {/* P2 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-full bg-purple-600/30 border-2 border-purple-400 flex items-center justify-center font-black text-purple-300 shadow-md">
              P2
            </div>
            <span className="text-[10px] text-slate-400">Process 2</span>
          </div>
        </div>

        {/* Coffman Conditions Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {[
            { name: '1. Mutual Exclusion', status: 'Non-shareable R1 & R2' },
            { name: '2. Hold & Wait', status: 'P1 holds R1, wants R2' },
            { name: '3. No Preemption', status: 'Cannot force release' },
            { name: '4. Circular Wait', status: 'Cycle: P1 -> R2 -> P2 -> R1 -> P1' }
          ].map((c, i) => (
            <div key={i} className="p-2.5 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-0.5">
              <span className="font-extrabold text-rose-300 text-[11px] block">{c.name}</span>
              <span className="text-[10px] text-slate-400">{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. PAGING & ADDRESS TRANSLATION
  if (type === 'paging-mmu' || type === 'address-translation' || type === 'pte-structure') {
    return (
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
            <Layers size={16} />
            <span>{title || 'Hardware Address Translation (Virtual to Physical)'}</span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
            MMU Hardware Flow
          </span>
        </div>

        {/* Translation Flow Graphic */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-xs text-center">
          {/* Virtual Address */}
          <div className="p-3.5 bg-blue-950/40 border border-blue-500/40 rounded-xl space-y-2">
            <span className="text-[10px] uppercase font-bold text-blue-300">Virtual Address (CPU)</span>
            <div className="flex border border-blue-400 rounded-lg overflow-hidden font-mono text-xs">
              <div className="bg-blue-800/80 px-2 py-1.5 flex-1 font-bold">Page # (p)</div>
              <div className="bg-blue-900/80 px-2 py-1.5 flex-1 font-bold">Offset (d)</div>
            </div>
            <span className="text-[10px] text-slate-400 block">e.g. Page 2, Offset 140</span>
          </div>

          {/* Page Table */}
          <div className="p-3.5 bg-slate-800 border-2 border-emerald-500 rounded-xl space-y-2 shadow-lg">
            <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center justify-center gap-1">
              <Binary size={12} /> Page Table (RAM)
            </span>
            <div className="font-mono text-[10px] space-y-1">
              <div className="flex justify-between px-2 py-0.5 bg-slate-900 rounded text-slate-400">
                <span>Page 0</span><span>&rarr; Frame 5</span>
              </div>
              <div className="flex justify-between px-2 py-0.5 bg-emerald-900/60 rounded text-emerald-300 font-bold border border-emerald-500/40">
                <span>Page 2</span><span>&rarr; Frame 8 (Valid)</span>
              </div>
              <div className="flex justify-between px-2 py-0.5 bg-slate-900 rounded text-slate-400">
                <span>Page 3</span><span>&rarr; Frame 1</span>
              </div>
            </div>
          </div>

          {/* Physical Address */}
          <div className="p-3.5 bg-purple-950/40 border border-purple-500/40 rounded-xl space-y-2">
            <span className="text-[10px] uppercase font-bold text-purple-300">Physical Address (RAM)</span>
            <div className="flex border border-purple-400 rounded-lg overflow-hidden font-mono text-xs">
              <div className="bg-purple-800/80 px-2 py-1.5 flex-1 font-bold">Frame # (f = 8)</div>
              <div className="bg-blue-900/80 px-2 py-1.5 flex-1 font-bold">Offset (d = 140)</div>
            </div>
            <span className="text-[10px] text-emerald-400 block font-mono font-bold">Address = (8 * 4096) + 140</span>
          </div>
        </div>

        <div className="p-3 bg-slate-800/80 rounded-xl text-slate-300 text-[11px] flex items-center gap-2 border border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>Notice that the <strong>Offset (d)</strong> is never modified during translation; only the Page Number is swapped for the Frame Number.</span>
        </div>
      </div>
    );
  }

  // 6. THREAD PROCESS MEMORY LAYOUT
  if (type === 'thread-process-model' || type === 'thread-memory-layout') {
    return (
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
            <Activity size={16} />
            <span>{title || 'Process vs Thread Address Space'}</span>
          </div>
          <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
            Shared vs Private Memory
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Shared Memory Box */}
          <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl space-y-2">
            <span className="font-black text-emerald-400 text-xs uppercase tracking-wider block">
              Shared by All Threads in Process
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="p-2 bg-slate-800 rounded border border-slate-700 flex justify-between">
                <span>Code (Text) Segment</span><span className="text-slate-400">Executable bytes</span>
              </div>
              <div className="p-2 bg-slate-800 rounded border border-slate-700 flex justify-between">
                <span>Data & BSS Segment</span><span className="text-slate-400">Global variables</span>
              </div>
              <div className="p-2 bg-slate-800 rounded border border-slate-700 flex justify-between">
                <span>Heap Memory</span><span className="text-slate-400">malloc() allocations</span>
              </div>
              <div className="p-2 bg-slate-800 rounded border border-slate-700 flex justify-between">
                <span>Open Files & Sockets</span><span className="text-slate-400">Shared file descriptors</span>
              </div>
            </div>
          </div>

          {/* Private Thread Memory */}
          <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-2xl space-y-2">
            <span className="font-black text-amber-400 text-xs uppercase tracking-wider block">
              Private per Individual Thread
            </span>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="font-bold text-amber-300 block">Thread 1</span>
                <span className="text-slate-400 font-mono text-[10px]">Stack 1 (Local vars) | PC 1 | Registers</span>
              </div>
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="font-bold text-amber-300 block">Thread 2</span>
                <span className="text-slate-400 font-mono text-[10px]">Stack 2 (Local vars) | PC 2 | Registers</span>
              </div>
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="font-bold text-amber-300 block">Thread 3</span>
                <span className="text-slate-400 font-mono text-[10px]">Stack 3 (Local vars) | PC 3 | Registers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. INODE TREE STRUCTURE
  if (type === 'inode-tree' || type === 'inode-structure' || type === 'inode-fields') {
    return (
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-black text-xs uppercase tracking-wider">
            <FolderTree size={16} />
            <span>{title || 'UNIX Inode Multi-Level Block Addressing'}</span>
          </div>
          <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
            ext4 / UFS Inode
          </span>
        </div>

        {/* Tree Levels */}
        <div className="space-y-2.5 text-xs">
          {/* Direct Pointers */}
          <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="font-bold text-emerald-400 block">12 Direct Pointers (0 to 11)</span>
              <span className="text-[11px] text-slate-400">Point directly to 12 data blocks on disk.</span>
            </div>
            <span className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded font-mono font-bold text-[11px]">
              12 * 4KB = 48 KB (Small Files)
            </span>
          </div>

          {/* Single Indirect */}
          <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="font-bold text-blue-400 block">1 Single Indirect Pointer</span>
              <span className="text-[11px] text-slate-400">Points to 1 block holding 1024 data block pointers.</span>
            </div>
            <span className="px-2.5 py-1 bg-blue-950 text-blue-300 border border-blue-500/30 rounded font-mono font-bold text-[11px]">
              1024 * 4KB = 4 MB
            </span>
          </div>

          {/* Double Indirect */}
          <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="font-bold text-purple-400 block">1 Double Indirect Pointer</span>
              <span className="text-[11px] text-slate-400">Points to a block holding 1024 single indirect pointers.</span>
            </div>
            <span className="px-2.5 py-1 bg-purple-950 text-purple-300 border border-purple-500/30 rounded font-mono font-bold text-[11px]">
              1024 * 1024 * 4KB = 4 GB
            </span>
          </div>

          {/* Triple Indirect */}
          <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="font-bold text-amber-400 block">1 Triple Indirect Pointer</span>
              <span className="text-[11px] text-slate-400">3-tier pointer tree for multi-terabyte files.</span>
            </div>
            <span className="px-2.5 py-1 bg-amber-950 text-amber-300 border border-amber-500/30 rounded font-mono font-bold text-[11px]">
              1024^3 * 4KB = 4 TB Max
            </span>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT / GENERIC ARCHITECTURE DIAGRAM
  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-purple-400 font-black text-xs uppercase tracking-wider">
          <Cpu size={16} />
          <span>{title || 'Operating System Conceptual Architecture'}</span>
        </div>
        <span className="text-[10px] font-bold text-slate-400">Core Subsystem</span>
      </div>
      <div className="p-4 bg-slate-800/60 rounded-xl text-center text-xs text-slate-300">
        <div className="font-bold text-white mb-1">Hardware &harr; OS Kernel &harr; User Applications</div>
        <p className="text-[11px] text-slate-400 max-w-md mx-auto">
          The operating system coordinates hardware resources (CPU, RAM, Disks) through abstraction layers to protect concurrent user processes.
        </p>
      </div>
    </div>
  );
}
