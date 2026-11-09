/* Drafts stay in memory; only the explicit confirmed Save calls the existing storage path. */
(function () {
  'use strict';
  const el = id => document.getElementById('voice-' + id);
  const dialog = el('dialog');
  let recognition = null, saving = false;
  function status(message) { el('status').textContent = message; }
  function unconfirm() { el('confirm').checked = false; el('save').disabled = true; }
  function invalidate() { unconfirm(); el('review').hidden = true; el('items').replaceChildren(); }
  function stop() {
    const active = recognition;
    recognition = null;
    if (active) { active.onresult = active.onerror = active.onend = null; active.abort(); }
    el('start').disabled = false;
    el('stop').disabled = true;
    el('parse').disabled = false;
  }
  function close() {
    stop(); invalidate(); el('text').value = ''; status('');
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
  el('text').addEventListener('input', invalidate);
  el('start').addEventListener('click', () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech || !window.isSecureContext) {
      status('เบราว์เซอร์นี้ใช้ไมค์โดยตรงไม่ได้ เปิดผ่าน HTTPS บน Chrome หรือใช้ไมค์ภาษาไทยบนแป้นพิมพ์ Samsung แล้วกดแยกรายการ');
      return;
    }
    stop(); invalidate();
    const active = new Speech(); recognition = active;
    active.lang = 'th-TH'; active.continuous = true; active.interimResults = true;
    active.onresult = event => {
      if (recognition !== active || !dialog.open) return;
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          el('text').value = [el('text').value.trim(), event.results[i][0].transcript.trim()].filter(Boolean).join(' ');
          invalidate();
        } else interim += event.results[i][0].transcript;
      }
      status(interim ? 'กำลังฟัง: ' + interim : 'กำลังฟัง… กดหยุดฟังก่อนแยกรายการ');
    };
    active.onerror = event => {
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
      stop(); status('หยุดฟังแล้ว ตรวจข้อความแล้วกดแยกรายการ หรือกดเริ่มพูดเพื่อเพิ่มข้อความ');
    };
    try {
      active.start(); el('start').disabled = true; el('stop').disabled = false; el('parse').disabled = true;
      status('กำลังฟังภาษาไทย…');
    } catch (_) { stop(); status('เปิดไมค์ไม่ได้ ลองใหม่หรือใช้ไมค์บนแป้นพิมพ์'); }
  });
  // Gracefully finish the current utterance before reviewing final results.
  el('stop').addEventListener('click', () => {
    if (recognition) { recognition.stop(); el('stop').disabled = true; status('กำลังประมวลผลเสียงสุดท้าย…'); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden && recognition) { stop(); status('หยุดไมค์เมื่อออกจากหน้าจอ กรุณาตรวจข้อความ'); } });
  function field(row, label, key, value, type = 'text') {
    const wrapper = document.createElement('label'); wrapper.textContent = label;
    const input = document.createElement('input'); input.type = type; input.className = 'form-input'; input.dataset.field = key; input.value = value;
    if (type === 'number') { input.min = '0.01'; input.step = '0.01'; input.inputMode = 'decimal'; }
    wrapper.append(input); row.append(wrapper);
  }
  el('parse').addEventListener('click', () => {
    stop(); invalidate();
    const data = getData();
    const items = VoiceExpense.parse(el('text').value, data.categories.expense);
    if (!items.length) { status('กรุณาพูดหรือพิมพ์รายการก่อน'); return; }
    el('account').replaceChildren(new Option('เลือกบัญชี / บัตร', ''), ...data.accounts.map(a => new Option(a, a)));
    const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    el('date').value = today.toISOString().slice(0, 10);
    for (const item of items) {
      const row = document.createElement('fieldset'); row.className = 'voice-row';
      const legend = document.createElement('legend'); legend.textContent = 'รายจ่าย'; row.append(legend);
      field(row, 'ชื่อรายการ', 'itemName', item.itemName);
      field(row, 'ราคา (บาท)', 'amount', item.amount, 'number');
      field(row, 'ร้านค้า (ไม่บังคับ)', 'merchant', item.merchant);
      const label = document.createElement('label'); label.textContent = 'หมวดหมู่';
      const select = document.createElement('select'); select.className = 'form-input'; select.dataset.field = 'category';
      select.append(new Option('เลือกหมวดหมู่', ''), ...data.categories.expense.map(c => new Option(c.name, c.name)));
      select.value = item.category; label.append(select); row.append(label);
      if (item.warning) { const warning = document.createElement('p'); warning.textContent = item.warning; row.append(warning); }
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'btn-secondary'; remove.textContent = 'ลบรายการนี้';
      remove.addEventListener('click', () => { row.remove(); unconfirm(); }); row.append(remove);
      el('items').append(row);
    }
    el('review').hidden = false; status('แยกได้ ' + items.length + ' รายการ กรุณาตรวจสอบ');
  });
  el('review').addEventListener('input', event => { if (event.target !== el('confirm')) unconfirm(); });
  el('confirm').addEventListener('change', () => { el('save').disabled = !el('confirm').checked || saving; });
  el('save').addEventListener('click', () => {
    if (saving || !el('confirm').checked || el('review').hidden || recognition) return;
    const rows = [...el('items').querySelectorAll('.voice-row')];
    const items = rows.map(row => Object.fromEntries([...row.querySelectorAll('[data-field]')].map(input => [input.dataset.field, input.dataset.field === 'amount' ? (input.validity.valid ? Number(input.value) : NaN) : input.value])));
    saving = true; el('save').disabled = true;
    try { saveVoiceExpenses(items, el('account').value, el('date').value); close(); }
    catch (error) { status(error.message); unconfirm(); }
    finally { saving = false; }
  });
})();
