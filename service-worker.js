(()=>{var c="AfterSchoolClass",o=["/index.html"];self.addEventListener("install",e=>{console.log("[ServiceWorker] Installed"),e.waitUntil(caches.open(c).then(t=>(console.log("[ServiceWorker] Caching files..."),t.addAll(o))))});self.addEventListener("fetch",e=>{e.request.url.startsWith("http")||e.respondWith(caches.match(e.request).then(t=>t?(console.log("[ServiceWorker] Resource fetched from the cache for: "+e.request.url),t):fetch(e.request).then(function(r){if(!r.ok)throw new Error("Bad response status");return caches.open(c).then(function(n){return n.put(e.request,r.clone()),console.log("[Service Worker] Resource fetched and saved in the cache for: "+e.request.url),r})})))});})();