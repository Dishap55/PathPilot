import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Input from '../common/Input';
import Button from '../common/Button';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      const redirectTo = `${appUrl}/reset-password`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });

      if (resetError) {
        const msg = resetError.message?.toLowerCase() || '';
        if (resetError.status === 429 || resetError.code === 'over_email_send_rate_limit' || msg.includes('rate limit') || msg.includes('too many')) {
          setError('Too many reset requests. Please wait a few moments before trying again.');
        } else {
          setError(resetError.message || 'Failed to send recovery email.');
        }
      } else {
        setSent(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {sent ? (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-sm rounded-lg border border-emerald-200">
          Check your email for password recovery instructions.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
              {error}
            </div>
          )}
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending...' : 'Send Recovery Email'}
          </Button>
        </form>
      )}
    </div>
  );
}
