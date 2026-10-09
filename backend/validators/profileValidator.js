/**
 * PathPilot Profile Validator
 *
 * Enforces strict validation according to the Technical Master Specification.
 * Rejects abbreviations, unauthorized subject codes, or non-approved level names.
 */

const VALID_PREPARATION_UNITS = ['Days', 'Months', 'Years', 'days', 'months', 'years'];
const VALID_SUBJECT_LEVELS = ['Beginner', 'Intermediate', 'Professional'];
const REQUIRED_SUBJECT_CODES = ['DSA', 'OOPS', 'APT', 'DBMS', 'OS', 'CN'];

function validateProfileSetup(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: ['Request payload must be a valid JSON object.']
    };
  }

  // 1. Personal & Academic Fields
  if (!data.full_name || typeof data.full_name !== 'string' || data.full_name.trim().length === 0) {
    errors.push('full_name is required and must not be empty.');
  }

  if (!data.degree || typeof data.degree !== 'string' || data.degree.trim().length === 0) {
    errors.push('degree is required and must not be empty.');
  }

  if (!data.branch || typeof data.branch !== 'string' || data.branch.trim().length === 0) {
    errors.push('branch is required and must not be empty.');
  }

  const currentYear = Number(data.current_year);
  if (!Number.isInteger(currentYear) || currentYear < 1 || currentYear > 6) {
    errors.push('current_year is required and must be an integer between 1 and 6.');
  }

  const currentSemester = Number(data.current_semester);
  if (!Number.isInteger(currentSemester) || currentSemester < 1 || currentSemester > 12) {
    errors.push('current_semester is required and must be an integer between 1 and 12.');
  }

  const graduationYear = Number(data.graduation_year);
  if (!Number.isInteger(graduationYear) || graduationYear < 2000 || graduationYear > 2100) {
    errors.push('graduation_year is required and must be a valid four-digit year (>= 2000).');
  }

  // 2. Preparation Time Fields (Strict Word Units & Numeric Amount)
  const prepValue = Number(data.preparation_value);
  if (!Number.isInteger(prepValue) || prepValue <= 0) {
    errors.push('preparation_value is required and must be a positive integer.');
  }

  if (!data.preparation_unit || !VALID_PREPARATION_UNITS.includes(data.preparation_unit)) {
    errors.push(`preparation_unit is required and must be one of: ${VALID_PREPARATION_UNITS.join(', ')}. Received: "${data.preparation_unit}".`);
  }

  // 3. Target Exam / Placement Date
  if (!data.target_date || typeof data.target_date !== 'string') {
    errors.push('target_date is required.');
  } else {
    const parsedDate = new Date(data.target_date);
    if (isNaN(parsedDate.getTime())) {
      errors.push('target_date must be a valid date string (YYYY-MM-DD).');
    }
  }

  // 4. Six Independent Subject Levels
  if (!data.subjectLevels || typeof data.subjectLevels !== 'object' || Array.isArray(data.subjectLevels)) {
    errors.push(`subjectLevels object is required containing all six subjects: ${REQUIRED_SUBJECT_CODES.join(', ')}.`);
  } else {
    for (const code of REQUIRED_SUBJECT_CODES) {
      const level = data.subjectLevels[code];
      if (!level) {
        errors.push(`Missing level for required subject: ${code}.`);
      } else if (!VALID_SUBJECT_LEVELS.includes(level)) {
        errors.push(`Invalid level for subject "${code}": "${level}". Must be one of: ${VALID_SUBJECT_LEVELS.join(', ')}.`);
      }
    }

    // Disallow unexpected or unapproved subject codes
    for (const key of Object.keys(data.subjectLevels)) {
      if (!REQUIRED_SUBJECT_CODES.includes(key)) {
        errors.push(`Unapproved subject code "${key}" in subjectLevels. Allowed codes: ${REQUIRED_SUBJECT_CODES.join(', ')}.`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateProfileSetup,
  VALID_PREPARATION_UNITS,
  VALID_SUBJECT_LEVELS,
  REQUIRED_SUBJECT_CODES
};
