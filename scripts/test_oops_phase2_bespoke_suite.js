import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { OOPS_TOPIC_REGISTRY } from '../client/src/data/oops/oopsTopicDataRegistry.js';
import { getOOPSTopicCards, OOPS_TOPIC_CARDS } from '../client/src/data/oops/oopsTopicCardsData.js';

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
console.log('RUNNING OOPS PHASE 2 BESPOKE CURRICULUM VERIFICATION SUITE');
console.log('============================================================\n');

const PHASE2_TOPICS = ['encapsulation', 'abstraction', 'inheritance'];

console.log('1. Verifying Direct Resolution in OOPS_TOPIC_CARDS (Not via Factory)...');

test('All 3 Phase 2 topics are explicitly declared in OOPS_TOPIC_CARDS', () => {
  for (const tid of PHASE2_TOPICS) {
    assert(OOPS_TOPIC_CARDS[tid], `Topic ${tid} must be an explicit key in OOPS_TOPIC_CARDS`);
    assert(Array.isArray(OOPS_TOPIC_CARDS[tid]), `Topic ${tid} must be an array`);
    assert.strictEqual(OOPS_TOPIC_CARDS[tid].length, 10, `Topic ${tid} must have exactly 10 cards`);
  }
});

console.log('\n2. Verifying Card Schema & Handcrafted Pedagogical Depth...');

PHASE2_TOPICS.forEach((tid) => {
  const cards = getOOPSTopicCards(tid);

  test(`${tid} - Card 1 (What is it?): Has definition, simple words, and analogy`, () => {
    const c1 = cards[0];
    assert.strictEqual(c1.cardNumber, 1);
    assert(c1.title.includes('What is'), `Card 1 title must be What is... (got ${c1.title})`);
    assert(c1.simpleDef && c1.simpleDef.length > 30, 'Card 1 must have rich simpleDef');
    assert(c1.inSimpleWords, 'Card 1 must have inSimpleWords');
    assert(c1.realWorldAnalogy?.concept && c1.realWorldAnalogy?.example, 'Card 1 must have realWorldAnalogy');
    assert(c1.visualType, 'Card 1 must have visualType');
  });

  test(`${tid} - Card 2 (Why do we need it?): Has withoutVsWith comparison`, () => {
    const c2 = cards[1];
    assert.strictEqual(c2.cardNumber, 2);
    assert(c2.withoutVsWith, 'Card 2 must have withoutVsWith');
    assert(c2.withoutVsWith.withoutPoints?.length >= 3, 'Card 2 must have >= 3 withoutPoints');
    assert(c2.withoutVsWith.withPoints?.length >= 3, 'Card 2 must have >= 3 withPoints');
  });

  test(`${tid} - Card 3 (How does it work?): Has step-by-step flowSteps`, () => {
    const c3 = cards[2];
    assert.strictEqual(c3.cardNumber, 3);
    assert(c3.flowSteps && c3.flowSteps.length >= 4, 'Card 3 must have >= 4 flowSteps');
  });

  test(`${tid} - Card 4 (Syntax / Structure): Has Java, Python, C++ snippets & syntaxNotes`, () => {
    const c4 = cards[3];
    assert.strictEqual(c4.cardNumber, 4);
    assert(c4.codeSnippets?.Java, 'Card 4 must have Java codeSnippet');
    assert(c4.codeSnippets?.Python, 'Card 4 must have Python codeSnippet');
    assert(c4.codeSnippets?.['C++'], 'Card 4 must have C++ codeSnippet');
    assert(Array.isArray(c4.syntaxNotes) && c4.syntaxNotes.length >= 3, 'Card 4 must have >= 3 syntaxNotes');
  });

  test(`${tid} - Card 5 (Real-World Example): Has realWorldScenario model with entities/roles`, () => {
    const c5 = cards[4];
    assert.strictEqual(c5.cardNumber, 5);
    assert(c5.realWorldScenario, 'Card 5 must have realWorldScenario');
    assert(c5.realWorldScenario.roles || c5.realWorldScenario.parent || c5.realWorldScenario.domain, 'Card 5 must have structured scenario');
  });

  test(`${tid} - Card 6 (Types / Variations): Has typesList with practical variations`, () => {
    const c6 = cards[5];
    assert.strictEqual(c6.cardNumber, 6);
    assert(Array.isArray(c6.typesList) && c6.typesList.length >= 3, 'Card 6 must have >= 3 types in typesList');
  });

  test(`${tid} - Card 7 (Complete Working Example): Has multi-lang code, expectedOutput, and executionTrace`, () => {
    const c7 = cards[6];
    assert.strictEqual(c7.cardNumber, 7);
    assert(c7.codeSnippets?.Java && c7.codeSnippets?.Python && c7.codeSnippets?.['C++'], 'Card 7 has Java, Python, and C++ code');
    assert(c7.expectedOutput && c7.expectedOutput.length > 10, 'Card 7 has expectedOutput');
    assert(Array.isArray(c7.executionTrace) && c7.executionTrace.length >= 3, 'Card 7 has >= 3 step executionTrace');
  });

  test(`${tid} - Card 8 (Common Mistakes): Has mistakesList with ❌ mistake vs ✅ correct and interviewTrap`, () => {
    const c8 = cards[7];
    assert.strictEqual(c8.cardNumber, 8);
    assert(Array.isArray(c8.mistakesList) && c8.mistakesList.length >= 3, 'Card 8 has >= 3 mistakes in mistakesList');
    assert(c8.interviewTrap, 'Card 8 has interviewTrap');
  });

  test(`${tid} - Card 9 (Interview / Placement): Has interviewQuestions and companyTags`, () => {
    const c9 = cards[8];
    assert.strictEqual(c9.cardNumber, 9);
    assert(Array.isArray(c9.interviewQuestions) && c9.interviewQuestions.length >= 2, 'Card 9 has >= 2 interviewQuestions');
    assert(Array.isArray(c9.companyTags) && c9.companyTags.length >= 3, 'Card 9 has companyTags');
  });

  test(`${tid} - Card 10 (Quick Revision): Has 7-key cheatSheet`, () => {
    const c10 = cards[9];
    assert.strictEqual(c10.cardNumber, 10);
    assert(c10.cheatSheet, 'Card 10 has cheatSheet');
    assert(c10.cheatSheet.WHAT, 'Card 10 cheatSheet has WHAT');
    assert(c10.cheatSheet.WHY, 'Card 10 cheatSheet has WHY');
    assert(c10.cheatSheet.HOW, 'Card 10 cheatSheet has HOW');
    assert(c10.cheatSheet.KEY_POINT, 'Card 10 cheatSheet has KEY_POINT');
    assert(c10.cheatSheet.COMMON_TRAP, 'Card 10 cheatSheet has COMMON_TRAP');
    assert(c10.cheatSheet.INTERVIEW_TIP, 'Card 10 cheatSheet has INTERVIEW_TIP');
    assert(c10.cheatSheet.SYNTAX, 'Card 10 cheatSheet has SYNTAX');
  });
});

console.log('\n3. Verifying Specific Domain Execution Outputs for Phase 2...');

test('Encapsulation Card 7 demonstrates BankAccount deposit, withdrawal, and rejection', () => {
  const encCards = getOOPSTopicCards('encapsulation');
  const c7 = encCards[6];
  assert(c7.expectedOutput.includes('Initial balance: 1000'), 'Initial balance 1000');
  assert(c7.expectedOutput.includes('Deposit 500: Success'), 'Deposit 500 success');
  assert(c7.expectedOutput.includes('Withdraw 300: Success'), 'Withdraw 300 success');
  assert(c7.expectedOutput.includes('Withdraw 2000: Declined'), 'Withdraw 2000 declined');
  assert(c7.expectedOutput.includes('Final balance: 1200'), 'Final balance 1200');
});

test('Abstraction Card 7 demonstrates Payment interface with UPI and Card implementations', () => {
  const absCards = getOOPSTopicCards('abstraction');
  const c7 = absCards[6];
  assert(c7.expectedOutput.includes('Processing UPI payment: Rs. 500'), 'UPI payment output');
  assert(c7.expectedOutput.includes('Processing Card payment: Rs. 1200'), 'Card payment output');
  assert(c7.expectedOutput.includes('Payment completed: Checkout successful.'), 'Checkout completion');
});

test('Inheritance Card 7 demonstrates Animal base with Dog and Cat polymorphic overrides', () => {
  const inhCards = getOOPSTopicCards('inheritance');
  const c7 = inhCards[6];
  assert(c7.expectedOutput.includes('Buddy says: Woof Woof!'), 'Dog override output');
  assert(c7.expectedOutput.includes('Whiskers says: Meow Meow!'), 'Cat override output');
  assert(c7.expectedOutput.includes('Buddy is fetching the tennis ball!'), 'Dog specialized method output');
});

console.log('\n============================================================');
console.log(`PHASE 2 BESPOKE TEST RESULTS: ${passed} passed, ${failed} failed`);
console.log('============================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL OOPS PHASE 2 BESPOKE CURRICULUM CHECKS PASSED FLAWLESSLY! ✓\n');
}
