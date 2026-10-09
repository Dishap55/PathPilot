const judge0Client = require('../integrations/judge0Client');

class CodeExecutionService {
  async runCode(sourceCode, language, stdin = '') {
    return await judge0Client.executeCode(sourceCode, language, stdin);
  }
  async submitCode(sourceCode, language, questionId, studentId) {
    const result = await judge0Client.executeCode(sourceCode, language);
    const passed = Boolean(result?.passed || result?.status?.id === 3);
    return {
      question_id: questionId,
      student_id: studentId,
      status: passed ? 'passed' : 'failed',
      result
    };
  }
}
module.exports = new CodeExecutionService();
