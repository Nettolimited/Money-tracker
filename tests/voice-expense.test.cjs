const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {parse, number} = require('../voice-expense.js');
const categories = ['อาหาร', 'กาแฟ/น้ำหวาน', 'เดินทาง', 'อื่นๆ'];
test('Thai speech, multiple entries, merchants and existing categories', () => {
  assert.deepEqual(parse('ข้าว 60 บาท ร้านป้าดา แล้ว กาแฟห้าสิบห้าบาท ที่ร้านอเมซอน', categories).map(({warning, ...x}) => x), [
    {itemName:'ข้าว', amount:60, merchant:'ป้าดา', category:'อาหาร'},
    {itemName:'กาแฟ', amount:55, merchant:'อเมซอน', category:'กาแฟ/น้ำหวาน'}
  ]);
});
test('Thai digits, thousands, decimals and satang', () => {
  assert.equal(parse('นม ๔๕ บาท ๕๐ สตางค์', categories)[0].amount, 45.5);
  assert.equal(parse('ของใช้ 1,250.75 บาท', categories)[0].amount, 1250.75);
  assert.equal(number('หนึ่งพันสองร้อยยี่สิบเอ็ด'), 1221);
  assert.equal(number('หกสิบจุดห้าศูนย์'), 60.5);
});
test('Spoken payment channels match existing accounts without changing the merchant or category', () => {
  const accounts = ['เงินสด', 'QR Code', 'KBank', 'KTC', 'บัตรเดินทาง', 'บัตรร้านค้า'];
  const items = parse('ข้าว 60 บาท ร้านป้าดา จ่ายผ่านเคแบงก์ แล้วกาแฟ 55 บาท จ่ายผ่านคิวอาร์ ที่ร้านอเมซอน หมวดกาแฟ/น้ำหวาน', categories, accounts);
  assert.deepEqual(items.map(({account, merchant, category, itemName}) => [account, merchant, category, itemName]), [
    ['KBank', 'ป้าดา', 'อาหาร', 'ข้าว'],
    ['QR Code', 'อเมซอน', 'กาแฟ/น้ำหวาน', 'กาแฟ']
  ]);
  assert.equal(parse('ข้าว 50 บาท แล้วจ่ายผ่าน K T C', categories, accounts)[0].account, 'KTC');
  assert.equal(parse('ข้าว 50 บาท จ่าย ผ่าน บัตรเดินทาง', categories, accounts)[0].account, 'บัตรเดินทาง');
  const channelBeforePrice = parse('ข้าว จ่ายผ่านบัตรร้านค้า 50 บาท', categories, accounts)[0];
  assert.equal(channelBeforePrice.account, 'บัตรร้านค้า');
  assert.equal(channelBeforePrice.amount, 50);
  assert.equal(parse('ข้าว 50 บาท', categories, accounts)[0].account, undefined);
});
test('Spoken payment never falls back to a guess for an unknown, missing or conflicting channel', () => {
  const accounts = ['เงินสด', 'KBank', 'กสิกรไทย'];
  for (const phrase of ['จ่ายผ่านบัตรอื่น', 'จ่ายผ่าน', 'จ่ายผ่านเคแบงก์', 'จ่ายผ่านเงินสด จ่ายผ่าน KBank']) {
    const item = parse('ข้าว 50 บาท ' + phrase, categories, accounts)[0];
    assert.equal(item.account, '', phrase);
    assert.equal(item.itemName, 'ข้าว', phrase);
    assert.equal(item.amount, 50, phrase);
  }
  assert.equal(parse('ข้าว 50 บาท จ่ายผ่าน KBank', categories, accounts)[0].account, 'KBank');
});
test('Ambiguity and unknown categories require review', () => {
  assert.equal(parse('น้ำ 20 บาท 30 บาท', categories)[0].amount, '');
  assert.equal(parse('น้ำ', categories)[0].amount, '');
  assert.equal(parse('ข้าว 60 บาท หมวดสุขภาพ', categories)[0].category, '');
  assert.equal(parse('อาหารเสริม 60 บาท หมวดอื่นๆ', categories)[0].category, 'อื่นๆ');
  assert.equal(parse('ชา 50 บาท', ['อื่นๆ'])[0].category, '');
  assert.equal(parse('ข้าว 60 บาท\nกาแฟ 40 บาท;น้ำ 10 บาท', categories).length, 3);
  assert.deepEqual(parse('', categories), []);
});
test('Spoken dates use local calendar days across a month, year and leap day', () => {
  const now = new Date(2024, 2, 1, 0, 5);
  const text = 'เมื่อวานข้าว 60 บาท ร้านป้าดา จ่ายผ่านเงินสด แล้วกาแฟ 55 บาท จ่ายผ่าน KBank สองวันที่แล้ว แล้วขนม 20 บาท';
  const items = parse(text, categories, ['เงินสด', 'KBank'], now);
  assert.deepEqual(items.map(({itemName, date, account, merchant}) => [itemName, date, account, merchant]), [
    ['ข้าว', '2024-02-29', 'เงินสด', 'ป้าดา'],
    ['กาแฟ', '2024-02-28', 'KBank', ''],
    ['ขนม', undefined, undefined, '']
  ]);
  const newYear = new Date(2026, 0, 1, 23, 55);
  for (const phrase of ['สองวันก่อน', '2 วันก่อน', '๒ วันที่แล้ว', 'เมื่อวานซืน']) {
    assert.equal(parse('ข้าว 50 บาท แล้ว ' + phrase, categories, [], newYear)[0].date, '2025-12-30');
  }
  assert.equal(parse('วันนี้ ข้าว 50 บาท', categories, [], newYear)[0].date, '2026-01-01');
});
test('Unclear or conflicting spoken dates require a date selection', () => {
  const now = new Date(2026, 10, 14);
  for (const phrase of ['วันก่อน', 'หลายวันก่อน', 'ไม่กี่วันก่อน', 'สองสามวันก่อน', '2.5 วันก่อน', 'เมื่อวาน สองวันก่อน']) {
    const item = parse('ข้าว 50 บาท ' + phrase, categories, [], now)[0];
    assert.equal(item.date, '', phrase);
    assert.equal(item.amount, 50, phrase);
    assert.equal(item.itemName, 'ข้าว', phrase);
  }
  assert.equal(parse('เมื่อวาน ข้าว 50 บาท เมื่อวานนี้', categories, [], now)[0].date, '2026-11-13');
});
function app() {
  const writes = [];
  const context = vm.createContext({window: {_db: {ref: path => ({set: data => { writes.push({path, data}); return Promise.resolve(); }})}},
    document: {addEventListener() {}, getElementById() {return null;}},
    localStorage: {setItem() {}, getItem() {return null;}}, console, setTimeout, clearTimeout});
  vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context);
  vm.runInContext(`_appData = { transactions: [{id:'untouched', amount:7}], accounts:['เงินสด','KBank'], categories:{expense:[{name:'อาหาร'}]} }; reRenderPage=()=>{}; showToast=()=>{}; setSyncStatus=()=>{};`, context);
  return {context, writes};
}
test('Confirmed batch uses existing Firebase save once and preserves history', async () => {
  const {context, writes} = app();
  vm.runInContext(`saveVoiceExpenses([{itemName:'ข้าว',merchant:'ป้าดา',amount:60,category:'อาหาร',account:'เงินสด',date:'2026-11-13'}, {itemName:'ขนม',merchant:'',amount:20,category:'อาหาร',account:'KBank',date:'2026-11-12'}])`, context);
  assert.equal(writes.length, 1);
  assert.equal(writes[0].path, 'appData');
  const txs = Object.values(writes[0].data.transactions);
  assert.equal(txs.length, 3);
  assert.equal(txs[0].id, 'untouched');
  assert.equal(txs[1].itemName, 'ข้าว');
  assert.equal(txs[1].merchant, 'ป้าดา');
  assert.equal(txs[1].note, 'ข้าว · ร้าน ป้าดา');
  assert.equal(txs[1].type, 'expense');
  assert.equal(txs[1].account, 'เงินสด');
  assert.equal(txs[2].account, 'KBank');
  assert.equal(txs[1].date, '2026-11-13');
  assert.equal(txs[2].date, '2026-11-12');
  assert.notEqual(txs[1].id, txs[2].id);
});
test('Invalid batch never writes any item', () => {
  const {context, writes} = app();
  for (const amount of ['NaN', 'Infinity', '0', '-1']) {
    assert.throws(() => vm.runInContext(`saveVoiceExpenses([{itemName:'ข้าว',merchant:'',amount:60,category:'อาหาร',account:'เงินสด',date:'2026-11-09'}, {itemName:'น้ำ',merchant:'',amount:${amount},category:'อาหาร',account:'เงินสด',date:'2026-11-09'}])`, context));
  }
  assert.throws(() => vm.runInContext("saveVoiceExpenses([])", context));
  assert.throws(() => vm.runInContext("saveVoiceExpenses([{itemName:'ข้าว',merchant:'',amount:60,category:'อาหาร',account:'บัตรอื่น',date:'2026-11-09'}])", context), /ช่องทางจ่าย/);
  assert.equal(writes.length, 0);
  assert.equal(vm.runInContext('_appData.transactions.length', context), 1);
});
test('Manual save still uses original form fields and storage path', () => {
  const {context, writes} = app();
  vm.runInContext(`
    document.getElementById = id => ({value: {'form-amount':'120', 'form-date':'2026-11-09', 'form-note':'manual'}[id] || '', style:{display:'none'}});
    state.addType='expense'; state.addCat='อาหาร'; state.addAccount='เงินสด';
    state.editingId=null; state.addInstallId=null;
    removeSlip=()=>{}; navigate=()=>{}; window.scrollTo=()=>{};
    saveTransaction();
  `, context);
  assert.equal(writes.length, 1);
  const tx = Object.values(writes[0].data.transactions)[1];
  assert.equal(tx.amount, 120);
  assert.equal(tx.note, 'manual');
  assert.equal(tx.foreignCurrency, '');
});
test('Reject negative speech amounts and invalid dates; render names as text', () => {
  assert.equal(parse('ข้าว -60 บาท', categories)[0].amount, '');
  const {context, writes} = app();
  assert.throws(() => vm.runInContext("saveVoiceExpenses([{itemName:'ข้าว',merchant:'',amount:60,category:'อาหาร',account:'เงินสด',date:'2026-02-28'},{itemName:'กาแฟ',merchant:'',amount:50,category:'อาหาร',account:'เงินสด',date:'2026-02-31'}])", context), /วันที่/);
  assert.equal(writes.length, 0);
  const html = vm.runInContext(`txHTML({id:'test',type:'expense',category:'อาหาร',note:'<img src=x onerror=alert(1)>',date:'2026-11-09',amount:60})`, context);
  assert.ok(html.includes('&lt;img'));
  assert.ok(!html.includes('<img'));
});

test('Quick review uses local today and most recent valid account, with safe empty-history fallback', () => {
  const {defaults} = require('../voice-expense.js');
  const today = new Date(2026, 10, 9, 0, 5);
  assert.deepEqual(defaults({accounts:['เงินสด','บัตร'],transactions:[
    {account:'บัตร',createdAt:200}, {account:'เงินสด',createdAt:100}, {account:'ลบแล้ว',createdAt:300}
  ]}, today), {account:'บัตร',date:'2026-11-09'});
  assert.equal(defaults({accounts:['เงินสด'],transactions:[]},today).account,'เงินสด');
  assert.equal(defaults({accounts:[],transactions:[]},today).account,'');
  assert.equal(defaults({accounts:['เงินสด','บัตร'],transactions:[{account:'บัตร',date:'2026-11-09'},{account:'เงินสด',date:'2026-11-08'}]},today).account,'บัตร');
});

test('Smoothies and Amazon drinks suggest the existing drink category', () => {
  for (const name of ['น้ำปั่น','ผลไม้ปั่น','น้ำผลไม้','สมูทตี้','โกโก้','น้ำอเมซอน','น้ำอะเมซอน','น้ำ อเมซอน','น้ำ Amazon','น้ำ ร้านอเมซอน','เครื่องดื่ม ร้านอะเมซอน']) {
    assert.equal(parse(name+' 50 บาท', categories)[0].category, 'กาแฟ/น้ำหวาน', name);
  }
  assert.equal(parse('น้ำปั่น 50 บาท หมวดอื่นๆ',categories)[0].category,'อื่นๆ');
  assert.equal(parse('น้ำปั่น 50 บาท',['อาหาร','อื่นๆ'])[0].category,'');
  assert.equal(parse('น้ำมัน 500 บาท',['BRV','กาแฟ/น้ำหวาน'])[0].category,'BRV');
  assert.equal(parse('แก้วน้ำอเมซอน 100 บาท',categories)[0].category,'');
  assert.equal(parse('ข้าว 50 บาท ร้านอเมซอน',categories)[0].category,'อาหาร');
  assert.equal(parse('น้ำปลา 30 บาท',categories)[0].category,'');
});
