const test = require('node:test');
const assert = require('node:assert/strict');
const { supabase } = require('../config/supabase');
const requireAuth = require('../middleware/requireAuth');

function createResponse() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };
}

test('rejects an invalid bearer token even when a student ID header is supplied', async () => {
  const originalGetUser = supabase.auth.getUser;
  let nextCalled = false;
  supabase.auth.getUser = async () => ({ data: { user: null }, error: new Error('invalid token') });

  try {
    const res = createResponse();
    await requireAuth({
      headers: {
        authorization: 'Bearer invalid-token',
        'x-student-id': 'another-student-id'
      }
    }, res, () => { nextCalled = true; });

    assert.equal(res.statusCode, 401);
    assert.equal(res.body.success, false);
    assert.equal(nextCalled, false);
  } finally {
    supabase.auth.getUser = originalGetUser;
  }
});

test('sets the authenticated Supabase user as the request owner', async () => {
  const originalGetUser = supabase.auth.getUser;
  let nextCalled = false;
  supabase.auth.getUser = async () => ({
    data: { user: { id: 'authenticated-student-id', email: 'student@example.test' } },
    error: null
  });

  try {
    const req = { headers: { authorization: 'Bearer valid-token', 'x-student-id': 'different-student-id' } };
    const res = createResponse();
    await requireAuth(req, res, () => { nextCalled = true; });

    assert.equal(nextCalled, true);
    assert.equal(req.user.id, 'authenticated-student-id');
    assert.equal(req.user.email, 'student@example.test');
  } finally {
    supabase.auth.getUser = originalGetUser;
  }
});

test('rejects requests without a bearer token', async () => {
  let nextCalled = false;
  const res = createResponse();
  await requireAuth({ headers: { 'x-student-id': 'another-student-id' } }, res, () => { nextCalled = true; });

  assert.equal(res.statusCode, 401);
  assert.equal(nextCalled, false);
});
