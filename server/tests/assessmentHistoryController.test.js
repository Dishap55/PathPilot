const test = require('node:test');
const assert = require('node:assert/strict');
const historyService = require('../services/assessment/assessmentHistoryService');
const assessmentController = require('../controllers/assessmentController');

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; }
  };
}

test('history controller scopes its read to req.user.id and returns only history attempts', async () => {
  const originalRead = historyService.getAssessmentHistory;
  let requestedOwner = null;
  const storedAttempt = { assessmentId: 'asm-own', assessmentType: 'initial', attemptNumber: 1 };
  historyService.getAssessmentHistory = async (studentId) => {
    requestedOwner = studentId;
    return [storedAttempt];
  };

  try {
    const req = {
      user: { id: 'authenticated-student' },
      query: { student_id: 'forged-query-student' },
      body: { student_id: 'forged-body-student' },
      headers: { 'x-student-id': 'forged-header-student' }
    };
    const res = createResponse();
    let forwardedError = null;

    await assessmentController.getAssessmentHistory(req, res, (error) => { forwardedError = error; });

    assert.equal(forwardedError, null);
    assert.equal(requestedOwner, 'authenticated-student');
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body.data, { attempts: [storedAttempt] });
    assert.equal('student_id' in res.body.data.attempts[0], false);
  } finally {
    historyService.getAssessmentHistory = originalRead;
  }
});

test('history controller rejects requests without an authenticated user', async () => {
  const res = createResponse();
  await assessmentController.getAssessmentHistory({ user: null }, res, () => {});
  assert.equal(res.statusCode, 401);
  assert.equal(res.body.success, false);
});
