const path = require('path');
const { supabaseAdmin } = require(path.resolve('backend/config/supabaseAdmin'));

async function confirmDisha() {
  console.log('Confirming email for dishapatil9223@gmail.com...');
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    '0d435683-05b1-4133-b3d9-6a2a054c4767',
    { email_confirm: true }
  );

  if (error) {
    console.error('Error confirming user:', error);
  } else {
    console.log('Successfully confirmed dishapatil9223@gmail.com!');
    console.log('Confirmed at:', data.user.email_confirmed_at);
  }
}

confirmDisha();
