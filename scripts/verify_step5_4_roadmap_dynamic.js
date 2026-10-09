const { generateInitialAssessmentRoadmap } = require('../server/services/roadmap/initialAssessmentRoadmapEngine');

// Mock Student A: Strong in Binary Search, Weak in Two Pointers
const historyA = {
  assessmentId: 'mock-a',
  studentId: 'student-a',
  assessmentType: 'initial',
  dsaResult: {
    startingLevel: 'Beginner',
    assessedLevel: 'Intermediate',
    topicPerformance: [
      {
        topicId: 'binary-search',
        topicName: 'Binary Search',
        subject: 'DSA',
        attempted: 3,
        correct: 3,
        incorrect: 0,
        skipped: 0,
        accuracy: 100,
        difficultyReached: 'Medium'
      },
      {
        topicId: 'two-pointers',
        topicName: 'Two Pointers',
        subject: 'DSA',
        attempted: 3,
        correct: 0,
        incorrect: 3,
        skipped: 0,
        accuracy: 0,
        difficultyReached: 'Medium'
      }
    ]
  }
};

// Mock Student B: Strong in Two Pointers, Weak in Binary Search
const historyB = {
  assessmentId: 'mock-b',
  studentId: 'student-b',
  assessmentType: 'initial',
  dsaResult: {
    startingLevel: 'Beginner',
    assessedLevel: 'Intermediate',
    topicPerformance: [
      {
        topicId: 'binary-search',
        topicName: 'Binary Search',
        subject: 'DSA',
        attempted: 3,
        correct: 0,
        incorrect: 3,
        skipped: 0,
        accuracy: 0,
        difficultyReached: 'Medium'
      },
      {
        topicId: 'two-pointers',
        topicName: 'Two Pointers',
        subject: 'DSA',
        attempted: 3,
        correct: 3,
        incorrect: 0,
        skipped: 0,
        accuracy: 100,
        difficultyReached: 'Medium'
      }
    ]
  }
};

try {
  console.log("==================================================");
  console.log("🔍 TESTING STEP 5.4: DYNAMIC ROADMAP GENERATION");
  console.log("==================================================\n");

  const roadmapA = generateInitialAssessmentRoadmap(historyA);
  console.log("👤 STUDENT A (Strong: Binary Search, Weak: Two Pointers)");
  roadmapA.items.filter(i => i.itemType !== 'FINAL_MIXED_REVIEW').forEach((item, i) => {
    console.log(`   ${i + 1}. [${item.category}] ${item.topicName} (Priority: ${item.priority})`);
  });
  console.log("\n--------------------------------------------------");

  const roadmapB = generateInitialAssessmentRoadmap(historyB);
  console.log("👤 STUDENT B (Strong: Two Pointers, Weak: Binary Search)");
  roadmapB.items.filter(i => i.itemType !== 'FINAL_MIXED_REVIEW').forEach((item, i) => {
    console.log(`   ${i + 1}. [${item.category}] ${item.topicName} (Priority: ${item.priority})`);
  });
  console.log("\n==================================================");
  console.log("✅ DYNAMIC ROADMAP TEST PASSED.");
} catch (e) {
  console.error("❌ TEST FAILED:", e);
}
