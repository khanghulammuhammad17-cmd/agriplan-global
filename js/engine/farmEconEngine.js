import { convertArea, convertWeight, convertVolume, convertLength, convertFlow, UnitFactors, formatNumber } from './unitConverter.js';

/**
 * 25. Farm Area Calculator
 * Calculates equivalent agricultural land area across all major global and regional standards.
 */
export function calculateFarmArea({
  value = 10,
  unit = 'ha'
}) {
  const cleanVal = Math.max(0, parseFloat(value) || 0);

  const ha = convertArea(cleanVal, unit, 'ha');
  const acre = convertArea(cleanVal, unit, 'acre');
  const sq_m = convertArea(cleanVal, unit, 'sq_m');
  const sq_ft = convertArea(cleanVal, unit, 'sq_ft');
  const sq_yd = convertArea(cleanVal, unit, 'sq_yd');
  const kanal = convertArea(cleanVal, unit, 'kanal');
  const marla = convertArea(cleanVal, unit, 'marla');

  return {
    inputVal: cleanVal,
    inputUnit: unit,
    ha: Number(ha.toFixed(3)),
    acre: Number(acre.toFixed(3)),
    sq_m: Number(sq_m.toFixed(1)),
    sq_ft: Number(sq_ft.toFixed(1)),
    sq_yd: Number(sq_yd.toFixed(1)),
    kanal: Number(kanal.toFixed(2)),
    marla: Number(marla.toFixed(2)),
    steps: [
      `1 Hectare = 10,000 m² = 2.471 Acres = 19.77 Kanal`,
      `1 Standard Acre = 43,560 sq ft = 4,046.86 m² = 8 Kanal = 160 Marla`,
      `1 Standard Kanal = 5,445 sq ft (20 Marla = 505.86 m²)`
    ]
  };
}

/**
 * 26. Agriculture Unit Converter
 */
export function calculateUnitConversion({
  category = 'area', // 'area', 'weight', 'volume', 'length'
  value = 100,
  fromUnit = 'ha',
  toUnit = 'acre'
}) {
  const cleanVal = parseFloat(value) || 0;
  let result = 0;

  if (category === 'area') {
    result = convertArea(cleanVal, fromUnit, toUnit);
  } else if (category === 'weight') {
    result = convertWeight(cleanVal, fromUnit, toUnit);
  } else if (category === 'volume') {
    result = convertVolume(cleanVal, fromUnit, toUnit);
  } else if (category === 'length') {
    result = convertLength(cleanVal, fromUnit, toUnit);
  }

  return {
    fromValue: cleanVal,
    fromUnit,
    toValue: Number(result.toFixed(4)),
    toUnit,
    category,
    steps: [
      `Converted ${cleanVal} ${fromUnit} → ${Number(result.toFixed(4))} ${toUnit}`
    ]
  };
}

/**
 * 27. Sprayer Calibration Calculator
 * ISO & ASABE Standard Hydraulics for Field Boom Sprayers.
 */
export function calculateSprayerCalibration({
  nozzleFlowRate = 1.2, // L/min per nozzle
  flowUnit = 'l_min',
  nozzleSpacingCm = 50, // cm spacing between nozzles along the boom
  groundSpeedKmh = 12, // km/h tractor speed
  tankCapacityL = 1000,
  chemicalDosePerHa = 1.5, // L or kg of product per hectare
  chemicalUnit = 'L'
}) {
  const cleanFlow = Math.max(0.01, parseFloat(nozzleFlowRate) || 1.2);
  const cleanSpacing = Math.max(1, parseFloat(nozzleSpacingCm) || 50);
  const cleanSpeed = Math.max(0.5, parseFloat(groundSpeedKmh) || 12);
  const cleanTank = Math.max(10, parseFloat(tankCapacityL) || 1000);
  const cleanDose = Math.max(0, parseFloat(chemicalDosePerHa) || 0);

  // Flow in L/min
  const flowLMin = flowUnit === 'gpm_us' ? cleanFlow * 3.78541 : cleanFlow;

  // Standard Formula: Application Rate (L/ha) = (Nozzle Flow (L/min) * 60,000) / (Speed (km/h) * Nozzle Spacing (cm))
  const applicationRateLHa = (flowLMin * 60000) / (cleanSpeed * cleanSpacing);
  const applicationRateGpa = applicationRateLHa * 0.106907; // Gallons per Acre

  const areaCoveredPerTankHa = cleanTank / applicationRateLHa;
  const areaCoveredPerTankAcre = areaCoveredPerTankHa * 2.47105;
  const chemicalPerTankLoad = areaCoveredPerTankHa * cleanDose;

  // Work rate (ha/hr) for e.g. 24-nozzle (12m boom) at this speed
  const boomWidthM = (cleanSpacing / 100); // per meter width
  const fieldCapacityHaHr = (cleanSpeed * 1000 * 12 * 0.75) / 10000; // 12m boom @ 75% field efficiency

  return {
    applicationRateLHa: Number(applicationRateLHa.toFixed(1)),
    applicationRateGpa: Number(applicationRateGpa.toFixed(1)),
    flowLMin: Number(flowLMin.toFixed(2)),
    areaCoveredPerTankHa: Number(areaCoveredPerTankHa.toFixed(2)),
    areaCoveredPerTankAcre: Number(areaCoveredPerTankAcre.toFixed(2)),
    chemicalPerTankLoad: Number(chemicalPerTankLoad.toFixed(2)),
    chemicalUnit,
    steps: [
      `Application Rate Formula: (Flow Rate [L/min] × 60,000) ÷ (Ground Speed [km/h] × Nozzle Spacing [cm])`,
      `Calculation: (${flowLMin.toFixed(2)} × 60,000) ÷ (${cleanSpeed} × ${cleanSpacing}) = ${applicationRateLHa.toFixed(1)} Liters/ha (${applicationRateGpa.toFixed(1)} Gallons/Acre)`,
      `Tank Coverage (${cleanTank} L tank) = ${cleanTank} ÷ ${applicationRateLHa.toFixed(1)} L/ha = ${areaCoveredPerTankHa.toFixed(2)} Hectares (${areaCoveredPerTankAcre.toFixed(2)} Acres)`,
      `Chemical to Add Per Full Tank = ${areaCoveredPerTankHa.toFixed(2)} ha × ${cleanDose} ${chemicalUnit}/ha = ${chemicalPerTankLoad.toFixed(2)} ${chemicalUnit}`
    ]
  };
}

/**
 * 28. Farm Input Cost Calculator
 */
export function calculateFarmInputCost({
  currency = '$',
  area = 10,
  areaUnit = 'ha',
  seedCost = 800,
  fertilizerCost = 2200,
  irrigationCost = 950,
  cropProtectionCost = 650,
  laborCost = 1400,
  machineryFuelCost = 1800,
  otherCost = 400
}) {
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');
  const areaAcre = convertArea(cleanArea, areaUnit, 'acre');

  const s = Math.max(0, parseFloat(seedCost) || 0);
  const f = Math.max(0, parseFloat(fertilizerCost) || 0);
  const i = Math.max(0, parseFloat(irrigationCost) || 0);
  const cp = Math.max(0, parseFloat(cropProtectionCost) || 0);
  const l = Math.max(0, parseFloat(laborCost) || 0);
  const m = Math.max(0, parseFloat(machineryFuelCost) || 0);
  const o = Math.max(0, parseFloat(otherCost) || 0);

  const totalCost = s + f + i + cp + l + m + o;
  const costPerHa = areaHa > 0 ? totalCost / areaHa : 0;
  const costPerAcre = areaAcre > 0 ? totalCost / areaAcre : 0;

  const breakdown = [
    { label: 'Fertilizer & Nutrients', amount: f, pct: totalCost > 0 ? (f / totalCost) * 100 : 0 },
    { label: 'Machinery & Fuel', amount: m, pct: totalCost > 0 ? (m / totalCost) * 100 : 0 },
    { label: 'Labor & Services', amount: l, pct: totalCost > 0 ? (l / totalCost) * 100 : 0 },
    { label: 'Irrigation & Pumping', amount: i, pct: totalCost > 0 ? (i / totalCost) * 100 : 0 },
    { label: 'Seed & Genetics', amount: s, pct: totalCost > 0 ? (s / totalCost) * 100 : 0 },
    { label: 'Crop Protection', amount: cp, pct: totalCost > 0 ? (cp / totalCost) * 100 : 0 },
    { label: 'Other Miscellaneous', amount: o, pct: totalCost > 0 ? (o / totalCost) * 100 : 0 }
  ];

  return {
    currency,
    totalCost: Number(totalCost.toFixed(2)),
    costPerHa: Number(costPerHa.toFixed(2)),
    costPerAcre: Number(costPerAcre.toFixed(2)),
    breakdown,
    steps: [
      `Total Input Expenditure = ${currency}${totalCost.toLocaleString()}`,
      `Unit Area Cost = ${currency}${costPerHa.toFixed(2)}/ha (${currency}${costPerAcre.toFixed(2)}/acre) over ${areaHa.toFixed(2)} ha`
    ]
  };
}

/**
 * 29. Crop Production Cost Calculator (Full Enterprise Budgeting)
 */
export function calculateCropProductionCost({
  currency = '$',
  area = 10,
  areaUnit = 'ha',
  expectedProductionTonnes = 50, // Total tonnes produced
  landCost = 1500, // Lease or land opportunity
  seedCost = 800,
  fertilizerCost = 2200,
  irrigationCost = 900,
  chemicalCost = 600,
  laborCost = 1500,
  machineryCost = 1800,
  postHarvestMarketingCost = 700,
  overheadCost = 500
}) {
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const cleanTonnes = Math.max(0.001, parseFloat(expectedProductionTonnes) || 1);
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');
  const areaAcre = convertArea(cleanArea, areaUnit, 'acre');

  const directExpenses = (parseFloat(seedCost) || 0) +
                         (parseFloat(fertilizerCost) || 0) +
                         (parseFloat(irrigationCost) || 0) +
                         (parseFloat(chemicalCost) || 0) +
                         (parseFloat(laborCost) || 0) +
                         (parseFloat(machineryCost) || 0);

  const overheadExpenses = (parseFloat(landCost) || 0) +
                           (parseFloat(postHarvestMarketingCost) || 0) +
                           (parseFloat(overheadCost) || 0);

  const totalProductionCost = directExpenses + overheadExpenses;
  const costPerHa = areaHa > 0 ? totalProductionCost / areaHa : 0;
  const costPerAcre = areaAcre > 0 ? totalProductionCost / areaAcre : 0;
  const costPerTonne = totalProductionCost / cleanTonnes;
  const costPerKg = costPerTonne / 1000;

  return {
    currency,
    totalProductionCost: Number(totalProductionCost.toFixed(2)),
    directExpenses: Number(directExpenses.toFixed(2)),
    overheadExpenses: Number(overheadExpenses.toFixed(2)),
    costPerHa: Number(costPerHa.toFixed(2)),
    costPerAcre: Number(costPerAcre.toFixed(2)),
    costPerTonne: Number(costPerTonne.toFixed(2)),
    costPerKg: Number(costPerKg.toFixed(4)),
    breakEvenYieldHa: Number((costPerHa / (costPerTonne || 1)).toFixed(2)),
    steps: [
      `Direct Operating Costs = ${currency}${directExpenses.toLocaleString()} | Fixed/Overhead Costs = ${currency}${overheadExpenses.toLocaleString()}`,
      `Total Enterprise Production Cost = ${currency}${totalProductionCost.toLocaleString()}`,
      `Cost per Hectare = ${currency}${costPerHa.toFixed(2)}/ha (${currency}${costPerAcre.toFixed(2)}/acre)`,
      `Break-even Unit Cost of Production = ${currency}${costPerTonne.toFixed(2)}/Tonne (${currency}${costPerKg.toFixed(3)}/kg)`
    ]
  };
}

/**
 * 30. Farm Profit / ROI Calculator
 */
export function calculateFarmProfitROI({
  currency = '$',
  area = 10,
  areaUnit = 'ha',
  totalProduction = 45, // tonnes
  productionUnit = 'tonne',
  sellingPricePerUnit = 320, // $ / tonne
  totalCost = 8500
}) {
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const cleanProd = Math.max(0, parseFloat(totalProduction) || 0);
  const cleanPrice = Math.max(0, parseFloat(sellingPricePerUnit) || 0);
  const cleanCost = Math.max(0, parseFloat(totalCost) || 0);

  const areaHa = convertArea(cleanArea, areaUnit, 'ha');
  const areaAcre = convertArea(cleanArea, areaUnit, 'acre');

  const grossRevenue = cleanProd * cleanPrice;
  const netProfit = grossRevenue - cleanCost;
  const roiPct = cleanCost > 0 ? (netProfit / cleanCost) * 100 : 0;
  const bcrRatio = cleanCost > 0 ? grossRevenue / cleanCost : 0;

  const profitPerHa = areaHa > 0 ? netProfit / areaHa : 0;
  const profitPerAcre = areaAcre > 0 ? netProfit / areaAcre : 0;
  const revenuePerHa = areaHa > 0 ? grossRevenue / areaHa : 0;
  const costPerHa = areaHa > 0 ? cleanCost / areaHa : 0;

  // Break-even yield (tonnes needed at this price to cover costs)
  const breakEvenYieldTonnes = cleanPrice > 0 ? cleanCost / cleanPrice : 0;
  const breakEvenYieldHa = areaHa > 0 ? breakEvenYieldTonnes / areaHa : 0;
  // Break-even price ($ / tonne needed at this production)
  const breakEvenPricePerTonne = cleanProd > 0 ? cleanCost / cleanProd : 0;

  return {
    currency,
    grossRevenue: Number(grossRevenue.toFixed(2)),
    totalCost: Number(cleanCost.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    isProfitable: netProfit >= 0,
    roiPct: Number(roiPct.toFixed(2)),
    bcrRatio: Number(bcrRatio.toFixed(2)),
    profitPerHa: Number(profitPerHa.toFixed(2)),
    profitPerAcre: Number(profitPerAcre.toFixed(2)),
    revenuePerHa: Number(revenuePerHa.toFixed(2)),
    costPerHa: Number(costPerHa.toFixed(2)),
    breakEvenYieldTonnes: Number(breakEvenYieldTonnes.toFixed(2)),
    breakEvenYieldHa: Number(breakEvenYieldHa.toFixed(2)),
    breakEvenPricePerTonne: Number(breakEvenPricePerTonne.toFixed(2)),
    steps: [
      `Gross Revenue = ${cleanProd} ${productionUnit} × ${currency}${cleanPrice}/${productionUnit} = ${currency}${grossRevenue.toLocaleString()}`,
      `Net Farm Profit = Gross Revenue (${currency}${grossRevenue.toLocaleString()}) - Total Cost (${currency}${cleanCost.toLocaleString()}) = ${currency}${netProfit.toLocaleString()}`,
      `Return on Investment (ROI) = (${currency}${netProfit.toLocaleString()} ÷ ${currency}${cleanCost.toLocaleString()}) × 100 = ${roiPct.toFixed(2)}%`,
      `Benefit-Cost Ratio (BCR) = ${bcrRatio.toFixed(2)}:1`,
      `Break-even Metrics: Yield ${breakEvenYieldTonnes.toFixed(1)} ${productionUnit} (${breakEvenYieldHa.toFixed(2)}/ha) OR Selling Price of ${currency}${breakEvenPricePerTonne.toFixed(2)}/${productionUnit}`
    ]
  };
}
