const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jziwhsxyvdnbwzcgfioc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7oWfrI1gN6PrOr0NSjUdLQ_1ucfB_IE';

class MockStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    const val = this.store.get(key) || null;
    console.log(`[Storage.getItem] key="${key}" -> ${val ? val.slice(0, 30) + '...' : 'null'}`);
    return val;
  }
  setItem(key, value) {
    console.log(`[Storage.setItem] key="${key}"`);
    this.store.set(key, String(value));
  }
  removeItem(key) {
    console.log(`[Storage.removeItem] key="${key}"`);
    this.store.delete(key);
  }
  clear() {
    console.log(`[Storage.clear]`);
    this.store.clear();
  }
}

async function testExchangeInternals() {
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

  console.log('--- 1. Calling signInWithOAuth ---');
  await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback'
    }
  });

  console.log('\n--- 2. Calling exchangeCodeForSession with dummy code ---');
  const res = await client.auth.exchangeCodeForSession('dummy_code_test');
  console.log('Result:', res.error?.message);

  console.log('\n--- 3. What is left in storage after exchange? ---');
  for (const k of storage.store.keys()) {
    console.log('Remaining key:', k);
  }
}

testExchangeInternals().catch(console.error);
