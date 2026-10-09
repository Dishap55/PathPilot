const test = require('node:test');
const assert = require('node:assert/strict');
const { createRoadmapService } = require('../services/roadmapService');

function createSupabaseRoadmapStore() {
  const rows = [];
  let nextId = 1;

  return {
    rows,
    from(table) {
      assert.equal(table, 'personalized_roadmaps');
      const state = { operation: 'select', filters: {}, row: null, sort: null };
      const builder = {
        select() { return this; },
        eq(key, value) { state.filters[key] = value; return this; },
        neq(key, value) { state.filters[`!${key}`] = value; return this; },
        order(key, options) { state.sort = { key, ascending: options.ascending }; return this; },
        limit() { return this; },
        maybeSingle() {
          let matches = rows.filter(row => Object.entries(state.filters).every(([key, value]) =>
            key.startsWith('!') ? row[key.slice(1)] !== value : row[key] === value
          ));
          if (state.sort) matches = [...matches].sort((a, b) =>
            state.sort.ascending
              ? String(a[state.sort.key]).localeCompare(String(b[state.sort.key]))
              : String(b[state.sort.key]).localeCompare(String(a[state.sort.key]))
          );
          return Promise.resolve({ data: matches[0] || null, error: null });
        },
        upsert(row) { state.operation = 'upsert'; state.row = row; return this; },
        single() {
          let stored = rows.find(item => item.source_assessment_id === state.row.source_assessment_id);
          if (stored) Object.assign(stored, state.row);
          else {
            stored = { id: `roadmap-${nextId++}`, ...state.row };
            rows.push(stored);
          }
          return Promise.resolve({ data: { ...stored }, error: null });
        },
        update(row) { state.operation = 'update'; state.row = row; return this; },
        then(resolve, reject) {
          if (state.operation === 'update') {
            for (const stored of rows) {
              const matches = Object.entries(state.filters).every(([key, value]) =>
                key.startsWith('!') ? stored[key.slice(1)] !== value : stored[key] === value
              );
              if (matches) Object.assign(stored, state.row);
            }
          }
          return Promise.resolve({ data: null, error: null }).then(resolve, reject);
        }
      };
      return builder;
    }
  };
}

test('regenerating the same persisted assessment is idempotent and retrievable', async () => {
  const store = createSupabaseRoadmapStore();
  const assessment = {
    assessmentId: 'persisted-assessment-1',
    studentId: 'student-1',
    assessmentType: 'initial',
    dsaResult: {
      startingLevel: 'Beginner',
      assessedLevel: 'Intermediate',
      topicPerformance: [{
        topicId: 'arrays', topicName: 'Arrays & Strings', questionsAsked: 2,
        attempted: 2, correct: 2, incorrect: 0, skipped: 0, accuracy: 100,
        difficultyReached: 'Medium', averageTime: 35
      }],
      strengths: [], focusAreas: []
    },
    aptitudeResult: {
      startingLevel: 'Intermediate',
      assessedLevel: 'Intermediate',
      topicPerformance: [], strengths: [], focusAreas: []
    }
  };
  const service = createRoadmapService({
    supabaseClient: store,
    historyService: { getLatestInitialAssessment: async () => assessment }
  });

  const first = await service.generateRoadmap('student-1');
  const retry = await service.generateRoadmap('student-1');
  const loaded = await service.getRoadmap('student-1');

  assert.equal(store.rows.length, 1);
  assert.equal(first.roadmap.id, retry.roadmap.id);
  assert.deepEqual(first.roadmap.items, retry.roadmap.items);
  assert.deepEqual(loaded.roadmap.items, first.roadmap.items);
  assert.equal(loaded.roadmap.startingLevels.DSA, 'Beginner');
  assert.equal(loaded.roadmap.assessedLevels.DSA, 'Intermediate');
});

test('roadmap generation refuses to invent a result when no initial assessment is persisted', async () => {
  const store = createSupabaseRoadmapStore();
  const service = createRoadmapService({
    supabaseClient: store,
    historyService: { getLatestInitialAssessment: async () => null }
  });

  const result = await service.generateRoadmap('student-without-assessment');
  assert.equal(result.success, false);
  assert.equal(result.reason, 'assessment_required');
  assert.equal(store.rows.length, 0);
});

test('a later assessment snapshot archives the prior roadmap without deleting its record', async () => {
  const store = createSupabaseRoadmapStore();
  const assessment = {
    assessmentId: 'initial-assessment-1',
    studentId: 'student-1',
    assessmentType: 'initial',
    dsaResult: { startingLevel: 'Beginner', assessedLevel: 'Beginner', topicPerformance: [], strengths: [], focusAreas: [] },
    aptitudeResult: { startingLevel: 'Beginner', assessedLevel: 'Beginner', topicPerformance: [], strengths: [], focusAreas: [] }
  };
  const service = createRoadmapService({
    supabaseClient: store,
    historyService: { getLatestInitialAssessment: async () => assessment }
  });

  const initial = await service.generateRoadmap('student-1');
  const laterPlan = {
    ...initial.roadmap,
    assessmentId: 'periodic-assessment-2',
    assessmentType: 'periodic',
    source: 'PERIODIC_ASSESSMENT',
    items: initial.roadmap.items.map(item => ({ ...item, source: 'PERIODIC_ASSESSMENT' }))
  };
  const later = await service.persistRoadmapPlan('student-1', laterPlan);

  assert.equal(store.rows.length, 2);
  assert.equal(store.rows.find(row => row.source_assessment_id === 'initial-assessment-1').status, 'archived');
  assert.equal(store.rows.find(row => row.source_assessment_id === 'periodic-assessment-2').status, 'active');
  assert.equal(later.roadmap.assessmentType, 'periodic');
});
