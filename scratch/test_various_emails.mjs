import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: 'client/.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testVariousEmails() {
  const emails = [
    'student@college.edu',
    'alex@gmail.com',
    'test@test.com',
    'disha@ipsacademy.org'
  ];

  for (const email of emails) {
    const res = await supabase.auth.signUp({
      email,
      password: 'Password123!',
      options: {
        data: { full_name: 'Test' }
      }
    });

    console.log(`Email: ${email} -> error:`, res.error ? {
      message: res.error.message,
      status: res.error.status,
      code: res.error.code
    } : 'SUCCESS');
  }
}

testVariousEmails();
