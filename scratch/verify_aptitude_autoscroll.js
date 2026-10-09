/**
 * PathPilot — Aptitude Topic Auto-Scroll Verification Suite
 * Verifies all requirements from TASK: AUTO-SCROLL TO APTITUDE LEARNING CARDS WHEN A TOPIC IS SELECTED
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
console.log('APTITUDE TOPIC AUTO-SCROLL ACCEPTANCE CRITERIA VERIFICATION');
console.log('================================================================\n');

const pageSrc = fs.readFileSync(
  path.resolve(ROOT, 'client/src/pages/student/AptitudeLearningPage.jsx'),
  'utf8'
);

const introSrc = fs.readFileSync(
  path.resolve(ROOT, 'client/src/components/learning/AptitudeTopicIntroduction.jsx'),
  'utf8'
);

// 1. Stable Element ID & Ref on the Existing Learning Section
console.log('--- 1. Stable Element ID & Ref on Learning Section ---');
assert(pageSrc.includes('id="aptitude-learning-section"'), 'Container has stable id="aptitude-learning-section"');
assert(pageSrc.includes('ref={learningSectionRef}'), 'Container has ref={learningSectionRef}');
assert(pageSrc.includes('scroll-mt-24') || pageSrc.includes('scroll-mt-20'), 'Container has scroll-margin-top CSS class for sticky header clearance');
assert(pageSrc.includes('<AptitudeTopicIntroduction'), 'Renders the existing AptitudeTopicIntroduction inside the learning section');

// 2. Smooth Scrolling in handleTopicSelect
console.log('\n--- 2. Smooth Scrolling Implementation ---');
assert(pageSrc.includes('const handleTopicSelect = (topicId) => {'), 'handleTopicSelect function exists');
assert(pageSrc.includes('setActiveTopic(topicId)'), 'handleTopicSelect updates activeTopic');
assert(pageSrc.includes('setSearchParams({ topic: topicId })'), 'handleTopicSelect preserves URL synchronization');
assert(pageSrc.includes('behavior: \'smooth\''), 'Uses smooth scrolling behavior');
assert(pageSrc.includes('window.scrollTo(') || pageSrc.includes('scrollIntoView('), 'Performs scroll operation');

// 3. Header Offset Calculation
console.log('\n--- 3. Sticky Header / Navbar Offset Calculation ---');
assert(pageSrc.includes('navbarHeight') || pageSrc.includes('scroll-mt-'), 'Accounts for sticky navbar height');
assert(pageSrc.includes('buffer') || pageSrc.includes('offsetPosition') || pageSrc.includes('scroll-mt-24'), 'Leaves comfortable visual breathing room so cards are not covered by navbar');

// 4. Intentional Triggering Only
console.log('\n--- 4. Intentional User Selection Only ---');
// Verify handleCategorySelect does NOT scroll
const categorySelectCode = pageSrc.substring(
  pageSrc.indexOf('const handleCategorySelect'),
  pageSrc.indexOf('const handleTopicSelect')
);
assert(!categorySelectCode.includes('scrollTo') && !categorySelectCode.includes('scrollIntoView'), 'Category switch does NOT trigger auto-scroll');

// Verify initial useEffect does NOT scroll
const useEffectCode = pageSrc.substring(
  pageSrc.indexOf('useEffect(() => {'),
  pageSrc.indexOf('const handleCategorySelect')
);
assert(!useEffectCode.includes('scrollTo') && !useEffectCode.includes('scrollIntoView'), 'Page load / URL parameter sync does NOT trigger auto-scroll');

// 5. Card 1 Reset on Topic Change
console.log('\n--- 5. Card 1 Reset on Topic Change ---');
assert(introSrc.includes('setActiveIndex(0)'), 'AptitudeTopicIntroduction resets activeIndex to 0');
assert(introSrc.includes('[activeData?.topicId]'), 'Reset triggers whenever active topic changes');
assert(pageSrc.includes('key={currentTopic.topicId || activeTopic}'), 'AptitudeLearningPage remounts introduction with key on topic switch');

// 6. DSA Independence Check
console.log('\n--- 6. DSA Independence Check ---');
const dsaPageSrc = fs.readFileSync(
  path.resolve(ROOT, 'client/src/pages/student/DSALearningPage.jsx'),
  'utf8'
);
assert(!dsaPageSrc.includes('aptitude-learning-section'), 'DSA page untouched by Aptitude auto-scroll');
assert(dsaPageSrc.includes('<DSATopicIntroduction'), 'DSA page renders DSATopicIntroduction unchanged');

console.log('\n================================================================');
console.log(`TOTAL SUITE CHECKS: ${passed} PASSED, ${failed} FAILED.`);
console.log('================================================================');

if (failed > 0) process.exit(1);
