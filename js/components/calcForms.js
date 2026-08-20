/**
 * Dynamic Form Field Generators for All 30 Agricultural Calculators
 */

export function renderDynamicFormFields(calc) {
  const d = calc.defaultInputs || {};

  switch (calc.slug) {
    // 1. Seed Rate
    case 'seed-rate-calculator':
      return `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Field Area</label>
            <input type="number" id="input-area" value="${d.area}" min="0.01" step="any" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Area Unit</label>
            <select id="input-areaUnit" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
              <option value="ha" selected>Hectare (ha)</option>
              <option value="acre">Acre</option>
              <option value="sq_m">Square Meter (m²)</option>
              <option value="kanal">Kanal (5,445 sq ft)</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Recommended Seed Rate</label>
            <input type="number" id="input-recommendedRate" value="${d.recommendedRate}" min="0.1" step="any" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Rate Unit Basis</label>
            <select id="input-rateUnit" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
              <option value="kg_ha" selected>kg / Hectare</option>
              <option value="kg_acre">kg / Acre</option>
              <option value="lb_acre">lb / Acre</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Germination Rate (%)</label>
            <input type="number" id="input-germinationPct" value="${d.germinationPct}" min="1" max="100" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Physical Purity (%)</label>
            <input type="number" id="input-purityPct" value="${d.purityPct}" min="1" max="100" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
        </div>
      `;

    // 2. Seeding Density
    case 'seeding-density-calculator':
      return `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Seed Quantity</label>
            <input type="number" id="input-seedQuantity" value="${d.seedQuantity}" min="0.1" step="any" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Weight Unit</label>
            <select id="input-seedWeightUnit" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
              <option value="kg" selected>Kilograms (kg)</option>
              <option value="lb">Pounds (lb)</option>
              <option value="tonne">Metric Tonne</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Field Area</label>
            <input type="number" id="input-area" value="${d.area}" min="0.01" step="any" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Area Unit</label>
            <select id="input-areaUnit" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
              <option value="ha" selected>Hectare (ha)</option>
              <option value="acre">Acre</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Thousand Kernel Weight - TKW (grams / 1,000 seeds)</label>
          <input type="number" id="input-thousandKernelWeight" value="${d.thousandKernelWeight}" min="0.1" step="any" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
        </div>
      `;

    // 3. Plant Population
    case 'plant-population-calculator':
      return `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Field Area</label>
            <input type="number" id="input-area" value="${d.area}" min="0.01" step="any" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Area Unit</label>
            <select id="input-areaUnit" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
              <option value="ha" selected>Hectare (ha)</option>
              <option value="acre">Acre</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Row Spacing (Width)</label>
            <input type="number" id="input-rowSpacing" value="${d.rowSpacing}" min="1" step="any" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Row Unit</label>
            <select id="input-rowSpacingUnit" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
              <option value="cm" selected>Centimeters (cm)</option>
              <option value="in">Inches</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">In-Row Plant Spacing</label>
            <input type="number" id="input-plantSpacing" value="${d.plantSpacing}" min="0.1" step="any" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Plant Unit</label>
            <select id="input-plantSpacingUnit" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
              <option value="cm" selected>Centimeters (cm)</option>
              <option value="in">Inches</option>
            </select>
          </div>
        </div>
      `;

    // 18. ETo Penman-Monteith
    case 'eto-calculator':
      return `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Mean Daily Air Temp T (°C)</label>
            <input type="number" id="input-meanTempC" value="${d.meanTempC}" step="0.1" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Relative Humidity RH (%)</label>
            <input type="number" id="input-relHumidityPct" value="${d.relHumidityPct}" min="5" max="100" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Wind Speed at 2m u₂ (m/s)</label>
            <input type="number" id="input-windSpeed2m" value="${d.windSpeed2m}" min="0.1" step="0.1" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Solar Radiation Rs (MJ/m²/day)</label>
            <input type="number" id="input-solarRadiation" value="${d.solarRadiation}" min="1" step="0.1" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Elevation Above Sea Level z (m)</label>
            <input type="number" id="input-elevationM" value="${d.elevationM}" min="0" step="10" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Reference Albedo (α)</label>
            <input type="number" id="input-albedo" value="0.23" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-slate-50 text-slate-500" readonly />
          </div>
        </div>
      `;

    // Generic Fallback
    default:
      return Object.keys(d).map(key => {
        const val = d[key];
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        if (typeof val === 'boolean') {
          return `
            <div class="flex items-center gap-2 pt-2">
              <input type="checkbox" id="input-${key}" ${val ? 'checked' : ''} class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
              <label for="input-${key}" class="text-xs font-semibold text-slate-700">${label}</label>
            </div>
          `;
        }
        if (key.toLowerCase().includes('unit')) {
          return `
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">${label}</label>
              <select id="input-${key}" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                <option value="ha" ${val==='ha'?'selected':''}>Hectare (ha)</option>
                <option value="acre" ${val==='acre'?'selected':''}>Acre</option>
                <option value="kg" ${val==='kg'?'selected':''}>Kilogram (kg)</option>
                <option value="tonne" ${val==='tonne'?'selected':''}>Metric Tonne</option>
                <option value="mm" ${val==='mm'?'selected':''}>Millimeters (mm)</option>
                <option value="cum_h" ${val==='cum_h'?'selected':''}>m³/hour</option>
                <option value="tonnes_ha" ${val==='tonnes_ha'?'selected':''}>Tonnes / ha</option>
                <option value="kg_ha" ${val==='kg_ha'?'selected':''}>kg / ha</option>
              </select>
            </div>
          `;
        }
        return `
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">${label}</label>
            <input type="${typeof val === 'number' ? 'number' : 'text'}" id="input-${key}" value="${val}" step="any" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
        `;
      }).join('');
  }
}
