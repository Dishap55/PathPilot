/**
 * PROFIT & LOSS 10-CARD LEARNING CONTENT (BEGINNER FRIENDLY & LIGHTWEIGHT)
 * Follows the friendly teacher philosophy:
 * Less text • Simple English • Clear visual boxes • Practical examples
 */

export const PROFIT_LOSS_INTRO_DATA = {
  topicId: 'profit-and-loss',
  topicName: 'Profit & Loss',
  category: 'Quantitative Aptitude',
  subtitle: 'Learn cost price, selling price, discounts, and quick tricks to solve profit and loss questions in seconds.',

  fullForms: [
    { abbr: 'CP', full: 'Cost Price', desc: 'Money you pay to buy or make something.' },
    { abbr: 'SP', full: 'Selling Price', desc: 'Money you get when you sell it.' },
    { abbr: 'MP', full: 'Marked Price', desc: 'Printed tag price before any discount.' },
    { abbr: 'P / L', full: 'Profit / Loss', desc: 'Money gained or lost on the sale.' },
    { abbr: 'D', full: 'Discount', desc: 'Reduction given on the marked price.' }
  ],

  cards: [
    /* ===================================================================== */
    /* CARD 1 — WHAT IS PROFIT & LOSS?                                       */
    /* ===================================================================== */
    {
      id: 'what-is-profit-loss',
      cardNumber: 1,
      badge: '01 · BASIC IDEA',
      title: 'What is Profit & Loss?',
      introText: 'Profit and Loss is about buying and selling things. When you sell for more than you paid, you make a Profit. When you sell for less, you suffer a Loss.',

      importantTerms: [
        { term: 'Cost Price (CP)', meaning: 'The money you spent to buy the item.' },
        { term: 'Selling Price (SP)', meaning: 'The money you receive when you sell it.' },
        { term: 'Profit (Gain)', meaning: 'Happens when Selling Price is higher than Cost Price (SP > CP).' },
        { term: 'Loss', meaning: 'Happens when Cost Price is higher than Selling Price (CP > SP).' }
      ],

      realLifeExample: {
        title: 'College Bag Example',
        buy: 'Buy bag for: ₹500 (CP)',
        sell: 'Sell bag for: ₹600 (SP)',
        result: 'Profit = ₹600 − ₹500 = ₹100'
      },

      whyLearnIt: [
        'Used every day in shopping, online stores, and business.',
        'Always asked in placement aptitude tests (TCS, Infosys, Wipro).',
        'Helps you quickly calculate discounts and offers.'
      ],

      visualType: 'profit_loss_transaction',
      remember: 'Profit or Loss is ALWAYS calculated on Cost Price (CP).'
    },

    /* ===================================================================== */
    /* CARD 2 — IMPORTANT FORMULAS                                           */
    /* ===================================================================== */
    {
      id: 'important-formulas',
      cardNumber: 2,
      badge: '02 · FORMULAS',
      title: 'Important Formulas',
      introText: 'Every formula you need for profit and loss questions. Memorize these 4 core boxes.',

      formulaBoxes: [
        { name: 'Profit', formula: 'Profit = SP − CP', when: 'When SP > CP' },
        { name: 'Loss', formula: 'Loss = CP − SP', when: 'When CP > SP' },
        { name: 'Profit %', formula: 'Profit % = (Profit / CP) × 100', when: 'Always divide by CP!' },
        { name: 'Loss %', formula: 'Loss % = (Loss / CP) × 100', when: 'Always divide by CP!' },
        { name: 'Find SP (with profit)', formula: 'SP = CP × (100 + Profit %) / 100', when: 'Given CP & Profit%' },
        { name: 'Find CP (from SP)', formula: 'CP = (SP × 100) / (100 + Profit %)', when: 'Given SP & Profit%' }
      ],

      whatIsGiven: [
        { given: 'CP + SP', action: 'Subtract to find Profit or Loss.' },
        { given: 'CP + Profit %', action: 'Find Profit amount, then add to CP to get SP.' },
        { given: 'SP + Profit %', action: 'Do NOT just subtract % from SP! Use the CP formula.' }
      ],

      remember: 'Never divide by SP when calculating Profit% or Loss%. The base is always CP.'
    },

    /* ===================================================================== */
    /* CARD 3 — QUESTION RECOGNITION & QUICK TRICKS                          */
    /* ===================================================================== */
    {
      id: 'question-recognition-tricks',
      cardNumber: 3,
      badge: '03 · RECOGNITION',
      title: 'Question Recognition & Quick Tricks',
      introText: 'Look for keyword clues in questions and use simple percentage fractions.',

      clues: [
        { word: '"bought for" or "purchased at"', meaning: 'This is the Cost Price (CP)' },
        { word: '"sold for" or "fetching"', meaning: 'This is the Selling Price (SP)' },
        { word: '"gained" or "profit of"', meaning: 'Profit (SP is greater than CP)' },
        { word: '"lost" or "sold at a loss"', meaning: 'Loss (CP is greater than SP)' },
        { word: '"marked at" or "printed price"', meaning: 'Marked Price (MP) before discount' }
      ],

      quickTricks: [
        { pct: '10%', action: 'Divide by 10', ex: '10% of 450 = 45' },
        { pct: '20%', action: 'Divide by 5', ex: '20% of 300 = 60' },
        { pct: '25%', action: 'Divide by 4', ex: '25% of 800 = 200' },
        { pct: '50%', action: 'Divide by 2', ex: '50% of 900 = 450' }
      ],

      exampleBox: {
        text: 'Quick Check: 25% of ₹800',
        solution: '800 ÷ 4 = ₹200'
      },

      remember: 'Turning percentages into fractions makes your math 3x faster.'
    },

    /* ===================================================================== */
    /* CARD 4 — STEP-BY-STEP SOLVED EXAMPLE                                  */
    /* ===================================================================== */
    {
      id: 'solved-example',
      cardNumber: 4,
      badge: '04 · EXAMPLE',
      title: 'Step-by-Step Solved Example',
      introText: 'Follow this clean 3-step sequence. Every step is clearly separated.',

      question: 'An item is bought for ₹500 and sold for ₹600. Find the profit percentage.',

      steps: [
        {
          num: 'STEP 1',
          title: 'Find the Profit',
          formula: 'Profit = SP − CP',
          calc: '600 − 500 = ₹100'
        },
        {
          num: 'STEP 2',
          title: 'Pick the Formula',
          formula: 'Profit % = (Profit / CP) × 100',
          calc: 'Put in numbers: (100 / 500) × 100'
        },
        {
          num: 'STEP 3',
          title: 'Calculate',
          formula: '100 / 500 = 1/5',
          calc: '1/5 × 100 = 20%'
        }
      ],

      finalAnswer: 'Profit = 20%',

      comparison: {
        normal: '100 ÷ 500 × 100 = 20%',
        fast: '100 out of 500 is 1/5 → 1/5 is 20%!'
      },

      remember: 'Always check if the answer makes sense: ₹100 is 1/5th of ₹500, which is exactly 20%.'
    },

    /* ===================================================================== */
    /* CARD 5 — DIFFERENT QUESTION FORMS                                     */
    /* ===================================================================== */
    {
      id: 'different-question-forms',
      cardNumber: 5,
      badge: '05 · QUESTION FORMS',
      title: 'Different Question Forms',
      introText: 'Placement tests ask profit and loss in 5 common ways. Here is how to spot each one:',

      formsList: [
        { num: '1', title: 'Direct CP and SP', tip: 'CP = ₹400, SP = ₹480. Find profit %.' },
        { num: '2', title: 'CP + Profit % given', tip: 'CP = ₹500, Profit = 20%. Find SP (500 + 100 = ₹600).' },
        { num: '3', title: 'SP + Profit % given (Reverse)', tip: 'SP = ₹720, Profit = 20%. Find original CP.' },
        { num: '4', title: 'Marked Price & Discount', tip: 'MP = ₹1000, 10% discount. Find SP (₹900).' },
        { num: '5', title: 'Successive Discounts', tip: '20% + 10% discount is 28% total, NOT 30%!' }
      ],

      remember: 'The numbers change, but the 4 basic formulas stay the same.'
    },

    /* ===================================================================== */
    /* CARD 6 — TRICKS & SHORT METHODS                                       */
    /* ===================================================================== */
    {
      id: 'tricks-and-short-methods',
      cardNumber: 6,
      badge: '06 · SHORTCUTS',
      title: 'Tricks & Short Methods',
      introText: 'Use the Ratio Method to solve questions without using big equations.',

      mainTrick: {
        name: 'The Ratio Shortcut (CP : SP)',
        idea: '20% profit means you gain 1 on every 5.',
        breakdown: [
          'CP = 5 units',
          'SP = 6 units (5 + 1 profit)',
          'Ratio CP : SP = 5 : 6'
        ],
        example: 'If SP = ₹600 (6 units), then CP = ₹500 (5 units)! Instantly found!'
      },

      quickList: [
        { rule: '25% Profit', ratio: 'CP : SP = 4 : 5' },
        { rule: '20% Profit', ratio: 'CP : SP = 5 : 6' },
        { rule: '10% Profit', ratio: 'CP : SP = 10 : 11' },
        { rule: '20% Loss', ratio: 'CP : SP = 5 : 4' }
      ],

      remember: 'Convert the percentage to a simple fraction. The denominator is CP, numerator is profit or loss.'
    },

    /* ===================================================================== */
    /* CARD 7 — EXAM-STYLE VARIATIONS                                        */
    /* ===================================================================== */
    {
      id: 'exam-style-variations',
      cardNumber: 7,
      badge: '07 · EXAM QUESTIONS',
      title: 'Exam-Style Variations',
      introText: 'Here is how questions look in actual placement tests. Notice how short and simple the logic is.',

      variations: [
        {
          type: 'Direct Question',
          q: 'A cycle is bought for ₹2,000 and sold for ₹2,400. Find the profit %.',
          a: 'Profit = ₹400. Profit% = (400 / 2000) × 100 = 20%.'
        },
        {
          type: 'Reverse Question',
          q: 'A watch is sold for ₹660 at a profit of 10%. Find the Cost Price.',
          a: '110% of CP = ₹660 → 1% = 6 → CP = ₹600.'
        },
        {
          type: 'Discount + Profit',
          q: 'An item marked at ₹500 is sold at 10% discount. Find the selling price.',
          a: 'Discount = ₹50. SP = 500 − 50 = ₹450.'
        }
      ],

      remember: 'Break long questions into two simple questions: Step 1 then Step 2.'
    },

    /* ===================================================================== */
    /* CARD 8 — COMMON MISTAKES & TRAPS                                      */
    /* ===================================================================== */
    {
      id: 'common-mistakes-traps',
      cardNumber: 8,
      badge: '08 · MISTAKES',
      title: 'Common Mistakes & Traps',
      introText: 'Avoid these 3 common mistakes that lose marks in exams:',

      mistakes: [
        {
          wrong: '❌ Calculating profit % on the Selling Price (SP)',
          correct: '✓ Always calculate profit % on Cost Price (CP).'
        },
        {
          wrong: '❌ Adding two discounts directly: 20% + 10% = 30%',
          correct: '✓ Successive discounts multiply! 20% then 10% gives 28% total.'
        },
        {
          wrong: '❌ Finding CP by subtracting profit % directly from SP',
          correct: '✓ If SP = 600 at 20% profit, CP is NOT 600 − 120. CP is ₹500.'
        }
      ],

      remember: 'CP is always your 100% starting point.'
    },

    /* ===================================================================== */
    /* CARD 9 — SPEED & ACCURACY STRATEGY                                    */
    /* ===================================================================== */
    {
      id: 'speed-accuracy-strategy',
      cardNumber: 9,
      badge: '09 · STRATEGY',
      title: 'Speed & Accuracy Strategy',
      introText: 'Follow this simple 6-step flow when solving any profit and loss question:',

      steps: [
        { step: '1', title: 'Read', tip: 'Read question in 5s' },
        { step: '2', title: 'Spot CP & SP', tip: 'Identify bought vs sold' },
        { step: '3', title: 'Pick Formula', tip: 'Profit or Loss' },
        { step: '4', title: 'Fraction', tip: '25% → 1/4, 20% → 1/5' },
        { step: '5', title: 'Calculate', tip: 'Clean arithmetic' },
        { step: '6', title: 'Check', tip: 'Does answer make sense?' }
      ],

      flowchart: [
        '1. Read Question',
        '2. Spot CP & SP',
        '3. Pick Formula',
        '4. Use Quick Fraction',
        '5. Calculate',
        '6. Quick Check'
      ],

      proTip: '💡 Pro Tip: See 25%? Immediately think 1/4. See 20%? Immediately think 1/5. Avoid doing long division.',

      remember: 'Spend 5 seconds reading carefully before writing. It saves 30 seconds of rework.'
    },

    /* ===================================================================== */
    /* CARD 10 — QUICK REVISION / CHEAT SHEET                                */
    /* ===================================================================== */
    {
      id: 'quick-revision',
      cardNumber: 10,
      badge: '10 · REVISION',
      title: 'Quick Revision / Cheat Sheet',
      introText: 'Read this card in 30 seconds right before your test.',

      fullFormsSummary: 'CP = Cost Price • SP = Selling Price • MP = Marked Price',

      cheatSheet: {
        terms: ['CP = Cost Price', 'SP = Selling Price', 'MP = Marked Price'],
        formulas: [
          'Profit = SP − CP',
          'Loss = CP − SP',
          'Profit % = (Profit / CP) × 100',
          'Discount = MP − SP'
        ],
        shortcuts: [
          '10% → Divide by 10',
          '20% → Divide by 5',
          '25% → Divide by 4',
          '50% → Divide by 2'
        ],
        quickRules: [
          'Bought for → CP',
          'Sold for → SP',
          'Marked at → MP'
        ]
      },

      keyFormulas: [
        'Profit = SP − CP',
        'Loss = CP − SP',
        'Profit % = (Profit / CP) × 100',
        'Discount = MP − SP'
      ],

      quickFacts: [
        '10% → Divide by 10',
        '20% → Divide by 5',
        '25% → Divide by 4',
        '50% → Divide by 2'
      ],

      memoryRules: [
        'Bought for → CP',
        'Sold for → SP',
        'Marked at → MP'
      ],

      goldenRule: 'CP is what you paid. SP is what you got. Profit is on CP.'
    }
  ]
};
