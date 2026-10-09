const { supabaseAdmin } = require('../config/supabaseAdmin');

/**
 * PathPilot Authentication Middleware
 *
 * Authenticates requests using the Supabase JWT access token sent in the Authorization header.
 * Expected format: Authorization: Bearer <access_token>
 *
 * Attaches verified user information to `req.user` and the token to `req.token`.
 * Rejects missing or invalid tokens with HTTP 401.
 *
 * SECURITY INVARIANT:
 * Never trust a student_id supplied by request params or body.
 * req.user.id is the authoritative, cryptographic source of user identity.
 */
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Missing or malformed Authorization header. Expected "Bearer <token>".'
      });
    }

    const token = authHeader.substring(7).trim();
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Access token is empty.'
      });
    }

    // Dedicated test identity hook strictly active under NODE_ENV === 'test'
    if (process.env.NODE_ENV === 'test' && token.startsWith('test-token:')) {
      const parts = token.split(':');
      req.user = {
        id: parts[1] || '00000000-0000-0000-0000-000000000001',
        email: parts[2] || 'student@pathpilot.edu',
        role: 'authenticated',
        user_metadata: { full_name: 'Test Student' },
        app_metadata: {}
      };
      req.token = token;
      return next();
    }

    // Verify access token against Supabase Auth
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid or expired authentication token.'
      });
    }

    // Attach authenticated identity to request context
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      user_metadata: user.user_metadata || {},
      app_metadata: user.app_metadata || {}
    };
    req.token = token;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Authentication verification failed.'
    });
  }
}

module.exports = authMiddleware;
