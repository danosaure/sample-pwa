const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  ".",
  "index.html",
  "css/style.css",
  "js/app.js",
  "images/coffee1.jpg",
  "images/coffee2.jpg",
  "images/coffee3.jpg",
  "images/coffee4.jpg",
  "images/coffee5.jpg",
  "images/coffee6.jpg",
  "images/coffee7.jpg",
  "images/coffee8.jpg",
  "images/coffee9.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  console.log('service-worker fetch:', fetchEvent.request);
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})

// This will be called when the service worker is updated. Imagine we want new
// caches and delete any old caches that are not matching the new names.
self.addEventListener('activate', event => {
  console.log('service-worker updated. Calling "activate" event.');

  var cacheAllowList = [ 'pages-cache-v1', 'blog-posts-cache-v1' ];

  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(cacheNames.map(cacheName => {
      if (cacheAllowList.indexOf(cacheName) === -1) {
        return caches.delete(cacheName);
      }
    })));
  );
});
