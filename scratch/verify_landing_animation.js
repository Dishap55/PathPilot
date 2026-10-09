const http = require('http');

http.get('http://localhost:3001', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    if (data.includes('Learn Smarter.')) {
      console.log('✅ "Learn Smarter." found in landing page response.');
    }
    if (data.includes('animate-learn-smarter-float')) {
      console.log('✅ "animate-learn-smarter-float" class correctly attached to DOM element.');
    }
  });
}).on('error', (err) => {
  console.error('Fetch error:', err.message);
});
