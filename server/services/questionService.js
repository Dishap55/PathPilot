class QuestionService {
  async getQuestion(id) {
    return {
      id,
      prompt: 'Given an integer array nums and target, find indices that sum to target.',
      type: 'coding',
      difficulty: 'easy',
      topic: 'Two Pointers',
      expected_time: 15
    };
  }
  async recordAttempt(studentId, questionId, attemptData) {
    return {
      attempt_id: 'att_' + Date.now(),
      question_id: questionId,
      student_id: studentId,
      result: 'passed',
      time_spent: attemptData.time_spent || 300,
      recorded_at: new Date().toISOString()
    };
  }
  async getRelatedQuestions(questionId) {
    return [
      { id: 'rel_1', prompt: '3Sum - Find unique triplets summing to zero', difficulty: 'medium' },
      { id: 'rel_2', prompt: 'Two Sum II - Input array is sorted', difficulty: 'easy' }
    ];
  }
}
module.exports = new QuestionService();
