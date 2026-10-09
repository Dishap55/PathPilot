const logger = require('../config/logger');
const { sendError } = require('../utils/response');

function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message);
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  return sendError(res, message, statusCode, { code: err.code || undefined, ...(err.details || {}) });
}

module.exports = errorHandler;
