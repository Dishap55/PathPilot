import { useState, useEffect } from 'react';
import { progressService } from '../services/progressService';

export function useProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressService.getProgress()
      .then(setProgress)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { progress, loading };
}
