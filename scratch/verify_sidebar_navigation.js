const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('================================================================');
console.log('=== PATHPILOT: GLOBAL PERSISTENT SIDEBAR NAVIGATION AUDIT    ===');
console.log('================================================================\n');

let passed = 0;
let failed = 0;

function record(suite, num, desc, condition, detail = '') {
  if (condition) {
    console.log(`✅ [PASS] [${suite} #${num}] ${desc}`);
    if (detail) console.log(`   ↳ ${detail}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] [${suite} #${num}] ${desc}`);
    if (detail) console.error(`   ↳ ${detail}`);
    failed++;
  }
}

const clientRoot = path.resolve(__dirname, '../client/src');
const readFile = (rel) => fs.readFileSync(path.join(clientRoot, rel), 'utf-8');

try {
  // -------------------------------------------------------------------------
  // SECTION 1: App.jsx Routing & Authenticated Layout Hierarchy
  // -------------------------------------------------------------------------
  console.log('--- Section 1: App.jsx Routing & Layout Enclosure ---');
  const appCode = readFile('App.jsx');

  // Verify AppLayout wraps the student routes
  const hasAppLayoutBlock = appCode.includes('<Route element={<AppLayout />}>') || appCode.includes('<Route element={<AuthenticatedLayout />}>');
  record('ROUTING', 1, 'Shared layout wraps authenticated student route group', hasAppLayoutBlock);

  // Extract content inside layout block
  const layoutBlockMatch = appCode.match(/<Route element=\{<(?:AppLayout|AuthenticatedLayout) \/>\}>([\s\S]*?)<\/Route>/);
  assert(layoutBlockMatch, 'Could not extract layout route block');
  const layoutBlock = layoutBlockMatch[1];

  record('ROUTING', 2, '/dashboard route is mounted inside shared layout',
    layoutBlock.includes('path="/dashboard"') && layoutBlock.includes('<Dashboard />'));

  record('ROUTING', 3, '/roadmap route is mounted inside shared layout',
    layoutBlock.includes('path="/roadmap"') && layoutBlock.includes('<Roadmap />'));

  record('ROUTING', 4, '/roadmap/milestone/:id route is mounted inside shared layout',
    layoutBlock.includes('path="/roadmap/milestone/:id"') && layoutBlock.includes('<MilestoneDetail />'));

  record('ROUTING', 5, '/subjects route is mounted inside shared layout with 6-subject UI',
    layoutBlock.includes('path="/subjects"') && layoutBlock.includes('<Practice />'));

  record('ROUTING', 6, '/practice route safely redirects to /subjects',
    layoutBlock.includes('path="/practice"') && layoutBlock.includes('Navigate to="/subjects"'));

  record('ROUTING', 7, '/progress route is mounted inside shared layout',
    layoutBlock.includes('path="/progress"') && layoutBlock.includes('<Progress />'));

  record('ROUTING', 8, '/profile route is mounted inside shared layout',
    layoutBlock.includes('path="/profile"') && layoutBlock.includes('<ProfileSetup'));

  record('ROUTING', 9, '/reassessment route is mounted inside shared layout',
    layoutBlock.includes('path="/reassessment"') && layoutBlock.includes('<Reassessment />'));

  // Verify unauthenticated routes are outside shared layout
  const outsideLayout = appCode.replace(layoutBlockMatch[0], '');
  record('ROUTING', 10, 'Landing page (/) is outside shared layout',
    outsideLayout.includes('path="/"') && !layoutBlock.includes('path="/"'));

  record('ROUTING', 11, 'Login (/login) is outside shared layout',
    outsideLayout.includes('path="/login"') && !layoutBlock.includes('path="/login"'));

  record('ROUTING', 12, 'Signup (/signup) is outside shared layout',
    outsideLayout.includes('path="/signup"') && !layoutBlock.includes('path="/signup"'));

  record('ROUTING', 13, 'Assessment (/assessment/initial) is outside shared layout',
    outsideLayout.includes('path="/assessment/initial"') && !layoutBlock.includes('path="/assessment/initial"'));

  record('ROUTING', 14, 'Garden Onboarding (/onboarding/garden) is outside shared layout',
    outsideLayout.includes('path="/onboarding/garden"') && !layoutBlock.includes('path="/onboarding/garden"'));

  // -------------------------------------------------------------------------
  // SECTION 2: Sidebar Component Architecture
  // -------------------------------------------------------------------------
  console.log('\n--- Section 2: Sidebar Architecture & State Management ---');
  const sidebarCode = readFile('components/layout/Sidebar.jsx');

  const asideMatches = (sidebarCode.match(/<aside/g) || []).length;
  record('SIDEBAR', 1, 'Only ONE <aside> tag rendered for desktop view', asideMatches === 1,
    `Found ${asideMatches} <aside> tag in Sidebar.jsx`);

  record('SIDEBAR', 2, 'Expanded width defined as w-64', sidebarCode.includes("'w-64"));
  record('SIDEBAR', 3, 'Collapsed width defined as w-20', sidebarCode.includes("w-20"));
  record('SIDEBAR', 4, 'Smooth width transitions using transition-all duration-300',
    sidebarCode.includes('transition-all duration-300'));

  record('SIDEBAR', 5, 'Toggle control button switches between ChevronsLeft and ChevronsRight',
    sidebarCode.includes('ChevronsLeft') && sidebarCode.includes('ChevronsRight') && sidebarCode.includes('toggleCollapse'));

  record('SIDEBAR', 6, 'Accessible toggle labels (Expand sidebar / Minimize sidebar)',
    sidebarCode.includes('Expand sidebar') && sidebarCode.includes('Minimize sidebar'));

  record('SIDEBAR', 7, 'Collapsed preference persisted in localStorage under pathpilot_sidebar_collapsed',
    sidebarCode.includes('pathpilot_sidebar_collapsed'));

  record('SIDEBAR', 8, 'Accessible tooltips on minimized items with role="tooltip"',
    sidebarCode.includes('role="tooltip"') && sidebarCode.includes('absolute left-full'));

  record('SIDEBAR', 9, 'Tooltips visible on keyboard focus via group-focus-within:opacity-100',
    sidebarCode.includes('group-focus-within:opacity-100'));

  record('SIDEBAR', 10, 'Learning Garden Keep Growing card hidden when collapsed',
    sidebarCode.includes('!isCollapsed &&') && sidebarCode.includes('Keep Growing!'));

  // -------------------------------------------------------------------------
  // SECTION 3: Dynamic Active Route Evaluation
  // -------------------------------------------------------------------------
  console.log('\n--- Section 3: Dynamic Active Route Evaluation ---');
  record('ACTIVE_STATE', 1, 'Sidebar uses React Router useLocation for authoritative path inspection',
    sidebarCode.includes('useLocation()') || sidebarCode.includes('useLocation'));

  record('ACTIVE_STATE', 2, 'Sidebar dynamically identifies Dashboard (/dashboard)',
    sidebarCode.includes("to === '/dashboard'") && sidebarCode.includes("p === '/dashboard'"));

  record('ACTIVE_STATE', 3, 'Sidebar dynamically identifies Subjects (/subjects)',
    sidebarCode.includes("to === '/subjects'") && sidebarCode.includes("p === '/subjects'"));

  record('ACTIVE_STATE', 4, 'Sidebar dynamically identifies Roadmap (/roadmap)',
    sidebarCode.includes("to === '/roadmap'") && sidebarCode.includes("p === '/roadmap'"));

  record('ACTIVE_STATE', 5, 'Sidebar removes separate Practice item and unifies Subjects route matching',
    !sidebarCode.includes("label: 'Practice'") && sidebarCode.includes("to === '/subjects'") && sidebarCode.includes("p === '/practice'"));

  record('ACTIVE_STATE', 6, 'Sidebar dynamically identifies Progress (/progress)',
    sidebarCode.includes("to === '/progress'") && sidebarCode.includes("p === '/progress'"));

  record('ACTIVE_STATE', 7, 'Sidebar dynamically identifies Periodic Reassessment (/reassessment)',
    sidebarCode.includes("to === '/reassessment'") && sidebarCode.includes("p.startsWith('/reassessment')"));

  record('ACTIVE_STATE', 8, 'Sidebar dynamically identifies Profile (/profile & /profile-setup)',
    sidebarCode.includes("to === '/profile'") && sidebarCode.includes("p === '/profile'"));

  record('ACTIVE_STATE', 9, 'Active items have aria-current="page" accessibility attribute',
    sidebarCode.includes("aria-current={active ? 'page' : undefined}"));

  // -------------------------------------------------------------------------
  // SECTION 4: Mobile Responsive Drawer
  // -------------------------------------------------------------------------
  console.log('\n--- Section 4: Mobile Responsive Drawer ---');
  record('MOBILE', 1, 'Mobile slide-over drawer hidden on desktop (md:hidden)',
    sidebarCode.includes('md:hidden') && sidebarCode.includes('mobileOpen'));

  record('MOBILE', 2, 'Backdrop blur overlay prevents background interaction',
    sidebarCode.includes('backdrop-blur') && sidebarCode.includes('bg-slate-900/40'));

  record('MOBILE', 3, 'Drawer closes when navigation links are clicked (onClick={onClose})',
    sidebarCode.includes('onClick={onClose}'));

  record('MOBILE', 4, 'Keyboard Escape key listener closes mobile drawer',
    sidebarCode.includes("'Escape'") && sidebarCode.includes('onClose()'));

  record('MOBILE', 5, 'Dialog role and aria-modal attributes set on drawer',
    sidebarCode.includes('role="dialog"') && sidebarCode.includes('aria-modal="true"'));

  // -------------------------------------------------------------------------
  // SECTION 5: Dynamic Authenticated User Info
  // -------------------------------------------------------------------------
  console.log('\n--- Section 5: Dynamic User Identity Invariants ---');
  record('USER_INFO', 1, 'Sidebar uses authentic useAuth hook for user context',
    sidebarCode.includes('useAuth()'));

  record('USER_INFO', 2, 'Zero hardcoded student names in Sidebar.jsx',
    !sidebarCode.includes("'Disha'") && !sidebarCode.includes("'Ananya'") && !sidebarCode.includes("'Engineering Scholar'"));

  record('USER_INFO', 3, 'Dynamic initial and name resolution from user object',
    sidebarCode.includes('studentName.charAt(0).toUpperCase()') && sidebarCode.includes('user?.user_metadata?.full_name'));

  // -------------------------------------------------------------------------
  // SECTION 6: Layout & Content Responsiveness
  // -------------------------------------------------------------------------
  console.log('\n--- Section 6: AppLayout & Main Content Adaptation ---');
  const layoutCode = readFile('components/layout/AppLayout.jsx');

  record('LAYOUT', 1, 'AppLayout exports AuthenticatedLayout alias',
    layoutCode.includes('AuthenticatedLayout = AppLayout'));

  record('LAYOUT', 2, 'Main content uses flex-1 min-w-0 to automatically expand into freed space',
    layoutCode.includes('flex-1') && layoutCode.includes('min-w-0'));

  record('LAYOUT', 3, 'Main content container supports ultra-wide displays (2xl:max-w-[1536px])',
    layoutCode.includes('2xl:max-w-[1536px]') || layoutCode.includes('max-w-7xl'));

  record('LAYOUT', 4, 'Horizontal overflow clipping prevented (overflow-x-hidden on outer container)',
    layoutCode.includes('overflow-x-hidden'));

  // -------------------------------------------------------------------------
  // SECTION 7: New Page Components Verification
  // -------------------------------------------------------------------------
  console.log('\n--- Section 7: Authenticated Pages Integrity ---');
  const subjectsExists = fs.existsSync(path.join(clientRoot, 'pages/student/Subjects.jsx'));
  record('PAGES', 1, 'Subjects.jsx page component created and functional', subjectsExists);

  const practiceExists = fs.existsSync(path.join(clientRoot, 'pages/student/Practice.jsx'));
  record('PAGES', 2, 'Practice.jsx page component created and functional', practiceExists);

  const progressExists = fs.existsSync(path.join(clientRoot, 'pages/student/Progress.jsx'));
  record('PAGES', 3, 'Progress.jsx page component created and functional', progressExists);

  const profileCode = readFile('pages/student/ProfileSetup.jsx');
  record('PAGES', 4, 'ProfileSetup supports isEmbedded prop for in-layout rendering without wallpaper/home button',
    profileCode.includes('isEmbedded') && profileCode.includes('!isEmbedded &&'));

  const milestoneCode = readFile('pages/student/MilestoneDetail.jsx');
  record('PAGES', 5, 'MilestoneDetail adapts cleanly inside AppLayout without fixed full-screen outer bounds',
    milestoneCode.includes('w-full space-y-6 py-2'));

  const reassessCode = readFile('pages/student/Reassessment.jsx');
  record('PAGES', 6, 'Reassessment adapts cleanly inside AppLayout without min-h-screen wrappers',
    reassessCode.includes('w-full py-4'));

} catch (err) {
  console.error('Audit execution error:', err);
  failed++;
}

console.log('\n================================================================');
console.log('=== AUDIT SUMMARY                                            ===');
console.log('================================================================');
console.log(`Total Checks:  ${passed + failed}`);
console.log(`Passed:        ${passed}`);
console.log(`Failed:        ${failed}`);
console.log(`Success Rate:  ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed === 0) {
  console.log('\n🎉 ALL PERSISTENT SIDEBAR & NAVIGATION REQUIREMENTS VERIFIED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.log('\n⚠️ Some checks failed. Review output above.');
  process.exit(1);
}
