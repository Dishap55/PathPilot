const progressService = require('../server/services/progressService');
const STUDENT_ID = '240898c5-31b1-4dfe-81c7-cc42b139ced1';
async function test() {
  try {
    const data = await progressService.getSubjectProgress(STUDENT_ID, 'DSA');
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("ERROR:", err);
  }
  process.exit(0);
}
test();
