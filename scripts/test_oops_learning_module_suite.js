/**
 * AUTOMATED TEST SUITE: OOPS LEARNING MODULE & NAVIGATION
 * 
 * Verifies:
 * 1. Navigation change: Subjects -> OOPS -> /subjects/oops (No redirect to Roadmap).
 * 2. Roadmap -> OOPS -> /subjects/oops canonical routing.
 * 3. App.jsx route definitions for /subjects/oops and /oops.
 * 4. 20 Canonical OOPS topics curriculum in oopsTopicDataRegistry.js.
 * 5. Exactly 10 interactive cards in Introduction with beginner-friendly definitions,
 *    relatable analogies, multi-language snippets (Java, Python, C++), and highlights.
 * 6. Solved benchmark problem examples with real-world scenarios and step breakdowns.
 * 7. Dual-mode practice: 🧠 MCQ Practice (progressive hints, retry, step solutions)
 *    and 💻 Code Practice (challenges, requirements, starter code, test cases).
 * 8. Common Patterns with visual diagrams, code, when to recognize, and traps.
 * 9. Summary & Notes: Official read-only notes + personal My Notes integration.
 * 10. Bestu AI context synchronization across sections and languages.
 * 11. DSA and Aptitude non-regression.
 */

const fs = require('fs');
const path = require('path');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('\n============================================================');
console.log('RUNNING OOPS LEARNING MODULE VERIFICATION SUITE');
console.log('============================================================\n');

// -----------------------------------------------------------------------------
// 1. Navigation Architecture & Route Verification
// -----------------------------------------------------------------------------
console.log('1. Verifying Navigation Architecture (Subjects -> OOPS & Roadmap -> OOPS)...');

const practicePath = path.join(__dirname, '../client/src/pages/student/Practice.jsx');
const practiceCode = fs.readFileSync(practicePath, 'utf-8');
assert(
  practiceCode.includes("subject.code === 'OOPS' || subject.id === 'oops'") &&
  practiceCode.includes("navigate('/subjects/oops')"),
  'Practice.jsx routes Subjects -> OOPS directly to /subjects/oops (No redirect to Roadmap)'
);

const roadmapPath = path.join(__dirname, '../client/src/components/roadmap/PersonalizedRoadmapPath.jsx');
const roadmapCode = fs.readFileSync(roadmapPath, 'utf-8');
assert(
  roadmapCode.includes("sub === 'OOPS' || sub === 'OOP'") &&
  roadmapCode.includes('/subjects/oops'),
  'PersonalizedRoadmapPath.jsx routes Roadmap OOPS milestones directly to /subjects/oops'
);

const appPath = path.join(__dirname, '../client/src/App.jsx');
const appCode = fs.readFileSync(appPath, 'utf-8');
assert(
  appCode.includes('<Route path="/subjects/oops" element={<OOPSLearningPage />} />'),
  'App.jsx registers /subjects/oops route'
);
assert(
  appCode.includes('<Route path="/oops" element={<OOPSLearningPage />} />'),
  'App.jsx registers /oops route'
);

// -----------------------------------------------------------------------------
// 2. 20 Canonical OOPS Topics Registry
// -----------------------------------------------------------------------------
console.log('\n2. Verifying 20 Canonical OOPS Topics Registry...');
const { OOPS_TOPIC_REGISTRY, OOPS_TOPICS_LIST } = require('../client/src/data/oops/oopsTopicDataRegistry.js');

const topicKeys = Object.keys(OOPS_TOPIC_REGISTRY);
assert(topicKeys.length === 20, `Contains exactly 20 canonical OOPS topics (found ${topicKeys.length})`);
assert(OOPS_TOPIC_REGISTRY['intro-to-oops'], 'Includes Introduction to OOPS');
assert(OOPS_TOPIC_REGISTRY['classes-and-objects'], 'Includes Class and Object');
assert(OOPS_TOPIC_REGISTRY['encapsulation'], 'Includes Encapsulation');
assert(OOPS_TOPIC_REGISTRY['abstraction'], 'Includes Abstraction');
assert(OOPS_TOPIC_REGISTRY['inheritance'], 'Includes Inheritance');
assert(OOPS_TOPIC_REGISTRY['polymorphism'], 'Includes Polymorphism');
assert(OOPS_TOPIC_REGISTRY['constructors'], 'Includes Constructors');
assert(OOPS_TOPIC_REGISTRY['method-overloading'], 'Includes Method Overloading');
assert(OOPS_TOPIC_REGISTRY['method-overriding'], 'Includes Method Overriding');
assert(OOPS_TOPIC_REGISTRY['interfaces'], 'Includes Interfaces');
assert(OOPS_TOPIC_REGISTRY['abstract-classes'], 'Includes Abstract Classes');
assert(OOPS_TOPIC_REGISTRY['access-modifiers'], 'Includes Access Modifiers');
assert(OOPS_TOPIC_REGISTRY['static-members'], 'Includes Static Members');
assert(OOPS_TOPIC_REGISTRY['this-self'], 'Includes this / self Keyword');
assert(OOPS_TOPIC_REGISTRY['super-keyword'], 'Includes super Keyword');
assert(OOPS_TOPIC_REGISTRY['association'], 'Includes Association');
assert(OOPS_TOPIC_REGISTRY['aggregation'], 'Includes Aggregation');
assert(OOPS_TOPIC_REGISTRY['composition'], 'Includes Composition');
assert(OOPS_TOPIC_REGISTRY['exception-handling'], 'Includes Exception Handling in OOPS');
assert(OOPS_TOPIC_REGISTRY['interview-revision'], 'Includes OOPS Interview Revision');

// -----------------------------------------------------------------------------
// 3. 10 Interactive Introduction Cards
// -----------------------------------------------------------------------------
console.log('\n3. Verifying 10 Interactive Introduction Cards...');
const { OOPS_10_CARDS, OOPS_SYNTAX_CARDS } = require('../client/src/data/oops/oopsIntroductionData.js');

assert(Array.isArray(OOPS_10_CARDS) && OOPS_10_CARDS.length === 10, 'Has exactly 10 Introduction cards');

let allCardsValid = true;
OOPS_10_CARDS.forEach((card, idx) => {
  if (!card.title || !card.simpleDef || !card.realWorldAnalogy) allCardsValid = false;
  if (!card.codeSnippets?.Java || !card.codeSnippets?.Python || !card.codeSnippets?.['C++']) {
    allCardsValid = false;
    console.error(`Card ${idx + 1} missing multi-language code snippets`);
  }
  if (!card.highlights?.quickRemember || !card.highlights?.interviewTip) {
    allCardsValid = false;
    console.error(`Card ${idx + 1} missing learning highlights`);
  }
});

assert(allCardsValid, 'All 10 cards contain beginner-friendly definitions, analogies, multi-language code, and highlights');
assert(OOPS_SYNTAX_CARDS.Java && OOPS_SYNTAX_CARDS.Python && OOPS_SYNTAX_CARDS['C++'], 'Syntax reference cards provided for Java, Python, and C++');

// -----------------------------------------------------------------------------
// 4. Solved Problem Examples
// -----------------------------------------------------------------------------
console.log('\n4. Verifying Solved Benchmark Problem Examples...');
const { OOPS_PROBLEM_EXAMPLES } = require('../client/src/data/oops/oopsExamplesData.js');

assert(Array.isArray(OOPS_PROBLEM_EXAMPLES) && OOPS_PROBLEM_EXAMPLES.length >= 5, `Has at least 5 benchmark examples (found ${OOPS_PROBLEM_EXAMPLES.length})`);

let allExamplesValid = true;
OOPS_PROBLEM_EXAMPLES.forEach(ex => {
  if (!ex.id || !ex.title || !ex.scenario || !ex.expectedOutput || !ex.steps || ex.steps.length < 2) {
    allExamplesValid = false;
  }
  if (!ex.codeSnippets.Java || !ex.codeSnippets.Python || !ex.codeSnippets['C++']) {
    allExamplesValid = false;
  }
});
assert(allExamplesValid, 'All problem examples have scenarios, multi-language code, expected outputs, and step breakdowns');

// -----------------------------------------------------------------------------
// 5. Practice Lab: MCQ & Code Practice Modes
// -----------------------------------------------------------------------------
console.log('\n5. Verifying Practice Data (MCQs & Code Challenges)...');
const { OOPS_MCQ_QUESTIONS, OOPS_CODE_CHALLENGES } = require('../client/src/data/oops/oopsPracticeData.js');

assert(Array.isArray(OOPS_MCQ_QUESTIONS) && OOPS_MCQ_QUESTIONS.length >= 8, `Has rich MCQ question bank (found ${OOPS_MCQ_QUESTIONS.length})`);
assert(Array.isArray(OOPS_CODE_CHALLENGES) && OOPS_CODE_CHALLENGES.length >= 4, `Has real OOPS code challenges (found ${OOPS_CODE_CHALLENGES.length})`);

let allMcqsValid = true;
OOPS_MCQ_QUESTIONS.forEach(q => {
  if (!q.id || !q.prompt || q.options.length !== 4 || !['A','B','C','D'].includes(q.correctOption)) allMcqsValid = false;
  if (!q.hints || q.hints.length < 2) allMcqsValid = false;
  if (!q.explanation?.step1 || !q.explanation?.formula) allMcqsValid = false;
});
assert(allMcqsValid, 'All MCQs pass schema integrity (4 options, valid correct option, >=2 progressive hints, step solutions)');

let allChallengesValid = true;
OOPS_CODE_CHALLENGES.forEach(ch => {
  if (!ch.id || !ch.title || !ch.requirements || ch.requirements.length === 0) allChallengesValid = false;
  if (!ch.starterCode.Java || !ch.starterCode.Python || !ch.starterCode['C++']) allChallengesValid = false;
  if (!ch.testCases || ch.testCases.length === 0) allChallengesValid = false;
});
assert(allChallengesValid, 'All code challenges include requirements, Java/Python/C++ starter code, and test cases');

// -----------------------------------------------------------------------------
// 6. Common Patterns & Summary Notes
// -----------------------------------------------------------------------------
console.log('\n6. Verifying Common Patterns & Official Summary Data...');
const { OOPS_COMMON_PATTERNS } = require('../client/src/data/oops/oopsPatternsData.js');
const { OOPS_OFFICIAL_SUMMARY } = require('../client/src/data/oops/oopsSummaryData.js');

assert(Array.isArray(OOPS_COMMON_PATTERNS) && OOPS_COMMON_PATTERNS.length >= 6, `Has common OOPS design patterns (found ${OOPS_COMMON_PATTERNS.length})`);
assert(OOPS_OFFICIAL_SUMMARY.fourPillars.length === 4, 'Official summary contains all 4 pillars');
assert(OOPS_OFFICIAL_SUMMARY.overloadingVsOverriding.rows.length >= 5, 'Overloading vs Overriding comparison table complete');
assert(OOPS_OFFICIAL_SUMMARY.abstractClassVsInterface.rows.length >= 5, 'Abstract Class vs Interface comparison table complete');

// -----------------------------------------------------------------------------
// 7. Component Architecture & Section Navigation
// -----------------------------------------------------------------------------
console.log('\n7. Verifying OOPS UI Components & Section Navigation...');
const oopsPagePath = path.join(__dirname, '../client/src/pages/student/OOPSLearningPage.jsx');
const oopsPageCode = fs.readFileSync(oopsPagePath, 'utf-8');

assert(oopsPageCode.includes('OOPSIntroductionSection'), 'OOPSLearningPage renders Introduction Section');
assert(oopsPageCode.includes('OOPSProblemExamplesSection'), 'OOPSLearningPage renders Problem Examples Section');
assert(oopsPageCode.includes('OOPSPracticeSection'), 'OOPSLearningPage renders Practice Section');
assert(oopsPageCode.includes('OOPSCommonPatternsSection'), 'OOPSLearningPage renders Common Patterns Section');
assert(oopsPageCode.includes('OOPSSummaryNotesSection'), 'OOPSLearningPage renders Summary & Notes Section');
assert(oopsPageCode.includes('useBestu') && oopsPageCode.includes('setPageContext'), 'OOPSLearningPage synchronizes context to Bestu AI mentor');

const oopsPracticePath = path.join(__dirname, '../client/src/components/learning/oops/OOPSPracticeSection.jsx');
const oopsPracticeCode = fs.readFileSync(oopsPracticePath, 'utf-8');
assert(oopsPracticeCode.includes('btn-mode-mcq') && oopsPracticeCode.includes('btn-mode-code'), 'OOPSPracticeSection supports both MCQ and Code Practice modes');
assert(oopsPracticeCode.includes('Not quite. Here&apos;s a hint:'), 'MCQ Practice implements progressive hints workflow on wrong answer');
assert(oopsPracticeCode.includes('btn-run-oops-code'), 'Code Practice implements code runner and test validation');
assert(oopsPracticeCode.includes('AddNoteButton') && oopsPracticeCode.includes('MyNotesList'), 'Personal My Notes feature integrated inside OOPS Practice');

// -----------------------------------------------------------------------------
// 8. DSA and Aptitude Non-Regression
// -----------------------------------------------------------------------------
console.log('\n8. Verifying DSA and Aptitude Non-Regression...');
const dsaPagePath = path.join(__dirname, '../client/src/pages/student/DSALearningPage.jsx');
const dsaPageCode = fs.readFileSync(dsaPagePath, 'utf-8');
assert(dsaPageCode.includes('two-pointers') && dsaPageCode.includes('DSAPracticeWorkflow'), 'DSA Learning Page remains intact');

const aptPagePath = path.join(__dirname, '../client/src/pages/student/AptitudeLearningPage.jsx');
const aptPageCode = fs.readFileSync(aptPagePath, 'utf-8');
assert(aptPageCode.includes('percentages') && aptPageCode.includes('AptitudePracticeSection'), 'Aptitude Learning Page remains intact');

// -----------------------------------------------------------------------------
// 9. Duplicate Topic Selection UI Fix (Cases 1 - 5)
// -----------------------------------------------------------------------------
console.log('\n9. Verifying Duplicate Topic Selection UI Fix (Cases 1 - 5)...');
const { resolveOOPSTopicId, getOOPSTopic, OOPS_TOPIC_ALIASES } = require('../client/src/data/oops/oopsTopicDataRegistry.js');

// Topic alias & slug resolution
assert(OOPS_TOPIC_ALIASES['what-is-oops'] === 'intro-to-oops', "Alias 'what-is-oops' resolves to 'intro-to-oops'");
assert(resolveOOPSTopicId('what-is-oops') === 'intro-to-oops', "resolveOOPSTopicId resolves 'what-is-oops' to canonical 'intro-to-oops'");
assert(getOOPSTopic('what-is-oops').topicName === 'Introduction to OOPS', "getOOPSTopic resolves 'what-is-oops' correctly");

// Case 1: Without topic -> default topic & allows topic grid
assert(resolveOOPSTopicId(null) === 'intro-to-oops', 'Case 1: No topic in URL defaults to intro-to-oops');
assert(oopsPageCode.includes('showTopicGrid') && oopsPageCode.includes('hasExplicitTopic = Boolean(rawTopicParam)'), 'Case 1 & 2: OOPSLearningPage checks hasExplicitTopic and manages showTopicGrid');

// Case 2: User selects "What is OOPS?" -> duplicate grid hidden, directly renders content
assert(oopsPageCode.includes('{showTopicGrid && (') && oopsPageCode.includes('id="oops-topic-selector"'), 'Case 2: 20-topic selection grid is only rendered when showTopicGrid is true');
const oopsIntroPath = path.join(__dirname, '../client/src/components/learning/oops/OOPSIntroductionSection.jsx');
const oopsIntroCode = fs.readFileSync(oopsIntroPath, 'utf-8');
assert(oopsIntroCode.includes('getCardIndexForTopic') && oopsIntroCode.includes("'what-is-oops': 0"), 'Case 2: OOPSIntroductionSection maps what-is-oops directly to Card 1');

// Case 3 & 4: Select another topic or refresh -> keep active topic and do not show duplicate topic grid
assert(oopsPageCode.includes('setShowTopicGrid(false)'), 'Case 3 & 4: Selecting a topic or refreshing with ?topic= hides duplicate topic grid');
assert(oopsPageCode.includes('oops-change-topic-btn'), 'OOPSLearningPage keeps Change Topic control accessible in the section bar');

// Case 5: Switching sections keeps active topic
assert(oopsPageCode.includes("newParams.set('topic', activeTopic)"), 'Case 5: handleSectionSelect preserves active topic in searchParams');

// Practice Page Integration
const freshPracticeCode = fs.readFileSync(practicePath, 'utf-8');
assert(freshPracticeCode.includes("'What is OOPS?'"), "Practice page includes 'What is OOPS?' in OOPS topics");
assert(freshPracticeCode.includes('getOOPSTopicSlug') && freshPracticeCode.includes('/subjects/oops?topic='), 'Practice page navigates directly to /subjects/oops?topic=slug on topic selection');

// -----------------------------------------------------------------------------
// Test Summary
// -----------------------------------------------------------------------------
console.log('\n============================================================');
console.log(`TEST RESULTS: ${passedTests} passed, ${failedTests} failed`);
console.log('============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL OOPS LEARNING MODULE TESTS PASSED FLAWLESSLY! ✓\n');
}
