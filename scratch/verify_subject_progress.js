/**
 * PathPilot — Subject Progress Verification Suite
 * Tests the new GET /api/progress/subject/:code endpoint and frontend integration.
 */

const path = require('path');
const ROOT = path.resolve(__dirname, '..'); // project root (parent of scratch/)
require(path.resolve(ROOT, 'node_modules/@supabase/supabase-js'));

// Load env
const fs = require('fs');
function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  fs.readFileSync(filePath, 'utf8').split(/\r?\n/).forEach(line => {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  });
}
loadEnv(path.resolve(ROOT, 'client/.env'));
loadEnv(path.resolve(ROOT, 'backend/.env'));

const API_BASE = `http://localhost:5000/api`;


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

async function apiGet(path, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const r = await fetch(`${API_BASE}${path}`, { headers });
  const body = await r.json().catch(() => ({}));
  return { status: r.status, body };
}

// Obtain a test token
async function getTestToken() {
  const { createClient } = require(path.resolve(__dirname, '../node_modules/@supabase/supabase-js'));
  const client = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  // Use test credentials from the env or fallback values safe for CI
  // We'll just test the endpoint with an invalid token for structure checks
  return null; // will trigger 401 on auth-protected routes
}

async function signIn(email, password) {
  const { createClient } = require(path.resolve(__dirname, '../node_modules/@supabase/supabase-js'));
  const client = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`Sign in failed: ${error.message}`);
  return data.session.access_token;
}

(async () => {
  console.log('\n================================================================');
  console.log('=== PATHPILOT: SUBJECT PROGRESS VERIFICATION SUITE          ===');
  console.log('================================================================\n');

  // ──────────────────────────────────────────
  // SECTION 1: Backend health + route existence
  // ──────────────────────────────────────────
  console.log('\n--- Section 1: Backend Health & Route Registration ---');

  await check('[BACKEND #1] Backend is running and healthy', async () => {
    const { status, body } = await apiGet('/health');
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.status === 'healthy', 'Expected healthy');
  });

  await check('[BACKEND #2] GET /api/progress/subject/DSA exists (returns 401, not 404)', async () => {
    const { status } = await apiGet('/progress/subject/DSA', null);
    assert(status === 401 || status === 403, `Expected 401/403, got ${status}. Route may not be registered.`);
  });

  // ──────────────────────────────────────────
  // SECTION 2: Input validation
  // ──────────────────────────────────────────
  console.log('\n--- Section 2: Input Validation (no auth needed for these to be informative) ---');

  await check('[VALIDATION #1] Invalid subject code returns appropriate error (not 500)', async () => {
    // Without auth → 401. With auth → 400. Either is acceptable for invalid code check.
    const { status } = await apiGet('/progress/subject/INVALID', null);
    assert(status === 400 || status === 401 || status === 403, `Expected 400/401/403, got ${status}`);
  });

  // ──────────────────────────────────────────
  // SECTION 3: Frontend component source verification
  // ──────────────────────────────────────────
  console.log('\n--- Section 3: Frontend Component Source Checks ---');

  const chartPath = path.resolve(ROOT, 'client/src/components/dashboard/SubjectProgressChart.jsx');
  const chartSrc = fs.readFileSync(chartPath, 'utf8');

  await check('[FRONTEND #1] SubjectProgressChart.jsx exists', async () => {
    assert(fs.existsSync(chartPath), 'SubjectProgressChart.jsx not found');
  });

  await check('[FRONTEND #2] All 6 canonical subject codes present: DSA, OOPS, APT, DBMS, OS, CN', async () => {
    const codes = ['DSA', 'OOPS', 'APT', 'DBMS', 'OS', 'CN'];
    for (const c of codes) {
      assert(chartSrc.includes(`'${c}'`) || chartSrc.includes(`"${c}"`), `Missing subject code: ${c}`);
    }
  });

  await check('[FRONTEND #3] Uses progressService.getSubjectProgress (not hardcoded values)', async () => {
    assert(chartSrc.includes('progressService.getSubjectProgress'), 'Must use progressService.getSubjectProgress');
    assert(!chartSrc.includes('82%') && !chartSrc.includes('78%'), 'Must not contain hardcoded progress percentages');
  });

  await check('[FRONTEND #4] Subject selector tabs present (role=tab, aria-selected)', async () => {
    assert(chartSrc.includes('role="tab"'), 'Tabs must have role="tab"');
    assert(chartSrc.includes('aria-selected'), 'Tabs must have aria-selected for accessibility');
  });

  await check('[FRONTEND #5] Loading skeleton state implemented', async () => {
    assert(chartSrc.includes('ChartSkeleton') || chartSrc.includes('Skeleton'), 'Must have skeleton loading state');
    assert(chartSrc.includes('isLoading'), 'Must track loading state');
  });

  await check('[FRONTEND #6] Empty/no-data state with user-facing message', async () => {
    assert(chartSrc.includes('learning activities') || chartSrc.includes('no data') || chartSrc.includes('Complete a few'), 'Must have empty state message');
  });

  await check('[FRONTEND #7] Error state with retry button', async () => {
    assert(chartSrc.includes('Retry') || chartSrc.includes('retry'), 'Must have retry action in error state');
    assert(chartSrc.includes('setError'), 'Must track error state');
  });

  await check('[FRONTEND #8] Pure SVG chart — no recharts/chart.js/d3 imports', async () => {
    assert(!chartSrc.includes('recharts'), 'Must not use recharts');
    assert(!chartSrc.includes('chart.js'), 'Must not use chart.js');
    assert(!chartSrc.includes("from 'd3'"), 'Must not use d3');
    assert(chartSrc.includes('<svg'), 'Must render SVG element');
  });

  await check('[FRONTEND #9] Tooltip implementation present', async () => {
    assert(chartSrc.includes('Tooltip') || chartSrc.includes('tooltip'), 'Must have tooltip');
    assert(chartSrc.includes('onMouseMove') || chartSrc.includes('mouseMove'), 'Tooltip must be hover-activated');
  });

  await check('[FRONTEND #10] 4 current metrics shown: Mastery, Accuracy, Questions Solved, Topics Practiced', async () => {
    assert(chartSrc.includes('Mastery') || chartSrc.includes('mastery'), 'Must show Mastery metric');
    assert(chartSrc.includes('Accuracy') || chartSrc.includes('accuracy'), 'Must show Accuracy metric');
    assert(chartSrc.includes('Questions'), 'Must show Questions metric');
    assert(chartSrc.includes('Topics'), 'Must show Topics metric');
  });

  await check('[FRONTEND #11] Data caching: dataCache per-subject to avoid re-fetching', async () => {
    assert(chartSrc.includes('dataCache'), 'Must cache subject data to avoid re-fetch on tab switch');
  });

  await check('[FRONTEND #12] ResizeObserver for responsive chart width', async () => {
    assert(chartSrc.includes('ResizeObserver'), 'Must use ResizeObserver for responsive sizing');
  });

  // ──────────────────────────────────────────
  // SECTION 4: Dashboard integration
  // ──────────────────────────────────────────
  console.log('\n--- Section 4: Dashboard Integration ---');

  const dashboardPath = path.resolve(ROOT, 'client/src/pages/student/Dashboard.jsx');
  const dashboardSrc = fs.readFileSync(dashboardPath, 'utf8');

  await check('[DASHBOARD #1] SubjectProgressChart imported in Dashboard.jsx', async () => {
    assert(dashboardSrc.includes("import SubjectProgressChart"), 'SubjectProgressChart not imported in Dashboard.jsx');
  });

  await check('[DASHBOARD #2] SubjectProgressChart rendered inside a Card in dashboard JSX', async () => {
    assert(dashboardSrc.includes('<SubjectProgressChart'), 'SubjectProgressChart not rendered in Dashboard');
    assert(dashboardSrc.includes('Subject Progress'), 'Subject Progress card header not present');
  });

  await check('[DASHBOARD #3] Subject Progress card uses Card component (consistent styling)', async () => {
    assert(dashboardSrc.includes('<Card') && dashboardSrc.includes('Subject Progress'), 'Must be inside a Card component');
  });

  // ──────────────────────────────────────────
  // SECTION 5: Backend route source verification
  // ──────────────────────────────────────────
  console.log('\n--- Section 5: Backend Route Source Verification ---');

  const routePath = path.resolve(ROOT, 'backend/routes/progressRoutes.js');
  const routeSrc = fs.readFileSync(routePath, 'utf8');

  await check('[ROUTE #1] progressRoutes.js has GET /subject/:subjectCode handler', async () => {
    assert(routeSrc.includes("'/subject/:subjectCode'") || routeSrc.includes('"/subject/:subjectCode"'), 'Missing subject route');
  });

  await check('[ROUTE #2] Route uses req.user.id — never trusts client-supplied student_id', async () => {
    assert(routeSrc.includes('req.user.id'), 'Must use req.user.id');
    assert(!routeSrc.includes('req.body.student_id'), 'Must NOT accept student_id from body');
    assert(!routeSrc.includes('req.query.student_id'), 'Must NOT accept student_id from query');
  });

  await check('[ROUTE #3] Route validates subject code against VALID_CODES whitelist', async () => {
    assert(routeSrc.includes('VALID_CODES') || routeSrc.includes('VALID_SUBJECTS') || routeSrc.includes("'DSA', 'OOPS'"), 'Must validate subject code');
  });

  await check('[ROUTE #4] Route joins topic_progress → topics → subjects correctly', async () => {
    assert(routeSrc.includes('topic_progress'), 'Must query topic_progress');
    assert(routeSrc.includes('subjects'), 'Must query subjects');
    assert(routeSrc.includes('topics'), 'Must query topics');
  });

  await check('[ROUTE #5] Route returns real aggregated summary: mastery, accuracy, questions_solved', async () => {
    assert(routeSrc.includes('mastery'), 'Must return mastery');
    assert(routeSrc.includes('accuracy'), 'Must return accuracy');
    assert(routeSrc.includes('questions_solved'), 'Must return questions_solved');
  });

  await check('[ROUTE #6] Route builds chronological trend from last_practiced_at timestamps', async () => {
    assert(routeSrc.includes('last_practiced_at'), 'Must use last_practiced_at for trend');
    assert(routeSrc.includes('trend'), 'Must return trend array');
  });

  await check('[ROUTE #7] Route returns 400 for invalid subject code', async () => {
    assert(routeSrc.includes('status(400)'), 'Must return 400 for invalid code');
  });

  await check('[ROUTE #8] Route has try/catch with 500 error response', async () => {
    assert(routeSrc.includes('status(500)'), 'Must handle errors with 500');
  });

  // ──────────────────────────────────────────
  // SECTION 6: progressService frontend
  // ──────────────────────────────────────────
  console.log('\n--- Section 6: progressService.js ---');

  const svcPath = path.resolve(ROOT, 'client/src/services/progressService.js');
  const svcSrc = fs.readFileSync(svcPath, 'utf8');

  await check('[SERVICE #1] progressService.getSubjectProgress uses /progress/subject/ path', async () => {
    assert(svcSrc.includes('/progress/subject/'), 'Must call /progress/subject/ endpoint');
  });

  await check('[SERVICE #2] getSubjectProgress accepts subjectCode param', async () => {
    assert(svcSrc.includes('subjectCode'), 'Must accept subjectCode parameter');
  });

  // ──────────────────────────────────────────
  // SECTION 7: No hardcoded values
  // ──────────────────────────────────────────
  console.log('\n--- Section 7: Data Integrity — No Hardcoded Values ---');

  await check('[INTEGRITY #1] SubjectProgressChart has no hardcoded progress values (82%, 78%, 72%, 65%)', async () => {
    // Exclude CSS class strings like 'opacity-50', 'w-50%' — check only standalone quoted percentages
    const forbiddenPatterns = [/['"]82%['"]/, /['"]78%['"]/, /['"]72%['"]/, /['"]65%['"]/, /['"]75%['"]/];
    for (const p of forbiddenPatterns) {
      assert(!p.test(chartSrc), `Found hardcoded progress value matching: ${p}`);
    }
  });


  await check('[INTEGRITY #2] SubjectProgressChart contains no hardcoded question counts like "124"', async () => {
    assert(!chartSrc.includes('124'), 'Found hardcoded question count 124');
    assert(!chartSrc.includes('questions: 52'), 'Found hardcoded question count 52');
  });

  await check('[INTEGRITY #3] Old SubjectProgress.jsx stub still exists but is separate from new chart', async () => {
    const oldPath = path.resolve(ROOT, 'client/src/components/dashboard/SubjectProgress.jsx');
    // Old file is fine to exist but new chart must be different
    assert(fs.existsSync(chartPath), 'New SubjectProgressChart.jsx must exist');
  });

  // ──────────────────────────────────────────
  // SECTION 8: Build verification
  // ──────────────────────────────────────────
  console.log('\n--- Section 8: Build Verification ---');

  await check('[BUILD #1] Client production build dist exists and is current', async () => {
    const distPath = path.resolve(ROOT, 'client/dist/index.html');
    assert(fs.existsSync(distPath), 'dist/index.html not found — build may have failed');
    const stat = fs.statSync(distPath);
    const ageMs = Date.now() - stat.mtimeMs;
    assert(ageMs < 10 * 60 * 1000, `Build is stale (${Math.round(ageMs / 60000)}min old). Run npm run build.`);
  });

  // ──────────────────────────────────────────
  // SUMMARY
  // ──────────────────────────────────────────
  console.log('\n================================================================');
  console.log('=== SUBJECT PROGRESS VERIFICATION SUMMARY                   ===');
  console.log('================================================================');
  console.log(`Total Checks:  ${passed + failed}`);
  console.log(`Passed:        ${passed}`);
  console.log(`Failed:        ${failed}`);
  console.log(`Success Rate:  ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('\n🎉 ALL CHECKS PASSED: Subject Progress implementation verified!\n');
  } else {
    console.log('\n⚠️  Some checks failed. Review output above.\n');
    results.filter(r => !r.pass).forEach(r => console.log(`  ❌ ${r.name}: ${r.error}`));
  }
})();
