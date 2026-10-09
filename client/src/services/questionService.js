import { apiRequest } from './api';

export const questionService = {
  getQuestion: (id) => apiRequest(`/questions/${id}`),
  recordAttempt: (id, attemptData) => apiRequest(`/questions/${id}/attempt`, { method: 'POST', body: JSON.stringify(attemptData) }),
  getRelatedQuestions: (id) => apiRequest(`/questions/${id}/related`)
};
