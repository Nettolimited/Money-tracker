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
    if (!['index.html','app.js','voice-expense.js','voice-entry.js','speech-transcript.js','style.css','icon.svg','manifest.json'].includes(file)) return route.abort();
    let body = fs.readFileSync(path.join(root, file), 'utf8');
    if (file === 'index.html') body = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, script => /src="(?:app|voice-expense|voice-entry|speech-transcript)\.js"/.test(script) ? script : '');
    await route.fulfill({body, contentType:file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'text/html'});
  });
  await context.addInitScript(() => {
    localStorage.setItem('financeApp_v1', JSON.stringify({_gadgetSeeded:true,transactions:[],accounts:['เงินสด','KBank','QR Code'],categories:{expense:[{name:'อาหาร',emoji:'🍜'},{name:'กาแฟ/น้ำหวาน',emoji:'☕'}],income:[]}}));
    window.Chart = class {destroy(){} static register(){}};
    window._writes = [];
  });
  const page = await context.newPage();
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:4173/');
  await page.evaluate(() => {showApp(); navigate('add'); window._db = {ref: path => ({set: data => {window._writes.push({path,data});return Promise.resolve();}})};});
  const open = () => page.locator('#voice-open').click();
  const openTranscript = async () => {
    const transcript = page.locator('#voice-transcript');
    if (await transcript.getAttribute('open') === null) await transcript.locator('summary').click();
  };
  const parse = async (text) => {await openTranscript(); await page.locator('#voice-text').fill(text); await page.locator('#voice-parse').click();};
  await page.setViewportSize({width: 320, height: 568});
  await open();
  await parse(Array.from({length: 8}, () => 'ข้าวหมูกรอบ 60 บาท ร้านทดสอบชื่อร้านยาวเป็นพิเศษ').join(' แล้ว '));
  assert.equal(await page.locator('.voice-row').count(), 8);
  const layout = await page.locator('#voice-body').evaluate(body => ({
    overflowX: body.scrollWidth > body.clientWidth,
    overflowY: body.scrollHeight > body.clientHeight
  }));
  assert.deepEqual(layout, {overflowX: false, overflowY: true});
  assert.ok(await page.locator('#voice-save').evaluate(button => button.getBoundingClientRect().bottom <= window.innerHeight));
  await page.locator('#voice-cancel').click();
  await page.setViewportSize({width: 412, height: 915});
  await open();
  // Unsupported recognition still allows keyboard/manual entry.
  await page.evaluate(() => {window.SpeechRecognition = window.webkitSpeechRecognition = undefined;});
  await page.locator('#voice-start').click();
  assert.match(await page.locator('#voice-status').textContent(), /แป้นพิมพ์/);
  await parse('ข้าว 60 บาท ร้านป้าดา แล้ว กาแฟ 55 บาท ร้านอเมซอน');
  assert.equal(await page.locator('.voice-row').count(), 2);
  assert.equal(await page.evaluate(() => _writes.length), 0);
  assert.equal(await page.locator('#voice-save').isDisabled(), false);
  assert.equal(await page.locator('#voice-account').inputValue(), 'เงินสด');
  assert.equal(await page.locator('#voice-date').inputValue(), await page.evaluate(() => VoiceExpense.defaults(getData()).date));
  assert.match(await page.locator('#voice-save').textContent(), /115/);
  assert.equal(await page.locator('#voice-footer').isVisible(), true);
  assert.match(await page.locator('.voice-item-name').first().textContent(), /ข้าว/);
  await page.locator('.voice-row > summary').first().click();
  await page.locator('.voice-row [data-field=amount]').first().fill('65');
  assert.match(await page.locator('#voice-save').textContent(), /120/);
  await page.locator('.voice-row [data-field=amount]').first().fill('');
  assert.equal(await page.locator('#voice-save').isDisabled(), true);
  assert.equal(await page.locator('#voice-save-status').textContent(), 'กรุณาระบุราคา');
  await page.locator('.voice-row [data-field=amount]').first().fill('65');
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
  await openTranscript();
  await page.locator('#voice-text').fill('กาแฟ 80 บาท');
  assert.equal(await page.locator('#voice-review').isHidden(), true);
  await page.locator('#voice-cancel').click();
  // Simulated Thai speech events exercise lifecycle without accessing a microphone.
  await page.evaluate(() => {
    window.SpeechRecognition = class {
      constructor(){window._speech=this;window._speechCount=(window._speechCount||0)+1;}
      start(){} stop(){this.onend?.();} abort(){window._aborted=true;}
    };
  });
  await page.addScriptTag({url:'http://localhost:4173/voice-entry.js'});
  await open(); await page.locator('#voice-start').click();
  await page.evaluate(() => { document.getElementById('voice-start').dispatchEvent(new Event('click')); });
  assert.equal(await page.evaluate(() => _speechCount), 1);
  assert.equal(await page.evaluate(() => _speech.lang), 'th-TH');
  assert.equal(await page.evaluate(() => _speech.continuous), false);
  assert.equal(await page.locator('#voice-version').textContent(), await page.evaluate(() => 'Money Tracker v' + APP_VERSION));
  assert.equal(await page.locator('#voice-stop').isVisible(), true);
  assert.equal(await page.locator('#voice-start').isHidden(), true);
  await page.evaluate(() => {const r=[{transcript:'ข้าวหกสิบบาท ร้านป้าดา'}];r.isFinal=true;_speech.onresult({resultIndex:0,results:[r]});});
  assert.match(await page.locator('#voice-text').inputValue(), /หกสิบ/);
  await page.evaluate(() => _speech.onspeechend());
  assert.equal(await page.locator('#voice-review').isVisible(), true);
  assert.equal(await page.locator('#voice-save').isEnabled(), true);
  assert.equal(await page.evaluate(() => _writes.length), 1);
  assert.equal(await page.locator('[data-field=amount]').inputValue(), '60');
  await page.locator('#voice-cancel').click();
  // Reproduce Android repeated/revised final snapshots (including resultIndex=0).
  await open(); await page.locator('#voice-start').click();
  await page.evaluate(() => {
    const emit = parts => _speech.onresult({resultIndex:0, results:parts.map(([text, final]) => {
      const result=[{transcript:text}];result.isFinal=final;return result;
    })});
    emit([['ข้าวหมูกรอบ', false]]);
    emit([['ข้าวหมูกรอบ 50', true]]);
    for(let i=0;i<6;i++) emit([['ข้าวหมูกรอบ 50',true]]);
    emit([['ข้าวหมูกรอบ 50 บาท ร้านไข่เจียวฟู',true]]);
    emit([['ข้าวหมูกรอบ 50 บาท ร้านไข่เจียวฟู',true],['แล้ว กาแฟ',false]]);
  });
  assert.equal(await page.locator('#voice-text').inputValue(), 'ข้าวหมูกรอบ 50 บาท ร้านไข่เจียวฟู');
  await page.locator('#voice-stop').click();
  assert.equal(await page.locator('.voice-row').count(), 1);
  assert.equal(await page.locator('[data-field=amount]').inputValue(), '50');
  assert.equal(await page.evaluate(() => _writes.length), 1);
  // Start a second session: keep the first session once and add a distinct slot.
  await page.locator('#voice-start').click();
  await page.evaluate(() => {
    const r=[{transcript:'แล้ว กาแฟ 55 บาท'}];r.isFinal=true;
    _speech.onresult({resultIndex:0,results:[r]});
    _speech.onresult({resultIndex:0,results:[r]});
  });
  assert.equal(await page.locator('#voice-text').inputValue(), 'ข้าวหมูกรอบ 50 บาท ร้านไข่เจียวฟู แล้ว กาแฟ 55 บาท');
  await page.locator('#voice-stop').click();
  assert.equal(await page.locator('.voice-row').count(), 2);
  await page.locator('#voice-cancel').click();
  // Identical utterances in different result slots are intentional, not duplicates.
  await open(); await page.locator('#voice-start').click();
  await page.evaluate(() => {
    const parts=['ข้าว 50 บาท','แล้ว ข้าว 50 บาท'].map(transcript=>{const r=[{transcript}];r.isFinal=true;return r;});
    _speech.onresult({resultIndex:0,results:parts});
    _speech.onresult({resultIndex:1,results:parts});
  });
  await page.locator('#voice-stop').click();
  assert.equal(await page.locator('.voice-row').count(), 2);
  assert.match(await page.locator('#voice-save').textContent(), /100/);
  await page.locator('#voice-cancel').click();
  // Manual edits stop recognition, and callbacks captured before cancellation are stale.
  await open(); await page.locator('#voice-start').click();
  await page.evaluate(() => { window._lateResult=_speech.onresult; });
  await openTranscript();
  await page.locator('#voice-text').fill('ข้าว 70 บาท');
  await page.evaluate(() => {const r=[{transcript:'stale text'}];r.isFinal=true;_lateResult({resultIndex:0,results:[r]});});
  assert.equal(await page.locator('#voice-text').inputValue(), 'ข้าว 70 บาท');
  assert.equal(await page.locator('#voice-start').isEnabled(), true);
  await page.locator('#voice-cancel').click();
  await open(); await page.locator('#voice-start').click();
  await page.evaluate(() => {
    window._stopCalls=0;
    _speech.stop=()=>{window._stopCalls++;};
    const r=[{transcript:'ข้าวหมูกรอบ'}];r.isFinal=false;
    _speech.onresult({resultIndex:0,results:[r]});
  });
  assert.equal(await page.locator('#voice-text').inputValue(), '');
  assert.match(await page.locator('#voice-status').textContent(), /ยังไม่ยืนยัน/);
  await page.locator('#voice-stop').click();
  assert.match(await page.locator('#voice-stop').textContent(), /กำลังประมวลผล/);
  await page.evaluate(() => document.getElementById('voice-stop').dispatchEvent(new Event('click')));
  await page.evaluate(() => { _speech.onspeechend(); _speech.onspeechend(); });
  assert.equal(await page.evaluate(() => _stopCalls), 1);
  assert.equal(await page.locator('#voice-review').isHidden(), true);
  await page.evaluate(() => {
    window._lateError=_speech.onerror;
    const final=[{transcript:'ข้าวหมูกรอบ 50 บาท'}];final.isFinal=true;
    _speech.onresult({resultIndex:0,results:[final]});
    const end=_speech.onend;end();end();
  });
  assert.equal(await page.locator('#voice-text').inputValue(), 'ข้าวหมูกรอบ 50 บาท');
  assert.equal(await page.locator('.voice-row').count(), 1);
  assert.equal(await page.evaluate(() => _writes.length), 1);
  await page.locator('#voice-save').click();
  await page.evaluate(() => document.getElementById('voice-save').dispatchEvent(new Event('click')));
  assert.equal(await page.evaluate(() => _writes.length), 2);
  await open(); await page.locator('#voice-start').click();
  await page.evaluate(() => _lateError({error:'network'}));
  assert.equal(await page.locator('#voice-start').isDisabled(), true);
  await page.evaluate(() => _speech.onerror({error:'not-allowed'}));
  assert.match(await page.locator('#voice-status').textContent(), /อนุญาต/);
  await page.locator('#voice-start').click(); await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(() => _aborted), true);
  assert.equal(await page.evaluate(() => _writes.length), 2);
  await open(); await page.locator('#voice-start').click();
  await page.evaluate(() => {
    const result = [{transcript:'ข้าว 50 บาท จ่ายผ่านเคแบงก์ แล้ว กาแฟ 55 บาท จ่ายผ่านบัตรทดสอบ'}];
    result.isFinal = true;
    _speech.onresult({resultIndex:0, results:[result]});
    _speech.onspeechend();
  });
  const paymentRows = page.locator('.voice-row');
  assert.match(await paymentRows.first().textContent(), /จ่ายผ่าน KBank/);
  assert.equal(await paymentRows.nth(1).getAttribute('open'), '');
  assert.match(await paymentRows.nth(1).locator('.voice-account-warning').textContent(), /บัตรทดสอบ/);
  assert.equal(await page.locator('#voice-save').isDisabled(), true);
  assert.equal(await page.evaluate(() => _writes.length), 2);
  await paymentRows.nth(1).locator('[data-field=account]').selectOption('QR Code');
  assert.equal(await paymentRows.nth(1).locator('.voice-account-warning').isHidden(), true);
  assert.equal(await page.locator('#voice-save').isEnabled(), true);
  await page.locator('#voice-save').click();
  assert.equal(await page.evaluate(() => _writes.length), 3);
  assert.deepEqual(await page.evaluate(() => getData().transactions.slice(-2).map(item => item.account)), ['KBank', 'QR Code']);
  assert.deepEqual(errors, []); assert.deepEqual(external, []);
  console.log('PASS: mobile review, automatic date/account, single confirmation, invalid price lock, live summary, mock Firebase batch, duplicate click, cancel, transcript edit, Thai speech, repeated/revised Android snapshots, session restart, intentional repeated items, stale events, noncontinuous automatic speechend, duplicate initialization/start/stop/speechend/end/save, final after stop, denied microphone, Escape; zero external requests.');
  await browser.close();
})().catch(error => {console.error(error);process.exit(1);});
