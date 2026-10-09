const dashboardService = require('../server/services/dashboardService');
const STUDENT_ID = '240898c5-31b1-4dfe-81c7-cc42b139ced1';

async function test() {
  try {
    const data = await dashboardService.getDashboard(STUDENT_ID);
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("ERROR:", err);
  }
  process.exit(0);
}
test();
