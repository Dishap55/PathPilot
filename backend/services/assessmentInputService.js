/**
 * ASSESSMENT INPUT SERVICE (STEP 1 - BACKEND)
 * 
 * Transforms submitted student profile subject levels and canonical topics
 * into structured Assessment Input objects.
 * 
 * Strict Validation Invariants:
 * ✓ Subject exists
 * ✓ Selected level exists
 * ✓ Subject has canonical topics
 * ✓ Topic IDs are valid
 * ✓ No duplicate topic IDs
 * ✓ No topics from another subject
 * ✓ No invented topics
 * ✓ No missing required subject information
 * 
 * NO question generation, NO Gemini calls, NO roadmaps, NO scoring.
 */

const {
  CANONICAL_SUBJECTS,
  VALID_STUDENT_LEVELS,
  resolveSubject,
  resolveStudentLevel,
  getCanonicalTopics,
  findSubjectForTopic
} = require('../constants/canonicalTopicRegistry');
const { getSupabaseClient } = require('../config/supabaseAdmin');

class AssessmentInputValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = 'AssessmentInputValidationError';
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}

/**
 * Validates a single subject Assessment Input object.
 */
function validateSingleSubjectAssessmentInput(input, expectedSubject = null) {
  const errors = [];

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {
      isValid: false,
      errors: ['Assessment Input must be a non-null object.']
    };
  }

  // 1. Subject validation
  if (!input.subject || typeof input.subject !== 'string' || input.subject.trim() === '') {
    errors.push('Assessment Input requires a non-empty "subject" string.');
  } else {
    const canonicalSubject = resolveSubject(input.subject);
    if (!canonicalSubject) {
      errors.push(`Invalid subject "${input.subject}". Supported subjects: ${CANONICAL_SUBJECTS.join(', ')}.`);
    } else if (expectedSubject && resolveSubject(expectedSubject) !== canonicalSubject) {
      errors.push(`Subject mismatch: expected "${expectedSubject}", but received "${input.subject}".`);
    }
  }

  // 2. Student level validation
  if (!input.studentLevel || typeof input.studentLevel !== 'string' || input.studentLevel.trim() === '') {
    errors.push('Assessment Input requires a non-empty "studentLevel" string.');
  } else {
    const canonicalLevel = resolveStudentLevel(input.studentLevel);
    if (!canonicalLevel) {
      errors.push(`Invalid student level "${input.studentLevel}". Supported levels: ${VALID_STUDENT_LEVELS.join(', ')}.`);
    }
  }

  // 3. Canonical topics validation
  const canonicalSubject = resolveSubject(input.subject);
  if (canonicalSubject) {
    if (!Array.isArray(input.topics) || input.topics.length === 0) {
      errors.push(`Assessment Input for "${canonicalSubject}" must include a non-empty "topics" array.`);
    } else {
      const canonicalList = getCanonicalTopics(canonicalSubject);
      const canonicalIdMap = new Map(canonicalList.map(t => [t.id, t.name]));

      const seenIds = new Set();

      input.topics.forEach((t, index) => {
        const itemPrefix = `Topic #${index + 1}`;
        if (!t || typeof t !== 'object') {
          errors.push(`${itemPrefix}: must be an object with "id" and "name".`);
          return;
        }

        if (!t.id || typeof t.id !== 'string' || t.id.trim() === '') {
          errors.push(`${itemPrefix}: missing or invalid "id".`);
          return;
        }

        if (!t.name || typeof t.name !== 'string' || t.name.trim() === '') {
          errors.push(`${itemPrefix} ("${t.id}"): missing or invalid "name".`);
        }

        // Duplicate check
        if (seenIds.has(t.id)) {
          errors.push(`Duplicate topic ID "${t.id}" detected in "${canonicalSubject}" assessment input.`);
        }
        seenIds.add(t.id);

        // Ownership and Invented Topic check
        if (!canonicalIdMap.has(t.id)) {
          const ownerSubject = findSubjectForTopic(t.id);
          if (ownerSubject) {
            errors.push(
              `Cross-subject topic violation: Topic "${t.id}" belongs to "${ownerSubject}", not "${canonicalSubject}". Mixing topics across subjects is forbidden.`
            );
          } else {
            errors.push(
              `Invented topic violation: Topic ID "${t.id}" does not exist in PathPilot's canonical topic registry.`
            );
          }
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates any Assessment Input object (single subject or multi-subject container).
 */
function validateAssessmentInput(input, options = {}) {
  if (!input || typeof input !== 'object') {
    return {
      isValid: false,
      errors: ['Assessment Input must be a valid object.']
    };
  }

  // Multi-subject format: { subjects: [ ... ] }
  if (Array.isArray(input.subjects)) {
    if (input.subjects.length === 0) {
      return {
        isValid: false,
        errors: ['Assessment Input "subjects" array must not be empty.']
      };
    }

    const allErrors = [];
    const seenSubjects = new Set();

    input.subjects.forEach((subjInput, index) => {
      const res = validateSingleSubjectAssessmentInput(subjInput);
      if (!res.isValid) {
        allErrors.push(...res.errors.map(e => `[Subject #${index + 1}] ${e}`));
      }

      if (subjInput && subjInput.subject) {
        const canonical = resolveSubject(subjInput.subject);
        if (canonical) {
          if (seenSubjects.has(canonical)) {
            allErrors.push(`Duplicate subject entry "${canonical}" in multi-subject assessment input.`);
          }
          seenSubjects.add(canonical);
        }
      }
    });

    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }

  // Single-subject format
  return validateSingleSubjectAssessmentInput(input, options.expectedSubject);
}

/**
 * Creates a clean, validated Assessment Input object for a single subject and level.
 */
function createSubjectAssessmentInput(subject, studentLevel) {
  const canonicalSubject = resolveSubject(subject);
  if (!canonicalSubject) {
    throw new AssessmentInputValidationError(
      `Cannot create Assessment Input: Subject "${subject}" is not recognized. Supported subjects: ${CANONICAL_SUBJECTS.join(', ')}`,
      [`Invalid subject "${subject}".`]
    );
  }

  const canonicalLevel = resolveStudentLevel(studentLevel);
  if (!canonicalLevel) {
    throw new AssessmentInputValidationError(
      `Cannot create Assessment Input: Student level "${studentLevel}" is not recognized. Supported levels: ${VALID_STUDENT_LEVELS.join(', ')}`,
      [`Invalid student level "${studentLevel}".`]
    );
  }

  const topics = getCanonicalTopics(canonicalSubject);

  const assessmentInput = {
    subject: canonicalSubject,
    studentLevel: canonicalLevel,
    topics
  };

  const validation = validateSingleSubjectAssessmentInput(assessmentInput);
  if (!validation.isValid) {
    throw new AssessmentInputValidationError(
      `Assessment Input validation failed for ${canonicalSubject}: ${validation.errors.join('; ')}`,
      validation.errors
    );
  }

  return assessmentInput;
}

/**
 * Normalizes student form subjectLevels into a standardized { [canonicalSubject]: canonicalLevel } map.
 */
function normalizeFormSubjectLevels(formSubjectLevels) {
  const normalized = {};

  if (!formSubjectLevels) return normalized;

  if (Array.isArray(formSubjectLevels)) {
    formSubjectLevels.forEach((item) => {
      if (!item || typeof item !== 'object') return;
      const subj = item.subject || item.code || item.subject_code || item.name;
      const lvl = item.level || item.studentLevel;
      if (subj && lvl) {
        const canonicalSubj = resolveSubject(subj);
        const canonicalLvl = resolveStudentLevel(lvl);
        if (canonicalSubj && canonicalLvl) {
          normalized[canonicalSubj] = canonicalLvl;
        }
      }
    });
  } else if (typeof formSubjectLevels === 'object') {
    Object.entries(formSubjectLevels).forEach(([key, val]) => {
      const canonicalSubj = resolveSubject(key);
      const canonicalLvl = resolveStudentLevel(val);
      if (canonicalSubj && canonicalLvl) {
        normalized[canonicalSubj] = canonicalLvl;
      }
    });
  }

  return normalized;
}

/**
 * Creates multi-subject Assessment Input from submitted student form levels.
 * Preserves each subject independently.
 */
function createAssessmentInputsFromForm(formSubjectLevels) {
  const normalizedLevels = normalizeFormSubjectLevels(formSubjectLevels);
  const subjects = [];

  for (const subjectKey of CANONICAL_SUBJECTS) {
    if (normalizedLevels[subjectKey]) {
      const singleInput = createSubjectAssessmentInput(subjectKey, normalizedLevels[subjectKey]);
      subjects.push(singleInput);
    }
  }

  if (subjects.length === 0) {
    throw new AssessmentInputValidationError(
      'Cannot create Assessment Input: No valid subject levels found in student form data.',
      ['No valid canonical subjects with recognized levels were provided.']
    );
  }

  const multiSubjectInput = { subjects };
  const validation = validateAssessmentInput(multiSubjectInput);
  if (!validation.isValid) {
    throw new AssessmentInputValidationError(
      `Multi-subject Assessment Input validation failed: ${validation.errors.join('; ')}`,
      validation.errors
    );
  }

  return multiSubjectInput;
}

/**
 * Extracts and creates Assessment Input for a specific subject from student form data.
 */
function getAssessmentInputForSubject(formDataOrSubjectLevels, targetSubject) {
  const canonicalTarget = resolveSubject(targetSubject);
  if (!canonicalTarget) {
    throw new AssessmentInputValidationError(
      `Requested subject "${targetSubject}" is not a valid canonical subject.`,
      [`Invalid subject "${targetSubject}".`]
    );
  }

  const rawLevels = formDataOrSubjectLevels?.subjectLevels || formDataOrSubjectLevels;
  const normalizedLevels = normalizeFormSubjectLevels(rawLevels);

  const studentLevel = normalizedLevels[canonicalTarget];
  if (!studentLevel) {
    throw new AssessmentInputValidationError(
      `No starting level found for subject "${canonicalTarget}" in submitted student form data.`,
      [`Missing level for subject "${canonicalTarget}".`]
    );
  }

  return createSubjectAssessmentInput(canonicalTarget, studentLevel);
}

/**
 * Loads student's persisted subject levels from database and constructs Assessment Input.
 */
async function getAssessmentInputFromDatabase(studentId, targetSubject = null, token = null) {
  const client = getSupabaseClient(token);

  if (!studentId || studentId === 'demo-student-id') {
    const demoLevels = {
      DSA: 'Beginner',
      OOPS: 'Intermediate',
      Aptitude: 'Beginner',
      DBMS: 'Beginner',
      OS: 'Intermediate',
      CN: 'Beginner'
    };

    if (targetSubject) {
      return getAssessmentInputForSubject(demoLevels, targetSubject);
    }
    return createAssessmentInputsFromForm(demoLevels);
  }

  const { data, error } = await client
    .from('student_subject_levels')
    .select('*, subjects(code, name)')
    .eq('student_id', studentId);

  if (error) {
    throw error;
  }

  const levelsMap = {};
  (data || []).forEach(row => {
    const code = row.subjects?.code || row.subject_id;
    if (code) {
      levelsMap[code] = row.level;
    }
  });

  if (targetSubject) {
    return getAssessmentInputForSubject(levelsMap, targetSubject);
  }

  return createAssessmentInputsFromForm(levelsMap);
}

module.exports = {
  AssessmentInputValidationError,
  validateSingleSubjectAssessmentInput,
  validateAssessmentInput,
  createSubjectAssessmentInput,
  normalizeFormSubjectLevels,
  createAssessmentInputsFromForm,
  getAssessmentInputForSubject,
  getAssessmentInputFromDatabase
};
