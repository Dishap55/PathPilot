// src/data/aptitudeExamplesRegistry.js
// Registry of problem examples for each Aptitude topic.
// Structure: { [topicId]: [{ id, title, question, given, find, formula, steps, answer, fastMethod, takeaway, visual }]

export const APTITUDE_EXAMPLES = {
  profit_and_loss: [
    {
      id: 'pnl1',
      title: 'Profit Percentage Example',
      question: 'A shopkeeper buys a mobile for ₹8,000 and sells it for ₹9,600. Find the profit percentage.',
      given: { cp: '₹8,000', sp: '₹9,600' },
      find: 'Profit Percentage',
      formula: 'Profit % = (Profit / CP) × 100',
      steps: [
        { heading: 'Find the Profit', expression: 'Profit = SP − CP', calculation: '₹9,600 − ₹8,000 = ₹1,600' },
        { heading: 'Apply the Formula', expression: 'Profit % = (Profit / CP) × 100', calculation: '' },
        { heading: 'Calculate', expression: 'Profit % = (1,600 / 8,000) × 100', calculation: '20%' }
      ],
      answer: '20%',
      fastMethod: {
        explanation: 'Convert CP:SP ratio to simplest form and compare the difference.',
        computation: '8000 : 9600 = 5 : 6 → Difference = 1 → Profit % = 1/5 × 100 = 20%'
      },
      takeaway: 'Profit % can be found quickly by reducing CP:SP ratio and using the difference.',
      visual: 'profit_loss_visual'
    }
  ],
  percentages: [
    {
      id: 'pct1',
      title: 'Basic Percentage',
      question: 'What is 25% of 200?',
      given: { base: '200', percent: '25%' },
      find: 'Result',
      formula: 'Result = (Percent × Base) / 100',
      steps: [
        { heading: 'Plug values', expression: 'Result = (25 × 200) / 100', calculation: '' },
        { heading: 'Calculate', expression: '', calculation: '50' }
      ],
      answer: '50',
      fastMethod: { explanation: '25% is 1/4 of the number.', computation: '200 ÷ 4 = 50' },
      takeaway: 'Remember common fractions for quick percentages.',
      visual: 'percentage_visual'
    }
  ]
};

export const getExamplesByTopic = (topicId) => APTITUDE_EXAMPLES[topicId] || [];
