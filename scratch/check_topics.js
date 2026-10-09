import fs from 'fs';

const content = fs.readFileSync('./client/src/data/oops/oopsTopicCardsData.js', 'utf-8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.match(/^\s*'?[a-z-]+'?:?\s*\[/)) {
    console.log(i + 1, l.trim());
  }
});
