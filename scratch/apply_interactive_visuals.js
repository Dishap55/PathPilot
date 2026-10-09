import fs from 'fs';
import path from 'path';

const filePath = path.resolve('client/src/components/learning/AptitudeTopicIntroduction.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The replacement chunk for Visuals (Cards 1 to 10)
const newVisualsCode = `// ------------------------------------------------------------------
// CARD 1: INTERACTIVE CONCEPT SIMULATORS & TOPIC ILLUSTRATIONS
// ------------------------------------------------------------------

// 1. Time, Speed & Distance Interactive Visual
function TSDInteractiveVisual() {
  const [speed, setSpeed] = useState(60);
  const [time, setTime] = useState(2);

  const distance = speed * time;
  // Animation duration inversely proportional to speed:
  // 120 km/h -> 1.5s (fast); 60 km/h -> 3s (medium); 20 km/h -> 8s (slow)
  const driveDuration = (180 / speed).toFixed(2);

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Kinematics Simulator: Distance = Speed × Time
        </span>
        <span className="text-[11px] font-mono text-[#3E5575] font-bold">
          {speed} km/h × {time} h = {distance} km
        </span>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Speed:</span>
          <button
            onClick={() => setSpeed((s) => Math.max(20, s - 10))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease speed"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-14 text-center">{speed} km/h</span>
          <button
            onClick={() => setSpeed((s) => Math.min(120, s + 10))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase speed"
          >
            +
          </button>
          <input
            type="range"
            min="20"
            max="120"
            step="10"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-20 sm:w-28 accent-[#6574C4] h-1.5 cursor-pointer"
          />
        </div>

        {/* Time Control */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Time:</span>
          <button
            onClick={() => setTime((t) => Math.max(1, t - 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease time"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-10 text-center">{time} h</span>
          <button
            onClick={() => setTime((t) => Math.min(5, t + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase time"
          >
            +
          </button>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="w-16 sm:w-20 accent-[#6574C4] h-1.5 cursor-pointer"
          />
        </div>
      </div>

      {/* Road & Moving Car Simulation */}
      <div className="space-y-1.5 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#667085]">
          <span>City A (Start)</span>
          <span className="text-[#3E5575] font-mono">
            {speed > 80 ? '⚡ High Speed Travel' : speed < 40 ? '🐢 Slow Cruise' : '🚗 Regular Speed'}
          </span>
          <span>City B ({distance} km)</span>
        </div>
        <div className="relative w-full h-5 bg-[#CAD9EA] rounded-full flex items-center px-1 border border-[#CAD9EA] overflow-hidden">
          {/* Animated road markers */}
          <div className="absolute inset-0 flex items-center justify-around opacity-30 pointer-events-none">
            <span className="w-2 h-1 bg-white rounded-full" />
            <span className="w-2 h-1 bg-white rounded-full" />
            <span className="w-2 h-1 bg-white rounded-full" />
            <span className="w-2 h-1 bg-white rounded-full" />
            <span className="w-2 h-1 bg-white rounded-full" />
          </div>
          {/* Car with dynamic animation speed */}
          <div
            className="absolute -top-1.5 text-base sm:text-lg animate-edu-drive select-none"
            style={{ animationDuration: \`\${driveDuration}s\` }}
          >
            🚗
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-[#667085] font-mono">
          <span>0 km</span>
          <span className="text-[#3E5575] font-bold">Speed = {speed} km/h (Loop: {driveDuration}s)</span>
          <span className="text-[#3F634B] font-bold">{distance} km Total</span>
        </div>
      </div>
    </div>
  );
}

// 2. Profit & Loss Interactive Visual
function ProfitLossInteractiveVisual() {
  const [cp, setCp] = useState(500);
  const [sp, setSp] = useState(600);

  const diff = sp - cp;
  const isProfit = diff >= 0;
  const absDiff = Math.abs(diff);
  const pct = cp > 0 ? ((absDiff / cp) * 100).toFixed(1) : '0';

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Profit &amp; Loss Simulator
        </span>
        <span
          className={\`px-2 py-0.5 rounded-full text-[11px] font-bold font-mono \${
            isProfit
              ? 'bg-[#E7F1EA] text-[#3F634B] border border-[#C9DED0]'
              : 'bg-[#F6E5DF] text-[#824F47] border border-[#E7C9C0]'
          }\`}
        >
          {isProfit ? \`+₹\${diff} PROFIT (\${pct}%)\` : \`−₹\${absDiff} LOSS (\${pct}%)\`}
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        {/* Cost Price Control */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Cost Price (CP):</span>
          <button
            onClick={() => setCp((v) => Math.max(100, v - 50))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease CP"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-14 text-center">₹{cp}</span>
          <button
            onClick={() => setCp((v) => Math.min(1000, v + 50))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase CP"
          >
            +
          </button>
        </div>

        {/* Selling Price Control */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Selling Price (SP):</span>
          <button
            onClick={() => setSp((v) => Math.max(100, v - 50))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease SP"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-14 text-center">₹{sp}</span>
          <button
            onClick={() => setSp((v) => Math.min(1200, v + 50))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase SP"
          >
            +
          </button>
        </div>
      </div>

      {/* Visual Pipeline */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full">
          <span className="text-xl">🛍️</span>
          <div>
            <div className="text-[10px] text-[#667085] uppercase font-bold">Cost Price (CP)</div>
            <div className="text-xs font-black text-[#293247]">Base Cost: ₹{cp}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#6574C4]">
          <ArrowRight size={18} className="text-[#6574C4] animate-edu-shift shrink-0" />
        </div>

        <div className="flex items-center gap-2.5 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full">
          <span className="text-xl">🏷️</span>
          <div>
            <div className="text-[10px] text-[#667085] uppercase font-bold">Selling Price (SP)</div>
            <div className="text-xs font-black text-[#293247]">Market Sale: ₹{sp}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#6574C4]">
          <ArrowRight size={18} className="text-[#6574C4] animate-edu-shift shrink-0" />
        </div>

        <div
          className={\`px-3 py-2.5 rounded-xl border text-xs font-bold shadow-2xs shrink-0 text-center transition-all \${
            isProfit
              ? 'bg-[#E7F1EA] border-[#C9DED0] text-[#3F634B]'
              : 'bg-[#F6E5DF] border-[#E7C9C0] text-[#824F47]'
          }\`}
        >
          <div className="text-[10px] uppercase font-black">
            {isProfit ? 'SP &gt; CP → Profit' : 'SP &lt; CP → Loss'}
          </div>
          <div className="text-sm font-black font-mono">
            {isProfit ? \`+₹\${diff}\` : \`−₹\${absDiff}\`} ({pct}%)
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Percentages Interactive Visual
function PercentagesInteractiveVisual() {
  const base = 1000;
  const [pct, setPct] = useState(25);

  const amount = (base * pct) / 100;
  const presets = [10, 20, 25, 40, 50, 75];

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> 100-Cell Percentage Grid &amp; Fractional Scale
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">
          {pct}% of ₹{base} = ₹{amount} (25 cells = 25% = ¼)
        </span>
      </div>

      {/* Preset Buttons & Slider */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Rate:</span>
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setPct(p)}
              className={\`px-2 py-0.5 rounded-lg text-xs font-bold transition-all \${
                pct === p
                  ? 'bg-[#6574C4] text-white shadow-2xs'
                  : 'bg-[#E8EFF8] text-[#3E5575] hover:bg-[#CAD9EA]/60'
              }\`}
            >
              {p}%
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Slider:</span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={pct}
            onChange={(e) => setPct(Number(e.target.value))}
            className="w-24 sm:w-32 accent-[#6574C4] h-1.5 cursor-pointer"
          />
          <span className="font-mono font-bold text-[#293247] w-10 text-right">{pct}%</span>
        </div>
      </div>

      {/* 100-Cell Grid & Live Conversion Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* 10x10 Grid (100 cells) */}
        <div className="grid grid-cols-10 gap-0.5 p-1.5 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs shrink-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className={\`w-2.5 h-2.5 rounded-[1px] transition-colors duration-200 \${
                i < pct ? 'bg-[#6574C4] shadow-2xs' : 'bg-[#CAD9EA]'
              }\`}
            />
          ))}
        </div>

        {/* Live Calculation Cards */}
        <div className="flex-1 w-full space-y-2">
          {/* Fill progress bar */}
          <div className="w-full bg-[#E8EFF8] h-3.5 rounded-full p-0.5 border border-[#CAD9EA] overflow-hidden">
            <div
              className="bg-[#6574C4] h-full rounded-full transition-all duration-300"
              style={{ width: \`\${pct}%\` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] text-center shadow-2xs">
              <span className="text-[10px] text-[#667085] block font-sans">Fraction Equivalence</span>
              <strong className="text-[#3E5575] font-bold">{pct} / 100 = {(pct / 100).toFixed(2)}</strong>
            </div>
            <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] text-center shadow-2xs">
              <span className="text-[10px] text-[#3F634B] block font-sans">Calculated Amount</span>
              <strong className="text-[#3F634B] font-bold text-sm">₹{amount}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Ratio & Proportion Interactive Visual
function RatioInteractiveVisual() {
  const [partA, setPartA] = useState(3);
  const [partB, setPartB] = useState(2);
  const total = 500;

  const totalParts = partA + partB;
  const shareA = Math.round((total * partA) / totalParts);
  const shareB = Math.round((total * partB) / totalParts);

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Ratio 3 : 2 = 5 Total Parts Visual Block System
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">Total: ₹{total}</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#3E5575] text-[11px]">Blue Share A:</span>
          <button
            onClick={() => setPartA((v) => Math.max(1, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease A"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-6 text-center">{partA}</span>
          <button
            onClick={() => setPartA((v) => Math.min(6, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase A"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#45456A] text-[11px]">Purple Share B:</span>
          <button
            onClick={() => setPartB((v) => Math.max(1, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] font-black flex items-center justify-center hover:bg-[#D9D2EA]/50 active:scale-95"
            title="Decrease B"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-6 text-center">{partB}</span>
          <button
            onClick={() => setPartB((v) => Math.min(6, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] font-black flex items-center justify-center hover:bg-[#D9D2EA]/50 active:scale-95"
            title="Increase B"
          >
            +
          </button>
        </div>
      </div>

      {/* Visual Circles & Shares */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Dynamic Tokens */}
        <div className="flex items-center gap-3 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs">
          <div className="flex items-center gap-1">
            {Array.from({ length: partA }).map((_, i) => (
              <span key={\`a-\${i}\`} className="w-5 h-5 rounded-full bg-indigo-500 shadow-2xs inline-block animate-edu-pulse" />
            ))}
          </div>
          <span className="font-black text-sm text-[#667085] px-1">:</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: partB }).map((_, i) => (
              <span key={\`b-\${i}\`} className="w-5 h-5 rounded-full bg-purple-500 shadow-2xs inline-block animate-edu-pulse" />
            ))}
          </div>
        </div>

        {/* Calculated Shares */}
        <div className="flex items-center gap-2 flex-1 w-full justify-end font-mono text-xs">
          <div className="p-2.5 bg-[#E8EFF8] border border-[#CAD9EA] rounded-xl text-center shadow-2xs flex-1">
            <span className="text-[10px] font-sans text-[#667085] block">Share A ({partA}/{totalParts})</span>
            <strong className="text-[#3E5575] font-black text-sm">₹{shareA}</strong>
          </div>
          <div className="p-2.5 bg-[#EDE9F6] border border-[#D9D2EA] rounded-xl text-center shadow-2xs flex-1">
            <span className="text-[10px] font-sans text-[#667085] block">Share B ({partB}/{totalParts})</span>
            <strong className="text-[#45456A] font-black text-sm">₹{shareB}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Geometry Interactive Visual
function GeometryInteractiveVisual() {
  const [length, setLength] = useState(8);
  const [width, setWidth] = useState(5);

  const area = length * width;
  const perimeter = 2 * (length + width);

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> 2D Shape Geometry: Dynamic Rectangle, Triangle &amp; Circle
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">
          Area = {area} cm² • Perimeter = {perimeter} cm
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Rectangle Length (L):</span>
          <button
            onClick={() => setLength((v) => Math.max(4, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease L"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-12 text-center">{length} cm</span>
          <button
            onClick={() => setLength((v) => Math.min(12, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase L"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Width (W):</span>
          <button
            onClick={() => setWidth((v) => Math.max(2, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease W"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-12 text-center">{width} cm</span>
          <button
            onClick={() => setWidth((v) => Math.min(8, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase W"
          >
            +
          </button>
        </div>
      </div>

      {/* Visual Dynamic Shape Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Dynamic Shape Canvas */}
        <div className="h-24 w-full sm:w-56 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] flex items-center justify-center p-2 relative shadow-2xs">
          <div
            className="border-2 border-[#6574C4] bg-[#EDE9F6]/80 rounded flex flex-col items-center justify-center text-[10px] font-bold text-[#45456A] shadow-xs transition-all duration-300 relative"
            style={{
              width: \`\${length * 15}px\`,
              height: \`\${width * 11}px\`,
              maxWidth: '92%',
              maxHeight: '90%'
            }}
          >
            <span className="absolute -top-3.5 text-[9px] font-mono text-[#6574C4] font-bold">{length} cm</span>
            <span className="absolute -right-4 text-[9px] font-mono text-[#6574C4] font-bold">{width}</span>
            <span>{area} cm²</span>
          </div>
        </div>

        {/* Live Calculation Cards */}
        <div className="grid grid-cols-2 gap-2 flex-1 w-full text-xs font-mono">
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] shadow-2xs space-y-0.5">
            <span className="text-[10px] font-sans font-bold text-[#667085] uppercase">Area = Length × Width</span>
            <div className="text-sm font-black text-[#3E5575]">L × W = {area} cm²</div>
            <div className="text-[10px] text-[#667085] font-sans">Triangle Area: ½ b×h • Circle: πr²</div>
          </div>
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] shadow-2xs space-y-0.5">
            <span className="text-[10px] font-sans font-bold text-[#667085] uppercase">Perimeter = 2(L + W)</span>
            <div className="text-sm font-black text-[#3F634B]">2(L + W) = {perimeter} cm</div>
            <div className="text-[10px] text-[#667085] font-sans">Circle Circumference: 2πr</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. Simple Interest Interactive Visual
function SimpleInterestInteractiveVisual() {
  const [p, setP] = useState(1000);
  const [r, setR] = useState(10);
  const [t, setT] = useState(2);

  const interest = (p * r * t) / 100;
  const total = p + interest;

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Simple Interest Linear Progression Simulator
        </span>
        <span className="text-[11px] font-mono text-[#3E5575] font-bold">SI = (P × R × T) / 100</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Rate (R):</span>
          <button
            onClick={() => setR((v) => Math.max(5, v - 2.5))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease R"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-12 text-center">{r}%</span>
          <button
            onClick={() => setR((v) => Math.min(25, v + 2.5))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase R"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Time (T):</span>
          <button
            onClick={() => setT((v) => Math.max(1, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Decrease T"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-12 text-center">{t} yrs</span>
          <button
            onClick={() => setT((v) => Math.min(5, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
            title="Increase T"
          >
            +
          </button>
        </div>
      </div>

      {/* Visual Equation Pipeline */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full space-y-0.5">
          <span className="text-[10px] text-[#667085] uppercase font-bold block">Principal (P)</span>
          <span className="text-sm font-black text-[#293247]">₹{p}</span>
        </div>

        <span className="text-xs font-bold text-[#3E5575] bg-[#FFF8EE] px-3 py-1.5 rounded-xl border border-[#CAD9EA] shadow-2xs shrink-0">
          + {r}%/yr × {t} yrs
        </span>

        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full space-y-0.5">
          <span className="text-[10px] text-[#667085] uppercase font-bold block">Interest (SI)</span>
          <span className="text-sm font-black text-[#3F634B]">+₹{interest}</span>
        </div>

        <div className="px-3.5 py-3 rounded-xl bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] text-xs font-bold shadow-2xs shrink-0 text-center">
          <span className="text-[9px] uppercase font-bold block text-[#667085]">Total Return</span>
          <span className="text-sm font-black font-mono">₹{total}</span>
          <span className="text-[9px] text-[#667085] block font-normal">Total = ₹12,000 baseline on 10k</span>
        </div>
      </div>
    </div>
  );
}

// 7. Compound Interest Interactive Visual
function CompoundInterestInteractiveVisual() {
  const p = 1000;
  const [r, setR] = useState(10);

  const y1 = Math.round(p * (1 + r / 100));
  const y2 = Math.round(p * Math.pow(1 + r / 100, 2));
  const y3 = Math.round(p * Math.pow(1 + r / 100, 3));

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Interest on Interest &amp; Compounding Growth Curve
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">Compounding Growth 📈</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Compounding Rate:</span>
          {[5, 10, 15, 20].map((rate) => (
            <button
              key={rate}
              onClick={() => setR(rate)}
              className={\`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all \${
                r === rate
                  ? 'bg-[#6574C4] text-white shadow-2xs'
                  : 'bg-[#E8EFF8] text-[#3E5575] hover:bg-[#CAD9EA]/60'
              }\`}
            >
              {rate}%
            </button>
          ))}
        </div>
        <div className="text-[11px] font-mono text-[#3E5575]">Principal: ₹{p}</div>
      </div>

      {/* Year-by-Year Growth Bar Chart */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1 text-xs">
          <div className="font-extrabold text-[#293247]">Exponential Growth Dynamics</div>
          <div className="text-[11px] text-[#667085]">
            Each subsequent year earns interest on both the initial principal AND accumulated past interest.
          </div>
        </div>

        <div className="flex items-end gap-3 h-16 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs shrink-0">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-[#667085]">Yr 1</span>
            <div className="w-10 h-7 bg-[#CAD9EA] rounded-t flex items-center justify-center text-[10px] font-bold text-[#3E5575]">
              ₹{y1}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-[#667085]">Yr 2</span>
            <div className="w-10 h-9 bg-[#B3C8E8] rounded-t flex items-center justify-center text-[10px] font-bold text-[#3E5575]">
              ₹{y2}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-[#667085]">Yr 3</span>
            <div className="w-10 h-12 bg-[#6574C4] rounded-t flex items-center justify-center text-[10px] font-bold text-white shadow-xs animate-edu-pulse">
              ₹{y3}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Probability Interactive Visual
function ProbabilityInteractiveVisual() {
  const [selectedEvent, setSelectedEvent] = useState('even');

  const events = {
    even: { name: 'Even Numbers', faces: [2, 4, 6], count: 3 },
    odd: { name: 'Odd Numbers', faces: [1, 3, 5], count: 3 },
    gt4: { name: 'Greater than 4', faces: [5, 6], count: 2 },
    prime: { name: 'Prime Numbers', faces: [2, 3, 5], count: 3 },
    six: { name: 'Number 6', faces: [6], count: 1 }
  };

  const curr = events[selectedEvent];

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Probability Measure: Favorable vs Total Sample Space
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">P = Favorable / Total</span>
      </div>

      {/* Event Selection Pills */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[#FFF8EE] p-2 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <span className="font-bold text-[#667085] text-[11px]">Target Event:</span>
        {Object.entries(events).map(([key, ev]) => (
          <button
            key={key}
            onClick={() => setSelectedEvent(key)}
            className={\`px-2 py-0.5 rounded-lg text-xs font-bold transition-all \${
              selectedEvent === key
                ? 'bg-[#6574C4] text-white shadow-2xs'
                : 'bg-[#E8EFF8] text-[#3E5575] hover:bg-[#CAD9EA]/60'
            }\`}
          >
            {ev.name} ({ev.count})
          </button>
        ))}
      </div>

      {/* 6 Die Faces + Live Calculation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Die Faces */}
        <div className="flex items-center gap-1.5 p-2 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs">
          <span className="text-xl mr-1">🎲</span>
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const isFav = curr.faces.includes(num);
            return (
              <div
                key={num}
                className={\`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-300 \${
                  isFav
                    ? 'bg-[#6574C4] text-white shadow-xs scale-105 ring-2 ring-[#EDE9F6]'
                    : 'bg-[#E8EFF8] text-[#667085] opacity-50'
                }\`}
              >
                {num}
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl text-xs font-medium text-[#293247] shadow-2xs flex-1">
          <div className="font-bold text-[#3E5575]">Die Roll: 6 Total Outcomes</div>
          <div className="text-[11px] text-[#667085]">🎯 Even: 2, 4, 6 ({curr.count} favorable outcomes)</div>
        </div>

        <div className="px-3.5 py-3 rounded-xl bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-bold text-xs shadow-2xs shrink-0 text-center font-mono">
          P = {curr.count}/6 = {((curr.count / 6) * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

// 9. Average Interactive Visual
function AverageInteractiveVisual() {
  const [n1, setN1] = useState(10);
  const [n2, setN2] = useState(20);
  const [n3, setN3] = useState(30);

  const sum = n1 + n2 + n3;
  const avg = (sum / 3).toFixed(1);

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Arithmetic Mean &amp; Balance Point Simulator
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">
          Average = ({n1} + {n2} + {n3}) / 3 = {avg}
        </span>
      </div>

      {/* 3 Number Controls */}
      <div className="grid grid-cols-3 gap-2 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        {[
          { label: 'Value 1', val: n1, set: setN1 },
          { label: 'Value 2', val: n2, set: setN2 },
          { label: 'Value 3', val: n3, set: setN3 }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-center gap-1.5">
            <span className="font-bold text-[#667085] text-[10px] hidden sm:inline">{item.label}:</span>
            <button
              onClick={() => item.set((v) => Math.max(0, v - 5))}
              className="w-5 h-5 rounded bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black text-xs flex items-center justify-center"
            >
              −
            </button>
            <span className="font-mono font-bold text-[#293247] w-8 text-center">{item.val}</span>
            <button
              onClick={() => item.set((v) => Math.min(50, v + 5))}
              className="w-5 h-5 rounded bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black text-xs flex items-center justify-center"
            >
              +
            </button>
          </div>
        ))}
      </div>

      {/* Dynamic Data Bars & Mean Line */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-end gap-3 h-16 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs flex-1">
          {[n1, n2, n3].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <span className="text-[9px] font-mono font-bold text-[#667085]">{val}</span>
              <div
                className="w-full bg-[#6574C4] rounded-t transition-all duration-300"
                style={{ height: \`\${Math.max(6, (val / 50) * 44)}px\` }}
              />
            </div>
          ))}
        </div>

        <div className="px-4 py-3 bg-[#E7F1EA] border border-[#C9DED0] rounded-xl text-center shadow-2xs shrink-0 font-mono">
          <span className="text-[10px] font-sans font-bold text-[#3F634B] uppercase block">Calculated Mean</span>
          <strong className="text-base font-black text-[#3F634B]">{avg}</strong>
        </div>
      </div>
    </div>
  );
}

// 10. Permutation & Combination Interactive Visual
function PermutationCombinationInteractiveVisual() {
  const [n, setN] = useState(5);
  const [r, setR] = useState(2);

  const fact = (num) => (num <= 1 ? 1 : num * fact(num - 1));
  const nPr = Math.round(fact(n) / fact(n - r));
  const nCr = Math.round(fact(n) / (fact(r) * fact(n - r)));

  const pool = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].slice(0, n);

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles size={14} className="text-[#6574C4]" /> Permutation &amp; Combination Simulator
        </span>
        <span className="text-[11px] font-mono text-[#3F634B] font-bold">
          n = {n}, r = {r}
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Total Items (n):</span>
          <button
            onClick={() => {
              const newN = Math.max(3, n - 1);
              setN(newN);
              if (r > newN) setR(newN);
            }}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-6 text-center">{n}</span>
          <button
            onClick={() => setN((v) => Math.min(7, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E8EFF8] border border-[#CAD9EA] text-[#3E5575] font-black flex items-center justify-center hover:bg-[#CAD9EA]/50 active:scale-95"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#667085] text-[11px]">Chosen Items (r):</span>
          <button
            onClick={() => setR((v) => Math.max(1, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] font-black flex items-center justify-center hover:bg-[#D9D2EA]/50 active:scale-95"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-6 text-center">{r}</span>
          <button
            onClick={() => setR((v) => Math.min(n, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] text-[#45456A] font-black flex items-center justify-center hover:bg-[#D9D2EA]/50 active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      {/* Item Pool & Calculation Display */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Item tokens */}
        <div className="flex items-center gap-1.5 p-2 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs">
          {pool.map((item, idx) => (
            <div
              key={idx}
              className={\`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs \${
                idx < r
                  ? 'bg-[#6574C4] text-white shadow-xs animate-edu-pulse'
                  : 'bg-[#E8EFF8] text-[#3E5575]'
              }\`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Permutation & Combination Cards */}
        <div className="grid grid-cols-2 gap-2 flex-1 w-full font-mono text-xs">
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#D9D2EA] shadow-2xs text-center">
            <span className="text-[10px] font-sans text-[#667085] block">Permutations (Order Matters)</span>
            <strong className="text-sm font-black text-[#45456A]">{n}P{r} = {nPr}</strong>
          </div>
          <div className="p-2.5 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs text-center">
            <span className="text-[10px] font-sans text-[#3F634B] block">Combinations (Groups)</span>
            <strong className="text-sm font-black text-[#3F634B]">{n}C{r} = {nCr}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// Master Concept Illustration Component for Card 1
function ConceptIllustration({ topicId }) {
  if (topicId === 'percentages') return <PercentagesInteractiveVisual />;
  if (topicId === 'profit-and-loss') return <ProfitLossInteractiveVisual />;
  if (topicId === 'ratio-and-proportion') return <RatioInteractiveVisual />;
  if (topicId === 'geometry') return <GeometryInteractiveVisual />;
  if (topicId === 'time-speed-distance' || topicId === 'boats-and-streams') return <TSDInteractiveVisual />;
  if (topicId === 'simple-interest') return <SimpleInterestInteractiveVisual />;
  if (topicId === 'compound-interest') return <CompoundInterestInteractiveVisual />;
  if (topicId === 'average') return <AverageInteractiveVisual />;
  if (topicId === 'probability') return <ProbabilityInteractiveVisual />;
  if (topicId === 'permutation-and-combination') return <PermutationCombinationInteractiveVisual />;

  if (topicId === 'number-system') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> The Real Number Line &amp; Number Classification
          </span>
          <span className="text-[11px] font-bold text-[#667085]">Negative &bull; Zero &bull; Positive &bull; Primes</span>
        </div>

        {/* Number Line Graphic */}
        <div className="relative w-full py-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] px-3 shadow-2xs">
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-[#CAD9EA] rounded-full" />
          <div className="relative z-10 flex items-center justify-between">
            {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((num) => {
              const isPrime = [2, 3, 5].includes(num);
              const isZero = num === 0;
              const isNeg = num < 0;
              return (
                <div key={num} className="flex flex-col items-center gap-1">
                  <div
                    className={\`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-2xs \${
                      isPrime
                        ? 'bg-[#6574C4] text-white ring-2 ring-[#EDE9F6] animate-edu-pulse'
                        : isZero
                        ? 'bg-[#F8EEDC] text-[#705B35] border border-[#E6D4B4]'
                        : isNeg
                        ? 'bg-[#F6E5DF] text-[#824F47] border border-[#E7C9C0]'
                        : 'bg-[#E8EFF8] text-[#293247] border border-[#CAD9EA]'
                    }\`}
                  >
                    {num}
                  </div>
                  <span className="text-[9px] font-bold text-[#667085]">
                    {isZero ? 'Zero' : isPrime ? 'Prime' : isNeg ? 'Neg' : 'Pos'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Division Core Foundation */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-[#FFF8EE] p-2.5 rounded-xl border border-[#D9D1C7] shadow-2xs font-mono">
          <span className="text-[#667085] font-sans font-bold">Division Algorithm:</span>
          <span className="font-bold text-[#293247]">Dividend = (Divisor × Quotient) + Remainder</span>
          <span className="px-2 py-0.5 rounded bg-[#E7F1EA] text-[#3F634B] font-bold border border-[#C9DED0]">
            17 = (5 × 3) + 2
          </span>
        </div>
      </div>
    );
  }

  if (topicId === 'letter-series' || topicId === 'letter-classification') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Alphabet Sequence Jump Progression (EJOTY Anchor)
          </span>
          <span className="text-[11px] font-mono text-[#667085]">Uniform +2 Difference</span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap bg-[#FFF8EE] py-3.5 px-4 rounded-xl border border-[#D9D1C7] shadow-2xs w-full">
          {[
            { letter: 'A', num: 1 },
            { letter: 'C', num: 3 },
            { letter: 'E', num: 5 },
            { letter: 'G', num: 7 },
            { letter: 'I', num: 9, isTarget: true }
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={\`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-2xs transition-all \${
                    item.isTarget
                      ? 'bg-[#6574C4] text-white ring-2 ring-[#EDE9F6] animate-edu-pulse'
                      : 'bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]'
                  }\`}
                >
                  {item.letter}
                </div>
                <span className="text-[10px] font-mono text-[#667085]">Pos {item.num}</span>
              </div>
              {idx < arr.length - 1 && (
                <div className="flex flex-col items-center text-[#6574C4] font-bold text-[10px] px-1">
                  <span>+2</span>
                  <ArrowRight size={13} className="animate-edu-shift" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs bg-[#FFF8EE] px-3 py-1.5 rounded-xl border border-[#D9D1C7] shadow-2xs">
          <span className="text-[#667085]">EJOTY Landmarks: E(5), J(10), O(15), T(20), Y(25)</span>
          <span className="text-[#3F634B] font-bold">✓ G (Pos 7) + 2 = I (Pos 9)</span>
        </div>
      </div>
    );
  }

  if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Seating Arrangement: Linear Row &amp; Circular Table
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">Orientation Rules</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Linear Row */}
          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-[#667085] uppercase">
              <span>Linear Row (Facing North)</span>
              <span className="text-[#3E5575]">Left=West, Right=East</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center py-2 px-1 bg-[#F8F4EE] rounded-lg border border-[#D9D1C7]">
              {['1 (A)', '2 (B)', '3 (C-Mid)', '4 (D)', '5 (E)'].map((seat, sIdx) => (
                <div
                  key={sIdx}
                  className={\`px-2 py-1 rounded text-[10px] font-bold shadow-2xs \${
                    seat.includes('Mid') ? 'bg-[#6574C4] text-white' : 'bg-[#FFF8EE] text-[#293247] border border-[#CAD9EA]'
                  }\`}
                >
                  {seat}
                </div>
              ))}
            </div>
            <div className="text-[10px] text-[#667085] text-center">
              Person C is strictly flanked by B and D.
            </div>
          </div>

          {/* Circular Table */}
          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-2 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-[10px] font-bold text-[#667085] uppercase">
              <span>Circular Table (Facing Center)</span>
              <span className="text-[#45456A]">Clockwise = Left</span>
            </div>
            <div className="relative w-24 h-16 rounded-full border-2 border-dashed border-[#6574C4] flex items-center justify-center bg-[#F8F4EE]">
              <span className="text-[10px] font-bold text-[#6574C4]">Round Table</span>
              <div className="absolute -top-2 px-1.5 py-0.5 rounded bg-[#6574C4] text-white text-[9px] font-bold">A</div>
              <div className="absolute -bottom-2 px-1.5 py-0.5 rounded bg-[#6574C4] text-white text-[9px] font-bold">C</div>
              <div className="absolute -left-2 px-1.5 py-0.5 rounded bg-[#8575D6] text-white text-[9px] font-bold">D</div>
              <div className="absolute -right-2 px-1.5 py-0.5 rounded bg-[#8575D6] text-white text-[9px] font-bold">B</div>
            </div>
            <div className="text-[10px] text-[#3F634B] font-bold text-center">
              Facing Center &rarr; Right is Anti-Clockwise
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'blood-relations') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> 3-Generation Family Tree Architecture
          </span>
          <span className="text-[11px] font-mono text-[#667085]">(+) Male &bull; (−) Female</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1.5 flex-1 w-full">
            <div className="flex items-center justify-around text-center text-xs font-bold">
              <span className="px-2.5 py-1 bg-[#EDE9F6] text-[#45456A] rounded-lg border border-[#D9D2EA]">
                👴 Grandfather (+) ══ 👵 Grandmother (−)
              </span>
            </div>
            <div className="flex justify-center text-[#6574C4] font-bold text-xs">│ (Gen 1 &rarr; Gen 2)</div>
            <div className="flex items-center justify-around text-center text-xs font-bold">
              <span className="px-2.5 py-1 bg-[#E8EFF8] text-[#3E5575] rounded-lg border border-[#CAD9EA]">
                👨 Father (+) ══ 👩 Mother (−)
              </span>
            </div>
            <div className="flex justify-center text-[#6574C4] font-bold text-xs">│ (Gen 2 &rarr; Gen 3)</div>
            <div className="flex items-center justify-around text-center text-xs font-bold">
              <span className="px-2.5 py-1 bg-[#E7F1EA] text-[#3F634B] rounded-lg border border-[#C9DED0]">
                👦 Son (+) &bull; 👧 Daughter (−)
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1.5 text-xs shrink-0 w-full sm:w-56">
            <span className="font-extrabold text-[#293247] block">Standard Clue Symbols:</span>
            <div className="text-[11px] text-[#3E5575] font-medium">══ : Married Couple</div>
            <div className="text-[11px] text-[#45456A] font-medium">── : Sibling Branch</div>
            <div className="text-[11px] text-[#3F634B] font-medium">│ : Vertical Generation</div>
            <div className="text-[10px] text-[#705B35] bg-[#F8EEDC] p-1 rounded font-bold">
              Tip: Fix generations first!
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'direction-sense') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> 8 Cardinal Directions &amp; Shortest Displacement
          </span>
          <span className="text-[11px] font-mono text-[#3F634B] font-bold">Pythagoras Triplet</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Compass Graphic */}
          <div className="flex items-center gap-3 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs">
            <div className="relative w-20 h-20 rounded-full border-2 border-[#CAD9EA] bg-[#F8F4EE] flex items-center justify-center font-bold text-xs text-[#293247]">
              <span className="absolute top-1 text-[#6574C4] font-black">N</span>
              <span className="absolute bottom-1 text-[#667085]">S</span>
              <span className="absolute right-1.5 text-[#667085]">E</span>
              <span className="absolute left-1.5 text-[#667085]">W</span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6574C4] animate-edu-pulse" />
            </div>
            <div className="space-y-1">
              <div className="font-extrabold text-[#293247] text-xs">Standard Heading Rules</div>
              <div className="text-[11px] text-[#667085]">Right turn = 90° Clockwise</div>
              <div className="text-[11px] text-[#667085]">Left turn = 90° Anti-clockwise</div>
            </div>
          </div>

          {/* Triplet Calculation */}
          <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] text-xs space-y-1.5 shadow-2xs flex-1 w-full sm:w-auto font-mono">
            <span className="font-bold text-[#3E5575] font-sans block text-xs">Shortest Distance Vector:</span>
            <div className="text-[#293247] font-bold">Displacement = √(North² + East²)</div>
            <div className="text-[#3F634B] font-bold text-xs bg-[#E7F1EA] p-1.5 rounded-lg border border-[#C9DED0]">
              Example: 3m N + 4m E &rarr; √(3² + 4²) = 5m NE (3-4-5 Triplet)
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'time-and-work') {
    return (
      <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles size={14} className="text-[#6574C4]" /> Work Unit Rate &amp; Collaborative Efficiency
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">Combined Efficiency</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full">
            <span className="text-xl">👤</span>
            <div>
              <div className="text-[10px] font-bold text-[#667085] uppercase">Worker A</div>
              <div className="text-xs font-bold text-[#293247]">Speed: 2 units/day (15 days total)</div>
            </div>
          </div>

          <span className="text-[#6574C4] font-black text-lg">+</span>

          <div className="flex items-center gap-2.5 bg-[#FFF8EE] p-3 rounded-xl border border-[#D9D1C7] shadow-2xs flex-1 w-full">
            <span className="text-xl">👤</span>
            <div>
              <div className="text-[10px] font-bold text-[#667085] uppercase">Worker B</div>
              <div className="text-xs font-bold text-[#293247]">Speed: 3 units/day (10 days total)</div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[#6574C4]">
            <ArrowRight size={16} className="text-[#6574C4] animate-edu-shift" />
          </div>

          <div className="px-3.5 py-3 rounded-xl bg-[#E7F1EA] border border-[#C9DED0] text-xs font-bold text-[#3F634B] shadow-2xs shrink-0 text-center">
            <div>📋 1 Full Task Done Together</div>
            <div className="text-[11px] font-mono">30 units ÷ 5 = 6 Days!</div>
          </div>
        </div>
      </div>
    );
  }

  // Clean Default Concept Illustration
  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Target size={14} className="text-[#6574C4]" /> Core Concept Architecture Blueprint
        </span>
        <span className="text-[11px] font-bold text-[#3E5575]">Step 1 &rarr; Step 2 &rarr; Step 3</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1">
          <div className="font-extrabold text-[#3E5575] text-[11px]">1. INPUT SCAN</div>
          <div className="text-[11px] text-[#667085]">Extract given quantities and units accurately.</div>
        </div>
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1">
          <div className="font-extrabold text-[#45456A] text-[11px]">2. PATTERN MATCH</div>
          <div className="text-[11px] text-[#667085]">Match known formula relationship to question type.</div>
        </div>
        <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs space-y-1">
          <div className="font-extrabold text-[#3F634B] text-[11px]">3. FAST COMPUTE</div>
          <div className="text-[11px] text-[#667085]">Apply shortcut ratio or division to get result.</div>
        </div>
      </div>
    </div>
  );
}`;

// Find start and end indices of the ConceptIllustration block
const startIdx = content.indexOf('// CARD 1: MAIN CONCEPT ILLUSTRATION');
const endIdx = content.indexOf('// ------------------------------------------------------------------\n// CARD 2: FORMULA RELATIONSHIP DIAGRAM VISUAL');

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate markers for Card 1');
  process.exit(1);
}

content = content.slice(0, startIdx) + newVisualsCode + '\n\n' + content.slice(endIdx);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated Card 1 Interactive Visuals!');
