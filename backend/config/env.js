const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// 1. Load environment from backend/.env if it exists
const backendEnvPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(backendEnvPath)) {
  dotenv.config({ path: backendEnvPath });
}

// 2. Fallback to root .env
const rootEnvPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

// 3. Fallback to client/.env for shared non-secret public keys (e.g. VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
const clientEnvPath = path.resolve(__dirname, '../../client/.env');
if (fs.existsSync(clientEnvPath)) {
  const clientEnvContent = fs.readFileSync(clientEnvPath, 'utf8');
  clientEnvContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',

  // Supabase Configuration
  SUPABASE_URL: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '',

  // Optional integration placeholders
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  JUDGE0_API_URL: process.env.JUDGE0_API_URL || '',
  JUDGE0_API_KEY: process.env.JUDGE0_API_KEY || '',
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || ''
};

/**
 * Validates that required environment variables are configured.
 * @param {boolean} throwOnError - When true, throws an Error; otherwise logs a configuration warning.
 */
function validateConfig(throwOnError = false) {
  const missing = [];
  if (!env.SUPABASE_URL) missing.push('SUPABASE_URL');
  if (!env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');

  if (missing.length > 0) {
    const errorMsg = `[PathPilot Configuration Error] Missing required backend environment variable(s): ${missing.join(', ')}. Ensure backend/.env is properly configured.`;
    if (env.NODE_ENV === 'production' || throwOnError) {
      throw new Error(errorMsg);
    } else {
      console.warn(`\x1b[33m%s\x1b[0m`, `⚠️ ${errorMsg}`);
    }
  }
}

// Run initial non-crashing check in development
validateConfig(false);

module.exports = {
  ...env,
  validateConfig
};
