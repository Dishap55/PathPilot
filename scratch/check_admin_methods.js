const { supabase } = require('../server/config/supabase');

async function checkSupabaseSettings() {
  try {
    // Check if admin API has any settings or provider endpoints
    console.log('Available auth.admin methods:');
    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(supabase.auth.admin)));
  } catch (e) {
    console.error('Error:', e);
  }
}

checkSupabaseSettings().catch(console.error);
