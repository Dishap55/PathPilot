const assert = require('node:assert/strict');

const BASE_URL = 'http://127.0.0.1:3001';
const CDP_URL = 'http://127.0.0.1:9222';
let activePage = null;

async function attachToTarget(target) {
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let sequence = 0;
  const pending = new Map();
  const networkEvents = [];
  const requestMethods = new Map();
  const requestPaths = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Network.requestWillBeSent' && message.params.request.url.includes('/api/assessment')) {
      const requestId = message.params.requestId;
      const method = message.params.request.method;
      const path = new URL(message.params.request.url).pathname;
      requestMethods.set(requestId, method);
      requestPaths.set(requestId, path);
      networkEvents.push({ event: 'request', requestId, url: path, method });
    }
    if (message.method === 'Network.responseReceived' && message.params.response.url.includes('/api/assessment')) {
      const requestId = message.params.requestId;
      networkEvents.push({ event: 'response', requestId, url: new URL(message.params.response.url).pathname, method: requestMethods.get(requestId), status: message.params.response.status });
    }
    if (message.method === 'Network.loadingFailed' && requestPaths.has(message.params.requestId)) {
      const requestId = message.params.requestId;
      networkEvents.push({ event: 'failed', requestId, url: requestPaths.get(requestId), method: requestMethods.get(requestId), errorText: message.params.errorText });
    }
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      message.error ? reject(new Error(message.error.message)) : resolve(message.result);
    }
  });

  function send(method, params = {}) {
    const id = ++sequence;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result?.value;
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  return { send, evaluate, networkEvents, close: () => socket.close() };
}

async function openPage() {
  if (process.env.STEP3_CONTINUE_ONLY === '1') {
    const targets = await (await fetch(`${CDP_URL}/json/list`)).json();
    for (const target of targets.filter(item => item.type === 'page' && item.url.includes('/assessment/initial'))) {
      const page = await attachToTarget(target);
      const isActiveAptitudeQuestion = await page.evaluate(`(() => {
        const region = document.querySelector('[role="region"][aria-label^="Assessment Question"]');
        return Boolean(location.pathname === '/assessment/initial' && region && /Aptitude/i.test(region.innerText));
      })()`);
      if (isActiveAptitudeQuestion) return page;
      page.close();
    }
    throw new Error('No active Aptitude question was found in the browser.');
  }

  const response = await fetch(`${CDP_URL}/json/new?about:blank`, { method: 'PUT' });
  return attachToTarget(await response.json());
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitFor(page, expression, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const value = await page.evaluate(expression);
      if (value) return value;
    } catch (error) {
      if (!/execution context|context was destroyed|cannot find context/i.test(error.message)) throw error;
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for: ${expression}`);
}

async function readResponseJson(page, responseEvent) {
  let response;
  let lastError;
  for (let attempt = 0; attempt < 10; attempt += 1) {
    try {
      response = await page.send('Network.getResponseBody', { requestId: responseEvent.requestId });
      break;
    } catch (error) {
      lastError = error;
      await sleep(100);
    }
  }
  if (!response) throw lastError;
  const body = response.base64Encoded ? Buffer.from(response.body, 'base64').toString('utf8') : response.body;
  return JSON.parse(body);
}

async function waitForNewResponse(page, endpoint, method, status, previousCount = 0, timeoutMs = 30000) {
  const matchingResponses = () => page.networkEvents.filter(event =>
    event.event === 'response' &&
    event.url === endpoint &&
    event.method === method &&
    event.status === status
  );
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && matchingResponses().length <= previousCount) await sleep(100);
  const responses = matchingResponses();
  assert.ok(responses.length > previousCount,
    `Expected ${method} ${endpoint} with HTTP ${status} after ${previousCount} matching responses. Network events: ${JSON.stringify(page.networkEvents)}`);
  return responses[responses.length - 1];
}

async function clickInteractiveElement(page, targetExpression, description) {
  const position = await page.evaluate(`(() => {
    const target = ${targetExpression};
    if (!target || target.disabled) return null;
    target.scrollIntoView({ block: 'center', inline: 'center' });
    const rect = target.getBoundingClientRect();
    return JSON.stringify({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  })()`);
  if (!position) throw new Error(`Could not locate an enabled ${description} control`);
  const { x, y } = JSON.parse(position);
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
}

async function clickDomControl(page, targetExpression, description) {
  const clicked = await page.evaluate(`(() => {
    const target = ${targetExpression};
    if (!target || target.disabled) return false;
    target.scrollIntoView({ block: 'center', inline: 'center' });
    target.click();
    return true;
  })()`);
  if (!clicked) throw new Error(`Could not activate an enabled ${description} control`);
}

async function waitForAssessmentQuestionReady(page, questionIndex, previousSubmitResponse) {
  const questionNumber = questionIndex < 5 ? questionIndex + 1 : questionIndex - 4;
  const expectedSubject = questionIndex < 5 ? 'DSA' : 'Aptitude';
  if (previousSubmitResponse) {
    assert.equal(previousSubmitResponse.url, '/api/assessment/session/submit-answer', 'previous answer must use the submit-answer endpoint');
    assert.equal(previousSubmitResponse.method, 'POST', 'previous answer must be submitted with POST');
    assert.equal(previousSubmitResponse.status, 200, 'previous answer POST must finish successfully before the next question');
  }

  await waitFor(page, `(() => {
    const region = document.querySelector('[role="region"][aria-label^="Assessment Question"]');
    if (!region || region.getAttribute('aria-label') !== 'Assessment Question ${questionNumber} of 5') return false;
    if (!/${expectedSubject}/i.test(region.innerText)) return false;
    const submit = [...region.querySelectorAll('button')].find(button => button.innerText.includes('Submit Answer') || button.innerText.includes('Submitting'));
    if (!submit || submit.innerText.includes('Submitting')) return false;
    const options = region.querySelector('[role="radiogroup"][aria-label="Multiple choice options"]');
    if (options) {
      const buttons = [...options.querySelectorAll(':scope > button[role="radio"]')];
      return buttons.length > 0 && buttons.every(button => !button.disabled);
    }
    const editor = region.querySelector('textarea');
    return Boolean(editor && !editor.disabled);
  })()`, 30000);
}

async function verifyAssessmentHistoryResponse(page, expectedAssessmentId, expectedStudentId, previousSuccessfulReads = 0) {
  const responseEvent = await waitForNewResponse(page, '/api/assessment/initial/result', 'GET', 200, previousSuccessfulReads);
  assert.equal(responseEvent.method, 'GET', 'assessment result must come from GET');
  assert.equal(responseEvent.status, 200, 'assessment result GET must return HTTP 200');

  const envelope = await readResponseJson(page, responseEvent);
  assert.equal(envelope.success, true, 'authenticated result API call must succeed');
  assert.equal(envelope.data?.assessmentCompleted, true, 'assessment_history must report a completed initial assessment');
  const result = envelope.data?.result;
  assert.ok(result, 'assessment_history result must be returned by the authenticated API');
  assert.equal(result.assessmentId, expectedAssessmentId, 'assessment_history must contain this assessment');
  assert.equal(result.studentId, expectedStudentId, 'assessment_history must belong to the signed-in student');
  assert.equal(result.assessmentType, 'initial', 'assessment_history row must be an initial assessment');
  assert.equal(result.dsaResult?.questionsAsked, 5, 'persisted result must contain five DSA questions');
  assert.equal(result.dsaResult?.skippedQuestions, 0, 'persisted DSA result must have no skipped questions');
  assert.equal(result.aptitudeResult?.questionsAsked, 5, 'persisted result must contain five Aptitude questions');
  assert.equal(result.aptitudeResult?.skippedQuestions, 0, 'persisted Aptitude result must have no skipped questions');
  return { responseEvent, result };
}

function assertResultScreenMatchesAnalysis(resultText, analysis) {
  assert.ok(resultText.includes('Assessment Complete!'), 'result screen must show assessment completion');
  assert.ok(resultText.includes('Assessed Subjects') && resultText.includes('2 (DSA & Aptitude)'), 'result screen must summarize the two assessed subjects');
  assert.ok(resultText.includes('Questions Evaluated') && resultText.includes('10 / 10'), 'result screen must show ten evaluated questions');
  assert.ok(resultText.includes('Total Session Time'), 'result screen must show the total session time metric');
  assert.ok(resultText.includes('Verified Strengths') && resultText.includes('Recommended Focus Areas'), 'result screen must show strengths and focus areas');

  const dsaHeading = resultText.indexOf('DATA STRUCTURES & ALGORITHMS');
  const aptitudeHeading = resultText.indexOf('QUANTITATIVE & LOGICAL APTITUDE');
  assert.ok(dsaHeading >= 0, 'result screen must label the DSA result');
  assert.ok(aptitudeHeading > dsaHeading, 'result screen must label the Aptitude result after DSA');
  const aiSynthesisHeading = resultText.indexOf('AI Mentor Assessment Synthesis', aptitudeHeading);
  const strengthsHeading = resultText.indexOf('Verified Strengths', aptitudeHeading);
  const aptitudeEnd = [aiSynthesisHeading, strengthsHeading]
    .filter(index => index > aptitudeHeading)
    .sort((left, right) => left - right)[0] ?? resultText.length;
  const dsaSection = resultText.slice(dsaHeading, aptitudeHeading);
  const aptitudeSection = resultText.slice(aptitudeHeading, aptitudeEnd);

  for (const [subjectResult, section] of [
    [analysis.dsaResult, dsaSection],
    [analysis.aptitudeResult, aptitudeSection]
  ]) {
    assert.ok(section.includes(subjectResult.assessedLevel), `${subjectResult.subject} assessed level must appear in its result section`);
    assert.ok(section.includes(`Starting: ${subjectResult.startingLevel}`), `${subjectResult.subject} starting level must appear separately`);
    assert.ok(section.includes(`Accuracy: ${subjectResult.accuracy}%`), `${subjectResult.subject} accuracy must appear in its result section`);
    assert.ok(section.includes(`${subjectResult.questionsAsked} Questions`), `${subjectResult.subject} question count must appear in its result section`);
    assert.equal(subjectResult.questionsAsked, 5, `${subjectResult.subject} result must include five questions`);
    assert.equal(subjectResult.skippedQuestions, 0, `${subjectResult.subject} result must include no skipped questions`);
  }
  assert.equal(analysis.overall?.questionsAsked, 10, 'analysis must contain ten evaluated questions');
  assert.equal(analysis.overall?.skippedQuestions, 0, 'analysis must contain no skipped questions');
}

function assertDashboardMatchesHistory(dashboardText, result, stage) {
  assert.ok(dashboardText.includes('Your Current Level'), `${stage}: Dashboard must show current levels`);
  assert.ok(dashboardText.includes('Initial Assessment Summary'), `${stage}: Dashboard must show the assessment summary`);
  for (const subjectResult of [result.dsaResult, result.aptitudeResult]) {
    assert.ok(dashboardText.includes(subjectResult.assessedLevel), `${stage}: ${subjectResult.subject} assessed level must match history`);
    assert.ok(dashboardText.includes(`Starting: ${subjectResult.startingLevel}`), `${stage}: ${subjectResult.subject} starting level must remain separate`);
    assert.ok(dashboardText.includes(`${subjectResult.accuracy}% accuracy`), `${stage}: ${subjectResult.subject} accuracy must match history`);
    assert.ok(dashboardText.includes(`${subjectResult.questionsAsked} questions answered`), `${stage}: ${subjectResult.subject} question count must match history`);
  }
  assert.ok(dashboardText.includes(`${result.overall?.questionsAsked ?? 0} / 10`), `${stage}: assessment progress must match history`);
  assert.ok(dashboardText.includes(`${result.overall?.accuracy ?? 0}%`), `${stage}: overall accuracy must match history`);
  assert.ok(dashboardText.includes('Your Strengths') && dashboardText.includes('Focus Areas'), `${stage}: Dashboard must show strengths and focus sections`);
  const strengths = result.overall?.combinedStrengths || [];
  const focusAreas = result.overall?.combinedFocusAreas || [];
  if (strengths.length) {
    for (const topic of strengths) assert.ok(dashboardText.includes(topic.topicName), `${stage}: strength ${topic.topicName} must match history`);
  } else {
    assert.ok(dashboardText.includes('No topics met the strong evidence threshold'), `${stage}: empty strengths must match history`);
  }
  if (focusAreas.length) {
    for (const topic of focusAreas) assert.ok(dashboardText.includes(topic.topicName), `${stage}: focus area ${topic.topicName} must match history`);
  } else {
    assert.ok(dashboardText.includes('No additional focus areas were identified'), `${stage}: empty focus areas must match history`);
  }
}

(async () => {
  const page = await openPage();
  activePage = page;
  const continueOnly = process.env.STEP3_CONTINUE_ONLY === '1';
  const transitionOnly = process.env.STEP3_TRANSITION_ONLY === '1';
  const q1Only = process.env.STEP3_Q1_ONLY === '1';
  const email = process.env.STEP3_RESUME === '1' ? 'existing browser test account' : `codex.step3.${Date.now()}@example.com`;
  const password = `PathPilot!${Math.random().toString(36).slice(2, 12)}A1`;
  let testTrace = null;
  const fillForm = values => `(() => {
    const form = document.querySelector('form');
    if (!form) return 'form-missing';
    const inputs = [...form.querySelectorAll('input')];
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    inputs.filter(input => input.type !== 'checkbox').forEach((input, index) => {
      setter.call(input, ${JSON.stringify(values)}[index]);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    form.requestSubmit();
    return 'submitted';
  })()`;

  try {
    if (continueOnly) {
      await waitFor(page, `(() => {
        const region = document.querySelector('[role="region"][aria-label^="Assessment Question"]');
        return Boolean(region && /Aptitude/i.test(region.innerText));
      })()`, 30000);
    } else if (process.env.STEP3_RESUME === '1') {
      await page.send('Page.navigate', { url: `${BASE_URL}/assessment/initial` });
      await waitFor(page, 'document.body.innerText.includes("Ready for your Skill Assessment?")', 30000);
    } else {
      await page.send('Page.navigate', { url: `${BASE_URL}/signup` });
      await waitFor(page, 'document.querySelectorAll("input").length >= 3');
      await page.evaluate(fillForm([email, password, password]));
      const route = await waitFor(page, 'location.pathname === "/profile-setup" || document.body.innerText.includes("already registered") || document.body.innerText.includes("Unable to")', 30000);
      if (route !== true) throw new Error('Signup did not complete.');
      if (await page.evaluate('location.pathname') !== '/profile-setup') {
        const message = await page.evaluate('document.body.innerText');
        throw new Error(`Signup failed: ${message.slice(0, 700)}`);
      }
      await waitFor(page, 'document.querySelectorAll("input").length > 0', 20000);
      assert.equal(route, true);
    }

    if (!continueOnly && process.env.STEP3_RESUME !== '1') {
    await page.evaluate(`(() => {
      const setInput = (id, value) => {
        const input = document.getElementById(id);
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        setter.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      };
      setInput('full_name_input', 'PathPilot Step Three Test');
      setInput('degree_input', 'B.Tech');
      setInput('branch_input', 'Computer Science');
      document.getElementById('target-date-button').click();
      return true;
    })()`);
    await waitFor(page, 'document.querySelectorAll("#target-date-wrapper button").length > 10');
    await page.evaluate(`(() => {
      const target = new Date();
      target.setDate(target.getDate() + 10);
      const day = String(target.getDate());
      [...document.querySelectorAll('#target-date-wrapper button')]
        .find(button => button.innerText.trim() === day && !button.disabled)?.click();
      return true;
    })()`);
    await waitFor(page, '!document.getElementById("target-date-button").innerText.includes("Select target date")');
    await page.evaluate(`(() => {
      const chooseLevel = (code, index) => {
        const label = [...document.querySelectorAll('span')].find(node => node.innerText.trim() === code);
        const card = label?.closest('div.p-4');
        card?.querySelectorAll('button')[index]?.click();
      };
      chooseLevel('DSA', 0);
      chooseLevel('APT', 1);
      return true;
    })()`);
    await waitFor(page, `[...document.querySelectorAll('span')].filter(node => ['DSA','APT'].includes(node.innerText.trim())).some(label => label.closest('div.p-4')?.querySelector('button.bg-indigo-600'))`);
    const levels = await page.evaluate(`(() => {
      const levels = ['DSA', 'APT'].map(code => {
        const label = [...document.querySelectorAll('span')].find(node => node.innerText.trim() === code);
        const card = label?.closest('div.p-4');
        return { code, selected: [...(card?.querySelectorAll('button') || [])].filter(button => button.className.includes('bg-indigo-600')).map(button => button.innerText.trim()) };
      });
      return JSON.stringify(levels);
    })()`);
    assert.ok(JSON.parse(levels).every(item => item.selected.length === 1), levels);
    await page.evaluate('[...document.querySelectorAll("button")].find(button => button.innerText.includes("Continue to PathPilot"))?.click()');

    await waitFor(page, 'location.pathname === "/assessment/initial"', 30000);
    }
    if (!continueOnly) {
      await waitFor(page, 'document.body.innerText.includes("Ready for your Skill Assessment?")', 20000);
      const intro = await page.evaluate('document.body.innerText');
      assert.ok(intro.includes('10 Total (5 per subject)'));
      await page.evaluate('[...document.querySelectorAll("button")].find(button => button.innerText.includes("Start Assessment"))?.click()');
      await waitFor(page, 'Boolean(document.querySelector(`[role="region"][aria-label^="Assessment Question"]`))', 30000);
    }

    const submitted = [];
    const firstQuestionIndex = continueOnly ? 5 : 0;
    let previousSubmitResponse = null;
    for (let questionIndex = firstQuestionIndex; questionIndex < 10; questionIndex += 1) {
      if (questionIndex === 5) {
        await waitFor(page, `(() => {
          const region = document.querySelector('[role="region"][aria-label^="Assessment Question"]');
          return Boolean(region && /Aptitude/i.test(region.innerText));
        })()`, 20000);
      }
      await waitForAssessmentQuestionReady(page, questionIndex, previousSubmitResponse);
      const state = await page.evaluate(`(() => {
        const region = document.querySelector('[role="region"][aria-label^="Assessment Question"]');
        if (!region) return null;
        let fiber = region[Object.keys(region).find(key => key.startsWith('__reactFiber$'))];
        let question = null;
        while (fiber) {
          if (fiber.memoizedProps?.question) { question = fiber.memoizedProps.question; break; }
          fiber = fiber.return;
        }
        return JSON.stringify({
          label: region.getAttribute('aria-label'),
          subject: region.innerText.split('\\n')[0],
          questionId: question?.questionId,
          correctAnswer: question?.correctAnswer,
          questionType: question?.questionType,
          options: [...region.querySelectorAll('[aria-label="Multiple choice options"] [role="radio"]')].map(option => option.innerText.trim()).filter(Boolean),
        });
      })()`);
      assert.ok(state, `question ${questionIndex + 1} rendered`);
      const question = JSON.parse(state);
      testTrace = { questionIndex, questionId: question.questionId, correctAnswer: question.correctAnswer, questionType: question.questionType, optionCount: question.options.length };
      const subject = questionIndex < 5 ? 'DSA' : 'Aptitude';
      if (question.questionType === 'coding') {
        await waitFor(page, 'Boolean(document.querySelector("[role=region] textarea")?.value?.trim())');
        await waitFor(page, '!([...document.querySelectorAll("button")].find(button => button.innerText.includes("Submit Answer"))?.disabled)');
        const previousSubmitResponses = page.networkEvents.filter(event => event.event === 'response' && event.url === '/api/assessment/session/submit-answer' && event.method === 'POST' && event.status === 200).length;
        await clickInteractiveElement(page, '(() => [...document.querySelectorAll("[role=region] button")].find(button => button.innerText.includes("Submit Answer")))()', 'Submit Answer');
        const submitResponse = await waitForNewResponse(page, '/api/assessment/session/submit-answer', 'POST', 200, previousSubmitResponses);
        previousSubmitResponse = submitResponse;
        submitted.push({ questionId: question.questionId, subject, skipped: false, questionType: 'coding', submitStatus: submitResponse.status });
      } else {
        const shouldBeCorrect = questionIndex % 2 === 0;
        const correctOption = question.options.findIndex(option => option.includes(question.correctAnswer));
        const optionIndex = shouldBeCorrect || correctOption < 0 ? Math.max(correctOption, 0) : (correctOption + 1) % question.options.length;
        const confidence = questionIndex === 0 ? 'Guessing' : questionIndex === 1 ? 'Very Confident' : 'Confident';
        const optionTarget = `(() => {
          const region = document.querySelector('[role="region"][aria-label^="Assessment Question"]');
          return region?.querySelector('[role="radiogroup"][aria-label="Multiple choice options"]')?.querySelectorAll(':scope > button[role="radio"]')[${optionIndex}] || null;
        })()`;
        await clickDomControl(page, optionTarget, `answer option ${optionIndex + 1}`);
        testTrace.optionIndex = optionIndex;
        await waitFor(page, `(() => {
          const region = document.querySelector('[role="region"][aria-label^="Assessment Question"]');
          const option = region?.querySelector('[role="radiogroup"][aria-label="Multiple choice options"]')?.querySelectorAll(':scope > button[role="radio"]')[${optionIndex}];
          return Boolean(option?.classList.contains('border-indigo-600') && option.firstElementChild?.classList.contains('bg-indigo-600'));
        })()`);
        const confidenceTarget = `(() => [...document.querySelectorAll('[aria-label="Confidence level"] [role="radio"]')].find(button => button.innerText.includes(${JSON.stringify(confidence)})) || null)()`;
        await clickDomControl(page, confidenceTarget, `${confidence} confidence`);
        await waitFor(page, `(() => {
          const confidence = [...document.querySelectorAll('[aria-label="Confidence level"] [role="radio"]')].find(button => button.innerText.includes(${JSON.stringify(confidence)}));
          return Boolean(confidence?.classList.contains('border-indigo-600'));
        })()`);
        await waitFor(page, '!([...document.querySelectorAll("button")].find(button => button.innerText.includes("Submit Answer"))?.disabled)');
        const previousSubmitResponses = page.networkEvents.filter(event => event.event === 'response' && event.url === '/api/assessment/session/submit-answer' && event.method === 'POST' && event.status === 200).length;
        await clickDomControl(page, '(() => [...document.querySelectorAll("[role=region] button")].find(button => button.innerText.includes("Submit Answer")))()', 'Submit Answer');
        const submitResponse = await waitForNewResponse(page, '/api/assessment/session/submit-answer', 'POST', 200, previousSubmitResponses);
        previousSubmitResponse = submitResponse;
        submitted.push({ questionId: question.questionId, subject, skipped: false, confidence, submitStatus: submitResponse.status });
      }

      if (q1Only && questionIndex === 0) {
        assert.equal(submitted.length, 1, 'focused Q1 verification must submit exactly one answer');
        assert.equal(submitted[0].subject, 'DSA', 'focused Q1 verification must submit DSA Question 1');
        assert.equal(submitted[0].submitStatus, 200, 'DSA Question 1 submit-answer request must return HTTP 200');
        console.log(JSON.stringify({ focusedTest: 'DSA Question 1 selection and submission', answerSelected: true, submitAnswerPost: 200, answersSubmitted: submitted.length }));
        page.close();
        return;
      }

      const nextIndex = questionIndex + 1;
      if (nextIndex === 5) {
        await waitFor(page, `(() => {
          const button = [...document.querySelectorAll('button')].find(item => item.innerText.includes('Continue to Aptitude'));
          return Boolean(document.body.innerText.includes('DSA Complete') && button && !button.disabled);
        })()`, 60000);
        const continueClicked = await page.evaluate(`(() => {
          const button = [...document.querySelectorAll('button')].find(item => item.innerText.includes('Continue to Aptitude'));
          if (!button || button.disabled) return false;
          button.click();
          return true;
        })()`);
        assert.equal(continueClicked, true, 'Continue to Aptitude is present and enabled after DSA 5/5');
        await waitFor(page, `(() => {
          const region = document.querySelector('[role="region"][aria-label^="Assessment Question"]');
          return Boolean(region && /Aptitude/i.test(region.innerText));
        })()`, 60000);
        const nextSubjectRequest = page.networkEvents.find(event =>
          event.event === 'request' &&
          event.url === '/api/assessment/session/next-subject' &&
          event.method === 'POST'
        );
        assert.ok(nextSubjectRequest, 'Continue to Aptitude must issue POST /api/assessment/session/next-subject');
        const nextSubjectResponse = page.networkEvents.find(event =>
          event.event === 'response' &&
          event.url === '/api/assessment/session/next-subject' &&
          event.status === 200
        );
        assert.ok(nextSubjectResponse, 'Continue to Aptitude must send POST /api/assessment/session/next-subject');
        assert.equal(nextSubjectResponse.status, 200, 'Next-subject request must succeed');

        if (transitionOnly) {
          const dsaResponses = submitted.slice(0, 5);
          assert.equal(dsaResponses.length, 5, 'DSA must reach exactly five evaluated questions');
          assert.equal(dsaResponses.filter(item => !item.skipped).length, 5, 'All five DSA questions must be answered in the focused transition run');
          const aptitudeQuestion = await page.evaluate(`(() => {
            const region = document.querySelector('[role="region"][aria-label^="Assessment Question"]');
            return region ? JSON.stringify({label: region.getAttribute('aria-label'), text: region.innerText.slice(0, 800)}) : null;
          })()`);
          assert.ok(aptitudeQuestion, 'Aptitude Question 1 is available after the transition');
          const firstAptitudeQuestion = JSON.parse(aptitudeQuestion);
          assert.match(firstAptitudeQuestion.label, /Question 1/i, 'The next subject must start at Aptitude Question 1');
          console.log(JSON.stringify({signup: 'passed', profileSetup: 'passed', dsaQuestions: 5, transitionRequest: nextSubjectResponse.status, aptitudeQuestion1: firstAptitudeQuestion}));
          page.close();
          return;
        }
      } else if (questionIndex < 9) {
        await waitFor(page, `document.querySelector('[role="region"][aria-label^="Assessment Question"]')?.getAttribute('aria-label') !== ${JSON.stringify(question.label)}`, 60000);
      }
    }

    assert.equal(submitted.length, 10, 'exactly ten assessment questions must be answered');
    assert.equal(submitted.filter(item => item.subject === 'DSA' && !item.skipped).length, 5, 'all five DSA questions must be answered');
    assert.equal(submitted.filter(item => item.subject === 'Aptitude' && !item.skipped).length, 5, 'all five Aptitude questions must be answered');
    assert.equal(submitted.filter(item => item.skipped).length, 0, 'the assessment must not skip any questions');
    await waitFor(page, 'document.body.innerText.includes("Assessment Complete!")', 30000);
    const resultText = await page.evaluate('document.body.innerText');
    assert.ok(resultText.includes('DSA'));
    assert.ok(resultText.includes('Aptitude'));
    const completionResponse = page.networkEvents.find(event =>
      event.event === 'response' &&
      event.url === '/api/assessment/initial/complete' &&
      event.method === 'POST'
    );
    assert.ok(completionResponse, 'POST /api/assessment/initial/complete must return a response');
    assert.equal(completionResponse.method, 'POST', 'completion response must belong to the POST request');
    assert.equal(completionResponse.status, 200, 'POST /api/assessment/initial/complete must return HTTP 200');
    const expectedAssessment = JSON.parse(await page.evaluate(`(() => {
      const session = JSON.parse(localStorage.getItem('pathpilot_assessment_active_session') || '{}');
      const authKey = Object.keys(localStorage).find(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
      const auth = authKey ? JSON.parse(localStorage.getItem(authKey) || '{}') : {};
      return JSON.stringify({assessmentId: session.assessmentId, studentId: session.studentId || auth.user?.id || null});
    })()`));
    assert.ok(expectedAssessment.assessmentId && expectedAssessment.studentId, 'assessment and authenticated student context must be available');
    const localAnalysis = JSON.parse(await page.evaluate(`(() => {
      return JSON.stringify(JSON.parse(localStorage.getItem('pathpilot_initial_assessment_result_${expectedAssessment.studentId}') || '{}'));
    })()`));
    assert.equal(localAnalysis.assessmentId, expectedAssessment.assessmentId, 'result screen analysis must belong to the active assessment');
    assertResultScreenMatchesAnalysis(resultText, localAnalysis);
    const idempotency = await page.evaluate(`(async () => {
      const session = JSON.parse(localStorage.getItem('pathpilot_assessment_active_session') || '{}');
      const token = localStorage.getItem('pathpilot_token') || (() => {
        const key = Object.keys(localStorage).find(item => item.startsWith('sb-') && item.endsWith('-auth-token'));
        return key ? JSON.parse(localStorage.getItem(key) || '{}').access_token : null;
      })();
      if (!session.assessmentId || !token) return JSON.stringify({error: 'assessment session or auth token missing'});
      const complete = async () => {
        const response = await fetch('http://127.0.0.1:5001/api/assessment/initial/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify({assessmentId: session.assessmentId})
        });
        const payload = await response.json();
        return {status: response.status, attemptNumber: payload?.data?.attemptNumber ?? null};
      };
      return JSON.stringify({first: await complete(), retry: await complete()});
    })()`);
    const retry = JSON.parse(idempotency);
    assert.equal(retry.first?.status, 200, 'completed assessment persists on first completion');
    assert.equal(retry.retry?.status, 200, 'repeated completion succeeds idempotently');
    assert.equal(retry.retry?.attemptNumber, retry.first?.attemptNumber, 'retry does not create another attempt');
    await page.evaluate('[...document.querySelectorAll("button")].find(button => button.innerText.includes("View My Learning Plan"))?.click()');
    await waitFor(page, 'location.pathname === "/dashboard" || location.pathname === "/onboarding/garden"', 20000);
    if (await page.evaluate('location.pathname') === '/onboarding/garden') {
      await page.evaluate('[...document.querySelectorAll("button")].find(button => button.innerText.includes("Continue to My Dashboard"))?.click()');
    }
    await waitFor(page, 'location.pathname === "/dashboard"', 30000);
    await waitFor(page, 'document.body.innerText.includes("Your Current Level")', 20000);
    const dashboard = await page.evaluate('document.body.innerText');
    const initialHistoryRead = await verifyAssessmentHistoryResponse(page, expectedAssessment.assessmentId, expectedAssessment.studentId);
    assertDashboardMatchesHistory(dashboard, initialHistoryRead.result, 'Dashboard after assessment');

    const resultReadsBeforeRefresh = page.networkEvents.filter(event => event.event === 'response' && event.url === '/api/assessment/initial/result' && event.method === 'GET' && event.status === 200).length;
    await page.send('Page.reload');
    await waitFor(page, 'location.pathname === "/dashboard" && document.body.innerText.includes("Initial Assessment Summary")', 30000);
    const dashboardAfterRefresh = await page.evaluate('document.body.innerText');
    const refreshedHistoryRead = await verifyAssessmentHistoryResponse(page, expectedAssessment.assessmentId, expectedAssessment.studentId, resultReadsBeforeRefresh);
    assertDashboardMatchesHistory(dashboardAfterRefresh, refreshedHistoryRead.result, 'Dashboard after refresh');

    const resultReadsBeforeLogin = page.networkEvents.filter(event => event.event === 'response' && event.url === '/api/assessment/initial/result' && event.method === 'GET' && event.status === 200).length;
    await page.evaluate('document.querySelector("button[aria-label=\\"Sign out of PathPilot\\"]")?.click()');
    await waitFor(page, 'location.pathname === "/login"', 20000);
    await waitFor(page, 'document.querySelectorAll("input").length >= 2', 20000);
    await page.evaluate(fillForm([email, password]));
    await waitFor(page, 'location.pathname === "/dashboard"', 30000);
    await waitFor(page, 'document.body.innerText.includes("Initial Assessment Summary")', 30000);
    const dashboardAfterLogin = await page.evaluate('document.body.innerText');
    const loggedInHistoryRead = await verifyAssessmentHistoryResponse(page, expectedAssessment.assessmentId, expectedAssessment.studentId, resultReadsBeforeLogin);
    assertDashboardMatchesHistory(dashboardAfterLogin, loggedInHistoryRead.result, 'Dashboard after login');

    console.log(JSON.stringify({ email, signup: 'passed', profileSetup: 'passed', assessment: 'passed', dsaAnswered: 5, aptitudeAnswered: 5, resultScreen: 'passed', completionPost: completionResponse.status, assessmentHistory: 'verified through authenticated result API', dashboard: 'passed', refresh: 'passed', logoutLogin: 'passed', serverResultFetches: 3, historyReads: [initialHistoryRead.responseEvent.status, refreshedHistoryRead.responseEvent.status, loggedInHistoryRead.responseEvent.status], responses: submitted.length, skipped: submitted.filter(item => item.skipped).length }));
    page.close();
  } catch (error) {
    const snapshot = await page.evaluate('JSON.stringify({path:location.pathname,text:document.body.innerText.slice(0,1200),html:document.querySelector("[role=region]")?.innerHTML.slice(0,2500),buttons:[...document.querySelectorAll("button")].map(button=>({text:button.innerText,disabled:button.disabled,cls:button.className.slice(0,100)}))})').catch(() => null);
    page.close();
    throw new Error(JSON.stringify({ error: error.message, snapshot, network: page.networkEvents, trace: testTrace }));
  }
})().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
