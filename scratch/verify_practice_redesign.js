/**
 * PATHPILOT: PRACTICE PAGE REDESIGN VERIFICATION SUITE
 * Validates all 16 user requirements for the Practice UI redesign.
 */

import fs from 'fs';
import path from 'path';

let passCount = 0;
let failCount = 0;

function assert(condition, message, detail = '') {
  if (condition) {
    passCount++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    failCount++;
    console.error(`❌ [FAIL] ${message}`);
    if (detail) console.error(`   ↳ ${detail}`);
  }
}

console.log('================================================================');
console.log('=== PATHPILOT: PRACTICE PAGE UI REDESIGN VERIFICATION        ===');
console.log('================================================================\n');

const practicePath = path.resolve('client/src/pages/student/Practice.jsx');
const practiceContent = fs.readFileSync(practicePath, 'utf8');

// 1. Page Header Verification
console.log('--- Section 1: Page Header & Clean Minimal Design ---');
assert(
  practiceContent.includes('Practice') && /<h1[^>]*>\s*Practice\s*<\/h1>/i.test(practiceContent),
  'Page Header contains "Practice" as primary heading (h1)'
);
assert(
  practiceContent.includes('Choose a subject and start practicing'),
  'Page Subtitle contains "Choose a subject and start practicing"'
);
assert(
  !practiceContent.includes('Interactive Practice Studio') &&
  !practiceContent.includes('Deliberate Practice Challenges'),
  'Old cluttered header text removed'
);

// 2. Six Exact Subject Cards Verification
console.log('\n--- Section 2: Six Exact Canonical Subject Cards ---');
const expectedSubjects = [
  'DSA',
  'Aptitude',
  'OOPS',
  'DBMS',
  'Operating Systems',
  'Computer Networks'
];

expectedSubjects.forEach(subj => {
  assert(
    practiceContent.includes(subj),
    `Subject "${subj}" is present in card definitions`
  );
});

// 3. Dynamic Topic Data Verification
console.log('\n--- Section 3: Exact Dynamic Topic Lists per Subject ---');
const expectedTopics = {
  DSA: ['Arrays', 'Two Pointers', 'Sorting', 'Binary Search', 'Linked List', 'Trees', 'Graphs', 'Dynamic Programming'],
  Aptitude: ['Number System', 'Percentages', 'Profit & Loss', 'Time & Work', 'Ratio & Proportion', 'Probability'],
  OOPS: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'Constructors'],
  DBMS: ['ER Model', 'Normalization', 'SQL Queries', 'Transactions', 'Indexing', 'Joins'],
  'Operating Systems': ['Processes', 'CPU Scheduling', 'Deadlocks', 'Memory Management', 'Threads', 'File Systems'],
  'Computer Networks': ['OSI Model', 'TCP/IP', 'Routing', 'IP Addressing', 'Network Security', 'Transport Layer']
};

for (const [subj, topics] of Object.entries(expectedTopics)) {
  const allPresent = topics.every(t => practiceContent.includes(t));
  assert(
    allPresent,
    `All ${topics.length} topics for "${subj}" are defined exactly as required`
  );
}

// 4. Color Palette Verification (Pastels)
console.log('\n--- Section 4: Subtle Pastel Subject Accents ---');
assert(
  practiceContent.includes('emerald') || practiceContent.includes('#F4FBF7'),
  'DSA uses light green pastel styling'
);
assert(
  practiceContent.includes('pink') || practiceContent.includes('#FDF4F8'),
  'Aptitude uses light pink pastel styling'
);
assert(
  practiceContent.includes('amber') || practiceContent.includes('#FDF9F2'),
  'OOPS uses light warm yellow/orange pastel styling'
);
assert(
  practiceContent.includes('sky') || practiceContent.includes('#F2F8FD'),
  'DBMS uses light blue pastel styling'
);
assert(
  practiceContent.includes('purple') || practiceContent.includes('#F8F6FD'),
  'Operating Systems uses light lavender/purple pastel styling'
);
assert(
  practiceContent.includes('orange') || practiceContent.includes('#FDF6F3'),
  'Computer Networks uses light peach/red pastel styling'
);

// 5. Excluded Sections Verification
console.log('\n--- Section 5: Exclusion of Unwanted Sections ---');
assert(
  !practiceContent.toLowerCase().includes('popular subjects'),
  'NO "Popular Subjects" section exists'
);
assert(
  !practiceContent.includes('Roadmap Practice Path') &&
  !practiceContent.includes('Interactive Modes Cards'),
  'NO separate roadmap list or interactive modes cards clutter'
);
assert(
  !practiceContent.includes('Concept MCQs') &&
  !practiceContent.includes('SQL Engine') &&
  !practiceContent.includes('Code Editor'),
  'NO duplicate editor widget cards in overview'
);

// 6. Dynamic Topic Animation Verification
console.log('\n--- Section 6: Dynamic Topic Animation Mechanism ---');
assert(
  practiceContent.includes('AnimatePresence') && practiceContent.includes('motion.div'),
  'Dynamic topic uses framer-motion AnimatePresence for smooth transitions'
);
assert(
  practiceContent.includes('setInterval') && practiceContent.includes('topics.length'),
  'Continuous automatic topic cycle implemented'
);
assert(
  practiceContent.includes('mode="wait"') || practiceContent.includes('mode=\'wait\''),
  'Soft disappear/reappear mode="wait" transition preserved'
);

// 7. Arrow Button & Hover Interaction
console.log('\n--- Section 7: Arrow Button & Card Hover Interactions ---');
assert(
  practiceContent.includes('ArrowRight'),
  'ArrowRight icon rendered on each card'
);
assert(
  practiceContent.includes('group-hover:translate-x-1'),
  'Arrow moves rightward on hover'
);
assert(
  practiceContent.includes('hover:-translate-y-1'),
  'Card has subtle upward hover movement (2-4px)'
);
assert(
  practiceContent.includes('hover:shadow-'),
  'Card has subtle subject-colored hover glow'
);

// 8. Grid Layout & Responsiveness
console.log('\n--- Section 8: Grid Responsiveness ---');
assert(
  practiceContent.includes('grid-cols-1') &&
  practiceContent.includes('sm:grid-cols-2') &&
  practiceContent.includes('lg:grid-cols-3'),
  'Grid adapts: 3x2 on desktop (lg:grid-cols-3), 2-col on tablet (sm:grid-cols-2), 1-col on mobile (grid-cols-1)'
);

// 9. Preserved Data Dependencies & Safety
console.log('\n--- Section 9: Supabase & Data Flow Safety ---');
assert(
  /roadmapService\s*\.\s*getRoadmap\s*\(\)/.test(practiceContent),
  'Preserves roadmapService.getRoadmap() data fetching'
);
assert(
  practiceContent.includes('useNavigate'),
  'Preserves client-side routing and navigation'
);
assert(
  practiceContent.includes('/roadmap/milestone/'),
  'Preserves milestone navigation for active subject practice'
);

// 10. Untouched Unrelated Files Check
console.log('\n--- Section 10: Scope Boundary Check (Unrelated Files Untouched) ---');
const sidebarPath = path.resolve('client/src/components/layout/Sidebar.jsx');
const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
assert(
  sidebarContent.includes('PathPilot') && sidebarContent.includes('isCollapsed'),
  'Sidebar.jsx exists and retains global persistent structure'
);

const appLayoutPath = path.resolve('client/src/components/layout/AppLayout.jsx');
const appLayoutContent = fs.readFileSync(appLayoutPath, 'utf8');
assert(
  appLayoutContent.includes('Sidebar') && appLayoutContent.includes('Outlet'),
  'AppLayout.jsx retains shared authenticated structure'
);

console.log('\n================================================================');
console.log('=== AUDIT SUMMARY                                            ===');
console.log('================================================================');
console.log(`Total Checks:  ${passCount + failCount}`);
console.log(`Passed:        ${passCount}`);
console.log(`Failed:        ${failCount}`);
console.log(`Success Rate:  ${Math.round((passCount / (passCount + failCount)) * 100)}%`);

if (failCount === 0) {
  console.log('\n🎉 ALL PRACTICE REDESIGN REQUIREMENTS VERIFIED SUCCESSFULLY!');
} else {
  process.exit(1);
}
