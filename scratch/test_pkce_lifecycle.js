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

async function testPkceFlow() {
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

  // Step 1: Sign in with OAuth
  const oAuthRes = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback'
    }
  });

  console.log('--- Storage after signInWithOAuth ---');
  for (const [k, v] of storage.store.entries()) {
    console.log(k, '=>', v.slice(0, 30) + '...');
  }

  // Step 2: What if signOut() is called?
  // Let's check if client.auth.signOut() removes the verifier!
  const client2 = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage,
      flowType: 'pkce',
      detectSessionInUrl: false,
      persistSession: true,
      autoRefreshToken: true
    }
  });

  console.log('\n--- Calling signOut() ---');
  await client2.auth.signOut();
  console.log('--- Storage after signOut() ---');
  for (const [k, v] of storage.store.entries()) {
    console.log(k, '=>', v.slice(0, 30) + '...');
  }
  if (storage.store.size === 0) {
    console.log('Storage is EMPTY after signOut()!');
  }
}

testPkceFlow().catch(console.error);
