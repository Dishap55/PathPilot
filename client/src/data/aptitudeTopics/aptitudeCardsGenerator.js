/**
 * DYNAMIC 10-CARD APTITUDE GENERATOR & TOPIC TEMPLATE ENGINE
 * Generates beginner-friendly 10-card educational data for any Aptitude topic.
 * Uses simple English, real mathematical formulas, clear steps, and zero generic jargon.
 */

// Topic-specific knowledge presets for high-frequency topics
const TOPIC_PRESETS = {
  'time-and-work': {
    fullForms: [
      { abbr: 'W', full: 'Work', desc: 'The complete task to finish (usually treated as 1 complete unit or LCM units).' },
      { abbr: 'Eff.', full: 'Efficiency', desc: 'Amount of work completed in 1 day or 1 hour.' },
      { abbr: 'T', full: 'Time', desc: 'Number of days or hours needed to complete the task.' }
    ],
    card1Terms: [
      { term: '1 Day Work', meaning: 'If a person finishes in n days, 1 day work is 1/n.' },
      { term: 'Efficiency', meaning: 'How fast someone works (more efficiency = fewer days).' },
      { term: 'Combined Work', meaning: 'Add individual daily work when people work together.' }
    ],
    realLife: {
      title: 'Painting a Wall Example',
      buy: 'Amit paints a room in 10 days (1/10 room per day).',
      sell: 'Bikram paints it in 15 days (1/15 room per day).',
      result: 'Together: 1/10 + 1/15 = 1/6 per day → Finished in 6 days!'
    },
    whyLearn: [
      'Appears in almost every placement test (TCS, Wipro, Accenture).',
      'The LCM method saves 70% calculation time.',
      'Helps you solve pipe, cistern, and wage sharing problems.'
    ],
    formulas: [
      { name: '1 Day Work', formula: 'Work done in 1 day = 1 / Total Days (n)', when: 'Basic unit rule' },
      { name: 'Two Workers Together', formula: 'Time = (x × y) / (x + y) days', when: 'A takes x days, B takes y days' },
      { name: 'Work Equation', formula: 'Total Work = Time × Efficiency', when: 'Core work rule' },
      { name: 'Three Workers Together', formula: '1/Total = 1/x + 1/y + 1/z', when: 'A, B, C working together' }
    ],
    whatGiven: [
      { given: 'Individual days (x and y)', action: 'Use (x × y) / (x + y) to find combined days immediately.' },
      { given: 'A+B together and A alone', action: 'Subtract: 1/B = 1/(Together) − 1/A.' },
      { given: 'Ratio of efficiency (2 : 1)', action: 'Time taken is in inverse ratio (1 : 2).' }
    ],
    clues: [
      { word: '"Together / Jointly"', meaning: 'Add their 1-day work (1/A + 1/B)' },
      { word: '"Leaves after / joined later"', meaning: 'Calculate work done before leaving, then finish remaining' },
      { word: '"Twice as good as"', meaning: 'Efficiency ratio is 2 : 1 (takes half the time)' },
      { word: '"Alternately"', meaning: 'Group into 2-day cycles before dividing' }
    ],
    quickTricks: [
      { pct: 'LCM Method', action: 'Assume Total Work = LCM of days', ex: 'LCM(10, 15) = 30 units of work' },
      { pct: 'Two workers', action: '(x × y) / (x + y)', ex: '10 & 15 → 150/25 = 6 days' }
    ],
    solvedProblem: {
      question: 'A can do a piece of work in 10 days and B in 15 days. How many days will they take working together?',
      steps: [
        { num: 'STEP 1', title: 'Find 1-Day Work', formula: 'A = 1/10, B = 1/15', calc: 'Work per day for each person' },
        { num: 'STEP 2', title: 'Add Together', formula: '1/10 + 1/15 = (3 + 2)/30', calc: 'Combined work = 5/30 = 1/6 per day' },
        { num: 'STEP 3', title: 'Invert for Total Days', formula: 'Total Days = 1 / (1/6)', calc: '6 days' }
      ],
      finalAnswer: 'Together they take 6 days',
      normal: '1/10 + 1/15 = 5/30 = 1/6 → 6 days',
      fast: 'Formula: (10 × 15) / (10 + 15) = 150 / 25 = 6 days!'
    },
    remember: 'Never add days directly (10 + 15 ≠ 25). Always add rates or work units!'
  },
  'simple-interest': {
    fullForms: [
      { abbr: 'P', full: 'Principal', desc: 'Initial sum of money borrowed or invested.' },
      { abbr: 'R', full: 'Rate of Interest', desc: 'Percentage charged per year (% per annum).' },
      { abbr: 'T', full: 'Time Period', desc: 'Number of years the money is kept.' },
      { abbr: 'SI', full: 'Simple Interest', desc: 'Fixed interest earned purely on the principal amount.' },
      { abbr: 'A', full: 'Total Amount', desc: 'Principal + Simple Interest.' }
    ],
    card1Terms: [
      { term: 'Principal (P)', meaning: 'The original money lent or borrowed.' },
      { term: 'Rate (R)', meaning: 'Interest charged per year as a percentage.' },
      { term: 'Time (T)', meaning: 'Duration in years (convert months by dividing by 12).' },
      { term: 'Amount (A)', meaning: 'Total money returned: Principal + Interest.' }
    ],
    realLife: {
      title: 'Bank Loan Example',
      buy: 'Borrow ₹10,000 at 10% per year for 2 years.',
      sell: 'Interest = (10,000 × 10 × 2) / 100 = ₹2,000.',
      result: 'Total Amount to repay = ₹10,000 + ₹2,000 = ₹12,000.'
    },
    whyLearn: [
      'Simple Interest is the foundation for all banking and commercial math.',
      'High-yield topic in placement exams with zero complex algebra.',
      'Helps you quickly calculate annual returns and borrowing costs.'
    ],
    formulas: [
      { name: 'Simple Interest', formula: 'SI = (P × R × T) / 100', when: 'Core interest formula' },
      { name: 'Total Amount', formula: 'A = P + SI = P × (1 + RT/100)', when: 'Principal plus interest' },
      { name: 'Find Principal', formula: 'P = (SI × 100) / (R × T)', when: 'Given interest, rate, and time' },
      { name: 'Find Rate', formula: 'R = (SI × 100) / (P × T)', when: 'Given interest, principal, and time' }
    ],
    whatGiven: [
      { given: 'P, R, and T', action: 'Multiply P × R × T and divide by 100 to get SI.' },
      { given: 'Time in months', action: 'Divide months by 12 to convert into years first.' },
      { given: 'Money doubles in n years', action: 'Interest = P, so R = 100 / n %.' }
    ],
    clues: [
      { word: '"Sum becomes double"', meaning: 'Interest earned equals the Principal (SI = P)' },
      { word: '"Per annum"', meaning: 'Annual rate (make sure Time is in years)' },
      { word: '"Amount to"', meaning: 'This is Principal + Interest (A = P + SI)' }
    ],
    quickTricks: [
      { pct: 'Money doubles', action: 'R × T = 100', ex: 'Doubles in 5 yrs → Rate = 100/5 = 20%' },
      { pct: 'Money triples', action: 'R × T = 200', ex: 'Triples in 10 yrs → Rate = 200/10 = 20%' }
    ],
    solvedProblem: {
      question: 'Find the simple interest on ₹8,000 at 5% per annum for 3 years.',
      steps: [
        { num: 'STEP 1', title: 'Identify Given Values', formula: 'P = 8000, R = 5%, T = 3 years', calc: 'All in standard annual units' },
        { num: 'STEP 2', title: 'Apply SI Formula', formula: 'SI = (P × R × T) / 100', calc: '(8000 × 5 × 3) / 100' },
        { num: 'STEP 3', title: 'Calculate', formula: '80 × 5 × 3', calc: '400 × 3 = ₹1,200' }
      ],
      finalAnswer: 'Simple Interest = ₹1,200',
      normal: '(8000 × 5 × 3) / 100 = ₹1,200',
      fast: '5% of 8,000 = 400 per year. For 3 years = 400 × 3 = ₹1,200!'
    },
    remember: 'In Simple Interest, the interest earned each year is ALWAYS the same.'
  },
  'speed-time-distance': {
    fullForms: [
      { abbr: 'S', full: 'Speed', desc: 'Distance covered per unit of time (km/h or m/s).' },
      { abbr: 'T', full: 'Time', desc: 'Duration taken to cover the distance.' },
      { abbr: 'D', full: 'Distance', desc: 'Total path length covered.' },
      { abbr: 'Avg S', full: 'Average Speed', desc: 'Total Distance divided by Total Time.' }
    ],
    card1Terms: [
      { term: 'Speed', meaning: 'How fast you are traveling (Speed = Distance / Time).' },
      { term: 'Relative Speed', meaning: 'Speed of one moving body compared to another.' },
      { term: 'Unit Conversion', meaning: 'km/h to m/s: multiply by 5/18. m/s to km/h: multiply by 18/5.' }
    ],
    realLife: {
      title: 'Train Journey Example',
      buy: 'A train travels 120 km in 2 hours.',
      sell: 'Speed = 120 / 2 = 60 km/h.',
      result: 'In m/s: 60 × (5/18) = 16.67 m/s.'
    },
    whyLearn: [
      'Trains, boats, and race questions are tested in every placement exam.',
      'Unit conversion tricks allow you to solve train problems in 15 seconds.',
      'Builds rapid intuition for relative movement.'
    ],
    formulas: [
      { name: 'Speed Formula', formula: 'Speed = Distance / Time', when: 'Core definition' },
      { name: 'Distance Formula', formula: 'Distance = Speed × Time', when: 'Find total path length' },
      { name: 'km/h to m/s', formula: '1 km/h = 5/18 m/s', when: 'Convert larger unit to smaller unit' },
      { name: 'Average Speed (equal distance)', formula: 'Avg Speed = (2 × u × v) / (u + v)', when: 'Round trip at speeds u and v' }
    ],
    whatGiven: [
      { given: 'Distance and Time', action: 'Divide Distance by Time to get Speed.' },
      { given: 'Speed in km/h and Time in seconds', action: 'Multiply speed by 5/18 first to match meters and seconds.' },
      { given: 'Two bodies in opposite directions', action: 'Add their speeds (Relative Speed = S1 + S2).' }
    ],
    clues: [
      { word: '"Opposite directions"', meaning: 'Add speeds (S1 + S2) because distance closes faster' },
      { word: '"Same direction"', meaning: 'Subtract speeds (|S1 − S2|) because gap narrows slowly' },
      { word: '"Crosses a pole / man"', meaning: 'Distance covered = Length of the train only' },
      { word: '"Crosses a platform / bridge"', meaning: 'Distance = Length of train + Length of platform' }
    ],
    quickTricks: [
      { pct: 'km/h → m/s', action: 'Multiply by 5/18', ex: '72 km/h = 72 × 5/18 = 20 m/s' },
      { pct: 'm/s → km/h', action: 'Multiply by 18/5', ex: '25 m/s = 25 × 18/5 = 90 km/h' }
    ],
    solvedProblem: {
      question: 'A train 150m long travels at 54 km/h. How many seconds will it take to cross a telephone pole?',
      steps: [
        { num: 'STEP 1', title: 'Convert Speed to m/s', formula: 'Speed = 54 × (5/18)', calc: '3 × 5 = 15 m/s' },
        { num: 'STEP 2', title: 'Identify Distance', formula: 'Distance = Train length = 150 m', calc: 'Pole has zero width' },
        { num: 'STEP 3', title: 'Calculate Time', formula: 'Time = Distance / Speed', calc: '150 / 15 = 10 seconds' }
      ],
      finalAnswer: 'Time = 10 seconds',
      normal: '54 × 5/18 = 15 m/s. Time = 150 / 15 = 10s',
      fast: '54 km/h is 3 × 18 → 3 × 5 = 15 m/s. 150 / 15 = 10 seconds!'
    },
    remember: 'Always check your units! If distance is in meters, speed MUST be in m/s.'
  }
};

/**
 * Returns clean beginner-friendly 10-card data for any aptitude topic.
 */
export function generateAptitude10Cards(topic) {
  const name = topic.topicName || topic.name || 'Aptitude Topic';
  const category = topic.category || 'Quantitative Aptitude';
  const desc = topic.description || 'Master core concepts and quick tricks for placement exams.';
  const topicId = topic.topicId || topic.id || 'topic';

  // Check if topic matches one of our rich preset topic definitions
  const preset = TOPIC_PRESETS[topicId];

  if (preset) {
    return {
      topicId: topicId,
      topicName: name,
      category: category,
      subtitle: `${desc} Learn the basic idea, essential formulas, solved steps, and fast shortcuts.`,
      fullForms: preset.fullForms,
      cards: [
        // 01 - What is [Topic]?
        {
          id: `what-is-${topicId}`,
          cardNumber: 1,
          badge: '01 · BASIC IDEA',
          title: `What is ${name}?`,
          introText: `${name} is an important part of ${category}. It helps you solve placement test questions quickly by understanding simple relationships.`,
          importantTerms: preset.card1Terms,
          realLifeExample: preset.realLife,
          whyLearnIt: preset.whyLearn,
          remember: preset.remember
        },
        // 02 - Important Formulas
        {
          id: 'important-formulas',
          cardNumber: 2,
          badge: '02 · FORMULAS',
          title: 'Important Formulas',
          introText: 'The essential formulas you need. Every formula is in its own clear box.',
          formulaBoxes: preset.formulas,
          whatIsGiven: preset.whatGiven,
          remember: preset.remember
        },
        // 03 - Recognition & Quick Tricks
        {
          id: 'question-recognition-tricks',
          cardNumber: 3,
          badge: '03 · RECOGNITION',
          title: 'Question Recognition & Quick Tricks',
          introText: 'Spot the question type instantly using keyword clues and calculation shortcuts.',
          clues: preset.clues,
          quickTricks: preset.quickTricks,
          remember: 'Recognizing keywords saves 50% of reading time in exams.'
        },
        // 04 - Step-by-Step Solved Example
        {
          id: 'solved-example',
          cardNumber: 4,
          badge: '04 · EXAMPLE',
          title: 'Step-by-Step Solved Example',
          introText: 'Follow this clean 3-step sequence. Every step is clearly separated.',
          question: preset.solvedProblem.question,
          steps: preset.solvedProblem.steps,
          finalAnswer: preset.solvedProblem.finalAnswer,
          comparison: {
            normal: preset.solvedProblem.normal,
            fast: preset.solvedProblem.fast
          },
          remember: preset.remember
        },
        // 05 - Different Question Forms
        {
          id: 'different-question-forms',
          cardNumber: 5,
          badge: '05 · QUESTION FORMS',
          title: 'Different Question Forms',
          introText: `Here is how examiners ask ${name} in placement tests:`,
          formsList: [
            { num: '1', title: 'Direct Question', tip: 'All primary numbers are given. Apply the main formula directly.' },
            { num: '2', title: 'Reverse Question', tip: 'Final result is given, find one of the starting values.' },
            { num: '3', title: 'Combined Scenario', tip: 'Two or more entities working or moving together.' },
            { num: '4', title: 'Ratio Form', tip: 'Values given as ratios instead of absolute numbers.' },
            { num: '5', title: 'Condition Change', tip: 'One parameter increases or decreases by a fixed amount.' }
          ],
          remember: 'Different wording, same basic concepts.'
        },
        // 06 - Tricks & Short Methods
        {
          id: 'tricks-and-short-methods',
          cardNumber: 6,
          badge: '06 · SHORTCUTS',
          title: 'Tricks & Short Methods',
          introText: 'The top shortcut methods to find answers in 15–20 seconds.',
          mainTrick: {
            name: `${name} Speed Technique`,
            idea: 'Use clean mental steps instead of writing lengthy algebraic equations.',
            breakdown: [
              'Identify the target variable first.',
              'Use round numbers or ratios for quick mental cancellation.',
              'Check units before finalizing the calculation.'
            ],
            example: 'Apply formula shortcuts directly to avoid intermediate multiplication.'
          },
          remember: 'Speed comes from doing fewer steps on paper.'
        },
        // 07 - Exam-Style Variations
        {
          id: 'exam-style-variations',
          cardNumber: 7,
          badge: '07 · EXAM PATTERNS',
          title: 'Exam-Style Question Variations',
          introText: '"The wording changes, but the concept is the same." Look at these 3 variations:',
          variations: [
            { type: 'Direct Type', question: 'Values given directly in clean numbers.', solution: 'One-step calculation using the primary formula.' },
            { type: 'Reverse Type', question: 'Final answer given, asking for starting value.', solution: 'Rearrange formula to solve for the missing input.' },
            { type: 'Word Puzzle Type', question: 'Story question with extra details.', solution: 'Filter for numbers and target variable only.' }
          ],
          remember: 'Skip the storyline and write down the numbers with their units.'
        },
        // 08 - Common Mistakes & Traps
        {
          id: 'common-mistakes-traps',
          cardNumber: 8,
          badge: '08 · TRAPS TO AVOID',
          title: 'Common Mistakes & Traps',
          introText: 'Avoid these classic traps that cause negative marks in placement tests:',
          mistakes: [
            {
              trap: 'Unit Mismatch Trap',
              wrong: '❌ Mixing hours with minutes or meters with kilometers.',
              correct: '✓ Always convert all terms to the same unit before calculating.'
            },
            {
              trap: 'Wrong Base Trap',
              wrong: '❌ Calculating percentage or rate using the final value.',
              correct: '✓ The base is always the initial starting value.'
            },
            {
              trap: 'Rushing Past the Question',
              wrong: '❌ Solving for x when the question asked for 2x or the difference.',
              correct: '✓ Re-read the final line before choosing your answer option.'
            }
          ],
          remember: 'Always re-read the last sentence to know what is actually asked.'
        },
        // 09 - Speed & Accuracy Strategy
        {
          id: 'speed-accuracy-strategy',
          cardNumber: 9,
          badge: '09 · SPEED STRATEGY',
          title: 'Speed & Accuracy Strategy',
          introText: 'Follow this simple 6-step flow during the timed exam:',
          steps: [
            { step: '1', title: 'Read', tip: 'Read the question carefully in 5 seconds.' },
            { step: '2', title: 'Recognize', tip: 'Identify what is given and what to find.' },
            { step: '3', title: 'Formula', tip: 'Pick the right formula box.' },
            { step: '4', title: 'Shortcut', tip: 'Use ratio or fraction shortcut if possible.' },
            { step: '5', title: 'Calculate', tip: 'Do the arithmetic cleanly.' },
            { step: '6', title: 'Check', tip: 'Does the answer magnitude make sense?' }
          ],
          proTip: 'If stuck for more than 40 seconds, eliminate extreme options and move to the next question.',
          remember: 'Accuracy first, then speed.'
        },
        // 10 - Quick Revision / Cheat Sheet
        {
          id: 'quick-revision-cheatsheet',
          cardNumber: 10,
          badge: '10 · CHEAT SHEET',
          title: 'Quick Revision / Cheat Sheet',
          introText: 'Revise this complete cheat sheet in under 1 minute before your exam.',
          cheatSheet: {
            terms: preset.fullForms.map(f => `${f.abbr} = ${f.full}`),
            formulas: preset.formulas.map(f => f.formula),
            shortcuts: preset.quickTricks.map(t => `${t.pct} → ${t.action}`),
            quickRules: [
              'Convert units first.',
              'Use fractions instead of percentages for faster mental math.',
              'Re-read the question objective before ticking the option.'
            ]
          },
          remember: preset.remember
        }
      ]
    };
  }

  // Clean, beginner-friendly general template for any other aptitude topic
  return {
    topicId: topicId,
    topicName: name,
    category: category,
    subtitle: `${desc} Learn basic concepts, key formulas, solved steps, and fast exam shortcuts.`,

    fullForms: [
      { abbr: 'Basics', full: 'Basic Idea', desc: `The core rule governing ${name}.` },
      { abbr: 'Given', full: 'Known Quantities', desc: 'The input numbers provided in the question.' },
      { abbr: 'Find', full: 'Target Quantity', desc: 'The final value you need to calculate.' }
    ],

    cards: [
      /* 01 — What is [Topic]? */
      {
        id: `what-is-${topicId}`,
        cardNumber: 1,
        badge: '01 · BASIC IDEA',
        title: `What is ${name}?`,
        introText: `${name} is an important topic in ${category}. It helps you solve questions quickly by understanding simple patterns and relationships.`,
        importantTerms: [
          { term: 'Basic Idea', meaning: `The core concept behind how ${name} problems work.` },
          { term: 'Given Values', meaning: 'The numbers and conditions given in the problem.' },
          { term: 'Target Answer', meaning: 'What the question is asking you to find.' },
          { term: 'Units', meaning: 'Standard measurements (time, money, count, or ratio).' }
        ],
        realLifeExample: {
          title: `Everyday Use of ${name}`,
          buy: 'Given: Identify what numbers you already know.',
          sell: 'Apply: Choose the simplest formula or shortcut.',
          result: 'Answer: Calculate the result quickly without long algebra.'
        },
        whyLearnIt: [
          'Tested in campus placement tests (TCS, Infosys, Wipro, Cognizant).',
          'Helps you solve questions in under 45 seconds.',
          'Builds logical reasoning and fast calculation skills.'
        ],
        remember: `In ${name}, understanding what is given is 80% of solving the question.`
      },

      /* 02 — Important Formulas */
      {
        id: 'important-formulas',
        cardNumber: 2,
        badge: '02 · FORMULAS',
        title: 'Important Formulas',
        introText: `Key formulas for ${name}. Every formula is in its own clear box.`,
        formulaBoxes: [
          { name: 'Basic Formula', formula: 'Target = (Given Value × Factor) ÷ Base', when: 'Standard problem' },
          { name: 'Simple Relation', formula: 'Result = Value₁ ± Value₂', when: 'Adding or subtracting parts' },
          { name: 'Quick Rule', formula: 'Target = Given Value × Multiplier', when: 'Scaling quantities' }
        ],
        whatIsGiven: [
          { given: 'Two known values', action: 'Use the primary formula to find the missing third value.' },
          { given: 'Ratios or fractions', action: 'Convert to simple unit parts before calculating.' },
          { given: 'Total and parts', action: 'Divide total by number of parts to get 1 unit value.' }
        ],
        remember: 'Always write down the formula before plugging in numbers.'
      },

      /* 03 — Question Recognition & Quick Tricks */
      {
        id: 'question-recognition-tricks',
        cardNumber: 3,
        badge: '03 · RECOGNITION',
        title: 'Question Recognition & Quick Tricks',
        introText: 'Recognize problem patterns instantly from keyword triggers.',
        clues: [
          { word: '"Together / Combined"', meaning: 'Add the individual values or rates' },
          { word: '"Difference / More than"', meaning: 'Subtract smaller number from larger number' },
          { word: '"In opposite ratio"', meaning: 'When one increases, the other decreases' },
          { word: '"Remaining part"', meaning: 'Subtract the used part from the total' }
        ],
        quickTricks: [
          { pct: '10%', action: 'Divide by 10 (shift decimal left by 1)', ex: '10% of 420 = 42' },
          { pct: '25%', action: 'Divide by 4', ex: '25% of 600 = 150' },
          { pct: '50%', action: 'Divide by 2 (half)', ex: '50% of 340 = 170' }
        ],
        remember: 'Keywords tell you which mathematical operation (+, −, ×, ÷) to perform.'
      },

      /* 04 — Step-by-Step Solved Example */
      {
        id: 'solved-example',
        cardNumber: 4,
        badge: '04 · EXAMPLE',
        title: 'Step-by-Step Solved Example',
        introText: 'Follow this clean 3-step sequence. Every step is clearly separated.',
        question: `Calculate the final value when a base quantity of 120 units increases by 25%.`,
        steps: [
          {
            num: 'STEP 1',
            title: 'Identify Given Values',
            formula: 'Base = 120 units, Increase = 25%',
            calc: 'Given parameters are clear and in identical units'
          },
          {
            num: 'STEP 2',
            title: 'Find the Increase Amount',
            formula: 'Increase = 25% of 120 = 120 ÷ 4',
            calc: '120 ÷ 4 = 30 units'
          },
          {
            num: 'STEP 3',
            title: 'Add to Original Base',
            formula: 'Final Value = 120 + 30',
            calc: 'Final Value = 150 units'
          }
        ],
        finalAnswer: 'Final Result = 150 units',
        comparison: {
          normal: '120 + (25 / 100 × 120) = 120 + 30 = 150 units',
          fast: '25% is 1/4 → 120 ÷ 4 = 30 → 120 + 30 = 150 (solved in 4 seconds!)'
        },
        remember: 'Breaking questions into 3 small steps prevents silly mistakes.'
      },

      /* 05 — Different Question Forms */
      {
        id: 'different-question-forms',
        cardNumber: 5,
        badge: '05 · QUESTION FORMS',
        title: 'Different Question Forms',
        introText: `The 5 most common question formats for ${name} in exams:`,
        formsList: [
          { num: '1', title: 'Direct Calculation', tip: 'All primary variables given. Apply the main formula directly.' },
          { num: '2', title: 'Reverse Engineering', tip: 'Final result is given, find the original starting value.' },
          { num: '3', title: 'Comparative Ratio', tip: 'Compare two different entities or conditions.' },
          { num: '4', title: 'Missing Parameter', tip: 'One intermediate value is unknown and must be isolated.' },
          { num: '5', title: 'Condition Change', tip: 'One parameter changes, calculate the new result.' }
        ],
        remember: 'The numbers change, but the core formula remains identical.'
      },

      /* 06 — Tricks & Short Methods */
      {
        id: 'tricks-and-short-methods',
        cardNumber: 6,
        badge: '06 · SHORTCUTS',
        title: 'Tricks & Short Methods',
        introText: 'Shortcut techniques to save time and avoid long equations.',
        mainTrick: {
          name: 'The Unit Fraction Shortcut',
          idea: 'Use clean fractions instead of big percentages or multi-digit decimals.',
          breakdown: [
            '25% = 1/4 (just divide by 4)',
            '20% = 1/5 (just divide by 5)',
            '50% = 1/2 (just divide by 2)'
          ],
          example: '120 + (120 ÷ 4) = 150. Instant mental calculation!'
        },
        remember: 'Fractions are much easier to calculate in your head than percentages.'
      },

      /* 07 — Exam-Style Variations */
      {
        id: 'exam-style-variations',
        cardNumber: 7,
        badge: '07 · EXAM PATTERNS',
        title: 'Exam-Style Question Variations',
        introText: '"The wording changes, but the concept is the same." Look at these 3 variations:',
        variations: [
          { type: 'Direct Type', question: 'Base = 100, Rate = 20%. Find final value.', solution: '100 + 20 = 120.' },
          { type: 'Reverse Type', question: 'Final value = 120 after 20% increase. Find original base.', solution: '120 ÷ 1.20 = 100.' },
          { type: 'Story Type', question: 'Word puzzle with background context.', solution: 'Filter for numbers and target variable only.' }
        ],
        remember: 'Examiners change the story, but the math is always the same.'
      },

      /* 08 — Common Mistakes & Traps */
      {
        id: 'common-mistakes-traps',
        cardNumber: 8,
        badge: '08 · TRAPS TO AVOID',
        title: 'Common Mistakes & Traps',
        introText: 'Avoid these classic conceptual traps that cost negative marks:',
        mistakes: [
          {
            trap: 'Wrong Base Value',
            wrong: '❌ Calculating change using the final value as the base.',
            correct: '✓ The base is ALWAYS the original starting value.'
          },
          {
            trap: 'Unit Mismatch',
            wrong: '❌ Adding quantities with different units (e.g. minutes + hours).',
            correct: '✓ Always convert everything to the same unit first.'
          },
          {
            trap: 'Rushing Past the Question',
            wrong: '❌ Picking an intermediate answer before finding what was asked.',
            correct: '✓ Always re-read the last line of the question.'
          }
        ],
        remember: 'The starting value is always your reference base.'
      },

      /* 09 — Speed & Accuracy Strategy */
      {
        id: 'speed-accuracy-strategy',
        cardNumber: 9,
        badge: '09 · SPEED STRATEGY',
        title: 'Speed & Accuracy Strategy',
        introText: 'Follow this simple 6-step flow during the timed exam:',
        steps: [
          { step: '1', title: 'Read', tip: 'Read the question in 5 seconds.' },
          { step: '2', title: 'Recognize', tip: 'Spot the topic and given numbers.' },
          { step: '3', title: 'Choose Formula', tip: 'Select the formula box.' },
          { step: '4', title: 'Shortcut', tip: 'Use fraction or ratio trick.' },
          { step: '5', title: 'Calculate', tip: 'Do the arithmetic cleanly.' },
          { step: '6', title: 'Check', tip: 'Verify if the answer makes sense.' }
        ],
        proTip: '💡 See 25%? Think 1/4. See 50%? Think 1/2.',
        remember: 'Accuracy first, then speed.'
      },

      /* 10 — Quick Revision / Cheat Sheet */
      {
        id: 'quick-revision-cheatsheet',
        cardNumber: 10,
        badge: '10 · CHEAT SHEET',
        title: 'Quick Revision / Cheat Sheet',
        introText: 'Revise this complete cheat sheet in under 1 minute before your exam.',
        cheatSheet: {
          terms: [
            'Given = Known numbers in problem',
            'Base = Original reference value',
            'Target = What you need to find'
          ],
          formulas: [
            'Result = Base × Multiplying Factor',
            'Change = Final Value − Starting Value',
            'Part Value = Total / Number of Parts'
          ],
          shortcuts: [
            '10% → Divide by 10',
            '20% → Divide by 5',
            '25% → Divide by 4',
            '50% → Divide by 2'
          ],
          quickRules: [
            'Convert all units to standard base units first.',
            'The original value is always the reference denominator.',
            'Read the last line to know what variable to solve for.'
          ]
        },
        remember: `Mastery in ${name} is about simple patterns and clean arithmetic.`
      }
    ]
  };
}
