const { supabase } = require('../config/supabase');
const assessmentHistoryService = require('./assessment/assessmentHistoryService');
const { generateInitialAssessmentRoadmap } = require('./roadmap/initialAssessmentRoadmapEngine');

const ROADMAP_TABLE = 'personalized_roadmaps';

function mapRoadmapRow(row) {
  if (!row) return null;
  const items = Array.isArray(row.roadmap_items)
    ? row.roadmap_items
    : typeof row.roadmap_items === 'string'
      ? JSON.parse(row.roadmap_items)
      : [];

  return {
    id: row.id,
    studentId: row.student_id,
    assessmentId: row.source_assessment_id,
    assessmentType: row.source_assessment_type,
    source: row.source,
    status: row.status,
    generatedAt: row.generated_at,
    startingLevels: row.starting_levels || {},
    assessedLevels: row.assessed_levels || {},
    items,
    levels: items
  };
}

function createRoadmapService({
  supabaseClient = supabase,
  historyService = assessmentHistoryService,
  roadmapEngine = generateInitialAssessmentRoadmap
} = {}) {
  return {
    async getRoadmap(studentId) {
      const { data, error } = await supabaseClient
        .from(ROADMAP_TABLE)
        .select('*')
        .eq('student_id', studentId)
        .eq('status', 'active')
        .order('generated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      const roadmap = mapRoadmapRow(data);
      return { exists: Boolean(roadmap), roadmap };
    },

    async generateRoadmap(studentId) {
      const assessment = await historyService.getLatestInitialAssessment(studentId);
      if (!assessment) return { success: false, exists: false, roadmap: null, reason: 'assessment_required' };
      return this.generateRoadmapFromAssessment(studentId, assessment);
    },

    async generateRoadmapFromAssessment(studentId, assessment) {
      if (!assessment || assessment.assessmentType !== 'initial') {
        throw new Error('Only a persisted initial assessment can generate a Step 4.1 roadmap.');
      }
      if (assessment.studentId && assessment.studentId !== studentId) {
        const error = new Error('The assessment result does not belong to the signed-in student.');
        error.statusCode = 403;
        throw error;
      }

      const plan = roadmapEngine({ ...assessment, studentId });
      return this.persistRoadmapPlan(studentId, plan);
    },

    // Shared persistence accepts a future periodic plan without changing or
    // deleting assessment_history. A later source assessment archives this
    // active snapshot and receives its own unique roadmap row.
    async persistRoadmapPlan(studentId, plan) {
      const expectedSource = plan?.assessmentType === 'periodic'
        ? 'PERIODIC_ASSESSMENT'
        : plan?.assessmentType === 'initial'
          ? 'INITIAL_ASSESSMENT'
          : null;
      if (!plan?.assessmentId || !expectedSource || plan.source !== expectedSource || plan.studentId !== studentId) {
        throw new Error('A roadmap plan with a matching owner, assessment, and source is required.');
      }

      const now = new Date().toISOString();
      const record = {
        student_id: studentId,
        source_assessment_id: plan.assessmentId,
        source_assessment_type: plan.assessmentType,
        source: plan.source,
        starting_levels: plan.startingLevels,
        assessed_levels: plan.assessedLevels,
        roadmap_items: plan.items,
        status: 'active',
        generated_at: now,
        updated_at: now
      };

      // One JSONB row per source assessment keeps regeneration idempotent:
      // the same assessment replaces its item list instead of appending rows.
      const { data, error } = await supabaseClient
        .from(ROADMAP_TABLE)
        .upsert(record, { onConflict: 'source_assessment_id' })
        .select('*')
        .single();
      if (error) throw error;

      const { error: archiveError } = await supabaseClient
        .from(ROADMAP_TABLE)
        .update({ status: 'archived', updated_at: now })
        .eq('student_id', studentId)
        .eq('status', 'active')
        .neq('source_assessment_id', plan.assessmentId);
      if (archiveError) throw archiveError;

      return { success: true, roadmap: mapRoadmapRow(data) };
    }
  };
}

module.exports = createRoadmapService();
module.exports.createRoadmapService = createRoadmapService;
module.exports.mapRoadmapRow = mapRoadmapRow;
