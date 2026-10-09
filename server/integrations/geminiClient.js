/**
 * GeminiClient — PathPilot AI Integration
 * Uses @google/generative-ai when GEMINI_API_KEY is set.
 * Falls back to stub responses gracefully in development.
 */

const geminiConfig = require('../config/gemini');

let genAI = null;
let cachedModel = null;

function getModel() {
  if (cachedModel) return cachedModel;
  if (!geminiConfig.apiKey) return null;
  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    genAI = new GoogleGenerativeAI(geminiConfig.apiKey);
    cachedModel = genAI.getGenerativeModel({ model: geminiConfig.model || 'gemini-1.5-flash' });
    return cachedModel;
  } catch (e) {
    console.warn('[GeminiClient] SDK not available:', e.message);
    return null;
  }
}

class GeminiClient {
  async generateGuidance(prompt, context = {}) {
    const model = getModel();
    if (!model) {
      return {
        model: geminiConfig.model,
        output: `PathPilot Mentor guidance for: ${prompt}`,
        confidence: 0.95
      };
    }
    try {
      const contextStr = Object.keys(context).length
        ? `Context: ${JSON.stringify(context)}\n\n`
        : '';
      const result = await model.generateContent(`${contextStr}${prompt}`);
      return {
        model: geminiConfig.model,
        output: result.response.text().trim(),
        confidence: 0.95
      };
    } catch (err) {
      console.error('[GeminiClient] Error:', err.message);
      return {
        model: geminiConfig.model,
        output: `PathPilot Mentor guidance for: ${prompt}`,
        confidence: 0.5
      };
    }
  }
}

module.exports = new GeminiClient();
