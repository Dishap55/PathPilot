const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jziwhsxyvdnbwzcgfioc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7oWfrI1gN6PrOr0NSjUdLQ_1ucfB_IE';

class BrowserLocalStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    const val = this.store.get(key) || null;
    return val;
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
}

// Single persistent storage shared across page reloads
const sharedLocalStorage = new BrowserLocalStorage();

async function simulateFullBrowserOAuthFlow(detectSessionInUrl, includeSignOut) {
  console.log(`\n======================================================`);
  console.log(`TESTING: detectSessionInUrl=${detectSessionInUrl}, includeSignOut=${includeSignOut}`);
  console.log(`======================================================`);

  sharedLocalStorage.clear();

  // Page 1: /signup
  console.log('--- Page 1: /signup loads ---');
  const clientPage1 = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: sharedLocalStorage,
      flowType: 'pkce',
      detectSessionInUrl: detectSessionInUrl,
      persistSession: true,
      autoRefreshToken: true
    }
  });

  // User clicks "Continue with Google"
  console.log('User clicks "Continue with Google"');
  if (includeSignOut) {
    console.log('Executing signOut()...');
    await clientPage1.auth.signOut();
  }

  console.log('Executing signInWithOAuth()...');
  const oauthRes = await clientPage1.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback'
    }
  });

  console.log('Keys in localStorage immediately after signInWithOAuth:');
  for (const k of sharedLocalStorage.store.keys()) {
    console.log('  -', k);
  }

  // Browser redirects to Google... then redirects back to /auth/callback?code=mock_code
  console.log('\n--- Page 2: /auth/callback?code=mock_code loads (Fresh Page Load) ---');
  
  // A new client is instantiated when the new page loads in the browser
  const clientPage2 = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: sharedLocalStorage,
      flowType: 'pkce',
      detectSessionInUrl: detectSessionInUrl,
      persistSession: true,
      autoRefreshToken: true
    }
  });

  console.log('Keys in localStorage at moment Page 2 client initializes:');
  for (const k of sharedLocalStorage.store.keys()) {
    console.log('  -', k);
  }

  // Now AuthCallback component mounts and executes exchangeCodeForSession
  console.log('Executing clientPage2.auth.exchangeCodeForSession("mock_code")...');
  const exchangeRes = await clientPage2.auth.exchangeCodeForSession('mock_code');

  console.log('Exchange result error:', exchangeRes.error ? exchangeRes.error.message : 'SUCCESS');
}

async function runAll() {
  await simulateFullBrowserOAuthFlow(false, true);
  await simulateFullBrowserOAuthFlow(false, false);
}

runAll().catch(console.error);
