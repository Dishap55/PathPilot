const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function verifyStep5_2() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let failed = false;

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[AssessmentEngine]') || text.includes('Error')) {
      console.log(`[Browser Console]: ${text}`);
    }
  });

  try {
    console.log('1. Navigating to login...');
    await page.goto('http://localhost:5173/login');
    await page.fill('input[type="email"]', 'demo@pathpilot.com');
    await page.fill('input[type="password"]', 'demo123');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard');
    console.log('✓ Logged in.');

    console.log('2. Navigating to Reassessment UI...');
    await page.goto('http://localhost:5173/reassessment');
    await page.waitForSelector('text=Velocity Verification & Recalibration');
    console.log('✓ Reassessment Intro page loaded.');

    console.log('3. Starting Periodic Reassessment...');
    const startRequestPromise = page.waitForRequest(req => req.url().includes('/periodic/start') && req.method() === 'POST');
    await page.click('button:has-text("Start Periodic Reassessment")');
    const startReq = await startRequestPromise;
    console.log(`✓ Periodic start API called: ${startReq.url()}`);

    // Wait for the first question to appear
    await page.waitForSelector('text=Question 1 of');
    console.log('✓ Question 1 loaded. Session started successfully.');

    // Answer questions
    for (let i = 1; i <= 10; i++) {
      console.log(`Answering question ${i}...`);
      await page.waitForTimeout(500);
      
      const isMcq = await page.$('button[role="radio"]:has-text("A")').catch(() => null);
      if (isMcq) {
        await page.click('button[role="radio"]:has-text("A")');
      } else {
        await page.waitForSelector('textarea');
        await page.fill('textarea', '// Default answer code');
      }

      await page.click('button:has-text("Confident")');
      await page.click('button:has-text("Submit Answer")');

      // Wait for next question or transition or completion
      if (i < 10) {
        if (i === 5) {
          console.log('Transition screen expected.');
          await page.waitForSelector('text=Next Subject', { timeout: 10000 });
          await page.click('button:has-text("Continue")');
        }
        await page.waitForSelector(`text=Question ${i+1 > 5 ? i-4 : i+1} of`, { timeout: 10000 });
      }
    }

    console.log('4. Waiting for completion screen...');
    await page.waitForSelector('text=Reassessment Completed', { timeout: 15000 });
    console.log('✓ Completion screen loaded.');

    console.log('5. Navigating to Dashboard to check History...');
    await page.goto('http://localhost:5173/dashboard');
    await page.waitForSelector('text=History');
    
    console.log('6. Reviewing History Data...');
    
    // Verify via DOM
    const historyItems = await page.$$('text=Periodic Reassessment');
    if (historyItems.length > 0) {
      console.log(`✓ Found ${historyItems.length} Periodic Reassessment entries in DOM.`);
    } else {
      console.log('x No Periodic Reassessment found in DOM.');
      failed = true;
    }

    const initialItems = await page.$$('text=Initial Assessment');
    if (initialItems.length > 0) {
      console.log('✓ Initial Assessment is preserved in DOM.');
    } else {
      console.log('x Initial Assessment missing from DOM.');
      failed = true;
    }

  } catch (err) {
    console.error('Test Failed:', err);
    failed = true;
  } finally {
    await browser.close();
    if (failed) {
      process.exit(1);
    } else {
      console.log('ALL TESTS PASSED SUCCESSFULLY.');
    }
  }
}

verifyStep5_2();
