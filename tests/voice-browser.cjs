// Real Chromium UI with isolated fixtures. No external request can leave this test.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
(async () => {
  const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args:['--no-sandbox']});
  const context = await browser.newContext({viewport:{width:412,height:915}, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  const external = [];
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== 'http://localhost:4173') {external.push(url.href); return route.abort();}
    const file = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
    if (!['index.html','app.js','voice-expense.js','voice-entry.js','style.css','icon.svg','manifest.json'].includes(file)) return route.abort();
    let body = fs.readFileSync(path.join(root, file), 'utf8');
    if (file === 'index.html') body = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, script => /src="(?:app|voice-expense|voice-entry)\.js"/.test(script) ? script : '');
    await route.fulfill({body, contentType:file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'text/html'});
  });
  await context.addInitScript(() => {
    localStorage.setItem('financeApp_v1', JSON.stringify({_gadgetSeeded:true,transactions:[],accounts:['เงินสด'],categories:{expense:[{name:'อาหาร',emoji:'🍜'},{name:'กาแฟ/น้ำหวาน',emoji:'☕'}],income:[]}}));
    window.Chart = class {destroy(){} static register(){}};
    window._writes = [];
  });
  const page = await context.newPage();
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:4173/');
  await page.evaluate(() => {showApp(); navigate('add'); window._db = {ref: path => ({set: data => {window._writes.push({path,data});return Promise.resolve();}})};});
  const open = () => page.locator('#voice-open').click();
  const parse = async (text) => {await page.locator('#voice-text').fill(text); await page.locator('#voice-parse').click();};
  await open();
  // Unsupported recognition still allows keyboard/manual entry.
  await page.evaluate(() => {window.SpeechRecognition = window.webkitSpeechRecognition = undefined;});
  await page.locator('#voice-start').click();
  assert.match(await page.locator('#voice-status').textContent(), /แป้นพิมพ์/);
  await parse('ข้าว 60 บาท ร้านป้าดา แล้ว กาแฟ 55 บาท ร้านอเมซอน');
  assert.equal(await page.locator('.voice-row').count(), 2);
  assert.equal(await page.evaluate(() => _writes.length), 0);
  assert.equal(await page.locator('#voice-save').isDisabled(), true);
  await page.locator('#voice-confirm').check();
  await page.locator('.voice-row [data-field=amount]').first().fill('65');
  assert.equal(await page.locator('#voice-confirm').isChecked(), false);
  await page.locator('#voice-account').selectOption('เงินสด');
  await page.locator('#voice-confirm').check();
  await page.locator('#voice-save').click();
  // Dispatch another click after dialog closes: it must not write again.
  await page.evaluate(() => document.getElementById('voice-save').click());
  assert.equal(await page.evaluate(() => _writes.length), 1);
  assert.equal(await page.evaluate(() => getData().transactions.length), 2);
  assert.equal(await page.evaluate(() => getData().transactions[0].amount), 65);
  assert.equal(await page.evaluate(() => getData().transactions[1].merchant), 'อเมซอน');
  await open(); await parse('ข้าว 10 บาท'); await page.locator('#voice-cancel').click();
  assert.equal(await page.evaluate(() => _writes.length), 1);
  await open(); await parse('ข้าว 10 บาท');
  await page.locator('#voice-text').fill('กาแฟ 80 บาท');
  assert.equal(await page.locator('#voice-review').isHidden(), true);
  await page.locator('#voice-cancel').click();
  // Simulated Thai speech events exercise lifecycle without accessing a microphone.
  await page.evaluate(() => {
    window.SpeechRecognition = class {
      constructor(){window._speech=this;}
      start(){} stop(){this.onend?.();} abort(){window._aborted=true;}
    };
  });
  await open(); await page.locator('#voice-start').click();
  assert.equal(await page.evaluate(() => _speech.lang), 'th-TH');
  await page.evaluate(() => {const r=[{transcript:'ข้าวหกสิบบาท ร้านป้าดา'}];r.isFinal=true;_speech.onresult({resultIndex:0,results:[r]});});
  assert.match(await page.locator('#voice-text').inputValue(), /หกสิบ/);
  await page.locator('#voice-stop').click(); await page.locator('#voice-parse').click();
  assert.equal(await page.locator('[data-field=amount]').inputValue(), '60');
  await page.locator('#voice-cancel').click();
  await open(); await page.locator('#voice-start').click();
  await page.evaluate(() => _speech.onerror({error:'not-allowed'}));
  assert.match(await page.locator('#voice-status').textContent(), /อนุญาต/);
  await page.locator('#voice-start').click(); await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(() => _aborted), true);
  assert.equal(await page.evaluate(() => _writes.length), 1);
  assert.deepEqual(errors, []); assert.deepEqual(external, []);
  console.log('PASS: mobile review, confirmation reset, mock Firebase batch, duplicate click, cancel, transcript edit, Thai speech, denied microphone, Escape; zero external requests.');
  await browser.close();
})().catch(error => {console.error(error);process.exit(1);});
