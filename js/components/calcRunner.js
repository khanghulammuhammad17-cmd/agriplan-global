import * as CropSeed from '../engine/cropSeedEngine.js';
import * as SoilFert from '../engine/soilFertEngine.js';
import * as WaterIrrig from '../engine/waterIrrigEngine.js';
import * as FarmEcon from '../engine/farmEconEngine.js';

export function executeCalculator(slug, inputs) {
  switch (slug) {
    // 1-8 Crop & Seed
    case 'seed-rate-calculator':
      return CropSeed.calculateSeedRate(inputs);
    case 'seeding-density-calculator':
      return CropSeed.calculateSeedingDensity(inputs);
    case 'plant-population-calculator':
      return CropSeed.calculatePlantPopulation(inputs);
    case 'crop-yield-calculator':
      return CropSeed.calculateCropYield(inputs);
    case 'harvest-yield-calculator':
      return CropSeed.calculateHarvestYield(inputs);
    case 'crop-area-calculator':
      return CropSeed.calculateCropArea(inputs);
    case 'crop-spacing-calculator':
      return CropSeed.calculateCropSpacing(inputs);
    case 'germination-rate-calculator':
      return CropSeed.calculateGerminationRate(inputs);

    // 9-17 Soil & Fertilizer
    case 'fertilizer-requirement-calculator':
      return SoilFert.calculateFertilizerRequirement(inputs);
    case 'npk-calculator':
      return SoilFert.calculateNPK(inputs);
    case 'nitrogen-requirement-calculator':
      return SoilFert.calculateNitrogenRequirement(inputs);
    case 'phosphorus-requirement-calculator':
      return SoilFert.calculatePhosphorusRequirement(inputs);
    case 'potassium-requirement-calculator':
      return SoilFert.calculatePotassiumRequirement(inputs);
    case 'fertilizer-application-rate-calculator':
      return SoilFert.calculateFertilizerApplicationRate(inputs);
    case 'nutrient-to-fertilizer-calculator':
      return SoilFert.calculateNutrientToFertilizer(inputs);
    case 'lime-requirement-calculator':
      return SoilFert.calculateLimeRequirement(inputs);
    case 'compost-application-calculator':
      return SoilFert.calculateCompostApplication(inputs);

    // 18-24 Water & Irrigation
    case 'eto-calculator':
      return WaterIrrig.calculateFAO56ETo(inputs);
    case 'crop-water-requirement-calculator':
      return WaterIrrig.calculateCropWaterRequirement(inputs);
    case 'irrigation-water-requirement-calculator':
      return WaterIrrig.calculateIrrigationWaterRequirement(inputs);
    case 'irrigation-scheduling-calculator':
      return WaterIrrig.calculateIrrigationScheduling(inputs);
    case 'irrigation-runtime-calculator':
      return WaterIrrig.calculateIrrigationRuntime(inputs);
    case 'effective-rainfall-calculator':
      return WaterIrrig.calculateEffectiveRainfall(inputs);
    case 'water-volume-calculator':
      return WaterIrrig.calculateWaterVolume(inputs);

    // 25-30 Farm & Economics
    case 'farm-area-calculator':
      return FarmEcon.calculateFarmArea(inputs);
    case 'agriculture-unit-converter':
      return FarmEcon.calculateUnitConversion(inputs);
    case 'sprayer-calibration-calculator':
      return FarmEcon.calculateSprayerCalibration(inputs);
    case 'farm-input-cost-calculator':
      return FarmEcon.calculateFarmInputCost(inputs);
    case 'crop-production-cost-calculator':
      return FarmEcon.calculateCropProductionCost(inputs);
    case 'farm-profit-roi-calculator':
      return FarmEcon.calculateFarmProfitROI(inputs);

    default:
      return { steps: ['Calculation complete.'] };
  }
}

export function formatResultCards(slug, res) {
  if (!res) return `<div class="text-sm text-slate-400">Click Calculate to generate result.</div>`;

  let html = `<div class="space-y-4">`;

  if (slug === 'seed-rate-calculator') {
    html += `
      <div>
        <span class="text-xs text-emerald-300 block">Total Pure Live Seed Required</span>
        <div class="text-3xl sm:text-4xl font-bold text-white font-mono mt-1">${res.totalSeedRequired.toLocaleString()} <span class="text-lg text-emerald-400 font-sans">${res.weightUnit}</span></div>
      </div>
      <div class="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-800/60 text-xs">
        <div><span class="text-slate-400 block">Adjusted Seed Rate:</span> <span class="font-bold text-white font-mono">${res.adjustedRate} ${res.weightUnit}/unit</span></div>
        <div><span class="text-slate-400 block">Pure Live Seed (PLS):</span> <span class="font-bold text-emerald-300 font-mono">${res.plsFraction}%</span></div>
      </div>
    `;
  } else if (slug === 'eto-calculator') {
    html += `
      <div>
        <span class="text-xs text-emerald-300 block">Reference Evapotranspiration (ETo)</span>
        <div class="text-3xl sm:text-4xl font-bold text-white font-mono mt-1">${res.etoMmDay} <span class="text-lg text-emerald-400 font-sans">mm/day</span></div>
      </div>
      <div class="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-800/60 text-xs">
        <div><span class="text-slate-400 block">Radiation Term:</span> <span class="font-bold text-white font-mono">${res.radiationComponentMmDay} mm</span></div>
        <div><span class="text-slate-400 block">Aerodynamic Term:</span> <span class="font-bold text-white font-mono">${res.aerodynamicComponentMmDay} mm</span></div>
        <div><span class="text-slate-400 block">VPD:</span> <span class="font-bold text-emerald-300 font-mono">${res.vpdKPa} kPa</span></div>
        <div><span class="text-slate-400 block">Atm Pressure:</span> <span class="font-bold text-slate-300 font-mono">${res.atmosphericPressureKPa} kPa</span></div>
      </div>
    `;
  } else if (slug === 'crop-water-requirement-calculator') {
    html += `
      <div>
        <span class="text-xs text-emerald-300 block">Crop Water ETc (Period Total)</span>
        <div class="text-3xl sm:text-4xl font-bold text-white font-mono mt-1">${res.etcTotalPeriodMm} <span class="text-lg text-emerald-400 font-sans">mm</span></div>
      </div>
      <div class="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-800/60 text-xs">
        <div><span class="text-slate-400 block">Daily ETc:</span> <span class="font-bold text-white font-mono">${res.etcDailyMm} mm/day</span></div>
        <div><span class="text-slate-400 block">Volume (m³):</span> <span class="font-bold text-emerald-300 font-mono">${res.totalWaterM3.toLocaleString()} m³</span></div>
      </div>
    `;
  } else if (slug === 'npk-calculator') {
    html += `
      <div>
        <span class="text-xs text-emerald-300 block">Total Fertilizer Products Required</span>
        <div class="text-2xl font-bold text-white font-mono mt-1">DAP: ${res.totalDap} kg | Urea: ${res.totalUrea} kg</div>
      </div>
      <div class="grid grid-cols-3 gap-2 pt-3 border-t border-emerald-800/60 text-xs">
        <div><span class="text-slate-400 block">DAP Bags (50kg):</span> <span class="font-bold text-emerald-300 font-mono">~${res.dapBags}</span></div>
        <div><span class="text-slate-400 block">Urea Bags (50kg):</span> <span class="font-bold text-emerald-300 font-mono">~${res.ureaBags}</span></div>
        <div><span class="text-slate-400 block">MOP Bags (50kg):</span> <span class="font-bold text-emerald-300 font-mono">~${res.mopBags}</span></div>
      </div>
    `;
  } else if (slug === 'farm-profit-roi-calculator') {
    html += `
      <div>
        <span class="text-xs text-emerald-300 block">Net Farm Profit</span>
        <div class="text-3xl sm:text-4xl font-bold ${res.isProfitable ? 'text-emerald-400' : 'text-rose-400'} font-mono mt-1">
          ${res.currency}${res.netProfit.toLocaleString()}
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-800/60 text-xs">
        <div><span class="text-slate-400 block">Return on Investment (ROI):</span> <span class="font-bold text-white font-mono">${res.roiPct}%</span></div>
        <div><span class="text-slate-400 block">Benefit-Cost Ratio:</span> <span class="font-bold text-emerald-300 font-mono">${res.bcrRatio}:1</span></div>
        <div><span class="text-slate-400 block">Profit per Hectare:</span> <span class="font-bold text-white font-mono">${res.currency}${res.profitPerHa}</span></div>
        <div><span class="text-slate-400 block">Break-even Yield:</span> <span class="font-bold text-slate-300 font-mono">${res.breakEvenYieldTonnes} t</span></div>
      </div>
    `;
  } else if (slug === 'farm-area-calculator') {
    html += `
      <div>
        <span class="text-xs text-emerald-300 block">Equivalent Farm Area</span>
        <div class="text-3xl sm:text-4xl font-bold text-white font-mono mt-1">${res.ha} <span class="text-lg text-emerald-400 font-sans">Hectares</span></div>
      </div>
      <div class="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-800/60 text-xs">
        <div><span class="text-slate-400 block">Standard Acres:</span> <span class="font-bold text-white font-mono">${res.acre} Acres</span></div>
        <div><span class="text-slate-400 block">Kanal (5,445 sq ft):</span> <span class="font-bold text-emerald-300 font-mono">${res.kanal} Kanal</span></div>
        <div><span class="text-slate-400 block">Square Meters:</span> <span class="font-bold text-slate-300 font-mono">${res.sq_m.toLocaleString()} m²</span></div>
        <div><span class="text-slate-400 block">Marla (272.25 sq ft):</span> <span class="font-bold text-slate-300 font-mono">${res.marla} Marla</span></div>
      </div>
    `;
  } else {
    // Generic Result Formatter
    const keys = Object.keys(res).filter(k => k !== 'steps' && typeof res[k] !== 'object');
    const primaryKey = keys[0] || 'result';
    const primaryVal = res[primaryKey];
    html += `
      <div>
        <span class="text-xs text-emerald-300 block">${primaryKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
        <div class="text-3xl font-bold text-white font-mono mt-1">${typeof primaryVal === 'number' ? primaryVal.toLocaleString() : primaryVal}</div>
      </div>
      <div class="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-800/60 text-xs">
        ${keys.slice(1, 5).map(k => `
          <div>
            <span class="text-slate-400 block">${k.replace(/([A-Z])/g, ' $1')}:</span>
            <span class="font-bold text-white font-mono">${typeof res[k] === 'number' ? res[k].toLocaleString() : res[k]}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  html += `</div>`;
  return html;
}
