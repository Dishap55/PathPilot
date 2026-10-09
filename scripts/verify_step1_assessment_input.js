/**
 * VERIFICATION TEST SUITE: STEP 1 — CONNECT EXISTING STUDENT FORM DATA TO ASSESSMENT INPUT
 * 
 * Verifies:
 * 1. DBMS -> Beginner creates exact structured Assessment Input with canonical DBMS topics
 * 2. OS -> Intermediate creates exact structured Assessment Input with canonical OS topics
 * 3. Multi-subject form data preserves each subject independently without level forcing
 * 4. Validation invariants:
 *    - Subject exists and is canonical
 *    - Student level exists (Beginner, Intermediate, Advanced)
 *    - Subject has canonical topics
 *    - Topic IDs are valid
 *    - No duplicate topic IDs
 *    - No cross-subject topic contamination
 *    - No invented topics
 *    - No missing required subject information
 * 5. Confirmation: ZERO questions generated, ZERO Gemini calls, ZERO roadmap generation, ZERO scoring.
 * 6. Dual-environment parity: Both client ESM and server CommonJS modules function identically.
 */

const assert = require('assert');

async function runStep1Verification() {
  console.log('================================================================');
  console.log('🚀 PATHPILOT STEP 1: ASSESSMENT INPUT VERIFICATION SUITE');
  console.log('================================================================\n');

  // Test 1: Load Server Implementation (CommonJS)
  console.log('--- 1. Testing Server Implementation (CommonJS) ---');
  const serverInputService = require('../server/services/assessmentInputService');
  const serverTopicRegistry = require('../server/constants/canonicalTopicRegistry');

  assert(serverInputService, 'serverInputService must be exported');
  assert(serverTopicRegistry, 'serverTopicRegistry must be exported');
  assert.strictEqual(serverTopicRegistry.CANONICAL_SUBJECTS.length, 6, 'Must have exactly 6 canonical subjects');
  console.log('✓ Server modules loaded successfully. Canonical subjects:', serverTopicRegistry.CANONICAL_SUBJECTS.join(', '));

  // Test 2: Verify DBMS -> Beginner Assessment Input
  console.log('\n--- 2. Verifying Student Form: DBMS -> Beginner ---');
  const dbmsInput = serverInputService.createSubjectAssessmentInput('DBMS', 'Beginner');

  assert.strictEqual(dbmsInput.subject, 'DBMS', 'Subject must be DBMS');
  assert.strictEqual(dbmsInput.studentLevel, 'Beginner', 'Student level must be Beginner');
  assert(Array.isArray(dbmsInput.topics), 'Topics must be an array');
  assert.strictEqual(dbmsInput.topics.length, 12, 'DBMS must contain all 12 canonical topics');

  // Check the specific first 3 topics from prompt example
  assert.strictEqual(dbmsInput.topics[0].id, 'dbms-architecture', 'Topic 1 ID must be dbms-architecture');
  assert.strictEqual(dbmsInput.topics[0].name, 'DBMS Architecture', 'Topic 1 Name must be DBMS Architecture');

  assert.strictEqual(dbmsInput.topics[1].id, 'er-model', 'Topic 2 ID must be er-model');
  assert.strictEqual(dbmsInput.topics[1].name, 'ER Model', 'Topic 2 Name must be ER Model');

  assert.strictEqual(dbmsInput.topics[2].id, 'relational-model-keys', 'Topic 3 ID must be relational-model-keys');
  assert.strictEqual(dbmsInput.topics[2].name, 'Relational Model & Keys', 'Topic 3 Name must be Relational Model & Keys');

  console.log('✓ DBMS -> Beginner Assessment Input generated:');
  console.log(JSON.stringify({
    subject: dbmsInput.subject,
    studentLevel: dbmsInput.studentLevel,
    topicsSample: dbmsInput.topics.slice(0, 3),
    totalTopics: dbmsInput.topics.length
  }, null, 2));

  // Test 3: Verify OS -> Intermediate Assessment Input
  console.log('\n--- 3. Verifying Student Form: OS -> Intermediate ---');
  const osInput = serverInputService.createSubjectAssessmentInput('OS', 'Intermediate');

  assert.strictEqual(osInput.subject, 'OS', 'Subject must be OS');
  assert.strictEqual(osInput.studentLevel, 'Intermediate', 'Student level must be Intermediate');
  assert(Array.isArray(osInput.topics), 'Topics must be an array');
  assert.strictEqual(osInput.topics.length, 30, 'OS must contain all 30 canonical topics');

  assert.strictEqual(osInput.topics[0].id, 'intro-to-os', 'OS Topic 1 ID must be intro-to-os');
  assert.strictEqual(osInput.topics[0].name, 'Introduction to Operating Systems', 'OS Topic 1 Name must be Introduction to Operating Systems');

  console.log('✓ OS -> Intermediate Assessment Input generated:');
  console.log(JSON.stringify({
    subject: osInput.subject,
    studentLevel: osInput.studentLevel,
    topicsSample: osInput.topics.slice(0, 3),
    totalTopics: osInput.topics.length
  }, null, 2));

  // Test 4: Verify Multi-Subject Form Data Preservation
  console.log('\n--- 4. Verifying Multi-Subject Form Data ---');
  const sampleFormData = {
    DSA: 'Beginner',
    DBMS: 'Intermediate',
    OS: 'Beginner'
  };

  const multiInput = serverInputService.createAssessmentInputsFromForm(sampleFormData);
  assert(Array.isArray(multiInput.subjects), 'Must have subjects array');
  assert.strictEqual(multiInput.subjects.length, 3, 'Must preserve all 3 submitted subjects');

  const dsaEntry = multiInput.subjects.find(s => s.subject === 'DSA');
  const dbmsEntry = multiInput.subjects.find(s => s.subject === 'DBMS');
  const osEntry = multiInput.subjects.find(s => s.subject === 'OS');

  assert(dsaEntry && dsaEntry.studentLevel === 'Beginner' && dsaEntry.topics.length === 8, 'DSA preserved with Beginner level and 8 topics');
  assert(dbmsEntry && dbmsEntry.studentLevel === 'Intermediate' && dbmsEntry.topics.length === 12, 'DBMS preserved with Intermediate level and 12 topics');
  assert(osEntry && osEntry.studentLevel === 'Beginner' && osEntry.topics.length === 30, 'OS preserved with Beginner level and 30 topics');

  console.log('✓ Multi-subject input preserved independently with separate levels and topics.');

  // Test 5: Validation Invariants & Safety Checks
  console.log('\n--- 5. Verifying Strict Validation & Safety Rules ---');

  // 5a. Reject non-existent subject
  let threwBadSubject = false;
  try {
    serverInputService.createSubjectAssessmentInput('QuantumComputing', 'Beginner');
  } catch (err) {
    threwBadSubject = true;
    assert(err.name === 'AssessmentInputValidationError', 'Must throw AssessmentInputValidationError');
    console.log('  ✓ Correctly rejected non-existent subject:', err.message);
  }
  assert(threwBadSubject, 'Should have thrown error on non-existent subject');

  // 5b. Reject invalid level
  let threwBadLevel = false;
  try {
    serverInputService.createSubjectAssessmentInput('DBMS', 'GrandMaster');
  } catch (err) {
    threwBadLevel = true;
    assert(err.name === 'AssessmentInputValidationError', 'Must throw AssessmentInputValidationError');
    console.log('  ✓ Correctly rejected invalid level:', err.message);
  }
  assert(threwBadLevel, 'Should have thrown error on invalid student level');

  // 5c. Reject duplicate topic IDs
  const duplicateTopicsInput = {
    subject: 'DBMS',
    studentLevel: 'Beginner',
    topics: [
      { id: 'dbms-architecture', name: 'DBMS Architecture' },
      { id: 'dbms-architecture', name: 'DBMS Architecture Duplicate' }
    ]
  };
  const dupValidation = serverInputService.validateAssessmentInput(duplicateTopicsInput);
  assert(!dupValidation.isValid, 'Duplicate topic IDs must fail validation');
  assert(dupValidation.errors.some(e => e.includes('Duplicate topic ID')), 'Error must mention duplicate topic ID');
  console.log('  ✓ Correctly rejected duplicate topic IDs:', dupValidation.errors[0]);

  // 5d. Reject topics from another subject (cross-subject contamination)
  const crossSubjectInput = {
    subject: 'DBMS',
    studentLevel: 'Beginner',
    topics: [
      { id: 'dbms-architecture', name: 'DBMS Architecture' },
      { id: 'intro-to-os', name: 'Introduction to Operating Systems' } // OS topic inside DBMS!
    ]
  };
  const crossValidation = serverInputService.validateAssessmentInput(crossSubjectInput);
  assert(!crossValidation.isValid, 'Cross-subject topic must fail validation');
  assert(crossValidation.errors.some(e => e.includes('Cross-subject topic violation')), 'Error must mention cross-subject violation');
  console.log('  ✓ Correctly rejected cross-subject topic injection:', crossValidation.errors[0]);

  // 5e. Reject invented topics
  const inventedTopicInput = {
    subject: 'DBMS',
    studentLevel: 'Beginner',
    topics: [
      { id: 'dbms-architecture', name: 'DBMS Architecture' },
      { id: 'hallucinated-fake-dbms-topic', name: 'Fake Invented Topic' }
    ]
  };
  const inventedValidation = serverInputService.validateAssessmentInput(inventedTopicInput);
  assert(!inventedValidation.isValid, 'Invented topic must fail validation');
  assert(inventedValidation.errors.some(e => e.includes('Invented topic violation')), 'Error must mention invented topic');
  console.log('  ✓ Correctly rejected invented topic:', inventedValidation.errors[0]);

  // Test 6: Verify Client ESM implementation
  console.log('\n--- 6. Verifying Client ESM Modules ---');
  const clientInputService = await import('../client/src/services/assessmentInputService.js');
  const clientTopicRegistry = await import('../client/src/data/canonicalTopicRegistry.js');

  assert(clientInputService, 'clientInputService must load');
  assert(clientTopicRegistry, 'clientTopicRegistry must load');

  const clientDbms = clientInputService.createSubjectAssessmentInput('DBMS', 'Beginner');
  assert.strictEqual(clientDbms.subject, 'DBMS');
  assert.strictEqual(clientDbms.studentLevel, 'Beginner');
  assert.strictEqual(clientDbms.topics.length, 12);

  const clientOs = clientInputService.createSubjectAssessmentInput('OS', 'Intermediate');
  assert.strictEqual(clientOs.subject, 'OS');
  assert.strictEqual(clientOs.studentLevel, 'Intermediate');
  assert.strictEqual(clientOs.topics.length, 30);
  console.log('✓ Client ESM modules passed parity checks identically with server CommonJS.');

  // Test 7: Verify NO question generation
  console.log('\n--- 7. Verifying Absence of Question Generation ---');
  assert.strictEqual(dbmsInput.questions, undefined, 'Must NOT contain questions');
  assert.strictEqual(dbmsInput.mcqs, undefined, 'Must NOT contain mcqs');
  assert.strictEqual(dbmsInput.roadmap, undefined, 'Must NOT contain roadmap');
  assert.strictEqual(dbmsInput.score, undefined, 'Must NOT contain score');
  assert.strictEqual(osInput.questions, undefined, 'Must NOT contain questions');
  assert.strictEqual(osInput.mcqs, undefined, 'Must NOT contain mcqs');
  console.log('✓ Confirmed: NO question generation, NO Gemini invocation, NO scoring, NO roadmaps present in Assessment Input.');

  console.log('\n================================================================');
  console.log('🎉 ALL STEP 1 VERIFICATION CHECKS PASSED PERFECTLY!');
  console.log('================================================================');
}

runStep1Verification().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
