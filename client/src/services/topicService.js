import { apiRequest } from './api';

export const topicService = {
  getTopicsBySubject: (subjectId) => apiRequest(`/topics/${subjectId}`),
  getTopicDetails: (topicId) => apiRequest(`/topics/${topicId}`),
  getTopicMaterial: (topicId) => apiRequest(`/topics/${topicId}/material`)
};
