import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../common/Loader';

export default function AuthGuard({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen size="lg" text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.user_metadata?.role || user?.role;
  if (requiredRole && role && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
