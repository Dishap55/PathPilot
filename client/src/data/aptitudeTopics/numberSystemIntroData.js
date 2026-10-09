/**
 * NUMBER SYSTEM 10-CARD LEARNING CONTENT (ACCURATE, FRIENDLY & LIGHTWEIGHT)
 * Real Number System concepts: divisibility, remainders, primes, unit digits.
 */

export const NUMBER_SYSTEM_INTRO_DATA = {
  topicId: 'number-system',
  topicName: 'Number System',
  category: 'Quantitative Aptitude',
  subtitle: 'Learn divisibility rules, remainders, unit digits, and prime numbers to solve aptitude questions quickly.',

  fullForms: [
    { abbr: 'N', full: 'Natural Numbers', desc: 'Counting numbers: 1, 2, 3, 4...' },
    { abbr: 'W', full: 'Whole Numbers', desc: 'Natural numbers plus zero: 0, 1, 2, 3...' },
    { abbr: 'Z', full: 'Integers', desc: 'Positive, negative, and zero: ...-2, -1, 0, 1, 2...' },
    { abbr: 'Prime', full: 'Prime Number', desc: 'A number divisible only by 1 and itself (e.g. 2, 3, 5, 7, 11).' },
    { abbr: 'LCM', full: 'Lowest Common Multiple', desc: 'Smallest number divisible by all given numbers.' }
  ],

  cards: [
    /* CARD 1 — WHAT IS NUMBER SYSTEM? */
    {
      id: 'what-is-number-system',
      cardNumber: 1,
      badge: '01 · BASIC IDEA',
      title: 'What is Number System?',
      introText: 'Number System is about different types of numbers and how they behave. It gives you quick rules to test divisibility, find remainders, and work with factors without doing long division.',

      importantTerms: [
        { term: 'Natural Numbers (N)', meaning: 'Positive counting numbers: 1, 2, 3, 4, 5...' },
        { term: 'Whole Numbers (W)', meaning: 'Counting numbers including zero: 0, 1, 2, 3...' },
        { term: 'Prime Numbers', meaning: 'Numbers with only 2 factors: 1 and itself (2, 3, 5, 7, 11, 13...).' },
        { term: 'Composite Numbers', meaning: 'Numbers having more than two factors (4, 6, 8, 9, 10...).' }
      ],

      realLifeExample: {
        title: 'Team Grouping Example',
        buy: '45 students need to form equal teams without anyone left out.',
        sell: '45 = 9 × 5 (9 teams of 5, or 5 teams of 9).',
        result: 'Factors of 45: 1, 3, 5, 9, 15, 45.'
      },

      whyLearnIt: [
        'Tested in every single campus placement test (TCS, Infosys, Cognizant).',
        'Saves time by letting you test divisibility in 3 seconds.',
        'Helps in finding unit digits and remainders of big numbers.'
      ],

      visualType: 'number_line',
      remember: '2 is the SMALLEST and the ONLY even prime number. 1 is neither prime nor composite.'
    },

    /* CARD 2 — IMPORTANT FORMULAS */
    {
      id: 'important-formulas',
      cardNumber: 2,
      badge: '02 · FORMULAS',
      title: 'Important Formulas',
      introText: 'The essential formulas and divisibility rules you will use in every question.',

      formulaBoxes: [
        { name: 'Division Rule', formula: 'Dividend = (Divisor × Quotient) + Remainder', when: 'Fundamental division rule' },
        { name: 'Sum of First n Numbers', formula: 'Sum = n(n + 1) / 2', when: 'e.g. 1 + 2 + 3 + ... + n' },
        { name: 'Sum of First n Odd Numbers', formula: 'Sum = n²', when: 'e.g. 1 + 3 + 5 + ...' },
        { name: 'Sum of First n Even Numbers', formula: 'Sum = n(n + 1)', when: 'e.g. 2 + 4 + 6 + ...' },
        { name: 'Divisible by 3 or 9', formula: 'Sum of all digits must divide by 3 or 9', when: 'Quick digital sum test' },
        { name: 'Divisible by 4 or 8', formula: 'By 4: Last 2 digits divide by 4. By 8: Last 3 digits divide by 8.', when: 'Check ending digits' }
      ],

      whatIsGiven: [
        { given: 'Divisor, Quotient, Remainder', action: 'Multiply Divisor × Quotient, then add Remainder to get the Dividend.' },
        { given: 'Sum of 1 to 50', action: 'Use formula: 50 × 51 / 2 = 1,275.' },
        { given: 'Big number divisibility', action: 'Add up the digits instead of dividing the whole number.' }
      ],

      remember: 'The remainder is ALWAYS smaller than the divisor. If you divide by 7, remainder is between 0 and 6.'
    },

    /* CARD 3 — QUESTION RECOGNITION & QUICK TRICKS */
    {
      id: 'question-recognition-tricks',
      cardNumber: 3,
      badge: '03 · RECOGNITION',
      title: 'Question Recognition & Quick Tricks',
      introText: 'Spot the question type immediately and use the Digital Sum shortcut.',

      clues: [
        { word: '"divisible by 3 or 9"', meaning: 'Add the digits! If sum divides by 3 or 9, the number does too.' },
        { word: '"remainder when divided by"', meaning: 'Use individual remainders before multiplying.' },
        { word: '"unit digit of"', meaning: 'Powers repeat every 4 steps (cyclicity of 4).' },
        { word: '"is it prime?"', meaning: 'Test divisibility only by primes up to its square root.' }
      ],

      quickTricks: [
        { pct: 'Divisible by 3', action: 'Add digits: 4 + 3 + 2 = 9 (Yes!)', ex: '432 is divisible by 3' },
        { pct: 'Divisible by 4', action: 'Check last 2 digits: 24 divides by 4', ex: '1,524 is divisible by 4' },
        { pct: 'Divisible by 5', action: 'Ends in 0 or 5', ex: '870 and 435 divide by 5' },
        { pct: 'Divisible by 11', action: 'Difference of alternating digits is 0 or 11', ex: '121: (1+1) − 2 = 0' }
      ],

      exampleBox: {
        text: 'Quick Check: Is 7,533 divisible by 9?',
        solution: '7 + 5 + 3 + 3 = 18. Since 18 divides by 9, 7,533 is divisible by 9!'
      },

      remember: 'Cross out 9s when adding digits. 7 + 5 + 3 + 3: 7+5+3+3 = 18 → 1+8 = 9.'
    },

    /* CARD 4 — STEP-BY-STEP SOLVED EXAMPLE */
    {
      id: 'solved-example',
      cardNumber: 4,
      badge: '04 · EXAMPLE',
      title: 'Step-by-Step Solved Example',
      introText: 'Find the remainder of a big multiplication without multiplying the big numbers.',

      question: 'Find the remainder when (43 × 47) is divided by 5.',

      steps: [
        {
          num: 'STEP 1',
          title: 'Find Remainder of 43',
          formula: '43 ÷ 5',
          calc: '43 = 5 × 8 + 3 → Remainder = 3'
        },
        {
          num: 'STEP 2',
          title: 'Find Remainder of 47',
          formula: '47 ÷ 5',
          calc: '47 = 5 × 9 + 2 → Remainder = 2'
        },
        {
          num: 'STEP 3',
          title: 'Multiply Remainders',
          formula: 'Remainder = 3 × 2',
          calc: '3 × 2 = 6. Divide 6 by 5 → Final Remainder = 1'
        }
      ],

      finalAnswer: 'Remainder = 1',

      comparison: {
        normal: '43 × 47 = 2021. Now 2021 ÷ 5 gives remainder 1 (took 30 seconds).',
        fast: 'Remainders are 3 and 2. 3 × 2 = 6 → 6 ÷ 5 gives remainder 1 (took 4 seconds!).'
      },

      remember: 'In remainder questions, you can multiply the remainders directly instead of multiplying the big numbers.'
    },

    /* CARD 5 — DIFFERENT QUESTION FORMS */
    {
      id: 'different-question-forms',
      cardNumber: 5,
      badge: '05 · QUESTION FORMS',
      title: 'Different Question Forms',
      introText: 'Here are the 5 classic question formats tested in placement tests:',

      formsList: [
        { num: '1', title: 'Divisibility Test', tip: 'Is a big number divisible by 3, 4, 8, 9, or 11?' },
        { num: '2', title: 'Missing Digit', tip: 'Find the digit * so that 43*2 is divisible by 9.' },
        { num: '3', title: 'Product Remainder', tip: 'Find remainder of (23 × 27 × 31) ÷ 5.' },
        { num: '4', title: 'Unit Digit of Powers', tip: 'Find the last digit of 7⁹⁵ or 3⁶⁴.' },
        { num: '5', title: 'Count of Factors', tip: 'How many factors does 72 have? (72 = 2³ × 3² → (3+1)(2+1) = 12 factors).' }
      ],

      remember: 'Spot the category first: Divisibility, Remainder, Unit Digit, or Factors.'
    },

    /* CARD 6 — TRICKS & SHORT METHODS */
    {
      id: 'tricks-and-short-methods',
      cardNumber: 6,
      badge: '06 · SHORTCUTS',
      title: 'Tricks & Short Methods',
      introText: 'The Unit Digit Cyclicity rule to find the last digit of huge powers instantly.',

      mainTrick: {
        name: 'The Cyclicity Rule of 4',
        idea: 'The last digit of any number raised to powers repeats every 4 powers.',
        breakdown: [
          '7¹ = 7 (ends in 7)',
          '7² = 49 (ends in 9)',
          '7³ = 343 (ends in 3)',
          '7⁴ = 2401 (ends in 1)'
        ],
        example: 'To find unit digit of 7⁴⁵: Divide power 45 by 4 → Remainder is 1! So unit digit is 7¹ = 7!'
      },

      quickList: [
        { rule: 'Numbers ending in 0, 1, 5, 6', ratio: 'Unit digit NEVER changes for any power!' },
        { rule: 'Numbers ending in 4 or 9', ratio: 'Repeats every 2 powers (odd vs even)' },
        { rule: 'Numbers ending in 2, 3, 7, 8', ratio: 'Repeats every 4 powers' }
      ],

      remember: 'Divide the power by 4. The remainder tells you which step in the cycle to pick.'
    },

    /* CARD 7 — EXAM-STYLE VARIATIONS */
    {
      id: 'exam-style-variations',
      cardNumber: 7,
      badge: '07 · EXAM QUESTIONS',
      title: 'Exam-Style Variations',
      introText: 'Realistic questions from placement screening tests with quick answers.',

      variations: [
        {
          type: 'Missing Digit Question',
          q: 'Find the smallest digit * so that 5*2 is divisible by 9.',
          a: 'Sum: 5 + * + 2 = 7 + *. For sum to be divisible by 9, * must be 2 (7 + 2 = 9).'
        },
        {
          type: 'Square Remainder Question',
          q: 'A number when divided by 5 gives remainder 3. What is the remainder when its square is divided by 5?',
          a: 'Just square the remainder! 3² = 9. 9 ÷ 5 leaves remainder 4.'
        },
        {
          type: 'Prime Check Question',
          q: 'Is 97 a prime number?',
          a: '√97 is under 10. Check primes under 10: 2, 3, 5, 7. None divide 97, so 97 is prime!'
        }
      ],

      remember: 'To test if a number is prime, you only need to test primes up to its square root.'
    },

    /* CARD 8 — COMMON MISTAKES & TRAPS */
    {
      id: 'common-mistakes-traps',
      cardNumber: 8,
      badge: '08 · MISTAKES',
      title: 'Common Mistakes & Traps',
      introText: 'Avoid these 3 classic mistakes in number system questions:',

      mistakes: [
        {
          wrong: '❌ Thinking 1 is a prime number',
          correct: '✓ 1 is NEITHER prime nor composite. The smallest prime is 2.'
        },
        {
          wrong: '❌ Forgetting that remainder must be smaller than divisor',
          correct: '✓ If your remainder is 8 when dividing by 5, divide 8 by 5 again to get 3.'
        },
        {
          wrong: '❌ Testing all numbers up to N to check if N is prime',
          correct: '✓ You only need to test prime numbers up to √N. For 89, test only 2, 3, 5, 7.'
        }
      ],

      remember: 'Smallest prime = 2. Only even prime = 2. 1 is special.'
    },

    /* CARD 9 — SPEED & ACCURACY STRATEGY */
    {
      id: 'speed-accuracy-strategy',
      cardNumber: 9,
      badge: '09 · STRATEGY',
      title: 'Speed & Accuracy Strategy',
      introText: 'Follow this 5-step checklist to answer number system questions in under 20 seconds:',

      steps: [
        { step: '1', title: 'Read', tip: 'Read question in 5s' },
        { step: '2', title: 'Identify Rule', tip: 'Divisibility / Remainder' },
        { step: '3', title: 'Shortcut', tip: 'Digit sum or cyclicity' },
        { step: '4', title: 'Calculate', tip: 'Quick mental math' },
        { step: '5', title: 'Verify', tip: 'Check remainder < divisor' }
      ],

      flowchart: [
        '1. Read Question',
        '2. Identify Rule (Divisibility / Remainder / Unit Digit)',
        '3. Use Shortcut (Digit Sum or Remainder Math)',
        '4. Quick Calculation',
        '5. Verify Result'
      ],

      proTip: '💡 Pro Tip: When checking divisibility by 9, add digits until you get a single digit. If it is 9, the number is divisible by 9!',

      remember: 'Never do long division in aptitude tests when a divisibility rule exists.'
    },

    /* CARD 10 — QUICK REVISION / CHEAT SHEET */
    {
      id: 'quick-revision',
      cardNumber: 10,
      badge: '10 · REVISION',
      title: 'Quick Revision / Cheat Sheet',
      introText: 'Revise these core number system facts in under 60 seconds.',

      fullFormsSummary: 'Dividend = (Divisor × Quotient) + Remainder',

      cheatSheet: {
        terms: ['N = Natural', 'W = Whole', 'Z = Integers', 'Prime = 2 factors'],
        formulas: [
          'Dividend = (Divisor × Quotient) + Remainder',
          'Sum 1 to n = n(n + 1) / 2',
          'Sum of first n odd numbers = n²',
          'Sum of first n even numbers = n(n + 1)'
        ],
        shortcuts: [
          'By 3/9: Sum of digits divides by 3/9',
          'By 4: Last 2 digits divide by 4',
          'By 8: Last 3 digits divide by 8',
          'Remainder: Multiply remainders directly'
        ],
        quickRules: [
          '2 is the only even prime number',
          '1 is neither prime nor composite',
          'Powers repeat in a cycle of 4'
        ]
      },

      keyFormulas: [
        'Sum 1 to n = n(n + 1) / 2',
        'Sum of first n odd numbers = n²',
        'Sum of first n even numbers = n(n + 1)',
        'Number of factors of aᵖ × bʳ = (p + 1)(r + 1)'
      ],

      quickFacts: [
        'By 2: Last digit 0, 2, 4, 6, 8',
        'By 3: Sum of digits divides by 3',
        'By 4: Last 2 digits divide by 4',
        'By 5: Last digit 0 or 5',
        'By 9: Sum of digits divides by 9'
      ],

      memoryRules: [
        '2 is the only even prime number',
        '1 is neither prime nor composite',
        'Powers repeat in a cycle of 4'
      ],

      goldenRule: 'Divide the problem, not the number. Use digital sums and remainder rules.'
    }
  ]
};
