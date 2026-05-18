const CACHE = 'longevity-v' + Date.now();
const APP_FILES = [
  './',
  './index.html',
  './app.jsx',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];
const CDN_FILES = [
  'https://unpkg.com/react@18.3.1/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone@7.25.0/babel.min.js'
];

self.addEventListener('install', e => {
  // Pre-cache solo CDN (stabili). I file app si cachano on-demand.
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CDN_FILES).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Cancella TUTTE le cache vecchie
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isAppFile = url.origin === location.origin;

  if (isAppFile) {
    // NETWORK-FIRST per i file dell'app: sempre versione fresca se online
    e.respondWith(
      fetch(e.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => caches.match(e.request)) // Se offline, usa cache
    );
  } else {
    // CACHE-FIRST per CDN (React, Babel)
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }))
    );
  }
});