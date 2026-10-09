const { supabase } = require('../server/config/supabase');
const STUDENT_ID = '240898c5-31b1-4dfe-81c7-cc42b139ced1';

async function fixTopicProgress() {
  const now = new Date().toISOString();
  
  // Fetch existing topic_progress
  const { data, error } = await supabase.from('topic_progress').select('*').eq('student_id', STUDENT_ID);
  
  if (data) {
    for (const row of data) {
      const updateData = {
        last_practiced_at: now,
        completed_count: row.attempted_count // Assume they completed all they attempted for the mock
      };
      await supabase.from('topic_progress').update(updateData).eq('id', row.id);
    }
    console.log(`Fixed ${data.length} topic_progress rows!`);
  } else {
    console.log("No data found to fix:", error);
  }
  process.exit(0);
}
fixTopicProgress();
