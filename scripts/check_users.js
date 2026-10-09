const { supabase } = require('../server/config/supabase');
async function check() {
  const { data } = await supabase.from('student_profiles').select('id, full_name, preferred_language');
  console.log(JSON.stringify(data, null, 2));
}
check();
