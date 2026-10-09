import { apiRequest } from './api';

export const profileService = {
  getProfile: () => apiRequest('/profile'),
  updateProfile: (profile) => apiRequest('/profile', { method: 'PUT', body: JSON.stringify(profile) }),
  getSubjectLevels: () => apiRequest('/profile/subject-levels'),
  updateSubjectLevels: (levels) => apiRequest('/profile/subject-levels', { method: 'PUT', body: JSON.stringify({ levels }) })
};
