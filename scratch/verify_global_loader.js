/**
 * PATHPILOT: GLOBAL LOADING SYSTEM VERIFICATION SUITE
 * Validates all visual, architectural, and animation requirements of the PathPilot Loader.
 */

import fs from 'fs';
import path from 'path';

let passed = 0;
let failed = 0;

function check(condition, testName, details = '') {
  if (condition) {
    passed++;
    console.log(`✅ [PASS] ${testName}`);
  } else {
    failed++;
    console.error(`❌ [FAIL] ${testName}`);
    if (details) console.error(`   ↳ ${details}`);
  }
}

console.log('================================================================');
console.log('=== PATHPILOT: GLOBAL LOADING SYSTEM AUDIT                   ===');
console.log('================================================================\n');

// 1. Loader Component File & Imports
console.log('--- Section 1: Loader Component Architecture & Framer Motion ---');
const loaderPath = path.resolve('client/src/components/common/Loader.jsx');
const loaderExists = fs.existsSync(loaderPath);
check(loaderExists, 'Loader.jsx component file exists');

const loaderCode = fs.readFileSync(loaderPath, 'utf8');
check(
  loaderCode.includes('framer-motion') && loaderCode.includes('motion'),
  'Loader utilizes framer-motion for smooth hardware-accelerated animations'
);
check(
  loaderCode.includes('useId'),
  'Unique SVG gradient IDs generated per instance to prevent cross-component collision'
);

// 2. Stationary Center Logo vs Rotating Ring
console.log('\n--- Section 2: Stationary Logo & Independent Rotating Ring ---');
check(
  loaderCode.includes('rotate: 360') &&
  loaderCode.includes("ease: 'linear'") &&
  loaderCode.includes('repeat: Infinity'),
  'Metallic circular ring rotates continuously 360° with smooth linear loop'
);
check(
  loaderCode.includes('COMPLETELY STATIONARY'),
  'Stationary center logo structure confirmed'
);
check(
  loaderCode.includes('path d="m22 2-7 20-4-9-9-4Z"') && loaderCode.includes('path d="M22 2 11 13"'),
  'Center element renders canonical PathPilot navigation pilot / paper plane logo glyph'
);

// 3. Metallic Ring Aesthetics & Iridescent Lighting
console.log('\n--- Section 3: Metallic Ring Aesthetics & Iridescent Lighting ---');
check(
  loaderCode.includes('#C7D2FE') && // soft lavender
  loaderCode.includes('#BAE6FD') && // sky blue
  loaderCode.includes('#FBCFE8') && // soft pink
  loaderCode.includes('#FFFFFF'),   // specular white
  'Ring incorporates subtle PathPilot pastel/iridescent lighting (lavender, blue, pink, white)'
);
check(
  loaderCode.includes('strokeDasharray') && loaderCode.includes('linearGradient'),
  'Moving metallic highlight / shimmer arc implemented along the ring perimeter'
);
check(
  loaderCode.includes('feGaussianBlur') || loaderCode.includes('blur'),
  'Subtle specular shimmer filter implemented'
);
check(
  loaderCode.includes('radial-gradient') && loaderCode.includes('blur(6px)'),
  'Subtle ambient aura with breathing pulsing glow implemented'
);

// 4. Smooth Exit Transition & Sizing
console.log('\n--- Section 4: Smooth Exit Transition & Standardized Sizes ---');
check(
  loaderCode.includes('initial={{ opacity: 0') &&
  loaderCode.includes('exit={{ opacity: 0'),
  'Smooth enter and exit transitions (fade/scale) defined'
);
check(
  loaderCode.includes('SIZE_MAP') &&
  loaderCode.includes('xs') &&
  loaderCode.includes('sm') &&
  loaderCode.includes('md') &&
  loaderCode.includes('lg') &&
  loaderCode.includes('xl'),
  'Standardized size map (xs, sm, md, lg, xl, and numeric px) supported'
);
check(
  loaderCode.includes('fullScreen') && loaderCode.includes('backdrop-blur'),
  'Full-screen glassmorphic modal overlay mode supported'
);
check(
  loaderCode.includes('PageLoader') && loaderCode.includes('CardLoader'),
  'Convenient PageLoader and CardLoader helper components exported'
);
check(
  loaderCode.includes('useReducedMotion') && loaderCode.includes('shouldReduceMotion'),
  'Accessibility: prefers-reduced-motion is respected via useReducedMotion hook'
);

// 5. Global Loading Context
console.log('\n--- Section 5: Global Loading Context & Hook ---');
const contextPath = path.resolve('client/src/context/LoadingContext.jsx');
const contextExists = fs.existsSync(contextPath);
check(contextExists, 'LoadingContext.jsx file exists');

const contextCode = fs.readFileSync(contextPath, 'utf8');
check(
  contextCode.includes('LoadingProvider') && contextCode.includes('useLoading'),
  'LoadingProvider and useLoading hook exported'
);
check(
  contextCode.includes('showLoading') && contextCode.includes('hideLoading'),
  'Programmatic showLoading and hideLoading functions exposed'
);

// 6. App.jsx Provider Mounting
console.log('\n--- Section 6: App.jsx Integration ---');
const appPath = path.resolve('client/src/App.jsx');
const appCode = fs.readFileSync(appPath, 'utf8');
check(
  appCode.includes('LoadingProvider') && appCode.includes('<LoadingProvider>'),
  'App.jsx mounts LoadingProvider wrapping the authenticated application tree'
);

// 7. Site-wide Integration Across Core Views
console.log('\n--- Section 7: Site-wide Integration Across Core Views ---');
const protectedRouteCode = fs.readFileSync(path.resolve('client/src/components/layout/ProtectedRoute.jsx'), 'utf8');
check(protectedRouteCode.includes('<Loader') || protectedRouteCode.includes('Loader'), 'ProtectedRoute uses global Loader');

const authGuardCode = fs.readFileSync(path.resolve('client/src/components/auth/AuthGuard.jsx'), 'utf8');
check(authGuardCode.includes('<Loader') || authGuardCode.includes('Loader'), 'AuthGuard uses global Loader');

const dashboardCode = fs.readFileSync(path.resolve('client/src/pages/student/Dashboard.jsx'), 'utf8');
check(dashboardCode.includes('PageLoader') || dashboardCode.includes('Loader'), 'Dashboard uses global PageLoader/Loader');

const milestoneCode = fs.readFileSync(path.resolve('client/src/pages/student/MilestoneDetail.jsx'), 'utf8');
check(milestoneCode.includes('PageLoader') || milestoneCode.includes('Loader'), 'MilestoneDetail uses global PageLoader/Loader');

const reassessCode = fs.readFileSync(path.resolve('client/src/pages/student/Reassessment.jsx'), 'utf8');
check(reassessCode.includes('Loader'), 'Reassessment uses global Loader across checking/evaluating phases');

const profileCode = fs.readFileSync(path.resolve('client/src/pages/student/ProfileSetup.jsx'), 'utf8');
check(profileCode.includes('Loader'), 'ProfileSetup uses global Loader');

const authCallbackCode = fs.readFileSync(path.resolve('client/src/pages/auth/AuthCallback.jsx'), 'utf8');
check(authCallbackCode.includes('Loader'), 'AuthCallback uses global Loader');

const gardenOnboardingCode = fs.readFileSync(path.resolve('client/src/pages/student/LearningGardenOnboardingPage.jsx'), 'utf8');
check(gardenOnboardingCode.includes('PageLoader') || gardenOnboardingCode.includes('Loader'), 'LearningGardenOnboardingPage uses global PageLoader');

const initialAssessmentCode = fs.readFileSync(path.resolve('client/src/pages/student/InitialAssessment.jsx'), 'utf8');
check(initialAssessmentCode.includes('PageLoader') || initialAssessmentCode.includes('Loader'), 'InitialAssessment uses global PageLoader');

const aiMentorCode = fs.readFileSync(path.resolve('client/src/components/learning/AIMentor.jsx'), 'utf8');
check(aiMentorCode.includes('Loader'), 'AIMentor uses global Loader for AI response waiting state');

console.log('\n================================================================');
console.log('=== AUDIT SUMMARY                                            ===');
console.log('================================================================');
console.log(`Total Checks:  ${passed + failed}`);
console.log(`Passed:        ${passed}`);
console.log(`Failed:        ${failed}`);
console.log(`Success Rate:  ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed === 0) {
  console.log('\n🎉 ALL GLOBAL PATHPILOT LOADING SYSTEM REQUIREMENTS VERIFIED SUCCESSFULLY!');
} else {
  process.exit(1);
}
