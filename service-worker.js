//Helper Code from Traversy Media https://www.youtube.com/watch?v=ksXwaWHCW6k&list=PLNzm-8Qec7FimNy-xcW__LbP-JsmsNh8T&index=11&t=0s

const cacheName = 'v1';

const cachedAssets = [
  '/',
  './restaurant.html',
  './css/styles.css',
  'data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './js/main.js',
  './js/restaurant_info.js',
  './js/dbhelper.js',
]

self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      console.log('Service Worker: Caching Files');
      cache.addAll(cachedAssets);
    })
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Activated ');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
})