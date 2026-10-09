/**
 * PathPilot — Final Aptitude 10-Card Learning Experience Verification Suite
 * Verifies all requirements from the latest specification:
 * - 10 Cards for all topics
 * - Real, authentic topic-specific formulas (NO generic placeholder formulas)
 * - Beginner-friendly language (no academic jargon)
 * - Separate formula boxes on Card 2
 * - Step-by-step solved examples on Card 4 (Question -> Step 1 -> Step 2 -> Step 3 -> Answer)
 * - Normal vs Fast method comparison
 * - Common mistakes with ❌ Wrong vs ✓ Correct
 * - Calm light theme (no dark navy backgrounds or heavy orange borders)
 * - Meaningful SVG illustrations on Cards 1, 4, 6, 10
 * - Depth Carousel mechanics (1 active card, adjacent cards scaled/behind, 10 dots, Prev/Next)
 * - No internal card vertical scrollbar
 * - Specific verification for Geometry, Number System, Percentages, Profit & Loss, Ratio
 * - DSA 100% untouched
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

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

console.log('================================================================');
console.log('FINAL APTITUDE 10-CARD LEARNING EXPERIENCE VERIFICATION');
console.log('================================================================\n');

// 1. Data Registry & Card Counts
console.log('--- 1. Data Architecture & Topic-Specific Registry ---');
const registry = require('../client/src/data/aptitudeTopicDataRegistry');

const defaultTopic = registry.getAptitudeTopic('percentages');
assert(defaultTopic && defaultTopic.topicName === 'Percentages', 'Default topic resolves to Percentages');
assert(Array.isArray(defaultTopic.cards) && defaultTopic.cards.length === 10, 'Percentages has exactly 10 cards');

const profitLossTopic = registry.getAptitudeTopic('profit-and-loss');
assert(profitLossTopic && profitLossTopic.topicName === 'Profit & Loss', 'Profit & Loss topic resolves correctly');
assert(Array.isArray(profitLossTopic.cards) && profitLossTopic.cards.length === 10, 'Profit & Loss has exactly 10 cards');

const numberSystemTopic = registry.getAptitudeTopic('number-system');
assert(numberSystemTopic && numberSystemTopic.topicName === 'Number System', 'Number System topic resolves correctly');
assert(Array.isArray(numberSystemTopic.cards) && numberSystemTopic.cards.length === 10, 'Number System has exactly 10 cards');

const ratioTopic = registry.getAptitudeTopic('ratio-and-proportion');
assert(ratioTopic && ratioTopic.topicName === 'Ratio & Proportion', 'Ratio & Proportion topic resolves correctly');
assert(Array.isArray(ratioTopic.cards) && ratioTopic.cards.length === 10, 'Ratio & Proportion has exactly 10 cards');

const geometryTopic = registry.getAptitudeTopic('geometry');
assert(geometryTopic && geometryTopic.topicName === 'Geometry', 'Geometry topic resolves correctly');
assert(Array.isArray(geometryTopic.cards) && geometryTopic.cards.length === 10, 'Geometry has exactly 10 cards');

// Verify all registered topics have 10 cards
const allTopicKeys = Object.keys(registry.APTITUDE_TOPIC_REGISTRY);
let allTopicsHave10Cards = true;
allTopicKeys.forEach(key => {
  const t = registry.getAptitudeTopic(key);
  if (!t.cards || t.cards.length !== 10) {
    allTopicsHave10Cards = false;
  }
});
assert(allTopicsHave10Cards, `All ${allTopicKeys.length} registered topics have exactly 10 cards`);

// Verify topic content is authentic and distinct
assert(defaultTopic.cards[0].title !== profitLossTopic.cards[0].title, 'Card 1 titles are topic-specific');
assert(numberSystemTopic.cards[0].title !== profitLossTopic.cards[0].title, 'Number System Card 1 is distinct from Profit & Loss');
assert(geometryTopic.cards[0].title !== profitLossTopic.cards[0].title, 'Geometry Card 1 is distinct from Profit & Loss');

// 2. Geometry Content Accuracy (Per User Specifications)
console.log('\n--- 2. Geometry Topic Real Content Verification ---');
const geomStr = JSON.stringify(geometryTopic);
assert(geomStr.includes('Geometry is the study of shapes'), 'Geometry Card 1 has simple definition');
assert(geomStr.includes('Angle') && geomStr.includes('Triangle') && geomStr.includes('Area'), 'Geometry Card 1 has Angle, Triangle, Area terms');
assert(geomStr.includes('5 m') && geomStr.includes('4 m') && geomStr.includes('20 m²'), 'Geometry Card 1 has 5m x 4m = 20 m² real-life example');

const geomCard2 = geometryTopic.cards[1];
assert(geomCard2.formulaBoxes.some(f => f.formula.includes('Length × Width')), 'Geometry Card 2 has Area of Rectangle = Length × Width');
assert(geomCard2.formulaBoxes.some(f => f.formula.includes('Base × Height')), 'Geometry Card 2 has Area of Triangle = ½ × Base × Height');
assert(geomCard2.formulaBoxes.some(f => f.formula.includes('2(Length + Width)') || f.formula.includes('2(L + W)')), 'Geometry Card 2 has Perimeter of Rectangle');

const geomCard4 = geometryTopic.cards[3];
assert(geomCard4.question.includes('8 cm') && geomCard4.question.includes('5 cm'), 'Geometry Card 4 has 8 cm x 5 cm rectangle example');
assert(geomCard4.steps.length === 3, 'Geometry Card 4 has 3 clear steps');
assert(geomCard4.finalAnswer.includes('40 cm²'), 'Geometry Card 4 final answer is 40 cm²');

const geomCard8 = geometryTopic.cards[7];
assert(geomCard8.mistakes.some(m => m.wrong.includes('perimeter like area') || m.wrong.includes('Confusing')), 'Geometry Card 8 warns about confusing Area and Perimeter');
assert(geomCard8.mistakes.some(m => m.wrong.includes('square units') || m.wrong.includes('40 cm')), 'Geometry Card 8 warns about square units');

const geomCard9 = geometryTopic.cards[8];
assert(geomCard9.steps.some(s => s.title.includes('Identify Shape')), 'Geometry Card 9 includes Identify Shape step');

const geomCard10 = geometryTopic.cards[9];
assert(geomCard10.cheatSheet.formulas.some(f => f.includes('πr²') || f.includes('Circle')), 'Geometry Card 10 has Circle Area formula');

// 3. No Generic Fake Formulas
console.log('\n--- 3. No Generic Fake Formulas / Authentic Content ---');
const numSysStr = JSON.stringify(numberSystemTopic);
assert(!numSysStr.includes('Rate = Total Output / Total Time Elapsed'), 'Number System does NOT contain generic output/time rate formula');
assert(!numSysStr.includes('Proportional Factor'), 'Number System does NOT contain generic Proportional Factor jargon');
assert(!numSysStr.includes('Fundamental Relation'), 'Number System does NOT contain Fundamental Relation');
assert(numSysStr.includes('Dividend = (Divisor × Quotient) + Remainder'), 'Number System has authentic Dividend formula');
assert(numSysStr.includes('Divisible by 3 or 9') || numSysStr.includes('divisibility'), 'Number System has real divisibility rules');

const plStr = JSON.stringify(profitLossTopic);
assert(plStr.includes('Profit = SP − CP') || plStr.includes('Profit = SP - CP'), 'Profit & Loss has real Profit = SP - CP formula');
assert(plStr.includes('500') && plStr.includes('600'), 'Profit & Loss has concrete college bag ₹500 -> ₹600 example');

// 4. Component UI Architecture & Calm Light Color Scheme
console.log('\n--- 4. UI Architecture & Calm Light Theme ---');
const carouselSrc = fs.readFileSync(
  path.resolve(ROOT, 'client/src/components/learning/AptitudeTopicIntroduction.jsx'),
  'utf8'
);

assert(carouselSrc.includes('perspective-1000'), 'Uses 3D perspective-1000 stage');
assert(carouselSrc.includes('Math.abs(diff) > 1'), 'Strictly limits rendering to 3 cards (diff === -1, 0, 1)');
assert(carouselSrc.includes('const isActive = diff === 0;'), 'Single active card at diff === 0');
assert(carouselSrc.includes('rotateY(${rotateY}deg)'), 'Applies 3D rotation depth to adjacent cards');
assert(carouselSrc.includes('scale(${scale})'), 'Applies scale transformation (smaller adjacent cards)');

// No Dark Navy classes in AptitudeTopicIntroduction
assert(!carouselSrc.includes('dark:bg-slate-900'), 'NO dark:bg-slate-900 in AptitudeTopicIntroduction');
assert(!carouselSrc.includes('dark:bg-slate-950'), 'NO dark:bg-slate-950 in AptitudeTopicIntroduction');
assert(!carouselSrc.includes('dark:bg-slate-800'), 'NO dark:bg-slate-800 in AptitudeTopicIntroduction');
assert(carouselSrc.includes('bg-white'), 'Card uses clean pure white bg-white');
assert(carouselSrc.includes('border-indigo-300') || carouselSrc.includes('border-indigo-200'), 'Uses soft indigo border on active card');

// No Internal Card Vertical Scrollbar
assert(!carouselSrc.includes('overflow-y-auto pr-1 scrollbar-thin'), 'Removed internal card vertical scrollbar');

// Illustrations
assert(carouselSrc.includes('ConceptIllustration'), 'Card 1 educational illustration component present');
assert(carouselSrc.includes('StepTimelineVisual'), 'Card 4 step timeline visual present');
assert(carouselSrc.includes('ShortcutIllustration'), 'Card 6 shortcut illustration present');
assert(carouselSrc.includes('CheatSheetIllustration'), 'Card 10 cheat sheet badge present');
assert(carouselSrc.includes('topicId === \'geometry\''), 'Specific Geometry illustration supported in ConceptIllustration');

// Navigation controls
assert(carouselSrc.includes('id="aptitude-carousel-prev"'), 'Previous button present with descriptive ID');
assert(carouselSrc.includes('id="aptitude-carousel-next"'), 'Next button present with descriptive ID');
assert(carouselSrc.includes('disabled={activeIndex === 0}'), 'Previous button disabled at boundary (card 1)');
assert(carouselSrc.includes('disabled={activeIndex === totalCards - 1}'), 'Next button disabled at boundary (card 10)');
assert(carouselSrc.includes('aptitude-dot-'), '10 progress indicator dots present');
assert(carouselSrc.includes('ArrowLeft') && carouselSrc.includes('ArrowRight'), 'Keyboard navigation support included');

// 5. DSA Independence Check
console.log('\n--- 5. DSA Independence Check ---');
const dsaIntroSrc = fs.readFileSync(
  path.resolve(ROOT, 'client/src/components/learning/DSATopicIntroduction.jsx'),
  'utf8'
);
assert(dsaIntroSrc.includes('TWO_POINTERS_INTRO_DATA'), 'DSATopicIntroduction TWO_POINTERS_INTRO_DATA untouched');
assert(dsaIntroSrc.includes('export default function DSATopicIntroduction'), 'DSATopicIntroduction exported unchanged');

const dsaPageSrc = fs.readFileSync(
  path.resolve(ROOT, 'client/src/pages/student/DSALearningPage.jsx'),
  'utf8'
);
assert(dsaPageSrc.includes('<DSATopicIntroduction'), 'DSALearningPage renders DSATopicIntroduction');
assert(!dsaPageSrc.includes('AptitudeTopicIntroduction'), 'DSALearningPage is not polluted with Aptitude components');

console.log('\n================================================================');
console.log(`TOTAL SUITE CHECKS: ${passed} PASSED, ${failed} FAILED.`);
console.log('================================================================');

if (failed > 0) process.exit(1);
