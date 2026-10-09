import { apiRequest } from './api';

export const roadmapService = {
  getRoadmap: () => apiRequest('/roadmap'),
  generateRoadmap: (payload = {}) => apiRequest('/roadmap/generate', { method: 'POST', body: JSON.stringify(payload) }),
  getRoadmapById: (id) => apiRequest(`/roadmap/${id}`),

  // Milestone Learning & Practice
  getMilestone: (id) => apiRequest(`/roadmap/milestone/${id}`),
  getPracticeQuestions: (id) => apiRequest(`/roadmap/milestone/${id}/practice`),
  submitAttempt: (id, payload) => apiRequest(`/roadmap/milestone/${id}/attempt`, {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  completeMilestone: (id) => apiRequest(`/roadmap/milestone/${id}/complete`, {
    method: 'POST',
    body: JSON.stringify({})
  }),

  // Execution Proxies
  runCode: (payload) => apiRequest('/assessment/run-code', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  runSql: (payload) => apiRequest('/assessment/run-sql', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  recalibrateRoadmap: (comparisonData, aiAnalysis) => apiRequest('/roadmap/recalibrate', {
    method: 'POST',
    body: JSON.stringify({ comparison_data: comparisonData, ai_analysis: aiAnalysis })
  })
};
