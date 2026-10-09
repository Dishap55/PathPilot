import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { authService } from '../../services/authService';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isResetComplete, setIsResetComplete] = useState(false);

  // Recovery session state detection
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasValidRecoverySession, setHasValidRecoverySession] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkRecoverySession() {
      // 1. Check if hash parameters indicate recovery token (#access_token=... or type=recovery)
      const hash = window.location.hash || '';
      const hasHashRecovery = hash.includes('type=recovery') || hash.includes('access_token=');

      // 2. Check current Supabase session
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          if (session || hasHashRecovery) {
            setHasValidRecoverySession(true);
          } else {
            setHasValidRecoverySession(false);
          }
          setCheckingSession(false);
        }
      } catch (err) {
        console.warn('[ResetPassword] Session check notice:', err);
        if (mounted) {
          setHasValidRecoverySession(hasHashRecovery);
          setCheckingSession(false);
        }
      }
    }

    checkRecoverySession();

    // 3. Listen for Supabase PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === 'PASSWORD_RECOVERY' || session) {
        setHasValidRecoverySession(true);
        setCheckingSession(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!password) {
      setErrorMessage('Please enter your new password.');
      return;
    }

    if (!confirmPassword) {
      setErrorMessage('Please confirm your new password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await authService.resetPassword(password);

      if (error) {
        console.error('[ResetPassword] Update error:', error);
        setErrorMessage(error.message || 'Unable to update password. Please request a new recovery link.');
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage('Password updated successfully.');
      setIsResetComplete(true);
      setIsSubmitting(false);
    } catch (err) {
      console.error('[ResetPassword] Update exception:', err);
      setErrorMessage('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-3 shadow-xl">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-600">Verifying recovery link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden font-sans select-none">
      {/* Background Wallpaper */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('/background.jpg')` }}
      >
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
      </div>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-lg text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 hover:bg-white hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Reset Card Container */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_25px_60px_rgba(0,0,0,0.25)] rounded-3xl p-6 sm:p-10 my-8">
        
        {/* Invalid or Expired Recovery Session View */}
        {!hasValidRecoverySession && !isResetComplete ? (
          <div className="text-center space-y-4 py-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Invalid or Expired Link</h2>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                This password reset link is invalid or has expired. Recovery links can only be used once.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/forgot-password"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Request a New Reset Link</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Create a new password
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Choose a new strong password for your PathPilot account
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {isResetComplete ? (
              <div className="space-y-4 pt-2 text-center">
                <p className="text-xs text-slate-600">
                  Your password has been changed successfully. You can now sign in with your new credentials.
                </p>
                <Link
                  to="/login"
                  aria-label="Continue to Login"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <span>Go to Login / Continue to Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide new password' : 'Show new password'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirm new password' : 'Show confirm new password'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Updating Password...</span>
                    </span>
                  ) : (
                    <>
                      <span>Update Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </>
        )}

        <p className="text-center text-xs text-slate-500 font-medium mt-6">
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
