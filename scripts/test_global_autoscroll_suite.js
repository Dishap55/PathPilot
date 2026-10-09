/**
 * PathPilot Global Selected Topic Auto-Scroll Verification Suite
 *
 * Verifies the implementation of the global auto-scroll / auto-focus UX
 * across all 6 subjects: DSA, Aptitude, OOPS, DBMS, OS, CN.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

console.log('====================================================');
console.log('🧪 PATHPILOT GLOBAL AUTO-SCROLL TEST SUITE');
console.log('====================================================\n');

// 1. Test scrollUtils.js
console.log('1. Checking scrollUtils.js implementation:');
const scrollUtilsPath = path.join(rootDir, 'client', 'src', 'utils', 'scrollUtils.js');
assert(fs.existsSync(scrollUtilsPath), 'scrollUtils.js exists');
const scrollUtilsCode = fs.readFileSync(scrollUtilsPath, 'utf8');

assert(scrollUtilsCode.includes('export function getStickyHeaderHeight'), 'Exports getStickyHeaderHeight()');
assert(scrollUtilsCode.includes('export function getResponsiveBuffer'), 'Exports getResponsiveBuffer()');
assert(scrollUtilsCode.includes('export function scrollToLearningContent'), 'Exports scrollToLearningContent()');
assert(scrollUtilsCode.includes('requestAnimationFrame'), 'Uses requestAnimationFrame for layout timing');
assert(scrollUtilsCode.includes('window.scrollTo'), 'Performs dynamic window.scrollTo with calculated offset');
assert(scrollUtilsCode.includes("behavior: options.behavior || 'smooth'"), 'Uses smooth scroll behavior');
assert(scrollUtilsCode.includes('dsa-learning-section'), 'Includes dsa-learning-section fallback');
assert(scrollUtilsCode.includes('aptitude-learning-section'), 'Includes aptitude-learning-section fallback');
assert(scrollUtilsCode.includes('oops-learning-section'), 'Includes oops-learning-section fallback');
assert(scrollUtilsCode.includes('subject-learning-section'), 'Includes subject-learning-section fallback');

// 2. Test useTopicAutoScroll.js
console.log('\n2. Checking useTopicAutoScroll.js implementation:');
const hookPath = path.join(rootDir, 'client', 'src', 'hooks', 'useTopicAutoScroll.js');
assert(fs.existsSync(hookPath), 'useTopicAutoScroll.js exists');
const hookCode = fs.readFileSync(hookPath, 'utf8');

assert(hookCode.includes('export function useTopicAutoScroll'), 'Exports useTopicAutoScroll hook');
assert(hookCode.includes('scrollToLearningContent'), 'Imports scrollToLearningContent');
assert(hookCode.includes('contentRef'), 'Returns contentRef');
assert(hookCode.includes('scrollToContent'), 'Returns scrollToContent callback');
assert(hookCode.includes('hasExplicitTopic'), 'Checks hasExplicitTopic to prevent unwanted auto-scroll on default load');
assert(hookCode.includes('isFirstMountRef'), 'Uses mount ref to only handle deep-link on mount');

// 3. Test DSA Page
console.log('\n3. Checking DSALearningPage.jsx integration:');
const dsaPath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'DSALearningPage.jsx');
const dsaCode = fs.readFileSync(dsaPath, 'utf8');
assert(dsaCode.includes("import { useTopicAutoScroll } from '../../hooks/useTopicAutoScroll'"), 'DSA imports useTopicAutoScroll');
assert(dsaCode.includes('dsa-learning-section'), 'DSA has id="dsa-learning-section"');
assert(dsaCode.includes('scroll-mt-20'), 'DSA has responsive scroll margin');
assert(dsaCode.includes('scrollToContent()'), 'DSA handleTopicSelect invokes scrollToContent()');

// 4. Test Aptitude Page
console.log('\n4. Checking AptitudeLearningPage.jsx integration:');
const aptPath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'AptitudeLearningPage.jsx');
const aptCode = fs.readFileSync(aptPath, 'utf8');
assert(aptCode.includes("import { useTopicAutoScroll } from '../../hooks/useTopicAutoScroll'"), 'Aptitude imports useTopicAutoScroll');
assert(aptCode.includes('aptitude-learning-section'), 'Aptitude has id="aptitude-learning-section"');
assert(aptCode.includes('scroll-mt-20 sm:scroll-mt-24'), 'Aptitude has responsive scroll margin');
assert(aptCode.includes('scrollToContent()'), 'Aptitude handleTopicSelect invokes scrollToContent()');

// 5. Test OOPS Page
console.log('\n5. Checking OOPSLearningPage.jsx integration:');
const oopsPath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'OOPSLearningPage.jsx');
const oopsCode = fs.readFileSync(oopsPath, 'utf8');
assert(oopsCode.includes('useTopicAutoScroll'), 'OOPS imports useTopicAutoScroll');
assert(oopsCode.includes('oops-learning-section'), 'OOPS has id="oops-learning-section"');
assert(oopsCode.includes('scroll-mt-20 sm:scroll-mt-24'), 'OOPS has responsive scroll margin');
assert(oopsCode.includes('scrollToContent()'), 'OOPS handleTopicSelect invokes scrollToContent()');
assert(oopsCode.includes('showTopicGrid'), 'OOPS duplicate topic-selection fix is preserved');

// 6. Test DBMS / OS / CN (SubjectLearningPage.jsx)
console.log('\n6. Checking SubjectLearningPage.jsx (DBMS, OS, CN) integration:');
const subjectPagePath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'SubjectLearningPage.jsx');
assert(fs.existsSync(subjectPagePath), 'SubjectLearningPage.jsx exists');
const subjectPageCode = fs.readFileSync(subjectPagePath, 'utf8');
assert(subjectPageCode.includes("import { useTopicAutoScroll } from '../../hooks/useTopicAutoScroll'"), 'SubjectLearningPage imports useTopicAutoScroll');
assert(subjectPageCode.includes('subject-learning-section'), 'SubjectLearningPage has id="subject-learning-section"');
assert(subjectPageCode.includes('scroll-mt-20 sm:scroll-mt-24'), 'SubjectLearningPage has responsive scroll margin');
assert(subjectPageCode.includes('scrollToContent()'), 'SubjectLearningPage handleTopicSelect invokes scrollToContent()');
assert(subjectPageCode.includes('dbms:') && subjectPageCode.includes('os:') && subjectPageCode.includes('cn:'), 'SubjectLearningPage configures DBMS, OS, and CN');
assert(subjectPageCode.includes('primary-key'), 'DBMS includes Primary Key topic');
assert(subjectPageCode.includes('cpu-scheduling'), 'OS includes CPU Scheduling topic');
assert(subjectPageCode.includes('osi-model'), 'CN includes OSI Model topic');

// 7. Test App.jsx Routes
console.log('\n7. Checking App.jsx routing:');
const appPath = path.join(rootDir, 'client', 'src', 'App.jsx');
const appCode = fs.readFileSync(appPath, 'utf8');
assert(appCode.includes("path=\"/subjects/dsa\""), 'App.jsx has route /subjects/dsa');
assert(appCode.includes("path=\"/subjects/aptitude\""), 'App.jsx has route /subjects/aptitude');
assert(appCode.includes("path=\"/subjects/oops\""), 'App.jsx has route /subjects/oops');
assert(appCode.includes("path=\"/subjects/dbms\""), 'App.jsx has route /subjects/dbms');
assert(appCode.includes("path=\"/subjects/os\""), 'App.jsx has route /subjects/os');
assert(appCode.includes("path=\"/subjects/cn\""), 'App.jsx has route /subjects/cn');
assert(appCode.includes("path=\"/subjects/:subjectCode\""), 'App.jsx has dynamic route /subjects/:subjectCode');

// 8. Test Practice.jsx & Subjects.jsx Navigation
console.log('\n8. Checking Practice.jsx and Subjects.jsx navigation:');
const practicePath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'Practice.jsx');
const practiceCode = fs.readFileSync(practicePath, 'utf8');
assert(practiceCode.includes('/subjects/dbms?topic='), 'Practice navigates to DBMS with topic');
assert(practiceCode.includes('/subjects/os?topic='), 'Practice navigates to OS with topic');
assert(practiceCode.includes('/subjects/cn?topic='), 'Practice navigates to CN with topic');

const subjectsPath = path.join(rootDir, 'client', 'src', 'pages', 'student', 'Subjects.jsx');
const subjectsCode = fs.readFileSync(subjectsPath, 'utf8');
assert(subjectsCode.includes("'/subjects/dbms'"), 'Subjects.jsx links to DBMS studio');
assert(subjectsCode.includes("'/subjects/os'"), 'Subjects.jsx links to OS studio');
assert(subjectsCode.includes("'/subjects/cn'"), 'Subjects.jsx links to CN studio');

console.log('\n====================================================');
console.log(`Results: ${passedTests} passed, ${failedTests} failed`);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL AUTO-SCROLL UX VERIFICATION CHECKS PASSED!\n');
}
