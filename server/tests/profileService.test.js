const test = require('node:test');
const assert = require('node:assert/strict');
const { supabase } = require('../config/supabase');
const profileService = require('../services/profileService');

test('persists graduation year in the authenticated student profile', async () => {
  const originalFrom = supabase.from;
  let persistedRow;
  supabase.from = (table) => {
    assert.equal(table, 'student_profiles');
    const builder = {
      upsert(row, options) {
        assert.deepEqual(options, { onConflict: 'id' });
        persistedRow = row;
        return this;
      },
      select() { return this; },
      maybeSingle() { return Promise.resolve({ data: { ...persistedRow }, error: null }); }
    };
    return builder;
  };

  try {
    const result = await profileService.updateProfile('student-1', {
      full_name: 'Test Student',
      graduation_year: 2030
    });
    assert.equal(persistedRow.id, 'student-1');
    assert.equal(persistedRow.graduation_year, 2030);
    assert.equal(result.graduation_year, 2030);
  } finally {
    supabase.from = originalFrom;
  }
});

test('does not report profile update success when persistence fails', async () => {
  const originalFrom = supabase.from;
  const persistenceError = new Error('database write failed');
  supabase.from = () => ({
    upsert() { return this; },
    select() { return this; },
    maybeSingle() { return Promise.resolve({ data: null, error: persistenceError }); }
  });

  const originalConsoleError = console.error;
  console.error = () => {};
  try {
    await assert.rejects(
      profileService.updateProfile('student-1', { graduation_year: 2030 }),
      persistenceError
    );
  } finally {
    supabase.from = originalFrom;
    console.error = originalConsoleError;
  }
});
