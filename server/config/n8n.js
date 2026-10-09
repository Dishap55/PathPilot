const env = require('./env');

module.exports = {
  webhookBaseUrl: env.N8N_WEBHOOK_BASE_URL,
  endpoints: {
    assessmentAnalysis: '/assessment-analysis',
    explanation: '/explanation',
    roadmapAssistance: '/roadmap-assistance',
    wrongAnswerGuidance: '/wrong-answer-guidance',
    contentGeneration: '/content-generation'
  }
};
