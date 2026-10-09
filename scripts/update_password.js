const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'server/.env' });

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    '240898c5-31b1-4dfe-81c7-cc42b139ced1',
    { password: 'Pathpilot123!' }
  );
  if (error) {
    console.error("Error updating password:", error.message);
  } else {
    console.log("Successfully updated password for patil55disha@gmail.com");
  }
}
run();
