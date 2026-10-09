const { supabase } = require('../server/config/supabase');

async function checkProfiles() {
  const { data, error } = await supabase.from('student_profiles').select('id, full_name, setup_completed, created_at');
  if (error) {
    console.error('Error fetching profiles:', error);
    return;
  }
  console.log(`Total rows in student_profiles: ${data.length}`);
  data.forEach(p => {
    console.log(`- ID: ${p.id}, Name: ${p.full_name}, SetupCompleted: ${p.setup_completed}, Created: ${p.created_at}`);
  });
}

checkProfiles().catch(console.error);
