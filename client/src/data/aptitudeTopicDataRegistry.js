/**
 * MASTER APTITUDE TOPIC REGISTRY
 * 
 * Provides topic and category definitions for PathPilot's Aptitude Learning Studio:
 * - 3 Major Categories:
 *   1. Quantitative Aptitude (19 topics)
 *   2. Logical Reasoning (14 topics)
 *   3. Verbal Ability (10 topics)
 * 
 * Prepared with full extensible architecture for the upcoming 10-card learning template.
 */

import { PERCENTAGES_INTRO_DATA } from './aptitudeTopics/percentagesIntroData.js';
import { PROFIT_LOSS_INTRO_DATA } from './aptitudeTopics/profitLossIntroData.js';
import { RATIO_PROPORTION_INTRO_DATA } from './aptitudeTopics/ratioProportionIntroData.js';
import { NUMBER_SYSTEM_INTRO_DATA } from './aptitudeTopics/numberSystemIntroData.js';
import { GEOMETRY_INTRO_DATA } from './aptitudeTopics/geometryIntroData.js';
import { generateAptitude10Cards } from './aptitudeTopics/aptitudeCardsGenerator.js';

export const APTITUDE_CATEGORIES = [
  {
    id: 'quantitative',
    name: 'Quantitative Aptitude',
    shortName: 'Quantitative',
    badge: '19 Topics',
    accentColor: 'indigo',
    description: 'Master fast calculations, commercial arithmetic, algebra, geometry, and data interpretation.'
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    shortName: 'Logical',
    badge: '14 Topics',
    accentColor: 'purple',
    description: 'Build deduction speed, spatial sequencing, coding patterns, and analytical reasoning.'
  },
  {
    id: 'verbal',
    name: 'Verbal Ability',
    shortName: 'Verbal',
    badge: '10 Topics',
    accentColor: 'emerald',
    description: 'Master English grammar mechanics, vocabulary retention, and reading comprehension precision.'
  }
];

export const APTITUDE_TOPIC_REGISTRY = {
  // ==========================================
  // 1. QUANTITATIVE APTITUDE (19 Topics)
  // ==========================================
  'number-system': {
    topicId: 'number-system',
    topicName: 'Number System',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Fundamental',
    questionCount: '35 Problems',
    description: 'Divisibility rules, unit digit calculation, remainder theorems, factors, and prime properties.'
  },
  'hcf-lcm': {
    topicId: 'hcf-lcm',
    topicName: 'HCF & LCM',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Fundamental',
    questionCount: '25 Problems',
    description: 'Prime factorization, prime factor method, bell tolling cycles, and fractional HCF/LCM.'
  },
  'percentages': {
    topicId: 'percentages',
    topicName: 'Percentages',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '40 Problems',
    description: 'Fraction-to-percentage conversion, percentage change, multiplying factors, and successive changes.'
  },
  'profit-and-loss': {
    topicId: 'profit-and-loss',
    topicName: 'Profit & Loss',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '35 Problems',
    description: 'Cost & selling price, markups, successive discounts, false weight tricks, and profit shares.'
  },
  'ratio-and-proportion': {
    topicId: 'ratio-and-proportion',
    topicName: 'Ratio & Proportion',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '30 Problems',
    description: 'Compound ratios, proportion properties, partnership investments, and age distribution problems.'
  },
  'average': {
    topicId: 'average',
    topicName: 'Average',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Fundamental',
    questionCount: '25 Problems',
    description: 'Deviation method, weighted averages, replacement analysis, and batsman bowling averages.'
  },
  'simple-interest': {
    topicId: 'simple-interest',
    topicName: 'Simple Interest',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Fundamental',
    questionCount: '25 Problems',
    description: 'Principal, rate, and time relations, amount doubling periods, and variable interest rates.'
  },
  'compound-interest': {
    topicId: 'compound-interest',
    topicName: 'Compound Interest',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '30 Problems',
    description: 'Annual vs semi-annual compounding, CI vs SI difference formulas, and population growth.'
  },
  'time-and-work': {
    topicId: 'time-and-work',
    topicName: 'Time & Work',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '40 Problems',
    description: 'LCM unit work method, individual efficiency, alternating work shifts, and wage distribution.'
  },
  'pipes-and-cisterns': {
    topicId: 'pipes-and-cisterns',
    topicName: 'Pipes & Cisterns',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '25 Problems',
    description: 'Inlet and outlet flow rates, negative efficiency of leaks, and alternating valve opening.'
  },
  'time-speed-distance': {
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '40 Problems',
    description: 'Unit conversion, average speed harmonic mean, train crossing poles/platforms, and relative motion.'
  },
  'boats-and-streams': {
    topicId: 'boats-and-streams',
    topicName: 'Boats & Streams',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '25 Problems',
    description: 'Upstream and downstream speed formulas, still water velocity, and round-trip river journeys.'
  },
  'mixtures-and-allegations': {
    topicId: 'mixtures-and-allegations',
    topicName: 'Mixtures & Allegations',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Advanced',
    questionCount: '30 Problems',
    description: 'Rule of alligation, cross-method ratio discovery, repeated replacement formula, and liquid dilution.'
  },
  'permutation-and-combination': {
    topicId: 'permutation-and-combination',
    topicName: 'Permutation & Combination',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Advanced',
    questionCount: '35 Problems',
    description: 'Fundamental counting principle, linear vs circular arrangements, selections, and restricted groupings.'
  },
  'probability': {
    topicId: 'probability',
    topicName: 'Probability',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Advanced',
    questionCount: '35 Problems',
    description: 'Sample space, dice and coin outcomes, playing card problems, conditional probability, and union rule.'
  },
  'algebra': {
    topicId: 'algebra',
    topicName: 'Algebra',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '30 Problems',
    description: 'Linear and quadratic equations, algebraic identities, indices & surds, and polynomial factorizations.'
  },
  'geometry': {
    topicId: 'geometry',
    topicName: 'Geometry',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Advanced',
    questionCount: '30 Problems',
    description: 'Lines and angles, triangle congruence & similarity, circle tangents & chords, and polygons.'
  },
  'mensuration': {
    topicId: 'mensuration',
    topicName: 'Mensuration',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '30 Problems',
    description: '2D perimeter & area of polygons/circles, 3D surface area & volume of cylinders, cones, and spheres.'
  },
  'data-interpretation': {
    topicId: 'data-interpretation',
    topicName: 'Data Interpretation',
    categoryKey: 'quantitative',
    category: 'Quantitative Aptitude',
    level: 'Core Pattern',
    questionCount: '40 Problems',
    description: 'Bar charts, pie charts, line graphs, tabular data sets, and radar graphs for placement screening.'
  },

  // ==========================================
  // 2. LOGICAL REASONING (14 Topics)
  // ==========================================
  'number-series': {
    topicId: 'number-series',
    topicName: 'Number Series',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Fundamental',
    questionCount: '30 Problems',
    description: 'Arithmetic progressions, difference of differences, prime patterns, and alternating sequence logic.'
  },
  'letter-series': {
    topicId: 'letter-series',
    topicName: 'Letter Series',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Fundamental',
    questionCount: '25 Problems',
    description: 'Alphabet index positions (A=1, Z=26), reverse positions, step skipping, and repeated letter chunks.'
  },
  'coding-decoding': {
    topicId: 'coding-decoding',
    topicName: 'Coding-Decoding',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Core Pattern',
    questionCount: '30 Problems',
    description: 'Letter shifting, reverse coding, symbol substitution, matrix coding, and deciphering message keys.'
  },
  'blood-relations': {
    topicId: 'blood-relations',
    topicName: 'Blood Relations',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Core Pattern',
    questionCount: '30 Problems',
    description: 'Generation family trees, direct statements, pointing relations, and coded symbols (A + B means A is father).'
  },
  'direction-sense': {
    topicId: 'direction-sense',
    topicName: 'Direction Sense',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Fundamental',
    questionCount: '25 Problems',
    description: 'Cardinal and ordinal directions, left/right turns, Pythagoras theorem distance, and shadow tracking.'
  },
  'syllogism': {
    topicId: 'syllogism',
    topicName: 'Syllogism',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Core Pattern',
    questionCount: '35 Problems',
    description: 'Venn diagram approach, universal vs particular premises, "Some A are B", and possibility conclusions.'
  },
  'analogy': {
    topicId: 'analogy',
    topicName: 'Analogy',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Fundamental',
    questionCount: '25 Problems',
    description: 'Semantic word pairs, numerical analogies, letter-based associations, and relationship deduction.'
  },
  'classification': {
    topicId: 'classification',
    topicName: 'Classification',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Fundamental',
    questionCount: '20 Problems',
    description: 'Odd one out discovery across word groups, numerical properties, alphabet positions, and pair patterns.'
  },
  'ranking': {
    topicId: 'ranking',
    topicName: 'Ranking',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Core Pattern',
    questionCount: '25 Problems',
    description: 'Row positions from top/bottom and left/right, total count formula: (L + R - 1), and overlapping rankings.'
  },
  'seating-arrangement': {
    topicId: 'seating-arrangement',
    topicName: 'Seating Arrangement',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Advanced',
    questionCount: '35 Problems',
    description: 'Linear row arrangements (facing North/South), circular tables (facing center/outside), and parallel rows.'
  },
  'puzzles': {
    topicId: 'puzzles',
    topicName: 'Puzzles',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Advanced',
    questionCount: '35 Problems',
    description: 'Floor puzzles, day/month scheduling grids, box stacking, and multi-attribute grid matching.'
  },
  'statement-and-conclusion': {
    topicId: 'statement-and-conclusion',
    topicName: 'Statement & Conclusion',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Core Pattern',
    questionCount: '25 Problems',
    description: 'Evaluating deductive validity, direct implications, avoiding unwarranted assumptions in conclusions.'
  },
  'statement-and-assumption': {
    topicId: 'statement-and-assumption',
    topicName: 'Statement & Assumption',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Core Pattern',
    questionCount: '25 Problems',
    description: 'Unstated premises, speaker intent, implicit assumptions, and necessary conditions.'
  },
  'data-sufficiency': {
    topicId: 'data-sufficiency',
    topicName: 'Data Sufficiency',
    categoryKey: 'logical',
    category: 'Logical Reasoning',
    level: 'Advanced',
    questionCount: '30 Problems',
    description: 'Evaluating whether Statement (1) alone, Statement (2) alone, or both combined are sufficient to answer.'
  },

  // ==========================================
  // 3. VERBAL ABILITY (10 Topics)
  // ==========================================
  'grammar': {
    topicId: 'grammar',
    topicName: 'Grammar',
    categoryKey: 'verbal',
    category: 'Verbal Ability',
    level: 'Fundamental',
    questionCount: '30 Problems',
    description: 'Parts of speech, subject-verb agreement, tense consistency, modifiers, and parallelism rules.'
  },
  'error-detection': {
    topicId: 'error-detection',
    topicName: 'Error Detection',
    categoryKey: 'verbal',
    category: 'Verbal Ability',
    level: 'Core Pattern',
    questionCount: '35 Problems',
    description: 'Spotting grammatical discrepancies, preposition misuse, pronoun-antecedent agreement, and idioms.'
  },
  'sentence-correction': {
    topicId: 'sentence-correction',
    topicName: 'Sentence Correction',
    categoryKey: 'verbal',
    category: 'Verbal Ability',
    level: 'Core Pattern',
    questionCount: '35 Problems',
    description: 'Choosing concise, grammatically sound phrasing, eliminating redundancy, and correcting dangling modifiers.'
  },
  'fill-in-the-blanks': {
    topicId: 'fill-in-the-blanks',
    topicName: 'Fill in the Blanks',
    categoryKey: 'verbal',
    category: 'Verbal Ability',
    level: 'Fundamental',
    questionCount: '30 Problems',
    description: 'Single and double blank contextual vocabulary, collocations, transition words, and tone matching.'
  },
  'synonyms': {
    topicId: 'synonyms',
    topicName: 'Synonyms',
    categoryKey: 'verbal',
    category: 'Verbal Ability',
    level: 'Fundamental',
    questionCount: '40 Problems',
    description: 'High-frequency placement vocabulary, contextual synonyms, tone nuances, and root word associations.'
  },
  'antonyms': {
    topicId: 'antonyms',
    topicName: 'Antonyms',
    categoryKey: 'verbal',
    category: 'Verbal Ability',
    level: 'Fundamental',
    questionCount: '40 Problems',
    description: 'Direct opposite meanings, negative prefix prefixes (un-, in-, dis-), and secondary word connotations.'
  },
  'vocabulary': {
    topicId: 'vocabulary',
    topicName: 'Vocabulary',
    categoryKey: 'verbal',
    category: 'Verbal Ability',
    level: 'Core Pattern',
    questionCount: '35 Problems',
    description: 'Greek & Latin root words, prefixes, suffixes, idiomatic expressions, and common confusing word pairs.'
  },
  'sentence-rearrangement': {
    topicId: 'sentence-rearrangement',
    topicName: 'Sentence Rearrangement',
    categoryKey: 'verbal',
    category: 'Verbal Ability',
    level: 'Core Pattern',
    questionCount: '25 Problems',
    description: 'Chronological cues, pronoun antecedents, introductory sentence identification, and transitional links.'
  },
  'reading-comprehension': {
    topicId: 'reading-comprehension',
    topicName: 'Reading Comprehension',
    categoryKey: 'verbal',
    category: 'Verbal Ability',
    level: 'Advanced',
    questionCount: '30 Problems',
    description: 'Central idea extraction, tone identification, inference questions, and rapid skim-and-scan techniques.'
  },
  'para-jumbles': {
    topicId: 'para-jumbles',
    topicName: 'Para Jumbles',
    categoryKey: 'verbal',
    category: 'Verbal Ability',
    level: 'Advanced',
    questionCount: '30 Problems',
    description: 'Finding mandatory sentence pairs, acronym-to-full-form sequences, and conclusion sentence placement.'
  }
};

// Map of topics with custom handcrafted deep 10-card data
const HANDCRAFTED_INTRO_DATA = {
  'geometry': GEOMETRY_INTRO_DATA,
  'number-system': NUMBER_SYSTEM_INTRO_DATA,
  'percentages': PERCENTAGES_INTRO_DATA,
  'profit-and-loss': PROFIT_LOSS_INTRO_DATA,
  'ratio-and-proportion': RATIO_PROPORTION_INTRO_DATA
};

// Hydrate all topics with their 10-card educational data
Object.keys(APTITUDE_TOPIC_REGISTRY).forEach((id) => {
  const topic = APTITUDE_TOPIC_REGISTRY[id];
  const introData = HANDCRAFTED_INTRO_DATA[id] || generateAptitude10Cards(topic);
  topic.introData = introData;
  topic.cards = introData.cards;
});

/**
 * Returns list of topics belonging to a specific category.
 */
export function getTopicsByCategory(categoryKey = 'quantitative') {
  return Object.values(APTITUDE_TOPIC_REGISTRY).filter(
    (t) => t.categoryKey === categoryKey
  );
}

/**
 * Returns topic metadata by topicId with fallback to 'percentages'.
 */
export function getAptitudeTopic(topicId = 'percentages') {
  return APTITUDE_TOPIC_REGISTRY[topicId] || APTITUDE_TOPIC_REGISTRY['percentages'];
}
