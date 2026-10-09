const { supabase } = require('../server/config/supabase');

const API_BASE = 'http://localhost:5000/api';

async function loginUser(email, password = 'TestPassword123!') {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.session) throw new Error(`Login failed for ${email}: ${error?.message}`);
  return {
    token: data.session.access_token,
    user: data.user
  };
}

async function runStudentAssessment({ email, name, answerStrategy }) {
  console.log(`\n============================================================`);
  console.log(`👤 Running Assessment for ${name} (${email})`);
  console.log(`============================================================`);

  const { token, user } = await loginUser(email);
  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // 1. Start Session
  const startRes = await fetch(`${API_BASE}/assessment/session/start`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ assessmentType: 'initial' })
  });
  const startJson = await startRes.json();
  if (!startJson.success) throw new Error(`Start session failed: ${JSON.stringify(startJson)}`);

  const assessmentId = startJson.data.assessmentId;
  let currentQ = startJson.data.currentQuestion;
  let session = startJson.data;

  console.log(`Session created: ${assessmentId}`);
  console.log(`Initial Subject: ${session.currentSubjectIndex === 0 ? 'DSA' : 'Unknown'}`);

  const questionHistory = [];

  // Loop through 5 DSA questions
  for (let qIdx = 0; qIdx < 5; qIdx++) {
    if (!currentQ) throw new Error(`Missing question at index ${qIdx}`);

    const qType = currentQ.questionType;
    const topicId = currentQ.topicId;
    const topicName = currentQ.topicName;
    const diff = currentQ.difficulty;

    console.log(`\n  Q${qIdx + 1} (${currentQ.subject}): [${topicId}] "${topicName}" (${diff}, type: ${qType})`);
    console.log(`     Prompt: "${(currentQ.question || currentQ.problemStatement || '').slice(0, 70)}..."`);

    // Verify mandatory coding slot at Q5
    if (qIdx === 4) {
      if (qType !== 'coding') {
        throw new Error(`Expected Q5 to be mandatory coding, found type: ${qType}`);
      }
      if (diff !== 'Easy') {
        throw new Error(`Expected Q5 coding to be Easy, found diff: ${diff}`);
      }
      console.log(`     ✓ Mandatory Easy Coding question verified for Q5!`);
    }

    // Determine answer according to strategy
    const decision = answerStrategy({
      subject: currentQ.subject,
      topicId,
      questionType: qType,
      question: currentQ,
      index: qIdx
    });

    console.log(`     Student Action: ${decision.isCorrect ? 'Correct Answer' : decision.isSkipped ? 'Skip' : 'Incorrect Answer'}`);

    let submitBody = {
      assessmentId,
      questionId: currentQ.questionId,
      confidence: decision.confidence || 'confident',
      isSkipped: Boolean(decision.isSkipped)
    };

    if (qType === 'coding') {
      submitBody.codingLanguage = 'cpp';
      submitBody.codeSubmitted = decision.isCorrect ? 'int solution() { return 1; }' : '';
      submitBody.testCasesPassed = decision.isCorrect ? 2 : 0;
      submitBody.answer = submitBody.codeSubmitted;
    } else {
      submitBody.answer = decision.isCorrect ? currentQ.correctAnswer : 'Wrong dummy answer';
    }

    const subRes = await fetch(`${API_BASE}/assessment/session/submit-answer`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(submitBody)
    });
    const subJson = await subRes.json();
    if (!subJson.success) throw new Error(`Submit answer failed: ${JSON.stringify(subJson)}`);

    questionHistory.push({
      questionId: currentQ.questionId,
      topicId,
      topicName,
      subject: currentQ.subject,
      questionType: qType,
      difficulty: diff,
      isCorrect: subJson.data.isCorrect,
      isSkipped: subJson.data.isSkipped
    });

    session = subJson.data.session;
    currentQ = session?.currentQuestion;
  }

  // Verify transition state
  console.log(`\nDSA completed. Session status: ${session.status}`);
  if (session.status !== 'subject_transition') {
    throw new Error(`Expected subject_transition after 5 DSA questions, got: ${session.status}`);
  }

  // Transition to Aptitude
  const nextSubRes = await fetch(`${API_BASE}/assessment/session/next-subject`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ assessmentId })
  });
  const nextSubJson = await nextSubRes.json();
  if (!nextSubJson.success) throw new Error(`Next subject failed: ${JSON.stringify(nextSubJson)}`);

  session = nextSubJson.data?.session || nextSubJson.data;
  currentQ = session?.currentQuestion;
  console.log(`Transitioned to Subject: Aptitude. First topic: ${currentQ?.topicId}`);

  // Loop through 5 Aptitude questions
  for (let qIdx = 0; qIdx < 5; qIdx++) {
    if (!currentQ) throw new Error(`Missing Aptitude question at index ${qIdx}`);

    const topicId = currentQ.topicId;
    const topicName = currentQ.topicName;
    const diff = currentQ.difficulty;

    console.log(`\n  Q${qIdx + 6} (${currentQ.subject}): [${topicId}] "${topicName}" (${diff})`);

    const decision = answerStrategy({
      subject: currentQ.subject,
      topicId,
      questionType: currentQ.questionType,
      question: currentQ,
      index: qIdx + 5
    });

    const submitBody = {
      assessmentId,
      questionId: currentQ.questionId,
      confidence: decision.confidence || 'confident',
      isSkipped: Boolean(decision.isSkipped),
      answer: decision.isCorrect ? currentQ.correctAnswer : 'Wrong dummy option'
    };

    const subRes = await fetch(`${API_BASE}/assessment/session/submit-answer`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(submitBody)
    });
    const subJson = await subRes.json();
    if (!subJson.success) throw new Error(`Submit Aptitude answer failed: ${JSON.stringify(subJson)}`);

    questionHistory.push({
      questionId: currentQ.questionId,
      topicId,
      topicName,
      subject: currentQ.subject,
      questionType: currentQ.questionType,
      difficulty: diff,
      isCorrect: subJson.data.isCorrect,
      isSkipped: subJson.data.isSkipped
    });

    session = subJson.data.session;
    currentQ = session?.currentQuestion;
  }

  console.log(`\nAptitude completed. Session status: ${session.status}`);
  if (session.status !== 'completed') {
    throw new Error(`Expected completed session after 10 questions, got: ${session.status}`);
  }

  // Complete Assessment & Generate Results
  const compRes = await fetch(`${API_BASE}/assessment/initial/complete`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ assessmentId })
  });
  const compJson = await compRes.json();
  if (!compJson.success) throw new Error(`Complete assessment failed: ${JSON.stringify(compJson)}`);

  const result = compJson.data;
  console.log(`\n✓ Assessment Successfully Completed & Persisted!`);
  console.log(`   Attempt Number: ${result.attemptNumber}`);
  console.log(`   DSA Assessed Level: ${result.dsaResult?.assessedLevel}`);
  console.log(`   DSA Accuracy: ${result.dsaResult?.accuracy}%`);
  console.log(`   DSA Strengths:`, (result.dsaResult?.strengths || []).map(s => s.topicName));
  console.log(`   DSA Focus Areas:`, (result.dsaResult?.focusAreas || []).map(f => f.topicName));
  console.log(`   Aptitude Assessed Level: ${result.aptitudeResult?.assessedLevel}`);
  console.log(`   Aptitude Focus Areas:`, (result.aptitudeResult?.focusAreas || []).map(f => f.topicName));

  return {
    studentId: user.id,
    assessmentId,
    questionHistory,
    result
  };
}

module.exports = {
  loginUser,
  runStudentAssessment
};
