const path = require('path');
const fs = require('fs');

const topicDataMap = {
  'arrays': require('../client/src/data/arraysIntroData.js').ARRAYS_INTRO_DATA,
  'sorting': require('../client/src/data/sortingIntroData.js').SORTING_INTRO_DATA,
  'binary-search': require('../client/src/data/binarySearchIntroData.js').BINARY_SEARCH_INTRO_DATA,
  'linked-list': require('../client/src/data/linkedListIntroData.js').LINKED_LIST_INTRO_DATA,
  'trees': require('../client/src/data/treesIntroData.js').TREES_INTRO_DATA,
  'graphs': require('../client/src/data/graphsIntroData.js').GRAPHS_INTRO_DATA,
  'dp': require('../client/src/data/dpIntroData.js').DP_INTRO_DATA
};

console.log('==================================================');
console.log('VERIFYING TOPIC INTRO DATA RESOLUTION');
console.log('==================================================\n');

let pass = 0;
let fail = 0;

for (const [topicId, data] of Object.entries(topicDataMap)) {
  if (!data) {
    console.error(`❌ Missing data for ${topicId}`);
    fail++;
    continue;
  }
  if (data.topicId !== topicId) {
    console.error(`❌ Mismatched topicId for ${topicId}: got ${data.topicId}`);
    fail++;
    continue;
  }
  if (!data.topicName || !data.cards || data.cards.length !== 10) {
    console.error(`❌ Invalid cards structure for ${topicId}`);
    fail++;
    continue;
  }
  console.log(`✅ Topic '${topicId}': Name = "${data.topicName}", Cards = ${data.cards.length}`);
  pass++;
}

console.log('\n==================================================');
console.log(`DATA VERIFICATION: ${pass} PASSED, ${fail} FAILED.`);
console.log('==================================================');
