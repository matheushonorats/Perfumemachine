const CACHE='assinatura-v4-triagem';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('assinatura-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 const save=res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}return res;};
 if(e.request.mode==='navigate')e.respondWith(fetch(e.request).then(save).catch(()=>caches.match(e.request).then(c=>c||caches.match('./index.html'))));
 else e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(save)));
});