module.exports = {
  validateAttempt: (data) => {
    const errors = [];
    if (data.answer === undefined && !data.code && !data.sql) {
      errors.push('Submission must include answer, code, or sql');
    }
    return { isValid: errors.length === 0, errors };
  }
};
