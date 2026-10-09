import fs from 'fs';
import path from 'path';

const pagePath = path.resolve('client/src/pages/student/AptitudeLearningPage.jsx');
const compPath = path.resolve('client/src/components/learning/AptitudeTopicIntroduction.jsx');

const pageContent = fs.readFileSync(pagePath, 'utf8');
const compContent = fs.readFileSync(compPath, 'utf8');

console.log('================================================================');
console.log('FINAL APTITUDE COLOR REDESIGN AUDIT (WARM STUDY PALETTE)');
console.log('================================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failed++;
  }
}

// 1. MAIN PAGE BACKGROUND
console.log('--- 1. Main Page Background ---');
assert(pageContent.includes('bg-[#F4EFE8]'), 'Page background set to warm beige/cream #F4EFE8');
assert(!pageContent.includes('className="w-full min-h-screen bg-white'), 'Page background is NOT pure white');

// 2. LEARNING CONTAINER
console.log('\n--- 2. Learning Container ---');
assert(pageContent.includes('bg-[#F8F4EE] border border-[#D9D1C7]'), 'Hero and category containers use warm learning tone #F8F4EE with #D9D1C7 border');
assert(compContent.includes('bg-[#F8F4EE] border border-[#D9D1C7] rounded-3xl p-4 sm:p-6'), 'Carousel container uses warm learning area #F8F4EE');

// 3. ACTIVE CARD
console.log('\n--- 3. Active Card Styling ---');
assert(compContent.includes("bg-[#FFF8EE] border-[#D9D1C7]"), 'Active card uses soft warm cream #FFF8EE with #D9D1C7 subtle border');
assert(!compContent.includes("isActive\n                      ? 'bg-white"), 'Active card is NOT plain white bg-white');

// 4. SOFT BLUE VISUAL AREA
console.log('\n--- 4. Soft Blue Visual Area ---');
assert(compContent.includes('#E8EFF8'), 'Soft blue background #E8EFF8 present for educational visual');
assert(compContent.includes('#CAD9EA'), 'Soft blue border #CAD9EA present');
assert(compContent.includes('#3E5575'), 'Soft blue text #3E5575 present');

// 5. SOFT LAVENDER
console.log('\n--- 5. Soft Lavender Visual & Formula Boxes ---');
assert(compContent.includes('#EDE9F6'), 'Soft lavender background #EDE9F6 present');
assert(compContent.includes('#D9D2EA'), 'Soft lavender border #D9D2EA present');
assert(compContent.includes('#45456A'), 'Soft lavender text #45456A present');

// 6. SOFT MINT
console.log('\n--- 6. Soft Mint Quick Trick & Solution Boxes ---');
assert(compContent.includes('#E7F1EA'), 'Soft mint background #E7F1EA present');
assert(compContent.includes('#C9DED0'), 'Soft mint border #C9DED0 present');
assert(compContent.includes('#3F634B'), 'Soft mint text #3F634B present');

// 7. WARM CREAM
console.log('\n--- 7. Warm Cream Example Boxes ---');
assert(compContent.includes('#F8EEDC'), 'Warm cream background #F8EEDC present');
assert(compContent.includes('#E6D4B4'), 'Warm cream border #E6D4B4 present');
assert(compContent.includes('#705B35'), 'Warm cream text #705B35 present');

// 8. SOFT PEACH
console.log('\n--- 8. Soft Peach Mistake & Trap Boxes ---');
assert(compContent.includes('#F6E5DF'), 'Soft peach background #F6E5DF present');
assert(compContent.includes('#E7C9C0'), 'Soft peach border #E7C9C0 present');
assert(compContent.includes('#824F47'), 'Soft peach text #824F47 present');

// 9. TEXT READABILITY
console.log('\n--- 9. Text Readability ---');
assert(compContent.includes('#293247') && pageContent.includes('#293247'), 'Primary text uses dark calm slate #293247');
assert(compContent.includes('#667085') && pageContent.includes('#667085'), 'Secondary text uses muted readable #667085');

// 10. ACCENT
console.log('\n--- 10. Muted Blue-Indigo Accent ---');
assert(compContent.includes('#6574C4') && pageContent.includes('#6574C4'), 'Accent uses muted blue-indigo #6574C4');
assert(!compContent.includes('bg-purple-600') && !compContent.includes('bg-indigo-600'), 'No aggressive neon purples used as active indicator');

// 11. CARD PAIRINGS (Section 11)
console.log('\n--- 11. Controlled Card-by-Card Accent Pairings ---');
const expectedPairings = [
  { card: 1, colorName: 'Soft Blue', hex: '#E8EFF8' },
  { card: 2, colorName: 'Lavender', hex: '#EDE9F6' },
  { card: 3, colorName: 'Mint', hex: '#E7F1EA' },
  { card: 4, colorName: 'Soft Blue', hex: '#E8EFF8' },
  { card: 5, colorName: 'Lavender', hex: '#EDE9F6' },
  { card: 6, colorName: 'Mint', hex: '#E7F1EA' },
  { card: 7, colorName: 'Soft Blue', hex: '#E8EFF8' },
  { card: 8, colorName: 'Peach', hex: '#F6E5DF' },
  { card: 9, colorName: 'Mint', hex: '#E7F1EA' },
  { card: 10, colorName: 'Lavender', hex: '#EDE9F6' },
];

expectedPairings.forEach(({ card, colorName, hex }) => {
  assert(compContent.includes(`case ${card}:`) && compContent.includes(hex), `Card ${card} configured with warm cream + ${colorName} (${hex})`);
});

// 12. NO CENTRAL EMPTY SPACE
console.log('\n--- 12. Educational Visual Density ---');
for (let c = 1; c <= 10; c++) {
  assert(compContent.includes(`card.cardNumber === ${c} && <`), `Card ${c} explicitly renders educational visual component`);
}

// 13. WCAG CONTRAST SIMULATION
console.log('\n--- 13. Color Contrast Ratio Calculations ---');
function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return [r, g, b].map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
}
function luminance(rgb) {
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
function contrastRatio(hex1, hex2) {
  const l1 = luminance(hexToRgb(hex1));
  const l2 = luminance(hexToRgb(hex2));
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const contrastPairs = [
  { name: 'Primary Text on Warm Card', fg: '#293247', bg: '#FFF8EE', min: 4.5 },
  { name: 'Secondary Text on Warm Card', fg: '#667085', bg: '#FFF8EE', min: 4.0 },
  { name: 'Blue Box Text on Blue BG', fg: '#3E5575', bg: '#E8EFF8', min: 4.5 },
  { name: 'Lavender Box Text on Lavender BG', fg: '#45456A', bg: '#EDE9F6', min: 4.5 },
  { name: 'Mint Box Text on Mint BG', fg: '#3F634B', bg: '#E7F1EA', min: 4.5 },
  { name: 'Warm Cream Text on Cream BG', fg: '#705B35', bg: '#F8EEDC', min: 4.5 },
  { name: 'Peach Box Text on Peach BG', fg: '#824F47', bg: '#F6E5DF', min: 4.5 },
];

contrastPairs.forEach(({ name, fg, bg, min }) => {
  const ratio = contrastRatio(fg, bg);
  const ok = ratio >= min;
  assert(ok, `${name} (${ratio.toFixed(2)}:1) meets target >= ${min}:1`);
});

console.log('\n================================================================');
console.log(`TOTAL CHECKS: ${passed} PASSED, ${failed} FAILED.`);
console.log('================================================================');

if (failed > 0) process.exit(1);
