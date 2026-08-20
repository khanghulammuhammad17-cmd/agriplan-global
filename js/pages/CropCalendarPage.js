import { CROPS_CALENDAR, MONTHS, CLIMATE_ZONES } from '../data/calendarsData.js';

export function renderCropCalendarPage() {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <!-- Page Header -->
      <div class="max-w-3xl mb-8">
        <nav class="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
          <a href="#/" class="hover:text-emerald-700">Home</a>
          <span>/</span>
          <span class="text-emerald-900 font-semibold">Seasonal Crop Calendar</span>
        </nav>
        
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
          Seasonal Crop Calendar
        </h1>
        <p class="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Comprehensive month-by-month agricultural planting, vegetative canopy development, and harvest windows for field crops across global agroclimatic zones.
        </p>
      </div>

      <!-- Filters & Legend Bar -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8 space-y-4">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <!-- Climate Zone Filter -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Agroclimatic Zone</label>
            <select id="calendar-zone-filter" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
              ${CLIMATE_ZONES.map(z => `<option value="${z.id}">${z.label}</option>`).join('')}
            </select>
          </div>

          <!-- Category Filter -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Crop Category</label>
            <select id="calendar-cat-filter" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
              <option value="all">All Categories</option>
              <option value="Cereals">Cereals (Wheat, Maize, Rice)</option>
              <option value="Pulses">Pulses (Soybean, Chickpea)</option>
              <option value="Oilseeds">Oilseeds (Canola, Sunflower)</option>
              <option value="Other crops">Fiber & Cash Crops (Cotton)</option>
            </select>
          </div>

          <!-- Month Filter -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Highlight Specific Month</label>
            <select id="calendar-month-filter" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
              <option value="all">All 12 Months</option>
              ${MONTHS.map((m, idx) => `<option value="${idx}">${m}</option>`).join('')}
            </select>
          </div>

          <!-- Crop Search -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Search Crop</label>
            <input type="text" id="calendar-search-input" placeholder="e.g. Wheat, Rice..." class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
        </div>

        <!-- Legend -->
        <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-600"></span> <strong>P</strong> - Planting / Sowing</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-200 border border-emerald-400"></span> <strong>G</strong> - Growing / Vegetative</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-500"></span> <strong>H</strong> - Harvest Period</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-slate-100 border border-slate-200"></span> <strong>-</strong> - Off-Season / Dormant</span>
          </div>
          <span class="text-[11px] text-slate-400">Regional growing seasons vary with altitude and rainfall onset.</span>
        </div>

      </div>

      <!-- Calendar Table -->
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse" id="crops-calendar-table">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                <th class="p-4 w-60">Crop & Climate</th>
                ${MONTHS.map(m => `<th class="p-2 text-center w-14 sm:w-16">${m}</th>`).join('')}
                <th class="p-4 min-w-[220px]">Agronomic Guidance</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs text-slate-700" id="crops-calendar-tbody">
              ${CROPS_CALENDAR.map(item => `
                <tr class="hover:bg-slate-50/80 transition-colors calendar-row" data-zone="${item.zone}" data-category="${item.category}" data-name="${item.name.toLowerCase()}">
                  <td class="p-4 font-semibold text-slate-900">
                    <div class="text-sm font-bold text-slate-900">${item.name}</div>
                    <span class="text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">${item.zoneLabel}</span>
                  </td>
                  ${item.schedule.map((st, mIdx) => renderTimelineCell(st, mIdx)).join('')}
                  <td class="p-4 text-slate-500 text-[11px] leading-relaxed">
                    ${item.notes}
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

function renderTimelineCell(status, monthIndex) {
  if (status === 'P') {
    return `<td class="p-2 text-center month-cell" data-month="${monthIndex}"><span class="inline-block w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs leading-8 shadow-2xs" title="Planting / Sowing">P</span></td>`;
  }
  if (status === 'G') {
    return `<td class="p-2 text-center month-cell" data-month="${monthIndex}"><span class="inline-block w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 font-semibold text-xs leading-8 border border-emerald-300" title="Growing / Canopy Development">G</span></td>`;
  }
  if (status === 'H') {
    return `<td class="p-2 text-center month-cell" data-month="${monthIndex}"><span class="inline-block w-8 h-8 rounded-lg bg-amber-500 text-white font-bold text-xs leading-8 shadow-2xs" title="Harvesting">H</span></td>`;
  }
  return `<td class="p-2 text-center month-cell text-slate-300" data-month="${monthIndex}"><span class="inline-block w-8 h-8 rounded-lg bg-slate-50 text-slate-300 text-xs leading-8">-</span></td>`;
}
