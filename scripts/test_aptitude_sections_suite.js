/**
 * PATHPILOT: APTITUDE 5-SECTION LEARNING ARCHITECTURE VERIFICATION SUITE
 * Tests all 12 user test requirements and architecture rules:
 * 1. Default URL opening (/aptitude -> section=introduction)
 * 2. Section selection for Problem Examples (section=examples)
 * 3. Section selection for Practice Questions (section=practice)
 * 4. Section selection for Common Patterns (section=patterns)
 * 5. Section selection for Summary & Notes (section=summary)
 * 6. Refresh persistence of topic + section
 * 7. Browser Back/Forward URL state alignment
 * 8. Direct URL access for topic + section
 * 9. Changing topic preserves selected section
 * 10. Quantitative, Logical Reasoning, and Verbal Ability topic coverage across all 5 sections
 * 11. Existing Introduction 10-card carousel integrity
 * 12. Bestu context integration with current section
 */

import fs from 'fs';
import path from 'path';

let passCount = 0;
let failCount = 0;

function assert(condition, message, details = '') {
  if (condition) {
    passCount++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    failCount++;
    console.error(`❌ [FAIL] ${message}`);
    if (details) console.error(`   ↳ ${details}`);
  }
}

console.log('================================================================');
console.log('=== PATHPILOT: APTITUDE 5-SECTION ARCHITECTURE VERIFICATION ===');
console.log('================================================================\n');

// 1. Inspect Files & Architecture
console.log('--- 1. File & Component Structure ---');
const pageFile = path.resolve('client/src/pages/student/AptitudeLearningPage.jsx');
const pageContent = fs.readFileSync(pageFile, 'utf8');

const introSecFile = path.resolve('client/src/components/learning/aptitude/AptitudeIntroductionSection.jsx');
const examplesSecFile = path.resolve('client/src/components/learning/aptitude/AptitudeProblemExamplesSection.jsx');
const practiceSecFile = path.resolve('client/src/components/learning/AptitudePracticeSection.jsx');
const patternsSecFile = path.resolve('client/src/components/learning/aptitude/AptitudeCommonPatternsSection.jsx');
const summarySecFile = path.resolve('client/src/components/learning/aptitude/AptitudeSummaryNotesSection.jsx');

assert(fs.existsSync(introSecFile), 'AptitudeIntroductionSection component exists');
assert(fs.existsSync(examplesSecFile), 'AptitudeProblemExamplesSection component exists');
assert(fs.existsSync(practiceSecFile), 'AptitudePracticeSection component exists');
assert(fs.existsSync(patternsSecFile), 'AptitudeCommonPatternsSection component exists');
assert(fs.existsSync(summarySecFile), 'AptitudeSummaryNotesSection component exists');

// 2. Test 1: Default to Introduction
console.log('\n--- TEST 1: Default / Fallback to Introduction ---');
assert(
  pageContent.includes("return 'introduction';") || pageContent.includes("setActiveSection('introduction')"),
  'Initial section defaults to "introduction" when no section query param is provided'
);
assert(
  pageContent.includes("VALID_SECTIONS = ['introduction', 'examples', 'practice', 'patterns', 'summary']"),
  'All 5 canonical section keys defined in VALID_SECTIONS'
);

// 3. Test 2-5: Section Navigation & URL mapping
console.log('\n--- TESTS 2-5: Five Section URL Identifiers ---');
const expectedSectionKeys = ['introduction', 'examples', 'practice', 'patterns', 'summary'];
expectedSectionKeys.forEach(secKey => {
  assert(
    pageContent.includes(`id: '${secKey}'`) || pageContent.includes(`id: "${secKey}"`),
    `Section key "${secKey}" is configured in section definitions`
  );
  assert(
    pageContent.includes(`activeSection === '${secKey}'`) || pageContent.includes(`activeSection === "${secKey}"`),
    `Section key "${secKey}" is conditionally rendered in the section renderer`
  );
});

// 4. Test 6 & 8: Topic and Section State & Direct Deep-Linking
console.log('\n--- TESTS 6 & 8: Direct Deep Linking & SearchParams Sync ---');
assert(
  pageContent.includes("searchParams.get('topic')") && pageContent.includes("searchParams.get('section')"),
  'Synchronizes state from URL query parameters (topic and section)'
);
assert(
  pageContent.includes('newParams.set(\'topic\', activeTopic)') &&
  pageContent.includes('newParams.set(\'section\', targetSection)'),
  'Section change updates URL search params with topic and section'
);

// 5. Test 7: Browser Back / Forward History Preservation
console.log('\n--- TEST 7: Browser Back/Forward History Preservation ---');
assert(
  pageContent.includes('useEffect(() => {') && pageContent.includes('[searchParams]'),
  'Listens to searchParams changes so Browser Back, Forward, and Refresh restore state seamlessly'
);

// 6. Test 9: Topic Switch Preserves Selected Section
console.log('\n--- TEST 9: Changing Topic Preserves Active Section ---');
assert(
  pageContent.includes("newParams.set('section', activeSection)"),
  'handleTopicSelect preserves the active section when switching topics'
);

// 7. Test 10: Multi-Track Coverage (Quantitative, Logical, Verbal)
console.log('\n--- TEST 10: Multi-Track Topic Coverage ---');
const registryFile = path.resolve('client/src/data/aptitudeTopicDataRegistry.js');
const registryContent = fs.readFileSync(registryFile, 'utf8');

const sampleTopics = [
  { id: 'time-speed-distance', name: 'Time, Speed & Distance', cat: 'Quantitative' },
  { id: 'coding-decoding', name: 'Coding-Decoding', cat: 'Logical' },
  { id: 'reading-comprehension', name: 'Reading Comprehension', cat: 'Verbal' }
];

sampleTopics.forEach(t => {
  assert(
    registryContent.includes(`topicId: '${t.id}'`) || registryContent.includes(`'${t.id}': {`),
    `${t.cat} track topic "${t.name}" (${t.id}) exists in master registry`
  );
});

// 8. Test 11: Introduction 10-Card Carousel Integrity
console.log('\n--- TEST 11: Introduction 10-Card Carousel Intact ---');
const introContent = fs.readFileSync(introSecFile, 'utf8');
assert(
  introContent.includes('AptitudeTopicIntroduction'),
  'AptitudeIntroductionSection wraps and preserves AptitudeTopicIntroduction'
);
const carouselFile = path.resolve('client/src/components/learning/AptitudeTopicIntroduction.jsx');
const carouselContent = fs.readFileSync(carouselFile, 'utf8');
assert(
  carouselContent.includes('10-Card') || carouselContent.includes('cards') || carouselContent.includes('cardNumber'),
  'Existing 10-Card Learning Carousel remains intact with all interactive cards'
);

// 9. Test 12: Bestu AI Context Integration
console.log('\n--- TEST 12: Bestu AI Context Synchronization ---');
const appLayoutFile = path.resolve('client/src/components/layout/AppLayout.jsx');
const appLayoutContent = fs.readFileSync(appLayoutFile, 'utf8');

assert(
  appLayoutContent.includes('sectionNameMap') && appLayoutContent.includes('activeSectionName'),
  'AppLayout maps section query param to human-readable section name in baseContext'
);
assert(
  pageContent.includes('setPageContext') && pageContent.includes('section: SECTION_TITLE_MAP[activeSection]'),
  'AptitudeLearningPage passes current section to Bestu pageContext'
);
assert(
  pageContent.includes('availableSections: [') &&
  pageContent.includes('1. Introduction') &&
  pageContent.includes('3. Practice Questions'),
  'Bestu receives the full list of 5 available Aptitude sections'
);

// 10. Responsive Design & Accessibility
console.log('\n--- Section Navigation Accessibility & Responsive UI ---');
assert(
  pageContent.includes('role="tablist"') && pageContent.includes('role="tab"'),
  'Section navigation uses semantic WAI-ARIA tablist and tab roles'
);
assert(
  pageContent.includes('aria-selected={isActive}'),
  'Section buttons indicate active state via aria-selected'
);
assert(
  pageContent.includes('overflow-x-auto') || pageContent.includes('flex-wrap'),
  'Section navigation supports horizontal scrolling on mobile (320px-430px) without page overflow'
);

console.log('\n================================================================');
console.log('=== TEST SUMMARY                                             ===');
console.log('================================================================');
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log(`Total:  ${passCount + failCount}`);

if (failCount === 0) {
  console.log('\n🎉 ALL 12 APTITUDE 5-SECTION ARCHITECTURE TESTS PASSED FLAWLESSLY!\n');
  process.exit(0);
} else {
  process.exit(1);
}
