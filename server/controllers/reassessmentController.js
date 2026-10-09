const { sendError } = require('../utils/response');

module.exports = {
  legacyEndpointRetired: (req, res) => {
    return sendError(res, 'Synthetic reassessment endpoints are retired. Use the authenticated assessment session flow.', 410);
  }
};
