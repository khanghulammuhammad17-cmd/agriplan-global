import { convertArea, convertWeight, convertLength } from './unitConverter.js';

/**
 * 9. Fertilizer Requirement Calculator
 */
export function calculateFertilizerRequirement({
  mode = 'nutrient_to_fert', // 'nutrient_to_fert' or 'soil_test'
  nutrientType = 'N', // 'N', 'P2O5', 'K2O'
  nutrientAmount = 100, // kg or lb required per area
  nutrientUnit = 'kg_ha', // 'kg_ha', 'kg_acre', 'lb_acre'
  fertilizerGrade = 46, // % active nutrient (e.g. Urea 46%)
  fertilizerName = 'Urea (46% N)',
  area = 1,
  areaUnit = 'ha',
  soilTestCredit = 0, // soil available credit
  efficiencyPct = 100
}) {
  const cleanNutrient = Math.max(0, parseFloat(nutrientAmount) || 0);
  const cleanGrade = Math.max(0.1, Math.min(100, parseFloat(fertilizerGrade) || 46));
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const cleanCredit = Math.max(0, parseFloat(soilTestCredit) || 0);
  const cleanEff = Math.max(10, Math.min(100, parseFloat(efficiencyPct) || 100));

  const netNutrientPerUnit = Math.max(0, cleanNutrient - cleanCredit) / (cleanEff / 100);

  let areaNormalized = cleanArea;
  let weightUnit = 'kg';
  if (nutrientUnit === 'kg_ha') {
    areaNormalized = convertArea(cleanArea, areaUnit, 'ha');
    weightUnit = 'kg';
  } else if (nutrientUnit === 'kg_acre') {
    areaNormalized = convertArea(cleanArea, areaUnit, 'acre');
    weightUnit = 'kg';
  } else if (nutrientUnit === 'lb_acre') {
    areaNormalized = convertArea(cleanArea, areaUnit, 'acre');
    weightUnit = 'lb';
  }

  const nutrientFraction = cleanGrade / 100;
  const fertPerUnitArea = netNutrientPerUnit / nutrientFraction;
  const totalFertilizer = fertPerUnitArea * areaNormalized;
  const total50kgBags = (weightUnit === 'kg' ? totalFertilizer / 50 : (totalFertilizer * 0.453592) / 50);

  return {
    netNutrientPerUnit: Number(netNutrientPerUnit.toFixed(2)),
    fertPerUnitArea: Number(fertPerUnitArea.toFixed(2)),
    totalFertilizer: Number(totalFertilizer.toFixed(2)),
    bags50kg: Number(Math.ceil(total50kgBags)),
    weightUnit,
    nutrientFraction: cleanGrade,
    steps: [
      `Net Nutrient Target = (${cleanNutrient} - ${cleanCredit} soil credit) ÷ ${cleanEff}% efficiency = ${netNutrientPerUnit.toFixed(2)} ${weightUnit}/unit area`,
      `Fertilizer Product Rate = ${netNutrientPerUnit.toFixed(2)} ÷ (${cleanGrade}% / 100) = ${fertPerUnitArea.toFixed(2)} ${weightUnit}/unit area`,
      `Total Product Needed = ${fertPerUnitArea.toFixed(2)} × ${areaNormalized.toFixed(2)} area = ${totalFertilizer.toFixed(2)} ${weightUnit} (~${Math.ceil(total50kgBags)} bags of 50kg)`
    ]
  };
}

/**
 * 10. NPK Calculator
 * Solves N, P2O5, K2O fertilizer combinations accurately.
 */
export function calculateNPK({
  targetN = 120, // kg/ha
  targetP2O5 = 60, // kg/ha
  targetK2O = 60, // kg/ha
  area = 1,
  areaUnit = 'ha',
  preferredSource = 'dap_urea_mop' // 'dap_urea_mop' or 'npk_blend'
}) {
  const cleanN = Math.max(0, parseFloat(targetN) || 0);
  const cleanP = Math.max(0, parseFloat(targetP2O5) || 0);
  const cleanK = Math.max(0, parseFloat(targetK2O) || 0);
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');

  let dapKgHa = 0;
  let ureaKgHa = 0;
  let mopKgHa = 0;
  let nSuppliedByDap = 0;
  let remainingNNeeded = 0;

  // Step 1: Supply P2O5 using DAP (18% N, 46% P2O5, 0% K2O)
  if (cleanP > 0) {
    dapKgHa = cleanP / 0.46;
    nSuppliedByDap = dapKgHa * 0.18;
  }

  // Step 2: Supply remaining N with Urea (46% N)
  remainingNNeeded = Math.max(0, cleanN - nSuppliedByDap);
  if (remainingNNeeded > 0) {
    ureaKgHa = remainingNNeeded / 0.46;
  }

  // Step 3: Supply K2O with MOP (Muriate of Potash, 60% K2O)
  if (cleanK > 0) {
    mopKgHa = cleanK / 0.60;
  }

  const totalDap = dapKgHa * areaHa;
  const totalUrea = ureaKgHa * areaHa;
  const totalMop = mopKgHa * areaHa;

  const elementalP = cleanP * 0.4364;
  const elementalK = cleanK * 0.8302;

  return {
    dapKgHa: Number(dapKgHa.toFixed(1)),
    ureaKgHa: Number(ureaKgHa.toFixed(1)),
    mopKgHa: Number(mopKgHa.toFixed(1)),
    totalDap: Number(totalDap.toFixed(1)),
    totalUrea: Number(totalUrea.toFixed(1)),
    totalMop: Number(totalMop.toFixed(1)),
    dapBags: Math.ceil(totalDap / 50),
    ureaBags: Math.ceil(totalUrea / 50),
    mopBags: Math.ceil(totalMop / 50),
    nSuppliedByDap: Number(nSuppliedByDap.toFixed(1)),
    elementalP: Number(elementalP.toFixed(1)),
    elementalK: Number(elementalK.toFixed(1)),
    areaHa: Number(areaHa.toFixed(2)),
    steps: [
      `1. DAP required for ${cleanP} kg P₂O₅ = ${cleanP} ÷ 0.46 = ${dapKgHa.toFixed(1)} kg/ha (Supplies ${nSuppliedByDap.toFixed(1)} kg N)`,
      `2. Remaining N needed = ${cleanN} - ${nSuppliedByDap.toFixed(1)} = ${remainingNNeeded.toFixed(1)} kg N. Urea required = ${remainingNNeeded.toFixed(1)} ÷ 0.46 = ${ureaKgHa.toFixed(1)} kg/ha`,
      `3. MOP (0-0-60) required for ${cleanK} kg K₂O = ${cleanK} ÷ 0.60 = ${mopKgHa.toFixed(1)} kg/ha`,
      `Total Field Quantities for ${areaHa.toFixed(2)} ha: DAP = ${totalDap.toFixed(0)} kg (~${Math.ceil(totalDap/50)} bags), Urea = ${totalUrea.toFixed(0)} kg (~${Math.ceil(totalUrea/50)} bags), MOP = ${totalMop.toFixed(0)} kg (~${Math.ceil(totalMop/50)} bags)`
    ]
  };
}

/**
 * 11. Nitrogen Requirement Calculator
 */
export function calculateNitrogenRequirement({
  targetYield = 5, // Tonnes per ha
  cropType = 'wheat', // wheat: ~25-30 kg N/t, maize: ~22-26 kg N/t, rice: ~20-24 kg N/t
  soilOrganicMatterPct = 2,
  previousLegumeCredit = 20, // kg N/ha credit
  soilNitrateTest = 15, // ppm or kg/ha
  area = 1,
  areaUnit = 'ha'
}) {
  const yieldT = Math.max(0, parseFloat(targetYield) || 5);
  const nPerTonne = cropType === 'maize' ? 24 : (cropType === 'rice' ? 22 : 28);
  const grossCropN = yieldT * nPerTonne;

  const omCredit = Math.max(0, parseFloat(soilOrganicMatterPct) || 0) * 10; // ~10-15 kg N/ha per 1% OM mineralization
  const legumeCredit = Math.max(0, parseFloat(previousLegumeCredit) || 0);
  const soilNitrate = Math.max(0, parseFloat(soilNitrateTest) || 0);

  const totalCredits = omCredit + legumeCredit + soilNitrate;
  const netNRequiredHa = Math.max(0, grossCropN - totalCredits);

  const areaHa = convertArea(Math.max(0.0001, parseFloat(area) || 1), areaUnit, 'ha');
  const totalN = netNRequiredHa * areaHa;
  const ureaEquivalent = (totalN / 0.46);

  return {
    grossCropN: Number(grossCropN.toFixed(1)),
    totalCredits: Number(totalCredits.toFixed(1)),
    netNRequiredHa: Number(netNRequiredHa.toFixed(1)),
    totalN: Number(totalN.toFixed(1)),
    ureaEquivalentKg: Number(ureaEquivalent.toFixed(1)),
    ureaBags: Math.ceil(ureaEquivalent / 50),
    steps: [
      `Gross Nitrogen Uptake Goal = ${yieldT} t/ha × ${nPerTonne} kg N/t = ${grossCropN.toFixed(1)} kg N/ha`,
      `Soil & Rotation Credits = ${omCredit.toFixed(0)} kg (Organic Matter) + ${legumeCredit.toFixed(0)} kg (Legume) + ${soilNitrate.toFixed(0)} kg (Soil NO₃) = ${totalCredits.toFixed(1)} kg N/ha`,
      `Net Fertilizer N Recommendation = ${grossCropN.toFixed(1)} - ${totalCredits.toFixed(1)} = ${netNRequiredHa.toFixed(1)} kg N/ha`,
      `Total Field Urea (46% N) for ${areaHa.toFixed(2)} ha = ${ureaEquivalent.toFixed(1)} kg (~${Math.ceil(ureaEquivalent/50)} bags)`
    ]
  };
}

/**
 * 12. Phosphorus Requirement Calculator
 */
export function calculatePhosphorusRequirement({
  soilTestP = 12, // ppm (e.g. Olsen P or Bray-1)
  soilTestType = 'olsen', // 'olsen' (critical ~15 ppm) or 'bray1' (critical ~25 ppm)
  targetYield = 5,
  area = 1,
  areaUnit = 'ha'
}) {
  const testP = Math.max(0, parseFloat(soilTestP) || 0);
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');

  const criticalP = soilTestType === 'olsen' ? 15 : 25;
  let p2o5RateHa = 0;

  if (testP < criticalP * 0.5) {
    p2o5RateHa = 80; // High build + crop removal
  } else if (testP < criticalP) {
    p2o5RateHa = 50; // Moderate build + maintenance
  } else if (testP <= criticalP * 1.5) {
    p2o5RateHa = 30; // Maintenance replacement
  } else {
    p2o5RateHa = 0; // Soil P sufficient, starter only
  }

  const elementalP = p2o5RateHa * 0.4364;
  const dapReqHa = p2o5RateHa > 0 ? p2o5RateHa / 0.46 : 0;
  const totalP2O5 = p2o5RateHa * areaHa;
  const totalDAP = dapReqHa * areaHa;

  return {
    soilTestStatus: testP < criticalP ? (testP < criticalP * 0.5 ? 'Very Low' : 'Low/Medium') : (testP > criticalP * 1.5 ? 'High / Sufficient' : 'Adequate'),
    p2o5RateHa: Number(p2o5RateHa.toFixed(1)),
    elementalPRateHa: Number(elementalP.toFixed(1)),
    dapReqHa: Number(dapReqHa.toFixed(1)),
    totalP2O5: Number(totalP2O5.toFixed(1)),
    totalDAP: Number(totalDAP.toFixed(1)),
    dapBags: Math.ceil(totalDAP / 50),
    steps: [
      `Soil Test P: ${testP} ppm (${soilTestType.toUpperCase()}) vs Critical Agronomic Threshold: ${criticalP} ppm`,
      `Phosphate Recommendation = ${p2o5RateHa} kg P₂O₅/ha (equivalent to ${elementalP.toFixed(1)} kg Elemental P/ha)`,
      `DAP (18-46-0) equivalent = ${dapReqHa.toFixed(1)} kg/ha → Total: ${totalDAP.toFixed(0)} kg (~${Math.ceil(totalDAP/50)} bags)`
    ]
  };
}

/**
 * 13. Potassium Requirement Calculator
 */
export function calculatePotassiumRequirement({
  soilTestK = 110, // ppm exchangeable K (Mehlich-3 or Ammonium Acetate)
  cropType = 'cereals', // 'cereals', 'potatoes_roots', 'fruits_orchard'
  area = 1,
  areaUnit = 'ha'
}) {
  const testK = Math.max(0, parseFloat(soilTestK) || 0);
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');

  const criticalK = cropType === 'potatoes_roots' ? 180 : (cropType === 'fruits_orchard' ? 160 : 130);
  let k2oRateHa = 0;

  if (testK < criticalK * 0.6) {
    k2oRateHa = cropType === 'potatoes_roots' ? 150 : 100;
  } else if (testK < criticalK) {
    k2oRateHa = cropType === 'potatoes_roots' ? 90 : 60;
  } else if (testK <= criticalK * 1.4) {
    k2oRateHa = cropType === 'potatoes_roots' ? 50 : 30; // Maintenance
  } else {
    k2oRateHa = 0; // High
  }

  const elementalK = k2oRateHa * 0.8302;
  const mopReqHa = k2oRateHa > 0 ? k2oRateHa / 0.60 : 0;
  const totalK2O = k2oRateHa * areaHa;
  const totalMOP = mopReqHa * areaHa;

  return {
    soilTestStatus: testK < criticalK ? 'Deficient / Responsive' : 'Sufficient',
    k2oRateHa: Number(k2oRateHa.toFixed(1)),
    elementalKRateHa: Number(elementalK.toFixed(1)),
    mopReqHa: Number(mopReqHa.toFixed(1)),
    totalK2O: Number(totalK2O.toFixed(1)),
    totalMOP: Number(totalMOP.toFixed(1)),
    mopBags: Math.ceil(totalMOP / 50),
    steps: [
      `Soil Test Exchangeable K: ${testK} ppm vs Target Baseline: ${criticalK} ppm for ${cropType}`,
      `Potash Recommendation = ${k2oRateHa} kg K₂O/ha (equivalent to ${elementalK.toFixed(1)} kg Elemental K/ha)`,
      `MOP (0-0-60) Product Rate = ${mopReqHa.toFixed(1)} kg/ha → Total: ${totalMOP.toFixed(0)} kg (~${Math.ceil(totalMOP/50)} bags)`
    ]
  };
}

/**
 * 14. Fertilizer Application Rate Calculator
 */
export function calculateFertilizerApplicationRate({
  totalProductApplied = 250, // kg or lb
  productUnit = 'kg',
  area = 2,
  areaUnit = 'ha',
  nutrientPct = 46 // e.g. 46% N
}) {
  const cleanProd = Math.max(0, parseFloat(totalProductApplied) || 0);
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const cleanPct = Math.max(0, Math.min(100, parseFloat(nutrientPct) || 0));

  const prodKg = convertWeight(cleanProd, productUnit, 'kg');
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');
  const areaAcre = convertArea(cleanArea, areaUnit, 'acre');
  const area100m2 = convertArea(cleanArea, areaUnit, 'sq_m') / 100;

  const rateKgHa = areaHa > 0 ? prodKg / areaHa : 0;
  const rateLbAcre = areaAcre > 0 ? (prodKg * 2.20462) / areaAcre : 0;
  const rateKg100m2 = area100m2 > 0 ? prodKg / area100m2 : 0;
  const activeNutrientKgHa = rateKgHa * (cleanPct / 100);

  return {
    rateKgHa: Number(rateKgHa.toFixed(1)),
    rateLbAcre: Number(rateLbAcre.toFixed(1)),
    rateKg100m2: Number(rateKg100m2.toFixed(2)),
    activeNutrientKgHa: Number(activeNutrientKgHa.toFixed(1)),
    steps: [
      `Normalized Product: ${prodKg.toFixed(1)} kg over ${areaHa.toFixed(2)} ha (${areaAcre.toFixed(2)} acres)`,
      `Application Rate = ${rateKgHa.toFixed(1)} kg/ha (${rateLbAcre.toFixed(1)} lb/acre)`,
      `Active Nutrient Delivered (${cleanPct}% analysis) = ${activeNutrientKgHa.toFixed(1)} kg active nutrient/ha`
    ]
  };
}

/**
 * 15. Nutrient-to-Fertilizer Calculator
 */
export function calculateNutrientToFertilizer({
  targetNutrientWeight = 50, // kg or lb
  weightUnit = 'kg',
  fertilizerGradePct = 46 // %
}) {
  const cleanTarget = Math.max(0, parseFloat(targetNutrientWeight) || 0);
  const cleanPct = Math.max(0.1, Math.min(100, parseFloat(fertilizerGradePct) || 46));

  const fraction = cleanPct / 100;
  const requiredFertilizer = cleanTarget / fraction;
  const fillerWeight = requiredFertilizer - cleanTarget;
  const bags50kg = (weightUnit === 'kg' ? requiredFertilizer / 50 : (requiredFertilizer * 0.453592) / 50);

  return {
    requiredFertilizer: Number(requiredFertilizer.toFixed(2)),
    carrierWeight: Number(fillerWeight.toFixed(2)),
    nutrientWeight: cleanTarget,
    gradePct: cleanPct,
    weightUnit,
    bags50kg: Number(bags50kg.toFixed(1)),
    steps: [
      `Formula: Fertilizer Mass = Active Nutrient Target ÷ (Grade Percentage / 100)`,
      `Calculation: ${cleanTarget} ${weightUnit} ÷ (${cleanPct} ÷ 100) = ${cleanTarget} ÷ ${fraction.toFixed(4)} = ${requiredFertilizer.toFixed(2)} ${weightUnit}`,
      `Carrier / Inert Mass = ${fillerWeight.toFixed(2)} ${weightUnit}`
    ]
  };
}

/**
 * 16. Lime Requirement Calculator
 * Soil buffering and SMP / CCE method.
 */
export function calculateLimeRequirement({
  currentSoilPH = 5.2,
  targetPH = 6.5,
  bufferPH = 6.2, // SMP buffer pH or Woodruff buffer
  soilTexture = 'loam', // 'sand' (CEC 3-8), 'loam' (CEC 10-20), 'clay' (CEC 20-35)
  area = 1,
  areaUnit = 'ha',
  limeCCE = 90 // Calcium Carbonate Equivalent % (pure CaCO3 = 100%)
}) {
  const curPH = Math.max(3.5, Math.min(8.5, parseFloat(currentSoilPH) || 5.2));
  const tgtPH = Math.max(curPH, Math.min(7.5, parseFloat(targetPH) || 6.5));
  const cce = Math.max(50, Math.min(120, parseFloat(limeCCE) || 90));
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');

  if (curPH >= tgtPH) {
    return {
      limeRateTonnesHa: 0,
      totalLimeTonnes: 0,
      cceUsed: cce,
      status: 'No liming required. Current pH meets or exceeds target pH.',
      steps: [`Current pH (${curPH}) is already at or above target pH (${tgtPH}).`]
    };
  }

  // Base lime required in tonnes pure 100% CCE CaCO3/ha based on soil buffer/texture factor
  // SMP buffer relationship or texture buffering factor
  let textureBufferFactor = 2.5; // tonnes CaCO3 per 1.0 pH unit increase per ha
  if (soilTexture === 'sand') textureBufferFactor = 1.6;
  else if (soilTexture === 'loam') textureBufferFactor = 2.8;
  else if (soilTexture === 'clay') textureBufferFactor = 4.2;

  const deltaPH = tgtPH - curPH;
  const basePureLimeTonnesHa = deltaPH * textureBufferFactor;
  const actualLimeRateTonnesHa = basePureLimeTonnesHa / (cce / 100);
  const totalLimeTonnes = actualLimeRateTonnesHa * areaHa;

  return {
    deltaPH: Number(deltaPH.toFixed(2)),
    limeRateTonnesHa: Number(actualLimeRateTonnesHa.toFixed(2)),
    totalLimeTonnes: Number(totalLimeTonnes.toFixed(2)),
    limeRateTonsAcre: Number((actualLimeRateTonnesHa * 0.44609).toFixed(2)),
    cceUsed: cce,
    steps: [
      `Target pH elevation: ${tgtPH} - ${curPH} = ${deltaPH.toFixed(2)} pH units`,
      `Soil Buffer Capacity (${soilTexture.toUpperCase()} texture): ~${textureBufferFactor} tonnes 100% CCE CaCO₃/ha per pH unit`,
      `Adjusted for Lime Neutralizing Value (${cce}% CCE) = (${deltaPH.toFixed(2)} × ${textureBufferFactor}) ÷ ${(cce/100).toFixed(2)} = ${actualLimeRateTonnesHa.toFixed(2)} Tonnes/ha`,
      `Total Lime for ${areaHa.toFixed(2)} ha = ${totalLimeTonnes.toFixed(2)} Metric Tonnes`
    ]
  };
}

/**
 * 17. Compost Application Calculator
 */
export function calculateCompostApplication({
  area = 1,
  areaUnit = 'ha',
  calcMethod = 'depth', // 'depth' or 'tonnage_rate'
  applicationDepthMm = 12, // mm (e.g. 1/2 inch ≈ 12.7 mm)
  compostBulkDensity = 600, // kg/m³ (typical compost 500-700 kg/m³)
  moistureContentPct = 40,
  targetTonnesHa = 20
}) {
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const areaM2 = convertArea(cleanArea, areaUnit, 'sq_m');
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');
  const density = Math.max(300, Math.min(1200, parseFloat(compostBulkDensity) || 600));

  let volumeM3 = 0;
  let totalWetWeightTonnes = 0;

  if (calcMethod === 'depth') {
    const depthM = Math.max(0, parseFloat(applicationDepthMm) || 0) / 1000;
    volumeM3 = areaM2 * depthM;
    const totalKg = volumeM3 * density;
    totalWetWeightTonnes = totalKg / 1000;
  } else {
    const targetTonnesPerHa = Math.max(0, parseFloat(targetTonnesHa) || 20);
    totalWetWeightTonnes = targetTonnesPerHa * areaHa;
    const totalKg = totalWetWeightTonnes * 1000;
    volumeM3 = totalKg / density;
  }

  const dryMatterTonnes = totalWetWeightTonnes * (1 - (parseFloat(moistureContentPct) || 40) / 100);
  const cubicYards = volumeM3 * 1.30795;
  const rateTonnesHa = areaHa > 0 ? totalWetWeightTonnes / areaHa : 0;

  // Estimated available N (typical compost 1.5% total N, ~15% available in Year 1)
  const estAvailableN = (dryMatterTonnes * 1000 * 0.015 * 0.15) / areaHa;

  return {
    volumeM3: Number(volumeM3.toFixed(1)),
    cubicYards: Number(cubicYards.toFixed(1)),
    totalWetWeightTonnes: Number(totalWetWeightTonnes.toFixed(1)),
    dryMatterTonnes: Number(dryMatterTonnes.toFixed(1)),
    rateTonnesHa: Number(rateTonnesHa.toFixed(1)),
    estAvailableNYear1KgHa: Number(estAvailableN.toFixed(1)),
    steps: [
      `Total Volume Required = ${volumeM3.toFixed(1)} m³ (${cubicYards.toFixed(1)} cubic yards)`,
      `Total Wet Compost Weight = ${totalWetWeightTonnes.toFixed(1)} Metric Tonnes (${rateTonnesHa.toFixed(1)} t/ha) at ${density} kg/m³ density`,
      `Dry Organic Matter Delivered = ${dryMatterTonnes.toFixed(1)} Tonnes (~${estAvailableN.toFixed(1)} kg/ha available N in year 1)`
    ]
  };
}
