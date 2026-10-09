const { supabase } = require('../server/config/supabase');
const crypto = require('crypto');
async function run() {
  const { data, error } = await supabase.from('topics').insert({
    id: crypto.randomUUID(),
    name: 'Two Pointers',
    subject_id: '1d2bdad4-7c75-4bff-8ad5-d1dea107325c'
  }).select();
  console.log("Insert result:", data, error);
}
run();
