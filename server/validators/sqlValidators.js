module.exports = {
  validateExecuteSql: (data) => {
    const errors = [];
    if (!data.query) errors.push('query string is required');
    return { isValid: errors.length === 0, errors };
  }
};
