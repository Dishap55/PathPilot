import { supabase } from '../lib/supabaseClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

let cachedToken = null;
let cachedExpiresAt = 0;

// Keep memory token cache synchronized in real-time with zero storage-lock latency
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.access_token) {
    cachedToken = session.access_token;
    cachedExpiresAt = (session.expires_at || 0) * 1000;
  } else if (event === 'SIGNED_OUT') {
    cachedToken = null;
    cachedExpiresAt = 0;
  }
});

export async function apiRequest(endpoint, options = {}) {
  let token = localStorage.getItem('pathpilot_token');

  // 1. Fast in-memory token retrieval (0ms)
  if (!token && cachedToken && (!cachedExpiresAt || Date.now() < cachedExpiresAt - 30000)) {
    token = cachedToken;
  }

  // 2. Fallback to active Supabase session if memory cache is cold or expired
  if (!token) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        token = session.access_token;
        cachedToken = session.access_token;
        cachedExpiresAt = (session.expires_at || 0) * 1000;
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
