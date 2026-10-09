const fs = require('fs');
let content = fs.readFileSync('scripts/seed_disha_mock_data.js', 'utf8');
content = content.replace("const { v4: uuidv4 } = require('uuid');", "const crypto = require('crypto');");
content = content.replace(/uuidv4\(\)/g, "crypto.randomUUID()");
fs.writeFileSync('scripts/seed_disha_mock_data.js', content);
