import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Input from '../common/Input';
import Button from '../common/Button';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message || 'Failed to update password.');
      } else {
        setMessage('Password updated successfully!');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200">
          {message}
        </div>
      )}
      {error && (
        <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
          {error}
        </div>
      )}
      <Input
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  );
}
