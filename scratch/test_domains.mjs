import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: 'client/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDomains() {
  const domains = [
    'gmail.com',
    'ipsacademy.org',
    'yahoo.com',
    'outlook.com'
  ];

  for (const domain of domains) {
    const testEmail = `pathpilot.test.${Date.now()}@${domain}`;
    console.log(`\nTesting signUp with domain @${domain} (${testEmail})...`);
    try {
      const res = await supabase.auth.signUp({
        email: testEmail,
        password: 'Password123!',
        options: {
          data: {
            full_name: 'Test Student',
            preferred_subject: 'DSA'
          }
        }
      });

      if (res.error) {
        console.log(`Error for ${domain}:`, res.error.status, res.error.message, res.error.code);
      } else {
        console.log(`SUCCESS for ${domain}! User ID:`, res.data?.user?.id, 'Session:', !!res.data?.session);
        // Clean up user with admin client if needed
      }
    } catch (e) {
      console.error(`Exception for ${domain}:`, e);
    }
  }
}

testDomains();
