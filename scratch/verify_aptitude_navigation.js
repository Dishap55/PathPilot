/**
 * PathPilot — Aptitude Learning Page & Navigation Flow Verification Suite
 * Tests all 18 prompt requirements and acceptance criteria.
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
console.log('APTITUDE LEARNING PAGE & NAVIGATION ACCEPTANCE VERIFICATION');
console.log('================================================================\n');

// 1. App.jsx Route Mounting
console.log('--- 1. App Routes Mounting ---');
const appSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/App.jsx'), 'utf8');
assert(appSrc.includes('import AptitudeLearningPage from'), 'AptitudeLearningPage imported in App.jsx');
assert(appSrc.includes('<Route path="/aptitude" element={<AptitudeLearningPage />} />'), '/aptitude route mounted in App.jsx');
assert(appSrc.includes('<Route path="/subjects/aptitude" element={<AptitudeLearningPage />} />'), '/subjects/aptitude route mounted in App.jsx');

// Ensure both /aptitude and /subjects/aptitude are inside AppLayout
const appLayoutBlock = appSrc.split('<Route element={<AppLayout />}>')[1].split('</Route>')[0];
assert(appLayoutBlock.includes('path="/aptitude"'), '/aptitude is inside authenticated AppLayout block');
assert(appLayoutBlock.includes('path="/subjects/aptitude"'), '/subjects/aptitude is inside authenticated AppLayout block');
assert(appLayoutBlock.includes('path="/subjects/dsa"'), 'DSA route remains mounted in AppLayout');

// 2. Sidebar Navigation Active States
console.log('\n--- 2. Global Sidebar Navigation ---');
const sidebarSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/components/layout/Sidebar.jsx'), 'utf8');
assert(sidebarSrc.includes("p.startsWith('/aptitude')"), 'Sidebar highlights Subjects nav item when on /aptitude');

// 3. Subjects Page Navigation
console.log('\n--- 3. Core Subjects Page Navigation ---');
const subjectsSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/pages/student/Subjects.jsx'), 'utf8');
assert(subjectsSrc.includes("code === 'APT' ? '/aptitude' : '/roadmap'"), 'Subjects.jsx routes APT card to /aptitude instead of /roadmap');
assert(subjectsSrc.includes("code === 'APT'\n                      ? 'Explore Aptitude Studio'"), 'Subjects.jsx provides "Explore Aptitude Studio" CTA for Aptitude');
assert(!subjectsSrc.includes("to={code === 'DSA' ? '/subjects/dsa' : '/roadmap'}"), 'Legacy catch-all redirecting APT to /roadmap removed from Subjects.jsx');

// 4. Practice Page Navigation
console.log('\n--- 4. Practice Page Navigation ---');
const practiceSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/pages/student/Practice.jsx'), 'utf8');
assert(practiceSrc.includes("subject.code === 'APT' || subject.id === 'apt' || subject.id === 'aptitude'"), 'Practice.jsx detects Aptitude subject selection');
assert(practiceSrc.includes("navigate('/aptitude');"), 'Practice.jsx navigates to /aptitude when Aptitude selected');

// 5. Personalized Roadmap Navigation
console.log('\n--- 5. Personalized Roadmap Path Navigation ---');
const roadmapPathSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/components/roadmap/PersonalizedRoadmapPath.jsx'), 'utf8');
assert(roadmapPathSrc.includes("sub === 'APT' || sub === 'APTITUDE' || titleLower.includes('aptitude') || topic.route?.includes('/aptitude')"), 'Roadmap detects Aptitude topic card');
assert(roadmapPathSrc.includes("return tId ? `/aptitude?topic=${tId}` : '/aptitude';"), 'Roadmap navigates Aptitude card to /aptitude');
assert(roadmapPathSrc.includes("icon: Calculator"), 'Roadmap uses Calculator icon for Aptitude card');
assert(roadmapPathSrc.includes("boxBg: 'bg-amber-100/80 border-amber-200/90 text-amber-700'"), 'Roadmap uses amber styling for Aptitude card');

// 6. Roadmap Page Progress & Topic Card
console.log('\n--- 6. Roadmap Page Progress & Topic Card ---');
const roadmapSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/pages/student/Roadmap.jsx'), 'utf8');
assert(roadmapSrc.includes("id: 'aptitude-track'"), 'Roadmap ensures Aptitude topic card is present');
assert(roadmapSrc.includes("title: 'Aptitude'"), 'Aptitude topic card has title Aptitude');
assert(roadmapSrc.includes("subject: 'APT'"), 'Aptitude topic card has subject APT');
assert(roadmapSrc.includes("status: (node.status === 'completed' || node.status === 'done') ? 'completed'"), 'Roadmap preserves backend progress for non-DSA subjects including Aptitude');

// 7. Aptitude Topic Data Registry
console.log('\n--- 7. Aptitude Topic Data Registry ---');
const registry = require('../client/src/data/aptitudeTopicDataRegistry');
assert(Array.isArray(registry.APTITUDE_CATEGORIES) && registry.APTITUDE_CATEGORIES.length === 3, 'APTITUDE_CATEGORIES has exactly 3 categories (Quantitative, Logical, Verbal)');
assert(registry.APTITUDE_CATEGORIES.some(c => c.id === 'quantitative' && c.name === 'Quantitative Aptitude'), 'Quantitative Aptitude category defined');
assert(registry.APTITUDE_CATEGORIES.some(c => c.id === 'logical' && c.name === 'Logical Reasoning'), 'Logical Reasoning category defined');
assert(registry.APTITUDE_CATEGORIES.some(c => c.id === 'verbal' && c.name === 'Verbal Ability'), 'Verbal Ability category defined');

const quantTopics = registry.getTopicsByCategory('quantitative');
const logicTopics = registry.getTopicsByCategory('logical');
const verbalTopics = registry.getTopicsByCategory('verbal');

assert(quantTopics.length === 19, `Quantitative category has exactly 19 topics (found: ${quantTopics.length})`);
assert(logicTopics.length === 14, `Logical category has exactly 14 topics (found: ${logicTopics.length})`);
assert(verbalTopics.length === 10, `Verbal category has exactly 10 topics (found: ${verbalTopics.length})`);

const totalAptitudeTopics = Object.keys(registry.APTITUDE_TOPIC_REGISTRY).length;
assert(totalAptitudeTopics === 43, `Total topics in APTITUDE_TOPIC_REGISTRY equals 43 (found: ${totalAptitudeTopics})`);

// Validate prompt specific topics
const requiredQuantTopics = [
  'Number System', 'HCF & LCM', 'Percentages', 'Profit & Loss', 'Ratio & Proportion',
  'Average', 'Simple Interest', 'Compound Interest', 'Time & Work', 'Pipes & Cisterns',
  'Time, Speed & Distance', 'Boats & Streams', 'Mixtures & Alligations', 'Permutation & Combination',
  'Probability', 'Algebra', 'Geometry', 'Mensuration', 'Data Interpretation'
];
requiredQuantTopics.forEach(tName => {
  const found = quantTopics.some(t => t.topicName.toLowerCase() === tName.toLowerCase() || t.topicName.toLowerCase().includes(tName.toLowerCase().slice(0, 8)));
  assert(found, `Quantitative topic "${tName}" is registered`);
});

const requiredLogicalTopics = [
  'Number Series', 'Letter Series', 'Coding-Decoding', 'Blood Relations', 'Direction Sense',
  'Syllogism', 'Analogy', 'Classification', 'Ranking', 'Seating Arrangement',
  'Puzzles', 'Statement & Conclusion', 'Statement & Assumption', 'Data Sufficiency'
];
requiredLogicalTopics.forEach(tName => {
  const found = logicTopics.some(t => t.topicName.toLowerCase() === tName.toLowerCase() || t.topicName.toLowerCase().includes(tName.toLowerCase().slice(0, 8)));
  assert(found, `Logical topic "${tName}" is registered`);
});

const requiredVerbalTopics = [
  'Grammar', 'Error Detection', 'Sentence Correction', 'Fill in the Blanks', 'Synonyms',
  'Antonyms', 'Vocabulary', 'Sentence Rearrangement', 'Reading Comprehension', 'Para Jumbles'
];
requiredVerbalTopics.forEach(tName => {
  const found = verbalTopics.some(t => t.topicName.toLowerCase() === tName.toLowerCase() || t.topicName.toLowerCase().includes(tName.toLowerCase().slice(0, 8)));
  assert(found, `Verbal topic "${tName}" is registered`);
});

// Test helper getAptitudeTopic
const percentages = registry.getAptitudeTopic('percentages');
assert(percentages && percentages.topicName === 'Percentages', 'getAptitudeTopic resolves percentages topic');
const defaultFallback = registry.getAptitudeTopic('non-existent');
assert(defaultFallback && defaultFallback.topicName === 'Percentages', 'getAptitudeTopic falls back cleanly to percentages');

// 8. AptitudeLearningPage Component Structure & Quality
console.log('\n--- 8. AptitudeLearningPage UI & Structure ---');
const pageSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/pages/student/AptitudeLearningPage.jsx'), 'utf8');

assert(pageSrc.includes('Back to Roadmap'), 'Page has breadcrumb back to roadmap link');
assert(pageSrc.includes('APTITUDE TRACK'), 'Page header contains APTITUDE TRACK');
assert(pageSrc.includes('Aptitude Learning Studio'), 'Page header contains Aptitude Learning Studio');
assert(pageSrc.includes('Build speed, accuracy, calculation skills, and problem-solving confidence for placement aptitude tests.'), 'Page header contains exact requested description');
assert(!pageSrc.includes('Data Structures & Algorithms Learning Studio'), 'Page does not copy DSA specific headline');

assert(pageSrc.includes('handleCategorySelect'), 'Page supports category tab switching');
assert(pageSrc.includes('handleTopicSelect'), 'Page supports topic selection');
assert(pageSrc.includes('useSearchParams'), 'Page syncs active topic with URL search params');
assert(pageSrc.includes('activeTopic'), 'Page manages activeTopic state');
assert(pageSrc.includes('activeCategory'), 'Page manages activeCategory state');

// 9. Existing DSA Unchanged
console.log('\n--- 9. Existing DSA Unchanged ---');
const dsaPageSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/pages/student/DSALearningPage.jsx'), 'utf8');
assert(dsaPageSrc.includes('DSATopicIntroduction'), 'DSALearningPage imports DSATopicIntroduction');
assert(dsaPageSrc.includes('DSAPracticeWorkflow'), 'DSALearningPage imports DSAPracticeWorkflow');
assert(dsaPageSrc.includes('DSA_TOPIC_REGISTRY'), 'DSALearningPage imports DSA_TOPIC_REGISTRY');

console.log('\n================================================================');
console.log(`TOTAL SUITE CHECKS: ${passed} PASSED, ${failed} FAILED.`);
console.log('================================================================');

if (failed > 0) process.exit(1);
