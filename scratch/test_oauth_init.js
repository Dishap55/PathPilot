const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jziwhsxyvdnbwzcgfioc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7oWfrI1gN6PrOr0NSjUdLQ_1ucfB_IE';

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

async function testOAuthInitiation() {
  const storage = new MockStorage();
  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage,
      flowType: 'pkce',
      detectSessionInUrl: false,
      persistSession: true,
      autoRefreshToken: true
    }
  });

  const res = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
      queryParams: {
        prompt: 'select_account'
      }
    }
  });

  console.log('signInWithOAuth result:');
  console.log('- error:', res.error ? res.error.message : 'none');
  console.log('- url generated:', Boolean(res.data?.url));
  if (res.data?.url) {
    const u = new URL(res.data.url);
    console.log('- OAuth origin:', u.origin);
    console.log('- OAuth path:', u.pathname);
    console.log('- redirect_to param:', u.searchParams.get('redirect_to'));
    console.log('- code_challenge param present:', Boolean(u.searchParams.get('code_challenge')));
  }

  console.log('\nKeys in storage after signInWithOAuth:');
  for (const k of storage.store.keys()) {
    console.log('-', k);
  }
}

testOAuthInitiation().catch(console.error);
