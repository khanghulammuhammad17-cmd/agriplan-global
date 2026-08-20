/**
 * Precision Agriculture Demonstration Visualizer
 * Interactive digital agriculture field mapping tool demonstrating multispectral NDVI,
 * soil moisture zones, and variable rate management.
 */

export function renderPrecisionAgVisualizer() {
  return `
    <div class="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-emerald-900/50 shadow-2xl overflow-hidden relative" id="precision-ag-container">
      
      <!-- Background Ambient Grid -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#064e3b15_1px,transparent_1px),linear-gradient(to_bottom,#064e3b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div class="relative z-10">
        
        <!-- Header & Demonstration Disclaimer Badge -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                DIGITAL AGRI-TECH
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800">
                INTERACTIVE DEMONSTRATION
              </span>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-white font-serif">Precision Field & Zone Visualizer</h3>
            <p class="text-xs text-slate-400 mt-1">
              Interactive demonstration of multispectral NDVI canopy health, soil moisture monitoring, and variable-rate management zones.
            </p>
          </div>

          <!-- Layer Selector Controls -->
          <div class="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs" role="tablist" aria-label="Map Layer Selector">
            <button class="layer-tab active px-3 py-1.5 rounded-xl font-medium transition-all bg-emerald-700 text-white shadow-sm" data-layer="ndvi">
              NDVI Vegetation
            </button>
            <button class="layer-tab px-3 py-1.5 rounded-xl font-medium text-slate-400 hover:text-white transition-all" data-layer="moisture">
              Soil Moisture
            </button>
            <button class="layer-tab px-3 py-1.5 rounded-xl font-medium text-slate-400 hover:text-white transition-all" data-layer="vrt">
              VRT Fertilizer
            </button>
            <button class="layer-tab px-3 py-1.5 rounded-xl font-medium text-slate-400 hover:text-white transition-all" data-layer="elevation">
              Topography
            </button>
          </div>
        </div>

        <!-- Main Interactive Visualizer Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          <!-- Left 2 Cols: Interactive Canvas/SVG Field Map -->
          <div class="lg:col-span-2 bg-slate-950/90 rounded-2xl border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
            
            <!-- Map Top Overlay: Coordinates & Mode -->
            <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2 z-10">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Field ID: #AG-702 (Green Valley Enterprise)
              </span>
              <span>Layer: <strong id="active-layer-name" class="text-emerald-300">NDVI Canopy Index</strong></span>
            </div>

            <!-- SVG Interactive Field Map with 4 Distinct Clickable Zones -->
            <div class="relative w-full aspect-16/9 flex items-center justify-center my-auto">
              <svg viewBox="0 0 800 450" class="w-full h-full rounded-xl transition-all duration-300" id="precision-field-svg">
                <!-- Defs for gradients & patterns -->
                <defs>
                  <linearGradient id="ndviHigh" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#10b981" stop-opacity="0.85"/>
                    <stop offset="100%" stop-color="#059669" stop-opacity="0.95"/>
                  </linearGradient>
                  <linearGradient id="ndviMedium" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#84cc16" stop-opacity="0.85"/>
                    <stop offset="100%" stop-color="#65a30d" stop-opacity="0.95"/>
                  </linearGradient>
                  <linearGradient id="ndviLow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#eab308" stop-opacity="0.85"/>
                    <stop offset="100%" stop-color="#ca8a04" stop-opacity="0.95"/>
                  </linearGradient>
                  <linearGradient id="waterZone" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0284c7" stop-opacity="0.85"/>
                    <stop offset="100%" stop-color="#0369a1" stop-opacity="0.95"/>
                  </linearGradient>
                </defs>

                <!-- Field Base Contour -->
                <rect width="800" height="450" fill="#0f172a" rx="12"/>

                <!-- Management Zone A: Pivot North (High Vigor) -->
                <path id="zone-a" class="field-zone cursor-pointer transition-all duration-200 hover:opacity-100 opacity-90 stroke-emerald-300 stroke-[1.5]"
                  d="M 50 50 L 450 40 L 400 220 L 60 200 Z"
                  fill="url(#ndviHigh)"
                  data-zone="Zone A (North Pivot)"
                  data-crop="Winter Wheat (Mid-Season)"
                  data-area="32.5 Hectares"
                  data-ndvi="0.78 (Optimal Vigor)"
                  data-moisture="74% Field Capacity"
                  data-fert="Standard N Maintenance (60 kg N/ha)"
                  data-status="Excellent vegetative biomass canopy intercept."
                />

                <!-- Management Zone B: East Terrace (Moderate) -->
                <path id="zone-b" class="field-zone cursor-pointer transition-all duration-200 hover:opacity-100 opacity-90 stroke-lime-300 stroke-[1.5]"
                  d="M 465 42 L 750 60 L 730 230 L 415 220 Z"
                  fill="url(#ndviMedium)"
                  data-zone="Zone B (East Terraces)"
                  data-crop="Winter Wheat (Early Tillering)"
                  data-area="24.0 Hectares"
                  data-ndvi="0.62 (Moderate Growth)"
                  data-moisture="61% Field Capacity"
                  data-fert="Boosted N Sidedress (+25 kg N/ha)"
                  data-status="Slight nitrogen variance detected on ridge."
                />

                <!-- Management Zone C: South Alluvial Loam -->
                <path id="zone-c" class="field-zone cursor-pointer transition-all duration-200 hover:opacity-100 opacity-90 stroke-emerald-300 stroke-[1.5]"
                  d="M 70 215 L 390 235 L 350 410 L 80 395 Z"
                  fill="url(#ndviHigh)"
                  data-zone="Zone C (South Alluvial Basin)"
                  data-crop="Canola (Flowering)"
                  data-area="28.4 Hectares"
                  data-ndvi="0.81 (Peak Vigor)"
                  data-moisture="82% Field Capacity"
                  data-fert="Adequate (Zero Sidedress Required)"
                  data-status="High soil organic matter; maximum yield potential."
                />

                <!-- Management Zone D: West Sandy Knolls (Stressed/Low) -->
                <path id="zone-d" class="field-zone cursor-pointer transition-all duration-200 hover:opacity-100 opacity-90 stroke-amber-300 stroke-[1.5]"
                  d="M 405 235 L 720 245 L 700 405 L 365 410 Z"
                  fill="url(#ndviLow)"
                  data-zone="Zone D (West Sandy Ridge)"
                  data-crop="Winter Wheat (Water Stressed)"
                  data-area="18.1 Hectares"
                  data-ndvi="0.44 (Moisture Deficit)"
                  data-moisture="42% (Below Allowable Depletion)"
                  data-fert="Variable Rate Potassium + Irrigation"
                  data-status="Coarse sandy texture; trigger 25mm irrigation cycle."
                />

                <!-- Field Grid & Tractor Guidance Lines -->
                <g stroke="#ffffff" stroke-opacity="0.15" stroke-dasharray="4 6" stroke-width="1">
                  <line x1="60" y1="125" x2="440" y2="120" />
                  <line x1="70" y1="305" x2="380" y2="315" />
                  <line x1="475" y1="140" x2="720" y2="150" />
                  <line x1="410" y1="320" x2="690" y2="330" />
                </g>

                <!-- Zone Labels -->
                <text x="220" y="130" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Zone A (32.5 ha)</text>
                <text x="580" y="145" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Zone B (24.0 ha)</text>
                <text x="210" y="325" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Zone C (28.4 ha)</text>
                <text x="540" y="335" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Zone D (18.1 ha)</text>
              </svg>
            </div>

            <!-- Legend & Interactive Instructions -->
            <div class="mt-3 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-500"></span> High (0.75 - 0.90)</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-lime-500"></span> Medium (0.55 - 0.74)</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-500"></span> Low / Deficit (&lt;0.54)</span>
              </div>
              <span class="text-emerald-400 font-medium animate-pulse">Click any field zone to inspect telemetry &rarr;</span>
            </div>

          </div>

          <!-- Right 1 Col: Dynamic Zone Telemetry Card -->
          <div class="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between" id="zone-telemetry-card">
            
            <div>
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Zone Diagnostics</span>
                <span class="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded" id="telemetry-zone-id">Zone A (North Pivot)</span>
              </div>

              <!-- Selected Zone Attributes -->
              <div class="mt-4 space-y-3 text-xs">
                <div>
                  <span class="text-slate-400 block">Crop & Growth Stage</span>
                  <span class="text-sm font-semibold text-white" id="telemetry-crop">Winter Wheat (Mid-Season)</span>
                </div>

                <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900">
                  <div>
                    <span class="text-slate-400 block">Management Area</span>
                    <span class="font-semibold text-slate-200" id="telemetry-area">32.5 Hectares</span>
                  </div>
                  <div>
                    <span class="text-slate-400 block">Spectral Index</span>
                    <span class="font-semibold text-emerald-400 font-mono" id="telemetry-ndvi">0.78 (Optimal)</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900">
                  <div>
                    <span class="text-slate-400 block">Soil Moisture</span>
                    <span class="font-semibold text-sky-400" id="telemetry-moisture">74% Field Capacity</span>
                  </div>
                  <div>
                    <span class="text-slate-400 block">Prescription</span>
                    <span class="font-semibold text-amber-300" id="telemetry-fert">Standard Sidedress</span>
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 mt-3" id="telemetry-status">
                  Excellent vegetative biomass canopy intercept. Canopy photosynthesis running at peak capacity.
                </div>
              </div>
            </div>

            <!-- Quick Action to Calculators -->
            <div class="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <a href="#/tools/eto-calculator" class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 text-xs font-semibold transition-colors">
                <i data-lucide="droplet" class="w-3.5 h-3.5"></i>
                <span>Calculate Zone Crop Water (ETc)</span>
              </a>
              <a href="#/tools/fertilizer-requirement-calculator" class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition-colors">
                <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i>
                <span>Formulate VRT Fertilizer</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
