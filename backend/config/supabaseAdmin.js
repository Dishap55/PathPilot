const { createClient } = require('@supabase/supabase-js');
const env = require('./env');

/**
 * PathPilot Supabase Admin Client
 *
 * Dedicated client for trusted server-side operations using the Supabase Service Role Key.
 *
 * SECURITY INVARIANT:
 * NEVER import this file into frontend client code.
 * NEVER expose SUPABASE_SERVICE_ROLE_KEY to client bundles.
 */

let supabaseAdmin = null;

if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
  supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
} else if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
  // In development before service role key is set, allow auth token verification via standard client
  supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
} else {
  // Provide defensive proxy for local development before secrets are populated
  supabaseAdmin = new Proxy({}, {
    get(target, prop) {
      if (prop === 'auth') {
        return {
          getUser: async () => ({
            data: { user: null },
            error: new Error('Supabase Admin client is unconfigured: SUPABASE_URL is required.')
          })
        };
      }
      return () => {
        throw new Error(
          `[Supabase Admin Client] Operation failed: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured in backend/.env.`
        );
      };
    }
  });
}

/**
 * Returns an authenticated Supabase client for database operations.
 * Uses service role client if configured, or client-scoped user token.
 *
 * @param {string} [userToken] - Optional JWT token from Authorization header
 */
function getSupabaseClient(userToken) {
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    return supabaseAdmin;
  }
  if (env.SUPABASE_URL && userToken) {
    return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    });
  }
  return supabaseAdmin;
}

module.exports = {
  supabaseAdmin,
  getSupabaseClient
};
