const env = require('../config/env');

/**
 * PathPilot Centralized Error Handling Middleware
 *
 * Catches application-wide errors and formats them into uniform, consistent JSON responses.
 * Protects against disclosure of database connection strings, tokens, secrets, or internal stack traces.
 */
function errorMiddleware(err, req, res, next) {
  let statusCode = err.status || err.statusCode || 500;
  let message = err.message || 'An unexpected server error occurred';

  // 1. Validation Errors
  if (err.name === 'ValidationError' || err.isJoi || err.isCelebrate) {
    statusCode = 400;
    message = err.message || 'Validation failed';
  }

  // 2. Authentication Errors
  else if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Unauthorized';
  }

  // 3. Authorization Errors
  else if (statusCode === 403 || err.code === 'FORBIDDEN') {
    statusCode = 403;
    message = 'Forbidden';
  }

  // 4. PostgreSQL / Supabase Database Errors
  else if (err.code && typeof err.code === 'string') {
    if (err.code.startsWith('23')) {
      // 23505 (unique_violation), 23503 (foreign_key_violation), 23514 (check_violation)
      statusCode = 400;
      message = 'Database integrity constraint violation';
    } else if (err.code === 'PGRST116') {
      statusCode = 404;
      message = 'Requested resource not found';
    } else if (err.code === 'PGRST205') {
      statusCode = 500;
      message = 'Database schema object error';
    }
  }

  // Strip credentials and secrets from the error message
  const sanitizedMessage = typeof message === 'string'
    ? message.replace(/(service_role|apikey|token|password|secret|bearer)\s*[:=]\s*[^\s,]+/gi, '$1=***')
    : 'An error occurred';

  const response = {
    success: false,
    message: sanitizedMessage
  };

  // Only include debug info in non-production environments for unexpected 500 errors
  if (env.NODE_ENV !== 'production' && statusCode === 500) {
    response.debug = {
      errorName: err.name,
      details: err.details || undefined
    };
  }

  res.status(statusCode).json(response);
}

module.exports = errorMiddleware;
