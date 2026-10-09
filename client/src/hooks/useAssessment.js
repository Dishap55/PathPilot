import { useState } from 'react';
import { assessmentService } from '../services/assessmentService';

export function useAssessment() {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);

  const start = async (templateId) => {
    setLoading(true);
    try {
      const data = await assessmentService.startAssessment(templateId);
      setAssessment(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  return { assessment, loading, start };
}
