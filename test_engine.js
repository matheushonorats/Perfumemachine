const fs = require('fs');
const DB = require('./assinatura/database.json');

function jaccard(setA, setB) {
  const sA = new Set(setA.map(s => s.toLowerCase()));
  const sB = new Set(setB.map(s => s.toLowerCase()));
  const intersection = new Set([...sA].filter(x => sB.has(x)));
  const union = new Set([...sA, ...sB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function noteOverlap(pyrA, pyrB) {
  const notesA = [...(pyrA.top || []), ...(pyrA.heart || []), ...(pyrA.base || [])];
  const notesB = [...(pyrB.top || []), ...(pyrB.heart || []), ...(pyrB.base || [])];
  return jaccard(notesA, notesB);
}

function calculateSimilarity(pA, pB) {
  if (!pA || !pB || (pA.brand === pB.brand && pA.name === pB.name)) return 0;
  const accordSim = jaccard(pA.accords || [], pB.accords || []);
  const noteSim = noteOverlap(pA.pyramid || {}, pB.pyramid || {});
  const familySim = (pA.family && pB.family && (pA.family === pB.family || pA.family.split(' ')[0] === pB.family.split(' ')[0])) ? 1 : 0;
  return (accordSim * 0.50) + (noteSim * 0.35) + (familySim * 0.15);
}

function getReliefOrbit(targetPerfume, allPerfumes) {
  const list = Object.values(allPerfumes).filter(p => p.name !== targetPerfume.name);
  
  // 1. Harmonic Variation (Same DNA): highest similarity
  const scoredHarmonic = list.map(p => ({
    perfume: p,
    sim: calculateSimilarity(targetPerfume, p)
  })).sort((a, b) => b.sim - a.sim);
  const harmonic = scoredHarmonic[0];

  // 2. Sensory Detox (Neutral, clean, low intensity)
  const detoxCandidates = list.filter(p => {
    const isLowIntensity = (p.intensity || 2) <= 2;
    const isClean = (p.accords || []).some(a => 
      /almiscar|limpo|citrico|cha|herbal|mineral|segunda pele/i.test(a)
    ) || /molecule|4711|happy|etéreo|verbena|prada amber/i.test(p.name);
    return isLowIntensity && isClean;
  }).map(p => ({
    perfume: p,
    sim: calculateSimilarity(targetPerfume, p)
  })).sort((a, b) => a.sim - b.sim); // lower similarity so nose rests
  const detox = detoxCandidates[0] || scoredHarmonic[scoredHarmonic.length - 1];

  // 3. Intentional Contrast: low similarity, different family, but bold
  const contrastCandidates = list.filter(p => {
    const sim = calculateSimilarity(targetPerfume, p);
    const diffFamily = p.family !== targetPerfume.family;
    return diffFamily && sim < 0.20;
  }).sort((a, b) => (b.intensity || 3) - (a.intensity || 3));
  const contrast = contrastCandidates.length ? {
    perfume: contrastCandidates[0],
    sim: calculateSimilarity(targetPerfume, contrastCandidates[0])
  } : scoredHarmonic[scoredHarmonic.length - 1];

  return { harmonic, detox, contrast };
}

// Test with Terre d'Hermès
const terre = DB[55];
console.log('Testing with Target:', terre.brand, terre.name);
const orbit = getReliefOrbit(terre, DB);

console.log('1. Variação Harmônica:');
console.log('   ->', orbit.harmonic.perfume.brand, orbit.harmonic.perfume.name, `(Score: ${(orbit.harmonic.sim*100).toFixed(1)}%)`);
console.log('      Accords:', orbit.harmonic.perfume.accords.join(', '));

console.log('2. Limpeza Sensorial (Detox):');
console.log('   ->', orbit.detox.perfume.brand, orbit.detox.perfume.name, `(Intensity: ${orbit.detox.perfume.intensity})`);
console.log('      Accords:', orbit.detox.perfume.accords.join(', '));

console.log('3. Contraste Intencional:');
console.log('   ->', orbit.contrast.perfume.brand, orbit.contrast.perfume.name, `(Family: ${orbit.contrast.perfume.family})`);
console.log('      Accords:', orbit.contrast.perfume.accords.join(', '));

// Test with Prada L'Homme
const prada = DB[109];
console.log('\nTesting with Target:', prada.brand, prada.name);
const orbitPrada = getReliefOrbit(prada, DB);
console.log('1. Variação Harmônica:', orbitPrada.harmonic.perfume.brand, orbitPrada.harmonic.perfume.name, `(${(orbitPrada.harmonic.sim*100).toFixed(1)}%)`);
console.log('2. Limpeza Sensorial (Detox):', orbitPrada.detox.perfume.brand, orbitPrada.detox.perfume.name);
console.log('3. Contraste Intencional:', orbitPrada.contrast.perfume.brand, orbitPrada.contrast.perfume.name);
