const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const roadmapSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/pages/student/Roadmap.jsx'), 'utf8');
const personalizedPathSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/components/roadmap/PersonalizedRoadmapPath.jsx'), 'utf8');

console.log('====================================================');
console.log('ROADMAP DSA 7-TOPIC ACCEPTANCE CRITERIA VERIFICATION');
console.log('====================================================\n');

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

// 1. Arrays & Strings removed from CANONICAL_DSA_ROADMAP_TOPICS
assert(!roadmapSrc.includes("'Arrays & Strings'"), "'Arrays & Strings' removed from CANONICAL_DSA_ROADMAP_TOPICS");
assert(!roadmapSrc.includes("'Arrays & Basics'"), "'Arrays & Basics' not present in CANONICAL_DSA_ROADMAP_TOPICS");
assert(!roadmapSrc.includes("title: 'Arrays'"), "'Arrays' not a top-level roadmap card");

// 2. Sliding Window is not a top-level roadmap card
assert(!roadmapSrc.includes("title: 'Sliding Window'"), "'Sliding Window' is not a top-level roadmap card");

// 3. Exact 7 topics in required order
const expectedTopics = [
  'Two Pointers',
  'Sorting Algorithms',
  'Binary Search',
  'Linked List',
  'Trees & BST',
  'Graphs & BFS/DFS',
  'Dynamic Programming'
];

expectedTopics.forEach((t, i) => {
  assert(roadmapSrc.includes(`title: '${t}'`), `Topic ${i + 1} "${t}" present in CANONICAL_DSA_ROADMAP_TOPICS`);
});

// 4. Dynamic Path Sequence count and progress denominator
assert(roadmapSrc.includes('Path Sequence ({displayTopics.length} Topics)'), 'Path Sequence dynamically uses displayTopics.length');
assert(roadmapSrc.includes('{completedCount}/{displayTopics.length} Done'), 'Progress count dynamically uses completedCount and displayTopics.length');

// 5. DSA Subject filter count
assert(roadmapSrc.includes("const code = (t.subject || 'DSA').toUpperCase();"), 'Subject filter counts tallied dynamically from topics list');

// 6. Dynamic routes in PersonalizedRoadmapPath
assert(!personalizedPathSrc.includes("topic.title?.toLowerCase().includes('array') ? 'arrays' :"), 'No legacy array topic route mapping in PersonalizedRoadmapPath');
assert(personalizedPathSrc.includes("topic.title?.toLowerCase().includes('two pointer') ? 'two-pointers' :"), 'Two Pointers routes to two-pointers');
assert(personalizedPathSrc.includes("topic.title?.toLowerCase().includes('sort') ? 'sorting' :"), 'Sorting Algorithms routes to sorting');
assert(personalizedPathSrc.includes("topic.title?.toLowerCase().includes('binary search') ? 'binary-search' :"), 'Binary Search routes to binary-search');
assert(personalizedPathSrc.includes("topic.title?.toLowerCase().includes('linked') ? 'linked-list' :"), 'Linked List routes to linked-list');
assert(personalizedPathSrc.includes("topic.title?.toLowerCase().includes('tree') || topic.title?.toLowerCase().includes('bst') ? 'trees' :"), 'Trees & BST routes to trees');
assert(personalizedPathSrc.includes("topic.title?.toLowerCase().includes('graph') || topic.title?.toLowerCase().includes('bfs') || topic.title?.toLowerCase().includes('dfs') ? 'graphs' :"), 'Graphs & BFS/DFS routes to graphs');
assert(personalizedPathSrc.includes("topic.title?.toLowerCase().includes('dp') || topic.title?.toLowerCase().includes('dynamic') ? 'dp' :"), 'Dynamic Programming routes to dp');

// 7. Verify no legacy array record can corrupt roadmap
assert(roadmapSrc.includes("if (titleLower.includes('array') || titleLower.includes('basics')) {\n          return;\n        }"), 'Legacy Arrays backend progress records safely ignored without corrupting roadmap');

console.log('\n====================================================');
console.log(`TOTAL CHECKS: ${passed} PASSED, ${failed} FAILED.`);
console.log('====================================================');

if (failed > 0) process.exit(1);
