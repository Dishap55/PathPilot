const { sendSuccess } = require('../utils/response');

module.exports = {
  getTopicsBySubject: async (req, res, next) => {
    try {
      const { subjectId } = req.params;
      const topics = [
        { id: 'top_1', subject_id: subjectId, name: 'Two Pointers', supports_pattern: true },
        { id: 'top_2', subject_id: subjectId, name: 'Sliding Window', supports_pattern: true },
        { id: 'top_3', subject_id: subjectId, name: 'Binary Search', supports_pattern: true }
      ];
      return sendSuccess(res, topics);
    } catch (e) { next(e); }
  },
  getTopicDetails: async (req, res, next) => {
    try {
      const { topicId } = req.params;
      return sendSuccess(res, { id: topicId, name: 'Two Pointers & Sliding Window' });
    } catch (e) { next(e); }
  },
  getTopicMaterial: async (req, res, next) => {
    try {
      const { topicId } = req.params;
      return sendSuccess(res, {
        topic_id: topicId,
        concept: 'Two Pointers technique maintains two index pointers to traverse a list in single pass.',
        examples: ['Finding pairs in sorted array summing to target.'],
        edge_cases: ['Empty arrays', 'Single elements', 'All identical elements']
      });
    } catch (e) { next(e); }
  }
};
