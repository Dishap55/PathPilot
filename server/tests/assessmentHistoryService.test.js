const test = require('node:test');
const assert = require('node:assert/strict');
const { supabase } = require('../config/supabase');
const historyService = require('../services/assessment/assessmentHistoryService');

test('persists initial result attempts and keeps retries idempotent', async () => {
  const originalFrom = supabase.from;
  const rows = [];

  supabase.from = (table) => {
    assert.equal(table, 'assessment_history');
    const state = { filters: {}, operation: 'select', row: null };
    const builder = {
      select() { return this; },
      eq(key, value) { state.filters[key] = value; return this; },
      order() { return this; },
      limit() { return this; },
      maybeSingle() {
        const row = rows.find(item => Object.entries(state.filters).every(([key, value]) => item[key] === value)) || null;
        return Promise.resolve({ data: row ? { attempt_number: row.attempt_number } : null, error: null });
      },
      then(resolve, reject) {
        const matches = rows.filter(item => Object.entries(state.filters).every(([key, value]) => item[key] === value));
        matches.sort((a, b) => b.attempt_number - a.attempt_number);
        return Promise.resolve({ data: matches.slice(0, 1), error: null }).then(resolve, reject);
      },
      upsert(row) { state.operation = 'upsert'; state.row = row; return this; },
      single() {
        let stored = rows.find(item => item.assessment_id === state.row.assessment_id);
        if (stored) Object.assign(stored, state.row);
        else {
          stored = { ...state.row };
          rows.push(stored);
        }
        return Promise.resolve({ data: { ...stored }, error: null });
      }
    };
    return builder;
  };

  try {
    const analysis = {
      assessmentId: 'asm-1', studentId: 'student-1', startedAt: '2026-10-07T00:00:00.000Z',
      completedAt: '2026-10-07T00:05:00.000Z', overallTimeSeconds: 300,
      dsaResult: { startingLevel: 'Beginner', assessedLevel: 'Beginner' },
      aptitudeResult: { startingLevel: 'Intermediate', assessedLevel: 'Intermediate' },
      overall: { questionsAsked: 10 }, roadmapPreparation: {}, aiFeedback: {}
    };

    const first = await historyService.persistInitialAssessment(analysis);
    assert.equal(first.assessment_type, 'initial');
    assert.equal(first.attempt_number, 1);
    assert.equal(first.subject_results.dsaResult.startingLevel, 'Beginner');

    const retry = await historyService.persistInitialAssessment(analysis);
    assert.equal(retry.attempt_number, 1);
    assert.equal(rows.length, 1);

    const second = await historyService.persistInitialAssessment({ ...analysis, assessmentId: 'asm-2' });
    assert.equal(second.attempt_number, 2);
    assert.equal(rows.length, 2);
  } finally {
    supabase.from = originalFrom;
  }
});
