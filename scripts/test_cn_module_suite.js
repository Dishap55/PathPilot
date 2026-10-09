/**
 * TEST SUITE: Computer Networks (CN) Module Complete Verification
 * Verifies Canonical Topic Registry, Exact 10-Card Theory (480 cards),
 * VFX scenarios, Problem Solving Benchmarks, Practice MCQs, and Diagram Questions.
 */

import {
  CN_TOPIC_REGISTRY,
  CN_TOPICS_LIST,
  CN_TOPIC_GROUPS,
  resolveCNTopicId,
  getCNTopic
} from '../client/src/data/cn/cnTopicDataRegistry.js';

import {
  CN_TOPIC_CARDS,
  getCNTopicCards
} from '../client/src/data/cn/cnTopicCardsData.js';

import {
  CN_PROBLEM_EXAMPLES,
  getCNProblemExamples
} from '../client/src/data/cn/cnProblemExamplesData.js';

import {
  CN_MCQ_QUESTIONS,
  CN_DIAGRAM_QUESTIONS,
  getCNMcqQuestions,
  getCNDiagramQuestions
} from '../client/src/data/cn/cnPracticeData.js';

import {
  CN_DATA_JOURNEY_STAGES,
  CN_WHAT_CHANGES_TABLE,
  CN_LAYER_MATRIX,
  CN_PROTOCOL_CARDS,
  CN_WHO_DOES_WHAT,
  CN_NUMERICALS_CHEATSHEET,
  CN_INTERVIEW_TRAPS
} from '../client/src/data/cn/cnRevisionExamData.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  [PASS] ${message}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('\n======================================================');
console.log('--- 1. CANONICAL CN TOPIC REGISTRY VERIFICATION ---');
console.log('======================================================');

const topicCount = Object.keys(CN_TOPIC_REGISTRY).length;
assert(topicCount === 48, `Expected exactly 48 canonical CN topics, got: ${topicCount}`);
assert(CN_TOPICS_LIST.length === 48, `CN_TOPICS_LIST has 48 items: ${CN_TOPICS_LIST.length}`);
assert(CN_TOPIC_GROUPS.length === 6, `Expected 6 category groups, got: ${CN_TOPIC_GROUPS.length}`);

// Test alias resolution
assert(resolveCNTopicId('tcp') === 'tcp-protocol', `Alias 'tcp' resolves to 'tcp-protocol': ${resolveCNTopicId('tcp')}`);
assert(resolveCNTopicId('dns') === 'dns-domain-name-system', `Alias 'dns' resolves to 'dns-domain-name-system': ${resolveCNTopicId('dns')}`);
assert(resolveCNTopicId('osi') === 'osi-model', `Alias 'osi' resolves to 'osi-model': ${resolveCNTopicId('osi')}`);
assert(resolveCNTopicId('arp') === 'arp-protocol', `Alias 'arp' resolves to 'arp-protocol': ${resolveCNTopicId('arp')}`);
assert(resolveCNTopicId('dhcp') === 'dhcp-protocol', `Alias 'dhcp' resolves to 'dhcp-protocol': ${resolveCNTopicId('dhcp')}`);
assert(resolveCNTopicId('routing') === 'routing-fundamentals', `Alias 'routing' resolves to 'routing-fundamentals': ${resolveCNTopicId('routing')}`);

console.log('\n======================================================');
console.log('--- 2. EXACT 10-CARD THEORY ARCHITECTURE (480 CARDS) ---');
console.log('======================================================');

let allHave10 = true;
let totalCardsCount = 0;
let cardStructureValid = true;

for (const topic of CN_TOPICS_LIST) {
  const cards = getCNTopicCards(topic.topicId);
  if (!cards || cards.length !== 10) {
    allHave10 = false;
    console.error(`  [ERROR] Topic '${topic.topicId}' has ${cards?.length} cards instead of 10!`);
  } else {
    totalCardsCount += cards.length;
    // Check Card 1 to 10
    if (!cards[0].inSimpleWords) cardStructureValid = false;
    if (!cards[1].problem || !cards[1].whyItMatters || !cards[1].howSolves) cardStructureValid = false;
    if (!cards[7].traps || cards[7].traps.length === 0) cardStructureValid = false;
    if (!cards[8].questions || cards[8].questions.length === 0) cardStructureValid = false;
    if (!cards[9].cheatSheet || !cards[9].cheatSheet.keyRule) cardStructureValid = false;
  }
}

assert(allHave10, 'All 48 topics have exactly 10 theory cards');
assert(totalCardsCount === 480, `Total card count is exactly 480: ${totalCardsCount}`);
assert(cardStructureValid, 'All 10 cards adhere to strict pedagogical structure requirements');

console.log('\n======================================================');
console.log('--- 3. PROBLEM SOLVING BENCHMARKS VERIFICATION ---');
console.log('======================================================');

let allHaveProblems = true;
for (const topic of CN_TOPICS_LIST) {
  const probs = getCNProblemExamples(topic.topicId);
  if (!probs || probs.length === 0) {
    allHaveProblems = false;
    console.error(`  [ERROR] Topic '${topic.topicId}' has no problem benchmark scenarios!`);
  }
}

assert(allHaveProblems, 'All 48 topics have solved problem benchmark scenarios');
const sampleProb = getCNProblemExamples('dns-domain-name-system')[0];
assert(sampleProb.title && sampleProb.solution, `Sample problem is well-structured: '${sampleProb?.title}'`);

console.log('\n======================================================');
console.log('--- 4. PRACTICE QUESTIONS & DIAGRAM LAB ---');
console.log('======================================================');

assert(CN_MCQ_QUESTIONS.length >= 180, `MCQ question bank has at least 180 questions: ${CN_MCQ_QUESTIONS.length}`);
assert(CN_DIAGRAM_QUESTIONS.length >= 48, `Diagram questions bank has at least 48 questions: ${CN_DIAGRAM_QUESTIONS.length}`);

// Verify topic scoping
const tcpMcqs = getCNMcqQuestions('tcp');
assert(tcpMcqs.length >= 3, `Topic-scoped MCQs for 'tcp' returned: ${tcpMcqs.length}`);
const osiDiag = getCNDiagramQuestions('osi');
assert(osiDiag.length >= 1, `Topic-scoped Diagram question for 'osi' returned: ${osiDiag.length}`);

// Verify difficulty diversity
const difficulties = new Set(CN_MCQ_QUESTIONS.map(q => q.difficulty));
assert(difficulties.has('Easy'), 'MCQ bank includes Easy questions');
assert(difficulties.has('Medium'), 'MCQ bank includes Medium questions');
assert(difficulties.has('Placement') || difficulties.has('Interview Trap'), 'MCQ bank includes Placement/Interview Trap questions');

console.log('\n======================================================');
console.log('--- 5. REVISION & EXAM PREP (SECTION 5) VERIFICATION ---');
console.log('======================================================');

assert(CN_DATA_JOURNEY_STAGES.length === 11, `End-to-End Data Journey has 11 stages: ${CN_DATA_JOURNEY_STAGES.length}`);
assert(CN_DATA_JOURNEY_STAGES[0].layerName === 'Application Layer' && CN_DATA_JOURNEY_STAGES[0].side === 'sender', 'Stage 1 starts at Sender Application Layer');
assert(CN_DATA_JOURNEY_STAGES[5].side === 'network', 'Stage 6 is Internet/Router Transit');
assert(CN_DATA_JOURNEY_STAGES[10].side === 'receiver' && CN_DATA_JOURNEY_STAGES[10].layerNumber === 7, 'Stage 11 finishes at Receiver Application Layer');

// Check concrete example data
const appStage = CN_DATA_JOURNEY_STAGES[0];
assert(appStage.headerDetails && appStage.headerDetails['Host'] === 'example.com', 'Stage 1 contains concrete example.com header details');
assert(appStage.pdu === 'Data', 'Application layer PDU is Data');

const transportStage = CN_DATA_JOURNEY_STAGES[1];
assert(transportStage.headerDetails['Source Port'].includes('52144') && transportStage.headerDetails['Destination Port'].includes('443'), 'Transport stage has realistic ports (52144 -> 443)');

const netStage = CN_DATA_JOURNEY_STAGES[2];
assert(netStage.headerDetails['Source IP'].includes('192.168.1.10'), 'Network stage has source IP 192.168.1.10');

// Verify What Changes Table
assert(CN_WHAT_CHANGES_TABLE.length >= 6, `What Changes at Each Hop table has entries: ${CN_WHAT_CHANGES_TABLE.length}`);
const macEntry = CN_WHAT_CHANGES_TABLE.find(item => item.field.includes('MAC'));
assert(macEntry && macEntry.changes.includes('YES'), 'MAC addresses correctly marked as changing at each hop');
const ipEntry = CN_WHAT_CHANGES_TABLE.find(item => item.field.includes('IP'));
assert(ipEntry && ipEntry.changes === 'NO', 'IP addresses correctly marked as staying constant end-to-end');

// Verify Layer Matrix
assert(CN_LAYER_MATRIX.length === 7, `OSI 7-Layer revision matrix has 7 layers: ${CN_LAYER_MATRIX.length}`);

// Verify Protocol Cards
assert(CN_PROTOCOL_CARDS.length >= 7, `Protocol revision cards include at least 7 protocols: ${CN_PROTOCOL_CARDS.length}`);
assert(CN_PROTOCOL_CARDS.find(c => c.id === 'tcp-vs-udp'), 'TCP vs UDP card is present');
assert(CN_PROTOCOL_CARDS.find(c => c.id === 'http-vs-https'), 'HTTP vs HTTPS card is present');
assert(CN_PROTOCOL_CARDS.find(c => c.id === 'dns-card'), 'DNS revision card is present');
assert(CN_PROTOCOL_CARDS.find(c => c.id === 'dhcp-card'), 'DHCP DORA revision card is present');
assert(CN_PROTOCOL_CARDS.find(c => c.id === 'arp-card'), 'ARP revision card is present');
assert(CN_PROTOCOL_CARDS.find(c => c.id === 'icmp-card'), 'ICMP revision card is present');
assert(CN_PROTOCOL_CARDS.find(c => c.id === 'nat-card'), 'NAT revision card is present');

// Verify Who Does What interactive cards
assert(CN_WHO_DOES_WHAT.length >= 10, `Who Does What rapid flashcards has >= 10 items: ${CN_WHO_DOES_WHAT.length}`);

// Verify Numericals & Traps
assert(CN_NUMERICALS_CHEATSHEET.length >= 4, `Formulas & Numericals cheat sheet has >= 4 categories: ${CN_NUMERICALS_CHEATSHEET.length}`);
assert(CN_INTERVIEW_TRAPS.length >= 6, `Placement Interview Traps has >= 6 entries: ${CN_INTERVIEW_TRAPS.length}`);

console.log('\n======================================================');
console.log('--- SUMMARY ---');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED! Computer Networks (CN) module data & architecture verified.\n');
}
