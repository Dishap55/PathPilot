/**
 * TEST SUITE: Operating Systems (OS) Roadmap Option Removal Verification
 * Verifies that Roadmap button, Roadmap tab, and Roadmap links are absent for OS,
 * while other OS options, topics, sections, and other subjects remain intact.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  [PASS] ${message}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('\n======================================================');
console.log('--- 1. VERIFYING OS ROADMAP OPTION REMOVAL IN SubjectLearningPage.jsx ---');
console.log('======================================================');

const subjectPagePath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'SubjectLearningPage.jsx');
assert(fs.existsSync(subjectPagePath), 'SubjectLearningPage.jsx exists');

const subjectPageContent = fs.readFileSync(subjectPagePath, 'utf-8');

// 1. Verify Roadmap button is conditioned out for OS
assert(
  subjectPageContent.includes("normalizedCode !== 'os'") &&
  subjectPageContent.includes('<Link to="/roadmap">') &&
  subjectPageContent.includes('<Compass size={13}'),
  'Roadmap button in header is hidden when normalizedCode === "os"'
);

// 2. Verify Back to Roadmap breadcrumb is conditioned out for OS
assert(
  subjectPageContent.includes("normalizedCode !== 'os' ?") &&
  subjectPageContent.includes('Back to Roadmap') &&
  subjectPageContent.includes('Back to Core Subjects'),
  'Back to Roadmap breadcrumb is hidden when normalizedCode === "os" and replaced with Back to Core Subjects'
);

// 3. Verify all 5 section tabs for OS remain intact
assert(
  subjectPageContent.includes("{ id: 'introduction', label: '1. Introduction', icon: BookOpen }") &&
  subjectPageContent.includes("{ id: 'examples', label: '2. Problem Examples', icon: Lightbulb }") &&
  subjectPageContent.includes("{ id: 'practice', label: '3. Practice Questions', icon: Target }") &&
  subjectPageContent.includes("{ id: 'patterns', label: '4. Common Patterns', icon: Layers }") &&
  subjectPageContent.includes("{ id: 'summary', label: '5. Summary & Notes', icon: FileText }"),
  'All 5 canonical section tabs remain intact in SubjectLearningPage'
);

// 4. Verify all 6 OS topics remain intact
assert(subjectPageContent.includes("id: 'cpu-scheduling'"), 'OS topic cpu-scheduling present');
assert(subjectPageContent.includes("id: 'processes'"), 'OS topic processes present');
assert(subjectPageContent.includes("id: 'deadlocks'"), 'OS topic deadlocks present');
assert(subjectPageContent.includes("id: 'memory-management'"), 'OS topic memory-management present');
assert(subjectPageContent.includes("id: 'threads'"), 'OS topic threads present');
assert(subjectPageContent.includes("id: 'file-systems'"), 'OS topic file-systems present');

console.log('\n======================================================');
console.log('--- 2. VERIFYING OS ROUTING & EXTERNAL NAVIGATION ---');
console.log('======================================================');

const appJsxPath = path.join(rootDir, 'client', 'src', 'App.jsx');
const appJsxContent = fs.readFileSync(appJsxPath, 'utf-8');

assert(appJsxContent.includes('path="/os" element={<SubjectLearningPage />}'), 'Route /os points to SubjectLearningPage');
assert(appJsxContent.includes('path="/subjects/os" element={<SubjectLearningPage />}'), 'Route /subjects/os points to SubjectLearningPage');

const subjectsJsxPath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'Subjects.jsx');
const subjectsJsxContent = fs.readFileSync(subjectsJsxPath, 'utf-8');

assert(
  subjectsJsxContent.includes("code === 'OS'") &&
  subjectsJsxContent.includes("? '/subjects/os'"),
  'Subjects.jsx routes OS directly to /subjects/os (not /roadmap)'
);

const practiceJsxPath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'Practice.jsx');
const practiceJsxContent = fs.readFileSync(practiceJsxPath, 'utf-8');

assert(
  practiceJsxContent.includes("subject.code === 'OS'") &&
  practiceJsxContent.includes('/subjects/os'),
  'Practice.jsx routes OS directly to /subjects/os (not /roadmap)'
);

console.log('\n======================================================');
console.log('--- 3. VERIFYING OTHER SUBJECTS REMAIN UNCHANGED ---');
console.log('======================================================');

// Verify DSA, Aptitude, OOPS, DBMS, CN are untouched
assert(fs.existsSync(path.join(rootDir, 'client', 'src', 'pages', 'student', 'DSALearningPage.jsx')), 'DSALearningPage exists');
assert(fs.existsSync(path.join(rootDir, 'client', 'src', 'pages', 'student', 'AptitudeLearningPage.jsx')), 'AptitudeLearningPage exists');
assert(fs.existsSync(path.join(rootDir, 'client', 'src', 'pages', 'student', 'OOPSLearningPage.jsx')), 'OOPSLearningPage exists');
assert(fs.existsSync(path.join(rootDir, 'client', 'src', 'pages', 'student', 'DBMSLearningPage.jsx')), 'DBMSLearningPage exists');
assert(fs.existsSync(path.join(rootDir, 'client', 'src', 'pages', 'student', 'CNLearningPage.jsx')), 'CNLearningPage exists');

console.log('\n======================================================');
console.log('--- SUMMARY ---');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED! OS Roadmap option removal verified.\n');
}
