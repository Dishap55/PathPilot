const { createClient } = require('@supabase/supabase-js');
const env = require('./env');

const supabase = createClient(env.SUPABASE_URL || 'https://placeholder.supabase.co', env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key', {
  auth: { persistSession: false }
});

module.exports = { supabase };
