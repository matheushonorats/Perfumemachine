const assert = require('assert');

// Test edge cases
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

console.log('Testing Edge Cases...');

// Edge case 1: Target perfume is null or undefined
const resNull = calculateReliefOrbit(null, []);
assert.deepStrictEqual(resNull, { harmonic: null, detox: null, contrast: null });
console.log('✓ Edge case 1 passed: null target returns null orbits gracefully.');

// Edge case 2: Catalog has only 1 perfume (target itself)
const singleCatalog = [{ id: 'f001', name: 'Only One', remainingMl: 100 }];
const resSingle = calculateReliefOrbit(singleCatalog[0], singleCatalog);
assert.deepStrictEqual(resSingle, { harmonic: null, detox: null, contrast: null });
console.log('✓ Edge case 2 passed: single item catalog returns null orbits without crashing.');

// Edge case 3: Perfumes with empty notes or empty accords
const emptyNotesA = { id: 'a', name: 'A', accords: [], pyramid: {}, remainingMl: 50 };
const emptyNotesB = { id: 'b', name: 'B', accords: null, pyramid: null, remainingMl: 50 };
const simEmpty = computeSimilarity(emptyNotesA, emptyNotesB);
assert.strictEqual(simEmpty, 0, 'Similarity with empty notes is 0');
console.log('✓ Edge case 3 passed: empty or null accords/pyramid computes 0 similarity smoothly.');

// Edge case 4: All other perfumes have remainingMl = 0 (empty bottles)
const finishedCatalog = [
  { id: '1', name: 'Active', remainingMl: 100, accords: ['Cítrico'] },
  { id: '2', name: 'Finished', remainingMl: 0, accords: ['Cítrico'] }
];
const resFinished = calculateReliefOrbit(finishedCatalog[0], finishedCatalog);
assert.deepStrictEqual(resFinished, { harmonic: null, detox: null, contrast: null });
console.log('✓ Edge case 4 passed: perfumes with 0ml remaining excluded from relief orbit.');

console.log('ALL EDGE CASE TESTS PASSED SUCCESSFULLY!');
