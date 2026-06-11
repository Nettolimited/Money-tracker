// ===== VERSION =====

const APP_VERSION = '5.7';
const CHANGELOG = [
  { v: '5.7', date: '11 มิ.ย. 69', note: '🌍 เพิ่มฟีเจอร์กรอกเงินต่างประเทศและดึงเรทย้อนหลังอัตโนมัติ' },
  { v: '4.8', date: '23 พ.ค. 68', note: '📱 ของมีค่า/อุปกรณ์: คำนวณเสื่อมอัตโนมัติ, วันหมดประกัน, ร้านเคลม, หมวดหมู่' },
  { v: '4.2', date: '23 พ.ค. 68', note: '🔍 ค้นหากองทุนจากชื่อได้เลย ไม่ต้องรู้ Proj ID' },
  { v: '4.1', date: '23 พ.ค. 68', note: '📈 หุ้น US + 🥇 ทองคำ: ดึงราคา real-time จาก Yahoo Finance แปลง THB อัตโนมัติ' },
  { v: '4.0', date: '23 พ.ค. 68', note: '🤖 ดึง NAV กองทุนอัตโนมัติจาก SEC Thailand API + ปุ่ม อัพ NAV ทั้งหมด' },
  { v: '3.9', date: '23 พ.ค. 68', note: '💵 กองทุน: คำนวณมูลค่าจาก หน่วยลงทุน × NAV อัพเดท NAV ได้ตลอด' },
  { v: '3.8', date: '22 พ.ค. 68', note: '🏦 หน้าสินทรัพย์ใหม่: บ้าน/รถ/กองทุน/ของมีค่า + Net Worth (สินทรัพย์ − หนี้ผ่อน)' },
  { v: '3.7', date: '22 พ.ค. 68', note: '💳 ย้ายรายการผ่อนไปอยู่ในแท็บ ✅ ประจำ | แผนเงินเดือน: เรียงลำดับรายการได้ด้วยการลาก' },
  { v: '3.6', date: '20 พ.ค. 68', note: '💳 ผ่อน: ราคาเต็ม+ดอกเบี้ย คำนวณงวดอัตโนมัติ | แผนเงินเดือน: รวมยอดผ่อน, VAT% ในรายการ, กดแถวเพื่อแก้ไข' },
  { v: '3.5', date: '20 พ.ค. 68', note: '💰 หน้าเงินเดือน: เพิ่มรายการเองได้ + กำหนดสัดส่วนเบี้ยเลี้ยง/โบนัสเอง' },
  { v: '3.0', date: '20 พ.ค. 68', note: '✅ ประจำ: แยก section รายเดือน/รายปี, ติ๊กเก็บเงินทุกเดือน, กดจ่ายแล้วสร้างรายจ่ายอัตโนมัติ' },
  { v: '2.9', date: '20 พ.ค. 68', note: '🏦 เป้าหมาย: เพิ่ม deadline เดือน/ปี + คำนวณเฉลี่ยเก็บต่อเดือนอัตโนมัติ' },
  { v: '2.8', date: '20 พ.ค. 68', note: '⛽ น้ำมัน: กรอกระยะต่อถัง, default 95, ปั้ม dropdown พร้อมเพิ่มเองได้' },
  { v: '2.7', date: '20 พ.ค. 68', note: 'Tab bar 2 แถว + ⛽ น้ำมันเชื่อมรายจ่าย BRV อัตโนมัติ' },
  { v: '2.6', date: '20 พ.ค. 68', note: 'เพิ่มแท็บ ⛽ น้ำมัน — บันทึกการเติม, คำนวณ กม./ลิตร และ บาท/กม. อัตโนมัติ' },
  { v: '2.5', date: '20 พ.ค. 68', note: 'เพิ่มแท็บ 🏦 เป้าหมายการเก็บเงิน — ตั้งเป้า, ติดตามยอด, Progress bar' },
  { v: '2.4', date: '18 พ.ค. 68', note: 'กราฟรายวัน dual-axis แยก income/expense scale + Pie chart เรียงมากสุดก่อน + กดไปรายงาน + Swipe เปลี่ยนหน้า + Version header + ชื่อแอพแก้ได้' },
  { v: '2.3', date: '18 พ.ค. 68', note: 'บังคับเลือกวิธีชำระเงิน + เรียงตามใช้บ่อยขึ้นก่อน' },
  { v: '2.2', date: '18 พ.ค. 68', note: 'แก้บั๊ก Settings ลบ/เพิ่มไม่ทำงาน (onclick string พัง)' },
  { v: '2.1', date: '18 พ.ค. 68', note: 'เพิ่มปุ่ม ✏️ เปลี่ยนชื่อหมวดหมู่ + อัพเดทรายการเก่าทั้งหมดอัตโนมัติ' },
  { v: '2.0', date: '18 พ.ค. 68', note: 'แก้บั๊กหลัก: Firebase ไม่รับ "/" ในชื่อหมวดหมู่ (กาแฟ/น้ำหวาน) ทำให้ sync ไม่ได้มาตลอด!' },
  { v: '1.9', date: '18 พ.ค. 68', note: 'เพิ่มปุ่ม Force Pull/Push sync + แก้บั๊ก sync ช้า' },
  { v: '1.8', date: '18 พ.ค. 68', note: 'ล้างฟอร์มหลังบันทึก + toast แจ้งเตือน + scroll กลับบน' },
  { v: '1.7', date: '18 พ.ค. 68', note: 'กราฟรายวันใหญ่ขึ้น scroll ได้ แยก Layer หมวดหมู่' },
  { v: '1.6', date: '18 พ.ค. 68', note: 'เพิ่ม sync status แสดงในหัวแอพ' },
  { v: '1.5', date: '17 พ.ค. 68', note: 'เพิ่มกราฟรายวัน + ตัวเลขบนกราฟแท่ง' },
  { v: '1.4', date: '17 พ.ค. 68', note: 'ลิงก์รายการผ่อนกับธุรกรรมได้ + auto-fill จำนวนเงิน' },
  { v: '1.3', date: '16 พ.ค. 68', note: 'Quick Add template รายการประจำ' },
  { v: '1.2', date: '16 พ.ค. 68', note: 'แนบสลิปรูปภาพได้ เก็บใน Firebase Storage' },
  { v: '1.1', date: '16 พ.ค. 68', note: 'Dark Mode + ปรับ CSS ใช้ตัวแปรสีทั้งหมด' },
  { v: '1.0', date: '15 พ.ค. 68', note: 'เปิดตัว! Firebase sync, Google login, หมวดหมู่, บัญชี, ผ่อน, Fix cost' },
];

// ===== CONSTANTS =====

const DEFAULT_CATEGORIES = {
  income: [
    { name: 'เงินเดือน', emoji: '💰' },
    { name: 'เบี้ยเลี้ยง', emoji: '🎖️' },
    { name: 'โบนัส',    emoji: '🎉' },
    { name: 'ธุรกิจ',   emoji: '🏪' },
    { name: 'ลงทุน',   emoji: '📈' },
    { name: 'โอนเงินเข้า', emoji: '💸' },
    { name: 'อื่นๆ',   emoji: '✨' },
  ],
  expense: [
    { name: 'อาหาร',         emoji: '🍜' },
    { name: 'กาแฟ/น้ำหวาน', emoji: '☕' },
    { name: 'เดินทาง',       emoji: '🚗' },
    { name: 'BRV',           emoji: '⛽' },
    { name: 'Fix cost',      emoji: '🏠' },
    { name: 'Lifestyle',     emoji: '🎮' },
    { name: 'สุขภาพ',        emoji: '🏥' },
    { name: 'ของขวัญ',       emoji: '🎁' },
    { name: 'งาน',           emoji: '🔧' },
    { name: 'ของใช้',        emoji: '🛒' },
    { name: 'ประกัน',        emoji: '🛡️' },
    { name: 'เกมส์',         emoji: '🕹️' },
    { name: 'อื่นๆ',         emoji: '📦' },
  ],
};

const DEFAULT_ACCOUNTS = ['QR Code', 'เงินสด', 'KBank', 'KTC', 'TTB', 'Make', 'Krungsri NOW', 'Easy Pass', 'Spaylater', 'ShopeePay', 'SCB Easy', 'TRUE Money'];

const MONTHS_TH = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
                   'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

const PALETTE = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#98D8C8','#F7DC6F','#BB8FCE','#85C1E9','#F0A500','#A8E063'];

// ===== STORAGE =====

let _appData = null;
let _lastSaveTime = 0;
let _pendingFirebaseSave = false;

function applyDefaults(data) {
  if (!data.categories)           data.categories     = DEFAULT_CATEGORIES;
  if (!data.budgets)              data.budgets        = {};
  if (!data.installments)         data.installments   = [];
  if (!data.accounts)             data.accounts       = [...DEFAULT_ACCOUNTS];
  if (!data.fixcostItems)         data.fixcostItems   = [];
  if (!data.fixcostChecks)        data.fixcostChecks  = {};
  if (!data.cycleDay)             data.cycleDay       = 1;
  if (data.darkMode === undefined) data.darkMode      = false;
  if (!data.recurringItems)       data.recurringItems = [];
  if (!data.appName)              data.appName        = 'บัญชีส่วนตัว';
  if (!data.salaryData)           data.salaryData     = {};
  if (!data.salaryConfig)         data.salaryConfig   = { customItems: [], allowanceSplits: [], bonusSplits: [] };
  if (!data.salaryConfig.customItems)     data.salaryConfig.customItems     = [];
  if (!data.salaryConfig.allowanceSplits) data.salaryConfig.allowanceSplits = [];
  if (!data.salaryConfig.bonusSplits)     data.salaryConfig.bonusSplits     = [];
  if (!data.assets)                       data.assets                       = [];
}

function getData() {
  if (_appData) return _appData;
  try {
    const raw = localStorage.getItem('financeApp_v1');
    _appData = raw ? JSON.parse(raw) : { transactions: [] };
    applyDefaults(_appData);
    return _appData;
  } catch {
    _appData = { transactions: [] };
    applyDefaults(_appData);
    return _appData;
  }
}

function showToast(msg) {
  let el = document.getElementById('app-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = 'toast show';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.className = 'toast'; }, 2000);
}

async function forcePullFromFirebase() {
  if (!window._db) { showToast('❌ ไม่มี Firebase'); return; }
  const user = firebase.auth().currentUser;
  if (!user) { showToast('❌ ยังไม่ได้ login'); return; }
  setSyncStatus('saving');
  try {
    const snap = await window._db.ref('appData').once('value');
    if (snap.exists()) {
      _appData = fromFirebase(snap.val());
      applyDefaults(_appData);
      localStorage.setItem('financeApp_v1', JSON.stringify(_appData));
      setSyncStatus('ok');
      reRenderPage();
      showToast('✓ ดึงข้อมูลจาก Cloud แล้ว! ' + (_appData.transactions||[]).length + ' รายการ');
    } else {
      setSyncStatus('offline');
      showToast('⚠️ ไม่มีข้อมูลใน Firebase เลย!');
    }
  } catch(e) {
    setSyncStatus('offline');
    showToast('❌ ' + (e.code || e.message));
  }
}

async function forcePushToFirebase() {
  if (!window._db) { showToast('❌ ไม่มี Firebase'); return; }
  const user = firebase.auth().currentUser;
  if (!user) { showToast('❌ ยังไม่ได้ login'); return; }
  setSyncStatus('saving');
  try {
    const data = getData();
    await window._db.ref('appData').set(toFirebase(data));
    setSyncStatus('ok');
    showToast('✓ อัพข้อมูลขึ้น Cloud แล้ว! ' + (data.transactions||[]).length + ' รายการ');
  } catch(e) {
    setSyncStatus('offline');
    showToast('❌ ' + (e.code || e.message));
  }
}

function setSyncStatus(state) {
  const el = document.getElementById('sync-status');
  if (!el) return;
  if (state === 'saving') { el.textContent = '🔄 กำลัง sync...'; el.className = 'sync-status syncing'; }
  else if (state === 'ok')  { el.textContent = '☁️ sync แล้ว';    el.className = 'sync-status synced'; }
  else                      { el.textContent = '⚠️ ไม่ได้ sync';   el.className = 'sync-status offline'; }
}

// Firebase keys can't contain . # $ / [ ]
// budgets & fixcostChecks use category/item names as keys — encode before save
function _encodeKeys(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    out[encodeURIComponent(k)] = v;
  });
  return out;
}
function _decodeKeys(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    out[decodeURIComponent(k)] = v;
  });
  return out;
}
function toFirebase(data) {
  return { ...data,
    budgets:      _encodeKeys(data.budgets      || {}),
    fixcostChecks:_encodeKeys(data.fixcostChecks|| {}),
  };
}
function fromFirebase(data) {
  if (!data) return data;
  const _toArr = v => (!v ? [] : Array.isArray(v) ? v : Object.values(v));
  return { ...data,
    budgets:        _decodeKeys(data.budgets        || {}),
    fixcostChecks:  _decodeKeys(data.fixcostChecks  || {}),
    transactions:   _toArr(data.transactions),
    installments:   _toArr(data.installments),
    fixcostItems:   _toArr(data.fixcostItems),
    recurringItems: _toArr(data.recurringItems),
    annualCosts:    _toArr(data.annualCosts),
    savingsGoals:   _toArr(data.savingsGoals),
    fuelLogs:       _toArr(data.fuelLogs),
    salaryConfig:   data.salaryConfig ? {
      ...data.salaryConfig,
      customItems:     _toArr(data.salaryConfig.customItems),
      allowanceSplits: _toArr(data.salaryConfig.allowanceSplits),
      bonusSplits:     _toArr(data.salaryConfig.bonusSplits),
    } : undefined,
  };
}

function saveData(data) {
  _appData = data;
  _lastSaveTime = Date.now();
  localStorage.setItem('financeApp_v1', JSON.stringify(data));
  if (window._db) {
    _pendingFirebaseSave = true;
    setSyncStatus('saving');
    window._db.ref('appData').set(toFirebase(data))
      .then(() => { _pendingFirebaseSave = false; setSyncStatus('ok'); })
      .catch(() => { _pendingFirebaseSave = false; setSyncStatus('offline'); });
  } else {
    setSyncStatus('offline');
  }
}

function reRenderPage() {
  const p = state.page;
  if (p === 'dashboard') renderDashboard();
  else if (p === 'list') renderList();
  else if (p === 'charts') renderReports();
  else if (p === 'salary') renderSalaryPage();
  else if (p === 'settings') renderSettings();
}

// ===== DARK MODE =====

function editAppName() {
  const data = getData();
  const cur  = data.appName || 'บัญชีส่วนตัว';
  const name = prompt('ชื่อบัญชีของคุณ:', cur);
  if (name === null) return;
  const trimmed = name.trim() || cur;
  data.appName = trimmed;
  saveData(data);
  updateHeaderTitle();
}

function updateHeaderTitle() {
  const data = getData();
  const titleEl = document.getElementById('page-title');
  const verEl   = document.getElementById('header-version');
  if (titleEl) titleEl.textContent = data.appName || 'บัญชีส่วนตัว';
  if (verEl)   verEl.textContent   = 'v' + APP_VERSION;
}

function applyTheme() {
  const dark = getData().darkMode;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
}

function toggleDarkMode() {
  const data = getData();
  data.darkMode = !data.darkMode;
  saveData(data);
  applyTheme();
}

// ===== SLIP PHOTO =====

let _slipFile = null;

function pickSlip() {
  document.getElementById('slip-input').click();
}

function onSlipPicked(input) {
  if (!input.files[0]) return;
  _slipFile = input.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('slip-preview').src = e.target.result;
    document.getElementById('slip-preview-wrap').style.display = 'block';
    document.getElementById('slip-btn').style.display = 'none';
  };
  reader.readAsDataURL(_slipFile);
}

function removeSlip() {
  _slipFile = null;
  document.getElementById('slip-preview-wrap').style.display = 'none';
  document.getElementById('slip-btn').style.display = '';
  document.getElementById('slip-input').value = '';
}


async function doGoogleLogin() {
  const btn = document.getElementById('google-signin-btn');
  const msg = document.getElementById('login-msg');
  btn.disabled = true;
  msg.textContent = 'กำลังเปิด Google...';
  try {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  } catch(e) {
    msg.textContent = 'ข้อผิดพลาด: ' + (e.code || e.message);
    btn.disabled = false;
  }
}

function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}
function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-msg').textContent = '';
}

async function signIn() {
  const auth = firebase.auth();
  return new Promise(resolve => {
    const unsub = auth.onAuthStateChanged(user => {
      if (user) {
        unsub();
        showApp();
        resolve(user);
      } else {
        showLogin();
      }
    });
  });
}

async function initSync() {
  if (!window._db) return;

  // Sign in first
  try {
    await signIn();
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  } catch(e) { return; }

  setSyncStatus('saving');
  return new Promise(resolve => {
    let resolved = false;
    const done = () => { if (!resolved) { resolved = true; resolve(); } };
    setTimeout(done, 8000);

    let firstFire = true;
    window._db.ref('appData').on('value', snap => {
      if (firstFire) {
        firstFire = false;
        if (snap.exists()) {
          _appData = fromFirebase(snap.val());
          applyDefaults(_appData);
          localStorage.setItem('financeApp_v1', JSON.stringify(_appData));
          setSyncStatus('ok');
          if (resolved) reRenderPage(); // Firebase came after timeout — re-render
        } else {
          _lastSaveTime = Date.now();
          const local = getData();
          window._db.ref('appData').set(toFirebase(local))
            .then(() => setSyncStatus('ok'))
            .catch(() => setSyncStatus('offline'));
        }
        done();
        return;
      }
      if (_pendingFirebaseSave || Date.now() - _lastSaveTime < 5000) return;
      if (!snap.exists()) return;
      _appData = fromFirebase(snap.val());
      applyDefaults(_appData);
      localStorage.setItem('financeApp_v1', JSON.stringify(_appData));
      reRenderPage();
    }, () => { setSyncStatus('offline'); done(); });
  });
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// safe DOM helpers — ป้องกัน crash ถ้า element ยังไม่มีใน HTML เก่า
function _setVal(id, v)  { const el = document.getElementById(id); if (el) el.value = v ?? ''; }
function _setText(id, v) { const el = document.getElementById(id); if (el) el.textContent = v ?? ''; }
function _setDisp(id, v) { const el = document.getElementById(id); if (el) el.style.display = v; }

function getCycleDay() {
  try { return getData().cycleDay || 1; } catch { return 1; }
}

// Returns {start, end} Date objects for the billing period labelled (month, year)
// With cycleDay=25: "May 2026" = Apr 25 – May 24
function getMonthRange(month, year) {
  const day = getCycleDay();
  if (day <= 1) return {
    start: new Date(year, month, 1),
    end:   new Date(year, month + 1, 0, 23, 59, 59),
  };
  let sm = month - 1, sy = year;
  if (sm < 0) { sm = 11; sy--; }
  return {
    start: new Date(sy, sm, day),
    end:   new Date(year, month, day - 1, 23, 59, 59),
  };
}

// Which billing period is "now"?
function cycleCurrentMonth() {
  const day = getCycleDay();
  const today = new Date();
  let m = today.getMonth(), y = today.getFullYear();
  if (day > 1 && today.getDate() >= day) {
    m++; if (m > 11) { m = 0; y++; }
  }
  return { month: m, year: y };
}

// ===== STATE =====

const state = {
  page: 'dashboard',
  dashMonth:  new Date().getMonth(),
  dashYear:   new Date().getFullYear(),
  listMonth:  new Date().getMonth(),
  listYear:   new Date().getFullYear(),
  chartMonth: new Date().getMonth(),
  chartYear:  new Date().getFullYear(),
  listFilter: 'all',
  listSearch: '',
  editingId:  null,
  addType:    'expense',
  addCat:     null,
  addAccount: null,
  reportsTab: 'charts',
  editingBudgetCat: null,
  editingInstallId: null,
  addInstallId: null,
  editingGoalId: null,
  editingFuelId: null,
  _editingAnnualId: null,
  salaryTab:            'fixcost',
  salaryMonth:          new Date().getMonth(),
  salaryYear:           new Date().getFullYear(),
  _editingSalaryItemId: null,
  _editingSplitsType:   null,
};

// ===== FORMAT HELPERS =====

function fmt(n) {
  return n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(str) {
  const d = new Date(str);
  return `${d.getDate()} ${MONTHS_TH[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function monthLabel(m, y) {
  return `${MONTHS_TH[m]} ${y + 543}`;
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// ===== NAVIGATION =====

const PAGE_ORDER = ['dashboard', 'add', 'list', 'charts', 'salary', 'assets'];

function navigate(page, dir) {
  if (!dir && state.page !== page) {
    const oi = PAGE_ORDER.indexOf(state.page), ni = PAGE_ORDER.indexOf(page);
    if (oi !== -1 && ni !== -1) dir = ni > oi ? 'left' : 'right';
  }
  state.page = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active', 'slide-from-right', 'slide-from-left'));
  const newEl = document.getElementById(`page-${page}`);
  newEl.classList.add('active');
  if (dir === 'left')  newEl.classList.add('slide-from-right');
  if (dir === 'right') newEl.classList.add('slide-from-left');
  document.querySelectorAll('#bottom-nav button').forEach(b => {
    b.classList.toggle('active', b.dataset.page === page);
  });
  const isMain = ['dashboard','add','list','charts','salary','assets'].includes(page);
  const titleEl = document.getElementById('page-title');
  if (isMain) {
    titleEl.textContent = getData().appName || 'บัญชีส่วนตัว';
    titleEl.onclick = editAppName;
    titleEl.style.cursor = 'pointer';
  } else {
    titleEl.textContent = 'ตั้งค่า';
    titleEl.onclick = null;
    titleEl.style.cursor = '';
  }
  document.getElementById('settings-back').style.display = page === 'settings' ? 'flex' : 'none';
  document.getElementById('settings-btn').style.display  = page === 'settings' ? 'none' : 'flex';

  if (page !== 'assets') _stopAssetsAutoRefresh();
  if (page === 'dashboard') renderDashboard();
  if (page === 'add' && !state.editingId && state.shouldResetAddForm !== false) resetForm();
  if (page === 'list')     renderList();
  if (page === 'charts')   renderReports();
  if (page === 'salary')   renderSalaryPage();
  if (page === 'assets') { renderAssetsPage(); _startAssetsAutoRefresh(); }
  if (page === 'settings') renderSettings();
}

// ===== DASHBOARD =====

function getMonthSummary(month, year) {
  const { transactions } = getData();
  const { start, end } = getMonthRange(month, year);
  const txs = transactions.filter(t => {
    const d = new Date(t.date);
    return d >= start && d <= end;
  });
  const income  = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { income, expense, balance: income - expense, txs };
}

function getForecast(month, year) {
  const { start, end } = getMonthRange(month, year);
  const today = new Date();
  const isCurrentMonth = today >= start && today <= end;
  const totalDays  = Math.round((end - start) / 86400000) + 1;
  const daysPassed = isCurrentMonth ? Math.round((today - start) / 86400000) + 1 : totalDays;
  const { expense } = getMonthSummary(month, year);
  const dailyAvg = daysPassed > 0 ? expense / daysPassed : 0;
  const projectedExpense = isCurrentMonth ? expense + dailyAvg * (totalDays - daysPassed) : expense;
  return { dailyAvg, projectedExpense, daysPassed, daysInMonth: totalDays, isCurrentMonth };
}

function renderDashboard() {
  const { income, expense, balance, txs } = getMonthSummary(state.dashMonth, state.dashYear);
  document.getElementById('dash-month').textContent   = monthLabel(state.dashMonth, state.dashYear);
  document.getElementById('dash-income').textContent  = '฿' + fmt(income);
  document.getElementById('dash-expense').textContent = '฿' + fmt(expense);

  const balEl = document.getElementById('dash-balance');
  balEl.textContent = (balance < 0 ? '-' : '') + '฿' + fmt(Math.abs(balance));
  balEl.className   = 'summary-amount ' + (balance < 0 ? 'negative' : '');

  // Forecast
  const { dailyAvg, projectedExpense, daysPassed, daysInMonth, isCurrentMonth } = getForecast(state.dashMonth, state.dashYear);
  const forecastEl = document.getElementById('dash-forecast');
  if (isCurrentMonth) {
    forecastEl.style.display = '';
    document.getElementById('dash-daily-avg').textContent    = '฿' + Math.round(dailyAvg).toLocaleString();
    document.getElementById('dash-forecast-amt').textContent = '฿' + Math.round(projectedExpense).toLocaleString();
    document.getElementById('dash-days-passed').textContent  = `${daysPassed}/${daysInMonth}`;
  } else {
    forecastEl.style.display = 'none';
  }

  // Recent 5
  const recent = [...txs].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).slice(0, 5);
  const recentEl = document.getElementById('dash-recent');
  recentEl.innerHTML = recent.length
    ? recent.map(txHTML).join('')
    : '<div class="empty-state"><div class="emoji">📭</div><p>ยังไม่มีรายการเดือนนี้</p></div>';

  renderMiniChart(txs);
}

function renderMiniChart(txs) {
  const canvas = document.getElementById('dash-chart');
  const noMsg  = document.getElementById('dash-no-expense');
  const byCat  = {};
  txs.filter(t => t.type === 'expense').forEach(t => {
    byCat[t.category] = (byCat[t.category] || 0) + t.amount;
  });
  const sorted = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) { canvas.style.display = 'none'; noMsg.style.display = 'block'; return; }
  canvas.style.display = ''; noMsg.style.display = 'none';
  canvas.style.cursor = 'pointer';
  canvas.onclick = () => navigate('charts');
  if (window._miniChart) window._miniChart.destroy();
  window._miniChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: sorted.map(e => e[0]),
      datasets: [{ data: sorted.map(e => e[1]), backgroundColor: PALETTE, borderWidth: 0 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'right', labels: { font: { size: 11 }, boxWidth: 12, padding: 8 } }, datalabels: { display: false } }
    }
  });
}

// ===== TRANSACTION HTML =====

function getCatEmoji(type, name) {
  const { categories } = getData();
  const list = (categories[type] || DEFAULT_CATEGORIES[type]);
  const found = list.find(c => c.name === name);
  return found ? found.emoji : (type === 'income' ? '💰' : '💸');
}

function txHTML(t) {
  const emoji  = getCatEmoji(t.type, t.category);
  const parts  = [t.note, t.account].filter(Boolean);
  if (t.foreignAmount && t.foreignCurrency) {
    parts.unshift(`${t.foreignCurrency.toUpperCase()} ${fmt(t.foreignAmount)}`);
  }
  const subText = parts.length ? parts.join(' · ') : fmtDate(t.date);
  const slipBadge = t.slipUrl ? '<span class="tx-slip-badge">📎</span>' : '';
  return `
    <div class="tx-item" onclick="openEdit('${t.id}')">
      <div class="tx-icon ${t.type}">${emoji}</div>
      <div class="tx-info">
        <div class="tx-cat">${t.category}${slipBadge}</div>
        <div class="tx-sub">${subText}</div>
      </div>
      <div class="tx-amount ${t.type}">${t.type === 'income' ? '+' : '-'}฿${fmt(t.amount)}</div>
    </div>`;
}

// ===== ADD / EDIT FORM =====

function resetForm() {
  state.editingId    = null;
  state.addType      = 'expense';
  state.addCat       = null;
  state.addAccount   = null;
  state.addInstallId = null;
  document.getElementById('form-amount').value = '';
  document.getElementById('form-date').value   = todayStr();
  document.getElementById('form-note').value   = '';
  document.getElementById('foreign-currency-wrap').style.display = 'none';
  document.getElementById('foreign-currency-code').value = '';
  document.getElementById('foreign-amount').value = '';
  document.getElementById('foreign-rate').value = '';
  const statusEl = document.getElementById('foreign-status');
  if (statusEl) statusEl.textContent = '';
  document.getElementById('delete-btn').style.display = 'none';
  removeSlip();
  updateToggle();
  updateCatGrid();
  updateAccountChips();
  renderInstallDropdown();
  renderQuickChips();
  state.shouldResetAddForm = false; // ไม่ reset อีกจนกว่าจะ save
}

function updateToggle() {
  document.getElementById('toggle-expense').className = state.addType === 'expense' ? 'active expense' : '';
  document.getElementById('toggle-income').className  = state.addType === 'income'  ? 'active income'  : '';
}

function updateCatGrid() {
  const { categories, transactions } = getData();
  const cats = [...(categories[state.addType] || DEFAULT_CATEGORIES[state.addType])];
  const freq = {};
  transactions.filter(t => t.type === state.addType).forEach(t => {
    freq[t.category] = (freq[t.category] || 0) + 1;
  });
  cats.sort((a, b) => (freq[b.name] || 0) - (freq[a.name] || 0));
  document.getElementById('cat-grid').innerHTML = cats.map(c => `
    <button class="cat-btn ${state.addCat === c.name ? 'selected' : ''}" data-name="${c.name}" onclick="selectCat(this.dataset.name)">
      <span class="cat-emoji">${c.emoji}</span>
      <span>${c.name}</span>
    </button>`).join('');
}

function updateAccountChips() {
  const { accounts, transactions } = getData();
  // Count usage per account
  const freq = {};
  transactions.forEach(t => { if (t.account) freq[t.account] = (freq[t.account] || 0) + 1; });
  // Sort by frequency desc, then original order
  const sorted = [...accounts].sort((a, b) => (freq[b] || 0) - (freq[a] || 0));
  document.getElementById('account-chips').innerHTML = sorted.map(a => `
    <button class="account-chip ${state.addAccount === a ? 'selected' : ''}" data-name="${a}" onclick="selectAccount(this.dataset.name)">
      ${a}
    </button>`).join('');
}

function renderInstallDropdown() {
  const { installments } = getData();
  const active = (installments || []).filter(i => i.paidMonths < i.totalMonths);
  const sel = document.getElementById('install-link-select');
  if (!sel) return;
  const wrap = document.getElementById('install-link-wrap');
  if (!active.length) { wrap.style.display = 'none'; return; }
  wrap.style.display = '';
  sel.innerHTML = `<option value="">-- ไม่ลิงก์ผ่อน --</option>` +
    active.map(i => `<option value="${i.id}" ${state.addInstallId === i.id ? 'selected' : ''}>
      ${i.name} (งวด ${i.paidMonths+1}/${i.totalMonths})
    </option>`).join('');
}

function onInstallSelect(val) {
  state.addInstallId = val || null;
  if (!val) return;
  const inst = (getData().installments || []).find(i => i.id === val);
  if (inst && inst.amountPerMonth) {
    document.getElementById('form-amount').value = inst.amountPerMonth;
  }
}

function selectCat(name)     { state.addCat     = name; updateCatGrid(); }
function selectAccount(name) { state.addAccount = name; updateAccountChips(); }

function _safeCalc(expr) {
  const clean = String(expr).replace(/,/g,'').replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').trim();
  if (!clean || !/^[\d\s\+\-\*\/\.\(\)]+$/.test(clean)) return null;
  try {
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict";return(' + clean + ')')();
    return (typeof result === 'number' && isFinite(result) && result >= 0) ? result : null;
  } catch { return null; }
}

function _updateAmountCalc() {
  const val = document.getElementById('form-amount').value;
  const el  = document.getElementById('form-amount-result');
  if (!/[\+\-\*\/\(]/.test(val)) { el.style.display = 'none'; return; }
  const result = _safeCalc(val);
  if (result === null) { el.style.display = 'none'; return; }
  el.textContent = '= ฿' + result.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  el.style.display = 'block';
}

function _calcInsert(op) {
  const input = document.getElementById('form-amount');
  const pos   = input.selectionStart ?? input.value.length;
  input.value = input.value.slice(0, pos) + op + input.value.slice(pos);
  input.setSelectionRange(pos + 1, pos + 1);
  input.focus();
  _updateAmountCalc();
}

function _calcEval() {
  const input  = document.getElementById('form-amount');
  const result = _safeCalc(input.value);
  if (result === null) return;
  input.value = result % 1 === 0 ? result.toString() : result.toFixed(2);
  document.getElementById('form-amount-result').style.display = 'none';
  input.focus();
}

function toggleForeignCurrency() {
  const wrap = document.getElementById('foreign-currency-wrap');
  wrap.style.display = wrap.style.display === 'none' ? 'block' : 'none';
}

function _calcForeign() {
  const fAmt = parseFloat(document.getElementById('foreign-amount').value) || 0;
  const fRate = parseFloat(document.getElementById('foreign-rate').value) || 0;
  if (fAmt > 0 && fRate > 0) {
    document.getElementById('form-amount').value = (fAmt * fRate).toFixed(2);
    _updateAmountCalc();
  }
}

async function _fetchForeignRate() {
  const cur = document.getElementById('foreign-currency-code').value.trim().toUpperCase();
  const date = document.getElementById('form-date').value;
  const statusEl = document.getElementById('foreign-status');
  if (!cur) { statusEl.textContent = '❌ กรุณาใส่สกุลเงินก่อน'; return; }
  if (!date) { statusEl.textContent = '❌ กรุณาเลือกวันที่ก่อน'; return; }

  statusEl.textContent = 'กำลังดึงข้อมูลเรทเงิน...';
  try {
    const res = await fetch(`https://api.frankfurter.app/${date}?from=${cur}&to=THB`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    if (data && data.rates && data.rates.THB) {
      document.getElementById('foreign-rate').value = data.rates.THB;
      statusEl.textContent = `✅ อัพเดทเรทสำเร็จ (${date})`;
      _calcForeign();
    } else {
      statusEl.textContent = '❌ ไม่พบข้อมูลเรทเงินนี้';
    }
  } catch (e) {
    statusEl.textContent = '❌ ดึงเรทไม่สำเร็จ ลองพิมพ์เอาเอง';
  }
}

function saveTransaction() {
  const rawAmt = document.getElementById('form-amount').value.replace(/,/g, '');
  const amount  = _safeCalc(rawAmt) ?? parseFloat(rawAmt);
  const date    = document.getElementById('form-date').value;
  const note    = document.getElementById('form-note').value.trim();

  let foreignCurrency = '';
  let foreignAmount = 0;
  let foreignRate = 0;
  if (document.getElementById('foreign-currency-wrap').style.display !== 'none') {
    foreignCurrency = document.getElementById('foreign-currency-code').value.trim().toUpperCase();
    foreignAmount = parseFloat(document.getElementById('foreign-amount').value) || 0;
    foreignRate = parseFloat(document.getElementById('foreign-rate').value) || 0;
  }

  if (!amount || amount <= 0) { alert('กรุณาใส่จำนวนเงินให้ถูกต้อง'); return; }
  if (!state.addCat)          { alert('กรุณาเลือกหมวดหมู่'); return; }
  if (!state.addAccount)      { alert('กรุณาเลือกวิธีการชำระเงิน'); return; }
  if (!date)                  { alert('กรุณาเลือกวันที่'); return; }

  const slipFile = _slipFile;
  _slipFile = null;

  const data = getData();
  if (state.editingId) {
    const idx = data.transactions.findIndex(t => t.id === state.editingId);
    if (idx !== -1) {
      data.transactions[idx] = {
        ...data.transactions[idx], type: state.addType, amount, category: state.addCat,
        account: state.addAccount || '', date, note,
        foreignCurrency, foreignAmount, foreignRate
      };
      if (slipFile) _uploadSlipBackground(state.editingId, slipFile);
    }
  } else {
    const txId = genId();
    data.transactions.push({
      id: txId, type: state.addType, amount, category: state.addCat,
      account: state.addAccount || '', date, note, slipUrl: '', createdAt: Date.now(),
      foreignCurrency, foreignAmount, foreignRate
    });
    if (slipFile) _uploadSlipBackground(txId, slipFile);
  }

  if (state.addInstallId) {
    const iIdx = data.installments.findIndex(i => i.id === state.addInstallId);
    if (iIdx !== -1 && data.installments[iIdx].paidMonths < data.installments[iIdx].totalMonths) {
      data.installments[iIdx].paidMonths++;
    }
  }

  saveData(data);
  state.editingId    = null;
  state.addInstallId = null;
  state.shouldResetAddForm = true; // บันทึกแล้ว → ครั้งถัดไปที่ navigate มา ให้ reset
  removeSlip();
  navigate('add');
  document.getElementById('main').scrollTop = 0;
  window.scrollTo(0, 0);
  showToast('✓ บันทึกแล้ว!');
}

async function _uploadSlipBackground(txId, file) {
  try {
    const uid = (firebase.auth().currentUser || {}).uid || 'anon';
    const ref = firebase.storage().ref(`slips/${uid}/${txId}`);
    const t15 = new Promise((_, r) => setTimeout(() => r('timeout'), 15000));
    await Promise.race([ref.put(file), t15]);
    const url = await Promise.race([ref.getDownloadURL(), new Promise((_, r) => setTimeout(() => r('timeout'), 5000))]);
    if (typeof url !== 'string') return;
    const d = getData();
    const tx = d.transactions.find(t => t.id === txId);
    if (tx) { tx.slipUrl = url; saveData(d); }
  } catch(e) {}
}

function openEdit(id) {
  const data = getData();
  const t = data.transactions.find(tx => tx.id === id);
  if (!t) return;
  state.editingId  = id;
  state.addType    = t.type;
  state.addCat     = t.category;
  state.addAccount = t.account || null;
  document.getElementById('form-amount').value = t.amount;
  document.getElementById('form-date').value   = t.date;
  document.getElementById('form-note').value   = t.note || '';
  
  if (t.foreignAmount && t.foreignCurrency) {
    document.getElementById('foreign-currency-wrap').style.display = 'block';
    document.getElementById('foreign-currency-code').value = t.foreignCurrency;
    document.getElementById('foreign-amount').value = t.foreignAmount;
    document.getElementById('foreign-rate').value = t.foreignRate || '';
    const statusEl = document.getElementById('foreign-status');
    if (statusEl) statusEl.textContent = '';
  } else {
    document.getElementById('foreign-currency-wrap').style.display = 'none';
    document.getElementById('foreign-currency-code').value = '';
    document.getElementById('foreign-amount').value = '';
    document.getElementById('foreign-rate').value = '';
    const statusEl = document.getElementById('foreign-status');
    if (statusEl) statusEl.textContent = '';
  }

  document.getElementById('delete-btn').style.display = 'block';
  removeSlip();
  if (t.slipUrl) {
    document.getElementById('slip-preview').src = t.slipUrl;
    document.getElementById('slip-preview-wrap').style.display = 'block';
    document.getElementById('slip-btn').style.display = 'none';
  }
  updateToggle();
  updateCatGrid();
  updateAccountChips();
  navigate('add');
}

function deleteTransaction() {
  if (!state.editingId) return;
  if (!confirm('ลบรายการนี้?')) return;
  const data = getData();
  data.transactions = data.transactions.filter(t => t.id !== state.editingId);
  saveData(data);
  state.editingId = null;
  navigate('dashboard');
}

// ===== LIST PAGE =====

function renderList() {
  document.getElementById('list-month').textContent = monthLabel(state.listMonth, state.listYear);
  const { transactions } = getData();
  const { start: ls, end: le } = getMonthRange(state.listMonth, state.listYear);
  let txs = transactions.filter(t => {
    const d = new Date(t.date);
    return d >= ls && d <= le;
  });
  if (state.listFilter !== 'all') txs = txs.filter(t => t.type === state.listFilter);
  if (state.listSearch) {
    const q = state.listSearch.toLowerCase();
    txs = txs.filter(t =>
      t.category.toLowerCase().includes(q) ||
      (t.note    || '').toLowerCase().includes(q) ||
      (t.account || '').toLowerCase().includes(q)
    );
  }
  txs.sort((a, b) => new Date(b.date) - new Date(a.date));

  const container = document.getElementById('list-container');
  if (!txs.length) {
    container.innerHTML = '<div class="empty-state"><div class="emoji">📭</div><p>ไม่มีรายการ</p></div>';
    return;
  }
  const groups = {};
  txs.forEach(t => { (groups[t.date] = groups[t.date] || []).push(t); });
  container.innerHTML = Object.entries(groups)
    .sort(([a], [b]) => new Date(b) - new Date(a))
    .map(([date, items]) => `
      <div class="date-group-header">${fmtDate(date)}</div>
      ${items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).map(txHTML).join('')}
    `).join('');
}

// ===== REPORTS PAGE =====

function renderReports() {
  document.getElementById('chart-month').textContent = monthLabel(state.chartMonth, state.chartYear);
  switchReportsTab(state.reportsTab);
}

function switchReportsTab(tab) {
  state.reportsTab = tab;
  document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  ['charts','budget','fuel'].forEach(id => {
    document.getElementById(`tab-${id}`).style.display = id === tab ? 'block' : 'none';
  });
  if (tab === 'charts') { requestAnimationFrame(() => { renderBarChart(); renderDailyChart(); renderPieChart(); }); }
  if (tab === 'budget') renderBudget();
  if (tab === 'fuel')   renderFuelTab();
}

// ===== SALARY PLANNER =====

function _calcAllocation() {
  const data = getData();
  const fixedMonthly = (data.fixcostItems || []).reduce((s, i) => s + (i.amount || 0), 0);
  const annualMonthly = (data.annualCosts || []).reduce((s, item) => {
    const remaining = Math.max(0, item.yearlyAmount - (item.savedAmount || 0));
    const mLeft = _monthsUntilPay(item.payMonth);
    return s + ((remaining > 0 && mLeft > 0) ? Math.ceil(remaining / mLeft) : 0);
  }, 0);
  const goalsMonthly = (data.savingsGoals || []).reduce((s, goal) => {
    const mLeft = _goalMonthsLeft(goal.deadlineMonth, goal.deadlineYear);
    const remaining = Math.max(0, (goal.targetAmount || 0) - (goal.savedAmount || 0));
    return s + ((mLeft && remaining > 0) ? Math.ceil(remaining / mLeft) : 0);
  }, 0);
  const installMonthly = (data.installments || [])
    .filter(i => i.paidMonths < i.totalMonths && !i.prepaid)
    .reduce((s, i) => s + (i.amountPerMonth || 0), 0);
  return { fixedMonthly, annualMonthly, goalsMonthly, installMonthly };
}

function _getCurrentSalaryEntry() {
  const key = `${state.salaryYear}-${String(state.salaryMonth + 1).padStart(2,'0')}`;
  return (getData().salaryData || {})[key] || {};
}

function _renderSalaryAllocation(entry) {
  const salary    = entry.salary    || 0;
  const allowance = entry.allowance || 0;
  const bonus     = entry.bonus     || 0;
  const summaryEl = document.getElementById('salary-summary');
  const allocEl   = document.getElementById('salary-allocation');
  const allocCard = document.getElementById('salary-allocation-card');
  const hideExtras = () => {
    ['salary-allowance-card','salary-bonus-card'].forEach(id => {
      const el = document.getElementById(id); if (el) el.style.display = 'none';
    });
  };

  if (!salary && !allowance && !bonus) {
    summaryEl.innerHTML = '';
    allocCard.style.display = 'none';
    hideExtras();
    return;
  }

  // Summary line
  let sumHtml = '';
  if (salary)    sumHtml += `<span style="font-size:12px;color:#9E9E9E;margin-right:8px">เงินเดือน ฿${salary.toLocaleString()}</span>`;
  if (allowance) sumHtml += `<span style="font-size:12px;color:#9E9E9E;margin-right:8px">เบี้ยเลี้ยง ฿${allowance.toLocaleString()}</span>`;
  if (bonus)     sumHtml += `<span style="font-size:12px;color:#9E9E9E">โบนัส ฿${bonus.toLocaleString()}</span>`;
  summaryEl.innerHTML = sumHtml;

  // Salary allocation (auto + custom)
  const cfg = getData().salaryConfig || {};
  const customItems = cfg.customItems || [];
  const { fixedMonthly, annualMonthly, goalsMonthly, installMonthly } = _calcAllocation();
  const customTotal = customItems.reduce((s, i) => {
    const vat = i.vat || 0;
    return s + Math.round((i.amount || 0) * (1 + vat / 100));
  }, 0);
  const leftover = salary - fixedMonthly - annualMonthly - goalsMonthly - installMonthly - customTotal;

  const row = (icon, label, amount, clickable = false, id = '') =>
    `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)${clickable ? ';cursor:pointer' : ''}" ${clickable ? `onclick="openSalaryCustomItemModal('${id}')"` : ''}>
      <span style="font-size:14px">${icon} ${label}</span>
      <span style="font-weight:700">฿${amount.toLocaleString()}</span>
    </div>`;

  let allocHtml = '';
  if (fixedMonthly  > 0) allocHtml += row('💸', 'ประจำรายเดือน', fixedMonthly);
  if (annualMonthly > 0) allocHtml += row('📅', 'เก็บรายปี', annualMonthly);
  if (goalsMonthly  > 0) allocHtml += row('🎯', 'เป้าหมาย', goalsMonthly);
  if (installMonthly > 0) allocHtml += row('💳', 'ผ่อนชำระ', installMonthly);

  customItems.forEach(item => {
    const vat = item.vat || 0;
    const effectiveAmt = Math.round((item.amount || 0) * (1 + vat / 100));
    const vatLabel = vat > 0 ? ` <span style="font-size:11px;color:#9E9E9E">+VAT ${vat}%</span>` : '';
    allocHtml += `<div draggable="true"
      ondragstart="_salaryItemDragStart('${item.id}')"
      ondragover="event.preventDefault()"
      ondrop="event.preventDefault();_salaryItemDrop('${item.id}')"
      onclick="openSalaryCustomItemModal('${item.id}')"
      style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer">
      <span style="font-size:14px;display:flex;align-items:center;gap:6px">
        <span style="color:#bbb;font-size:18px;cursor:grab;line-height:1" onclick="event.stopPropagation()">⠿</span>
        📌 ${item.name}${vatLabel}
      </span>
      <span style="font-weight:700">฿${effectiveAmt.toLocaleString()}</span>
    </div>`;
  });

  allocHtml += `<div style="text-align:right;padding:6px 0">
    <button onclick="openSalaryCustomItemModal()" class="btn-secondary" style="font-size:12px;padding:5px 12px">+ เพิ่มรายการ</button>
  </div>`;
  allocHtml += `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0 2px;margin-top:2px">
    <span style="font-size:15px;font-weight:700">${leftover >= 0 ? '🟢' : '🔴'} เหลือใช้จ่ายได้</span>
    <span style="font-size:20px;font-weight:800;color:${leftover >= 0 ? '#2ecc71' : '#e74c3c'}">฿${leftover.toLocaleString()}</span>
  </div>`;

  allocEl.innerHTML = allocHtml;
  allocCard.style.display = salary ? 'block' : 'none';

  // Allowance & bonus cards
  _renderExtraIncomeCard('allowance', allowance, cfg.allowanceSplits || []);
  _renderExtraIncomeCard('bonus',     bonus,     cfg.bonusSplits     || []);
}

function _renderExtraIncomeCard(type, amount, splits) {
  const card = document.getElementById(`salary-${type}-card`);
  if (!card) return;
  if (!amount) { card.style.display = 'none'; return; }
  const titleMap = { allowance: '💼 เบี้ยเลี้ยง', bonus: '🎁 โบนัส' };
  const totalPct  = splits.reduce((s, sp) => s + (sp.pct || 0), 0);
  let html = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
    <div>
      <div class="section-title" style="margin:0">${titleMap[type]}</div>
      <div style="font-size:15px;font-weight:800;color:var(--primary)">฿${amount.toLocaleString()}</div>
    </div>
    <button onclick="openSplitsModal('${type}')" class="setting-del">✏️</button>
  </div>`;
  if (!splits.length) {
    html += `<div style="text-align:center;color:#9E9E9E;font-size:13px;padding:8px 0">กดปุ่ม ✏️ เพื่อตั้งสัดส่วน</div>`;
  } else {
    splits.forEach(sp => {
      const amt = Math.round(amount * (sp.pct || 0) / 100);
      html += `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:14px">${sp.name} <span style="font-size:11px;color:#9E9E9E">${sp.pct}%</span></span>
        <span style="font-weight:700">฿${amt.toLocaleString()}</span>
      </div>`;
    });
    if (totalPct < 100) {
      const unalloc = Math.round(amount * (100 - totalPct) / 100);
      html += `<div style="display:flex;justify-content:space-between;padding:6px 0;color:#9E9E9E;font-size:13px">
        <span>ยังไม่ได้จัดสรร (${100 - totalPct}%)</span><span>฿${unalloc.toLocaleString()}</span>
      </div>`;
    }
  }
  card.innerHTML = html;
  card.style.display = 'block';
}

// -- Custom salary items --
let _dragSalaryItemId = null;

function _salaryItemDragStart(id) {
  _dragSalaryItemId = id;
}

function _salaryItemDrop(targetId) {
  if (!_dragSalaryItemId || _dragSalaryItemId === targetId) return;
  const data = getData();
  const items = data.salaryConfig.customItems;
  const fromIdx = items.findIndex(i => i.id === _dragSalaryItemId);
  const toIdx   = items.findIndex(i => i.id === targetId);
  if (fromIdx === -1 || toIdx === -1) return;
  const [moved] = items.splice(fromIdx, 1);
  items.splice(toIdx, 0, moved);
  saveData(data);
  _renderSalaryAllocation(_getCurrentSalaryEntry());
  _dragSalaryItemId = null;
}

function openSalaryCustomItemModal(id) {
  state._editingSalaryItemId = id || null;
  if (id) {
    const item = (getData().salaryConfig.customItems || []).find(i => i.id === id);
    if (item) {
      document.getElementById('salary-item-name').value   = item.name;
      document.getElementById('salary-item-amount').value = item.amount;
      document.getElementById('salary-item-vat').value    = item.vat || '';
    }
    document.getElementById('modal-salary-item-title').textContent = 'แก้ไขรายการ';
    document.getElementById('delete-salary-item-btn').style.display = 'block';
  } else {
    document.getElementById('salary-item-name').value   = '';
    document.getElementById('salary-item-amount').value = '';
    document.getElementById('salary-item-vat').value    = '';
    document.getElementById('modal-salary-item-title').textContent = 'เพิ่มรายการ';
    document.getElementById('delete-salary-item-btn').style.display = 'none';
  }
  openModal('modal-salary-item');
}

function saveSalaryCustomItem() {
  const name   = document.getElementById('salary-item-name').value.trim();
  const amount = parseFloat(document.getElementById('salary-item-amount').value.replace(/,/g,'')) || 0;
  const vat    = parseFloat(document.getElementById('salary-item-vat').value) || 0;
  if (!name || amount <= 0) { alert('กรุณากรอกชื่อและจำนวน'); return; }
  const data = getData();
  const cfg  = data.salaryConfig;
  if (state._editingSalaryItemId) {
    const idx = cfg.customItems.findIndex(i => i.id === state._editingSalaryItemId);
    if (idx !== -1) cfg.customItems[idx] = { ...cfg.customItems[idx], name, amount, vat };
  } else {
    cfg.customItems.push({ id: genId(), name, amount, vat });
  }
  saveData(data);
  closeModal('modal-salary-item');
  _renderSalaryAllocation(_getCurrentSalaryEntry());
}

function deleteSalaryCustomItem() {
  if (!state._editingSalaryItemId) return;
  const data = getData();
  data.salaryConfig.customItems = data.salaryConfig.customItems.filter(i => i.id !== state._editingSalaryItemId);
  saveData(data);
  closeModal('modal-salary-item');
  _renderSalaryAllocation(_getCurrentSalaryEntry());
}

// -- Splits modal --
function openSplitsModal(type) {
  state._editingSplitsType = type;
  document.getElementById('modal-splits-title').textContent = `✏️ สัดส่วน${type === 'allowance' ? 'เบี้ยเลี้ยง' : 'โบนัส'}`;
  document.getElementById('split-name').value = '';
  document.getElementById('split-pct').value  = '';
  _renderSplitsList();
  openModal('modal-splits');
}

function _renderSplitsList() {
  const type   = state._editingSplitsType;
  const key    = type === 'allowance' ? 'allowanceSplits' : 'bonusSplits';
  const splits = (getData().salaryConfig || {})[key] || [];
  const total  = splits.reduce((s, sp) => s + (sp.pct || 0), 0);
  document.getElementById('splits-list').innerHTML = splits.length
    ? splits.map(sp => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:14px">${sp.name} — <b>${sp.pct}%</b></span>
          <button onclick="deleteSplitItem('${sp.id}')" style="background:none;border:none;color:#e74c3c;font-size:18px;cursor:pointer;padding:0 4px">✕</button>
        </div>`).join('')
    : `<div style="color:#9E9E9E;font-size:13px;text-align:center;padding:8px">ยังไม่มีสัดส่วน</div>`;
  document.getElementById('splits-total').innerHTML =
    `รวม: <b style="color:${total === 100 ? '#2ecc71' : (total > 100 ? '#e74c3c' : '#FF6F00')}">${total}%</b> ${total === 100 ? '✓' : total > 100 ? '⚠️ เกิน!' : `(เหลือ ${100-total}%)`}`;
}

function addSplitItem() {
  const name = document.getElementById('split-name').value.trim();
  const pct  = parseInt(document.getElementById('split-pct').value) || 0;
  if (!name || pct <= 0 || pct > 100) { alert('กรุณากรอกชื่อและ % ที่ถูกต้อง'); return; }
  const type = state._editingSplitsType;
  const data = getData();
  const key  = type === 'allowance' ? 'allowanceSplits' : 'bonusSplits';
  data.salaryConfig[key].push({ id: genId(), name, pct });
  saveData(data);
  document.getElementById('split-name').value = '';
  document.getElementById('split-pct').value  = '';
  _renderSplitsList();
  _renderExtraIncomeCard(type, _getCurrentSalaryEntry()[type === 'allowance' ? 'allowance' : 'bonus'] || 0, data.salaryConfig[key]);
}

function deleteSplitItem(id) {
  const type = state._editingSplitsType;
  const data = getData();
  const key  = type === 'allowance' ? 'allowanceSplits' : 'bonusSplits';
  data.salaryConfig[key] = data.salaryConfig[key].filter(sp => sp.id !== id);
  saveData(data);
  _renderSplitsList();
  _renderExtraIncomeCard(type, _getCurrentSalaryEntry()[type === 'allowance' ? 'allowance' : 'bonus'] || 0, data.salaryConfig[key]);
}

function renderSalaryPage() {
  document.getElementById('salary-month-label').textContent = monthLabel(state.salaryMonth, state.salaryYear);
  const key   = `${state.salaryYear}-${String(state.salaryMonth + 1).padStart(2,'0')}`;
  const entry = (getData().salaryData || {})[key] || {};
  document.getElementById('salary-base').value  = entry.salary    || '';
  document.getElementById('salary-allow').value = entry.allowance || '';
  document.getElementById('salary-bonus').value = entry.bonus     || '';
  _renderSalaryAllocation(entry);
  switchSalaryTab(state.salaryTab || 'fixcost');
}

function saveSalaryEntry() {
  const salary    = parseFloat(document.getElementById('salary-base').value.replace(/,/g,''))  || 0;
  const allowance = parseFloat(document.getElementById('salary-allow').value.replace(/,/g,'')) || 0;
  const bonus     = parseFloat(document.getElementById('salary-bonus').value.replace(/,/g,'')) || 0;
  const key  = `${state.salaryYear}-${String(state.salaryMonth + 1).padStart(2,'0')}`;
  const data = getData();
  if (!data.salaryData) data.salaryData = {};
  data.salaryData[key] = { salary, allowance, bonus };
  saveData(data);
  _renderSalaryAllocation({ salary, allowance, bonus });
  showToast('บันทึกรายได้แล้ว ✅');
}

function switchSalaryTab(tab) {
  state.salaryTab = tab;
  document.querySelectorAll('[data-stab]').forEach(b => b.classList.toggle('active', b.dataset.stab === tab));
  ['fixcost', 'goals'].forEach(id => {
    const el = document.getElementById(`stab-${id}`);
    if (el) el.style.display = id === tab ? 'block' : 'none';
  });
  if (tab === 'fixcost') { renderFixcostChecklist(); renderInstalls(); renderAnnualSection(); }
  if (tab === 'goals')   renderGoalsTab();
}

// ---- Charts ----

function _shortNum(v) {
  if (v === 0) return '';
  if (v >= 1000) return (v/1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return v.toFixed(0);
}

function renderBarChart() {
  if (window.ChartDataLabels) Chart.register(window.ChartDataLabels);
  const canvas = document.getElementById('bar-chart');
  const { transactions } = getData();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    let m = state.chartMonth - i, y = state.chartYear;
    while (m < 0) { m += 12; y--; }
    months.push({ m, y });
  }
  const sum = (type, m, y) => {
    const { start, end } = getMonthRange(m, y);
    return transactions
      .filter(t => { const d = new Date(t.date); return t.type === type && d >= start && d <= end; })
      .reduce((s, t) => s + t.amount, 0);
  };

  if (window._barChart) window._barChart.destroy();
  window._barChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: months.map(({ m }) => MONTHS_TH[m].slice(0, 3)),
      datasets: [
        { label: 'รายรับ',  data: months.map(({ m, y }) => sum('income',  m, y)), backgroundColor: '#00C853AA', borderColor: '#00C853', borderWidth: 1, borderRadius: 4 },
        { label: 'รายจ่าย', data: months.map(({ m, y }) => sum('expense', m, y)), backgroundColor: '#FF1744AA', borderColor: '#FF1744', borderWidth: 1, borderRadius: 4 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        datalabels: {
          anchor: 'end', align: 'end', offset: -2,
          font: { size: 9, weight: '700' },
          color: '#555',
          formatter: _shortNum
        }
      },
      scales: { y: { beginAtZero: true, ticks: { callback: v => '฿' + v.toLocaleString() } } },
      layout: { padding: { top: 18 } }
    }
  });
}

function renderDailyChart() {
  const canvas = document.getElementById('daily-chart');
  const noMsg  = document.getElementById('no-daily-msg');
  const wrap   = document.getElementById('daily-chart-wrap');
  const { transactions, categories } = getData();
  const { start, end } = getMonthRange(state.chartMonth, state.chartYear);
  const txs = transactions.filter(t => { const d = new Date(t.date); return d >= start && d <= end; });

  if (!txs.length) {
    canvas.style.display = 'none'; noMsg.style.display = 'block';
    if (window._dailyChart) { window._dailyChart.destroy(); window._dailyChart = null; }
    return;
  }
  canvas.style.display = ''; noMsg.style.display = 'none';

  // Collect all expense categories that appear this month
  const expCats = [...new Set(txs.filter(t => t.type === 'expense').map(t => t.category))];

  // Build per-day totals
  const allDays = [...new Set(txs.map(t => parseInt(t.date.split('-')[2])))].sort((a,b) => a-b);
  const byDayInc = {};
  const byDayCat = {}; // byDayCat[cat][day]
  expCats.forEach(c => { byDayCat[c] = {}; });
  txs.forEach(t => {
    const day = parseInt(t.date.split('-')[2]);
    if (t.type === 'income') {
      byDayInc[day] = (byDayInc[day] || 0) + t.amount;
    } else {
      if (!byDayCat[t.category]) byDayCat[t.category] = {};
      byDayCat[t.category][day] = (byDayCat[t.category][day] || 0) + t.amount;
    }
  });

  // Dynamic width: 44px per day, min fills container
  const scrollEl = document.getElementById('daily-chart-scroll');
  const minW = (scrollEl.clientWidth > 0 ? scrollEl.clientWidth : scrollEl.offsetWidth) || window.innerWidth || 320;
  const calcW = Math.max(minW, allDays.length * 44 + 60);
  wrap.style.width = calcW + 'px';

  // Build datasets — income uses RIGHT axis, expense uses LEFT axis
  const datasets = [];
  datasets.push({
    label: 'รายรับ',
    data: allDays.map(d => byDayInc[d] || 0),
    backgroundColor: '#00C85344',
    borderColor: '#00C853',
    borderWidth: 1.5,
    borderRadius: 3,
    stack: 'income',
    yAxisID: 'yIncome',
    order: 0,
  });
  expCats.forEach((cat, i) => {
    datasets.push({
      label: cat,
      data: allDays.map(d => byDayCat[cat][d] || 0),
      backgroundColor: PALETTE[i % PALETTE.length] + 'CC',
      borderColor:     PALETTE[i % PALETTE.length],
      borderWidth: 1,
      borderRadius: i === expCats.length - 1 ? 3 : 0,
      stack: 'expense',
      yAxisID: 'yExp',
      order: 1,
    });
  });

  if (window._dailyChart) window._dailyChart.destroy();
  window._dailyChart = new Chart(canvas, {
    type: 'bar',
    data: { labels: allDays.map(d => d + ''), datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 12, padding: 8 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ฿${ctx.parsed.y.toLocaleString()}` } },
        datalabels: { display: false }
      },
      scales: {
        x: { ticks: { font: { size: 11 } } },
        yExp: {
          type: 'linear', position: 'left', beginAtZero: true,
          ticks: { callback: v => _shortNum(v) || '0', font: { size: 10 }, color: '#FF1744' },
          grid: { color: 'rgba(0,0,0,.06)' },
          title: { display: true, text: 'รายจ่าย', color: '#FF1744', font: { size: 10 } }
        },
        yIncome: {
          type: 'linear', position: 'right', beginAtZero: true,
          ticks: { callback: v => _shortNum(v) || '0', font: { size: 10 }, color: '#00C853' },
          grid: { drawOnChartArea: false },
          title: { display: true, text: 'รายรับ', color: '#00C853', font: { size: 10 } }
        }
      },
      layout: { padding: { top: 8, bottom: 4 } }
    }
  });
}

function renderPieChart() {
  const canvas = document.getElementById('pie-chart');
  const noMsg  = document.getElementById('no-expense-msg');
  const { transactions } = getData();
  const byCat = {};
  const { start: ps, end: pe } = getMonthRange(state.chartMonth, state.chartYear);
  transactions
    .filter(t => { const d = new Date(t.date); return t.type === 'expense' && d >= ps && d <= pe; })
    .forEach(t => { byCat[t.category] = (byCat[t.category] || 0) + t.amount; });
  const labels = Object.keys(byCat);
  if (!labels.length) { canvas.style.display = 'none'; noMsg.style.display = 'block'; return; }
  canvas.style.display = ''; noMsg.style.display = 'none';
  if (window._pieChart) window._pieChart.destroy();
  window._pieChart = new Chart(canvas, {
    type: 'doughnut',
    data: { labels, datasets: [{ data: labels.map(l => byCat[l]), backgroundColor: PALETTE, borderWidth: 0 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 12 }, boxWidth: 14, padding: 10 } },
        datalabels: { display: false }
      }
    }
  });
}

// ---- Budget ----

function renderBudget() {
  const { budgets, categories } = getData();
  const { txs } = getMonthSummary(state.chartMonth, state.chartYear);
  const catSpend = {};
  txs.filter(t => t.type === 'expense').forEach(t => {
    catSpend[t.category] = (catSpend[t.category] || 0) + t.amount;
  });
  const expCats = (categories.expense || DEFAULT_CATEGORIES.expense);
  document.getElementById('budget-container').innerHTML = expCats.map(cat => {
    const budget = budgets[cat.name] || 0;
    const spent  = catSpend[cat.name] || 0;
    const pct    = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
    const barColor = pct >= 100 ? '#FF1744' : pct >= 80 ? '#FF9800' : '#00C853';
    return `
      <div class="budget-item" onclick="openBudgetEdit('${cat.name}', ${budget})">
        <div class="budget-header">
          <span class="budget-name">${cat.emoji} ${cat.name}</span>
          <button class="budget-set-btn">${budget > 0 ? '฿' + budget.toLocaleString() : 'ตั้งงบ'}</button>
        </div>
        <div class="budget-meta">
          <span>ใช้ไป ฿${fmt(spent)}</span>
          ${budget > 0 ? `<span style="color:${barColor};font-weight:700">${pct}%</span>` : ''}
        </div>
        ${budget > 0 ? `
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%;background:${barColor}"></div>
          </div>` : ''}
      </div>`;
  }).join('');
}

function openBudgetEdit(catName, current) {
  state.editingBudgetCat = catName;
  document.getElementById('modal-budget-title').textContent = `งบประมาณ: ${catName}`;
  document.getElementById('modal-budget-input').value = current || '';
  openModal('modal-budget');
}

function saveBudget() {
  const val = parseFloat(document.getElementById('modal-budget-input').value.replace(/,/g, ''));
  if (isNaN(val) || val < 0) { alert('กรุณาใส่ตัวเลข'); return; }
  const data = getData();
  if (!data.budgets) data.budgets = {};
  if (val === 0) delete data.budgets[state.editingBudgetCat];
  else           data.budgets[state.editingBudgetCat] = val;
  saveData(data);
  closeModal('modal-budget');
  renderBudget();
}

// ---- Installments ----

function renderInstalls() {
  const { installments } = getData();
  const container = document.getElementById('install-container');
  if (!installments.length) {
    container.innerHTML = '<div class="empty-state"><div class="emoji">💳</div><p>ยังไม่มีรายการผ่อน<br>กด "+ เพิ่มรายการผ่อน" ด้านล่าง</p></div>';
    return;
  }
  const activeInstalls  = installments.filter(i => i.paidMonths < i.totalMonths);
  const monthlyTotal    = activeInstalls.reduce((s, i) => s + i.amountPerMonth, 0);
  const unpreparedTotal = activeInstalls.filter(i => !i.prepaid).reduce((s, i) => s + i.amountPerMonth, 0);
  const preparedCount   = activeInstalls.filter(i => i.prepaid).length;
  container.innerHTML   = `
    <div class="install-summary">
      ผ่อนรวม/เดือน <strong>฿${fmt(monthlyTotal)}</strong>
      ${preparedCount ? `<span style="font-size:12px;color:#2ecc71;margin-left:8px">💰 เตรียมแล้ว ${preparedCount} รายการ · คงเหลือในแผน ฿${fmt(unpreparedTotal)}</span>` : ''}
    </div>
    ${installments.map(inst => {
      const remaining      = Math.max(0, inst.totalMonths - inst.paidMonths);
      const totalRemaining = remaining * inst.amountPerMonth;
      const pct            = Math.round((inst.paidMonths / inst.totalMonths) * 100);
      const done           = remaining === 0;
      const prepaid        = !!inst.prepaid;
      const reserve        = inst.reserve || 0;
      const reservePct     = totalRemaining > 0 ? Math.min(100, Math.round(reserve / totalRemaining * 100)) : 0;
      return `
        <div class="install-card${prepaid ? ' install-prepaid' : ''}" onclick="openInstallEdit('${inst.id}')">
          <div class="install-header">
            <span class="install-name">${inst.name}</span>
            <span class="install-monthly ${done ? 'install-done' : ''}">
              ${done ? '✅ ชำระหมดแล้ว' : '฿' + fmt(inst.amountPerMonth) + '/เดือน'}
            </span>
          </div>
          <div class="install-progress">
            <div class="progress-track">
              <div class="progress-fill" style="width:${pct}%;background:${done ? '#00C853' : '#6C63FF'}"></div>
            </div>
          </div>
          <div class="install-meta">
            <span>${inst.paidMonths}/${inst.totalMonths} งวด (${pct}%)</span>
            ${done ? '<span class="install-done">เสร็จสิ้น 🎉</span>' : `<span style="color:#FF1744">เหลือ ฿${fmt(totalRemaining)} (${remaining} งวด)</span>`}
          </div>
          ${!done && reserve > 0 ? `
          <div style="margin-top:6px">
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#9E9E9E;margin-bottom:3px">
              <span>💰 เก็บเผื่อแล้ว ฿${fmt(reserve)}</span>
              <span style="color:${reserve >= totalRemaining ? '#2ecc71' : '#9E9E9E'}">${reservePct}%${reserve >= totalRemaining ? ' ✅ ครบ!' : ''}</span>
            </div>
            <div style="height:4px;background:var(--border);border-radius:2px">
              <div style="height:4px;width:${reservePct}%;background:#2ecc71;border-radius:2px;transition:width .3s"></div>
            </div>
          </div>` : ''}
          ${inst.fullPrice ? `<div class="install-account" style="color:#9E9E9E">ราคาเต็ม ฿${fmt(inst.fullPrice)}${inst.interestRate ? ` +${inst.interestRate}% ดอกเบี้ย` : ''}</div>` : ''}
          ${inst.account ? `<div class="install-account">${inst.account}</div>` : ''}
          ${!done ? `<div onclick="event.stopPropagation();toggleInstallPrepaid('${inst.id}')" class="install-prepaid-btn${prepaid ? ' active' : ''}">
            ${prepaid ? '💰 เตรียมเงินแล้ว · ไม่นับในแผน' : '☐ เตรียมเงินแล้ว'}
          </div>` : ''}
        </div>`;
    }).join('')}`;
}

function toggleInstallPrepaid(id) {
  const data = getData();
  const inst = data.installments.find(i => i.id === id);
  if (!inst) return;
  inst.prepaid = !inst.prepaid;
  saveData(data);
  renderInstalls();
  // re-render salary allocation if on salary page
  if (state.page === 'salary') _renderSalaryAllocation(_getCurrentSalaryEntry());
}

function _updateInstallCalc() {
  const fullPrice = parseFloat((document.getElementById('install-full-price').value || '').replace(/,/g,''));
  const months    = parseInt(document.getElementById('install-total').value);
  const rate      = parseFloat(document.getElementById('install-rate').value) || 0;
  const hint      = document.getElementById('install-calc-hint');
  if (fullPrice > 0 && months > 0) {
    const totalWithInterest = fullPrice * (1 + rate / 100);
    const monthly = Math.ceil(totalWithInterest / months);
    document.getElementById('install-amount').value = monthly;
    const rateText = rate > 0 ? ` (+${rate}% ดอกเบี้ย = ฿${Math.round(fullPrice * rate / 100).toLocaleString()})` : '';
    hint.textContent = `คำนวณ: ฿${fullPrice.toLocaleString()}${rateText} ÷ ${months} งวด = ฿${monthly.toLocaleString()}/งวด`;
    hint.style.display = 'block';
  } else {
    hint.style.display = 'none';
  }
}

function openInstallAdd() {
  state.editingInstallId = null;
  document.getElementById('modal-install-title').textContent = 'เพิ่มรายการผ่อน';
  document.getElementById('install-name').value        = '';
  document.getElementById('install-full-price').value  = '';
  document.getElementById('install-rate').value        = '';
  document.getElementById('install-total').value       = '';
  document.getElementById('install-paid').value        = '0';
  document.getElementById('install-amount').value      = '';
  document.getElementById('install-note').value        = '';
  _setVal('install-reserve', '');
  _setText('install-reserve-hint', '');
  document.getElementById('install-calc-hint').style.display = 'none';
  document.getElementById('delete-install-btn').style.display = 'none';
  populateInstallAccount(null);
  openModal('modal-install');
}

function openInstallEdit(id) {
  const { installments } = getData();
  const inst = installments.find(i => i.id === id);
  if (!inst) return;
  state.editingInstallId = id;
  document.getElementById('modal-install-title').textContent = 'แก้ไขรายการผ่อน';
  document.getElementById('install-name').value        = inst.name;
  document.getElementById('install-full-price').value  = inst.fullPrice || '';
  document.getElementById('install-rate').value        = inst.interestRate || '';
  document.getElementById('install-total').value       = inst.totalMonths;
  document.getElementById('install-paid').value        = inst.paidMonths;
  document.getElementById('install-amount').value      = inst.amountPerMonth;
  document.getElementById('install-note').value        = inst.note || '';
  _setVal('install-reserve', inst.reserve || '');
  const remaining = Math.max(0, inst.totalMonths - inst.paidMonths);
  const totalRem  = remaining * inst.amountPerMonth;
  const reserve   = inst.reserve || 0;
  if (reserve > 0 && totalRem > 0) {
    _setText('install-reserve-hint', `ครอบคลุม ${Math.floor(reserve / inst.amountPerMonth)} งวด · ขาดอีก ฿${Math.max(0, totalRem - reserve).toLocaleString()}`);
  } else { _setText('install-reserve-hint', ''); }
  document.getElementById('install-calc-hint').style.display = 'none';
  document.getElementById('delete-install-btn').style.display = 'block';
  populateInstallAccount(inst.account);
  openModal('modal-install');
}

function populateInstallAccount(selected) {
  const { accounts } = getData();
  document.getElementById('install-account').innerHTML =
    `<option value="">-- ไม่ระบุ --</option>` +
    accounts.map(a => `<option value="${a}" ${a === selected ? 'selected' : ''}>${a}</option>`).join('');
}

function saveInstall() {
  const name         = document.getElementById('install-name').value.trim();
  const total        = parseInt(document.getElementById('install-total').value);
  const paid         = parseInt(document.getElementById('install-paid').value);
  const amount       = parseFloat(document.getElementById('install-amount').value.replace(/,/g,''));
  const acc          = document.getElementById('install-account').value;
  const note         = document.getElementById('install-note').value.trim();
  const fullPrice    = parseFloat((document.getElementById('install-full-price').value || '').replace(/,/g,'')) || 0;
  const interestRate = parseFloat(document.getElementById('install-rate').value) || 0;

  if (!name)                        { alert('กรุณาใส่ชื่อรายการ'); return; }
  if (!total || total <= 0)         { alert('กรุณาใส่จำนวนงวด'); return; }
  if (isNaN(paid) || paid < 0)      { alert('กรุณาใส่งวดที่ผ่อนแล้ว'); return; }
  if (!amount || amount <= 0)        { alert('กรุณาใส่ยอดต่องวด'); return; }
  if (paid > total)                  { alert('งวดที่ผ่อนแล้วมากกว่าจำนวนงวดทั้งหมด'); return; }

  const reserve = parseFloat((document.getElementById('install-reserve')?.value || '').replace(/,/g,'')) || 0;
  const obj = { name, totalMonths: total, paidMonths: paid, amountPerMonth: amount, account: acc, note, fullPrice, interestRate, reserve };
  const data = getData();
  if (state.editingInstallId) {
    const idx = data.installments.findIndex(i => i.id === state.editingInstallId);
    if (idx !== -1) data.installments[idx] = { ...data.installments[idx], ...obj };
  } else {
    data.installments.push({ id: genId(), ...obj });
  }
  saveData(data);
  closeModal('modal-install');
  renderInstalls();
}

function deleteInstall() {
  if (!state.editingInstallId) return;
  if (!confirm('ลบรายการผ่อนนี้?')) return;
  const data = getData();
  data.installments = data.installments.filter(i => i.id !== state.editingInstallId);
  saveData(data);
  state.editingInstallId = null;
  closeModal('modal-install');
  renderInstalls();
}

// ===== ASSETS =====

const ASSET_TYPES = {
  savings:   { icon: '💰', label: 'เงินออม / เงินฝาก' },
  property:  { icon: '🏠', label: 'บ้าน / คอนโด' },
  vehicle:   { icon: '🚗', label: 'รถ / มอเตอร์ไซค์' },
  financial: { icon: '💵', label: 'กองทุนรวม' },
  stock:     { icon: '📈', label: 'หุ้น US / ETF' },
  gold:      { icon: '🥇', label: 'ทองคำ' },
  gadget:    { icon: '📱', label: 'ของมีค่า / อุปกรณ์' },
  other:     { icon: '📦', label: 'อื่นๆ' },
};

const GADGET_DEPRECIATION = { IT: 25, Camera: 20, Music: 15, 'เครื่องใช้ไฟฟ้า': 20, 'อื่นๆ': 15 };

function _calcGadgetCurrentValue(purchasePrice, purchaseDate, rate) {
  if (!purchaseDate || !purchasePrice) return purchasePrice || 0;
  const years = (Date.now() - new Date(purchaseDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.round(purchasePrice * Math.max(0, Math.pow(1 - rate / 100, Math.max(0, years))));
}

function _gadgetCategoryDefaults() {
  const cat  = document.getElementById('asset-gadget-category').value;
  const rate = document.getElementById('asset-gadget-rate');
  if (!rate.value) rate.value = GADGET_DEPRECIATION[cat] || 20;
  _calcGadgetValue();
}

function _calcWarrantyExpiry() {
  const purchaseDate = document.getElementById('asset-gadget-date').value;
  const years  = parseInt(document.getElementById('asset-gadget-warranty-y').value) || 0;
  const months = parseInt(document.getElementById('asset-gadget-warranty-m').value) || 0;
  const hint   = document.getElementById('asset-gadget-warranty-hint');
  if (!purchaseDate || (!years && !months)) { hint.style.display = 'none'; return; }
  const d = new Date(purchaseDate);
  d.setFullYear(d.getFullYear() + years);
  d.setMonth(d.getMonth() + months);
  const expiry = d.toISOString().slice(0, 10);
  document.getElementById('asset-gadget-warranty').value = expiry;
  const daysLeft = Math.ceil((d - Date.now()) / (1000 * 60 * 60 * 24));
  const daysText = daysLeft > 0 ? `เหลือ ${daysLeft} วัน` : 'หมดแล้ว';
  hint.textContent = `หมดประกัน ${expiry} (${daysText})`;
  hint.style.color = daysLeft > 30 ? 'var(--primary)' : daysLeft > 0 ? '#f39c12' : '#e74c3c';
  hint.style.display = 'block';
}

function _calcGadgetValue() {
  const date  = document.getElementById('asset-gadget-date').value;
  const price = parseFloat((document.getElementById('asset-gadget-price').value || '').replace(/,/g,'')) || 0;
  const rate  = parseFloat(document.getElementById('asset-gadget-rate').value) || 0;
  const calc  = document.getElementById('asset-gadget-calc');
  if (!date || !price) { calc.style.display = 'none'; return; }
  const cv    = _calcGadgetCurrentValue(price, date, rate);
  const depPct = price > 0 ? Math.round((1 - cv / price) * 100) : 0;
  calc.innerHTML = `มูลค่าปัจจุบัน ≈ <strong>฿${cv.toLocaleString()}</strong> <span style="color:#e74c3c">(เสื่อมไป ${depPct}% = ฿${(price - cv).toLocaleString()})</span>`;
  calc.style.display = 'block';
}

function renderAssetsPage() {
  const data = getData();
  const assets = data.assets || [];
  const installments = data.installments || [];

  const totalAssets = assets.reduce((s, a) => s + (a.currentValue || 0), 0);
  const totalDebt   = installments
    .filter(i => i.paidMonths < i.totalMonths)
    .reduce((s, i) => s + Math.max(0, i.totalMonths - i.paidMonths) * i.amountPerMonth, 0);
  const netWorth = totalAssets - totalDebt;

  document.getElementById('assets-net-worth').innerHTML = `
    <div style="display:flex;justify-content:space-between;text-align:center">
      <div style="flex:1">
        <div style="font-size:11px;color:#9E9E9E;margin-bottom:4px">สินทรัพย์รวม</div>
        <div style="font-size:15px;font-weight:800;color:#2ecc71">฿${totalAssets.toLocaleString()}</div>
      </div>
      <div style="flex:1;border-left:1px solid var(--border);border-right:1px solid var(--border);cursor:pointer" onclick="_showDebtBreakdown()">
        <div style="font-size:11px;color:#9E9E9E;margin-bottom:4px">หนี้สิน</div>
        <div style="font-size:15px;font-weight:800;color:#e74c3c">฿${totalDebt.toLocaleString()}</div>
        <div style="font-size:10px;color:#9E9E9E;margin-top:2px">แตะดูรายละเอียด</div>
      </div>
      <div style="flex:1">
        <div style="font-size:11px;color:#9E9E9E;margin-bottom:4px">Net Worth</div>
        <div style="font-size:15px;font-weight:800;color:${netWorth >= 0 ? '#6C63FF' : '#e74c3c'}">฿${netWorth.toLocaleString()}</div>
      </div>
    </div>`;

  const container = document.getElementById('assets-container');
  if (!assets.length) {
    container.innerHTML = '<div class="empty-state"><div class="emoji">🏦</div><p>ยังไม่มีสินทรัพย์<br>กด "+ เพิ่มสินทรัพย์" ด้านล่าง</p></div>';
    return;
  }

  const groups = {};
  assets.forEach(a => { if (!groups[a.type]) groups[a.type] = []; groups[a.type].push(a); });

  let html = '';
  ['savings','property','vehicle','financial','stock','gold','gadget','other'].forEach(type => {
    if (!groups[type]) return;
    const { icon, label } = ASSET_TYPES[type];
    const groupTotal = groups[type].reduce((s, a) => s + (a.currentValue || 0), 0);
    html += `<div class="card" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div class="section-title" style="margin:0">${icon} ${label}</div>
        <span style="font-size:13px;font-weight:700;color:var(--primary)">฿${groupTotal.toLocaleString()}</span>
      </div>`;
    groups[type].forEach(a => {
      let gain, gainHtml;
      if (a.type === 'stock') {
        // stock: แสดง gain ทั้ง USD และ THB
        const costUsd = a.purchasePriceUsd || 0;
        const costThb = a.purchasePrice    || 0;
        const currentUsd = (a.shares || 0) * (a.priceUsd || 0);
        if (costUsd > 0) {
          const gainUsd = currentUsd - costUsd;
          const gainThb = (a.currentValue || 0) - costThb;
          const color = gainUsd >= 0 ? '#2ecc71' : '#e74c3c';
          const arrow = gainUsd >= 0 ? '▲' : '▼';
          gainHtml = `<span style="font-size:11px;color:${color}">${arrow} $${Math.abs(gainUsd).toLocaleString('en', {minimumFractionDigits:2,maximumFractionDigits:2})} / ฿${Math.abs(gainThb).toLocaleString()}</span>`;
        } else if (costThb > 0) {
          const gainThb = (a.currentValue || 0) - costThb;
          const color = gainThb >= 0 ? '#2ecc71' : '#e74c3c';
          gainHtml = `<span style="font-size:11px;color:${color}">${gainThb >= 0 ? '▲' : '▼'} ฿${Math.abs(gainThb).toLocaleString()}</span>`;
        } else { gainHtml = ''; }
      } else {
        gain = a.purchasePrice ? a.currentValue - a.purchasePrice : null;
        gainHtml = gain !== null
          ? `<span style="font-size:11px;color:${gain >= 0 ? '#2ecc71' : '#e74c3c'}">${gain >= 0 ? '▲' : '▼'} ฿${Math.abs(gain).toLocaleString()}</span>`
          : '';
      }
      let subHtml = '';
      if (a.type === 'savings' && a.bank)
        subHtml = `<span style="font-size:11px;color:#9E9E9E">${a.bank}${a.interest ? ` · ${a.interest}%/ปี` : ''}</span>`;
      else if (a.type === 'financial' && a.units)
        subHtml = `<span style="font-size:11px;color:#9E9E9E">${Number(a.units).toLocaleString()} หน่วย × ฿${(a.nav||0).toLocaleString()}</span>`;
      else if (a.type === 'stock' && a.shares)
        subHtml = `<span style="font-size:11px;color:#9E9E9E">${a.ticker} ${Number(a.shares).toLocaleString()} shares × $${(a.priceUsd||0).toLocaleString()}</span>`;
      else if (a.type === 'gold' && a.grams)
        subHtml = `<span style="font-size:11px;color:#9E9E9E">${Number(a.grams).toLocaleString()} g × ฿${(a.priceThbGram||0).toLocaleString()}/g</span>`;
      else if (a.type === 'gadget') {
        const depPct = a.purchasePrice > 0 ? Math.round((1 - (a.currentValue || 0) / a.purchasePrice) * 100) : 0;
        const warnHtml = (() => {
          if (!a.warrantyExpiry) return '';
          const daysLeft = Math.ceil((new Date(a.warrantyExpiry) - Date.now()) / (1000 * 60 * 60 * 24));
          if (daysLeft < 0) return `<span style="font-size:10px;background:#ffebee;color:#e74c3c;padding:1px 6px;border-radius:99px">ประกันหมดแล้ว</span>`;
          if (daysLeft <= 30) return `<span style="font-size:10px;background:#fff3e0;color:#f39c12;padding:1px 6px;border-radius:99px">⚠️ เหลือ ${daysLeft} วัน</span>`;
          return `<span style="font-size:10px;background:#e8f5e9;color:#2ecc71;padding:1px 6px;border-radius:99px">ประกัน ${daysLeft} วัน</span>`;
        })();
        subHtml = `<span style="font-size:11px;color:#9E9E9E">${a.category || ''}${a.purchasePrice ? ` · ฿${a.purchasePrice.toLocaleString()} → เสื่อม ${depPct}%` : ''}</span>${warnHtml}`;
      }
      else if (a.note)
        subHtml = `<span style="font-size:12px;color:#9E9E9E">${a.note}</span>`;
      html += `<div onclick="openAssetModal('${a.id}')" style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer">
        <div>
          <div style="font-size:14px;font-weight:600">${a.name}</div>
          <div style="display:flex;gap:8px;margin-top:2px;flex-wrap:wrap">${subHtml}${gainHtml}</div>
        </div>
        <div style="font-weight:800;font-size:15px;text-align:right">฿${(a.currentValue||0).toLocaleString()}</div>
      </div>`;
    });
    html += `</div>`;
  });
  container.innerHTML = html;
}

function _calcStockValue() {
  const shares = parseFloat(document.getElementById('asset-shares').value.replace(/,/g,'')) || 0;
  const price  = parseFloat(document.getElementById('asset-price-usd').value.replace(/,/g,'')) || 0;
  const usdThb = parseFloat(document.getElementById('asset-price-usd').dataset.usdThb || '33') || 33;
  const calc   = document.getElementById('asset-stock-calc');
  if (shares > 0 && price > 0) {
    const thb = shares * price * usdThb;
    calc.textContent = `= ฿${thb.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    calc.style.display = 'block';
  } else { calc.style.display = 'none'; }
}

function _autoConvertStockCost() {
  const usd    = parseFloat(document.getElementById('asset-stock-cost-usd').value.replace(/,/g,'')) || 0;
  const usdThb = parseFloat(document.getElementById('asset-price-usd').dataset.usdThb || '0') || 0;
  if (usd > 0 && usdThb > 0) {
    document.getElementById('asset-stock-cost-thb').value = (usd * usdThb).toFixed(2);
  }
}

function _calcGoldValue() {
  const grams = parseFloat(document.getElementById('asset-grams').value.replace(/,/g,'')) || 0;
  const price = parseFloat(document.getElementById('asset-gold-price').value.replace(/,/g,'')) || 0;
  const calc  = document.getElementById('asset-gold-calc');
  if (grams > 0 && price > 0) {
    const thb = grams * price;
    calc.textContent = `= ฿${thb.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    calc.style.display = 'block';
  } else { calc.style.display = 'none'; }
}

async function _fetchStockPrice() {
  const ticker = document.getElementById('asset-ticker').value.trim().toUpperCase();
  if (!ticker) { alert('กรุณาใส่ Ticker ก่อน'); return; }
  const statusEl = document.getElementById('asset-stock-status');
  statusEl.textContent = '⏳ กำลังดึงราคา...'; statusEl.style.color = '#9E9E9E';
  try {
    const res  = await fetch(`/.netlify/functions/stock?symbol=${encodeURIComponent(ticker)}`);
    const json = await res.json();
    if (!res.ok || !json.price_usd) throw new Error(json.error || 'ไม่พบข้อมูล');
    const priceEl = document.getElementById('asset-price-usd');
    priceEl.value = json.price_usd;
    priceEl.dataset.usdThb = json.usd_thb;
    if (!document.getElementById('asset-name').value) document.getElementById('asset-name').value = json.name || ticker;
    _calcStockValue();
    statusEl.textContent = `✅ $${json.price_usd} USD = ฿${json.price_thb.toLocaleString()} (1 USD = ฿${json.usd_thb})`;
    statusEl.style.color = '#2ecc71';
  } catch(e) { statusEl.textContent = `❌ ${e.message}`; statusEl.style.color = '#e74c3c'; }
}

async function _fetchGoldPrice() {
  const statusEl = document.getElementById('asset-gold-status');
  statusEl.textContent = '⏳ กำลังดึงราคาทอง...'; statusEl.style.color = '#9E9E9E';
  try {
    const res  = await fetch(`/.netlify/functions/stock?type=gold&symbol=GC%3DF`);
    const json = await res.json();
    if (!res.ok || !json.price_thb_gram) throw new Error(json.error || 'ไม่พบข้อมูล');
    document.getElementById('asset-gold-price').value = json.price_thb_gram;
    document.getElementById('asset-gold-price').dataset.usdOz  = json.price_usd_oz;
    document.getElementById('asset-gold-price').dataset.usdThb = json.usd_thb;
    _calcGoldValue();
    statusEl.textContent = `✅ ฿${json.price_thb_gram.toLocaleString()}/กรัม ($${json.price_usd_oz}/oz | 1 USD = ฿${json.usd_thb})`;
    statusEl.style.color = '#2ecc71';
  } catch(e) { statusEl.textContent = `❌ ${e.message}`; statusEl.style.color = '#e74c3c'; }
}

let _fundSearchTimer = null;
function _onFundSearchInput() {
  clearTimeout(_fundSearchTimer);
  _fundSearchTimer = setTimeout(_searchFund, 600);
}

async function _searchFund() {
  const q = document.getElementById('asset-fund-search').value.trim();
  const resultsEl = document.getElementById('asset-fund-results');
  if (q.length < 2) { resultsEl.style.display = 'none'; return; }

  resultsEl.style.display = 'block';
  resultsEl.innerHTML = '<div style="padding:10px;color:#9E9E9E;font-size:13px">⏳ กำลังค้นหา...</div>';

  try {
    const res  = await fetch(`/.netlify/functions/fund-search?q=${encodeURIComponent(q)}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'ค้นหาไม่ได้');
    if (!json.length) {
      resultsEl.innerHTML = '<div style="padding:10px;color:#9E9E9E;font-size:13px">ไม่พบกองทุน ลองพิมพ์ชื่ออื่น</div>';
      return;
    }
    resultsEl.innerHTML = json.map(f => `
      <div onclick="_selectFund('${f.proj_id}','${(f.abbr||'').replace(/'/g,'\\\'')}')"
        style="padding:10px 12px;border-bottom:1px solid var(--border);cursor:pointer;active:background:var(--bg)">
        <div style="font-size:13px;font-weight:700">${f.abbr || ''}</div>
        <div style="font-size:11px;color:#9E9E9E">${f.name_th || f.name_en || ''}</div>
      </div>`).join('');
  } catch (e) {
    resultsEl.innerHTML = `<div style="padding:10px;color:#e74c3c;font-size:13px">❌ ${e.message}</div>`;
  }
}

function _selectFund(projId, abbr) {
  document.getElementById('asset-proj-id').value       = projId;
  document.getElementById('asset-fund-search').value   = abbr;
  document.getElementById('asset-fund-results').style.display = 'none';
  if (!document.getElementById('asset-name').value) document.getElementById('asset-name').value = abbr;
  const statusEl = document.getElementById('asset-nav-status');
  statusEl.textContent = `✅ เลือกแล้ว: ${abbr} (${projId}) — กด 🔄 ดึง NAV`;
  statusEl.style.color = '#2ecc71';
}

async function _fetchNavByProjId() {
  const projId = document.getElementById('asset-proj-id').value.trim();
  if (!projId) { alert('กรุณาใส่ SEC Proj ID ก่อน'); return; }
  const statusEl = document.getElementById('asset-nav-status');
  statusEl.textContent = '⏳ กำลังดึงข้อมูล...';
  statusEl.style.color = '#9E9E9E';
  try {
    const res = await fetch(`/.netlify/functions/nav?proj_id=${encodeURIComponent(projId)}`);
    const json = await res.json();
    if (!res.ok || !json.nav) throw new Error(json.error || 'ไม่พบข้อมูล');
    document.getElementById('asset-nav').value = json.nav;
    _calcFundValue();
    statusEl.textContent = `✅ NAV ${json.date}: ฿${json.nav} (${json.class_name || ''})`;
    statusEl.style.color = '#2ecc71';
  } catch (e) {
    statusEl.textContent = `❌ ${e.message}`;
    statusEl.style.color = '#e74c3c';
  }
}

let _assetsRefreshInterval = null;
const REFRESH_INTERVAL_MS = 15 * 60 * 1000; // 15 นาที

function _startAssetsAutoRefresh() {
  // clear interval เก่าถ้ามี
  if (_assetsRefreshInterval) clearInterval(_assetsRefreshInterval);

  // refresh ทันทีถ้าผ่านมา > 15 นาที
  const last = parseInt(localStorage.getItem('lastNavRefresh') || '0');
  if (Date.now() - last > REFRESH_INTERVAL_MS) {
    _autoRefreshAllFundNavs(true); // silent
  }

  // ตั้ง interval refresh ทุก 15 นาที
  _assetsRefreshInterval = setInterval(() => {
    if (state.page === 'assets') _autoRefreshAllFundNavs(true);
  }, REFRESH_INTERVAL_MS);
}

function _stopAssetsAutoRefresh() {
  if (_assetsRefreshInterval) { clearInterval(_assetsRefreshInterval); _assetsRefreshInterval = null; }
}

async function _autoRefreshAllFundNavs(silent = false) {
  const data = getData();
  const assets = data.assets || [];
  const toRefresh = assets.filter(a =>
    (a.type === 'financial' && a.projId && a.units) ||
    (a.type === 'stock'     && a.ticker && a.shares) ||
    (a.type === 'gold'      && a.grams)
  );
  if (!toRefresh.length) { if (!silent) showToast('ไม่มีสินทรัพย์ที่อัพเดทได้อัตโนมัติ'); return; }
  if (!silent) showToast('⏳ กำลังอัพเดทราคา...');
  let updated = 0;

  for (const asset of toRefresh) {
    try {
      const idx = data.assets.findIndex(a => a.id === asset.id);
      if (idx === -1) continue;

      if (asset.type === 'financial') {
        const res  = await fetch(`/.netlify/functions/nav?proj_id=${encodeURIComponent(asset.projId)}`);
        const json = await res.json();
        if (res.ok && json.nav) {
          data.assets[idx].nav          = json.nav;
          data.assets[idx].currentValue = asset.units * json.nav;
          data.assets[idx].navDate      = json.date;
          updated++;
        }
      } else if (asset.type === 'stock') {
        const res  = await fetch(`/.netlify/functions/stock?symbol=${encodeURIComponent(asset.ticker)}`);
        const json = await res.json();
        if (res.ok && json.price_usd) {
          data.assets[idx].priceUsd     = json.price_usd;
          data.assets[idx].usdThb       = json.usd_thb;
          data.assets[idx].currentValue = asset.shares * json.price_usd * json.usd_thb;
          data.assets[idx].priceDate    = new Date().toISOString().split('T')[0];
          updated++;
        }
      } else if (asset.type === 'gold') {
        const res  = await fetch(`/.netlify/functions/stock?type=gold&symbol=GC%3DF`);
        const json = await res.json();
        if (res.ok && json.price_thb_gram) {
          data.assets[idx].priceThbGram = json.price_thb_gram;
          data.assets[idx].currentValue = asset.grams * json.price_thb_gram;
          data.assets[idx].priceDate    = new Date().toISOString().split('T')[0];
          updated++;
        }
      }
    } catch (_) {}
  }

  saveData(data);
  localStorage.setItem('lastNavRefresh', Date.now().toString());
  renderAssetsPage();
  if (!silent) showToast(`✅ อัพเดทราคาแล้ว ${updated} รายการ`);
  else if (updated > 0) showToast(`🔄 ราคาอัพเดทแล้ว ${updated} รายการ`);
}

function _onAssetTypeChange() {
  const type = document.getElementById('asset-type').value;
  _setDisp('asset-savings-fields', type === 'savings'   ? 'block' : 'none');
  _setDisp('asset-direct-fields',  ['property','vehicle','other'].includes(type) ? 'block' : 'none');
  _setDisp('asset-fund-fields',    type === 'financial' ? 'block' : 'none');
  _setDisp('asset-stock-fields',   type === 'stock'     ? 'block' : 'none');
  _setDisp('asset-gold-fields',    type === 'gold'      ? 'block' : 'none');
  _setDisp('asset-gadget-fields',  type === 'gadget'    ? 'block' : 'none');
  if (type === 'gadget') _gadgetCategoryDefaults();
}

function _calcFundValue() {
  const units = parseFloat(document.getElementById('asset-units').value.replace(/,/g,'')) || 0;
  const nav   = parseFloat(document.getElementById('asset-nav').value.replace(/,/g,'')) || 0;
  const calc  = document.getElementById('asset-fund-calc');
  if (units > 0 && nav > 0) {
    calc.textContent = `= ฿${(units * nav).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    calc.style.display = 'block';
  } else {
    calc.style.display = 'none';
  }
}

function _showDebtBreakdown() {
  const data = getData();
  const installments = (data.installments || []).filter(i => i.paidMonths < i.totalMonths);

  if (!installments.length) {
    alert('ไม่มีรายการผ่อนที่ค้างอยู่');
    return;
  }

  const rows = installments.map(i => {
    const remaining = Math.max(0, i.totalMonths - i.paidMonths);
    const total = remaining * i.amountPerMonth;
    return `<tr>
      <td style="padding:8px 4px;border-bottom:1px solid var(--border);font-size:13px">${i.name}</td>
      <td style="padding:8px 4px;border-bottom:1px solid var(--border);font-size:13px;text-align:center;color:#9E9E9E">${remaining} งวด × ฿${i.amountPerMonth.toLocaleString()}</td>
      <td style="padding:8px 4px;border-bottom:1px solid var(--border);font-size:13px;text-align:right;font-weight:700;color:#e74c3c">฿${total.toLocaleString()}</td>
    </tr>`;
  }).join('');

  const totalDebt = installments.reduce((s, i) => s + Math.max(0, i.totalMonths - i.paidMonths) * i.amountPerMonth, 0);

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;display:flex;align-items:flex-end;justify-content:center';
  overlay.innerHTML = `
    <div style="background:var(--card);border-radius:20px 20px 0 0;padding:20px;width:100%;max-width:480px;max-height:75vh;overflow-y:auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <span style="font-size:16px;font-weight:800">💳 รายละเอียดหนี้สิน</span>
        <span onclick="this.closest('[style*=fixed]').remove()" style="font-size:22px;cursor:pointer;line-height:1">×</span>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="text-align:left;font-size:11px;color:#9E9E9E;padding-bottom:6px">รายการ</th>
            <th style="text-align:center;font-size:11px;color:#9E9E9E;padding-bottom:6px">งวดคงเหลือ</th>
            <th style="text-align:right;font-size:11px;color:#9E9E9E;padding-bottom:6px">ยอดรวม</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding-top:10px;font-size:13px;font-weight:700">รวมทั้งหมด</td>
            <td style="padding-top:10px;font-size:15px;font-weight:800;color:#e74c3c;text-align:right">฿${totalDebt.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function openAssetModal(id) {
  state._editingAssetId = id || null;
  const isEdit = !!id;
  document.getElementById('modal-asset-title').textContent = isEdit ? 'แก้ไขสินทรัพย์' : 'เพิ่มสินทรัพย์';
  document.getElementById('delete-asset-btn').style.display = isEdit ? 'block' : 'none';
  if (isEdit) {
    const asset = (getData().assets || []).find(a => a.id === id);
    if (!asset) return;
    document.getElementById('asset-name').value     = asset.name;
    document.getElementById('asset-type').value     = asset.type || 'other';
    document.getElementById('asset-note').value     = asset.note || '';
    if (asset.type === 'savings') {
      _setVal('asset-bank',       asset.bank || '');
      _setVal('asset-account-no', asset.accountNo || '');
      _setVal('asset-balance',    asset.currentValue || '');
      _setVal('asset-interest',   asset.interest || '');
    } else if (asset.type === 'financial') {
      document.getElementById('asset-proj-id').value     = asset.projId || '';
      document.getElementById('asset-fund-search').value = asset.name || '';
      document.getElementById('asset-units').value       = asset.units || '';
      document.getElementById('asset-nav').value     = asset.nav || '';
      document.getElementById('asset-cost').value    = asset.purchasePrice || '';
      document.getElementById('asset-nav-status').textContent = asset.navDate ? `NAV ล่าสุด: ${asset.navDate}` : '';
    } else if (asset.type === 'stock') {
      document.getElementById('asset-ticker').value     = asset.ticker || '';
      document.getElementById('asset-shares').value     = asset.shares || '';
      document.getElementById('asset-price-usd').value  = asset.priceUsd || '';
      document.getElementById('asset-stock-cost-usd').value = asset.purchasePriceUsd || '';
      document.getElementById('asset-stock-cost-thb').value = asset.purchasePrice || '';
      document.getElementById('asset-stock-status').textContent = asset.priceDate ? `ราคา: ${asset.priceDate}` : '';
    } else if (asset.type === 'gold') {
      document.getElementById('asset-grams').value      = asset.grams || '';
      document.getElementById('asset-gold-price').value = asset.priceThbGram || '';
      document.getElementById('asset-gold-cost').value  = asset.purchasePrice || '';
      document.getElementById('asset-gold-status').textContent = asset.priceDate ? `ราคา: ${asset.priceDate}` : '';
    } else if (asset.type === 'gadget') {
      _setVal('asset-gadget-category', asset.category || 'IT');
      _setVal('asset-gadget-date',     asset.purchaseDate || '');
      _setVal('asset-gadget-price',    asset.purchasePrice || '');
      _setVal('asset-gadget-rate',     asset.depreciationRate || '');
      _setVal('asset-gadget-payment',  asset.payment || '');
      _setVal('asset-gadget-warranty', asset.warrantyExpiry || '');
      _setVal('asset-gadget-store',    asset.store || '');
    } else {
      document.getElementById('asset-value').value    = asset.currentValue || '';
      document.getElementById('asset-purchase').value = asset.purchasePrice || '';
    }
  } else {
    document.getElementById('asset-name').value       = '';
    document.getElementById('asset-type').value       = 'savings';
    document.getElementById('asset-value').value      = '';
    document.getElementById('asset-purchase').value   = '';
    document.getElementById('asset-proj-id').value      = '';
    _setVal('asset-bank', '');
    _setVal('asset-account-no', '');
    _setVal('asset-balance', '');
    _setVal('asset-interest', '');
    _setVal('asset-fund-search', '');
    _setDisp('asset-fund-results', 'none');
    _setVal('asset-units', '');
    _setVal('asset-nav', '');
    _setVal('asset-cost', '');
    _setVal('asset-ticker', '');
    _setVal('asset-shares', '');
    _setVal('asset-price-usd', '');
    _setVal('asset-stock-cost-usd', '');
    _setVal('asset-stock-cost-thb', '');
    _setVal('asset-grams', '');
    _setVal('asset-gold-price', '');
    _setVal('asset-gold-cost', '');
    _setVal('asset-gadget-category', 'IT');
    _setVal('asset-gadget-date', '');
    _setVal('asset-gadget-price', '');
    _setVal('asset-gadget-rate', '');
    _setVal('asset-gadget-payment', '');
    _setVal('asset-gadget-warranty', '');
    _setVal('asset-gadget-warranty-y', '');
    _setVal('asset-gadget-warranty-m', '');
    _setDisp('asset-gadget-warranty-hint', 'none');
    _setVal('asset-gadget-store', '');
    _setDisp('asset-gadget-calc', 'none');
    _setVal('asset-note', '');
    _setText('asset-nav-status', '');
    _setText('asset-stock-status', '');
    document.getElementById('asset-gold-status').textContent  = '';
    document.getElementById('asset-fund-calc').style.display  = 'none';
    document.getElementById('asset-stock-calc').style.display = 'none';
    document.getElementById('asset-gold-calc').style.display  = 'none';
  }
  _onAssetTypeChange();
  openModal('modal-asset');
}

function saveAsset() {
  const name = document.getElementById('asset-name').value.trim();
  const type = document.getElementById('asset-type').value;
  const note = document.getElementById('asset-note').value.trim();
  if (!name) { alert('กรุณาใส่ชื่อสินทรัพย์'); return; }

  let obj;
  if (type === 'savings') {
    const bank      = document.getElementById('asset-bank').value.trim();
    const accountNo = document.getElementById('asset-account-no').value.trim();
    const balance   = parseFloat(document.getElementById('asset-balance').value.replace(/,/g,'')) || 0;
    const interest  = parseFloat(document.getElementById('asset-interest').value.replace(/,/g,'')) || 0;
    if (!balance) { alert('กรุณาใส่ยอดเงิน'); return; }
    obj = { name, type, bank, accountNo, currentValue: balance, interest, note };
  } else if (type === 'financial') {
    const projId = document.getElementById('asset-proj-id').value.trim();
    const units  = parseFloat(document.getElementById('asset-units').value.replace(/,/g,'')) || 0;
    const nav    = parseFloat(document.getElementById('asset-nav').value.replace(/,/g,'')) || 0;
    const cost   = parseFloat(document.getElementById('asset-cost').value.replace(/,/g,'')) || 0;
    if (!units || !nav) { alert('กรุณาใส่จำนวนหน่วยและ NAV'); return; }
    obj = { name, type, projId, units, nav, currentValue: units * nav, purchasePrice: cost, note };
  } else if (type === 'stock') {
    const ticker   = document.getElementById('asset-ticker').value.trim().toUpperCase();
    const shares   = parseFloat(document.getElementById('asset-shares').value.replace(/,/g,'')) || 0;
    const priceUsd = parseFloat(document.getElementById('asset-price-usd').value.replace(/,/g,'')) || 0;
    const usdThb   = parseFloat(document.getElementById('asset-price-usd').dataset.usdThb || '33');
    const costUsd  = parseFloat(document.getElementById('asset-stock-cost-usd').value.replace(/,/g,'')) || 0;
    const costThb  = parseFloat(document.getElementById('asset-stock-cost-thb').value.replace(/,/g,'')) || 0;
    if (!ticker || !shares || !priceUsd) { alert('กรุณาใส่ Ticker, จำนวนหุ้น และราคา'); return; }
    obj = { name, type, ticker, shares, priceUsd, usdThb, currentValue: shares * priceUsd * usdThb, purchasePriceUsd: costUsd, purchasePrice: costThb, note };
  } else if (type === 'gold') {
    const grams       = parseFloat(document.getElementById('asset-grams').value.replace(/,/g,'')) || 0;
    const priceThbGram= parseFloat(document.getElementById('asset-gold-price').value.replace(/,/g,'')) || 0;
    const cost        = parseFloat(document.getElementById('asset-gold-cost').value.replace(/,/g,'')) || 0;
    if (!grams || !priceThbGram) { alert('กรุณาใส่จำนวนกรัมและราคาทอง'); return; }
    obj = { name, type, grams, priceThbGram, currentValue: grams * priceThbGram, purchasePrice: cost, note };
  } else if (type === 'gadget') {
    const category       = document.getElementById('asset-gadget-category').value;
    const purchaseDate   = document.getElementById('asset-gadget-date').value;
    const purchasePrice  = parseFloat((document.getElementById('asset-gadget-price').value || '').replace(/,/g,'')) || 0;
    const depreciationRate = parseFloat(document.getElementById('asset-gadget-rate').value) || 0;
    const payment        = document.getElementById('asset-gadget-payment').value.trim();
    const warrantyExpiry = document.getElementById('asset-gadget-warranty').value;
    const store          = document.getElementById('asset-gadget-store').value.trim();
    if (!purchasePrice) { alert('กรุณาใส่ราคาที่ซื้อ'); return; }
    const currentValue = _calcGadgetCurrentValue(purchasePrice, purchaseDate, depreciationRate);
    obj = { name, type, category, purchaseDate, purchasePrice, depreciationRate, currentValue, payment, warrantyExpiry, store, note };
  } else {
    const value    = parseFloat(document.getElementById('asset-value').value.replace(/,/g,'')) || 0;
    const purchase = parseFloat(document.getElementById('asset-purchase').value.replace(/,/g,'')) || 0;
    obj = { name, type, currentValue: value, purchasePrice: purchase, note };
  }

  const data = getData();
  if (!data.assets) data.assets = [];
  if (state._editingAssetId) {
    const idx = data.assets.findIndex(a => a.id === state._editingAssetId);
    if (idx !== -1) data.assets[idx] = { ...data.assets[idx], ...obj };
  } else {
    data.assets.push({ id: genId(), ...obj });
  }
  saveData(data);
  closeModal('modal-asset');
  renderAssetsPage();
}

function deleteAsset() {
  if (!confirm('ลบสินทรัพย์นี้?')) return;
  const data = getData();
  data.assets = (data.assets || []).filter(a => a.id !== state._editingAssetId);
  saveData(data);
  closeModal('modal-asset');
  renderAssetsPage();
}

function _seedGadgetItems() {
  const data = getData();
  if (data._gadgetSeeded) return;
  if (!data.assets) data.assets = [];

  const items = [
    { name: 'Samsung S26 Ultra 12/512',               category: 'IT',     purchaseDate: '2026-03-14', purchasePrice: 30800, depreciationRate: 25, payment: 'KBANK - 0% 10', warrantyExpiry: '2027-03-14', store: 'AIS'  },
    { name: 'Insta 360 X5 Essentail Bundle',           category: 'Camera', purchaseDate: '2025-12-17', purchasePrice: 17060, depreciationRate: 20, payment: 'KTC - 0% 10',   warrantyExpiry: '2026-12-17', store: ''     },
    { name: 'AeroBand PocketDrum2',                    category: 'Music',  purchaseDate: '2025-12-17', purchasePrice:  3465, depreciationRate: 15, payment: 'KTC',            warrantyExpiry: '2026-12-17', store: ''     },
    { name: 'Donner Hush-I Electric Acoustic Guitar',  category: 'Music',  purchaseDate: '2025-11-30', purchasePrice:  4630, depreciationRate: 15, payment: 'KTC',            warrantyExpiry: '2026-11-30', store: ''     },
    { name: 'Samsung Bud 3 Pro',                       category: 'IT',     purchaseDate: '2024-07-28', purchasePrice:  5243, depreciationRate: 25, payment: 'KTC - 0% 4',    warrantyExpiry: '2025-07-28', store: ''     },
    { name: 'Galaxy Watch 7',                          category: 'IT',     purchaseDate: '2024-07-21', purchasePrice:  7085, depreciationRate: 25, payment: 'KTC - 0% 4',    warrantyExpiry: '2025-07-21', store: ''     },
    { name: 'PS5',                                     category: 'IT',     purchaseDate: '2023-07-08', purchasePrice: 18690, depreciationRate: 25, payment: 'KTC - 0% 6',    warrantyExpiry: '2023-07-08', store: ''     },
    { name: 'LG Monitor',                              category: 'IT',     purchaseDate: '2023-07-08', purchasePrice:  5840, depreciationRate: 20, payment: 'KTC - 0% 6',    warrantyExpiry: '2023-07-08', store: ''     },
    { name: 'MacBook Pro 13" M2 (2022)',               category: 'IT',     purchaseDate: '2023-03-01', purchasePrice: 56900, depreciationRate: 25, payment: 'KBANK - 0% 10', warrantyExpiry: '2024-03-01', store: ''     },
    { name: "iPad 11\" Gen3 M1",                       category: 'IT',     purchaseDate: '2022-07-22', purchasePrice: 32900, depreciationRate: 25, payment: 'แม่เหมียว',      warrantyExpiry: '2023-07-22', store: ''     },
    { name: 'ASUS Notebook',                           category: 'IT',     purchaseDate: '2021-11-26', purchasePrice: 34900, depreciationRate: 25, payment: 'เอนก',           warrantyExpiry: '2023-11-26', store: ''     },
  ];

  items.forEach(item => {
    const currentValue = _calcGadgetCurrentValue(item.purchasePrice, item.purchaseDate, item.depreciationRate);
    data.assets.push({ id: genId(), type: 'gadget', note: '', ...item, currentValue });
  });

  data._gadgetSeeded = true;
  saveData(data);
  showToast('📱 เพิ่มของมีค่า 11 รายการแล้ว');
}

// ===== SETTINGS =====

function saveCycleDay(day) {
  const data = getData();
  data.cycleDay = parseInt(day);
  saveData(data);
  const cm = cycleCurrentMonth();
  state.dashMonth = state.listMonth = state.chartMonth = cm.month;
  state.dashYear  = state.listYear  = state.chartYear  = cm.year;
}

function openSettings() {
  navigate('settings');
}

function renderSettings() {
  const { categories, accounts, recurringItems, darkMode } = getData();
  const incCats = categories.income  || DEFAULT_CATEGORIES.income;
  const expCats = categories.expense || DEFAULT_CATEGORIES.expense;
  const currentCycleDay = getCycleDay();
  document.getElementById('settings-container').innerHTML = `
    <div class="card">
      <div class="section-title">ซิงค์ข้อมูล</div>
      <div style="display:flex;gap:8px;padding:4px 0 8px">
        <button class="btn-secondary" style="flex:1;font-size:13px" onclick="forcePullFromFirebase()">☁️ ดึงจาก Cloud</button>
        <button class="btn-secondary" style="flex:1;font-size:13px" onclick="forcePushToFirebase()">⬆️ อัพขึ้น Cloud</button>
      </div>
      <div style="font-size:11px;color:var(--text-secondary)">
        ใช้เมื่อข้อมูลไม่ตรงกันระหว่างอุปกรณ์
      </div>
    </div>

    <div class="card">
      <div class="section-title">การแสดงผล</div>
      <div class="setting-item">
        <span style="font-size:20px">🌙</span>
        <span class="setting-name">Dark Mode</span>
        <label class="switch">
          <input type="checkbox" ${darkMode ? 'checked' : ''} onchange="toggleDarkMode()">
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div class="card">
      <div class="section-title">การตั้งค่าเดือน</div>
      <div class="setting-item">
        <span style="font-size:20px">📅</span>
        <span class="setting-name">วันตัดรอบเดือน</span>
        <select class="form-input" style="width:70px;padding:8px" onchange="saveCycleDay(this.value)">
          ${Array.from({length:28},(_,i)=>i+1).map(d=>`<option value="${d}" ${d===currentCycleDay?'selected':''}>${d}</option>`).join('')}
        </select>
      </div>
      <div style="font-size:12px;color:var(--text-secondary);padding:8px 0 4px">
        รอบปัจจุบัน: วันที่ ${currentCycleDay} ของเดือนก่อน → วันที่ ${currentCycleDay-1} ของเดือนนี้
      </div>
    </div>

    <div class="card">
      <div class="section-title">⚡ Quick Add Templates</div>
      ${(recurringItems||[]).map(r => `
        <div class="setting-item">
          <span style="font-size:20px">⚡</span>
          <span class="setting-name">${r.name}${r.amount ? ' ฿'+fmt(r.amount) : ''}</span>
          <button class="setting-del" onclick="deleteRecurring('${r.id}')">🗑️</button>
        </div>`).join('')}
      <button class="btn-secondary" style="width:100%;margin-top:10px" onclick="openAddRecurring()">+ เพิ่ม Template</button>
    </div>

    <div class="card">
      <div class="section-title">หมวดหมู่รายรับ</div>
      ${incCats.map(c => `
        <div class="setting-item">
          <span style="font-size:20px">${c.emoji}</span>
          <span class="setting-name">${c.name}</span>
          <div style="display:flex;gap:6px">
            <button class="setting-del" data-type="income" data-name="${c.name}" onclick="openRenameCategory(this.dataset.type,this.dataset.name)">✏️</button>
            <button class="setting-del" data-type="income" data-name="${c.name}" onclick="deleteCategory(this.dataset.type,this.dataset.name)">🗑️</button>
          </div>
        </div>`).join('')}
      <button class="btn-secondary" style="width:100%;margin-top:10px" onclick="openAddCat('income')">+ เพิ่มหมวดหมู่รายรับ</button>
    </div>

    <div class="card">
      <div class="section-title">หมวดหมู่รายจ่าย</div>
      ${expCats.map(c => `
        <div class="setting-item">
          <span style="font-size:20px">${c.emoji}</span>
          <span class="setting-name">${c.name}</span>
          <div style="display:flex;gap:6px">
            <button class="setting-del" data-type="expense" data-name="${c.name}" onclick="openRenameCategory(this.dataset.type,this.dataset.name)">✏️</button>
            <button class="setting-del" data-type="expense" data-name="${c.name}" onclick="deleteCategory(this.dataset.type,this.dataset.name)">🗑️</button>
          </div>
        </div>`).join('')}
      <button class="btn-secondary" style="width:100%;margin-top:10px" onclick="openAddCat('expense')">+ เพิ่มหมวดหมู่รายจ่าย</button>
    </div>

    <div class="card">
      <div class="section-title">วิธีการชำระเงิน</div>
      ${accounts.map(a => `
        <div class="setting-item">
          <span style="font-size:20px">💳</span>
          <span class="setting-name">${a}</span>
          <button class="setting-del" data-name="${a}" onclick="deleteAccount(this.dataset.name)">🗑️</button>
        </div>`).join('')}
      <button class="btn-secondary" style="width:100%;margin-top:10px" onclick="openAddAccount()">+ เพิ่มวิธีชำระเงิน</button>
    </div>

    <div class="card">
      <div class="section-title">เวอร์ชั่น & อัพเดท</div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0 12px">
        <span style="font-size:22px;font-weight:800;color:var(--primary)">v${APP_VERSION}</span>
        <span style="font-size:12px;color:var(--text-secondary)">บัญชีส่วนตัว</span>
      </div>
      ${CHANGELOG.map((c, i) => `
        <div style="display:flex;gap:10px;padding:8px 0;${i < CHANGELOG.length-1 ? 'border-bottom:1px solid var(--border)' : ''}">
          <div style="min-width:36px;text-align:center">
            <span style="font-size:11px;font-weight:800;color:var(--primary);background:var(--primary-light);padding:2px 6px;border-radius:8px">v${c.v}</span>
          </div>
          <div style="flex:1">
            <div style="font-size:13px;color:var(--text)">${c.note}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${c.date}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

// ---- Category CRUD ----

function openRenameCategory(type, oldName) {
  state._renameCatType = type;
  state._renameCatOld  = oldName;
  document.getElementById('modal-rename-cat-input').value = oldName;
  document.getElementById('modal-rename-cat-title').textContent =
    'เปลี่ยนชื่อ: ' + oldName;
  openModal('modal-rename-cat');
}

function saveRenameCategory() {
  const newName = document.getElementById('modal-rename-cat-input').value.trim();
  const oldName = state._renameCatOld;
  const type    = state._renameCatType;
  if (!newName)          { alert('กรุณาใส่ชื่อใหม่'); return; }
  if (newName === oldName) { closeModal('modal-rename-cat'); return; }

  const data = getData();

  // Rename in categories list
  const cat = (data.categories[type] || []).find(c => c.name === oldName);
  if (cat) cat.name = newName;

  // Rename in all transactions
  data.transactions.forEach(t => {
    if (t.category === oldName) t.category = newName;
  });

  // Rename in budgets
  if (data.budgets && data.budgets[oldName] !== undefined) {
    data.budgets[newName] = data.budgets[oldName];
    delete data.budgets[oldName];
  }

  // Rename in recurring templates
  (data.recurringItems || []).forEach(r => {
    if (r.category === oldName) r.category = newName;
  });

  saveData(data);
  closeModal('modal-rename-cat');
  renderSettings();
  showToast('✓ เปลี่ยนชื่อแล้ว! อัพเดทรายการเก่าครบ');
}

function openAddCat(type) {
  state._addCatType = type;
  document.getElementById('modal-cat-title').textContent = type === 'income' ? 'เพิ่มหมวดหมู่รายรับ' : 'เพิ่มหมวดหมู่รายจ่าย';
  document.getElementById('modal-cat-emoji').value = '';
  document.getElementById('modal-cat-name').value  = '';
  openModal('modal-cat');
}

function saveCategory() {
  const emoji = document.getElementById('modal-cat-emoji').value.trim();
  const name  = document.getElementById('modal-cat-name').value.trim();
  if (!name)  { alert('กรุณาใส่ชื่อหมวดหมู่'); return; }
  if (!emoji) { alert('กรุณาใส่ emoji'); return; }
  const data = getData();
  const type = state._addCatType;
  if (!data.categories[type]) data.categories[type] = [];
  if (data.categories[type].find(c => c.name === name)) { alert('มีหมวดหมู่นี้แล้ว'); return; }
  data.categories[type].push({ name, emoji });
  saveData(data);
  closeModal('modal-cat');
  renderSettings();
}

function deleteCategory(type, name) {
  if (!confirm(`ลบหมวดหมู่ "${name}"?`)) return;
  const data = getData();
  data.categories[type] = (data.categories[type] || []).filter(c => c.name !== name);
  saveData(data);
  renderSettings();
}

// ---- Account CRUD ----

function openAddAccount() {
  document.getElementById('modal-account-input').value = '';
  openModal('modal-account');
}

function saveAccount() {
  const name = document.getElementById('modal-account-input').value.trim();
  if (!name) { alert('กรุณาใส่ชื่อบัญชี/บัตร'); return; }
  const data = getData();
  if (data.accounts.includes(name)) { alert('มีรายการนี้แล้ว'); return; }
  data.accounts.push(name);
  saveData(data);
  closeModal('modal-account');
  renderSettings();
}

function deleteAccount(name) {
  if (!confirm(`ลบ "${name}"?`)) return;
  const data = getData();
  data.accounts = data.accounts.filter(a => a !== name);
  saveData(data);
  renderSettings();
}

// ---- Recurring Quick Add CRUD ----

function openAddRecurring() {
  state._editingRecurringId = null;
  document.getElementById('modal-recurring-name').value   = '';
  document.getElementById('modal-recurring-amount').value = '';
  document.getElementById('modal-recurring-type').value   = 'expense';
  populateRecurringCatSelect('expense');
  populateRecurringAccountSelect();
  openModal('modal-recurring');
}

function populateRecurringCatSelect(type) {
  const { categories } = getData();
  const cats = categories[type] || DEFAULT_CATEGORIES[type];
  document.getElementById('modal-recurring-cat').innerHTML =
    `<option value="">-- เลือกหมวดหมู่ --</option>` +
    cats.map(c => `<option value="${c.name}">${c.emoji} ${c.name}</option>`).join('');
}

function populateRecurringAccountSelect() {
  const { accounts } = getData();
  document.getElementById('modal-recurring-account').innerHTML =
    `<option value="">-- ไม่ระบุบัญชี --</option>` +
    accounts.map(a => `<option value="${a}">${a}</option>`).join('');
}

function onRecurringTypeChange(val) {
  populateRecurringCatSelect(val);
}

function saveRecurring() {
  const name    = document.getElementById('modal-recurring-name').value.trim();
  const amount  = parseFloat(document.getElementById('modal-recurring-amount').value) || 0;
  const type    = document.getElementById('modal-recurring-type').value;
  const category = document.getElementById('modal-recurring-cat').value;
  const account  = document.getElementById('modal-recurring-account').value;
  if (!name) { alert('กรุณาใส่ชื่อ template'); return; }
  const data = getData();
  if (state._editingRecurringId) {
    const idx = data.recurringItems.findIndex(r => r.id === state._editingRecurringId);
    if (idx !== -1) data.recurringItems[idx] = { ...data.recurringItems[idx], name, amount, type, category, account };
  } else {
    data.recurringItems.push({ id: genId(), name, amount, type, category, account });
  }
  saveData(data);
  closeModal('modal-recurring');
  renderSettings();
}

function deleteRecurring(id) {
  if (!confirm('ลบ template นี้?')) return;
  const data = getData();
  data.recurringItems = data.recurringItems.filter(r => r.id !== id);
  saveData(data);
  renderSettings();
}

function renderQuickChips() {
  const items = getData().recurringItems;
  const section = document.getElementById('quick-add-section');
  const wrap = document.getElementById('quick-chips');
  if (!items.length) { section.style.display = 'none'; return; }
  section.style.display = '';
  wrap.innerHTML = items.map(it =>
    `<button class="quick-chip" onclick="applyRecurring('${it.id}')">
      ${it.name}${it.amount ? ' ฿'+fmt(it.amount) : ''}
    </button>`
  ).join('');
}

function applyRecurring(id) {
  const item = getData().recurringItems.find(r => r.id === id);
  if (!item) return;
  state.addType    = item.type;
  state.addCat     = item.category || null;
  state.addAccount = item.account  || null;
  if (item.amount) document.getElementById('form-amount').value = item.amount;
  updateToggle();
  updateCatGrid();
  updateAccountChips();
}

// ===== FIX COST CHECKLIST =====

function renderFixcostChecklist(month, year) {
  const m = month !== undefined ? month : state.salaryMonth;
  const y = year  !== undefined ? year  : state.salaryYear;
  const { fixcostItems, fixcostChecks } = getData();
  const monthKey = `${y}-${String(m + 1).padStart(2,'0')}`;
  const checks   = fixcostChecks[monthKey] || {};
  const container = document.getElementById('fixcost-container');

  if (!fixcostItems.length) {
    container.innerHTML = `
      <div class="empty-state"><div class="emoji">✅</div><p>ยังไม่มีรายการประจำ<br>กด "+ เพิ่มรายการประจำ" ด้านล่าง</p></div>`;
    return;
  }

  const itemsWithAmt  = fixcostItems.filter(i => i.expectedAmount > 0);
  const totalExpected = itemsWithAmt.reduce((s, i) => s + i.expectedAmount, 0);
  const totalPaid     = itemsWithAmt.filter(i => checks[i.id]).reduce((s, i) => s + i.expectedAmount, 0);

  container.innerHTML = `
    <div class="card">
      <div class="fixcost-total">
        <span>จ่ายแล้ว</span>
        <span style="color:var(--income)">฿${fmt(totalPaid)} / ฿${fmt(totalExpected)}</span>
      </div>
      <div class="progress-track" style="margin-bottom:12px">
        <div class="progress-fill" style="width:${totalExpected > 0 ? Math.round(totalPaid/totalExpected*100) : 0}%;background:var(--income)"></div>
      </div>
      ${fixcostItems.map(item => {
        const done = !!checks[item.id];
        return `
          <div class="fixcost-item" onclick="toggleFixcostCheck('${item.id}')">
            <div class="fixcost-check ${done ? 'done' : 'undone'}">${done ? '✅' : ''}</div>
            <div style="flex:1">
              <div style="font-size:14px;font-weight:600">${item.name}</div>
              ${item.expectedAmount > 0 ? `<div style="font-size:12px;color:var(--text-secondary)">฿${fmt(item.expectedAmount)}/เดือน</div>` : ''}
            </div>
            <button class="setting-del" onclick="event.stopPropagation();openEditFixcostItem('${item.id}')">✏️</button>
          </div>`;
      }).join('')}
    </div>`;
}

function _afterFixcostRender() { renderAnnualSection(); }

function toggleFixcostCheck(id) {
  const data = getData();
  const monthKey = `${state.salaryYear}-${String(state.salaryMonth + 1).padStart(2,'0')}`;
  if (!data.fixcostChecks[monthKey]) data.fixcostChecks[monthKey] = {};
  data.fixcostChecks[monthKey][id] = !data.fixcostChecks[monthKey][id];
  saveData(data);
  renderFixcostChecklist();
}

function openAddFixcostItem() {
  state._editingFixcostId = null;
  document.getElementById('modal-fixcost-title').textContent = 'เพิ่มรายการประจำ';
  document.getElementById('modal-fixcost-name').value   = '';
  document.getElementById('modal-fixcost-amount').value = '';
  document.getElementById('delete-fixcost-btn').style.display = 'none';
  openModal('modal-fixcost');
}

function openEditFixcostItem(id) {
  const { fixcostItems } = getData();
  const item = fixcostItems.find(i => i.id === id);
  if (!item) return;
  state._editingFixcostId = id;
  document.getElementById('modal-fixcost-title').textContent = 'แก้ไขรายการประจำ';
  document.getElementById('modal-fixcost-name').value   = item.name;
  document.getElementById('modal-fixcost-amount').value = item.expectedAmount;
  document.getElementById('delete-fixcost-btn').style.display = 'block';
  openModal('modal-fixcost');
}

function saveFixcostItem() {
  const name   = document.getElementById('modal-fixcost-name').value.trim();
  const amount = parseFloat(document.getElementById('modal-fixcost-amount').value.replace(/,/g,''));
  if (!name) { alert('กรุณาใส่ชื่อรายการ'); return; }
  const amountVal = amount > 0 ? amount : 0;
  const data = getData();
  if (state._editingFixcostId) {
    const idx = data.fixcostItems.findIndex(i => i.id === state._editingFixcostId);
    if (idx !== -1) data.fixcostItems[idx] = { ...data.fixcostItems[idx], name, expectedAmount: amountVal };
  } else {
    data.fixcostItems.push({ id: genId(), name, expectedAmount: amountVal });
  }
  saveData(data);
  closeModal('modal-fixcost');
  renderFixcostChecklist();
}

function deleteFixcostItem() {
  if (!state._editingFixcostId) return;
  if (!confirm('ลบรายการนี้?')) return;
  const data = getData();
  data.fixcostItems = data.fixcostItems.filter(i => i.id !== state._editingFixcostId);
  saveData(data);
  state._editingFixcostId = null;
  closeModal('modal-fixcost');
  renderFixcostChecklist();
}

// ===== ANNUAL COSTS =====

const MONTHS_SHORT = ['','ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];

// Months remaining from NOW until next payMonth occurrence
function _monthsUntilPay(payMonth) {
  const m = new Date().getMonth() + 1;
  const diff = payMonth - m;
  if (diff > 0) return diff;
  if (diff < 0) return 12 + diff;
  return 12; // same month → already paying, plan for next year
}

function renderAnnualSection() {
  const items    = getData().annualCosts || [];
  const container = document.getElementById('annual-container');
  if (!items.length) {
    container.innerHTML = `<div style="text-align:center;padding:16px;color:#9E9E9E;font-size:13px">ยังไม่มีรายการรายปี</div>`;
    return;
  }
  const now      = new Date();
  const nowYear  = now.getFullYear();
  const nowMonth = now.getMonth() + 1;

  container.innerHTML = items.map(item => {
    const savedAmt   = item.savedAmount || 0;
    const pct        = item.yearlyAmount > 0 ? Math.min(100, Math.round(savedAmt / item.yearlyAmount * 100)) : 0;
    const isDueMonth = nowMonth === item.payMonth;
    const isDue      = isDueMonth && (item.lastPaidYear || 0) < nowYear;
    const checks     = item.monthlyChecks || {};
    const curKey     = `${nowYear}-${String(nowMonth).padStart(2,'0')}`;
    const checkedNow = !!checks[curKey];
    const remaining  = Math.max(0, item.yearlyAmount - savedAmt);
    const barColor   = pct >= 100 ? '#2ecc71' : (isDue ? '#FF6F00' : 'var(--primary)');
    // Smart monthly: remaining ÷ months left until payment
    const mLeft      = isDue ? 0 : _monthsUntilPay(item.payMonth);
    const monthly    = (remaining > 0 && mLeft > 0) ? Math.ceil(remaining / mLeft) : 0;
    const monthlyLabel = pct >= 100 ? 'เก็บครบแล้ว 🎉' : `฿${monthly.toLocaleString()}/เดือน (อีก ${mLeft} เดือน)`;

    return `
    <div class="card" style="margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div>
          <div style="font-size:15px;font-weight:700">${item.name}</div>
          <div style="font-size:12px;color:#9E9E9E">฿${item.yearlyAmount.toLocaleString()}/ปี · จ่าย${MONTHS_SHORT[item.payMonth]} · ${monthlyLabel}</div>
        </div>
        <button class="setting-del" onclick="openAnnualModal('${item.id}')">✏️</button>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <span style="font-size:12px;color:#9E9E9E">เก็บได้แล้ว <b style="color:#212121">฿${savedAmt.toLocaleString()}</b> / ฿${item.yearlyAmount.toLocaleString()}</span>
        <span style="font-size:12px;font-weight:800;color:${barColor}">${pct}%</span>
      </div>
      <div class="goal-progress-bar" style="margin-bottom:8px">
        <div class="goal-progress-fill" style="width:${pct}%;background:${barColor}"></div>
      </div>

      ${isDue ? `
        <div style="background:#FFF3E0;border-radius:8px;padding:10px 12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:13px;font-weight:700;color:#E65100">⚠️ ถึงเวลาจ่ายแล้ว!</span>
          <button onclick="payAnnualCost('${item.id}')" style="background:#FF6F00;color:white;border:none;border-radius:8px;padding:6px 14px;font-size:12px;font-weight:700;cursor:pointer">จ่ายแล้ว ✓</button>
        </div>` : pct >= 100 ? `
        <div style="background:#E8F5E9;border-radius:8px;padding:8px 12px;font-size:13px;font-weight:700;color:#2e7d32">✅ เก็บครบแล้ว รอวันจ่าย${MONTHS_SHORT[item.payMonth]}</div>` : `
        <div style="display:flex;align-items:center;gap:8px;cursor:pointer" onclick="toggleAnnualCheck('${item.id}')">
          <div class="fixcost-check ${checkedNow ? 'done' : 'undone'}" style="width:24px;height:24px;flex-shrink:0">${checkedNow ? '✅' : ''}</div>
          <span style="font-size:13px;color:#212121">${checkedNow ? 'เดือนนี้เก็บแล้ว' : 'เดือนนี้ยังไม่ได้เก็บ'} (฿${monthly.toLocaleString()})</span>
        </div>`}
    </div>`;
  }).join('');
}

function toggleAnnualCheck(id) {
  const data = getData();
  if (!data.annualCosts) return;
  const item = data.annualCosts.find(i => i.id === id);
  if (!item) return;
  if (!item.monthlyChecks) item.monthlyChecks = {};
  const now  = new Date();
  const key  = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const wasChecked = !!item.monthlyChecks[key];
  if (!wasChecked) {
    // Calculate smart monthly at time of checking
    const remaining = Math.max(0, item.yearlyAmount - (item.savedAmount || 0));
    const mLeft     = _monthsUntilPay(item.payMonth);
    const monthly   = (remaining > 0 && mLeft > 0) ? Math.ceil(remaining / mLeft) : 0;
    item.monthlyChecks[key] = monthly; // store amount used
    item.savedAmount = (item.savedAmount || 0) + monthly;
  } else {
    // Backward compat: old data stored true/false, new stores number
    const prevAmt = typeof item.monthlyChecks[key] === 'number'
      ? item.monthlyChecks[key]
      : Math.ceil(item.yearlyAmount / 12);
    item.savedAmount = Math.max(0, (item.savedAmount || 0) - prevAmt);
    delete item.monthlyChecks[key];
  }
  saveData(data);
  renderAnnualSection();
}

function payAnnualCost(id) {
  if (!confirm('ยืนยันว่าจ่ายแล้ว? ระบบจะสร้างรายจ่ายให้อัตโนมัติ')) return;
  const data = getData();
  const item = (data.annualCosts || []).find(i => i.id === id);
  if (!item) return;
  const now  = new Date();
  const date = now.toISOString().slice(0, 10);
  data.transactions.push({ id: genId(), type: 'expense', category: 'Fix cost', amount: item.yearlyAmount, account: item.account || '', date, note: `${item.name} (รายปี)`, createdAt: Date.now() });
  item.lastPaidYear  = now.getFullYear();
  item.monthlyChecks = {};
  item.savedAmount   = 0;
  saveData(data);
  renderAnnualSection();
  showToast(`บันทึกรายจ่าย ${item.name} ฿${item.yearlyAmount.toLocaleString()} แล้ว ✅`);
}

function openAnnualModal(id) {
  state._editingAnnualId = id || null;
  const delBtn = document.getElementById('delete-annual-btn');
  if (id) {
    const item = (getData().annualCosts || []).find(i => i.id === id);
    if (!item) return;
    document.getElementById('modal-annual-title').textContent = '📅 แก้ไขรายการรายปี';
    document.getElementById('annual-name').value      = item.name;
    document.getElementById('annual-amount').value    = item.yearlyAmount;
    document.getElementById('annual-saved').value     = item.savedAmount || 0;
    document.getElementById('annual-pay-month').value = item.payMonth;
    delBtn.style.display = 'block';
  } else {
    document.getElementById('modal-annual-title').textContent = '📅 เพิ่มรายการรายปี';
    document.getElementById('annual-name').value      = '';
    document.getElementById('annual-amount').value    = '';
    document.getElementById('annual-saved').value     = '0';
    document.getElementById('annual-pay-month').value = new Date().getMonth() + 1;
    delBtn.style.display = 'none';
  }
  openModal('modal-annual');
}

function saveAnnualItem() {
  const name        = document.getElementById('annual-name').value.trim();
  const amount      = parseFloat(document.getElementById('annual-amount').value.replace(/,/g,''));
  const savedAmount = parseFloat(document.getElementById('annual-saved').value.replace(/,/g,'')) || 0;
  const payMonth    = parseInt(document.getElementById('annual-pay-month').value);
  if (!name)               { alert('กรุณากรอกชื่อรายการ'); return; }
  if (!amount || amount<=0){ alert('กรุณากรอกยอดรายปี'); return; }
  const data = getData();
  if (!data.annualCosts) data.annualCosts = [];
  // Defensive: Firebase may return array-like object
  if (!Array.isArray(data.annualCosts)) data.annualCosts = Object.values(data.annualCosts);
  if (state._editingAnnualId) {
    const idx = data.annualCosts.findIndex(i => i.id === state._editingAnnualId);
    if (idx !== -1) {
      data.annualCosts[idx] = { ...data.annualCosts[idx], name, yearlyAmount: amount, savedAmount, payMonth };
    } else {
      showToast('⚠️ ไม่พบรายการ กรุณาลองใหม่');
      state._editingAnnualId = null;
      closeModal('modal-annual');
      return;
    }
  } else {
    data.annualCosts.push({ id: genId(), name, yearlyAmount: amount, savedAmount, payMonth, monthlyChecks: {}, lastPaidYear: null });
  }
  saveData(data);
  state._editingAnnualId = null;
  closeModal('modal-annual');
  renderAnnualSection();
  showToast(`✅ บันทึก ${name} เก็บแล้ว ฿${savedAmount.toLocaleString()}`);
}

function deleteAnnualItem() {
  if (!state._editingAnnualId) return;
  if (!confirm('ลบรายการนี้?')) return;
  const data = getData();
  data.annualCosts = (data.annualCosts || []).filter(i => i.id !== state._editingAnnualId);
  saveData(data);
  state._editingAnnualId = null;
  closeModal('modal-annual');
  renderAnnualSection();
}

// ===== SAVINGS GOALS =====

function _goalMonthsLeft(deadlineMonth, deadlineYear) {
  if (!deadlineMonth || !deadlineYear) return null;
  const now = new Date();
  const months = (deadlineYear - now.getFullYear()) * 12 + (deadlineMonth - (now.getMonth() + 1));
  return months > 0 ? months : 0;
}

function renderGoalsTab() {
  const goals = getData().savingsGoals || [];
  const container = document.getElementById('goals-container');
  if (!goals.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:48px 24px 32px;display:flex;flex-direction:column;align-items:center;gap:14px">
        <div style="font-size:52px">🏦</div>
        <div style="font-size:16px;font-weight:700;color:#212121">ยังไม่มีเป้าหมาย</div>
        <div style="font-size:13px;color:#9E9E9E;line-height:1.6">ตั้งเป้าหมายการเก็บเงิน<br>ติดตาม progress ได้ในหน้านี้</div>
        <button onclick="openGoalModal()" class="btn-primary" style="margin-top:8px;padding:14px 32px;font-size:15px">+ เพิ่มเป้าหมายแรก</button>
      </div>`;
    return;
  }
  const MONTHS_TH_SHORT = ['','ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  container.innerHTML = goals.map(g => {
    const pct  = g.targetAmount > 0 ? Math.min(100, Math.round((g.savedAmount / g.targetAmount) * 100)) : 0;
    const done = pct >= 100;
    const remaining = Math.max(0, g.targetAmount - g.savedAmount);
    const monthsLeft = _goalMonthsLeft(g.deadlineMonth, g.deadlineYear);
    const perMonth = (monthsLeft > 0 && !done) ? Math.ceil(remaining / monthsLeft) : null;
    const deadlineStr = g.deadlineMonth ? `${MONTHS_TH_SHORT[g.deadlineMonth]} ${g.deadlineYear ? (g.deadlineYear + 543).toString().slice(-2) : ''}` : '';
    const urgentColor = monthsLeft !== null && monthsLeft <= 3 && !done ? '#FF1744' : 'var(--primary)';
    return `
    <div class="card goal-card" onclick="openGoalModal('${g.id}')">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div style="font-size:15px;font-weight:700">${done ? '✅ ' : ''}${g.name}</div>
        <div style="font-size:12px;font-weight:800;color:${done ? '#2ecc71' : urgentColor}">${pct}%</div>
      </div>
      <div class="goal-progress-bar">
        <div class="goal-progress-fill" style="width:${pct}%;background:${done ? '#2ecc71' : urgentColor}"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:13px;color:#9E9E9E">
        <span>เก็บได้ <b style="color:#212121">฿${Number(g.savedAmount).toLocaleString()}</b></span>
        <span>เป้า <b style="color:#212121">฿${Number(g.targetAmount).toLocaleString()}</b></span>
      </div>
      ${(deadlineStr || perMonth) ? `
      <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;padding-top:6px;border-top:1px solid #F0F0F0">
        ${deadlineStr ? `<span style="color:#9E9E9E">🗓 ภายใน ${deadlineStr}${monthsLeft !== null ? ` (${monthsLeft} เดือน)` : ''}</span>` : '<span></span>'}
        ${perMonth ? `<span style="color:${urgentColor};font-weight:700">เดือนละ ฿${perMonth.toLocaleString()}</span>` : (done ? '<span style="color:#2ecc71;font-weight:700">สำเร็จแล้ว! 🎉</span>' : '')}
      </div>` : ''}
    </div>`;
  }).join('');
}

function openGoalModal(id) {
  state.editingGoalId = id || null;
  const titleEl = document.getElementById('modal-goal-title');
  const delBtn  = document.getElementById('delete-goal-btn');
  // populate year dropdown (ปีนี้ถึง +5)
  const yearSel = document.getElementById('goal-deadline-year');
  const curYear = new Date().getFullYear();
  yearSel.innerHTML = '<option value="">-- ปี --</option>' +
    Array.from({length: 6}, (_, i) => curYear + i).map(y => `<option value="${y}">${y + 543}</option>`).join('');
  if (id) {
    const goal = (getData().savingsGoals || []).find(g => g.id === id);
    if (!goal) return;
    titleEl.textContent = 'แก้ไขเป้าหมาย';
    document.getElementById('goal-name').value   = goal.name;
    document.getElementById('goal-target').value = goal.targetAmount;
    document.getElementById('goal-saved').value  = goal.savedAmount;
    document.getElementById('goal-deadline-month').value = goal.deadlineMonth || '';
    yearSel.value = goal.deadlineYear || '';
    delBtn.style.display = 'block';
  } else {
    titleEl.textContent = 'เพิ่มเป้าหมายการเก็บเงิน';
    document.getElementById('goal-name').value   = '';
    document.getElementById('goal-target').value = '';
    document.getElementById('goal-saved').value  = '';
    document.getElementById('goal-deadline-month').value = '';
    yearSel.value = '';
    delBtn.style.display = 'none';
  }
  openModal('modal-goal');
}

function saveGoal() {
  const name          = document.getElementById('goal-name').value.trim();
  const target        = parseFloat(document.getElementById('goal-target').value.replace(/,/g,''));
  const saved         = parseFloat(document.getElementById('goal-saved').value.replace(/,/g,'')) || 0;
  const deadlineMonth = parseInt(document.getElementById('goal-deadline-month').value) || null;
  const deadlineYear  = parseInt(document.getElementById('goal-deadline-year').value)  || null;
  if (!name)              { alert('กรุณากรอกชื่อเป้าหมาย'); return; }
  if (!target || target <= 0) { alert('กรุณากรอกจำนวนเงินเป้าหมาย'); return; }
  if ((deadlineMonth && !deadlineYear) || (!deadlineMonth && deadlineYear)) { alert('กรุณาเลือกทั้งเดือนและปี'); return; }
  const data = getData();
  if (!data.savingsGoals) data.savingsGoals = [];
  const goalObj = { name, targetAmount: target, savedAmount: saved, deadlineMonth, deadlineYear };
  if (state.editingGoalId) {
    const idx = data.savingsGoals.findIndex(g => g.id === state.editingGoalId);
    if (idx !== -1) data.savingsGoals[idx] = { ...data.savingsGoals[idx], ...goalObj };
  } else {
    data.savingsGoals.push({ id: genId(), ...goalObj });
  }
  saveData(data);
  state.editingGoalId = null;
  closeModal('modal-goal');
  renderGoalsTab();
}

function deleteGoal() {
  if (!state.editingGoalId) return;
  if (!confirm('ลบเป้าหมายนี้?')) return;
  const data = getData();
  data.savingsGoals = (data.savingsGoals || []).filter(g => g.id !== state.editingGoalId);
  saveData(data);
  state.editingGoalId = null;
  closeModal('modal-goal');
  renderGoalsTab();
}

// ===== FUEL LOG =====

const FUEL_STATIONS = ['ปตท.','เชลล์','PT','บางจาก','เอสโซ่','คาลเท็กซ์','ซัสโก้'];

function onFuelStationChange(val) {
  const txt = document.getElementById('fuel-station');
  if (val === 'อื่นๆ') { txt.style.display = 'block'; txt.value = ''; txt.focus(); }
  else { txt.style.display = 'none'; txt.value = val; }
}

function renderFuelTab() {
  const logs = (getData().fuelLogs || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const container = document.getElementById('fuel-container');
  const summaryEl = document.getElementById('fuel-summary');

  if (!logs.length) {
    summaryEl.style.display = 'none';
    container.innerHTML = `
      <div style="text-align:center;padding:48px 24px 32px;display:flex;flex-direction:column;align-items:center;gap:14px">
        <div style="font-size:52px">⛽</div>
        <div style="font-size:16px;font-weight:700;color:#212121">ยังไม่มีประวัติการเติมน้ำมัน</div>
        <div style="font-size:13px;color:#9E9E9E;line-height:1.6">บันทึกทุกครั้งที่เติม<br>ระบบคำนวณอัตราสิ้นเปลืองให้อัตโนมัติ</div>
        <button onclick="openFuelModal()" class="btn-primary" style="margin-top:8px;padding:14px 32px;font-size:15px">+ บันทึกครั้งแรก</button>
      </div>`;
    return;
  }

  // Summary — คำนวณจาก distanceKm (ระยะต่อถัง) โดยตรง
  const withDist = logs.filter(l => l.distanceKm > 0 && l.liters > 0);
  if (withDist.length) {
    const totalKm     = withDist.reduce((s, l) => s + l.distanceKm, 0);
    const totalLiters = withDist.reduce((s, l) => s + l.liters, 0);
    const totalCost   = withDist.reduce((s, l) => s + l.cost, 0);
    const avgKmL  = (totalKm / totalLiters).toFixed(1);
    const avgBaht = (totalCost / totalKm).toFixed(2);
    summaryEl.style.display = 'block';
    summaryEl.innerHTML = `
      <div class="section-title" style="margin-bottom:10px">📊 สรุปภาพรวม</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center">
        <div><div style="font-size:11px;color:#9E9E9E;margin-bottom:2px">เฉลี่ย</div><div style="font-size:18px;font-weight:800;color:var(--primary)">${avgKmL}</div><div style="font-size:10px;color:#9E9E9E">กม./ลิตร</div></div>
        <div><div style="font-size:11px;color:#9E9E9E;margin-bottom:2px">ค่าใช้จ่าย</div><div style="font-size:18px;font-weight:800;color:#FF1744">${avgBaht}</div><div style="font-size:10px;color:#9E9E9E">บาท/กม.</div></div>
        <div><div style="font-size:11px;color:#9E9E9E;margin-bottom:2px">บันทึกแล้ว</div><div style="font-size:18px;font-weight:800;color:#212121">${logs.length}</div><div style="font-size:10px;color:#9E9E9E">ครั้ง</div></div>
      </div>`;
  } else {
    summaryEl.style.display = 'none';
  }

  container.innerHTML = logs.map(log => {
    const km  = log.distanceKm || log.odometer || null; // backward compat
    const kmL = (km && km > 0 && log.liters) ? (km / log.liters).toFixed(1) : null;
    const dateStr = log.date ? new Date(log.date + 'T00:00:00').toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' }) : '';
    return `
    <div class="card fuel-card" onclick="openFuelModal('${log.id}')">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-size:13px;color:#9E9E9E">${dateStr}${log.station ? ' · ' + log.station : ''}</div>
          <div style="font-size:15px;font-weight:700;margin-top:2px">${log.fuelType} · ${log.liters} ลิตร</div>
          ${km ? `<div style="font-size:13px;color:#9E9E9E;margin-top:2px">วิ่ง ${km.toLocaleString()} กม.</div>` : ''}
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:15px;font-weight:800;color:#FF1744">฿${log.cost.toLocaleString()}</div>
          ${kmL ? `<div style="font-size:13px;font-weight:700;color:var(--primary);margin-top:2px">${kmL} กม./ล.</div>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}

function _setFuelStationUI(station) {
  const sel = document.getElementById('fuel-station-select');
  const txt = document.getElementById('fuel-station');
  if (!station) { sel.value = ''; txt.style.display = 'none'; txt.value = ''; return; }
  if (FUEL_STATIONS.includes(station)) { sel.value = station; txt.style.display = 'none'; txt.value = station; }
  else { sel.value = 'อื่นๆ'; txt.style.display = 'block'; txt.value = station; }
}

function openFuelModal(id) {
  state.editingFuelId = id || null;
  const delBtn  = document.getElementById('delete-fuel-btn');
  const titleEl = document.getElementById('modal-fuel-title');
  const { accounts } = getData();
  const accSel  = document.getElementById('fuel-account');
  accSel.innerHTML = (accounts || []).map(a => `<option value="${a}">${a}</option>`).join('');
  if (id) {
    const log = (getData().fuelLogs || []).find(l => l.id === id);
    if (!log) return;
    titleEl.textContent = '⛽ แก้ไขการเติมน้ำมัน';
    document.getElementById('fuel-date').value     = log.date;
    document.getElementById('fuel-odometer').value = log.distanceKm || log.odometer || '';
    document.getElementById('fuel-liters').value   = log.liters;
    document.getElementById('fuel-cost').value     = log.cost;
    document.getElementById('fuel-type').value     = log.fuelType;
    accSel.value = log.account || (accounts && accounts[0]) || '';
    _setFuelStationUI(log.station || '');
    delBtn.style.display = 'block';
  } else {
    titleEl.textContent = '⛽ บันทึกการเติมน้ำมัน';
    document.getElementById('fuel-date').value     = new Date().toISOString().slice(0, 10);
    document.getElementById('fuel-odometer').value = '';
    document.getElementById('fuel-liters').value   = '';
    document.getElementById('fuel-cost').value     = '';
    document.getElementById('fuel-type').value     = '95';
    accSel.value = accounts && accounts[0] ? accounts[0] : '';
    _setFuelStationUI('');
    delBtn.style.display = 'none';
  }
  openModal('modal-fuel');
}

function saveFuel() {
  const date        = document.getElementById('fuel-date').value;
  const distanceKm  = parseFloat(document.getElementById('fuel-odometer').value) || 0;
  const liters      = parseFloat(document.getElementById('fuel-liters').value);
  const cost        = parseFloat(document.getElementById('fuel-cost').value);
  const fuelType    = document.getElementById('fuel-type').value;
  const account     = document.getElementById('fuel-account').value;
  const stationSel  = document.getElementById('fuel-station-select').value;
  const stationTxt  = document.getElementById('fuel-station').value.trim();
  const station     = stationSel === 'อื่นๆ' ? stationTxt : (stationSel || '');
  if (!date)                  { alert('กรุณาเลือกวันที่'); return; }
  if (!liters || liters <= 0) { alert('กรุณากรอกจำนวนลิตร'); return; }
  if (!cost || cost <= 0)     { alert('กรุณากรอกราคารวม'); return; }

  const data = getData();
  if (!data.fuelLogs) data.fuelLogs = [];
  if (!data.transactions) data.transactions = [];

  const txNote = `เติมน้ำมัน ${fuelType} ${liters} ลิตร${station ? ' · ' + station : ''}`;

  if (state.editingFuelId) {
    const idx = data.fuelLogs.findIndex(l => l.id === state.editingFuelId);
    if (idx !== -1) {
      const old = data.fuelLogs[idx];
      data.fuelLogs[idx] = { ...old, date, distanceKm, liters, cost, fuelType, account, station };
      if (old.txId) {
        const tIdx = data.transactions.findIndex(t => t.id === old.txId);
        if (tIdx !== -1) data.transactions[tIdx] = { ...data.transactions[tIdx], date, amount: cost, account, note: txNote };
      }
    }
  } else {
    const txId = genId();
    data.transactions.push({ id: txId, type: 'expense', category: 'BRV', amount: cost, account, date, note: txNote, createdAt: Date.now() });
    data.fuelLogs.push({ id: genId(), date, distanceKm, liters, cost, fuelType, account, station, txId });
  }

  saveData(data);
  state.editingFuelId = null;
  closeModal('modal-fuel');
  renderFuelTab();
}

function deleteFuel() {
  if (!state.editingFuelId) return;
  if (!confirm('ลบรายการนี้? (รายจ่าย BRV ที่เชื่อมไว้จะถูกลบด้วย)')) return;
  const data = getData();
  const log  = (data.fuelLogs || []).find(l => l.id === state.editingFuelId);
  // ลบ transaction ที่เชื่อมด้วย
  if (log && log.txId) data.transactions = data.transactions.filter(t => t.id !== log.txId);
  data.fuelLogs = (data.fuelLogs || []).filter(l => l.id !== state.editingFuelId);
  saveData(data);
  state.editingFuelId = null;
  closeModal('modal-fuel');
  renderFuelTab();
}

// ---- Modal helpers ----

function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// ===== EXPORT CSV =====

function exportCSV() {
  const { transactions } = getData();
  if (!transactions.length) { alert('ไม่มีข้อมูลให้ export'); return; }
  const rows = [['วันที่','ประเภท','หมวดหมู่','บัญชี/บัตร','จำนวน (บาท)','หมายเหตุ']];
  [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(t => rows.push([t.date, t.type === 'income' ? 'รายรับ' : 'รายจ่าย', t.category, t.account || '', t.amount, t.note || '']));
  const csv  = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `บัญชีส่วนตัว_${todayStr()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

// ===== INIT =====

document.addEventListener('DOMContentLoaded', async () => {

  // Bottom nav
  document.querySelectorAll('#bottom-nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.page === 'add') state.editingId = null;
      navigate(btn.dataset.page);
    });
  });

  // Dashboard month nav
  document.getElementById('dash-prev').addEventListener('click', () => {
    state.dashMonth--; if (state.dashMonth < 0) { state.dashMonth = 11; state.dashYear--; } renderDashboard();
  });
  document.getElementById('dash-next').addEventListener('click', () => {
    state.dashMonth++; if (state.dashMonth > 11) { state.dashMonth = 0; state.dashYear++; } renderDashboard();
  });

  // List month nav
  document.getElementById('list-prev').addEventListener('click', () => {
    state.listMonth--; if (state.listMonth < 0) { state.listMonth = 11; state.listYear--; } renderList();
  });
  document.getElementById('list-next').addEventListener('click', () => {
    state.listMonth++; if (state.listMonth > 11) { state.listMonth = 0; state.listYear++; } renderList();
  });

  // Chart month nav
  document.getElementById('chart-prev').addEventListener('click', () => {
    state.chartMonth--; if (state.chartMonth < 0) { state.chartMonth = 11; state.chartYear--; } renderReports();
  });
  document.getElementById('chart-next').addEventListener('click', () => {
    state.chartMonth++; if (state.chartMonth > 11) { state.chartMonth = 0; state.chartYear++; } renderReports();
  });

  // Salary month nav
  document.getElementById('salary-prev').addEventListener('click', () => {
    state.salaryMonth--; if (state.salaryMonth < 0) { state.salaryMonth = 11; state.salaryYear--; } renderSalaryPage();
  });
  document.getElementById('salary-next').addEventListener('click', () => {
    state.salaryMonth++; if (state.salaryMonth > 11) { state.salaryMonth = 0; state.salaryYear++; } renderSalaryPage();
  });

  // Type toggle
  document.getElementById('toggle-expense').addEventListener('click', () => {
    state.addType = 'expense'; state.addCat = null; updateToggle(); updateCatGrid();
  });
  document.getElementById('toggle-income').addEventListener('click', () => {
    state.addType = 'income'; state.addCat = null; updateToggle(); updateCatGrid();
  });

  // List filters
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.listFilter = chip.dataset.filter;
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderList();
    });
  });

  // List search
  document.getElementById('list-search').addEventListener('input', e => {
    state.listSearch = e.target.value; renderList();
  });

  // Settings button
  document.getElementById('settings-btn').addEventListener('click', openSettings);
  document.getElementById('settings-back').addEventListener('click', () => navigate('dashboard'));

  // Buttons
  document.getElementById('save-btn').addEventListener('click', saveTransaction);
  document.getElementById('delete-btn').addEventListener('click', deleteTransaction);
  document.getElementById('export-btn').addEventListener('click', exportCSV);

  // Close modals on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // Sync from Firebase first, then start app
  await initSync();
  _seedGadgetItems();

  // Apply theme before render
  applyTheme();

  // Init month states using billing cycle
  const cm = cycleCurrentMonth();
  state.dashMonth = state.listMonth = state.chartMonth = cm.month;
  state.dashYear  = state.listYear  = state.chartYear  = cm.year;

  // Start
  navigate('dashboard');
  updateHeaderTitle();

  // Swipe navigation
  const mainEl = document.getElementById('main');
  const swipePages = ['dashboard', 'add', 'list', 'charts', 'salary'];
  let _swipeX = 0;
  mainEl.addEventListener('touchstart', e => { _swipeX = e.touches[0].clientX; }, { passive: true });
  mainEl.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - _swipeX;
    if (Math.abs(dx) < 60) return;
    const cur = swipePages.indexOf(state.page);
    if (cur === -1) return;
    if (dx < -60 && cur < swipePages.length - 1) navigate(swipePages[cur + 1], 'left');
    if (dx >  60 && cur > 0)                     navigate(swipePages[cur - 1], 'right');
  }, { passive: true });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
