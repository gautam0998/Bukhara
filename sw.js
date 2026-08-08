// Bump this name whenever index.html changes, or phones keep serving the old copy.
const CACHE='bukhara-v5';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-180.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(
    ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
// Network first, cache as a fallback: online you always get the current build,
// offline at the card table you still get the app.
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  if(new URL(e.request.url).origin!==self.location.origin) return;
  e.respondWith(
    fetch(e.request).then(res=>{
      // Only store real, complete, same-origin successes. Caching a 404 or a
      // partial response would serve that error back the next time we are offline.
      if(res.ok&&res.type==='basic'&&res.status===200){
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
      }
      return res;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html')))
  );
});
