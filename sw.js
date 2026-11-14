const CACHE = 'finance-v72';
const FILES = ['./index.html', './style.css', './app.js', './voice-expense.js', './voice-entry.js', './speech-transcript.js', './manifest.json', './icon.svg'];
const APP_URL = new URL('./index.html', self.registration.scope);
const ROOT_URL = new URL('./', self.registration.scope);
const ASSET_URLS = new Set(FILES.map(file => new URL(file, ROOT_URL).href));

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(cache => cache.addAll(FILES.map(file => new Request(new URL(file, ROOT_URL), { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k.startsWith('finance-v') && k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isAppNavigation = e.request.mode === 'navigate' && url.origin === ROOT_URL.origin &&
    (url.pathname === ROOT_URL.pathname || url.pathname === APP_URL.pathname);
  if (!isAppNavigation && !ASSET_URLS.has(url.href)) return;

  // Installed apps launch at index.html. Check for the current release online,
  // and use the precached app only if the network is unavailable.
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).catch(async error => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(isAppNavigation ? APP_URL : e.request);
    if (cached) return cached;
    throw error;
  }));
});
