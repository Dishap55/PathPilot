import { apiRequest } from './api';

export const codeExecutionService = {
  runCode: (sourceCode, language, stdin = '') => apiRequest('/code/run', { method: 'POST', body: JSON.stringify({ source_code: sourceCode, language, stdin }) }),
  submitCode: (sourceCode, language, questionId) => apiRequest('/code/submit', { method: 'POST', body: JSON.stringify({ source_code: sourceCode, language, question_id: questionId }) })
};
