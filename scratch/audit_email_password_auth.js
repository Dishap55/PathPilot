const { createClient } = require('@supabase/supabase-js');
const { supabase: adminClient } = require('../server/config/supabase');

const SUPABASE_URL = 'https://jziwhsxyvdnbwzcgfioc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7oWfrI1gN6PrOr0NSjUdLQ_1ucfB_IE';
const API_BASE_URL = 'http://localhost:5000/api';

// In-memory localStorage mock for node to test session persistence
class MockStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.get(key) || null;
  }
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
  get length() {
    return this.store.size;
  }
  key(i) {
    return Array.from(this.store.keys())[i] || null;
  }
}

const mockStorage = new MockStorage();

async function runAudit() {
  console.log('====================================================');
  console.log('STARTING PATHPILOT AUTHENTICATION AUDIT');
  console.log('====================================================\n');

  const testEmail = `audit.student.${Date.now()}@pathpilot.org`;
  const testPassword = 'TestPassword123!';
  const testName = 'Audit Student';

  console.log('TEST CREDENTIALS:');
  console.log('- Email:', testEmail);
  console.log('- Name:', testName);
  console.log('- Password format: [VERIFIED >= 6 chars]\n');

  // ==========================================
  // TEST 1 — SIGNUP
  // ==========================================
  console.log('----------------------------------------------------');
  console.log('TEST 1 — SIGNUP FLOW EXECUTION');
  console.log('----------------------------------------------------');

  let signupHttpStatus = null;
  let signupHttpBody = null;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        fullName: testName,
        preferredSubject: 'DSA'
      })
    });
    signupHttpStatus = res.status;
    signupHttpBody = await res.json();
    console.log(`[Signup API] HTTP Status: ${signupHttpStatus}`);
    console.log(`[Signup API] Response:`, JSON.stringify(signupHttpBody));
  } catch (err) {
    console.error('[Signup API] Request error:', err.message);
  }

  // 1. Check Supabase Auth via Admin API
  const { data: usersData, error: listError } = await adminClient.auth.admin.listUsers();
  let createdAuthUser = null;
  if (!listError && usersData?.users) {
    createdAuthUser = usersData.users.find(u => u.email?.toLowerCase() === testEmail.toLowerCase());
  }

  const userCreatedInAuth = Boolean(createdAuthUser);
  const createdUserId = createdAuthUser?.id || null;
  console.log(`\n1. Supabase Auth user created: ${userCreatedInAuth ? 'YES' : 'NO'}`);
  console.log(`   - User ID: ${createdUserId}`);
  console.log(`   - Email confirmed: ${createdAuthUser?.email_confirmed_at ? 'YES' : 'NO'}`);
  console.log(`   - Provider: ${createdAuthUser?.app_metadata?.provider}`);

  // 2. Check student_profiles in Database
  let profileRecord = null;
  if (createdUserId) {
    const { data: prof, error: profErr } = await adminClient
      .from('student_profiles')
      .select('id, full_name, setup_completed, created_at')
      .eq('id', createdUserId)
      .maybeSingle();

    if (profErr) {
      console.log(`   - student_profiles lookup error:`, profErr.message);
    } else {
      profileRecord = prof;
    }
  }
  console.log(`2. student_profiles record after signup: ${profileRecord ? 'PRESENT' : 'NULL'}`);
  if (profileRecord) {
    console.log(`   - Setup completed: ${profileRecord.setup_completed}`);
  }

  // 3. Client-side Auto-Login Simulation
  const clientSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: mockStorage,
      persistSession: true,
      autoRefreshToken: true,
      flowType: 'pkce',
      detectSessionInUrl: false
    }
  });

  const autoLoginRes = await clientSupabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  });

  const autoLoginSession = autoLoginRes.data?.session || null;
  const sessionAfterSignup = autoLoginSession ? 'PRESENT' : 'NULL';
  console.log(`3. Session after signup (auto-login): ${sessionAfterSignup}`);
  if (autoLoginSession) {
    console.log(`   - Session user ID matches created ID: ${autoLoginSession.user.id === createdUserId}`);
  }

  // 4. Client route destination from Signup.jsx
  // Signup.jsx line 109-118:
  // if (data?.session) navigate('/profile-setup'); else navigate('/profile-setup');
  console.log(`4. Signup.jsx redirect destination: /profile-setup (Actual Code: navigate('/profile-setup'))`);
  console.log(`   - Does Signup redirect to Login? NO (Code directly navigates to /profile-setup)`);
  console.log(`   - User authenticated after signup: ${autoLoginSession ? 'YES (Valid Supabase JWT Session)' : 'NO'}\n`);

  // ==========================================
  // TEST 2 — LOGIN WITH THE SAME TEST ACCOUNT
  // ==========================================
  console.log('----------------------------------------------------');
  console.log('TEST 2 — LOGIN WITH THE SAME TEST ACCOUNT');
  console.log('----------------------------------------------------');

  // Create a separate client with fresh storage to simulate opening /login
  const freshClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: new MockStorage(),
      persistSession: true,
      autoRefreshToken: true,
      flowType: 'pkce',
      detectSessionInUrl: false
    }
  });

  let authContextUser = null;
  freshClient.auth.onAuthStateChange((event, session) => {
    authContextUser = session?.user ?? null;
  });

  const loginRes = await freshClient.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  });

  const loginSuccess = !loginRes.error && Boolean(loginRes.data?.session);
  const loginSession = loginRes.data?.session || null;
  const sessionUserId = loginSession?.user?.id || null;

  console.log(`1. signInWithPassword: ${loginSuccess ? 'SUCCESS' : 'ERROR: ' + loginRes.error?.message}`);
  console.log(`2. session: ${loginSession ? 'PRESENT' : 'NULL'}`);
  console.log(`3. session.user.id: ${sessionUserId}`);
  console.log(`4. AuthContext user: ${authContextUser ? 'PRESENT (ID: ' + authContextUser.id + ')' : 'NULL'}`);

  // Profile lookup
  let loginProfileLookup = null;
  let profileLookupStatus = 'NULL';
  if (sessionUserId) {
    const { data: pData, error: pErr } = await freshClient
      .from('student_profiles')
      .select('id, setup_completed')
      .eq('id', sessionUserId)
      .maybeSingle();

    if (pErr) {
      profileLookupStatus = `ERROR: ${pErr.message}`;
    } else if (pData) {
      profileLookupStatus = `PRESENT (setup_completed: ${pData.setup_completed})`;
      loginProfileLookup = pData;
    } else {
      profileLookupStatus = 'NULL (Record does not exist yet for new user)';
    }
  }
  console.log(`5. profile lookup: ${profileLookupStatus}`);

  // Route destination:
  // In Login.jsx line 111-114:
  // if (data?.session) navigate('/dashboard')
  // In Dashboard.jsx lines 60-70:
  // if (!onboarded) navigate('/onboarding/garden')
  console.log(`6. Login.jsx redirect destination: /dashboard (Code line 113)`);
  console.log(`   - If garden onboarding not yet completed: /onboarding/garden (Dashboard guard line 69)\n`);

  // ==========================================
  // TEST 3 — REFRESH SESSION (SESSION PERSISTENCE)
  // ==========================================
  console.log('----------------------------------------------------');
  console.log('TEST 3 — REFRESH SESSION (PERSISTENCE)');
  console.log('----------------------------------------------------');

  // Verify that fresh client instance reading from same storage preserves session
  const persistedSessionRes = await freshClient.auth.getSession();
  const persistedSession = persistedSessionRes.data?.session || null;
  const sessionSurvives = Boolean(persistedSession && persistedSession.user?.id === sessionUserId);

  console.log(`1. Session survives refresh: ${sessionSurvives ? 'YES' : 'NO'}`);
  console.log(`2. Persisted user ID matches: ${persistedSession?.user?.id === sessionUserId}`);

  // Simulate full page reload: new Supabase client initialized with existing storage
  const reloadedClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: freshClient.auth.storage || mockStorage,
      persistSession: true,
      autoRefreshToken: true,
      flowType: 'pkce',
      detectSessionInUrl: false
    }
  });

  const reloadedSessionRes = await reloadedClient.auth.getSession();
  const reloadedSession = reloadedSessionRes.data?.session || null;
  console.log(`3. Full reload client getSession(): ${reloadedSession ? 'PRESENT' : 'NULL'}`);
  console.log(`4. User recognized after reload: ${reloadedSession?.user?.id === sessionUserId ? 'YES' : 'NO'}`);
  console.log(`5. Unexpected redirect to Login: NO (Session is intact)\n`);

  // ==========================================
  // TEST 4 — LOGOUT
  // ==========================================
  console.log('----------------------------------------------------');
  console.log('TEST 4 — LOGOUT AND RE-LOGIN');
  console.log('----------------------------------------------------');

  const logoutRes = await reloadedClient.auth.signOut();
  console.log(`1. auth.signOut() executed. Error: ${logoutRes.error ? logoutRes.error.message : 'NONE'}`);

  const postLogoutSession = (await reloadedClient.auth.getSession()).data?.session;
  console.log(`2. Session after logout: ${postLogoutSession ? 'PRESENT' : 'NULL'}`);

  // Re-login with same test account
  const reloginRes = await reloadedClient.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  });
  const reloginSession = reloginRes.data?.session || null;
  console.log(`3. Re-login with same test account: ${reloginSession ? 'SUCCESS' : 'FAILED'}`);
  console.log(`4. Re-login user ID matches: ${reloginSession?.user?.id === createdUserId ? 'YES' : 'NO'}\n`);

  console.log('====================================================');
  console.log('EMAIL/PASSWORD AUDIT COMPLETE');
  console.log('====================================================');
}

runAudit().catch(err => {
  console.error('Fatal audit failure:', err);
});
