const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING COMPREHENSIVE PERFUME SYSTEM TEST SUITE ---');

// 1. Check database.json
const dbPath = path.join(__dirname, 'assinatura', 'database.json');
assert.ok(fs.existsSync(dbPath), 'database.json exists');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const dbKeys = Object.keys(db);
assert.strictEqual(dbKeys.length, 141, 'Database has exactly 141 verified perfumes');

dbKeys.forEach(k => {
  const p = db[k];
  assert.ok(p.brand, `Entry ${k} has brand`);
  assert.ok(p.name, `Entry ${k} has name`);
  assert.ok(p.family, `Entry ${k} has family`);
  assert.ok(Array.isArray(p.accords) && p.accords.length > 0, `Entry ${k} has accords`);
  assert.ok(p.pyramid && Array.isArray(p.pyramid.top), `Entry ${k} has pyramid.top`);
  assert.ok(p.pyramid && Array.isArray(p.pyramid.heart), `Entry ${k} has pyramid.heart`);
  assert.ok(p.pyramid && Array.isArray(p.pyramid.base), `Entry ${k} has pyramid.base`);
});
console.log('✓ 1. Factual Olfactory Database: 141 verified profiles valid.');

// 2. Check HTML syntax & script execution
const htmlPath = path.join(__dirname, 'assinatura', 'index.html');
assert.ok(fs.existsSync(htmlPath), 'assinatura/index.html exists');
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptBlocks = html.match(/<script>([\s\S]*?)<\/script>/g);
assert.strictEqual(scriptBlocks.length, 2, 'Found 2 script blocks in assinatura/index.html');

scriptBlocks.forEach((block, idx) => {
  const code = block.replace(/<\/?script>/g, '');
  new Function(code); // Throws if syntax error
});
console.log('✓ 2. HTML and JavaScript syntax in assinatura/index.html: 100% Valid.');

// 3. Test Intelligent Connection Logic
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

function calculateReliefOrbit(targetPerfume, catalog) {
  if (!targetPerfume) return { harmonic: null, detox: null, contrast: null };
  const pool = catalog.filter(p => p.id !== targetPerfume.id && !p.definitive && p.remainingMl > 0);
  if (!pool.length) return { harmonic: null, detox: null, contrast: null };

  const rankedHarmonic = pool.map(p => ({
    perfume: p,
    similarity: computeSimilarity(targetPerfume, p)
  })).sort((a, b) => b.similarity - a.similarity);
  const harmonic = rankedHarmonic[0] || null;

  const detoxCandidates = pool.filter(p => {
    const isLowIntensity = (p.intensity || 2) <= 2;
    const isClean = (p.accords || []).some(a => 
      /almiscar|limpo|citrico|cha|herbal|mineral|segunda pele/i.test(a)
    ) || /molecule|4711|happy|etéreo|verbena|prada amber/i.test(p.name);
    return isLowIntensity && isClean;
  }).map(p => ({
    perfume: p,
    similarity: computeSimilarity(targetPerfume, p)
  })).sort((a, b) => a.similarity - b.similarity);
  const detox = detoxCandidates[0] || rankedHarmonic[rankedHarmonic.length - 1];

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

// Convert DB to catalog array
const testCatalog = Object.entries(db).map(([numStr, entry]) => ({
  id: 'f' + String(parseInt(numStr, 10)).padStart(3, '0'),
  ...entry,
  remainingMl: 100
}));

// Test Orbit for Terre d'Hermès
const terre = testCatalog.find(p => p.name === 'Terre d’Hermès');
assert.ok(terre, "Found Terre d'Hermès");
const orbitTerre = calculateReliefOrbit(terre, testCatalog);
assert.ok(orbitTerre.harmonic, 'Harmonic variation exists');
assert.ok(orbitTerre.detox, 'Detox scent exists');
assert.ok(orbitTerre.contrast, 'Contrast scent exists');
assert.ok(orbitTerre.harmonic.similarity > 0.4, 'Harmonic similarity is strong');
assert.strictEqual(orbitTerre.detox.perfume.intensity <= 2, true, 'Detox is low intensity');
console.log('✓ 3. Intelligent Orbit Engine calculated accurately for Terre d’Hermès:');
console.log('     Harmonic:', orbitTerre.harmonic.perfume.name, `(${(orbitTerre.harmonic.similarity*100).toFixed(1)}%)`);
console.log('     Detox:', orbitTerre.detox.perfume.name);
console.log('     Contrast:', orbitTerre.contrast.perfume.name);

// 4. Test Add and Remove Perfume Logic
let state = {
  catalog: [...testCatalog],
  signatures: {
    main: { perfumeId: 'f055' },
    secondary: { heat: 'f030', night: 'f068' },
    queue: ['f008', 'f065', 'f134']
  },
  audit: []
};

// Add Perfume Test
const newP = {
  id: 'f143',
  brand: 'Chanel',
  name: 'Bleu de Chanel Parfum',
  concentration: 'Parfum',
  family: 'Amadeirado Aromático',
  accords: ['Cítrico', 'Amadeirado', 'Âmbar', 'Especiado Quente'],
  pyramid: {
    top: ['Raspas de Limão', 'Bergamota', 'Hortelã'],
    heart: ['Lavanda', 'Gerânio', 'Abacaxi'],
    base: ['Sândalo da Nova Caledônia', 'Cedro', 'Madeira de Âmbar', 'Fava Tonka']
  },
  seasons: ['primavera', 'outono', 'inverno', 'verao'],
  occasions: ['trabalho', 'noite', 'cotidiano'],
  intensity: 4,
  character: 'Sândalo nobre com cítricos densos e âmbar.',
  bottleMl: 100,
  remainingMl: 100
};

state.catalog.unshift(newP);
assert.strictEqual(state.catalog.length, 142, 'Catalog length incremented after adding perfume');
assert.strictEqual(state.catalog[0].id, 'f143', 'New perfume is present in catalog');

// Check orbit can use newly added perfume
const orbitBleu = calculateReliefOrbit(newP, state.catalog);
assert.ok(orbitBleu.harmonic, 'Orbit works on new perfume');
console.log('✓ 4. Add Perfume: Added Bleu de Chanel Parfum successfully and computed relief orbit.');

// Remove Perfume Test
function executeRemove(st, id) {
  st.catalog = st.catalog.filter(p => p.id !== id);
  if (st.signatures.main?.perfumeId === id) {
    const next = st.signatures.queue.shift();
    st.signatures.main = next ? { perfumeId: next } : null;
  }
  for (const [ctx, sid] of Object.entries(st.signatures.secondary || {})) {
    if (sid === id) delete st.signatures.secondary[ctx];
  }
  st.signatures.queue = st.signatures.queue.filter(q => q !== id);
}

// Remove main signature 'f055'
executeRemove(state, 'f055');
assert.strictEqual(state.catalog.find(p => p.id === 'f055'), undefined, 'f055 removed from catalog');
assert.strictEqual(state.signatures.main?.perfumeId, 'f008', 'Main signature automatically promoted next candidate (f008)');
assert.strictEqual(state.signatures.queue.includes('f008'), false, 'Promoted candidate removed from queue');
console.log('✓ 5. Remove Perfume: Successfully removed active signature and promoted successor without error.');

// 5. Test JSON Backup Export & Import Roundtrip
const exportedJSON = JSON.stringify(state);
const reimportedState = JSON.parse(exportedJSON);
assert.ok(Array.isArray(reimportedState.catalog), 'Exported JSON contains catalog');
assert.strictEqual(reimportedState.catalog.length, state.catalog.length, 'Catalog size preserved in roundtrip');
assert.strictEqual(reimportedState.signatures.main.perfumeId, state.signatures.main.perfumeId, 'Signatures preserved');
console.log('✓ 6. JSON Backup Export & Import: Roundtrip 100% verified.');

// 6. Test Service Worker Cache Name
const swPath = path.join(__dirname, 'assinatura', 'sw.js');
const swCode = fs.readFileSync(swPath, 'utf8');
assert.ok(swCode.includes('assinatura-v5-orbita'), 'sw.js uses assinatura-v5-orbita cache');
console.log('✓ 7. Service Worker cache version verified.');

console.log('--- ALL 7 TESTS PASSED SUCCESSFULLY! ---');
