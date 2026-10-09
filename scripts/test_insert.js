const assessmentHistoryService = require('../server/services/assessment/assessmentHistoryService');
const STUDENT_ID = '240898c5-31b1-4dfe-81c7-cc42b139ced1';
async function run() {
  try {
    await assessmentHistoryService.persistInitialAssessment({
      assessmentId: 'initial-disha-1',
      studentId: STUDENT_ID,
      dsaResult: { assessedLevel: 'Beginner', topicPerformance: [] },
      aptitudeResult: { assessedLevel: 'Beginner', topicPerformance: [] },
      overallTimeSeconds: 1200,
      questionResponses: []
    });
  } catch (err) {
    console.error("ERROR:", err);
  }
}
run();
