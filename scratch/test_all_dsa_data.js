const path = require('path');
const fs = require('fs');

const topicFiles = [
  'arraysIntroData.js',
  'sortingIntroData.js',
  'binarySearchIntroData.js',
  'linkedListIntroData.js',
  'treesIntroData.js',
  'graphsIntroData.js',
  'dpIntroData.js'
];

let totalPassed = 0;
let totalFailed = 0;

topicFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', 'client', 'src', 'data', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File missing: ${file}`);
    totalFailed++;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Check 10 cards exist
  const cardNumbers = content.match(/cardNumber:\s*\d+/g);
  if (cardNumbers && cardNumbers.length === 10) {
    console.log(`✅ ${file}: 10/10 cards defined.`);
    totalPassed++;
  } else {
    console.error(`❌ ${file}: expected 10 cards, found ${cardNumbers ? cardNumbers.length : 0}`);
    totalFailed++;
  }

  // Check syntax card exists
  if (content.includes('isSyntaxCard: true') || content.includes('language-syntax')) {
    console.log(`✅ ${file}: Card 9 syntax card present.`);
    totalPassed++;
  } else {
    console.error(`❌ ${file}: Card 9 syntax card missing.`);
    totalFailed++;
  }
});

console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${totalPassed} passed, ${totalFailed} failed.`);
console.log(`========================================`);
