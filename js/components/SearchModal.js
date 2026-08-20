import { CALCULATORS_DATA } from '../data/calculatorsData.js';
import { CROPS_DATA } from '../data/cropsData.js';
import { FRUITS_CALENDAR, VEGETABLES_CALENDAR } from '../data/calendarsData.js';
import { GUIDES_DATA } from '../data/guidesData.js';

export function renderSearchModal() {
  return `
    <div id="search-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 opacity-0 pointer-events-none transition-opacity duration-200" role="dialog" aria-modal="true" aria-label="Global Site Search">
      <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col max-h-[80vh] transform scale-95 transition-transform duration-200" id="search-modal-box">
        
        <!-- Search Input Bar -->
        <div class="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <i data-lucide="search" class="w-5 h-5 text-emerald-700"></i>
          <input 
            type="text" 
            id="global-search-input" 
            placeholder="Search all 30 calculators, crops, fruits, vegetables, guides... (e.g. 'tomato', 'seed rate', 'ETo')" 
            class="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base focus:outline-none"
            autocomplete="off"
          />
          <button id="search-modal-close-btn" class="text-xs font-semibold px-2 py-1 bg-slate-200 hover:bg-slate-300 rounded text-slate-600">
            ESC
          </button>
        </div>

        <!-- Search Results Container -->
        <div id="search-results" class="p-4 overflow-y-auto divide-y divide-slate-100 text-sm">
          <div class="py-8 text-center text-slate-400">
            <i data-lucide="sprout" class="w-8 h-8 mx-auto mb-2 text-emerald-400 opacity-60"></i>
            <p class="font-medium text-slate-600">Search 30 calculators, crop calendars, and agronomy guides</p>
            <p class="text-xs text-slate-400 mt-1">Try typing "nitrogen", "drip irrigation", "maize", or "apple"</p>
          </div>
        </div>

        <!-- Search Footer Shortcuts -->
        <div class="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span>Quick filters:</span>
            <button class="search-tag px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium hover:bg-emerald-200" data-term="seed">Seed</button>
            <button class="search-tag px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium hover:bg-emerald-200" data-term="fertilizer">Fertilizer</button>
            <button class="search-tag px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium hover:bg-emerald-200" data-term="water">Water</button>
            <button class="search-tag px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium hover:bg-emerald-200" data-term="tomato">Tomato</button>
          </div>
          <span>AgriPlan Global Search</span>
        </div>

      </div>
    </div>
  `;
}

export function performGlobalSearch(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) {
    return `
      <div class="py-8 text-center text-slate-400">
        <i data-lucide="sprout" class="w-8 h-8 mx-auto mb-2 text-emerald-400 opacity-60"></i>
        <p class="font-medium text-slate-600">Search 30 calculators, crop calendars, and agronomy guides</p>
        <p class="text-xs text-slate-400 mt-1">Try typing "nitrogen", "drip irrigation", "maize", or "apple"</p>
      </div>
    `;
  }

  // 1. Match Calculators
  const matchedCalcs = CALCULATORS_DATA.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.shortDesc.toLowerCase().includes(q) || 
    c.categoryLabel.toLowerCase().includes(q) ||
    c.slug.includes(q)
  );

  // 2. Match Crops
  const matchedCrops = CROPS_DATA.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.scientificName.toLowerCase().includes(q) || 
    c.overview.toLowerCase().includes(q)
  );

  // 3. Match Fruit / Veg Calendars
  const matchedFruits = FRUITS_CALENDAR.filter(f => f.name.toLowerCase().includes(q) || f.scientific.toLowerCase().includes(q));
  const matchedVegs = VEGETABLES_CALENDAR.filter(v => v.name.toLowerCase().includes(q) || v.scientific.toLowerCase().includes(q));

  // 4. Match Guides
  const matchedGuides = GUIDES_DATA.filter(g => 
    g.title.toLowerCase().includes(q) || 
    g.category.toLowerCase().includes(q) || 
    g.excerpt.toLowerCase().includes(q)
  );

  const totalResults = matchedCalcs.length + matchedCrops.length + matchedFruits.length + matchedVegs.length + matchedGuides.length;

  if (totalResults === 0) {
    return `
      <div class="py-8 text-center text-slate-500">
        <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
        <p class="font-medium">No results found for "${escapeHtml(query)}"</p>
        <p class="text-xs text-slate-400 mt-1">Check spelling or search general terms like "seed", "fertilizer", "water", or "calendar".</p>
      </div>
    `;
  }

  let html = `<div class="space-y-4">`;

  // Calculators section
  if (matchedCalcs.length > 0) {
    html += `
      <div>
        <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-800 px-2 py-1 bg-emerald-50 rounded mb-2">
          Agricultural Calculators (${matchedCalcs.length})
        </div>
        <div class="space-y-1">
          ${matchedCalcs.map(c => `
            <a href="#/tools/${c.slug}" class="search-result-item flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group">
              <div class="p-2 rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <i data-lucide="${c.icon || 'calculator'}" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="font-semibold text-slate-900 group-hover:text-emerald-800 flex items-center gap-2">
                  <span>${c.name}</span>
                  <span class="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-normal">${c.categoryLabel}</span>
                </div>
                <p class="text-xs text-slate-500 line-clamp-1 mt-0.5">${c.shortDesc}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Crops & Fruits & Vegs
  if (matchedCrops.length > 0 || matchedFruits.length > 0 || matchedVegs.length > 0) {
    html += `
      <div>
        <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-800 px-2 py-1 bg-emerald-50 rounded mb-2">
          Crops & Seasonal Calendars (${matchedCrops.length + matchedFruits.length + matchedVegs.length})
        </div>
        <div class="space-y-1">
          ${matchedCrops.map(c => `
            <a href="#/crops/${c.id}" class="search-result-item flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                  ${c.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div class="font-semibold text-slate-900 group-hover:text-emerald-800">${c.name} <span class="italic font-normal text-xs text-slate-400">(${c.scientificName})</span></div>
                  <span class="text-xs text-slate-500">Agronomic profile & calculators</span>
                </div>
              </div>
              <span class="text-xs text-emerald-700 font-medium">View Crop &rarr;</span>
            </a>
          `).join('')}
          ${matchedFruits.map(f => `
            <a href="#/fruit-calendar" class="search-result-item flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group">
              <div class="flex items-center gap-3">
                <i data-lucide="apple" class="w-4 h-4 text-rose-600"></i>
                <div>
                  <span class="font-semibold text-slate-900">${f.name}</span>
                  <span class="text-xs text-slate-400 italic">(${f.scientific})</span>
                </div>
              </div>
              <span class="text-xs text-slate-500">Fruit Calendar &rarr;</span>
            </a>
          `).join('')}
          ${matchedVegs.map(v => `
            <a href="#/vegetable-calendar" class="search-result-item flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group">
              <div class="flex items-center gap-3">
                <i data-lucide="carrot" class="w-4 h-4 text-orange-600"></i>
                <div>
                  <span class="font-semibold text-slate-900">${v.name}</span>
                  <span class="text-xs text-slate-400 italic">(${v.scientific})</span>
                </div>
              </div>
              <span class="text-xs text-slate-500">Vegetable Calendar &rarr;</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Farming Guides
  if (matchedGuides.length > 0) {
    html += `
      <div>
        <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-800 px-2 py-1 bg-emerald-50 rounded mb-2">
          Farming Guides (${matchedGuides.length})
        </div>
        <div class="space-y-1">
          ${matchedGuides.map(g => `
            <a href="#/guides/${g.id}" class="search-result-item flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group">
              <div class="p-2 rounded-lg bg-blue-100 text-blue-800">
                <i data-lucide="book-open" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="font-semibold text-slate-900 group-hover:text-emerald-800">${g.title}</div>
                <p class="text-xs text-slate-500 line-clamp-1">${g.excerpt}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

function escapeHtml(str) {
  return (str || '').replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}
