const CDP_URL = 'http://127.0.0.1:9222';

async function connect(target) {
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  let sequence = 0;
  const pending = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : resolve(message.result);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result?.value;
  };
  await send('Runtime.enable');
  await send('Page.enable');
  return { send, evaluate, close: () => socket.close() };
}

(async () => {
  const targets = await (await fetch(`${CDP_URL}/json/list`)).json();
  for (const target of targets.filter(item => item.type === 'page' && (item.url.includes('/assessment/initial') || item.url.includes('/onboarding/garden') || item.url.includes('/dashboard')))) {
    const page = await connect(target);
    const dashboard = await page.evaluate(`(() => document.body.innerText.includes('Your Initial Assessment Summary') ? document.body.innerText.slice(0, 1200) : null)()`);
    if (dashboard) {
      await page.send('Page.reload');
      await new Promise(resolve => setTimeout(resolve, 5000));
      const after = await page.evaluate('JSON.stringify({path:location.pathname,body:document.body.innerText.slice(0,1200)})');
      console.log(JSON.stringify({target: target.id, dashboardBeforeRefresh: dashboard, dashboardAfterRefresh: JSON.parse(after)}));
      page.close();
      return;
    }
    const before = await page.evaluate(`(() => {
      const button = [...document.querySelectorAll('button')].find(item => item.innerText.includes('Continue to Aptitude'));
      if (!button) return null;
      const propsKey = Object.keys(button).find(key => key.startsWith('__reactProps$'));
      return JSON.stringify({text: button.innerText, disabled: button.disabled, hasReactClick: typeof button[propsKey]?.onClick === 'function', body: document.body.innerText.slice(0, 700)});
    })()`);
    if (!before) {
      const onboarding = await page.evaluate(`(() => {
        const button = [...document.querySelectorAll('button')].find(item => item.innerText.includes('Continue to My Dashboard'));
        return button ? JSON.stringify({text: button.innerText, disabled: button.disabled, body: document.body.innerText.slice(0, 700)}) : null;
      })()`);
      if (!onboarding) { page.close(); continue; }
      await page.evaluate(`(() => [...document.querySelectorAll('button')].find(item => item.innerText.includes('Continue to My Dashboard'))?.click())()`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      const after = await page.evaluate('JSON.stringify({path:location.pathname,body:document.body.innerText.slice(0,1200)})');
      console.log(JSON.stringify({target: target.id, onboarding: JSON.parse(onboarding), after: JSON.parse(after)}));
      page.close();
      return;
    }
    const click = await page.evaluate(`(() => {
      const button = [...document.querySelectorAll('button')].find(item => item.innerText.includes('Continue to Aptitude'));
      if (!button) return 'missing';
      const propsKey = Object.keys(button).find(key => key.startsWith('__reactProps$'));
      const handler = button[propsKey]?.onClick;
      if (!button.disabled) button.click();
      return JSON.stringify({afterClickDisabled: button.disabled, hasReactClick: typeof handler === 'function'});
    })()`);
    await new Promise(resolve => setTimeout(resolve, 5000));
    const after = await page.evaluate('document.body.innerText.slice(0, 900)');
    console.log(JSON.stringify({target: target.id, before: JSON.parse(before), click: JSON.parse(click), after}));
    page.close();
    return;
  }
  console.log(JSON.stringify({found: false}));
})().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
