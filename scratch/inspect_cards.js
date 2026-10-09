const fs = require('fs');
const path = require('path');

const files = [
  'client/src/data/arraysIntroData.js',
  'client/src/data/sortingIntroData.js',
  'client/src/data/binarySearchIntroData.js',
  'client/src/data/linkedListIntroData.js',
  'client/src/data/treesIntroData.js',
  'client/src/data/graphsIntroData.js',
  'client/src/data/dpIntroData.js',
];

files.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.log('File missing:', file);
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  console.log('=== FILE:', file, '===');
  const cardMatches = content.match(/cardNumber:\s*\d+/g);
  console.log('Card numbers count:', cardMatches ? cardMatches.length : 0);
  
  // Extract id and keys
  const idMatches = content.match(/id:\s*'[^']+'/g);
  if (idMatches) {
    console.log('IDs:', idMatches.map(m => m.replace(/id:\s*/, '')));
  }
});
