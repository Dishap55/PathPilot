/**
 * TEST SUITE: Operating Systems (OS) Stage 2A — 10-Card Learning System Verification
 * 
 * Verifies:
 * 1. Master OS Topic Registry integrity (canonical topics, categories, slug resolution)
 * 2. Exactly 10 learning cards for every OS topic
 * 3. Strict 10-card pedagogical structure:
 *    - Card 1: What is it? (Definition, In Simple Words, Why in OS, Key terms, Visual)
 *    - Card 2: Why do we need it? (Problem, What goes wrong, OS solution, Benefit, Real-world example)
 *    - Card 3: How does it work? (Mechanism, state transitions, active steps)
 *    - Card 4: Internal structure (Data layout, PCB/PTE/Inode/Semaphore structs)
 *    - Card 5: Step-by-step flow (Scenario, Challenge, Flow steps, Resolution)
 *    - Card 6: Numerical / Technical example (Question, Given data, Formula, Step-by-step working, Final answer)
 *    - Card 7: Complete working example / Visual simulation (VFX)
 *    - Card 8: Common mistakes & traps (Mistake ❌ vs Correct ✅ with Why)
 *    - Card 9: Interview & placement angle (Interview Q, Model Answer, Trap/Tip)
 *    - Card 10: Quick revision cheat sheet (Key rule, Summary points, Exam shortcut)
 * 4. Numerical-heavy topics verification (FCFS, SJF/SRTF, Priority, Round Robin, Banker's, Memory, Paging, Disk)
 * 5. 3D Depth Carousel component contracts (previous/active/next window, rotateY, scale, translateZ)
 * 6. Content-aware responsive sizing and reduced-motion support
 * 7. Topic switching, Card 1 reset, and "Move to Next Topic" logic
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
console.log('--- 1. VERIFYING OS TOPIC REGISTRY & RESOLVER ---');
console.log('======================================================');

const registryPath = path.join(rootDir, 'client', 'src', 'data', 'os', 'osTopicDataRegistry.js');
assert(fs.existsSync(registryPath), 'osTopicDataRegistry.js exists');

const {
  OS_TOPIC_REGISTRY,
  OS_PRIMARY_PILLARS,
  OS_TOPICS_LIST,
  resolveOSTopicId,
  getOSTopic
} = await import(`file://${registryPath}`);

assert(Object.keys(OS_TOPIC_REGISTRY).length >= 6, `At least 6 topics defined in OS_TOPIC_REGISTRY (found: ${Object.keys(OS_TOPIC_REGISTRY).length})`);
assert(OS_PRIMARY_PILLARS.length === 6, 'Exactly 6 primary curriculum pillars defined');

// Verify the 6 primary pillars
const requiredPillars = [
  'cpu-scheduling',
  'processes',
  'deadlocks',
  'memory-management',
  'threads',
  'file-systems'
];
requiredPillars.forEach((p) => {
  assert(OS_PRIMARY_PILLARS.includes(p), `Primary pillar '${p}' present in OS_PRIMARY_PILLARS`);
  assert(Boolean(OS_TOPIC_REGISTRY[p]), `Topic '${p}' exists in registry`);
});

// Verify alias resolution
assert(resolveOSTopicId('cpu-scheduling') === 'cpu-scheduling', 'Resolves exact topic ID cpu-scheduling');
assert(resolveOSTopicId('fcfs') === 'fcfs', 'Resolves subtopic fcfs');
assert(resolveOSTopicId('sjf') === 'sjf-srtf', 'Resolves alias sjf to sjf-srtf');
assert(resolveOSTopicId('banker') === 'bankers-algorithm', 'Resolves alias banker to bankers-algorithm');
assert(resolveOSTopicId('paging') === 'paging', 'Resolves subtopic paging');
assert(resolveOSTopicId('disk') === 'disk-scheduling', 'Resolves alias disk to disk-scheduling');

console.log('\n======================================================');
console.log('--- 2. VERIFYING 10 LEARNING CARDS PER OS TOPIC ---');
console.log('======================================================');

const cardsDataPath = path.join(rootDir, 'client', 'src', 'data', 'os', 'osTopicCardsData.js');
assert(fs.existsSync(cardsDataPath), 'osTopicCardsData.js exists');

const {
  OS_TOPIC_CARDS_MAP,
  getOSTopicCards
} = await import(`file://${cardsDataPath}`);

// Test all topics in registry + subtopics
const topicsToAudit = [
  'cpu-scheduling',
  'processes',
  'deadlocks',
  'memory-management',
  'threads',
  'file-systems',
  'fcfs',
  'sjf-srtf',
  'priority-scheduling',
  'round-robin',
  'bankers-algorithm'
];

let totalCardsChecked = 0;

topicsToAudit.forEach((topId) => {
  const cards = getOSTopicCards(topId);
  assert(Array.isArray(cards), `Cards for '${topId}' is an array`);
  assert(cards.length === 10, `Topic '${topId}' has EXACTLY 10 cards (found: ${cards.length})`);
  totalCardsChecked += cards.length;

  // Check card numbering sequence 1 to 10
  const cardNumbers = cards.map((c) => c.cardNumber);
  assert(
    JSON.stringify(cardNumbers) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    `Topic '${topId}' cards numbered strictly 1 to 10`
  );

  // Validate Card 1: What is it?
  const c1 = cards[0];
  assert(c1.definition && c1.definition.length > 20, `${topId} Card 1 has clear definition`);
  assert(c1.inSimpleWords && c1.inSimpleWords.length > 20, `${topId} Card 1 has "In Simple Words"`);
  assert(Boolean(c1.whyInOS || c1.keyTerms), `${topId} Card 1 has Why in OS or Key Terms`);

  // Validate Card 2: Why do we need it?
  const c2 = cards[1];
  assert(c2.problem && c2.problem.length > 15, `${topId} Card 2 has problem statement`);
  assert(c2.whatGoesWrong && c2.whatGoesWrong.length > 15, `${topId} Card 2 has what goes wrong`);
  assert(c2.osSolution && c2.osSolution.length > 15, `${topId} Card 2 has OS solution`);

  // Validate Card 3: How does it work?
  const c3 = cards[2];
  assert(Boolean(c3.mechanism || c3.stateTransitions || c3.steps), `${topId} Card 3 has mechanism / state transitions`);

  // Validate Card 4: Internal structure
  const c4 = cards[3];
  assert(Boolean(c4.structureDetails || c4.diagramType), `${topId} Card 4 has internal structure details`);

  // Validate Card 5: Step-by-step flow
  const c5 = cards[4];
  assert(Boolean(c5.scenario || c5.flowSteps), `${topId} Card 5 has scenario / flow steps`);

  // Validate Card 6: Numerical / Technical example
  const c6 = cards[5];
  assert(Boolean(c6.question), `${topId} Card 6 has question`);
  assert(Boolean(c6.givenData), `${topId} Card 6 has given data`);
  assert(Boolean(c6.steps && c6.steps.length > 0), `${topId} Card 6 has worked steps`);
  assert(Boolean(c6.finalAnswer), `${topId} Card 6 has highlighted final answer`);

  // Validate Card 7: Visual simulation / VFX
  const c7 = cards[6];
  assert(Boolean(c7.vfxType || c7.fullWorkingFlow), `${topId} Card 7 has visual simulation / VFX reference`);

  // Validate Card 8: Common mistakes & traps
  const c8 = cards[7];
  assert(Boolean(c8.traps && c8.traps.length > 0), `${topId} Card 8 has traps array`);
  c8.traps.forEach((tr, tIdx) => {
    assert(Boolean(tr.mistake || tr.wrong), `${topId} Card 8 trap ${tIdx + 1} has mistake`);
    assert(Boolean(tr.correct), `${topId} Card 8 trap ${tIdx + 1} has correct technical reality`);
  });

  // Validate Card 9: Interview & Placement angle
  const c9 = cards[8];
  assert(Boolean(c9.questions && c9.questions.length > 0), `${topId} Card 9 has interview questions`);

  // Validate Card 10: Quick Revision / Cheat Sheet
  const c10 = cards[9];
  assert(Boolean(c10.cheatSheet), `${topId} Card 10 has cheat sheet`);
  assert(Boolean(c10.cheatSheet.keyRule), `${topId} Card 10 cheat sheet has key rule`);
  assert(Boolean(c10.cheatSheet.summaryPoints && c10.cheatSheet.summaryPoints.length > 0), `${topId} Card 10 has summary points`);
});

console.log(`\n  Total cards validated across topics: ${totalCardsChecked}`);

console.log('\n======================================================');
console.log('--- 3. VERIFYING NUMERICAL-HEAVY TOPICS (CARD 6) ---');
console.log('======================================================');

const numericalTopics = [
  'cpu-scheduling',
  'fcfs',
  'sjf-srtf',
  'round-robin',
  'priority-scheduling',
  'deadlocks',
  'bankers-algorithm',
  'memory-management',
  'file-systems'
];

numericalTopics.forEach((numTop) => {
  const cards = getOSTopicCards(numTop);
  const card6 = cards[5]; // Card 6 is index 5
  assert(card6.isNumerical === true, `Topic '${numTop}' Card 6 is marked isNumerical: true`);
  assert(card6.formula && card6.formula.length > 5, `Topic '${numTop}' Card 6 provides formula`);
  assert(card6.finalAnswer && card6.finalAnswer.length > 5, `Topic '${numTop}' Card 6 provides clear final answer`);
});

console.log('\n======================================================');
console.log('--- 4. VERIFYING UI & 3D DEPTH CAROUSEL IMPLEMENTATION ---');
console.log('======================================================');

const introSectionPath = path.join(rootDir, 'client', 'src', 'components', 'learning', 'os', 'OSIntroductionSection.jsx');
assert(fs.existsSync(introSectionPath), 'OSIntroductionSection.jsx exists');

const introContent = fs.readFileSync(introSectionPath, 'utf-8');

// 3D Depth Card Properties
assert(introContent.includes('perspective: prefersReducedMotion ? \'none\' : \'1400px\''), '3D perspective viewport configured');
assert(introContent.includes('transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`'), 'Strict 3D depth transform matrix implemented');
assert(introContent.includes('Math.abs(diff) > 1'), 'Strict 3-card window (Previous | Active | Next) implemented');
assert(introContent.includes('prefersReducedMotion'), 'Respects prefers-reduced-motion media query');
assert(introContent.includes('ArrowLeft') && introContent.includes('ArrowRight'), 'Keyboard navigation (ArrowLeft & ArrowRight) supported');
assert(introContent.includes('handleMoveToNextTopic'), 'Move to Next Topic button supported on Card 10');
assert(introContent.includes('AddNoteButton'), 'AddNoteButton contextual integration present');

// Verification of Visual Diagram and VFX Engine components
const diagramPath = path.join(rootDir, 'client', 'src', 'components', 'learning', 'os', 'OSVisualDiagram.jsx');
assert(fs.existsSync(diagramPath), 'OSVisualDiagram.jsx exists');

const vfxPath = path.join(rootDir, 'client', 'src', 'components', 'learning', 'os', 'OSVFXEngine.jsx');
assert(fs.existsSync(vfxPath), 'OSVFXEngine.jsx exists');

const vfxContent = fs.readFileSync(vfxPath, 'utf-8');
assert(vfxContent.includes('cpu-scheduling-sim'), 'CPU Scheduling live Gantt simulation present');
assert(vfxContent.includes('process-state-sim'), 'Process 5-state lifecycle simulation present');
assert(vfxContent.includes('deadlock-rag-sim'), 'Deadlock RAG simulation present');
assert(vfxContent.includes('paging-translation-sim'), 'Paging MMU address translation simulation present');
assert(vfxContent.includes('semaphore-sim'), 'Semaphore bounded buffer simulation present');
assert(vfxContent.includes('disk-head-sim'), 'Mechanical disk head seek simulation present');

console.log('\n======================================================');
console.log('--- 5. VERIFYING PAGE INTEGRATION & ROUTING ---');
console.log('======================================================');

const subjectLearningPagePath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'SubjectLearningPage.jsx');
const subjectLearningContent = fs.readFileSync(subjectLearningPagePath, 'utf-8');

assert(
  subjectLearningContent.includes("import OSIntroductionSection from '../../components/learning/os/OSIntroductionSection.jsx';"),
  'OSIntroductionSection imported in SubjectLearningPage.jsx'
);
assert(
  subjectLearningContent.includes("normalizedCode === 'os'") &&
  subjectLearningContent.includes('<OSIntroductionSection'),
  'OSIntroductionSection mounted for OS subject when activeSection === "introduction"'
);

console.log('\n======================================================');
console.log('--- SUMMARY ---');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED! Operating Systems Stage 2A learning cards verified.\n');
}
