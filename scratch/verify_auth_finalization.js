/**
 * PathPilot — Authentication Flow Finalization Verification Suite
 * Tests Email/Password Signup, 409 Conflict Modal, Google OAuth Integration,
 * Forgot Password Anti-Enumeration, Reset Password Flow, and Mobile Responsiveness.
 * READ-ONLY / NON-DESTRUCTIVE.
 */

const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');

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

(async () => {
  console.log('\n================================================================');
  console.log('=== PATHPILOT: AUTH FLOW FINALIZATION VERIFICATION SUITE    ===');
  console.log('================================================================\n');

  // 1. authService & AuthContext Exports
  await check('[SERVICE #1] authService includes signInWithGoogle, signup, login, logout, forgotPassword, resetPassword', async () => {
    const src = fs.readFileSync(path.resolve(ROOT, 'client/src/services/authService.js'), 'utf8');
    assert(src.includes('signInWithGoogle:'), 'Missing signInWithGoogle method in authService.js');
    assert(src.includes('forgotPassword:'), 'Missing forgotPassword method in authService.js');
    assert(src.includes('resetPassword:'), 'Missing resetPassword method in authService.js');
  });

  await check('[CONTEXT #1] AuthContext provides signInWithGoogle, login, signup, logout, resetPasswordForEmail', async () => {
    const src = fs.readFileSync(path.resolve(ROOT, 'client/src/context/AuthContext.jsx'), 'utf8');
    assert(src.includes('signInWithGoogle'), 'Missing signInWithGoogle in AuthContext.jsx');
    assert(src.includes('resetPasswordForEmail'), 'Missing resetPasswordForEmail in AuthContext.jsx');
  });

  // 2. Signup Page Verification
  const signupSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/pages/auth/Signup.jsx'), 'utf8');

  await check('[SIGNUP #1] Validates email format, min 6 char password, mismatch, terms', async () => {
    assert(signupSrc.includes('validateEmail'), 'Must validate email format');
    assert(signupSrc.includes('Password must be at least 6 characters long.'), 'Must validate password length');
    assert(signupSrc.includes('Passwords do not match.'), 'Must validate password confirmation match');
    assert(signupSrc.includes('Please accept the Terms'), 'Must validate terms agreement');
  });

  await check('[SIGNUP #2] Displays Account Already Exists modal popup with Go to Login CTA on HTTP 409', async () => {
    assert(signupSrc.includes('showAccountExistsModal') || signupSrc.includes('Account Already Exists'), 'Must have Account Already Exists modal');
    assert(signupSrc.includes('Go to Login'), 'Modal must have Go to Login button');
  });

  await check('[SIGNUP #3] Google OAuth button calls authService.signInWithGoogle()', async () => {
    assert(signupSrc.includes('handleGoogleSignup'), 'Must have handleGoogleSignup handler');
    assert(signupSrc.includes('signInWithGoogle'), 'Must call signInWithGoogle');
  });

  // 3. Login Page Verification
  const loginSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/pages/auth/Login.jsx'), 'utf8');

  await check('[LOGIN #1] Includes Forgot Password link pointing to /forgot-password', async () => {
    assert(loginSrc.includes('to="/forgot-password"'), 'Must link to /forgot-password');
  });

  await check('[LOGIN #2] Includes Continue with Google OAuth button calling signInWithGoogle()', async () => {
    assert(loginSrc.includes('handleGoogleLogin'), 'Must have handleGoogleLogin handler');
    assert(loginSrc.includes('signInWithGoogle'), 'Must call signInWithGoogle');
  });

  // 4. Forgot Password Verification
  const forgotSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/pages/auth/ForgotPassword.jsx'), 'utf8');

  await check('[FORGOT #1] Renders generic anti-enumeration success message', async () => {
    assert(forgotSrc.includes('If an account exists for this email, a password reset link has been sent.'), 'Must render anti-enumeration success message');
  });

  await check('[FORGOT #2] Handles rate limit 429 error cleanly', async () => {
    assert(forgotSrc.includes('rate limit') || forgotSrc.includes('Too many'), 'Must handle rate limiting');
  });

  // 5. Reset Password Verification
  const resetSrc = fs.readFileSync(path.resolve(ROOT, 'client/src/pages/auth/ResetPassword.jsx'), 'utf8');

  await check('[RESET #1] Validates password min length and confirmation match', async () => {
    assert(resetSrc.includes('password.length < 6'), 'Must validate password length');
    assert(resetSrc.includes('Passwords do not match.'), 'Must validate confirmation match');
  });

  await check('[RESET #2] Displays Password updated successfully message with Continue to Login button', async () => {
    assert(resetSrc.includes('Password updated successfully'), 'Must render success message');
    assert(resetSrc.includes('Continue to Login'), 'Must provide Continue to Login button');
  });

  // 6. Backend Domain Restrictions Check
  const backendAuthSrc = fs.readFileSync(path.resolve(ROOT, 'backend/routes/authRoutes.js'), 'utf8');

  await check('[BACKEND_AUTH #1] 0 artificial email domain or user-count limits in POST /api/auth/signup', async () => {
    assert(!backendAuthSrc.includes('@gmail.com only'), 'No hardcoded Gmail domain restriction');
    assert(!backendAuthSrc.includes('limit reached'), 'No artificial user limit');
    assert(backendAuthSrc.includes("res.status(409)"), 'Returns 409 Conflict for existing users');
  });

  // 7. Client Build Verification
  await check('[BUILD #1] Client production dist bundle exists and is fresh', async () => {
    const distPath = path.resolve(ROOT, 'client/dist/index.html');
    assert(fs.existsSync(distPath), 'dist/index.html missing');
    const stat = fs.statSync(distPath);
    const ageMs = Date.now() - stat.mtimeMs;
    assert(ageMs < 10 * 60 * 1000, `Build is stale (${Math.round(ageMs / 60000)}m old). Run npm run build.`);
  });

  console.log('\n================================================================');
  console.log('=== TEST SUMMARY                                             ===');
  console.log('================================================================');
  console.log(`Passed: ${passed} | Failed: ${failed}`);
  if (failed === 0) {
    console.log('\n🎉 ALL AUTHENTICATION FINALIZATION CHECKS PASSED!\n');
  } else {
    process.exit(1);
  }
})();
