module.exports = {
  validateRunCode: (data) => {
    const errors = [];
    if (!data.source_code) errors.push('source_code is required');
    if (!data.language) errors.push('language is required');
    return { isValid: errors.length === 0, errors };
  }
};
