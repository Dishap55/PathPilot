module.exports = {
  validateProfile: (data) => {
    const errors = [];
    if (!data.full_name) errors.push('Full name is required');
    if (!data.degree) errors.push('Degree is required');
    if (!data.target_date) errors.push('Target date is required');
    return { isValid: errors.length === 0, errors };
  }
};
