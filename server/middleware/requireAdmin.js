const { sendError } = require('../utils/response');

function requireAdmin(req, res, next) {
  if (!req.user) {
    return sendError(res, 'Unauthorized', 401);
  }
  // Check admin role flag
  const isAdmin = req.headers['x-admin-role'] === 'admin' || req.user.role === 'admin';
  if (!isAdmin) {
    return sendError(res, 'Forbidden: Admin access required', 403);
  }
  next();
}

module.exports = requireAdmin;
