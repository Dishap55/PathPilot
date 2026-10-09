const fs = require('fs');
const path = 'C:/Users/disha/.gemini/antigravity-ide/brain/8b0101dd-8a42-422c-b755-fa4da5ee51ec/.system_generated/logs/transcript_full.jsonl';

if (fs.existsSync(path)) {
  const lines = fs.readFileSync(path, 'utf8').split('\n').filter(Boolean);
  for (let i = 613; i < lines.length; i++) {
    const o = JSON.parse(lines[i]);
    if (o.type === 'USER_INPUT') {
      console.log(`[USER ${i}]:`, o.content.slice(0, 150));
    } else if (o.type === 'PLANNER_RESPONSE' && o.content) {
      console.log(`[AGENT ${i}]:`, o.content.slice(0, 250));
    }
  }
}
