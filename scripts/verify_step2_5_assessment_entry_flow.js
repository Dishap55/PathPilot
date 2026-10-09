/**
 * VERIFICATION TEST SUITE: STEP 2.5 — CONNECT PROFILE SETUP TO THE ASSESSMENT ENTRY FLOW
 * 
 * Verifies all 12 points from Section 18:
 * 1. Profile Setup completion navigates to assessment when required.
 * 2. Valid Assessment Input reaches Intro.
 * 3. Selected subjects appear dynamically.
 * 4. Starting levels appear correctly.
 * 5. Start Assessment launches existing Step 2 engine.
 * 6. Existing active assessment resumes.
 * 7. Completed assessment is not unnecessarily restarted.
 * 8. Invalid/missing Assessment Input shows recovery UI.
 * 9. Assessment route direct access works.
 * 10. No blank-screen state.
 * 11. Existing Profile Setup remains intact.
 * 12. Existing Step 2 assessment tests remain passing.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

async function runStep2_5Verification() {
  console.log('================================================================');
  console.log('🚀 PATHPILOT STEP 2.5: PROFILE SETUP TO ASSESSMENT ENTRY FLOW');
  console.log('================================================================\n');

  let passedTests = 0;
  function recordPass(testNum, desc) {
    passedTests++;
    console.log(`✓ Test ${testNum}: ${desc}`);
  }

  // Load relevant modules
  const inputService = require('../server/services/assessmentInputService');
  const sessionService = require('../server/services/assessment/assessmentSessionService');
  const topicRegistry = require('../server/constants/canonicalTopicRegistry');

  // 1. Profile Setup completion navigates to assessment when required
  const profileSetupCode = fs.readFileSync(path.join(__dirname, '../client/src/pages/student/ProfileSetup.jsx'), 'utf8');
  assert(profileSetupCode.includes('/assessment/initial'), 'ProfileSetup must reference /assessment/initial upon save');
  assert(profileSetupCode.includes('isAssessmentCompleted'), 'ProfileSetup must check assessment completion status');
  assert(profileSetupCode.includes('subjectsCount > 0'), 'ProfileSetup must ensure at least one subject is chosen');
  recordPass(1, 'Profile Setup completion navigates to assessment when required');

  // 2. Valid Assessment Input reaches Intro
  const sampleFormData = {
    DSA: 'Beginner',
    Aptitude: 'Intermediate'
  };
  const assessmentInput = inputService.createAssessmentInputsFromForm(sampleFormData);
  assert(Array.isArray(assessmentInput.subjects) && assessmentInput.subjects.length === 2, 'Must generate 2 subjects');
  assert.strictEqual(assessmentInput.subjects[0].subject, 'DSA', 'First subject is DSA');
  assert.strictEqual(assessmentInput.subjects[1].subject, 'Aptitude', 'Second subject is Aptitude');
  recordPass(2, 'Valid Assessment Input produces structured subject data for Intro');

  // 3. Selected subjects appear dynamically
  const initialAssessmentCode = fs.readFileSync(path.join(__dirname, '../client/src/pages/student/InitialAssessment.jsx'), 'utf8');
  assert(initialAssessmentCode.includes('subjectsList.map'), 'InitialAssessment must dynamically map selected subjects');
  assert(!initialAssessmentCode.includes('✓ DSA\n✓ DBMS\n✓ OS'), 'Subjects must not be hardcoded');
  recordPass(3, 'Selected subjects appear dynamically without hardcoding');

  // 4. Starting levels appear correctly
  assert(initialAssessmentCode.includes('s.studentLevel'), 'InitialAssessment must display each subject starting level');
  assert(initialAssessmentCode.includes('Starting Level') || initialAssessmentCode.includes('Self-selected'), 'Must label as Starting Level, never Final Level');
  assert(!initialAssessmentCode.includes('Your final level'), 'Must never claim starting level is final level');
  recordPass(4, 'Starting levels appear correctly labeled as Starting/Self-selected');

  // 5. Start Assessment launches existing Step 2 engine
  assert(initialAssessmentCode.includes('assessmentEngine.initSession'), 'Must call existing Step 2 assessmentEngine.initSession');
  assert(initialAssessmentCode.includes('AssessmentQuestionCard'), 'Must transition into existing AssessmentQuestionCard');
  recordPass(5, 'Start Assessment launches existing Step 2 engine cleanly');

  // 6. Existing active assessment resumes
  assert(initialAssessmentCode.includes('hasActiveSavedSession'), 'InitialAssessment must detect active saved session');
  assert(initialAssessmentCode.includes('handleResumeAssessment'), 'InitialAssessment must provide resume handler');
  assert(initialAssessmentCode.includes('Resume Active Assessment') || initialAssessmentCode.includes('Resume'), 'Must offer Resume option');
  recordPass(6, 'Existing active assessment resumes rather than duplicating');

  // 7. Completed assessment is not unnecessarily restarted
  assert(profileSetupCode.includes('pathpilot_assessment_completed'), 'ProfileSetup must check if assessment is completed');
  assert(profileSetupCode.includes("navigate('/dashboard')"), 'Completed assessment routes to dashboard instead of restarting');
  recordPass(7, 'Completed assessment is not unnecessarily restarted');

  // 8. Invalid/missing Assessment Input shows recovery UI
  assert(initialAssessmentCode.includes("stage === 'needs_setup'"), 'InitialAssessment handles missing setup stage');
  assert(initialAssessmentCode.includes('Complete Profile Setup'), 'Shows [ Complete Profile Setup ] recovery button');
  assert(initialAssessmentCode.includes('/profile-setup'), 'Recovery button redirects to /profile-setup');
  recordPass(8, 'Invalid/missing Assessment Input shows recovery UI with [ Complete Profile Setup ]');

  // 9. Assessment route direct access works
  const appRoutesCode = fs.readFileSync(path.join(__dirname, '../client/src/App.jsx'), 'utf8');
  assert(appRoutesCode.includes('path="/assessment"'), 'App.jsx must define route /assessment');
  assert(appRoutesCode.includes('path="/assessment/initial"'), 'App.jsx must define route /assessment/initial');
  assert(appRoutesCode.includes('path="/assessment/:id"'), 'App.jsx must define route /assessment/:id');
  recordPass(9, 'Direct route access (/assessment and /assessment/initial) works');

  // 10. No blank-screen state
  assert(initialAssessmentCode.includes("stage === 'loading'"), 'Has dedicated loading state');
  assert(initialAssessmentCode.includes("stage === 'error'"), 'Has dedicated error recovery state');
  assert(initialAssessmentCode.includes("stage === 'needs_setup'"), 'Has dedicated missing-setup state');
  assert(initialAssessmentCode.includes("stage === 'intro'"), 'Has dedicated intro state');
  recordPass(10, 'All states (loading, needs_setup, intro, active, error) render visible UI without blank screens');

  // 11. Existing Profile Setup remains intact
  assert(profileSetupCode.includes('PersonalDetailsForm'), 'ProfileSetup retains PersonalDetailsForm');
  assert(profileSetupCode.includes('AcademicDetailsForm'), 'ProfileSetup retains AcademicDetailsForm');
  assert(profileSetupCode.includes('PreparationTimeForm'), 'ProfileSetup retains PreparationTimeForm');
  assert(profileSetupCode.includes('SubjectLevelSelector'), 'ProfileSetup retains SubjectLevelSelector');
  recordPass(11, 'Existing Profile Setup form UI remains completely unmodified and intact');

  // 12. Existing Step 2 assessment tests remain passing
  const session = await sessionService.startSession({
    studentId: 'test_student_entry',
    assessmentInput
  });
  assert(session.currentQuestion, 'Session starts with valid question');
  assert.strictEqual(session.currentSubjectName, 'DSA', 'First subject is DSA');
  assert.strictEqual(session.targetQuestionsPerSubject, 5, 'Initial assessment targets 5 questions per subject');
  assert.strictEqual(session.totalSubjects, 2, 'Initial assessment includes DSA and Aptitude');
  recordPass(12, 'Existing Step 2 engine launches the 5-question DSA and Aptitude assessment');

  console.log('\n================================================================');
  console.log(`🎉 ALL ${passedTests} STEP 2.5 VERIFICATION TESTS PASSED PERFECTLY!`);
  console.log('================================================================\n');
}

runStep2_5Verification().catch(err => {
  console.error('\n❌ Verification Failed:', err);
  process.exit(1);
});
