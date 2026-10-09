const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getSupabaseClient } = require('../config/supabaseAdmin');

/**
 * Progress Routes
 * Endpoints for topic mastery, confidence scores, and study activity.
 */

// Retrieve overall progress for authenticated student
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Endpoint registered'
  });
});

// Update topic progress
router.post('/topic', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Endpoint registered'
  });
});

/**
 * GET /api/progress/subject/:subjectCode
 *
 * Returns subject-level progress aggregated from topic_progress → topics → subjects.
 *
 * Response shape:
 * {
 *   success: true,
 *   subject: { code, name },
 *   summary: {
 *     mastery: number (0-100, weighted accuracy across topics),
 *     accuracy: number (0-100),
 *     questions_solved: number,
 *     questions_attempted: number,
 *     topics_practiced: number,
 *     topics_total: number
 *   },
 *   trend: [
 *     { label: string, date: string, mastery: number, accuracy: number, questions: number }
 *   ]
 * }
 *
 * SECURITY: Uses req.user.id only — never accepts student_id from request body/query.
 */
router.get('/subject/:subjectCode', authMiddleware, async (req, res) => {
  const studentId = req.user.id;
  const subjectCode = (req.params.subjectCode || '').toUpperCase();

  // Canonical subject codes
  const VALID_CODES = ['DSA', 'OOPS', 'APT', 'DBMS', 'OS', 'CN'];
  if (!VALID_CODES.includes(subjectCode)) {
    return res.status(400).json({
      success: false,
      message: `Invalid subject code. Must be one of: ${VALID_CODES.join(', ')}`
    });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || null;
    const client = getSupabaseClient(token);

    // 1. Resolve subject UUID from canonical code
    const { data: subjectRow, error: subjectErr } = await client
      .from('subjects')
      .select('id, name, code')
      .eq('code', subjectCode)
      .eq('is_active', true)
      .maybeSingle();

    if (subjectErr) throw subjectErr;
    if (!subjectRow) {
      return res.status(404).json({ success: false, message: `Subject '${subjectCode}' not found.` });
    }

    // 2. Fetch all topics belonging to this subject
    const { data: topicRows, error: topicsErr } = await client
      .from('topics')
      .select('id, name')
      .eq('subject_id', subjectRow.id)
      .eq('is_active', true);

    if (topicsErr) throw topicsErr;
    const topicIds = (topicRows || []).map(t => t.id);

    // 3. Fetch topic_progress records for this student scoped to this subject's topics
    let progressRows = [];
    if (topicIds.length > 0) {
      const { data: progData, error: progErr } = await client
        .from('topic_progress')
        .select('topic_id, attempted_count, correct_count, wrong_count, accuracy, last_practiced_at')
        .eq('student_id', studentId)
        .in('topic_id', topicIds)
        .order('last_practiced_at', { ascending: true });

      if (progErr) throw progErr;
      progressRows = progData || [];
    }

    // 4. Compute summary aggregates from real data
    const topicsPracticed = progressRows.filter(p => p.attempted_count > 0).length;
    const totalAttempted = progressRows.reduce((s, p) => s + (p.attempted_count || 0), 0);
    const totalCorrect = progressRows.reduce((s, p) => s + (p.correct_count || 0), 0);

    const accuracy = totalAttempted > 0
      ? Math.round((totalCorrect / totalAttempted) * 100)
      : 0;

    // Mastery: weighted average of per-topic accuracy (only practiced topics)
    const practicedRows = progressRows.filter(p => p.attempted_count > 0);
    const mastery = practicedRows.length > 0
      ? Math.round(practicedRows.reduce((s, p) => s + (p.accuracy || 0), 0) / practicedRows.length)
      : 0;

    // 5. Build chronological trend from topic_progress.last_practiced_at
    // Group by calendar date → cumulative mastery/accuracy snapshot at each practice date
    const dateMap = {};
    for (const p of progressRows) {
      if (!p.last_practiced_at || p.attempted_count === 0) continue;
      const dateKey = p.last_practiced_at.slice(0, 10); // YYYY-MM-DD
      if (!dateMap[dateKey]) {
        dateMap[dateKey] = { date: dateKey, totalAcc: 0, totalAttempted: 0, totalCorrect: 0, count: 0 };
      }
      dateMap[dateKey].totalAcc += p.accuracy || 0;
      dateMap[dateKey].totalAttempted += p.attempted_count || 0;
      dateMap[dateKey].totalCorrect += p.correct_count || 0;
      dateMap[dateKey].count++;
    }

    // Sort dates chronologically and build cumulative trend snapshots
    const sortedDates = Object.keys(dateMap).sort();
    const trend = sortedDates.map((date, idx) => {
      // Cumulative aggregation up to and including this date
      const upTo = sortedDates.slice(0, idx + 1);
      let cumAttempted = 0, cumCorrect = 0, cumAcc = 0, cumCount = 0;
      for (const d of upTo) {
        cumAttempted += dateMap[d].totalAttempted;
        cumCorrect += dateMap[d].totalCorrect;
        cumAcc += dateMap[d].totalAcc;
        cumCount += dateMap[d].count;
      }
      const trendAccuracy = cumAttempted > 0 ? Math.round((cumCorrect / cumAttempted) * 100) : 0;
      const trendMastery = cumCount > 0 ? Math.round(cumAcc / cumCount) : 0;

      // Format label as "Sep 26"
      const d = new Date(date + 'T00:00:00Z');
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

      return {
        label,
        date,
        mastery: trendMastery,
        accuracy: trendAccuracy,
        questions: cumAttempted
      };
    });

    return res.status(200).json({
      success: true,
      subject: {
        code: subjectRow.code,
        name: subjectRow.name
      },
      summary: {
        mastery,
        accuracy,
        questions_solved: totalCorrect,
        questions_attempted: totalAttempted,
        topics_practiced: topicsPracticed,
        topics_total: topicIds.length
      },
      trend
    });
  } catch (err) {
    console.error('[Progress API] Subject progress error:', err.message || err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve subject progress. Please try again.'
    });
  }
});

module.exports = router;
