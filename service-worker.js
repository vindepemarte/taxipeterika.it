const CACHE_NAME = 'taxipet-erika-cache-v4';

const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/icone-animali-taxipet/logo.svg',
    '/icone-animali-taxipet/icons-taxipet-erika/icon-512x512.svg',
    '/icone-animali-taxipet/icons-taxipet-erika/taxipeterika_72x72.svg',
    '/icone-animali-taxipet/icons-taxipet-erika/icon-72x72.png',
    '/icone-animali-taxipet/icons-taxipet-erika/icon-96x96.png',
    '/icone-animali-taxipet/icons-taxipet-erika/icon-128x128.png',
    '/icone-animali-taxipet/icons-taxipet-erika/icon-144x144.png',
    '/icone-animali-taxipet/icons-taxipet-erika/icon-152x152.png',
    '/icone-animali-taxipet/icons-taxipet-erika/icon-192x192.png',
    '/icone-animali-taxipet/icons-taxipet-erika/icon-384x384.png',
    '/icone-animali-taxipet/icons-taxipet-erika/icon-512x512.png',
    '/icone-animali-taxipet/loading.gif',
    '/icone-animali-taxipet/about-us.jpg',
    '/icone-animali-taxipet/taxi-piemonte.jpg',
    '/icone-animali-taxipet/svg/cane.svg',
    '/icone-animali-taxipet/svg/gatto.svg',
    '/icone-animali-taxipet/svg/coniglio.svg',
    '/icone-animali-taxipet/svg/tartaruga.svg',
    '/icone-animali-taxipet/svg/pappagallo.svg',
    '/icone-animali-taxipet/svg/gallina.svg',
    '/icone-animali-taxipet/svg/current-marker.svg',
    '/icone-animali-taxipet/svg/end-marker.svg',
    '/icone-animali-taxipet/svg/start-marker.svg',
    '/icone-animali-taxipet/svg/error.svg',
    '/icone-animali-taxipet/svg/success.svg',
    '/icone-animali-taxipet/svg/facebook.svg',
    '/icone-animali-taxipet/svg/instagram.svg',
    '/icone-animali-taxipet/svg/whatsapp.svg',
    '/galleria.js',
    '/modello_4_generico.pdf',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap'
];

// Install event - cache assets
self.addEventListener('install', function(event) {
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Cache aperta');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            
            // Clone the request
            var fetchRequest = event.request.clone();
            
            return fetch(fetchRequest)
            .then(function(response) {
                // Don't cache if it's not a successful response or not a GET request
                if (!response || response.status !== 200 || event.request.method !== 'GET') {
                    return response;
                }
                
                // Clone the response
                var responseToCache = response.clone();
                
                caches.open(CACHE_NAME)
                .then(function(cache) {
                    cache.put(event.request, responseToCache);
                });
                
                return response;
            })
            .catch(function(error) {
                console.log('Errore nel fetch:', error);
                // You can return a custom offline page here
            });
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    // Clean up old caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // Delete any old caches
                    if (cacheName !== CACHE_NAME) {
                        console.log('Elimino vecchia cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            // Claim any clients immediately, so the page will be under this SW's control
            return self.clients.claim();
        })
    );
}); 