const env = require('./env');

module.exports = {
  apiKey: env.GEMINI_API_KEY,
  model: env.GEMINI_MODEL || 'gemini-3.5-flash',
  maxTokens: 2048,
  temperature: 0.2
};

