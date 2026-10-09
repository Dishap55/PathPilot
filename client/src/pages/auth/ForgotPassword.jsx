import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';
import { authService } from '../../services/authService';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = email.trim();

    if (!cleanEmail || !validateEmail(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await authService.forgotPassword(cleanEmail);

      if (error) {
        console.error('[ForgotPassword] Reset request notice:', error);
        const msg = error.message?.toLowerCase() || '';
        const isRateLimit =
          error.status === 429 ||
          error.code === 'over_email_send_rate_limit' ||
          msg.includes('rate limit') ||
          msg.includes('too many') ||
          msg.includes('exceeded') ||
          msg.includes('wait');

        if (isRateLimit) {
          setErrorMessage('Too many reset requests. Please wait a few moments before trying again.');
        } else if (msg.includes('valid email')) {
          setErrorMessage('Please enter a valid email address.');
        } else {
          // Generic response for security anti-enumeration
          setSuccessMessage('Reset link sent. Check your email for instructions to reset your password. If an account exists for this email, a password reset link has been sent.');
        }
        setIsSubmitting(false);
        return;
      }

      // Generic response for security anti-enumeration
      setSuccessMessage('Reset link sent. Check your email for instructions to reset your password. If an account exists for this email, a password reset link has been sent.');
      setIsSubmitting(false);
    } catch (err) {
      console.error('[ForgotPassword] Unexpected exception:', err);
      const msg = err?.message?.toLowerCase() || '';
      const isRateLimit =
        err?.status === 429 ||
        err?.code === 'over_email_send_rate_limit' ||
        msg.includes('rate limit') ||
        msg.includes('too many') ||
        msg.includes('exceeded') ||
        msg.includes('wait');

      if (isRateLimit) {
        setErrorMessage('Too many reset requests. Please wait a few moments before trying again.');
      } else {
        setSuccessMessage('Reset link sent. Check your email for instructions to reset your password. If an account exists for this email, a password reset link has been sent.');
      }
      setIsSubmitting(false);
    }
  };

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

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_25px_60px_rgba(0,0,0,0.25)] rounded-3xl p-6 sm:p-10 my-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Enter your registered email address to receive password recovery instructions
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              />
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
                <span>Sending Instructions...</span>
              </span>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 font-medium mt-6">
          Remembered your password?{' '}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
