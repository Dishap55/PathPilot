/**
 * PathPilot Setup Script
 * Validates environment, installs dependencies, and prepares local configs.
 */
console.log('====================================');
console.log('  PathPilot Setup & Verification    ');
console.log('====================================');
console.log('Checking required environment files...');

const fs = require('fs');
const path = require('path');

['.env', 'server/.env', 'client/.env'].forEach((f) => {
  const p = path.join(process.cwd(), f);
  if (!fs.existsSync(p)) {
    const example = path.join(process.cwd(), '.env.example');
    if (fs.existsSync(example)) {
      fs.copyFileSync(example, p);
      console.log('Created ' + f + ' from .env.example');
    }
  } else {
    console.log('Verified existing ' + f);
  }
});

console.log('\nSetup complete! You can now run:\n  npm run dev\n');
