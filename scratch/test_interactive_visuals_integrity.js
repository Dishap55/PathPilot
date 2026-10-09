import fs from 'fs';
import path from 'path';

const filePath = path.resolve('client/src/components/learning/AptitudeTopicIntroduction.jsx');
const content = fs.readFileSync(filePath, 'utf8');

console.log('================================================================');
console.log('APTITUDE INTERACTIVE LEARNING VISUALS VERIFICATION SUITE');
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

// 1. Time, Speed & Distance Interactive Kinematics Simulator
console.log('--- 1. Time, Speed & Distance Simulator ---');
assert(content.includes('TSDInteractiveVisual'), 'TSDInteractiveVisual component defined');
assert(content.includes('setSpeed') && content.includes('setTime'), 'Speed & Time state handlers present');
assert(content.includes('const distance = speed * time'), 'Live distance formula calculation');
assert(content.includes('animate-edu-drive') && content.includes('driveDuration'), 'Synchronized car drive animation');
assert(content.includes('km/h') && content.includes('🚗'), 'Car visual & km/h units present');

// 2. Profit & Loss Interactive Simulator
console.log('\n--- 2. Profit & Loss Simulator ---');
assert(content.includes('ProfitLossInteractiveVisual'), 'ProfitLossInteractiveVisual component defined');
assert(content.includes('setCp') && content.includes('setSp'), 'CP & SP interactive state handlers');
assert(content.includes('const diff = sp - cp'), 'Live difference calculation');
assert(content.includes('SP &gt; CP → Profit') || content.includes('SP > CP'), 'Dynamic profit vs loss status tag');
assert(content.includes('Cost Price (CP)') && content.includes('Selling Price (SP)'), 'Standard business labels');

// 3. Percentages 100-Cell Interactive Visual
console.log('\n--- 3. Percentages Interactive Visual ---');
assert(content.includes('PercentagesInteractiveVisual'), 'PercentagesInteractiveVisual component defined');
assert(content.includes('setPct') && content.includes('presets'), 'Percentage rate preset buttons & slider');
assert(content.includes('100-Cell Percentage Grid') && content.includes('grid-cols-10'), '100-cell grid structure');
assert(content.includes('const amount = (base * pct) / 100'), 'Live amount calculation from base');

// 4. Ratio & Proportion Interactive Visual
console.log('\n--- 4. Ratio & Proportion Interactive Visual ---');
assert(content.includes('RatioInteractiveVisual'), 'RatioInteractiveVisual component defined');
assert(content.includes('setPartA') && content.includes('setPartB'), 'Part A & Part B ratio controls');
assert(content.includes('bg-indigo-500') && content.includes('bg-purple-500'), 'Dual color share circle tokens');
assert(content.includes('const totalParts = partA + partB'), 'Live total parts computation');

// 5. Geometry Interactive Shape Dimensions
console.log('\n--- 5. Geometry Interactive Simulator ---');
assert(content.includes('GeometryInteractiveVisual'), 'GeometryInteractiveVisual component defined');
assert(content.includes('setLength') && content.includes('setWidth'), 'Length & Width interactive controls');
assert(content.includes('const area = length * width'), 'Live area computation L × W');
assert(content.includes('const perimeter = 2 * (length + width)'), 'Live perimeter computation 2(L+W)');
assert(content.includes('Rectangle') && content.includes('Triangle') && content.includes('Circle'), 'Core geometric shape badges');

// 6. Simple Interest Interactive Visual
console.log('\n--- 6. Simple Interest Simulator ---');
assert(content.includes('SimpleInterestInteractiveVisual'), 'SimpleInterestInteractiveVisual component defined');
assert(content.includes('setR') && content.includes('setT'), 'Rate & Time controls');
assert(content.includes('const interest = (p * r * t) / 100'), 'Live SI calculation');
assert(content.includes('Total = ₹12,000'), 'Benchmark milestone reference');

// 7. Compound Interest Interactive Visual
console.log('\n--- 7. Compound Interest Simulator ---');
assert(content.includes('CompoundInterestInteractiveVisual'), 'CompoundInterestInteractiveVisual component defined');
assert(content.includes('Math.pow(1 + r / 100'), 'Exponential compounding formula');
assert(content.includes('Compounding Growth'), 'Compounding growth curve indicator');

// 8. Probability Interactive Simulator
console.log('\n--- 8. Probability Simulator ---');
assert(content.includes('ProbabilityInteractiveVisual'), 'ProbabilityInteractiveVisual component defined');
assert(content.includes('setSelectedEvent'), 'Interactive target event selector');
assert(content.includes('Die Roll: 6 Total Outcomes') && content.includes('🎲'), '6 die faces visual');
assert(content.includes('P = Favorable / Total'), 'Live favorable over total probability calculation');

// 9. Average Interactive Simulator
console.log('\n--- 9. Average Simulator ---');
assert(content.includes('AverageInteractiveVisual'), 'AverageInteractiveVisual component defined');
assert(content.includes('setN1') && content.includes('setN2') && content.includes('setN3'), '3-number interactive controls');
assert(content.includes('const avg = (sum / 3).toFixed(1)'), 'Live average mean calculation');

// 10. Card 6 Shortcut Modulo Waterfall (Number System)
console.log('\n--- 10. Card 6 Shortcut Modulo Waterfall ---');
assert(content.includes('NumberSystemShortcutVisual'), 'NumberSystemShortcutVisual component defined');
assert(content.includes('43 × 47 mod 5') || content.includes('numA} × ${numB} mod'), 'Waterfall input equation');
assert(content.includes('remA} × ${remB}') || content.includes('remA * remB'), 'Waterfall intermediate remainder product');
assert(content.includes('Remainder = {finalRem}'), 'Waterfall final remainder output');

// 11. Card 6 Ratio Shortcut (Profit & Loss)
console.log('\n--- 11. Card 6 Ratio Shortcut ---');
assert(content.includes('ProfitLossShortcutVisual'), 'ProfitLossShortcutVisual component defined');
assert(content.includes('CP : SP =') && content.includes('5 : 6'), '20% profit 5:6 ratio shortcut');

// 12. Theme & UX Standards
console.log('\n--- 12. UX & Responsive Standards ---');
assert(content.includes('min-h-[580px] h-[640px]'), 'Extended depth carousel container height for rich visuals');
assert(content.includes('prefers-reduced-motion') || !content.includes('dark:bg-slate-900'), 'Light theme & reduced motion respected');

console.log('\n================================================================');
console.log(`TOTAL CHECKS: ${passed} PASSED, ${failed} FAILED.`);
console.log('================================================================');

if (failed > 0) process.exit(1);
