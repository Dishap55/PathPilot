const env = require('./env');

module.exports = {
  engineUrl: env.SQL_ENGINE_URL,
  statementTimeoutMs: 5000,
  disallowedKeywords: ['DROP', 'TRUNCATE', 'ALTER', 'GRANT', 'REVOKE', 'UPDATE', 'DELETE', 'INSERT']
};
