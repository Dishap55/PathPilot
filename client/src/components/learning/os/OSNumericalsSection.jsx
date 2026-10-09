import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  ArrowRight,
  HardDrive,
  Hash,
  Calculator,
  Compass,
  FileText,
  Clock,
  Zap,
  HelpCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { OS_NUMERICAL_TOPICS, getOSNumericalTopic } from '../../../data/os/osNumericalsData.js';

export default function OSNumericalsSection({
  topic,
  onSelectTopic,
  allTopics = [],
  onGoToExamples
}) {
  // Map input topic or default to first numerical topic
  const initialId = topic?.slug || topic?.id || 'cpu-scheduling-basics';
  const [selectedTopicId, setSelectedTopicId] = useState(() => {
    const match = OS_NUMERICAL_TOPICS.find((t) => t.id === initialId || t.id.includes(initialId));
    return match ? match.id : 'cpu-scheduling-basics';
  });

  const activeTopic = useMemo(() => {
    return getOSNumericalTopic(selectedTopicId);
  }, [selectedTopicId]);

  // Step state
  const steps = activeTopic.steps || [];
  const maxStep = Math.max(0, steps.length - 1);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset step when topic changes
  useEffect(() => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [selectedTopicId]);

  // Auto-play timer
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= maxStep) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, maxStep]);

  const currentStep = steps[currentStepIdx] || steps[0] || {};

  // Handlers
  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIdx((p) => Math.max(0, p - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIdx((p) => Math.min(maxStep, p + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  // Cumulative Gantt blocks up to current step
  const visibleGantt = useMemo(() => {
    if (currentStep?.gantt) {
      return currentStep.gantt;
    }
    const lastGantt = [...steps].slice(0, currentStepIdx + 1).reverse().find((s) => s.gantt);
    return lastGantt ? lastGantt.gantt : [];
  }, [currentStep, steps, currentStepIdx]);

  return (
    <div className="space-y-6 select-none animate-fadeIn pb-12">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP HEADER & QUICK SWITCHER                                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#E2D9CC] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800 text-[11px] font-black uppercase tracking-wider border border-violet-200">
                Section 6 &bull; OS Numericals Lab
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                12-Step Full Derivation
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
              {activeTopic.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-3xl">
              {activeTopic.summary}
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            {onGoToExamples && (
              <button
                onClick={onGoToExamples}
                className="px-3 py-2 rounded-xl bg-[#F8F4EE] hover:bg-[#EAE3D9] text-[#475569] text-xs font-bold border border-[#D9D1C7] transition-all flex items-center gap-1.5 cursor-pointer"
                title="View Problem Examples"
              >
                <Lightbulb size={14} className="text-[#6574C4]" />
                <span>Problem Examples</span>
              </button>
            )}
          </div>
        </div>

        {/* 13 Topics Pill Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
              Select Numerical Topic ({OS_NUMERICAL_TOPICS.length} Topics):
            </span>
            <span className="text-[11px] font-medium">Click to switch topic</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {OS_NUMERICAL_TOPICS.map((nt, idx) => {
              const isSelected = nt.id === activeTopic.id;
              return (
                <button
                  key={nt.id}
                  onClick={() => setSelectedTopicId(nt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#0F172A] text-white shadow-xs scale-102'
                      : 'bg-[#F8F4EE] text-[#475569] hover:bg-[#EAE3D9] border border-[#D9D1C7]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isSelected ? 'bg-violet-400 text-slate-950' : 'bg-[#E2D9CC] text-[#475569]'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{nt.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE 12-STAGE NUMERICAL LEARNING WORKBENCH                   */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (8 cols): Problem + Interactive Visuals + Stepper */}
        <div className="lg:col-span-8 space-y-5">
          {/* Card: Problem, Given, What to Find */}
          <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-4">
            {/* Stage 1: What is the problem? */}
            <div className="border-b border-[#E2D9CC] pb-3 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-violet-700">
                <HelpCircle size={15} />
                <span>1. What is the Problem?</span>
              </div>
              <p className="text-sm font-bold text-[#0F172A] leading-relaxed">
                {activeTopic.problem}
              </p>
            </div>

            {/* Stage 2 & 3: Given Data & What to Find */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
              {/* Given Data */}
              <div className="p-3.5 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] space-y-2">
                <span className="font-extrabold text-[#0F172A] block uppercase tracking-wider text-[11px] text-amber-800">
                  2. What Information is Given?
                </span>
                <div className="space-y-1 font-mono text-[11px] text-[#334155]">
                  {Array.isArray(activeTopic.givenData) && activeTopic.givenData.map((item, gIdx) => (
                    <div key={gIdx} className="flex justify-between items-center py-0.5 border-b border-[#E2D9CC] last:border-none">
                      <span className="font-bold text-[#0F172A]">{item.process || item.partition || item.param || item.queue || `Input ${gIdx + 1}`}:</span>
                      <span className="font-semibold text-violet-700">
                        {item.bt !== undefined ? `AT=${item.at}, BT=${item.bt}` : (item.value || item.size || item.notes || JSON.stringify(item.alloc || ''))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to Find */}
              <div className="p-3.5 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] space-y-2">
                <span className="font-extrabold text-[#0F172A] block uppercase tracking-wider text-[11px] text-emerald-800">
                  3. What Do We Need to Find?
                </span>
                <ul className="space-y-1 text-[#334155]">
                  {activeTopic.whatToFind.map((wf, wIdx) => (
                    <li key={wIdx} className="flex items-start gap-1.5 font-medium">
                      <span className="text-emerald-600 font-bold shrink-0 mt-0.5">&bull;</span>
                      <span>{wf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stage 4: Formulas & Rules Required */}
            <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200/80 space-y-2 text-xs">
              <span className="font-extrabold text-[#0F172A] flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-violet-900">
                <Calculator size={14} className="text-violet-700" />
                4. Which Formulas &amp; Rules Are Required?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeTopic.formulas.map((f, fIdx) => (
                  <div key={fIdx} className="p-2.5 rounded-lg bg-white border border-violet-100 shadow-2xs space-y-0.5">
                    <span className="font-bold text-violet-950 block text-[11px]">{f.name}</span>
                    <code className="text-xs font-mono font-bold text-violet-700 bg-violet-50/80 px-1 py-0.5 rounded block">
                      {f.formula}
                    </code>
                    <p className="text-[10px] text-[#64748B]">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* INTERACTIVE STEP-BY-STEP CALCULATION & VISUAL WORKBENCH     */}
          {/* ----------------------------------------------------------- */}
          <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-5">
            {/* Stepper Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2D9CC] pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                  Stages 5, 6, 7 &bull; Execution Stepper
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#0F172A] mt-0.5">
                  Step {currentStepIdx + 1} of {steps.length}: {currentStep.action || currentStep.decision || 'Execution Step'}
                </h3>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-[#F8F4EE] hover:bg-[#EAE3D9] text-[#475569] border border-[#D9D1C7] transition-all cursor-pointer"
                  title="Replay from start"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={handlePrev}
                  disabled={currentStepIdx === 0}
                  className="p-2 rounded-xl bg-[#F8F4EE] hover:bg-[#EAE3D9] text-[#475569] border border-[#D9D1C7] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  title="Previous Step"
                >
                  <SkipBack size={14} />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-amber-500 text-white'
                      : 'bg-[#0F172A] text-white hover:bg-slate-800'
                  }`}
                  title={isPlaying ? 'Pause' : 'Auto Play'}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStepIdx >= maxStep}
                  className="p-2 rounded-xl bg-[#F8F4EE] hover:bg-[#EAE3D9] text-[#475569] border border-[#D9D1C7] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  title="Next Step"
                >
                  <SkipForward size={14} />
                </button>
              </div>
            </div>

            {/* Step Selection Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {steps.map((st, sIdx) => {
                const isActive = sIdx === currentStepIdx;
                const isPast = sIdx < currentStepIdx;
                return (
                  <button
                    key={sIdx}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIdx(sIdx);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-violet-600 text-white shadow-2xs'
                        : isPast
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-[#F8F4EE] text-[#475569] border border-[#D9D1C7]'
                    }`}
                  >
                    Step {sIdx + 1}
                  </button>
                );
              })}
            </div>

            {/* Step Explanation Callout */}
            <div className="p-4 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#0F172A] text-xs">
                  {currentStep.time ? `Clock: ${currentStep.time}` : `Action: ${currentStep.action}`}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-violet-100 text-violet-800 font-bold text-[10px]">
                  Step {currentStepIdx + 1} / {steps.length}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#E2D9CC] space-y-1">
                <span className="font-black text-violet-700 block text-[11px] uppercase tracking-wider">
                  WHY this decision is made:
                </span>
                <p className="text-[#1E293B] font-medium leading-relaxed">
                  {currentStep.why || currentStep.reason || 'Executing standard deterministic scheduling rules.'}
                </p>
              </div>
              {currentStep.calculation && (
                <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50/70 p-2 rounded border border-emerald-200/80">
                  <strong>Calculation:</strong> {currentStep.calculation}
                </div>
              )}
            </div>

            {/* --------------------------------------------------------- */}
            {/* DYNAMIC TOPIC-SPECIFIC VISUAL REPRESENTATION              */}
            {/* --------------------------------------------------------- */}

            {/* A. Gantt Chart for CPU Scheduling Topics (1 to 7) */}
            {visibleGantt.length > 0 && (
              <div className="p-4 rounded-xl bg-[#0F172A] text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                    <Clock size={13} />
                    Step-by-Step Gantt Chart Construction
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {visibleGantt.length} block{visibleGantt.length !== 1 ? 's' : ''} placed
                  </span>
                </div>

                {/* Gantt Bar */}
                <div className="space-y-1">
                  <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900/80 h-14">
                    {visibleGantt.map((block, bIdx) => {
                      const duration = block.end - block.start;
                      const isIdle = block.process === 'IDLE';
                      return (
                        <div
                          key={bIdx}
                          style={{ flexGrow: Math.max(1, duration) }}
                          className={`h-full flex flex-col items-center justify-center border-r border-slate-800 px-1 text-center transition-all animate-fadeIn ${
                            isIdle
                              ? 'bg-slate-800 text-slate-400 italic'
                              : 'bg-gradient-to-b from-violet-600 to-indigo-700 text-white font-extrabold shadow-inner'
                          }`}
                        >
                          <span className="text-xs">{block.process}</span>
                          <span className="text-[9px] opacity-80 font-mono">({duration}ms)</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Time Axis Ticks */}
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 px-1">
                    <span>{visibleGantt[0]?.start ?? 0}</span>
                    {visibleGantt.map((b, idx) => (
                      <span key={idx}>{b.end}</span>
                    ))}
                  </div>
                </div>

                {/* Ready Queue State at this step */}
                {currentStep.readyQueue && (
                  <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Ready Queue state at step {currentStepIdx + 1}:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      [{currentStep.readyQueue.join(' &bull; ')}]
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* B. Paging Address Translation Visual (Topic 10) */}
            {activeTopic.id === 'paging-numerical' && (
              <div className="p-4 rounded-xl bg-[#0F172A] text-white space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-violet-300 block">
                  Hardware MMU Translation Pipeline
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">32-Bit Logical Address</span>
                    <div className="font-mono text-xs font-black text-amber-400 bg-slate-900 p-2 rounded">
                      0x00001A40
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Page <strong>1</strong> | Offset <strong>0xA40</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 space-y-1 flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Page Table Lookup</span>
                    <div className="font-mono text-xs font-black text-violet-300 bg-slate-900 p-2 rounded">
                      Table[Page 1] &rarr; Frame 7
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold">
                      Offset preserved: 0xA40
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">32-Bit Physical Address</span>
                    <div className="font-mono text-xs font-black text-emerald-400 bg-slate-900 p-2 rounded">
                      0x00007A40
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Frame <strong>7</strong> | Offset <strong>0xA40</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* C. Page Replacement Frame Table (Topic 11) */}
            {activeTopic.id === 'page-replacement-numerical' && (
              <div className="p-4 rounded-xl bg-[#0F172A] text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-violet-300">
                    Physical Memory Frames (Size = 3)
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400">
                    Current Ref: Page {currentStep.ref ?? '7'} &bull; {currentStep.status}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-4 py-2">
                  {(currentStep.frames || ['-', '-', '-']).map((page, fIdx) => (
                    <div key={fIdx} className="flex flex-col items-center gap-1">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-violet-500/80 flex items-center justify-center font-mono text-xl font-black text-white shadow-lg">
                        {page}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Frame {fIdx}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center text-xs text-slate-300">
                  {currentStep.why}
                </div>
              </div>
            )}

            {/* D. Banker's Algorithm Available & Safe Sequence (Topic 8) */}
            {activeTopic.id === 'bankers-algorithm-numerical' && (
              <div className="p-4 rounded-xl bg-[#0F172A] text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-violet-300">
                    Banker's Resource Safety State
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">
                    Available: [{currentStep.available ? currentStep.available.join(', ') : '3, 3, 2'}]
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Safe Sequence Progression:
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    {(currentStep.safeSeq || []).length === 0 ? (
                      <span className="text-slate-500 italic">Evaluating first process...</span>
                    ) : (
                      (currentStep.safeSeq || []).map((proc, pIdx) => (
                        <span key={pIdx} className="flex items-center gap-1.5 font-bold text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-md border border-emerald-900">
                          <CheckCircle2 size={12} className="text-emerald-400" />
                          {proc}
                          {pIdx < (currentStep.safeSeq.length - 1) && <span className="text-slate-600">&rarr;</span>}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* E. Memory Allocation Partitions (Topic 9) */}
            {activeTopic.id === 'memory-allocation-numerical' && (
              <div className="p-4 rounded-xl bg-[#0F172A] text-white space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-violet-300 block">
                  Memory Blocks Allocation State (Best Fit)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  {(currentStep.blocksState || [
                    { block: 'B1 (100K)', status: 'Free' },
                    { block: 'B2 (500K)', status: 'Free' },
                    { block: 'B3 (200K)', status: 'Free' },
                    { block: 'B4 (300K)', status: 'Free' },
                    { block: 'B5 (600K)', status: 'Free' }
                  ]).map((blk, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 space-y-1">
                      <span className="font-mono font-bold text-amber-400 block text-[11px]">{blk.block}</span>
                      <span className="text-[10px] text-slate-300 block leading-tight">{blk.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* F. TLB Access Flow (Topic 12) */}
            {activeTopic.id === 'tlb-eat-numerical' && (
              <div className="p-4 rounded-xl bg-[#0F172A] text-white space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-violet-300 block">
                  TLB Hit vs Miss Path Comparison
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-800/90 border border-emerald-800/80 space-y-1">
                    <span className="font-black text-emerald-400 text-xs block">TLB Hit Path (80% probability)</span>
                    <p className="text-slate-300 text-[11px]">
                      TLB Search (20ns) + 1 RAM access for data (100ns) = <strong>120 ns</strong>
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/90 border border-amber-800/80 space-y-1">
                    <span className="font-black text-amber-400 text-xs block">TLB Miss Path (20% probability)</span>
                    <p className="text-slate-300 text-[11px]">
                      TLB Search (20ns) + RAM Page Table (100ns) + RAM Data (100ns) = <strong>220 ns</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* G. Disk Scheduling Sweep (Topic 13) */}
            {activeTopic.id === 'disk-scheduling-numerical' && (
              <div className="p-4 rounded-xl bg-[#0F172A] text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-violet-300">
                    Cylinder Seek Movement (0 to 199)
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">
                    Head at: {currentStep.to || 53} ({currentStep.dir || 'UP'})
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-300 flex items-center justify-between">
                    <span>Movement: {currentStep.from} &rarr; {currentStep.to}</span>
                    <span className="font-mono text-emerald-400 font-bold">+{currentStep.move || 0} cylinders</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{currentStep.why}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Final Calculations, Answer Table, Verification, Traps */}
        <div className="lg:col-span-4 space-y-5">
          {/* Stage 9: Final Calculations */}
          <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0F172A] border-b border-[#E2D9CC] pb-2">
              <Calculator size={14} className="text-violet-700" />
              <span>9. Final Calculations</span>
            </div>
            <div className="space-y-2 text-xs">
              {activeTopic.finalCalculations.map((calc, cIdx) => (
                <div key={cIdx} className="p-2.5 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] space-y-0.5">
                  <span className="font-extrabold text-[#0F172A] block text-[11px]">{calc.metric}</span>
                  <code className="text-xs font-mono font-bold text-violet-800 block break-words">
                    {calc.formula}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Stage 10: Final Answer Table */}
          <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0F172A] border-b border-[#E2D9CC] pb-2">
              <CheckCircle2 size={14} className="text-emerald-700" />
              <span>10. Final Answer Table</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8F4EE] text-[#475569] border-b border-[#D9D1C7]">
                    {activeTopic.finalAnswer.headers.map((h, hIdx) => (
                      <th key={hIdx} className="p-1.5 font-extrabold text-[10px] uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2D9CC] font-mono text-[11px]">
                  {activeTopic.finalAnswer.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-violet-50/40">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-1.5 text-[#1E293B]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 text-center">
              {activeTopic.finalAnswer.summary}
            </div>
          </div>

          {/* Stage 11: Verification Checklist */}
          <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 border-b border-[#E2D9CC] pb-2">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>11. Verify the Answer</span>
            </div>
            <div className="space-y-1.5 text-xs">
              {activeTopic.verification.map((v, vIdx) => (
                <div key={vIdx} className="flex items-start gap-2 p-2 rounded-lg bg-[#F8F4EE] text-[#334155]">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stage 12: Common Mistakes & Traps */}
          <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-800 border-b border-[#E2D9CC] pb-2">
              <AlertTriangle size={14} className="text-amber-600" />
              <span>12. Common Mistake / Trap</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 leading-relaxed font-medium">
              {activeTopic.commonMistake}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
