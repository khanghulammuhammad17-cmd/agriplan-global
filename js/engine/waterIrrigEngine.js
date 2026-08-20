import { convertArea, convertVolume, convertFlow, convertLength } from './unitConverter.js';

/**
 * 18. FAO-56 Penman-Monteith Reference Evapotranspiration (ETo) Calculator
 * Scientific implementation of standard FAO Irrigation and Drainage Paper No. 56.
 */
export function calculateFAO56ETo({
  meanTempC = 25,          // T: Mean daily air temperature at 2m (°C)
  relHumidityPct = 60,     // RH: Mean daily relative humidity (%)
  windSpeed2m = 2.0,       // u2: Wind speed at 2m height (m/s)
  solarRadiation = 22.0,   // Rs: Solar radiation (MJ/m²/day)
  elevationM = 100,        // z: Elevation above sea level (m)
  albedo = 0.23            // Grass reference albedo
}) {
  const T = parseFloat(meanTempC) || 20;
  const RH = Math.max(5, Math.min(100, parseFloat(relHumidityPct) || 60));
  const u2 = Math.max(0.1, parseFloat(windSpeed2m) || 2.0);
  const Rs = Math.max(1, parseFloat(solarRadiation) || 20.0);
  const z = Math.max(0, parseFloat(elevationM) || 0);

  // 1. Atmospheric pressure P (kPa) - Eq. 7
  const P = 101.3 * Math.pow((293 - 0.0065 * z) / 293, 5.26);

  // 2. Psychrometric constant gamma (kPa/°C) - Eq. 8
  const gamma = 0.000665 * P;

  // 3. Saturation vapor pressure es(T) (kPa) - Eq. 11
  const es = 0.6108 * Math.exp((17.27 * T) / (T + 237.3));

  // 4. Actual vapor pressure ea (kPa) - Eq. 17
  const ea = es * (RH / 100);

  // 5. Vapor pressure deficit (es - ea) (kPa)
  const vpd = Math.max(0, es - ea);

  // 6. Slope of saturation vapor pressure curve Delta (kPa/°C) - Eq. 13
  const delta = (4098 * es) / Math.pow(T + 237.3, 2);

  // 7. Net solar radiation Rns (MJ/m²/day) - Eq. 38
  const Rns = (1 - albedo) * Rs;

  // 8. Net longwave radiation Rnl approximation for clear/partly cloudy (MJ/m²/day) - Eq. 39
  // Stefan-Boltzmann constant sigma = 4.903e-9 MJ/K⁴/m²/day
  const T_kelvin = T + 273.16;
  const sigmaT4 = 4.903e-9 * Math.pow(T_kelvin, 4);
  const clearSkyRs = (0.75 + 2e-5 * z) * (Rs / 0.75); // approx clear sky Rso
  const cloudFactor = Math.min(1.0, Math.max(0.3, 1.35 * (Rs / Math.max(1, clearSkyRs)) - 0.35));
  const humidityEmissivity = 0.34 - 0.14 * Math.sqrt(Math.max(0.01, ea));
  const Rnl = sigmaT4 * humidityEmissivity * cloudFactor;

  // 9. Net radiation Rn (MJ/m²/day) - Eq. 40
  const Rn = Math.max(0, Rns - Rnl);

  // 10. Soil heat flux G (MJ/m²/day) for daily step = 0
  const G = 0;

  // 11. FAO-56 Penman-Monteith ETo Equation - Eq. 6
  const numeratorRadiation = 0.408 * delta * (Rn - G);
  const numeratorAerodynamic = gamma * (900 / (T + 273)) * u2 * vpd;
  const denominator = delta + gamma * (1 + 0.34 * u2);

  const ETo = (numeratorRadiation + numeratorAerodynamic) / denominator;

  return {
    etoMmDay: Number(Math.max(0.1, ETo).toFixed(2)),
    radiationComponentMmDay: Number((numeratorRadiation / denominator).toFixed(2)),
    aerodynamicComponentMmDay: Number((numeratorAerodynamic / denominator).toFixed(2)),
    vpdKPa: Number(vpd.toFixed(3)),
    atmosphericPressureKPa: Number(P.toFixed(2)),
    psychrometricGamma: Number(gamma.toFixed(4)),
    deltaSlope: Number(delta.toFixed(4)),
    netRadiationRn: Number(Rn.toFixed(2)),
    saturationVaporPressureEs: Number(es.toFixed(3)),
    actualVaporPressureEa: Number(ea.toFixed(3)),
    steps: [
      `1. Atmospheric Pressure P = ${P.toFixed(2)} kPa, Psychrometric Constant γ = ${gamma.toFixed(4)} kPa/°C`,
      `2. Saturation Vapor Pressure e_s = ${es.toFixed(3)} kPa, Actual e_a = ${ea.toFixed(3)} kPa, VPD = ${vpd.toFixed(3)} kPa`,
      `3. Net Radiation R_n = ${Rn.toFixed(2)} MJ/m²/day (Solar R_ns = ${Rns.toFixed(2)}, Longwave R_nl = ${Rnl.toFixed(2)})`,
      `4. Radiation Term: ${numeratorRadiation.toFixed(3)}, Aerodynamic Term: ${numeratorAerodynamic.toFixed(3)}`,
      `5. FAO-56 Reference ETo = (${numeratorRadiation.toFixed(3)} + ${numeratorAerodynamic.toFixed(3)}) ÷ ${denominator.toFixed(3)} = ${ETo.toFixed(2)} mm/day`
    ]
  };
}

/**
 * 19. Crop Water Requirement (ETc) Calculator
 * FAO Single Crop Coefficient Method: ETc = ETo * Kc
 */
export function calculateCropWaterRequirement({
  etoMmDay = 5.0,
  cropName = 'Wheat',
  growthStage = 'mid', // 'initial', 'development', 'mid', 'late'
  kcValue = 1.15,
  periodDays = 30,
  area = 1,
  areaUnit = 'ha'
}) {
  const cleanEto = Math.max(0.1, parseFloat(etoMmDay) || 5.0);
  const cleanKc = Math.max(0.1, parseFloat(kcValue) || 1.15);
  const cleanDays = Math.max(1, parseInt(periodDays, 10) || 30);
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);

  const etcDailyMm = cleanEto * cleanKc;
  const etcTotalPeriodMm = etcDailyMm * cleanDays;

  const areaM2 = convertArea(cleanArea, areaUnit, 'sq_m');
  const totalWaterM3 = (areaM2 * etcTotalPeriodMm) / 1000;
  const totalWaterLiters = totalWaterM3 * 1000;
  const totalWaterGallons = totalWaterM3 * 264.172;

  return {
    etcDailyMm: Number(etcDailyMm.toFixed(2)),
    etcTotalPeriodMm: Number(etcTotalPeriodMm.toFixed(1)),
    totalWaterM3: Number(totalWaterM3.toFixed(1)),
    totalWaterLiters: Number(totalWaterLiters.toFixed(0)),
    totalWaterGallons: Number(totalWaterGallons.toFixed(0)),
    kcApplied: cleanKc,
    growthStage,
    steps: [
      `Daily Crop Water ETc = ETo (${cleanEto} mm/day) × Kc (${cleanKc}) = ${etcDailyMm.toFixed(2)} mm/day`,
      `Period Requirement (${cleanDays} days) = ${etcDailyMm.toFixed(2)} × ${cleanDays} = ${etcTotalPeriodMm.toFixed(1)} mm`,
      `Total Volume for ${cleanArea} ${areaUnit} (${areaM2.toFixed(0)} m²) = ${totalWaterM3.toFixed(1)} m³ (${totalWaterLiters.toLocaleString()} Liters / ${totalWaterGallons.toLocaleString()} Gallons)`
    ]
  };
}

/**
 * 20. Irrigation Water Requirement Calculator (Net & Gross)
 */
export function calculateIrrigationWaterRequirement({
  cropEtcMm = 150, // Total ETc over planning window (mm)
  effectiveRainMm = 40, // Effective rainfall (mm)
  groundwaterMm = 0,
  soilWaterDepletionMm = 10, // Initial soil profile moisture contribution
  irrigationEfficiencyPct = 85, // Drip: 85-95%, Sprinkler: 70-80%, Surface: 55-65%
  area = 1,
  areaUnit = 'ha'
}) {
  const cleanEtc = Math.max(0, parseFloat(cropEtcMm) || 0);
  const cleanRain = Math.max(0, parseFloat(effectiveRainMm) || 0);
  const cleanGw = Math.max(0, parseFloat(groundwaterMm) || 0);
  const cleanSoil = Math.max(0, parseFloat(soilWaterDepletionMm) || 0);
  const cleanEff = Math.max(20, Math.min(100, parseFloat(irrigationEfficiencyPct) || 85));
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);

  // Net Irrigation Requirement: IN_net = ETc - Peff - GW - ΔSW
  const netIrrigationMm = Math.max(0, cleanEtc - cleanRain - cleanGw - cleanSoil);
  // Gross Irrigation Requirement: IN_gross = IN_net / Efficiency
  const grossIrrigationMm = netIrrigationMm / (cleanEff / 100);

  const areaM2 = convertArea(cleanArea, areaUnit, 'sq_m');
  const netVolumeM3 = (areaM2 * netIrrigationMm) / 1000;
  const grossVolumeM3 = (areaM2 * grossIrrigationMm) / 1000;
  const waterLossM3 = grossVolumeM3 - netVolumeM3;

  return {
    netIrrigationMm: Number(netIrrigationMm.toFixed(1)),
    grossIrrigationMm: Number(grossIrrigationMm.toFixed(1)),
    netVolumeM3: Number(netVolumeM3.toFixed(1)),
    grossVolumeM3: Number(grossVolumeM3.toFixed(1)),
    waterLossM3: Number(waterLossM3.toFixed(1)),
    efficiencyPct: cleanEff,
    steps: [
      `Net Irrigation Depth = ${cleanEtc} mm (ETc) - ${cleanRain} mm (Rain) - ${cleanSoil} mm (Soil moisture) = ${netIrrigationMm.toFixed(1)} mm`,
      `Gross Irrigation Depth (at ${cleanEff}% system efficiency) = ${netIrrigationMm.toFixed(1)} ÷ ${(cleanEff/100).toFixed(2)} = ${grossIrrigationMm.toFixed(1)} mm`,
      `Total Gross Water Delivery = ${grossVolumeM3.toFixed(1)} m³ (${(grossVolumeM3 * 1000).toLocaleString()} Liters) for ${cleanArea} ${areaUnit}`
    ]
  };
}

/**
 * 21. Irrigation Scheduling Calculator
 * Soil-Water Balance Concept: TAW, RAW, and Depletion Intervals.
 */
export function calculateIrrigationScheduling({
  soilTexture = 'loam', // Field Capacity / Wilting Point
  fieldCapacityVolPct = 28, // Volumetric % FC
  wiltingPointVolPct = 14,  // Volumetric % WP
  rootingDepthM = 0.8,      // Zr (m)
  depletionFraction = 0.50, // p (allowable depletion before stress)
  dailyEtcMm = 5.5,         // Daily crop ETc (mm/day)
  effectiveRainDailyMm = 0
}) {
  const fc = Math.max(5, Math.min(50, parseFloat(fieldCapacityVolPct) || 28));
  const wp = Math.max(1, Math.min(fc - 1, parseFloat(wiltingPointVolPct) || 14));
  const zr = Math.max(0.1, parseFloat(rootingDepthM) || 0.8);
  const p = Math.max(0.1, Math.min(0.9, parseFloat(depletionFraction) || 0.50));
  const etc = Math.max(0.1, parseFloat(dailyEtcMm) || 5.5);
  const rain = Math.max(0, parseFloat(effectiveRainDailyMm) || 0);

  // Total Available Water TAW (mm) = 1000 * (FC - WP)/100 * Zr
  const tawMm = 1000 * ((fc - wp) / 100) * zr;
  // Readily Available Water RAW (mm) = p * TAW
  const rawMm = p * tawMm;

  // Net daily depletion rate
  const netDailyDepletionMm = Math.max(0.1, etc - rain);
  const irrigationIntervalDays = rawMm / netDailyDepletionMm;
  const roundedIntervalDays = Math.max(1, Math.floor(irrigationIntervalDays));
  const netIrrigationApplicationMm = roundedIntervalDays * netDailyDepletionMm;

  return {
    tawMm: Number(tawMm.toFixed(1)),
    rawMm: Number(rawMm.toFixed(1)),
    irrigationIntervalDays: Number(irrigationIntervalDays.toFixed(1)),
    recommendedIntervalDays: roundedIntervalDays,
    applicationDepthPerCycleMm: Number(netIrrigationApplicationMm.toFixed(1)),
    dailyDepletionMm: Number(netDailyDepletionMm.toFixed(1)),
    steps: [
      `Total Available Water (TAW) = 1,000 × (${fc}% FC - ${wp}% WP) × ${zr}m root depth = ${tawMm.toFixed(1)} mm`,
      `Readily Available Water (RAW) = ${tawMm.toFixed(1)} mm × ${p * 100}% allowable depletion = ${rawMm.toFixed(1)} mm`,
      `Net Daily Depletion = ${etc} mm/day (ETc) - ${rain} mm/day (Rain) = ${netDailyDepletionMm.toFixed(1)} mm/day`,
      `Irrigation Frequency = ${rawMm.toFixed(1)} mm RAW ÷ ${netDailyDepletionMm.toFixed(1)} mm/day = ${irrigationIntervalDays.toFixed(1)} Days (~Every ${roundedIntervalDays} days apply ${netIrrigationApplicationMm.toFixed(1)} mm)`
    ]
  };
}

/**
 * 22. Irrigation System Runtime Calculator
 */
export function calculateIrrigationRuntime({
  targetDepthMm = 25, // mm depth required
  fieldArea = 1,
  areaUnit = 'ha',
  systemFlowRate = 15, // Flow rate value
  flowUnit = 'cum_h', // 'cum_h' (m³/h), 'l_min', 'l_h', 'gpm_us'
  applicationEfficiencyPct = 85
}) {
  const cleanDepth = Math.max(0.1, parseFloat(targetDepthMm) || 25);
  const cleanArea = Math.max(0.0001, parseFloat(fieldArea) || 1);
  const cleanFlow = Math.max(0.1, parseFloat(systemFlowRate) || 15);
  const cleanEff = Math.max(30, Math.min(100, parseFloat(applicationEfficiencyPct) || 85));

  const areaM2 = convertArea(cleanArea, areaUnit, 'sq_m');
  const netVolumeM3 = (areaM2 * cleanDepth) / 1000;
  const grossVolumeM3 = netVolumeM3 / (cleanEff / 100);

  // Convert system flow to m³/hour
  const flowCumH = convertFlow(cleanFlow, flowUnit, 'cum_h');
  const runtimeHours = grossVolumeM3 / flowCumH;
  const totalMinutes = runtimeHours * 60;
  const hoursOnly = Math.floor(runtimeHours);
  const minutesOnly = Math.round(totalMinutes % 60);

  return {
    netVolumeM3: Number(netVolumeM3.toFixed(1)),
    grossVolumeM3: Number(grossVolumeM3.toFixed(1)),
    flowCumH: Number(flowCumH.toFixed(2)),
    runtimeHoursDecimal: Number(runtimeHours.toFixed(2)),
    runtimeFormatted: `${hoursOnly} hr ${minutesOnly} min`,
    totalMinutes: Math.round(totalMinutes),
    steps: [
      `Target Gross Volume = (${areaM2.toFixed(0)} m² × ${cleanDepth} mm ÷ 1000) ÷ ${(cleanEff/100).toFixed(2)} efficiency = ${grossVolumeM3.toFixed(1)} m³`,
      `System Flow Rate = ${cleanFlow} ${flowUnit.replace('_', '/')} (${flowCumH.toFixed(2)} m³/hour)`,
      `Total Runtime = ${grossVolumeM3.toFixed(1)} m³ ÷ ${flowCumH.toFixed(2)} m³/hr = ${runtimeHours.toFixed(2)} Hours (${hoursOnly}h ${minutesOnly}m)`
    ]
  };
}

/**
 * 23. Effective Rainfall Calculator
 */
export function calculateEffectiveRainfall({
  totalRainfallMm = 80, // mm
  method = 'usda_scs', // 'usda_scs', 'fao_cropwat', 'fixed_pct'
  fixedPct = 75,
  soilStorageDepletionMm = 50
}) {
  const P = Math.max(0, parseFloat(totalRainfallMm) || 0);
  let peffMm = 0;
  let methodName = 'USDA Soil Conservation Service (SCS)';

  if (method === 'usda_scs') {
    methodName = 'USDA SCS Method';
    if (P <= 250) {
      peffMm = (P * (125 - 0.2 * P)) / 125;
    } else {
      peffMm = 125 + 0.1 * P;
    }
  } else if (method === 'fao_cropwat') {
    methodName = 'FAO CROPWAT Empirical Formula';
    if (P <= 70) {
      peffMm = Math.max(0, (P * 0.6) - 10);
    } else {
      peffMm = (P * 0.8) - 24;
    }
  } else {
    methodName = `Fixed Retention (${fixedPct}%)`;
    peffMm = P * (parseFloat(fixedPct) / 100);
  }

  peffMm = Math.min(P, Math.max(0, peffMm));
  const runoffDeepPercolationMm = P - peffMm;
  const effectivenessPct = P > 0 ? (peffMm / P) * 100 : 0;

  return {
    totalRainfallMm: Number(P.toFixed(1)),
    effectiveRainfallMm: Number(peffMm.toFixed(1)),
    runoffLossMm: Number(runoffDeepPercolationMm.toFixed(1)),
    effectivenessPct: Number(effectivenessPct.toFixed(1)),
    methodName,
    steps: [
      `Total Precipitation = ${P.toFixed(1)} mm analyzed via ${methodName}`,
      `Effective Rainfall Available to Crop = ${peffMm.toFixed(1)} mm (${effectivenessPct.toFixed(1)}% of precipitation)`,
      `Estimated Surface Runoff & Deep Drainage Loss = ${runoffDeepPercolationMm.toFixed(1)} mm`
    ]
  };
}

/**
 * 24. Water Volume Calculator
 */
export function calculateWaterVolume({
  area = 1,
  areaUnit = 'ha',
  waterDepth = 50, // mm or inches
  depthUnit = 'mm'
}) {
  const cleanArea = Math.max(0.0001, parseFloat(area) || 1);
  const cleanDepth = Math.max(0, parseFloat(waterDepth) || 0);

  const depthM = convertLength(cleanDepth, depthUnit, 'm');
  const areaM2 = convertArea(cleanArea, areaUnit, 'sq_m');

  const volumeM3 = areaM2 * depthM;
  const volumeLiters = volumeM3 * 1000;
  const volumeGallons = volumeM3 * 264.172;
  const acreInches = convertVolume(volumeLiters, 'l', 'acre_inch');
  const acreFeet = convertVolume(volumeLiters, 'l', 'acre_foot');

  return {
    volumeM3: Number(volumeM3.toFixed(1)),
    volumeLiters: Number(volumeLiters.toFixed(0)),
    volumeGallons: Number(volumeGallons.toFixed(0)),
    acreInches: Number(acreInches.toFixed(2)),
    acreFeet: Number(acreFeet.toFixed(3)),
    areaM2: Number(areaM2.toFixed(0)),
    depthMm: Number((depthM * 1000).toFixed(1)),
    steps: [
      `Area Normalized = ${cleanArea} ${areaUnit} (${areaM2.toFixed(0)} m²), Depth = ${cleanDepth} ${depthUnit} (${(depthM * 1000).toFixed(1)} mm)`,
      `Volume = ${areaM2.toFixed(0)} m² × ${depthM.toFixed(4)} m = ${volumeM3.toFixed(1)} m³`,
      `Equivalent in Units: ${volumeLiters.toLocaleString()} Liters | ${volumeGallons.toLocaleString()} US Gallons | ${acreInches.toFixed(2)} Acre-Inches`
    ]
  };
}
