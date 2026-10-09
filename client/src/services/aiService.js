import { apiRequest } from './api';

export const aiService = {
  analyze: (payload = {}) => apiRequest('/ai/analyze', { method: 'POST', body: JSON.stringify(payload) }),
  analyzeAssessment: (payload = {}) => apiRequest('/ai/analyze', { method: 'POST', body: JSON.stringify(payload) }),
  explain: (prompt, context) => apiRequest('/ai/explain', { method: 'POST', body: JSON.stringify({ prompt, context }) }),
  getHint: (payload) => apiRequest('/ai/hint', { method: 'POST', body: JSON.stringify(payload) }),
  getMentorGuidance: (payload) => apiRequest('/ai/mentor', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  // Bestu AI Mentor
  bestuChat: (payload, options = {}) => apiRequest('/bestu/chat', {
    ...options,
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  bestuHint: (payload) => apiRequest('/bestu/hint', { method: 'POST', body: JSON.stringify(payload) }),
};
