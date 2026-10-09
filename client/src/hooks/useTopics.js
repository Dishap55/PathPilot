import { useState, useEffect } from 'react';
import { topicService } from '../services/topicService';

export function useTopics(subjectId) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId) return;
    topicService.getTopicsBySubject(subjectId)
      .then(setTopics)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [subjectId]);

  return { topics, loading };
}
