const { supabase } = require('../server/config/supabase');

async function checkUsers() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error('Error listing users:', error);
    return;
  }
  console.log(`Total users in Supabase Auth: ${data.users.length}`);
  data.users.forEach(u => {
    console.log(`- ID: ${u.id}, Email: ${u.email}, Confirmed: ${Boolean(u.email_confirmed_at)}, Created: ${u.created_at}, AppMetadata: ${JSON.stringify(u.app_metadata?.provider)}`);
  });
}

checkUsers().catch(console.error);
