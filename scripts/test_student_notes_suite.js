/**
 * Comprehensive Automated Test Suite for PathPilot Shared Practice Notes & My Notes
 * Tests API, Persistence, Security/RLS, User Isolation, Topic Isolation, Empty States, and Subject Coverage
 */

const http = require('http');

function apiCall(path, method = 'GET', body = null, studentId = 'test_student_alpha') {
  return new Promise((resolve, reject) => {
    const url = new URL(path, 'http://localhost:5000');
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer test-token-for-${studentId}`,
        'x-student-id': studentId
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

let passCount = 0;
let failCount = 0;

function assert(condition, message, details = '') {
  if (condition) {
    passCount++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    failCount++;
    console.error(`❌ [FAIL] ${message}`);
    if (details) console.error(`   ↳ ${details}`);
  }
}

async function runTests() {
  console.log('================================================================');
  console.log('=== PATHPILOT: SHARED PRACTICE NOTES VERIFICATION SUITE       ===');
  console.log('================================================================\n');

  const studentA = 'student_test_' + Date.now();
  const studentB = 'student_test_other_' + Date.now();

  try {
    // -------------------------------------------------------------
    // TEST 1 — Aptitude: Create My Note in Time Speed Distance
    // -------------------------------------------------------------
    console.log('--- TEST 1 & 5: Note Creation for Aptitude and DSA ---');
    const note1Payload = {
      subject: 'Aptitude',
      topicId: 'time-speed-distance',
      topicName: 'Time, Speed & Distance',
      section: 'Practice',
      questionId: 'tsd-q1',
      questionTitle: 'Two Trains Problem',
      content: 'Remember to convert units before calculating.'
    };
    const createRes1 = await apiCall('/api/notes', 'POST', note1Payload, studentA);
    assert(createRes1.status === 201 && createRes1.body?.success === true, 'Aptitude note created successfully', JSON.stringify(createRes1.body));
    const note1 = createRes1.body.data;
    assert(note1.content === 'Remember to convert units before calculating.', 'Note content matches exactly');
    assert(note1.topic_id === 'time-speed-distance', 'Note is associated with time-speed-distance');
    assert(note1.subject === 'Aptitude', 'Note is associated with Aptitude');

    // -------------------------------------------------------------
    // TEST 2 — Refresh: Fetch Notes by Topic
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: Persistence & Topic Retrieval (Simulating Page Refresh) ---');
    const getRes1 = await apiCall('/api/notes?subject=Aptitude&topicId=time-speed-distance', 'GET', null, studentA);
    assert(getRes1.status === 200 && Array.isArray(getRes1.body?.data), 'Retrieved notes for Time Speed Distance');
    const foundNote1 = getRes1.body.data.find(n => n.id === note1.id);
    assert(foundNote1 && foundNote1.content === 'Remember to convert units before calculating.', 'Persisted note persists after page re-fetch');

    // -------------------------------------------------------------
    // TEST 3 — Edit Note: Update existing note without duplicates
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: Note Editing & Duplicate Prevention ---');
    const updateRes = await apiCall(`/api/notes/${note1.id}`, 'PUT', { content: 'Remember to convert units before calculating: multiply km/h by 5/18.' }, studentA);
    assert(updateRes.status === 200 && updateRes.body?.success, 'Note updated successfully');
    assert(updateRes.body.data.content.includes('5/18'), 'Updated content matches new text');

    // Verify count in topic has not duplicated
    const getResAfterUpdate = await apiCall('/api/notes?topicId=time-speed-distance', 'GET', null, studentA);
    const matchingNotes = getResAfterUpdate.body.data.filter(n => n.id === note1.id);
    assert(matchingNotes.length === 1, 'Exactly one note exists with ID (no duplicate created on edit)');
    assert(matchingNotes[0].content.includes('5/18'), 'Note displays updated content');

    // -------------------------------------------------------------
    // TEST 4 — Delete Note: Remove note
    // -------------------------------------------------------------
    console.log('\n--- TEST 4: Note Deletion ---');
    const deleteRes = await apiCall(`/api/notes/${note1.id}`, 'DELETE', null, studentA);
    assert(deleteRes.status === 200 && deleteRes.body?.success, 'Note deleted successfully');

    const getResAfterDelete = await apiCall('/api/notes?topicId=time-speed-distance', 'GET', null, studentA);
    const deletedFound = getResAfterDelete.body.data.find(n => n.id === note1.id);
    assert(!deletedFound, 'Deleted note is no longer returned in topic notes');

    // Re-create note for subsequent isolation tests
    const recreateRes = await apiCall('/api/notes', 'POST', note1Payload, studentA);
    const activeNoteA = recreateRes.body.data;

    // -------------------------------------------------------------
    // TEST 5 — DSA: Create and fetch note for DSA Two Pointers
    // -------------------------------------------------------------
    console.log('\n--- TEST 5: DSA Practice Note Creation & Verification ---');
    const dsaPayload = {
      subject: 'DSA',
      topicId: 'two-pointers',
      topicName: 'Two Pointers',
      section: 'Practice',
      questionId: 'two-sum-ii',
      questionTitle: 'Two Sum II - Input Array Is Sorted',
      content: 'Check whether the array is sorted before using this approach.'
    };
    const createDsaRes = await apiCall('/api/notes', 'POST', dsaPayload, studentA);
    assert(createDsaRes.status === 201, 'DSA Two Pointers note created');
    const dsaNote = createDsaRes.body.data;

    const getDsaNotes = await apiCall('/api/notes?subject=DSA&topicId=two-pointers', 'GET', null, studentA);
    const foundDsa = getDsaNotes.body.data.find(n => n.id === dsaNote.id);
    assert(foundDsa && foundDsa.content === dsaPayload.content, 'DSA note appears under Two Pointers');

    // -------------------------------------------------------------
    // TEST 6 — Separation: Student cannot edit/delete Official notes
    // -------------------------------------------------------------
    console.log('\n--- TEST 6: Official Notes vs Student My Notes Separation ---');
    // Attempting to delete a non-student or official ID fails or 404s
    const deleteOfficial = await apiCall('/api/notes/official-formula-card-1', 'DELETE', null, studentA);
    assert(deleteOfficial.status === 404 || deleteOfficial.status === 403, 'Official or non-existent notes cannot be deleted via student notes API');

    // -------------------------------------------------------------
    // TEST 7 — Topic Isolation: Percentages vs Time Speed Distance
    // -------------------------------------------------------------
    console.log('\n--- TEST 7: Topic Isolation ---');
    const percentagesPayload = {
      subject: 'Aptitude',
      topicId: 'percentages',
      topicName: 'Percentages',
      section: 'Practice',
      content: 'Base value changes when calculating percentage increase vs decrease.'
    };
    await apiCall('/api/notes', 'POST', percentagesPayload, studentA);

    const getTsd = await apiCall('/api/notes?topicId=time-speed-distance', 'GET', null, studentA);
    const getPerc = await apiCall('/api/notes?topicId=percentages', 'GET', null, studentA);

    const tsdHasPerc = getTsd.body.data.some(n => n.content.includes('Base value changes'));
    const percHasTsd = getPerc.body.data.some(n => n.content.includes('convert units'));

    assert(!tsdHasPerc, 'Time Speed Distance does NOT contain Percentages note');
    assert(!percHasTsd, 'Percentages does NOT contain Time Speed Distance note');

    // -------------------------------------------------------------
    // TEST 8 — User Isolation: Student B cannot see or modify Student A's notes
    // -------------------------------------------------------------
    console.log('\n--- TEST 8: Multi-Student Isolation & Security ---');
    const studentBGetRes = await apiCall('/api/notes?topicId=two-pointers', 'GET', null, studentB);
    const studentBSeesA = studentBGetRes.body.data.some(n => n.id === dsaNote.id);
    assert(!studentBSeesA, 'Student B CANNOT view Student A notes (zero leakage)');

    // Student B attempts to edit Student A's note
    const studentBHackEdit = await apiCall(`/api/notes/${dsaNote.id}`, 'PUT', { content: 'Hacked by student B' }, studentB);
    assert(studentBHackEdit.status === 403 || studentBHackEdit.status === 404, 'Student B CANNOT edit Student A note (Forbidden or Not Found)');

    // Student B attempts to delete Student A's note
    const studentBHackDelete = await apiCall(`/api/notes/${dsaNote.id}`, 'DELETE', null, studentB);
    assert(studentBHackDelete.status === 403 || studentBHackDelete.status === 404, 'Student B CANNOT delete Student A note');

    // -------------------------------------------------------------
    // TEST 9 — Empty State: Topic with no personal notes
    // -------------------------------------------------------------
    console.log('\n--- TEST 9: Empty State Verification ---');
    const emptyTopicRes = await apiCall('/api/notes?topicId=non-existent-topic', 'GET', null, studentA);
    assert(emptyTopicRes.status === 200 && emptyTopicRes.body.data.length === 0, 'Clean empty array returned for topic without notes (No fake notes)');

    // Validation: Empty text rejection
    const emptyCreateRes = await apiCall('/api/notes', 'POST', { subject: 'DSA', topicId: 'two-pointers', content: '   ' }, studentA);
    assert(emptyCreateRes.status === 400, 'Empty note submission correctly rejected with 400 Bad Request');

    // -------------------------------------------------------------
    // TEST 10 — Subject Coverage: Verify all 6 subjects
    // -------------------------------------------------------------
    console.log('\n--- TEST 10: All 6 Subjects Support (DSA, Aptitude, OOPS, DBMS, OS, CN) ---');
    const subjects = [
      { subject: 'DSA', topicId: 'two-pointers' },
      { subject: 'Aptitude', topicId: 'time-speed-distance' },
      { subject: 'OOPS', topicId: 'classes-objects' },
      { subject: 'DBMS', topicId: 'normalization' },
      { subject: 'OS', topicId: 'cpu-scheduling' },
      { subject: 'CN', topicId: 'osi-model' }
    ];

    for (const item of subjects) {
      const subRes = await apiCall('/api/notes', 'POST', {
        subject: item.subject,
        topicId: item.topicId,
        topicName: item.topicId,
        section: 'Practice',
        content: `Practice insight for ${item.subject}`
      }, studentA);
      assert(subRes.status === 201, `Subject "${item.subject}" creates student notes`);
    }

  } catch (err) {
    console.error('Test error:', err);
    failCount++;
  }

  console.log('\n================================================================');
  console.log('=== TEST RESULTS SUMMARY                                      ===');
  console.log('================================================================');
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Total:  ${passCount + failCount}`);

  if (failCount === 0) {
    console.log('\n🎉 ALL 10 PRACTICE NOTES TEST SUITES PASSED FLAWLESSLY!\n');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
