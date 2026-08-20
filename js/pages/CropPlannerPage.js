import { CROPS_DATA } from '../data/cropsData.js';
import { convertArea } from '../engine/unitConverter.js';

export function renderCropPlannerPage() {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <!-- Page Header -->
      <div class="max-w-3xl mb-8">
        <nav class="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
          <a href="#/" class="hover:text-emerald-700">Home</a>
          <span>/</span>
          <span class="text-emerald-900 font-semibold">Crop Planner</span>
        </nav>
        
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
          Interactive Agricultural Crop Planner
        </h1>
        <p class="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Formulate a comprehensive seasonal cropping plan customized to your farm acreage, soil texture, target planting date, and irrigation infrastructure.
        </p>
      </div>

      <!-- Planning Form + Dynamic Output Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        <!-- Inputs Form (Col 1-5) -->
        <div class="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <i data-lucide="sliders" class="w-5 h-5 text-emerald-700"></i>
            <span>Farm Enterprise Setup</span>
          </h2>

          <!-- Crop Selection -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Target Crop Species</label>
            <select id="planner-crop-select" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
              ${CROPS_DATA.map(c => `<option value="${c.id}">${c.name} (${c.scientificName}) - ${c.category}</option>`).join('')}
            </select>
          </div>

          <!-- Farm Area & Unit -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Farm Area</label>
              <input type="number" id="planner-area" value="10" min="0.1" step="any" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Area Unit</label>
              <select id="planner-area-unit" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
                <option value="ha" selected>Hectares (ha)</option>
                <option value="acre">Acres</option>
                <option value="kanal">Kanal (5,445 sq ft)</option>
              </select>
            </div>
          </div>

          <!-- Target Planting Date -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Planned Sowing / Transplant Date</label>
            <input type="date" id="planner-plant-date" value="2026-10-15" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>

          <!-- Soil Texture -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Dominant Soil Texture</label>
            <select id="planner-soil-type" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
              <option value="loam" selected>Loam / Silt Loam (Optimal Water & Nutrient Storage)</option>
              <option value="clay">Clay / Clay Loam (High Retention, Waterlogging Risk)</option>
              <option value="sand">Sandy Loam / Sand (High Drainage, Leaching Risk)</option>
            </select>
          </div>

          <!-- Irrigation System -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Irrigation Infrastructure</label>
            <select id="planner-irrig-type" class="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
              <option value="drip" selected>Drip / Micro-Irrigation (85-95% Efficiency)</option>
              <option value="pivot">Center Pivot / Sprinkler (75-85% Efficiency)</option>
              <option value="flood">Surface / Furrow / Basin (50-65% Efficiency)</option>
              <option value="rainfed">Rainfed / Non-Irrigated</option>
            </select>
          </div>

          <!-- Action Button -->
          <button id="planner-generate-btn" class="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <i data-lucide="compass" class="w-4 h-4"></i>
            <span>Generate Customized Farm Plan</span>
          </button>
        </div>

        <!-- Generated Plan Output Dashboard (Col 6-12) -->
        <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between" id="planner-results-container">
          <!-- Dynamic Plan Output Injected via JS -->
        </div>

      </div>

      <!-- Advisory Disclaimer -->
      <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
        <strong>Agronomic Disclaimer:</strong> This customized plan provides strategic planning guidance and scientific approximations. Field execution must always be adjusted based on certified seed lot labels, real-time in-season weather, laboratory soil chemical tests, and local university agricultural extension advice.
      </div>

    </div>
  `;
}

export function generateCropPlanOutput(cropId, area, areaUnit, plantDateStr, soilType, irrigType) {
  const crop = CROPS_DATA.find(c => c.id === cropId) || CROPS_DATA[0];
  const cleanArea = Math.max(0.1, parseFloat(area) || 10);
  const areaHa = convertArea(cleanArea, areaUnit, 'ha');
  const areaAcre = convertArea(cleanArea, areaUnit, 'acre');

  const plantDate = new Date(plantDateStr || '2026-10-15');
  const harvestDate = new Date(plantDate);
  harvestDate.setDate(harvestDate.getDate() + crop.growingDays);

  const midSeasonDate = new Date(plantDate);
  midSeasonDate.setDate(midSeasonDate.getDate() + Math.round(crop.growingDays * 0.5));

  // Water calculation estimate: e.g. 500mm average * area
  const avgWaterMm = 550;
  const totalWaterM3 = (areaHa * 10000 * avgWaterMm) / 1000;

  return `
    <div class="space-y-6">
      
      <!-- Top Crop Profile Summary -->
      <div class="flex items-start justify-between pb-4 border-b border-slate-100">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">${crop.category} Enterprise Plan</span>
          <h3 class="text-2xl font-bold text-slate-900 mt-1">${crop.name} <span class="text-sm font-normal text-slate-400 italic">(${crop.scientificName})</span></h3>
          <p class="text-xs text-slate-500 mt-1">${cleanArea} ${areaUnit} (${areaHa.toFixed(2)} ha / ${areaAcre.toFixed(2)} acres) &bull; Soil: ${soilType.toUpperCase()} &bull; Irrigation: ${irrigType.toUpperCase()}</p>
        </div>
        <a href="#/crops/${crop.id}" class="text-xs font-semibold text-emerald-700 hover:text-emerald-900 px-3 py-1 bg-emerald-50 rounded-xl border border-emerald-200">
          Full Agronomic Profile &rarr;
        </a>
      </div>

      <!-- Phenology Timeline Grid -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
          <i data-lucide="calendar" class="w-4 h-4 text-emerald-600"></i>
          <span>Seasonal Growth Timeline (~${crop.growingDays} Days)</span>
        </h4>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span class="text-[10px] uppercase font-bold text-emerald-800 block">Sowing / Planting</span>
            <span class="font-bold text-slate-900 text-sm block mt-1">${plantDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span class="text-[11px] text-slate-500 mt-1 block">Soil depth: 3-5 cm into moist seedbed</span>
          </div>

          <div class="p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
            <span class="text-[10px] uppercase font-bold text-sky-800 block">Peak Vegetative / Flowering</span>
            <span class="font-bold text-slate-900 text-sm block mt-1">${midSeasonDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span class="text-[11px] text-slate-500 mt-1 block">Peak Kc (${crop.kcStages.mid}) & N sidedress</span>
          </div>

          <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <span class="text-[10px] uppercase font-bold text-amber-800 block">Target Harvest Window</span>
            <span class="font-bold text-slate-900 text-sm block mt-1">${harvestDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span class="text-[11px] text-slate-500 mt-1 block">Est. Yield: ${crop.typicalYieldHa}</span>
          </div>
        </div>
      </div>

      <!-- Resource & Input Forecast -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <!-- Water Strategy -->
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <i data-lucide="droplet" class="w-3.5 h-3.5 text-sky-600"></i>
              <span>Water Requirement (ETc)</span>
            </span>
            <span class="text-xs font-mono font-bold text-sky-700">${totalWaterM3.toLocaleString()} m³</span>
          </div>
          <p class="text-[11px] text-slate-600 leading-relaxed">${crop.waterNotes}</p>
        </div>

        <!-- Soil & Nutrition -->
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <i data-lucide="flask-conical" class="w-3.5 h-3.5 text-emerald-600"></i>
              <span>Optimal Soil & Nutrition</span>
            </span>
            <span class="text-xs font-mono font-bold text-emerald-700">pH ${crop.optimalPH}</span>
          </div>
          <p class="text-[11px] text-slate-600 leading-relaxed">${crop.soilNotes}</p>
        </div>

      </div>

      <!-- Recommended Calculators for this Plan -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Direct Tool Links for this Crop</h4>
        <div class="flex flex-wrap gap-2">
          ${crop.relatedCalculators.map(slug => `
            <a href="#/tools/${slug}" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1">
              <i data-lucide="calculator" class="w-3 h-3 text-emerald-600"></i>
              <span>${slug.replace(/-/g, ' ').replace(/^./, s => s.toUpperCase())}</span>
            </a>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}
