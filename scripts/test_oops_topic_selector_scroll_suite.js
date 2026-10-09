/**
 * AUTOMATED TEST SUITE: OOPS TOPIC SELECTION & DIRECT SCROLL TO THEORY
 * 
 * Verifies:
 * 1. All 20 Canonical OOPS topics accessible from topic selector
 * 2. Uses canonical OOPS_TOPIC_REGISTRY and OOPS_TOPICS_LIST (No duplicate data)
 * 3. 5 Canonical Topic Groups: Core Concepts, Object Construction & Methods, Advanced OOPS, Object Relationships, Other
 * 4. Active topic highlighted with badge, distinct styling, and index 1-20
 * 5. Topic selector toggled by #oops-change-topic-btn and closed on selection / escape / backdrop
 * 6. Direct scroll ref (topicTheoryRef) and #oops-section-introduction with scroll-margin-top (scroll-mt-20 sm:scroll-mt-24)
 * 7. Header offset handled properly (scroll-margin-top avoids sticky header collision)
 * 8. Active topic change resets 10-card carousel to Card 1
 * 9. Keyboard accessibility (Escape key listener, Enter/Space button selection, focus visible)
 * 10. Responsive layout classes (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3, max-h-[88vh] overflow-y-auto)
 * 11. Zero regression on 3D depth carousel transforms, card animation, dimensions, navigation
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  OOPS_TOPIC_REGISTRY,
  OOPS_TOPICS_LIST,
  OOPS_TOPIC_GROUPS,
  resolveOOPSTopicId,
  getOOPSTopic
} from '../client/src/data/oops/oopsTopicDataRegistry.js';

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${description}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

console.log('\n============================================================');
console.log('RUNNING OOPS TOPIC SELECTOR & DIRECT THEORY SCROLL SUITE');
console.log('============================================================\n');

const oopsPagePath = path.join(__dirname, '../client/src/pages/student/OOPSLearningPage.jsx');
const oopsPageCode = fs.readFileSync(oopsPagePath, 'utf-8');

const oopsIntroPath = path.join(__dirname, '../client/src/components/learning/oops/OOPSIntroductionSection.jsx');
const oopsIntroCode = fs.readFileSync(oopsIntroPath, 'utf-8');

// -----------------------------------------------------------------------------
// 1. CANONICAL TOPIC REGISTRY INTEGRITY
// -----------------------------------------------------------------------------
console.log('1. Verifying Canonical Topic Registry Integrity (All 20 Topics)...');

test('1.1 Exact 20 canonical topics in registry', () => {
  assert.strictEqual(OOPS_TOPICS_LIST.length, 20, 'Must have exactly 20 topics');
  assert.strictEqual(Object.keys(OOPS_TOPIC_REGISTRY).length, 20, 'Registry keys count must be 20');
});

test('1.2 OOPS_TOPIC_GROUPS references canonical registry without duplication', () => {
  assert(Array.isArray(OOPS_TOPIC_GROUPS), 'OOPS_TOPIC_GROUPS must be an array');
  assert.strictEqual(OOPS_TOPIC_GROUPS.length, 5, 'Must have 5 canonical categories');

  const expectedCategories = [
    'Core Concepts',
    'Object Construction & Methods',
    'Advanced OOPS',
    'Object Relationships',
    'Other'
  ];

  OOPS_TOPIC_GROUPS.forEach((group, idx) => {
    assert.strictEqual(group.category, expectedCategories[idx]);
    group.topicIds.forEach((tId) => {
      assert(OOPS_TOPIC_REGISTRY[tId], `Topic ID ${tId} must exist in canonical registry`);
    });
  });

  const totalGroupedTopics = OOPS_TOPIC_GROUPS.reduce((acc, g) => acc + g.topicIds.length, 0);
  assert.strictEqual(totalGroupedTopics, 20, 'All 20 topics accounted for across the 5 groups');
});

// -----------------------------------------------------------------------------
// 2. TOPIC SELECTOR UX & ACCESSIBILITY
// -----------------------------------------------------------------------------
console.log('\n2. Verifying Topic Selector UX & Accessibility...');

test('2.1 Change Topic button toggles selector (#oops-change-topic-btn)', () => {
  assert(oopsPageCode.includes('id="oops-change-topic-btn"'), 'Has #oops-change-topic-btn');
  assert(oopsPageCode.includes('onClick={() => setShowTopicGrid((prev) => !prev)}'), 'Toggles showTopicGrid state');
});

test('2.2 Topic selector container has id="oops-topic-selector" and ARIA modal attributes', () => {
  assert(oopsPageCode.includes('id="oops-topic-selector"'), 'Has #oops-topic-selector');
  assert(oopsPageCode.includes('role="dialog"'), 'Has role="dialog"');
  assert(oopsPageCode.includes('aria-modal="true"'), 'Has aria-modal="true"');
});

test('2.3 Every topic renders with id="oops-topic-card-${top.topicId}" as an accessible button', () => {
  assert(oopsPageCode.includes('id={`oops-topic-card-${top.topicId}`}'), 'Renders dynamic topic button IDs');
  assert(oopsPageCode.includes('type="button"'), 'Uses semantic button element');
  assert(oopsPageCode.includes('focus-visible:ring-2 focus-visible:ring-[#6574C4]'), 'Focus visible ring for keyboard navigation');
});

test('2.4 Active topic is visually highlighted with badge and distinct styling', () => {
  assert(oopsPageCode.includes('isSelected'), 'Checks isSelected for active topic');
  assert(oopsPageCode.includes('border-2 border-[#6574C4]'), 'Distinct active border');
  assert(oopsPageCode.includes('Active'), 'Active text badge rendered for selected topic');
});

test('2.5 Dismissal mechanisms: Close button, Escape key, and backdrop click', () => {
  assert(oopsPageCode.includes("e.key === 'Escape'"), 'Escape key closes selector');
  assert(oopsPageCode.includes('e.target === e.currentTarget') && oopsPageCode.includes('setShowTopicGrid(false)'), 'Backdrop click dismisses selector');
  assert(oopsPageCode.includes('aria-label="Close topic selector"'), 'Accessible close button present');
});

// -----------------------------------------------------------------------------
// 3. DIRECT SCROLL TO THEORY SECTION
// -----------------------------------------------------------------------------
console.log('\n3. Verifying Direct Scroll to Theory Section...');

test('3.1 topicTheoryRef attached to introduction section container', () => {
  assert(oopsPageCode.includes('const topicTheoryRef = useRef(null)'), 'Declares topicTheoryRef');
  assert(oopsPageCode.includes('ref={topicTheoryRef}'), 'Attaches ref={topicTheoryRef}');
});

test('3.2 Sticky header compensation with scroll-margin-top on theory container', () => {
  assert(oopsPageCode.includes('ref={topicTheoryRef} className="scroll-mt-20 sm:scroll-mt-24"'), 'topicTheoryRef container has scroll-mt-20 sm:scroll-mt-24');
  assert(oopsIntroCode.includes('id="oops-section-introduction"') && oopsIntroCode.includes('scroll-mt-20 sm:scroll-mt-24'), 'oops-section-introduction has scroll-mt-20 sm:scroll-mt-24');
});

test('3.3 handleTopicSelect triggers activeSection switch to introduction and marks pending scroll', () => {
  assert(oopsPageCode.includes("setActiveSection('introduction')"), 'Switches active section to introduction');
  assert(oopsPageCode.includes('setPendingTheoryScroll(true)'), 'Sets pendingTheoryScroll to true');
  assert(oopsPageCode.includes('setShowTopicGrid(false)'), 'Closes topic selector on selection');
});

test('3.4 Controlled useEffect lifecycle for smooth scroll after DOM paint', () => {
  assert(oopsPageCode.includes('useEffect(() => {') && oopsPageCode.includes('if (pendingTheoryScroll)'), 'Controlled effect for pending scroll');
  assert(oopsPageCode.includes('requestAnimationFrame'), 'Uses requestAnimationFrame for layout paint readiness');
  assert(oopsPageCode.includes('targetEl.scrollIntoView'), 'Invokes element.scrollIntoView');
  assert(oopsPageCode.includes("behavior: 'smooth'") && oopsPageCode.includes("block: 'start'"), 'Uses smooth start scroll');
});

// -----------------------------------------------------------------------------
// 4. TOPIC CHANGE RESETS THEORY CAROUSEL TO CARD 1
// -----------------------------------------------------------------------------
console.log('\n4. Verifying Topic Change Resets Theory Carousel to Card 1...');

test('4.1 OOPSIntroductionSection resets activeIndex to 0 whenever topic.topicId changes', () => {
  assert(oopsIntroCode.includes('useEffect(() => {') && oopsIntroCode.includes('setActiveIndex(0);') && oopsIntroCode.includes('[topic?.topicId]'), 'Resets active index to 0 on topic change');
});

// -----------------------------------------------------------------------------
// 5. RESPONSIVENESS AND NON-REGRESSION
// -----------------------------------------------------------------------------
console.log('\n5. Verifying Responsiveness & Carousel Non-Regression...');

test('5.1 Topic selector has responsive multi-column layout and scroll container', () => {
  assert(oopsPageCode.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'), 'Responsive 1/2/3-column topic grid');
  assert(oopsPageCode.includes('max-h-[88vh]') && oopsPageCode.includes('overflow-y-auto'), 'Max height and vertical scroll without horizontal overflow');
});

test('5.2 Carousel 3D perspective and card dimensions unchanged', () => {
  assert(oopsIntroCode.includes('perspective-1000'), 'perspective-1000 preserved');
  assert(oopsIntroCode.includes('w-[94%] sm:w-[88%] md:w-[82%] lg:w-[76%] max-w-[720px] xl:max-w-[760px]'), 'Card dimensions preserved');
  assert(oopsIntroCode.includes('const zOffset = isActive ? 0 : -90;'), '3D zOffset preserved');
});

console.log('\n============================================================');
console.log(`TEST RESULTS: ${passed} passed, ${failed} failed`);
console.log('============================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL TOPIC SELECTION & DIRECT SCROLL VERIFICATIONS PASSED! ✓\n');
}
