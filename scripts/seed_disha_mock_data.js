const { supabase } = require('../server/config/supabase');
const assessmentHistoryService = require('../server/services/assessment/assessmentHistoryService');
const roadmapService = require('../server/services/roadmapService');
const crypto = require('crypto');

const STUDENT_ID = '240898c5-31b1-4dfe-81c7-cc42b139ced1';

async function seedDishaMockData() {
  console.log("Seeding Disha Patil Mock Data (with fixed initial assessment topics)...");
  const nowStr = new Date().toISOString();
  
  const { data: subjects } = await supabase.from('subjects').select('id, code, name');
  const dsaSubId = subjects.find(s => s.code === 'DSA')?.id;
  const aptSubId = subjects.find(s => s.code === 'APT')?.id;
  
  const requiredTopics = [
    { name: 'Two Pointers', subject_id: dsaSubId },
    { name: 'Sorting Algorithms', subject_id: dsaSubId },
    { name: 'Graphs', subject_id: dsaSubId },
    { name: 'Percentages', subject_id: aptSubId },
    { name: 'Time, Speed and Distance', subject_id: aptSubId },
    { name: 'Binary Search', subject_id: dsaSubId },
    { name: 'Arrays', subject_id: dsaSubId }
  ];
  
  let dbTopics = [];
  for (const t of requiredTopics) {
    let { data } = await supabase.from('topics')
      .select('id, name')
      .ilike('name', `%${t.name.split(' ')[0]}%`)
      .limit(1)
      .maybeSingle();
    dbTopics.push(data);
  }

  const findTopicId = (name) => dbTopics.find(t => t.name.toLowerCase().includes(name.split(' ')[0].toLowerCase()))?.id;

  // Clean assessment history and roadmaps
  await supabase.from('assessment_history').delete().eq('student_id', STUDENT_ID);
  await supabase.from('personalized_roadmaps').delete().eq('student_id', STUDENT_ID);

  try {
    // Create Initial Assessment WITH WEAK TOPICS so the roadmap engine generates nodes!
    console.log("Seeding Initial Assessment with weaknesses...");
    await assessmentHistoryService.persistInitialAssessment({
      assessmentId: 'initial-disha-1',
      studentId: STUDENT_ID,
      dsaResult: { 
        assessedLevel: 'Intermediate', 
        topicPerformance: [
          { topicId: 'two-pointers', topicName: 'Two Pointers', subject: 'DSA', correct: 1, attempted: 5, accuracy: 20, difficultyReached: 'Medium' },
          { topicId: 'sorting', topicName: 'Sorting Algorithms', subject: 'DSA', correct: 1, attempted: 4, accuracy: 25, difficultyReached: 'Medium' },
          { topicId: 'graphs', topicName: 'Graphs', subject: 'DSA', correct: 0, attempted: 4, accuracy: 0, difficultyReached: 'Easy' },
          { topicId: 'binary-search', topicName: 'Binary Search', subject: 'DSA', correct: 5, attempted: 5, accuracy: 100, difficultyReached: 'Hard' },
          { topicId: 'arrays', topicName: 'Arrays', subject: 'DSA', correct: 5, attempted: 5, accuracy: 100, difficultyReached: 'Hard' }
        ] 
      },
      aptitudeResult: { 
        assessedLevel: 'Beginner', 
        topicPerformance: [
          { topicId: 'percentages', topicName: 'Percentages', subject: 'Aptitude', correct: 1, attempted: 5, accuracy: 20, difficultyReached: 'Easy' },
          { topicId: 'time-speed-distance', topicName: 'Time, Speed and Distance', subject: 'Aptitude', correct: 1, attempted: 5, accuracy: 20, difficultyReached: 'Easy' }
        ] 
      },
      overallTimeSeconds: 1200,
      questionResponses: [],
      startedAt: nowStr,
      completedAt: nowStr,
    });

    // Generate Roadmap
    console.log("Generating Roadmap based on Initial Assessment...");
    await roadmapService.generateRoadmap(STUDENT_ID);
    console.log("\n✅ ALL MOCK DATA SEEDED SUCCESSFULLY FOR DISHA.");
  } catch (err) {
    console.error("❌ ERROR SEEDING ROADMAP:", err);
  }
  process.exit(0);
}

seedDishaMockData();
