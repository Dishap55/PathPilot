/**
 * TIME, SPEED & DISTANCE — PRACTICE QUESTION BANK
 * 
 * Placement-Focused Question Bank for PathPilot Aptitude Module
 * Total: 38 Hand-Crafted, Non-Repetitive Questions
 * 
 * Difficulty Distribution:
 * - Level 1 (Basic): 10 Questions
 * - Level 2 (Easy Placement): 10 Questions
 * - Level 3 (Medium): 10 Questions
 * - Level 4 (Placement Standard): 5 Questions
 * - Level 5 (Hard / Speed Challenge): 3 Questions
 * 
 * Company Attribution:
 * - Evidence-based tags for TCS NQT, Cognizant, Wipro, Capgemini, Accenture, HCLTech, Infosys
 * - Clearly distinguishes reported patterns from original PathPilot variants.
 */

export const TIME_SPEED_DISTANCE_QUESTIONS = [
  // =========================================================================
  // LEVEL 1: BASIC (10 Questions)
  // =========================================================================
  {
    id: 'tsd_q01',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Basic Distance Calculation',
    prompt: 'A car travels at a steady speed of 65 km/h for 4 hours. What is the total distance traveled?',
    options: [
      { id: 'A', text: '240 km' },
      { id: 'B', text: '260 km' },
      { id: 'C', text: '270 km' },
      { id: 'D', text: '280 km' }
    ],
    correctOption: 'B',
    difficulty: 'Basic',
    difficultyLevel: 1,
    pattern: 'Basic D = S × T',
    estimatedTime: '30 sec',
    companyTags: ['TCS', 'Wipro'],
    companyAttribution: 'PathPilot Practice — based on reported TCS NQT pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'TCS',
      basedOnPattern: 'Basic speed-distance-time multiplication'
    },
    hints: [
      'Hint 1: Use the fundamental formula: Distance = Speed × Time.',
      'Hint 2: Multiply 65 by 4 directly: 65 × 4 = 260.'
    ],
    explanation: {
      step1: 'Identify given parameters: Speed (S) = 65 km/h, Time (T) = 4 hours.',
      step2: 'Apply Distance formula: Distance = Speed × Time = 65 × 4 = 260 km.',
      summary: '260 km',
      formula: 'Distance = Speed × Time',
      quickTip: 'Double 65 to get 130, then double again to get 260!'
    }
  },
  {
    id: 'tsd_q02',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Basic Time Calculation',
    prompt: 'A bus covers a distance of 360 km at a constant speed of 45 km/h. How many hours does the journey take?',
    options: [
      { id: 'A', text: '7 hours' },
      { id: 'B', text: '7.5 hours' },
      { id: 'C', text: '8 hours' },
      { id: 'D', text: '8.5 hours' }
    ],
    correctOption: 'C',
    difficulty: 'Basic',
    difficultyLevel: 1,
    pattern: 'Basic D = S × T',
    estimatedTime: '30 sec',
    companyTags: ['Cognizant', 'HCLTech'],
    companyAttribution: 'PathPilot Practice — based on reported Cognizant pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'Cognizant',
      basedOnPattern: 'Time division benchmark'
    },
    hints: [
      'Hint 1: Time = Distance ÷ Speed.',
      'Hint 2: 360 ÷ 45 = 8.'
    ],
    explanation: {
      step1: 'Given: Distance = 360 km, Speed = 45 km/h.',
      step2: 'Time = Distance ÷ Speed = 360 ÷ 45 = 8 hours.',
      summary: '8 hours',
      formula: 'Time = Distance ÷ Speed',
      quickTip: 'Think: 45 × 2 = 90. 360 has four 90s, so 4 × 2 = 8 hours!'
    }
  },
  {
    id: 'tsd_q03',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Basic Speed Calculation',
    prompt: 'A train covers 450 km in 6 hours. What is its average speed in km/h?',
    options: [
      { id: 'A', text: '70 km/h' },
      { id: 'B', text: '75 km/h' },
      { id: 'C', text: '80 km/h' },
      { id: 'D', text: '85 km/h' }
    ],
    correctOption: 'B',
    difficulty: 'Basic',
    difficultyLevel: 1,
    pattern: 'Basic D = S × T',
    estimatedTime: '30 sec',
    companyTags: ['Capgemini'],
    companyAttribution: 'PathPilot Practice — based on reported Capgemini pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'Capgemini',
      basedOnPattern: 'Speed discovery'
    },
    hints: [
      'Hint 1: Speed = Total Distance ÷ Total Time.',
      'Hint 2: Divide 450 by 6.'
    ],
    explanation: {
      step1: 'Given Distance = 450 km, Time = 6 hours.',
      step2: 'Speed = 450 ÷ 6 = 75 km/h.',
      summary: '75 km/h',
      formula: 'Speed = Distance ÷ Time',
      quickTip: '450 ÷ 6 = (300 ÷ 6) + (150 ÷ 6) = 50 + 25 = 75 km/h.'
    }
  },
  {
    id: 'tsd_q04',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Converting km/h to m/s',
    prompt: 'An athlete runs at a speed of 36 km/h. What is the speed in meters per second (m/s)?',
    options: [
      { id: 'A', text: '8 m/s' },
      { id: 'B', text: '10 m/s' },
      { id: 'C', text: '12 m/s' },
      { id: 'D', text: '15 m/s' }
    ],
    correctOption: 'B',
    difficulty: 'Basic',
    difficultyLevel: 1,
    pattern: 'Unit Conversion',
    estimatedTime: '25 sec',
    companyTags: ['TCS', 'Accenture'],
    companyAttribution: 'PathPilot Practice — based on reported TCS NQT pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'TCS',
      basedOnPattern: 'km/h to m/s conversion'
    },
    hints: [
      'Hint 1: Multiply km/h by 5/18 to get m/s.',
      'Hint 2: 36 × (5/18) = 2 × 5 = 10.'
    ],
    explanation: {
      step1: 'Formula: Speed (m/s) = Speed (km/h) × 5/18.',
      step2: '36 × (5/18) = 2 × 5 = 10 m/s.',
      summary: '10 m/s',
      formula: 'm/s = km/h × 5/18',
      quickTip: 'Every multiple of 18 km/h is 5 m/s. 18 = 5 m/s, 36 = 10 m/s, 54 = 15 m/s, 72 = 20 m/s!'
    }
  },
  {
    id: 'tsd_q05',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Converting m/s to km/h',
    prompt: 'A cyclist moves at 25 m/s. What is this speed in km/h?',
    options: [
      { id: 'A', text: '75 km/h' },
      { id: 'B', text: '80 km/h' },
      { id: 'C', text: '90 km/h' },
      { id: 'D', text: '95 km/h' }
    ],
    correctOption: 'C',
    difficulty: 'Basic',
    difficultyLevel: 1,
    pattern: 'Unit Conversion',
    estimatedTime: '25 sec',
    companyTags: ['Wipro'],
    companyAttribution: 'PathPilot Practice — based on reported Wipro pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'Wipro',
      basedOnPattern: 'm/s to km/h conversion'
    },
    hints: [
      'Hint 1: Multiply m/s by 18/5 to get km/h.',
      'Hint 2: 25 × (18/5) = 5 × 18 = 90.'
    ],
    explanation: {
      step1: 'Formula: Speed (km/h) = Speed (m/s) × 18/5.',
      step2: '25 × (18/5) = 5 × 18 = 90 km/h.',
      summary: '90 km/h',
      formula: 'km/h = m/s × 18/5',
      quickTip: 'Since 5 m/s = 18 km/h, 25 m/s is 5 times that: 5 × 18 = 90 km/h!'
    }
  },
  {
    id: 'tsd_q06',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Time in Minutes with Speed in km/h',
    prompt: 'A car drives at 60 km/h for 45 minutes. How many kilometers does it cover?',
    options: [
      { id: 'A', text: '40 km' },
      { id: 'B', text: '45 km' },
      { id: 'C', text: '50 km' },
      { id: 'D', text: '55 km' }
    ],
    correctOption: 'B',
    difficulty: 'Basic',
    difficultyLevel: 1,
    pattern: 'Unit Conversion',
    estimatedTime: '30 sec',
    companyTags: ['Cognizant'],
    companyAttribution: 'PathPilot Practice — based on reported Cognizant pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'Cognizant',
      basedOnPattern: 'Minutes conversion'
    },
    hints: [
      'Hint 1: First convert 45 minutes to hours: 45/60 = 3/4 hours.',
      'Hint 2: Multiply 60 × (3/4) = 45 km.'
    ],
    explanation: {
      step1: 'Time in hours = 45 ÷ 60 = 3/4 hour.',
      step2: 'Distance = Speed × Time = 60 × (3/4) = 45 km.',
      summary: '45 km',
      formula: 'Distance = Speed × (Minutes / 60)',
      quickTip: 'At 60 km/h, the car covers exactly 1 km every minute! So in 45 minutes it covers 45 km.'
    }
  },
  {
    id: 'tsd_q07',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Speed in Meters per Minute',
    prompt: 'A person walks 1,200 meters in 10 minutes. What is their speed in km/h?',
    options: [
      { id: 'A', text: '6.4 km/h' },
      { id: 'B', text: '7.2 km/h' },
      { id: 'C', text: '8.0 km/h' },
      { id: 'D', text: '8.4 km/h' }
    ],
    correctOption: 'B',
    difficulty: 'Basic',
    difficultyLevel: 1,
    pattern: 'Unit Conversion',
    estimatedTime: '40 sec',
    companyTags: ['TCS', 'HCLTech'],
    companyAttribution: 'PathPilot Practice — based on reported TCS NQT pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'TCS',
      basedOnPattern: 'Compound unit conversion'
    },
    hints: [
      'Hint 1: Find speed in m/s first: 1200 m in (10 × 60 = 600 s).',
      'Hint 2: Speed = 1200 / 600 = 2 m/s. Then multiply by 18/5.'
    ],
    explanation: {
      step1: 'Time in seconds = 10 × 60 = 600 seconds.',
      step2: 'Speed in m/s = 1200 ÷ 600 = 2 m/s.',
      step3: 'Speed in km/h = 2 × (18/5) = 36/5 = 7.2 km/h.',
      summary: '7.2 km/h',
      formula: 'Speed (km/h) = (Meters / Seconds) × 18/5',
      quickTip: '1200 m in 10 min = 120 m/min. In 60 min (1 hr), distance = 120 × 60 = 7,200 m = 7.2 km.'
    }
  },
  {
    id: 'tsd_q08',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Comparing Speeds in Different Units',
    prompt: 'Vehicle A travels at 72 km/h, while Vehicle B travels at 22 m/s. Which vehicle is faster and by how much in m/s?',
    options: [
      { id: 'A', text: 'Vehicle A is faster by 2 m/s' },
      { id: 'B', text: 'Vehicle B is faster by 2 m/s' },
      { id: 'C', text: 'Both have equal speeds' },
      { id: 'D', text: 'Vehicle B is faster by 4 m/s' }
    ],
    correctOption: 'B',
    difficulty: 'Basic',
    difficultyLevel: 1,
    pattern: 'Unit Conversion',
    estimatedTime: '35 sec',
    companyTags: ['Accenture'],
    companyAttribution: 'PathPilot Practice — based on reported Accenture pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'Accenture',
      basedOnPattern: 'Speed comparison'
    },
    hints: [
      'Hint 1: Convert Vehicle A speed to m/s: 72 × 5/18.',
      'Hint 2: 72 × 5/18 = 20 m/s. Compare 20 m/s with 22 m/s.'
    ],
    explanation: {
      step1: 'Speed of Vehicle A = 72 × (5/18) = 20 m/s.',
      step2: 'Speed of Vehicle B = 22 m/s.',
      step3: 'Vehicle B is faster by 22 − 20 = 2 m/s.',
      summary: 'Vehicle B is faster by 2 m/s',
      formula: 'Compare after converting both to m/s',
      quickTip: 'Always convert both speeds to the same unit before comparing.'
    }
  },
  {
    id: 'tsd_q09',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Track Race Time',
    prompt: 'A runner sprints around a 400-meter circular track at a speed of 8 m/s. How many seconds does one full lap take?',
    options: [
      { id: 'A', text: '45 seconds' },
      { id: 'B', text: '50 seconds' },
      { id: 'C', text: '55 seconds' },
      { id: 'D', text: '60 seconds' }
    ],
    correctOption: 'B',
    difficulty: 'Basic',
    difficultyLevel: 1,
    pattern: 'Basic D = S × T',
    estimatedTime: '25 sec',
    companyTags: ['Capgemini', 'Wipro'],
    companyAttribution: 'PathPilot Practice — based on reported Capgemini pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'Capgemini',
      basedOnPattern: 'Lap time calculation'
    },
    hints: [
      'Hint 1: Time = Distance ÷ Speed.',
      'Hint 2: 400 ÷ 8 = 50 seconds.'
    ],
    explanation: {
      step1: 'Distance = 400 m, Speed = 8 m/s.',
      step2: 'Time = 400 ÷ 8 = 50 seconds.',
      summary: '50 seconds',
      formula: 'Time = Distance ÷ Speed',
      quickTip: '400 ÷ 8 = (40 ÷ 8) × 10 = 5 × 10 = 50.'
    }
  },
  {
    id: 'tsd_q10',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Distance in Seconds with km/h Speed',
    prompt: 'A motorcycle moves at 54 km/h. How many meters does it cover in 15 seconds?',
    options: [
      { id: 'A', text: '200 meters' },
      { id: 'B', text: '215 meters' },
      { id: 'C', text: '225 meters' },
      { id: 'D', text: '250 meters' }
    ],
    correctOption: 'C',
    difficulty: 'Basic',
    difficultyLevel: 1,
    pattern: 'Unit Conversion',
    estimatedTime: '30 sec',
    companyTags: ['TCS'],
    companyAttribution: 'PathPilot Practice — based on reported TCS NQT pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'TCS',
      basedOnPattern: 'Seconds distance calculation'
    },
    hints: [
      'Hint 1: Convert 54 km/h to m/s: 54 × 5/18 = 15 m/s.',
      'Hint 2: Distance = Speed in m/s × seconds = 15 × 15.'
    ],
    explanation: {
      step1: 'Speed in m/s = 54 × (5/18) = 15 m/s.',
      step2: 'Distance in 15 seconds = 15 m/s × 15 s = 225 meters.',
      summary: '225 meters',
      formula: 'Distance = (km/h × 5/18) × Seconds',
      quickTip: '15 × 15 is 15² = 225!'
    }
  },

  // =========================================================================
  // LEVEL 2: EASY PLACEMENT (10 Questions)
  // =========================================================================
  {
    id: 'tsd_q11',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Two-Stage Journey with Variable Speed',
    prompt: 'A traveler drives for 2 hours at 45 km/h, and then for 3 hours at 65 km/h. What is the total distance covered?',
    options: [
      { id: 'A', text: '265 km' },
      { id: 'B', text: '275 km' },
      { id: 'C', text: '285 km' },
      { id: 'D', text: '295 km' }
    ],
    correctOption: 'C',
    difficulty: 'Easy',
    difficultyLevel: 2,
    pattern: 'Multi-Stage Travel',
    estimatedTime: '45 sec',
    companyTags: ['Cognizant', 'TCS'],
    companyAttribution: 'Reported in assessments at: Cognizant • TCS',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Cognizant',
      attributionNote: 'Reported in Cognizant placement experience'
    },
    hints: [
      'Hint 1: Calculate distance for stage 1: D1 = S1 × T1.',
      'Hint 2: Calculate distance for stage 2: D2 = S2 × T2. Then add them together.'
    ],
    explanation: {
      step1: 'Distance 1 = 45 × 2 = 90 km.',
      step2: 'Distance 2 = 65 × 3 = 195 km.',
      step3: 'Total Distance = 90 + 195 = 285 km.',
      summary: '285 km',
      formula: 'Total Distance = D1 + D2',
      quickTip: '90 + 195 = 90 + 200 − 5 = 290 − 5 = 285 km.'
    }
  },
  {
    id: 'tsd_q12',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Train Passing a Stationary Pole',
    prompt: 'A train 180 meters long is traveling at a speed of 72 km/h. How many seconds will it take to pass an electric pole?',
    options: [
      { id: 'A', text: '8 seconds' },
      { id: 'B', text: '9 seconds' },
      { id: 'C', text: '10 seconds' },
      { id: 'D', text: '12 seconds' }
    ],
    correctOption: 'B',
    difficulty: 'Easy',
    difficultyLevel: 2,
    pattern: 'Trains Crossing Poles',
    estimatedTime: '40 sec',
    companyTags: ['TCS', 'Wipro'],
    companyAttribution: 'Reported in assessments at: TCS • Wipro',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'TCS',
      examName: 'TCS NQT',
      attributionNote: 'Pattern reported in TCS NQT placement papers'
    },
    hints: [
      'Hint 1: When crossing a pole, Distance = Train Length.',
      'Hint 2: Convert 72 km/h to m/s: 72 × 5/18 = 20 m/s. Then 180 ÷ 20.'
    ],
    explanation: {
      step1: 'A pole has negligible length, so Distance to cover = Train length = 180 m.',
      step2: 'Convert speed to m/s: 72 × (5/18) = 20 m/s.',
      step3: 'Time = 180 ÷ 20 = 9 seconds.',
      summary: '9 seconds',
      formula: 'Time = Train Length ÷ Speed (m/s)',
      quickTip: 'Remember: 72 km/h is 4 × 18, so 4 × 5 = 20 m/s. 180 ÷ 20 = 9 s.'
    }
  },
  {
    id: 'tsd_q13',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Equal Distance Average Speed',
    prompt: 'A student drives to college at 40 km/h and returns home along the same route at 60 km/h. What is the average speed for the whole round trip?',
    options: [
      { id: 'A', text: '48 km/h' },
      { id: 'B', text: '50 km/h' },
      { id: 'C', text: '52 km/h' },
      { id: 'D', text: '54 km/h' }
    ],
    correctOption: 'A',
    difficulty: 'Easy',
    difficultyLevel: 2,
    pattern: 'Average Speed',
    estimatedTime: '45 sec',
    companyTags: ['Capgemini', 'Cognizant'],
    companyAttribution: 'Reported in assessments at: Capgemini • Cognizant',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Capgemini',
      attributionNote: 'Reported in Capgemini assessment experience'
    },
    hints: [
      'Hint 1: Do not use the simple average (40 + 60)/2 = 50! Distance is constant.',
      'Hint 2: Use the harmonic formula: Average Speed = 2xy / (x + y).'
    ],
    explanation: {
      step1: 'Formula for equal distance round trip: Avg Speed = (2 × x × y) / (x + y).',
      step2: '(2 × 40 × 60) / (40 + 60) = 4800 / 100 = 48 km/h.',
      summary: '48 km/h',
      formula: 'Average Speed = 2xy / (x + y)',
      quickTip: 'Average speed is ALWAYS less than the arithmetic mean (50) because more time is spent driving at the slower speed.'
    }
  },
  {
    id: 'tsd_q14',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Ratio of Speeds and Times',
    prompt: 'The speeds of two cars are in the ratio 3 : 5. If Car A takes 50 minutes to cover a certain distance, how many minutes will Car B take to cover the same distance?',
    options: [
      { id: 'A', text: '25 minutes' },
      { id: 'B', text: '30 minutes' },
      { id: 'C', text: '35 minutes' },
      { id: 'D', text: '40 minutes' }
    ],
    correctOption: 'B',
    difficulty: 'Easy',
    difficultyLevel: 2,
    pattern: 'Ratio & Proportionality',
    estimatedTime: '40 sec',
    companyTags: ['Wipro', 'TCS'],
    companyAttribution: 'Reported in assessments at: Wipro • TCS',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Wipro',
      attributionNote: 'Reported in Wipro Elite NLTH placement assessment'
    },
    hints: [
      'Hint 1: When distance is constant, Speed is inversely proportional to Time.',
      'Hint 2: Ratio of speeds is 3:5, so ratio of times is 5:3. 5 units = 50 min.'
    ],
    explanation: {
      step1: 'Speed ratio = 3 : 5, so Time ratio = 5 : 3 (inverse).',
      step2: 'Car A time corresponds to 5 units = 50 minutes → 1 unit = 10 minutes.',
      step3: 'Car B time = 3 units = 3 × 10 = 30 minutes.',
      summary: '30 minutes',
      formula: 'S1 / S2 = T2 / T1',
      quickTip: 'If Speed increases by 5/3, Time decreases by 3/5: 50 × (3/5) = 30 min.'
    }
  },
  {
    id: 'tsd_q15',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Two Walkers in Opposite Directions',
    prompt: 'Two friends start walking towards each other from two points 25 km apart at speeds of 5 km/h and 7.5 km/h. After how many hours will they meet?',
    options: [
      { id: 'A', text: '1.5 hours' },
      { id: 'B', text: '2.0 hours' },
      { id: 'C', text: '2.5 hours' },
      { id: 'D', text: '3.0 hours' }
    ],
    correctOption: 'B',
    difficulty: 'Easy',
    difficultyLevel: 2,
    pattern: 'Relative Speed',
    estimatedTime: '40 sec',
    companyTags: ['Accenture', 'Cognizant'],
    companyAttribution: 'Reported in assessments at: Accenture • Cognizant',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Accenture',
      attributionNote: 'Reported in Accenture placement cognitive assessment'
    },
    hints: [
      'Hint 1: When moving towards each other, add speeds: Relative Speed = S1 + S2.',
      'Hint 2: Relative Speed = 5 + 7.5 = 12.5 km/h. Time = Distance / Relative Speed.'
    ],
    explanation: {
      step1: 'Relative Speed in opposite directions = 5 + 7.5 = 12.5 km/h.',
      step2: 'Time to meet = Distance ÷ Relative Speed = 25 ÷ 12.5 = 2 hours.',
      summary: '2 hours',
      formula: 'Time to Meet = Distance / (S1 + S2)',
      quickTip: 'Notice 12.5 is half of 25. So it takes exactly 2 hours!'
    }
  },
  {
    id: 'tsd_q16',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Police and Thief Chase',
    prompt: 'A police officer spots a thief 200 meters ahead. The thief runs at 10 m/s and the officer chases at 14 m/s. How many seconds will it take for the officer to catch the thief?',
    options: [
      { id: 'A', text: '40 seconds' },
      { id: 'B', text: '45 seconds' },
      { id: 'C', text: '50 seconds' },
      { id: 'D', text: '55 seconds' }
    ],
    correctOption: 'C',
    difficulty: 'Easy',
    difficultyLevel: 2,
    pattern: 'Relative Speed',
    estimatedTime: '40 sec',
    companyTags: ['TCS', 'HCLTech'],
    companyAttribution: 'Reported in assessments at: TCS • HCLTech',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'HCLTech',
      attributionNote: 'Reported in HCLTech placement test'
    },
    hints: [
      'Hint 1: Moving in the same direction, subtract speeds: Relative Speed = S1 − S2.',
      'Hint 2: Relative Speed = 14 − 10 = 4 m/s. Distance to close = 200 m.'
    ],
    explanation: {
      step1: 'Relative speed in the same direction = 14 − 10 = 4 m/s.',
      step2: 'The officer gains 4 meters on the thief every second.',
      step3: 'Time = Gap ÷ Relative Speed = 200 ÷ 4 = 50 seconds.',
      summary: '50 seconds',
      formula: 'Catch Time = Initial Gap / (S_chaser − S_runner)',
      quickTip: '200 ÷ 4 = 50 seconds. Distance the officer runs = 50 × 14 = 700 m.'
    }
  },
  {
    id: 'tsd_q17',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Train Length from Pole Crossing',
    prompt: 'A train moving at 90 km/h crosses an electric post in 8 seconds. What is the length of the train in meters?',
    options: [
      { id: 'A', text: '180 meters' },
      { id: 'B', text: '200 meters' },
      { id: 'C', text: '220 meters' },
      { id: 'D', text: '240 meters' }
    ],
    correctOption: 'B',
    difficulty: 'Easy',
    difficultyLevel: 2,
    pattern: 'Trains Crossing Poles',
    estimatedTime: '40 sec',
    companyTags: ['Infosys'],
    companyAttribution: 'Reported in assessments at: Infosys',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Infosys',
      attributionNote: 'Reported in Infosys assessment drives'
    },
    hints: [
      'Hint 1: Convert 90 km/h to m/s: 90 × (5/18) = 25 m/s.',
      'Hint 2: Length = Speed (m/s) × Time (s) = 25 × 8.'
    ],
    explanation: {
      step1: 'Speed in m/s = 90 × (5/18) = 5 × 5 = 25 m/s.',
      step2: 'Train Length = Speed × Time = 25 × 8 = 200 meters.',
      summary: '200 meters',
      formula: 'Length = Speed (m/s) × Time (s)',
      quickTip: '25 × 8 = 200.'
    }
  },
  {
    id: 'tsd_q18',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Walking at 3/4 of Usual Speed',
    prompt: 'Walking at 3/4 of his usual speed, a man reaches his office 20 minutes late. What is his usual time to reach the office?',
    options: [
      { id: 'A', text: '45 minutes' },
      { id: 'B', text: '50 minutes' },
      { id: 'C', text: '60 minutes' },
      { id: 'D', text: '75 minutes' }
    ],
    correctOption: 'C',
    difficulty: 'Easy',
    difficultyLevel: 2,
    pattern: 'Ratio & Proportionality',
    estimatedTime: '45 sec',
    companyTags: ['TCS', 'Capgemini'],
    companyAttribution: 'Reported in assessments at: TCS • Capgemini',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'TCS',
      attributionNote: 'Pattern reported in TCS NQT placement papers'
    },
    hints: [
      'Hint 1: When speed becomes 3/4, time taken becomes 4/3 of usual time.',
      'Hint 2: Extra time = 4/3 − 1 = 1/3 of usual time = 20 minutes.'
    ],
    explanation: {
      step1: 'Speed ratio (New : Usual) = 3 : 4, so Time ratio (New : Usual) = 4 : 3.',
      step2: 'Difference in time = 4 − 3 = 1 unit.',
      step3: '1 unit = 20 minutes.',
      step4: 'Usual time = 3 units = 3 × 20 = 60 minutes (1 hour).',
      summary: '60 minutes (1 hour)',
      formula: 'Usual Time = Late Time × [Numerator / (Denominator − Numerator)]',
      quickTip: 'Quick shortcut: Usual Time = 20 × [3 / (4 − 3)] = 20 × 3 = 60 min!'
    }
  },
  {
    id: 'tsd_q19',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Equal Time Distance Comparison',
    prompt: 'Two cyclists ride for 3.5 hours. Cyclist A travels at 16 km/h and Cyclist B travels at 22 km/h. How many more kilometers does Cyclist B cover than Cyclist A?',
    options: [
      { id: 'A', text: '18 km' },
      { id: 'B', text: '21 km' },
      { id: 'C', text: '24 km' },
      { id: 'D', text: '27 km' }
    ],
    correctOption: 'B',
    difficulty: 'Easy',
    difficultyLevel: 2,
    pattern: 'Basic D = S × T',
    estimatedTime: '35 sec',
    companyTags: ['Wipro'],
    companyAttribution: 'PathPilot Practice — based on reported Wipro pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'Wipro',
      basedOnPattern: 'Difference in distance'
    },
    hints: [
      'Hint 1: Find the difference in speeds: 22 − 16 = 6 km/h.',
      'Hint 2: Difference in distance = Difference in speed × Time = 6 × 3.5.'
    ],
    explanation: {
      step1: 'Difference in speeds = 22 − 16 = 6 km/h.',
      step2: 'In 3.5 hours, difference in distance = 6 × 3.5 = 21 km.',
      summary: '21 km',
      formula: 'Difference in Distance = (S2 − S1) × Time',
      quickTip: 'No need to calculate total distances separately! 6 × 3.5 = 21 km directly.'
    }
  },
  {
    id: 'tsd_q20',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Finding Original Speed given Faster Trip',
    prompt: 'A train travels 300 km. If the speed had been 10 km/h faster, it would have taken 1 hour less for the journey. What was the original speed?',
    options: [
      { id: 'A', text: '40 km/h' },
      { id: 'B', text: '50 km/h' },
      { id: 'C', text: '60 km/h' },
      { id: 'D', text: '75 km/h' }
    ],
    correctOption: 'B',
    difficulty: 'Easy',
    difficultyLevel: 2,
    pattern: 'Late and Early Equations',
    estimatedTime: '50 sec',
    companyTags: ['Cognizant', 'Accenture'],
    companyAttribution: 'Reported in assessments at: Cognizant • Accenture',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Cognizant',
      attributionNote: 'Reported in Cognizant placement experience'
    },
    hints: [
      'Hint 1: Use option substitution: 300 ÷ Speed.',
      'Hint 2: If Speed = 50: Time = 300/50 = 6h. Faster speed = 60: Time = 300/60 = 5h. 6h − 5h = 1h!'
    ],
    explanation: {
      step1: 'Test options directly: 300 ÷ S.',
      step2: 'At 50 km/h: 300 ÷ 50 = 6 hours.',
      step3: 'At 50 + 10 = 60 km/h: 300 ÷ 60 = 5 hours.',
      step4: 'Difference = 6 − 5 = 1 hour, matching the question exactly.',
      summary: '50 km/h',
      formula: '(300 / S) − [300 / (S + 10)] = 1',
      quickTip: 'Option substitution avoids solving quadratic equations in placement exams!'
    }
  },

  // =========================================================================
  // LEVEL 3: MEDIUM (10 Questions)
  // =========================================================================
  {
    id: 'tsd_q21',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Train Crossing a Platform',
    prompt: 'A train 240 meters long is traveling at 72 km/h. How many seconds will it take to cross a railway platform 260 meters long?',
    options: [
      { id: 'A', text: '20 seconds' },
      { id: 'B', text: '22 seconds' },
      { id: 'C', text: '25 seconds' },
      { id: 'D', text: '28 seconds' }
    ],
    correctOption: 'C',
    difficulty: 'Medium',
    difficultyLevel: 3,
    pattern: 'Trains Crossing Platforms',
    estimatedTime: '60 sec',
    companyTags: ['TCS', 'Cognizant'],
    companyAttribution: 'Reported in assessments at: TCS • Cognizant',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'TCS',
      examName: 'TCS NQT',
      year: 2025,
      attributionNote: 'Pattern reported in TCS NQT placement papers'
    },
    hints: [
      'Hint 1: Total Distance = Train Length + Platform Length.',
      'Hint 2: Total Distance = 240 + 260 = 500 m. Convert 72 km/h to m/s: 20 m/s.'
    ],
    explanation: {
      step1: 'Total distance to cross = Length of train + Length of platform = 240 + 260 = 500 meters.',
      step2: 'Speed in m/s = 72 × (5/18) = 20 m/s.',
      step3: 'Time = Total Distance ÷ Speed = 500 ÷ 20 = 25 seconds.',
      summary: '25 seconds',
      formula: 'Time = (Train Length + Platform Length) / Speed',
      quickTip: 'Always add the platform length to the train length. 500 ÷ 20 = 25 seconds.'
    }
  },
  {
    id: 'tsd_q22',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Two Trains Crossing in Opposite Directions',
    prompt: 'Two trains of lengths 140 meters and 160 meters are running on parallel tracks in opposite directions at 60 km/h and 48 km/h. In how many seconds will they cross each other completely?',
    options: [
      { id: 'A', text: '8 seconds' },
      { id: 'B', text: '10 seconds' },
      { id: 'C', text: '12 seconds' },
      { id: 'D', text: '14 seconds' }
    ],
    correctOption: 'B',
    difficulty: 'Medium',
    difficultyLevel: 3,
    pattern: 'Trains Passing Each Other',
    estimatedTime: '60 sec',
    companyTags: ['Cognizant', 'Capgemini'],
    companyAttribution: 'Reported in assessments at: Cognizant • Capgemini',
    sourceMetadata: {
      sourceType: 'reported_interview',
      company: 'Cognizant',
      year: 2025,
      attributionNote: 'Reported in Cognizant interview experience'
    },
    hints: [
      'Hint 1: Distance = Sum of lengths of both trains: 140 + 160 = 300 m.',
      'Hint 2: Relative Speed in opposite directions = 60 + 48 = 108 km/h. Convert to m/s.'
    ],
    explanation: {
      step1: 'Total distance = L1 + L2 = 140 + 160 = 300 meters.',
      step2: 'Relative Speed = 60 + 48 = 108 km/h = 108 × (5/18) = 6 × 5 = 30 m/s.',
      step3: 'Time to cross = 300 ÷ 30 = 10 seconds.',
      summary: '10 seconds',
      formula: 'Time = (L1 + L2) / (S1 + S2)',
      quickTip: '108 is 6 × 18, so in m/s it is 6 × 5 = 30 m/s! 300 ÷ 30 = 10 s.'
    }
  },
  {
    id: 'tsd_q23',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Two Trains Crossing in Same Direction',
    prompt: 'Two trains 150m and 125m long are running on parallel tracks in the same direction at 70 km/h and 52 km/h. In how many seconds will the faster train cross the slower train?',
    options: [
      { id: 'A', text: '45 seconds' },
      { id: 'B', text: '50 seconds' },
      { id: 'C', text: '55 seconds' },
      { id: 'D', text: '60 seconds' }
    ],
    correctOption: 'C',
    difficulty: 'Medium',
    difficultyLevel: 3,
    pattern: 'Trains Passing Each Other',
    estimatedTime: '65 sec',
    companyTags: ['Accenture', 'TCS'],
    companyAttribution: 'Reported in assessments at: Accenture • TCS',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Accenture',
      attributionNote: 'Reported in Accenture placement cognitive assessment'
    },
    hints: [
      'Hint 1: Distance = Sum of both lengths: 150 + 125 = 275 m.',
      'Hint 2: Relative Speed in same direction = 70 − 52 = 18 km/h = 5 m/s.'
    ],
    explanation: {
      step1: 'Total Distance = 150 + 125 = 275 meters.',
      step2: 'Relative Speed = 70 − 52 = 18 km/h = 5 m/s.',
      step3: 'Time = 275 ÷ 5 = 55 seconds.',
      summary: '55 seconds',
      formula: 'Time = (L1 + L2) / (S_faster − S_slower)',
      quickTip: 'Relative speed of 18 km/h is exactly 5 m/s. 275 ÷ 5 = 55 seconds.'
    }
  },
  {
    id: 'tsd_q24',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Late and Early Arrival Equation',
    prompt: 'If a student walks from home to school at 4 km/h, he is late by 10 minutes. If he walks at 5 km/h, he reaches 5 minutes early. What is the distance between his home and school?',
    options: [
      { id: 'A', text: '4 km' },
      { id: 'B', text: '5 km' },
      { id: 'C', text: '6 km' },
      { id: 'D', text: '7.5 km' }
    ],
    correctOption: 'B',
    difficulty: 'Medium',
    difficultyLevel: 3,
    pattern: 'Late and Early Equations',
    estimatedTime: '70 sec',
    companyTags: ['Infosys', 'Capgemini'],
    companyAttribution: 'Reported in assessments at: Infosys • Capgemini',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Infosys',
      attributionNote: 'Reported in Infosys assessment drives'
    },
    hints: [
      'Hint 1: Total time difference = 10 min late + 5 min early = 15 minutes = 1/4 hour.',
      'Hint 2: Use shortcut formula: Distance = (S1 × S2 / |S1 − S2|) × (ΔT in hours).'
    ],
    explanation: {
      step1: 'Total difference in time = 10 min late to 5 min early = 10 + 5 = 15 minutes = 15/60 = 1/4 hour.',
      step2: 'Formula: Distance = [ (S1 × S2) / (S2 − S1) ] × ΔT.',
      step3: 'Distance = [ (4 × 5) / (5 − 4) ] × (1/4) = 20 × (1/4) = 5 km.',
      summary: '5 km',
      formula: 'D = [S1 × S2 / (S2 − S1)] × (Total time difference in hours)',
      quickTip: 'Remember: Late + Early = ADD time differences. Late + Late = SUBTRACT time differences!'
    }
  },
  {
    id: 'tsd_q25',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Stoppage Time per Hour',
    prompt: 'Excluding stoppages, the speed of a bus is 54 km/h. Including stoppages, it is 45 km/h. For how many minutes does the bus stop per hour?',
    options: [
      { id: 'A', text: '8 minutes' },
      { id: 'B', text: '10 minutes' },
      { id: 'C', text: '12 minutes' },
      { id: 'D', text: '15 minutes' }
    ],
    correctOption: 'B',
    difficulty: 'Medium',
    difficultyLevel: 3,
    pattern: 'Stoppages per Hour',
    estimatedTime: '55 sec',
    companyTags: ['TCS', 'Wipro'],
    companyAttribution: 'Reported in assessments at: TCS • Wipro',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'TCS',
      examName: 'TCS NQT',
      attributionNote: 'Pattern reported in TCS NQT placement papers'
    },
    hints: [
      'Hint 1: Stoppage time per hour = [(Speed without stoppage − Speed with stoppage) / Speed without stoppage] × 60.',
      'Hint 2: [(54 − 45) / 54] × 60 = (9/54) × 60.'
    ],
    explanation: {
      step1: 'In 1 hour, the bus travels 9 km less due to stops (54 − 45 = 9 km).',
      step2: 'Time taken to cover 9 km at non-stop speed of 54 km/h = 9/54 hour = 1/6 hour.',
      step3: 'In minutes: (1/6) × 60 = 10 minutes.',
      summary: '10 minutes',
      formula: 'Stoppage Time (min/hr) = [(S_fast − S_slow) / S_fast] × 60',
      quickTip: 'Direct formula: (9 / 54) × 60 = (1/6) × 60 = 10 minutes.'
    }
  },
  {
    id: 'tsd_q26',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Delayed Departure Catch-Up',
    prompt: 'Train A leaves a station at 8:00 AM traveling at 60 km/h. Train B leaves the same station at 9:30 AM on a parallel track in the same direction at 90 km/h. At what time will Train B catch up with Train A?',
    options: [
      { id: 'A', text: '12:00 PM' },
      { id: 'B', text: '12:30 PM' },
      { id: 'C', text: '1:00 PM' },
      { id: 'D', text: '1:30 PM' }
    ],
    correctOption: 'B',
    difficulty: 'Medium',
    difficultyLevel: 3,
    pattern: 'Relative Speed',
    estimatedTime: '65 sec',
    companyTags: ['Cognizant', 'HCLTech'],
    companyAttribution: 'Reported in assessments at: Cognizant • HCLTech',
    sourceMetadata: {
      sourceType: 'reported_interview',
      company: 'Cognizant',
      attributionNote: 'Reported in Cognizant interview experience'
    },
    hints: [
      'Hint 1: Find how far Train A travels in the 1.5 hours before Train B starts: 60 × 1.5 = 90 km.',
      'Hint 2: Relative Speed = 90 − 60 = 30 km/h. Time to catch = 90 ÷ 30 = 3 hours after 9:30 AM.'
    ],
    explanation: {
      step1: 'Train A runs alone from 8:00 to 9:30 AM (1.5 hours) → Lead distance = 60 × 1.5 = 90 km.',
      step2: 'Relative Speed = 90 − 60 = 30 km/h.',
      step3: 'Time needed to close the 90 km gap = 90 ÷ 30 = 3 hours.',
      step4: 'Catch-up time = 9:30 AM + 3 hours = 12:30 PM.',
      summary: '12:30 PM',
      formula: 'Catch Time = Initial Lead / Relative Speed',
      quickTip: '9:30 AM + 3 hours = 12:30 PM.'
    }
  },
  {
    id: 'tsd_q27',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Average Speed for Three Equal Distances',
    prompt: 'A car covers three equal consecutive distances at speeds of 20 km/h, 30 km/h, and 60 km/h respectively. What is the average speed for the entire trip?',
    options: [
      { id: 'A', text: '28 km/h' },
      { id: 'B', text: '30 km/h' },
      { id: 'C', text: '32 km/h' },
      { id: 'D', text: '36 km/h' }
    ],
    correctOption: 'B',
    difficulty: 'Medium',
    difficultyLevel: 3,
    pattern: 'Average Speed',
    estimatedTime: '60 sec',
    companyTags: ['Capgemini', 'TCS'],
    companyAttribution: 'Reported in assessments at: Capgemini • TCS',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Capgemini',
      attributionNote: 'Reported in Capgemini assessment experience'
    },
    hints: [
      'Hint 1: Assume each equal distance is the LCM of 20, 30, and 60 = 60 km.',
      'Hint 2: Total Distance = 3 × 60 = 180 km. Total Time = 60/20 + 60/30 + 60/60 = 3 + 2 + 1 = 6 hours.'
    ],
    explanation: {
      step1: 'Let each part be LCM(20, 30, 60) = 60 km. Total Distance = 60 × 3 = 180 km.',
      step2: 'Time 1 = 60/20 = 3 hrs. Time 2 = 60/30 = 2 hrs. Time 3 = 60/60 = 1 hr.',
      step3: 'Total Time = 3 + 2 + 1 = 6 hours.',
      step4: 'Average Speed = 180 ÷ 6 = 30 km/h.',
      summary: '30 km/h',
      formula: 'Average Speed = 3 / (1/s1 + 1/s2 + 1/s3)',
      quickTip: 'Assuming the LCM as distance makes calculation instant without dealing with fractions!'
    }
  },
  {
    id: 'tsd_q28',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Train Passing a Moving Person in Same Direction',
    prompt: 'A train 150 meters long is traveling at 68 km/h. It passes a man walking at 8 km/h in the same direction along the track. How many seconds does the train take to pass him?',
    options: [
      { id: 'A', text: '7.5 seconds' },
      { id: 'B', text: '9 seconds' },
      { id: 'C', text: '10 seconds' },
      { id: 'D', text: '12 seconds' }
    ],
    correctOption: 'B',
    difficulty: 'Medium',
    difficultyLevel: 3,
    pattern: 'Relative Speed',
    estimatedTime: '50 sec',
    companyTags: ['Wipro', 'Cognizant'],
    companyAttribution: 'Reported in assessments at: Wipro • Cognizant',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Wipro',
      attributionNote: 'Reported in Wipro Elite NLTH placement assessment'
    },
    hints: [
      'Hint 1: Relative Speed in same direction = 68 − 8 = 60 km/h.',
      'Hint 2: Convert 60 km/h to m/s: 60 × (5/18) = 50/3 m/s. Time = 150 ÷ (50/3).'
    ],
    explanation: {
      step1: 'Relative speed = 68 − 8 = 60 km/h.',
      step2: 'Convert to m/s: 60 × (5/18) = 50/3 m/s.',
      step3: 'Time = 150 ÷ (50/3) = 150 × (3/50) = 3 × 3 = 9 seconds.',
      summary: '9 seconds',
      formula: 'Time = Train Length / (S_train − S_man in m/s)',
      quickTip: '150 ÷ (50/3) = 150 × 3 / 50 = 9 seconds.'
    }
  },
  {
    id: 'tsd_q29',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Train Passing a Moving Person in Opposite Direction',
    prompt: 'A train 220 meters long running at 84 km/h passes a man running at 6 km/h in the opposite direction. How many seconds does it take?',
    options: [
      { id: 'A', text: '8.4 seconds' },
      { id: 'B', text: '8.8 seconds' },
      { id: 'C', text: '9.2 seconds' },
      { id: 'D', text: '9.6 seconds' }
    ],
    correctOption: 'B',
    difficulty: 'Medium',
    difficultyLevel: 3,
    pattern: 'Relative Speed',
    estimatedTime: '50 sec',
    companyTags: ['TCS'],
    companyAttribution: 'PathPilot Practice — based on reported TCS NQT pattern',
    sourceMetadata: {
      sourceType: 'pathpilot_variant',
      basedOnCompany: 'TCS',
      basedOnPattern: 'Opposite direction person crossing'
    },
    hints: [
      'Hint 1: In opposite directions, add speeds: 84 + 6 = 90 km/h.',
      'Hint 2: 90 km/h = 25 m/s. Time = 220 ÷ 25.'
    ],
    explanation: {
      step1: 'Relative Speed = 84 + 6 = 90 km/h.',
      step2: 'Convert to m/s: 90 × (5/18) = 25 m/s.',
      step3: 'Time = 220 ÷ 25 = 8.8 seconds.',
      summary: '8.8 seconds',
      formula: 'Time = Train Length / (S_train + S_man in m/s)',
      quickTip: '220 ÷ 25 = 440 ÷ 50 = 880 ÷ 100 = 8.8 seconds.'
    }
  },
  {
    id: 'tsd_q30',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Train Passing Two Different Platforms',
    prompt: 'A train crosses a platform 160 meters long in 18 seconds, and another platform 120 meters long in 15 seconds. What is the length of the train?',
    options: [
      { id: 'A', text: '80 meters' },
      { id: 'B', text: '90 meters' },
      { id: 'C', text: '100 meters' },
      { id: 'D', text: '120 meters' }
    ],
    correctOption: 'A',
    difficulty: 'Medium',
    difficultyLevel: 3,
    pattern: 'Trains Crossing Platforms',
    estimatedTime: '70 sec',
    companyTags: ['Accenture', 'Infosys'],
    companyAttribution: 'Reported in assessments at: Accenture • Infosys',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Accenture',
      attributionNote: 'Reported in Accenture placement cognitive assessment'
    },
    hints: [
      'Hint 1: Difference in distance = 160 − 120 = 40 meters. Difference in time = 18 − 15 = 3 seconds.',
      'Hint 2: Speed = 40/3 m/s. In 15 seconds, total distance = (40/3) × 15 = 200 m = Train + 120 m.'
    ],
    explanation: {
      step1: 'The extra 160 − 120 = 40 meters took 18 − 15 = 3 seconds.',
      step2: 'Speed of the train = 40/3 m/s.',
      step3: 'In 15 seconds, total distance covered = (40/3) × 15 = 200 meters.',
      step4: 'Train Length = Total Distance − Platform Length = 200 − 120 = 80 meters.',
      summary: '80 meters',
      formula: 'Speed = ΔPlatform / ΔTime',
      quickTip: 'Speed is 40/3 m/s. 200 − 120 = 80 m.'
    }
  },

  // =========================================================================
  // LEVEL 4: PLACEMENT STANDARD (5 Questions)
  // =========================================================================
  {
    id: 'tsd_q31',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Post-Meeting Times Formula',
    prompt: 'Two trains start at the same time from Station X and Station Y towards each other. After meeting, they take 4 hours and 9 hours respectively to reach Y and X. If the first train travels at 60 km/h, what is the speed of the second train?',
    options: [
      { id: 'A', text: '35 km/h' },
      { id: 'B', text: '40 km/h' },
      { id: 'C', text: '45 km/h' },
      { id: 'D', text: '50 km/h' }
    ],
    correctOption: 'B',
    difficulty: 'Hard',
    difficultyLevel: 4,
    pattern: 'Post-Meeting Formula',
    estimatedTime: '75 sec',
    companyTags: ['TCS', 'Cognizant'],
    companyAttribution: 'Reported in assessments at: TCS • Cognizant',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'TCS',
      examName: 'TCS NQT Advanced',
      year: 2025,
      attributionNote: 'Standard TCS NQT Advanced Numerical pattern'
    },
    hints: [
      'Hint 1: Use the famous square root ratio formula: S1 / S2 = √(T2 / T1).',
      'Hint 2: S1 / S2 = √(9 / 4) = 3 / 2. Given S1 = 60.'
    ],
    explanation: {
      step1: 'Square root theorem: S1 / S2 = √(T2 / T1).',
      step2: 'S1 / S2 = √(9 / 4) = 3 / 2.',
      step3: 'Since S1 = 60 km/h: 60 / S2 = 3 / 2 → S2 = (60 × 2) / 3 = 40 km/h.',
      summary: '40 km/h',
      formula: 'S1 / S2 = √(T2 / T1)',
      quickTip: 'Memorize this formula: S1/S2 = √(T2/T1). It appears frequently in TCS and Cognizant advanced sections!'
    }
  },
  {
    id: 'tsd_q32',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Circular Track First Meeting',
    prompt: 'Two runners start at the same point on a 600-meter circular track and run in opposite directions at speeds of 6 m/s and 4 m/s. After how many seconds will they cross each other for the first time?',
    options: [
      { id: 'A', text: '50 seconds' },
      { id: 'B', text: '60 seconds' },
      { id: 'C', text: '70 seconds' },
      { id: 'D', text: '75 seconds' }
    ],
    correctOption: 'B',
    difficulty: 'Hard',
    difficultyLevel: 4,
    pattern: 'Circular Track',
    estimatedTime: '60 sec',
    companyTags: ['Capgemini', 'TCS'],
    companyAttribution: 'Reported in assessments at: Capgemini • TCS',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Capgemini',
      attributionNote: 'Reported in Capgemini assessment experience'
    },
    hints: [
      'Hint 1: In opposite directions on a circular track, relative speed is the sum: 6 + 4 = 10 m/s.',
      'Hint 2: Time to meet for the first time = Track Length ÷ Relative Speed = 600 ÷ 10.'
    ],
    explanation: {
      step1: 'Relative speed in opposite directions = 6 + 4 = 10 m/s.',
      step2: 'They meet when combined distance covered equals the track perimeter: 600 meters.',
      step3: 'Time = 600 ÷ 10 = 60 seconds (1 minute).',
      summary: '60 seconds (1 minute)',
      formula: 'Time to First Meet = Circumference / (S1 + S2)',
      quickTip: 'If they ran in the SAME direction, you would divide by (S1 − S2) = 600 / (6 − 4) = 300 s.'
    }
  },
  {
    id: 'tsd_q33',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Meeting at the Starting Point of Circular Track',
    prompt: 'Three runners run in the same direction on a 1,200m circular track at speeds of 3 m/s, 4 m/s, and 6 m/s. After how many seconds will all three meet together at the starting point for the first time?',
    options: [
      { id: 'A', text: '600 seconds' },
      { id: 'B', text: '800 seconds' },
      { id: 'C', text: '1,200 seconds' },
      { id: 'D', text: '1,800 seconds' }
    ],
    correctOption: 'C',
    difficulty: 'Hard',
    difficultyLevel: 4,
    pattern: 'Circular Track',
    estimatedTime: '80 sec',
    companyTags: ['Infosys', 'Cognizant'],
    companyAttribution: 'Reported in assessments at: Infosys • Cognizant',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Infosys',
      attributionNote: 'Reported in Infosys assessment drives'
    },
    hints: [
      'Hint 1: Find the time each runner takes to complete one full lap: T1 = 1200/3, T2 = 1200/4, T3 = 1200/6.',
      'Hint 2: T1 = 400s, T2 = 300s, T3 = 200s. Find the LCM of these times.'
    ],
    explanation: {
      step1: 'Time for 1 lap: Runner 1 = 1200/3 = 400 s, Runner 2 = 1200/4 = 300 s, Runner 3 = 1200/6 = 200 s.',
      step2: 'All three meet at the starting point at the Least Common Multiple (LCM) of individual lap times.',
      step3: 'LCM(400, 300, 200) = 1,200 seconds.',
      summary: '1,200 seconds (20 minutes)',
      formula: 'Meeting at Start = LCM(Lap Times)',
      quickTip: 'Meeting at the START point is ALWAYS LCM of individual lap times.'
    }
  },
  {
    id: 'tsd_q34',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Linear Race with Head Start',
    prompt: 'In a 1,000-meter race, Runner A beats Runner B by 100 meters or by 10 seconds. What is Runner A’s speed in m/s?',
    options: [
      { id: 'A', text: '10 m/s' },
      { id: 'B', text: '11.11 m/s' },
      { id: 'C', text: '12.5 m/s' },
      { id: 'D', text: '15 m/s' }
    ],
    correctOption: 'B',
    difficulty: 'Hard',
    difficultyLevel: 4,
    pattern: 'Races & Head Starts',
    estimatedTime: '80 sec',
    companyTags: ['TCS', 'Accenture'],
    companyAttribution: 'Reported in assessments at: TCS • Accenture',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'TCS',
      examName: 'TCS NQT',
      attributionNote: 'Pattern reported in TCS NQT placement papers'
    },
    hints: [
      'Hint 1: B covers the remaining 100 meters in 10 seconds, so Speed of B = 100/10 = 10 m/s.',
      'Hint 2: B takes 1000 ÷ 10 = 100 seconds to finish. A finishes 10 seconds earlier (90s). Speed of A = 1000/90.'
    ],
    explanation: {
      step1: 'Runner B takes 10 seconds to cover the last 100 meters → Speed of B = 100 ÷ 10 = 10 m/s.',
      step2: 'Total time taken by B to run 1,000m = 1000 ÷ 10 = 100 seconds.',
      step3: 'A finishes 10 seconds before B → Time taken by A = 100 − 10 = 90 seconds.',
      step4: 'Speed of A = 1000 ÷ 90 = 100/9 = 11.11 m/s.',
      summary: '11.11 m/s (100/9 m/s)',
      formula: 'Speed_B = Deficit Distance / Deficit Time',
      quickTip: 'Speed of A = 1000 / 90 = 11.11 m/s.'
    }
  },
  {
    id: 'tsd_q35',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Upstream and Downstream Boat Velocity',
    prompt: 'A motorboat travels 36 km downstream in 3 hours and returns 36 km upstream in 6 hours. What is the speed of the stream in km/h?',
    options: [
      { id: 'A', text: '2 km/h' },
      { id: 'B', text: '3 km/h' },
      { id: 'C', text: '4 km/h' },
      { id: 'D', text: '4.5 km/h' }
    ],
    correctOption: 'B',
    difficulty: 'Hard',
    difficultyLevel: 4,
    pattern: 'Boats & Streams',
    estimatedTime: '70 sec',
    companyTags: ['Wipro', 'Capgemini'],
    companyAttribution: 'Reported in assessments at: Wipro • Capgemini',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Capgemini',
      attributionNote: 'Reported in Capgemini assessment experience'
    },
    hints: [
      'Hint 1: Downstream speed D = 36/3 = 12 km/h. Upstream speed U = 36/6 = 6 km/h.',
      'Hint 2: Stream speed = (Downstream − Upstream) ÷ 2 = (12 − 6) ÷ 2.'
    ],
    explanation: {
      step1: 'Downstream speed (D) = 36 ÷ 3 = 12 km/h.',
      step2: 'Upstream speed (U) = 36 ÷ 6 = 6 km/h.',
      step3: 'Speed of the stream = (D − U) ÷ 2 = (12 − 6) ÷ 2 = 6 ÷ 2 = 3 km/h.',
      summary: '3 km/h',
      formula: 'Stream Speed = (Downstream − Upstream) / 2',
      quickTip: 'Speed of boat in still water = (D + U)/2 = 18/2 = 9 km/h. Stream = (12 − 6)/2 = 3 km/h.'
    }
  },

  // =========================================================================
  // LEVEL 5: HARD / SPEED CHALLENGE (3 Questions)
  // =========================================================================
  {
    id: 'tsd_q36',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Speed Reduction Breakdown Challenge',
    prompt: 'A train starts from Station A. After traveling 50 km, it suffers an engine breakdown and travels at 3/4 of its normal speed, reaching Station B 35 minutes late. Had the breakdown happened 24 km further along the line, it would have been late by only 25 minutes. What is the normal speed of the train in km/h?',
    options: [
      { id: 'A', text: '40 km/h' },
      { id: 'B', text: '48 km/h' },
      { id: 'C', text: '54 km/h' },
      { id: 'D', text: '60 km/h' }
    ],
    correctOption: 'B',
    difficulty: 'Speed Challenge',
    difficultyLevel: 5,
    pattern: 'Advanced Breakdown & Equations',
    estimatedTime: '120 sec',
    companyTags: ['TCS', 'Cognizant'],
    companyAttribution: 'Reported in assessments at: TCS • Cognizant',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'TCS',
      examName: 'TCS NQT Digital / Advanced',
      year: 2025,
      attributionNote: 'Reported in TCS Digital high-difficulty package assessments'
    },
    hints: [
      'Hint 1: Look ONLY at the 24 km stretch where the difference in behavior occurred.',
      'Hint 2: Traveling 24 km at normal speed vs 3/4 speed saves 35 − 25 = 10 minutes (1/6 hour).',
      'Hint 3: 24/ (3/4 S) − 24/S = 1/6.'
    ],
    explanation: {
      step1: 'Notice that only the 24 km stretch differs between the two scenarios.',
      step2: 'In that 24 km, running at normal speed vs reduced speed (3/4 S) accounts for a time difference of 35 − 25 = 10 minutes = 1/6 hr.',
      step3: 'Equation: [24 / (3S/4)] − (24 / S) = 1/6 → (32 / S) − (24 / S) = 1/6 → 8 / S = 1/6.',
      step4: 'S = 8 × 6 = 48 km/h.',
      summary: '48 km/h',
      formula: 'S = Distance_diff / [Time_saved × (4/3 − 1)]',
      quickTip: 'Focus only on the 24 km interval: 24 km saves 10 min. At 3/4 speed, delay = 1/3 of usual time = 10 min → usual time for 24 km is 30 min (0.5 hr) → Speed = 24 / 0.5 = 48 km/h!'
    }
  },
  {
    id: 'tsd_q37',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Double Train Passing with Man Inside',
    prompt: 'A man sitting in a train traveling at 50 km/h observes that a goods train traveling in the opposite direction takes 9 seconds to pass him. If the goods train is 280 meters long, what is the speed of the goods train in km/h?',
    options: [
      { id: 'A', text: '58 km/h' },
      { id: 'B', text: '62 km/h' },
      { id: 'C', text: '65 km/h' },
      { id: 'D', text: '70 km/h' }
    ],
    correctOption: 'B',
    difficulty: 'Speed Challenge',
    difficultyLevel: 5,
    pattern: 'Trains Passing Each Other',
    estimatedTime: '90 sec',
    companyTags: ['Cognizant', 'HCLTech'],
    companyAttribution: 'Reported in assessments at: Cognizant • HCLTech',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Cognizant',
      attributionNote: 'Reported in Cognizant placement experience'
    },
    hints: [
      'Hint 1: The goods train passes a MAN (a point object), so distance is ONLY the length of the goods train (280 m), NOT both trains!',
      'Hint 2: Relative Speed = 280 m / 9 s in m/s. Convert to km/h: (280/9) × (18/5) = 112 km/h. S_goods = 112 − 50.'
    ],
    explanation: {
      step1: 'Crucial point: The goods train passes the MAN, not his train. So Distance = Length of goods train = 280 m.',
      step2: 'Relative Speed = 280 ÷ 9 m/s.',
      step3: 'Convert to km/h: (280 / 9) × (18 / 5) = 280 × 2 / 5 = 560 / 5 = 112 km/h.',
      step4: 'Since they travel in opposite directions: S_goods + 50 = 112 → S_goods = 112 − 50 = 62 km/h.',
      summary: '62 km/h',
      formula: 'S_goods = [(Goods Length / Time) × 18/5] − S_passenger',
      quickTip: 'Never add the length of the passenger train when passing a man sitting inside!'
    }
  },
  {
    id: 'tsd_q38',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    category: 'Quantitative Aptitude',
    title: 'Multiple Speed Stage Trip Equivalence',
    prompt: 'A courier rides an electric scooter at 20 km/h for the first 1/3 of the total distance, 30 km/h for the next 1/3, and 60 km/h for the final 1/3. If the entire journey took 2 hours, what was the total distance in kilometers?',
    options: [
      { id: 'A', text: '50 km' },
      { id: 'B', text: '60 km' },
      { id: 'C', text: '75 km' },
      { id: 'D', text: '90 km' }
    ],
    correctOption: 'B',
    difficulty: 'Speed Challenge',
    difficultyLevel: 5,
    pattern: 'Average Speed',
    estimatedTime: '90 sec',
    companyTags: ['Capgemini', 'Accenture'],
    companyAttribution: 'Reported in assessments at: Capgemini • Accenture',
    sourceMetadata: {
      sourceType: 'reported_pattern',
      company: 'Capgemini',
      attributionNote: 'Reported in Capgemini assessment experience'
    },
    hints: [
      'Hint 1: The average speed for three equal distances at 20, 30, and 60 km/h was found earlier to be 30 km/h.',
      'Hint 2: Total Distance = Average Speed × Total Time = 30 × 2 = 60 km.'
    ],
    explanation: {
      step1: 'Harmonic mean average speed for 3 equal distances: Avg Speed = 3 / (1/20 + 1/30 + 1/60).',
      step2: '1/20 + 1/30 + 1/60 = 3/60 + 2/60 + 1/60 = 6/60 = 1/10. Avg Speed = 3 / (1/10) = 30 km/h.',
      step3: 'Total Distance = Average Speed × Total Time = 30 km/h × 2 hours = 60 km.',
      summary: '60 km',
      formula: 'Total Distance = Avg Speed × Total Time',
      quickTip: 'Recognizing that the average speed is 30 km/h allows you to answer in 10 seconds: 30 × 2 = 60 km!'
    }
  }
];
