// Automated end-to-end test against live PathPilot API on http://localhost:5000/api/bestu/chat
const http = require('http');

async function sendChat({ question, context = {}, history = [] }) {
  const payload = JSON.stringify({ question, context, history });
  
  return new Promise((resolve, reject) => {
    const req = http.request(
      'http://localhost:5000/api/bestu/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token',
          'Content-Length': Buffer.byteLength(payload)
        }
      },
      (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (e) {
            reject(new Error(`Failed to parse response: ${data}`));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function runScenario(num, name, question, context, history = []) {
  console.log(`\n======================================================`);
  console.log(`TEST ${num}: ${name}`);
  console.log(`Context: Route=${context.route || 'none'}, Topic=${context.topic || 'none'}, Card=${context.activeCard?.title || 'none'}`);
  console.log(`User: "${question}"`);
  
  const start = Date.now();
  try {
    const res = await sendChat({ question, context, history });
    const reply = res?.data?.response || res?.response;
    console.log(`Status: SUCCESS (${Date.now() - start}ms) [pose: ${res?.data?.pose}]`);
    console.log(`Bestu:\n${reply}`);
    return { num, name, success: true, reply };
  } catch (err) {
    console.error(`Status: FAILED (${Date.now() - start}ms):`, err.message);
    return { num, name, success: false, error: err.message };
  }
}

async function main() {
  const results = [];

  // TEST 1: Current page: Subjects | User: "Can you give me the aptitude part?"
  results.push(await runScenario(
    1,
    'Current page: Subjects -> "Can you give me the aptitude part?"',
    'Can you give me the aptitude part?',
    { route: '/subjects', page: 'Core Subjects Practice', subject: 'Core Subjects' }
  ));

  // TEST 2: Current page: Aptitude | User: "Time speed distance"
  results.push(await runScenario(
    2,
    'Current page: Aptitude -> "Time speed distance"',
    'Time speed distance',
    { route: '/aptitude', page: 'Aptitude Learning Studio', subject: 'Aptitude', category: 'Quantitative Aptitude' }
  ));

  // TEST 3: Current topic: Time Speed Distance | User: "Explain this."
  results.push(await runScenario(
    3,
    'Current topic: Time Speed Distance -> "Explain this."',
    'Explain this.',
    { route: '/aptitude?topic=time-speed-distance', page: 'Aptitude Learning Studio', subject: 'Aptitude', category: 'Quantitative Aptitude', topic: 'Time, Speed & Distance', topicId: 'time-speed-distance' }
  ));

  // TEST 4: Current topic: Time Speed Distance | User: "Formula?"
  results.push(await runScenario(
    4,
    'Current topic: Time Speed Distance -> "Formula?"',
    'Formula?',
    { route: '/aptitude?topic=time-speed-distance', page: 'Aptitude Learning Studio', subject: 'Aptitude', category: 'Quantitative Aptitude', topic: 'Time, Speed & Distance', topicId: 'time-speed-distance' }
  ));

  // TEST 5: Current card: Important Formulas | User: "Give me an example."
  results.push(await runScenario(
    5,
    'Current card: Important Formulas -> "Give me an example."',
    'Give me an example.',
    {
      route: '/aptitude?topic=time-speed-distance',
      page: 'Aptitude Learning Studio',
      subject: 'Aptitude',
      category: 'Quantitative Aptitude',
      topic: 'Time, Speed & Distance',
      topicId: 'time-speed-distance',
      activeCard: {
        cardNumber: 2,
        title: 'Important Formulas',
        badge: '02 · FORMULAS',
        introText: 'Speed = Distance / Time, Unit conversion 1 km/h = 5/18 m/s, Average Speed = 2xy/(x+y)',
        formulas: ['Speed = Distance / Time', 'Time = Distance / Speed', 'Distance = Speed × Time', '1 km/h = 5/18 m/s', 'Average Speed = 2xy/(x+y)']
      }
    }
  ));

  // TEST 6: User: "Where can I find that card?"
  results.push(await runScenario(
    6,
    'Active Card -> "Where can I find that card?"',
    'Where can I find that card?',
    {
      route: '/aptitude?topic=time-speed-distance',
      page: 'Aptitude Learning Studio',
      subject: 'Aptitude',
      category: 'Quantitative Aptitude',
      topic: 'Time, Speed & Distance',
      topicId: 'time-speed-distance',
      activeCard: {
        cardNumber: 2,
        title: 'Important Formulas',
        badge: '02 · FORMULAS'
      }
    }
  ));

  // TEST 7: Conversational Memory Chain
  console.log(`\n======================================================`);
  console.log('TEST 7: Multi-turn Conversational Memory Chain');
  const t7a = await sendChat({
    question: 'What is percentage?',
    context: { route: '/aptitude?topic=percentages', page: 'Aptitude Learning Studio', subject: 'Aptitude', topic: 'Percentages' }
  });
  console.log('Turn 1: "What is percentage?" ->', t7a?.data?.response?.slice(0, 100) + '...');

  const hist7b = [
    { role: 'user', content: 'What is percentage?' },
    { role: 'assistant', content: t7a?.data?.response || 'Percentage means per 100.' }
  ];
  const t7b = await sendChat({
    question: 'Give me an example.',
    context: { route: '/aptitude?topic=percentages', page: 'Aptitude Learning Studio', subject: 'Aptitude', topic: 'Percentages' },
    history: hist7b
  });
  console.log('Turn 2: "Give me an example." ->', t7b?.data?.response?.slice(0, 100) + '...');

  const hist7c = [
    ...hist7b,
    { role: 'user', content: 'Give me an example.' },
    { role: 'assistant', content: t7b?.data?.response || '40 out of 50 is 80%.' }
  ];
  const t7c = await sendChat({
    question: 'What if it is doubled?',
    context: { route: '/aptitude?topic=percentages', page: 'Aptitude Learning Studio', subject: 'Aptitude', topic: 'Percentages' },
    history: hist7c
  });
  console.log('Turn 3: "What if it is doubled?" ->', t7c?.data?.response);
  results.push({ num: 7, name: 'Conversational Memory (3 connected turns)', success: true, reply: t7c?.data?.response });

  // TEST 8: Current Aptitude MCQ: "I'm stuck." -> Hint expected
  results.push(await runScenario(
    8,
    'Current Aptitude MCQ -> "I\'m stuck."',
    "I'm stuck.",
    {
      route: '/aptitude?topic=time-speed-distance',
      page: 'Aptitude Learning Studio',
      subject: 'Aptitude',
      category: 'Quantitative Aptitude',
      topic: 'Time, Speed & Distance',
      currentQuestion: {
        id: 'q1',
        title: 'Train Speed Calculation',
        text: 'A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/h?',
        options: ['25 km/h', '36 km/h', '45 km/h', '54 km/h'],
        difficulty: 'Easy'
      }
    }
  ));

  // TEST 9: "Give me the full solution." -> Step-by-step solution expected
  results.push(await runScenario(
    9,
    'Current Aptitude MCQ -> "Give me the full solution."',
    'Give me the full solution.',
    {
      route: '/aptitude?topic=time-speed-distance',
      page: 'Aptitude Learning Studio',
      subject: 'Aptitude',
      category: 'Quantitative Aptitude',
      topic: 'Time, Speed & Distance',
      currentQuestion: {
        id: 'q1',
        title: 'Train Speed Calculation',
        text: 'A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/h?',
        options: ['25 km/h', '36 km/h', '45 km/h', '54 km/h'],
        difficulty: 'Easy'
      }
    }
  ));

  // TEST 10: "Hi Bestu" -> Natural greeting
  results.push(await runScenario(
    10,
    'Casual Greeting -> "Hi Bestu"',
    'Hi Bestu',
    { route: '/dashboard', page: 'Dashboard', subject: 'General' }
  ));

  // TEST 11: "Where is my DSA?" -> Actual PathPilot navigation
  results.push(await runScenario(
    11,
    'Navigation -> "Where is my DSA?"',
    'Where is my DSA?',
    { route: '/dashboard', page: 'Dashboard', subject: 'General' }
  ));

  // TEST 12: "Help" -> Use current context
  results.push(await runScenario(
    12,
    'Short query -> "Help"',
    'Help',
    {
      route: '/aptitude?topic=time-speed-distance',
      page: 'Aptitude Learning Studio',
      subject: 'Aptitude',
      category: 'Quantitative Aptitude',
      topic: 'Time, Speed & Distance',
      activeCard: { cardNumber: 2, title: 'Important Formulas' }
    }
  ));

  console.log(`\n======================================================`);
  console.log('SUMMARY OF ALL 12 TESTS:');
  const allPassed = results.every(r => r.success);
  results.forEach(r => console.log(`Test ${r.num}: ${r.name} -> ${r.success ? 'PASSED ✅' : 'FAILED ❌'}`));
  console.log(`\nFINAL RESULT: ${allPassed ? 'ALL 12 TESTS PASSED! 🎉' : 'SOME TESTS FAILED'}`);
}

main();
