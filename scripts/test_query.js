const { supabase } = require('../server/config/supabase');
const STUDENT_ID = '240898c5-31b1-4dfe-81c7-cc42b139ced1';

async function test() {
  const { data, error } = await supabase
    .from('topic_progress')
    .select('topic_id, accuracy, attempted_count')
    .eq('student_id', STUDENT_ID)
    .gt('attempted_count', 0);
    
  console.log("No topics join:", data, error);

  const { data: d2, error: e2 } = await supabase
    .from('topic_progress')
    .select('topic_id, topics(name), accuracy, attempted_count')
    .eq('student_id', STUDENT_ID)
    .gt('attempted_count', 0);

  console.log("With topics join:", d2, e2);
  process.exit(0);
}
test();
