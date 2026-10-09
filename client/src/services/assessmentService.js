import { apiRequest } from './api';

export const assessmentService = {
  checkAssessmentStatus: async () => {
    const response = await apiRequest('/assessment/status');
    return response?.data || response;
  },
  getInitialContext: () => apiRequest('/assessment/initial'),
  getAssessmentInput: (subject) => apiRequest(subject ? `/assessment/input/${subject}` : '/assessment/input'),

  getAllAssessmentInputs: () => apiRequest('/assessment/input'),
  startAssessment: (templateId) => apiRequest('/assessment/start', { method: 'POST', body: JSON.stringify({ template_id: templateId }) }),
  getAssessment: (id) => apiRequest(`/assessment/${id}`),
  submitAssessment: (id, answers) => apiRequest(`/assessment/${id}/submit`, { method: 'POST', body: JSON.stringify({ answers }) }),
  getResult: (id) => apiRequest(`/assessment/result/${id}`),
  runCode: (sourceCode, language, stdin = '') => apiRequest('/assessment/code/run', { method: 'POST', body: JSON.stringify({ source_code: sourceCode, language, stdin }) }),
  runSql: (query, schemaContext = '') => apiRequest('/assessment/sql/run', { method: 'POST', body: JSON.stringify({ query, schema_context: schemaContext }) }),
  // STEP 2 Dynamic Session Endpoints
  startDynamicSession: (studentId, assessmentInput) => apiRequest('/assessment/session/start', { method: 'POST', body: JSON.stringify({ studentId, assessmentInput }) }),
  submitSessionAnswer: (payload) => apiRequest('/assessment/session/submit-answer', { method: 'POST', body: JSON.stringify(payload) }),
  continueToNextSubject: (assessmentId) => apiRequest('/assessment/session/next-subject', { method: 'POST', body: JSON.stringify({ assessmentId }) }),
  getSession: (id) => apiRequest(`/assessment/session/${id}`),

  // STEP 3 Initial Assessment Analysis & Dashboard Result
  completeInitialAssessment: (payload) => apiRequest('/assessment/initial/complete', { method: 'POST', body: JSON.stringify(payload) }),
  getInitialAssessmentResult: () => apiRequest('/assessment/initial/result'),
  getAssessmentHistory: () => apiRequest('/assessment/history')
};
