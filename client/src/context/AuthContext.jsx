import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial session check
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('[Supabase Auth] Error fetching session:', error.message);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(err => {
      console.error('[Supabase Auth] Unexpected error in getSession:', err);
      setLoading(false);
    });

    // 2. Listen to auth state transitions
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[PATHPILOT_OAUTH] AUTH_EVENT', {
        event
      });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    return await authService.login({ email, password });
  };

  const signup = async (userData) => {
    return await authService.signup(userData);
  };

  const signInWithGoogle = async () => {
    return await authService.signInWithGoogle();
  };

  const signInWithGitHub = async () => {
    return await authService.signInWithGitHub();
  };

  const signInWithGithub = async () => {
    return await authService.signInWithGitHub();
  };

  const logout = async () => {
    const { error } = await authService.logout();
    if (error) {
      console.error('[Supabase Auth] Error logging out:', error.message);
    }
    setSession(null);
    setUser(null);
  };

  const resetPasswordForEmail = async (email) => {
    return await authService.forgotPassword(email);
  };

  const updatePassword = async (newPassword) => {
    return await authService.resetPassword(newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        login,
        signup,
        signInWithGoogle,
        signInWithGitHub,
        signInWithGithub,
        logout,
        resetPasswordForEmail,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
