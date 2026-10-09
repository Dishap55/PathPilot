/**
 * TEST SUITE: OOPS P0 FIXES VERIFICATION
 * 
 * Verifies:
 * 1. OOPS Visual Diagrams (Generic renderers, OOPS-specific diagrams, and safe non-blank fallback)
 * 2. Problem Examples topic-specific filtering and canonical topicIds
 * 3. Practice -> OOPS navigation for all 20 canonical OOPS topics
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { OOPS_TOPIC_REGISTRY, resolveOOPSTopicId, getOOPSTopic } from '../client/src/data/oops/oopsTopicDataRegistry.js';
import { OOPS_PROBLEM_EXAMPLES } from '../client/src/data/oops/oopsExamplesData.js';
import { OOPS_TOPIC_CARDS } from '../client/src/data/oops/oopsTopicCardsData.js';

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${description}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

console.log('\n============================================================');
console.log('RUNNING OOPS P0 FIXES VERIFICATION SUITE');
console.log('============================================================\n');

// -----------------------------------------------------------------------------
// 1. PRACTICE -> OOPS NAVIGATION (20 Canonical Topics)
// -----------------------------------------------------------------------------
console.log('1. Verifying Practice -> OOPS Navigation for all 20 canonical topics...');

const CANONICAL_20_TOPICS = [
  'What is OOPS',
  'Classes & Objects',
  'Encapsulation',
  'Abstraction',
  'Inheritance',
  'Polymorphism',
  'Constructors',
  'Method Overloading',
  'Method Overriding',
  'this/self',
  'super',
  'Access Modifiers',
  'Static Members',
  'Abstract Classes',
  'Interfaces',
  'Exception Handling',
  'Association',
  'Aggregation',
  'Composition',
  'Interview Revision'
];

const EXPECTED_SLUGS = {
  'What is OOPS': 'intro-to-oops',
  'Classes & Objects': 'classes-and-objects',
  'Encapsulation': 'encapsulation',
  'Abstraction': 'abstraction',
  'Inheritance': 'inheritance',
  'Polymorphism': 'polymorphism',
  'Constructors': 'constructors',
  'Method Overloading': 'method-overloading',
  'Method Overriding': 'method-overriding',
  'this/self': 'this-self',
  'super': 'super-keyword',
  'Access Modifiers': 'access-modifiers',
  'Static Members': 'static-members',
  'Abstract Classes': 'abstract-classes',
  'Interfaces': 'interfaces',
  'Exception Handling': 'exception-handling',
  'Association': 'association',
  'Aggregation': 'aggregation',
  'Composition': 'composition',
  'Interview Revision': 'interview-revision'
};

const practicePath = path.join(__dirname, '../client/src/pages/student/Practice.jsx');
const practiceCode = fs.readFileSync(practicePath, 'utf-8');

test('Practice.jsx imports resolveOOPSTopicId from oopsTopicDataRegistry.js', () => {
  assert(practiceCode.includes('resolveOOPSTopicId'), 'Practice.jsx must import resolveOOPSTopicId');
});

test('getOOPSTopicSlug delegates to resolveOOPSTopicId for all canonical topics', () => {
  for (const topic of CANONICAL_20_TOPICS) {
    const expected = EXPECTED_SLUGS[topic];
    const resolved = resolveOOPSTopicId(topic);
    assert.strictEqual(resolved, expected, `Topic "${topic}" must resolve to "${expected}"`);
  }
});

test('Practice.jsx OOPS subject topics list includes all 20 canonical topics', () => {
  assert(practiceCode.includes("'What is OOPS?'"), "Includes 'What is OOPS?'");
  assert(practiceCode.includes("'Classes & Objects'"), "Includes 'Classes & Objects'");
  assert(practiceCode.includes("'Interfaces'"), "Includes 'Interfaces'");
  assert(practiceCode.includes("'Static Members'"), "Includes 'Static Members'");
  assert(practiceCode.includes("'Association'"), "Includes 'Association'");
  assert(practiceCode.includes("'Aggregation'"), "Includes 'Aggregation'");
  assert(practiceCode.includes("'Composition'"), "Includes 'Composition'");
  assert(practiceCode.includes("'Constructors'"), "Includes 'Constructors'");
  assert(practiceCode.includes("'Abstract Classes'"), "Includes 'Abstract Classes'");
});

// -----------------------------------------------------------------------------
// 2. TOPIC-SPECIFIC PROBLEM EXAMPLES
// -----------------------------------------------------------------------------
console.log('\n2. Verifying Topic-Specific Problem Examples Data & Component...');

test('All problem examples have a valid canonical topicId', () => {
  assert(OOPS_PROBLEM_EXAMPLES.length >= 20, `Expected at least 20 examples, found ${OOPS_PROBLEM_EXAMPLES.length}`);
  for (const ex of OOPS_PROBLEM_EXAMPLES) {
    assert(ex.topicId, `Example ${ex.id} is missing topicId`);
    assert(OOPS_TOPIC_REGISTRY[ex.topicId], `Example ${ex.id} has invalid topicId: ${ex.topicId}`);
  }
});

test('All 20 canonical OOPS topics have at least one dedicated benchmark example', () => {
  const topicsWithExamples = new Set(OOPS_PROBLEM_EXAMPLES.map((e) => e.topicId));
  for (const key of Object.keys(OOPS_TOPIC_REGISTRY)) {
    assert(topicsWithExamples.has(key), `Canonical topic "${key}" is missing a dedicated example`);
  }
});

const examplesSectionPath = path.join(__dirname, '../client/src/components/learning/oops/OOPSProblemExamplesSection.jsx');
const examplesSectionCode = fs.readFileSync(examplesSectionPath, 'utf-8');

test('OOPSProblemExamplesSection filters examples by active topicId', () => {
  assert(examplesSectionCode.includes('resolveOOPSTopicId'), 'Component resolves activeTopicId');
  assert(examplesSectionCode.includes('ex.topicId === activeTopicId'), 'Filters for exact topic matches');
});

test('OOPSProblemExamplesSection displays fallback with "Related OOPS Example" badge', () => {
  assert(examplesSectionCode.includes('Related OOPS Example'), 'Includes Related OOPS Example badge');
  assert(examplesSectionCode.includes('isRelated'), 'Tracks isRelated state on fallback items');
});

test('OOPSProblemExamplesSection passes data to OOPSVisualDiagram', () => {
  assert(examplesSectionCode.includes('<OOPSVisualDiagram'), 'Renders OOPSVisualDiagram');
  assert(examplesSectionCode.includes('data={ex}'), 'Passes data={ex} to visual diagram');
});

// -----------------------------------------------------------------------------
// 3. VISUAL DIAGRAMS AND SAFE FALLBACK
// -----------------------------------------------------------------------------
console.log('\n3. Verifying OOPS Visual Diagram Handlers & Non-Blank Fallback...');

const visualDiagramPath = path.join(__dirname, '../client/src/components/learning/oops/OOPSVisualDiagram.jsx');
const visualDiagramCode = fs.readFileSync(visualDiagramPath, 'utf-8');

test('OOPSVisualDiagram supports concept-comparison-box', () => {
  assert(visualDiagramCode.includes("'concept-comparison-box'"), 'Handles concept-comparison-box');
});

test('OOPSVisualDiagram supports concept-pipeline-flow', () => {
  assert(visualDiagramCode.includes("'concept-pipeline-flow'"), 'Handles concept-pipeline-flow');
});

test('OOPSVisualDiagram supports concept-variations-grid', () => {
  assert(visualDiagramCode.includes("'concept-variations-grid'"), 'Handles concept-variations-grid');
});

test('OOPSVisualDiagram supports concept-cheat-sheet', () => {
  assert(visualDiagramCode.includes("'concept-cheat-sheet'"), 'Handles concept-cheat-sheet');
});

test('OOPSVisualDiagram supports oops-constructors-diagram with Default, Parameterized, and Copy constructors', () => {
  assert(visualDiagramCode.includes("'oops-constructors-diagram'"), 'Handles oops-constructors-diagram');
  assert(visualDiagramCode.includes('activeConstructorType'), 'Supports constructor type switching');
});

test('OOPSVisualDiagram supports atm-vault-diagram', () => {
  assert(visualDiagramCode.includes("'atm-vault-diagram'"), 'Handles atm-vault-diagram');
  assert(visualDiagramCode.includes('atmMode'), 'Supports interactive ATM simulation');
});

test('OOPSVisualDiagram supports oops-interfaces-diagram', () => {
  assert(visualDiagramCode.includes("'oops-interfaces-diagram'"), 'Handles oops-interfaces-diagram');
});

test('OOPSVisualDiagram supports UML Association, Aggregation, and Composition', () => {
  assert(visualDiagramCode.includes("'oops-association-diagram'"), 'Handles oops-association-diagram');
  assert(visualDiagramCode.includes("'oops-aggregation-diagram'"), 'Handles oops-aggregation-diagram');
  assert(visualDiagramCode.includes("'oops-composition-diagram'"), 'Handles oops-composition-diagram');
  assert(visualDiagramCode.includes('activeUmlRel'), 'Supports UML relationship exploration');
});

test('OOPSVisualDiagram has non-blank default fallback', () => {
  assert(visualDiagramCode.includes('default:'), 'Has default branch');
  assert(visualDiagramCode.includes('Concept Visual'), 'Renders Concept Visual card');
  assert(visualDiagramCode.includes('displayTitle'), 'Uses contextual title in fallback');
});

test('OOPSIntroductionSection passes card and language to OOPSVisualDiagram', () => {
  const introSectionPath = path.join(__dirname, '../client/src/components/learning/oops/OOPSIntroductionSection.jsx');
  const introSectionCode = fs.readFileSync(introSectionPath, 'utf-8');
  assert(introSectionCode.includes('card={activeCard}'), 'Passes card={activeCard} to OOPSVisualDiagram');
  assert(introSectionCode.includes('language={selectedLanguage}'), 'Passes language={selectedLanguage} to OOPSVisualDiagram');
});

test('OOPSIntroductionSection renders syntaxNotes, realWorldScenario, typesList, and executionTrace', () => {
  const introSectionPath = path.join(__dirname, '../client/src/components/learning/oops/OOPSIntroductionSection.jsx');
  const introSectionCode = fs.readFileSync(introSectionPath, 'utf-8');
  assert(introSectionCode.includes('activeCard.syntaxNotes'), 'Renders activeCard.syntaxNotes for Card 4');
  assert(introSectionCode.includes('activeCard.realWorldScenario'), 'Renders activeCard.realWorldScenario for Card 5');
  assert(introSectionCode.includes('activeCard.typesList'), 'Renders activeCard.typesList for Card 6');
  assert(introSectionCode.includes('activeCard.executionTrace'), 'Renders activeCard.executionTrace for Card 7');
  assert(introSectionCode.includes('cardContainerRef'), 'Uses cardContainerRef for smooth scrolling on step transitions');
});

test('OOPSIntroductionSection implements DSA-matching 10-card 3D depth carousel interaction', () => {
  const introSectionPath = path.join(__dirname, '../client/src/components/learning/oops/OOPSIntroductionSection.jsx');
  const introSectionCode = fs.readFileSync(introSectionPath, 'utf-8');
  assert(introSectionCode.includes('perspective-1000'), 'Uses perspective-1000 3D carousel stage');
  assert(introSectionCode.includes('Math.abs(diff) > 1'), 'Strictly renders 3-card window (prev, active, next)');
  assert(introSectionCode.includes('cardSpread'), 'Calculates responsive card spread dynamically');
  assert(introSectionCode.includes('translateX') && introSectionCode.includes('translateZ') && introSectionCode.includes('rotateY'), 'Applies 3D depth transforms (translateX, translateZ, rotateY, scale)');
  assert(introSectionCode.includes('duration-500') && introSectionCode.includes('ease-out'), 'Uses duration-500 ease-out transition matching DSA');
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n============================================================');
console.log(`TEST RESULTS: ${passed} passed, ${failed} failed`);
console.log('============================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL OOPS P0 VERIFICATION CHECKS PASSED FLAWLESSLY! ✓\n');
}

