/**
 * PERCENTAGES 10-CARD LEARNING CONTENT (BEGINNER FRIENDLY & LIGHTWEIGHT)
 * Follows the friendly teacher philosophy:
 * Less text • Simple English • Clear visual boxes • Practical examples
 */

export const PERCENTAGES_INTRO_DATA = {
  topicId: 'percentages',
  topicName: 'Percentages',
  category: 'Quantitative Aptitude',
  subtitle: 'Learn base values, percentage change, fractions, and mental calculation tricks for placement exams.',

  fullForms: [
    { abbr: '%', full: 'Per Cent', desc: 'Out of 100 (e.g. 20% means 20 out of 100).' },
    { abbr: 'Base', full: 'Starting Value', desc: 'The original number you compare against (always the denominator).' },
    { abbr: 'MF', full: 'Multiplying Factor', desc: 'A quick decimal multiplier like 1.20 for +20%.' },
    { abbr: 'Change %', full: 'Percentage Increase/Decrease', desc: 'How much a quantity went up or down compared to its starting value.' }
  ],

  cards: [
    /* CARD 1 — WHAT IS PERCENTAGES? */
    {
      id: 'what-is-percentages',
      cardNumber: 1,
      badge: '01 · BASIC IDEA',
      title: 'What is Percentages?',
      introText: 'Percentage simply means "out of one hundred". It allows you to compare scores and quantities easily on a common scale of 100.',

      importantTerms: [
        { term: 'Per Cent (%)', meaning: 'Parts out of 100 (e.g. 50% = 50/100 = 1/2).' },
        { term: 'Base Value', meaning: 'The original starting number (what comes after "of" or "than").' },
        { term: 'Percentage Increase', meaning: 'When a quantity grows compared to its original starting value.' },
        { term: 'Percentage Decrease', meaning: 'When a quantity drops compared to its original starting value.' }
      ],

      realLifeExample: {
        title: 'Exam Score Comparison',
        buy: 'Ravi scored 40 out of 50 in Math: (40/50) = 80%.',
        sell: 'Pooja scored 75 out of 100 in Science: (75/100) = 75%.',
        result: 'Ravi had a higher percentage (80% vs 75%)!'
      },

      whyLearnIt: [
        'Used in calculating marks, salary hikes, discounts, and interest.',
        'Core building block for Profit & Loss, Simple Interest, and Data Interpretation.',
        'High frequency topic in TCS, Cognizant, and Infosys exams.'
      ],

      visualType: 'percentage_bar',
      remember: 'The denominator is ALWAYS the original starting value (the base).'
    },

    /* CARD 2 — IMPORTANT FORMULAS */
    {
      id: 'important-formulas',
      cardNumber: 2,
      badge: '02 · FORMULAS',
      title: 'Important Formulas',
      introText: 'The only 4 percentage formulas you need for placement exams.',

      formulaBoxes: [
        { name: 'Basic Percentage', formula: 'Percentage = (Part / Total) × 100', when: 'To find % score or share' },
        { name: 'Find Value of %', formula: 'Value = (% / 100) × Total', when: 'e.g. 20% of ₹500 = ₹100' },
        { name: 'Percentage Increase', formula: '% Increase = (Increase / Original) × 100', when: 'Original is in denominator' },
        { name: 'Percentage Decrease', formula: '% Decrease = (Decrease / Original) × 100', when: 'Original is in denominator' },
        { name: 'Successive % Change', formula: 'Net % = a + b + (a × b) / 100', when: 'Two changes in a row' }
      ],

      whatIsGiven: [
        { given: 'Part and Total', action: 'Divide Part by Total, then multiply by 100.' },
        { given: 'Total and %', action: 'Multiply Total by (% / 100) or use a fraction.' },
        { given: 'Old value & New value', action: 'Find difference, divide by Old value, multiply by 100.' }
      ],

      remember: 'When finding % change, always put the INITIAL starting value in the denominator.'
    },

    /* CARD 3 — QUESTION RECOGNITION & QUICK TRICKS */
    {
      id: 'question-recognition-tricks',
      cardNumber: 3,
      badge: '03 · RECOGNITION',
      title: 'Question Recognition & Quick Tricks',
      introText: 'Memorize these 5 fractions to calculate percentages without paper and pen.',

      clues: [
        { word: '"What is X% of Y?"', meaning: 'Multiply Y by (X/100) or use fraction.' },
        { word: '"X is what % of Y?"', meaning: 'X is the Part, Y is the Total base: (X/Y) × 100.' },
        { word: '"increased by X%"', meaning: 'New value is (100 + X)% of original.' },
        { word: '"decreased by X%"', meaning: 'New value is (100 − X)% of original.' }
      ],

      quickTricks: [
        { pct: '10%', action: 'Divide by 10', ex: '10% of 620 = 62' },
        { pct: '20%', action: 'Divide by 5', ex: '20% of 450 = 90' },
        { pct: '25%', action: 'Divide by 4', ex: '25% of 840 = 210' },
        { pct: '33.3%', action: 'Divide by 3', ex: '33.3% of 900 = 300' },
        { pct: '50%', action: 'Divide by 2', ex: '50% of 780 = 390' }
      ],

      exampleBox: {
        text: 'Quick Check: 20% of ₹650',
        solution: '650 ÷ 5 = ₹130'
      },

      remember: 'Quick Fraction Hack: 25% = 1/4, 20% = 1/5, 50% = 1/2.'
    },

    /* CARD 4 — STEP-BY-STEP SOLVED EXAMPLE */
    {
      id: 'solved-example',
      cardNumber: 4,
      badge: '04 · EXAMPLE',
      title: 'Step-by-Step Solved Example',
      introText: 'Find the percentage salary increase in 3 simple steps.',

      question: 'A student\'s stipend increases from ₹8,000 to ₹10,000. Find the percentage increase.',

      steps: [
        {
          num: 'STEP 1',
          title: 'Find the Increase',
          formula: 'Increase = New − Old',
          calc: '10,000 − 8,000 = ₹2,000'
        },
        {
          num: 'STEP 2',
          title: 'Pick Formula (Divide by Old)',
          formula: '% Increase = (Increase / Original) × 100',
          calc: 'Put in numbers: (2,000 / 8,000) × 100'
        },
        {
          num: 'STEP 3',
          title: 'Calculate',
          formula: '2,000 / 8,000 = 1/4',
          calc: '1/4 × 100 = 25%'
        }
      ],

      finalAnswer: 'Percentage Increase = 25%',

      comparison: {
        normal: '2000 ÷ 8000 × 100 = 25% (standard formula).',
        fast: '2000 out of 8000 is 1/4 → 1/4 is 25% (solved in 2 seconds!).'
      },

      remember: 'Always divide by the original starting number (8,000), not the new number (10,000).'
    },

    /* CARD 5 — DIFFERENT QUESTION FORMS */
    {
      id: 'different-question-forms',
      cardNumber: 5,
      badge: '05 · QUESTION FORMS',
      title: 'Different Question Forms',
      introText: 'The 5 common percentage questions tested in exams:',

      formsList: [
        { num: '1', title: 'Direct Percentage', tip: 'What is 35% of 600? (35 × 6 = 210).' },
        { num: '2', title: 'Percentage Increase/Decrease', tip: 'Price rises from ₹40 to ₹50. (10/40 × 100 = 25%).' },
        { num: '3', title: 'Successive % Changes', tip: 'Price goes up 20% then down 10%. Net % = +8%.' },
        { num: '4', title: 'Pass Marks & Cutoffs', tip: 'A student gets 140 and fails by 20. Passing marks = 160.' },
        { num: '5', title: 'Comparison Questions', tip: 'A is 25% more than B. By what % is B less than A? (20%).' }
      ],

      remember: 'Spot what question form it is, then use its quick rule.'
    },

    /* CARD 6 — TRICKS & SHORT METHODS */
    {
      id: 'tricks-and-short-methods',
      cardNumber: 6,
      badge: '06 · SHORTCUTS',
      title: 'Tricks & Short Methods',
      introText: 'The Symmetry Trick: X% of Y is ALWAYS equal to Y% of X!',

      mainTrick: {
        name: 'The Percentage Flip Trick (X% of Y = Y% of X)',
        idea: 'Flip the numbers if one number is hard to calculate mentally!',
        breakdown: [
          'Hard to solve: 64% of 25',
          'Flip it: 25% of 64',
          '25% means divide by 4: 64 ÷ 4 = 16!'
        ],
        example: '64% of 25 = 16. Solved in 3 seconds mentally!'
      },

      quickList: [
        { rule: '10% + 5% Rule', ratio: 'To find 15% of 400: 10% is 40, 5% is 20. Total = 60.' },
        { rule: 'Successive Formula', ratio: 'a + b + (ab/100) for two back-to-back changes.' },
        { rule: 'Multiplying Factor', ratio: '+20% means ×1.20. −15% means ×0.85.' }
      ],

      remember: 'Whenever an awkward percentage appears, try flipping it: 48% of 50 = 50% of 48 = 24!'
    },

    /* CARD 7 — EXAM-STYLE VARIATIONS */
    {
      id: 'exam-style-variations',
      cardNumber: 7,
      badge: '07 · EXAM QUESTIONS',
      title: 'Exam-Style Variations',
      introText: 'Realistic percentage questions from company placement tests:',

      variations: [
        {
          type: 'Comparison Trap',
          q: 'A\'s salary is 25% more than B\'s. By how much is B\'s salary less than A\'s?',
          a: 'B = 100, A = 125. Difference = 25. Percentage less = (25 / 125) × 100 = 20% (NOT 25%!).'
        },
        {
          type: 'Election Scenario',
          q: 'A candidate wins with 56% of votes, leading by 1,200 votes. Find total votes.',
          a: 'Winner = 56%, Loser = 44%. Difference = 12%. 12% = 1200 → Total (100%) = 10,000 votes.'
        },
        {
          type: 'Successive Discount',
          q: 'A price rises by 10% then rises by 20%. Find total percentage rise.',
          a: 'Net % = 10 + 20 + (10 × 20)/100 = 30 + 2 = 32%.'
        }
      ],

      remember: 'If A is 25% more than B, B is NOT 25% less than A. It is 20% less.'
    },

    /* CARD 8 — COMMON MISTAKES & TRAPS */
    {
      id: 'common-mistakes-traps',
      cardNumber: 8,
      badge: '08 · MISTAKES',
      title: 'Common Mistakes & Traps',
      introText: 'Avoid these 3 classic mistakes in percentage questions:',

      mistakes: [
        {
          wrong: '❌ Putting the wrong number in the denominator',
          correct: '✓ The denominator must ALWAYS be the original starting number.'
        },
        {
          wrong: '❌ Adding successive changes directly: +20% then −20% = 0%',
          correct: '✓ They do NOT cancel! 100 → 120 → 96. That is an overall 4% loss.'
        },
        {
          wrong: '❌ Saying B is 25% less when A is 25% more',
          correct: '✓ The base changes from B to A! B is only 20% less than A.'
        }
      ],

      remember: 'Always ask yourself: "Percent of WHAT?" That "WHAT" is your denominator.'
    },

    /* CARD 9 — SPEED & ACCURACY STRATEGY */
    {
      id: 'speed-accuracy-strategy',
      cardNumber: 9,
      badge: '09 · STRATEGY',
      title: 'Speed & Accuracy Strategy',
      introText: 'Use this 5-step checklist to solve percentage questions in under 25 seconds:',

      steps: [
        { step: '1', title: 'Find the Base', tip: 'What comes after "of" / "than"' },
        { step: '2', title: 'Flip Check', tip: 'X% of Y = Y% of X' },
        { step: '3', title: 'Fraction', tip: 'Use 1/2, 1/4, 1/5' },
        { step: '4', title: 'Calculate', tip: 'Multiply or divide' },
        { step: '5', title: 'Sanity Check', tip: 'Is magnitude reasonable?' }
      ],

      flowchart: [
        '1. Find the Base (what comes after "of" / "than")',
        '2. Check for Flip Trick (X% of Y = Y% of X)',
        '3. Use Friendly Fraction (1/2, 1/4, 1/5)',
        '4. Calculate',
        '5. Sanity Check'
      ],

      proTip: '💡 Pro Tip: Need 15%? Find 10% (move decimal left), take half for 5%, and add them together!',

      remember: 'Friendly fractions (1/4, 1/5, 1/10) save you from doing long multiplication.'
    },

    /* CARD 10 — QUICK REVISION / CHEAT SHEET */
    {
      id: 'quick-revision',
      cardNumber: 10,
      badge: '10 · REVISION',
      title: 'Quick Revision / Cheat Sheet',
      introText: 'Revise these 4 core facts in 30 seconds before your test.',

      fullFormsSummary: 'Percentage = Parts out of 100 • Base = Starting Value (Denominator)',

      cheatSheet: {
        terms: ['% = Out of 100', 'Base = Starting Value', 'MF = Multiplying Factor'],
        formulas: [
          'Percentage = (Part / Total) × 100',
          '% Change = (Difference / Original Base) × 100',
          'Net % = a + b + (a × b) / 100',
          'Flip Rule: X% of Y = Y% of X'
        ],
        shortcuts: [
          '50% = 1/2 (divide by 2)',
          '25% = 1/4 (divide by 4)',
          '20% = 1/5 (divide by 5)',
          '10% = 1/10 (divide by 10)'
        ],
        quickRules: [
          '"...of X" → X is the denominator',
          'Denominator is ALWAYS the initial original value',
          '+20% then −20% is a 4% loss, not zero'
        ]
      },

      keyFormulas: [
        'Percentage = (Part / Total) × 100',
        '% Change = (Difference / Original Base) × 100',
        'Net % = a + b + (a × b) / 100',
        'Flip Rule: X% of Y = Y% of X'
      ],

      quickFacts: [
        '50% = 1/2 (divide by 2)',
        '25% = 1/4 (divide by 4)',
        '20% = 1/5 (divide by 5)',
        '10% = 1/10 (divide by 10)'
      ],

      memoryRules: [
        '"...of X" → X is the denominator',
        'Denominator is ALWAYS the initial original value',
        '+20% then −20% is a 4% loss, not zero'
      ],

      goldenRule: 'Percentage is always relative to its base. Find the base first.'
    }
  ]
};
