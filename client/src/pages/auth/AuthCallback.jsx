import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/common/Loader';

/**
 * PathPilot OAuth Callback Handler
 *
 * Dedicated minimal callback route for Supabase OAuth flows (Google & GitHub).
 * - Detects provider errors, cancellations, or invalid grants cleanly.
 * - Leverages existing AuthContext session listener without duplicate subscriptions.
 * - Discriminates between existing students (setup_completed -> /dashboard)
 *   and newly authenticated OAuth students (needs setup -> /profile-setup).
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const [statusMessage, setStatusMessage] = useState('Verifying your credentials...');
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    async function processOAuthCallback() {
      // Guard against multiple executions or running after redirecting
      if (hasProcessedRef.current) return;
      if (window.location.pathname !== '/auth/callback') return;
      hasProcessedRef.current = true;

      // 1. Inspect URL parameters and hash fragments for OAuth errors or cancellations
      try {
        const currentUrl = new URL(window.location.href);
        const searchParams = currentUrl.searchParams;
        const hashStr = window.location.hash.startsWith('#')
          ? window.location.hash.slice(1)
          : window.location.hash;
        const hashParams = new URLSearchParams(hashStr);

        const error = searchParams.get('error') || hashParams.get('error');
        const errorCode = searchParams.get('error_code') || hashParams.get('error_code');
        const errorDesc = searchParams.get('error_description') || hashParams.get('error_description') || '';

        console.log('[PATHPILOT_OAUTH] CALLBACK', {
          pathname: window.location.pathname,
          hasCode: Boolean(searchParams.get('code')),
          hasError: Boolean(error),
          errorDescription: errorDesc || null
        });

        const verifierKeys = Object.keys(localStorage).filter(k => k.includes('code-verifier'));
        console.log('[PATHPILOT_OAUTH] PKCE', {
          verifierPresent: verifierKeys.length > 0,
          verifierCount: verifierKeys.length
        });

        if (error) {
          console.warn('[OAuth Callback] Authentication provider notice:', { error, errorCode, errorDesc });
          const lowerDesc = errorDesc.toLowerCase();
          let friendlyError = errorDesc;
          if (lowerDesc.includes('unable to exchange external code')) {
            friendlyError = 'Google OAuth configuration error: Supabase could not exchange the authorization code with Google. Please verify that the Google Client Secret in the Supabase Dashboard is valid and matches Google Cloud Console.';
          } else if (error === 'access_denied' || lowerDesc.includes('cancelled') || lowerDesc.includes('denied')) {
            friendlyError = 'Authentication was cancelled or access was denied. If using a test account, ensure it is added to Google Cloud Test Users.';
          } else if (lowerDesc.includes('provider is not enabled') || lowerDesc.includes('unsupported provider')) {
            friendlyError = 'This OAuth provider is not currently enabled in the Supabase Dashboard.';
          } else if (!friendlyError && errorCode) {
            friendlyError = `Authentication error: ${errorCode}`;
          } else if (!friendlyError && error) {
            friendlyError = `Authentication error: ${error}`;
          }

          console.log('[PATHPILOT_OAUTH] LOGIN_REDIRECT', {
            source: 'AuthCallback:provider_error',
            reason: friendlyError
          });

          navigate('/login', { replace: true, state: { error: friendlyError } });
          return;
        }

        // 2. Await Supabase automatic PKCE exchange
        setStatusMessage('Establishing secure learning session...');
        console.log('[PATHPILOT_OAUTH] EXCHANGE_START');

        // Check getSession() - automatically awaits Supabase client initializePromise and URL PKCE exchange
        let { data: { session: activeSession }, error: sessionError } = await supabase.auth.getSession();

        // If session is not immediately available, wait for SIGNED_IN event or poll briefly
        if (!activeSession) {
          activeSession = await new Promise((resolve) => {
            let settled = false;
            const timer = setTimeout(async () => {
              if (settled) return;
              settled = true;
              subscription?.unsubscribe();
              const retry = await supabase.auth.getSession();
              resolve(retry.data?.session || null);
            }, 3000);

            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
              if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && s && !settled) {
                settled = true;
                clearTimeout(timer);
                subscription?.unsubscribe();
                resolve(s);
              }
            });
          });
        }

        // 3. Fallback: If implicit hash tokens arrived and no session was established yet
        if (!activeSession) {
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          if (accessToken && refreshToken) {
            setStatusMessage('Establishing session from credentials...');
            const { data: setData, error: setSessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            if (setData?.session) {
              activeSession = setData.session;
            }
          }
        }

        console.log('[PATHPILOT_OAUTH] EXCHANGE_RESULT', {
          success: Boolean(activeSession),
          hasSession: Boolean(activeSession),
          hasUser: Boolean(activeSession?.user)
        });

        // 4. Validate user presence
        const { data: { user: userAfterExchange }, error: userErrorAfterExchange } = await supabase.auth.getUser();
        console.log('[PATHPILOT_OAUTH] GET_USER', {
          hasUser: Boolean(userAfterExchange),
          hasUserId: Boolean(userAfterExchange?.id),
          error: userErrorAfterExchange?.message || null
        });

        console.log('[PATHPILOT_OAUTH] SESSION_AFTER_EXCHANGE', {
          hasSession: Boolean(activeSession),
          hasUser: Boolean(activeSession?.user),
          hasUserId: Boolean(activeSession?.user?.id),
          error: sessionError?.message || null
        });

        console.log('[PATHPILOT_OAUTH] AUTH_CONTEXT', {
          hasUser: Boolean(authContext?.user),
          hasSession: Boolean(authContext?.session),
          loading: Boolean(authContext?.loading)
        });

        const activeUser = activeSession?.user || userAfterExchange || null;

        if (!activeUser) {
          const detail = userErrorAfterExchange?.message || sessionError?.message || 'No active session returned.';
          console.warn('[OAuth] No active user after callback processing', {
            detail,
            authKeysRemaining: Object.keys(localStorage).filter(k => k.includes('auth-token')).length
          });

          console.log('[PATHPILOT_OAUTH] LOGIN_REDIRECT', {
            source: 'AuthCallback:no_active_user',
            reason: detail
          });

          navigate('/login', {
            replace: true,
            state: { error: `Authentication session could not be established: ${detail}` }
          });
          return;
        }

        setStatusMessage('Configuring your learning workspace...');

        // 5. Query student_profiles using the fresh authenticated user ID
        console.log('[OAuth] student_profiles lookup starting', { userId: activeUser.id });
        const { data: profile, error: profileError } = await supabase
          .from('student_profiles')
          .select('id, setup_completed')
          .eq('id', activeUser.id)
          .maybeSingle();

        console.log('[PATHPILOT_OAUTH] PROFILE', {
          querySuccess: !profileError,
          profileExists: Boolean(profile),
          setupCompleted: Boolean(profile?.setup_completed)
        });

        if (profileError) {
          console.warn('[OAuth Callback] Profile lookup error:', profileError.message);
        }

        // 6. Route user based on setup completion
        if (profile && profile.setup_completed) {
          console.log('[OAuth] Routing existing student to /dashboard');
          navigate('/dashboard', { replace: true });
        } else {
          console.log('[OAuth] Routing new/unconfigured student to /profile-setup');
          navigate('/profile-setup', { replace: true });
        }
      } catch (err) {
        console.error('[OAuth Callback] Unexpected error during OAuth callback flow:', err);
        console.log('[PATHPILOT_OAUTH] LOGIN_REDIRECT', {
          source: 'AuthCallback:unexpected_catch',
          reason: err.message
        });
        navigate('/login', {
          replace: true,
          state: { error: 'An unexpected error occurred during authentication. Please try again.' }
        });
      }
    }

    processOAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FAFBFD] p-6 font-sans select-none">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        {/* Global PathPilot Loader */}
        <Loader size="lg" />

        {/* Status Text */}
        <div className="pt-2">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Authenticating with PathPilot</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">{statusMessage}</p>
        </div>
      </div>
    </div>
  );
}
