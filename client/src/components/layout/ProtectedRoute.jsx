import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../common/Loader';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen size="lg" text="Checking session..." />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
