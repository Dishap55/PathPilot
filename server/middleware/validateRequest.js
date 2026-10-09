const { sendError } = require('../utils/response');

function validateRequest(schemaValidator) {
  return (req, res, next) => {
    if (typeof schemaValidator === 'function') {
      const { isValid, errors } = schemaValidator(req.body);
      if (!isValid) {
        return sendError(res, 'Validation error', 400, errors);
      }
    }
    next();
  };
}

module.exports = validateRequest;
