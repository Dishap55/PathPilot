import { apiRequest } from './api';

export const adminService = {
  getStudents: () => apiRequest('/admin/students'),
  getTemplates: () => apiRequest('/admin/templates'),
  createTemplate: (data) => apiRequest('/admin/templates', { method: 'POST', body: JSON.stringify(data) }),
  updateTemplate: (id, data) => apiRequest(`/admin/templates/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  getQuestions: () => apiRequest('/admin/questions'),
  createQuestion: (data) => apiRequest('/admin/questions', { method: 'POST', body: JSON.stringify(data) }),
  updateQuestion: (id, data) => apiRequest(`/admin/questions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteQuestion: (id) => apiRequest(`/admin/questions/${id}`, { method: 'DELETE' }),
  generateQuestionAI: (criteria) => apiRequest('/admin/ai/generate-question', { method: 'POST', body: JSON.stringify(criteria) }),
  generateTemplateAI: (criteria) => apiRequest('/admin/ai/generate-template', { method: 'POST', body: JSON.stringify(criteria) })
};
