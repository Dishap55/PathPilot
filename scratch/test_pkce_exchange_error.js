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

async function testExchangeWithoutVerifier() {
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

  console.log('Testing exchangeCodeForSession without code verifier in storage:');
  try {
    const result = await client.auth.exchangeCodeForSession('dummy_code_12345');
    console.log('Result returned (did not throw):', {
      error: result.error?.message,
      errorCode: result.error?.code,
      name: result.error?.name,
      session: Boolean(result.data?.session)
    });
  } catch (err) {
    console.log('Function THREW exception:', err.message, err.name);
  }

  console.log('\nTesting getUser() when no session exists:');
  try {
    const userRes = await client.auth.getUser();
    console.log('getUser result:', {
      user: userRes.data?.user,
      error: userRes.error?.message,
      errorName: userRes.error?.name
    });
  } catch (err) {
    console.log('getUser THREW:', err.message);
  }
}

testExchangeWithoutVerifier().catch(console.error);
