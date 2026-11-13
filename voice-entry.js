/* Drafts stay in memory; only the explicit confirmed Save calls the existing storage path. */
(function () {
  'use strict';
  const el = id => document.getElementById('voice-' + id);
  const dialog = el('dialog');
  // Re-evaluating the script must not bind a second set of listeners.
  if (!dialog || dialog.dataset.voiceEntryBound === 'true') return;
  dialog.dataset.voiceEntryBound = 'true';
  let recognition = null, stopping = false, saving = false;
  const BUILD = APP_VERSION;
  let diagnostics = [];
  function record(type, detail = {}) {
    diagnostics.push({type, ...detail}); diagnostics = diagnostics.slice(-20);
    if (el('diagnostics')) el('diagnostics').value = JSON.stringify({build:BUILD, continuous:false, events:diagnostics}, null, 2);
  }
  el('version').textContent = 'Money Tracker v' + BUILD;
  el('copy-diagnostics')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(el('diagnostics').value); status('คัดลอกข้อมูลตรวจปัญหาแล้ว ส่งให้ผู้ช่วยได้หากต้องการ'); }
    catch (_) { el('diagnostics').focus(); el('diagnostics').select(); status('เลือกข้อมูลแล้ว กดคัดลอกเพื่อส่งตรวจปัญหาได้'); }
  });
  function status(message) { el('status').textContent = message; }
  function setPhase(phase) {
    dialog.dataset.phase = phase;
    const recording = phase === 'listening' || phase === 'processing';
    el('start').hidden = recording;
    el('start').disabled = recording;
    el('stop').hidden = !recording;
    el('stop').disabled = phase !== 'listening';
    el('stop-label').textContent = phase === 'processing' ? 'กำลังประมวลผล…' : 'หยุดฟัง';
    el('parse').disabled = recording;
    el('start-label').textContent = el('text').value.trim() ? 'พูดต่อ' : 'เริ่มพูด';
  }
  const formatAmount = value => value.toLocaleString('th-TH', { maximumFractionDigits: 2 });
  function readItems() {
    return [...el('items').querySelectorAll('.voice-row')].map(row => {
      const item = Object.fromEntries([...row.querySelectorAll('[data-field]')].map(input =>
        [input.dataset.field, input.dataset.field === 'amount' ? (input.validity.valid ? Number(input.value) : NaN) : input.value]));
      if (!item.account && row.hasAttribute('data-inherit-account')) item.account = el('account').value;
      return item;
    });
  }
  function refreshSummary() {
    const items = readItems();
    const total = items.reduce((sum, item) => sum + (Number.isFinite(item.amount) ? item.amount : 0), 0);
    const data = getData();
    const date = el('date');
    const missing = [];
    if (items.some(item => !item.itemName.trim())) missing.push('ชื่อรายการ');
    if (items.some(item => !Number.isFinite(item.amount) || item.amount <= 0)) missing.push('ราคา');
    if (items.some(item => !data.categories.expense.some(category => category.name === item.category))) missing.push('หมวดหมู่');
    if (items.some(item => !data.accounts.includes(item.account))) missing.push('ช่องทางจ่าย');
    if (!date.value || !date.validity.valid) missing.push('วันที่');
    el('save').disabled = saving || !items.length || !!missing.length || el('review').hidden || !!recognition;
    el('save').textContent = 'บันทึก ' + items.length + ' รายการ · ฿' + formatAmount(total);
    el('save-status').textContent = !items.length ? 'ยังไม่มีรายการให้บันทึก' : missing.length ? 'กรุณาระบุ' + missing.join(' และ') : '';
    const formattedDate = date.valueAsDate?.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
    const inheritsAccount = el('items').querySelector('[data-inherit-account] [data-field=account] option[value=""]:checked');
    const defaultAccount = inheritsAccount && el('account').value;
    el('summary').textContent = [formattedDate || 'เลือกวันที่', defaultAccount && 'ค่าเริ่มต้น: ' + defaultAccount, 'แก้ไข'].filter(Boolean).join(' · ');
    [...el('items').querySelectorAll('.voice-row')].forEach((row, index) => {
      const input = key => row.querySelector('[data-field=' + key + ']');
      const amount = input('amount');
      row.querySelector('.voice-item-name').textContent = input('itemName').value || 'กรุณาระบุชื่อ';
      row.querySelector('.voice-item-amount').textContent = amount.validity.valid && amount.valueAsNumber > 0 ? '฿' + formatAmount(amount.valueAsNumber) : 'ระบุราคา';
      row.querySelector('.voice-item-meta').textContent = [
        input('category').value || 'เลือกหมวดหมู่',
        input('merchant').value && 'ร้าน ' + input('merchant').value,
        items[index].account ? 'จ่ายผ่าน ' + items[index].account : 'เลือกช่องทางจ่าย',
        'แก้ไข'
      ].filter(Boolean).join(' · ');
      const accountWarning = row.querySelector('.voice-account-warning');
      if (accountWarning) accountWarning.hidden = !!items[index].account;
    });
  }
  function invalidate() {
    el('save').disabled = true;
    el('review').hidden = el('footer').hidden = true;
    el('items').replaceChildren();
  }
  function stop(abort = true) {
    const active = recognition;
    recognition = null; stopping = false;
    if (active) {
      active.onresult = active.onerror = active.onend = active.onspeechend = null;
      if (abort) active.abort();
    }
    setPhase('capture');
  }
  function close() {
    el('text').value = '';
    stop(); invalidate(); status('');
    el('transcript').open = el('help').open = el('summary').parentElement.open = false;
    el('transcript-label').textContent = 'พิมพ์หรือใช้ไมค์บนแป้นพิมพ์';
    diagnostics = []; if (el('diagnostics')) el('diagnostics').value = '';
    if (dialog.open) dialog.close();
  }
  window.closeVoiceExpense = close;
  el('open').addEventListener('click', () => {
    close(); dialog.showModal();
    el('body').scrollTop = 0;
  });
  el('cancel').addEventListener('click', close);
  dialog.addEventListener('cancel', e => { e.preventDefault(); close(); });
  dialog.addEventListener('close', () => { if (!dialog.open) close(); });
  el('text').addEventListener('input', () => {
    if (recognition) { stop(); status('หยุดไมค์เพื่อให้แก้ข้อความได้'); }
    invalidate();
    setPhase('capture');
    el('transcript-label').textContent = 'แก้ข้อความที่ได้';
  });
  el('start').addEventListener('click', () => {
    if (recognition || saving) return;
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech || !window.isSecureContext) {
      status('ใช้ไมค์บนแป้นพิมพ์หรือพิมพ์รายการด้านล่างได้');
      el('transcript').open = true;
      return;
    }
    stop(); invalidate();
    const baseText = el('text').value.trim();
    const transcript = SpeechTranscript.createSession();
    const active = new Speech(); recognition = active;
    active.lang = 'th-TH'; active.continuous = false; active.interimResults = true;
    el('transcript').open = false;
    record('start');
    active.onspeechend = () => { if (recognition === active) { record('speechend'); requestStop(); } };
    active.onresult = event => {
      if (recognition !== active || !dialog.open) return;
      record('result', {resultIndex:event.resultIndex, results:Array.from(event.results, result => ({isFinal:result.isFinal, text:result[0]?.transcript || ''}))});
      const { finalTranscript, interimTranscript } = transcript.update(event);
      const text = [baseText, finalTranscript].filter(Boolean).join(' ');
      if (el('text').value !== text) { el('text').value = text; invalidate(); }
      // Interim text is displayed separately and is never persisted or parsed.
      if (!stopping) status(interimTranscript ? 'กำลังฟัง (ยังไม่ยืนยัน): ' + interimTranscript : 'กำลังฟัง… กดหยุดฟังก่อนตรวจสรุป');
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
      if (event.error === 'not-allowed' || event.error === 'audio-capture') el('transcript').open = true;
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
      active.start();
      setPhase('listening');
      el('stop').focus({ preventScroll: true });
      status('กำลังฟัง… พูดจบแล้วเว้นจังหวะเพื่อดูสรุป');
    } catch (_) { stop(); status('เปิดไมค์ไม่ได้ ลองใหม่หรือใช้ไมค์บนแป้นพิมพ์'); }
  });
  // Gracefully finish the current utterance before reviewing final results.
  function requestStop() {
    if (!recognition || stopping) return;
    stopping = true;
    record('stop');
    setPhase('processing');
    status('กำลังถอดข้อความ…');
    recognition.stop();
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
    const items = VoiceExpense.parse(el('text').value, data.categories.expense, data.accounts);
    if (!items.length) { status('กรุณาพูดหรือพิมพ์รายการก่อน'); return; }
    el('account').replaceChildren(new Option('เลือกบัญชี / บัตร', ''), ...data.accounts.map(a => new Option(a, a)));
    const defaults = VoiceExpense.defaults(data);
    el('account').value = defaults.account;
    el('date').value = defaults.date;
    for (const item of items) {
      const row = document.createElement('details'); row.className = 'voice-row voice-details';
      const summary = document.createElement('summary');
      const heading = document.createElement('span'); heading.className = 'voice-item-heading';
      const name = document.createElement('span'); name.className = 'voice-item-name';
      const amount = document.createElement('span'); amount.className = 'voice-item-amount';
      const meta = document.createElement('span'); meta.className = 'voice-item-meta';
      heading.append(name, amount); summary.append(heading, meta); row.append(summary);
      const fields = document.createElement('div'); fields.className = 'voice-field-grid';
      field(fields, 'ชื่อรายการ', 'itemName', item.itemName);
      field(fields, 'ราคา (บาท)', 'amount', item.amount, 'number');
      field(fields, 'ร้านค้า (ไม่บังคับ)', 'merchant', item.merchant);
      const label = document.createElement('label'); label.textContent = 'หมวดหมู่';
      const select = document.createElement('select'); select.className = 'form-input'; select.dataset.field = 'category';
      select.append(new Option('เลือกหมวดหมู่', ''), ...data.categories.expense.map(c => new Option(c.name, c.name)));
      select.value = item.category; label.append(select); fields.append(label);
      const hasSpokenAccount = item.spokenAccount !== undefined;
      row.toggleAttribute('data-inherit-account', !hasSpokenAccount);
      const accountLabel = document.createElement('label');
      accountLabel.textContent = 'จ่ายผ่าน';
      const accountSelect = document.createElement('select');
      accountSelect.className = 'form-input';
      accountSelect.dataset.field = 'account';
      accountSelect.append(new Option(hasSpokenAccount ? 'เลือกช่องทางจ่าย' : 'ใช้ช่องทางเริ่มต้น', ''), ...data.accounts.map(account => new Option(account, account)));
      accountSelect.value = item.account || '';
      accountLabel.append(accountSelect);
      fields.append(accountLabel);
      row.append(fields);
      row.open = !item.itemName || !item.amount || !item.category || !(hasSpokenAccount ? item.account : defaults.account);
      if (hasSpokenAccount && !item.account) {
        const warning = document.createElement('p');
        warning.className = 'voice-item-warning voice-account-warning';
        warning.textContent = item.spokenAccount ? 'ได้ยินว่า “' + item.spokenAccount + '” กรุณาเลือกช่องทางจ่าย' : 'กรุณาเลือกช่องทางจ่าย';
        row.append(warning);
      }
      if (item.warning) {
        const warning = document.createElement('p');
        warning.className = 'voice-item-warning';
        warning.textContent = item.warning;
        row.append(warning);
      }
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'voice-remove'; remove.textContent = 'ลบรายการนี้';
      remove.addEventListener('click', () => { row.remove(); refreshSummary(); }); row.append(remove);
      el('items').append(row);
    }
    el('review').hidden = el('footer').hidden = false;
    el('transcript').open = false;
    el('transcript-label').textContent = 'ดูหรือแก้ข้อความที่ได้';
    setPhase('review');
    refreshSummary();
    status('');
    el('review-title').focus({ preventScroll: true });
    el('review-title').scrollIntoView({ block: 'nearest' });
  }
  el('parse').addEventListener('click', buildReview);
  el('review').addEventListener('input', refreshSummary);
  el('review').addEventListener('change', refreshSummary);
  el('save').addEventListener('click', () => {
    if (saving || el('save').disabled || el('review').hidden || recognition || !dialog.open) return;
    const items = readItems();
    saving = true; el('save').disabled = true;
    try { saveVoiceExpenses(items, el('date').value); close(); }
    catch (error) {
      saving = false;
      refreshSummary();
      el('save-status').textContent = error.message;
    } finally { saving = false; }
  });
})();
