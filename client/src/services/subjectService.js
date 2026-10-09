import { apiRequest } from './api';

export const subjectService = {
  getSubjects: () => apiRequest('/subjects')
};
