import { supabase } from '../lib/supabaseClient.js';

/**
 * Deterministic UUID generator for string IDs to comply with Supabase UUID fields if needed
 */
const stringToUuid = (str) => {
  if (!str) return '00000000-0000-0000-0000-000000000000';
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)) {
    return str;
  }
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hex.slice(0, 8)}-0000-4000-8000-000000000000`;
};

const STORAGE_PREFIX = 'pathpilot_practice_history_';

const getLocalStorageKey = (userId) => {
  return `${STORAGE_PREFIX}${userId || 'guest'}`;
};

/**
 * Get all attempts stored in localStorage for a given student
 */
const getLocalAttempts = (userId) => {
  try {
    const key = getLocalStorageKey(userId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn('[practiceHistoryService] Failed to read localStorage:', e);
    return [];
  }
};

/**
 * Save attempts list to localStorage
 */
const saveLocalAttempts = (userId, attempts) => {
  try {
    const key = getLocalStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(attempts));
  } catch (e) {
    console.warn('[practiceHistoryService] Failed to write localStorage:', e);
  }
};

export const practiceHistoryService = {
  /**
   * Record a new problem attempt (Append-Only)
   */
  saveAttempt: async ({
    userId = null,
    problemId,
    problemTitle,
    difficulty,
    pattern,
    language,
    submittedCode,
    passedCount = 0,
    totalCount = 0,
    result = 'PASSED',
    solutionAnalysis = ''
  }) => {
    const currentLocal = getLocalAttempts(userId);
    const pastProblemAttempts = currentLocal.filter((a) => a.problemId === problemId);
    const attemptNumber = pastProblemAttempts.length + 1;

    const timestamp = new Date().toISOString();
    const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const attemptObj = {
      id: attemptId,
      userId: userId || 'guest',
      problemId,
      problemTitle: problemTitle || problemId,
      difficulty: difficulty || 'Medium',
      pattern: pattern || 'Two Pointers',
      language,
      submittedCode,
      attemptNumber,
      passedCount,
      totalCount,
      result: passedCount === totalCount ? 'PASSED' : 'FAILED',
      solutionAnalysis,
      createdAt: timestamp
    };

    // 1. Save locally (Always succeeds)
    const updatedLocal = [attemptObj, ...currentLocal];
    saveLocalAttempts(userId, updatedLocal);

    // 2. Sync to Supabase if authenticated
    if (userId && supabase) {
      try {
        const payload = {
          student_id: userId,
          question_id: stringToUuid(problemId),
          result: attemptObj.result,
          code_submission_ref: JSON.stringify({
            id: attemptObj.id,
            problem_id: problemId,
            problem_title: attemptObj.problemTitle,
            difficulty: attemptObj.difficulty,
            pattern: attemptObj.pattern,
            language: attemptObj.language,
            submitted_code: attemptObj.submittedCode,
            attempt_number: attemptObj.attemptNumber,
            passed_count: attemptObj.passedCount,
            total_count: attemptObj.totalCount,
            solution_analysis: attemptObj.solutionAnalysis,
            created_at: timestamp
          }),
          time_spent: 0,
          created_at: timestamp
        };

        const { error } = await supabase.from('question_attempts').insert([payload]);
        if (error) {
          console.warn('[practiceHistoryService] Supabase insert note:', error.message);
        }
      } catch (err) {
        console.warn('[practiceHistoryService] Supabase sync exception:', err);
      }
    }

    return attemptObj;
  },

  /**
   * Get all attempts for a specific problem sorted by newest first
   */
  getProblemAttempts: async (userId, problemId) => {
    let localAttempts = getLocalAttempts(userId).filter((a) => a.problemId === problemId);

    if (userId && supabase) {
      try {
        const qId = stringToUuid(problemId);
        const { data, error } = await supabase
          .from('question_attempts')
          .select('*')
          .eq('student_id', userId)
          .eq('question_id', qId)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const dbAttempts = data.map((item) => {
            let ref = {};
            try {
              if (item.code_submission_ref) {
                ref = typeof item.code_submission_ref === 'string'
                  ? JSON.parse(item.code_submission_ref)
                  : item.code_submission_ref;
              }
            } catch (e) {
              // ignore JSON parse error
            }
            return {
              id: item.id,
              userId: item.student_id,
              problemId: ref.problem_id || problemId,
              problemTitle: ref.problem_title || problemId,
              difficulty: ref.difficulty || 'Medium',
              pattern: ref.pattern || 'Two Pointers',
              language: ref.language || 'C++',
              submittedCode: ref.submitted_code || '',
              attemptNumber: ref.attempt_number || 1,
              passedCount: ref.passed_count ?? (item.result === 'PASSED' ? 3 : 0),
              totalCount: ref.total_count ?? 3,
              result: item.result,
              createdAt: item.created_at
            };
          });

          // Merge & deduplicate by ID or createdAt
          const combined = [...localAttempts];
          dbAttempts.forEach((dbA) => {
            if (!combined.some((lA) => lA.id === dbA.id || lA.createdAt === dbA.createdAt)) {
              combined.push(dbA);
            }
          });
          localAttempts = combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
      } catch (e) {
        console.warn('[practiceHistoryService] Supabase fetch exception:', e);
      }
    }

    return localAttempts;
  },

  /**
   * Get all attempts across all problems
   */
  getAllAttempts: async (userId) => {
    return getLocalAttempts(userId);
  },

  /**
   * Get problem summary stats for practice drawer & topic overview
   */
  getProblemStatsMap: async (userId) => {
    const attempts = getLocalAttempts(userId);
    const statsMap = {};

    attempts.forEach((att) => {
      const pId = att.problemId;
      if (!statsMap[pId]) {
        statsMap[pId] = {
          problemId: pId,
          status: 'Not Started',
          totalAttempts: 0,
          passedAttempts: 0,
          bestPassed: 0,
          totalCases: att.totalCount || 3,
          lastAttemptedAt: null,
          latestLanguage: att.language
        };
      }

      const entry = statsMap[pId];
      entry.totalAttempts += 1;
      if (att.result === 'PASSED' || att.passedCount === att.totalCount) {
        entry.passedAttempts += 1;
        entry.status = 'Completed';
      } else if (entry.status !== 'Completed') {
        entry.status = 'In Progress';
      }

      if (att.passedCount > entry.bestPassed) {
        entry.bestPassed = att.passedCount;
      }

      if (!entry.lastAttemptedAt || new Date(att.createdAt) > new Date(entry.lastAttemptedAt)) {
        entry.lastAttemptedAt = att.createdAt;
        entry.latestLanguage = att.language;
      }
    });

    return statsMap;
  }
};
