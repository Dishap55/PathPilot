import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Layers,
  Cpu,
  Server,
  Globe,
  Radio,
  HardDrive,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Activity,
  Calculator,
  Workflow,
  Check,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import {
  CN_DATA_JOURNEY_STAGES,
  CN_WHAT_CHANGES_TABLE,
  CN_LAYER_MATRIX,
  CN_PROTOCOL_CARDS,
  CN_WHO_DOES_WHAT,
  CN_NUMERICALS_CHEATSHEET,
  CN_INTERVIEW_TRAPS
} from '../../../data/cn/cnRevisionExamData.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';

/**
 * CNRevisionExamSection Component
 * Comprehensive "Revision & Exam Prep" Section for Computer Networks (Section 5).
 * 
 * Features:
 * 1. End-to-End Data Journey (Encapsulation on Sender -> Network Transit -> Decapsulation on Receiver)
 * 2. PDU Transformation (Data -> Segment -> Packet -> Frame -> Bits and reverse)
 * 3. What Changes vs What Does Not at Each Hop
 * 4. 7-Layer Interactive Matrix
 * 5. Interactive Protocol Comparison Lab (TCP vs UDP, HTTP vs HTTPS, DNS, DHCP DORA, ARP, ICMP, NAT)
 * 6. "Who Does What?" Interactive Rapid Flashcards
 * 7. High-Yield Placement Numericals & Formulas (Subnetting, Delays, BDP, Window Efficiency)
 * 8. Placement Interview Traps & Pitfalls
 * 9. 5-Minute Rapid Revision Mode
 */
export default function CNRevisionExamSection({
  topic,
  onNavigateToPractice
}) {
  // Main Sub-Tab in Revision: 'journey' | 'protocols' | 'flashcards' | 'numericals' | 'traps' | 'rapid'
  const [activeTab, setActiveTab] = useState('journey');

  // Journey stage scrubber (Stage 1 to 11)
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage = CN_DATA_JOURNEY_STAGES[activeStageIndex];

  // Active layer in Layer Matrix
  const [selectedLayerNum, setSelectedLayerNum] = useState(4); // Default to Layer 4 (Transport)

  // Active protocol in Protocol Lab
  const [activeProtocolId, setActiveProtocolId] = useState('tcp-vs-udp');

  // Revealed flashcards in "Who Does What?"
  const [revealedFlashcards, setRevealedFlashcards] = useState({});

  const toggleFlashcard = (id) => {
    setRevealedFlashcards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div
      id="cn-section-revision"
      className="space-y-8 max-w-7xl mx-auto px-1 scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      {/* 1. SECTION BANNER & TOPIC HEADER */}
      <div className="bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-950 border border-blue-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative min-h-fit">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Vertical Responsive Header Hierarchy: Title -> Description -> Current Topic -> Notes Button */}
        <div className="relative z-10 flex flex-col gap-5">
          {/* Top Block: Section Title & Description on their own row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-black uppercase tracking-wider">
                  Section 5 &bull; Capstone Revision
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles size={13} /> Placement & Technical Interview Ready
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                5. Revision &amp; Exam Prep
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-medium">
                Final revision &bull; Exam preparation &bull; Quick review. Revise the most important CN concepts before placement exams.
              </p>
            </div>

            <div className="shrink-0 self-start sm:self-auto">
              <AddNoteButton
                contextType="cn_revision"
                contextId="cn_master_exam_revision"
                contextTitle="CN Final Exam Revision Notes"
                variant="outline"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              />
            </div>
          </div>

          {/* Dedicated Separate Block: Current Topic Label & Responsive Pill */}
          <div className="flex flex-col gap-1.5 pt-3.5 border-t border-white/10 min-w-0">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-300">
              Current Topic
            </span>
            <div className="w-fit max-w-full px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-400/30 text-white font-black text-xs sm:text-sm shadow-xs break-words whitespace-normal [overflow-wrap:anywhere]">
              {topic?.topicName || 'Introduction to Computer Networks'}
            </div>
          </div>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'journey', label: '1. End-to-End Data Journey', icon: Workflow },
            { id: 'protocols', label: '2. Protocol Comparison Lab', icon: Zap },
            { id: 'flashcards', label: '3. "Who Does What?" Flashcards', icon: HelpCircle },
            { id: 'numericals', label: '4. Formulas & Numericals', icon: Calculator },
            { id: 'traps', label: '5. Placement Traps', icon: ShieldAlert },
            { id: 'rapid', label: '6. 5-Min Rapid Mode', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: END-TO-END DATA JOURNEY & ENCAPSULATION                      */}
      {/* =================================================================== */}
      {activeTab === 'journey' && (
        <div className="space-y-8">
          {/* Journey Scrubber & Progress */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Interactive Step-by-Step Walkthrough
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  How a Packet Travels: https://example.com
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Step {activeStageIndex + 1} of {CN_DATA_JOURNEY_STAGES.length} &bull; {currentStage.layerName}
                </p>
              </div>

              {/* Sender / Network / Receiver Phase Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
                  currentStage.side === 'sender'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : currentStage.side === 'network'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {currentStage.side === 'sender'
                    ? '1. SENDER SIDE (ENCAPSULATION)'
                    : currentStage.side === 'network'
                    ? '2. INTERMEDIATE ROUTING (TTL & MAC REWRITE)'
                    : '3. RECEIVER SIDE (DECAPSULATION)'}
                </span>
              </div>
            </div>

            {/* Stage Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {CN_DATA_JOURNEY_STAGES.map((stg, sIdx) => {
                const isSelected = sIdx === activeStageIndex;
                const isDone = sIdx < activeStageIndex;
                return (
                  <button
                    key={stg.stage}
                    type="button"
                    onClick={() => setActiveStageIndex(sIdx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : isDone
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <span>{stg.stage}. {stg.layerName.split(' ')[0]}</span>
                    {isDone && <Check size={12} className="text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Visual Stage Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              {/* Left Column: Action, Headers & PDU (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-blue-700 uppercase tracking-wide">
                      Protocol Action at {currentStage.layerName}
                    </span>
                    <span className="font-bold text-slate-500">PDU: {currentStage.pdu}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    {currentStage.action}
                  </p>
                </div>

                {/* Exploded Header Fields Box */}
                {currentStage.headerDetails && (
                  <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 space-y-2.5 font-mono text-xs shadow-inner">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider font-sans">
                        {currentStage.headerAdded}
                      </span>
                      <span className="text-[10px] text-slate-500 font-sans">Header Fields</span>
                    </div>

                    <div className="space-y-1.5">
                      {Object.entries(currentStage.headerDetails).map(([k, v]) => (
                        <div key={k} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                          <span className="text-slate-400 font-bold shrink-0 min-w-[130px]">{k}:</span>
                          <span className="text-emerald-300 font-semibold break-all">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Placement Exam Insight */}
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-1">
                  <span className="font-black text-amber-900 uppercase tracking-wide text-[10px] block flex items-center gap-1.5">
                    <Lightbulb size={13} className="text-amber-600" /> Must-Know Exam Point:
                  </span>
                  <p className="font-medium leading-relaxed">{currentStage.examPoint}</p>
                </div>
              </div>

              {/* Right Column: Visual PDU Encapsulation / Decapsulation Stack (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                    <span className="font-black text-blue-400 uppercase tracking-wider">
                      {currentStage.side === 'sender'
                        ? 'Encapsulation Wrapping'
                        : currentStage.side === 'network'
                        ? 'Transit Packet Framing'
                        : 'Decapsulation Unwrapping'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{currentStage.pdu}</span>
                  </div>

                  {/* Animated Frame Stack Boxes */}
                  <div className="space-y-2 font-mono text-xs">
                    {currentStage.visualStack.map((layer, lIdx) => {
                      let boxBg = 'bg-blue-900/60 border-blue-500 text-blue-200';
                      if (layer.includes('MAC')) boxBg = 'bg-emerald-950/80 border-emerald-500 text-emerald-300';
                      if (layer.includes('IP')) boxBg = 'bg-indigo-950/80 border-indigo-500 text-indigo-300';
                      if (layer.includes('TCP')) boxBg = 'bg-purple-950/80 border-purple-500 text-purple-300';
                      if (layer.includes('HTTP')) boxBg = 'bg-amber-950/80 border-amber-500 text-amber-300';
                      if (layer.includes('Bits')) boxBg = 'bg-teal-950/80 border-teal-500 text-teal-300';

                      return (
                        <div
                          key={lIdx}
                          className={`p-3 rounded-xl border flex items-center justify-between transition-all shadow-sm ${boxBg}`}
                        >
                          <span className="font-bold">{layer}</span>
                          <span className="text-[10px] uppercase font-sans font-extrabold opacity-75">
                            {lIdx === 0 ? 'Outer Header' : lIdx === currentStage.visualStack.length - 1 ? 'Payload' : 'Sub-header'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed font-sans">
                    {currentStage.side === 'sender'
                      ? 'Each descending layer appends its header (wrapping). Data grows in size.'
                      : currentStage.side === 'network'
                      ? 'Routers strip Layer 2 MAC header, inspect Layer 3 IP, decrement TTL, and wrap with new hop MAC.'
                      : 'Each ascending layer strips its header (unwrapping). Original application payload is restored.'}
                  </div>
                </div>

                {/* Step Navigation Controls */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStageIndex(Math.max(0, activeStageIndex - 1))}
                    disabled={activeStageIndex === 0}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeStageIndex === 0
                        ? 'opacity-30 cursor-not-allowed text-slate-400'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer'
                    }`}
                  >
                    <ArrowLeft size={14} />
                    <span>Previous Hop</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveStageIndex(Math.min(CN_DATA_JOURNEY_STAGES.length - 1, activeStageIndex + 1))}
                    disabled={activeStageIndex >= CN_DATA_JOURNEY_STAGES.length - 1}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeStageIndex >= CN_DATA_JOURNEY_STAGES.length - 1
                        ? 'opacity-30 cursor-not-allowed text-slate-400'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 cursor-pointer'
                    }`}
                  >
                    <span>Next Hop</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* "What Changes at Each Hop?" Comparison Table */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Core Placement Checkpoint
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                What Changes vs What Stays the Same at Each Router Hop?
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                One of the most frequently asked technical interview and written exam questions.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 text-slate-700 font-black uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Packet / Header Field</th>
                    <th className="p-3.5">Changes at Each Hop?</th>
                    <th className="p-3.5">Technical Reason</th>
                    <th className="p-3.5">Exam Checkpoint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {CN_WHAT_CHANGES_TABLE.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">{row.field}</td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                          row.changes.startsWith('YES')
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}>
                          {row.changes}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-700 max-w-md">{row.explanation}</td>
                      <td className="p-3.5 text-blue-700 font-semibold">{row.examNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 7-Layer OSI & TCP/IP Interactive Matrix */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Interactive Layer Matrix
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                Layer &bull; PDU &bull; Protocols &bull; Devices &bull; Functions
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Click any layer to inspect its protocols, hardware, and high-yield placement exam points.
              </p>
            </div>

            {/* Clickable Layer Stack */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {CN_LAYER_MATRIX.map((lm) => {
                const isSelected = selectedLayerNum === lm.layerNumber;
                return (
                  <button
                    key={lm.layerNumber}
                    type="button"
                    onClick={() => setSelectedLayerNum(lm.layerNumber)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span className={`text-[10px] font-black uppercase ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                      Layer {lm.layerNumber}
                    </span>
                    <span className="text-xs font-black leading-snug line-clamp-2">
                      {lm.layerName.replace(' Layer', '')}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}>
                      {lm.pdu.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Layer Detail Box */}
            {(() => {
              const sel = CN_LAYER_MATRIX.find((l) => l.layerNumber === selectedLayerNum);
              if (!sel) return null;
              return (
                <div className="p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border border-blue-200 rounded-2xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                        L{sel.layerNumber}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-slate-900">
                        {sel.layerName} &bull; PDU: <span className="font-mono text-blue-700">{sel.pdu}</span>
                      </h4>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">Hardware: {sel.devices}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <strong className="text-slate-900 block font-bold uppercase text-[10px]">Important Protocols:</strong>
                      <p className="text-slate-700 font-mono bg-white p-2 rounded-xl border border-slate-200">
                        {sel.protocols}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-slate-900 block font-bold uppercase text-[10px]">Primary Function:</strong>
                      <p className="text-slate-700 bg-white p-2 rounded-xl border border-slate-200">
                        {sel.mainJob}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
                    <strong className="text-amber-900 font-bold uppercase text-[10px] block">Placement Exam Checkpoint:</strong>
                    {sel.examPoint}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: PROTOCOL COMPARISON LAB                                      */}
      {/* =================================================================== */}
      {activeTab === 'protocols' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  High-Yield Comparisons
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Core Networking Protocols Revision
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Direct side-by-side trade-offs commonly tested in technical placement rounds.
                </p>
              </div>

              {/* Protocol Selector Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {CN_PROTOCOL_CARDS.map((proto) => (
                  <button
                    key={proto.id}
                    type="button"
                    onClick={() => setActiveProtocolId(proto.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      activeProtocolId === proto.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {proto.title.split(':')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Protocol Card Content */}
            {(() => {
              const activeProto = CN_PROTOCOL_CARDS.find((p) => p.id === activeProtocolId) || CN_PROTOCOL_CARDS[0];

              return (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                        {activeProto.layer}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                        {activeProto.title}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                      {activeProto.badge}
                    </span>
                  </div>

                  {activeProto.summary && (
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                      {activeProto.summary}
                    </p>
                  )}

                  {/* Comparison Table if present */}
                  {activeProto.comparisons && (
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="min-w-full text-xs text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-700 font-black uppercase text-[11px] border-b border-slate-200">
                          <tr>
                            <th className="p-3.5">Architectural Dimension</th>
                            <th className="p-3.5 text-blue-700 font-extrabold">TCP / Secure Variant</th>
                            <th className="p-3.5 text-indigo-700 font-extrabold">UDP / Standard Variant</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {activeProto.comparisons.map((row, cIdx) => (
                            <tr key={cIdx} className="hover:bg-slate-50/70">
                              <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">{row.feature}</td>
                              <td className="p-3.5 text-slate-800 bg-blue-50/30">{row.tcp}</td>
                              <td className="p-3.5 text-slate-800 bg-indigo-50/30">{row.udp}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Key Takeaways */}
                  {activeProto.keyPoints && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <strong className="text-xs font-black text-slate-900 uppercase tracking-wide block">
                        High-Yield Operational Facts:
                      </strong>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {activeProto.keyPoints.map((kp, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{kp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Exam Trap */}
                  {activeProto.examTrap && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-950 space-y-1">
                      <strong className="text-rose-900 font-bold uppercase text-[10px] block flex items-center gap-1.5">
                        <ShieldAlert size={14} className="text-rose-600" /> Interview Trap to Avoid:
                      </strong>
                      <p className="font-medium leading-relaxed">{activeProto.examTrap}</p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: "WHO DOES WHAT?" RAPID FLASHCARDS                            */}
      {/* =================================================================== */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  Rapid Exam Flashcards
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  "Who Does What?" In Computer Networks
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Click any card to reveal the underlying protocol, hardware device, and technical explanation.
                </p>
              </div>

              <span className="text-xs font-bold text-slate-400">
                12 Essential Flashcards
              </span>
            </div>

            {/* Flashcards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {CN_WHO_DOES_WHAT.map((card, idx) => {
                const isRevealed = Boolean(revealedFlashcards[card.id]);
                return (
                  <div
                    key={card.id}
                    onClick={() => toggleFlashcard(card.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isRevealed
                        ? 'bg-blue-50/80 border-blue-400 shadow-md ring-1 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-slate-400">
                          Question #{idx + 1}
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                          {isRevealed ? 'Tap to hide' : 'Tap to reveal'}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                        {card.question}
                      </h4>
                    </div>

                    {isRevealed ? (
                      <div className="pt-3 border-t border-blue-200/80 space-y-1.5 animate-fadeIn">
                        <span className="text-xs font-black text-blue-800 block">
                          👉 {card.answer}
                        </span>
                        <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                          {card.detail}
                        </p>
                      </div>
                    ) : (
                      <div className="pt-2 text-[11px] text-slate-400 font-semibold flex items-center justify-end gap-1">
                        <span>Show Answer</span>
                        <ChevronRight size={14} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 4: FORMULAS & NUMERICALS                                        */}
      {/* =================================================================== */}
      {activeTab === 'numericals' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  High-Yield Formulas
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  CN Numericals & Calculation Cheatsheet
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Subnetting math, delay calculations, bandwidth-delay product, and sliding window efficiency.
                </p>
              </div>

              <button
                type="button"
                onClick={onNavigateToPractice}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20"
              >
                <span>Practice MCQs on Numericals</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Numericals Cards */}
            <div className="space-y-6">
              {CN_NUMERICALS_CHEATSHEET.map((num) => (
                <div key={num.id} className="p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-black text-slate-900">
                      {num.title}
                    </h3>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 font-mono text-xs font-bold">
                      {num.formula}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {num.explanation}
                  </p>

                  {/* Worked Example */}
                  {num.workedExample && (
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 text-xs">
                      <strong className="text-blue-900 font-bold uppercase text-[10px] block">
                        Worked Placement Numerical Problem:
                      </strong>
                      <p className="font-semibold text-slate-900">{num.workedExample.problem}</p>
                      <div className="space-y-1 font-mono text-[11px] text-slate-700 pt-1">
                        {num.workedExample.solution.map((st, stIdx) => (
                          <div key={stIdx} className="leading-relaxed">{st}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {num.examTip && (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950 font-medium">
                      <strong>Exam Tip:</strong> {num.examTip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 5: PLACEMENT INTERVIEW TRAPS                                    */}
      {/* =================================================================== */}
      {activeTab === 'traps' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                Exam Pitfalls
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Top Computer Networks Interview Traps
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Common misconceptions where candidates lose marks in technical interviews and screening tests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CN_INTERVIEW_TRAPS.map((tr, tIdx) => (
                <div key={tIdx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Concept: {tr.concept}
                  </span>

                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950 space-y-1">
                    <strong className="text-rose-900 font-bold block text-[10px] uppercase flex items-center gap-1">
                      <AlertTriangle size={12} /> The Misconception / Trap:
                    </strong>
                    <p className="font-semibold">{tr.wrong}</p>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1">
                    <strong className="text-emerald-900 font-bold block text-[10px] uppercase flex items-center gap-1">
                      <CheckCircle2 size={12} /> The Correct Technical Reality:
                    </strong>
                    <p className="font-medium leading-relaxed">{tr.correct}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 6: 5-MINUTE RAPID REVISION MODE                                 */}
      {/* =================================================================== */}
      {activeTab === 'rapid' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                High-Speed Summary
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                5-Minute Rapid CN Revision
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                The absolute essentials to review right before entering a technical interview.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              {[
                { title: '1. OSI 7 Layers', tip: 'Physical (Bits) -> Data Link (Frame) -> Network (Packet) -> Transport (Segment) -> Session -> Presentation -> Application (Data).' },
                { title: '2. TCP vs UDP', tip: 'TCP is connection-oriented, reliable, ordered, 20B header. UDP is connectionless, lightweight, 8B header, low latency.' },
                { title: '3. TCP 3-Way Handshake', tip: 'SYN -> SYN-ACK -> ACK. Establishes bidirectional sequence numbers before application data begins.' },
                { title: '4. DNS Resolution', tip: 'Browser -> Recursive Resolver -> Root Server (.) -> TLD Server (.com) -> Authoritative Server -> IP Returned.' },
                { title: '5. DHCP DORA', tip: 'Discover (Broadcast) -> Offer (Unicast/Bcast) -> Request (Broadcast) -> Ack. Leases IP, Gateway, and DNS.' },
                { title: '6. ARP (IP -> MAC)', tip: 'Broadcasts ARP Request on local subnet; target replies with unicast MAC. Cannot cross routers!' },
                { title: '7. MAC vs IP', tip: 'MAC addresses are physical and rewritten at EVERY hop. IP addresses are logical and stay end-to-end.' },
                { title: '8. Port Numbers', tip: '16-bit process IDs (0-65535). HTTP=80, HTTPS=443, SSH=22, DNS=53, DHCP=67/68, NTP=123.' },
                { title: '9. Subnetting Formula', tip: 'Usable hosts = 2^(32 - prefix) - 2. Always subtract 2 for Network ID and Broadcast ID.' },
                { title: '10. Router vs Switch', tip: 'Switch connects same subnet (L2, MAC). Router connects different subnets (L3, IP).' },
                { title: '11. NAT / PAT', tip: 'Translates private RFC 1918 IPs to one public IP using unique ephemeral port numbers.' },
                { title: '12. HTTP Status Codes', tip: '2xx Success (200), 3xx Redirection (301, 304), 4xx Client Error (400, 403, 404), 5xx Server Error (500, 502, 503).' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                  <h4 className="font-black text-slate-900 text-xs sm:text-sm">{item.title}</h4>
                  <p className="text-slate-700 leading-relaxed font-medium">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
