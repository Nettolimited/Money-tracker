/* Thai expense parsing is local. Speech recognition is provided by the browser. */
(function (root) {
  'use strict';
  const digits = {ศูนย์:0, หนึ่ง:1, เอ็ด:1, สอง:2, ยี่:2, สาม:3, สี่:4, ห้า:5, หก:6, เจ็ด:7, แปด:8, เก้า:9};
  const units = {สิบ:10, ร้อย:100, พัน:1000, หมื่น:10000, แสน:100000, ล้าน:1000000};
  const numberWords = Object.keys({...digits, ...units}).join('|');
  const numberPattern = `(?:[0-9๐-๙]+(?:,[0-9๐-๙]{3})*(?:\\.[0-9๐-๙]{1,2})?|(?:(?:${numberWords})\\s*)+(?:จุด\\s*(?:(?:${Object.keys(digits).join('|')})\\s*)+)?)`;
  const paymentPattern = new RegExp('จ่าย\\s*ผ่าน\\s*(.*?)(?=\\s*(?:จ่าย\\s*ผ่าน|หมวดหมู่|หมวด|ที่ร้าน|จากร้าน|' + numberPattern + '\\s*บาท)|\\s+ร้าน|$)', 'g');
  function number(text) {
    text = text.replace(/[๐-๙]/g, d => '๐๑๒๓๔๕๖๗๘๙'.indexOf(d)).replace(/\s|,/g, '');
    if (/^\d+(\.\d{1,2})?$/.test(text)) return Number(text);
    const parts = text.split('จุด');
    const tokens = parts[0].match(new RegExp(numberWords, 'g')) || [];
    if (tokens.join('') !== parts[0] || !tokens.length) return NaN;
    let total = 0, section = 0, current = 0;
    for (const token of tokens) {
      if (token in digits) current = digits[token];
      else if (token === 'ล้าน') { total = (total + section + current) * 1000000; section = current = 0; }
      else { section += (current || 1) * units[token]; current = 0; }
    }
    let value = total + section + current;
    if (parts.length > 1) {
      const decimal = parts[1].match(new RegExp(Object.keys(digits).join('|'), 'g')) || [];
      if (!decimal.length || decimal.length > 2 || decimal.join('') !== parts[1]) return NaN;
      value += Number('0.' + decimal.map(t => digits[t]).join(''));
    }
    return Math.round(value * 100) / 100;
  }
  function accountKey(name) {
    return name.normalize('NFKC').toLowerCase().replace(/[\s._-]+/g, '');
  }
  const accountAliases = [
    ['เงินสด', 'สด'],
    ['QR Code', 'QR', 'คิวอาร์', 'คิวอาร์โค้ด'],
    ['KBank', 'เคแบงก์', 'เคแบงค์', 'กสิกร', 'กสิกรไทย', 'K Plus', 'เคพลัส'],
    ['KTC', 'เคทีซี'],
    ['TTB', 'ทีทีบี'],
    ['Make', 'เมค', 'Make by KBank'],
    ['Krungsri NOW', 'กรุงศรีนาว', 'กรุงศรี NOW'],
    ['Easy Pass', 'อีซี่พาส'],
    ['Spaylater', 'เอสเพย์เลเทอร์', 'ช้อปปี้เพย์เลเทอร์'],
    ['ShopeePay', 'ช้อปปี้เพย์', 'ช็อปปี้เพย์'],
    ['SCB Easy', 'SCB', 'ไทยพาณิชย์', 'เอสซีบี', 'เอสซีบีอีซี่'],
    ['TRUE Money', 'ทรูมันนี่', 'ทรูมันนี่วอลเล็ท', 'TrueMoney Wallet']
  ].map(group => group.map(accountKey));

  function matchAccount(spoken, accounts) {
    const key = accountKey(spoken);
    const exact = accounts.filter(account => accountKey(account) === key);
    if (exact.length) return exact.length === 1 ? exact[0] : '';
    const group = accountAliases.find(aliases => aliases.includes(key));
    const matches = group ? accounts.filter(account => group.includes(accountKey(account))) : [];
    return matches.length === 1 ? matches[0] : '';
  }

  function parse(text, categories, accounts = []) {
    const names = categories.map(c => typeof c === 'string' ? c : c.name);
    const sources = [];
    for (const part of text.split(/\n|;|แล้วก็|แล้ว|รายการถัดไป|\s*และ\s*/).map(s => s.trim()).filter(Boolean)) {
      if (/^จ่าย\s*ผ่าน/.test(part) && sources.length) sources[sources.length - 1] += ' ' + part;
      else sources.push(part);
    }
    return sources.map(source => {
      const payments = [];
      let rest = source.replace(paymentPattern, (_, payment) => {
        payments.push(payment.trim().replace(/^[,:：]+|[,.!?]+$/g, '').trim());
        return ' ';
      }).trim().replace(/^(?:ซื้อ|จ่ายค่า|จ่าย)\s*/, '');
      let category = '';
      const explicit = rest.match(/(?:หมวดหมู่|หมวด)\s*(.+)$/);
      if (explicit) { category = names.find(n => n === explicit[1].trim()) || ''; rest = rest.slice(0, explicit.index).trim(); }
      const amounts = [...rest.matchAll(new RegExp(`(${numberPattern})\\s*บาท(?:\\s*(${numberPattern})\\s*สตางค์)?`, 'g'))];
      let amount = '', warning = '';
      if (amounts.length === 1 && !/[-−]\s*$/.test(rest.slice(0, amounts[0].index))) {
        const match = amounts[0];
        const value = number(match[1]) + (match[2] ? number(match[2]) / 100 : 0);
        if (Number.isFinite(value) && value > 0) amount = Math.round(value * 100) / 100;
        rest = rest.slice(0, match.index) + ' ' + rest.slice(match.index + match[0].length);
      } else warning = amounts.length ? 'พบหลายราคา กรุณาแยกรายการหรือแก้ราคา' : 'ไม่พบราคา กรุณาระบุจำนวนเงินเป็นบาท';
      let merchant = '';
      const shop = rest.match(/(?:ที่ร้าน|จากร้าน|ร้าน|ที่)\s*(.+)$/);
      if (shop) { merchant = shop[1].trim(); rest = rest.slice(0, shop.index); }
      const itemName = rest.replace(/(?:ราคา|จำนวน)\s*$/, '').trim();
      if (!explicit) {
        const drinks = /กาแฟ|ชาเย็น|ชาไทย|น้ำหวาน|ชานม|น้ำปั่น|ผลไม้ปั่น|น้ำผลไม้|สมูทตี้|สมูทที|โกโก้|โอเลี้ยง|^(?:น้ำ|เครื่องดื่ม)\s*(?:คาเฟ่\s*)?(?:อเมซอน|อะเมซอน|amazon)/i;
        const cafeDrink = /^(?:น้ำ|เครื่องดื่ม|น้ำดื่ม|น้ำเปล่า)$/.test(itemName) && /อเมซอน|อะเมซอน|amazon/i.test(merchant);
        const rules = [
          [/น้ำมัน/, 'BRV'],
          [drinks, 'กาแฟ/น้ำหวาน'],
          [/ข้าว|อาหาร|ก๋วยเตี๋ยว|ขนม/, 'อาหาร'],
          [/แท็กซี่|รถไฟ|รถเมล์|เดินทาง/, 'เดินทาง'],
          [/ยา|หมอ|โรงพยาบาล/, 'สุขภาพ']
        ];
        category = cafeDrink && names.includes('กาแฟ/น้ำหวาน') ? 'กาแฟ/น้ำหวาน' :
          (rules.find(([r, n]) => r.test(itemName) && names.includes(n)) || [null, ''])[1];
      }
      const item = {itemName, amount, merchant, category, warning};
      if (payments.length) {
        item.spokenAccount = payments.filter(Boolean).join(' / ');
        const matches = payments.map(payment => matchAccount(payment, accounts));
        item.account = matches.every(account => account && account === matches[0]) ? matches[0] : '';
      }
      return item;
    });
  }
  function defaults(data, now = new Date()) {
    const accounts = data.accounts || [];
    let account = accounts[0] || '', latest = -Infinity;
    for (const tx of data.transactions || []) {
      if (!accounts.includes(tx.account)) continue;
      const stamp = Number(tx.createdAt) || Date.parse(tx.date) || 0;
      if (stamp >= latest) { latest = stamp; account = tx.account; }
    }
    const date = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
    return {account, date};
  }
  root.VoiceExpense = {parse, number, defaults};
  if (typeof module !== 'undefined') module.exports = root.VoiceExpense;
})(typeof window === 'undefined' ? globalThis : window);
