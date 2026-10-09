import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const compPath = path.join(ROOT_DIR, 'client/src/components/learning/AptitudeTopicIntroduction.jsx');
const content = fs.readFileSync(compPath, 'utf8');

console.log('================================================================');
console.log('APTITUDE 10-CARD EDUCATIONAL VISUALS ACCEPTANCE VERIFICATION');
console.log('================================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failed++;
  }
}

console.log('--- 1. Verification of All 10 Card Visual Components ---');
assert(content.includes('function ConceptIllustration'), 'Card 1 ConceptIllustration component defined');
assert(content.includes('function FormulaVisual'), 'Card 2 FormulaVisual relationship component defined');
assert(content.includes('function QuickTrickVisual'), 'Card 3 QuickTrickVisual component defined');
assert(content.includes('function SolvedExampleVisual'), 'Card 4 SolvedExampleVisual component defined');
assert(content.includes('function VariationMapVisual'), 'Card 5 VariationMapVisual component defined');
assert(content.includes('function ShortcutDiagramVisual'), 'Card 6 ShortcutDiagramVisual component defined');
assert(content.includes('function ExamPatternVisual'), 'Card 7 ExamPatternVisual component defined');
assert(content.includes('function MistakeComparisonVisual'), 'Card 8 MistakeComparisonVisual (❌ vs ✓) defined');
assert(content.includes('function SpeedFlowVisual'), 'Card 9 SpeedFlowVisual component defined');
assert(content.includes('function RevisionSnapshotVisual'), 'Card 10 RevisionSnapshotVisual component defined');

console.log('\n--- 2. Topic-Specific Card 1 Concept Illustrations ---');
assert(content.includes('100-Cell Percentage Grid') && content.includes('grid-cols-10'), 'Percentages has 100-cell percentage grid');
assert(content.includes('Rectangle') && content.includes('Triangle') && content.includes('Circle'), 'Geometry has basic shapes showcase (Rectangle, Triangle, Circle)');
assert(content.includes('Cost Price (CP)') && content.includes('Selling Price (SP)') && content.includes('SP &gt; CP'), 'Profit & Loss has Buy -> Sell visual');
assert(content.includes('The Real Number Line') && content.includes('Negative') && content.includes('Zero') && content.includes('Positive') && content.includes('Primes'), 'Number System has Number Line with labeled types');
assert(content.includes('Ratio 3 : 2 = 5 Total Parts') && content.includes('bg-indigo-500') && content.includes('bg-purple-500'), 'Ratio & Proportion has colored ratio blocks');
assert(content.includes('Worker A') && content.includes('Worker B') && content.includes('1 Full Task Done Together'), 'Time & Work has workers + work units visual');
assert(content.includes('Distance = Speed × Time') && content.includes('🚗'), 'Time, Speed & Distance has road/car visual');
assert(content.includes('Die Roll: 6 Total Outcomes') && content.includes('🎲') && content.includes('🎯 Even: 2, 4, 6'), 'Probability has die outcomes visual');
assert(content.includes('Principal (P)') && content.includes('Interest (SI)') && content.includes('Total = ₹12,000'), 'Simple Interest has P -> I -> A visual');
assert(content.includes('Interest on Interest') && content.includes('Compounding Growth'), 'Compound Interest has compounding growth visual');

console.log('\n--- 3. Topic-Specific Card 2 Formula Visuals ---');
assert(content.includes('Formula Triangle') && content.includes('D = S × T') && content.includes('S = D / T'), 'Time-Speed-Distance formula triangle visual present');
assert(content.includes('Profit% = (Profit ÷ CP) × 100'), 'Profit & Loss formula visual present');
assert(content.includes('% Change = (Diff ÷ Original) × 100'), 'Percentages formula visual present');
assert(content.includes('Perimeter = 2 × (L + W)'), 'Geometry perimeter/area formula visual present');
assert(content.includes('Dividend') && content.includes('Divisor × Quotient') && content.includes('Remainder'), 'Number System division formula visual present');

console.log('\n--- 4. Visual Layouts on Cards 3 through 10 ---');
assert(content.includes('<QuickTrickVisual topicId={topicId}'), 'Card 3 renders QuickTrickVisual');
assert(content.includes('<SolvedExampleVisual topicId={topicId}'), 'Card 4 renders SolvedExampleVisual');
assert(content.includes('<VariationMapVisual topicId={topicId}'), 'Card 5 renders VariationMapVisual');
assert(content.includes('<ShortcutDiagramVisual topicId={topicId}'), 'Card 6 renders ShortcutDiagramVisual');
assert(content.includes('<ExamPatternVisual topicId={topicId}'), 'Card 7 renders ExamPatternVisual');
assert(content.includes('<MistakeComparisonVisual topicId={topicId}'), 'Card 8 renders MistakeComparisonVisual');
assert(content.includes('<SpeedFlowVisual'), 'Card 9 renders SpeedFlowVisual');
assert(content.includes('<RevisionSnapshotVisual topicId={topicId}'), 'Card 10 renders RevisionSnapshotVisual');

console.log('\n--- 5. Theme & UX Integrity ---');
assert(!content.includes('dark:bg-slate-900'), 'No dark:bg-slate-900 classes');
assert(!content.includes('dark:bg-slate-950'), 'No dark:bg-slate-950 classes');
assert(!content.includes('overflow-y-auto'), 'No internal card vertical scrollbars');
assert(content.includes('bg-white'), 'Light card background enforced');
assert(content.includes('perspective-1000'), '3D Depth Carousel preserved');

console.log('\n================================================================');
console.log(`TOTAL CHECKS: ${passed} PASSED, ${failed} FAILED.`);
console.log('================================================================');

if (failed > 0) process.exit(1);
