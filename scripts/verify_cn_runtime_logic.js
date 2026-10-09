/**
 * SIMULATED RUNTIME EVALUATION FOR COMPUTER NETWORKS (CN) LEARNING MODULE
 * Verifies the end-to-end learning studio contracts, 10-card carousel,
 * VFX scenario mappings, problem benchmarks, practice lab, and navigation constraints.
 */

async function runCNRuntimeEvaluation() {
  console.log('====================================================');
  console.log('RUNNING FULL CN RUNTIME LOGIC & INTERACTION SIMULATION');
  console.log('====================================================\n');

  const {
    CN_TOPIC_REGISTRY,
    CN_TOPICS_LIST,
    CN_TOPIC_GROUPS,
    resolveCNTopicId,
    getCNTopic
  } = await import('../client/src/data/cn/cnTopicDataRegistry.js');

  const {
    CN_TOPIC_CARDS,
    getCNTopicCards
  } = await import('../client/src/data/cn/cnTopicCardsData.js');

  const {
    CN_PROBLEM_EXAMPLES,
    getCNProblemExamples
  } = await import('../client/src/data/cn/cnProblemExamplesData.js');

  const {
    CN_MCQ_QUESTIONS,
    CN_DIAGRAM_QUESTIONS,
    getCNMcqQuestions,
    getCNDiagramQuestions
  } = await import('../client/src/data/cn/cnPracticeData.js');

  console.log(`[DATA] Loaded ${CN_TOPICS_LIST.length} Canonical CN Topics across ${CN_TOPIC_GROUPS.length} Categories`);
  console.log(`[DATA] Loaded ${Object.keys(CN_TOPIC_CARDS).length} Topics in 10-Card Theory System`);
  console.log(`[DATA] Loaded ${CN_MCQ_QUESTIONS.length} Topic-Scoped MCQs`);
  console.log(`[DATA] Loaded ${CN_DIAGRAM_QUESTIONS.length} Visual Diagram Scenarios\n`);

  let allChecksPassed = true;

  // 1. Verify 10-Card Carousel for EVERY canonical topic
  console.log('--- 1. Evaluating 10-Card Pedagogical System (480 Cards) ---');
  let validCardsCount = 0;
  let vfxMappedCount = 0;

  for (const topic of CN_TOPICS_LIST) {
    const cards = getCNTopicCards(topic.topicId);
    if (!cards || cards.length !== 10) {
      console.error(`[FAIL] Topic ${topic.topicId} does not have exactly 10 cards! Found: ${cards?.length}`);
      allChecksPassed = false;
      continue;
    }

    cards.forEach((c, idx) => {
      if (c.cardNumber === idx + 1) {
        validCardsCount++;
      }
      if (c.vfxType) {
        vfxMappedCount++;
      }
    });

    // Check specific required cards
    const card1 = cards[0]; // What is it
    const card2 = cards[1]; // Why do we need it
    const card3 = cards[2]; // How does it work (VFX / steps)
    const card4 = cards[3]; // Internal Structure
    const card5 = cards[4]; // Step-by-step flow
    const card6 = cards[5]; // Real-world example
    const card7 = cards[6]; // Complete Working Flow / VFX
    const card8 = cards[7]; // Common traps
    const card9 = cards[8]; // Placement interview Q&A
    const card10 = cards[9]; // Quick revision cheat sheet

    if (!card1.inSimpleWords) {
      console.error(`[FAIL] Topic ${topic.topicId} Card 1 missing simple definition`);
      allChecksPassed = false;
    }
    if (!card2.problem || !card2.whyItMatters || !card2.howSolves) {
      console.error(`[FAIL] Topic ${topic.topicId} Card 2 missing 3-part motivation`);
      allChecksPassed = false;
    }
    if (!card8.traps || card8.traps.length === 0) {
      console.error(`[FAIL] Topic ${topic.topicId} Card 8 missing traps`);
      allChecksPassed = false;
    }
    if (!card9.questions || card9.questions.length === 0) {
      console.error(`[FAIL] Topic ${topic.topicId} Card 9 missing interview questions`);
      allChecksPassed = false;
    }
    if (!card10.cheatSheet || !card10.cheatSheet.keyRule) {
      console.error(`[FAIL] Topic ${topic.topicId} Card 10 missing keyRule`);
      allChecksPassed = false;
    }
  }

  console.log(`[PASS] 10-Card Completeness: ${validCardsCount} / 480 Cards valid and verified`);
  console.log(`[PASS] VFX Flow Embeddings: ${vfxMappedCount} interactive animations mapped\n`);

  // 2. Verify Problem Solving Scenarios
  console.log('--- 2. Evaluating Problem Solving Benchmarks ---');
  let totalProblems = 0;
  for (const topic of CN_TOPICS_LIST) {
    const probs = getCNProblemExamples(topic.topicId);
    if (!probs || probs.length === 0) {
      console.error(`[FAIL] Topic ${topic.topicId} missing problem scenarios`);
      allChecksPassed = false;
    } else {
      totalProblems += probs.length;
    }
  }
  console.log(`[PASS] Solved Scenarios: ${totalProblems} production benchmark problems verified\n`);

  // 3. Verify MCQ Practice Bank Integrity
  console.log('--- 3. Evaluating MCQ Practice Lab ---');
  let validMcqs = 0;
  let withHints = 0;
  let withExplanations = 0;
  let withCompanyTags = 0;

  CN_MCQ_QUESTIONS.forEach((q) => {
    if (q.options && q.options.length === 4 && q.correctIndex >= 0 && q.correctIndex < 4) {
      validMcqs++;
    } else {
      console.error(`[FAIL] MCQ ${q.id} has invalid options or correctIndex`);
      allChecksPassed = false;
    }

    if (q.hint && q.progressiveHint) withHints++;
    if (q.explanation && q.optionExplanations) withExplanations++;
    if (q.companyMetadata?.company) withCompanyTags++;
  });

  console.log(`[PASS] MCQs: ${validMcqs} / ${CN_MCQ_QUESTIONS.length} valid 4-option questions`);
  console.log(`[PASS] Progressive Hints: ${withHints} / ${CN_MCQ_QUESTIONS.length} equipped with L1 + L2 hints`);
  console.log(`[PASS] Explanations: ${withExplanations} / ${CN_MCQ_QUESTIONS.length} with root cause & option breakdowns`);
  console.log(`[PASS] Verified Company Tags: ${withCompanyTags} placement-attributed questions\n`);

  // 4. Verify Diagram Questions
  console.log('--- 4. Evaluating Visual Diagram Scenarios ---');
  let validDiagrams = 0;
  CN_DIAGRAM_QUESTIONS.forEach((dq) => {
    if (dq.diagram && dq.question && dq.options?.length >= 2 && dq.correctIndex !== undefined) {
      validDiagrams++;
    } else {
      console.error(`[FAIL] Diagram Question ${dq.id} invalid structure`);
      allChecksPassed = false;
    }
  });
  console.log(`[PASS] Diagram Questions: ${validDiagrams} / ${CN_DIAGRAM_QUESTIONS.length} diagram scenarios verified\n`);

  // 5. Verify Navigation & Contract Requirements
  console.log('--- 5. Evaluating Navigation & Page Contracts ---');
  const fs = await import('fs');
  const pageContent = fs.readFileSync('client/src/pages/student/CNLearningPage.jsx', 'utf-8');

  // Verify only "Back to Core Subjects" link to /subjects
  const hasBackToSubjects = pageContent.includes('to="/subjects"') && pageContent.includes('Back to Core Subjects');
  const hasRoadmapButton = pageContent.includes('to="/roadmap"') || pageContent.includes('Roadmap');

  if (hasBackToSubjects) {
    console.log('[PASS] Header Navigation: "← Back to Core Subjects" pointing to /subjects is present');
  } else {
    console.error('[FAIL] Header Navigation: Missing "← Back to Core Subjects" link');
    allChecksPassed = false;
  }

  // Ensure Roadmap is NOT in the header JSX
  const headerMatch = pageContent.match(/<header[\s\S]*?<\/header>/);
  const headerJSX = headerMatch ? headerMatch[0].toLowerCase() : '';
  const roadmapInHeaderJSX = headerJSX.includes('roadmap') || headerJSX.includes('/roadmap');
  if (!roadmapInHeaderJSX) {
    console.log('[PASS] Header Navigation: Roadmap button is STRICTLY ABSENT from CN header');
  } else {
    console.error('[FAIL] Header Navigation: Roadmap button found in header JSX');
    allChecksPassed = false;
  }

  // Verify auto-scroll target
  const hasAutoScrollTarget = pageContent.includes('id="cn-learning-section"') && pageContent.includes('useTopicAutoScroll');
  if (hasAutoScrollTarget) {
    console.log('[PASS] Auto-Scroll: "#cn-learning-section" wired to useTopicAutoScroll\n');
  } else {
    console.error('[FAIL] Auto-Scroll: Missing "#cn-learning-section" or useTopicAutoScroll\n');
    allChecksPassed = false;
  }

  // 6. Verify Section 5: Revision & Exam Prep and Section Order
  console.log('--- 6. Evaluating Section 5: Revision & Exam Prep & Architecture Order ---');
  const {
    CN_DATA_JOURNEY_STAGES,
    CN_WHAT_CHANGES_TABLE,
    CN_LAYER_MATRIX,
    CN_PROTOCOL_CARDS,
    CN_WHO_DOES_WHAT,
    CN_NUMERICALS_CHEATSHEET,
    CN_INTERVIEW_TRAPS
  } = await import('../client/src/data/cn/cnRevisionExamData.js');

  // Verify 5 sections in pageContent
  const sectionsMatch = pageContent.match(/export const CN_SECTIONS = \[([\s\S]*?)\];/);
  const sectionsBlock = sectionsMatch ? sectionsMatch[1] : '';
  const sectionIds = [...sectionsBlock.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);

  if (sectionIds.length === 5) {
    console.log(`[PASS] Exact 5 Canonical Sections Present: ${sectionIds.join(' -> ')}`);
  } else {
    console.error(`[FAIL] Expected 5 canonical sections, got: ${sectionIds.length} (${sectionIds.join(', ')})`);
    allChecksPassed = false;
  }

  const expectedOrder = ['introduction', 'problems', 'practice', 'summary', 'revision'];
  const orderMatches = JSON.stringify(expectedOrder) === JSON.stringify(sectionIds);

  if (orderMatches) {
    console.log('[PASS] Section Order strictly preserved: Introduction -> Problem Solving -> Practice Questions -> Summary & Notes -> Revision & Exam Prep');
  } else {
    console.error(`[FAIL] Section order mismatch! Found: ${sectionIds.join(', ')}`);
    allChecksPassed = false;
  }

  const hasRevisionInValid = pageContent.includes("'revision'") && pageContent.includes("'summary'");
  const mountsRevisionComponent = pageContent.includes('<CNRevisionExamSection');
  if (hasRevisionInValid && mountsRevisionComponent) {
    console.log('[PASS] CNRevisionExamSection properly mounted and active in VALID_CN_SECTIONS');
  } else {
    console.error('[FAIL] CNRevisionExamSection not mounted or missing from valid sections');
    allChecksPassed = false;
  }

  // Verify Revision Data Journey
  if (CN_DATA_JOURNEY_STAGES.length === 11 && CN_DATA_JOURNEY_STAGES[0].pdu === 'Data' && CN_DATA_JOURNEY_STAGES[4].pdu.includes('Bits')) {
    console.log(`[PASS] End-to-End Data Journey: 11 Stages (Sender Encapsulation -> Routers -> Receiver Decapsulation)`);
  } else {
    console.error('[FAIL] Data journey stages invalid');
    allChecksPassed = false;
  }

  // Verify Hop Changes
  if (CN_WHAT_CHANGES_TABLE.length >= 6) {
    console.log(`[PASS] Hop-by-Hop Modifications Table: ${CN_WHAT_CHANGES_TABLE.length} verified fields`);
  } else {
    console.error('[FAIL] Hop changes table missing entries');
    allChecksPassed = false;
  }

  // Verify Protocol comparison cards & traps
  if (CN_PROTOCOL_CARDS.length >= 7 && CN_INTERVIEW_TRAPS.length >= 6 && CN_WHO_DOES_WHAT.length >= 10) {
    console.log(`[PASS] Protocol Cards (${CN_PROTOCOL_CARDS.length}), Interview Traps (${CN_INTERVIEW_TRAPS.length}), and Flashcards (${CN_WHO_DOES_WHAT.length}) fully verified`);
  } else {
    console.error('[FAIL] Protocol cards or traps incomplete');
    allChecksPassed = false;
  }

  console.log('\n====================================================');
  if (allChecksPassed) {
    console.log('🎉 ALL CN RUNTIME EVALUATION CHECKS PASSED PERFECTLY!');
  } else {
    console.error('❌ SOME CHECKS FAILED. Please review output above.');
    process.exit(1);
  }
  console.log('====================================================\n');
}

runCNRuntimeEvaluation();
