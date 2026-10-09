import { TWO_POINTERS_QUESTION_BANK } from '../client/src/data/twoPointersQuestionBank.js';
import { practiceHistoryService } from '../client/src/services/practiceHistoryService.js';

// Mock localStorage for Node environment
if (typeof localStorage === 'undefined' || localStorage === null) {
  global.localStorage = {
    store: {},
    getItem: function (key) {
      return this.store[key] || null;
    },
    setItem: function (key, value) {
      this.store[key] = value.toString();
    },
    clear: function () {
      this.store = {};
    }
  };
}

async function runAudit() {
  console.log('=== CURATED TWO POINTERS QUESTION BANK AUDIT ===\n');

  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`[PASS] ${msg}`);
      passed++;
    } else {
      console.error(`[FAIL] ${msg}`);
      failed++;
    }
  }

  // 1. Total Count Verification (Target 30-40)
  const total = TWO_POINTERS_QUESTION_BANK.length;
  assert(total >= 30 && total <= 40, `Total questions count = ${total} (Target: 30-40)`);

  // 2. Difficulty Distribution
  const easy = TWO_POINTERS_QUESTION_BANK.filter(q => q.difficulty === 'Easy').length;
  const medium = TWO_POINTERS_QUESTION_BANK.filter(q => q.difficulty === 'Medium' || q.difficulty.includes('Medium')).length;
  const hard = TWO_POINTERS_QUESTION_BANK.filter(q => q.difficulty === 'Hard').length;

  console.log(`Difficulty Breakdown: Easy=${easy}, Medium=${medium}, Hard=${hard}`);
  assert(easy >= 12 && easy <= 15, `Easy count (${easy}) is within target range 12-15`);
  assert(medium >= 15 && medium <= 20, `Medium count (${medium}) is within target range 15-20`);
  assert(hard >= 5 && hard <= 7, `Hard count (${hard}) is within target range 5-7`);

  // 3. Priority Breakdown
  const mustPractice = TWO_POINTERS_QUESTION_BANK.filter(q => q.interviewPriority === 'Must Practice').length;
  const highPriority = TWO_POINTERS_QUESTION_BANK.filter(q => q.interviewPriority === 'High Priority').length;
  const goodToPractice = TWO_POINTERS_QUESTION_BANK.filter(q => q.interviewPriority === 'Good to Practice').length;

  console.log(`Priority Breakdown: Must Practice=${mustPractice}, High Priority=${highPriority}, Good to Practice=${goodToPractice}`);
  assert(mustPractice > 0, `Must Practice count (${mustPractice}) > 0`);
  assert(highPriority > 0, `High Priority count (${highPriority}) > 0`);
  assert(goodToPractice > 0, `Good to Practice count (${goodToPractice}) > 0`);

  // 4. Target IT Placement Company Tag Counts
  const tcs = TWO_POINTERS_QUESTION_BANK.filter(q => (q.companies && q.companies.includes('TCS')) || (q.placementFocus && q.placementFocus.includes('TCS'))).length;
  const wipro = TWO_POINTERS_QUESTION_BANK.filter(q => (q.companies && q.companies.includes('Wipro')) || (q.placementFocus && q.placementFocus.includes('Wipro'))).length;
  const hcl = TWO_POINTERS_QUESTION_BANK.filter(q => (q.companies && q.companies.includes('HCLTech')) || (q.placementFocus && q.placementFocus.includes('HCLTech'))).length;
  const cognizant = TWO_POINTERS_QUESTION_BANK.filter(q => (q.companies && q.companies.includes('Cognizant')) || (q.placementFocus && q.placementFocus.includes('Cognizant'))).length;
  const capgemini = TWO_POINTERS_QUESTION_BANK.filter(q => (q.companies && q.companies.includes('Capgemini')) || (q.placementFocus && q.placementFocus.includes('Capgemini'))).length;
  const accenture = TWO_POINTERS_QUESTION_BANK.filter(q => (q.companies && q.companies.includes('Accenture')) || (q.placementFocus && q.placementFocus.includes('Accenture'))).length;

  console.log(`Placement Company Tags: TCS=${tcs}, Wipro=${wipro}, HCLTech=${hcl}, Cognizant=${cognizant}, Capgemini=${capgemini}, Accenture=${accenture}`);
  assert(tcs >= 5, `TCS tagged count (${tcs}) >= 5`);
  assert(cognizant >= 4, `Cognizant tagged count (${cognizant}) >= 4`);

  // 5. Pattern Distribution
  const patterns = {};
  TWO_POINTERS_QUESTION_BANK.forEach(q => {
    patterns[q.pattern] = (patterns[q.pattern] || 0) + 1;
  });
  console.log('Pattern Distribution:', patterns);
  assert(Object.keys(patterns).length >= 7, 'Covers all 7 major Two Pointers patterns');

  // 6. Duplicate ID check
  const ids = new Set();
  let duplicates = 0;
  TWO_POINTERS_QUESTION_BANK.forEach(q => {
    if (ids.has(q.id)) duplicates++;
    ids.add(q.id);
  });
  assert(duplicates === 0, 'No duplicate problem IDs found in question bank');

  // 7. Starter Code Check
  let starterHasSolution = false;
  TWO_POINTERS_QUESTION_BANK.forEach(q => {
    ['C++', 'Java', 'Python', 'JavaScript'].forEach(lang => {
      const stub = q.starterCode[lang];
      if (stub.includes('while') || stub.includes('left < right') || stub.includes('left++')) {
        starterHasSolution = true;
      }
    });
  });
  assert(!starterHasSolution, 'All starter code stubs are clean empty function declarations without solution logic');

  console.log(`\n=== AUDIT SUMMARY: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

runAudit();
