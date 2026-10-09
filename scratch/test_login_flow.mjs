import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: 'client/.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function checkAuthFlow() {
  console.log('--- 1. Testing signInWithPassword for dishapatil9223@gmail.com ---');
  // We don't know the password the user entered, but let's see what error it gives
  const loginRes = await supabase.auth.signInWithPassword({
    email: 'dishapatil9223@gmail.com',
    password: 'wrong_password_test'
  });
  console.log('Login attempt result:', {
    error: loginRes.error?.message,
    status: loginRes.error?.status,
    code: loginRes.error?.code
  });
}

checkAuthFlow();
