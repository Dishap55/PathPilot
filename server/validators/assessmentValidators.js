module.exports = {
  validateStartAssessment: (data) => {
    const errors = [];
    if (!data.template_id && !data.subject_id) errors.push('template_id or subject_id is required');
    return { isValid: errors.length === 0, errors };
  },
  validateSubmitAssessment: (data) => {
    const errors = [];
    if (!Array.isArray(data.answers)) errors.push('answers array is required');
    return { isValid: errors.length === 0, errors };
  }
};
