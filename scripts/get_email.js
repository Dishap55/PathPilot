const { supabase } = require('../server/config/supabase');
async function run() {
  const { data } = await supabase.from('student_profiles').select('*').eq('id', '240898c5-31b1-4dfe-81c7-cc42b139ced1');
  console.log(data);
}
run();
