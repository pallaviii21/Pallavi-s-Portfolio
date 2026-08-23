const CACHE_NAME = 'pallavi-portfolio-v3.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/home.html',
  '/about.html',
  '/projects.html',
  '/manifest.json',
  '/assets/css/index.css',
  '/assets/css/home.css',
  '/assets/css/about.css',
  '/assets/css/projects.css',
  '/assets/css/cursor.css',
  '/assets/js/index.js',
  '/assets/js/home.js',
  '/assets/js/about.js',
  '/assets/js/projects.js',
  '/assets/js/cursor.js',
  '/assets/images/resume-analyzer.png',
  '/assets/images/code-room.png',
  '/assets/images/about-1.jpg',
  '/assets/images/about-2.jpg',
  '/assets/images/about-3.jpg',
  '/assets/images/about-4.jpg',
  '/assets/images/about-5.jpg',
  '/assets/icons/favicon.ico',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/favicon-32x32.png',
  '/assets/icons/apple-touch-icon.png',
  '/assets/icons/android-chrome-192x192.png',
  '/assets/icons/android-chrome-512x512.png',
  '/assets/docs/Pallavi_s_Resume.pdf',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
  'https://cdn.cdnfonts.com/css/pp-neue-montreal',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
  'https://fonts.googleapis.com/css2?family=Gloock&display=swap'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => console.error('Cache installation failed:', error))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network-First strategy (ensures live updates reflect immediately)
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Network-First with cache fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          try {
            const url = event.request.url;
            if (url.startsWith('http://') || url.startsWith('https://')) {
              cache.put(event.request, responseToCache);
            }
          } catch (err) {}
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle background sync tasks
  console.log('Background sync triggered');
  return Promise.resolve();
}

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/favicon-32x32.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon-32x32.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Pallavi Kumari Portfolio', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
