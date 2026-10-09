const { supabase } = require('../../config/supabase');

const HISTORY_TABLE = 'assessment_history';
const HISTORY_SELECT = 'assessment_id, student_id, assessment_type, attempt_number, started_at, completed_at, overall_time_seconds, subject_results';

function toAssessmentHistoryItem(row) {
  return {
    assessmentId: row.assessment_id,
    assessmentType: row.assessment_type,
    attemptNumber: row.attempt_number,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    overallTimeSeconds: row.overall_time_seconds,
    subjectResults: row.subject_results
  };
}

async function persistInitialAssessment(analysis) {
  const { data: existing, error: existingError } = await supabase
    .from(HISTORY_TABLE)
    .select('attempt_number')
    .eq('assessment_id', analysis.assessmentId)
    .maybeSingle();
  if (existingError) throw existingError;

  let attemptNumber = existing?.attempt_number;
  if (!attemptNumber) {
    const { data: latest, error: latestError } = await supabase
      .from(HISTORY_TABLE)
      .select('attempt_number')
      .eq('student_id', analysis.studentId)
      .eq('assessment_type', 'initial')
      .order('attempt_number', { ascending: false })
      .limit(1);
    if (latestError) throw latestError;
    attemptNumber = (latest?.[0]?.attempt_number || 0) + 1;
  }

  const subjectResults = {
    dsaResult: analysis.dsaResult,
    aptitudeResult: analysis.aptitudeResult,
    overall: analysis.overall,
    overallTimeSeconds: analysis.overallTimeSeconds,
    subjectTimeSeconds: analysis.subjectTimeSeconds,
    roadmapPreparation: analysis.roadmapPreparation,
    aiFeedback: analysis.aiFeedback
  };

  const { data, error } = await supabase
    .from(HISTORY_TABLE)
    .upsert({
      assessment_id: analysis.assessmentId,
      student_id: analysis.studentId,
      assessment_type: 'initial',
      attempt_number: attemptNumber,
      started_at: analysis.startedAt,
      completed_at: analysis.completedAt,
      overall_time_seconds: analysis.overallTimeSeconds,
      subject_results: subjectResults
    }, { onConflict: 'assessment_id' })
    .select('assessment_id, student_id, assessment_type, attempt_number, started_at, completed_at, overall_time_seconds, subject_results')
    .single();
  if (error) throw error;
  return data;
}

async function getLatestInitialAssessment(studentId) {
  const { data, error } = await supabase
    .from(HISTORY_TABLE)
    .select('assessment_id, student_id, assessment_type, attempt_number, started_at, completed_at, overall_time_seconds, subject_results')
    .eq('student_id', studentId)
    .eq('assessment_type', 'initial')
    .order('attempt_number', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    assessmentId: data.assessment_id,
    studentId: data.student_id,
    assessmentType: data.assessment_type,
    attemptNumber: data.attempt_number,
    startedAt: data.started_at,
    completedAt: data.completed_at,
    overallTimeSeconds: data.overall_time_seconds,
    ...data.subject_results
  };
}

async function hasInitialAssessment(studentId) {
  const { data, error } = await supabase
    .from(HISTORY_TABLE)
    .select('assessment_id')
    .eq('student_id', studentId)
    .eq('assessment_type', 'initial')
    .limit(1);
  if (error) throw error;
  return Boolean(data?.length);
}

async function getAssessmentHistory(studentId) {
  if (!studentId) throw new Error('An authenticated student is required to read assessment history.');

  const { data, error } = await supabase
    .from(HISTORY_TABLE)
    .select('assessment_id, assessment_type, attempt_number, started_at, completed_at, overall_time_seconds, subject_results')
    .eq('student_id', studentId)
    .order('completed_at', { ascending: false })
    .order('assessment_type', { ascending: true })
    .order('attempt_number', { ascending: false })
    .order('assessment_id', { ascending: true });
  if (error) throw error;

  return (data || []).map(toAssessmentHistoryItem);
}

async function getAssessmentHistoryRecord(studentId, assessmentId) {
  if (!studentId || !assessmentId) return null;
  const { data, error } = await supabase
    .from(HISTORY_TABLE)
    .select(HISTORY_SELECT)
    .eq('student_id', studentId)
    .eq('assessment_id', assessmentId)
    .maybeSingle();
  if (error) throw error;
  return data ? { ...toAssessmentHistoryItem(data), studentId: data.student_id } : null;
}

async function persistPeriodicAssessment(analysis) {
  if (!analysis?.assessmentId || !analysis?.studentId) {
    throw new Error('A periodic assessment ID and authenticated student are required.');
  }

  const { data: existing, error: existingError } = await supabase
    .from(HISTORY_TABLE)
    .select(HISTORY_SELECT)
    .eq('assessment_id', analysis.assessmentId)
    .maybeSingle();
  if (existingError) throw existingError;
  if (existing) {
    if (existing.student_id !== analysis.studentId || existing.assessment_type !== 'periodic') {
      const ownershipError = new Error('Assessment record does not belong to this periodic attempt.');
      ownershipError.statusCode = 409;
      throw ownershipError;
    }
    return existing;
  }

  const subjectResults = {
    dsaResult: analysis.dsaResult,
    aptitudeResult: analysis.aptitudeResult,
    subjectMetrics: analysis.subjectMetrics,
    overall: analysis.overall,
    overallTimeSeconds: analysis.overallTimeSeconds,
    roadmapPreparation: analysis.roadmapPreparation,
    questionResponses: analysis.questionResponses
  };

  // Allocate a student-wide attempt number so the baseline is #1 and every
  // later periodic attempt continues #2, #3, and so on across types.
  for (let allocationTry = 0; allocationTry < 3; allocationTry += 1) {
    const { data: latest, error: latestError } = await supabase
      .from(HISTORY_TABLE)
      .select('attempt_number')
      .eq('student_id', analysis.studentId)
      .order('attempt_number', { ascending: false })
      .limit(1);
    if (latestError) throw latestError;
    const attemptNumber = (latest?.[0]?.attempt_number || 0) + 1;

    const { data, error } = await supabase
      .from(HISTORY_TABLE)
      .upsert({
        assessment_id: analysis.assessmentId,
        student_id: analysis.studentId,
        assessment_type: 'periodic',
        attempt_number: attemptNumber,
        started_at: analysis.startedAt,
        completed_at: analysis.completedAt,
        overall_time_seconds: analysis.overallTimeSeconds,
        subject_results: subjectResults
      }, { onConflict: 'assessment_id' })
      .select(HISTORY_SELECT)
      .single();

    if (!error) return data;
    if (error.code !== '23505' || allocationTry === 2) throw error;
  }

  throw new Error('Could not allocate a unique periodic assessment attempt number.');
}

module.exports = {
  persistInitialAssessment,
  getLatestInitialAssessment,
  hasInitialAssessment,
  getAssessmentHistory,
  getAssessmentHistoryRecord,
  persistPeriodicAssessment
};
