const CACHE='assinatura-v3.1-guiada';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('assinatura-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
 const store=response=>{if(response.ok){const cp=response.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}return response;};
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(store).catch(()=>caches.match(e.request).then(c=>c||caches.match('./index.html'))));
 }else{
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(store)));
 }
});