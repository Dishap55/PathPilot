module.exports = {
  validateSignup: (data) => {
    const errors = [];
    if (!data.email || !data.email.includes('@')) errors.push('Valid email is required');
    if (!data.password || data.password.length < 6) errors.push('Password must be at least 6 characters');
    return { isValid: errors.length === 0, errors };
  },
  validateLogin: (data) => {
    const errors = [];
    if (!data.email) errors.push('Email is required');
    if (!data.password) errors.push('Password is required');
    return { isValid: errors.length === 0, errors };
  }
};
