import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { authService } from '../../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [isGitHubSubmitting, setIsGitHubSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle errors passed from OAuth callback or URL parameters
  useEffect(() => {
    if (location.state?.error) {
      console.log('[PATHPILOT_OAUTH] LOGIN_MOUNTED_WITH_ERROR', {
        errorMessage: location.state.error
      });
      setErrorMessage(location.state.error);
      window.history.replaceState({}, document.title);
      return;
    }

    try {
      const currentUrl = new URL(window.location.href);
      const searchError = currentUrl.searchParams.get('error');
      const hashStr = window.location.hash.startsWith('#')
        ? window.location.hash.slice(1)
        : window.location.hash;
      const hashParams = new URLSearchParams(hashStr);
      const hashError = hashParams.get('error');
      const errDesc = currentUrl.searchParams.get('error_description') || hashParams.get('error_description') || '';

      if (searchError || hashError) {
        const lowerDesc = errDesc.toLowerCase();
        if ((searchError || hashError) === 'access_denied' || lowerDesc.includes('cancelled') || lowerDesc.includes('denied')) {
          setErrorMessage('Authentication was cancelled. Please try again.');
        } else if (lowerDesc.includes('provider is not enabled') || lowerDesc.includes('unsupported provider')) {
          setErrorMessage('This OAuth provider is not currently enabled in the Supabase Dashboard.');
        } else {
          setErrorMessage('Authentication failed. Please try again.');
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
  }, [location]);

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = email.trim();

    if (!cleanEmail || !validateEmail(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await authService.login({
        email: cleanEmail,
        password,
      });

      if (error) {
        console.error('[Login] Sign-in error:', error);
        const msg = error.message?.toLowerCase() || '';
        if (
          msg.includes('invalid login credentials') ||
          msg.includes('invalid_grant') ||
          msg.includes('wrong password')
        ) {
          setErrorMessage('Invalid email or password. Please try again.');
        } else if (msg.includes('email not confirmed')) {
          setErrorMessage('Please verify your email before logging in.');
        } else if (msg.includes('rate limit') || msg.includes('too many')) {
          setErrorMessage('Too many login attempts. Please wait a few moments.');
        } else {
          setErrorMessage('Unable to sign in. Please check your credentials.');
        }
        setIsSubmitting(false);
        return;
      }

      if (data?.session) {
        setSuccessMessage('Welcome back! Signed in successfully.');
        setTimeout(() => {
          navigate('/dashboard');
        }, 150);
      } else {
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('[Login] Signin exception:', err);
      setErrorMessage('Something went wrong on the server. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleSubmitting(true);
    setErrorMessage('');
    try {
      const { error } = await authService.signInWithGoogle();
      if (error) {
        console.error('[Login] Google OAuth initialization error:', error);
        setErrorMessage(error.message || 'Unable to connect to Google authentication.');
        setIsGoogleSubmitting(false);
      }
    } catch (err) {
      console.error('[Login] Google OAuth unexpected error:', err);
      setErrorMessage(err.message || 'Google authentication could not be completed.');
      setIsGoogleSubmitting(false);
    }
  };

  const handleGitHubLogin = async () => {
    setIsGitHubSubmitting(true);
    setErrorMessage('');
    try {
      const { error } = await authService.signInWithGitHub();
      if (error) {
        console.error('[Login] GitHub OAuth initialization error:', error);
        setErrorMessage(error.message || 'Unable to connect to GitHub authentication.');
        setIsGitHubSubmitting(false);
      }
    } catch (err) {
      console.error('[Login] GitHub OAuth unexpected error:', err);
      setErrorMessage(err.message || 'GitHub authentication could not be completed.');
      setIsGitHubSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center lg:justify-start p-4 sm:p-6 lg:p-12 overflow-x-hidden font-sans select-none">
      {/* Background Wallpaper */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('/login_bg.jpg')` }}
      />

      {/* Back to Home Navigation Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-5 left-5 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-md text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 hover:bg-white hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Clean Translucent Glassmorphism Login Card */}
      <div className="relative z-10 w-full max-w-md lg:ml-8 xl:ml-16 my-auto">
        <div className="bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-[32px] p-6 sm:p-9 transition-all">
          
          {/* Top Brand Header */}
          <div className="text-center mb-6 pb-4 border-b border-slate-200/60">
            <div className="inline-flex items-center justify-center gap-2.5 mb-1.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 -rotate-12"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">PathPilot</span>
            </div>
            <p className="text-[11px] text-slate-600 font-semibold tracking-wide">
              Learn • Practice • Grow • Get Hired
            </p>
          </div>

          {/* Heading & Subtitle */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome <span className="text-indigo-600">Back</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 leading-relaxed">
              Continue your learning journey towards placement success.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 border border-slate-200/80 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all outline-none shadow-xs"
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-white/90 border border-slate-200/80 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all outline-none shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-0.5 px-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-medium">Remember Me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting || isGoogleSubmitting || isGitHubSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </span>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300/60" />
            </div>
            <span className="relative px-3 bg-white/90 rounded-full text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              or continue with
            </span>
          </div>

          {/* Social Authentication Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting || isGoogleSubmitting || isGitHubSubmitting}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {isGoogleSubmitting ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <span>Connecting...</span>
                </span>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.98 0 12s.45 3.83 1.25 5.42l4.03-3.15Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* GitHub Button */}
            <button
              type="button"
              onClick={handleGitHubLogin}
              disabled={isSubmitting || isGoogleSubmitting || isGitHubSubmitting}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {isGitHubSubmitting ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
                  <span>Connecting...</span>
                </span>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0 fill-current text-slate-900" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                  </svg>
                  <span>Continue with GitHub</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Sign Up Link */}
          <p className="text-center text-xs text-slate-500 font-medium mt-5">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 font-bold hover:underline">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
