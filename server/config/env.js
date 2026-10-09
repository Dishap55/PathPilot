const path = require('path');
const fs = require('fs');

const serverEnv = path.resolve(__dirname, '../.env');
if (fs.existsSync(serverEnv)) {
  require('dotenv').config({ path: serverEnv });
}
const rootEnv = path.resolve(__dirname, '../../.env');
if (fs.existsSync(rootEnv)) {
  require('dotenv').config({ path: rootEnv });
}
require('dotenv').config();

let geminiApiKey = process.env.GEMINI_API_KEY || '';
if (!geminiApiKey && fs.existsSync(rootEnv)) {
  try {
    const rootParsed = require('dotenv').parse(fs.readFileSync(rootEnv, 'utf8'));
    if (rootParsed.GEMINI_API_KEY) {
      geminiApiKey = rootParsed.GEMINI_API_KEY;
    }
  } catch (e) {}
}

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  GEMINI_API_KEY: geminiApiKey,
  N8N_WEBHOOK_BASE_URL: process.env.N8N_WEBHOOK_BASE_URL || 'http://localhost:5678/webhook',
  JUDGE0_URL: process.env.JUDGE0_URL || 'http://localhost:2358',
  SQL_ENGINE_URL: process.env.SQL_ENGINE_URL || ''
};
