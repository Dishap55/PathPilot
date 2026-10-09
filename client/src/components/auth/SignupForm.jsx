import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { authService } from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';

export default function SignupForm() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', fullName: '', branch: 'CSIT' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const { data, error: signupError } = await authService.signup({
        email: formData.email.trim(),
        password: formData.password,
        fullName: formData.fullName,
        branch: formData.branch,
      });

      if (signupError) {
        console.error('[SignupForm] Error:', signupError);
        const msg = (signupError.message || '').toLowerCase();
        if (signupError.status === 409 || signupError.code === 'user_already_exists' || msg.includes('already registered') || msg.includes('already exists')) {
          setError('This email is already registered. Please sign in.');
        } else if (signupError.status === 429 || msg.includes('rate limit')) {
          setError('Email rate limit exceeded. Please wait a few moments before trying again.');
        } else if (signupError.status === 400 || msg.includes('valid email') || msg.includes('password')) {
          setError(signupError.message || 'Unable to create your account. Please check your email and password.');
        } else {
          setError('Something went wrong on the server. Please try again.');
        }
      } else {
        setSuccess('Account created successfully! Welcome to PathPilot.');
        setTimeout(() => navigate('/profile-setup'), 1000);
      }
    } catch (err) {
      console.error('[SignupForm] Caught error:', err);
      const msg = (err.message || '').toLowerCase();
      if (err.status === 409 || err.code === 'user_already_exists' || msg.includes('already registered') || msg.includes('already exists')) {
        setError('This email is already registered. Please sign in.');
      } else if (err.status === 429 || msg.includes('rate limit')) {
        setError('Email rate limit exceeded. Please wait a few moments before trying again.');
      } else if (err.status === 400 || msg.includes('valid email') || msg.includes('password')) {
        setError(err.message || 'Unable to create your account. Please check your email and password.');
      } else {
        setError('Something went wrong on the server. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200">
          {success}
        </div>
      )}
      <Input label="Full Name" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} required />
      <Input label="College Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
      <Input label="Password" type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
      <Input label="Confirm Password" type="password" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} required />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}
