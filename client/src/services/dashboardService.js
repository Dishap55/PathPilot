import { apiRequest } from './api';

export const dashboardService = {
  getDashboard: () => apiRequest('/dashboard'),
  getAnalytics: () => apiRequest('/dashboard/analytics'),
  getWeakAreas: () => apiRequest('/dashboard/weak-areas')
};
