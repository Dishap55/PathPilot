const fs = require('fs');
const path = require('path');

const enginePath = path.join(__dirname, '../client/src/services/assessment/assessmentEngine.js');
let engineContent = fs.readFileSync(enginePath, 'utf8');

// Modify initSession signature to accept isTimed
engineContent = engineContent.replace(
  /async initSession\(\{ assessmentInput, studentId = 'guest', forceNew = false, targetQuestionsPerSubject = null, assessmentType = null \}\) \{/,
  "async initSession({ assessmentInput, studentId = 'guest', forceNew = false, targetQuestionsPerSubject = null, assessmentType = null, isTimed = true }) {"
);

// Store isTimed in local state
engineContent = engineContent.replace(
  /this\.currentSubjectIndex = 0;/g,
  "this.currentSubjectIndex = 0;\n    this.isTimed = isTimed;"
);

// Add isTimed to getState()
engineContent = engineContent.replace(
  /return \{\n\s+assessmentType: this\.assessmentType,\n\s+status: this\.status,/g,
  "return {\n      assessmentType: this.assessmentType,\n      status: this.status,\n      isTimed: this.isTimed,"
);

// Store isTimed in saveToStorage
engineContent = engineContent.replace(
  /const payload = \{\n\s+assessmentId: this\.assessmentId,/g,
  "const payload = {\n      isTimed: this.isTimed,\n      assessmentId: this.assessmentId,"
);

// Restore isTimed in restoreFromStorage
engineContent = engineContent.replace(
  /this\.assessmentId = payload\.assessmentId;/g,
  "this.assessmentId = payload.assessmentId;\n      this.isTimed = payload.isTimed !== false;"
);

fs.writeFileSync(enginePath, engineContent);

const reassessmentPath = path.join(__dirname, '../client/src/pages/student/Reassessment.jsx');
let reassessContent = fs.readFileSync(reassessmentPath, 'utf8');

reassessContent = reassessContent.replace(
  /targetQuestionsPerSubject: 5,\n\s+assessmentType: 'periodic'/g,
  "targetQuestionsPerSubject: 10,\n        assessmentType: 'periodic',\n        isTimed: isTimed"
);

fs.writeFileSync(reassessmentPath, reassessContent);
console.log('Timer patched.');
