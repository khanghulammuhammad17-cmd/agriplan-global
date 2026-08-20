import { FRUITS_CALENDAR, MONTHS, CLIMATE_ZONES } from '../data/calendarsData.js';

export function renderFruitCalendarPage() {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <!-- Page Header -->
      <div class="max-w-3xl mb-8">
        <nav class="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
          <a href="#/" class="hover:text-emerald-700">Home</a>
          <span>/</span>
          <span class="text-emerald-900 font-semibold">Fruit Calendar</span>
        </nav>
        
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
          Seasonal Fruit Growing & Harvest Calendar
        </h1>
        <p class="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Comprehensive orchard and horticultural calendar covering 15 major fruit species: Apple, Banana, Mango, Orange, Lemon, Guava, Peach, Pear, Plum, Apricot, Grapes, Pomegranate, Strawberry, Watermelon, and Melons.
        </p>
      </div>

      <!-- Controls & Legend -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Climate Zone</label>
            <select id="fruit-zone-filter" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
              ${CLIMATE_ZONES.map(z => `<option value="${z.id}">${z.label}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Highlight Harvest Month</label>
            <select id="fruit-month-filter" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
              <option value="all">All Months</option>
              ${MONTHS.map((m, idx) => `<option value="${idx}">${m}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Search Fruit Species</label>
            <input type="text" id="fruit-search-input" placeholder="e.g. Mango, Apple, Orange..." class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-600"></span> <strong>P</strong> - Bare-root / Sapling Planting</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-200 border border-emerald-400"></span> <strong>G</strong> - Bloom & Fruit Sizing</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-500"></span> <strong>H</strong> - Peak Picking & Harvest</span>
          </div>
          <span class="text-[11px] text-slate-400">Pruning and thinning periods specified in notes.</span>
        </div>
      </div>

      <!-- Fruit Table -->
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse" id="fruit-calendar-table">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                <th class="p-4 w-60">Fruit Species & Category</th>
                ${MONTHS.map(m => `<th class="p-2 text-center w-14 sm:w-16">${m}</th>`).join('')}
                <th class="p-4 min-w-[220px]">Orchard Management Notes</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs text-slate-700" id="fruit-calendar-tbody">
              ${FRUITS_CALENDAR.map(f => `
                <tr class="hover:bg-slate-50/80 transition-colors fruit-row" data-zone="${f.zone}" data-name="${f.name.toLowerCase()}">
                  <td class="p-4 font-semibold text-slate-900">
                    <div class="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <i data-lucide="apple" class="w-4 h-4 text-rose-600"></i>
                      <span>${f.name}</span>
                    </div>
                    <div class="text-xs text-slate-400 italic font-normal">${f.scientific}</div>
                    <span class="text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">${f.category}</span>
                  </td>
                  ${f.schedule.map((st, mIdx) => renderFruitTimelineCell(st, mIdx)).join('')}
                  <td class="p-4 text-slate-500 text-[11px] leading-relaxed">
                    ${f.notes}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

function renderFruitTimelineCell(status, monthIndex) {
  if (status === 'P') {
    return `<td class="p-2 text-center fruit-month-cell" data-month="${monthIndex}"><span class="inline-block w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs leading-8 shadow-2xs" title="Planting / Pruning">P</span></td>`;
  }
  if (status === 'G') {
    return `<td class="p-2 text-center fruit-month-cell" data-month="${monthIndex}"><span class="inline-block w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 font-semibold text-xs leading-8 border border-emerald-300" title="Bloom / Fruit Sizing">G</span></td>`;
  }
  if (status === 'H') {
    return `<td class="p-2 text-center fruit-month-cell" data-month="${monthIndex}"><span class="inline-block w-8 h-8 rounded-lg bg-amber-500 text-white font-bold text-xs leading-8 shadow-2xs" title="Harvest Picking">H</span></td>`;
  }
  return `<td class="p-2 text-center fruit-month-cell text-slate-300" data-month="${monthIndex}"><span class="inline-block w-8 h-8 rounded-lg bg-slate-50 text-slate-300 text-xs leading-8">-</span></td>`;
}
