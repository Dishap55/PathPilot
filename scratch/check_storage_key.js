const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jziwhsxyvdnbwzcgfioc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7oWfrI1gN6PrOr0NSjUdLQ_1ucfB_IE';

const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log('client.auth.storageKey:', client.auth.storageKey);
