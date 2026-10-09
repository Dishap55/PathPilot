const sqlExecutionService = require('../services/sqlExecutionService');
const { sendSuccess } = require('../utils/response');

module.exports = {
  executeSql: async (req, res, next) => {
    try {
      const { query, schemaContext } = req.body;
      const result = await sqlExecutionService.executeSql(query, schemaContext);
      return sendSuccess(res, result);
    } catch (e) { next(e); }
  },
  getSchema: async (req, res, next) => {
    try {
      const result = await sqlExecutionService.getQuestionSchema(req.params.questionId);
      return sendSuccess(res, result);
    } catch (e) { next(e); }
  }
};
