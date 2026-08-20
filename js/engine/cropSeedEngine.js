import { convertArea, convertWeight, convertLength, formatNumber } from './unitConverter.js';

/**
 * 1. Seed Rate Calculator
 * Calculates nominal and PLS (Pure Live Seed) adjusted seed requirement.
 */
export function calculateSeedRate({
  area = 1,
  areaUnit = 'ha',
  recommendedRate = 120, // e.g. kg/ha or lb/acre
  rateUnit = 'kg_ha', // 'kg_ha', 'kg_acre', 'lb_acre'
  germinationPct = 90,
  purityPct = 98,
  adjustForQuality = true
}) {
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const cleanRate = Math.max(0, parseFloat(recommendedRate) || 0);
  const cleanGerm = Math.min(100, Math.max(1, parseFloat(germinationPct) || 90));
  const cleanPurity = Math.min(100, Math.max(1, parseFloat(purityPct) || 98));

  // Convert area to ha or acre matching the rate unit
  let areaForCalc = cleanArea;
  let targetWeightUnit = 'kg';

  if (rateUnit === 'kg_ha') {
    areaForCalc = convertArea(cleanArea, areaUnit, 'ha');
    targetWeightUnit = 'kg';
  } else if (rateUnit === 'kg_acre') {
    areaForCalc = convertArea(cleanArea, areaUnit, 'acre');
    targetWeightUnit = 'kg';
  } else if (rateUnit === 'lb_acre') {
    areaForCalc = convertArea(cleanArea, areaUnit, 'acre');
    targetWeightUnit = 'lb';
  }

  const nominalTotal = areaForCalc * cleanRate;
  const plsFraction = (cleanGerm / 100) * (cleanPurity / 100);
  const adjustedRate = adjustForQuality && plsFraction > 0 ? (cleanRate / plsFraction) : cleanRate;
  const adjustedTotal = areaForCalc * adjustedRate;
  const seedSurplus = adjustedTotal - nominalTotal;

  return {
    nominalRate: cleanRate,
    adjustedRate: Number(adjustedRate.toFixed(2)),
    plsFraction: Number((plsFraction * 100).toFixed(2)),
    nominalTotal: Number(nominalTotal.toFixed(2)),
    totalSeedRequired: Number(adjustedTotal.toFixed(2)),
    seedSurplus: Number(seedSurplus.toFixed(2)),
    weightUnit: targetWeightUnit,
    areaEvaluatedHa: Number(convertArea(cleanArea, areaUnit, 'ha').toFixed(2)),
    areaEvaluatedAcre: Number(convertArea(cleanArea, areaUnit, 'acre').toFixed(2)),
    steps: [
      `Pure Live Seed (PLS) = (${cleanGerm}% Germination × ${cleanPurity}% Purity) / 100 = ${(plsFraction * 100).toFixed(2)}%`,
      `Adjusted Seed Rate = ${cleanRate} ${rateUnit.replace('_', '/')} ÷ ${plsFraction.toFixed(4)} = ${adjustedRate.toFixed(2)} ${targetWeightUnit}/unit area`,
      `Total Seed Required = ${areaForCalc.toFixed(2)} area × ${adjustedRate.toFixed(2)} = ${adjustedTotal.toFixed(2)} ${targetWeightUnit}`
    ]
  };
}

/**
 * 2. Seeding Density Calculator
 * Converts weight of seed and Thousand Kernel Weight (TKW) into seeds per m², ha, acre.
 */
export function calculateSeedingDensity({
  seedQuantity = 100,
  seedWeightUnit = 'kg',
  area = 1,
  areaUnit = 'ha',
  thousandKernelWeight = 40 // TKW in grams (e.g. Wheat ~40g)
}) {
  const cleanQty = Math.max(0, parseFloat(seedQuantity) || 0);
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const cleanTkw = Math.max(0.1, parseFloat(thousandKernelWeight) || 40);

  const totalKg = convertWeight(cleanQty, seedWeightUnit, 'kg');
  const totalGrams = totalKg * 1000;
  const totalSeeds = (totalGrams / cleanTkw) * 1000;

  const areaM2 = convertArea(cleanArea, areaUnit, 'sq_m');
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');
  const areaAcre = convertArea(cleanArea, areaUnit, 'acre');

  const seedsPerM2 = areaM2 > 0 ? totalSeeds / areaM2 : 0;
  const seedsPerHa = areaHa > 0 ? totalSeeds / areaHa : 0;
  const seedsPerAcre = areaAcre > 0 ? totalSeeds / areaAcre : 0;

  return {
    totalSeeds: Math.round(totalSeeds),
    seedsPerM2: Math.round(seedsPerM2),
    seedsPerHa: Math.round(seedsPerHa),
    seedsPerAcre: Math.round(seedsPerAcre),
    tkwUsed: cleanTkw,
    steps: [
      `Total Seeds = (${cleanQty} ${seedWeightUnit} → ${totalGrams.toFixed(0)}g) ÷ (${cleanTkw}g / 1,000 seeds) = ${Math.round(totalSeeds).toLocaleString()} seeds`,
      `Seeds / m² = ${Math.round(totalSeeds).toLocaleString()} ÷ ${areaM2.toFixed(1)} m² = ${Math.round(seedsPerM2)} seeds/m²`,
      `Seeds / Hectare = ${Math.round(seedsPerHa).toLocaleString()} seeds/ha`
    ]
  };
}

/**
 * 3. Plant Population Calculator
 */
export function calculatePlantPopulation({
  area = 1,
  areaUnit = 'ha',
  rowSpacing = 75,
  rowSpacingUnit = 'cm',
  plantSpacing = 20,
  plantSpacingUnit = 'cm',
  expectedEstablishmentPct = 85
}) {
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const cleanRow = Math.max(0.01, parseFloat(rowSpacing) || 75);
  const cleanPlant = Math.max(0.01, parseFloat(plantSpacing) || 20);
  const cleanEst = Math.min(100, Math.max(1, parseFloat(expectedEstablishmentPct) || 100));

  const rowSpacingM = convertLength(cleanRow, rowSpacingUnit, 'm');
  const plantSpacingM = convertLength(cleanPlant, plantSpacingUnit, 'm');
  const areaM2 = convertArea(cleanArea, areaUnit, 'sq_m');

  const areaPerPlantM2 = rowSpacingM * plantSpacingM;
  const nominalPopulation = areaM2 / areaPerPlantM2;
  const establishedPopulation = nominalPopulation * (cleanEst / 100);

  const plantsPerHa = (10000 / areaPerPlantM2) * (cleanEst / 100);
  const plantsPerAcre = (4046.86 / areaPerPlantM2) * (cleanEst / 100);
  const plantsPerLinearMeterRow = 1 / plantSpacingM;

  return {
    nominalPopulation: Math.round(nominalPopulation),
    establishedPopulation: Math.round(establishedPopulation),
    plantsPerHa: Math.round(plantsPerHa),
    plantsPerAcre: Math.round(plantsPerAcre),
    plantsPerLinearMeterRow: Number(plantsPerLinearMeterRow.toFixed(1)),
    areaPerPlantCm2: Number((areaPerPlantM2 * 10000).toFixed(1)),
    steps: [
      `Row Spacing in meters = ${rowSpacingM.toFixed(3)} m, Plant Spacing = ${plantSpacingM.toFixed(3)} m`,
      `Area per Plant = ${rowSpacingM.toFixed(3)} m × ${plantSpacingM.toFixed(3)} m = ${areaPerPlantM2.toFixed(4)} m²`,
      `Theoretical Plant Population = ${areaM2.toFixed(1)} m² ÷ ${areaPerPlantM2.toFixed(4)} m² = ${Math.round(nominalPopulation).toLocaleString()} plants`,
      `Expected Established Population (${cleanEst}%) = ${Math.round(establishedPopulation).toLocaleString()} plants`
    ]
  };
}

/**
 * 4. Crop Yield Calculator
 */
export function calculateCropYield({
  area = 10,
  areaUnit = 'ha',
  yieldPerUnit = 4.5,
  yieldUnit = 'tonnes_ha' // 'tonnes_ha', 'kg_ha', 'bu_acre', 'cwt_acre', 'lb_acre'
}) {
  const cleanArea = Math.max(0, parseFloat(area) || 0);
  const cleanYield = Math.max(0, parseFloat(yieldPerUnit) || 0);

  let totalTonnes = 0;
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');
  const areaAcre = convertArea(cleanArea, areaUnit, 'acre');

  if (yieldUnit === 'tonnes_ha') {
    totalTonnes = areaHa * cleanYield;
  } else if (yieldUnit === 'kg_ha') {
    totalTonnes = (areaHa * cleanYield) / 1000;
  } else if (yieldUnit === 'bu_acre') { // Assume wheat 60 lb/bu standard = 0.0272155 tonnes
    totalTonnes = (areaAcre * cleanYield * 27.2155) / 1000;
  } else if (yieldUnit === 'cwt_acre') { // 1 cwt = 45.3592 kg
    totalTonnes = (areaAcre * cleanYield * 45.3592) / 1000;
  } else if (yieldUnit === 'lb_acre') {
    totalTonnes = (areaAcre * cleanYield * 0.453592) / 1000;
  }

  const totalKg = totalTonnes * 1000;
  const totalLb = totalKg * 2.20462;
  const yieldTonnesPerHa = areaHa > 0 ? totalTonnes / areaHa : 0;
  const yieldTonnesPerAcre = areaAcre > 0 ? totalTonnes / areaAcre : 0;

  return {
    totalTonnes: Number(totalTonnes.toFixed(2)),
    totalKg: Number(totalKg.toFixed(1)),
    totalLb: Number(totalLb.toFixed(1)),
    yieldTonnesPerHa: Number(yieldTonnesPerHa.toFixed(2)),
    yieldTonnesPerAcre: Number(yieldTonnesPerAcre.toFixed(2)),
    steps: [
      `Total Production = ${cleanArea} ${areaUnit} (equiv. ${areaHa.toFixed(2)} ha) × ${cleanYield} ${yieldUnit.replace('_', '/')}`,
      `Estimated Output = ${totalTonnes.toFixed(2)} Metric Tonnes (${totalKg.toLocaleString()} kg / ${totalLb.toLocaleString()} lbs)`
    ]
  };
}

/**
 * 5. Harvest Yield Calculator
 */
export function calculateHarvestYield({
  harvestedProduction = 45,
  productionUnit = 'tonne', // 'tonne', 'kg', 'lb', 'cwt', 'bu_wheat'
  harvestedArea = 10,
  areaUnit = 'ha'
}) {
  const cleanProd = Math.max(0, parseFloat(harvestedProduction) || 0);
  const cleanArea = Math.max(0.0001, parseFloat(harvestedArea) || 1);

  let prodKg = 0;
  if (productionUnit === 'tonne') prodKg = cleanProd * 1000;
  else if (productionUnit === 'kg') prodKg = cleanProd;
  else if (productionUnit === 'lb') prodKg = cleanProd * 0.45359237;
  else if (productionUnit === 'cwt') prodKg = cleanProd * 45.359237;
  else if (productionUnit === 'bu_wheat') prodKg = cleanProd * 27.2155;

  const areaHa = convertArea(cleanArea, areaUnit, 'ha');
  const areaAcre = convertArea(cleanArea, areaUnit, 'acre');
  const areaM2 = convertArea(cleanArea, areaUnit, 'sq_m');

  const yieldKgHa = areaHa > 0 ? prodKg / areaHa : 0;
  const yieldTonnesHa = yieldKgHa / 1000;
  const yieldLbAcre = areaAcre > 0 ? (prodKg * 2.20462) / areaAcre : 0;
  const yieldBuAcre = areaAcre > 0 ? (prodKg / 27.2155) / areaAcre : 0;
  const yieldGM2 = areaM2 > 0 ? (prodKg * 1000) / areaM2 : 0;

  return {
    yieldTonnesHa: Number(yieldTonnesHa.toFixed(2)),
    yieldKgHa: Number(yieldKgHa.toFixed(1)),
    yieldLbAcre: Number(yieldLbAcre.toFixed(1)),
    yieldBuAcre: Number(yieldBuAcre.toFixed(1)),
    yieldGM2: Number(yieldGM2.toFixed(1)),
    totalKg: Number(prodKg.toFixed(1)),
    steps: [
      `Total Harvest Weight Normalized: ${prodKg.toFixed(1)} kg`,
      `Harvest Yield / Hectare = ${prodKg.toFixed(1)} kg ÷ ${areaHa.toFixed(2)} ha = ${yieldTonnesHa.toFixed(2)} tonnes/ha (${yieldKgHa.toFixed(0)} kg/ha)`,
      `Harvest Yield / Acre = ${yieldLbAcre.toFixed(0)} lb/acre (${yieldBuAcre.toFixed(1)} bushels/acre)`
    ]
  };
}

/**
 * 6. Crop Area Calculator
 */
export function calculateCropArea({
  targetProduction = 100,
  targetUnit = 'tonne', // 'tonne', 'kg', 'lb'
  expectedYield = 4,
  yieldUnit = 'tonnes_ha', // 'tonnes_ha', 'kg_ha', 'lb_acre', 'bu_acre'
  safetyBufferPct = 10
}) {
  const cleanTarget = Math.max(0, parseFloat(targetProduction) || 0);
  const cleanYield = Math.max(0.001, parseFloat(expectedYield) || 1);
  const cleanBuffer = Math.max(0, parseFloat(safetyBufferPct) || 0);

  // Convert target to kg
  let targetKg = cleanTarget * 1000;
  if (targetUnit === 'kg') targetKg = cleanTarget;
  else if (targetUnit === 'lb') targetKg = cleanTarget * 0.45359237;

  // Convert expected yield to kg/ha
  let yieldKgHa = cleanYield * 1000;
  if (yieldUnit === 'kg_ha') yieldKgHa = cleanYield;
  else if (yieldUnit === 'lb_acre') yieldKgHa = (cleanYield * 0.45359237) * 2.47105;
  else if (yieldUnit === 'bu_acre') yieldKgHa = (cleanYield * 27.2155) * 2.47105;

  const baseRequiredHa = targetKg / yieldKgHa;
  const bufferedRequiredHa = baseRequiredHa * (1 + cleanBuffer / 100);

  const requiredAcre = convertArea(bufferedRequiredHa, 'ha', 'acre');
  const requiredM2 = convertArea(bufferedRequiredHa, 'ha', 'sq_m');
  const requiredKanal = convertArea(bufferedRequiredHa, 'ha', 'kanal');

  return {
    baseRequiredHa: Number(baseRequiredHa.toFixed(2)),
    bufferedRequiredHa: Number(bufferedRequiredHa.toFixed(2)),
    requiredAcre: Number(requiredAcre.toFixed(2)),
    requiredM2: Number(requiredM2.toFixed(0)),
    requiredKanal: Number(requiredKanal.toFixed(1)),
    safetyBufferApplied: cleanBuffer,
    steps: [
      `Target Production = ${targetKg.toLocaleString()} kg, Expected Yield = ${yieldKgHa.toLocaleString()} kg/ha`,
      `Base Land Area Required = ${targetKg.toLocaleString()} ÷ ${yieldKgHa.toLocaleString()} = ${baseRequiredHa.toFixed(2)} Hectares`,
      `With ${cleanBuffer}% Risk/Yield Variation Buffer = ${bufferedRequiredHa.toFixed(2)} Ha (${requiredAcre.toFixed(2)} Acres)`
    ]
  };
}

/**
 * 7. Crop Spacing Calculator
 */
export function calculateCropSpacing({
  targetPopulation = 60000,
  populationUnit = 'per_ha', // 'per_ha', 'per_acre'
  rowSpacing = 75,
  rowSpacingUnit = 'cm'
}) {
  const cleanPop = Math.max(1, parseFloat(targetPopulation) || 60000);
  const cleanRow = Math.max(0.1, parseFloat(rowSpacing) || 75);

  const rowSpacingM = convertLength(cleanRow, rowSpacingUnit, 'm');
  let targetPopPerHa = cleanPop;
  if (populationUnit === 'per_acre') {
    targetPopPerHa = cleanPop * 2.47105;
  }

  // Area per plant in m² = 10,000 / targetPopPerHa
  const areaPerPlantM2 = 10000 / targetPopPerHa;
  const inRowSpacingM = areaPerPlantM2 / rowSpacingM;
  const inRowSpacingCm = inRowSpacingM * 100;
  const inRowSpacingInches = inRowSpacingM * 39.3701;
  const plantsPerLinearMeter = inRowSpacingM > 0 ? 1 / inRowSpacingM : 0;
  const plantsPerLinearFoot = plantsPerLinearMeter / 3.28084;

  return {
    inRowSpacingCm: Number(inRowSpacingCm.toFixed(1)),
    inRowSpacingInches: Number(inRowSpacingInches.toFixed(2)),
    plantsPerLinearMeter: Number(plantsPerLinearMeter.toFixed(2)),
    plantsPerLinearFoot: Number(plantsPerLinearFoot.toFixed(2)),
    rowSpacingM: Number(rowSpacingM.toFixed(3)),
    steps: [
      `Target Density: ${Math.round(targetPopPerHa).toLocaleString()} plants/ha (Allocation = ${areaPerPlantM2.toFixed(4)} m²/plant)`,
      `In-row Spacing = ${areaPerPlantM2.toFixed(4)} m² ÷ ${rowSpacingM.toFixed(3)} m row width = ${inRowSpacingCm.toFixed(1)} cm (${inRowSpacingInches.toFixed(2)} inches)`,
      `Linear Density = ${plantsPerLinearMeter.toFixed(2)} seeds/plants per meter of row`
    ]
  };
}

/**
 * 8. Germination Rate Calculator
 */
export function calculateGerminationRate({
  seedsTested = 100,
  seedsGerminated = 88,
  abnormalSprouts = 4,
  deadSeeds = 8
}) {
  const tested = Math.max(1, parseInt(seedsTested, 10) || 100);
  const germinated = Math.max(0, parseInt(seedsGerminated, 10) || 0);
  const abnormal = Math.max(0, parseInt(abnormalSprouts, 10) || 0);

  const germinationPct = Math.min(100, (germinated / tested) * 100);
  const normalViabilityPct = Math.min(100, ((germinated) / tested) * 100);

  let qualityGrade = 'Excellent';
  let badgeColor = 'emerald';
  let recommendation = 'Seed lot is of top commercial viability standard. Standard seed rates apply.';

  if (germinationPct >= 90) {
    qualityGrade = 'Excellent (>90%)';
    badgeColor = 'emerald';
    recommendation = 'Excellent quality seed lot. Direct sowing at standard recommended rate.';
  } else if (germinationPct >= 80) {
    qualityGrade = 'Good (80-89%)';
    badgeColor = 'blue';
    recommendation = 'Good commercial quality. Increase seeding rate by 10-15% to compensate for minor losses.';
  } else if (germinationPct >= 70) {
    qualityGrade = 'Fair (70-79%)';
    badgeColor = 'amber';
    recommendation = 'Fair viability. Increase seeding rate by 25-35%, use seed fungicide dressing, ensure optimal seedbed temperature.';
  } else {
    qualityGrade = 'Poor (<70%)';
    badgeColor = 'rose';
    recommendation = 'Low vigor/germination seed lot. Not recommended for precision commercial planting without significant overseeding.';
  }

  return {
    germinationPercentage: Number(germinationPct.toFixed(1)),
    testedCount: tested,
    germinatedCount: germinated,
    abnormalCount: abnormal,
    qualityGrade,
    badgeColor,
    recommendation,
    steps: [
      `Germination Formula: (Germinated Seeds / Tested Seeds) × 100`,
      `Calculation: (${germinated} ÷ ${tested}) × 100 = ${germinationPct.toFixed(1)}%`,
      `Quality Evaluation: ${qualityGrade}`
    ]
  };
}
