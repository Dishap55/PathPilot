const path = require('path');
const { supabaseAdmin } = require(path.resolve('backend/config/supabaseAdmin'));

async function inspectSupabase() {
  console.log('--- Inspecting auth.users ---');
  const { data: users, error: usersErr } = await supabaseAdmin.auth.admin.listUsers();
  if (usersErr) {
    console.error('Error listing users:', usersErr);
  } else {
    console.log(`Found ${users.users.length} users in auth.users:`);
    users.users.slice(0, 10).forEach(u => {
      console.log(`- ID: ${u.id}, Email: ${u.email}, Confirmed: ${u.email_confirmed_at}, Created: ${u.created_at}, Metadata:`, u.user_metadata);
    });
  }

  console.log('\n--- Inspecting student_profiles ---');
  const { data: profiles, error: profErr } = await supabaseAdmin
    .from('student_profiles')
    .select('id, full_name, degree, branch, setup_completed, created_at');
  if (profErr) {
    console.error('Error listing profiles:', profErr);
  } else {
    console.log(`Found ${profiles.length} student_profiles:`);
    profiles.forEach(p => console.log(p));
  }

  console.log('\n--- Inspecting Triggers on auth schema or public schema ---');
  const { data: triggers, error: trigErr } = await supabaseAdmin.rpc('get_triggers').catch(() => ({ error: 'rpc not found' }));
  if (trigErr) {
    // Try raw query via pg or check if possible
    console.log('RPC get_triggers not available, checking via rest...');
  }
}

inspectSupabase();
