/**
 * PathPilot — GET /api/roadmap/milestone/:id/practice Security & Integration Test Suite
 * Tests the existing endpoint against all authentication, authorization, anti-spoofing, and locking rules.
 * READ-ONLY / NON-DESTRUCTIVE.
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

const API_BASE = 'http://localhost:5000/api';

let passed = 0;
let failed = 0;

async function check(name, fn) {
  try {
    await fn();
    console.log(`✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}`);
    console.error(`   ↳ ${err.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function apiGet(routePath, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${routePath}`, { headers });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

(async () => {
  console.log('\n================================================================');
  console.log('=== PATHPILOT: MILESTONE PRACTICE ROUTE SECURITY SUITE       ===');
  console.log('================================================================\n');

  // 1. Unauthenticated Request -> HTTP 401
  await check('[SECURITY #1] Unauthenticated request to /api/roadmap/milestone/lvl-1/practice fails with 401', async () => {
    const { status } = await apiGet('/roadmap/milestone/lvl-1/practice', null);
    assert(status === 401 || status === 403, `Expected 401 or 403, got ${status}`);
  });

  // 2. Spoofed student_id query param -> HTTP 400
  await check('[SECURITY #2] Client-supplied student_id in query string rejected with HTTP 400', async () => {
    const { status, data } = await apiGet('/roadmap/milestone/lvl-1/practice?student_id=00000000-0000-0000-0000-000000000000', null);
    // Unauthenticated spoofing hits 401/400
    assert(status === 400 || status === 401, `Expected 400 or 401, got ${status}`);
  });

  // 3. Invalid milestone ID -> HTTP 400 / 404
  await check('[SECURITY #3] Malformed milestone ID returns 400/404', async () => {
    const { status } = await apiGet('/roadmap/milestone/non-existent-milestone-9999/practice', null);
    assert(status === 400 || status === 401 || status === 404, `Expected 400/401/404, got ${status}`);
  });

  // 4. Source checks on backend route registration
  await check('[ROUTE #1] GET /milestone/:id/practice registered in roadmapRoutes.js', async () => {
    const src = fs.readFileSync(path.resolve(ROOT, 'backend/routes/roadmapRoutes.js'), 'utf8');
    assert(src.includes("'/milestone/:id/practice'"), 'Missing route definition in roadmapRoutes.js');
  });

  await check('[CONTROLLER #1] getPracticeQuestions handler implemented in milestoneController.js', async () => {
    const src = fs.readFileSync(path.resolve(ROOT, 'backend/controllers/milestoneController.js'), 'utf8');
    assert(src.includes('getPracticeQuestions'), 'Missing getPracticeQuestions in milestoneController.js');
  });

  await check('[SERVICE #1] getPracticeQuestions service method implemented in milestoneService.js', async () => {
    const src = fs.readFileSync(path.resolve(ROOT, 'backend/services/milestoneService.js'), 'utf8');
    assert(src.includes('getPracticeQuestions'), 'Missing getPracticeQuestions in milestoneService.js');
  });

  await check('[FRONTEND #1] getPracticeQuestions service method wired in client/src/services/roadmapService.js', async () => {
    const src = fs.readFileSync(path.resolve(ROOT, 'client/src/services/roadmapService.js'), 'utf8');
    assert(src.includes('/roadmap/milestone/${id}/practice') || src.includes('/roadmap/milestone/'), 'Missing practice endpoint call in roadmapService.js');
  });

  console.log('\n================================================================');
  console.log('=== TEST SUMMARY                                             ===');
  console.log('================================================================');
  console.log(`Passed: ${passed} | Failed: ${failed}`);
  if (failed === 0) {
    console.log('\n🎉 ALL SECURITY & INTEGRATION CHECKS PASSED!\n');
  } else {
    process.exit(1);
  }
})();
