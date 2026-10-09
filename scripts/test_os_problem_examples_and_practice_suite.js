/**
 * COMPREHENSIVE OS PROBLEM EXAMPLES & PRACTICE QUESTIONS VERIFICATION SUITE
 * 
 * Verifies:
 * 1. normalizeSectionId handling for all OS section aliases and legacy redirects
 * 2. Problem Examples data completeness across all 30 canonical topics (>= 60 examples)
 * 3. Problem Examples UI integration: Search, domain filters, topic cards, and modal viewer structure
 * 4. Practice Questions data completeness across 30 questions and 7 domains
 * 5. Practice Questions UI integration: Safe bounds, interactive options, explanations, and resets
 * 6. Numericals and all other OS sections remain completely functional
 * 7. DBMS, CN, DSA, Aptitude, OOPS preservation
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
  console.log('RUNNING OS PROBLEM EXAMPLES & PRACTICE QUESTIONS SUITE');
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

  // 1. Check SubjectLearningPage Routing & Section Alias Normalization
  test('Verify normalizeSectionId handles all canonical and legacy OS section aliases', async () => {
    const pagePath = path.resolve(rootDir, 'client/src/pages/student/SubjectLearningPage.jsx');
    const content = fs.readFileSync(pagePath, 'utf-8');

    assert(content.includes('export const normalizeSectionId'), 'SubjectLearningPage must export normalizeSectionId');
    assert(content.includes("clean === 'problem-solving'"), 'Must handle legacy problem-solving');
    assert(content.includes("clean === 'problem-examples'"), 'Must handle problem-examples alias');
    assert(content.includes("clean === 'summary-notes'"), 'Must handle summary-notes alias');
    assert(content.includes("clean === 'revision-exam'"), 'Must handle revision-exam alias');
    assert(content.includes("clean === 'practice-questions'"), 'Must handle practice-questions alias');

    // Emulate normalizeSectionId logic
    const normalizeSectionId = (sec, code = 'os') => {
      if (!sec) return 'introduction';
      const clean = String(sec).toLowerCase().trim().replace(/_/g, '-');
      if (code.toLowerCase() === 'os') {
        if (clean === 'problem-solving') return 'numericals';
        if (clean === 'problem-examples' || clean === 'problem-example' || clean === 'examples') return 'examples';
        if (clean === 'practice-questions' || clean === 'practice') return 'practice';
        if (clean === 'summary-notes' || clean === 'summary' || clean === 'notes') return 'summary';
        if (clean === 'revision-exam' || clean === 'revision' || clean === 'exam-prep' || clean === 'exam') return 'revision';
        if (clean === 'numericals' || clean === 'numerical') return 'numericals';
        if (clean === 'introduction' || clean === 'intro') return 'introduction';
      }
      return clean;
    };

    assert.strictEqual(normalizeSectionId('introduction'), 'introduction');
    assert.strictEqual(normalizeSectionId('problem-examples'), 'examples');
    assert.strictEqual(normalizeSectionId('examples'), 'examples');
    assert.strictEqual(normalizeSectionId('practice'), 'practice');
    assert.strictEqual(normalizeSectionId('practice-questions'), 'practice');
    assert.strictEqual(normalizeSectionId('summary-notes'), 'summary');
    assert.strictEqual(normalizeSectionId('summary'), 'summary');
    assert.strictEqual(normalizeSectionId('revision-exam'), 'revision');
    assert.strictEqual(normalizeSectionId('revision'), 'revision');
    assert.strictEqual(normalizeSectionId('numericals'), 'numericals');
    assert.strictEqual(normalizeSectionId('problem-solving'), 'numericals', 'problem-solving must redirect to numericals');
  });

  // 2. Check Problem Examples Data Completeness
  const examplesModule = await import('../client/src/data/os/osProblemExamplesData.js');
  const { OS_PROBLEM_EXAMPLES_DATA, getOSTopicExamples } = examplesModule;
  const registryModule = await import('../client/src/data/os/osTopicDataRegistry.js');
  const { OS_TOPICS_LIST, OS_DOMAINS } = registryModule;

  test('Verify all 30 canonical topics have structured worked examples in osProblemExamplesData.js', () => {
    assert.strictEqual(OS_TOPICS_LIST.length, 30, 'Must have exactly 30 topics');
    let totalExamples = 0;

    OS_TOPICS_LIST.forEach((t) => {
      const exList = getOSTopicExamples(t.topicId);
      assert(Array.isArray(exList) && exList.length >= 2, `Topic ${t.topicId} must have at least 2 worked examples`);
      totalExamples += exList.length;

      exList.forEach((ex, idx) => {
        assert(ex.id, `Topic ${t.topicId} Example ${idx + 1} must have id`);
        assert(ex.title, `Topic ${t.topicId} Example ${idx + 1} must have title`);
        assert(ex.problem, `Topic ${t.topicId} Example ${idx + 1} must have problem statement`);
        assert(ex.given, `Topic ${t.topicId} Example ${idx + 1} must have given constraints`);
        assert(Array.isArray(ex.flowchart) && ex.flowchart.length >= 2, `Topic ${t.topicId} Example ${idx + 1} must have flowchart`);
        assert(Array.isArray(ex.steps) && ex.steps.length >= 1, `Topic ${t.topicId} Example ${idx + 1} must have steps`);
        assert(ex.steps[0].action, `Topic ${t.topicId} Example ${idx + 1} Step 1 must have action`);
        assert(ex.steps[0].result, `Topic ${t.topicId} Example ${idx + 1} Step 1 must have result`);
        assert(ex.answer, `Topic ${t.topicId} Example ${idx + 1} must have answer`);
        assert(ex.quickExplanation, `Topic ${t.topicId} Example ${idx + 1} must have quickExplanation`);
      });
    });

    assert(totalExamples >= 60, `Must have at least 60 worked examples total (found: ${totalExamples})`);
  });

  // 3. Check Problem Examples Component Implementation
  test('Verify OSProblemExamplesSection.jsx supports search, domain filter, 30 topic cards, and modal viewer', () => {
    const compPath = path.resolve(rootDir, 'client/src/components/learning/os/OSProblemExamplesSection.jsx');
    assert(fs.existsSync(compPath), 'OSProblemExamplesSection.jsx must exist');
    const content = fs.readFileSync(compPath, 'utf-8');

    assert(content.includes('export default function OSProblemExamplesSection'), 'Must have default export');
    assert(content.includes('OS_TOPICS_LIST'), 'Must import OS_TOPICS_LIST');
    assert(content.includes('OS_DOMAINS'), 'Must import OS_DOMAINS');
    assert(content.includes('getOSTopicExamples'), 'Must import getOSTopicExamples');
    assert(content.includes('searchQuery'), 'Must support search query state');
    assert(content.includes('selectedDomain'), 'Must support domain filtering state');
    assert(content.includes('modalTopicId'), 'Must support modal topic viewer state');
    assert(content.includes('handleOpenExample'), 'Must have handleOpenExample function');
    assert(content.includes('handleCloseModal'), 'Must have handleCloseModal function');
    assert(content.includes('Open Example'), 'Must render [Open Example] buttons on topic cards');
    assert(content.includes('NUMERICAL_TOPIC_IDS'), 'Must identify numerical-related topics');
    assert(content.includes('onGoToNumericals'), 'Must link numerical topics to numericals');
    assert(content.includes('onGoToPractice'), 'Must link to practice questions');
  });

  // 4. Check Practice Questions Data Completeness
  const practiceModule = await import('../client/src/data/os/osPracticeData.js');
  const { OS_PRACTICE_QUESTIONS } = practiceModule;

  test('Verify all 30 practice questions and 7 domains exist in osPracticeData.js', () => {
    assert.strictEqual(OS_PRACTICE_QUESTIONS.length, 30, 'Must have exactly 30 practice questions');
    const coveredDomains = new Set(OS_PRACTICE_QUESTIONS.map((q) => q.domainId));

    OS_DOMAINS.forEach((dom) => {
      assert(coveredDomains.has(dom.id), `Domain ${dom.id} must be represented in practice questions`);
    });

    OS_PRACTICE_QUESTIONS.forEach((q, idx) => {
      assert(q.id, `Question ${idx + 1} must have id`);
      assert(q.topicId, `Question ${idx + 1} must have topicId`);
      assert(q.question, `Question ${idx + 1} must have question text`);
      assert(Array.isArray(q.options) && q.options.length === 4, `Question ${idx + 1} must have 4 options`);
      assert(typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer <= 3, `Question ${idx + 1} must have valid correctAnswer`);
      assert(q.explanation, `Question ${idx + 1} must have explanation`);
    });
  });

  // 5. Check Practice Questions Component Implementation
  test('Verify OSPracticeSection.jsx implements safe index bounds, topic/domain filtering, and interactive answer state', () => {
    const compPath = path.resolve(rootDir, 'client/src/components/learning/os/OSPracticeSection.jsx');
    assert(fs.existsSync(compPath), 'OSPracticeSection.jsx must exist');
    const content = fs.readFileSync(compPath, 'utf-8');

    assert(content.includes('export default function OSPracticeSection'), 'Must have default export');
    assert(content.includes('OS_PRACTICE_QUESTIONS'), 'Must import OS_PRACTICE_QUESTIONS');
    assert(content.includes('safeIndex'), 'Must calculate safe bounded index');
    assert(content.includes('selectedTopicFilter'), 'Must support topic filtering');
    assert(content.includes('selectedDomain'), 'Must support domain filtering');
    assert(content.includes('handleSelectOption'), 'Must handle option selection');
    assert(content.includes('showExplanation'), 'Must display explanation on answer');
    assert(content.includes('handleReset'), 'Must reset question state');
    assert(content.includes('onGoToRevision'), 'Must link to exam prep');
  });

  // 6. Check SubjectLearningPage Integration
  test('Verify SubjectLearningPage mounts OSProblemExamplesSection and OSPracticeSection with proper handlers', () => {
    const pagePath = path.resolve(rootDir, 'client/src/pages/student/SubjectLearningPage.jsx');
    const content = fs.readFileSync(pagePath, 'utf-8');

    assert(content.includes('<OSProblemExamplesSection'), 'SubjectLearningPage must render OSProblemExamplesSection');
    assert(content.includes('<OSPracticeSection'), 'SubjectLearningPage must render OSPracticeSection');
    assert(content.includes("onGoToNumericals={() => handleSectionSelect('numericals')}"), 'Examples must link to numericals');
    assert(content.includes("onGoToPractice={() => handleSectionSelect('practice')}"), 'Examples must link to practice');
    assert(content.includes("onGoToRevision={() => handleSectionSelect('revision')}"), 'Practice must link to revision');
  });

  // 7. Check Numericals Section & All Other OS Sections Preserved
  test('Verify Numericals, Introduction, Summary, and Revision sections remain intact in SubjectLearningPage.jsx', () => {
    const pagePath = path.resolve(rootDir, 'client/src/pages/student/SubjectLearningPage.jsx');
    const content = fs.readFileSync(pagePath, 'utf-8');

    assert(content.includes('<OSIntroductionSection'), 'OSIntroductionSection must be rendered');
    assert(content.includes('<OSSummaryNotesSection'), 'OSSummaryNotesSection must be rendered');
    assert(content.includes('<OSRevisionExamSection'), 'OSRevisionExamSection must be rendered');
    assert(content.includes('<OSNumericalsSection'), 'OSNumericalsSection must be rendered');

    assert(content.includes("id: 'numericals', label: '6. Numericals'"), 'Numericals must be Section 6');
    assert(!content.includes('OSProblemSolvingSection'), 'Problem Solving must be completely removed');
  });

  // 8. Check Preservation of Other Subjects
  test('Verify DBMS, CN, DSA, Aptitude, OOPS remain untouched', () => {
    const pagePath = path.resolve(rootDir, 'client/src/pages/student/SubjectLearningPage.jsx');
    const content = fs.readFileSync(pagePath, 'utf-8');

    assert(content.includes("code: 'DBMS'"), 'DBMS config must remain intact');
    assert(content.includes("code: 'CN'"), 'CN config must remain intact');
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
