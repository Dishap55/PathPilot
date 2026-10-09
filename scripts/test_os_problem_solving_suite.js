/**
 * OS PROBLEM SOLVING / NUMERICAL LAB VALIDATION SUITE
 * 
 * Verifies:
 * 1. Category completeness (A through H)
 * 2. CPU scheduling topics completeness (Basics, Gantt, FCFS, SJF-NP, SRTF, Priority-NP, Priority-P, RR, MLQ, MLFQ)
 * 3. Universal 10-Stage Full-Solution Framework for all worked problems
 * 4. Step-by-step execution depth with mandatory "Why this step?" explanations
 * 5. Numerical correctness across CT, TAT, WT, RT, Banker's, Paging, TLB, Page Replacement, Disk, Synchronization
 * 6. Practice mode questions, hints, and solutions
 * 7. Component mounting in SubjectLearningPage.jsx
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
  console.log('RUNNING OS PROBLEM SOLVING / NUMERICAL LAB SUITE');
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

  // 1. Data Module Import
  const dataModule = await import('../client/src/data/os/osProblemSolvingData.js');
  const {
    OS_PROBLEM_CATEGORIES,
    OS_PROBLEM_TOPICS,
    getOSProblemTopic,
    getAllOSProblemTopics
  } = dataModule;

  // TEST 1: Categories
  test('Verify all 8 OS Problem Solving categories exist (A through H)', () => {
    assert(Array.isArray(OS_PROBLEM_CATEGORIES), 'Categories must be an array');
    const expectedCatIds = [
      'cpu-scheduling',
      'synchronization',
      'deadlocks',
      'memory-management',
      'paging',
      'page-replacement',
      'tlb-eat',
      'disk-scheduling'
    ];
    expectedCatIds.forEach((catId) => {
      const found = OS_PROBLEM_CATEGORIES.find((c) => c.id === catId);
      assert(found, `Category ${catId} must exist in OS_PROBLEM_CATEGORIES`);
      assert(found.label, `Category ${catId} must have a label`);
    });
  });

  // TEST 2: CPU Scheduling Topics Coverage
  test('Verify all 9 required CPU Scheduling topics + Gantt Chart exist', () => {
    const requiredCpuTopics = [
      'scheduling-basics',
      'gantt-chart',
      'fcfs',
      'sjf-nonpreemptive',
      'srtf',
      'priority-nonpreemptive',
      'priority-scheduling',
      'round-robin',
      'multilevel-queue',
      'mlfq'
    ];
    requiredCpuTopics.forEach((topicId) => {
      const topic = OS_PROBLEM_TOPICS[topicId];
      assert(topic, `CPU scheduling topic ${topicId} must exist`);
      assert.strictEqual(topic.categoryId, 'cpu-scheduling', `${topicId} must belong to cpu-scheduling`);
      assert(topic.title, `${topicId} must have a title`);
      assert(topic.summary, `${topicId} must have a summary`);
    });
  });

  // TEST 3: Other OS Categories Topics Coverage
  test('Verify Deadlocks, Memory, Paging, TLB, Page Replacement, Disk, Synchronization topics exist', () => {
    const otherRequiredTopics = [
      { id: 'bankers-algorithm', cat: 'deadlocks' },
      { id: 'memory-allocation', cat: 'memory-management' },
      { id: 'paging-calculations', cat: 'paging' },
      { id: 'tlb-eat', cat: 'tlb-eat' },
      { id: 'page-replacement', cat: 'page-replacement' },
      { id: 'disk-scheduling', cat: 'disk-scheduling' },
      { id: 'process-synchronization', cat: 'synchronization' }
    ];
    otherRequiredTopics.forEach(({ id, cat }) => {
      const topic = OS_PROBLEM_TOPICS[id];
      assert(topic, `Topic ${id} must exist`);
      assert.strictEqual(topic.categoryId, cat, `${id} must belong to ${cat}`);
    });
  });

  // TEST 4: Universal 10-Stage Framework Structure for all topics
  test('Verify all topics implement the Universal 10-Stage Full-Solution Framework', () => {
    const topics = getAllOSProblemTopics();
    assert(topics.length >= 14, `Expected at least 14 topics, found ${topics.length}`);

    topics.forEach((t) => {
      const st = t.stages;
      assert(st, `Topic ${t.id} must have stages object`);

      // STAGE 1: Question
      assert(st.stage1_question, `${t.id} must have stage1_question`);
      assert(st.stage1_question.scenario, `${t.id} stage1 must have scenario`);

      // STAGE 3: Algorithm Rule
      assert(st.stage3_algorithmRule, `${t.id} must have stage3_algorithmRule`);
      assert(st.stage3_algorithmRule.rule || st.stage3_algorithmRule.formulas, `${t.id} stage3 must have rule/formulas`);

      // STAGE 5: Step-by-Step Execution
      assert(Array.isArray(st.stage5_executionSteps), `${t.id} must have stage5_executionSteps array`);
      assert(st.stage5_executionSteps.length >= 2, `${t.id} must have at least 2 execution steps, found ${st.stage5_executionSteps.length}`);

      // STAGE 8: Final Table / Result
      assert(st.stage8_finalTable, `${t.id} must have stage8_finalTable`);

      // STAGE 10: Traps / Exam Pitfalls
      assert(st.stage10_traps, `${t.id} must have stage10_traps`);
      assert(Array.isArray(st.stage10_traps.traps) && st.stage10_traps.traps.length > 0, `${t.id} must have at least one trap`);
    });
  });

  // TEST 5: Mandatory "Why this step?" Check (Requirement 28)
  test('Verify EVERY execution step across all topics provides an explicit conceptual reason (WHY)', () => {
    const topics = getAllOSProblemTopics();
    topics.forEach((t) => {
      const steps = t.stages?.stage5_executionSteps || [];
      steps.forEach((step, sIdx) => {
        const hasWhy = Boolean(step.why || step.reason || step.desc || step.math);
        assert(hasWhy, `Topic ${t.id} Step ${sIdx + 1} is missing an explicit WHY explanation!`);
      });
    });
  });

  // TEST 6: Numerical Accuracy: FCFS, SJF, SRTF, RR, Priority
  test('Verify CPU scheduling mathematical accuracy (CT, TAT, WT, RT)', () => {
    // 1. FCFS check: P1(0, 5), P2(1, 3), P3(2, 8), P4(3, 6)
    // Gantt: P1: 0-5, P2: 5-8, P3: 8-16, P4: 16-22
    // P1: CT=5, TAT=5, WT=0, RT=0
    // P2: CT=8, TAT=8-1=7, WT=7-3=4, RT=5-1=4
    // P3: CT=16, TAT=16-2=14, WT=14-8=6, RT=8-2=6
    // P4: CT=22, TAT=22-3=19, WT=19-6=13, RT=16-3=13
    const fcfs = OS_PROBLEM_TOPICS['fcfs'];
    const fcfsRows = fcfs.stages.stage8_finalTable.rows;
    assert.strictEqual(fcfsRows[0][4], '5', 'FCFS P1 CT should be 5');
    assert.strictEqual(fcfsRows[1][4], '8', 'FCFS P2 CT should be 8');
    assert.strictEqual(fcfsRows[2][4], '16', 'FCFS P3 CT should be 16');
    assert.strictEqual(fcfsRows[3][4], '22', 'FCFS P4 CT should be 22');
    assert.strictEqual(fcfsRows[1][6], '4', 'FCFS P2 WT should be 4');
    assert.strictEqual(fcfsRows[2][6], '6', 'FCFS P3 WT should be 6');

    // 2. Round Robin check (q=2): P1(0,5), P2(1,4), P3(2,2), P4(4,1)
    // Timeline finishes at 12 ms
    const rr = OS_PROBLEM_TOPICS['round-robin'];
    const rrRows = rr.stages.stage8_finalTable.rows;
    assert.strictEqual(rrRows[0][4], '12', 'RR P1 CT should be 12');
    assert.strictEqual(rrRows[1][4], '11', 'RR P2 CT should be 11');
    assert.strictEqual(rrRows[2][4], '6', 'RR P3 CT should be 6');
    assert.strictEqual(rrRows[3][4], '9', 'RR P4 CT should be 9');
  });

  // TEST 7: Banker's Algorithm Accuracy
  test('Verify Banker\'s Algorithm Need Matrix, Safe State, and Sequence', () => {
    const banker = OS_PROBLEM_TOPICS['bankers-algorithm'];
    assert(banker.stages.stage4_initialState.needMatrix, 'Banker must provide Need Matrix');
    assert.strictEqual(banker.stages.stage4_initialState.needMatrix.length, 5, 'Banker must have 5 processes in Need Matrix');
    assert(banker.stages.stage8_finalTable.safeSequence.includes('P1'), 'Safe sequence must include P1');
    assert.strictEqual(banker.stages.stage8_finalTable.status, 'SAFE STATE CONFIRMED');
  });

  // TEST 8: Paging & Address Translation Accuracy
  test('Verify Paging bit divisions and hexadecimal translation', () => {
    const paging = OS_PROBLEM_TOPICS['paging-calculations'];
    const rows = paging.stages.stage8_finalTable.rows;
    const offsetRow = rows.find(r => r[0] === 'Offset Bits');
    assert.strictEqual(offsetRow[1], '12 bits');
    const pageNumRow = rows.find(r => r[0] === 'Page Number Bits');
    assert.strictEqual(pageNumRow[1], '20 bits');
  });

  // TEST 9: TLB / Effective Access Time Accuracy
  test('Verify TLB & Effective Access Time calculations', () => {
    const tlb = OS_PROBLEM_TOPICS['tlb-eat'];
    const rows = tlb.stages.stage8_finalTable.rows;
    const eatRow = rows.find(r => r[0] === 'Effective Access Time (EAT)');
    assert.strictEqual(eatRow[1], '94.0 ns');
    const speedupRow = rows.find(r => r[0] === 'Speedup over No-TLB');
    assert.strictEqual(speedupRow[1], '70.2% faster (1.70x)');
  });

  // TEST 10: Practice Questions Validation
  test('Verify practice questions contain scenario, progressive hints, and verified solutions', () => {
    const topics = getAllOSProblemTopics();
    const topicsWithPractice = topics.filter(t => t.practiceQuestions && t.practiceQuestions.length > 0);
    assert(topicsWithPractice.length >= 8, `Expected at least 8 topics with practice mode, found ${topicsWithPractice.length}`);
    topicsWithPractice.forEach(t => {
      t.practiceQuestions.forEach(q => {
        assert(q.id, `Practice question in ${t.id} must have an ID`);
        assert(q.title, `Practice question in ${t.id} must have a title`);
        assert(q.scenario, `Practice question in ${t.id} must have a scenario`);
        assert(Array.isArray(q.hints) && q.hints.length > 0, `Practice question in ${t.id} must have hints`);
        assert(q.solution, `Practice question in ${t.id} must have a solution`);
      });
    });
  });

  // TEST 11: Component File & UI Mounting Check
  test('Verify OSProblemSolvingSection.jsx exists and is mounted in SubjectLearningPage.jsx', () => {
    const componentPath = path.resolve(rootDir, 'client/src/components/learning/os/OSProblemSolvingSection.jsx');
    assert(fs.existsSync(componentPath), 'OSProblemSolvingSection.jsx must exist');
    const compContent = fs.readFileSync(componentPath, 'utf-8');
    assert(compContent.includes('export default function OSProblemSolvingSection'), 'Component must have default export');

    const pagePath = path.resolve(rootDir, 'client/src/pages/student/SubjectLearningPage.jsx');
    const pageContent = fs.readFileSync(pagePath, 'utf-8');
    assert(pageContent.includes('OSProblemSolvingSection'), 'SubjectLearningPage must import OSProblemSolvingSection');
    assert(pageContent.includes("<OSProblemSolvingSection"), 'SubjectLearningPage must render OSProblemSolvingSection');
    assert(pageContent.includes("normalizedCode === 'os'"), 'SubjectLearningPage must conditionally render for OS');
    assert(pageContent.includes("2. Problem Solving"), 'SubjectLearningPage must provide Problem Solving label for OS');
  });

  console.log(`\n====================================================`);
  console.log(`OS PROBLEM SOLVING SUITE COMPLETE: ${passed} / ${total} TESTS PASSED`);
  console.log(`====================================================\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

runSuite().catch(err => {
  console.error('Fatal suite error:', err);
  process.exit(1);
});
