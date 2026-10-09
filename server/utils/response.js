/**
 * Standardized PathPilot API Response Envelope
 */
function sendSuccess(res, data = null, meta = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    error: null,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  });
}

function sendError(res, message = 'Internal Server Error', statusCode = 500, details = null) {
  return res.status(statusCode).json({
    success: false,
    data: null,
    error: {
      message,
      statusCode,
      details
    },
    meta: {
      timestamp: new Date().toISOString()
    }
  });
}

module.exports = { sendSuccess, sendError };
