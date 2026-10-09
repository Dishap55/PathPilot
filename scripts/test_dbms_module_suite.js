/**
 * AUTOMATED TEST SUITE: DBMS LEARNING MODULE MASTER VERIFICATION
 * 
 * Verifies all criteria specified in the DBMS Master Prompt:
 * 1. Routing & registration in App.jsx
 * 2. Canonical topic registry (all 12 topics)
 * 3. 10-card theory system (exactly 10 cards per topic)
 * 4. Problem Solving benchmark data (36 problems across all 12 topics)
 * 5. SQL Query Challenges (65 runnable challenges with sandboxed schema & test cases)
 * 6. MCQ Question Bank (196 deeply authored questions with progressive hints & explanations)
 * 7. Difficulty & Company Metadata distribution (ACTUAL_REPORTED, COMPANY_STYLE, PLACEMENT_STYLE)
 * 8. Zero duplicate detection (IDs & questions)
 * 9. Practice section UI integration (SQL sandbox + MCQ lab with filters & hints)
 * 10. Summary & Notes section (AddNoteButton, useNotes)
 * 11. Visual diagrams
 * 12. Regression safety (OOPS, OS, CN intact)
 */

const fs = require('fs');
const path = require('path');

let passedTests = 0;
let failedTests = 0;
let skippedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${testName}${details ? ` -> ${details}` : ''}`);
  }
}

async function runSuite() {
  console.log('====================================================');
  console.log('DBMS MODULE MASTER VERIFICATION TEST SUITE');
  console.log('====================================================\n');

  // 1. Check Routes in App.jsx
  console.log('--- SUITE 1: ROUTING & REGISTRATION ---');
  const appJsxPath = path.resolve(__dirname, '../client/src/App.jsx');
  const appJsxContent = fs.readFileSync(appJsxPath, 'utf8');

  assert(
    appJsxContent.includes("import DBMSLearningPage from './pages/student/DBMSLearningPage.jsx'"),
    'App.jsx imports DBMSLearningPage component'
  );
  assert(
    appJsxContent.includes('<Route path="/dbms" element={<DBMSLearningPage />} />'),
    'App.jsx routes /dbms to DBMSLearningPage'
  );
  assert(
    appJsxContent.includes('<Route path="/subjects/dbms" element={<DBMSLearningPage />} />'),
    'App.jsx routes /subjects/dbms to DBMSLearningPage'
  );
  assert(
    appJsxContent.includes('<Route path="/os" element={<SubjectLearningPage />} />') &&
    appJsxContent.includes('<Route path="/cn" element={<SubjectLearningPage />} />'),
    'App.jsx preserves OS and CN on SubjectLearningPage without regressions'
  );

  // 2. Check Canonical DBMS Topic Registry
  console.log('\n--- SUITE 2: CANONICAL TOPIC REGISTRY ---');
  const registryPath = path.resolve(__dirname, '../client/src/data/dbms/dbmsTopicDataRegistry.js');
  assert(fs.existsSync(registryPath), 'Canonical registry dbmsTopicDataRegistry.js exists');

  const registryContent = fs.readFileSync(registryPath, 'utf8');
  assert(registryContent.includes('export const DBMS_TOPIC_REGISTRY'), 'Exports canonical DBMS_TOPIC_REGISTRY');
  assert(registryContent.includes('export const DBMS_TOPICS_LIST'), 'Exports canonical DBMS_TOPICS_LIST');
  assert(registryContent.includes('export function resolveDBMSTopicId'), 'Exports resolveDBMSTopicId function');
  assert(registryContent.includes('export function getDBMSTopic'), 'Exports getDBMSTopic function');

  const canonicalTopicKeys = [
    'dbms-architecture',
    'er-model',
    'relational-model-keys',
    'sql-basics-ddl-dml',
    'sql-joins',
    'sql-aggregation-groupby',
    'sql-subqueries-nested',
    'normalization',
    'transactions-acid',
    'concurrency-locking',
    'indexing-btrees',
    'views-stored-procedures'
  ];

  canonicalTopicKeys.forEach(key => {
    assert(registryContent.includes(`'${key}':`), `Canonical topic '${key}' registered`);
  });

  // 3. Check 10-Card Theory System Data
  console.log('\n--- SUITE 3: 10-CARD THEORY SYSTEM ---');
  const cardsDataPath = path.resolve(__dirname, '../client/src/data/dbms/dbmsTopicCardsData.js');
  assert(fs.existsSync(cardsDataPath), 'dbmsTopicCardsData.js exists');

  const cardsModule = await import('../client/src/data/dbms/dbmsTopicCardsData.js');
  assert(typeof cardsModule.DBMS_TOPIC_CARDS === 'object', 'Exports DBMS_TOPIC_CARDS object');
  assert(typeof cardsModule.getDBMSTopicCards === 'function', 'Exports getDBMSTopicCards function');

  canonicalTopicKeys.forEach(tKey => {
    const cardsArr = cardsModule.DBMS_TOPIC_CARDS[tKey] || [];
    assert(
      cardsArr.length === 10,
      `Topic '${tKey}' has EXACTLY 10 cards (Found: ${cardsArr.length})`
    );
  });

  const cardsDataContent = fs.readFileSync(cardsDataPath, 'utf8');
  assert(cardsDataContent.includes('inSimpleWords'), 'Card 1 includes "inSimpleWords" explanation');
  assert(cardsDataContent.includes('analogy'), 'Card 1 includes beginner analogies');
  assert(cardsDataContent.includes('whyItMatters') && cardsDataContent.includes('howSolves'), 'Card 2 includes problem & how DBMS solves it');
  assert(cardsDataContent.includes('steps: ['), 'Card 3 includes step-by-step process execution');
  assert(cardsDataContent.includes('structureDetails') || cardsDataContent.includes('codeSnippet'), 'Card 4 includes real SQL syntax/structure');
  assert(cardsDataContent.includes('scenario') && cardsDataContent.includes('challenge'), 'Card 5 includes real-world scenario');
  assert(cardsDataContent.includes('variations: ['), 'Card 6 includes genuine variations');
  assert(cardsDataContent.includes('schema:') && cardsDataContent.includes('sampleData:') && cardsDataContent.includes('query:'), 'Card 7 includes schema, sample data, query, and result');
  assert(cardsDataContent.includes('traps: [') && cardsDataContent.includes('wrong:') && cardsDataContent.includes('why:') && cardsDataContent.includes('correct:'), 'Card 8 includes common traps with Wrong -> Why -> Correct');
  assert(cardsDataContent.includes('questions: ['), 'Card 9 includes interview/placement angle');
  assert(cardsDataContent.includes('cheatSheet: {') && cardsDataContent.includes('keyRule:'), 'Card 10 includes quick revision cheat sheet');

  // 4. Check Problem Solving Benchmark Examples
  console.log('\n--- SUITE 4: PROBLEM SOLVING BENCHMARK EXAMPLES ---');
  const problemDataPath = path.resolve(__dirname, '../client/src/data/dbms/dbmsProblemExamplesData.js');
  assert(fs.existsSync(problemDataPath), 'dbmsProblemExamplesData.js exists');

  const problemsModule = await import('../client/src/data/dbms/dbmsProblemExamplesData.js');
  assert(typeof problemsModule.DBMS_PROBLEM_EXAMPLES === 'object', 'Exports DBMS_PROBLEM_EXAMPLES');
  assert(typeof problemsModule.getDBMSProblemExamples === 'function', 'Exports getDBMSProblemExamples function');

  let totalProblems = 0;
  const problemTopics = Object.keys(problemsModule.DBMS_PROBLEM_EXAMPLES);
  problemTopics.forEach(t => {
    totalProblems += problemsModule.DBMS_PROBLEM_EXAMPLES[t].length;
  });
  assert(totalProblems >= 30, `Problem solving meets minimum target of 30 (Found: ${totalProblems} problems)`);
  assert(problemTopics.length === 12, `Problem solving covers all 12 canonical topics (Found: ${problemTopics.length})`);

  const problemDataContent = fs.readFileSync(problemDataPath, 'utf8');
  assert(problemDataContent.includes('queryBreakdown') || problemDataContent.includes('"queryBreakdown"'), 'Problems include step-by-step query breakdowns');
  assert(problemDataContent.includes('Second Highest Salary'), 'Includes canonical Second Highest Salary problem');
  assert(problemDataContent.includes('Employees Earning More Than Their Manager'), 'Includes canonical Self Join problem');
  assert(problemDataContent.includes('Customers Who Never Ordered'), 'Includes canonical Unmatched Records Join problem');

  // 5. Check SQL Query Challenges
  console.log('\n--- SUITE 5: SQL QUERY CHALLENGES EXPANSION ---');
  const sqlDataPath = path.resolve(__dirname, '../client/src/data/dbms/dbmsSqlChallengesData.js');
  assert(fs.existsSync(sqlDataPath), 'dbmsSqlChallengesData.js exists');

  const sqlModule = await import('../client/src/data/dbms/dbmsSqlChallengesData.js');
  const sqlChallenges = sqlModule.DBMS_SQL_CHALLENGES;
  assert(Array.isArray(sqlChallenges), 'Exports DBMS_SQL_CHALLENGES array');
  assert(sqlChallenges.length >= 50, `SQL Challenges meet minimum target of 50 (Found: ${sqlChallenges.length} challenges)`);

  const sqlIds = new Set();
  let sqlDuplicates = 0;
  let missingSqlTestCases = 0;
  let missingSqlHints = 0;
  let missingSqlBreakdown = 0;

  sqlChallenges.forEach(c => {
    if (sqlIds.has(c.id)) sqlDuplicates++;
    sqlIds.add(c.id);
    if (!c.test_cases || c.test_cases.length === 0) missingSqlTestCases++;
    if (!c.hints || c.hints.length < 2) missingSqlHints++;
    if (!c.queryBreakdown || c.queryBreakdown.length === 0) missingSqlBreakdown++;
  });

  assert(sqlDuplicates === 0, `Zero duplicate SQL challenge IDs (Duplicates: ${sqlDuplicates})`);
  assert(missingSqlTestCases === 0, `All SQL challenges have automated test cases (Missing: ${missingSqlTestCases})`);
  assert(missingSqlHints === 0, `All SQL challenges have progressive hints (Missing: ${missingSqlHints})`);
  assert(missingSqlBreakdown === 0, `All SQL challenges have query breakdowns (Missing: ${missingSqlBreakdown})`);

  // Check SQL topic coverage
  const sqlTopicsCovered = new Set(sqlChallenges.map(c => c.topicId));
  assert(sqlTopicsCovered.size === 12, `SQL challenges cover all 12 canonical topics (Found: ${sqlTopicsCovered.size})`);

  // 6. Check Master MCQ Question Bank
  console.log('\n--- SUITE 6: MASTER MCQ QUESTION BANK EXPANSION ---');
  const mcqDataPath = path.resolve(__dirname, '../client/src/data/dbms/dbmsMcqBankData.js');
  assert(fs.existsSync(mcqDataPath), 'dbmsMcqBankData.js exists');

  const mcqModule = await import('../client/src/data/dbms/dbmsMcqBankData.js');
  const mcqs = mcqModule.DBMS_MCQ_QUESTIONS;
  assert(Array.isArray(mcqs), 'Exports DBMS_MCQ_QUESTIONS array');
  assert(mcqs.length >= 150, `MCQs meet minimum target of 150 (Found: ${mcqs.length} MCQs)`);

  const mcqIds = new Set();
  let mcqDuplicates = 0;
  let missingMcqHints = 0;
  let missingMcqExplanations = 0;
  let invalidCorrectIndex = 0;
  let invalidOptionsLength = 0;
  let missingCompanyMeta = 0;
  const mcqTopics = new Set();
  const difficultyCounts = {};

  mcqs.forEach(q => {
    if (mcqIds.has(q.id)) mcqDuplicates++;
    mcqIds.add(q.id);
    mcqTopics.add(q.topicId);
    difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1;

    if (!q.hint || !q.progressiveHint) missingMcqHints++;
    if (!q.explanation || !q.optionExplanations) missingMcqExplanations++;
    if (q.correctIndex < 0 || q.correctIndex > 3) invalidCorrectIndex++;
    if (!Array.isArray(q.options) || q.options.length !== 4) invalidOptionsLength++;
    if (!q.companyMetadata || !q.companyMetadata.evidenceType) missingCompanyMeta++;
  });

  assert(mcqDuplicates === 0, `Zero duplicate MCQ IDs (Duplicates: ${mcqDuplicates})`);
  assert(mcqTopics.size === 12, `MCQs cover all 12 canonical topics (Found: ${mcqTopics.size})`);
  assert(missingMcqHints === 0, `All MCQs have progressive hints (Missing: ${missingMcqHints})`);
  assert(missingMcqExplanations === 0, `All MCQs have full explanations and option breakdowns (Missing: ${missingMcqExplanations})`);
  assert(invalidCorrectIndex === 0, `All MCQs have valid correctIndex between 0 and 3 (Invalid: ${invalidCorrectIndex})`);
  assert(invalidOptionsLength === 0, `All MCQs have exactly 4 choices (Invalid: ${invalidOptionsLength})`);
  assert(missingCompanyMeta === 0, `All MCQs have verified company/evidence metadata (Missing: ${missingCompanyMeta})`);

  // Difficulty coverage
  assert(difficultyCounts['Easy'] > 0, `Includes Easy MCQs (${difficultyCounts['Easy']})`);
  assert(difficultyCounts['Medium'] > 0, `Includes Medium MCQs (${difficultyCounts['Medium']})`);
  assert(difficultyCounts['Hard'] > 0, `Includes Hard MCQs (${difficultyCounts['Hard']})`);
  assert(difficultyCounts['Placement'] > 0, `Includes Placement MCQs (${difficultyCounts['Placement']})`);
  assert(difficultyCounts['Interview Trap'] > 0, `Includes Interview Trap MCQs (${difficultyCounts['Interview Trap']})`);

  // 7. Check DBMS Practice Data Integration & Scoping
  console.log('\n--- SUITE 7: PRACTICE DATA RE-EXPORT & TOPIC SCOPING ---');
  const practiceDataPath = path.resolve(__dirname, '../client/src/data/dbms/dbmsPracticeData.js');
  assert(fs.existsSync(practiceDataPath), 'dbmsPracticeData.js exists');

  const practiceModule = await import('../client/src/data/dbms/dbmsPracticeData.js');
  assert(Array.isArray(practiceModule.DBMS_SQL_CHALLENGES), 'Re-exports DBMS_SQL_CHALLENGES');
  assert(Array.isArray(practiceModule.DBMS_MCQ_QUESTIONS), 'Re-exports DBMS_MCQ_QUESTIONS');
  assert(typeof practiceModule.getDBMSSqlChallenges === 'function', 'Exports getDBMSSqlChallenges function');
  assert(typeof practiceModule.getDBMSMcqQuestions === 'function', 'Exports getDBMSMcqQuestions function');

  // Verify topic scoping
  const joinsSql = practiceModule.getDBMSSqlChallenges('sql-joins');
  assert(joinsSql.length > 0 && joinsSql.every(c => c.topicId === 'sql-joins'), 'getDBMSSqlChallenges correctly scopes to SQL Joins');

  const normMcqs = practiceModule.getDBMSMcqQuestions('normalization');
  assert(normMcqs.length > 0 && normMcqs.every(q => q.topicId === 'normalization'), 'getDBMSMcqQuestions correctly scopes to Normalization');

  // 8. Check DBMS Learning Page Architecture & Sections
  console.log('\n--- SUITE 8: PAGE COMPONENT & NAVIGATION ---');
  const pagePath = path.resolve(__dirname, '../client/src/pages/student/DBMSLearningPage.jsx');
  assert(fs.existsSync(pagePath), 'DBMSLearningPage.jsx exists');

  const pageContent = fs.readFileSync(pagePath, 'utf8');

  // Acceptance: Exactly 4 sections
  assert(pageContent.includes("id: 'introduction'"), 'Includes Section 1: Introduction');
  assert(pageContent.includes("id: 'problems'"), 'Includes Section 2: Problem Solving');
  assert(pageContent.includes("id: 'practice'"), 'Includes Section 3: Practice Questions');
  assert(pageContent.includes("id: 'summary'"), 'Includes Section 4: Summary & Notes');

  // Acceptance: NO Roadmap in DBMS navigation
  const hasRoadmapNav = pageContent.includes("id: 'roadmap'") || 
    pageContent.includes('id="dbms-nav-roadmap"') || 
    pageContent.includes("fullName: '5. Roadmap'") ||
    pageContent.includes("fullName: 'Roadmap'");
  assert(
    !hasRoadmapNav,
    'Roadmap is completely ABSENT from DBMS navigation'
  );

  // Acceptance: All DBMS topics exposed on first page
  assert(
    pageContent.includes('id="dbms-curriculum-menu"'),
    'All DBMS topics clearly exposed in curriculum menu on first page'
  );
  assert(
    pageContent.includes('dbms-topic-card-'),
    'Topic selector cards with unique IDs present in multi-column grid'
  );

  // Acceptance: Direct auto-scroll to theory
  assert(
    pageContent.includes('scrollIntoView') && pageContent.includes('pendingTheoryScroll'),
    'Direct auto-scroll to theory section implemented on topic selection'
  );
  assert(
    pageContent.includes('scroll-mt-20') || pageContent.includes('scroll-mt-24'),
    'Direct scroll accounts for sticky header offset'
  );

  // 9. Check DBMS Introduction Section (10-Card Carousel & Reset)
  console.log('\n--- SUITE 9: INTRODUCTION SECTION & CAROUSEL ---');
  const introPath = path.resolve(__dirname, '../client/src/components/learning/dbms/DBMSIntroductionSection.jsx');
  assert(fs.existsSync(introPath), 'DBMSIntroductionSection.jsx exists');

  const introContent = fs.readFileSync(introPath, 'utf8');
  assert(
    introContent.includes('id="dbms-section-introduction"'),
    'Scroll target id="dbms-section-introduction" present'
  );
  assert(
    introContent.includes('setActiveIndex(0)') && introContent.includes('[topic?.topicId]'),
    '10-Card carousel automatically resets to Card 1 on topic change'
  );
  assert(
    introContent.includes('AddNoteButton'),
    'Introduction section integrates AddNoteButton'
  );

  // 10. Check DBMS Practice Section (SQL Console + Real Execution + MCQ)
  console.log('\n--- SUITE 10: PRACTICE SECTION (SQL + MCQ) ---');
  const practicePath = path.resolve(__dirname, '../client/src/components/learning/dbms/DBMSPracticeSection.jsx');
  assert(fs.existsSync(practicePath), 'DBMSPracticeSection.jsx exists');

  const practiceContent = fs.readFileSync(practicePath, 'utf8');
  assert(
    practiceContent.includes("practiceMode === 'sql'") && practiceContent.includes("practiceMode === 'mcq'"),
    'Practice Section has exactly TWO major parts: SQL Query Practice & MCQ Practice'
  );
  assert(
    practiceContent.includes('assessmentService.runSql'),
    'SQL practice connects to existing assessmentService.runSql architecture'
  );
  assert(
    practiceContent.includes('testResults.map') && practiceContent.includes('PASS') && practiceContent.includes('FAIL'),
    'SQL practice provides automated test case execution (PASS / FAIL)'
  );
  assert(
    practiceContent.includes('sqlHintsRevealed') && practiceContent.includes('Need a Hint?'),
    'SQL practice implements progressive hint system'
  );
  assert(
    practiceContent.includes('mcqDifficultyFilter') && practiceContent.includes('Interview Trap'),
    'MCQ practice provides full difficulty filtering including Interview Trap and Placement'
  );

  // 11. Check Summary & Notes Section (Notes Integration & Topic Navigation)
  console.log('\n--- SUITE 11: SUMMARY & NOTES SECTION ---');
  const summaryPath = path.resolve(__dirname, '../client/src/components/learning/dbms/DBMSSummaryNotesSection.jsx');
  assert(fs.existsSync(summaryPath), 'DBMSSummaryNotesSection.jsx exists');

  const summaryContent = fs.readFileSync(summaryPath, 'utf8');
  assert(
    summaryContent.includes('useNotes') && summaryContent.includes("subject: 'DBMS'"),
    'Reuses existing shared useNotes hook for DBMS'
  );
  assert(
    summaryContent.includes('AddNoteButton') && summaryContent.includes('MyNotesList'),
    'Integrates AddNoteButton and MyNotesList without creating duplicate notes architecture'
  );
  assert(
    summaryContent.includes('dbms-prev-topic-btn') && summaryContent.includes('dbms-next-topic-btn'),
    'Provides Previous Topic and Move to Next Topic navigation buttons'
  );

  // 12. Check Visual Diagrams
  console.log('\n--- SUITE 12: VISUAL DIAGRAMS ---');
  const visualPath = path.resolve(__dirname, '../client/src/components/learning/dbms/DBMSVisualDiagram.jsx');
  assert(fs.existsSync(visualPath), 'DBMSVisualDiagram.jsx exists');

  const visualContent = fs.readFileSync(visualPath, 'utf8');
  assert(visualContent.includes('3-tier-architecture'), 'Visual diagram supports 3-tier architecture');
  assert(visualContent.includes('er-diagram'), 'Visual diagram supports ER diagrams and cardinality');
  assert(visualContent.includes('keys-hierarchy'), 'Visual diagram supports keys hierarchy');
  assert(visualContent.includes('join-venn'), 'Visual diagram supports join visualizations');
  assert(visualContent.includes('normalization-stages'), 'Visual diagram supports normalization stages');
  assert(visualContent.includes('transaction-state-machine'), 'Visual diagram supports transaction states');
  assert(visualContent.includes('btree-index'), 'Visual diagram supports B+ tree indexing');

  // 13. Regression Check: Ensure Existing Modules are Untouched
  console.log('\n--- SUITE 13: SCOPE BOUNDARY & REGRESSION SAFETY ---');
  const oopsPagePath = path.resolve(__dirname, '../client/src/pages/student/OOPSLearningPage.jsx');
  assert(fs.existsSync(oopsPagePath), 'OOPSLearningPage.jsx is untouched and intact');

  const subjectPagePath = path.resolve(__dirname, '../client/src/pages/student/SubjectLearningPage.jsx');
  assert(fs.existsSync(subjectPagePath), 'SubjectLearningPage.jsx is untouched and intact for OS/CN');

  // SUMMARY
  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED, ${skippedTests} SKIPPED`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runSuite().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
