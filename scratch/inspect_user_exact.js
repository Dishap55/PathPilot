const path = require('path');
const { supabaseAdmin } = require(path.resolve('backend/config/supabaseAdmin'));

async function inspectUser() {
  const { data, error } = await supabaseAdmin.auth.admin.getUserById('0d435683-05b1-4133-b3d9-6a2a054c4767');
  if (error) {
    console.error('Error fetching user:', error);
    return;
  }
  console.log('User object:', JSON.stringify(data.user, null, 2));
}

inspectUser();
