module.exports = {
  validateQuestionCreate: (data) => {
    const errors = [];
    if (!data.topic_id) errors.push('topic_id is required');
    if (!data.prompt) errors.push('prompt is required');
    if (!data.type) errors.push('type is required');
    return { isValid: errors.length === 0, errors };
  }
};
