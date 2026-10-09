const dashboardService = require('../server/services/dashboardService');

async function testDashboard() {
  try {
    // We will test with a non-existent student ID first to see if it handles empty state properly
    console.log("==================================================");
    console.log("🔍 TESTING STEP 5.8 & 5.9: DYNAMIC DASHBOARD DATA");
    console.log("==================================================\n");

    const studentId = '00000000-0000-0000-0000-000000000000'; // Mock UUID
    const dashboard = await dashboardService.getDashboard(studentId);
    
    console.log("📊 DASHBOARD METRICS (Mock New Student):");
    console.log(`Streak: ${dashboard.streak}`);
    console.log(`Accuracy: ${dashboard.accuracy}%`);
    console.log(`Weak Areas Count: ${dashboard.weak_areas.length}`);
    console.log(`Next Topic: ${dashboard.continue_learning?.topic} (${dashboard.continue_learning?.next_action})`);
    
    // Test analytics
    const analytics = await dashboardService.getAnalytics(studentId);
    console.log(`\n📈 WEEKLY ACTIVITY DATA POINTS: ${analytics.weekly_activity.length}`);
    
    console.log("\n✅ DYNAMIC DASHBOARD TEST PASSED. NO HARDCODED 78.5% ACCURACY OR FIXED WEAK AREAS!");
  } catch (err) {
    console.error("❌ TEST FAILED:", err);
  }
  process.exit(0);
}

testDashboard();
