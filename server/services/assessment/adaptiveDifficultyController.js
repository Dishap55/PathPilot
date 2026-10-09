/**
 * ADAPTIVE DIFFICULTY CONTROLLER (STEP 2 - SERVER)
 * 
 * Implements deterministic adaptive difficulty progression:
 * - Starting difficulty based on initial student level
 * - Deterministic promotion on correct answer (Easy -> Medium -> Hard)
 * - Deterministic demotion on incorrect answer (Hard -> Medium -> Easy)
 * - Skipped questions do NOT apply penalty and do not drop difficulty
 * - No erratic or random difficulty jumps
 * - Does NOT calculate final proficiency or mastery (belongs to Step 3)
 */

const { resolveStudentLevel } = require('../../constants/canonicalTopicRegistry');

const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

/**
 * Maps student starting level to initial assessment difficulty.
 * Beginner: Easy
 * Intermediate: Easy/Medium band (starts at Medium)
 * Advanced / Professional: Medium/Hard band (starts at Hard)
 */
function getStartingDifficulty(studentLevel) {
  const canonicalLevel = resolveStudentLevel(studentLevel) || 'Beginner';
  switch (canonicalLevel) {
    case 'Beginner':
      return 'Easy';
    case 'Intermediate':
      return 'Medium';
    case 'Advanced':
      return 'Hard';
    default:
      return 'Easy';
  }
}

/**
 * Validates if a difficulty conforms to the student's initial band.
 */
function isStartingDifficultyValid(studentLevel, difficulty) {
  const canonicalLevel = resolveStudentLevel(studentLevel) || 'Beginner';
  switch (canonicalLevel) {
    case 'Beginner':
      return difficulty === 'Easy';
    case 'Intermediate':
      return difficulty === 'Easy' || difficulty === 'Medium';
    case 'Advanced':
      return difficulty === 'Medium' || difficulty === 'Hard';
    default:
      return false;
  }
}

/**
 * Calculates the next difficulty deterministically based on answer correctness.
 * 
 * @param {Object} params
 * @param {string} params.currentDifficulty - 'Easy' | 'Medium' | 'Hard'
 * @param {boolean} params.isCorrect - Whether the student answered correctly
 * @param {boolean} [params.isSkipped=false] - Whether question was skipped
 * @param {Array} [params.recentPerformance=[]] - Array of recent question results { correct, skipped, difficulty }
 * @returns {string} - Next difficulty: 'Easy' | 'Medium' | 'Hard'
 */
function calculateNextDifficulty({
  currentDifficulty = 'Easy',
  isCorrect = false,
  isSkipped = false,
  recentPerformance = []
}) {
  // Normalize current difficulty
  const normCurrent = DIFFICULTY_LEVELS.find(d => d.toLowerCase() === (currentDifficulty || '').toLowerCase()) || 'Easy';

  // 1. Skipped question: No correctness penalty. Keep current difficulty.
  if (isSkipped) {
    return normCurrent;
  }

  // 2. Correct answer -> Increase difficulty when appropriate
  if (isCorrect) {
    if (normCurrent === 'Easy') return 'Medium';
    if (normCurrent === 'Medium') return 'Hard';
    if (normCurrent === 'Hard') return 'Hard'; // Ceiling reached
  }

  // 3. Incorrect answer -> Decrease difficulty when appropriate
  if (!isCorrect) {
    if (normCurrent === 'Hard') return 'Medium';
    if (normCurrent === 'Medium') return 'Easy';
    if (normCurrent === 'Easy') return 'Easy'; // Floor reached
  }

  return normCurrent;
}

module.exports = {
  DIFFICULTY_LEVELS,
  getStartingDifficulty,
  isStartingDifficultyValid,
  calculateNextDifficulty
};
