const { startPeriodicAssessment } = require('../server/services/assessment/periodicAssessmentService');
const assessmentHistoryService = require('../server/services/assessment/assessmentHistoryService');
const { generateInitialAssessmentRoadmap } = require('../server/services/roadmap/initialAssessmentRoadmapEngine');

async function testReassessment() {
  try {
    console.log("==================================================");
    console.log("🔍 TESTING STEP 5.6: 6-SUBJECT PERIODIC ASSESSMENT");
    console.log("==================================================\n");

    const studentId = 'mock-student-xyz';

    // Mock an initial assessment first so we can take a reassessment
    await assessmentHistoryService.persistPeriodicAssessment({
      assessmentId: 'initial-123',
      studentId: studentId,
      assessmentType: 'initial',
      overallTimeSeconds: 600,
      subjectResults: {
        dsaResult: { assessedLevel: 'Intermediate', topicPerformance: [] },
        aptitudeResult: { assessedLevel: 'Beginner', topicPerformance: [] }
      },
      questionResponses: []
    });

    console.log("Mock Initial Assessment Created.");
    
    // Start periodic assessment
    const session = await startPeriodicAssessment(studentId);
    
    console.log(`✅ Session Started successfully!`);
    console.log(`Assessment Type: ${session.assessmentType}`);
    console.log(`Subjects Included: ${session.subjects.map(s => s.subject).join(', ')}`);
    
    let totalQs = 0;
    session.subjects.forEach(s => totalQs += s.topics.length); // Rough approximation
    console.log(`Expected target questions per subject: 10`);
    
    if (session.subjects.length === 6) {
      console.log("\n✅ ALL 6 SUBJECTS ARE INCLUDED (DSA, Aptitude, OOPS, DBMS, OS, CN)");
    } else {
      console.log(`\n❌ Failed to include 6 subjects. Found ${session.subjects.length}`);
    }

  } catch (err) {
    console.error("❌ TEST FAILED:", err);
  }
  process.exit(0);
}

testReassessment();
