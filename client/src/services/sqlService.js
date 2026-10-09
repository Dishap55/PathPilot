import { apiRequest } from './api';

export const sqlService = {
  executeSql: (query, schemaContext = '') => apiRequest('/sql/execute', { method: 'POST', body: JSON.stringify({ query, schemaContext }) }),
  getSchema: (questionId) => apiRequest(`/sql/${questionId}/schema`)
};
