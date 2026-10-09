const http = require('http');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: 'client/.env' });
dotenv.config({ path: 'backend/.env' });

const { supabaseAdmin } = require(path.resolve('backend/config/supabaseAdmin'));
const app = require(path.resolve('backend/server'));

async function testBackendSignup() {
  console.log('--- Testing Backend POST /api/auth/signup ---');

  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  const request = (method, endpoint, body) => {
    return new Promise((resolve, reject) => {
      const data = body ? JSON.stringify(body) : null;
      const req = http.request({
        hostname: '127.0.0.1',
        port,
        path: endpoint,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
        }
      }, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(raw) });
          } catch (e) {
            resolve({ status: res.statusCode, raw });
          }
        });
      });
      req.on('error', reject);
      if (data) req.write(data);
      req.end();
    });
  };

  // 1. Invalid email
  const res1 = await request('POST', '/api/auth/signup', {
    email: 'not-an-email',
    password: 'Password123!',
    fullName: 'Test Student'
  });
  console.log('1. Invalid email check:', res1.status, res1.body.message);

  // 2. Short password
  const res2 = await request('POST', '/api/auth/signup', {
    email: 'valid@student.edu',
    password: '123',
    fullName: 'Test Student'
  });
  console.log('2. Short password check:', res2.status, res2.body.message);

  // 3. Existing user (dishapatil9223@gmail.com)
  const res3 = await request('POST', '/api/auth/signup', {
    email: 'dishapatil9223@gmail.com',
    password: 'AnyPassword123!',
    fullName: 'Disha Patil'
  });
  console.log('3. Existing user check:', res3.status, res3.body.message);

  // 4. Valid new user
  const newEmail = `pathpilot.student.${Date.now()}@ipsacademy.org`;
  const newPassword = 'ValidPassword123!';
  const res4 = await request('POST', '/api/auth/signup', {
    email: newEmail,
    password: newPassword,
    fullName: 'New Engineering Student',
    preferredSubject: 'DSA'
  });
  console.log('4. New user signup check:', res4.status, res4.body.message, 'User ID:', res4.body.user?.id);

  // 5. Test client-side login immediately with Anon Key!
  const clientSupabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
  );

  const loginRes = await clientSupabase.auth.signInWithPassword({
    email: newEmail,
    password: newPassword
  });

  console.log('5. Immediate client signInWithPassword check:');
  console.log('   ↳ Error:', loginRes.error);
  console.log('   ↳ Session token present:', !!loginRes.data?.session?.access_token);
  console.log('   ↳ User ID matches:', loginRes.data?.user?.id === res4.body.user?.id);

  // Clean up test user
  if (res4.body.user?.id) {
    await supabaseAdmin.auth.admin.deleteUser(res4.body.user.id);
    console.log('   ↳ Cleaned up test user.');
  }

  server.close();
}

testBackendSignup().catch(console.error);
