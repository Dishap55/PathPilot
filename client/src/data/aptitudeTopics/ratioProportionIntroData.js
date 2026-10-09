/**
 * RATIO & PROPORTION 10-CARD LEARNING CONTENT (BEGINNER FRIENDLY & LIGHTWEIGHT)
 * Follows the friendly teacher philosophy:
 * Less text • Simple English • Clear visual boxes • Practical examples
 */

export const RATIO_PROPORTION_INTRO_DATA = {
  topicId: 'ratio-and-proportion',
  topicName: 'Ratio & Proportion',
  category: 'Quantitative Aptitude',
  subtitle: 'Learn comparing quantities, sharing money, combining ratios, and solving age problems quickly.',

  fullForms: [
    { abbr: 'a : b', full: 'Ratio', desc: 'Comparison of two numbers (a is antecedent, b is consequent).' },
    { abbr: 'a:b :: c:d', full: 'Proportion', desc: 'Two equal ratios: a/b = c/d (Extremes = Means).' },
    { abbr: '1 part', full: 'Unit Value', desc: 'The value of 1 share: Total Value ÷ Total Ratio Parts.' }
  ],

  cards: [
    /* CARD 1 — WHAT IS RATIO & PROPORTION? */
    {
      id: 'what-is-ratio-proportion',
      cardNumber: 1,
      badge: '01 · BASIC IDEA',
      title: 'What is Ratio & Proportion?',
      introText: 'A ratio compares two quantities to show how many times one number contains another. A proportion means two ratios are equal.',

      importantTerms: [
        { term: 'Ratio (a : b)', meaning: 'Comparing two things of the same unit (e.g. 3 boys to 2 girls).' },
        { term: 'Proportion', meaning: 'When two ratios are equal: a : b = c : d.' },
        { term: 'Total Parts', meaning: 'Add the ratio numbers (e.g. ratio 3 : 2 means 5 total parts).' },
        { term: 'Unit Share', meaning: 'The real value of each 1 part.' }
      ],

      realLifeExample: {
        title: 'Project Bonus Split',
        buy: 'Aman and Priya share ₹35,000 in the ratio 4 : 3.',
        sell: 'Total parts = 4 + 3 = 7 parts. 1 part = ₹35,000 ÷ 7 = ₹5,000.',
        result: 'Aman gets 4 × 5,000 = ₹20,000. Priya gets 3 × 5,000 = ₹15,000.'
      },

      whyLearnIt: [
        'Used to divide money, mix liquids, and calculate recipe ingredients.',
        'Core method for solving age and partnership questions in aptitude tests.',
        'Avoids setting up long algebraic equations with multiple x and y variables.'
      ],

      visualType: 'ratio_blocks',
      remember: 'Always find the value of 1 part first. Once you know 1 part, you know everything.'
    },

    /* CARD 2 — IMPORTANT FORMULAS */
    {
      id: 'important-formulas',
      cardNumber: 2,
      badge: '02 · FORMULAS',
      title: 'Important Formulas',
      introText: 'The fundamental proportion rules you need for placement exams.',

      formulaBoxes: [
        { name: 'Core Proportion Law', formula: 'Product of Extremes = Product of Means: a × d = b × c', when: 'If a : b = c : d' },
        { name: 'Value of 1 Part', formula: '1 Part = Total Amount / (a + b)', when: 'To split an amount' },
        { name: 'Mean Proportional', formula: 'Mean = √(a × b)', when: 'Between two numbers a & b' },
        { name: 'Third Proportional', formula: 'c = b² / a', when: 'In a : b = b : c' },
        { name: 'Combine A:B & B:C', formula: 'A : B : C = (a × c) : (b × c) : (b × d)', when: 'Bridging two ratios' }
      ],

      whatIsGiven: [
        { given: 'Total sum & ratio a:b', action: 'Divide total by (a+b) to find 1 part, then multiply.' },
        { given: 'a : b = c : d with 1 missing', action: 'Cross multiply: a × d = b × c.' },
        { given: 'Two numbers a and b', action: 'Mean proportional = √(a × b).' }
      ],

      remember: 'In proportion a:b = c:d, the two outside numbers multiplied equal the two inside numbers multiplied.'
    },

    /* CARD 3 — QUESTION RECOGNITION & QUICK TRICKS */
    {
      id: 'question-recognition-tricks',
      cardNumber: 3,
      badge: '03 · RECOGNITION',
      title: 'Question Recognition & Quick Tricks',
      introText: 'How to combine two ratios like A:B and B:C in 3 seconds.',

      clues: [
        { word: '"divided in the ratio of..."', meaning: 'Split problem: find 1 part = Total ÷ (Sum of parts).' },
        { word: '"A : B = 2 : 3 and B : C = 4 : 5"', meaning: 'Bridge problem: equalize the middle term B.' },
        { word: '"ages in ratio..."', meaning: 'The age difference between two people NEVER changes!' }
      ],

      quickTricks: [
        { pct: 'The N-Method for A:B:C', action: 'Multiply down, across, and down', ex: 'A:B = 2:3, B:C = 4:5 → A=8, B=12, C=15' },
        { pct: 'Ratio of coins', action: 'Multiply ratio by coin value', ex: '50p is ₹1/2, 25p is ₹1/4' },
        { pct: 'Direct share', action: 'Share of A = Total × a / (a + b)', ex: 'Share of 3 in 3:2 = 3/5th of Total' }
      ],

      exampleBox: {
        text: 'Quick Bridge: A:B = 2:3 and B:C = 4:5',
        solution: 'A = 2×4 = 8, B = 3×4 = 12, C = 3×5 = 15. A:B:C = 8 : 12 : 15!'
      },

      remember: 'To bridge A:B and B:C, make B the same number in both ratios.'
    },

    /* CARD 4 — STEP-BY-STEP SOLVED EXAMPLE */
    {
      id: 'solved-example',
      cardNumber: 4,
      badge: '04 · EXAMPLE',
      title: 'Step-by-Step Solved Example',
      introText: 'Divide ₹4,000 between Rahul and Priya in the ratio 3 : 5.',

      question: 'Divide ₹4,000 between Rahul and Priya in the ratio 3 : 5. Find Priya\'s share.',

      steps: [
        {
          num: 'STEP 1',
          title: 'Find Total Ratio Parts',
          formula: 'Parts = 3 + 5',
          calc: '3 + 5 = 8 total parts'
        },
        {
          num: 'STEP 2',
          title: 'Find Value of 1 Part',
          formula: '1 Part = ₹4,000 ÷ 8',
          calc: '₹4,000 ÷ 8 = ₹500 per part'
        },
        {
          num: 'STEP 3',
          title: 'Find Priya\'s Share (5 parts)',
          formula: 'Priya\'s Share = 5 × 1 Part',
          calc: '5 × ₹500 = ₹2,500'
        }
      ],

      finalAnswer: 'Priya\'s Share = ₹2,500',

      comparison: {
        normal: 'Priya gets 5/8 of 4000 = (5 × 4000) ÷ 8 = ₹2,500 (formula).',
        fast: '8 parts = 4000 → 1 part = 500 → 5 parts = ₹2,500 (solved mentally!).'
      },

      remember: 'Rahul gets 3 × 500 = ₹1,500. Priya gets 5 × 500 = ₹2,500. Total = ₹4,000. Verified!'
    },

    /* CARD 5 — DIFFERENT QUESTION FORMS */
    {
      id: 'different-question-forms',
      cardNumber: 5,
      badge: '05 · QUESTION FORMS',
      title: 'Different Question Forms',
      introText: 'The 5 common ratio questions asked in screening tests:',

      formsList: [
        { num: '1', title: 'Dividing Money', tip: 'Divide an amount in ratio a : b : c.' },
        { num: '2', title: 'Merging Two Ratios', tip: 'Given A:B and B:C, find A:B:C.' },
        { num: '3', title: 'Age Questions', tip: 'Ratio of ages now and after 5 years.' },
        { num: '4', title: 'Coin Questions', tip: 'Ratio of 50p, 25p, ₹1 coins with total money given.' },
        { num: '5', title: 'Mixture Replacement', tip: 'Milk and water in ratio 3:1, adding water.' }
      ],

      remember: 'Find what stayed the same in the question. Anchor your math to that.'
    },

    /* CARD 6 — TRICKS & SHORT METHODS */
    {
      id: 'tricks-and-short-methods',
      cardNumber: 6,
      badge: '06 · SHORTCUTS',
      title: 'Tricks & Short Methods',
      introText: 'The Age Difference rule: The age difference between two people NEVER changes.',

      mainTrick: {
        name: 'The Equal Difference Age Shortcut',
        idea: 'If Rahul is 5 years older than Priya today, he will be 5 years older 20 years later!',
        breakdown: [
          'Ratio now = 4 : 5 (difference = 1 part)',
          'Ratio in 5 years = 5 : 6 (difference = 1 part)',
          'Both grew by 1 part in 5 years!'
        ],
        example: '1 part = 5 years! Present ages are 4×5 = 20 and 5×5 = 25 years. No equations needed!'
      },

      quickList: [
        { rule: 'Inverse of 2:3', ratio: 'Just swap: 3 : 2' },
        { rule: 'Inverse of 2:3:4', ratio: 'Multiply by LCM 12: 6 : 4 : 3' },
        { rule: 'Option Hack', ratio: 'Priya\'s share (5 parts) MUST be a multiple of 5!' }
      ],

      remember: 'In multiple-choice tests, eliminate options that are not multiples of the ratio number.'
    },

    /* CARD 7 — EXAM-STYLE VARIATIONS */
    {
      id: 'exam-style-variations',
      cardNumber: 7,
      badge: '07 · EXAM QUESTIONS',
      title: 'Exam-Style Variations',
      introText: 'Realistic test questions with clean 1-line answers:',

      variations: [
        {
          type: 'Income & Savings',
          q: 'Income ratio of A and B is 5:4, expense ratio is 3:2. Both save ₹1,600. Find A\'s income.',
          a: 'Difference in parts: (5−3) = 2, (4−2) = 2. 2 parts = ₹1,600 → 1 part = ₹800. A\'s Income = 5 × 800 = ₹4,000.'
        },
        {
          type: 'Third Proportional',
          q: 'Find the third proportional to 4 and 6.',
          a: 'Formula: b² ÷ a = 6² ÷ 4 = 36 ÷ 4 = 9.'
        },
        {
          type: 'Coin Question',
          q: 'Coins of ₹1 and 50p are in ratio 2 : 3 with total value ₹35. Find number of 50p coins.',
          a: 'Value = 2x(₹1) + 3x(₹0.5) = 2x + 1.5x = 3.5x. 3.5x = 35 → x = 10. Coins = 3 × 10 = 30 coins.'
        }
      ],

      remember: 'Ratios represent parts, not the actual values. Multiply parts by the unit value.'
    },

    /* CARD 8 — COMMON MISTAKES & TRAPS */
    {
      id: 'common-mistakes-traps',
      cardNumber: 8,
      badge: '08 · MISTAKES',
      title: 'Common Mistakes & Traps',
      introText: 'Avoid these 3 classic mistakes in ratio questions:',

      mistakes: [
        {
          wrong: '❌ Comparing numbers with different units: 50 paise to ₹2 = 50 : 2',
          correct: '✓ Convert to same unit first: ₹2 = 200 paise. Ratio = 50 : 200 = 1 : 4.'
        },
        {
          wrong: '❌ Inverting 3 ratios by just writing them backwards: 2:3:4 → 4:3:2',
          correct: '✓ Invert as fractions (1/2 : 1/3 : 1/4) and multiply by LCM 12 → 6 : 4 : 3.'
        },
        {
          wrong: '❌ Adding numbers directly to ratio terms: (2+5) : (3+5) = 7 : 8',
          correct: '✓ Adding a fixed number changes the ratio entirely! Always use 2x+5 and 3x+5.'
        }
      ],

      remember: 'Always check that units match (rupees with rupees, paise with paise).'
    },

    /* CARD 9 — SPEED & ACCURACY STRATEGY */
    {
      id: 'speed-accuracy-strategy',
      cardNumber: 9,
      badge: '09 · STRATEGY',
      title: 'Speed & Accuracy Strategy',
      introText: 'How to crack ratio questions in under 30 seconds:',

      flowchart: [
        '1. Check Units (match paise & rupees)',
        '2. Sum the Ratio Parts',
        '3. Find 1 Part Value',
        '4. Multiply for Target Share',
        '5. Verify Total'
      ],

      proTip: '💡 Pro Tip: Need to find Priya\'s share in ratio 3 : 5? Priya\'s answer MUST be a multiple of 5. Eliminate non-multiples from options immediately!',

      remember: 'Use option elimination by divisibility to pick the right option in 5 seconds.'
    },

    /* CARD 10 — QUICK REVISION / CHEAT SHEET */
    {
      id: 'quick-revision',
      cardNumber: 10,
      badge: '10 · REVISION',
      title: 'Quick Revision / Cheat Sheet',
      introText: 'Revise these 4 core facts in 30 seconds before your test.',

      fullFormsSummary: '1 Part = Total ÷ (a + b) • Extremes × Means = a × d = b × c',

      keyFormulas: [
        'Proportion Law: a × d = b × c',
        '1 Part = Total Amount / (a + b)',
        'Mean Proportional = √(a × b)',
        'Third Proportional = b² / a'
      ],

      quickFacts: [
        'A:B = 2:3, B:C = 4:5 → A:B:C = 8:12:15',
        'Inverse of 2:3 is 3:2',
        'Age difference between two people is CONSTANT'
      ],

      memoryRules: [
        'Ratio is relationship, not actual number',
        'Units must be identical before comparing',
        'Answer must be a multiple of its ratio part'
      ],

      goldenRule: 'Find the value of 1 part first. Everything follows from 1 part.'
    }
  ]
};
