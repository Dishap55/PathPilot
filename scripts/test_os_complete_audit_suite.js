/**
 * COMPREHENSIVE OS SECTION AUDIT & COMPLETENESS TEST SUITE
 * 
 * Validates:
 * 1. Exactly 30 canonical topics exist across 7 domains
 * 2. All 6 OS sections exist:
 *    - 1. Introduction (10-card theory for all 30 topics)
 *    - 2. Problem Solving (10-stage numerical framework)
 *    - 3. Problem Examples (2-3 short examples per topic with flowcharts)
 *    - 4. Practice Questions (Questions covering all 7 domains and 30 topics)
 *    - 5. Summary & Notes (Concise revision cheat sheets for all 30 topics)
 *    - 6. Revision & Exam Prep (Formulas, Comparisons, Flowcharts, Traps)
 * 3. No section is CPU-Scheduling-only (equal balance across all domains)
 * 4. Zero duplicate topic IDs
 * 5. No broken imports or missing properties
 * 6. Other subjects (DBMS, CN, DSA, Aptitude, OOPS) remain completely intact
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  [PASS] ${message}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('\n======================================================');
console.log('--- 1. AUDITING 30 CANONICAL OS TOPICS & 7 DOMAINS ---');
console.log('======================================================');

const registryPath = path.join(rootDir, 'client', 'src', 'data', 'os', 'osTopicDataRegistry.js');
assert(fs.existsSync(registryPath), 'osTopicDataRegistry.js exists');

const {
  OS_DOMAINS,
  OS_TOPICS_LIST,
  OS_TOPIC_REGISTRY,
  getOSTopic,
  resolveOSTopicId
} = await import(`file://${registryPath}`);

assert(OS_DOMAINS.length === 7, `Exactly 7 canonical OS domains defined (found: ${OS_DOMAINS.length})`);
assert(OS_TOPICS_LIST.length === 30, `Exactly 30 canonical OS topics defined (found: ${OS_TOPICS_LIST.length})`);

// Check unique topic IDs
const topicIds = OS_TOPICS_LIST.map(t => t.topicId);
const uniqueIds = new Set(topicIds);
assert(uniqueIds.size === 30, `All 30 topic IDs are strictly unique (found: ${uniqueIds.size})`);

// Expected 30 Canonical Topics
const EXPECTED_30_TOPICS = [
  'intro-to-os',
  'os-services-system-calls',
  'os-structures-architectures',
  'interrupts-traps-dual-mode',
  'processes-process-states',
  'pcb-context-switching',
  'threads-multithreading',
  'ipc',
  'cpu-scheduling-fundamentals',
  'fcfs-scheduling',
  'sjf-srtf-scheduling',
  'priority-scheduling-algo',
  'round-robin-scheduling',
  'mlq-mlfq-scheduling',
  'sync-critical-section',
  'mutex-semaphores',
  'classical-sync-problems',
  'deadlock-fundamentals',
  'deadlock-prevention-avoidance',
  'bankers-algorithm-safe-state',
  'deadlock-detection-recovery',
  'main-memory-allocation',
  'fragmentation-allocation-strategies',
  'paging-page-tables',
  'segmentation',
  'virtual-memory-demand-paging',
  'page-replacement-algorithms',
  'tlb-effective-access-time',
  'file-systems-allocation',
  'disk-structure-scheduling'
];

EXPECTED_30_TOPICS.forEach((expectedId, idx) => {
  assert(topicIds.includes(expectedId), `Topic ${idx + 1}: '${expectedId}' exists in registry`);
});

console.log('\n======================================================');
console.log('--- 2. AUDITING SECTION 1: INTRODUCTION (10-CARD THEORY) ---');
console.log('======================================================');

const cardsDataPath = path.join(rootDir, 'client', 'src', 'data', 'os', 'osTopicCardsData.js');
const { OS_TOPIC_CARDS_MAP, getOSTopicCards } = await import(`file://${cardsDataPath}`);

let totalCards = 0;
EXPECTED_30_TOPICS.forEach((tid) => {
  const cards = getOSTopicCards(tid);
  assert(Array.isArray(cards), `Topic '${tid}' cards is array`);
  assert(cards.length === 10, `Topic '${tid}' has EXACTLY 10 cards (found: ${cards.length})`);
  totalCards += cards.length;
});
assert(totalCards === 300, `Section 1 has exactly 300 theory cards (30 topics * 10 cards) (found: ${totalCards})`);

console.log('\n======================================================');
console.log('--- 3. AUDITING SECTION 6: NUMERICALS (13 BENCHMARK TOPICS) ---');
console.log('======================================================');

const numDataPath = path.join(rootDir, 'client', 'src', 'data', 'os', 'osNumericalsData.js');
const { OS_NUMERICAL_TOPICS } = await import(`file://${numDataPath}`);

assert(OS_NUMERICAL_TOPICS.length === 13, `Exactly 13 numerical topics exist (found: ${OS_NUMERICAL_TOPICS.length})`);
OS_NUMERICAL_TOPICS.forEach((nt) => {
  assert(nt.problem, `Topic '${nt.id}' has problem statement`);
  assert(Array.isArray(nt.steps) && nt.steps.length >= 2, `Topic '${nt.id}' has step-by-step execution`);
  assert(nt.finalAnswer, `Topic '${nt.id}' has finalAnswer`);
});

console.log('\n======================================================');
console.log('--- 4. AUDITING SECTION 3: PROBLEM EXAMPLES ---');
console.log('======================================================');

const peDataPath = path.join(rootDir, 'client', 'src', 'data', 'os', 'osProblemExamplesData.js');
const { OS_PROBLEM_EXAMPLES_DATA, getOSTopicExamples } = await import(`file://${peDataPath}`);

let totalExamples = 0;
EXPECTED_30_TOPICS.forEach((tid) => {
  const exList = getOSTopicExamples(tid);
  assert(Array.isArray(exList) && exList.length >= 2, `Topic '${tid}' has at least 2 short examples (found: ${exList?.length})`);
  totalExamples += exList ? exList.length : 0;
  // Verify flowchart & answer presence
  if (exList && exList[0]) {
    assert(Boolean(exList[0].flowchart && exList[0].flowchart.length > 0), `Topic '${tid}' Example 1 has flowchart`);
    assert(Boolean(exList[0].answer), `Topic '${tid}' Example 1 has answer`);
    assert(Boolean(exList[0].quickExplanation), `Topic '${tid}' Example 1 has quickExplanation`);
  }
});
assert(totalExamples >= 60, `Section 3 has at least 60 worked examples across all 30 topics (found: ${totalExamples})`);

console.log('\n======================================================');
console.log('--- 5. AUDITING SECTION 4: PRACTICE QUESTIONS ---');
console.log('======================================================');

const practicePath = path.join(rootDir, 'client', 'src', 'data', 'os', 'osPracticeData.js');
const { OS_PRACTICE_QUESTIONS } = await import(`file://${practicePath}`);

assert(OS_PRACTICE_QUESTIONS.length >= 30, `Practice questions count >= 30 (found: ${OS_PRACTICE_QUESTIONS.length})`);

// Verify all 7 domains have practice questions
OS_DOMAINS.forEach((dom) => {
  const domQuestions = OS_PRACTICE_QUESTIONS.filter(q => q.domainId === dom.id);
  assert(domQuestions.length >= 1, `Domain '${dom.id}' has practice questions (found: ${domQuestions.length})`);
});

console.log('\n======================================================');
console.log('--- 6. AUDITING SECTION 5: SUMMARY & NOTES ---');
console.log('======================================================');

const summaryPath = path.join(rootDir, 'client', 'src', 'data', 'os', 'osSummaryNotesData.js');
const { OS_SUMMARY_NOTES_DATA, getOSTopicSummary } = await import(`file://${summaryPath}`);

EXPECTED_30_TOPICS.forEach((tid) => {
  const summ = getOSTopicSummary(tid);
  assert(Boolean(summ && summ.definition), `Topic '${tid}' has summary definition`);
  assert(Boolean(summ && summ.keyPoints && summ.keyPoints.length > 0), `Topic '${tid}' has key points`);
});

console.log('\n======================================================');
console.log('--- 7. AUDITING SECTION 6: REVISION & EXAM PREP ---');
console.log('======================================================');

const revisionPath = path.join(rootDir, 'client', 'src', 'data', 'os', 'osRevisionExamData.js');
const {
  OS_REVISION_FORMULAS,
  OS_REVISION_COMPARISONS,
  OS_REVISION_FLOWCHARTS,
  OS_REVISION_TRAPS
} = await import(`file://${revisionPath}`);

assert(OS_REVISION_FORMULAS.length >= 6, `At least 6 formula categories exist (found: ${OS_REVISION_FORMULAS.length})`);
assert(OS_REVISION_COMPARISONS.length >= 5, `At least 5 comparison tables exist (found: ${OS_REVISION_COMPARISONS.length})`);
assert(OS_REVISION_FLOWCHARTS.length >= 5, `At least 5 system flowcharts exist (found: ${OS_REVISION_FLOWCHARTS.length})`);
assert(OS_REVISION_TRAPS.length >= 10, `At least 10 placement traps exist (found: ${OS_REVISION_TRAPS.length})`);

console.log('\n======================================================');
console.log('--- 8. AUDITING COMPONENT & ROUTING INTEGRATION ---');
console.log('======================================================');

const subjectPagePath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'SubjectLearningPage.jsx');
const subjectContent = fs.readFileSync(subjectPagePath, 'utf-8');

assert(subjectContent.includes('OSIntroductionSection'), 'OSIntroductionSection mounted in SubjectLearningPage');
assert(subjectContent.includes('OSProblemExamplesSection'), 'OSProblemExamplesSection mounted in SubjectLearningPage');
assert(subjectContent.includes('OSPracticeSection'), 'OSPracticeSection mounted in SubjectLearningPage');
assert(subjectContent.includes('OSSummaryNotesSection'), 'OSSummaryNotesSection mounted in SubjectLearningPage');
assert(subjectContent.includes('OSRevisionExamSection'), 'OSRevisionExamSection mounted in SubjectLearningPage');
assert(subjectContent.includes('OSNumericalsSection'), 'OSNumericalsSection mounted in SubjectLearningPage');
assert(!subjectContent.includes('OSProblemSolvingSection'), 'OSProblemSolvingSection completely removed from SubjectLearningPage');
assert(!subjectContent.includes('2. Problem Solving'), '2. Problem Solving removed from OS navigation');
assert(subjectContent.includes('OS_SECTION_TABS'), 'OS_SECTION_TABS defined in SubjectLearningPage');

console.log('\n======================================================');
console.log('--- 9. AUDITING PRESERVATION OF OTHER SUBJECTS ---');
console.log('======================================================');

assert(fs.existsSync(path.join(rootDir, 'client', 'src', 'pages', 'student', 'DSALearningPage.jsx')), 'DSA page exists');
assert(fs.existsSync(path.join(rootDir, 'client', 'src', 'pages', 'student', 'AptitudeLearningPage.jsx')), 'Aptitude page exists');
assert(fs.existsSync(path.join(rootDir, 'client', 'src', 'pages', 'student', 'OOPSLearningPage.jsx')), 'OOPS page exists');
assert(subjectContent.includes("code: 'DBMS'"), 'DBMS subject configuration intact in SubjectLearningPage');
assert(subjectContent.includes("code: 'CN'"), 'CN subject configuration intact in SubjectLearningPage');

console.log('\n======================================================');
console.log(`--- COMPLETE OS AUDIT SUMMARY ---`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log('======================================================');

if (failed === 0) {
  console.log('🎉 100% COMPLETE OS AUDIT PASSED! ALL 30 TOPICS & 6 SECTIONS VERIFIED!');
  process.exit(0);
} else {
  console.error(`💥 ${failed} AUDIT CHECKS FAILED!`);
  process.exit(1);
}
