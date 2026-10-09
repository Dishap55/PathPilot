/**
 * QUESTION VALIDATOR (STEP 2 - CLIENT)
 * 
 * Strict runtime validator for generated assessment questions:
 * ✓ Valid canonical subject
 * ✓ Valid canonical topicId belonging to the subject
 * ✓ Valid difficulty ('Easy' | 'Medium' | 'Hard')
 * ✓ Valid questionType ('mcq' | 'coding')
 * ✓ MCQ has valid options (>= 2 distinct options)
 * ✓ correctAnswer exists in options
 * ✓ Coding question only in appropriate subjects (DSA, DBMS, programming)
 * ✓ Coding question has supported language, starterCode, testCases
 * ✓ No duplicate questionId
 * ✓ No duplicate question content
 * ✓ No invented topics
 * ✓ All required fields present
 */

import {
  CANONICAL_SUBJECTS,
  resolveSubject,
  isTopicInSubject
} from '../../data/canonicalTopicRegistry.js';

export const VALID_DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
export const CODING_ALLOWED_SUBJECTS = ['DSA', 'DBMS', 'OOPS'];

export class QuestionValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = 'QuestionValidationError';
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}

/**
 * Validates a generated question object.
 * 
 * @param {Object} question - The question candidate
 * @param {Object} [context={}]
 * @param {Array<string>} [context.askedQuestionIds=[]] - Array of previously asked question IDs
 * @param {Array<string>} [context.askedQuestionContents=[]] - Array of previous question prompts
 * @returns {{ isValid: boolean, errors: string[] }}
 */
export function validateQuestion(question, context = {}) {
  const errors = [];

  if (!question || typeof question !== 'object' || Array.isArray(question)) {
    return {
      isValid: false,
      errors: ['Question must be a non-null object.']
    };
  }

  // 1. questionId check
  if (!question.questionId || typeof question.questionId !== 'string' || question.questionId.trim() === '') {
    errors.push('Missing or invalid "questionId".');
  } else if (context.askedQuestionIds && context.askedQuestionIds.includes(question.questionId.trim())) {
    errors.push(`Duplicate questionId "${question.questionId}" detected.`);
  }

  // 2. Subject check
  let canonicalSubject = null;
  if (!question.subject || typeof question.subject !== 'string' || question.subject.trim() === '') {
    errors.push('Missing or invalid "subject".');
  } else {
    canonicalSubject = resolveSubject(question.subject);
    if (!canonicalSubject) {
      errors.push(`Invalid subject "${question.subject}". Supported: ${CANONICAL_SUBJECTS.join(', ')}.`);
    }
  }

  // 3. Canonical topic check
  if (!question.topicId || typeof question.topicId !== 'string' || question.topicId.trim() === '') {
    errors.push('Missing or invalid "topicId".');
  } else if (canonicalSubject) {
    if (!isTopicInSubject(canonicalSubject, question.topicId.trim())) {
      errors.push(
        `Topic ID "${question.topicId}" does not belong to canonical subject "${canonicalSubject}".`
      );
    }
  }

  // 4. Topic Name check
  if (!question.topicName || typeof question.topicName !== 'string' || question.topicName.trim() === '') {
    errors.push('Missing or invalid "topicName".');
  }

  // 5. Difficulty check
  if (!question.difficulty || typeof question.difficulty !== 'string') {
    errors.push('Missing or invalid "difficulty".');
  } else {
    const matchedDiff = VALID_DIFFICULTIES.find(
      d => d.toLowerCase() === question.difficulty.trim().toLowerCase()
    );
    if (!matchedDiff) {
      errors.push(`Invalid difficulty "${question.difficulty}". Supported: Easy, Medium, Hard.`);
    }
  }

  // 6. Question Content & Duplicate content check
  const questionText = (question.question || question.problemStatement || '').trim();
  if (!questionText) {
    errors.push('Question must have non-empty "question" or "problemStatement" text.');
  } else if (context.askedQuestionContents) {
    const normalizedNew = questionText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const isDuplicate = context.askedQuestionContents.some(prev => {
      const normalizedPrev = (prev || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return normalizedPrev.length > 20 && normalizedNew.includes(normalizedPrev);
    });
    if (isDuplicate) {
      errors.push('Duplicate question content detected in current assessment session.');
    }
  }

  // 7. Question Type check
  const qType = (question.questionType || '').toLowerCase();
  if (!['mcq', 'coding'].includes(qType)) {
    errors.push(`Invalid questionType "${question.questionType}". Must be "mcq" or "coding".`);
  } else if (qType === 'coding') {
    // Coding validity check
    if (canonicalSubject && !CODING_ALLOWED_SUBJECTS.includes(canonicalSubject)) {
      errors.push(
        `Coding question is not permitted for conceptual subject "${canonicalSubject}". Use "mcq" instead.`
      );
    }

    if (!Array.isArray(question.supportedLanguages) || question.supportedLanguages.length === 0) {
      errors.push('Coding question must provide at least one supported language.');
    }

    if (!question.starterCode) {
      errors.push('Coding question must provide "starterCode".');
    }

    if (!Array.isArray(question.testCases) || question.testCases.length === 0) {
      errors.push('Coding question must provide a non-empty "testCases" array.');
    }
  } else if (qType === 'mcq') {
    // MCQ validity check
    if (!Array.isArray(question.options) || question.options.length < 2) {
      errors.push('MCQ question must provide at least 2 options.');
    } else {
      const distinctOptions = new Set(question.options.map(o => (typeof o === 'string' ? o.trim() : JSON.stringify(o))));
      if (distinctOptions.size !== question.options.length) {
        errors.push('MCQ options must be distinct.');
      }

      // Check correctAnswer
      if (question.correctAnswer === undefined || question.correctAnswer === null || question.correctAnswer === '') {
        errors.push('MCQ question requires a non-empty "correctAnswer".');
      } else {
        const hasMatch = question.options.some((opt, idx) => {
          if (typeof question.correctAnswer === 'number') {
            return idx === question.correctAnswer;
          }
          if (typeof opt === 'string') {
            return opt.trim() === String(question.correctAnswer).trim() ||
              idx === parseInt(question.correctAnswer, 10);
          }
          return false;
        });

        if (!hasMatch) {
          errors.push(
            `MCQ "correctAnswer" ("${question.correctAnswer}") was not found among the provided options.`
          );
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
