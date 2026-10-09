/**
 * PathPilot — Complete Technical Audit & System Health Script
 * READ-ONLY / AUDIT ONLY — DOES NOT MODIFY DATABASE OR CODE.
 */

const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');

// Load environment variables
function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  fs.readFileSync(filePath, 'utf8').split(/\r?\n/).forEach(line => {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  });
}
loadEnv(path.resolve(ROOT, 'client/.env'));
loadEnv(path.resolve(ROOT, 'backend/.env'));

const { createClient } = require(path.resolve(ROOT, 'node_modules/@supabase/supabase-js'));

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const supabaseAnon = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const API_BASE = 'http://localhost:5000/api';

const auditReport = {
  tables: [],
  migrations: [],
  secrets: [],
  stubs: [],
  routeInventory: [],
  securityTests: [],
  frontendDependencies: []
};

async function runAudit() {
  console.log('\n================================================================');
  console.log('=== PATHPILOT COMPLETE SYSTEM AUDIT (READ-ONLY)             ===');
  console.log('================================================================\n');

  // 1. Table Count & Inventory
  console.log('--- 1. Database Table Inventory ---');
  const expectedTables = [
    'student_profiles', 'subjects', 'topics', 'subtopics',
    'questions', 'question_options', 'test_cases', 'assessment_templates',
    'assessments', 'question_attempts', 'assessment_attempts', 'student_rankings',
    'roadmap', 'roadmap_levels', 'topic_progress', 'prerequisite_graph',
    'velocity_history', 'confidence_records', 'ai_requests', 'judge0_logs',
    'daily_thoughts', 'reassessments', 'ai_mentor_logs'
  ];

  let foundTables = [];
  for (const table of expectedTables) {
    try {
      const { data, error } = await supabaseAdmin.from(table).select('count', { count: 'exact', head: true });
      if (!error) {
        foundTables.push(table);
      } else {
        console.warn(`⚠️ Table query warning [${table}]:`, error.message);
      }
    } catch (e) {
      console.warn(`⚠️ Table exception [${table}]:`, e.message);
    }
  }

  console.log(`Found ${foundTables.length} / ${expectedTables.length} expected public tables.`);
  auditReport.tables = foundTables;

  // 2. Migration Count & Inventory
  console.log('\n--- 2. Migration Files Audit ---');
  const migrationsDir = path.resolve(ROOT, 'database/migrations');
  let migrationFiles = [];
  if (fs.existsSync(migrationsDir)) {
    migrationFiles = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
  }
  console.log(`Found ${migrationFiles.length} migration files in database/migrations.`);
  auditReport.migrations = migrationFiles;

  // 3. Secrets & Environment Audit
  console.log('\n--- 3. Secrets & Client Exposure Audit ---');
  const clientSrcDir = path.resolve(ROOT, 'client/src');
  let secretLeakedInClient = false;

  function searchInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        searchInDir(fullPath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('SUPABASE_SERVICE_ROLE_KEY') || (process.env.SUPABASE_SERVICE_ROLE_KEY && content.includes(process.env.SUPABASE_SERVICE_ROLE_KEY))) {
          console.error(`🚨 SECRET LEAK DETECTED in client file: ${fullPath}`);
          secretLeakedInClient = true;
          auditReport.secrets.push({ file: fullPath, leaked: true });
        }
      }
    }
  }
  searchInDir(clientSrcDir);
  if (!secretLeakedInClient) {
    console.log('✅ PASS: SUPABASE_SERVICE_ROLE_KEY is completely absent from client/src.');
  }

  // 4. Codebase Stubs / Placeholders Audit
  console.log('\n--- 4. Stubs & Placeholders Search ---');
  const backendRoutesDir = path.resolve(ROOT, 'backend');
  let stubsFound = [];

  function searchStubs(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!file.includes('node_modules') && !file.includes('.git')) {
          searchStubs(fullPath);
        }
      } else if (file.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split(/\r?\n/);
        lines.forEach((line, idx) => {
          if (line.includes('TODO:') || line.includes('FIXME:') || line.includes('Endpoint registered')) {
            stubsFound.push({ file: path.relative(ROOT, fullPath), line: idx + 1, content: line.trim() });
          }
        });
      }
    }
  }
  searchStubs(backendRoutesDir);
  console.log(`Found ${stubsFound.length} stub/TODO comments in backend codebase.`);
  stubsFound.forEach(s => console.log(`  - ${s.file}:${s.line} -> ${s.content}`));
  auditReport.stubs = stubsFound;

  // 5. RLS & Anti-Spoofing Security Tests
  console.log('\n--- 5. Security & Anti-Spoofing Authorization Tests ---');
  
  // Test 5.1: GET /api/progress/subject/DSA without auth header
  try {
    const r1 = await fetch(`${API_BASE}/progress/subject/DSA`);
    const status1 = r1.status;
    console.log(`Unauthenticated GET /api/progress/subject/DSA -> status ${status1} (expected 401/403)`);
    auditReport.securityTests.push({ name: 'Unauthenticated Progress Access', status: status1, pass: status1 === 401 || status1 === 403 });
  } catch (e) {
    console.warn('Backend fetch error:', e.message);
  }

  // Test 5.2: POST /api/roadmap/generate with spoofed student_id in body
  try {
    const r2 = await fetch(`${API_BASE}/roadmap/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: '00000000-0000-0000-0000-000000000000' })
    });
    const status2 = r2.status;
    console.log(`Unauthenticated spoofed POST /api/roadmap/generate -> status ${status2} (expected 400 or 401)`);
    auditReport.securityTests.push({ name: 'Spoofed student_id Rejection', status: status2, pass: status2 === 400 || status2 === 401 });
  } catch (e) {
    console.warn('Backend fetch error:', e.message);
  }

  // 6. Output Audit Summary
  console.log('\n================================================================');
  console.log('=== AUDIT PRELIMINARY DATA SUMMARY                           ===');
  console.log('================================================================');
  console.log(`Tables Verified:     ${foundTables.length} / 23`);
  console.log(`Migrations Verified: ${migrationFiles.length} / 26`);
  console.log(`Secret Leaks:        ${secretLeakedInClient ? 'DETECTED' : 'None (Clean)'}`);
  console.log(`Stubs/TODOs Found:   ${stubsFound.length}`);
  console.log('================================================================\n');
}

runAudit().catch(err => console.error('Audit execution error:', err));
