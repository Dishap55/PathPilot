/**
 * GEOMETRY 10-CARD LEARNING CONTENT (BEGINNER-FRIENDLY & CONCISE)
 * Follows the friendly teacher philosophy:
 * Less text • Simple English • Real formulas • Zero internal card scrolling
 */

export const GEOMETRY_INTRO_DATA = {
  topicId: 'geometry',
  topicName: 'Geometry',
  category: 'Quantitative Aptitude',
  subtitle: 'Learn shapes, areas, perimeters, angles, and quick calculation tricks for exams.',

  fullForms: [
    { abbr: 'L', full: 'Length', desc: 'Longer side of a rectangle or shape.' },
    { abbr: 'W / B', full: 'Width / Base', desc: 'Shorter side or bottom base line.' },
    { abbr: 'H', full: 'Height', desc: 'Vertical height perpendicular to base.' },
    { abbr: 'r', full: 'Radius', desc: 'Distance from circle center to edge.' }
  ],

  cards: [
    /* ===================================================================== */
    /* CARD 1 — WHAT IS GEOMETRY?                                            */
    /* ===================================================================== */
    {
      id: 'what-is-geometry',
      cardNumber: 1,
      badge: '01 · BASIC IDEA',
      title: 'What is Geometry?',
      introText: 'Geometry is the study of shapes, sizes and positions. It helps us solve questions about angles, triangles, circles and areas.',

      importantTerms: [
        { term: 'Angle', meaning: 'The space between two intersecting lines.' },
        { term: 'Triangle', meaning: 'A flat shape with 3 sides and 3 angles.' },
        { term: 'Area', meaning: 'The flat space inside a shape (square units).' }
      ],

      realLifeExample: {
        title: 'Floor Tiles Example',
        buy: 'A room floor is 5 m long and 4 m wide.',
        sell: 'Area = 5 × 4',
        result: 'Total Floor Area = 20 m²'
      },

      whyLearnIt: [
        'Common in campus placement tests (TCS, Infosys, Cognizant).',
        'Helps you solve shape, boundary, and room measurement questions.'
      ],

      visualType: 'geometry_rectangle',
      remember: 'Area is the space INSIDE a shape. Perimeter is the BOUNDARY around it.'
    },

    /* ===================================================================== */
    /* CARD 2 — IMPORTANT FORMULAS                                           */
    /* ===================================================================== */
    {
      id: 'important-formulas',
      cardNumber: 2,
      badge: '02 · FORMULAS',
      title: 'Important Formulas',
      introText: 'The core shape formulas you will use in almost every question:',

      formulaBoxes: [
        { name: 'Area of Rectangle', formula: 'Area = Length × Width', when: 'L × W' },
        { name: 'Area of Triangle', formula: 'Area = ½ × Base × Height', when: '½ × B × H' },
        { name: 'Perimeter of Rectangle', formula: 'Perimeter = 2(Length + Width)', when: '2(L + W)' },
        { name: 'Area of Circle', formula: 'Area = πr²', when: 'π ≈ 22/7' }
      ],

      whatIsGiven: [
        { given: 'Length + Width', action: 'Multiply to find Rectangle Area' },
        { given: 'Base + Height', action: 'Multiply and halve to find Triangle Area' },
        { given: 'Circle Radius (r)', action: 'Square radius and multiply by π' }
      ],

      remember: 'Always check if units match (meters with meters, cm with cm).'
    },

    /* ===================================================================== */
    /* CARD 3 — QUESTION RECOGNITION & QUICK TRICKS                          */
    /* ===================================================================== */
    {
      id: 'question-recognition-tricks',
      cardNumber: 3,
      badge: '03 · RECOGNITION',
      title: 'Question Recognition & Quick Tricks',
      introText: 'Spot the question type instantly using simple keyword triggers:',

      clues: [
        { word: '"Area" or "Flooring / Painting"', meaning: 'Find space inside (L × W or ½ B × H)' },
        { word: '"Perimeter" or "Fencing / Wire"', meaning: 'Find outer boundary distance' },
        { word: '"Diameter"', meaning: 'Full distance across circle (2 × radius)' }
      ],

      quickTricks: [
        { pct: 'Square Area', action: 'side × side', ex: 'Side 5 → 25' },
        { pct: 'Triangle Area', action: 'Half of (B × H)', ex: 'Base 8, Height 6 → 24' }
      ],

      exampleBox: {
        text: 'Quick Check: Rectangle 6 cm × 4 cm',
        solution: 'Area = 6 × 4 = 24 cm²'
      },

      remember: '"Painting a wall" means Area. "Fencing a garden" means Perimeter.'
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

      question: 'A rectangle is 8 cm long and 5 cm wide. Find its area.',

      steps: [
        {
          num: 'STEP 1',
          title: 'Write the Formula',
          formula: 'Area = Length × Width',
          calc: 'L = 8 cm, W = 5 cm'
        },
        {
          num: 'STEP 2',
          title: 'Put the Values',
          formula: 'Area = 8 × 5',
          calc: 'Multiply the length and width'
        },
        {
          num: 'STEP 3',
          title: 'Calculate',
          formula: '8 × 5 = 40',
          calc: 'Area = 40 cm²'
        }
      ],

      finalAnswer: 'Area = 40 cm²',

      comparison: {
        normal: 'Formula: L × W = 8 × 5 = 40 cm²',
        fast: '8 × 5 = 40 cm² (Instant mental math!)'
      },

      remember: 'Never forget to write square units (cm² or m²) for area.'
    },

    /* ===================================================================== */
    /* CARD 5 — DIFFERENT QUESTION FORMS                                     */
    /* ===================================================================== */
    {
      id: 'different-question-forms',
      cardNumber: 5,
      badge: '05 · QUESTION FORMS',
      title: 'Different Question Forms',
      introText: 'The 5 most common geometry question types in placement tests:',

      formsList: [
        { num: '1', title: 'Length + Width given', tip: 'Multiply directly to find the rectangle area.' },
        { num: '2', title: 'Area given (Reverse)', tip: 'Divide Area by Width to find the missing Length.' },
        { num: '3', title: 'Perimeter given', tip: 'Use Perimeter = 2(L + W) to find a missing side.' },
        { num: '4', title: 'Triangle Base + Height', tip: 'Multiply base and height, then divide by 2.' },
        { num: '5', title: 'Circle Radius', tip: 'Use Area = πr² (use 22/7 for π).' }
      ],

      remember: 'Different shapes, but each has only ONE simple area rule.'
    },

    /* ===================================================================== */
    /* CARD 6 — TRICKS & SHORT METHODS                                       */
    /* ===================================================================== */
    {
      id: 'tricks-and-short-methods',
      cardNumber: 6,
      badge: '06 · SHORTCUTS',
      title: 'Tricks & Short Methods',
      introText: 'Quick shortcuts to save time during timed exams:',

      mainTrick: {
        name: 'The Square Shortcut',
        idea: 'For a square, all sides are equal. Just multiply the side by itself.',
        breakdown: [
          'Side = 5 cm',
          'Area = side × side = 5 × 5',
          'Area = 25 cm²'
        ],
        example: 'If side = 6 cm, Area = 6² = 36 cm² instantly!'
      },

      quickTricks: [
        { pct: 'Square', action: 'side²', ex: 'side 7 → 49 cm²' },
        { pct: 'Right Triangle', action: '½ × a × b', ex: 'Legs 6, 8 → 24 cm²' }
      ],

      remember: 'A square is just a rectangle where Length = Width.'
    },

    /* ===================================================================== */
    /* CARD 7 — EXAM-STYLE VARIATIONS                                        */
    /* ===================================================================== */
    {
      id: 'exam-style-variations',
      cardNumber: 7,
      badge: '07 · EXAM PATTERNS',
      title: 'Exam-Style Question Variations',
      introText: '"The wording changes, but the concept is the same." Look at these 3 forms:',

      variations: [
        {
          type: 'Direct Form',
          question: 'Length = 10 m, Width = 6 m. Find area.',
          solution: 'Area = 10 × 6 = 60 m²'
        },
        {
          type: 'Reverse Form',
          question: 'Area = 48 cm², Width = 6 cm. Find length.',
          solution: 'Length = 48 ÷ 6 = 8 cm'
        },
        {
          type: 'Compare Areas',
          question: 'Compare a 4×4 square with a 5×3 rectangle.',
          solution: 'Square = 16, Rectangle = 15. Square is larger!'
        }
      ],

      remember: 'Examiners change the story, but the formula stays identical.'
    },

    /* ===================================================================== */
    /* CARD 8 — COMMON MISTAKES & TRAPS                                      */
    /* ===================================================================== */
    {
      id: 'common-mistakes-traps',
      cardNumber: 8,
      badge: '08 · TRAPS TO AVOID',
      title: 'Common Mistakes & Traps',
      introText: 'Avoid these 2 classic mistakes that cost negative marks:',

      mistakes: [
        {
          trap: 'Confusing Area and Perimeter',
          wrong: '❌ Treating perimeter like area',
          correct: '✓ Area = inside space (m²). Perimeter = boundary distance (m).'
        },
        {
          trap: 'Forgetting Square Units',
          wrong: '❌ Writing 40 cm for area',
          correct: '✓ Area is ALWAYS in square units: cm² or m².'
        },
        {
          trap: 'Forgetting ½ in Triangle Area',
          wrong: '❌ Triangle Area = Base × Height',
          correct: '✓ Triangle Area = ½ × Base × Height.'
        }
      ],

      remember: 'Area = square units (cm²). Perimeter = normal units (cm).'
    },

    /* ===================================================================== */
    /* CARD 9 — SPEED & ACCURACY STRATEGY                                    */
    /* ===================================================================== */
    {
      id: 'speed-accuracy-strategy',
      cardNumber: 9,
      badge: '09 · SPEED STRATEGY',
      title: 'Speed & Accuracy Strategy',
      introText: 'Follow this simple 6-step flow when solving any geometry question:',

      steps: [
        { step: '1', title: 'Read', tip: 'Read question in 5s' },
        { step: '2', title: 'Identify Shape', tip: 'Rectangle, Triangle, Circle' },
        { step: '3', title: 'Find Given', tip: 'Length, Width, Radius' },
        { step: '4', title: 'Choose Formula', tip: 'Area vs Perimeter' },
        { step: '5', title: 'Calculate', tip: 'Multiply values' },
        { step: '6', title: 'Check Unit', tip: 'cm² or m²' }
      ],

      proTip: '💡 Pro Tip: Sketch a quick 2-second shape on paper with dimensions. It prevents 90% of silly mistakes!',

      remember: 'Identify the shape first, then pick the formula.'
    },

    /* ===================================================================== */
    /* CARD 10 — QUICK REVISION / CHEAT SHEET                                */
    /* ===================================================================== */
    {
      id: 'quick-revision',
      cardNumber: 10,
      badge: '10 · CHEAT SHEET',
      title: 'Quick Revision / Cheat Sheet',
      introText: 'Revise these core geometry facts in under 60 seconds:',

      cheatSheet: {
        terms: ['L = Length', 'W = Width', 'B = Base', 'H = Height', 'r = Radius'],
        formulas: [
          'Rectangle Area = L × W',
          'Rectangle Perimeter = 2(L + W)',
          'Triangle Area = ½ × B × H',
          'Square Area = side²',
          'Circle Area = πr²'
        ],
        shortcuts: [
          'Square: side²',
          'Right Triangle: ½ × legs',
          'Diameter: 2 × radius'
        ],
        quickRules: [
          'Area = space inside (square units)',
          'Perimeter = outer boundary (normal units)',
          'Check that all units match before multiplying'
        ]
      },

      remember: 'Area is inside space (cm²). Perimeter is outer boundary (cm).'
    }
  ]
};
