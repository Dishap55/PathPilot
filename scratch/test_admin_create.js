const path = require('path');
const { supabaseAdmin } = require(path.resolve('backend/config/supabaseAdmin'));

async function testAdminCreate() {
  const testEmail = `test.student.${Date.now()}@ipsacademy.org`;
  console.log('Testing supabaseAdmin.auth.admin.createUser for:', testEmail);
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: testEmail,
    password: 'Password123!',
    email_confirm: true,
    user_metadata: {
      full_name: 'Test Student'
    }
  });

  if (error) {
    console.error('Error creating user with admin:', error);
  } else {
    console.log('User created successfully! ID:', data.user.id);
    console.log('Email confirmed at:', data.user.email_confirmed_at);

    // Clean up
    await supabaseAdmin.auth.admin.deleteUser(data.user.id);
    console.log('Cleaned up test user.');
  }
}

testAdminCreate();
