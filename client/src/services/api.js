import { supabase } from '../lib/supabaseClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function apiRequest(endpoint, options = {}) {
  let token = localStorage.getItem('pathpilot_token');

  // If token is not explicitly in localStorage, retrieve from active Supabase session
  if (!token) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        token = session.access_token;
      }
    } catch (e) {
      // Continue without session token if unauthenticated
    }
  }

  const authToken = token || 'demo-guest-token';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message || data?.error?.message || 'Network request failed';
    throw new Error(errorMsg);
  }

  return data;
}
