// ===== VERSION =====

const APP_VERSION = '2.4';
const CHANGELOG = [
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
  return { ...data,
    budgets:      _decodeKeys(data.budgets      || {}),
    fixcostChecks:_decodeKeys(data.fixcostChecks|| {}),
  };
}

function saveData(data) {
  _appData = data;
  _lastSaveTime = Date.now();
  localStorage.setItem('financeApp_v1', JSON.stringify(data));
  if (window._db) {
    setSyncStatus('saving');
    window._db.ref('appData').set(toFirebase(data))
      .then(() => setSyncStatus('ok'))
      .catch(() => setSyncStatus('offline'));
  } else {
    setSyncStatus('offline');
  }
}

function reRenderPage() {
  const p = state.page;
  if (p === 'dashboard') renderDashboard();
  else if (p === 'list') renderList();
  else if (p === 'charts') renderReports();
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
      if (Date.now() - _lastSaveTime < 3000) return;
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

const PAGE_ORDER = ['dashboard', 'add', 'list', 'charts'];

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
  const isMain = ['dashboard','add','list','charts'].includes(page);
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

  if (page === 'dashboard') renderDashboard();
  if (page === 'add' && !state.editingId) resetForm();
  if (page === 'list')     renderList();
  if (page === 'charts')   renderReports();
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
  document.getElementById('delete-btn').style.display = 'none';
  removeSlip();
  updateToggle();
  updateCatGrid();
  updateAccountChips();
  renderInstallDropdown();
  renderQuickChips();
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

function saveTransaction() {
  const rawAmt = document.getElementById('form-amount').value.replace(/,/g, '');
  const amount  = parseFloat(rawAmt);
  const date    = document.getElementById('form-date').value;
  const note    = document.getElementById('form-note').value.trim();

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
        account: state.addAccount || '', date, note
      };
      if (slipFile) _uploadSlipBackground(state.editingId, slipFile);
    }
  } else {
    const txId = genId();
    data.transactions.push({
      id: txId, type: state.addType, amount, category: state.addCat,
      account: state.addAccount || '', date, note, slipUrl: '', createdAt: Date.now()
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
  removeSlip();
  navigate('add');
  resetForm();
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
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  ['charts','budget','install','fixcost','goals'].forEach(id => {
    document.getElementById(`tab-${id}`).style.display = id === tab ? 'block' : 'none';
  });
  if (tab === 'charts')  { renderBarChart(); renderDailyChart(); renderPieChart(); }
  if (tab === 'budget')  renderBudget();
  if (tab === 'install') renderInstalls();
  if (tab === 'fixcost') renderFixcostChecklist();
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
  const minW = document.getElementById('daily-chart-scroll').clientWidth || 320;
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
  const activeInstalls = installments.filter(i => i.paidMonths < i.totalMonths);
  const monthlyTotal   = activeInstalls.reduce((s, i) => s + i.amountPerMonth, 0);
  container.innerHTML  = `
    <div class="install-summary">ผ่อนรวม/เดือน <strong>฿${fmt(monthlyTotal)}</strong></div>
    ${installments.map(inst => {
      const remaining      = Math.max(0, inst.totalMonths - inst.paidMonths);
      const totalRemaining = remaining * inst.amountPerMonth;
      const pct            = Math.round((inst.paidMonths / inst.totalMonths) * 100);
      const done           = remaining === 0;
      return `
        <div class="install-card" onclick="openInstallEdit('${inst.id}')">
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
          ${inst.account ? `<div class="install-account">${inst.account}</div>` : ''}
        </div>`;
    }).join('')}`;
}

function openInstallAdd() {
  state.editingInstallId = null;
  document.getElementById('modal-install-title').textContent = 'เพิ่มรายการผ่อน';
  document.getElementById('install-name').value   = '';
  document.getElementById('install-total').value  = '';
  document.getElementById('install-paid').value   = '0';
  document.getElementById('install-amount').value = '';
  document.getElementById('install-note').value   = '';
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
  document.getElementById('install-name').value   = inst.name;
  document.getElementById('install-total').value  = inst.totalMonths;
  document.getElementById('install-paid').value   = inst.paidMonths;
  document.getElementById('install-amount').value = inst.amountPerMonth;
  document.getElementById('install-note').value   = inst.note || '';
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
  const name   = document.getElementById('install-name').value.trim();
  const total  = parseInt(document.getElementById('install-total').value);
  const paid   = parseInt(document.getElementById('install-paid').value);
  const amount = parseFloat(document.getElementById('install-amount').value.replace(/,/g,''));
  const acc    = document.getElementById('install-account').value;
  const note   = document.getElementById('install-note').value.trim();

  if (!name)                        { alert('กรุณาใส่ชื่อรายการ'); return; }
  if (!total || total <= 0)         { alert('กรุณาใส่จำนวนงวด'); return; }
  if (isNaN(paid) || paid < 0)      { alert('กรุณาใส่งวดที่ผ่อนแล้ว'); return; }
  if (!amount || amount <= 0)        { alert('กรุณาใส่ยอดต่องวด'); return; }
  if (paid > total)                  { alert('งวดที่ผ่อนแล้วมากกว่าจำนวนงวดทั้งหมด'); return; }

  const data = getData();
  if (state.editingInstallId) {
    const idx = data.installments.findIndex(i => i.id === state.editingInstallId);
    if (idx !== -1) data.installments[idx] = { ...data.installments[idx], name, totalMonths: total, paidMonths: paid, amountPerMonth: amount, account: acc, note };
  } else {
    data.installments.push({ id: genId(), name, totalMonths: total, paidMonths: paid, amountPerMonth: amount, account: acc, note });
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

function renderFixcostChecklist() {
  const { fixcostItems, fixcostChecks } = getData();
  const monthKey = `${state.chartYear}-${String(state.chartMonth + 1).padStart(2,'0')}`;
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

function toggleFixcostCheck(id) {
  const data = getData();
  const monthKey = `${state.chartYear}-${String(state.chartMonth + 1).padStart(2,'0')}`;
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

// ===== SAVINGS GOALS =====

function renderGoalsTab() {
  const goals = getData().savingsGoals || [];
  const container = document.getElementById('goals-container');
  if (!goals.length) {
    container.innerHTML = '<div style="text-align:center;padding:32px 16px;color:#9E9E9E;font-size:14px">ยังไม่มีเป้าหมาย<br>กด "+ เพิ่มเป้าหมาย" เพื่อเริ่มต้น</div>';
    return;
  }
  container.innerHTML = goals.map(g => {
    const pct = g.targetAmount > 0 ? Math.min(100, Math.round((g.savedAmount / g.targetAmount) * 100)) : 0;
    const done = pct >= 100;
    return `
    <div class="card goal-card" onclick="openGoalModal('${g.id}')">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div style="font-size:15px;font-weight:700">${done ? '✅ ' : ''}${g.name}</div>
        <div style="font-size:12px;font-weight:800;color:${done ? 'var(--income-color,#2ecc71)' : 'var(--primary)'}">${pct}%</div>
      </div>
      <div class="goal-progress-bar">
        <div class="goal-progress-fill" style="width:${pct}%;background:${done ? '#2ecc71' : 'var(--primary)'}"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:13px;color:#9E9E9E">
        <span>เก็บได้ <b style="color:var(--text-color,#212121)">฿${Number(g.savedAmount).toLocaleString()}</b></span>
        <span>เป้า <b style="color:var(--text-color,#212121)">฿${Number(g.targetAmount).toLocaleString()}</b></span>
      </div>
    </div>`;
  }).join('');
}

function openGoalModal(id) {
  state.editingGoalId = id || null;
  const titleEl = document.getElementById('modal-goal-title');
  const delBtn  = document.getElementById('delete-goal-btn');
  if (id) {
    const goal = (getData().savingsGoals || []).find(g => g.id === id);
    if (!goal) return;
    titleEl.textContent = 'แก้ไขเป้าหมาย';
    document.getElementById('goal-name').value   = goal.name;
    document.getElementById('goal-target').value = goal.targetAmount;
    document.getElementById('goal-saved').value  = goal.savedAmount;
    delBtn.style.display = 'block';
  } else {
    titleEl.textContent = 'เพิ่มเป้าหมายการเก็บเงิน';
    document.getElementById('goal-name').value   = '';
    document.getElementById('goal-target').value = '';
    document.getElementById('goal-saved').value  = '';
    delBtn.style.display = 'none';
  }
  openModal('modal-goal');
}

function saveGoal() {
  const name   = document.getElementById('goal-name').value.trim();
  const target = parseFloat(document.getElementById('goal-target').value.replace(/,/g,''));
  const saved  = parseFloat(document.getElementById('goal-saved').value.replace(/,/g,'')) || 0;
  if (!name)         { alert('กรุณากรอกชื่อเป้าหมาย'); return; }
  if (!target || target <= 0) { alert('กรุณากรอกจำนวนเงินเป้าหมาย'); return; }
  const data = getData();
  if (!data.savingsGoals) data.savingsGoals = [];
  if (state.editingGoalId) {
    const idx = data.savingsGoals.findIndex(g => g.id === state.editingGoalId);
    if (idx !== -1) data.savingsGoals[idx] = { ...data.savingsGoals[idx], name, targetAmount: target, savedAmount: saved };
  } else {
    data.savingsGoals.push({ id: genId(), name, targetAmount: target, savedAmount: saved });
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
  const swipePages = ['dashboard', 'add', 'list', 'charts'];
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
