/* Drafts stay in memory; only the explicit confirmed Save calls the existing storage path. */
(function () {
  'use strict';
  const el = id => document.getElementById('voice-' + id);
  const dialog = el('dialog');
  // Re-evaluating the script must not bind a second set of listeners.
  if (!dialog || dialog.dataset.voiceEntryBound === 'true') return;
  dialog.dataset.voiceEntryBound = 'true';
  let recognition = null, stopping = false, saving = false;
  const BUILD = '2026-11-10.5';
  let diagnostics = [];
  function record(type, detail = {}) {
    diagnostics.push({type, ...detail}); diagnostics = diagnostics.slice(-20);
    if (el('diagnostics')) el('diagnostics').value = JSON.stringify({build:BUILD, continuous:false, events:diagnostics}, null, 2);
  }
  if (el('version')) el('version').textContent = 'รุ่น 5 · ฟังทีละรอบ · หยุดอัตโนมัติ';
  el('copy-diagnostics')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(el('diagnostics').value); status('คัดลอกข้อมูลตรวจปัญหาแล้ว ส่งให้ผู้ช่วยได้หากต้องการ'); }
    catch (_) { el('diagnostics').focus(); el('diagnostics').select(); status('เลือกข้อมูลแล้ว กดคัดลอกเพื่อส่งตรวจปัญหาได้'); }
  });
  function status(message) { el('status').textContent = message; }
  function readItems() {
    return [...el('items').querySelectorAll('.voice-row')].map(row =>
      Object.fromEntries([...row.querySelectorAll('[data-field]')].map(input =>
        [input.dataset.field, input.dataset.field === 'amount' ? (input.validity.valid ? Number(input.value) : NaN) : input.value])));
  }
  function refreshSummary() {
    const items = readItems();
    const total = items.reduce((sum, item) => sum + (Number.isFinite(item.amount) ? item.amount : 0), 0);
    const data = getData();
    const valid = items.length && items.every(item => item.itemName.trim() && Number.isFinite(item.amount) && item.amount > 0 && data.categories.expense.some(c => c.name === item.category)) &&
      data.accounts.includes(el('account').value) && el('date').value && el('date').validity.valid;
    el('save').disabled = saving || !valid || el('review').hidden || !!recognition;
    el('save').textContent = 'ยืนยันบันทึก ' + items.length + ' รายการ · ฿' + total.toLocaleString('th-TH', {maximumFractionDigits: 2});
    el('summary').textContent = 'วันที่ ' + el('date').value + ' · บัญชี ' + (el('account').value || 'กรุณาเลือกบัญชี') + ' · รวม ฿' + total.toLocaleString('th-TH', {maximumFractionDigits: 2});
    for (const row of el('items').querySelectorAll('.voice-row')) {
      const value = key => row.querySelector('[data-field=' + key + ']').value;
      row.querySelector('.voice-item-summary').textContent = [value('itemName') || 'กรุณาระบุชื่อ', '฿' + (value('amount') || '?'), value('category') || 'เลือกหมวดหมู่', value('merchant') ? 'ร้าน ' + value('merchant') : ''].filter(Boolean).join(' · ');
    }
  }
  function unconfirm() { el('save').disabled = true; }
  function invalidate() { unconfirm(); el('review').hidden = true; el('items').replaceChildren(); }
  function stop(abort = true) {
    const active = recognition;
    recognition = null; stopping = false;
    if (active) {
      active.onresult = active.onerror = active.onend = active.onspeechend = null;
      if (abort) active.abort();
    }
    el('start').disabled = false;
    el('stop').disabled = true;
    el('parse').disabled = false;
  }
  function close() {
    stop(); invalidate(); el('text').value = ''; status('');
    diagnostics = []; if (el('diagnostics')) el('diagnostics').value = '';
    if (dialog.open) dialog.close();
  }
  window.closeVoiceExpense = close;
  el('open').addEventListener('click', () => {
    close(); dialog.showModal();
    status('ตรวจสอบและยืนยันก่อนบันทึกเสมอ หากไมค์ใช้ไม่ได้ ให้ใช้ไมค์แป้นพิมพ์หรือพิมพ์ข้อความ');
  });
  el('cancel').addEventListener('click', close);
  dialog.addEventListener('cancel', e => { e.preventDefault(); close(); });
  dialog.addEventListener('close', () => { stop(); invalidate(); el('text').value = ''; });
  el('text').addEventListener('input', () => {
    if (recognition) { stop(); status('หยุดไมค์เพื่อให้แก้ข้อความได้'); }
    invalidate();
  });
  el('start').addEventListener('click', () => {
    if (recognition || saving) return;
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech || !window.isSecureContext) {
      status('เบราว์เซอร์นี้ใช้ไมค์โดยตรงไม่ได้ เปิดผ่าน HTTPS บน Chrome หรือใช้ไมค์ภาษาไทยบนแป้นพิมพ์ Samsung แล้วกดแยกรายการ');
      return;
    }
    stop(); invalidate();
    const baseText = el('text').value.trim();
    const transcript = SpeechTranscript.createSession();
    const active = new Speech(); recognition = active;
    active.lang = 'th-TH'; active.continuous = false; active.interimResults = true;
    record('start');
    active.onspeechend = () => { if (recognition === active) { record('speechend'); requestStop(); } };
    active.onresult = event => {
      if (recognition !== active || !dialog.open) return;
      record('result', {resultIndex:event.resultIndex, results:Array.from(event.results, result => ({isFinal:result.isFinal, text:result[0]?.transcript || ''}))});
      const { finalTranscript, interimTranscript } = transcript.update(event);
      const text = [baseText, finalTranscript].filter(Boolean).join(' ');
      if (el('text').value !== text) { el('text').value = text; invalidate(); }
      // Interim text is displayed separately and is never persisted or parsed.
      status(interimTranscript ? 'กำลังฟัง (ยังไม่ยืนยัน): ' + interimTranscript : 'กำลังฟัง… กดหยุดฟังก่อนตรวจสรุป');
    };
    active.onerror = event => {
      if (recognition !== active || !dialog.open) return;
      record('error', {error:event.error});
      stop();
      const messages = {
        'not-allowed': 'ไม่ได้รับอนุญาตใช้ไมค์ กรุณาเปิดสิทธิ์ไมค์หรือใช้ไมค์บนแป้นพิมพ์',
        'audio-capture': 'ไม่พบไมค์ที่ใช้งานได้ ลองใช้ไมค์บนแป้นพิมพ์',
        'network': 'บริการรู้จำเสียงเชื่อมต่อไม่ได้ ลองใหม่หรือพิมพ์ข้อความ',
        'no-speech': 'ไม่ได้ยินเสียง ลองใหม่หรือพิมพ์ข้อความ',
        'language-not-supported': 'บริการนี้ไม่รองรับภาษาไทย ลองใช้ไมค์ภาษาไทยบนแป้นพิมพ์'
      };
      status(messages[event.error] || 'รู้จำเสียงไม่สำเร็จ ลองใหม่หรือพิมพ์ข้อความ');
    };
    active.onend = () => {
      if (recognition !== active) return;
      record('end');
      const { finalTranscript } = transcript.finish();
      el('text').value = [baseText, finalTranscript].filter(Boolean).join(' ');
      stop(false);
      if (el('text').value.trim()) buildReview();
      else status('ยังไม่มีข้อความ ลองพูดใหม่หรือใช้ไมค์แป้นพิมพ์');
    };
    try {
      active.start(); el('start').disabled = true; el('stop').disabled = false; el('parse').disabled = true;
      status('กำลังฟังภาษาไทย… พูดแล้วเว้นจังหวะ ระบบจะหยุดและสรุปให้');
    } catch (_) { stop(); status('เปิดไมค์ไม่ได้ ลองใหม่หรือใช้ไมค์บนแป้นพิมพ์'); }
  });
  // Gracefully finish the current utterance before reviewing final results.
  function requestStop() {
    if (recognition && !stopping) { stopping = true; record('stop'); el('stop').disabled = true; status('กำลังประมวลผลเสียงสุดท้าย…'); recognition.stop(); }
  }
  el('stop').addEventListener('click', requestStop);
  document.addEventListener('visibilitychange', () => { if (document.hidden && recognition) { stop(); status('หยุดไมค์เมื่อออกจากหน้าจอ กรุณาตรวจข้อความ'); } });
  function field(row, label, key, value, type = 'text') {
    const wrapper = document.createElement('label'); wrapper.textContent = label;
    const input = document.createElement('input'); input.type = type; input.className = 'form-input'; input.dataset.field = key; input.value = value;
    if (type === 'number') { input.min = '0.01'; input.step = '0.01'; input.inputMode = 'decimal'; }
    wrapper.append(input); row.append(wrapper);
  }
  function buildReview() {
    stop(); invalidate();
    const data = getData();
    const items = VoiceExpense.parse(el('text').value, data.categories.expense);
    if (!items.length) { status('กรุณาพูดหรือพิมพ์รายการก่อน'); return; }
    el('account').replaceChildren(new Option('เลือกบัญชี / บัตร', ''), ...data.accounts.map(a => new Option(a, a)));
    const defaults = VoiceExpense.defaults(data);
    el('account').value = defaults.account;
    el('date').value = defaults.date;
    for (const item of items) {
      const row = document.createElement('fieldset'); row.className = 'voice-row';
      const legend = document.createElement('legend'); legend.textContent = 'รายจ่าย'; row.append(legend);
      const summary = document.createElement('p'); summary.className = 'voice-item-summary'; row.append(summary);
      const details = document.createElement('details');
      const edit = document.createElement('summary'); edit.textContent = 'แก้ไขรายละเอียด'; details.append(edit); row.append(details);
      field(details, 'ชื่อรายการ', 'itemName', item.itemName);
      field(details, 'ราคา (บาท)', 'amount', item.amount, 'number');
      field(details, 'ร้านค้า (ไม่บังคับ)', 'merchant', item.merchant);
      const label = document.createElement('label'); label.textContent = 'หมวดหมู่';
      const select = document.createElement('select'); select.className = 'form-input'; select.dataset.field = 'category';
      select.append(new Option('เลือกหมวดหมู่', ''), ...data.categories.expense.map(c => new Option(c.name, c.name)));
      select.value = item.category; label.append(select); details.append(label);
      if (!item.itemName || !item.amount || !item.category) details.open = true;
      if (item.warning) { const warning = document.createElement('p'); warning.textContent = item.warning; row.append(warning); }
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'btn-secondary'; remove.textContent = 'ลบรายการนี้';
      remove.addEventListener('click', () => { row.remove(); refreshSummary(); }); row.append(remove);
      el('items').append(row);
    }
    el('review').hidden = false; refreshSummary();
    status('เติมวันที่และบัญชีให้แล้ว ตรวจสรุปแล้วกดยืนยันได้เลย ร้านค้าเว้นว่างได้');
  }
  el('parse').addEventListener('click', buildReview);
  el('review').addEventListener('input', refreshSummary);
  el('review').addEventListener('change', refreshSummary);
  el('save').addEventListener('click', () => {
    if (saving || el('save').disabled || el('review').hidden || recognition || !dialog.open) return;
    const items = readItems();
    saving = true; el('save').disabled = true;
    try { saveVoiceExpenses(items, el('account').value, el('date').value); close(); }
    catch (error) { status(error.message); }
    finally { saving = false; if (dialog.open) refreshSummary(); }
  });
})();
