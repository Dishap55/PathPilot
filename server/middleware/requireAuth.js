const { supabase } = require('../config/supabase');
const { sendError } = require('../utils/response');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authentication token missing or invalid', 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return sendError(res, 'Authentication token missing or invalid', 401);
    }
    req.user = { id: user.id, email: user.email, token };
    return next();
  } catch (e) {
    return sendError(res, 'Authentication token missing or invalid', 401);
  }
}

module.exports = requireAuth;
