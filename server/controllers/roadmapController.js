const roadmapService = require('../services/roadmapService');
const { sendSuccess, sendError } = require('../utils/response');

module.exports = {
  getRoadmap: async (req, res, next) => {
    try {
      const data = await roadmapService.getRoadmap(req.user.id);
      return sendSuccess(res, data);
    } catch (e) { next(e); }
  },

  generateRoadmap: async (req, res, next) => {
    try {
      const studentId = req.user?.id;
      if (!studentId || studentId === 'demo-student-id') {
        return sendError(res, 'A signed-in student is required to generate a personalized roadmap.', 401);
      }
      const result = await roadmapService.generateRoadmap(studentId);
      if (!result.success) {
        return sendError(res, 'Complete the Initial Assessment before generating a personalized roadmap.', 409);
      }
      return sendSuccess(res, result);
    } catch (e) { next(e); }
  },

  getMilestone: async (req, res, next) => {
    try {
      const { id } = req.params;
      return sendSuccess(res, {
        isLocked: false,
        milestone: {
          id: id || '1',
          sequence_no: 1,
          topic: 'Two Pointers & Sliding Window',
          subject: 'DSA',
          stage: 'Core Pattern Mastery',
          estimated_days: 4,
          status: 'in_progress'
        },
        content: {
          title: 'Two Pointers & Sliding Window Complete Overview',
          subject: 'DSA',
          topic: 'Two Pointers',
          why_selected: 'Two Pointers is a foundational algorithm pattern frequently tested in technical placement interviews (Amazon, Google, Microsoft, Meta).',
          explanation: 'The Two-Pointer technique uses two index markers traversing a sequential data structure concurrently. It optimizes nested loops O(N^2) searches into linear O(N) traversals.',
          preferred_language: 'C++',
          code_example: `#include <vector>\n#include <iostream>\n\n// Opposite-direction Two Pointer example for Pair Sum in Sorted Array\nbool hasPairWithSum(const std::vector<int>& arr, int target) {\n    int left = 0;\n    int right = arr.size() - 1;\n    \n    while (left < right) {\n        int sum = arr[left] + arr[right];\n        if (sum == target) return true;\n        else if (sum < target) left++; // Need a larger sum -> move left rightward\n        else right--; // Need a smaller sum -> move right leftward\n    }\n    return false;\n}`,
          syntax: 'int left = 0, right = arr.size() - 1;\nwhile (left < right) {\n    // Evaluate condition & move pointers\n}',
          edge_cases: [
            'Empty arrays or arrays with fewer than 2 elements',
            'Arrays containing negative values or zeros',
            'Duplicates that might yield duplicate pairs (e.g. 3Sum)'
          ],
          placement_patterns: 'Opposite direction, Same direction, Fast & Slow, Sliding Window, Partitioning, Sorted Arrays, Strings, Merging, Multi-Pointer'
        },
        progress: {
          completed_questions: 1,
          total_questions: 3,
          percent: 33
        }
      });
    } catch (e) { next(e); }
  },

  getPracticeQuestions: async (req, res, next) => {
    try {
      const { id } = req.params;
      return sendSuccess(res, {
        milestone_id: id,
        questions: [
          {
            id: 'q_mcq_1',
            type: 'mcq',
            title: 'Pointer Movement Invariant',
            question: 'In Pair Sum in a sorted array, if arr[left] + arr[right] > target, which pointer should move?',
            options: [
              'Move left pointer rightward (left++)',
              'Move right pointer leftward (right--)',
              'Move both pointers inward',
              'Reset left pointer to 0'
            ],
            correct_option: 1,
            explanation: 'Since the array is sorted in ascending order, decreasing the right pointer reduces the current sum toward the target.'
          },
          {
            id: 'q_coding_1',
            type: 'coding',
            title: 'Two Sum II - Input Array Is Sorted',
            description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
            starter_code: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        // Write your code here\n        \n        return {};\n    }\n};`,
            language: 'C++'
          }
        ]
      });
    } catch (e) { next(e); }
  },

  submitAttempt: async (req, res, next) => {
    try {
      const { question_type, selected_option, code, language } = req.body;

      if (question_type === 'coding') {
        const execResult = await codeExecutionService.runCode(code, language || 'cpp');
        const isCorrect = Boolean(execResult?.passed || execResult?.status?.id === 3);
        return sendSuccess(res, {
          evaluation: {
            is_correct: isCorrect,
            status: execResult?.status?.description || (isCorrect ? 'Accepted' : 'Wrong Answer'),
            stdout: execResult?.stdout || execResult?.stderr,
            score: isCorrect ? 100 : 0,
            feedback: isCorrect
              ? 'All test cases passed successfully!'
              : (execResult?.stderr || 'Test cases verification failed: output mismatch or syntax issue.')
          },
          progress: {
            completed_questions: isCorrect ? 3 : 2,
            total_questions: 3,
            percent: isCorrect ? 100 : 66
          }
        });
      }

      const isCorrect = selected_option === 1;
      return sendSuccess(res, {
        evaluation: {
          is_correct: isCorrect,
          score: isCorrect ? 100 : 0,
          feedback: isCorrect ? 'Correct! Moving right-- reduces sum when array is sorted.' : 'Incorrect. Try moving right-- to decrease the sum.'
        },
        progress: {
          completed_questions: 2,
          total_questions: 3,
          percent: 66
        }
      });
    } catch (e) { next(e); }
  },

  completeMilestone: async (req, res, next) => {
    try {
      const { id } = req.params;
      return sendSuccess(res, {
        success: true,
        message: 'Milestone 100% completed!',
        nextMilestone: {
          id: '2',
          sequence_no: 2,
          topic: 'Binary Search Mastery'
        }
      });
    } catch (e) { next(e); }
  }
};
