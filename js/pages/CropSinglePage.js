import { getCropById } from '../data/cropsData.js';
import { getCalculatorBySlug } from '../data/calculatorsData.js';

export function renderCropSinglePage(cropId) {
  const crop = getCropById(cropId);
  if (!crop) {
    return `
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 class="text-2xl font-bold text-slate-800">Crop Profile Not Found</h1>
        <p class="text-slate-600 mt-2">The requested crop profile could not be found.</p>
        <a href="#/crop-calendar" class="inline-block mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl">View Crop Calendar</a>
      </div>
    `;
  }

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="#/" class="hover:text-emerald-700">Home</a>
        <span>/</span>
        <a href="#/crop-calendar" class="hover:text-emerald-700">Crops</a>
        <span>/</span>
        <span class="text-emerald-900 font-semibold">${crop.name}</span>
      </nav>

      <!-- Hero Banner with High Quality Image -->
      <div class="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 mb-10 group">
        <div class="aspect-21/9 sm:aspect-16/6 w-full relative">
          <img src="${crop.image}" alt="${crop.imageAlt}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="eager" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
        </div>

        <div class="absolute bottom-6 left-6 right-6 text-white">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
            ${crop.category}
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold font-serif mt-2">${crop.name}</h1>
          <p class="text-sm sm:text-base text-slate-300 italic">${crop.scientificName} &bull; Typical Duration: ~${crop.growingDays} Days</p>
        </div>
      </div>

      <!-- Quick Agronomic Facts Strip -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span class="text-[11px] text-slate-500 block font-medium">Optimal Temperature</span>
          <span class="font-bold text-slate-900 text-sm font-mono mt-0.5 block">${crop.optimalTemp}</span>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span class="text-[11px] text-slate-500 block font-medium">Soil pH Range</span>
          <span class="font-bold text-emerald-700 text-sm font-mono mt-0.5 block">${crop.optimalPH}</span>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span class="text-[11px] text-slate-500 block font-medium">Standard Seed Rate</span>
          <span class="font-bold text-slate-900 text-sm font-mono mt-0.5 block">${crop.seedRateKgHa}</span>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span class="text-[11px] text-slate-500 block font-medium">Typical Yield Potential</span>
          <span class="font-bold text-slate-900 text-sm font-mono mt-0.5 block">${crop.typicalYieldHa}</span>
        </div>
      </div>

      <!-- In-Depth Agronomic Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        <!-- Left 2 Cols: Management Protocols -->
        <div class="lg:col-span-2 space-y-8">
          
          <div>
            <h2 class="text-lg font-bold text-slate-900 mb-2 font-serif">Crop Overview</h2>
            <p class="text-sm text-slate-700 leading-relaxed">${crop.overview}</p>
          </div>

          <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 class="text-base font-bold text-emerald-950 flex items-center gap-2">
              <i data-lucide="sprout" class="w-5 h-5 text-emerald-700"></i>
              <span>Planting & Seedbed Management</span>
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${crop.plantingManagement}</p>
            <div class="pt-2 text-xs text-slate-500">
              <strong>Planting Window:</strong> ${crop.plantingPeriod}
            </div>
          </div>

          <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 class="text-base font-bold text-emerald-950 flex items-center gap-2">
              <i data-lucide="flask-conical" class="w-5 h-5 text-emerald-700"></i>
              <span>Fertilizer & Soil Nutrient Management</span>
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${crop.fertilizerManagement}</p>
            <div class="pt-2 text-xs text-slate-500">
              <strong>Soil Requirements:</strong> ${crop.soilNotes}
            </div>
          </div>

          <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 class="text-base font-bold text-emerald-950 flex items-center gap-2">
              <i data-lucide="droplet" class="w-5 h-5 text-sky-600"></i>
              <span>Irrigation Strategy & FAO Crop Coefficients (Kc)</span>
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${crop.irrigationStrategy}</p>
            
            <div class="grid grid-cols-3 gap-2 pt-3 text-center text-xs font-mono">
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span class="text-[10px] text-slate-400 block font-sans">Initial Kc</span>
                <span class="font-bold text-slate-800">${crop.kcStages.initial}</span>
              </div>
              <div class="p-2.5 rounded-xl bg-sky-50 border border-sky-200">
                <span class="text-[10px] text-sky-800 block font-sans">Mid-Season Kc</span>
                <span class="font-bold text-sky-900">${crop.kcStages.mid}</span>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span class="text-[10px] text-slate-400 block font-sans">Late / Harvest Kc</span>
                <span class="font-bold text-slate-800">${crop.kcStages.late}</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Right 1 Col: Linked Planning Calculators & Sources -->
        <div class="space-y-6">
          
          <div class="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg border border-emerald-800">
            <h3 class="text-base font-bold text-emerald-300 font-serif mb-4 flex items-center gap-2">
              <i data-lucide="calculator" class="w-4 h-4"></i>
              <span>Direct Calculators for ${crop.name}</span>
            </h3>
            <div class="space-y-2">
              ${crop.relatedCalculators.map(slug => {
                const c = getCalculatorBySlug(slug);
                if (!c) return '';
                return `
                  <a href="#/tools/${c.slug}" class="block p-3 rounded-2xl bg-emerald-950/80 hover:bg-emerald-800/80 border border-emerald-800 transition-colors text-xs">
                    <div class="font-bold text-white">${c.name}</div>
                    <span class="text-[10px] text-emerald-300">${c.categoryLabel} &rarr;</span>
                  </a>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Sources Box -->
          <div class="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-xs">
            <h4 class="font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">Authoritative References</h4>
            <ul class="space-y-1.5 text-slate-600">
              ${crop.sources.map(s => `<li>&bull; ${s}</li>`).join('')}
            </ul>
            <div class="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-400">
              Last scientific audit: ${crop.lastReviewed}
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}
