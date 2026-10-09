const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'server/.env' });

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  const { data: user, error } = await supabaseAdmin.auth.admin.getUserById('240898c5-31b1-4dfe-81c7-cc42b139ced1');
  if (error) {
    console.error(error);
  } else {
    console.log(user);
  }
}
run();
