import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Cpu,
  Layers,
  ShieldAlert,
  HardDrive,
  Workflow,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Repeat
} from 'lucide-react';

/**
 * OSVFXEngine Component
 * Interactive concept-specific visual simulation engine for Operating Systems.
 * Implements simulations for CPU Scheduling, Process Lifecycles, Deadlock RAG,
 * Paging Translation, Semaphores, and Disk Head Movement.
 */
export default function OSVFXEngine({ vfxType = 'cpu-scheduling-sim', topicId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  // Stop timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle Play/Pause timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIndex((prev) => (prev + 1) % 6);
      }, 1400 / speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed]);

  const handleReset = () => {
    setIsPlaying(false);
    setStepIndex(0);
  };

  const handleStep = () => {
    setIsPlaying(false);
    setStepIndex((prev) => (prev + 1) % 6);
  };

  // =========================================================================
  // 1. CPU SCHEDULING GANTT SIMULATION
  // =========================================================================
  if (vfxType === 'cpu-scheduling-sim') {
    const schedulingSteps = [
      { t: 0, running: 'P1', queue: ['P2'], gantt: [{ p: 'P1', start: 0, end: 2 }], desc: 'P1 dispatched to CPU for 2ms slice. P2 arrives at t=1.' },
      { t: 2, running: 'P2', queue: ['P3', 'P1'], gantt: [{ p: 'P1', start: 0, end: 2 }, { p: 'P2', start: 2, end: 4 }], desc: 'P1 quantum expires, preempted to queue tail. P2 dispatched.' },
      { t: 4, running: 'P3', queue: ['P1', 'P4', 'P2'], gantt: [{ p: 'P1', start: 0, end: 2 }, { p: 'P2', start: 2, end: 4 }, { p: 'P3', start: 4, end: 6 }], desc: 'P3 runs for 2ms slice and terminates! P4 arrives at t=4.' },
      { t: 6, running: 'P1', queue: ['P4', 'P2'], gantt: [{ p: 'P1', start: 0, end: 2 }, { p: 'P2', start: 2, end: 4 }, { p: 'P3', start: 4, end: 6 }, { p: 'P1', start: 6, end: 8 }], desc: 'P1 dispatched again; runs for 2ms (remaining burst: 1ms).' },
      { t: 8, running: 'P4', queue: ['P2', 'P1'], gantt: [{ p: 'P1', start: 0, end: 2 }, { p: 'P2', start: 2, end: 4 }, { p: 'P3', start: 4, end: 6 }, { p: 'P1', start: 6, end: 8 }, { p: 'P4', start: 8, end: 9 }], desc: 'P4 has burst 1ms; finishes at t=9 and exits system.' },
      { t: 9, running: 'P2', queue: ['P1'], gantt: [{ p: 'P1', start: 0, end: 2 }, { p: 'P2', start: 2, end: 4 }, { p: 'P3', start: 4, end: 6 }, { p: 'P1', start: 6, end: 8 }, { p: 'P4', start: 8, end: 9 }, { p: 'P2', start: 9, end: 11 }], desc: 'P2 finishes burst at t=11. Final process P1 runs to completion.' }
    ];

    const current = schedulingSteps[stepIndex] || schedulingSteps[0];

    return (
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
        {/* Header with Title & Live Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
              <h4 className="text-sm font-black uppercase tracking-wider text-purple-400">
                {title || 'CPU Scheduler & Gantt Chart Simulation'}
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Round Robin (Quantum = 2ms) Live Queue & Core Dispatcher
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'Pause' : 'Play Live'}</span>
            </button>
            <button
              type="button"
              onClick={handleStep}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer"
              title="Step forward"
            >
              <SkipForward size={16} />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Live System State: Ready Queue & CPU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ready Queue Box */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Ready Queue (Waiting for CPU)
            </span>
            <div className="flex items-center gap-2 min-h-[46px] p-2 bg-slate-950 rounded-xl border border-slate-800/80">
              {current.queue.length === 0 ? (
                <span className="text-xs text-slate-500 italic">Queue Empty</span>
              ) : (
                current.queue.map((proc, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-purple-950 border border-purple-500/50 text-purple-300 font-mono font-black text-xs shadow-sm flex items-center gap-1 animate-fadeIn"
                  >
                    {proc}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* CPU Core Box */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                CPU Core 0 (Executing)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Time: {current.t} ms
              </span>
            </div>
            <div className="min-h-[46px] p-2 bg-slate-950 rounded-xl border border-emerald-500/40 flex items-center justify-center gap-2">
              <Cpu size={16} className="text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-sm font-black font-mono text-emerald-300">
                Executing: {current.running}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Gantt Chart */}
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Horizontal Gantt Execution Timeline
          </span>
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-1 overflow-x-auto">
            {current.gantt.map((slice, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-[70px] p-2 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/40 rounded-xl text-center space-y-0.5 animate-fadeIn"
              >
                <div className="font-mono font-black text-xs text-purple-200">{slice.p}</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {slice.start} &rarr; {slice.end}ms
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Narrative Description */}
        <div className="p-3.5 bg-purple-950/30 border border-purple-500/30 rounded-2xl text-xs text-purple-200 flex items-start gap-2.5">
          <Zap size={16} className="text-purple-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{current.desc}</p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. PROCESS STATE TRANSITION SIMULATION
  // =========================================================================
  if (vfxType === 'process-state-sim') {
    const statesData = [
      { id: 'NEW', title: 'New State', desc: 'Process is being spawned. Kernel allocates PID and sets up PCB structure.' },
      { id: 'READY', title: 'Ready State', desc: 'Admitted to RAM by Long-Term Scheduler. Process waits in Ready Queue.' },
      { id: 'RUNNING', title: 'Running State', desc: 'Dispatched to CPU core. Instructions executing actively.' },
      { id: 'WAITING', title: 'Waiting (Blocked) State', desc: 'Process issued read() syscall. Waiting for disk I/O interrupt.' },
      { id: 'READY_2', title: 'Ready State (Resumed)', desc: 'I/O finished! Interrupt moves process back to Ready Queue.' },
      { id: 'TERMINATED', title: 'Terminated State', desc: 'exit() called. Memory reclaimed; PCB kept as Zombie until parent wait().' }
    ];

    const cur = statesData[stepIndex % statesData.length];

    return (
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h4 className="text-sm font-black uppercase tracking-wider text-blue-400">
                {title || 'Process Lifecycle State Machine Simulation'}
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Step through the complete journey of process PID 4096
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'Pause' : 'Play Lifecycle'}</span>
            </button>
            <button
              type="button"
              onClick={handleStep}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer"
              title="Step forward"
            >
              <SkipForward size={16} />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Visual State Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { id: 'NEW', label: '1. NEW', color: 'blue' },
            { id: 'READY', label: '2. READY', color: 'indigo' },
            { id: 'RUNNING', label: '3. RUNNING', color: 'emerald' },
            { id: 'WAITING', label: '4. WAITING', color: 'amber' },
            { id: 'TERMINATED', label: '5. TERMINATED', color: 'rose' }
          ].map((st) => {
            const isCurrent =
              (st.id === 'NEW' && stepIndex === 0) ||
              (st.id === 'READY' && (stepIndex === 1 || stepIndex === 4)) ||
              (st.id === 'RUNNING' && stepIndex === 2) ||
              (st.id === 'WAITING' && stepIndex === 3) ||
              (st.id === 'TERMINATED' && stepIndex === 5);

            return (
              <div
                key={st.id}
                className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 ${
                  isCurrent
                    ? 'border-white bg-blue-600/30 shadow-xl shadow-blue-500/20 scale-105 ring-2 ring-white/60'
                    : 'border-slate-800 bg-slate-900/60 opacity-50'
                }`}
              >
                <div className="text-xs font-black tracking-wide">{st.label}</div>
                {isCurrent && (
                  <span className="mt-1.5 inline-block px-2 py-0.5 bg-blue-500 text-white text-[9px] font-bold rounded-full animate-bounce">
                    PID 4096 HERE
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Narrative Box */}
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs font-extrabold text-blue-400 block uppercase tracking-wide">
            Phase {stepIndex + 1}: {cur.title}
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {cur.desc}
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. DEADLOCK RESOURCE ALLOCATION GRAPH (RAG) SIMULATION
  // =========================================================================
  if (vfxType === 'deadlock-rag-sim') {
    const isDeadlocked = stepIndex >= 2;

    return (
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isDeadlocked ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
              <h4 className="text-sm font-black uppercase tracking-wider text-rose-400">
                {title || 'Deadlock Detection & Resource Allocation Graph'}
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Interactive circular dependency & Coffman condition analyzer
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStepIndex((prev) => (prev === 2 ? 0 : 2))}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                isDeadlocked
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
              }`}
            >
              {isDeadlocked ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              <span>{isDeadlocked ? 'Break Circular Wait' : 'Trigger Deadlock Cycle'}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Circular Dependency Visual Graph */}
        <div className={`p-6 rounded-2xl border transition-all duration-500 flex flex-col sm:flex-row items-center justify-around gap-6 ${
          isDeadlocked ? 'bg-rose-950/30 border-rose-500/60 shadow-2xl shadow-rose-900/40' : 'bg-slate-900 border-slate-800'
        }`}>
          {/* Process 1 */}
          <div className="text-center space-y-1">
            <div className="w-16 h-16 rounded-full bg-blue-600/30 border-2 border-blue-400 flex items-center justify-center font-black text-blue-300 text-sm shadow-md mx-auto">
              P1
            </div>
            <span className="text-[11px] text-slate-300 block font-bold">Process 1</span>
            <span className="text-[10px] text-emerald-400 block font-mono">Holding: R1</span>
          </div>

          {/* Connecting Arrows */}
          <div className="flex flex-col items-center gap-2 text-xs font-mono">
            <div className="px-3 py-1 rounded bg-slate-800 text-amber-300 border border-slate-700">
              P1 holds R1 &bull; Requests R2 &rarr;
            </div>
            {isDeadlocked ? (
              <div className="px-3 py-1 rounded bg-rose-600 text-white font-bold animate-pulse">
                &larr; P2 holds R2 &bull; Requests R1 (CYCLE!)
              </div>
            ) : (
              <div className="px-3 py-1 rounded bg-slate-800 text-emerald-300 border border-slate-700">
                &larr; P2 awaits R2 release (No Cycle)
              </div>
            )}
          </div>

          {/* Process 2 */}
          <div className="text-center space-y-1">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-400 flex items-center justify-center font-black text-purple-300 text-sm shadow-md mx-auto">
              P2
            </div>
            <span className="text-[11px] text-slate-300 block font-bold">Process 2</span>
            <span className="text-[10px] text-purple-300 block font-mono">Holding: R2</span>
          </div>
        </div>

        {/* Status Callout */}
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
          isDeadlocked
            ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
        }`}>
          {isDeadlocked ? (
            <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div>
            <strong className="block font-black uppercase text-[11px]">
              {isDeadlocked ? 'DEADLOCK DETECTED! Permanent Freeze.' : 'SYSTEM SAFE: No Circular Dependency.'}
            </strong>
            {isDeadlocked
              ? 'A directed cycle P1 -> R2 -> P2 -> R1 -> P1 exists with single-instance resources. Both processes sleep forever waiting for the other to yield.'
              : 'Resource requests are strictly ordered. P2 will finish and release R2, enabling P1 to acquire it without any circular block.'}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. PAGING & MMU TRANSLATION SIMULATION
  // =========================================================================
  if (vfxType === 'paging-translation-sim') {
    const virtualAddresses = [
      { hex: '0x208C', page: 2, offset: 140, frame: 8, hit: true },
      { hex: '0x0040', page: 0, offset: 64, frame: 5, hit: false },
      { hex: '0x3100', page: 3, offset: 256, frame: 1, hit: true },
      { hex: '0x1010', page: 1, offset: 16, frame: 7, hit: false }
    ];

    const curr = virtualAddresses[stepIndex % virtualAddresses.length];
    const physicalAddr = curr.frame * 4096 + curr.offset;

    return (
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400">
                {title || 'Hardware MMU Paging & Address Translation'}
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Virtual Page &rarr; TLB Cache &rarr; Page Table &rarr; Physical Frame
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleStep}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Zap size={14} />
              <span>Translate Next Address</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Translation Step Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
          {/* 1. CPU Virtual Address */}
          <div className="p-3.5 bg-blue-950/40 border border-blue-500/40 rounded-2xl space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-blue-300 block">1. Virtual Address</span>
            <div className="font-mono font-black text-sm text-blue-400">{curr.hex}</div>
            <div className="text-[10px] text-slate-400">Page: {curr.page} | Offset: {curr.offset}</div>
          </div>

          {/* 2. TLB Associative Cache */}
          <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
            curr.hit ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}>
            <span className="text-[10px] uppercase font-bold block">2. TLB Cache</span>
            <div className="font-bold text-xs">
              {curr.hit ? 'TLB HIT! (1ns)' : 'TLB MISS (100ns)'}
            </div>
            <div className="text-[10px] text-slate-400">Hardware MMU Check</div>
          </div>

          {/* 3. Page Table Frame Lookup */}
          <div className="p-3.5 bg-purple-950/40 border border-purple-500/40 rounded-2xl space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-purple-300 block">3. Page Table Lookup</span>
            <div className="font-mono font-black text-sm text-purple-400">Page {curr.page} &rarr; Frame {curr.frame}</div>
            <div className="text-[10px] text-emerald-400">Valid Bit = 1 (In RAM)</div>
          </div>

          {/* 4. Physical Address */}
          <div className="p-3.5 bg-slate-900 border-2 border-emerald-500 rounded-2xl space-y-1.5 shadow-lg">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">4. Physical RAM Byte</span>
            <div className="font-mono font-black text-sm text-white">{`0x${physicalAddr.toString(16).toUpperCase()}`}</div>
            <div className="text-[10px] text-slate-300">Byte: {physicalAddr}</div>
          </div>
        </div>

        {/* Formula breakdown */}
        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Physical Address = (Frame * 4096) + Offset</span>
          <span className="text-emerald-400 font-bold">({curr.frame} * 4096) + {curr.offset} = {physicalAddr}</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. SEMAPHORE PRODUCER CONSUMER SIMULATION
  // =========================================================================
  if (vfxType === 'semaphore-sim') {
    const [bufferCount, setBufferCount] = useState(2);
    const maxCapacity = 5;

    const handleProduce = () => {
      if (bufferCount < maxCapacity) {
        setBufferCount((prev) => prev + 1);
      }
    };

    const handleConsume = () => {
      if (bufferCount > 0) {
        setBufferCount((prev) => prev - 1);
      }
    };

    const emptySlots = maxCapacity - bufferCount;
    const fullSlots = bufferCount;

    return (
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h4 className="text-sm font-black uppercase tracking-wider text-amber-400">
                {title || 'Semaphore & Bounded Buffer Producer-Consumer'}
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Atomic wait() and signal() operations on counting semaphores
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleProduce}
              disabled={bufferCount === maxCapacity}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                bufferCount === maxCapacity
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30'
              }`}
            >
              + Produce Item
            </button>
            <button
              type="button"
              onClick={handleConsume}
              disabled={bufferCount === 0}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                bufferCount === 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
              }`}
            >
              - Consume Item
            </button>
            <button
              type="button"
              onClick={() => setBufferCount(2)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Live Semaphore Variables */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">empty (Free Slots)</span>
            <div className="text-xl font-black font-mono text-emerald-400">{emptySlots}</div>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">full (Filled Slots)</span>
            <div className="text-xl font-black font-mono text-blue-400">{fullSlots}</div>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">mutex (Binary Lock)</span>
            <div className="text-xl font-black font-mono text-amber-400">1</div>
          </div>
        </div>

        {/* Bounded Buffer Slots */}
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Shared Circular Memory Buffer (Capacity: {maxCapacity})
          </span>
          <div className="grid grid-cols-5 gap-2.5 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            {Array.from({ length: maxCapacity }).map((_, i) => {
              const isFilled = i < bufferCount;
              return (
                <div
                  key={i}
                  className={`h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                    isFilled
                      ? 'border-blue-500 bg-blue-950/60 text-blue-300 shadow-md scale-102'
                      : 'border-slate-800 bg-slate-950/80 text-slate-600'
                  }`}
                >
                  <span className="text-xs font-black font-mono">
                    {isFilled ? `Item ${i + 1}` : 'Empty'}
                  </span>
                  <span className="text-[9px] text-slate-500">Slot {i}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Callout */}
        <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 flex items-center justify-between border border-slate-800">
          <span>{bufferCount === maxCapacity ? '⚠️ Buffer FULL! Next producer will sleep on wait(empty).' : bufferCount === 0 ? '⚠️ Buffer EMPTY! Next consumer will sleep on wait(full).' : 'Buffer operating smoothly with mutual exclusion.'}</span>
          <span className="text-[11px] font-mono text-amber-400 font-bold">Lock: Available</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. DISK HEAD SCHEDULING SIMULATION
  // =========================================================================
  if (vfxType === 'disk-head-sim') {
    const queue = [98, 183, 37, 122, 14, 124, 65, 67];
    const lookSequence = [53, 65, 67, 98, 122, 124, 183, 37, 14];
    const currentCylinder = lookSequence[stepIndex % lookSequence.length];

    return (
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
              <h4 className="text-sm font-black uppercase tracking-wider text-cyan-400">
                {title || 'Mechanical Disk Head Scheduling (LOOK Algorithm)'}
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Minimizing seek distance across 200 track cylinders (0 to 199)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleStep}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-cyan-600/30 transition-all cursor-pointer"
            >
              <SkipForward size={14} />
              <span>Step Head Movement</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Cylinder Track Bar */}
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Cylinder 0 (Inner Track)</span>
            <span className="font-bold text-cyan-400">Current Position: {currentCylinder}</span>
            <span>Cylinder 199 (Outer Track)</span>
          </div>

          {/* Track Bar with Position Indicator */}
          <div className="relative h-8 bg-slate-950 rounded-xl border border-slate-800 flex items-center px-1">
            <div
              className="absolute h-6 w-5 bg-cyan-500 rounded-md shadow-lg shadow-cyan-500/50 flex items-center justify-center transition-all duration-300"
              style={{ left: `calc(${(currentCylinder / 199) * 95}% + 2px)` }}
            >
              <span className="text-[9px] font-black text-slate-950">H</span>
            </div>
          </div>
        </div>

        {/* Request Queue Badges */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Cylinder Request Queue:
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {queue.map((cyl, i) => {
              const isPast = lookSequence.indexOf(cyl) !== -1 && lookSequence.indexOf(cyl) <= (stepIndex % lookSequence.length);
              return (
                <span
                  key={i}
                  className={`px-2.5 py-1 rounded-lg border font-bold ${
                    cyl === currentCylinder
                      ? 'bg-cyan-500 text-slate-950 border-white shadow-md scale-105'
                      : isPast
                      ? 'bg-slate-900 text-slate-500 border-slate-800 line-through'
                      : 'bg-slate-900 text-slate-200 border-slate-700'
                  }`}
                >
                  {cyl}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT SIMULATION
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl text-center space-y-3">
      <div className="font-bold text-sm text-purple-400">{title || 'Interactive OS Simulation'}</div>
      <p className="text-xs text-slate-400 max-w-md mx-auto">
        Live operating system state simulator actively tracking kernel events and resource queues.
      </p>
    </div>
  );
}
