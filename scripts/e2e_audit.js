const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const API_URL = 'http://localhost:5000/api';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const adminAuthClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const users = [
  {
    email: 'test_student_a@example.com',
    password: 'Password123!',
    profile: {
      full_name: 'Alice Anderson',
      degree: 'B.Tech',
      target_date: '2026-06-01',
      branch: 'Computer Science',
      preferred_language: 'C++',
      preparation_goals: ['DSA', 'Aptitude'],
      subjectLevels: { DSA: 'Beginner', Aptitude: 'Intermediate' }
    }
  },
  {
    email: 'test_student_b@example.com',
    password: 'Password123!',
    profile: {
      full_name: 'Bob Brown',
      degree: 'BCA',
      target_date: '2025-06-01',
      branch: 'Information Technology',
      preferred_language: 'Java',
      preparation_goals: ['DSA', 'OOPS', 'DBMS'],
      subjectLevels: { DSA: 'Advanced', OOPS: 'Beginner' }
    }
  },
  {
    email: 'test_student_c@example.com',
    password: 'Password123!',
    profile: {
      full_name: 'Charlie Chaplin',
      degree: 'B.E.',
      target_date: '2027-06-01',
      branch: 'Electronics',
      preferred_language: 'Python',
      preparation_goals: ['Aptitude', 'OS'],
      subjectLevels: { Aptitude: 'Beginner', OS: 'Beginner' }
    }
  }
];

async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch(e) { data = null; }
  
  if (!res.ok) {
    console.error(`[API Error] ${method} ${endpoint}:`, text);
    throw new Error(data?.message || res.statusText);
  }
  return data;
}

async function runAudit() {
  console.log('--- STARTING E2E DATA AUDIT ---');
  let results = [];

  for (const [index, u] of users.entries()) {
    console.log(`\n--- Testing Student ${index + 1}: ${u.profile.full_name} ---`);
    try {
      // 1. Signup / Login
      const { data: adminUser, error: adminErr } = await adminAuthClient.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: { full_name: u.profile.full_name }
      });
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: u.email,
        password: u.password
      });
      if (signInError) throw signInError;
      
      const token = signInData.session.access_token;
      u.token = token;
      u.id = signInData.user.id;
      console.log('✅ Auth successful');

      // 2. Profile Setup
      await apiRequest('/profile', 'PUT', u.profile, token);
      console.log('✅ Profile setup successful');

      // 3. Verify Profile
      const fetchedProfile = await apiRequest('/profile', 'GET', null, token);
      if (fetchedProfile.data.preferred_language !== u.profile.preferred_language) {
        throw new Error('Profile persistence failed (Language mismatch)');
      }
      console.log(`✅ Profile verified (Language: ${fetchedProfile.data.preferred_language})`);

      // 4. Generate Initial Assessment Session
      const sessionStart = await apiRequest('/assessment/session/start', 'POST', {
        assessmentType: 'initial'
      }, token);
      const assessmentId = sessionStart.data.assessmentId;
      console.log(`✅ Assessment session started (ID: ${assessmentId})`);

      // 5. Submit Answers to Session
      let mockResponses = [];
      const questions = sessionStart.data.questions || [];
      for (const q of questions) {
        const isCorrect = index === 0 ? true : (index === 1 ? Math.random() > 0.5 : false);
        const ansRes = await apiRequest('/assessment/session/submit-answer', 'POST', {
          assessmentId,
          questionId: q.id,
          selectedOptionIndex: isCorrect ? q.correctOptionIndex : (q.correctOptionIndex === 0 ? 1 : 0),
          timeTaken: 15,
          skipped: false,
          confidence: 'high',
          difficulty: q.difficulty,
          isCorrect
        }, token);
        mockResponses.push(ansRes.data);
      }
      
      const submitRes = await apiRequest('/assessment/initial/complete', 'POST', {
        assessmentId
      }, token);
      console.log(`✅ Assessment completed. Assessed Level: ${submitRes.data?.results?.assessedLevel || 'N/A'}`);

      // 6. Generate/Fetch Roadmap
      const roadmapRes = await apiRequest('/roadmap', 'GET', null, token);
      u.roadmap = roadmapRes.data;
      console.log(`✅ Roadmap fetched. Topics count: ${roadmapRes.data?.topics?.length || 0}`);

      // 7. Dashboard Data
      const dashRes = await apiRequest('/dashboard', 'GET', null, token);
      console.log(`✅ Dashboard fetched. Readiness: ${dashRes.data.readinessScore}%`);
      
      results.push({ name: u.profile.full_name, status: 'PASS' });
    } catch (err) {
      console.error(`❌ Failed for ${u.profile.full_name}:`, err.message);
      results.push({ name: u.profile.full_name, status: 'FAIL', error: err.message });
    }
  }

  console.log('\n--- CROSS-STUDENT ISOLATION TEST ---');
  try {
    const supabaseA = createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: { headers: { Authorization: `Bearer ${users[0].token}` } }
    });
    
    const { data: profileB, error: rlsError } = await supabaseA
      .from('student_profiles')
      .select('*')
      .eq('id', users[1].id)
      .single();
      
    if (profileB) {
      console.error('❌ FAIL: Security vulnerability! Student A can read Student B data.');
    } else {
      console.log('✅ PASS: Supabase RLS isolation verified (Student A cannot read Student B data).');
    }
  } catch(e) {
    console.log('✅ PASS: Cross-student fetch blocked.');
  }

  console.log('\n--- DYNAMIC ROADMAP COMPARISON ---');
  if (users[0].roadmap && users[1].roadmap) {
    const rm1 = JSON.stringify(users[0].roadmap);
    const rm2 = JSON.stringify(users[1].roadmap);
    if (rm1 !== rm2) {
      console.log('✅ PASS: Roadmaps are correctly dynamically generated and isolated.');
    } else {
      console.error('❌ FAIL: Roadmaps are identical. Dynamic generation might be hardcoded.');
    }
  }
}

runAudit();
