/* Thai expense parsing is local. Speech recognition is provided by the browser. */
(function (root) {
  'use strict';
  const digits = {ศูนย์:0, หนึ่ง:1, เอ็ด:1, สอง:2, ยี่:2, สาม:3, สี่:4, ห้า:5, หก:6, เจ็ด:7, แปด:8, เก้า:9};
  const units = {สิบ:10, ร้อย:100, พัน:1000, หมื่น:10000, แสน:100000, ล้าน:1000000};
  const numberWords = Object.keys({...digits, ...units}).join('|');
  const numberPattern = `(?:[0-9๐-๙]+(?:,[0-9๐-๙]{3})*(?:\\.[0-9๐-๙]{1,2})?|(?:(?:${numberWords})\\s*)+(?:จุด\\s*(?:(?:${Object.keys(digits).join('|')})\\s*)+)?)`;
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
  function parse(text, categories) {
    const names = categories.map(c => typeof c === 'string' ? c : c.name);
    return text.split(/\n|;|แล้วก็|แล้ว|รายการถัดไป|\s*และ\s*/).map(s => s.trim()).filter(Boolean).map(source => {
      let rest = source.replace(/^(?:ซื้อ|จ่ายค่า|จ่าย)\s*/, '');
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
        const rules = [ [/กาแฟ|ชาเย็น|ชาไทย|น้ำหวาน|ชานม/, 'กาแฟ/น้ำหวาน'], [/ข้าว|อาหาร|ก๋วยเตี๋ยว|ขนม/, 'อาหาร'], [/แท็กซี่|รถไฟ|รถเมล์|เดินทาง/, 'เดินทาง'], [/น้ำมัน/, 'BRV'], [/ยา|หมอ|โรงพยาบาล/, 'สุขภาพ'] ];
        category = (rules.find(([r, n]) => r.test(itemName) && names.includes(n)) || [null, ''])[1];
      }
      return {itemName, amount, merchant, category, warning};
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
