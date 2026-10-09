import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: 'client/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Testing Supabase Client connection:');
console.log('URL:', supabaseUrl);
console.log('Anon Key length:', supabaseAnonKey?.length);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSignup() {
  const testEmail = `test_student_${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';

  console.log(`\nAttempting signUp for: ${testEmail}...`);
  try {
    const res = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test Student',
          preferred_subject: 'DSA'
        }
      }
    });

    console.log('Response data:', JSON.stringify(res.data, null, 2));
    console.log('Response error:', res.error);
    if (res.error) {
      console.log('Error status:', res.error.status);
      console.log('Error message:', res.error.message);
      console.log('Error name:', res.error.name);
    }
  } catch (err) {
    console.error('Caught exception during signUp:', err);
  }
}

testSignup();
