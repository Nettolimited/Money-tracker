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
test('Ambiguity and unknown categories require review', () => {
  assert.equal(parse('น้ำ 20 บาท 30 บาท', categories)[0].amount, '');
  assert.equal(parse('น้ำ', categories)[0].amount, '');
  assert.equal(parse('ข้าว 60 บาท หมวดสุขภาพ', categories)[0].category, '');
  assert.equal(parse('อาหารเสริม 60 บาท หมวดอื่นๆ', categories)[0].category, 'อื่นๆ');
  assert.equal(parse('ชา 50 บาท', ['อื่นๆ'])[0].category, '');
  assert.equal(parse('ข้าว 60 บาท\nกาแฟ 40 บาท;น้ำ 10 บาท', categories).length, 3);
  assert.deepEqual(parse('', categories), []);
});
function app() {
  const writes = [];
  const context = vm.createContext({window: {_db: {ref: path => ({set: data => { writes.push({path, data}); return Promise.resolve(); }})}},
    document: {addEventListener() {}, getElementById() {return null;}},
    localStorage: {setItem() {}, getItem() {return null;}}, console, setTimeout, clearTimeout});
  vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context);
  vm.runInContext(`_appData = { transactions: [{id:'untouched', amount:7}], accounts:['เงินสด'], categories:{expense:[{name:'อาหาร'}]} }; reRenderPage=()=>{}; showToast=()=>{}; setSyncStatus=()=>{};`, context);
  return {context, writes};
}
test('Confirmed batch uses existing Firebase save once and preserves history', async () => {
  const {context, writes} = app();
  vm.runInContext(`saveVoiceExpenses([{itemName:'ข้าว',merchant:'ป้าดา',amount:60,category:'อาหาร'}, {itemName:'ขนม',merchant:'',amount:20,category:'อาหาร'}], 'เงินสด', '2026-11-09')`, context);
  assert.equal(writes.length, 1);
  assert.equal(writes[0].path, 'appData');
  const txs = Object.values(writes[0].data.transactions);
  assert.equal(txs.length, 3);
  assert.equal(txs[0].id, 'untouched');
  assert.equal(txs[1].itemName, 'ข้าว');
  assert.equal(txs[1].merchant, 'ป้าดา');
  assert.equal(txs[1].note, 'ข้าว · ร้าน ป้าดา');
  assert.equal(txs[1].type, 'expense');
  assert.notEqual(txs[1].id, txs[2].id);
});
test('Invalid batch never writes any item', () => {
  const {context, writes} = app();
  for (const amount of ['NaN', 'Infinity', '0', '-1']) {
    assert.throws(() => vm.runInContext(`saveVoiceExpenses([{itemName:'ข้าว',merchant:'',amount:60,category:'อาหาร'}, {itemName:'น้ำ',merchant:'',amount:${amount},category:'อาหาร'}], 'เงินสด','2026-11-09')`, context));
  }
  assert.throws(() => vm.runInContext(`saveVoiceExpenses([], 'เงินสด','2026-11-09')`, context));
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
  assert.throws(() => vm.runInContext(`saveVoiceExpenses([{itemName:'ข้าว',merchant:'',amount:60,category:'อาหาร'}], 'เงินสด','2026-02-31')`, context));
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
