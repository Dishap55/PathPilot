import { supabase } from '../lib/supabaseClient';
import { resetThemeToLight } from '../contexts/ThemeContext.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const authService = {
  /**
   * Secure Email/Password Signup
   * Dispatches to POST /api/auth/signup for server pre-confirmed email registration,
   * then auto-logs in via Supabase client to establish session & JWT.
   */
  signup: async (userData) => {
    const { email, password, fullName, preferred_subject, preferredSubject, ...metadata } = userData;
    const cleanEmail = email.trim();
    const subject = preferredSubject || preferred_subject || 'DSA';

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          password,
          fullName: fullName?.trim(),
          preferredSubject: subject,
          ...metadata
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error('[authService.signup] Backend registration notice:', response.status, data);
        const err = new Error(data.message || 'Unable to create your account.');
        err.status = response.status;
        err.code = data.code || (response.status === 409 ? 'user_already_exists' : undefined);
        throw err;
      }
    } catch (err) {
      if (err.status) {
        throw err;
      }

      console.error('[authService.signup] Backend registration server unreachable:', err.message || err);
      const networkErr = new Error('Unable to connect to the registration server. Please ensure the server is running and try again.');
      networkErr.code = 'BACKEND_UNAVAILABLE';
      throw networkErr;
    }

    const loginResult = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password
    });

    if (loginResult.error) {
      console.error('[authService.signup] Auto-login error after registration:', loginResult.error);
      throw loginResult.error;
    }

    return loginResult;
  },

  /**
   * Email/Password Login
   */
  login: async (credentials) => {
    const { email, password } = credentials;
    return await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
  },

  /**
   * Google OAuth Sign-In / Sign-Up
   */
  signInWithGoogle: async () => {
    let hasSessionBeforeOAuth = false;
    try {
      const { data: { session: existingSession } } = await supabase.auth.getSession();
      hasSessionBeforeOAuth = Boolean(existingSession);
    } catch (e) {}

    console.log('[PATHPILOT_OAUTH] START', {
      path: window.location.pathname,
      hasSessionBeforeOAuth
    });

    const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    const redirectUrl = `${appUrl}/auth/callback`;

    console.log('[OAuth] Calling signInWithOAuth', {
      provider: 'google',
      redirectUrl
    });

    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          prompt: 'select_account'
        }
      }
    });

    const pkceKeysAfterOAuth = Object.keys(localStorage).filter(k => k.includes('code-verifier'));
    console.log('[OAuth] signInWithOAuth call result', {
      hasError: Boolean(result.error),
      errorMessage: result.error?.message,
      pkceKeysCount: pkceKeysAfterOAuth.length
    });

    return result;
  },

  /**
   * GitHub OAuth Sign-In / Sign-Up
   */
  signInWithGitHub: async () => {
    const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    return await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${appUrl}/auth/callback`
      }
    });
  },

  signInWithGithub: async () => {
    return await authService.signInWithGitHub();
  },

  /**
   * Sign Out
   */
  logout: async () => {
    resetThemeToLight();
    return await supabase.auth.signOut();
  },

  /**
   * Request Password Reset Email
   */
  forgotPassword: async (email) => {
    const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    const redirectTo = `${appUrl}/reset-password`;
    return await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo,
    });
  },

  /**
   * Update Password after recovery link click
   */
  resetPassword: async (newPassword) => {
    return await supabase.auth.updateUser({
      password: newPassword,
    });
  },

  /**
   * Session & User Helpers
   */
  getSession: async () => {
    return await supabase.auth.getSession();
  },

  getUser: async () => {
    return await supabase.auth.getUser();
  }
};
