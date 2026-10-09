class AdminService {
  async listStudents() {
    return [
      { id: 'std_1', name: 'Student 1', branch: 'CSIT', graduation: 2026, status: 'active' },
      { id: 'std_2', name: 'Student 2', branch: 'CSIT', graduation: 2026, status: 'active' }
    ];
  }
  async listTemplates() {
    return [
      { id: 'tmpl_1', name: 'DSA Diagnostic Level 1', subject: 'DSA', questions: 10, status: 'published' }
    ];
  }
  async createTemplate(data) {
    return { id: 'tmpl_' + Date.now(), ...data };
  }
  async updateTemplate(id, data) {
    return { id, ...data, updated: true };
  }
  async listQuestions() {
    return [
      { id: 'q_1', prompt: 'Two Sum Problem', type: 'coding', difficulty: 'easy', active: true }
    ];
  }
  async createQuestion(data) {
    return { id: 'q_' + Date.now(), ...data };
  }
  async updateQuestion(id, data) {
    return { id, ...data, updated: true };
  }
  async deleteQuestion(id) {
    return { id, deleted: true };
  }
}
module.exports = new AdminService();
