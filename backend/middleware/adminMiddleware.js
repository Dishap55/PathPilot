const { supabaseAdmin } = require('../config/supabaseAdmin');

/**
 * PathPilot Admin Authorization Middleware
 *
 * Verifies that the authenticated user possesses active administrative privileges.
 * Relies exclusively on the approved schema infrastructure:
 * - Supabase RPC: public.is_admin(lookup_user_id)
 * - Table verification: public.admin_users (is_active = true, role = 'admin')
 *
 * Rejects unauthorized or non-admin requests with HTTP 403 Forbidden.
 */
async function adminMiddleware(req, res, next) {
  // Ensure prerequisite authentication middleware has run
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Authentication required before admin verification.'
    });
  }

  try {
    const userId = req.user.id;

    // 1. Primary verification: Call the security definer function public.is_admin(lookup_user_id)
    const { data: isAdmin, error: rpcError } = await supabaseAdmin.rpc('is_admin', {
      lookup_user_id: userId
    });

    if (!rpcError && isAdmin === true) {
      req.isAdmin = true;
      return next();
    }

    // 2. Fallback verification: Check public.admin_users table directly via service role
    const { data: adminRecord, error: queryError } = await supabaseAdmin
      .from('admin_users')
      .select('id, role, is_active')
      .eq('user_id', userId)
      .eq('is_active', true)
      .eq('role', 'admin')
      .maybeSingle();

    if (!queryError && adminRecord) {
      req.isAdmin = true;
      return next();
    }

    // Not an authorized admin
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Administrative privileges required.'
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Admin privilege verification failed.'
    });
  }
}

module.exports = adminMiddleware;
