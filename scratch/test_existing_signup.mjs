import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: 'client/.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testExistingUser() {
  console.log('Testing signUp with dishapatil9223@gmail.com:');
  const res = await supabase.auth.signUp({
    email: 'dishapatil9223@gmail.com',
    password: 'AnyPassword123!',
    options: {
      data: {
        full_name: 'Disha Patil'
      }
    }
  });

  console.log('Error:', res.error);
  console.log('Data:', JSON.stringify(res.data, null, 2));
}

testExistingUser();
