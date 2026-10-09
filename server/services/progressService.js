const { supabase } = require('../config/supabase');

const percent = (numerator, denominator) => denominator > 0
  ? Math.round((numerator / denominator) * 1000) / 10
  : 0;

class ProgressService {
  async getProgress(studentId) {
    const { data, error } = await supabase
      .from('topic_progress')
      .select('attempted_count, completed_count, correct_count, wrong_count, accuracy, total_practice_seconds')
      .eq('student_id', studentId);
    if (error) throw error;

    const totals = (data || []).reduce((sum, row) => ({
      attempted: sum.attempted + (row.attempted_count || 0),
      completed: sum.completed + (row.completed_count || 0),
      correct: sum.correct + (row.correct_count || 0),
      wrong: sum.wrong + (row.wrong_count || 0),
      time: sum.time + (row.total_practice_seconds || 0)
    }), { attempted: 0, completed: 0, correct: 0, wrong: 0, time: 0 });

    return {
      student_id: studentId,
      overall_accuracy: percent(totals.correct, totals.attempted),
      questions_completed: totals.completed,
      wrong_questions: totals.wrong,
      practice_time_seconds: totals.time,
      current_streak: null
    };
  }

  async getTopicProgress(studentId, topicId) {
    const { data, error } = await supabase
      .from('topic_progress')
      .select('topic_id, attempted_count, completed_count, correct_count, wrong_count, accuracy, total_practice_seconds, last_practiced_at')
      .eq('student_id', studentId)
      .eq('topic_id', topicId)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    return {
      topic_id: data.topic_id,
      attempted: data.attempted_count,
      completed: data.completed_count,
      correct: data.correct_count,
      wrong: data.wrong_count,
      accuracy: data.accuracy,
      total_practice_seconds: data.total_practice_seconds,
      last_practiced_at: data.last_practiced_at
    };
  }

  async getSubjectProgress(studentId, subjectCode) {
    const code = String(subjectCode || '').toUpperCase();
    const { data: subject, error: subjectError } = await supabase
      .from('subjects')
      .select('id, name, code')
      .eq('code', code)
      .maybeSingle();
    if (subjectError) throw subjectError;
    if (!subject) return { subject: null, summary: null, trend: [] };

    const [{ data: rows, error: progressError }, { count: topicCount, error: topicError }] = await Promise.all([
      supabase
        .from('topic_progress')
        .select('topic_id, attempted_count, completed_count, correct_count, wrong_count, accuracy, last_practiced_at, topic:topics!inner(id, name, subject_id)')
        .eq('student_id', studentId)
        .eq('topic.subject_id', subject.id),
      supabase
        .from('topics')
        .select('id', { count: 'exact', head: true })
        .eq('subject_id', subject.id)
        .eq('is_active', true)
    ]);
    if (progressError) throw progressError;
    if (topicError) throw topicError;

    const progressRows = (rows || []).filter(row => (row.attempted_count || 0) > 0);
    const totals = progressRows.reduce((sum, row) => ({
      attempted: sum.attempted + (row.attempted_count || 0),
      completed: sum.completed + (row.completed_count || 0),
      correct: sum.correct + (row.correct_count || 0),
      practiced: sum.practiced + 1
    }), { attempted: 0, completed: 0, correct: 0, practiced: 0 });

    const trend = progressRows
      .filter(row => row.last_practiced_at)
      .sort((a, b) => new Date(a.last_practiced_at) - new Date(b.last_practiced_at))
      .map(row => ({
        label: new Date(row.last_practiced_at).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
        mastery: percent(row.completed_count || 0, row.attempted_count || 0),
        accuracy: Number(row.accuracy) || 0,
        questions: row.completed_count || 0,
        topic: row.topic?.name || ''
      }));

    return {
      subject,
      summary: totals.attempted > 0 ? {
        mastery: percent(totals.completed, totals.attempted),
        accuracy: percent(totals.correct, totals.attempted),
        questions_solved: totals.completed,
        topics_practiced: totals.practiced,
        topics_total: topicCount || 0
      } : null,
      trend
    };
  }
}

module.exports = new ProgressService();
