const CACHE_NAME = "myterminal-cache-v1";
const urlsToCache = [
    "./index.html",
    "./styles.css",
    "./scripts.js",
    "./manifest.json",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Terminalicon2.png/768px-Terminalicon2.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
