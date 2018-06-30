/**
* Author: Technovole Inc Technologies
* Version: x
* Signature: BiltonIQ
* ALC Service Worker
*/

// register cache name
var appCacheName = 'alc Currency Converter';
var appCacheAssets = [
	
];

// on install state
self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(appCacheName).then(function(cache){
			return cache.addAll(appCacheAssets);
		})
	);
});

// on activate state
self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(
				cacheNames.filter(function(cacheName){
					return cacheName.startsWith('wnes-') && cacheName !== appCacheName;
				}).map(function(cacheName){
					return caches.delete(cacheName);
				})
			);
		})
	);
});

// on fetch state
self.addEventListener('fetch', function(event){
	// event.respondWith('hello');
	// console.log('hello');
	event.respondWith(
		caches.match(event.request).then(function(response){
			if(response){
				return response;
			}
			return fetch(event.request);
		})
	);
});

// on message
self.addEventListener('message', function(event){
	if(event.data.action == 'skipWaiting'){
		self.skipWaiting();
	}
});