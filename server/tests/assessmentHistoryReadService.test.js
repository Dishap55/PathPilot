const test = require('node:test');
const assert = require('node:assert/strict');
const { supabase } = require('../config/supabase');
const historyService = require('../services/assessment/assessmentHistoryService');

function installHistoryQuery({ rows = [], error = null } = {}) {
  const originalFrom = supabase.from;
  const query = { table: null, selection: null, filters: [], orders: [] };

  supabase.from = (table) => {
    query.table = table;
    return {
      select(columns) { query.selection = columns; return this; },
      eq(column, value) { query.filters.push([column, value]); return this; },
      order(column, options) { query.orders.push([column, options]); return this; },
      then(resolve, reject) {
        return Promise.resolve({ data: rows, error }).then(resolve, reject);
      }
    };
  };

  return {
    query,
    restore() { supabase.from = originalFrom; }
  };
}

test('reads only the authenticated student history in deterministic newest-first order', async () => {
  const storedResults = {
    dsaResult: { startingLevel: 'Beginner', assessedLevel: 'Intermediate', accuracy: 80 },
    aptitudeResult: { startingLevel: 'Beginner', assessedLevel: 'Beginner', accuracy: 60 }
  };
  const dbRow = {
    assessment_id: 'asm-history-1',
    student_id: 'student-owner',
    assessment_type: 'initial',
    attempt_number: 2,
    started_at: '2026-10-01T10:00:00.000Z',
    completed_at: '2026-10-01T10:05:00.000Z',
    overall_time_seconds: 300,
    subject_results: storedResults
  };
  const mock = installHistoryQuery({ rows: [dbRow] });

  try {
    const attempts = await historyService.getAssessmentHistory('student-owner');

    assert.equal(mock.query.table, 'assessment_history');
    assert.equal(mock.query.selection, 'assessment_id, assessment_type, attempt_number, started_at, completed_at, overall_time_seconds, subject_results');
    assert.deepEqual(mock.query.filters, [['student_id', 'student-owner']]);
    assert.deepEqual(mock.query.orders, [
      ['completed_at', { ascending: false }],
      ['assessment_type', { ascending: true }],
      ['attempt_number', { ascending: false }],
      ['assessment_id', { ascending: true }]
    ]);
    assert.deepEqual(attempts, [{
      assessmentId: 'asm-history-1',
      assessmentType: 'initial',
      attemptNumber: 2,
      startedAt: dbRow.started_at,
      completedAt: dbRow.completed_at,
      overallTimeSeconds: 300,
      subjectResults: storedResults
    }]);
    assert.equal('studentId' in attempts[0], false);
    assert.equal('improvement' in attempts[0], false);
  } finally {
    mock.restore();
  }
});

test('returns an empty list when the authenticated student has no history', async () => {
  const mock = installHistoryQuery({ rows: [] });
  try {
    assert.deepEqual(await historyService.getAssessmentHistory('student-with-no-history'), []);
    assert.deepEqual(mock.query.filters, [['student_id', 'student-with-no-history']]);
  } finally {
    mock.restore();
  }
});

test('does not invent missing stored result details and propagates database errors', async () => {
  const nullResultsRow = {
    assessment_id: 'asm-without-details',
    assessment_type: 'periodic',
    attempt_number: 1,
    started_at: null,
    completed_at: null,
    overall_time_seconds: null,
    subject_results: null
  };
  const missingDetailsMock = installHistoryQuery({ rows: [nullResultsRow] });
  try {
    const [attempt] = await historyService.getAssessmentHistory('student-owner');
    assert.equal(attempt.subjectResults, null);
    assert.equal(attempt.startedAt, null);
    assert.equal(attempt.overallTimeSeconds, null);
  } finally {
    missingDetailsMock.restore();
  }

  const dbError = new Error('history read failed');
  const errorMock = installHistoryQuery({ error: dbError });
  try {
    await assert.rejects(historyService.getAssessmentHistory('student-owner'), dbError);
  } finally {
    errorMock.restore();
  }
});

test('requires an authenticated student ID', async () => {
  await assert.rejects(historyService.getAssessmentHistory(null), /authenticated student/);
});
