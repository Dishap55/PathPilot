import fs from 'fs';

const visualCode = fs.readFileSync('./client/src/components/learning/oops/OOPSVisualDiagram.jsx', 'utf-8');

const diagrams = [
  'atm-vault-diagram',
  'encapsulation-need-diagram',
  'encapsulation-vault',
  'encapsulation-levels',
  'encapsulation-cheat-sheet',
  'abstraction-screen',
  'abstraction-need-diagram',
  'abstraction-contract-flow',
  'oops-interfaces-diagram',
  'abstract-class-vs-interface-spectrum',
  'abstraction-cheat-sheet',
  'inheritance-tree',
  'inheritance-need-comparison',
  'constructor-chain-flow',
  'inheritance-types-grid',
  'inheritance-cheat-sheet'
];

console.log('Verifying visual diagram types in OOPSVisualDiagram.jsx:');
let missing = 0;
diagrams.forEach(d => {
  const has = visualCode.includes(`case '${d}'`);
  if (has) {
    console.log(`  ✓ ${d}`);
  } else {
    console.error(`  ✗ MISSING: ${d}`);
    missing++;
  }
});

if (missing === 0) {
  console.log('\nAll 16 diagram types are registered in OOPSVisualDiagram.jsx! ✓');
} else {
  console.error(`\n${missing} diagram types missing!`);
  process.exit(1);
}
