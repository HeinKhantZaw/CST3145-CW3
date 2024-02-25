let cacheName = "AfterSchoolClass"
let cacheFiles = [
    "/index.html",
]

self.addEventListener("install", (e) => {
    console.log("[ServiceWorker] Installed");
    e.waitUntil(
        caches.open(cacheName).then(cache=>{
            console.log("[ServiceWorker] Caching files...")
            return cache.addAll(cacheFiles)
        })
    );
});

self.addEventListener("fetch", (e) => {
    if(!e.request.url.startsWith('http')) {
        e.respondWith(
            caches.match(e.request).then(cacheFile => {
                if (cacheFile) {
                    console.log("[ServiceWorker] Resource fetched from the cache for: " + e.request.url);
                    return cacheFile;
                } else {
                    return fetch(e.request).then(function (response) {
                        if(!response.ok){
                            throw new Error("Bad response status");
                        }
                        return caches.open(cacheName).then(function (cache) {
                            cache.put(e.request, response.clone());
                            console.log("[Service Worker] Resource fetched and saved in the cache for: " +
                                e.request.url);
                            return response;
                        });
                    })
                }
            })
        )
    }
})


