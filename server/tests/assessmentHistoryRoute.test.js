const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const { supabase } = require('../config/supabase');
const historyService = require('../services/assessment/assessmentHistoryService');
const assessmentRoutes = require('../routes/assessmentRoutes');

test('GET /api/assessment/history requires auth and ignores caller-supplied student IDs', async () => {
  const originalGetUser = supabase.auth.getUser;
  const originalRead = historyService.getAssessmentHistory;
  let requestedOwner = null;
  const ownAttempt = { assessmentId: 'asm-route-test', assessmentType: 'initial', attemptNumber: 1 };
  supabase.auth.getUser = async (token) => token === 'valid-route-token'
    ? { data: { user: { id: 'authenticated-owner', email: 'student@example.test' } }, error: null }
    : { data: { user: null }, error: new Error('invalid token') };
  historyService.getAssessmentHistory = async (studentId) => {
    requestedOwner = studentId;
    return [ownAttempt];
  };

  const app = express();
  app.use('/api/assessment', assessmentRoutes);
  const server = app.listen(0, '127.0.0.1');

  try {
    await new Promise((resolve, reject) => {
      server.once('listening', resolve);
      server.once('error', reject);
    });
    const { port } = server.address();
    const baseUrl = `http://127.0.0.1:${port}/api/assessment/history`;

    const unauthenticated = await fetch(`${baseUrl}?student_id=forged-student`, {
      headers: { 'x-student-id': 'forged-student' }
    });
    assert.equal(unauthenticated.status, 401);

    const authenticated = await fetch(`${baseUrl}?student_id=forged-student`, {
      headers: {
        authorization: 'Bearer valid-route-token',
        'x-student-id': 'forged-student'
      }
    });
    const body = await authenticated.json();

    assert.equal(authenticated.status, 200);
    assert.equal(requestedOwner, 'authenticated-owner');
    assert.deepEqual(body.data.attempts, [ownAttempt]);
    assert.equal('student_id' in body.data.attempts[0], false);
  } finally {
    supabase.auth.getUser = originalGetUser;
    historyService.getAssessmentHistory = originalRead;
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
