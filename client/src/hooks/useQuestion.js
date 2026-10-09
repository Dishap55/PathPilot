import { useState, useEffect } from 'react';
import { questionService } from '../services/questionService';

export function useQuestion(id) {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    questionService.getQuestion(id)
      .then(setQuestion)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  return { question, loading };
}
