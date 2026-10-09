const env = require('./env');

module.exports = {
  apiUrl: env.JUDGE0_URL,
  languageIds: {
    javascript: 63,
    python: 71,
    cpp: 54,
    java: 62
  },
  timeoutMs: 10000
};
