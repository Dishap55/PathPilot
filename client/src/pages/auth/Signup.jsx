import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { authService } from '../../services/authService';

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedSubject = searchParams.get('subject') || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAccountExistsModal, setShowAccountExistsModal] = useState(false);

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setShowAccountExistsModal(false);

    const cleanEmail = email.trim();

    if (!cleanEmail || !validateEmail(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter a password.');
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

    if (!agreed) {
      setErrorMessage('Please accept the Terms and Conditions.');
      return;
    }

    setIsSubmitting(true);

    // Default name from email prefix if name field is omitted
    const defaultName = cleanEmail.split('@')[0] || 'Student';

    try {
      const { data, error } = await authService.signup({
        email: cleanEmail,
        password,
        fullName: defaultName,
        preferredSubject: selectedSubject || 'DSA'
      });

      if (error) {
        console.error('[Signup] Registration notice:', error);
        const msg = (error.message || '').toLowerCase();

        if (
          error.status === 409 ||
          error.code === 'user_already_exists' ||
          msg.includes('already registered') ||
          msg.includes('already exists')
        ) {
          setShowAccountExistsModal(true);
          setErrorMessage('Account already exists. Please sign in to continue.');
        } else if (error.code === 'BACKEND_UNAVAILABLE' || msg.includes('registration server')) {
          setErrorMessage(
            'Unable to connect to the registration server. Please ensure the server is running and try again.'
          );
        } else if (error.status === 429 || msg.includes('rate limit')) {
          setErrorMessage('Too many registration attempts. Please wait a moment and try again.');
        } else {
          setErrorMessage(error.message || 'Unable to create your account. Please check your email and password.');
        }
        setIsSubmitting(false);
        return;
      }

      if (data?.session) {
        setSuccessMessage('Account created successfully! Welcome to PathPilot.');
        setTimeout(() => {
          navigate('/profile-setup');
        }, 800);
      } else {
        setSuccessMessage('Account created! Redirecting to setup...');
        setTimeout(() => {
          navigate('/profile-setup');
        }, 800);
      }
    } catch (err) {
      console.error('[Signup] Registration exception:', err);
      const msg = (err.message || '').toLowerCase();

      if (
        err.status === 409 ||
        err.code === 'user_already_exists' ||
        msg.includes('already registered') ||
        msg.includes('already exists')
      ) {
        setShowAccountExistsModal(true);
        setErrorMessage('Account already exists. Please sign in to continue.');
      } else if (err.code === 'BACKEND_UNAVAILABLE' || msg.includes('registration server')) {
        setErrorMessage(
          'Unable to connect to the registration server. Please ensure the server is running and try again.'
        );
      } else if (err.status === 429 || msg.includes('rate limit')) {
        setErrorMessage('Too many registration attempts. Please wait a moment and try again.');
      } else {
        setErrorMessage(err.message || 'Unable to create your account. Please check your email and password.');
      }
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleSubmitting(true);
    setErrorMessage('');
    try {
      const { error } = await authService.signInWithGoogle();
      if (error) {
        setErrorMessage(error.message || 'Unable to connect to Google authentication.');
        setIsGoogleSubmitting(false);
      }
    } catch (err) {
      setErrorMessage('Google authentication could not be completed.');
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center lg:justify-start p-4 sm:p-6 lg:p-10 overflow-x-hidden font-sans select-none">
      {/* Sharp Static Background Wallpaper (No Blur, No Tint) */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('/signup_bg.jpg')` }}
      />

      {/* Back to Home Navigation Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-5 left-5 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-md text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 hover:bg-white hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Account Exists 409 Modal Popup */}
      {showAccountExistsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Account Already Exists</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This email is already registered with PathPilot. Please sign in to access your placement dashboard.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Go to Login →
              </button>
              <button
                onClick={() => setShowAccountExistsModal(false)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Use a different email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Translucent Signup Card (No Backdrop Blur) */}
      <div className="relative z-10 w-full max-w-md lg:ml-12 xl:ml-20 my-auto">
        <div className="bg-white/85 border border-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-[32px] p-6 sm:p-9 transition-all">
          
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
              Create <span className="text-indigo-600">Your</span> Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 leading-relaxed">
              Start your personalized learning journey towards placement success.
            </p>

            {selectedSubject && (
              <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold shadow-xs">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Starting with: {selectedSubject.toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Error Alert */}
          {errorMessage && !showAccountExistsModal && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* College Email */}
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 border border-slate-200/80 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all outline-none shadow-xs"
              />
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full pl-11 pr-11 py-3 rounded-2xl bg-white/90 border border-slate-200/80 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all outline-none shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-1 px-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 font-medium cursor-pointer">
                I agree to the <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">Terms of Service</span> and{' '}
                <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">Privacy Policy</span>
              </label>
            </div>

            {/* Create Account Primary Button */}
            <button
              type="submit"
              disabled={isSubmitting || isGoogleSubmitting || !agreed}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </span>
              ) : (
                <>
                  <span>Create Account</span>
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
              OR CONTINUE WITH
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isSubmitting || isGoogleSubmitting}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {isGoogleSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
                <span>Connecting to Google...</span>
              </span>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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

          {/* Login Link */}
          <p className="text-center text-xs text-slate-500 font-medium mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
