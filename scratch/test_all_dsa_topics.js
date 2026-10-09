import { DSA_TOPIC_REGISTRY } from '../client/src/data/dsaTopicDataRegistry.js';

console.log('====================================================');
console.log('MASTER DSA MULTI-TOPIC ARCHITECTURE AUDIT TEST');
console.log('====================================================');

const expectedTopics = [
  'two-pointers',
  'arrays',
  'sorting',
  'binary-search',
  'linked-list',
  'trees',
  'graphs',
  'dp'
];

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    totalPassed++;
  } else {
    console.error(`[FAIL] ${message}`);
    totalFailed++;
  }
}

// 1. Verify All 8 Topics Registered
expectedTopics.forEach((topicId) => {
  assert(DSA_TOPIC_REGISTRY[topicId] !== undefined, `Topic '${topicId}' is registered in DSA_TOPIC_REGISTRY.`);
});

// 2. Audit Each Topic's Complete 5-Section Assets
Object.keys(DSA_TOPIC_REGISTRY).forEach((topicId) => {
  const config = DSA_TOPIC_REGISTRY[topicId];
  console.log(`\n--- Auditing Topic: ${config.name} (${topicId}) ---`);

  // Section 1: Intro 10-Card Carousel
  assert(config.introData && config.introData.cards && config.introData.cards.length === 10, `${config.name} introData has 10 depth cards.`);

  const card9 = config.introData.cards.find((c) => c.cardNumber === 9 || c.isSyntaxCard);
  assert(card9 && card9.syntaxData && card9.syntaxData['C++'] && card9.syntaxData['Java'] && card9.syntaxData['Python'] && card9.syntaxData['JavaScript'], `${config.name} Card 9 syntax card supports 4 languages.`);

  // Section 2: Problem Examples
  assert(config.examples && config.examples.length >= 1, `${config.name} has at least 1 split-card problem example.`);

  // Section 3: Question Bank & Starter Code Leak Checks
  assert(config.questionBank && config.questionBank.length >= 5, `${config.name} questionBank has curated problems (${config.questionBank.length} questions).`);

  let solutionLeaks = 0;
  config.questionBank.forEach((q) => {
    ['Python', 'Java', 'C++', 'JavaScript'].forEach((lang) => {
      const stub = q.starterCode[lang] || '';
      // Check for leaks such as return actual answers or complete algorithms
      if (stub.includes('while (left < right)') && !topicId.includes('two-pointers')) solutionLeaks++;
      if (stub.includes('prices[i] - minPrice')) solutionLeaks++;
      if (stub.includes('max(currSum')) solutionLeaks++;
    });
  });

  assert(solutionLeaks === 0, `${config.name} question bank starter code has ZERO solution leaks.`);

  // Section 4: Patterns
  assert(config.patterns && config.patterns.length >= 4, `${config.name} has common patterns matrix (${config.patterns.length} patterns).`);

  // Section 5: Summary
  assert(config.summary && config.summary.takeawayTitle && config.summary.steps && config.summary.edgeCases, `${config.name} has complete summary & notes structure.`);
});

console.log('\n====================================================');
console.log(`FINAL RESULT: ${totalPassed} PASSED, ${totalFailed} FAILED`);
console.log('====================================================');

if (totalFailed > 0) process.exit(1);
