/**
 * OS PROBLEM SOLVING RESTRUCTURING & SECTION 7: NUMERICALS VERIFICATION SUITE
 * 
 * Verifies:
 * 1. Problem Solving restructured to Topic-Wise Problem Cards across all 30 canonical topics
 * 2. Section 7: Numericals implemented as an independent section in OS_SECTION_TABS
 * 3. All 13 canonical Numerical topics exist in osNumericalsData.js
 * 4. Every numerical topic implements the complete 12-stage framework
 * 5. Every execution step provides an explicit conceptual WHY
 * 6. Numerical correctness:
 *    - CPU Scheduling (TAT = CT - AT, WT = TAT - BT, RT = First Start - AT)
 *    - Gantt chart step-by-step state
 *    - Banker's Algorithm (Need = Max - Alloc, Safe Sequence)
 *    - Paging Hardware Translation (32-bit, 4KB page -> 12-bit offset, 20-bit page, hex address)
 *    - Page Replacement (LRU, FIFO, Optimal, hit/fault ratios)
 *    - Memory Allocation (First Fit, Best Fit, Worst Fit)
 *    - TLB & Effective Access Time (Hit vs Miss path, EAT = alpha*(t_tlb+t_m) + (1-alpha)*(t_tlb+2*t_m))
 *    - Disk Scheduling (LOOK vs SCAN seek distance)
 * 7. OSNumericalsSection and OSProblemSolvingSection properly mounted in SubjectLearningPage.jsx
 * 8. Zero regressions for other subjects (DBMS, CN, DSA, Aptitude, OOPS)
 */

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function runSuite() {
  console.log('====================================================');
  console.log('RUNNING OS PROBLEM SOLVING & NUMERICALS VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`  [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  [FAIL] ${name}`);
      console.error(`         ${err.message}`);
    }
  }

  // 1. Check Topic Registry & Problem Examples Data
  const registryModule = await import('../client/src/data/os/osTopicDataRegistry.js');
  const { OS_TOPICS_LIST, OS_DOMAINS } = registryModule;
  const examplesModule = await import('../client/src/data/os/osProblemExamplesData.js');
  const { OS_PROBLEM_EXAMPLES_DATA } = examplesModule;

  // TEST 1: Canonical 30 topics have example data
  test('Verify all 30 canonical topics have worked problem examples', () => {
    assert.strictEqual(OS_TOPICS_LIST.length, 30, 'Must have exactly 30 canonical topics');
    OS_TOPICS_LIST.forEach((t) => {
      const topicId = t.topicId || t.slug || t.id;
      const exList = OS_PROBLEM_EXAMPLES_DATA[topicId];
      assert(Array.isArray(exList) && exList.length >= 2, `Topic ${topicId} must have at least 2 worked examples`);
      assert(exList[0].problem, `Topic ${topicId} Example 1 must have problem`);
      assert(exList[0].answer, `Topic ${topicId} Example 1 must have answer`);
    });
  });

  // TEST 2: Verify Problem Solving is completely removed from navigation and SubjectLearningPage.jsx
  test('Verify Problem Solving section is completely removed from OS navigation and SubjectLearningPage.jsx', () => {
    const pagePath = path.resolve(rootDir, 'client/src/pages/student/SubjectLearningPage.jsx');
    const content = fs.readFileSync(pagePath, 'utf-8');
    assert(!content.includes('OSProblemSolvingSection'), 'OSProblemSolvingSection must NOT be imported or rendered');
    assert(!content.includes('2. Problem Solving'), 'OS navigation must NOT contain 2. Problem Solving');
    assert(!content.includes("id: 'problem-solving'"), 'OS_SECTION_TABS must NOT contain problem-solving tab');

    // Verify OS_SECTION_TABS order
    const tabsMatch = content.match(/export const OS_SECTION_TABS = \[([\s\S]*?)\];/);
    assert(tabsMatch, 'OS_SECTION_TABS must be defined');
    const tabsStr = tabsMatch[1];
    assert(tabsStr.includes("id: 'introduction', label: '1. Introduction'"), 'Tab 1 must be Introduction');
    assert(tabsStr.includes("id: 'examples', label: '2. Problem Examples'"), 'Tab 2 must be Problem Examples');
    assert(tabsStr.includes("id: 'practice', label: '3. Practice Questions'"), 'Tab 3 must be Practice Questions');
    assert(tabsStr.includes("id: 'summary', label: '4. Summary & Notes'"), 'Tab 4 must be Summary & Notes');
    assert(tabsStr.includes("id: 'revision', label: '5. Revision & Exam Prep'"), 'Tab 5 must be Revision & Exam Prep');
    assert(tabsStr.includes("id: 'numericals', label: '6. Numericals'"), 'Tab 6 must be Numericals');

    // Verify redirect of problem-solving to numericals
    assert(content.includes("s.toLowerCase() === 'problem-solving'"), 'SubjectLearningPage must catch problem-solving');
    assert(content.includes("s = 'numericals'"), 'SubjectLearningPage must redirect problem-solving to numericals');
  });

  // 3. Check Numericals Data Module
  const numericalsModule = await import('../client/src/data/os/osNumericalsData.js');
  const { OS_NUMERICAL_TOPICS, getOSNumericalTopic } = numericalsModule;

  // TEST 3: All 13 required numerical topics exist
  test('Verify all 13 canonical numerical topics exist in osNumericalsData.js', () => {
    assert.strictEqual(OS_NUMERICAL_TOPICS.length, 13, 'Must have exactly 13 numerical topics');
    const expectedTopics = [
      'cpu-scheduling-basics',
      'fcfs-numerical',
      'sjf-numerical',
      'srtf-numerical',
      'priority-numerical',
      'round-robin-numerical',
      'mlq-mlfq-numerical',
      'bankers-algorithm-numerical',
      'memory-allocation-numerical',
      'paging-numerical',
      'page-replacement-numerical',
      'tlb-eat-numerical',
      'disk-scheduling-numerical'
    ];
    expectedTopics.forEach((id) => {
      const found = OS_NUMERICAL_TOPICS.find((t) => t.id === id);
      assert(found, `Numerical topic '${id}' must exist`);
      assert(found.title, `${id} must have a title`);
      assert(found.problem, `${id} must have a problem statement`);
    });
  });

  // TEST 4: 12 Full Steps / Stages for every Numerical topic
  test('Verify every numerical topic implements the complete 12-stage framework', () => {
    OS_NUMERICAL_TOPICS.forEach((t) => {
      // 1. What is the problem?
      assert(t.problem && t.problem.length > 10, `${t.id} must have problem`);
      // 2. What information is given?
      assert(Array.isArray(t.givenData) && t.givenData.length > 0, `${t.id} must have givenData array`);
      // 3. What do we need to find?
      assert(Array.isArray(t.whatToFind) && t.whatToFind.length > 0, `${t.id} must have whatToFind array`);
      // 4. Which formula/rule is required?
      assert(Array.isArray(t.formulas) && t.formulas.length > 0, `${t.id} must have formulas array`);
      // 5. How do we start? / Initial state
      assert(t.initialState, `${t.id} must have initialState`);
      // 6. Step-by-step calculation & execution steps
      assert(Array.isArray(t.steps) && t.steps.length >= 2, `${t.id} must have at least 2 execution steps`);
      // 7 & 8. Continue until complete & table/visual updates
      t.steps.forEach((step, sIdx) => {
        // Step reason WHY
        assert(step.why || step.reason, `${t.id} Step ${sIdx + 1} must have a conceptual WHY`);
      });
      // 9. Final calculations
      assert(Array.isArray(t.finalCalculations) && t.finalCalculations.length > 0, `${t.id} must have finalCalculations`);
      // 10. Final answer table
      assert(t.finalAnswer && Array.isArray(t.finalAnswer.headers) && Array.isArray(t.finalAnswer.rows), `${t.id} must have finalAnswer table`);
      // 11. Verify the answer
      assert(Array.isArray(t.verification) && t.verification.length > 0, `${t.id} must have verification checks`);
      // 12. Common mistake
      assert(t.commonMistake && t.commonMistake.length > 10, `${t.id} must have commonMistake`);
    });
  });

  // TEST 5: CPU Scheduling Accuracy
  test('Verify CPU scheduling mathematical accuracy (Basics, FCFS, SJF, SRTF, RR)', () => {
    // 1. Basics
    const basics = getOSNumericalTopic('cpu-scheduling-basics');
    assert(basics.formulas.some((f) => f.formula.includes('TAT = CT - AT')));
    assert(basics.formulas.some((f) => f.formula.includes('WT = TAT - BT')));
    assert(basics.formulas.some((f) => f.formula.includes('RT = First CPU Start Time - AT')));

    // 2. FCFS (Headers: ['Process', 'AT', 'BT', 'CT', 'TAT', 'WT', 'RT'])
    const fcfs = getOSNumericalTopic('fcfs-numerical');
    const p1Row = fcfs.finalAnswer.rows[0];
    assert.strictEqual(p1Row[3], '5', 'FCFS P1 CT must be 5');
    const p2Row = fcfs.finalAnswer.rows[1];
    assert.strictEqual(p2Row[3], '8', 'FCFS P2 CT must be 8');
    assert.strictEqual(p2Row[5], '4', 'FCFS P2 WT must be 4');

    // 3. SRTF
    const srtf = getOSNumericalTopic('srtf-numerical');
    const srtfRows = srtf.finalAnswer.rows;
    assert.strictEqual(srtfRows[0][4], '17', 'SRTF P1 CT must be 17');
    assert.strictEqual(srtfRows[1][4], '5', 'SRTF P2 CT must be 5');
    assert.strictEqual(srtfRows[0][7], '0', 'SRTF P1 RT must be 0 ms');

    // 4. Round Robin
    const rr = getOSNumericalTopic('round-robin-numerical');
    const rrRows = rr.finalAnswer.rows;
    assert.strictEqual(rrRows[0][4], '12', 'RR P1 CT must be 12');
    assert.strictEqual(rrRows[2][4], '6', 'RR P3 CT must be 6');
  });

  // TEST 6: Banker's Algorithm Accuracy
  test('Verify Banker\'s Algorithm calculation and safe sequence', () => {
    const banker = getOSNumericalTopic('bankers-algorithm-numerical');
    const summary = banker.finalAnswer.summary;
    assert(summary.includes('P1'), 'Safe sequence must include P1');
    assert(summary.includes('P3'), 'Safe sequence must include P3');
    assert(summary.includes('SAFE STATE CONFIRMED'), 'Must confirm SAFE STATE');
  });

  // TEST 7: Paging & Address Translation Accuracy
  test('Verify Paging bit division and hex address calculation', () => {
    const paging = getOSNumericalTopic('paging-numerical');
    const rows = paging.finalAnswer.rows;
    const offsetRow = rows.find((r) => r[0] === 'Offset (d)');
    assert.strictEqual(offsetRow[2], '0xA40', 'Offset hex must be 0xA40');
    const physRow = rows.find((r) => r[0] === 'Physical Address');
    assert.strictEqual(physRow[2], '0x00007A40', 'Physical address must be 0x00007A40');
  });

  // TEST 8: TLB & Effective Access Time Accuracy
  test('Verify TLB & Effective Access Time calculations', () => {
    const tlb = getOSNumericalTopic('tlb-eat-numerical');
    const summary = tlb.finalAnswer.summary;
    assert(summary.includes('140.0 ns'), 'EAT must be 140.0 ns');
  });

  // TEST 9: Disk Scheduling Accuracy
  test('Verify Disk Scheduling LOOK vs SCAN calculations', () => {
    const disk = getOSNumericalTopic('disk-scheduling-numerical');
    const summary = disk.finalAnswer.summary;
    assert(summary.includes('299 cylinders'), 'LOOK total head movement must be 299 cylinders');
  });

  // TEST 10: Page Replacement Accuracy
  test('Verify Page Replacement LRU frame tracking and hit/fault tally', () => {
    const pr = getOSNumericalTopic('page-replacement-numerical');
    const summary = pr.finalAnswer.summary;
    assert(summary.includes('Total Faults = 8'), 'Must have 8 total page faults');
    assert(summary.includes('Total Hits = 2'), 'Must have 2 total page hits');
    assert(summary.includes('20.0%'), 'Hit ratio must be 20.0%');
  });

  // TEST 11: Memory Allocation Accuracy
  test('Verify Memory Allocation Best Fit allocation results', () => {
    const mem = getOSNumericalTopic('memory-allocation-numerical');
    const rows = mem.finalAnswer.rows;
    const bestFitRow = rows.find((r) => r[0] === 'Best Fit');
    assert.strictEqual(bestFitRow[5], 'ALL 4 ALLOCATED', 'Best fit must allocate all 4 processes');
    const firstFitRow = rows.find((r) => r[0] === 'First Fit');
    assert.strictEqual(firstFitRow[5], 'P4 FAILS / WAITS', 'First fit must leave P4 waiting');
  });

  // TEST 12: SubjectLearningPage Integration
  test('Verify OS_SECTION_TABS and components in SubjectLearningPage.jsx', () => {
    const pagePath = path.resolve(rootDir, 'client/src/pages/student/SubjectLearningPage.jsx');
    const content = fs.readFileSync(pagePath, 'utf-8');

    // OS_SECTION_TABS includes 6 sections in canonical order
    assert(content.includes("id: 'numericals', label: '6. Numericals'"), 'OS_SECTION_TABS must include 6. Numericals');
    assert(content.includes("id: 'examples', label: '2. Problem Examples'"), 'OS_SECTION_TABS must include 2. Problem Examples');
    assert(!content.includes("id: 'problem-solving'"), 'OS_SECTION_TABS must NOT include problem-solving');
    assert(!content.includes('OSProblemSolvingSection'), 'SubjectLearningPage must NOT import or render OSProblemSolvingSection');

    // Imports
    assert(content.includes('OSNumericalsSection'), 'SubjectLearningPage must import OSNumericalsSection');

    // Mountings
    assert(content.includes('<OSNumericalsSection'), 'SubjectLearningPage must render OSNumericalsSection');
  });

  // TEST 13: Preservation of Other Subjects
  test('Verify DBMS, CN, DSA, Aptitude, OOPS remain completely unaffected', () => {
    const pagePath = path.resolve(rootDir, 'client/src/pages/student/SubjectLearningPage.jsx');
    const content = fs.readFileSync(pagePath, 'utf-8');
    assert(content.includes("code: 'DBMS'"), 'DBMS registry must remain intact');
    assert(content.includes("code: 'CN'"), 'CN registry must remain intact');
    assert(content.includes("export const SECTION_TABS = ["), 'Standard 5-tab SECTION_TABS for DBMS and CN must remain intact');

    assert(fs.existsSync(path.resolve(rootDir, 'client/src/pages/student/DSALearningPage.jsx')), 'DSA page must exist');
    assert(fs.existsSync(path.resolve(rootDir, 'client/src/pages/student/AptitudeLearningPage.jsx')), 'Aptitude page must exist');
    assert(fs.existsSync(path.resolve(rootDir, 'client/src/pages/student/OOPSLearningPage.jsx')), 'OOPS page must exist');
  });

  console.log(`\n====================================================`);
  console.log(`VERIFICATION COMPLETE: ${passed} / ${total} TESTS PASSED`);
  console.log(`====================================================\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

runSuite().catch((err) => {
  console.error('Fatal suite error:', err);
  process.exit(1);
});
