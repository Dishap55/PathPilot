import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LearningGardenOnboarding from '../../components/garden/LearningGardenOnboarding';
import { PageLoader } from '../../components/common/Loader';

/**
 * PathPilot LearningGardenOnboardingPage
 * 
 * Page wrapper for the Learning Garden onboarding experience.
 * Protects route with authentication and handles navigation to /dashboard.
 */

export default function LearningGardenOnboardingPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <PageLoader text="Cultivating your Learning Garden..." size="lg" />;
  }

  return (
    <LearningGardenOnboarding
      onComplete={() => navigate('/dashboard')}
    />
  );
}
