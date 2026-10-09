import { useState, useEffect } from 'react';
import { roadmapService } from '../services/roadmapService';

export function useRoadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    roadmapService.getRoadmap()
      .then(setRoadmap)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { roadmap, loading };
}
