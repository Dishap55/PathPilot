const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jziwhsxyvdnbwzcgfioc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7oWfrI1gN6PrOr0NSjUdLQ_1ucfB_IE';

class MockStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) { return this.store.get(key) || null; }
  setItem(key, value) { this.store.set(key, String(value)); }
  removeItem(key) { this.store.delete(key); }
  clear() { this.store.clear(); }
}

async function checkOAuthRedirectUrl() {
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
      redirectTo: 'http://localhost:3000/auth/callback'
    }
  });

  console.log('OAuth authorize URL:');
  console.log(res.data.url);

  const u = new URL(res.data.url);
  console.log('\nredirect_to query param in authorize URL:');
  console.log(u.searchParams.get('redirect_to'));
}

checkOAuthRedirectUrl().catch(console.error);
