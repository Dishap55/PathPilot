import { useState, useEffect } from 'react';
import { subjectService } from '../services/subjectService';

export function useSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    subjectService.getSubjects()
      .then(setSubjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { subjects, loading };
}
