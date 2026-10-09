const { sendError } = require('../utils/response');

const requestCounts = new Map();

function rateLimitAI(req, res, next) {
  const studentId = req.user ? req.user.id : req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const limit = 15;

  const userRecord = requestCounts.get(studentId) || { count: 0, resetAt: now + windowMs };
  if (now > userRecord.resetAt) {
    userRecord.count = 0;
    userRecord.resetAt = now + windowMs;
  }

  userRecord.count++;
  requestCounts.set(studentId, userRecord);

  if (userRecord.count > limit) {
    return sendError(res, 'AI rate limit exceeded. Please wait a moment before requesting further guidance.', 429);
  }
  next();
}

module.exports = rateLimitAI;
