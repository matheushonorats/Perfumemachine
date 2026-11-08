const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- STARTING IN-DEPTH REVIEW FIX VERIFICATION SUITE ---');

// Load generated HTML and extract scripts
const html = fs.readFileSync('assinatura/index.html', 'utf8');
const scriptBlocks = html.match(/<script>([\s\S]*?)<\/script>/g);
assert.strictEqual(scriptBlocks.length, 2, '2 script blocks present');

// Mock DOM environment for node
global.document = {
  querySelector: () => ({ innerHTML: '', remove: () => {} }),
  getElementById: () => null,
  activeElement: null
};
global.window = {
  scrollTo: () => {}
};

const vm = require('vm');

// Evaluate scripts in global context
let jsCode = '';
scriptBlocks.forEach(b => {
  jsCode += b.replace(/<\/?script>/g, '').replace(/^(const|let) /gm, 'var ') + '\n';
});
vm.runInThisContext(jsCode);

console.log('✓ 1. Script evaluation successful. Database size:', Object.keys(FACTUAL_DB).length);

// 2. Test generatePerfumeId monotonicity & collision resistance
const testCatalog = [
  { id: 'f001' },
  { id: 'f050' },
  { id: 'f141' }
];
const id1 = generatePerfumeId(testCatalog);
assert.strictEqual(id1, 'f142', 'Generates f142 when f141 is max');
// Simulate deleting f050
const catalogAfterDelete = testCatalog.filter(p => p.id !== 'f050');
const id2 = generatePerfumeId(catalogAfterDelete);
assert.strictEqual(id2, 'f142', 'Generates f142 even after deletion, avoiding collision with existing f141');
console.log('✓ 2. Unique monotonic ID generation verified: no collision on delete+add.');

// 3. Test Normalization of Scento English descriptors & flat notes
const sampleScentoSauvage = {
  name: "Sauvage",
  house: "Dior",
  concentration: "eau de toilette",
  family: "Sunlit Citrus",
  pyramid: null,
  notes: ["Bergamot", "Pepper", "Amberwood"],
  character: "Sharp, bright bergamot and pepper give way to amberwood.",
  character_words: ["warm", "citrusy", "spicy", "amber"],
  wears: { seasons: ["spring", "summer", "autumn"], hours: ["day", "evening"] }
};

const normalized = normalizeScentoDetails(sampleScentoSauvage, {});
assert.strictEqual(normalized.brand, 'Dior');
assert.strictEqual(normalized.family, 'Cítrico Aromático', 'Sunlit Citrus translated to Cítrico Aromático');
assert.deepStrictEqual(normalized.accords, ['Especiado Quente', 'Cítrico', 'Especiado', 'Âmbar']);
assert.deepStrictEqual(normalized.pyramid.top, ['Bergamota']);
assert.deepStrictEqual(normalized.pyramid.heart, ['Pimenta']);
assert.deepStrictEqual(normalized.pyramid.base, ['Madeira de Âmbar']);
assert.deepStrictEqual(normalized.seasons, ['primavera', 'verao', 'outono']);
console.log('✓ 3. Scento data normalization verified: English descriptors, flat notes, and seasons correctly mapped.');

// 4. Test Mathematical Similarity with normalized online perfume
const terreLocal = Object.values(FACTUAL_DB).find(p => p.name.includes('Terre'));
const sim = computeSimilarity(normalized, terreLocal);
assert.ok(sim > 0.05, `Similarity against Terre d'Hermès is non-zero and grounded: ${sim.toFixed(3)}`);
console.log('✓ 4. Olfactory similarity between imported online perfume and local database verified:', (sim * 100).toFixed(1) + '%');

// 5. Test Context Scoring with translated seasons
const heatScore = getContextScore(normalized, 'heat');
assert.ok(heatScore >= 50, `Heat context score is strong for Sauvage: ${heatScore} pts`);
const nightScore = getContextScore(normalized, 'night');
assert.ok(nightScore >= 50, `Night context score is strong for Sauvage: ${nightScore} pts`);
console.log('✓ 5. Context scores verified for seasons and occasions:', { heatScore, nightScore });

// 6. Test Merged Search (Local Verified + Scento Online)
(async () => {
  // Search for Brazilian brand not in Scento (Granado)
  const granadoResults = await searchOnlineDatabase('Granado');
  assert.ok(granadoResults.length >= 5, 'Found Granado perfumes from local verified dataset');
  assert.strictEqual(granadoResults[0].house, 'Granado');
  assert.ok(granadoResults[0].badge.includes('Verificado'), 'Badge indicates verified database source');
  console.log('✓ 6. Merged search verified: local verified dataset fills coverage gaps for Brazilian brands.');

  // 7. Test renderOrbitsTab null safety
  const originalState = state;
  state = { catalog: [], signatures: { main: null, secondary: {}, queue: [] } };
  activeDetailId = 'f999';
  const orbitsHtml = renderOrbitsTab();
  assert.ok(orbitsHtml.includes('Nenhuma fragrância selecionada ou o acervo está vazio'), 'Clean empty state rendered');
  state = originalState;
  console.log('✓ 7. Null safety in renderOrbitsTab verified: no crash when target or catalog is empty.');

  // 8. Test Form Autofill State Binding
  resetAddFormData();
  assert.strictEqual(addFormData.brand, '');
  await applyOnlineMatchToForm(granadoResults[0]);
  assert.strictEqual(addFormData.brand, 'Granado');
  assert.ok(addFormData.topNotes.length > 0, 'Top notes populated in addFormData');
  assert.ok(addFormData.accords.length > 0, 'Accords populated in addFormData');
  
  // Test modal rendering reflects addFormData
  activeModal = 'addPerfume';
  const modalHtml = renderActiveModal();
  assert.ok(modalHtml.includes('value="Granado"'), 'Modal template binds addFormData.brand');
  assert.ok(modalHtml.includes(`value="${escapeHtml(addFormData.name)}"`), 'Modal template binds addFormData.name');
  console.log('✓ 8. Add Perfume form data binding verified: autofill values persist in DOM on render.');

  // 9. Test Secondary Signature Automatic Promotion on removal
  const cat = [
    { id: 'f001', brand: 'A', name: 'Perfume 1', accords: ['Cítrico'], seasons: ['verao'], occasions: ['calor'], remainingMl: 50 },
    { id: 'f002', brand: 'B', name: 'Perfume 2', accords: ['Cítrico'], seasons: ['verao'], occasions: ['calor'], remainingMl: 50 },
    { id: 'f003', brand: 'C', name: 'Perfume 3', accords: ['Baunilha'], seasons: ['inverno'], occasions: ['frio'], remainingMl: 50 }
  ];
  state = {
    catalog: [...cat],
    signatures: {
      main: { perfumeId: 'f001' },
      secondary: { heat: 'f001', cold: 'f003' },
      queue: []
    },
    audit: []
  };

  await executeRemovePerfume('f001');
  assert.strictEqual(state.catalog.some(p => p.id === 'f001'), false, 'f001 removed from catalog');
  assert.strictEqual(state.signatures.secondary.heat, 'f002', 'Secondary heat signature promoted next best candidate (f002)');
  console.log('✓ 9. Secondary signature promotion on deletion verified.');

  console.log('--- ALL FIX VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
})();
