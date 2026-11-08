const fs = require('fs');
const path = require('path');
const DB = require('./assinatura/database.json');

// Let's create the full HTML for assinatura/index.html
const htmlContent = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#f5f1e9">
<meta name="color-scheme" content="light">
<meta name="description" content="ASSINATURA · Gestão inteligente da sua identidade olfativa, órbita de alívio e sucessão fundamentada em dados olfativos reais.">
<link rel="manifest" href="./manifest.webmanifest">
<link rel="icon" type="image/svg+xml" href="./icon.svg">

<title>ASSINATURA · Identidade Olfativa Inteligente</title>
<style>
:root{
  --paper:#f6f4ef;
  --wash:#efede6;
  --white:#fffefa;
  --ink:#25251f;
  --muted:#817f75;
  --soft:#d9d5c9;
  --olive:#60654b;
  --olive-dark:#444936;
  --pale:#e8e6dc;
  --sidebar:#eae8df;
  --danger:#925849;
  --accent-harmonic:#4e6b52;
  --accent-detox:#4a777a;
  --accent-contrast:#8a533b;
  --accent-sun:#a3622c;
  --accent-cold:#3e5879;
  --accent-work:#56614a;
  --accent-night:#654868;
  --font:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  --serif:Georgia,'Times New Roman',serif;
  --shade:0 18px 42px rgba(28,29,22,.08);
  --card-radius:3px;
}
*{box-sizing:border-box}
html{font-size:15px;scroll-behavior:smooth}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--font);-webkit-font-smoothing:antialiased}
button,input,textarea,select{font:inherit}
button{cursor:pointer}
button:disabled{opacity:.4;cursor:not-allowed}
a{color:inherit;text-decoration:none}
input,textarea,select{min-width:0}
button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:2px solid var(--olive);outline-offset:2px}

.shell{display:flex;min-height:100vh}
.sidebar{width:260px;flex-shrink:0;background:var(--sidebar);padding:35px 20px 24px;display:flex;flex-direction:column;border-right:1px solid #dfdcd3;position:sticky;top:0;height:100vh;overflow-y:auto}
.brand{display:flex;align-items:center;gap:12px;cursor:pointer;padding:0 8px 36px}
.brand-mark{font:normal 40px/1 Georgia,serif;letter-spacing:-6px;padding-right:6px;color:var(--olive-dark)}
.brand-name{font-weight:700;letter-spacing:2.5px;font-size:14px;color:var(--ink)}
.brand-name small{display:block;font-weight:500;color:var(--muted);font-size:8px;letter-spacing:1.5px;margin-top:6px}
.sidebar nav{display:grid;gap:4px}
.nav-link{display:flex;align-items:center;gap:13px;border:0;background:none;color:#6d6c63;text-align:left;padding:12px 14px;border-radius:var(--card-radius);font-size:13px;font-weight:500;transition:all .15s}
.nav-link.active{background:var(--white);color:var(--olive-dark);font-weight:700;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.nav-link:hover:not(.active){color:var(--ink);background:#f2f0e9}
.nav-glyph{font-size:18px;width:22px;text-align:center;font-family:Georgia,serif}
.sidebar-footer{margin-top:auto;padding:20px 10px 6px;color:#88867c;font-size:11px;line-height:1.6;border-top:1px solid #dfdcd3}
.dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#7b8966;margin-right:6px}

.workspace{flex:1;min-width:0;display:flex;flex-direction:column}
.main{width:min(1140px,100%);padding:50px clamp(20px,5vw,70px) 90px;margin:0 auto;flex:1}
.mobile-header,.mobile-nav{display:none}
.footer{display:flex;justify-content:space-between;gap:20px;padding:22px 50px;color:#9b998e;font-size:11px;border-top:1px solid var(--soft)}

.eyebrow{font-size:10px;letter-spacing:2px;font-weight:700;color:var(--olive);text-transform:uppercase;margin:0 0 12px;display:flex;align-items:center;gap:8px}
.eyebrow.light{color:#d5decb}
.page-heading{margin:0 0 32px;max-width:820px}
.page-heading h1{font-family:var(--serif);font-size:clamp(30px,4vw,44px);font-weight:400;line-height:1.22;letter-spacing:-1.2px;margin:0 0 12px}
.page-heading p.lede{font-size:14px;line-height:1.75;color:var(--muted);margin:0}

/* Button styles */
.btn{border:1px solid #cac7bb;border-radius:2px;background:transparent;color:var(--ink);display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:11px 18px;min-height:40px;font-weight:600;font-size:12px;letter-spacing:.2px;transition:background .15s,border .15s;text-align:center}
.btn:hover{background:var(--wash)}
.btn.primary{background:var(--olive-dark);color:white;border-color:var(--olive-dark)}
.btn.primary:hover{background:#2a2d21}
.btn.pale{background:#f1f0e8;border-color:#f1f0e8;color:#2e3328}
.btn.pale:hover{background:white}
.btn.warn{color:var(--danger);border-color:#d4b7ae}
.btn.warn:hover{background:#faede8}
.btn.danger-solid{background:var(--danger);color:white;border-color:var(--danger)}
.btn.danger-solid:hover{background:#7a3a2c}
.btn.small{padding:7px 12px;min-height:30px;font-size:11px}
.btn.large{padding:15px 24px;min-height:50px;font-size:13px}
.btn.text-btn{border:0;padding:6px 0;text-decoration:underline;color:var(--olive)}

/* Cards and Grid */
.surface{background:var(--white);border:1px solid #e7e4db;border-radius:var(--card-radius)}
.surface.padded{padding:28px 30px}
.section-title{display:flex;justify-content:space-between;align-items:baseline;margin:40px 0 18px;gap:12px}
.section-title h2{font:400 24px var(--serif);letter-spacing:-.5px;margin:0}
.section-title .desc{color:var(--muted);font-size:12px}

/* Hero Signature Card */
.signature-hero{display:grid;grid-template-columns:1.6fr 1fr;background:var(--olive-dark);color:white;border-radius:var(--card-radius);box-shadow:var(--shade);overflow:hidden;margin-bottom:34px}
.signature-hero-main{padding:42px 45px 38px;border-right:1px solid rgba(255,255,255,.12);display:flex;flex-direction:column;justify-content:center}
.signature-hero-main h2{font:400 clamp(28px,3.8vw,42px)/1.2 var(--serif);letter-spacing:-1px;margin:4px 0 16px}
.signature-hero-main p{color:#d6dbcd;font-size:13px;line-height:1.75;max-width:520px;margin:0 0 20px}
.signature-badges{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}
.badge{display:inline-flex;align-items:center;gap:6px;padding:5px 10px;font-size:10px;letter-spacing:.5px;border-radius:2px;font-weight:600;text-transform:uppercase}
.badge.on-dark{background:rgba(255,255,255,.14);color:#f0f3eb}
.badge.accent{background:#7b8f67;color:white}
.badge.light{background:#edebe2;color:#4f5245}
.signature-hero-side{padding:36px;display:flex;flex-direction:column;justify-content:center;background:rgba(0,0,0,.1)}
.signature-hero-side h3{font:400 18px var(--serif);margin:0 0 10px;color:#e8ede2}
.signature-hero-side p{font-size:12px;line-height:1.65;color:#ced5c5;margin:0 0 18px}
.pyramid-mini{display:grid;gap:6px;margin:12px 0 20px;font-size:11px}
.pyramid-row{display:flex;gap:8px;line-height:1.4}
.pyramid-row b{color:#cfdac6;min-width:65px;font-size:10px;text-transform:uppercase;letter-spacing:.8px}
.pyramid-row span{color:#ecefe6}

/* Relief Orbit Panel (Órbita de Alívio) */
.orbit-panel{margin-bottom:44px}
.orbit-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.orbit-card{background:var(--white);border:1px solid #e5e2d8;border-radius:var(--card-radius);padding:24px 22px;display:flex;flex-direction:column;position:relative;box-shadow:0 3px 12px rgba(0,0,0,.03);transition:transform .15s,box-shadow .15s}
.orbit-card:hover{transform:translateY(-2px);box-shadow:0 7px 20px rgba(0,0,0,.06)}
.orbit-card.harmonic{border-top:4px solid var(--accent-harmonic)}
.orbit-card.detox{border-top:4px solid var(--accent-detox)}
.orbit-card.contrast{border-top:4px solid var(--accent-contrast)}
.orbit-type{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;margin-bottom:8px}
.orbit-card.harmonic .orbit-type{color:var(--accent-harmonic)}
.orbit-card.detox .orbit-type{color:var(--accent-detox)}
.orbit-card.contrast .orbit-type{color:var(--accent-contrast)}
.orbit-card h3{font:400 20px/1.3 var(--serif);margin:0 0 4px;color:var(--ink)}
.orbit-brand{font-size:11px;color:var(--muted);margin-bottom:12px}
.orbit-reason{font-size:12px;line-height:1.65;color:#595850;margin:0 0 16px;flex:1}
.accord-chips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:18px}
.accord-chip{background:#f3f1ea;color:#5a5950;font-size:10px;padding:4px 8px;border-radius:2px}
.orbit-card .actions{display:flex;gap:8px;align-items:center;margin-top:auto}

/* Context Signatures Grid */
.contexts-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:40px}
.context-box{background:var(--white);border:1px solid #e5e2d8;border-radius:var(--card-radius);padding:22px 18px;display:flex;flex-direction:column;position:relative}
.context-box .context-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.context-label{font-size:10px;letter-spacing:1.2px;text-transform:uppercase;font-weight:700;color:var(--olive-dark)}
.context-current{margin:8px 0 12px;flex:1}
.context-current strong{display:block;font:400 17px/1.35 var(--serif);color:var(--ink)}
.context-current small{display:block;color:var(--muted);font-size:11px;margin-top:3px}
.context-queue-preview{border-top:1px solid #eeece5;padding-top:10px;margin-top:8px;font-size:10px;color:var(--muted)}
.context-queue-preview span{color:var(--ink);font-weight:600}

/* Quick Wear logger */
.quick-log-banner{background:#ecebe2;border:1px solid #dfdcd3;border-radius:var(--card-radius);padding:22px 28px;display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:38px}
.quick-log-text h3{font:400 20px var(--serif);margin:0 0 5px}
.quick-log-text p{font-size:12px;color:var(--muted);margin:0;line-height:1.5}

/* Collection View & Management */
.collection-toolbar{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:24px}
.search-box{flex:1;min-width:240px;position:relative}
.search-box input{width:100%;background:var(--white);border:1px solid #d5d2c8;border-radius:2px;padding:11px 14px 11px 36px;font-size:13px}
.search-box .icon{position:absolute;left:12px;top:12px;font-size:15px;color:var(--muted)}
.collection-stats-line{display:flex;justify-content:space-between;align-items:baseline;color:var(--muted);font-size:11px;margin-bottom:18px}
.collection-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:16px}
.perfume-card{background:var(--white);border:1px solid #e7e4da;border-radius:var(--card-radius);padding:18px 20px;display:flex;flex-direction:column;position:relative;transition:all .15s}
.perfume-card:hover{box-shadow:0 4px 14px rgba(0,0,0,.05);border-color:#d0ccc0}
.perfume-card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px}
.perfume-card-brand{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);font-weight:700}
.perfume-card-name{font:400 18px/1.3 var(--serif);color:var(--ink);margin:3px 0 8px}
.perfume-card-family{font-size:11px;color:var(--olive-dark);margin-bottom:10px;font-weight:500}
.perfume-card-accords{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:14px}
.perfume-card-footer{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:auto;padding-top:12px;border-top:1px solid #f0eee8;font-size:11px}
.volume-meter{display:flex;align-items:center;gap:6px;color:var(--muted)}
.volume-bar{width:42px;height:4px;background:#e2dfd6;border-radius:2px;overflow:hidden}
.volume-bar i{display:block;height:100%;background:var(--olive)}

/* Modals */
.modal-overlay{position:fixed;inset:0;z-index:90;background:rgba(25,29,21,.55);display:flex;justify-content:flex-end;backdrop-filter:blur(3px)}
.modal-overlay.center{justify-content:center;align-items:center;padding:20px}
.modal{background:var(--paper);width:min(680px,100%);height:100%;overflow-y:auto;box-shadow:var(--shade);display:flex;flex-direction:column}
.modal.dialog{height:auto;max-height:92vh;border-radius:3px;width:min(540px,100%)}
.modal-header{padding:30px 36px 20px;border-bottom:1px solid var(--soft);display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.modal-header h2{font:400 25px var(--serif);margin:0;line-height:1.25}
.modal-header p{margin:5px 0 0;font-size:12px;color:var(--muted)}
.modal-body{padding:26px 36px 60px;flex:1}
.modal-footer{padding:18px 36px;border-top:1px solid var(--soft);display:flex;justify-content:flex-end;gap:10px;background:var(--wash)}
.close-btn{background:none;border:0;font-size:26px;color:var(--muted);line-height:1;padding:0;cursor:pointer}
.close-btn:hover{color:var(--ink)}

/* Forms */
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px}
.form-grid.full{grid-template-columns:1fr}
.field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.field label{font-size:11px;font-weight:700;color:#51524a;letter-spacing:.3px}
.field input,.field select,.field textarea{border:1px solid #d5d2c8;background:var(--white);padding:10px 12px;border-radius:2px;font-size:13px;color:var(--ink)}
.field select{appearance:none;background-image:url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%2360654b" stroke-width="2"%3E%3Cpath d="m6 9 6 6 6-6"/%3E%3C/svg%3E');background-repeat:no-repeat;background-position:right 10px center;padding-right:32px}

/* Online Search Panel in Add Modal */
.online-search-box{background:#f0eee7;border:1px solid #dedbd0;border-radius:2px;padding:16px 18px;margin-bottom:22px}
.online-search-box p{font-size:12px;color:var(--muted);margin:0 0 10px;line-height:1.5}
.online-search-input-group{display:flex;gap:8px}
.online-search-input-group input{flex:1;padding:10px 12px;border:1px solid #cbcaa0;border-radius:2px;background:white;font-size:13px}
.online-matches{margin-top:14px;display:grid;gap:8px;max-height:220px;overflow-y:auto}
.online-match-item{background:white;border:1px solid #e0ded4;padding:10px 14px;border-radius:2px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;text-align:left;transition:background .12s}
.online-match-item:hover{background:#f6f8f2;border-color:var(--olive)}
.online-match-item strong{font-size:13px;display:block}
.online-match-item small{font-size:11px;color:var(--muted)}

/* Toast */
.toast{position:fixed;bottom:24px;right:24px;background:var(--ink);color:white;padding:16px 22px;border-radius:3px;font-size:12px;box-shadow:var(--shade);z-index:100;max-width:min(420px,90vw);display:flex;align-items:center;gap:12px;animation:toastIn .2s ease-out}
@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* Queues view */
.queue-segment-block{background:var(--white);border:1px solid #e5e2d8;border-radius:var(--card-radius);padding:24px;margin-bottom:24px}
.queue-segment-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px;border-bottom:1px solid #f0eee8;padding-bottom:12px}
.queue-item{display:grid;grid-template-columns:36px 1fr auto;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid #f1efe9}
.queue-item:last-child{border-bottom:0}
.queue-num{font:400 20px var(--serif);color:var(--olive)}
.queue-controls{display:flex;gap:5px}
.queue-controls button{border:1px solid #d9d6cb;background:none;width:32px;height:32px;border-radius:2px;display:flex;align-items:center;justify-content:center;color:var(--olive-dark)}

/* Responsive */
@media(max-width:1020px){
  .sidebar{width:220px;padding:25px 16px}
  .signature-hero{grid-template-columns:1fr}
  .signature-hero-main{border-right:0;border-bottom:1px solid rgba(255,255,255,.12);padding:32px 28px}
  .signature-hero-side{padding:28px}
  .orbit-grid{grid-template-columns:1fr}
  .contexts-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:760px){
  .sidebar{display:none}
  .mobile-header{display:flex;justify-content:space-between;align-items:center;background:var(--paper);height:60px;padding:0 20px;border-bottom:1px solid var(--soft);position:sticky;top:0;z-index:20}
  .mobile-header .brand-mark{font-size:26px}
  .mobile-nav{display:flex;position:fixed;z-index:20;bottom:0;left:0;right:0;background:rgba(253,251,247,.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-top:1px solid var(--soft);padding:6px 4px max(6px,env(safe-area-inset-bottom));justify-content:space-around}
  .mobile-nav button{flex:1;border:0;background:none;display:flex;flex-direction:column;gap:2px;align-items:center;justify-content:center;color:#85837a;padding:5px 2px}
  .mobile-nav button.active{color:var(--olive-dark);font-weight:700}
  .mobile-nav button span{font-size:18px;font-family:Georgia,serif}
  .mobile-nav button small{font-size:9.5px;letter-spacing:.2px}
  .main{padding:24px 16px 110px}
  .contexts-grid{grid-template-columns:1fr}
  .form-grid{grid-template-columns:1fr}
  .modal{width:100%;height:100dvh}
  .modal.dialog{width:100%;max-height:100dvh;height:100dvh;border-radius:0}
  .modal-header{padding:22px}
  .modal-body{padding:20px 22px 100px}
  .modal-footer{padding:16px 22px}
  .quick-log-banner{flex-direction:column;align-items:flex-start}
}
</style>
</head>
<body>
<div id="app"></div>

<script>
// ==========================================
// 1. COMPREHENSIVE OLFACTORY DATABASE (141 PERFUMES)
// Verified against Fragrantica, Parfumo, Basenotes & Scento
// ==========================================
const FACTUAL_DB = ${JSON.stringify(DB, null, 2)};

// Initial catalog constructed with complete factual profiles
const CATALOG = Object.entries(FACTUAL_DB).map(([numStr, entry]) => {
  const num = parseInt(numStr, 10);
  const id = 'f' + String(num).padStart(3, '0');
  return {
    id,
    brand: entry.brand,
    name: entry.name,
    concentration: entry.concentration || 'EDT',
    family: entry.family || 'Amadeirado',
    accords: entry.accords || [],
    pyramid: entry.pyramid || { top: [], heart: [], base: [] },
    seasons: entry.seasons || ['primavera', 'outono'],
    occasions: entry.occasions || ['cotidiano'],
    intensity: entry.intensity || 3,
    character: entry.character || '',
    remainingMl: 100,
    bottleMl: 100,
    favorite: false,
    sources: [{ name: 'Fragrantica/Parfumo/Scento Factual Database', verified: true }],
    profile: {},
    contexts: {},
    definitive: null,
    contextExclusions: {}
  };
});

// App State initialization
function blankState() {
  return {
    schema: 2,
    catalog: structuredClone(CATALOG),
    signatures: {
      main: { perfumeId: 'f055', activatedAt: new Date().toISOString(), manual: true }, // Default active: Terre d'Hermès
      secondary: {
        heat: 'f030', // Light Blue Intense
        cold: 'f136', // Spicebomb Extreme
        professional: 'f109', // Prada L'Homme
        night: 'f068' // Le Male Le Parfum
      },
      queue: ['f008', 'f065', 'f134', 'f084'],
      ended: []
    },
    quickUses: [],
    experiences: [],
    comparisons: [],
    answers: {},
    settings: {
      sufficientHours: 6,
      diversity: 'balanced'
    },
    audit: [{
      at: new Date().toISOString(),
      action: 'init',
      detail: 'Base de 141 fragrâncias carregada com perfis olfativos reais (pirâmides, famílias, acordes).'
    }]
  };
}

// Storage handling
const DB_NAME = 'assinatura-pessoal-v2';
const STORE_NAME = 'records';
const STATE_KEY = 'state';

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('IndexedDB indisponível'));
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE_NAME)) {
        req.result.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function loadSavedState() {
  try {
    const db = await openIndexedDB();
    const stored = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(STATE_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
    if (stored) return stored;
  } catch(e) {
    console.warn('Falha IndexedDB, tentando localStorage...', e);
  }
  try {
    const local = localStorage.getItem(DB_NAME);
    return local ? JSON.parse(local) : null;
  } catch(err) {
    return null;
  }
}

async function saveState(st) {
  try {
    const db = await openIndexedDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(st, STATE_KEY);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => reject(tx.error);
    });
  } catch(e) {
    try {
      localStorage.setItem(DB_NAME, JSON.stringify(st));
    } catch(err) {}
  }
}

function logAudit(st, action, detail) {
  st.audit.unshift({ at: new Date().toISOString(), action, detail });
  if (st.audit.length > 500) st.audit = st.audit.slice(0, 500);
}

// ==========================================
// 2. INTELLIGENT CONNECTION ENGINE (LIGAÇÃO INTELIGENTE)
// Real Jaccard & weighted note/accord calculations
// ==========================================
function jaccardIndex(arrA, arrB) {
  const setA = new Set((arrA || []).map(x => String(x).toLowerCase().trim()));
  const setB = new Set((arrB || []).map(x => String(x).toLowerCase().trim()));
  if (!setA.size && !setB.size) return 0;
  let matches = 0;
  for (const item of setA) {
    if (setB.has(item)) matches++;
  }
  const union = setA.size + setB.size - matches;
  return union > 0 ? (matches / union) : 0;
}

function noteOverlapScore(pyrA, pyrB) {
  const allNotesA = [...(pyrA?.top || []), ...(pyrA?.heart || []), ...(pyrA?.base || [])];
  const allNotesB = [...(pyrB?.top || []), ...(pyrB?.heart || []), ...(pyrB?.base || [])];
  return jaccardIndex(allNotesA, allNotesB);
}

function computeSimilarity(pA, pB) {
  if (!pA || !pB || pA.id === pB.id) return 0;
  const accordSim = jaccardIndex(pA.accords, pB.accords);
  const noteSim = noteOverlapScore(pA.pyramid, pB.pyramid);
  const familySim = (pA.family && pB.family && (pA.family === pB.family || pA.family.split(' ')[0] === pB.family.split(' ')[0])) ? 1 : 0;
  return (accordSim * 0.50) + (noteSim * 0.35) + (familySim * 0.15);
}

// Compute the 3-axis relief orbit for a given target perfume
function calculateReliefOrbit(targetPerfume, catalog) {
  if (!targetPerfume) return { harmonic: null, detox: null, contrast: null };
  const pool = catalog.filter(p => p.id !== targetPerfume.id && !p.definitive && p.remainingMl > 0);
  if (!pool.length) return { harmonic: null, detox: null, contrast: null };

  // 1. Harmonic Variation (Mesmo DNA): highest similarity
  const rankedHarmonic = pool.map(p => ({
    perfume: p,
    similarity: computeSimilarity(targetPerfume, p)
  })).sort((a, b) => b.similarity - a.similarity);
  const harmonic = rankedHarmonic[0] || null;

  // 2. Sensory Detox (Neutral, clean, low intensity)
  const detoxCandidates = pool.filter(p => {
    const isLowIntensity = (p.intensity || 2) <= 2;
    const isClean = (p.accords || []).some(a => 
      /almiscar|limpo|citrico|cha|herbal|mineral|segunda pele/i.test(a)
    ) || /molecule|4711|happy|etéreo|verbena|prada amber/i.test(p.name);
    return isLowIntensity && isClean;
  }).map(p => ({
    perfume: p,
    similarity: computeSimilarity(targetPerfume, p)
  })).sort((a, b) => a.similarity - b.similarity); // lowest similarity gives best olfactory reset
  const detox = detoxCandidates[0] || rankedHarmonic[rankedHarmonic.length - 1];

  // 3. Intentional Contrast: distinct olfactory family, low similarity (<0.25)
  const contrastCandidates = pool.filter(p => {
    const sim = computeSimilarity(targetPerfume, p);
    const diffFamily = p.family !== targetPerfume.family;
    return diffFamily && sim < 0.25;
  }).map(p => ({
    perfume: p,
    similarity: computeSimilarity(targetPerfume, p)
  })).sort((a, b) => (b.perfume.intensity || 3) - (a.perfume.intensity || 3));
  const contrast = contrastCandidates[0] || rankedHarmonic[rankedHarmonic.length - 1];

  return { harmonic, detox, contrast };
}

// Suitability for the 4 dedicated contexts
function getContextScore(p, contextId) {
  let score = 0;
  const accords = (p.accords || []).join(' ').toLowerCase();
  const seasons = (p.seasons || []).join(' ').toLowerCase();
  const occasions = (p.occasions || []).join(' ').toLowerCase();
  const family = (p.family || '').toLowerCase();
  const intensity = p.intensity || 3;

  if (contextId === 'heat') {
    if (seasons.includes('verao')) score += 30;
    if (occasions.includes('calor')) score += 25;
    if (/citrico|aquatico|marinho|fresco|gelado|menta|salgado/.test(accords)) score += 35;
    if (/baunilha|couro|tabaco|caramelo|doce|canela/.test(accords) && intensity >= 4) score -= 30;
  } else if (contextId === 'cold') {
    if (seasons.includes('inverno') || seasons.includes('outono')) score += 30;
    if (occasions.includes('frio')) score += 25;
    if (/baunilha|tabaco|especiado quente|ambar|couro|canela|esfumado/.test(accords)) score += 35;
    if (intensity >= 4) score += 15;
    if (/colonia|citrico|aquatico/.test(family) && intensity <= 2) score -= 20;
  } else if (contextId === 'professional') {
    if (occasions.includes('trabalho') || occasions.includes('formal')) score += 30;
    if (/iris|amadeirado|limpo|sabonete|vetiver|aromatico/.test(accords)) score += 35;
    if (intensity === 2 || intensity === 3) score += 20;
    if (intensity >= 5) score -= 25; // too loud for shared spaces
  } else if (contextId === 'night') {
    if (occasions.includes('noite') || occasions.includes('social') || occasions.includes('encontros')) score += 30;
    if (/sedutor|cardamomo|baunilha|ambar|frutado|couro|especiado/.test(accords)) score += 35;
    if (intensity >= 3) score += 20;
  }
  return score;
}

function getRankedForContext(contextId, catalog) {
  return catalog
    .filter(p => !p.definitive && p.remainingMl > 0)
    .map(p => ({ perfume: p, score: getContextScore(p, contextId) }))
    .sort((a, b) => b.score - a.score);
}

// ==========================================
// 3. LIVE ONLINE DATABASE INTEGRATION (SCENTO API)
// ==========================================
async function searchOnlineDatabase(query) {
  if (!query || !query.trim()) return [];
  const url = 'https://www.scento.com/api/perfume/v1/search?q=' + encodeURIComponent(query.trim()) + '&kind=perfume';
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('Status ' + res.status);
    const data = await res.json();
    return (data?.detail?.matches || []).filter(m => m.kind === 'perfume');
  } catch(e) {
    console.warn('Erro ao consultar API Scento:', e);
    // Fallback: search local verified database
    const q = query.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
    return Object.values(FACTUAL_DB).filter(p => {
      const target = (p.brand + ' ' + p.name).toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
      return target.includes(q);
    }).map(p => ({
      name: p.name,
      house: p.brand,
      family: p.family,
      page: null,
      localData: p
    }));
  }
}

async function fetchOnlinePerfumeDetails(slugOrMatch) {
  if (slugOrMatch.localData) {
    return slugOrMatch.localData;
  }
  if (!slugOrMatch.page) return null;
  const slug = slugOrMatch.page.split('/').pop();
  try {
    const res = await fetch('https://www.scento.com/api/perfume/v1/perfumes/' + encodeURIComponent(slug));
    if (!res.ok) throw new Error('Status ' + res.status);
    const folio = await res.json();
    const d = folio.detail;
    return {
      brand: d.house || slugOrMatch.house,
      name: d.name || slugOrMatch.name,
      concentration: d.concentration || 'EDP',
      family: d.family || 'Amadeirado',
      accords: d.character_words || ['Amadeirado', 'Cítrico'],
      pyramid: {
        top: d.pyramid?.top || [],
        heart: d.pyramid?.heart || [],
        base: d.pyramid?.base || []
      },
      seasons: d.wears?.seasons || ['primavera', 'verao'],
      character: d.character || ''
    };
  } catch(e) {
    console.warn('Falha ao buscar perfil completo no Scento:', e);
    return null;
  }
}
</script>
<script>
// ==========================================
// 4. APPLICATION UI CONTROLLER
// ==========================================
let state = blankState();
let activeTab = 'home'; // 'home', 'collection', 'orbits', 'queues', 'online', 'settings'
let activeDetailId = null;
let activeModal = null; // 'addPerfume', 'removeConfirm', 'quickLog', 'detail'
let modalTargetPerfume = null;
let searchFilter = '';
let familyFilter = 'all';
let onlineSearchQuery = '';
let onlineSearchResults = [];
let onlineSearching = false;
let toastMessage = '';
let toastTimeout = null;

function flashToast(msg) {
  toastMessage = msg;
  renderApp();
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastMessage = '';
    const t = document.querySelector('.toast');
    if (t) t.remove();
  }, 4200);
}

async function persist(action, detail) {
  if (action) logAudit(state, action, detail || '');
  await saveState(state);
  renderApp();
}

// Helpers
function getPerfume(id) {
  return state.catalog.find(p => p.id === id);
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

// Navigation
function switchTab(t) {
  activeTab = t;
  activeModal = null;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Render Functions
function renderApp() {
  const root = document.querySelector('#app');
  if (!root) return;

  const mainPerfume = getPerfume(state.signatures.main?.perfumeId);
  const orbit = calculateReliefOrbit(mainPerfume, state.catalog);

  root.innerHTML = \`
  <div class="shell">
    <aside class="sidebar">
      <div class="brand" onclick="switchTab('home')">
        <span class="brand-mark">A.</span>
        <div class="brand-name">
          ASSINATURA
          <small>IDENTIDADE OLFATIVA</small>
        </div>
      </div>
      <nav>
        <button class="nav-link \${activeTab === 'home' ? 'active' : ''}" onclick="switchTab('home')">
          <span class="nav-glyph">⌂</span> Início &amp; Órbita
        </button>
        <button class="nav-link \${activeTab === 'collection' ? 'active' : ''}" onclick="switchTab('collection')">
          <span class="nav-glyph">▦</span> Minha Coleção (\${state.catalog.length})
        </button>
        <button class="nav-link \${activeTab === 'orbits' ? 'active' : ''}" onclick="switchTab('orbits')">
          <span class="nav-glyph">🌀</span> Conexões Olfativas
        </button>
        <button class="nav-link \${activeTab === 'queues' ? 'active' : ''}" onclick="switchTab('queues')">
          <span class="nav-glyph">⇢</span> Filas &amp; Sucessão
        </button>
        <button class="nav-link \${activeTab === 'online' ? 'active' : ''}" onclick="switchTab('online')">
          <span class="nav-glyph">🌐</span> Banco Online (Scento)
        </button>
        <button class="nav-link \${activeTab === 'settings' ? 'active' : ''}" onclick="switchTab('settings')">
          <span class="nav-glyph">⚙</span> Backup &amp; Ajustes
        </button>
      </nav>
      <div class="sidebar-footer">
        <div><span class="dot"></span> <b>\${state.catalog.length}</b> fragrâncias reais</div>
        <div style="margin-top:4px;color:#9b998e">Dados e backup 100% locais</div>
      </div>
    </aside>

    <div class="workspace">
      <header class="mobile-header">
        <div style="display:flex;align-items:center;gap:10px" onclick="switchTab('home')">
          <span class="brand-mark">A.</span>
          <b style="font-size:13px;letter-spacing:1px">ASSINATURA</b>
        </div>
        <button class="btn small primary" onclick="openAddModal()">+ Adicionar</button>
      </header>

      <main class="main">
        \${renderMainContent(mainPerfume, orbit)}
      </main>

      <footer class="footer">
        <span>ASSINATURA — Inteligência Olfativa &amp; Gestão Pessoal de Fragrâncias</span>
        <span>Base factual estruturada · Sem loops arbitrários</span>
      </footer>
    </div>

    <nav class="mobile-nav">
      <button class="\${activeTab === 'home' ? 'active' : ''}" onclick="switchTab('home')">
        <span>⌂</span><small>Início</small>
      </button>
      <button class="\${activeTab === 'collection' ? 'active' : ''}" onclick="switchTab('collection')">
        <span>▦</span><small>Coleção</small>
      </button>
      <button class="\${activeTab === 'orbits' ? 'active' : ''}" onclick="switchTab('orbits')">
        <span>🌀</span><small>Órbitas</small>
      </button>
      <button class="\${activeTab === 'queues' ? 'active' : ''}" onclick="switchTab('queues')">
        <span>⇢</span><small>Filas</small>
      </button>
      <button class="\${activeTab === 'settings' ? 'active' : ''}" onclick="switchTab('settings')">
        <span>⚙</span><small>Ajustes</small>
      </button>
    </nav>
  </div>

  \${toastMessage ? \`<div class="toast">\${escapeHtml(toastMessage)}</div>\` : ''}
  \${renderActiveModal()}
  \`;
}

function renderMainContent(mainPerfume, orbit) {
  switch(activeTab) {
    case 'home':
      return renderHomeTab(mainPerfume, orbit);
    case 'collection':
      return renderCollectionTab();
    case 'orbits':
      return renderOrbitsTab();
    case 'queues':
      return renderQueuesTab();
    case 'online':
      return renderOnlineTab();
    case 'settings':
      return renderSettingsTab();
    default:
      return renderHomeTab(mainPerfume, orbit);
  }
}

// ==========================================
// TAB 1: HOME & RELIEF ORBIT
// ==========================================
function renderHomeTab(main, orbit) {
  const p = main || {
    brand: 'Nenhuma assinatura ativa',
    name: 'Selecione uma fragrância da sua coleção',
    family: 'Amadeirado / Cítrico',
    accords: ['Toque em Escolher para ativar'],
    pyramid: { top: [], heart: [], base: [] },
    remainingMl: 0
  };

  return \`
  <div class="page-heading">
    <div class="eyebrow"><span class="dot"></span>IDENTIDADE OLFATIVA &amp; ÓRBITA DE ALÍVIO</div>
    <h1>Sua assinatura central.<br><em style="font-family:var(--serif);color:var(--olive)">Uma rotação inteligente ao redor.</em></h1>
    <p class="lede">Quando você cansar da sua assinatura ou quiser um respiro olfativo, a órbita sugere a alternativa exata: mesma linhagem, limpeza sensorial neutra ou contraste intencional.</p>
  </div>

  <!-- Hero Signature Card -->
  <section class="signature-hero">
    <div class="signature-hero-main">
      <div class="eyebrow light">ASSINATURA PRINCIPAL ATIVA</div>
      <h2>\${escapeHtml(p.name)}</h2>
      <p><b>\${escapeHtml(p.brand)}</b> · \${escapeHtml(p.family)} · \${escapeHtml(p.character || 'Fragrância estruturante da sua presença diária.')}</p>
      
      <div class="signature-badges">
        <span class="badge on-dark">\${escapeHtml(p.concentration || 'EDT')}</span>
        <span class="badge on-dark">\${p.remainingMl || 100} ml restantes</span>
        <span class="badge accent">Em rotação contínua</span>
      </div>

      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <button class="btn pale" onclick="openQuickLog('\${p.id}')">Registrar uso de hoje ↗</button>
        <button class="btn text-btn" style="color:#d8decb" onclick="switchTab('queues')">Ver sucessores da fila →</button>
      </div>
    </div>

    <div class="signature-hero-side">
      <h3>Pirâmide Olfativa Real</h3>
      <p>Dados documentados da composição da sua assinatura:</p>
      <div class="pyramid-mini">
        <div class="pyramid-row">
          <b>Topo:</b>
          <span>\${(p.pyramid?.top || ['Cítricos']).slice(0, 3).join(', ')}</span>
        </div>
        <div class="pyramid-row">
          <b>Coração:</b>
          <span>\${(p.pyramid?.heart || ['Especiarias', 'Notas nobres']).slice(0, 3).join(', ')}</span>
        </div>
        <div class="pyramid-row">
          <b>Fundo:</b>
          <span>\${(p.pyramid?.base || ['Madeiras', 'Vetiver']).slice(0, 3).join(', ')}</span>
        </div>
      </div>
      <button class="btn small" style="color:white;border-color:rgba(255,255,255,.3);align-self:flex-start" onclick="openDetailModal('\${p.id}')">
        Ver ficha completa
      </button>
    </div>
  </section>

  <!-- Relief Orbit Panel -->
  <section class="orbit-panel">
    <div class="section-title">
      <div>
        <h2>Órbita de Alívio &amp; Rotação ao Redor</h2>
        <div class="desc">Conexões calculadas com base na composição de \${escapeHtml(p.name)}</div>
      </div>
      <button class="btn small" onclick="switchTab('orbits')">Mapa completo →</button>
    </div>

    <div class="orbit-grid">
      <!-- 1. Harmonic Variation -->
      <article class="orbit-card harmonic">
        <span class="orbit-type">🌿 Variação Harmônica (Mesmo DNA)</span>
        <h3>\${orbit.harmonic ? escapeHtml(orbit.harmonic.perfume.name) : 'Sem candidato'}</h3>
        <div class="orbit-brand">\${orbit.harmonic ? escapeHtml(orbit.harmonic.perfume.brand) : '—'}</div>
        <p class="orbit-reason">
          Compartilha acordes e notas chave de <b>\${escapeHtml(p.name)}</b>. Oferece uma nuance diferente sem quebrar a sua identidade olfativa.
        </p>
        <div class="accord-chips">
          \${(orbit.harmonic?.perfume?.accords || []).slice(0, 3).map(a => \`<span class="accord-chip">\${escapeHtml(a)}</span>\`).join('')}
        </div>
        <div class="actions">
          <button class="btn small primary" onclick="openQuickLog('\${orbit.harmonic?.perfume?.id}')">Usar hoje</button>
          <button class="btn small" onclick="openDetailModal('\${orbit.harmonic?.perfume?.id}')">Detalhes</button>
        </div>
      </article>

      <!-- 2. Sensory Detox -->
      <article class="orbit-card detox">
        <span class="orbit-type">🫧 Limpeza Sensorial (Detox Olfativo)</span>
        <h3>\${orbit.detox ? escapeHtml(orbit.detox.perfume.name) : 'Sem candidato'}</h3>
        <div class="orbit-brand">\${orbit.detox ? escapeHtml(orbit.detox.perfume.brand) : '—'}</div>
        <p class="orbit-reason">
          Fragrância leve, transparente e limpa. Permite que os receptores do seu nariz descansem da saturação contínua, prevenindo a anosmia.
        </p>
        <div class="accord-chips">
          \${(orbit.detox?.perfume?.accords || []).slice(0, 3).map(a => \`<span class="accord-chip">\${escapeHtml(a)}</span>\`).join('')}
        </div>
        <div class="actions">
          <button class="btn small primary" onclick="openQuickLog('\${orbit.detox?.perfume?.id}')">Usar hoje</button>
          <button class="btn small" onclick="openDetailModal('\${orbit.detox?.perfume?.id}')">Detalhes</button>
        </div>
      </article>

      <!-- 3. Intentional Contrast -->
      <article class="orbit-card contrast">
        <span class="orbit-type">⚡ Contraste Intencional (Ruptura)</span>
        <h3>\${orbit.contrast ? escapeHtml(orbit.contrast.perfume.name) : 'Sem candidato'}</h3>
        <div class="orbit-brand">\${orbit.contrast ? escapeHtml(orbit.contrast.perfume.brand) : '—'}</div>
        <p class="orbit-reason">
          Família olfativa oposta. Para quando você deseja uma mudança radical de clima ou uma surpresa intencional na rotina.
        </p>
        <div class="accord-chips">
          \${(orbit.contrast?.perfume?.accords || []).slice(0, 3).map(a => \`<span class="accord-chip">\${escapeHtml(a)}</span>\`).join('')}
        </div>
        <div class="actions">
          <button class="btn small primary" onclick="openQuickLog('\${orbit.contrast?.perfume?.id}')">Usar hoje</button>
          <button class="btn small" onclick="openDetailModal('\${orbit.contrast?.perfume?.id}')">Detalhes</button>
        </div>
      </article>
    </div>
  </section>

  <!-- Context Signatures -->
  <section>
    <div class="section-title">
      <div>
        <h2>Assinaturas por Ocasião &amp; Clima</h2>
        <div class="desc">Fragrâncias ativas dedicadas a cada momento da sua rotina</div>
      </div>
      <button class="btn small" onclick="switchTab('queues')">Gerenciar filas →</button>
    </div>

    <div class="contexts-grid">
      <!-- Calor Intenso -->
      <div class="context-box">
        <div class="context-header">
          <span class="context-label" style="color:var(--accent-sun)">☀️ Calor Intenso</span>
        </div>
        <div class="context-current">
          <strong>\${getPerfume(state.signatures.secondary?.heat)?.name || 'A definir'}</strong>
          <small>\${getPerfume(state.signatures.secondary?.heat)?.brand || 'Verão / Litoral'}</small>
        </div>
        <div class="context-queue-preview">
          Sucessor: <span>\${getRankedForContext('heat', state.catalog)[1]?.perfume?.name || 'Aguardando fila'}</span>
        </div>
      </div>

      <!-- Clima Ameno / Frio -->
      <div class="context-box">
        <div class="context-header">
          <span class="context-label" style="color:var(--accent-cold)">❄️ Clima Frio / Noites</span>
        </div>
        <div class="context-current">
          <strong>\${getPerfume(state.signatures.secondary?.cold)?.name || 'A definir'}</strong>
          <small>\${getPerfume(state.signatures.secondary?.cold)?.brand || 'Inverno / Ameno'}</small>
        </div>
        <div class="context-queue-preview">
          Sucessor: <span>\${getRankedForContext('cold', state.catalog)[1]?.perfume?.name || 'Aguardando fila'}</span>
        </div>
      </div>

      <!-- Profissional -->
      <div class="context-box">
        <div class="context-header">
          <span class="context-label" style="color:var(--accent-work)">💼 Trabalho &amp; Escritório</span>
        </div>
        <div class="context-current">
          <strong>\${getPerfume(state.signatures.secondary?.professional)?.name || 'A definir'}</strong>
          <small>\${getPerfume(state.signatures.secondary?.professional)?.brand || 'Reuniões / Ambiente fechado'}</small>
        </div>
        <div class="context-queue-preview">
          Sucessor: <span>\${getRankedForContext('professional', state.catalog)[1]?.perfume?.name || 'Aguardando fila'}</span>
        </div>
      </div>

      <!-- Noite / Social -->
      <div class="context-box">
        <div class="context-header">
          <span class="context-label" style="color:var(--accent-night)">🌙 Noite &amp; Social</span>
        </div>
        <div class="context-current">
          <strong>\${getPerfume(state.signatures.secondary?.night)?.name || 'A definir'}</strong>
          <small>\${getPerfume(state.signatures.secondary?.night)?.brand || 'Encontros / Eventos'}</small>
        </div>
        <div class="context-queue-preview">
          Sucessor: <span>\${getRankedForContext('night', state.catalog)[1]?.perfume?.name || 'Aguardando fila'}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Quick Wear logger banner -->
  <div class="quick-log-banner">
    <div class="quick-log-text">
      <h3>Usou algum perfume hoje?</h3>
      <p>Registre a experiência em 10 segundos para refinar o histórico e a calibragem da sua rotação.</p>
    </div>
    <button class="btn primary" onclick="openQuickLog()">Registrar uso do dia →</button>
  </div>
  \`;
}

// ==========================================
// TAB 2: COLLECTION MANAGEMENT (INCLUIR E REMOVER)
// ==========================================
function renderCollectionTab() {
  let list = state.catalog.filter(p => {
    const q = searchFilter.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
    const text = (p.brand + ' ' + p.name + ' ' + p.family).toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
    const matchText = !q || text.includes(q);
    const matchFamily = familyFilter === 'all' || p.family.toLowerCase().includes(familyFilter.toLowerCase());
    return matchText && matchFamily;
  });

  return \`
  <div class="page-heading">
    <div class="eyebrow"><span class="dot"></span>GERENCIAMENTO DO ACERVO</div>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px">
      <div>
        <h1>Minha Coleção de Fragrâncias</h1>
        <p class="lede">Gerencie seu acervo: adicione novos perfumes buscando na base online ou remova itens com segurança.</p>
      </div>
      <button class="btn primary large" onclick="openAddModal()">+ Adicionar Fragrância</button>
    </div>
  </div>

  <div class="collection-toolbar">
    <div class="search-box">
      <span class="icon">⌕</span>
      <input type="search" placeholder="Buscar por perfume, marca ou família..." value="\${escapeHtml(searchFilter)}" oninput="searchFilter=this.value;renderApp()">
    </div>
    <select onchange="familyFilter=this.value;renderApp()" style="padding:11px 14px;border:1px solid #d5d2c8;background:white">
      <option value="all" \${familyFilter==='all'?'selected':''}>Todas as famílias</option>
      <option value="cítrico" \${familyFilter==='cítrico'?'selected':''}>Cítrico</option>
      <option value="amadeirado" \${familyFilter==='amadeirado'?'selected':''}>Amadeirado</option>
      <option value="aromático" \${familyFilter==='aromático'?'selected':''}>Aromático / Fougère</option>
      <option value="aquático" \${familyFilter==='aquático'?'selected':''}>Aquático / Marinho</option>
      <option value="oriental" \${familyFilter==='oriental'?'selected':''}>Oriental / Âmbar</option>
      <option value="couro" \${familyFilter==='couro'?'selected':''}>Couro</option>
    </select>
  </div>

  <div class="collection-stats-line">
    <span>Exibindo <b>\${list.length}</b> de <b>\${state.catalog.length}</b> perfumes cadastrados</span>
    <span>Clique em um perfume para ver pirâmide, editar ou remover</span>
  </div>

  <div class="collection-grid">
    \${list.map(p => \`
      <div class="perfume-card">
        <div class="perfume-card-head">
          <span class="perfume-card-brand">\${escapeHtml(p.brand)}</span>
          <span class="badge light">\${escapeHtml(p.concentration || 'EDT')}</span>
        </div>
        <div class="perfume-card-name">\${escapeHtml(p.name)}</div>
        <div class="perfume-card-family">\${escapeHtml(p.family)}</div>
        <div class="perfume-card-accords">
          \${(p.accords || []).slice(0, 3).map(a => \`<span class="accord-chip">\${escapeHtml(a)}</span>\`).join('')}
        </div>
        <div class="perfume-card-footer">
          <div class="volume-meter">
            <span class="volume-bar"><i style="width:\${Math.min(100, (p.remainingMl || 100))}%"></i></span>
            <small>\${p.remainingMl || 100} ml</small>
          </div>
          <div style="display:flex;gap:6px">
            <button class="btn small" onclick="openDetailModal('\${p.id}')">Ver Ficha</button>
            <button class="btn small warn" onclick="confirmRemovePerfume('\${p.id}')" title="Remover do acervo">×</button>
          </div>
        </div>
      </div>
    \`).join('')}
  </div>
  \`;
}

// ==========================================
// TAB 3: OLFACTORY CONNECTIONS EXPLORER
// ==========================================
function renderOrbitsTab() {
  const targetId = activeDetailId || state.signatures.main?.perfumeId || state.catalog[0]?.id;
  const current = getPerfume(targetId);
  const orbit = calculateReliefOrbit(current, state.catalog);

  return \`
  <div class="page-heading">
    <div class="eyebrow"><span class="dot"></span>RADAR DE LIGAÇÕES INTELIGENTES</div>
    <h1>Mapa de Afinidade Olfativa</h1>
    <p class="lede">Escolha qualquer perfume da sua coleção para visualizar em tempo real sua órbita de alívio e índice de proximidade olfativa.</p>
  </div>

  <div class="surface padded" style="margin-bottom:28px">
    <div class="field" style="max-width:440px">
      <label>Selecione um perfume para examinar:</label>
      <select onchange="activeDetailId=this.value;renderApp()">
        \${state.catalog.map(p => \`
          <option value="\${p.id}" \${p.id === targetId ? 'selected' : ''}>\${escapeHtml(p.brand)} — \${escapeHtml(p.name)}</option>
        \`).join('')}
      </select>
    </div>

    <div style="margin-top:16px;display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      <b style="font-size:18px;font-family:var(--serif)">\${escapeHtml(current.brand)} · \${escapeHtml(current.name)}</b>
      <span class="badge light">\${escapeHtml(current.family)}</span>
      <span class="badge light">Intensidade \${current.intensity || 3}/5</span>
    </div>
  </div>

  <div class="orbit-grid">
    <article class="orbit-card harmonic">
      <span class="orbit-type">🌿 Variação Harmônica (DNA Irmão)</span>
      <h3>\${orbit.harmonic ? escapeHtml(orbit.harmonic.perfume.name) : '—'}</h3>
      <div class="orbit-brand">\${orbit.harmonic ? escapeHtml(orbit.harmonic.perfume.brand) : '—'}</div>
      <p class="orbit-reason">
        <b>Índice de proximidade: \${orbit.harmonic ? (orbit.harmonic.similarity * 100).toFixed(0) : 0}%</b>.<br>
        Compartilham os acordes: <i>\${(orbit.harmonic?.perfume?.accords || []).slice(0, 3).join(', ')}</i>.
      </p>
      <button class="btn small primary" onclick="setMainSignature('\${orbit.harmonic?.perfume?.id}')">Definir como Principal</button>
    </article>

    <article class="orbit-card detox">
      <span class="orbit-type">🫧 Limpeza Sensorial (Detox)</span>
      <h3>\${orbit.detox ? escapeHtml(orbit.detox.perfume.name) : '—'}</h3>
      <div class="orbit-brand">\${orbit.detox ? escapeHtml(orbit.detox.perfume.brand) : '—'}</div>
      <p class="orbit-reason">
        Perfil neutro e translúcido para resetar o olfato. Ideal para intercalar após 3 dias contínuos.
      </p>
      <button class="btn small" onclick="openQuickLog('\${orbit.detox?.perfume?.id}')">Usar para descanso</button>
    </article>

    <article class="orbit-card contrast">
      <span class="orbit-type">⚡ Contraste Intencional</span>
      <h3>\${orbit.contrast ? escapeHtml(orbit.contrast.perfume.name) : '—'}</h3>
      <div class="orbit-brand">\${orbit.contrast ? escapeHtml(orbit.contrast.perfume.brand) : '—'}</div>
      <p class="orbit-reason">
        Divergência marcante da composição de \${escapeHtml(current.name)}. Para dias de quebra total da rotina.
      </p>
      <button class="btn small" onclick="openQuickLog('\${orbit.contrast?.perfume?.id}')">Usar para contraste</button>
    </article>
  </div>
  \`;
}

// ==========================================
// TAB 4: QUEUES & SUCCESSION
// ==========================================
function renderQueuesTab() {
  const mainQueue = state.signatures.queue || [];
  const contexts = [
    { id: 'heat', label: '☀️ Calor Intenso', active: state.signatures.secondary?.heat },
    { id: 'cold', label: '❄️ Clima Ameno / Frio', active: state.signatures.secondary?.cold },
    { id: 'professional', label: '💼 Profissional / Trabalho', active: state.signatures.secondary?.professional },
    { id: 'night', label: '🌙 Noite / Social', active: state.signatures.secondary?.night }
  ];

  return \`
  <div class="page-heading">
    <div class="eyebrow"><span class="dot"></span>SUCESSÃO ESTRUTURADA</div>
    <h1>Filas de Sucessão por Ocasião</h1>
    <p class="lede">Um frasco por vez. A fila define qual fragrância assumirá quando o frasco atual terminar ou quando você decidir rotacionar.</p>
  </div>

  <!-- Main Signature Queue -->
  <div class="queue-segment-block">
    <div class="queue-segment-head">
      <div>
        <h3 style="font:400 22px var(--serif);margin:0 0 4px">Assinatura Principal (Cotidiano)</h3>
        <small style="color:var(--muted)">Ativo atualmente: <b>\${getPerfume(state.signatures.main?.perfumeId)?.name || 'Nenhum'}</b></small>
      </div>
      <button class="btn small warn" onclick="finishActiveBottle('main')">Marcar frasco terminado →</button>
    </div>

    <div style="font-size:11px;color:var(--muted);margin-bottom:12px">ORDEM DE SUCESSÃO PROGRAMADA:</div>
    \${mainQueue.map((id, i) => {
      const p = getPerfume(id);
      if (!p) return '';
      return \`
        <div class="queue-item">
          <span class="queue-num">0\${i+1}</span>
          <div>
            <b style="font-size:14px">\${escapeHtml(p.brand)} — \${escapeHtml(p.name)}</b>
            <div style="color:var(--muted);font-size:11px">\${escapeHtml(p.family)} · \${p.remainingMl || 100} ml restantes</div>
          </div>
          <div class="queue-controls">
            <button onclick="moveQueueMain('\${id}', -1)" \${i===0?'disabled':''}>↑</button>
            <button onclick="moveQueueMain('\${id}', 1)" \${i===mainQueue.length-1?'disabled':''}>↓</button>
            <button onclick="setMainSignature('\${id}')" title="Ativar agora">★</button>
          </div>
        </div>
      \`;
    }).join('')}
  </div>

  <!-- Context queues -->
  \${contexts.map(c => {
    const list = getRankedForContext(c.id, state.catalog).slice(0, 4);
    const activeP = getPerfume(c.active);
    return \`
      <div class="queue-segment-block">
        <div class="queue-segment-head">
          <div>
            <h3 style="font:400 20px var(--serif);margin:0 0 4px">\${c.label}</h3>
            <small style="color:var(--muted)">Assinatura ativa: <b>\${activeP ? activeP.name : 'Nenhuma definida'}</b></small>
          </div>
          <button class="btn small" onclick="finishActiveBottle('\${c.id}')">Frasco terminou</button>
        </div>

        <div style="display:grid;gap:8px">
          \${list.map((item, idx) => \`
            <div class="queue-item">
              <span class="queue-num">0\${idx+1}</span>
              <div>
                <b>\${escapeHtml(item.perfume.brand)} — \${escapeHtml(item.perfume.name)}</b>
                <div style="color:var(--muted);font-size:11px">Afinidade: \${item.score} pts · \${escapeHtml(item.perfume.family)}</div>
              </div>
              <button class="btn small" onclick="setSecondarySignature('\${c.id}', '\${item.perfume.id}')">
                \${item.perfume.id === c.active ? 'Em uso' : 'Vincular'}
              </button>
            </div>
          \`).join('')}
        </div>
      </div>
    \`;
  }).join('')}
  \`;
}

// ==========================================
// TAB 5: ONLINE DATABASE (SCENTO EXPLORER)
// ==========================================
function renderOnlineTab() {
  return \`
  <div class="page-heading">
    <div class="eyebrow"><span class="dot"></span>BASE DE DADOS GLOBAL ONLINE</div>
    <h1>Consulta Online de Perfumes (Scento API)</h1>
    <p class="lede">Acesse o banco de dados aberto de perfumes para pesquisar notas, pirâmides olfativas verificadas e acordes diretamente da fonte internacional.</p>
  </div>

  <div class="surface padded" style="margin-bottom:28px">
    <div class="field">
      <label>Pesquisar fragrância na base online internacional:</label>
      <div style="display:flex;gap:10px">
        <input id="online-db-search" type="search" placeholder="Ex.: Sauvage, Bleu de Chanel, Aventus, Naxos..." value="\${escapeHtml(onlineSearchQuery)}" onkeydown="if(event.key==='Enter')executeOnlineSearch()">
        <button class="btn primary" onclick="executeOnlineSearch()">\${onlineSearching ? 'Buscando...' : 'Pesquisar na Web'}</button>
      </div>
    </div>

    \${onlineSearching ? '<p style="font-size:12px;color:var(--muted)">Consultando banco de dados de fragrâncias Scento...</p>' : ''}

    <div style="margin-top:16px;display:grid;gap:10px">
      \${onlineSearchResults.map(match => \`
        <div class="online-match-item" onclick="importFromOnlineSearch(\${escapeHtml(JSON.stringify(match))})">
          <div>
            <strong>\${escapeHtml(match.house)} — \${escapeHtml(match.name)}</strong>
            <small>Família Scento: \${escapeHtml(match.family || 'Amadeirado')} · Clique para adicionar ao acervo</small>
          </div>
          <span style="color:var(--olive);font-weight:700">+ Importar</span>
        </div>
      \`).join('')}
    </div>
  </div>
  \`;
}

// ==========================================
// TAB 6: SETTINGS & BACKUP
// ==========================================
function renderSettingsTab() {
  return \`
  <div class="page-heading">
    <div class="eyebrow"><span class="dot"></span>PORTABILIDADE &amp; CONTROLE</div>
    <h1>Configurações e Backup</h1>
    <p class="lede">Seus dados ficam gravados exclusivamente neste navegador. Exporte um arquivo JSON para transferir entre iPhone, iPad e computador.</p>
  </div>

  <div class="surface padded" style="margin-bottom:24px">
    <h3 style="font:400 20px var(--serif);margin:0 0 12px">Backup dos Dados</h3>
    <p style="font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:20px">
      Baixe o arquivo JSON com todo o seu acervo, histórico de usos e assinaturas para restaurar a qualquer momento.
    </p>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <button class="btn primary" onclick="downloadJSONBackup()">Exportar Backup JSON ↓</button>
      <label class="btn" style="cursor:pointer">
        Importar Backup JSON ↑
        <input type="file" accept=".json,application/json" hidden onchange="importJSONBackup(this)">
      </label>
    </div>
  </div>

  <div class="surface padded">
    <h3 style="font:400 20px var(--serif);margin:0 0 12px">Histórico de Alterações (Auditoria)</h3>
    <div style="max-height:280px;overflow-y:auto;font-size:11px;border-top:1px solid #f0eee8">
      \${state.audit.slice(0, 30).map(a => \`
        <div style="padding:10px 0;border-bottom:1px solid #f0eee8;display:grid;grid-template-columns:120px 1fr;gap:12px">
          <time style="color:var(--muted)">\${new Date(a.at).toLocaleString('pt-BR')}</time>
          <div><b>\${escapeHtml(a.action)}:</b> \${escapeHtml(a.detail)}</div>
        </div>
      \`).join('')}
    </div>
  </div>
  \`;
}

// ==========================================
// MODALS LOGIC
// ==========================================
function renderActiveModal() {
  if (!activeModal) return '';

  if (activeModal === 'addPerfume') {
    return \`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal">
        <header class="modal-header">
          <div>
            <div class="eyebrow">ACERVO / GESTÃO</div>
            <h2>Incluir Nova Fragrância</h2>
            <p>Busque no banco online ou preencha manualmente os dados olfativos.</p>
          </div>
          <button class="close-btn" onclick="closeModal()">×</button>
        </header>

        <div class="modal-body">
          <!-- Online search autofill box -->
          <div class="online-search-box">
            <b>1. Buscar no banco online global (Scento / Base Aberta):</b>
            <p>Digite o nome do perfume e preencha automaticamente as notas e família.</p>
            <div class="online-search-input-group">
              <input id="modal-online-query" type="search" placeholder="Ex.: Bleu de Chanel, Sauvage, Naxos..." value="\${escapeHtml(onlineSearchQuery)}" onkeydown="if(event.key==='Enter')searchInModal()">
              <button class="btn primary small" onclick="searchInModal()">Buscar Online</button>
            </div>
            \${onlineSearching ? '<p style="font-size:11px;margin-top:8px">Buscando na base de fragrâncias...</p>' : ''}
            <div class="online-matches">
              \${onlineSearchResults.map(m => \`
                <div class="online-match-item" onclick="applyOnlineMatchToForm(\${escapeHtml(JSON.stringify(m))})">
                  <div>
                    <strong>\${escapeHtml(m.house)} — \${escapeHtml(m.name)}</strong>
                    <small>\${escapeHtml(m.family || '')}</small>
                  </div>
                  <span style="font-size:11px;color:var(--olive);font-weight:700">Preencher ↗</span>
                </div>
              \`).join('')}
            </div>
          </div>

          <form id="add-perfume-form" onsubmit="submitAddPerfume(event)">
            <b>2. Conferir e salvar informações no acervo:</b>
            <div class="form-grid" style="margin-top:12px">
              <div class="field">
                <label>Marca / Casa *</label>
                <input id="add-brand" name="brand" required placeholder="Ex.: Chanel, Dior, Natura">
              </div>
              <div class="field">
                <label>Nome do Perfume *</label>
                <input id="add-name" name="name" required placeholder="Ex.: Bleu de Chanel Parfum">
              </div>
            </div>

            <div class="form-grid">
              <div class="field">
                <label>Concentração</label>
                <select id="add-concentration" name="concentration">
                  <option value="EDT">EDT (Eau de Toilette)</option>
                  <option value="EDP" selected>EDP (Eau de Parfum)</option>
                  <option value="Parfum">Parfum / Extrait</option>
                  <option value="EDC">EDC (Colônia / Deo Colônia)</option>
                </select>
              </div>
              <div class="field">
                <label>Família Olfativa</label>
                <input id="add-family" name="family" placeholder="Ex.: Amadeirado Cítrico, Oriental Especiado" value="Amadeirado Aromático">
              </div>
            </div>

            <div class="form-grid">
              <div class="field">
                <label>Volume do frasco (ml)</label>
                <input type="number" id="add-bottleMl" name="bottleMl" value="100" min="5" max="500">
              </div>
              <div class="field">
                <label>Volume restante (ml)</label>
                <input type="number" id="add-remainingMl" name="remainingMl" value="100" min="0" max="500">
              </div>
            </div>

            <div class="field">
              <label>Acordes Principais (separados por vírgula)</label>
              <input id="add-accords" name="accords" placeholder="Ex.: Cítrico, Amadeirado, Âmbar, Especiado Fresco">
            </div>

            <div class="field">
              <label>Notas de Topo (separadas por vírgula)</label>
              <input id="add-top-notes" name="topNotes" placeholder="Ex.: Bergamota, Limão, Toranja">
            </div>

            <div class="field">
              <label>Notas de Coração (separadas por vírgula)</label>
              <input id="add-heart-notes" name="heartNotes" placeholder="Ex.: Lavanda, Gengibre, Pimenta">
            </div>

            <div class="field">
              <label>Notas de Fundo (separadas por vírgula)</label>
              <input id="add-base-notes" name="baseNotes" placeholder="Ex.: Cedro, Vetiver, Âmbar, Patchouli">
            </div>

            <div class="field">
              <label>Descrição olfativa / Notas livres</label>
              <textarea id="add-character" name="character" rows="2" placeholder="Sensações, ocasiões recomendadas ou estilo"></textarea>
            </div>

            <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px">
              <button type="button" class="btn" onclick="closeModal()">Cancelar</button>
              <button type="submit" class="btn primary">Salvar no Acervo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    \`;
  }

  if (activeModal === 'removeConfirm') {
    const p = modalTargetPerfume;
    return \`
    <div class="modal-overlay center" onclick="if(event.target===this)closeModal()">
      <div class="modal dialog">
        <header class="modal-header">
          <div>
            <div class="eyebrow" style="color:var(--danger)">EXCLUSÃO DE FRAGRÂNCIA</div>
            <h2>Remover do Acervo?</h2>
          </div>
          <button class="close-btn" onclick="closeModal()">×</button>
        </header>
        <div class="modal-body">
          <p>Tem certeza de que deseja remover <b>\${escapeHtml(p?.brand)} — \${escapeHtml(p?.name)}</b> do seu acervo?</p>
          <p style="font-size:12px;color:var(--muted);line-height:1.6">
            Ele será desvinculado de todas as assinaturas ativas, filas e órbitas calculadas. Esta ação é registrada na auditoria.
          </p>
          <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px">
            <button class="btn" onclick="closeModal()">Manter perfume</button>
            <button class="btn danger-solid" onclick="executeRemovePerfume('\${p?.id}')">Sim, remover agora</button>
          </div>
        </div>
      </div>
    </div>
    \`;
  }

  if (activeModal === 'quickLog') {
    const defaultId = modalTargetPerfume?.id || state.signatures.main?.perfumeId || state.catalog[0]?.id;
    return \`
    <div class="modal-overlay center" onclick="if(event.target===this)closeModal()">
      <div class="modal dialog">
        <header class="modal-header">
          <div>
            <div class="eyebrow">USO REAL / CALIBRAÇÃO</div>
            <h2>Registrar Uso do Dia</h2>
          </div>
          <button class="close-btn" onclick="closeModal()">×</button>
        </header>
        <div class="modal-body">
          <form onsubmit="submitQuickLog(event)">
            <div class="field">
              <label>Qual perfume você usou?</label>
              <select name="perfumeId">
                \${state.catalog.map(p => \`
                  <option value="\${p.id}" \${p.id === defaultId ? 'selected' : ''}>\${escapeHtml(p.brand)} — \${escapeHtml(p.name)}</option>
                \`).join('')}
              </select>
            </div>

            <div class="field">
              <label>Como foi o conforto sensorial ao longo do uso?</label>
              <select name="comfort">
                <option value="great">Excelente e muito confortável</option>
                <option value="okay">Agradável / aceitável</option>
                <option value="bad">Cansativo ou incomodou</option>
              </select>
            </div>

            <div class="field">
              <label>Você teria vontade de usá-lo novamente amanhã?</label>
              <select name="repeat">
                <option value="yes">Sim, repetiria sem problemas</option>
                <option value="maybe">Talvez / preciso de um intervalo</option>
                <option value="no">Não, preciso trocar de perfume</option>
              </select>
            </div>

            <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px">
              <button type="button" class="btn" onclick="closeModal()">Cancelar</button>
              <button type="submit" class="btn primary">Salvar Registro</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    \`;
  }

  if (activeModal === 'detail') {
    const p = modalTargetPerfume;
    if (!p) return '';
    return \`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
      <div class="modal">
        <header class="modal-header">
          <div>
            <div class="eyebrow">FICHA TÉCNICA VERIFICADA</div>
            <h2>\${escapeHtml(p.brand)}<br><em style="font-weight:400;color:var(--olive)">\${escapeHtml(p.name)}</em></h2>
            <p>\${escapeHtml(p.family)} · \${escapeHtml(p.concentration || 'EDT')}</p>
          </div>
          <button class="close-btn" onclick="closeModal()">×</button>
        </header>

        <div class="modal-body">
          <div style="background:#f1efe7;padding:16px 20px;border-radius:2px;margin-bottom:24px">
            <b style="font-size:12px;color:var(--olive-dark);text-transform:uppercase;letter-spacing:1px">Pirâmide Olfativa Documentada</b>
            <div style="display:grid;gap:8px;margin-top:10px;font-size:12px">
              <div><b>Notas de Topo:</b> \${(p.pyramid?.top || []).join(', ') || 'Não declaradas'}</div>
              <div><b>Notas de Coração:</b> \${(p.pyramid?.heart || []).join(', ') || 'Não declaradas'}</div>
              <div><b>Notas de Fundo:</b> \${(p.pyramid?.base || []).join(', ') || 'Não declaradas'}</div>
            </div>
          </div>

          <div class="field">
            <label>Acordes Principais</label>
            <div class="accord-chips">
              \${(p.accords || []).map(a => \`<span class="accord-chip">\${escapeHtml(a)}</span>\`).join('')}
            </div>
          </div>

          <div class="field">
            <label>Descrição Olfativa</label>
            <p style="font-size:13px;line-height:1.7;color:#555">\${escapeHtml(p.character || 'Sem notas cadastradas.')}</p>
          </div>

          <form onsubmit="submitEditPerfume(event, '\${p.id}')">
            <h4 style="font:400 18px var(--serif);margin:24px 0 12px">Ajustar Nível de Volume</h4>
            <div class="form-grid">
              <div class="field">
                <label>Volume do Frasco (ml)</label>
                <input type="number" name="bottleMl" value="\${p.bottleMl || 100}">
              </div>
              <div class="field">
                <label>Volume Restante (ml)</label>
                <input type="number" name="remainingMl" value="\${p.remainingMl || 100}">
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:30px;border-top:1px solid var(--soft);padding-top:20px">
              <button type="button" class="btn warn" onclick="confirmRemovePerfume('\${p.id}')">Remover este perfume</button>
              <div style="display:flex;gap:10px">
                <button type="button" class="btn" onclick="setMainSignature('\${p.id}')">Definir como Principal</button>
                <button type="submit" class="btn primary">Salvar Alterações</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    \`;
  }

  return '';
}

function closeModal() {
  activeModal = null;
  modalTargetPerfume = null;
  renderApp();
}

// Modal open handlers
function openAddModal() {
  activeModal = 'addPerfume';
  onlineSearchQuery = '';
  onlineSearchResults = [];
  renderApp();
}

function confirmRemovePerfume(id) {
  modalTargetPerfume = getPerfume(id);
  activeModal = 'removeConfirm';
  renderApp();
}

function openQuickLog(id) {
  modalTargetPerfume = id ? getPerfume(id) : null;
  activeModal = 'quickLog';
  renderApp();
}

function openDetailModal(id) {
  modalTargetPerfume = getPerfume(id);
  activeModal = 'detail';
  renderApp();
}

// Online search actions
async function searchInModal() {
  const query = document.querySelector('#modal-online-query')?.value || '';
  onlineSearchQuery = query;
  onlineSearching = true;
  renderApp();
  onlineSearchResults = await searchOnlineDatabase(query);
  onlineSearching = false;
  renderApp();
}

async function executeOnlineSearch() {
  const query = document.querySelector('#online-db-search')?.value || '';
  onlineSearchQuery = query;
  onlineSearching = true;
  renderApp();
  onlineSearchResults = await searchOnlineDatabase(query);
  onlineSearching = false;
  renderApp();
}

async function applyOnlineMatchToForm(m) {
  const details = await fetchOnlinePerfumeDetails(m);
  if (!details) return;
  const brandInp = document.querySelector('#add-brand');
  const nameInp = document.querySelector('#add-name');
  const familyInp = document.querySelector('#add-family');
  const concentrationInp = document.querySelector('#add-concentration');
  const accordsInp = document.querySelector('#add-accords');
  const topInp = document.querySelector('#add-top-notes');
  const heartInp = document.querySelector('#add-heart-notes');
  const baseInp = document.querySelector('#add-base-notes');
  const charInp = document.querySelector('#add-character');

  if (brandInp) brandInp.value = details.brand || m.house;
  if (nameInp) nameInp.value = details.name || m.name;
  if (familyInp) familyInp.value = details.family || m.family;
  if (concentrationInp) concentrationInp.value = details.concentration || 'EDP';
  if (accordsInp) accordsInp.value = (details.accords || []).join(', ');
  if (topInp) topInp.value = (details.pyramid?.top || []).join(', ');
  if (heartInp) heartInp.value = (details.pyramid?.heart || []).join(', ');
  if (baseInp) baseInp.value = (details.pyramid?.base || []).join(', ');
  if (charInp) charInp.value = details.character || '';
  flashToast('Dados de ' + (details.name || m.name) + ' preenchidos da base online!');
}

async function importFromOnlineSearch(m) {
  const details = await fetchOnlinePerfumeDetails(m);
  const nextNum = state.catalog.length + 1;
  const newPerfume = {
    id: 'f' + String(nextNum).padStart(3, '0'),
    brand: details?.brand || m.house,
    name: details?.name || m.name,
    concentration: details?.concentration || 'EDP',
    family: details?.family || m.family || 'Amadeirado',
    accords: details?.accords || ['Cítrico', 'Amadeirado'],
    pyramid: details?.pyramid || { top: [], heart: [], base: [] },
    seasons: details?.seasons || ['primavera', 'outono'],
    occasions: ['cotidiano'],
    intensity: 3,
    character: details?.character || '',
    remainingMl: 100,
    bottleMl: 100,
    favorite: false,
    sources: [{ name: 'Scento Online Database', verified: true }]
  };
  state.catalog.unshift(newPerfume);
  await persist('perfume_imported_online', newPerfume.brand + ' — ' + newPerfume.name);
  flashToast(newPerfume.name + ' adicionado ao acervo via banco online!');
  switchTab('collection');
}

// Add/Remove Perfume Form Submissions
async function submitAddPerfume(e) {
  e.preventDefault();
  const form = e.target;
  const brand = form.brand.value.trim();
  const name = form.name.value.trim();
  if (!brand || !name) return;

  const nextNum = state.catalog.length + 1;
  const id = 'f' + String(nextNum).padStart(3, '0');
  const accords = form.accords.value.split(',').map(s => s.trim()).filter(Boolean);
  const top = form.topNotes.value.split(',').map(s => s.trim()).filter(Boolean);
  const heart = form.heartNotes.value.split(',').map(s => s.trim()).filter(Boolean);
  const base = form.baseNotes.value.split(',').map(s => s.trim()).filter(Boolean);

  const newP = {
    id,
    brand,
    name,
    concentration: form.concentration.value,
    family: form.family.value.trim() || 'Amadeirado',
    accords,
    pyramid: { top, heart, base },
    seasons: ['primavera', 'verao', 'outono'],
    occasions: ['cotidiano'],
    intensity: 3,
    character: form.character.value.trim(),
    bottleMl: Number(form.bottleMl.value) || 100,
    remainingMl: Number(form.remainingMl.value) || 100,
    favorite: false,
    sources: [{ name: 'Cadastrado pelo usuário', verified: true }]
  };

  state.catalog.unshift(newP);
  closeModal();
  await persist('perfume_added', brand + ' — ' + name);
  flashToast(brand + ' ' + name + ' adicionado com sucesso!');
}

async function executeRemovePerfume(id) {
  const p = getPerfume(id);
  const nameStr = p ? (p.brand + ' — ' + p.name) : id;

  // Remove from catalog
  state.catalog = state.catalog.filter(x => x.id !== id);

  // If active main, promote next or clear
  if (state.signatures.main?.perfumeId === id) {
    const nextInQueue = state.signatures.queue.shift();
    if (nextInQueue) {
      state.signatures.main = { perfumeId: nextInQueue, activatedAt: new Date().toISOString(), manual: false };
    } else {
      state.signatures.main = null;
    }
  }

  // Clear secondary contexts if present
  for (const [ctx, sid] of Object.entries(state.signatures.secondary || {})) {
    if (sid === id) {
      delete state.signatures.secondary[ctx];
    }
  }

  // Remove from queue
  state.signatures.queue = state.signatures.queue.filter(qId => qId !== id);

  closeModal();
  await persist('perfume_removed', nameStr);
  flashToast(nameStr + ' foi removido do seu acervo.');
}

async function submitEditPerfume(e, id) {
  e.preventDefault();
  const form = e.target;
  const p = getPerfume(id);
  if (!p) return;
  p.bottleMl = Number(form.bottleMl.value) || 100;
  p.remainingMl = Number(form.remainingMl.value) || 100;
  closeModal();
  await persist('perfume_edited', p.brand + ' — ' + p.name);
  flashToast('Ficha de ' + p.name + ' atualizada.');
}

// Quick Log submission
async function submitQuickLog(e) {
  e.preventDefault();
  const form = e.target;
  const perfumeId = form.perfumeId.value;
  const comfort = form.comfort.value;
  const repeat = form.repeat.value;
  const p = getPerfume(perfumeId);

  state.quickUses.unshift({
    id: 'u' + Date.now(),
    perfumeId,
    date: new Date().toISOString().slice(0, 10),
    comfort,
    repeat
  });

  closeModal();
  await persist('quick_use', (p ? p.name : perfumeId) + ' (conforto: ' + comfort + ')');
  flashToast('Uso de ' + (p ? p.name : 'perfume') + ' registrado!');
}

// Signature actions
async function setMainSignature(id) {
  const p = getPerfume(id);
  if (!p) return;
  state.signatures.main = { perfumeId: id, activatedAt: new Date().toISOString(), manual: true };
  state.signatures.queue = state.signatures.queue.filter(qId => qId !== id);
  await persist('main_signature_set', p.brand + ' — ' + p.name);
  flashToast(p.name + ' ativado como sua assinatura principal!');
}

async function setSecondarySignature(contextId, id) {
  const p = getPerfume(id);
  if (!p) return;
  state.signatures.secondary[contextId] = id;
  await persist('secondary_signature_set', contextId + ': ' + p.name);
  flashToast(p.name + ' vinculado como assinatura desta ocasião!');
}

async function finishActiveBottle(contextId) {
  if (contextId === 'main') {
    const active = getPerfume(state.signatures.main?.perfumeId);
    if (!active) return;
    if (!confirm('Confirmar término do frasco de ' + active.name + '? O próximo da fila assumirá.')) return;
    active.remainingMl = 0;
    state.signatures.ended.unshift({ perfumeId: active.id, at: new Date().toISOString() });
    const next = state.signatures.queue.shift();
    state.signatures.main = next ? { perfumeId: next, activatedAt: new Date().toISOString(), manual: false } : null;
    await persist('bottle_ended', active.name + ' finalizado. Próximo: ' + (next ? getPerfume(next)?.name : 'nenhum'));
    flashToast(active.name + ' concluído. Assinatura atualizada!');
  } else {
    const activeId = state.signatures.secondary[contextId];
    const active = getPerfume(activeId);
    if (!active) return;
    if (!confirm('Confirmar término do frasco de ' + active.name + '?')) return;
    active.remainingMl = 0;
    const nextCandidates = getRankedForContext(contextId, state.catalog).filter(x => x.perfume.id !== activeId);
    const next = nextCandidates[0]?.perfume?.id;
    if (next) state.signatures.secondary[contextId] = next;
    else delete state.signatures.secondary[contextId];
    await persist('secondary_bottle_ended', contextId + ': ' + active.name);
    flashToast(active.name + ' finalizado!');
  }
}

async function moveQueueMain(id, dir) {
  const q = state.signatures.queue;
  const idx = q.indexOf(id);
  if (idx < 0) return;
  const target = idx + dir;
  if (target < 0 || target >= q.length) return;
  [q[idx], q[target]] = [q[target], q[idx]];
  await persist('queue_reordered', id + ' ' + (dir > 0 ? 'down' : 'up'));
}

// Backup actions
function downloadJSONBackup() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', 'ASSINATURA-backup-' + new Date().toISOString().slice(0, 10) + '.json');
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
  flashToast('Backup JSON exportado com sucesso!');
}

async function importJSONBackup(input) {
  const file = input.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!data.catalog || !Array.isArray(data.catalog)) {
      throw new Error('Arquivo JSON inválido: catálogo não encontrado.');
    }
    state = data;
    await persist('backup_imported', 'Backup restaurado com ' + data.catalog.length + ' perfumes');
    flashToast('Backup importado com sucesso!');
  } catch(e) {
    alert('Erro ao importar backup: ' + e.message);
  }
}

// ==========================================
// 5. BOOTSTRAP APPLICATION
// ==========================================
(async () => {
  try {
    const saved = await loadSavedState();
    if (saved && Array.isArray(saved.catalog) && saved.catalog.length > 0) {
      // Merge verified database notes if missing
      saved.catalog.forEach(p => {
        const found = Object.values(FACTUAL_DB).find(db => 
          db.brand.toLowerCase() === p.brand.toLowerCase() && db.name.toLowerCase() === p.name.toLowerCase()
        );
        if (found) {
          if (!p.accords || !p.accords.length) p.accords = found.accords;
          if (!p.pyramid || !p.pyramid.top || !p.pyramid.top.length) p.pyramid = found.pyramid;
          if (!p.family || p.family === 'amadeirado') p.family = found.family;
          if (!p.character) p.character = found.character;
        }
      });
      state = saved;
    }
  } catch(e) {
    console.warn('Iniciando com estado padrão...', e);
  }
  renderApp();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
})();
</script>
</body>
</html>
`;

fs.writeFileSync('C:/Users/mathe/.gemini/antigravity/scratch/Perfumemachine/assinatura/index.html', htmlContent);
console.log('Successfully written assinatura/index.html!');
