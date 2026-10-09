const { supabase } = require('../server/config/supabase');

async function inspectUser() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error('Error:', error);
    return;
  }
  const users = data.users.filter(u => u.email.includes('dishapatil') || u.email.includes('anuj'));
  users.forEach(u => {
    console.log('------------------------------------------------');
    console.log('Email:', u.email);
    console.log('ID:', u.id);
    console.log('Created at:', u.created_at);
    console.log('App Metadata:', JSON.stringify(u.app_metadata));
    console.log('User Metadata:', JSON.stringify(u.user_metadata));
    console.log('Identities:', JSON.stringify(u.identities?.map(id => ({ provider: id.provider, identity_data: id.identity_data }))));
  });
}

inspectUser().catch(console.error);
