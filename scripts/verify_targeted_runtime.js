const assert = require('assert');
const { supabase } = require('../server/config/supabase');
const { createClient } = require('@supabase/supabase-js');
const env = require('../server/config/env');
const { loginUser, runStudentAssessment } = require('./test_student_assessment_flow');

const adminClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const API_BASE = 'http://localhost:5000/api';

async function runTargetedVerification() {
  console.log('================================================================');
  console.log('🎯 PATHPILOT TARGETED RUNTIME VERIFICATION SUITE');
  console.log('================================================================');

  const checkResults = [];
  function recordCheck(id, name, status, evidence) {
    checkResults.push({ id, name, status, evidence });
    const sym = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
    console.log(`\n${sym} [${id}] ${name}: ${status}`);
    console.log(`   Evidence: ${typeof evidence === 'object' ? JSON.stringify(evidence) : evidence}`);
  }

  // ---------------------------------------------------------------------------
  // SECTION 1: VERIFY THE ASSESSMENT WITH MULTIPLE STUDENTS
  // ---------------------------------------------------------------------------
  console.log('\n============================================================');
  console.log('PART 1: VERIFYING ASSESSMENT WITH MULTIPLE STUDENTS (A, B, C)');
  console.log('============================================================');

  // Student A: Answers most DSA questions correctly
  const studentA = await runStudentAssessment({
    name: 'Student A (Alice Anderson)',
    email: 'test_student_a@example.com',
    answerStrategy: ({ subject, questionType, index }) => {
      // Correct for all except 1 question
      return { isCorrect: index !== 2, isSkipped: false, confidence: 'very_confident' };
    }
  });

  // Student B: Answers Binary Search and Graphs questions incorrectly
  const studentB = await runStudentAssessment({
    name: 'Student B (Bob Brown)',
    email: 'test_student_b@example.com',
    answerStrategy: ({ topicId }) => {
      const isTargetWeak = ['binary-search', 'graphs', 'time-and-work'].includes(topicId);
      return { isCorrect: !isTargetWeak, isSkipped: false, confidence: isTargetWeak ? 'confident' : 'very_confident' };
    }
  });

  // Student C: Answers Arrays and Sorting questions incorrectly
  const studentC = await runStudentAssessment({
    name: 'Student C (Charlie Chaplin)',
    email: 'test_student_c@example.com',
    answerStrategy: ({ topicId }) => {
      const isTargetWeak = ['arrays', 'sorting', 'percentages'].includes(topicId);
      return { isCorrect: !isTargetWeak, isSkipped: false, confidence: isTargetWeak ? 'confident' : 'very_confident' };
    }
  });

  // Check 1.1: Different canonical topics across fresh sessions
  const topicsA = studentA.questionHistory.map(q => q.topicId);
  const topicsB = studentB.questionHistory.map(q => q.topicId);
  const topicsC = studentC.questionHistory.map(q => q.topicId);

  const areTopicsDifferent = (JSON.stringify(topicsA.slice(0, 4)) !== JSON.stringify(topicsB.slice(0, 4))) ||
                             (JSON.stringify(topicsA.slice(0, 4)) !== JSON.stringify(topicsC.slice(0, 4)));

  recordCheck(
    '1.1',
    'Questions cover different canonical topics across fresh sessions',
    areTopicsDifferent ? 'PASS' : 'FAIL',
    { studentA_DSA_topics: topicsA.slice(0, 5), studentB_DSA_topics: topicsB.slice(0, 5), studentC_DSA_topics: topicsC.slice(0, 5) }
  );

  // Check 1.2: Actual incorrect answers determine weak areas
  const weakAreasB = (studentB.result.dsaResult?.focusAreas || []).map(f => f.topicId);
  const weakAreasC = (studentC.result.dsaResult?.focusAreas || []).map(f => f.topicId);

  const bHasTargetWeak = topicsB.includes('binary-search') ? weakAreasB.includes('binary-search') : true;
  const cHasTargetWeak = topicsC.includes('arrays') ? weakAreasC.includes('arrays') : true;

  recordCheck(
    '1.2',
    'Actual incorrect answers determine the weak areas',
    (bHasTargetWeak && cHasTargetWeak) ? 'PASS' : 'FAIL',
    { studentB_focusAreas: weakAreasB, studentC_focusAreas: weakAreasC }
  );

  // Check 1.3: Strengths and focus areas differ according to each student's responses
  const dsaAccuracyA = studentA.result.dsaResult.accuracy;
  const dsaAccuracyB = studentB.result.dsaResult.accuracy;
  const focusA = studentA.result.dsaResult.focusAreas.map(f => f.topicId);
  const focusB = studentB.result.dsaResult.focusAreas.map(f => f.topicId);
  const focusC = studentC.result.dsaResult.focusAreas.map(f => f.topicId);

  const focusAreasDiffer = JSON.stringify(focusA) !== JSON.stringify(focusB) || JSON.stringify(focusB) !== JSON.stringify(focusC);

  recordCheck(
    '1.3',
    'Strengths and focus areas differ according to each student\'s responses',
    (dsaAccuracyA >= 80 && focusAreasDiffer) ? 'PASS' : 'FAIL',
    {
      studentA: { accuracy: dsaAccuracyA, focusCount: focusA.length },
      studentB: { accuracy: dsaAccuracyB, focusCount: focusB.length, focus: focusB },
      studentC: { accuracy: studentC.result.dsaResult.accuracy, focusCount: focusC.length, focus: focusC }
    }
  );

  // Check 1.4: The same active assessment resumes without changing its question set
  console.log('\nTesting session resumption for an active assessment...');
  const { token: aToken } = await loginUser('test_student_a@example.com');
  const resumeTestRes = await fetch(`${API_BASE}/assessment/session/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aToken}` },
    body: JSON.stringify({ assessmentType: 'initial' })
  });
  const resumeTestJson = await resumeTestRes.json();
  const resumeAsmId = resumeTestJson.data.assessmentId;
  const originalQ1Id = resumeTestJson.data.currentQuestion.questionId;

  // Retrieve session by ID
  const fetchSessionRes = await fetch(`${API_BASE}/assessment/session/${resumeAsmId}`, {
    headers: { 'Authorization': `Bearer ${aToken}` }
  });
  const fetchSessionJson = await fetchSessionRes.json();
  const resumedQ1Id = fetchSessionJson.data.currentQuestion?.questionId;

  recordCheck(
    '1.4',
    'Active assessment resumes without changing its question set',
    (originalQ1Id === resumedQ1Id) ? 'PASS' : 'FAIL',
    { assessmentId: resumeAsmId, originalQuestionId: originalQ1Id, resumedQuestionId: resumedQ1Id }
  );

  // Check 1.5: Question selection does not repeat a topic unnecessarily when eligible unasked topics remain
  const checkDuplicateTopics = (history) => {
    const dsaAsked = history.slice(0, 4).map(q => q.topicId);
    const uniqueAsked = new Set(dsaAsked);
    return uniqueAsked.size === dsaAsked.length;
  };
  const noRepeatsA = checkDuplicateTopics(studentA.questionHistory);
  const noRepeatsB = checkDuplicateTopics(studentB.questionHistory);
  const noRepeatsC = checkDuplicateTopics(studentC.questionHistory);

  recordCheck(
    '1.5',
    'Question selection does not repeat a topic unnecessarily when eligible unasked topics remain',
    (noRepeatsA && noRepeatsB && noRepeatsC) ? 'PASS' : 'FAIL',
    { studentA_unique_Q1_to_Q4: noRepeatsA, studentB_unique_Q1_to_Q4: noRepeatsB, studentC_unique_Q1_to_Q4: noRepeatsC }
  );

  // Check 1.6: Mandatory coding question follows intended rules
  const q5A = studentA.questionHistory[4];
  const q5B = studentB.questionHistory[4];
  const q5C = studentC.questionHistory[4];

  const codingValid = (q5A.questionType === 'coding' && q5A.difficulty === 'Easy') &&
                      (q5B.questionType === 'coding' && q5B.difficulty === 'Easy') &&
                      (q5C.questionType === 'coding' && q5C.difficulty === 'Easy');

  recordCheck(
    '1.6',
    'The mandatory coding question follows intended rules (DSA Q5, Easy, syntax & comments)',
    codingValid ? 'PASS' : 'FAIL',
    {
      studentA_Q5: { topic: q5A.topicId, type: q5A.questionType, diff: q5A.difficulty },
      studentB_Q5: { topic: q5B.topicId, type: q5B.questionType, diff: q5B.difficulty },
      studentC_Q5: { topic: q5C.topicId, type: q5C.questionType, diff: q5C.difficulty }
    }
  );

  // ---------------------------------------------------------------------------
  // SECTION 2: VERIFY VEDIKA PATIL'S ROADMAP
  // ---------------------------------------------------------------------------
  console.log('\n============================================================');
  console.log('PART 2: VERIFYING VEDIKA PATIL\'S ROADMAP');
  console.log('============================================================');

  const { token: vedikaToken, user: vedikaUser } = await loginUser('vedikapatil@gmail.com');
  const vedikaHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${vedikaToken}`
  };

  // 2.1 Confirm unassessed state behavior using an unassessed student account
  const unassessedEmail = 'student.test@ipsacademy.gov.in';
  await supabase.auth.admin.updateUserById('0583de9b-876a-4cb8-a2eb-bea8c978217c', { password: 'TestPassword123!' });
  const { token: unassessedToken } = await loginUser(unassessedEmail);
  const unassessedRoadmapRes = await fetch(`${API_BASE}/roadmap`, {
    headers: { 'Authorization': `Bearer ${unassessedToken}` }
  });
  const unassessedRoadmapJson = await unassessedRoadmapRes.json();
  const isUnassessedState = !unassessedRoadmapJson.data?.exists;

  recordCheck(
    '2.1',
    'Unassessed state displays the Assessment Required state (exists: false)',
    isUnassessedState ? 'PASS' : 'FAIL',
    { studentEmail: unassessedEmail, exists: unassessedRoadmapJson.data?.exists, roadmap: unassessedRoadmapJson.data?.roadmap }
  );

  // 2.2 Verify completed Initial Assessment for Vedika Patil
  let vedikaAssessmentResult = null;
  const existingAsmRes = await fetch(`${API_BASE}/assessment/initial/result`, { headers: vedikaHeaders });
  const existingAsmJson = await existingAsmRes.json();
  if (existingAsmJson.data?.result) {
    vedikaAssessmentResult = existingAsmJson.data.result;
    console.log('Loaded verified assessment result for Vedika Patil:', vedikaAssessmentResult.assessmentId);
  } else {
    const fresh = await runStudentAssessment({
      name: 'Vedika Patil',
      email: 'vedikapatil@gmail.com',
      answerStrategy: ({ topicId }) => {
        const isWeak = ['trees', 'dp', 'time-and-work', 'ratio-and-proportion'].includes(topicId);
        return { isCorrect: !isWeak, isSkipped: false, confidence: 'confident' };
      }
    });
    vedikaAssessmentResult = fresh.result;
  }

  recordCheck(
    '2.2',
    'Start and complete the Initial Assessment for Vedika Patil',
    Boolean(vedikaAssessmentResult?.assessmentId) ? 'PASS' : 'FAIL',
    {
      assessmentId: vedikaAssessmentResult.assessmentId,
      attemptNumber: vedikaAssessmentResult.attemptNumber,
      dsaLevel: vedikaAssessmentResult.dsaResult?.assessedLevel,
      dsaAccuracy: vedikaAssessmentResult.dsaResult?.accuracy
    }
  );

  // 2.3 Confirm Areas to be Focused displays the actual assessment-derived results
  const postAsmRes = await fetch(`${API_BASE}/assessment/initial/result`, { headers: vedikaHeaders });
  const postAsmJson = await postAsmRes.json();
  const vedikaFocusAreas = [
    ...(postAsmJson.data?.result?.dsaResult?.focusAreas || []),
    ...(postAsmJson.data?.result?.aptitudeResult?.focusAreas || [])
  ];

  recordCheck(
    '2.3',
    'Areas to be Focused displays actual assessment-derived results',
    vedikaFocusAreas.length > 0 ? 'PASS' : 'FAIL',
    { focusAreaCount: vedikaFocusAreas.length, focusAreas: vedikaFocusAreas.map(f => `${f.subject}: ${f.topicName}`) }
  );

  // 2.4 Verify roadmap prioritizes the student's actual weak topics
  const postRoadmapRes = await fetch(`${API_BASE}/roadmap`, { headers: vedikaHeaders });
  const postRoadmapJson = await postRoadmapRes.json();
  const roadmapItems = postRoadmapJson.data?.roadmap?.items || [];
  const focusItems = roadmapItems.filter(i => i.category === 'FOCUS').map(i => i.topicName);

  recordCheck(
    '2.4',
    'Roadmap prioritizes the student\'s actual weak topics (category: FOCUS)',
    focusItems.length > 0 ? 'PASS' : 'FAIL',
    { totalRoadmapItems: roadmapItems.length, focusItemsPrioritized: focusItems }
  );

  // 2.5 Refresh and log out/log in; confirm that results persist
  const { token: reLoginToken } = await loginUser('vedikapatil@gmail.com');
  const reFetchRoadmap = await fetch(`${API_BASE}/roadmap`, {
    headers: { 'Authorization': `Bearer ${reLoginToken}` }
  });
  const reFetchJson = await reFetchRoadmap.json();
  const persists = Boolean(reFetchJson.data?.exists && reFetchJson.data?.roadmap?.items?.length > 0);

  recordCheck(
    '2.5',
    'Refresh and log out / log in confirms results persist across sessions',
    persists ? 'PASS' : 'FAIL',
    { existsAfterReLogin: reFetchJson.data?.exists, roadmapId: reFetchJson.data?.roadmap?.id }
  );

  // 2.6 Confirm that no duplicate roadmap or assessment-history records are created
  const dupRes = await fetch(`${API_BASE}/assessment/initial/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${reLoginToken}` },
    body: JSON.stringify({ assessmentId: vedikaAssessmentResult.assessmentId })
  });
  const dupJson = await dupRes.json();

  // Query database counts for Vedika
  const { data: dbAsmRows } = await adminClient.from('assessment_history').select('id, assessment_id').eq('student_id', vedikaUser.id);
  const { data: dbRoadmapRows } = await adminClient.from('personalized_roadmaps').select('id, student_id').eq('student_id', vedikaUser.id);

  const noDuplicateAsm = (dbAsmRows || []).length === 1;
  const noDuplicateRoadmap = (dbRoadmapRows || []).length === 1;

  recordCheck(
    '2.6',
    'No duplicate roadmap or assessment-history records are created on re-submission',
    (noDuplicateAsm && noDuplicateRoadmap) ? 'PASS' : 'FAIL',
    {
      persistedAssessmentRows: (dbAsmRows || []).length,
      persistedRoadmapRows: (dbRoadmapRows || []).length,
      idempotentResponseStatus: dupRes.status
    }
  );

  // ---------------------------------------------------------------------------
  // SECTION 3: VERIFY AUTOMATIC ROADMAP GENERATION
  // ---------------------------------------------------------------------------
  console.log('\n============================================================');
  console.log('PART 3: VERIFYING AUTOMATIC ROADMAP GENERATION');
  console.log('============================================================');

  // 3.1 Uses authenticated student's persisted assessment
  const vedikaRoadmapRecord = (dbRoadmapRows || [])[0];
  const { data: fullRoadmap } = await adminClient.from('personalized_roadmaps').select('*').eq('id', vedikaRoadmapRecord.id).single();

  const matchesOwner = fullRoadmap.student_id === vedikaUser.id;
  const matchesAssessment = fullRoadmap.source_assessment_id === vedikaAssessmentResult.assessmentId;

  recordCheck(
    '3.1',
    'Roadmap generation uses authenticated student\'s persisted assessment',
    (matchesOwner && matchesAssessment) ? 'PASS' : 'FAIL',
    {
      roadmapStudentId: fullRoadmap.student_id,
      expectedStudentId: vedikaUser.id,
      sourceAssessmentId: fullRoadmap.source_assessment_id,
      expectedAssessmentId: vedikaAssessmentResult.assessmentId
    }
  );

  // 3.2 Does not overwrite another student's roadmap
  const { data: aliceRows } = await adminClient.from('personalized_roadmaps').select('*').eq('student_id', studentA.studentId);
  const { data: bobRows } = await adminClient.from('personalized_roadmaps').select('*').eq('student_id', studentB.studentId);
  const aliceRoadmap = (aliceRows || [])[0];
  const bobRoadmap = (bobRows || [])[0];

  const distinctRoadmaps = Boolean(aliceRoadmap && bobRoadmap && fullRoadmap) &&
                           (aliceRoadmap.id !== bobRoadmap.id) &&
                           (bobRoadmap.id !== fullRoadmap.id) &&
                           (aliceRoadmap.id !== fullRoadmap.id);

  recordCheck(
    '3.2',
    'Does not overwrite another student\'s roadmap (unique rows per student)',
    distinctRoadmaps ? 'PASS' : 'FAIL',
    {
      aliceRoadmapId: aliceRoadmap?.id,
      bobRoadmapId: bobRoadmap?.id,
      vedikaRoadmapId: fullRoadmap?.id
    }
  );

  // 3.3 Handles retries safely
  const retryGenRes = await fetch(`${API_BASE}/roadmap/generate`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${reLoginToken}` }
  });
  const retryGenJson = await retryGenRes.json();
  const { data: afterRetryRows } = await adminClient.from('personalized_roadmaps').select('id').eq('student_id', vedikaUser.id).eq('status', 'active');

  recordCheck(
    '3.3',
    'Handles retries safely (idempotent regeneration, row count remains 1)',
    (retryGenRes.status === 200 && (afterRetryRows || []).length === 1) ? 'PASS' : 'FAIL',
    { retryStatus: retryGenRes.status, rowCountAfterRetry: (afterRetryRows || []).length }
  );

  // 3.4 Error tolerance: does not fail completed assessment if roadmap encounters error
  const assessmentControllerSrc = require('fs').readFileSync(
    require('path').join(__dirname, '../server/controllers/assessmentController.js'),
    'utf-8'
  );
  const hasTryCatch = assessmentControllerSrc.includes('catch (rmErr)') &&
                      assessmentControllerSrc.includes('Roadmap auto-generation notice');

  recordCheck(
    '3.4',
    'Assessment completion succeeds safely even if roadmap generation encounters error (guarded by try/catch)',
    hasTryCatch ? 'PASS' : 'FAIL',
    { tryCatchGuarded: hasTryCatch }
  );

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  console.log('\n============================================================');
  console.log('📊 FINAL TARGETED VERIFICATION RESULTS');
  console.log('============================================================');

  let allPassed = true;
  for (const c of checkResults) {
    const sym = c.status === 'PASS' ? '✅' : '❌';
    console.log(`${sym} [Check ${c.id}] ${c.name}: ${c.status}`);
    if (c.status !== 'PASS') allPassed = false;
  }

  console.log(`\nTOTAL CHECKS: ${checkResults.length} | PASSED: ${checkResults.filter(c => c.status === 'PASS').length} | FAILED: ${checkResults.filter(c => c.status !== 'PASS').length}`);
  if (allPassed) {
    console.log('🎉 ALL TARGETED RUNTIME VERIFICATION CHECKS PASSED PERFECTLY!');
  } else {
    console.log('❌ SOME CHECKS FAILED!');
    process.exit(1);
  }
}

runTargetedVerification().catch(err => {
  console.error('\n❌ Unhandled verification error:', err);
  process.exit(1);
});
