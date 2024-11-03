const CACHE_NAME = 'portfolio-elian';
const urlsToCache = [
  '/',
  '/index.html',
  '/index-en.html',
  '/assets/css/flex-slider.css',
  '/assets/css/fontawesome.css',
  '/assets/css/lightbox.css',
  '/assets/css/owl.css',
  '/assets/css/styles.css',
  '/assets/js/custom.js',
  '/assets/js/isotope.js',
  '/assets/js/lightbox.js',
  '/assets/js/ow-carousel.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});