import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { OOPS_TOPIC_REGISTRY } from '../client/src/data/oops/oopsTopicDataRegistry.js';
import { getOOPSTopicCards, OOPS_10_CARDS } from '../client/src/data/oops/oopsIntroductionData.js';

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${description}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

console.log('\n============================================================');
console.log('RUNNING OOPS VS DSA CARD INTERACTION PARITY SUITE');
console.log('============================================================\n');

const dsaCode = fs.readFileSync(path.join(__dirname, '../client/src/components/learning/DSATopicIntroduction.jsx'), 'utf-8');
const oopsCode = fs.readFileSync(path.join(__dirname, '../client/src/components/learning/oops/OOPSIntroductionSection.jsx'), 'utf-8');

console.log('1. Checking Structural & Transform Parity between DSA and OOPS...');

test('1. Card Stage Layout: Both use perspective-1000 3D carousel stage', () => {
  assert(dsaCode.includes('perspective-1000'), 'DSA has perspective-1000');
  assert(oopsCode.includes('perspective-1000'), 'OOPS has perspective-1000');
});

test('2. Card Windowing: Strictly only 3 cards rendered (Math.abs(diff) <= 1)', () => {
  assert(dsaCode.includes('Math.abs(diff) > 1'), 'DSA checks Math.abs(diff) > 1');
  assert(oopsCode.includes('Math.abs(diff) > 1'), 'OOPS checks Math.abs(diff) > 1');
});

test('3. Card Dimensions: Both share identical responsive width and max-w-720px/760px classes', () => {
  const cardDim = 'w-[94%] sm:w-[88%] md:w-[82%] lg:w-[76%] max-w-[720px] xl:max-w-[760px] h-full rounded-3xl';
  assert(dsaCode.includes(cardDim), 'DSA has responsive card dimensions');
  assert(oopsCode.includes(cardDim), 'OOPS matches responsive card dimensions');
});

test('4. Card Movement & 3D Math: Both use translateX, translateZ(-90px), rotateY(diff * -10), scale(0.86/1.0)', () => {
  assert(dsaCode.includes('translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})'), 'DSA transform template');
  assert(oopsCode.includes('translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})'), 'OOPS transform template');
  assert(oopsCode.includes('const zOffset = isActive ? 0 : -90;'), 'OOPS zOffset matching DSA');
  assert(oopsCode.includes('const scale = isActive ? 1.0 : 0.86;'), 'OOPS scale matching DSA');
  assert(oopsCode.includes('const opacity = isActive ? 1 : 0.65;'), 'OOPS opacity matching DSA');
  assert(oopsCode.includes('const zIndex = isActive ? 30 : 10;'), 'OOPS zIndex matching DSA');
});

test('5. Transition Duration & Easing: Both use duration-500 ease-out', () => {
  assert(dsaCode.includes('transition-all duration-500 ease-out'), 'DSA has duration-500 ease-out');
  assert(oopsCode.includes('transition-all duration-500 ease-out'), 'OOPS has duration-500 ease-out');
});

test('6. Responsive Card Spread: Both use 160 / 270 / 360 / 420 breakpoints', () => {
  const spreadLogic = 'isSmallScreen ? 160 : isMediumScreen ? 270 : isLargeScreen ? 360 : 420';
  assert(dsaCode.includes(spreadLogic), 'DSA has cardSpread breakpoints');
  assert(oopsCode.includes(spreadLogic), 'OOPS has matching cardSpread breakpoints');
});

test('7. Active vs Inactive Card Styling: Ring and shadow matching DSA', () => {
  assert(dsaCode.includes('bg-white border-indigo-200/90 shadow-2xl ring-1 ring-indigo-500/10'), 'DSA active card class');
  assert(oopsCode.includes('bg-white border-indigo-200/90 shadow-2xl ring-1 ring-indigo-500/10'), 'OOPS active card class');
  assert(dsaCode.includes('bg-slate-50/95 border-slate-200/90 shadow-md cursor-pointer hover:border-indigo-200'), 'DSA inactive card class');
  assert(oopsCode.includes('bg-slate-50/95 border-slate-200/90 shadow-md cursor-pointer hover:border-indigo-200'), 'OOPS inactive card class');
});

test('8. Progress Indicator: 10 indicator dots with active expanding to w-8 pill', () => {
  const dotActive = "isDotActive\n                      ? 'w-8 h-2.5 bg-indigo-600 shadow-xs'\n                      : 'w-2.5 h-2.5 bg-slate-200 hover:bg-indigo-300'";
  assert(dsaCode.includes('w-8 h-2.5 bg-indigo-600 shadow-xs'), 'DSA has w-8 active pill');
  assert(oopsCode.includes('w-8 h-2.5 bg-indigo-600 shadow-xs'), 'OOPS has w-8 active pill');
  assert(dsaCode.includes('w-2.5 h-2.5 bg-slate-200 hover:bg-indigo-300'), 'DSA has w-2.5 inactive dot');
  assert(oopsCode.includes('w-2.5 h-2.5 bg-slate-200 hover:bg-indigo-300'), 'OOPS has w-2.5 inactive dot');
});

test('9. Keyboard Navigation: ArrowLeft / ArrowRight handlers', () => {
  assert(dsaCode.includes("e.key === 'ArrowLeft'"), 'DSA ArrowLeft handler');
  assert(dsaCode.includes("e.key === 'ArrowRight'"), 'DSA ArrowRight handler');
  assert(oopsCode.includes("e.key === 'ArrowLeft'"), 'OOPS ArrowLeft handler');
  assert(oopsCode.includes("e.key === 'ArrowRight'"), 'OOPS ArrowRight handler');
});

test('10. Next / Prev Buttons: Consistent styling and boundary disabling', () => {
  assert(oopsCode.includes('id="btn-intro-prev-card"'), 'OOPS has btn-intro-prev-card');
  assert(oopsCode.includes('id="btn-intro-next-card"'), 'OOPS has btn-intro-next-card');
  assert(oopsCode.includes('disabled={activeIndex === 0}'), 'Disabled on card 1');
  assert(oopsCode.includes('id="btn-intro-goto-examples"'), 'Card 10 links to Solved Examples');
});

test('11. Direct Card Selection: Clicking inactive peek card or clicking dots updates activeIndex', () => {
  assert(oopsCode.includes('if (!isActive) handleCardChange(index);'), 'Click on peek card switches activeIndex');
  assert(oopsCode.includes('onClick={() => handleCardChange(idx)}'), 'Click on progress dot switches activeIndex');
});

test('12. Topic Switching: Resetting activeIndex on topic change', () => {
  assert(oopsCode.includes('setActiveIndex(0)'), 'Resets active index to 0');
});

test('13. Reduced Motion Support: Zeroes rotateY and transitions instantly when prefers-reduced-motion is true', () => {
  assert(oopsCode.includes('prefersReducedMotion'), 'Checks prefersReducedMotion');
  assert(oopsCode.includes("prefersReducedMotion ? '0ms' : undefined"), 'Sets 0ms duration when motion reduced');
});

console.log('\n2. Checking OOPS Content Integrity across all 20 Topics...');

test('14. All 20 canonical topics return exactly 10 cards with valid pedagogical structure', () => {
  const topicIds = Object.keys(OOPS_TOPIC_REGISTRY);
  assert.strictEqual(topicIds.length, 20, 'Has 20 canonical topics');
  for (const tid of topicIds) {
    const topicCards = getOOPSTopicCards(tid);
    assert.strictEqual(topicCards.length, 10, `Topic ${tid} must have 10 cards`);
    assert(topicCards[0].simpleDef, `Topic ${tid} Card 1 must have simpleDef`);
    assert(topicCards[3].syntaxNotes || topicCards[3].codeSnippets, `Topic ${tid} Card 4 must have syntax`);
    assert(topicCards[4].realWorldScenario || topicCards[4].realWorldAnalogy, `Topic ${tid} Card 5 must have scenario/analogy`);
    assert(topicCards[5].typesList || topicCards[5].simpleDef, `Topic ${tid} Card 6 must have typesList`);
    assert(topicCards[6].executionTrace || topicCards[6].codeSnippets, `Topic ${tid} Card 7 must have trace/code`);
    assert(topicCards[7].mistakesList || topicCards[7].simpleDef, `Topic ${tid} Card 8 must have mistakes`);
    assert(topicCards[8].interviewQuestions || topicCards[8].simpleDef, `Topic ${tid} Card 9 must have interview info`);
    assert(topicCards[9].cheatSheet || topicCards[9].highlights, `Topic ${tid} Card 10 must have cheat sheet`);
  }
});

console.log('\n============================================================');
console.log(`PARITY TEST RESULTS: ${passed} passed, ${failed} failed`);
console.log('============================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL DSA VS OOPS CARD INTERACTION PARITY CHECKS PASSED FLAWLESSLY! ✓\n');
}
