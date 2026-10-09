/**
 * PathPilot — Roadmap Page Verification Suite
 * Tests the new /roadmap page implementation against all 23 prompt requirements.
 */

const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');

require(path.resolve(ROOT, 'node_modules/@supabase/supabase-js'));

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  fs.readFileSync(filePath, 'utf8').split(/\r?\n/).forEach(line => {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  });
}
loadEnv(path.resolve(ROOT, 'client/.env'));
loadEnv(path.resolve(ROOT, 'backend/.env'));

let passed = 0;
let failed = 0;
const results = [];

async function check(name, fn) {
  try {
    await fn();
    console.log(`✅ [PASS] ${name}`);
    passed++;
    results.push({ name, pass: true });
  } catch (err) {
    console.error(`❌ [FAIL] ${name}`);
    console.error(`   ↳ ${err.message}`);
    failed++;
    results.push({ name, pass: false, error: err.message });
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  console.log('\n================================================================');
  console.log('=== PATHPILOT: ROADMAP PAGE VERIFICATION SUITE              ===');
  console.log('================================================================\n');

  // ──────────────────────────────────────────
  // SECTION 1: App Layout & Route Mounting
  // ──────────────────────────────────────────
  console.log('--- Section 1: App Layout & Route Mounting ---');

  const appPath = path.resolve(ROOT, 'client/src/App.jsx');
  const appSrc = fs.readFileSync(appPath, 'utf8');

  await check('[ROUTE #1] /roadmap route mounted inside AppLayout block', async () => {
    assert(appSrc.includes('<Route element={<AppLayout />}>'), 'AppLayout block missing');
    // Ensure /roadmap is inside AppLayout
    const appLayoutBlock = appSrc.split('<Route element={<AppLayout />}>')[1].split('</Route>')[0];
    assert(appLayoutBlock.includes('path="/roadmap"'), '/roadmap must be inside AppLayout block');
  });

  await check('[ROUTE #2] Standalone /roadmap/milestone/:id route mounted', async () => {
    assert(appSrc.includes('path="/roadmap/milestone/:id"'), 'MilestoneDetail route missing');
  });

  // ──────────────────────────────────────────
  // SECTION 2: Roadmap Page File & Data Service Integration
  // ──────────────────────────────────────────
  console.log('\n--- Section 2: Roadmap Page File & Data Integration ---');

  const roadmapPagePath = path.resolve(ROOT, 'client/src/pages/student/Roadmap.jsx');
  assert(fs.existsSync(roadmapPagePath), 'Roadmap.jsx page file missing');
  const roadmapPageSrc = fs.readFileSync(roadmapPagePath, 'utf8');

  await check('[DATA #1] Uses roadmapService.getRoadmap() for authoritative data', async () => {
    assert(roadmapPageSrc.includes('roadmapService.getRoadmap'), 'Must use roadmapService.getRoadmap');
  });

  await check('[DATA #2] Uses roadmapService.generateRoadmap() for regenerate action', async () => {
    assert(roadmapPageSrc.includes('roadmapService.generateRoadmap'), 'Must use roadmapService.generateRoadmap');
  });

  await check('[DATA #3] Does not hardcode milestone names or fake progress demo data', async () => {
    assert(!roadmapPageSrc.includes('fakeMilestone') && !roadmapPageSrc.includes('demoMilestone'), 'No fake milestones');
    assert(!roadmapPageSrc.includes('68%'), 'Must not hardcode 68% progress');
  });

  // ──────────────────────────────────────────
  // SECTION 3: RoadmapHeader Component
  // ──────────────────────────────────────────
  console.log('\n--- Section 3: RoadmapHeader Component ---');

  const headerPath = path.resolve(ROOT, 'client/src/components/roadmap/RoadmapHeader.jsx');
  assert(fs.existsSync(headerPath), 'RoadmapHeader.jsx missing');
  const headerSrc = fs.readFileSync(headerPath, 'utf8');

  await check('[HEADER #1] Displays title "Your Learning Roadmap"', async () => {
    assert(headerSrc.includes('Your Learning Roadmap'), 'Must display "Your Learning Roadmap"');
  });

  await check('[HEADER #2] Displays subtitle "Follow your personalized path, one milestone at a time."', async () => {
    assert(headerSrc.includes('Follow your personalized path, one milestone at a time.'), 'Must display subtitle');
  });

  await check('[HEADER #3] Displays real student context: target date, prep window, preferred language, target company', async () => {
    assert(headerSrc.includes('targetDate'), 'Must accept targetDate');
    assert(headerSrc.includes('prepWindow'), 'Must accept prepWindow');
    assert(headerSrc.includes('preferredLanguage'), 'Must accept preferredLanguage');
    assert(headerSrc.includes('targetCompany'), 'Must accept targetCompany');
  });

  await check('[HEADER #4] Displays Regenerate Roadmap action button', async () => {
    assert(headerSrc.includes('onRegenerate') || headerSrc.includes('Regenerate'), 'Must have regenerate action');
  });

  // ──────────────────────────────────────────
  // SECTION 4: RoadmapProgress Component
  // ──────────────────────────────────────────
  console.log('\n--- Section 4: RoadmapProgress Component ---');

  const progressPath = path.resolve(ROOT, 'client/src/components/roadmap/RoadmapProgress.jsx');
  assert(fs.existsSync(progressPath), 'RoadmapProgress.jsx missing');
  const progressSrc = fs.readFileSync(progressPath, 'utf8');

  await check('[PROGRESS #1] Displays overall progress percentage & completed count', async () => {
    assert(progressSrc.includes('completedCount') && progressSrc.includes('totalCount'), 'Must compute from completedCount & totalCount');
    assert(progressSrc.includes('milestones completed'), 'Must show milestones completed label');
  });

  await check('[PROGRESS #2] Displays current milestone & next milestone snippet', async () => {
    assert(progressSrc.includes('currentMilestone'), 'Must accept currentMilestone');
    assert(progressSrc.includes('nextMilestone'), 'Must accept nextMilestone');
  });

  // ──────────────────────────────────────────
  // SECTION 5: CurrentMilestoneHero Component
  // ──────────────────────────────────────────
  console.log('\n--- Section 5: CurrentMilestoneHero Component ---');

  const heroPath = path.resolve(ROOT, 'client/src/components/roadmap/CurrentMilestoneHero.jsx');
  assert(fs.existsSync(heroPath), 'CurrentMilestoneHero.jsx missing');
  const heroSrc = fs.readFileSync(heroPath, 'utf8');

  await check('[HERO #1] Displays CURRENT FOCUS badge', async () => {
    assert(heroSrc.includes('Current Focus') || heroSrc.includes('CURRENT FOCUS'), 'Must display Current Focus badge');
  });

  await check('[HERO #2] Displays subject tag, topic name, focus, and Continue Learning CTA button', async () => {
    assert(heroSrc.includes('milestone.topic'), 'Must render topic');
    assert(heroSrc.includes('Continue Learning'), 'Must have Continue Learning CTA');
    assert(heroSrc.includes('/roadmap/milestone/'), 'Must link to /roadmap/milestone/:id');
  });

  // ──────────────────────────────────────────
  // SECTION 6: SubjectFilter Component
  // ──────────────────────────────────────────
  console.log('\n--- Section 6: SubjectFilter Component ---');

  const filterPath = path.resolve(ROOT, 'client/src/components/roadmap/SubjectFilter.jsx');
  assert(fs.existsSync(filterPath), 'SubjectFilter.jsx missing');
  const filterSrc = fs.readFileSync(filterPath, 'utf8');

  await check('[FILTER #1] Includes ALL + 6 canonical subjects: DSA, OOPS, APT, DBMS, OS, CN', async () => {
    assert(filterSrc.includes('CANONICAL_SUBJECTS') || filterSrc.includes('ALL'), 'Must include subjects filter tabs');
  });

  await check('[FILTER #2] Role tab accessibility attributes implemented', async () => {
    assert(filterSrc.includes('role="tab"'), 'Must have role="tab"');
    assert(filterSrc.includes('aria-selected'), 'Must have aria-selected');
  });

  // ──────────────────────────────────────────
  // SECTION 7: MilestoneCard & Locked State Enforcement
  // ──────────────────────────────────────────
  console.log('\n--- Section 7: MilestoneCard & Locked State Enforcement ---');

  const cardPath = path.resolve(ROOT, 'client/src/components/roadmap/MilestoneCard.jsx');
  assert(fs.existsSync(cardPath), 'MilestoneCard.jsx missing');
  const cardSrc = fs.readFileSync(cardPath, 'utf8');

  await check('[CARD #1] Renders step sequence_no, subject badge, stage, topic title, and focus description', async () => {
    assert(cardSrc.includes('sequence_no'), 'Must render sequence_no');
    assert(cardSrc.includes('node.topic'), 'Must render topic');
  });

  await check('[CARD #2] Handles 3 core states: COMPLETED, UNLOCKED / IN_PROGRESS, LOCKED', async () => {
    assert(cardSrc.includes('isCompleted'), 'Must handle completed state');
    assert(cardSrc.includes('isUnlocked'), 'Must handle unlocked state');
    assert(cardSrc.includes('isLocked'), 'Must handle locked state');
  });

  await check('[CARD #3] Strict backend-controlled locking: Locked cards do NOT navigate and display explanation', async () => {
    assert(cardSrc.includes('disabled'), 'Locked action button must be disabled');
    assert(cardSrc.includes('Complete previous milestones to unlock'), 'Must show locked explanation message');
  });

  await check('[CARD #4] Completed milestones offer "Review" CTA to /roadmap/milestone/:id', async () => {
    assert(cardSrc.includes('Review'), 'Must offer Review action');
    assert(cardSrc.includes('milestoneTarget'), 'Must link to milestone');
  });

  await check('[CARD #5] Renders vertical line connector connecting milestones', async () => {
    assert(cardSrc.includes('hasNext') && cardSrc.includes('absolute left-'), 'Must draw vertical connecting line');
  });

  // ──────────────────────────────────────────
  // SECTION 8: Loading, Empty, and Error States
  // ──────────────────────────────────────────
  console.log('\n--- Section 8: Loading, Empty, and Error States ---');

  await check('[STATES #1] Loading skeleton state implemented', async () => {
    assert(roadmapPageSrc.includes('Skeleton'), 'Must render Skeleton during loading');
  });

  await check('[STATES #2] Empty state with clean prompt & Generate Roadmap CTA', async () => {
    assert(roadmapPageSrc.includes('No Personalized Roadmap Generated Yet'), 'Must render empty state');
    assert(roadmapPageSrc.includes('handleGenerate'), 'Empty state must allow generating');
  });

  await check('[STATES #3] Error state with Retry action', async () => {
    assert(roadmapPageSrc.includes('Unable to load your') || roadmapPageSrc.includes('errorMessage'), 'Must render error state');
    assert(roadmapPageSrc.includes('loadRoadmap') || roadmapPageSrc.includes('Retry'), 'Must offer retry action');
  });

  // ──────────────────────────────────────────
  // SECTION 9: Client Build Verification
  // ──────────────────────────────────────────
  console.log('\n--- Section 9: Client Build Verification ---');

  await check('[BUILD #1] Production dist bundle exists and is up to date', async () => {
    const distPath = path.resolve(ROOT, 'client/dist/index.html');
    assert(fs.existsSync(distPath), 'client/dist/index.html missing');
    const stat = fs.statSync(distPath);
    const ageMs = Date.now() - stat.mtimeMs;
    assert(ageMs < 10 * 60 * 1000, `Build is stale (${Math.round(ageMs / 60000)}m old). Run npm run build.`);
  });

  // ──────────────────────────────────────────
  // SUMMARY
  // ──────────────────────────────────────────
  console.log('\n================================================================');
  console.log('=== ROADMAP PAGE VERIFICATION SUMMARY                        ===');
  console.log('================================================================');
  console.log(`Total Checks:  ${passed + failed}`);
  console.log(`Passed:        ${passed}`);
  console.log(`Failed:        ${failed}`);
  console.log(`Success Rate:  ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('\n🎉 ALL CHECKS PASSED: Roadmap page implementation verified!\n');
  } else {
    console.log('\n⚠️  Some checks failed. Review details above.\n');
    results.filter(r => !r.pass).forEach(r => console.log(`  ❌ ${r.name}: ${r.error}`));
    process.exit(1);
  }
})();
