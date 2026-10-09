import fs from 'fs';
import path from 'path';

const filePath = path.resolve('client/src/components/learning/AptitudeTopicIntroduction.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const newCardsCode = `// ------------------------------------------------------------------
// CARD 3: QUICK TRICK VISUAL (Warm Cream + Soft Mint #E7F1EA)
// ------------------------------------------------------------------
function QuickTrickVisual({ topicId }) {
  if (topicId === 'percentages') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> 25% Fractional Shortcut: Question → Keyword → Pattern → Method
          </span>
          <span className="text-[11px] font-mono font-bold">25 / 100 = 1 / 4</span>
        </div>

        {/* 4-Stage Clue Spotting Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">1. Question</span>
            <span className="font-bold text-[#293247] text-[11px]">"Find 25% of 160"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">2. Keyword</span>
            <span className="font-bold text-[#3E5575] text-[11px]">"25%"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">3. Pattern</span>
            <span className="font-bold text-[#45456A] text-[11px]">Recognize ¼</span>
          </div>
          <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#3F634B] uppercase block">4. Method</span>
            <span className="font-black text-[#3F634B] text-[11px]">160 ÷ 4 = 40!</span>
          </div>
        </div>

        {/* Visual Percentage Bar: 25% filled (5 of 20 segments) */}
        <div className="space-y-1">
          <div className="h-6 w-full bg-[#FFF8EE] rounded-xl border border-[#C9DED0] p-1 flex items-center gap-0.5 shadow-2xs">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={\`h-full flex-1 rounded-xs transition-all \${
                  i < 5 ? 'bg-[#3F634B] animate-edu-pulse' : 'bg-[#E7F1EA]'
                }\`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#667085]">
            <span>Mental Halving / Division</span>
            <span className="font-bold text-[#3F634B]">25% (¼ of Total)</span>
            <span>50% &rarr; ÷2 &bull; 10% &rarr; shift decimal &bull; 25% &rarr; divide by 4</span>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'number-system') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Remainder Modulo Identity: Question → Keyword → Pattern → Method
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">43 × 47 mod 5</span>
        </div>

        {/* 4-Stage Clue Spotting Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">1. Question</span>
            <span className="font-bold text-[#293247] text-[11px]">43 × 47 mod 5</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">2. Keyword</span>
            <span className="font-bold text-[#3E5575] text-[11px]">"Remainder"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">3. Pattern</span>
            <span className="font-bold text-[#45456A] text-[11px]">Modulo Product</span>
          </div>
          <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#3F634B] uppercase block">4. Method</span>
            <span className="font-black text-[#3F634B] text-[11px]">3 × 2 = 6 &rarr; Rem = 1</span>
          </div>
        </div>

        {/* Visual Remainder Product Breakdown */}
        <div className="flex items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#E8EFF8] text-[#3E5575] font-bold">43 mod 5 = +3</span>
            <span className="text-[#667085] font-black">×</span>
            <span className="px-2 py-0.5 rounded bg-[#E8EFF8] text-[#3E5575] font-bold">47 mod 5 = +2</span>
          </div>
          <ArrowRight size={14} className="text-[#3F634B] animate-edu-shift" />
          <div className="text-xs font-black text-[#3F634B]">
            3 × 2 = 6 &rarr; 6 mod 5 = <strong className="text-sm">1</strong>
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'profit-and-loss') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Price Multiplier Clue Spotting: Question → Keyword → Pattern → Method
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">20% Gain = 6/5</span>
        </div>

        {/* 4-Stage Clue Spotting Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">1. Question</span>
            <span className="font-bold text-[#293247] text-[11px]">Buy ₹500, Gain 20%</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">2. Keyword</span>
            <span className="font-bold text-[#3E5575] text-[11px]">"20% Profit"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">3. Pattern</span>
            <span className="font-bold text-[#45456A] text-[11px]">Multiplier 1 + ⅕ = 6/5</span>
          </div>
          <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#3F634B] uppercase block">4. Method</span>
            <span className="font-black text-[#3F634B] text-[11px]">₹500 × 6/5 = ₹600</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs">
          <span className="text-[#667085] font-sans">⚡ Direct 2-Second Calculation:</span>
          <span className="font-bold text-[#3F634B]">CP × (1 + 1/5) = 6/5 &rarr; SP = ₹600</span>
        </div>
      </div>
    );
  }

  if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Flank Spotting: Question → Keyword → Pattern → Method
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">"next to" = Neighbour</span>
        </div>

        {/* 4-Stage Clue Spotting Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">1. Question</span>
            <span className="font-bold text-[#293247] text-[11px]">"Who sits next to A?"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">2. Keyword</span>
            <span className="font-bold text-[#3E5575] text-[11px]">"next to"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">3. Pattern</span>
            <span className="font-bold text-[#45456A] text-[11px]">Neighbour</span>
          </div>
          <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#3F634B] uppercase block">4. Method</span>
            <span className="font-black text-[#3F634B] text-[11px]">Anchor Flank Slots</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#E8EFF8] text-[#3E5575] font-bold">B (Left)</span>
            <span className="px-2.5 py-0.5 rounded bg-[#6574C4] text-white font-bold animate-edu-pulse">A (Target)</span>
            <span className="px-2 py-0.5 rounded bg-[#E8EFF8] text-[#3E5575] font-bold">C (Right)</span>
          </div>
          <span className="text-[#3F634B] font-bold font-sans">⚡ Direct Adjacent Flanks</span>
        </div>
      </div>
    );
  }

  if (topicId === 'letter-series' || topicId === 'letter-classification') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Alphabet Step Jump: Question → Keyword → Pattern → Method
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">A &rarr; C &rarr; E &rarr; G &rarr; I</span>
        </div>

        {/* 4-Stage Clue Spotting Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">1. Question</span>
            <span className="font-bold text-[#293247] text-[11px]">A, C, E, G, ?</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">2. Keyword</span>
            <span className="font-bold text-[#3E5575] text-[11px]">"Series Jump"</span>
          </div>
          <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">3. Pattern</span>
            <span className="font-bold text-[#45456A] text-[11px]">Difference = +2</span>
          </div>
          <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
            <span className="text-[9px] font-sans font-bold text-[#667085] uppercase block">4. Method</span>
            <span className="font-black text-[#3F634B] text-[11px]">Next = G(7) + 2 = I</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs bg-[#FFF8EE] p-2 rounded-xl border border-[#C9DED0] shadow-2xs">
          <span className="text-[#667085] font-sans">⚡ Jump Sequence:</span>
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-[#3E5575]">A(1)</span> &rarr;
            <span className="text-[#3E5575]">C(3)</span> &rarr;
            <span className="text-[#3E5575]">E(5)</span> &rarr;
            <span className="text-[#3E5575]">G(7)</span> &rarr;
            <span className="text-[#3F634B] bg-[#E7F1EA] px-2 py-0.5 rounded border border-[#C9DED0]">I(9)</span>
          </div>
        </div>
      </div>
    );
  }

  // Default Quick Trick Visual
  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> Question Recognition: Question → Keyword → Pattern → Method
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">5-Sec Clue Recognition</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-bold text-[#667085] uppercase block">1. QUESTION</span>
          <span className="text-[11px] text-[#293247] font-medium">Scan given inputs</span>
        </div>
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-bold text-[#667085] uppercase block">2. KEYWORD</span>
          <span className="text-[11px] text-[#3E5575] font-medium">Spot core trigger</span>
        </div>
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-bold text-[#667085] uppercase block">3. PATTERN</span>
          <span className="text-[11px] text-[#45456A] font-medium">Link known relation</span>
        </div>
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-bold text-[#3F634B] uppercase block">4. METHOD</span>
          <span className="text-[11px] text-[#3F634B] font-bold">Fast mental solve</span>
        </div>
      </div>

      <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center text-[11px] text-[#3F634B] font-bold shadow-2xs">
        ⚡ 5-Sec Rule: Identifying the keyword eliminates 2 out of 4 options immediately.
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 4: STEP-BY-STEP SOLVED PROGRESSION VISUAL (Warm Cream + Soft Blue #E8EFF8)
// ------------------------------------------------------------------
function SolvedExampleVisual({ topicId }) {
  const getProgression = () => {
    if (topicId === 'profit-and-loss') {
      return {
        q: 'Buy ₹500 CP, Sell ₹600 SP. Find Profit %',
        s1: 'Profit = SP − CP = 600 − 500 = ₹100',
        s2: 'Profit% = (Profit ÷ CP) × 100',
        s3: '(100 ÷ 500) × 100 = ⅕ × 100',
        ans: '20% Profit'
      };
    }
    if (topicId === 'percentages') {
      return {
        q: 'Calculate 15% of 200 without pencil',
        s1: '10% of 200 = 200 ÷ 10 = 20',
        s2: '5% of 200 = half of 20 = 10',
        s3: 'Combine pieces: 20 + 10 = 30',
        ans: '30'
      };
    }
    if (topicId === 'number-system') {
      return {
        q: 'Is 1,524 divisible by 4?',
        s1: 'Divisibility Rule: Check last two digits only (24)',
        s2: '24 ÷ 4 = 6 (Remainder 0)',
        s3: 'Since 24 is divisible, whole number is divisible',
        ans: 'Divisible!'
      };
    }
    if (topicId === 'geometry') {
      return {
        q: 'Rectangle 8 cm × 5 cm. Find its area',
        s1: 'Identify dimensions: L = 8 cm, W = 5 cm',
        s2: 'Apply Formula: Area = L × W',
        s3: 'Compute: 8 × 5 = 40 (cm²)',
        ans: '40 cm²'
      };
    }
    if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
      return {
        q: '5 Friends in a row. C in center, B left of C',
        s1: 'Fix definite anchor: Seat 3 = C  [ _ , _ , C , _ , _ ]',
        s2: 'Place immediate left clue: Seat 2 = B  [ _ , B , C , _ , _ ]',
        s3: 'Fill flanking slots based on adjacent constraints',
        ans: 'Order Fixed'
      };
    }
    if (topicId === 'letter-series' || topicId === 'letter-classification') {
      return {
        q: 'Find next term in series: A, C, E, G, ?',
        s1: 'Map letters to numbers: A=1, C=3, E=5, G=7',
        s2: 'Identify uniform progression: Difference is +2',
        s3: 'Calculate next index: G(7) + 2 = 9',
        ans: 'Letter I'
      };
    }
    return {
      q: 'Standard Exam Question Inputs',
      s1: 'Identify known formula and assign variable symbols',
      s2: 'Substitute values into base relation',
      s3: 'Simplify using shortcut division or multiplier',
      ans: 'Verified Answer'
    };
  };

  const p = getProgression();

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5 font-sans">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <CheckCircle2 size={14} className="text-[#3E5575]" /> Step-by-Step Problem Solver Progression
        </span>
        <span className="text-[11px] font-bold text-[#3E5575]">QUESTION &rarr; STEP 1 &rarr; STEP 2 &rarr; STEP 3 &rarr; ✓ ANSWER</span>
      </div>

      {/* Question Card */}
      <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#D9D1C7] shadow-2xs flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-[#E8EFF8] text-[#3E5575] flex items-center justify-center text-[10px] font-bold font-sans">Q</span>
        <span className="font-bold text-[#293247] text-xs font-sans">{p.q}</span>
      </div>

      {/* 3 Progression Steps + Final Answer */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-sans font-bold text-[#3E5575] block uppercase">Step 1</span>
          <span className="text-[10px] text-[#667085] leading-tight block">{p.s1}</span>
        </div>
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-sans font-bold text-[#3E5575] block uppercase">Step 2</span>
          <span className="text-[10px] text-[#667085] leading-tight block">{p.s2}</span>
        </div>
        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#CAD9EA] shadow-2xs space-y-0.5">
          <span className="text-[9px] font-sans font-bold text-[#3E5575] block uppercase">Step 3</span>
          <span className="text-[10px] text-[#667085] leading-tight block">{p.s3}</span>
        </div>
        <div className="p-2 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] shadow-2xs flex flex-col justify-center text-center">
          <span className="text-[9px] font-sans font-bold text-[#3F634B] uppercase block">✓ Answer</span>
          <span className="text-xs font-black text-[#3F634B]">{p.ans}</span>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 5: VARIATION MAP VISUAL (Warm Cream + Soft Lavender #EDE9F6)
// ------------------------------------------------------------------
function VariationMapVisual({ topicId }) {
  const getMap = () => {
    if (topicId === 'percentages') {
      return {
        root: 'Percentage Archetypes',
        branches: [
          { title: 'Increase / Dec', action: '(Diff ÷ Base) × 100' },
          { title: 'Reverse %', action: 'Backtrack original base' },
          { title: 'Successive %', action: 'a + b + ab/100' },
          { title: 'Multiplier', action: '× (1 ± r%)' }
        ]
      };
    }
    if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
      return {
        root: 'Seating Classification',
        branches: [
          { title: 'Linear Row', action: 'Left is West, Right East' },
          { title: 'Circular (Center)', action: 'Clockwise = Left' },
          { title: 'Circular (Outward)', action: 'Clockwise = Right' },
          { title: 'Dual Rows', action: 'Facing North vs South' }
        ]
      };
    }
    if (topicId === 'number-system') {
      return {
        root: 'Number System Archetypes',
        branches: [
          { title: 'Divisibility', action: 'Rules for 3, 4, 9, 11' },
          { title: 'Remainders', action: 'Modulo Arithmetic' },
          { title: 'Primes & HCF', action: 'Factor Pairs' },
          { title: 'Unit Digits', action: 'Cyclicity of 4' }
        ]
      };
    }
    if (topicId === 'profit-and-loss') {
      return {
        root: 'Profit & Loss Archetypes',
        branches: [
          { title: 'Direct CP / SP', action: 'Find Margin & %' },
          { title: 'Marked Price', action: 'Find Discount & Gain' },
          { title: 'Ratio Form', action: 'CP:SP = 5:6' },
          { title: 'False Weights', action: 'Cheated Weight Ratio' }
        ]
      };
    }
    if (topicId === 'geometry') {
      return {
        root: 'Geometry Archetypes',
        branches: [
          { title: 'Rectangles', action: 'Area L×W • Perim 2(L+W)' },
          { title: 'Triangles', action: '½ b×h • 3-4-5 Triplet' },
          { title: 'Circles', action: 'Area πr² • Perim 2πr' },
          { title: '3D Mensuration', action: 'Volume & Surface' }
        ]
      };
    }
    return {
      root: 'Topic Archetypes',
      branches: [
        { title: 'Direct Forms', action: 'Base Formula' },
        { title: 'Reverse Forms', action: 'Find Missing Value' },
        { title: 'Ratio Forms', action: 'Unit Share Split' },
        { title: 'Multi-Step', action: 'Chained Solution' }
      ]
    };
  };

  const mapData = getMap();

  return (
    <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <BookOpen size={14} className="text-[#6574C4]" /> Classification Taxonomy: {mapData.root}
        </span>
        <span className="text-[11px] font-mono text-[#667085]">4 Core Archetypes</span>
      </div>

      {/* Root Node & Tree Connectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {mapData.branches.map((b, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#FFF8EE] border border-[#D9D1C7] rounded-xl shadow-2xs space-y-1 text-center"
          >
            <div className="w-5 h-5 mx-auto rounded-full bg-[#EDE9F6] text-[#45456A] font-bold text-[10px] flex items-center justify-center">
              {idx + 1}
            </div>
            <div className="font-bold text-[#293247] text-xs">{b.title}</div>
            <div className="text-[10px] text-[#667085] leading-tight">{b.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 6: TRICKS & SHORT METHODS (Warm Cream + Soft Mint #E7F1EA)
// ------------------------------------------------------------------

// Number System Interactive Shortcut: 43 × 47 mod 5 Waterfall
function NumberSystemShortcutVisual() {
  const [numA, setNumA] = useState(43);
  const [numB, setNumB] = useState(47);
  const m = 5;

  const remA = numA % m;
  const remB = numB % m;
  const prod = remA * remB;
  const finalRem = prod % m;

  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> Modulo Product Shortcut Waterfall (Card 6)
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">43 × 47 mod 5</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs text-xs font-sans">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Number A:</span>
          <button
            onClick={() => setNumA((v) => Math.max(10, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-black flex items-center justify-center hover:bg-[#C9DED0]/50 active:scale-95"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-8 text-center">{numA}</span>
          <button
            onClick={() => setNumA((v) => Math.min(99, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-black flex items-center justify-center hover:bg-[#C9DED0]/50 active:scale-95"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#667085] text-[11px]">Number B:</span>
          <button
            onClick={() => setNumB((v) => Math.max(10, v - 1))}
            className="w-6 h-6 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-black flex items-center justify-center hover:bg-[#C9DED0]/50 active:scale-95"
          >
            −
          </button>
          <span className="font-mono font-bold text-[#293247] w-8 text-center">{numB}</span>
          <button
            onClick={() => setNumB((v) => Math.min(99, v + 1))}
            className="w-6 h-6 rounded-lg bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] font-black flex items-center justify-center hover:bg-[#C9DED0]/50 active:scale-95"
          >
            +
          </button>
        </div>

        <div className="text-[11px] text-[#667085]">Divisor: mod 5</div>
      </div>

      {/* The EXACT Vertical Waterfall Requested by User */}
      <div className="flex flex-col items-center justify-center py-1 space-y-1 text-xs">
        <div className="px-3 py-1 rounded-lg bg-[#FFF8EE] border border-[#C9DED0] font-bold text-[#293247] shadow-2xs">
          {numA} × {numB} mod {m}
        </div>
        <ArrowDown size={14} className="text-[#3F634B] animate-edu-nudge" />
        <div className="px-3 py-1 rounded-lg bg-[#EDE9F6] border border-[#D9D2EA] font-bold text-[#45456A] shadow-2xs">
          {remA} × {remB}
        </div>
        <ArrowDown size={14} className="text-[#3F634B] animate-edu-nudge" />
        <div className="px-3 py-1 rounded-lg bg-[#FFF8EE] border border-[#C9DED0] font-bold text-[#3E5575] shadow-2xs">
          {prod} mod {m}
        </div>
        <ArrowDown size={14} className="text-[#3F634B] animate-edu-nudge" />
        <div className="px-4 py-1.5 rounded-xl bg-[#E7F1EA] border border-[#C9DED0] font-black text-[#3F634B] text-sm shadow-xs">
          ✓ Remainder = {finalRem}
        </div>
      </div>
    </div>
  );
}

// Profit & Loss Shortcut: 20% Profit -> CP:SP 100:120 -> 5:6
function ProfitLossShortcutVisual() {
  const [profitPct, setProfitPct] = useState(20);
  const cpBase = 500;

  const ratioMap = {
    10: { cp: 10, sp: 11, mult: '11/10' },
    20: { cp: 5, sp: 6, mult: '6/5' },
    25: { cp: 4, sp: 5, mult: '5/4' },
    50: { cp: 2, sp: 3, mult: '3/2' }
  };

  const curr = ratioMap[profitPct] || { cp: 5, sp: 6, mult: '6/5' };
  const spCalc = Math.round(cpBase * (1 + profitPct / 100));

  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> Ratio Multiplier Shortcut (Card 6)
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">CP : SP Ratio</span>
      </div>

      <div className="flex items-center justify-between bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs text-xs font-sans">
        <span className="font-bold text-[#667085] text-[11px]">Select Profit %:</span>
        <div className="flex items-center gap-1.5">
          {[10, 20, 25, 50].map((p) => (
            <button
              key={p}
              onClick={() => setProfitPct(p)}
              className={\`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all \${
                profitPct === p
                  ? 'bg-[#3F634B] text-white shadow-2xs'
                  : 'bg-[#E7F1EA] text-[#3F634B] hover:bg-[#C9DED0]/60'
              }\`}
            >
              {p}%
            </button>
          ))}
        </div>
      </div>

      {/* The EXACT 20% Profit CP:SP 100:120 -> 5:6 structure */}
      <div className="flex flex-col items-center justify-center py-1 space-y-1 text-xs">
        <div className="px-3 py-1 bg-[#FFF8EE] rounded-lg border border-[#C9DED0] font-bold text-[#293247] shadow-2xs">
          {profitPct}% Profit &bull; 100 (CP) : {100 + profitPct} (SP)
        </div>
        <ArrowDown size={14} className="text-[#3F634B] animate-edu-nudge" />
        <div className="px-4 py-1.5 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] font-black text-sm text-[#3F634B] shadow-2xs">
          CP : SP = {curr.cp} : {curr.sp}
        </div>
        <div className="text-[11px] text-[#667085] font-sans pt-1">
          Multiply CP by {curr.mult} &rarr; ₹{cpBase} × ({curr.mult}) = <strong className="text-[#3F634B]">₹{spCalc}</strong> in 2 sec!
        </div>
      </div>
    </div>
  );
}

// Percentages Shortcut: 100 -> /5 -> 20
function PercentagesShortcutVisual() {
  const [val, setVal] = useState(100);

  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> Mental Division Waterfall (Card 6)
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">20% = 1/5 Mental Shortcut</span>
      </div>

      <div className="flex items-center justify-between bg-[#FFF8EE] p-2.5 rounded-xl border border-[#C9DED0] shadow-2xs text-xs font-sans">
        <span className="font-bold text-[#667085] text-[11px]">Base Number:</span>
        <div className="flex items-center gap-1.5">
          {[80, 100, 200, 350].map((v) => (
            <button
              key={v}
              onClick={() => setVal(v)}
              className={\`px-2.5 py-0.5 rounded-lg text-xs font-bold font-mono transition-all \${
                val === v
                  ? 'bg-[#3F634B] text-white shadow-2xs'
                  : 'bg-[#E7F1EA] text-[#3F634B] hover:bg-[#C9DED0]/60'
              }\`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* The EXACT 100 -> /5 -> 20 waterfall */}
      <div className="flex flex-col items-center justify-center py-1 space-y-1 text-xs">
        <div className="px-3 py-1 bg-[#FFF8EE] rounded-lg border border-[#C9DED0] font-bold text-[#293247] shadow-2xs">
          {val}
        </div>
        <div className="flex items-center gap-1 text-[#3F634B] text-[11px] font-bold font-sans">
          <ArrowDown size={14} className="animate-edu-nudge" /> ÷ 5
        </div>
        <div className="px-4 py-1.5 bg-[#E7F1EA] rounded-xl border border-[#C9DED0] font-black text-sm text-[#3F634B] shadow-2xs">
          {val / 5}
        </div>
        <div className="text-[11px] text-[#667085] font-sans pt-1">
          20% = 1/5 &bull; 20% of {val} = {val} ÷ 5 = <strong className="text-[#3F634B]">{val / 5}</strong>!
        </div>
      </div>
    </div>
  );
}

function ShortcutIllustration({ topicId }) {
  if (topicId === 'number-system') return <NumberSystemShortcutVisual />;
  if (topicId === 'profit-and-loss') return <ProfitLossShortcutVisual />;
  if (topicId === 'percentages') return <PercentagesShortcutVisual />;

  if (topicId === 'ratio-and-proportion') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Unit Share Block Shortcut (Card 6)
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">3 : 2 = 5 Units</span>
        </div>

        <div className="flex flex-col items-center justify-center py-2 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500 shadow-2xs inline-block" />
            <span className="w-5 h-5 rounded-full bg-indigo-500 shadow-2xs inline-block" />
            <span className="w-5 h-5 rounded-full bg-indigo-500 shadow-2xs inline-block" />
            <span className="text-sm font-black text-[#667085] px-1">:</span>
            <span className="w-5 h-5 rounded-full bg-purple-500 shadow-2xs inline-block" />
            <span className="w-5 h-5 rounded-full bg-purple-500 shadow-2xs inline-block" />
          </div>
          <div className="text-xs font-black text-[#3F634B]">
            3 : 2 &rarr; Total Parts = 5
          </div>
          <div className="text-[11px] text-[#667085] font-sans">
            1 Unit = Total ÷ 5 &bull; Never set up long simultaneous equations!
          </div>
        </div>
      </div>
    );
  }

  if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Definite Anchor First Rule (Card 6)
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">Always Anchor First</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-1 flex-1">
            <span className="text-[10px] font-bold text-[#824F47] uppercase block">❌ AMBIGUOUS CLUE</span>
            <div className="text-[11px] text-[#667085]">"B sits next to C" &rarr; 2 possibilities, don't guess!</div>
          </div>
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] shadow-2xs space-y-1 flex-1">
            <span className="text-[10px] font-bold text-[#3F634B] uppercase block">✓ DEFINITE ANCHOR</span>
            <div className="text-[11px] text-[#3F634B] font-bold">"A sits at extreme Left end" &rarr; Locks Slot 1!</div>
          </div>
        </div>

        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center text-[11px] text-[#3F634B] font-bold shadow-2xs">
          Rule: Start from the anchor to eliminate 80% of branching possibilities immediately.
        </div>
      </div>
    );
  }

  if (topicId === 'geometry') {
    return (
      <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5 font-sans">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap size={14} className="text-[#3F634B]" /> Pythagorean Triplet Family Shortcut (Card 6)
          </span>
          <span className="text-[11px] font-bold text-[#3F634B]">3 - 4 - 5 Family</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center shadow-2xs space-y-0.5">
            <span className="text-[10px] text-[#667085] font-sans block">Primary Triplet</span>
            <strong className="text-sm font-black text-[#3E5575]">3 - 4 - 5</strong>
          </div>
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center shadow-2xs space-y-0.5">
            <span className="text-[10px] text-[#667085] font-sans block">Double (×2)</span>
            <strong className="text-sm font-black text-[#45456A]">6 - 8 - 10</strong>
          </div>
          <div className="p-2.5 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center shadow-2xs space-y-0.5">
            <span className="text-[10px] text-[#667085] font-sans block">Common Family</span>
            <strong className="text-sm font-black text-[#3F634B]">5 - 12 - 13</strong>
          </div>
        </div>

        <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center text-[11px] text-[#3F634B] font-sans font-bold shadow-2xs">
          ⚡ Never compute √(3² + 4²)! Spot standard triplets in 1 second.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> Shortcut &amp; Fast Elimination Method
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">2-Second Bypass</span>
      </div>

      <div className="p-3 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center text-xs text-[#3F634B] font-bold shadow-2xs">
        ⚡ Skip long algebra by converting percentages into clean ratio units or small multipliers.
      </div>
    </div>
  );
}

function ShortcutDiagramVisual(props) {
  return <ShortcutIllustration {...props} />;
}

// ------------------------------------------------------------------
// CARD 7: EXAM-STYLE VARIATION TRANSFORMATION VISUAL (Warm Cream + Soft Blue #E8EFF8)
// ------------------------------------------------------------------
function ExamPatternVisual({ topicId }) {
  const getPatterns = () => {
    if (topicId === 'profit-and-loss') {
      return {
        direct: { given: 'CP ₹500, Gain 20%', goal: 'Find SP = ₹600' },
        reverse: { given: 'SP ₹600, Gain 20%', goal: 'Back-calculate CP = ₹500' },
        mixed: { given: 'Marked Price + 10% Discount', goal: 'Find Net Gain on CP' }
      };
    }
    if (topicId === 'percentages') {
      return {
        direct: { given: 'Original ₹400, Rate 20%', goal: 'Find Result = ₹80' },
        reverse: { given: '80 is 20% of X', goal: 'Find Base X = 400' },
        mixed: { given: 'Price +20%, Consumption −10%', goal: 'Net Expenditure Change' }
      };
    }
    if (topicId === 'number-system') {
      return {
        direct: { given: '143 divided by 7', goal: 'Find Remainder = 3' },
        reverse: { given: 'N mod 7 = 3', goal: 'Find (2N) mod 7 = 6' },
        mixed: { given: 'Divisible by 12 and 18 leaving rem 5', goal: 'LCM(12,18)+5 = 41' }
      };
    }
    if (topicId === 'geometry') {
      return {
        direct: { given: 'Rectangle L=8cm, W=5cm', goal: 'Find Area = 40 cm²' },
        reverse: { given: 'Area 40 cm², W = 5cm', goal: 'Find Length = 8 cm' },
        mixed: { given: 'Rectangle wire bent into Square', goal: 'Compare Enclosed Areas' }
      };
    }
    return {
      direct: { given: 'Direct Problem Inputs', goal: 'Apply Base Relation' },
      reverse: { given: 'Result Output Given', goal: 'Back-calculate Missing Value' },
      mixed: { given: 'Two Concepts Combined', goal: 'Multi-Step Solution' }
    };
  };

  const p = getPatterns();

  return (
    <div className="w-full bg-[#E8EFF8] border border-[#CAD9EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#3E5575] border-b border-[#CAD9EA] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Target size={14} className="text-[#6574C4]" /> 3 Exam Angles: Direct &bull; Reverse &bull; Mixed
        </span>
        <span className="text-[11px] font-mono text-[#3E5575] font-bold">Exam Transformation Map</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-3 bg-[#FFF8EE] border border-[#CAD9EA] rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#3E5575] text-xs">DIRECT</span>
            <span className="text-[9px] font-bold text-[#667085] uppercase">Standard</span>
          </div>
          <div className="text-[11px] text-[#293247] font-medium">{p.direct.given}</div>
          <div className="text-[10px] text-[#3E5575] font-bold">&rarr; {p.direct.goal}</div>
        </div>

        <div className="p-3 bg-[#FFF8EE] border border-[#D9D2EA] rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#45456A] text-xs">REVERSE</span>
            <span className="text-[9px] font-bold text-[#667085] uppercase">Backtrack</span>
          </div>
          <div className="text-[11px] text-[#293247] font-medium">{p.reverse.given}</div>
          <div className="text-[10px] text-[#45456A] font-bold">&rarr; {p.reverse.goal}</div>
        </div>

        <div className="p-3 bg-[#FFF8EE] border border-[#E6D4B4] rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#705B35] text-xs">MIXED</span>
            <span className="text-[9px] font-bold text-[#667085] uppercase">Chained</span>
          </div>
          <div className="text-[11px] text-[#293247] font-medium">{p.mixed.given}</div>
          <div className="text-[10px] text-[#705B35] font-bold">&rarr; {p.mixed.goal}</div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 8: MISTAKE COMPARISON VISUAL (Warm Cream + Soft Peach #F6E5DF)
// ------------------------------------------------------------------
function MistakeComparisonVisual({ topicId }) {
  const getMistake = () => {
    if (topicId === 'profit-and-loss') {
      return {
        trap: 'Wrong Base for Profit %',
        wrongFormula: 'Profit % = (Profit ÷ SP) × 100',
        wrongReason: 'SP is not the original cost!',
        correctFormula: 'Profit % = (Profit ÷ CP) × 100',
        correctReason: 'Always calculate profit/loss on Cost Price (CP)'
      };
    }
    if (topicId === 'percentages') {
      return {
        trap: 'Wrong Base Denominator',
        wrongFormula: 'Denominator = New Changed Value',
        wrongReason: 'Dividing by the final result',
        correctFormula: 'Denominator = Original Starting Base',
        correctReason: 'Always compare against what was originally there'
      };
    }
    if (topicId === 'number-system') {
      return {
        trap: 'Remainder Size Trap',
        wrongFormula: 'Remainder = 7 when dividing by 5',
        wrongReason: 'Remainder cannot be larger than divisor',
        correctFormula: '0 ≤ Remainder < Divisor (0 to 4)',
        correctReason: 'Remainder is strictly smaller than the divisor'
      };
    }
    if (topicId === 'geometry') {
      return {
        trap: '1D vs 2D Units & Area vs Perimeter',
        wrongFormula: 'Area = 40 cm (1D unit for 2D shape)',
        wrongReason: 'Confusing boundary length with inside space',
        correctFormula: 'Area = 40 cm² (Square units) • Perimeter = 26 cm',
        correctReason: 'Area is always square units (cm², m²)'
      };
    }
    if (topicId === 'seating-arrangement' || topicId === 'puzzles' || topicId === 'seating') {
      return {
        trap: "'To the right' vs 'Immediate right'",
        wrongFormula: 'Placing directly beside for "to the right"',
        wrongReason: 'Can have multiple persons in between',
        correctFormula: 'Immediate right = Strictly 0 between; To the right = Anywhere right',
        correctReason: 'Look for the keyword "immediate"'
      };
    }
    return {
      trap: 'Common Exam Pitfall',
      wrongFormula: 'Skipping steps or guessing formula',
      wrongReason: 'Causes easy mistakes under exam pressure',
      correctFormula: 'Write formula → Put values → Solve',
      correctReason: 'Guarantees 100% accuracy'
    };
  };

  const m = getMistake();

  return (
    <div className="w-full bg-[#F6E5DF] border border-[#E7C9C0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#824F47] border-b border-[#E7C9C0] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <X size={14} className="text-[#824F47]" /> High-Frequency Exam Trap vs Correct Principle
        </span>
        <span className="font-semibold text-[11px]">{m.trap}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-[#FFF8EE] border border-[#E7C9C0] rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[#824F47] font-bold text-xs">
            <X size={14} className="text-[#824F47] shrink-0" />
            <span>WRONG METHOD</span>
          </div>
          <div className="text-xs font-mono font-bold text-[#824F47]">{m.wrongFormula}</div>
          <div className="text-[11px] text-[#824F47]">{m.wrongReason}</div>
        </div>

        <div className="p-3 bg-[#E7F1EA] border border-[#C9DED0] rounded-xl space-y-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[#3F634B] font-bold text-xs">
            <Check size={14} className="text-[#3F634B] shrink-0" />
            <span>CORRECT METHOD</span>
          </div>
          <div className="text-xs font-mono font-bold text-[#3F634B]">{m.correctFormula}</div>
          <div className="text-[11px] text-[#3F634B]">{m.correctReason}</div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 9: SPEED STRATEGY FLOW VISUAL (Warm Cream + Soft Mint #E7F1EA)
// ------------------------------------------------------------------
function SpeedFlowVisual({ topicId }) {
  const flow = [
    { num: 1, icon: '📖', label: 'Read', sub: 'Spot topic' },
    { num: 2, icon: '🔎', label: 'Recognize', sub: 'Identify pattern' },
    { num: 3, icon: '📐', label: 'Formula', sub: 'Pick rule' },
    { num: 4, icon: '⚡', label: 'Shortcut', sub: 'Skip algebra' },
    { num: 5, icon: '🧮', label: 'Calculate', sub: 'Plug values' },
    { num: 6, icon: '✓', label: 'Check', sub: 'Verify units' }
  ];

  return (
    <div className="w-full bg-[#E7F1EA] border border-[#C9DED0] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-[#3F634B] border-b border-[#C9DED0] pb-1.5">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Zap size={14} className="text-[#3F634B]" /> 6-Step Exam Speed &amp; Accuracy Pipeline
        </span>
        <span className="text-[11px] font-bold text-[#3F634B]">Fast 30-Sec Flow</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
        {flow.map((st) => (
          <div
            key={st.num}
            className="p-2.5 bg-[#FFF8EE] border border-[#C9DED0] rounded-xl space-y-0.5 shadow-2xs"
          >
            <div className="text-lg">{st.icon}</div>
            <div className="font-bold text-[#293247] text-xs">{st.label}</div>
            <div className="text-[10px] text-[#667085]">{st.sub}</div>
          </div>
        ))}
      </div>

      <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#C9DED0] text-center text-[11px] text-[#3F634B] font-bold shadow-2xs">
        ⚡ Speed Tip: Spotting the pattern in the first 5 seconds saves 80% of pencil work.
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// CARD 10: REVISION MEMORY SNAPSHOT VISUAL (Warm Cream + Soft Lavender #EDE9F6)
// ------------------------------------------------------------------
function CheatSheetIllustration({ topicId, topicName }) {
  const getSnapshot = () => {
    if (topicId === 'percentages') {
      return [
        { label: '100%', value: '1' },
        { label: '50%', value: '½' },
        { label: '25%', value: '¼' },
        { label: '20%', value: '⅕' },
        { label: '10%', value: '⅒' },
        { label: 'Multiplier', value: '1 ± r%' }
      ];
    }
    if (topicId === 'profit-and-loss') {
      return [
        { label: 'Cost Price', value: 'Buy (CP)' },
        { label: 'Selling Price', value: 'Sell (SP)' },
        { label: 'Profit Rule', value: 'SP > CP' },
        { label: '20% Gain', value: 'CP:SP = 5:6' },
        { label: 'Discount', value: 'MP − SP' },
        { label: 'Multiplier', value: 'SP = CP × (1+P%)' }
      ];
    }
    if (topicId === 'number-system') {
      return [
        { label: 'Division', value: 'D = d×Q + R' },
        { label: 'Smallest Prime', value: '2 (Even)' },
        { label: 'Div by 3/9', value: 'Sum Digits' },
        { label: 'Remainder', value: '0 ≤ R < d' },
        { label: 'Div by 4', value: 'Last 2 Digits' },
        { label: 'Modulo', value: '(A×B)%m' }
      ];
    }
    if (topicId === 'geometry') {
      return [
        { label: 'Rectangle', value: 'L × W' },
        { label: 'Perimeter', value: '2(L + W)' },
        { label: 'Triangle', value: '½ B × H' },
        { label: 'Circle', value: 'πr²' },
        { label: 'Units', value: 'cm² / m²' },
        { label: 'Triplet', value: '3 - 4 - 5' }
      ];
    }
    return [
      { label: 'Core Rule', value: 'Formula A' },
      { label: 'Shortcut', value: 'Quick Ratio' },
      { label: 'Unit', value: 'Standard Unit' },
      { label: 'Verification', value: 'Check Result' },
      { label: 'Multiplier', value: 'Direct Factor' },
      { label: 'Trap', value: 'Check Baseline' }
    ];
  };

  const snap = getSnapshot();

  return (
    <div className="w-full bg-[#EDE9F6] border border-[#D9D2EA] rounded-2xl p-4 sm:p-5 flex flex-col justify-center min-h-[185px] sm:min-h-[210px] md:min-h-[225px] shadow-xs space-y-3 font-mono">
      <div className="flex items-center justify-between text-xs font-bold text-[#45456A] border-b border-[#D9D2EA] pb-1.5 font-sans">
        <div className="flex items-center gap-1.5">
          <Zap size={14} className="text-[#6574C4]" />
          <span className="font-bold text-[#45456A]">{topicName} — Memory Snapshot</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#E7F1EA] border border-[#C9DED0] text-[#3F634B] text-[10px] font-bold shadow-2xs">
          60-Sec Flash Card
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
        {snap.map((s, idx) => (
          <div
            key={idx}
            className="p-2.5 bg-[#FFF8EE] border border-[#D9D2EA] rounded-xl text-center space-y-0.5 shadow-2xs"
          >
            <div className="text-[10px] font-sans font-bold text-[#667085] uppercase truncate">{s.label}</div>
            <div className="text-xs font-black text-[#45456A] truncate">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevisionSnapshotVisual(props) {
  return <CheatSheetIllustration {...props} />;
}
`;

const startMarker = '// CARD 3: QUICK TRICK VISUAL';
const endMarker = '// ------------------------------------------------------------------\n// STEP BREAKDOWN TIMELINE COMPONENT FOR CARD 4';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate markers for Cards 3 to 10. startIdx:', startIdx, 'endIdx:', endIdx);
  process.exit(1);
}

content = content.slice(0, startIdx) + newCardsCode + '\n' + content.slice(endIdx);

// Also update Carousel container height and Card 9 prop
content = content.replace(
  'relative min-h-[530px] h-[570px] sm:h-[540px] flex items-center justify-center overflow-hidden py-1',
  'relative min-h-[580px] h-[640px] sm:h-[610px] md:h-[590px] flex items-center justify-center overflow-hidden py-1'
);

content = content.replace(
  '{card.cardNumber === 9 && <SpeedFlowVisual />}',
  '{card.cardNumber === 9 && <SpeedFlowVisual topicId={topicId} />}'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated Cards 3 through 10 Visuals!');
