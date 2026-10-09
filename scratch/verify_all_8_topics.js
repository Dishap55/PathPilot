const fs = require('fs');
const path = require('path');

// We will inspect the registry data for all 8 topics
const topicKeys = [
  'two-pointers',
  'arrays',
  'sorting',
  'binary-search',
  'linked-list',
  'trees',
  'graphs',
  'dp'
];

// Read registry and intro files
const registryContent = fs.readFileSync(path.join(__dirname, '../client/src/data/dsaTopicDataRegistry.js'), 'utf8');
const dsaPageContent = fs.readFileSync(path.join(__dirname, '../client/src/pages/student/DSALearningPage.jsx'), 'utf8');
const practiceContent = fs.readFileSync(path.join(__dirname, '../client/src/components/learning/DSAPracticeWorkflow.jsx'), 'utf8');

console.log('==================================================');
console.log('COMPREHENSIVE AUDIT OF ALL 8 DSA TOPICS');
console.log('==================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ ${message}`);
    failCount++;
  }
}

// Test 1: Registry contains all 8 topics
console.log('1. Checking DSA_TOPIC_REGISTRY completeness:');
topicKeys.forEach(t => {
  assert(registryContent.includes(`'${t}':`), `Topic key '${t}' mapped in registry.`);
});

// Test 2: Single unified DSATopicIntroduction component in DSALearningPage
console.log('\n2. Checking single unified DSATopicIntroduction component usage:');
assert(!dsaPageContent.includes('<TwoPointersIntroduction />'), 'No hardcoded <TwoPointersIntroduction /> in DSALearningPage.');
assert(dsaPageContent.includes('<DSATopicIntroduction introData={currentTopicConfig.introData} />'), 'All topics use <DSATopicIntroduction introData={...} />');

// Test 3: Check DSAPracticeWorkflow for dynamic headers and concept questions
console.log('\n3. Checking DSAPracticeWorkflow for topic consistency:');
assert(practiceContent.includes('{currentTopicName} Practice Bank'), 'Practice bank header uses {currentTopicName}.');
assert(practiceContent.includes('Curated {currentTopicName} Question Bank'), 'Catalog modal header uses {currentTopicName}.');
assert(practiceContent.includes('CONCEPT_QUESTIONS_BY_TOPIC'), 'Topic-specific concept questions mapped.');

// Test 4: Verify syntax data for all 8 topics
const syntaxContent = fs.readFileSync(path.join(__dirname, '../client/src/data/dsaSyntaxData.js'), 'utf8');
console.log('\n4. Checking dsaSyntaxData.js for all 8 topics:');
const expectedSyntaxKeys = ['two-pointers', 'arrays', 'sorting', 'binary-search', 'linked-list', 'trees', 'graphs', 'dp'];
expectedSyntaxKeys.forEach(t => {
  assert(syntaxContent.includes(`'${t}':`), `Syntax entries for '${t}' present.`);
});

console.log('\n==================================================');
console.log(`AUDIT RESULTS: ${passCount} PASSED, ${failCount} FAILED.`);
console.log('==================================================');
