const judge0Client = require('../integrations/judge0Client');

class CodeExecutionService {
  async runCode(sourceCode, language, stdin = '') {
    return await judge0Client.executeCode(sourceCode, language, stdin);
  }
  async submitCode(sourceCode, language, questionId, studentId) {
    const result = await judge0Client.executeCode(sourceCode, language);
    return {
      question_id: questionId,
      student_id: studentId,
      status: 'passed',
      result
    };
  }
}
module.exports = new CodeExecutionService();
