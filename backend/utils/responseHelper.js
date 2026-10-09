/**
 * Standard API Response Helpers
 */
function sendSuccess(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== null ? { data } : {})
  });
}

function sendError(res, message = 'Error', statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = {
  sendSuccess,
  sendError
};
