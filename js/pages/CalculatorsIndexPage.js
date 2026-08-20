import { CALCULATORS_DATA, CALCULATOR_CATEGORIES } from '../data/calculatorsData.js';

export function renderCalculatorsIndexPage() {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <!-- Page Header -->
      <div class="max-w-3xl mb-8">
        <nav class="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
          <a href="#/" class="hover:text-emerald-700">Home</a>
          <span>/</span>
          <span class="text-emerald-900 font-semibold">Farm Calculators</span>
        </nav>
        
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
          Agricultural Calculators Directory
        </h1>
        <p class="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Access all 30 verified agricultural calculators. Built strictly on FAO-56 Penman-Monteith, USDA-NRCS, and university extension methodologies with transparent formulas and step-by-step breakdowns.
        </p>
      </div>

      <!-- Controls: Category Tabs & Search Filter -->
      <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
        
        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center gap-2" id="calc-index-filter-tabs">
          ${CALCULATOR_CATEGORIES.map((cat, idx) => `
            <button class="calc-tab-btn ${idx === 0 ? 'active bg-emerald-800 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5" data-cat="${cat.id}">
              <i data-lucide="${cat.icon || 'folder'}" class="w-3.5 h-3.5"></i>
              <span>${cat.label}</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded-full ${idx === 0 ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-200 text-slate-700'}">${cat.count}</span>
            </button>
          `).join('')}
        </div>

        <!-- In-page Filter Input -->
        <div class="relative w-full md:w-72">
          <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
          <input 
            type="text" 
            id="calc-filter-input" 
            placeholder="Filter 30 calculators..." 
            class="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          />
        </div>

      </div>

      <!-- Calculators Grid (All 30 Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="calc-index-grid">
        ${CALCULATORS_DATA.map(calc => `
          <a href="#/tools/${calc.slug}" class="calc-index-card p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between group" data-category="${calc.category}">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors shadow-2xs">
                  <i data-lucide="${calc.icon || 'calculator'}" class="w-6 h-6"></i>
                </div>
                <span class="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-900 transition-colors">
                  ${calc.categoryLabel}
                </span>
              </div>
              <h2 class="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition-colors">${calc.name}</h2>
              <p class="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">${calc.shortDesc}</p>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold group-hover:text-emerald-900">
              <span class="flex items-center gap-1">
                <span>Launch Tool</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
              </span>
              <span class="text-[10px] font-mono text-slate-400">#0${calc.id}</span>
            </div>
          </a>
        `).join('')}
      </div>

    </div>
  `;
}
