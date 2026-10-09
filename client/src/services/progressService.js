import { apiRequest } from './api';

export const progressService = {
  getProgress: () => apiRequest('/progress'),
  getTopicProgress: (topicId) => apiRequest(`/progress/topic/${topicId}`),
  /**
   * Returns subject-level progress aggregated from topic_progress → topics → subjects.
   * Uses the authenticated student's JWT — no client-side student_id required.
   * @param {string} subjectCode - Canonical code: DSA | OOPS | APT | DBMS | OS | CN
   */
  getSubjectProgress: (subjectCode) => apiRequest(`/progress/subject/${encodeURIComponent(subjectCode)}`)
};
